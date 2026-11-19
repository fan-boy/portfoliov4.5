'use client'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { TabletPalette } from "./data";

/**
 * A station name tablet laid in mosaic, after the 1904 subway tablets: capital
 * letters in small square tiles on a coloured field, inside a three-ring border.
 *
 * The letters are drawn at one pixel per tile on an offscreen canvas and read
 * back, so any text works. When `play` turns true the tiles are set: the border
 * runs round first, then the field fills in, then the letters left to right.
 * Drawn on one canvas, so a tablet of a few thousand tiles stays cheap.
 */

type Cell = { x: number; y: number; rgb: [number, number, number]; t: number; dx: number; dy: number };

const BORDER = 3;
const PAD_Y = 2;
const PAD_X = 3;
const LINE_GAP = 2;
const GROUT = "#CFC7B6";
/** How long one tile takes to settle, in ms. */
const SET_MS = 280;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Seeded random, so a tablet lays out the same on every render. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h;
}

/** Reads one line of text back as a grid of inked cells, capHeight cells tall. */
function textMask(line: string, capHeight: number): boolean[][] {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  // Georgia's capitals hold up best at a few tiles tall, but its numerals are
  // old-style (short, dipping below the line), so digits come from Times.
  const letterFont = `700 ${Math.round(capHeight / 0.69)}px Georgia, "Times New Roman", serif`;
  const digitFont = `700 ${Math.round(capHeight / 0.66)}px "Times New Roman", Times, serif`;
  const fontFor = (ch: string) => (/\d/.test(ch) ? digitFont : letterFont);
  const spacing = Math.max(1, Math.round(capHeight / 9));
  const advance = (ch: string) => {
    ctx.font = fontFor(ch);
    return ctx.measureText(ch).width + spacing;
  };
  const width = Math.ceil([...line].reduce((w, ch) => w + advance(ch), 0)) + 4;
  canvas.width = width;
  canvas.height = capHeight + 2;
  ctx.fillStyle = "#000";
  ctx.textBaseline = "alphabetic";
  // Letter by letter, so the spacing works in every browser.
  let x = 1;
  for (const ch of line) {
    const step = advance(ch);
    ctx.fillText(ch, x, capHeight);
    x += step;
  }
  const data = ctx.getImageData(0, 0, width, capHeight).data;
  const rows: boolean[][] = [];
  for (let y = 0; y < capHeight; y++) {
    const row: boolean[] = [];
    for (let i = 0; i < width; i++) row.push(data[(y * width + i) * 4 + 3] > 120);
    rows.push(row);
  }
  // Trim empty columns either side.
  let first = width, last = -1;
  rows.forEach((r) => r.forEach((on, i) => { if (on) { first = Math.min(first, i); last = Math.max(last, i); } }));
  return rows.map((r) => r.slice(first, last + 1));
}

function layout(lines: string[], capHeight: number, palette: TabletPalette, speed: number) {
  const masks = lines.map((l) => textMask(l, capHeight));
  const textW = Math.max(...masks.map((m) => m[0]?.length ?? 0));
  const textH = masks.length * capHeight + (masks.length - 1) * LINE_GAP;
  const cols = textW + 2 * (BORDER + PAD_X);
  const rows = textH + 2 * (BORDER + PAD_Y);
  const rand = rng(hash(lines.join("|")));

  const ink = (x: number, y: number) => {
    const tx = x - BORDER - PAD_X;
    let ty = y - BORDER - PAD_Y;
    for (const m of masks) {
      if (ty >= 0 && ty < capHeight) {
        const off = Math.floor((textW - m[0].length) / 2);
        return m[ty]?.[tx - off] ?? false;
      }
      ty -= capHeight + LINE_GAP;
    }
    return false;
  };

  // Where a border cell sits on the way round, 0..1, clockwise from the top left.
  const perimeter = 2 * (cols + rows);
  const around = (x: number, y: number) => {
    const ring = Math.min(x, y, cols - 1 - x, rows - 1 - y);
    const left = x - ring, top = y - ring, right = cols - 1 - ring - x, bottom = rows - 1 - ring - y;
    if (top === 0) return left / perimeter;
    if (right === 0) return (cols + top) / perimeter;
    if (bottom === 0) return (cols + rows + right) / perimeter;
    return (2 * cols + rows + bottom) / perimeter;
  };

  const cells: Cell[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const ring = Math.min(x, y, cols - 1 - x, rows - 1 - y);
      let color: string;
      let t: number;
      if (ring < BORDER) {
        const corner = (x < BORDER || x >= cols - BORDER) && (y < BORDER || y >= rows - BORDER);
        if (corner) color = x % 2 === y % 2 ? palette.bandA : palette.inner;
        else if (ring === 0) color = palette.outer;
        else if (ring === 1) color = Math.floor((x + y) / 2) % 2 ? palette.bandA : palette.bandB;
        else color = palette.inner;
        t = around(x, y) * 700 + rand() * 90;
      } else if (ink(x, y)) {
        color = palette.letter;
        t = 800 + (x / cols) * 650 + rand() * 160;
      } else {
        color = palette.field;
        t = 260 + rand() * 900;
      }
      // Hand-set: each tile a shade off, a hair off the grid.
      const shade = 1 + (rand() - 0.5) * 0.12;
      const [r, g, b] = hexToRgb(color);
      cells.push({
        x,
        y,
        rgb: [Math.min(255, r * shade), Math.min(255, g * shade), Math.min(255, b * shade)],
        t: t / speed,
        dx: (rand() - 0.5) * 0.12,
        dy: (rand() - 0.5) * 0.12,
      });
    }
  }
  const total = Math.max(...cells.map((c) => c.t)) + SET_MS;
  return { cols, rows, cells, total };
}

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

export default function MosaicTablet({
  lines,
  capHeight,
  palette,
  play,
  instant = false,
  speed = 1,
  maxCell = 14,
  className = "",
}: {
  lines: string[];
  /** Letter height, in tiles. */
  capHeight: number;
  palette: TabletPalette;
  /** Starts laying the tiles. Stays laid once started. */
  play: boolean;
  /** Skips straight to the finished tablet. */
  instant?: boolean;
  /** 1 lays the hero in about 1.7s; higher is faster. */
  speed?: number;
  maxCell?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(0);
  const [plan, setPlan] = useState<ReturnType<typeof layout> | null>(null);
  const startRef = useRef<number | null>(null);
  const key = lines.join("|");

  // The text is measured on a canvas, so the layout waits for the browser.
  useEffect(() => {
    setPlan(layout(key.split("|"), capHeight, palette, speed));
  }, [key, capHeight, palette, speed]);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cell = plan && width ? Math.min(maxCell, width / plan.cols) : 0;

  const draw = useMemo(() => {
    if (!plan || !cell) return null;
    return (elapsed: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, plan.cols * cell, plan.rows * cell);
      // The grout bed goes down first.
      ctx.globalAlpha = Math.min(1, elapsed / 220);
      ctx.fillStyle = GROUT;
      ctx.fillRect(0, 0, plan.cols * cell, plan.rows * cell);
      const gap = Math.max(0.6, cell * 0.12);
      for (const c of plan.cells) {
        const p = (elapsed - c.t) / SET_MS;
        if (p <= 0) continue;
        const e = p >= 1 ? 1 : easeOut(p);
        const size = (cell - gap) * (0.55 + 0.45 * e);
        const cx = (c.x + 0.5 + c.dx) * cell;
        const cy = (c.y + 0.5 + c.dy) * cell;
        ctx.globalAlpha = e;
        ctx.fillStyle = `rgb(${c.rgb[0] | 0},${c.rgb[1] | 0},${c.rgb[2] | 0})`;
        ctx.fillRect(cx - size / 2, cy - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };
  }, [plan, cell]);

  // Size the canvas for the screen, and repaint whatever stage it's at.
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !plan || !cell || !draw) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(plan.cols * cell * dpr);
    canvas.height = Math.round(plan.rows * cell * dpr);
    canvas.style.width = `${plan.cols * cell}px`;
    canvas.style.height = `${plan.rows * cell}px`;
    if (instant) draw(Infinity);
    else if (startRef.current !== null) draw(performance.now() - startRef.current);
  }, [plan, cell, draw, instant]);

  useEffect(() => {
    if (!play || !draw || !plan) return;
    if (instant) {
      draw(Infinity);
      return;
    }
    if (startRef.current === null) startRef.current = performance.now();
    let frame = 0;
    const tick = () => {
      const elapsed = performance.now() - startRef.current!;
      draw(elapsed);
      if (elapsed < plan.total) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play, instant, draw, plan]);

  return (
    <div ref={wrapRef} className={`flex w-full justify-center ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block" style={{ aspectRatio: plan ? `${plan.cols} / ${plan.rows}` : undefined }} />
    </div>
  );
}
