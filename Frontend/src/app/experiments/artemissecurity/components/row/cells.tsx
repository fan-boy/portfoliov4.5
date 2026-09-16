import type { CaseRecord, Confidence, Severity, Verdict } from "../../lib/types";
import { TriangleFilled, TriangleOutline } from "../ui/Icon";

/* ── Severity ──────────────────────────────────────────────────────────────
   Rail runs the full 64 so the queue reads as a colour column before it reads
   as text. Verdict sets how loud that colour is: node opacity, not a paler
   fill, so it survives every state the row can be in.

   The label doesn't fade with it. At 0.4 and 0.18 it measured 2.59:1 and
   1.79:1, so it drains colour instead and keeps full opacity. */

const railColor: Record<Severity, string> = {
  CRIT: "var(--sev-critical)",
  HIGH: "var(--sev-high)",
  MED: "var(--sev-medium)",
  LOW: "var(--sev-low)",
};

const gain: Record<Verdict, number> = {
  TP: 1,
  Investigating: 1,
  Benign: 0.4,
  FP: 0.18,
};

function labelColor(severity: Severity, verdict: Verdict) {
  if (verdict === "Benign") return "var(--text-muted)";
  if (verdict === "FP") return "var(--text-faint)";
  return railColor[severity];
}

export function SeverityCell({ severity, verdict }: { severity: Severity; verdict: Verdict }) {
  return (
    <div className="flex h-64 w-61 shrink-0 items-center">
      <div
        className="h-64 w-3 shrink-0"
        style={{ background: railColor[severity], opacity: gain[verdict] }}
      />
      <div className="flex w-58 items-center pl-16">
        <span
          className="font-mono text-[10.5px] leading-[15px] font-medium tracking-[0.5px]"
          style={{ color: labelColor(severity, verdict) }}
        >
          {severity}
        </span>
      </div>
    </div>
  );
}

/* ── Tag ───────────────────────────────────────────────────────────────── */

export function Tag({ label, tone }: NonNullable<CaseRecord["tag"]>) {
  const critical = tone === "Critical";
  return (
    <span
      className="shrink-0 rounded-[3px] border px-5 py-2 font-mono text-[9.5px] leading-[13px] font-medium tracking-[0.5px]"
      style={{
        background: critical ? "var(--sev-critical-bg)" : "var(--accent-bg)",
        borderColor: critical ? "var(--sev-critical-border)" : "var(--accent-border)",
        color: critical ? "var(--sev-critical)" : "var(--accent-default)",
      }}
    >
      {label}
    </span>
  );
}

/* ── Title ─────────────────────────────────────────────────────────────── */

export function TitleCell({ title, tag }: { title: string; tag?: CaseRecord["tag"] }) {
  return (
    <div className="flex h-20 items-center gap-8">
      {tag && <Tag {...tag} />}
      <span className="min-w-0 flex-1 truncate text-[14.5px] leading-[20px] font-medium tracking-[-0.1px] text-primary">
        {title}
      </span>
    </div>
  );
}

/* ── Meta ──────────────────────────────────────────────────────────────────
   Entity first — it's what an analyst searches their own memory for. The
   overflow slot renders even when empty so the line keeps its rhythm. */

export function MetaCell({ entity, more, findings }: Pick<CaseRecord, "entity" | "more" | "findings">) {
  return (
    <div className="flex items-center gap-7">
      <span className="font-mono text-[11.5px] leading-[16px] tracking-[-0.1px] text-secondary">
        {entity}
      </span>
      <span className="font-mono text-[11px] leading-[15px] text-faint">{more ?? ""}</span>
      <span className="text-[11px] leading-[15px] text-faint">·</span>
      <span className="text-[11.5px] leading-[16px] text-muted">{findings}</span>
    </div>
  );
}

/* ── Verdict ───────────────────────────────────────────────────────────────
   Filled dot means Artemis committed; hollow means it stood down. Confidence
   rides alongside because the verdict alone won't tell you whether to look. */

const verdictText: Record<Verdict, string> = {
  TP: "True positive",
  Benign: "True benign",
  FP: "False positive",
  Investigating: "Investigating",
};

export function VerdictCell({ verdict, confidence }: { verdict: Verdict; confidence: Confidence }) {
  const committed = verdict === "TP";
  const ring =
    verdict === "Benign" ? { color: "var(--text-secondary)", w: 1.3 }
      : verdict === "FP" ? { color: "var(--text-faint)", w: 1.2 }
        : { color: "var(--text-faint)", w: 1.3 };

  return (
    <div className="flex items-center gap-7">
      <span
        className="size-7 shrink-0 rounded-full"
        style={
          committed
            ? { background: "var(--text-primary)" }
            : { border: `${ring.w}px solid ${ring.color}` }
        }
      />
      <span
        className={[
          "text-[12.5px] leading-[18px] tracking-[-0.05px]",
          committed ? "font-medium text-primary" : "text-secondary",
        ].join(" ")}
      >
        {verdictText[verdict]}
      </span>
      <span className="text-[11.5px] leading-[16px] text-faint">·</span>
      <span className="text-[11.5px] leading-[16px] text-muted">{confidence}</span>
    </div>
  );
}

/* ── Qualifier ─────────────────────────────────────────────────────────────
   One line answering "why is this in front of me". Sources is the quiet
   default; the other three are reasons to stop scrolling. */

export function QualifierCell({ qualifier }: { qualifier: CaseRecord["qualifier"] }) {
  const { tone, text } = qualifier;
  const color =
    tone === "Coverage" ? "var(--sev-high)"
      : tone === "Escalation" ? "var(--sev-critical)"
        : tone === "Succession" ? "var(--accent-default)"
          : "var(--text-faint)";

  return (
    <div className="flex min-w-0 items-center gap-6" style={{ color }}>
      {tone === "Coverage" && <TriangleOutline />}
      {tone === "Escalation" && <TriangleFilled />}
      <span className="truncate text-[11.5px] leading-[16px]">{text}</span>
    </div>
  );
}

/* ── Age ───────────────────────────────────────────────────────────────── */

export function AgeCell({ age }: { age: string }) {
  return (
    <span className="tabular font-mono text-[11.5px] leading-[16px] text-muted">{age}</span>
  );
}

/* ── Assignee ──────────────────────────────────────────────────────────────
   Unassigned is a real state and holds the same 22px, or every unassigned row
   would shift the age column above it. */

export function AssigneeCell({ initials }: { initials?: string }) {
  if (!initials) {
    return (
      <span
        className="size-22 shrink-0 rounded-full"
        style={{ border: "1px solid var(--border-interactive)" }}
      />
    );
  }
  return (
    <span className="flex size-22 shrink-0 items-center justify-center rounded-full border border-line bg-hover text-[9px] leading-[13px] font-medium tracking-[0.2px] text-secondary">
      {initials}
    </span>
  );
}
