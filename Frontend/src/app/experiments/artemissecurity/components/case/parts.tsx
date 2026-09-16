import type { ReactNode } from "react";

/* Small pieces the case screen repeats. Kept together because each one is
   three lines and splitting them into files would hide the shared type ramp. */

export function SectionHead({
  label, note, trailing, first,
}: { label: string; note?: string; trailing?: ReactNode; first?: boolean }) {
  return (
    <div className={["flex items-center gap-10 pb-12", first ? "pt-0" : "pt-30"].join(" ")}>
      <span className="shrink-0 text-[10.5px] leading-[15px] font-medium tracking-[0.7px] text-faint">
        {label}
      </span>
      {note && <span className="shrink-0 text-[11.5px] leading-[16px] text-faint">{note}</span>}
      <span className="h-1 flex-1 bg-hairline" />
      {trailing}
    </div>
  );
}

/** Uppercase micro-label used inside the verdict block and the rail. */
export function MicroLabel({ children }: { children: ReactNode }) {
  return (
    /* block, not inline — an inline label inherits the parent's line box and
       silently adds ~9px above every section it introduces. */
    <span className="block shrink-0 text-[9.5px] leading-[13px] font-medium tracking-[0.7px] text-faint">
      {children}
    </span>
  );
}

/** The source pill — Okta, AWS, CrowdStrike. Same one in claims and timeline. */
export function SourceChip({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 rounded-xs border border-hairline bg-hover px-6 py-2 font-mono text-[10px] leading-[14px] font-medium tracking-[0.2px] text-muted">
      {children}
    </span>
  );
}

export function QuietButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <button className={`pressable shrink-0 rounded-[5px] border border-line bg-hover px-8 py-4 text-[11px] leading-[15px] font-medium text-secondary hover:bg-inset ${className}`}>
      {children}
    </button>
  );
}

export function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button
      className="pressable flex h-32 shrink-0 items-center rounded-[7px] px-13 text-[12.5px] leading-[18px] font-medium"
      style={{ background: "var(--accent-solid)", color: "var(--text-on-accent)" }}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, inset }: { children: ReactNode; inset?: boolean }) {
  return (
    <button
      className={[
        "pressable flex h-34 shrink-0 items-center gap-7 rounded-[7px] border border-line px-13 text-[12.5px] leading-[18px] font-medium text-secondary hover:bg-hover",
        inset ? "bg-inset" : "bg-hover",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function RailHead({ label, count, first }: { label: string; count: string; first?: boolean }) {
  return (
    <div className={["flex items-center gap-8 pb-11", first ? "pt-0" : "pt-26"].join(" ")}>
      <MicroLabel>{label}</MicroLabel>
      <span className="tabular shrink-0 font-mono text-[9.5px] leading-[13px] font-medium tracking-[0.3px] text-muted">
        {count}
      </span>
      <span className="h-1 flex-1 bg-hairline" />
    </div>
  );
}
