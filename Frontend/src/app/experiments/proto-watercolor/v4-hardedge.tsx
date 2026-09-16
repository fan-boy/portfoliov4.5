/* THROWAWAY — variant 4.
   HARD EDGE — crisp flat washes, no bleed. The architectural-rendering
   tradition: a wash is laid, allowed to dry completely, and the next is laid
   beside it. The edge where it dried is the drawing.

   This is the direct answer to "the buildings look like flat cardboard" —
   the flatness stays, but becomes the point, and the interest moves into
   colour blocking and the dried edge. */
import type { CSSProperties } from 'react';
import { BloomMask } from './BloomMask';
import { ESB, ESB_SHADE, FAR, MID, FORE, bowPath, SKY_BLOOMS, FAR_BLOOMS, ESB_BLOOMS, MID_BLOOMS, FORE_BLOOMS } from './shared';

/* A deliberately short palette. A limited palette looks decided; a full one
   looks indecisive — and hard-edge work has nowhere to hide. */
const P = {
  sky: 'oklch(89% 0.062 228)',
  skyBand: 'oklch(94% 0.042 210)',
  glow: 'oklch(95% 0.037 74)',
  paleCool: 'oklch(86% 0.036 262)',
  lit: 'oklch(87% 0.07 72)',
  litDeep: 'oklch(78% 0.085 58)',
  shade: 'oklch(60% 0.08 278)',
  deep: 'oklch(48% 0.075 284)',
  edge: 'oklch(42% 0.06 280)',
};

const BOW = [
  'oklch(66% 0.185 27)',
  'oklch(77% 0.16 64)',
  'oklch(88% 0.145 98)',
  'oklch(71% 0.16 150)',
  'oklch(62% 0.16 246)',
  'oklch(54% 0.15 292)',
];

export default function HardEdge() {
  return (
    <svg
      className="proto-canvas"
      viewBox="0 0 1200 820"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Hard-edge watercolor of the Empire State Building beneath a rainbow, flat crisp washes in a limited palette."
    >
      <defs>
        <filter id="w4-soft-70" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="70" />
        </filter>
        <filter id="w4-soft-40" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="40" />
        </filter>

        {/*
          No displacement, no edge blur — that is the whole discipline here.
          The only filter is granulation INSIDE the shape: alpha modulated by
          noise, so a flat wash still reads as pigment sitting in paper
          rather than as a vector fill. The boundary stays razor sharp.
        */}
        <filter id="w4-flat" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.36" numOctaves={4} seed={91} result="g" />
          <feColorMatrix
            in="g"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.2 0.2 0.2 0 0.56"
            result="gA"
          />
          <feComposite in="SourceGraphic" in2="gA" operator="in" />
        </filter>

        <filter id="w4-paper" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves={4} seed={37} result="t" />
          <feColorMatrix in="t" type="saturate" values="0" />
        </filter>

        <linearGradient id="w4-sky" x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" stopColor={P.sky} />
          <stop offset="55%" stopColor={P.skyBand} />
          <stop offset="100%" stopColor={P.glow} />
        </linearGradient>

        <linearGradient id="w4-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="20%" stopColor="#fff" stopOpacity="1" />
          <stop offset="62%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="w4-m-bow" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="820">
          <rect width="1200" height="820" fill="url(#w4-fade)" />
        </mask>

        <BloomMask id="w4-m-sky" blurId="w4-soft-70" blooms={SKY_BLOOMS} />
        <BloomMask id="w4-m-far" blurId="w4-soft-40" blooms={FAR_BLOOMS} />
        <BloomMask id="w4-m-esb" blurId="w4-soft-40" blooms={ESB_BLOOMS} />
        <BloomMask id="w4-m-mid" blurId="w4-soft-40" blooms={MID_BLOOMS} />
        <BloomMask id="w4-m-fore" blurId="w4-soft-40" blooms={FORE_BLOOMS} />
      </defs>

      {/* Sky as flat graded bands with hard divisions — the sheet is tilted
          and each pass of the brush leaves a visible line. */}
      <g mask="url(#w4-m-sky)">
        <g
          className="wc-layer"
          filter="url(#w4-flat)"
          style={{ '--wc-delay': '0.25s', '--wc-dur': '1.8s', '--wc-final': 0.95 } as CSSProperties}
        >
          <rect x="30" y="30" width="1140" height="712" fill="url(#w4-sky)" />
          <rect x="30" y="30" width="1140" height="126" fill={P.sky} opacity={0.42} />
          <rect x="30" y="392" width="1140" height="104" fill={P.glow} opacity={0.4} />
        </g>
      </g>

      {/* Clean flat bands, still fading before the horizon so it stays a
          rainbow rather than an arch. */}
      <g mask="url(#w4-m-bow)" style={{ opacity: 'var(--proto-rainbow, 1)' }}>
        <g style={{ mixBlendMode: 'multiply' }} filter="url(#w4-flat)">
          {BOW.map((c, i) => {
            const r = 600 - i * 17;
            return (
              <path
                key={c}
                className="wc-ink-stroke"
                d={bowPath(r)}
                fill="none"
                stroke={c}
                strokeWidth={17}
                opacity={0.22}
                style={{ '--wc-len': Math.round(Math.PI * r), '--wc-delay': `${1.15 + i * 0.12}s` } as CSSProperties}
              />
            );
          })}
        </g>
      </g>

      <g mask="url(#w4-m-far)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w4-flat)"
          style={{ '--wc-delay': '2.1s', '--wc-dur': '1.3s', '--wc-final': 0.72 } as CSSProperties}
        >
          {FAR.map((b) => (
            <rect key={b.x} x={b.x} y={b.top} width={b.w} height={742 - b.top} fill={P.paleCool} />
          ))}
        </g>
      </g>

      {/* The tower: three flat planes, no gradient between them. The lit
          face, the shadowed face, and a dried edge down the ridge. */}
      <g mask="url(#w4-m-esb)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w4-flat)"
          style={{ '--wc-delay': '3s', '--wc-dur': '1.7s', '--wc-final': 0.97 } as CSSProperties}
        >
          <path d={ESB} fill={P.lit} />
          <path d={ESB_SHADE} fill={P.shade} opacity={0.78} />
          {/* Where two washes met and dried, pigment pooled into a line */}
          <path d={ESB} fill="none" stroke={P.edge} strokeWidth={1.6} opacity={0.5} />
          <rect x={432} y={452} width={137} height={7} fill={P.edge} opacity={0.34} />
          <rect x={402} y={512} width={206} height={7} fill={P.edge} opacity={0.3} />
          <rect x={375} y={592} width={263} height={7} fill={P.edge} opacity={0.26} />
        </g>
      </g>

      <g mask="url(#w4-m-mid)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w4-flat)"
          style={{ '--wc-delay': '4.2s', '--wc-dur': '1.3s', '--wc-final': 0.86 } as CSSProperties}
        >
          {MID.map((b) => (
            <g key={b.x}>
              <rect x={b.x} y={b.top} width={b.w} height={742 - b.top} fill={b.warm ? P.litDeep : P.shade} />
              <rect x={b.x} y={b.top} width={b.w} height={3} fill={P.edge} opacity={0.3} />
            </g>
          ))}
        </g>
      </g>

      <g mask="url(#w4-m-fore)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w4-flat)"
          style={{ '--wc-delay': '5s', '--wc-dur': '1.2s', '--wc-final': 0.9 } as CSSProperties}
        >
          {FORE.map((b) => (
            <rect key={b.x} x={b.x} y={b.top} width={b.w} height={742 - b.top} fill={P.deep} />
          ))}
        </g>
      </g>

      <rect
        width="1200"
        height="820"
        filter="url(#w4-paper)"
        style={{ mixBlendMode: 'multiply', opacity: 'var(--proto-grain, 0.3)' }}
      />
    </svg>
  );
}
