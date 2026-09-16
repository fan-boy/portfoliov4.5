/* THROWAWAY — variant 1.
   WASH — soft atmospheric realism. The current implementation, unchanged,
   so every other direction is measured against something real. */
import type { CSSProperties } from 'react';
import { BloomMask } from './BloomMask';
import {
  CX,
  ESB,
  ESB_SHADE,
  FAR,
  MID,
  FORE,
  bowPath,
  SKY_BLOOMS,
  FAR_BLOOMS,
  ESB_BLOOMS,
  MID_BLOOMS,
  FORE_BLOOMS,
} from './shared';

const P = {
  skyTop: 'oklch(84.5% 0.062 242)',
  skyMid: 'oklch(92% 0.036 226)',
  skyHorizon: 'oklch(95% 0.037 74)',
  far: 'oklch(85% 0.03 266)',
  midCool: 'oklch(76% 0.042 264)',
  midWarm: 'oklch(78% 0.045 66)',
  esbLit: 'oklch(82.5% 0.055 68)',
  esbShade: 'oklch(63% 0.062 276)',
  foreCool: 'oklch(58% 0.058 282)',
  foreWarm: 'oklch(60% 0.062 44)',
  ink: 'oklch(43% 0.05 276)',
};

const BOW = [
  'oklch(66% 0.17 27)',
  'oklch(76% 0.15 62)',
  'oklch(88% 0.14 96)',
  'oklch(72% 0.15 146)',
  'oklch(64% 0.15 242)',
  'oklch(56% 0.14 288)',
];

export default function Wash({ bleed }: { bleed: number }) {
  return (
    <svg
      className="proto-canvas"
      viewBox="0 0 1200 820"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Watercolor painting of the Empire State Building beneath a faint rainbow, in soft atmospheric washes."
    >
      <defs>
        <filter id="w1-soft-70" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="70" />
        </filter>
        <filter id="w1-soft-40" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="40" />
        </filter>

        {/* Blur BEFORE displacing: a displaced hard edge is a zigzag, a
            displaced soft edge is the feathered boundary a loaded brush
            leaves on damp paper. */}
        <filter id="w1-wash" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="soft" />
          <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves={4} seed={7} result="n" />
          <feDisplacementMap
            in="soft"
            in2="n"
            scale={bleed * 1.6}
            xChannelSelector="R"
            yChannelSelector="G"
            result="warp"
          />
          {/* Modulating ALPHA with fine noise is granulation — pigment
              settling unevenly into the tooth of the paper. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.42" numOctaves={3} seed={13} result="g" />
          <feColorMatrix
            in="g"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.26 0.26 0.26 0 0.44"
            result="gA"
          />
          <feComposite in="warp" in2="gA" operator="in" />
        </filter>

        {/* Same, plus a wet edge: compositing against a blurred copy leaves
            the darker rim where pigment pools and dries. */}
        <filter id="w1-edge" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="soft" />
          <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves={4} seed={19} result="n" />
          <feDisplacementMap
            in="soft"
            in2="n"
            scale={bleed * 0.73}
            xChannelSelector="R"
            yChannelSelector="G"
            result="warp"
          />
          <feGaussianBlur in="warp" stdDeviation={3} result="halo" />
          <feComposite in="warp" in2="halo" operator="arithmetic" k1="0" k2="1.18" k3="-0.2" k4="0.01" result="rim" />
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves={3} seed={5} result="g2" />
          <feColorMatrix
            in="g2"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.22 0.22 0.22 0 0.52"
            result="g2A"
          />
          <feComposite in="rim" in2="g2A" operator="in" />
        </filter>

        <filter id="w1-paper" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves={4} seed={23} result="t" />
          <feColorMatrix in="t" type="saturate" values="0" />
        </filter>

        <linearGradient id="w1-sky" x1="0.15" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={P.skyTop} />
          <stop offset="46%" stopColor={P.skyMid} />
          <stop offset="82%" stopColor={P.skyHorizon} />
          <stop offset="100%" stopColor={P.skyHorizon} />
        </linearGradient>

        {/* A rainbow is atmosphere, not an object: gone before the ground. */}
        <linearGradient id="w1-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="16%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="44%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="72%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="w1-m-bow" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="820">
          <rect width="1200" height="820" fill="url(#w1-fade)" />
        </mask>

        <BloomMask id="w1-m-sky" blurId="w1-soft-70" blooms={SKY_BLOOMS} />
        <BloomMask id="w1-m-far" blurId="w1-soft-40" blooms={FAR_BLOOMS} />
        <BloomMask id="w1-m-esb" blurId="w1-soft-40" blooms={ESB_BLOOMS} />
        <BloomMask id="w1-m-mid" blurId="w1-soft-40" blooms={MID_BLOOMS} />
        <BloomMask id="w1-m-fore" blurId="w1-soft-40" blooms={FORE_BLOOMS} />
      </defs>

      {/* Sky, inset from the sheet edge so bare paper frames the painting */}
      <g mask="url(#w1-m-sky)" className="wc-damp">
        <g
          className="wc-layer"
          filter="url(#w1-wash)"
          style={{ '--wc-delay': '0.25s', '--wc-dur': '2s', '--wc-final': 0.94 } as CSSProperties}
        >
          <rect x="26" y="24" width="1148" height="722" fill="url(#w1-sky)" />
          <ellipse cx="300" cy="200" rx="210" ry="96" fill={P.skyTop} opacity={0.3} />
          <ellipse cx="880" cy="150" rx="250" ry="84" fill={P.skyTop} opacity={0.24} />
          <ellipse cx="620" cy="330" rx="300" ry="70" fill="oklch(97% 0.02 80)" opacity={0.5} />
          <ellipse cx="1020" cy="420" rx="220" ry="90" fill={P.skyHorizon} opacity={0.45} />
        </g>
      </g>

      <g mask="url(#w1-m-bow)" style={{ opacity: 'var(--proto-rainbow, 1)' }}>
        <g style={{ mixBlendMode: 'multiply', filter: 'blur(2.5px)' }}>
          {BOW.map((c, i) => {
            const r = 604 - i * 15;
            return (
              <path
                key={c}
                className="wc-ink-stroke"
                d={bowPath(r)}
                fill="none"
                stroke={c}
                strokeWidth={15}
                strokeLinecap="round"
                opacity={0.16}
                style={{ '--wc-len': Math.round(Math.PI * r), '--wc-delay': `${1.15 + i * 0.13}s` } as CSSProperties}
              />
            );
          })}
        </g>
      </g>

      <g mask="url(#w1-m-far)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w1-edge)"
          style={{ '--wc-delay': '2.1s', '--wc-dur': '1.5s', '--wc-final': 0.62 } as CSSProperties}
        >
          {FAR.map((b) => (
            <rect key={b.x} x={b.x} y={b.top} width={b.w} height={742 - b.top} fill={P.far} />
          ))}
        </g>
      </g>

      <g mask="url(#w1-m-esb)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w1-edge)"
          style={{ '--wc-delay': '3s', '--wc-dur': '2s', '--wc-final': 0.92 } as CSSProperties}
        >
          <path d={ESB} fill={P.esbLit} />
          <path d={ESB_SHADE} fill={P.esbShade} opacity={0.62} />
          <rect x={432} y={452} width={137} height={10} fill={P.esbShade} opacity={0.38} />
          <rect x={402} y={512} width={206} height={9} fill={P.esbShade} opacity={0.32} />
          <rect x={375} y={592} width={263} height={9} fill={P.esbShade} opacity={0.26} />
        </g>
      </g>

      <g mask="url(#w1-m-mid)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w1-edge)"
          style={{ '--wc-delay': '4.3s', '--wc-dur': '1.5s', '--wc-final': 0.72 } as CSSProperties}
        >
          {MID.map((b) => (
            <rect
              key={b.x}
              x={b.x}
              y={b.top}
              width={b.w}
              height={742 - b.top}
              fill={b.warm ? P.midWarm : P.midCool}
            />
          ))}
        </g>
      </g>

      <g mask="url(#w1-m-fore)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w1-edge)"
          style={{ '--wc-delay': '5s', '--wc-dur': '1.4s', '--wc-final': 0.6 } as CSSProperties}
        >
          {FORE.map((b) => (
            <rect
              key={b.x}
              x={b.x}
              y={b.top}
              width={b.w}
              height={742 - b.top}
              fill={b.warm ? P.foreWarm : P.foreCool}
            />
          ))}
        </g>
      </g>

      <g stroke={P.ink} fill="none" strokeLinecap="round" opacity={0.34}>
        <path
          className="wc-ink-stroke"
          d={`M ${CX} 92 L ${CX} 190`}
          strokeWidth={2.2}
          style={{ '--wc-len': 100, '--wc-delay': '5.5s' } as CSSProperties}
        />
        {[490, 508, 526, 546].map((x, i) => (
          <path
            key={x}
            className="wc-ink-stroke"
            d={`M ${x} 256 L ${x} 444`}
            strokeWidth={1.2}
            style={{ '--wc-len': 190, '--wc-delay': `${5.6 + i * 0.08}s` } as CSSProperties}
          />
        ))}
      </g>

      <rect
        width="1200"
        height="820"
        filter="url(#w1-paper)"
        style={{ mixBlendMode: 'multiply', opacity: 'var(--proto-grain, 0.3)' }}
      />
    </svg>
  );
}
