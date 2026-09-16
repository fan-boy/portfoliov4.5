"use client";

/* Loading holds the row's shape rather than showing a spinner — the columns
   stay where they will be, so nothing jumps when the data lands. */

const Bar = ({ w, h, dim }: { w: number; h: number; dim?: boolean }) => (
  <span
    className="block rounded-[3px]"
    style={{
      width: w,
      height: h,
      background: dim ? "var(--bg-surface-hover)" : "var(--bg-surface-hover)",
      opacity: dim ? 0.55 : 1,
    }}
  />
);

const TITLE_WIDTHS = [420, 340, 480, 420, 340, 480, 420, 340];

export function QueueSkeleton() {
  return (
    /* One pulse across the whole block rather than a travelling shimmer —
       synchronised reads as "waiting", staggered reads as decoration. */
    <div className="skeleton">
      <div className="flex w-1148 items-center gap-10 pt-12 pb-10">
        <Bar w={96} h={9} />
        <Bar w={22} h={9} />
        <span className="h-1 flex-1 bg-hairline" />
      </div>

      {TITLE_WIDTHS.map((w, i) => (
        <div key={i} className="flex h-64 w-1148 items-center border-b border-hairline pr-14">
          <span className="h-63 w-3 shrink-0" style={{ background: "var(--bg-surface-hover)" }} />
          <span className="flex w-58 shrink-0 items-center pl-16">
            <Bar w={30} h={9} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-8 pr-20">
            <Bar w={w} h={11} />
            <Bar w={190} h={9} dim />
          </div>
          <div className="flex h-40 w-238 shrink-0 flex-col gap-8">
            <Bar w={120} h={11} />
            <Bar w={84} h={9} dim />
          </div>
          <div className="flex h-42 w-88 shrink-0 flex-col items-end gap-8">
            <Bar w={34} h={9} />
            <span
              className="size-22 rounded-full"
              style={{ background: "var(--bg-surface-hover)", opacity: 0.55 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
