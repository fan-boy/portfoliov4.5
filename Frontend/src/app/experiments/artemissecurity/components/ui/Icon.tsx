/* Tabler Icons on the 24 grid at stroke 2 — exactly how the Figma file draws
   them. Because the stroke scales with the viewBox, rendering at size N gives
   a stroke of 2 x N/24, which is why the sizes below look arbitrary: they are
   whatever reproduces the stroke weight the design uses at that spot
   (size 16 -> 1.33, size 13 -> 1.08, size 12 -> 1.0, size 9 -> 0.75). */

type P = { size?: number; className?: string };

const svg = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
  style: { flexShrink: 0 },
});

export const AlignLeft = ({ size = 16, className }: P) => (
  <svg {...svg(size, className)}><path d="M4 6h16" /><path d="M4 12h10" /><path d="M4 18h14" /></svg>
);
export const User = ({ size = 16, className }: P) => (
  <svg {...svg(size, className)}><circle cx="12" cy="7" r="4" /><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>
);
export const Activity = ({ size = 16, className }: P) => (
  <svg {...svg(size, className)}><path d="M3 12h4l3 8l4-16l3 8h4" /></svg>
);
export const LayoutGrid = ({ size = 16, className }: P) => (
  <svg {...svg(size, className)}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>
);
export const ChartBar = ({ size = 16, className }: P) => (
  <svg {...svg(size, className)}><rect x="3" y="12" width="6" height="8" rx="1" /><rect x="9" y="8" width="6" height="12" rx="1" /><rect x="15" y="4" width="6" height="16" rx="1" /></svg>
);
export const Search = ({ size = 16, className }: P) => (
  <svg {...svg(size, className)}><circle cx="10" cy="10" r="7" /><path d="M21 21l-5 -5" /></svg>
);
export const Menu = ({ size = 14, className }: P) => (
  <svg {...svg(size, className)}><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></svg>
);
export const Layout = ({ size = 14, className }: P) => (
  <svg {...svg(size, className)}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16" /><path d="M10 10v10" /></svg>
);
export const Plus = ({ size = 11, className }: P) => (
  <svg {...svg(size, className)}><path d="M12 5v14" /><path d="M5 12h14" /></svg>
);
export const X = ({ size = 9, className }: P) => (
  <svg {...svg(size, className)}><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
);
export const ChevronDown = ({ size = 12, className }: P) => (
  <svg {...svg(size, className)}><path d="M6 9l6 6l6 -6" /></svg>
);
export const ChevronRight = ({ size = 13, className }: P) => (
  <svg {...svg(size, className)}><path d="M9 6l6 6l-6 6" /></svg>
);
export const ChevronLeft = ({ size = 13, className }: P) => (
  <svg {...svg(size, className)}><path d="M15 6l-6 6l6 6" /></svg>
);
export const ArrowsSort = ({ size = 13, className }: P) => (
  <svg {...svg(size, className)}><path d="M3 9l4 -4l4 4" /><path d="M7 5v14" /><path d="M21 15l-4 4l-4 -4" /><path d="M17 19V5" /></svg>
);
export const AlignRight = ({ size = 12, className }: P) => (
  <svg {...svg(size, className)}><path d="M4 6h16" /><path d="M10 12h10" /><path d="M6 18h14" /></svg>
);
export const Code = ({ size = 12, className }: P) => (
  <svg {...svg(size, className)}><path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /></svg>
);
export const Copy = ({ size = 12, className }: P) => (
  <svg {...svg(size, className)}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0 -2 -2H6a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" /></svg>
);
export const ArrowUpRight = ({ size = 11, className }: P) => (
  <svg {...svg(size, className)}><path d="M17 7l-10 10" /><path d="M8 7h9v9" /></svg>
);
export const Check = ({ size = 13, className }: P) => (
  <svg {...svg(size, className)}><path d="M5 12l5 5L20 7" /></svg>
);

/* Not Tabler. Two triangles the qualifier cell draws directly — outlined when
   Artemis could not reach a source, filled when it raised the severity. */
export const TriangleOutline = ({ w = 11, h = 10 }: { w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 11 10.4" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" aria-hidden style={{ flexShrink: 0 }}>
    <path d="M5.5 0 L11 10.4 L0 10.4 Z" />
  </svg>
);
export const TriangleFilled = ({ w = 11, h = 7 }: { w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 11 7" fill="currentColor" aria-hidden style={{ flexShrink: 0 }}>
    <path d="M5.5 0 L11 7 L0 7 Z" />
  </svg>
);

export const Download = ({ size = 13, className }: P) => (
  <svg {...svg(size, className)}>
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
    <path d="M7 11l5 5l5 -5" />
    <path d="M12 4v12" />
  </svg>
);

/* The three empty-state glyphs. Drawn at stroke 1.8 on the 24 grid, so a 13px
   render gives the 1.08 the inline variant uses. */
const big = (size: number) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  "aria-hidden": true, style: { flexShrink: 0 },
});

export const CheckBig = ({ size = 24 }: { size?: number }) => (
  <svg {...big(size)}><path d="M0 12 L8 24 L24 0" /></svg>
);
export const CheckDouble = ({ size = 24 }: { size?: number }) => (
  <svg {...big(size)}><path d="M6 12 L12 24 L24 0" /><path d="M0 12 L6 24" /></svg>
);
export const AlertBig = ({ size = 24 }: { size?: number }) => (
  <svg {...big(size)}>
    <path d="M12 0 L0 24 L24 24 Z" />
    <path d="M12 8.47 L12 14.12" />
    <path d="M12 19.76 L12 19.78" />
  </svg>
);
