'use client'
import React from "react";
import { motion } from "framer-motion";

/**
 * The station name board on a Mumbai suburban platform: an enamelled white
 * diamond, a red ring crossed by a blue bar with the name in English, and the
 * name in Devanagari above and below. Weathered at the edges, bolted on.
 *
 * When `play` turns true the ring draws itself round, the bar slides across,
 * then the lettering comes up.
 */

const RED = "#D3262C";
const BLUE = "#1F3F98";
const ENAMEL = "#F4F1E8";
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function StationDiamond({
  name,
  deva,
  play,
  instant,
}: {
  name: string;
  deva: string;
  play: boolean;
  instant: boolean;
}) {
  const t = (duration: number, delay: number) => (instant ? { duration: 0 } : { duration, delay, ease: EASE_OUT });
  const on = play || instant;
  return (
    // Remounting on skip lands every part at its end state straight away.
    <svg key={instant ? "done" : "drawing"} viewBox="0 0 400 400" className="block h-auto w-full overflow-visible" aria-hidden="true">
      <defs>
        {/* Grime and rust: noise tinted brown, strongest towards the edges. */}
        <filter id="sd-grime" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" />
          <feColorMatrix values="0 0 0 0 0.42  0 0 0 0 0.3  0 0 0 0 0.18  0 0 0 1.1 -0.45" />
        </filter>
        <filter id="sd-rust" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.32  0 0 0 0 0.14  0 0 0 2.4 -1.25" />
        </filter>
        <radialGradient id="sd-edge" cx="50%" cy="50%" r="60%">
          <stop offset="62%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#5a4126" stopOpacity="0.35" />
        </radialGradient>
        <clipPath id="sd-clip">
          <path d="M200 14 L386 200 L200 386 L14 200 Z" />
        </clipPath>
      </defs>

      {/* The board: enamel with a dark rolled edge, slightly rounded corners. */}
      <path d="M200 14 L386 200 L200 386 L14 200 Z" fill={ENAMEL} stroke="#3a3530" strokeWidth="7" strokeLinejoin="round" />

      {/* The ring. pathLength draws it round from the top. */}
      <motion.circle
        cx="200"
        cy="200"
        r="80"
        fill="none"
        stroke={RED}
        strokeWidth="19"
        transform="rotate(-90 200 200)"
        initial={false}
        animate={{ pathLength: on ? 1 : 0 }}
        transition={t(1, 0)}
      />

      {/* The bar, sliding in from the left. */}
      <motion.rect
        x="46"
        y="168"
        width="308"
        height="64"
        fill={BLUE}
        style={{ transformBox: "fill-box", transformOrigin: "0% 50%" }}
        initial={false}
        animate={{ scaleX: on ? 1 : 0 }}
        transition={t(0.55, 0.75)}
      />
      <motion.text
        x="200"
        y="216"
        textAnchor="middle"
        fill="#FFFFFF"
        style={{ fontFamily: "var(--font-sans), Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 46, letterSpacing: "0.01em" }}
        initial={false}
        animate={{ opacity: on ? 1 : 0 }}
        transition={t(0.35, 1.2)}
      >
        {name}
      </motion.text>

      {/* The name in Devanagari, above and below. */}
      {[
        { y: 104, delay: 1.35 },
        { y: 328, delay: 1.5 },
      ].map(({ y, delay }) => (
        <motion.text
          key={y}
          x="200"
          y={y}
          textAnchor="middle"
          fill={BLUE}
          style={{ fontFamily: 'var(--font-deva), "Kohinoor Devanagari", sans-serif', fontWeight: 700, fontSize: 38 }}
          initial={false}
          animate={{ opacity: on ? 1 : 0, y: on ? 0 : 6 }}
          transition={t(0.4, delay)}
        >
          {deva}
        </motion.text>
      ))}

      {/* Weathering over everything, kept inside the board. */}
      <g clipPath="url(#sd-clip)" pointerEvents="none">
        <rect width="400" height="400" fill="url(#sd-edge)" />
        <rect width="400" height="400" filter="url(#sd-rust)" opacity="0.3" />
        <rect width="400" height="400" filter="url(#sd-grime)" opacity="0.35" />
      </g>

      {/* Bolts at the top and bottom points, where it's fixed to the pillar. */}
      {[44, 356].map((y) => (
        <g key={y}>
          <circle cx="200" cy={y} r="7" fill="#8d877a" stroke="#4a4540" strokeWidth="1.5" />
          <circle cx="198" cy={y - 2} r="2.2" fill="#d8d2c4" />
        </g>
      ))}
    </svg>
  );
}
