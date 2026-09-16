"use client";

import { useEffect, useRef, useState } from "react";

/* A centred dialog. The filter surfaces outgrew being anchored popovers — a
   544-wide menu hanging off a right-hand control either runs off the viewport
   or has to guess which side to flip to. Centred has no edge to fall off.

   The root stays mounted so the open transition has something to animate from;
   only the contents mount, on first open, and then stay. */
export function Modal({
  open,
  onClose,
  width,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  width: number;
  label: string;
  children: React.ReactNode;
}) {
  /* Adjusted during render rather than in an effect — this is derived state
     ("has it ever been open"), and an effect would cost an extra pass. */
  const [seen, setSeen] = useState(false);
  if (open && !seen) setSeen(true);

  const panel = useRef<HTMLDivElement>(null);
  /* Where focus was before the dialog took it, so it can be handed back. */
  const restore = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restore.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); }
      if (e.key !== "Tab" || !panel.current) return;
      /* Keep Tab inside the dialog. Without this the page behind stays
         reachable while a modal is open, which is disorienting with a screen
         reader and lets the user act on content the scrim says is inert. */
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panel.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      /* Hand focus back to whatever opened the dialog, rather than letting it
         fall to <body> and forcing a re-tab from the top of the page. */
      restore.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div className="modal" data-open={open || undefined} role="dialog" aria-modal aria-label={label}>
      <div className="modal-scrim" onClick={onClose} />
      <div
        ref={panel}
        /* Capped so a tall dialog scrolls inside itself on a short screen
           rather than running off the top and bottom. */
        className="modal-panel max-h-[calc(100dvh-64px)] overflow-y-auto rounded-[10px] border border-line-strong bg-surface"
        style={{ width, boxShadow: "0 8px 24px rgb(0 0 0 / 0.5)" }}
      >
        {seen && children}
      </div>
    </div>
  );
}
