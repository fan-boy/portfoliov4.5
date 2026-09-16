/* THROWAWAY — variant 3.
   BLOOM — edge dissolution. Wet-in-wet taken to its end: almost nothing has
   a boundary. The tower is the only thing that resolves, and only just.
   Nearly abstract; the subject is the water, not the architecture. */
import type { CSSProperties } from 'react';
import { BloomMask } from './BloomMask';
import { ESB, ESB_SHADE, FAR, MID, FORE, bowPath, SKY_BLOOMS, ESB_BLOOMS, MID_BLOOMS } from './shared';

const P = {
  skyTop: 'oklch(80% 0.085 244)',
  skyMid: 'oklch(90% 0.05 224)',
  glow: 'oklch(93% 0.055 72)',
  cool: 'oklch(68% 0.075 272)',
  warm: 'oklch(72% 0.08 52)',
  deep: 'oklch(54% 0.085 280)',
};

const BOW = [
  'oklch(66% 0.18 25)',
  'oklch(78% 0.155 68)',
  'oklch(88% 0.145 100)',
  'oklch(72% 0.155 152)',
  'oklch(62% 0.16 248)',
];

export default function BloomVariant({ bleed }: { bleed: number }) {
  return (
    <svg
      className="proto-canvas"
      viewBox="0 0 1200 820"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Wet-in-wet watercolor of the Empire State Building beneath a rainbow, edges dissolved into soft blooms of pigment."
    >
      <defs>
        <filter id="w3-soft-80" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="80" />
        </filter>
        <filter id="w3-soft-50" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="50" />
        </filter>

        {/* Paper flooded with water before pigment touches it: a heavy blur,
            a large displacement, and no edge treatment at all. */}
        <filter id="w3-flood" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="soft" />
          <feTurbulence type="fractalNoise" baseFrequency="0.007" numOctaves={5} seed={61} result="n" />
          <feDisplacementMap
            in="soft"
            in2="n"
            scale={bleed * 2.6}
            xChannelSelector="R"
            yChannelSelector="G"
            result="warp"
          />
          <feTurbulence type="fractalNoise" baseFrequency="0.3" numOctaves={4} seed={71} result="g" />
          <feColorMatrix
            in="g"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.36 0.36 0.36 0 0.3"
            result="gA"
          />
          <feComposite in="warp" in2="gA" operator="in" />
        </filter>

        {/* The tower gets slightly less water, so it is the one thing that
            almost holds a shape. Hierarchy survives the dissolution. */}
        <filter id="w3-form" x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="soft" />
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves={4} seed={53} result="n" />
          <feDisplacementMap
            in="soft"
            in2="n"
            scale={bleed * 1.5}
            xChannelSelector="R"
            yChannelSelector="G"
            result="warp"
          />
          <feTurbulence type="fractalNoise" baseFrequency="0.34" numOctaves={3} seed={47} result="g" />
          <feColorMatrix
            in="g"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.3 0.3 0.3 0 0.42"
            result="gA"
          />
          <feComposite in="warp" in2="gA" operator="in" />
        </filter>

        <filter id="w3-paper" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves={4} seed={13} result="t" />
          <feColorMatrix in="t" type="saturate" values="0" />
        </filter>

        <radialGradient id="w3-sky" cx="0.32" cy="0.18" r="0.95">
          <stop offset="0%" stopColor={P.skyMid} />
          <stop offset="55%" stopColor={P.skyTop} />
          <stop offset="100%" stopColor={P.glow} />
        </radialGradient>

        <BloomMask id="w3-m-sky" blurId="w3-soft-80" blooms={SKY_BLOOMS} />
        <BloomMask id="w3-m-esb" blurId="w3-soft-50" blooms={ESB_BLOOMS} />
        <BloomMask id="w3-m-mass" blurId="w3-soft-50" blooms={MID_BLOOMS} />
      </defs>

      <g mask="url(#w3-m-sky)" className="wc-damp">
        <g
          className="wc-layer"
          filter="url(#w3-flood)"
          style={{ '--wc-delay': '0.25s', '--wc-dur': '2.2s', '--wc-final': 0.9 } as CSSProperties}
        >
          <rect x="40" y="36" width="1120" height="700" fill="url(#w3-sky)" />
          {/* Pigment dropped into standing water and left alone */}
          <ellipse cx="280" cy="220" rx="230" ry="130" fill={P.skyTop} opacity={0.5} />
          <ellipse cx="900" cy="180" rx="260" ry="120" fill={P.cool} opacity={0.3} />
          <ellipse cx="640" cy="400" rx="340" ry="110" fill={P.glow} opacity={0.6} />
          <ellipse cx="1040" cy="330" rx="200" ry="140" fill={P.warm} opacity={0.32} />
          <ellipse cx="170" cy="470" rx="240" ry="120" fill={P.glow} opacity={0.45} />
        </g>
      </g>

      {/* The rainbow bleeds into the sky rather than sitting on it: very wide
          strokes, very low opacity, blurred until the bands stop being bands. */}
      <g style={{ opacity: 'var(--proto-rainbow, 1)' }}>
        <g style={{ mixBlendMode: 'multiply', filter: 'blur(22px)' }}>
          {BOW.map((c, i) => {
            const r = 590 - i * 30;
            return (
              <path
                key={c}
                className="wc-ink-stroke"
                d={bowPath(r)}
                fill="none"
                stroke={c}
                strokeWidth={34}
                strokeLinecap="round"
                opacity={0.17}
                style={{ '--wc-len': Math.round(Math.PI * r), '--wc-delay': `${1.1 + i * 0.16}s` } as CSSProperties}
              />
            );
          })}
        </g>
      </g>

      {/* Skyline as one continuous mass of pigment, not as buildings */}
      <g mask="url(#w3-m-mass)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w3-flood)"
          style={{ '--wc-delay': '2.3s', '--wc-dur': '1.9s', '--wc-final': 0.66 } as CSSProperties}
        >
          {FAR.map((b) => (
            <rect key={`f${b.x}`} x={b.x} y={b.top} width={b.w} height={742 - b.top} fill={P.cool} opacity={0.55} />
          ))}
          {MID.map((b) => (
            <rect
              key={`m${b.x}`}
              x={b.x}
              y={b.top}
              width={b.w}
              height={742 - b.top}
              fill={b.warm ? P.warm : P.cool}
              opacity={0.8}
            />
          ))}
          {FORE.map((b) => (
            <rect key={`o${b.x}`} x={b.x} y={b.top} width={b.w} height={742 - b.top} fill={P.deep} opacity={0.7} />
          ))}
        </g>
      </g>

      {/* The one thing that resolves */}
      <g mask="url(#w3-m-esb)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w3-form)"
          style={{ '--wc-delay': '3.2s', '--wc-dur': '2.2s', '--wc-final': 0.82 } as CSSProperties}
        >
          <path d={ESB} fill={P.warm} />
          <path d={ESB_SHADE} fill={P.deep} opacity={0.6} />
        </g>
      </g>

      <rect
        width="1200"
        height="820"
        filter="url(#w3-paper)"
        style={{ mixBlendMode: 'multiply', opacity: 'var(--proto-grain, 0.3)' }}
      />
    </svg>
  );
}
