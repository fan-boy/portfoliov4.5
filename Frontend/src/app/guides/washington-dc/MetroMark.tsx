import React from "react";
import { LINE_COLORS, type LineId } from "./data";

const LINES: LineId[] = ["red", "orange", "blue", "green", "yellow", "silver"];

/** A small Metro pylon top: the brown panel, the M, the line colours and "DC". Used as the guide's magnet on About. */
export default function MetroMark() {
  return (
    <svg viewBox="0 0 120 150" className="block h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="mm-bronze" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a2718" />
          <stop offset="0.5" stopColor="#5b3d26" />
          <stop offset="1" stopColor="#3a2718" />
        </linearGradient>
      </defs>
      <rect width="120" height="150" rx="8" fill="url(#mm-bronze)" />
      <rect x="27" y="14" width="66" height="66" rx="4" fill="none" stroke="#fff" strokeWidth="5" />
      <text x="60" y="64" textAnchor="middle" fill="#fff" style={{ fontFamily: "var(--font-sans), Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 46 }}>
        M
      </text>
      {LINES.map((l, i) => (
        <rect key={l} x={14 + i * 16} y="92" width="12" height="12" rx="6" fill={LINE_COLORS[l]} />
      ))}
      <text x="60" y="134" textAnchor="middle" fill="#fff" style={{ fontFamily: "var(--font-sans), Helvetica, Arial, sans-serif", fontWeight: 600, fontSize: 20 }}>
        DC
      </text>
    </svg>
  );
}
