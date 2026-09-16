"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check } from "./Icon";

/* The filter popovers. One shape for both menus in the Figma file: 38px
   header, 6px of list padding, 30px rows on a 5px radius.

   They render into document.body rather than next to their trigger. An
   absolutely-positioned menu is clipped by any ancestor that scrolls, and the
   builder dialog scrolls — so a field menu opened near its footer was being
   cut in half. A portal has no ancestor to be clipped by; the trade is that
   the position has to be measured rather than inherited.

   Operators get a leading check because only one can be true. Values get a
   trailing check and a colour swatch, because "is any of" makes them
   multi-select and the check has to sit where a checkbox would. */

const GAP = 6;
const EDGE = 8;

export function Menu({
  title,
  header,
  width,
  align = "left",
  onClose,
  children,
}: {
  title?: string;
  /** Replaces the title row — used where a search box belongs there instead. */
  header?: React.ReactNode;
  width: number;
  /** Which edge of the trigger to line up with. */
  align?: "left" | "right";
  onClose: () => void;
  children: React.ReactNode;
}) {
  /* A zero-size marker left where the menu was written, purely so the panel
     can find the control it belongs to after being portalled away. */
  const marker = useRef<HTMLSpanElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number; flipped: boolean } | null>(null);

  useLayoutEffect(() => {
    const anchor = marker.current?.parentElement;
    const el = panel.current;
    if (!anchor || !el) return;

    const a = anchor.getBoundingClientRect();
    const h = el.offsetHeight;
    const below = a.bottom + GAP;
    const fits = below + h <= window.innerHeight - EDGE;
    const top = fits ? below : Math.max(EDGE, a.top - GAP - h);

    const raw = align === "right" ? a.right - width : a.left;
    const left = Math.min(Math.max(EDGE, raw), window.innerWidth - width - EDGE);

    setPos({ top, left, flipped: !fits });
  }, [align, width]);

  useEffect(() => {
    const anchor = marker.current?.parentElement;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panel.current?.contains(t)) return;
      /* The trigger is outside the portal now, so it has to be excused by
         hand or its own click would immediately reopen what this just shut. */
      if (anchor?.contains(t)) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); }
    };
    /* Anything that scrolls moves the trigger out from under the menu. */
    const onScroll = () => onClose();

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey, true);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [onClose]);

  if (typeof document === "undefined") return <span ref={marker} className="hidden" />;

  return (
    <>
      <span ref={marker} className="hidden" />
      {createPortal(
        /* The design tokens, the 1px spacing base and the colour utilities are
           scoped so they cannot leak into the surrounding portfolio. A portal
           mounted on <body> sits outside that scope and loses all of them — no
           background, no border colour, 4x padding. `display: contents` means
           the wrapper generates no box, so it restores the scope without
           changing layout or the panel's fixed positioning. */
        <div
          className="artemis-scope"
          /* Mirror the app's theme: the portal is outside the root, so it
             cannot inherit the attribute the dark tokens key off. */
          data-theme={
            document.querySelector<HTMLElement>(".artemis-root")?.dataset.theme ?? "light"
          }
          style={{ display: "contents" }}
        >
        <div
          ref={panel}
          style={{
            position: "fixed",
            top: pos?.top ?? 0,
            left: pos?.left ?? 0,
            width,
            maxHeight: `calc(100dvh - ${EDGE * 2}px)`,
            visibility: pos ? "visible" : "hidden",
            boxShadow: "0 8px 24px rgb(0 0 0 / 0.5)",
            transformOrigin: `${pos?.flipped ? "bottom" : "top"} ${align}`,
          }}
          className="popover-in z-[200] flex flex-col overflow-hidden rounded-[10px] border border-line-strong bg-surface"
        >
          {header ?? (
            <div className="shrink-0 border-b border-hairline px-12 py-10">
              {/* block, not inline — an inline span inherits the parent line box
                  and adds 7px to every popover. Same trap as the micro-labels. */}
              <span className="block text-[12px] leading-[17px] font-medium text-primary">
                {title}
              </span>
            </div>
          )}
          {children}
        </div>
        </div>,
        document.body,
      )}
    </>
  );
}

/** The 6px-padded column the operator and value menus use. */
export function MenuList({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-0 flex-col overflow-y-auto p-6">{children}</div>;
}

export function MenuItem({
  label,
  selected,
  swatch,
  trailing,
  onClick,
}: {
  label: string;
  selected: boolean;
  /** Severity rows carry their colour; confidence has none by design. */
  swatch?: string;
  /** Check sits after the label instead of before it. */
  trailing?: boolean;
  onClick: () => void;
}) {
  const tick = (
    <span
      className="flex w-8 shrink-0 justify-center"
      style={{ color: "var(--accent-default)", visibility: selected ? "visible" : "hidden" }}
    >
      <Check size={12} />
    </span>
  );

  return (
    <button
      onClick={onClick}
      className={[
        "flex h-30 shrink-0 items-center gap-8 rounded-[5px] px-8 text-left",
        "transition-colors duration-120 ease-out",
        selected ? "bg-hover" : "hover:bg-hover",
      ].join(" ")}
    >
      {!trailing && tick}
      {swatch && (
        <span className="h-12 w-3 shrink-0 rounded-[2px]" style={{ background: swatch }} />
      )}
      <span
        className={[
          "truncate text-[12.5px] leading-[18px]",
          trailing ? "flex-1" : "",
          selected ? "font-medium text-primary" : "text-secondary",
        ].join(" ")}
      >
        {label}
      </span>
      {trailing && tick}
    </button>
  );
}
