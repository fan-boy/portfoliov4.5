"use client";

import Link from "next/link";
import { Check } from "../ui/Icon";
import { SourceChip } from "../case/parts";

/* Peek answers "do I need to open this" without costing a page load and a
   scroll position. Depth 1: the summary, the claims behind the verdict, and
   how much of the estate Artemis actually reached. */

const SUMMARY =
  "At 09:14 UTC the service account svc-deploy-prod authenticated to AWS from 45.83.140.22, an ASN never seen in this tenant. Within four minutes it stopped CloudTrail logging and deleted the bucket holding 90 days of audit logs. No MFA was satisfied at any point.";

const CLAIMS = [
  { text: "Authentication from an ASN never seen in this tenant", source: "Okta" },
  { text: "CloudTrail logging stopped four minutes after first access", source: "AWS" },
  { text: "The audit log bucket was deleted in the same session", source: "AWS" },
];

function Key({ children, onAccent }: { children: React.ReactNode; onAccent?: boolean }) {
  return (
    <span
      className="flex shrink-0 items-center rounded-[3px] px-4 py-1 font-mono text-[9px] leading-[13px] font-medium"
      style={
        onAccent
          ? { background: "var(--bg-canvas)", color: "var(--accent-solid)" }
          : {
              background: "var(--bg-surface-hover)",
              border: "1px solid var(--border-hairline)",
              color: "var(--text-faint)",
            }
      }
    >
      {children}
    </span>
  );
}

function Action({ label, k }: { label: string; k: string }) {
  return (
    <button
      className="pressable flex h-31 items-center gap-7 rounded-[7px] bg-canvas px-11 hover:bg-hover"
      style={{ border: "1px solid var(--border-interactive)" }}
    >
      <span className="text-[12px] leading-[17px] font-medium text-secondary">{label}</span>
      <Key>{k}</Key>
    </button>
  );
}

export function Peek({ caseId, verdict }: { caseId: string; verdict: string }) {
  return (
    <div className="border-b border-hairline bg-inset pt-4 pr-20 pb-16 pl-77">
      <div className="flex flex-col gap-7 pt-14 pb-16">
        <span className="block text-[9.5px] leading-[13px] font-medium tracking-[0.7px] text-faint">
          WHAT HAPPENED
        </span>
        <p className="text-[13px] leading-[20px] text-secondary">{SUMMARY}</p>
      </div>

      <div className="flex flex-col gap-9 pb-16">
        <div className="flex items-center gap-9">
          <span className="block text-[9.5px] leading-[13px] font-medium tracking-[0.7px] text-faint">
            WHY
          </span>
          <span className="text-[11.5px] leading-[16px] font-medium text-primary">{verdict}</span>
        </div>

        {CLAIMS.map((c) => (
          <div key={c.text} className="flex items-center gap-9">
            <span className="size-4 shrink-0 rounded-full" style={{ background: "var(--text-muted)" }} />
            <span className="text-[12.5px] leading-[18px] text-primary">{c.text}</span>
            <SourceChip>{c.source}</SourceChip>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-7 pb-16">
        <span style={{ color: "var(--feedback-success)" }}>
          <Check size={11} />
        </span>
        <span className="text-[11.5px] leading-[16px] text-muted">
          Investigated 4 of 4 connected sources
        </span>
      </div>

      <div className="flex items-center justify-between gap-12 border-t border-hairline pt-14">
        <div className="flex items-center gap-10">
          <span className="text-[11.5px] leading-[16px] text-muted">3 recommended actions</span>
          <span className="text-[11px] leading-[15px] text-faint">·</span>
          <Link
            href={`/experiments/artemissecurity/cases/${caseId}/ledger`}
            className="text-[11.5px] leading-[16px] font-medium hover:underline"
            style={{ color: "var(--accent-default)" }}
          >
            Show full investigation
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <Action label="Assign" k="A" />
          <Action label="Override" k="X" />
          <Link
            href={`/experiments/artemissecurity/cases/${caseId}`}
            className="pressable flex h-31 items-center gap-7 rounded-[7px] bg-canvas px-11 hover:bg-hover"
            style={{ border: "1px solid var(--border-interactive)" }}
          >
            <span className="text-[12px] leading-[17px] font-medium text-secondary">Open</span>
            <Key>↵</Key>
          </Link>
          <button
            className="pressable flex h-29 items-center gap-7 rounded-[7px] px-11"
            style={{ background: "var(--accent-solid)", color: "var(--text-on-accent)" }}
          >
            <span className="text-[12px] leading-[17px] font-medium">Confirm verdict</span>
            <Key onAccent>C</Key>
          </button>
        </div>
      </div>
    </div>
  );
}
