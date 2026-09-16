"use client";

import type { ReactNode } from "react";
import { AlertBig, CheckBig, CheckDouble } from "../ui/Icon";

/* An empty queue is ambiguous — it can mean a quiet day or a broken pipeline,
   and those need opposite reactions. So each state says which one it is, and
   none of them just say "no results". */

type Kind = "quiet" | "ingestion" | "closed";

const glyph: Record<Kind, ReactNode> = {
  quiet: <CheckBig />,
  closed: <CheckDouble />,
  ingestion: <AlertBig />,
};

export function EmptyState({
  kind, heading, body, detail, actions, note,
}: {
  kind: Kind;
  heading: string;
  body: string;
  detail?: { source: string; status: string };
  actions: [string, string];
  note: string;
}) {
  const alarming = kind === "ingestion";

  return (
    <div className="flex w-1148 flex-col items-center py-92">
      <span
        className="flex size-52 items-center justify-center rounded-full"
        style={
          alarming
            ? {
                background: "var(--sev-high-bg)",
                border: "1px solid var(--sev-high-border)",
                color: "var(--sev-high)",
              }
            : { background: "var(--bg-surface-hover)", color: "var(--feedback-success)" }
        }
      >
        {glyph[kind]}
      </span>

      <h2 className="pt-20 text-[18px] leading-[26px] font-semibold tracking-[-0.2px] text-primary">
        {heading}
      </h2>

      <p className="w-560 pt-8 text-center text-[13.5px] leading-[21px] text-muted">{body}</p>

      {/* Naming the source that went quiet is the whole point of this state —
          "no results" would read as good news. */}
      {detail && (
        <div className="flex items-center gap-10 rounded-[8px] border border-line bg-inset px-14 py-10 mt-20">
          <span style={{ color: "var(--sev-high)" }}><AlertBig size={13} /></span>
          <span className="text-[12px] leading-[18px] font-medium text-primary">
            {detail.source}
          </span>
          <span className="font-mono text-[11.5px] leading-[17px] text-muted">{detail.status}</span>
        </div>
      )}

      <div className="flex items-center gap-8 pt-24">
        <button
          className="pressable rounded-[7px] bg-canvas px-13 py-8 text-[12.5px] leading-[19px] font-medium text-secondary hover:bg-hover"
          style={{ border: "1px solid var(--border-interactive)" }}
        >
          {actions[0]}
        </button>
        <button
          className="pressable rounded-[7px] px-13 py-8 text-[12.5px] leading-[19px] font-medium"
          style={{ background: "var(--accent-solid)", color: "var(--text-on-accent)" }}
        >
          {actions[1]}
        </button>
      </div>

      {/* No footnote on the ingestion state — there is nothing reassuring to
          add, and an empty line would just pad the block. */}
      {note && <p className="pt-22 text-[11.5px] leading-[17px] text-faint">{note}</p>}
    </div>
  );
}
