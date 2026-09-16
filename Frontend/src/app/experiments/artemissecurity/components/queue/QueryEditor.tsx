"use client";

import { Code } from "../ui/Icon";
import { Modal } from "../ui/Modal";
import { toQuery, type BarState } from "../../lib/filters";

/* The third view of the same state. The bar is for scanning it, the builder
   for editing it, the query for being exact — and the brackets here are the
   same grouping the bar draws, which is the only reason three views is worth
   the cost. */

const KEYWORD = /\b(and|or|in|not)\b/g;

function Highlighted({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(KEYWORD)) {
    if (m.index! > last) parts.push(text.slice(last, m.index));
    parts.push(
      <span key={m.index} style={{ color: "var(--accent-default)" }}>
        {m[0]}
      </span>,
    );
    last = m.index! + m[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

export function QueryEditor({
  open, onClose, bar, matching, onSwitchToChips,
}: {
  open: boolean; onClose: () => void; bar: BarState;
  matching: number; onSwitchToChips: () => void;
}) {
  const query = toQuery(bar);

  return (
    <Modal open={open} onClose={onClose} width={540} label="Filter query">
      {/* Accent border rather than the usual hairline — the query view is the
          authoritative one, and it should look like an input you can type in. */}
      <div
        className="bg-inset px-14 py-13"
        style={{ boxShadow: "inset 0 0 0 1px var(--accent-border)" }}
      >
        <div className="flex gap-10">
          <span className="mt-4 shrink-0" style={{ color: "var(--accent-default)" }}>
            <Code size={13} />
          </span>
          <pre className="min-h-40 flex-1 font-mono text-[12px] leading-[20px] whitespace-pre-wrap text-secondary">
            {query ? <Highlighted text={query} /> : (
              <span className="text-faint">no filters — showing everything</span>
            )}
          </pre>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-hairline bg-inset py-9 pr-12 pl-14">
        <span className="flex items-center gap-6">
          <span className="tabular font-mono text-[12px] leading-[17px] font-medium text-primary">
            {matching}
          </span>
          <span className="text-[11.5px] leading-[16px] text-faint">of 431 cases</span>
        </span>
        <span className="flex items-center gap-8">
          <button
            onClick={onSwitchToChips}
            className="text-[11.5px] leading-[16px] text-faint hover:text-primary"
          >
            Switch to chips
          </button>
          <button
            onClick={onClose}
            className="pressable rounded-sm px-10 py-5 text-[11.5px] leading-[16px] font-medium"
            style={{ background: "var(--accent-solid)", color: "var(--text-on-accent)" }}
          >
            Save as view
          </button>
        </span>
      </div>
    </Modal>
  );
}
