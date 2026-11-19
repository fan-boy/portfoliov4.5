'use client'
import React from "react";
import { LINE_COLORS, type LineId } from "./data";

const LINES: LineId[] = ["red", "orange", "blue", "green", "yellow", "silver"];
const SANS = "var(--font-sans), Helvetica, Arial, sans-serif";

/**
 * The top of a DC Metro pylon: a bronze column with the M panel, the colours
 * of the lines that stop there, and the station's name. Drawn with a front
 * face, a narrower side face in shadow, a bevelled edge catching the light
 * and a faint brushed grain. When `lit`, the line bars come on one by one.
 */
export default function MetroPylon({ name, lit, instant }: { name: string[]; lit: boolean; instant: boolean }) {
  const on = lit || instant;
  return (
    <svg viewBox="0 0 200 420" className="block h-auto w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="py-front" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a3220" />
          <stop offset="0.18" stopColor="#6e4c31" />
          <stop offset="0.5" stopColor="#5a3c25" />
          <stop offset="1" stopColor="#3f2a1a" />
        </linearGradient>
        <linearGradient id="py-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2c1e13" />
          <stop offset="1" stopColor="#1d140c" />
        </linearGradient>
        <linearGradient id="py-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
        {/* Brushed bronze: fine vertical grain. */}
        <pattern id="py-grain" width="3" height="40" patternUnits="userSpaceOnUse">
          <rect width="1" height="40" fill="#fff" opacity="0.035" />
        </pattern>
      </defs>

      {/* Side face, then the cap, then the front. */}
      <polygon points="160,14 186,4 186,394 160,404" fill="url(#py-side)" />
      <polygon points="14,14 40,4 186,4 160,14" fill="#7a5638" />
      <rect x="14" y="14" width="146" height="390" fill="url(#py-front)" />
      <rect x="14" y="14" width="146" height="390" fill="url(#py-grain)" />
      <rect x="14" y="14" width="146" height="390" fill="url(#py-shade)" />
      {/* The bevelled edge catching the light. */}
      <rect x="14" y="14" width="2" height="390" fill="#a77e57" opacity="0.7" />
      {/* A dark lip along the bottom edge. */}
      <rect x="14" y="400" width="146" height="4" fill="#24180e" />

      {/* The M panel. */}
      <rect x="35" y="34" width="104" height="104" rx="6" fill="none" stroke="#f6f1e8" strokeWidth="7" />
      <text x="87" y="111" textAnchor="middle" fill="#f6f1e8" style={{ fontFamily: SANS, fontWeight: 700, fontSize: 76, letterSpacing: "-0.02em" }}>
        M
      </text>

      {/* The lines, coming on top to bottom. */}
      {LINES.map((l, i) => (
        <rect
          key={l}
          x="35"
          y={164 + i * 22}
          width="104"
          height="13"
          rx="2"
          fill={LINE_COLORS[l]}
          className="py-bar"
          style={{ opacity: on ? 1 : 0.12, transitionDelay: instant ? "0s" : `${0.15 + i * 0.12}s` }}
        />
      ))}

      {/* The station's name. */}
      {name.map((line, i) => (
        <text key={line} x="87" y={334 + i * 32} textAnchor="middle" fill="#f6f1e8" style={{ fontFamily: SANS, fontWeight: 600, fontSize: 28, letterSpacing: "-0.01em" }}>
          {line}
        </text>
      ))}
    </svg>
  );
}
