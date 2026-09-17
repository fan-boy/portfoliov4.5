"use client";

import { ChevronRight } from "../ui/Icon";

/* Label, count, one line of plain English, then a rule that runs to whatever
   the band still has to say on the right. */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 text-[10.5px] leading-[15px] font-medium tracking-[0.7px] text-faint">
      {children}
    </span>
  );
}

function Count({ children }: { children: React.ReactNode }) {
  return (
    <span className="tabular shrink-0 font-mono text-[10.5px] leading-[15px] font-medium tracking-[0.3px] text-muted">
      {children}
    </span>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 text-[11px] leading-[15px] text-faint">{children}</span>
  );
}

/* The header is the accordion control for its band. The chevron is the same
   glyph rotated by the shared `.chev` rule, and `data-open` on the button is
   what drives it — so every band opens and closes the same way the closed
   pile does, and the way the peek does. */
export function BandHeader({
  label, count, note, progress, first, open = true, onToggle, controls,
}: {
  label: string; count: string; note: string; progress?: string; first?: boolean;
  open?: boolean; onToggle?: () => void; controls?: string;
}) {
  return (
    <div className={["flex items-center gap-10 pb-10", first ? "pt-12" : "pt-22"].join(" ")}>
      <button
        type="button"
        onClick={onToggle}
        data-open={open || undefined}
        aria-expanded={open}
        aria-controls={controls}
        className="flex min-w-0 flex-1 items-center gap-10 rounded-[6px] text-left"
      >
        <span className="chev shrink-0 text-muted"><ChevronRight /></span>
        <Label>{label}</Label>
        <Count>{count}</Count>
        <Note>{note}</Note>
        <span className="h-1 flex-1 bg-hairline" />
      </button>
      {progress && (
        <span className="shrink-0 rounded-sm border border-line bg-inset px-9 py-4 text-[11px] leading-[15px] font-medium text-secondary">
          {progress}
        </span>
      )}
    </div>
  );
}

export function ShowMore({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-13 pl-77">
      <button
        className="text-[12.5px] leading-[18px] font-medium hover:underline"
        style={{ color: "var(--accent-default)" }}
      >
        {children}
      </button>
    </div>
  );
}

export function ClosedBand({
  label, count, note, breakdown, open = false, onToggle, controls, children,
}: {
  label: string; count: string; note: string; breakdown: string[];
  open?: boolean; onToggle?: () => void; controls?: string; children?: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-center gap-10 pt-22 pb-10">
        <button
          type="button"
          onClick={onToggle}
          data-open={open || undefined}
          aria-expanded={open}
          aria-controls={controls}
          className="flex min-w-0 flex-1 items-center gap-10 rounded-[6px] text-left"
        >
          <span className="chev shrink-0 text-muted"><ChevronRight /></span>
          <Label>{label}</Label>
          <Count>{count}</Count>
          <Note>{note}</Note>
          <span className="h-1 flex-1 bg-hairline" />
        </button>
        <button className="shrink-0 rounded-sm border border-line bg-inset px-10 py-5 text-[11.5px] leading-[16px] font-medium text-secondary hover:bg-hover">
          Sample 10
        </button>
        <button className="shrink-0 rounded-sm border border-line bg-inset px-10 py-5 text-[11.5px] leading-[16px] font-medium text-secondary hover:bg-hover">
          Review all
        </button>
      </div>
      <div className="flex items-center gap-7 pb-6 pl-22">
        <span className="text-[11.5px] leading-[16px] text-muted">{breakdown[0]}</span>
        <span className="text-[11px] leading-[15px] text-faint">·</span>
        <span className="text-[11.5px] leading-[16px] text-muted">{breakdown[1]}</span>
        <span className="text-[11px] leading-[15px] text-faint">·</span>
        <span className="text-[11.5px] leading-[16px] text-faint">{breakdown[2]}</span>
      </div>
      {children}
    </>
  );
}
