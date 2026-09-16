"use client";

import type { CaseRecord } from "../../lib/types";
import {
  AgeCell, AssigneeCell, MetaCell, QualifierCell, SeverityCell, TitleCell, VerdictCell,
} from "./cells";

/* 1148 x 64, four zones: 61 fixed / grow / 238 fixed / 88 fixed, 14 of padding
   on the right and a hairline underneath. The fixed widths are the point —
   the eye scans down a column, so verdict has to land at the same x on every
   row whether or not there's an assignee, a tag, or a 230-finding count. */

export function CaseRow({
  data,
  selected,
  onSelect,
  onFocus,
}: {
  data: CaseRecord;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onFocus?: (id: string) => void;
}) {
  const on = selected ?? data.selected;
  return (
    <div
      role="row"
      aria-selected={on}
      /* Roving tabindex: the cursor row is the list's single tab stop, so Tab
         reaches the queue in one press and arrows take over from there. Without
         it the rows are click-only — the keyboard model in page.tsx drives a
         visual cursor that DOM focus never follows. */
      tabIndex={on ? 0 : -1}
      onFocus={() => onFocus?.(data.id)}
      onClick={() => onSelect?.(data.id)}
      /* 120ms on the background only. Rows are scanned, not admired — any
         longer and the hover lags the pointer down a dense list. */
      className={[
        "flex h-64 cursor-pointer items-center border-b border-hairline pr-14",
        "transition-colors duration-120 ease-out",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-control",
        on ? "bg-hover" : "hover:bg-hover",
      ].join(" ")}
    >
      <SeverityCell severity={data.severity} verdict={data.railVerdict ?? data.verdict} />

      <div className="flex min-w-0 flex-1 flex-col gap-4 pr-20">
        <TitleCell title={data.title} tag={data.tag} />
        <MetaCell entity={data.entity} more={data.more} findings={data.findings} />
      </div>

      <div className="flex h-40 w-238 shrink-0 flex-col gap-5">
        <VerdictCell verdict={data.verdict} confidence={data.confidence} />
        <QualifierCell qualifier={data.qualifier} />
      </div>

      <div className="flex h-42 w-88 shrink-0 flex-col items-end gap-6">
        <AgeCell age={data.age} />
        <AssigneeCell initials={data.initials} />
      </div>
    </div>
  );
}
