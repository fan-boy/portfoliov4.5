'use client'
import React from "react";

/**
 * Marine Drive at night, as seen sitting on the parapet: the Queen's Necklace
 * sweeping from the far end of the bay right up to you, the city low along
 * the horizon, the moon over the sea, traffic on the road, people on the wall.
 * All SVG; the movement (lights coming on far to near, traffic, shimmer on
 * the water, stars) is CSS in mumbai.css.
 *
 * Everything is computed once at module load and rounded, so the server and
 * the browser draw exactly the same numbers.
 */

const W = 1600;
const H = 900;
const HORIZON = 512;
const r1 = (v: number) => Math.round(v * 10) / 10;
/** Repeatable noise in 0..1, rounded so server and browser agree. */
const noise = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return Math.round((s - Math.floor(s)) * 1000) / 1000;
};

/* The road: from the far end of the bay, along the horizon, then round towards you. */
const ROAD = { p0: [-40, 520], p1: [700, 518], p2: [1250, 540], p3: [1680, 700] } as const;
const ROAD_PATH = `M ${ROAD.p0} C ${ROAD.p1} ${ROAD.p2} ${ROAD.p3}`;
const road = (t: number) => {
  const m = 1 - t;
  const pt = (i: 0 | 1) => m ** 3 * ROAD.p0[i] + 3 * m ** 2 * t * ROAD.p1[i] + 3 * m * t ** 2 * ROAD.p2[i] + t ** 3 * ROAD.p3[i];
  return { x: pt(0), y: pt(1) };
};

/** The parapet: the sea wall you're sitting on, its top edge rising gently to the right. */
const WALL_L = { x: 380, y: H };
const WALL_R = { x: 1600, y: 770 };
const wallY = (x: number) => WALL_L.y - ((x - WALL_L.x) * (WALL_L.y - WALL_R.y)) / (WALL_R.x - WALL_L.x);
/** Its flat concrete top, a band along the edge, then the dark face below. */
const WALL_TOP = `M ${WALL_L.x} ${WALL_L.y} L ${WALL_R.x} ${WALL_R.y} L ${WALL_R.x} ${WALL_R.y + 18} L ${WALL_L.x + 60} ${H} Z`;
const WALL_FACE = `M ${WALL_L.x + 60} ${H} L ${WALL_R.x} ${WALL_R.y + 18} L ${WALL_R.x} ${H} Z`;

/**
 * The lamps. `u` runs far to near; spacing and size grow with it, which is
 * what makes the necklace read as a curve coming towards you.
 */
const LAMPS = Array.from({ length: 84 }, (_, i) => {
  const u = i / 83;
  const t = 0.04 + 0.9 * u ** 1.9;
  const { x, y } = road(t);
  const size = 0.7 + 7 * u ** 2.2;
  // Only reflect where there's water under the lamp, not the wall.
  const overWater = u > 0.22 && y < wallY(x) - 24;
  return {
    x: r1(x),
    y: r1(y - 2 - size * 2),
    // The far side of the road: a second row, a touch higher.
    x2: r1(x - size * 0.4),
    y2: r1(y - 4 - size * 3.2),
    r: r1(size),
    delay: r1(u * 1.8),
    // Broken glints on the water below the lamp, more and wider the nearer it is.
    glints: overWater
      ? Array.from({ length: 2 + Math.floor(u * 5) }, (_, k) => {
          const gy = y + size * 2 + 6 + k * (5 + u * 13);
          const gw = size * (2.2 - k * 0.22) + noise(i * 9 + k) * size;
          return { x: r1(x - gw / 2 + (noise(i * 3 + k) - 0.5) * size), y: r1(gy), w: r1(Math.max(1, gw)), h: r1(1 + u * 1.6) };
        }).filter((gl) => gl.y < wallY(x) - 6)
      : [],
    shimmer: r1(noise(i) * 3),
  };
});

/** The city along the horizon. The Nariman Point towers stand up at the far left. */
const BUILDINGS = Array.from({ length: 70 }, (_, i) => {
  const t = 0.02 + (i / 69) * 0.62;
  const { x, y } = road(t);
  const near = t / 0.64;
  const w = 10 + near * 22 + noise(i) * 10;
  const towers = x < 300 ? 40 + noise(i + 7) * 70 : 0;
  const h = 6 + near * 30 + noise(i + 31) * (12 + near * 26) + towers;
  const windows = Array.from({ length: Math.max(0, Math.floor(h / 7)) }, (_, k) => ({
    lit: noise(i * 17 + k) > 0.74,
    wx: r1(x + 2 + noise(i * 5 + k) * Math.max(1, w - 5)),
    wy: r1(y - 10 - h + 4 + k * 7),
  })).filter((win) => win.lit);
  return { x: r1(x), y: r1(y - 8 - h), w: r1(w), h: r1(h + 10), windows };
});

/** Sitting on the wall's top edge. */
const PEOPLE = [
  { x: 1290, s: 1 },
  { x: 1338, s: 1.06 },
  { x: 1478, s: 1.1 },
].map((p) => ({ ...p, y: r1(wallY(p.x) + 2) }));

const STARS = Array.from({ length: 46 }, (_, i) => ({
  x: r1(noise(i + 200) * W),
  y: r1(noise(i + 400) * (HORIZON - 160)),
  r: r1(0.6 + noise(i + 600) * 0.9),
  delay: r1(noise(i + 800) * 5),
}));

const MOON = { x: 1060, y: 168, r: 24 };
/** Broken moonlight on the water: from just below the road down to the wall, wider and sparser towards you. */
const MOON_ROAD_Y = road(0.62).y;
const MOONLIGHT = Array.from({ length: 16 }, (_, i) => {
  const y = MOON_ROAD_Y + 26 + i * i * 0.8 + i * 6;
  const w = 6 + i * 3.4 + noise(i + 50) * 10;
  return { x: r1(MOON.x - w / 2 + (noise(i + 70) - 0.5) * (6 + i * 2)), y: r1(y), w: r1(w), delay: r1(noise(i + 90) * 3) };
}).filter((b) => b.y < wallY(MOON.x) - 10);

export default function MarineDriveArt({ lit }: { lit: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`md-art absolute inset-0 h-full w-full ${lit ? "is-lit" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="md-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#060a15" />
          <stop offset="0.38" stopColor="#0d1530" />
          <stop offset="0.53" stopColor="#2a2238" />
          <stop offset="0.575" stopColor="#5a3826" />
          <stop offset="0.6" stopColor="#0b1222" />
          <stop offset="1" stopColor="#050912" />
        </linearGradient>
        {/* Sodium haze over the city. */}
        <radialGradient id="md-haze" cx="0.4" cy="0.57" r="0.6" gradientTransform="scale(1 0.32) translate(0 1.2)">
          <stop offset="0" stopColor="#ff9a3c" stopOpacity="0.32" />
          <stop offset="1" stopColor="#ff9a3c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="md-moonglow">
          <stop offset="0.3" stopColor="#fff6dc" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff6dc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="md-moon" cx="0.42" cy="0.4">
          <stop offset="0" stopColor="#fffdf3" />
          <stop offset="0.7" stopColor="#f3ead2" />
          <stop offset="1" stopColor="#d9cfb5" />
        </radialGradient>
        <linearGradient id="md-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2a2e" />
          <stop offset="0.06" stopColor="#141418" />
          <stop offset="1" stopColor="#07070a" />
        </linearGradient>
        <filter id="md-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="md-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Sky and sea in one sweep, then the haze. */}
      <rect width={W} height={H} fill="url(#md-sky)" />
      <rect width={W} height={H} fill="url(#md-haze)" />

      {STARS.map((s, i) => (
        <circle key={i} className="md-star" cx={s.x} cy={s.y} r={s.r} fill="#e8eefc" style={{ animationDelay: `${s.delay}s` }} />
      ))}

      {/* The moon, with its halo. */}
      <circle cx={MOON.x} cy={MOON.y} r={MOON.r * 5} fill="url(#md-moonglow)" />
      <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill="url(#md-moon)" />
      <circle cx={MOON.x - 7} cy={MOON.y + 4} r="5" fill="#d8ceb4" opacity="0.5" />
      <circle cx={MOON.x + 8} cy={MOON.y - 7} r="3.5" fill="#d8ceb4" opacity="0.4" />

      {/* The city. */}
      {BUILDINGS.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="#0f1526" />
          {b.windows.map((w, k) => (
            <rect key={k} className="md-window" x={w.wx} y={w.wy} width="2.4" height="2.8" fill="#f6cf86" style={{ transitionDelay: `${1.2 + noise(i + k) * 1.4}s` }} />
          ))}
        </g>
      ))}

      {/* Broken moonlight on the water. */}
      {MOONLIGHT.map((b, i) => (
        <rect key={i} className="md-moonlight" x={b.x} y={b.y} width={b.w} height="2.2" rx="1.1" fill="#fff3d0" style={{ animationDelay: `${b.delay}s` }} />
      ))}

      {/* Traffic: headlights coming, tail lights going. */}
      <path d={ROAD_PATH} pathLength={1000} className="md-traffic md-traffic-white" fill="none" />
      <path d={ROAD_PATH} pathLength={1000} className="md-traffic md-traffic-red" fill="none" />

      {/* The necklace: lamps, their glow, their reflections. Far ones come on first. */}
      {LAMPS.map((l, i) => (
        <g key={i} className="md-lamp" style={{ transitionDelay: `${l.delay}s` }}>
          {l.glints.map((gl, k) => (
            <rect
              key={k}
              className="md-reflection"
              x={gl.x}
              y={gl.y}
              width={gl.w}
              height={gl.h}
              rx={gl.h / 2}
              fill="#ffb760"
              filter="url(#md-soft)"
              style={{ animationDelay: `${r1(l.shimmer + k * 0.4)}s` }}
            />
          ))}
          <circle cx={l.x} cy={l.y} r={l.r * 3.4} fill="#ffb35a" opacity="0.32" filter="url(#md-glow)" />
          <circle cx={l.x} cy={l.y} r={l.r} fill="#ffe7b8" />
          <circle cx={l.x2} cy={l.y2} r={l.r * 0.7} fill="#ffd796" opacity="0.8" />
        </g>
      ))}

      {/* The parapet, and the people on it. */}
      <path d={WALL_TOP} fill="#34302d" />
      <path d={WALL_FACE} fill="url(#md-wall)" />
      <path d={`M ${WALL_L.x} ${WALL_L.y} L ${WALL_R.x} ${WALL_R.y}`} stroke="#57504a" strokeWidth="1.5" fill="none" />
      {/* People on the wall, against the lights: a couple close together, someone on their own further along. */}
      <g fill="#040509">
        {PEOPLE.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
            <circle cx="0" cy="-86" r="13" />
            <path d="M-6 -74 L6 -74 L7 -68 C22 -64 28 -50 28 -30 L30 0 L-30 0 L-28 -30 C-28 -50 -22 -64 -7 -68 Z" />
          </g>
        ))}
      </g>
    </svg>
  );
}
