/* THROWAWAY — prototype surface for the watercolor art direction.
   Deleted once a direction is picked. Nothing in the app imports this. */

/** Tower sits left of centre; skyline weighted right, so nothing mirrors. */
export const CX = 520;
export const HORIZON = 742;

export const ESB =
  'M 375 742 L 375 592 L 402 592 L 402 512 L 432 512 L 432 452 ' +
  'L 471 452 L 471 236 L 483 236 L 483 212 L 495 212 L 495 192 ' +
  'L 506 192 L 506 156 L 514 156 L 517 112 L 520 88 ' +
  'L 523 112 L 526 156 L 534 156 L 534 192 L 545 192 L 545 212 ' +
  'L 557 212 L 557 236 L 569 236 L 569 452 L 608 452 L 608 512 ' +
  'L 638 512 L 638 592 L 665 592 L 665 742 Z';

/** Everything right of the ridge is in shadow. */
export const ESB_SHADE =
  'M 520 88 L 523 112 L 526 156 L 534 156 L 534 192 L 545 192 L 545 212 ' +
  'L 557 212 L 557 236 L 569 236 L 569 452 L 608 452 L 608 512 ' +
  'L 638 512 L 638 592 L 665 592 L 665 742 L 520 742 Z';

export type Blk = { x: number; w: number; top: number; warm?: boolean };

export const FAR: Blk[] = [
  { x: 40, w: 90, top: 560 },
  { x: 118, w: 72, top: 528 },
  { x: 690, w: 88, top: 500 },
  { x: 768, w: 78, top: 466 },
  { x: 840, w: 92, top: 522 },
  { x: 924, w: 82, top: 486 },
  { x: 996, w: 112, top: 512 },
  { x: 1096, w: 108, top: 478 },
];

export const MID: Blk[] = [
  { x: -8, w: 104, top: 620 },
  { x: 214, w: 96, top: 596, warm: true },
  { x: 300, w: 80, top: 634 },
  { x: 654, w: 88, top: 588 },
  { x: 736, w: 78, top: 626, warm: true },
  { x: 900, w: 94, top: 602 },
  { x: 1058, w: 92, top: 588, warm: true },
];

export const FORE: Blk[] = [
  { x: -12, w: 124, top: 674, warm: true },
  { x: 338, w: 94, top: 690 },
  { x: 798, w: 106, top: 668, warm: true },
  { x: 1008, w: 90, top: 686 },
  { x: 1128, w: 92, top: 662 },
];

/** Rainbow arc centred right of the tower so the two never mirror. */
export const BOW_CX = 660;
export const BOW_CY = 812;
export const bowPath = (r: number) =>
  `M ${BOW_CX - r} ${BOW_CY} A ${r} ${r} 0 0 1 ${BOW_CX + r} ${BOW_CY}`;

export type Bloom = { cx: number; cy: number; rx: number; ry: number; d: number };

export const SKY_BLOOMS: Bloom[] = [
  { cx: 330, cy: 250, rx: 520, ry: 340, d: 0.25 },
  { cx: 880, cy: 220, rx: 500, ry: 330, d: 0.5 },
  { cx: 600, cy: 500, rx: 640, ry: 290, d: 0.75 },
];

export const FAR_BLOOMS: Bloom[] = [
  { cx: 150, cy: 640, rx: 260, ry: 190, d: 2.1 },
  { cx: 900, cy: 610, rx: 330, ry: 200, d: 2.3 },
  { cx: 1130, cy: 630, rx: 240, ry: 190, d: 2.5 },
];

export const ESB_BLOOMS: Bloom[] = [
  { cx: CX, cy: 672, rx: 230, ry: 150, d: 3.0 },
  { cx: CX, cy: 500, rx: 175, ry: 190, d: 3.3 },
  { cx: CX, cy: 260, rx: 140, ry: 215, d: 3.6 },
  { cx: CX, cy: 118, rx: 85, ry: 135, d: 3.9 },
];

export const MID_BLOOMS: Bloom[] = [
  { cx: 140, cy: 700, rx: 280, ry: 165, d: 4.3 },
  { cx: 760, cy: 690, rx: 300, ry: 175, d: 4.5 },
  { cx: 1120, cy: 700, rx: 250, ry: 165, d: 4.7 },
];

export const FORE_BLOOMS: Bloom[] = [
  { cx: 120, cy: 730, rx: 280, ry: 130, d: 5.0 },
  { cx: 880, cy: 730, rx: 320, ry: 130, d: 5.15 },
];
