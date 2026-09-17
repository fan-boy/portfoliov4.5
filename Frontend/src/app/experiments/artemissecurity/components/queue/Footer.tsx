"use client";

/* Shortcuts stay visible. The merge prompt is the answer to "cases mutate while
   you're looking at them" — new work queues up and waits for you to pull it in,
   instead of reshuffling the list under the cursor. */

const KEYS: [string, string][] = [
  ["↑↓", "Navigate"],
  ["Space", "Peek"],
  ["↵", "Open"],
  ["C", "Confirm"],
  ["X", "Override"],
  ["A", "Assign"],
  ["E", "Dismiss"],
];

export function Footer() {
  return (
    <div className="flex h-40 shrink-0 items-center justify-between border-t border-hairline bg-panel px-28">
      <div className="flex items-center gap-14">
        {KEYS.map(([k, label]) => (
          <span key={label} className="flex items-center gap-6">
            <kbd className="flex items-center rounded-xs border border-hairline bg-hover px-5 py-2 font-mono text-[9.5px] leading-[13px] font-medium text-muted">
              {k}
            </kbd>
            <span className="text-[11px] leading-[15px] text-faint">{label}</span>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-7">
        {/* The only thing on this screen that loops. It means cases are still
            arriving while you read, which the sentence beside it can't say on
            its own once you've read it twice. */}
        <span className="live-dot size-6 rounded-full" style={{ background: "var(--accent-solid)" }} />
        <span className="text-[11px] leading-[15px] text-muted">
          7 new cases since you opened this view
        </span>
        <button className="pressable rounded-sm border border-line bg-inset px-9 py-4 text-[11px] leading-[15px] font-medium text-secondary hover:bg-hover">
           Refresh Page
        </button>
      </div>
    </div>
  );
}
