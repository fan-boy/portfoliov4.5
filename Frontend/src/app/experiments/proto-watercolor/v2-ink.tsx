/* THROWAWAY — variant 2.
   INK & WASH — line-led. The urban-sketch tradition: confident pen carries
   the drawing, colour is laid loosely and deliberately misses the lines.
   The offset between line and wash is the whole look. */
import type { CSSProperties } from 'react';
import { BloomMask } from './BloomMask';
import { CX, ESB, FAR, MID, FORE, bowPath, SKY_BLOOMS, FAR_BLOOMS, ESB_BLOOMS, MID_BLOOMS } from './shared';

const P = {
  ink: 'oklch(31% 0.045 268)',
  skyWash: 'oklch(88% 0.055 235)',
  warmWash: 'oklch(84% 0.06 62)',
  coolWash: 'oklch(78% 0.05 268)',
  deepWash: 'oklch(64% 0.07 274)',
};

const BOW = [
  'oklch(64% 0.18 27)',
  'oklch(76% 0.16 62)',
  'oklch(87% 0.15 96)',
  'oklch(70% 0.16 146)',
  'oklch(62% 0.16 244)',
];

/** Every rect becomes four pen strokes; the missing fourth side is the ground. */
function blockLines(b: { x: number; w: number; top: number }) {
  return `M ${b.x} 742 L ${b.x} ${b.top} L ${b.x + b.w} ${b.top} L ${b.x + b.w} 742`;
}

export default function Ink({ bleed }: { bleed: number }) {
  return (
    <svg
      className="proto-canvas"
      viewBox="0 0 1200 820"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Ink and wash drawing of the Empire State Building beneath a rainbow, pen linework with loose colour."
    >
      <defs>
        <filter id="w2-soft-70" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="70" />
        </filter>
        <filter id="w2-soft-40" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="40" />
        </filter>

        {/* Loose colour: heavily softened, strongly displaced, low opacity.
            It is meant to sit beside the drawing, not inside it. */}
        <filter id="w2-wash" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="soft" />
          <feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves={4} seed={31} result="n" />
          <feDisplacementMap
            in="soft"
            in2="n"
            scale={bleed * 2.1}
            xChannelSelector="R"
            yChannelSelector="G"
            result="warp"
          />
          <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves={3} seed={17} result="g" />
          <feColorMatrix
            in="g"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.3 0.3 0.3 0 0.38"
            result="gA"
          />
          <feComposite in="warp" in2="gA" operator="in" />
        </filter>

        {/* The pen. A small displacement gives the waver of a hand-held
            nib; without it the lines read as CAD output. */}
        <filter id="w2-pen" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.021" numOctaves={3} seed={41} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={3.4} xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="w2-paper" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={4} seed={29} result="t" />
          <feColorMatrix in="t" type="saturate" values="0" />
        </filter>

        <linearGradient id="w2-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="18%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="52%" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="w2-m-bow" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="820">
          <rect width="1200" height="820" fill="url(#w2-fade)" />
        </mask>

        <BloomMask id="w2-m-sky" blurId="w2-soft-70" blooms={SKY_BLOOMS} />
        <BloomMask id="w2-m-far" blurId="w2-soft-40" blooms={FAR_BLOOMS} />
        <BloomMask id="w2-m-esb" blurId="w2-soft-40" blooms={ESB_BLOOMS} />
        <BloomMask id="w2-m-mid" blurId="w2-soft-40" blooms={MID_BLOOMS} />
      </defs>

      {/* Sky: a single loose swipe across the top third, nowhere near the
          edges. The paper does most of the work in this tradition. */}
      <g mask="url(#w2-m-sky)">
        <g
          className="wc-layer"
          filter="url(#w2-wash)"
          style={{ '--wc-delay': '0.25s', '--wc-dur': '1.8s', '--wc-final': 0.62 } as CSSProperties}
        >
          <ellipse cx="420" cy="210" rx="430" ry="180" fill={P.skyWash} />
          <ellipse cx="900" cy="170" rx="340" ry="150" fill={P.skyWash} opacity={0.8} />
          <ellipse cx="700" cy="380" rx="420" ry="110" fill={P.warmWash} opacity={0.5} />
        </g>
      </g>

      {/* Rainbow as five gestural swipes, not bands */}
      <g mask="url(#w2-m-bow)" style={{ opacity: 'var(--proto-rainbow, 1)' }}>
        <g style={{ mixBlendMode: 'multiply', filter: 'blur(4px)' }}>
          {BOW.map((c, i) => {
            const r = 596 - i * 19;
            return (
              <path
                key={c}
                className="wc-ink-stroke"
                d={bowPath(r)}
                fill="none"
                stroke={c}
                strokeWidth={19}
                strokeLinecap="round"
                opacity={0.2}
                style={{ '--wc-len': Math.round(Math.PI * r), '--wc-delay': `${1.1 + i * 0.14}s` } as CSSProperties}
              />
            );
          })}
        </g>
      </g>

      {/* Colour first, offset down-left from where the lines will land */}
      <g mask="url(#w2-m-far)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w2-wash)"
          transform="translate(-9 7)"
          style={{ '--wc-delay': '2.1s', '--wc-dur': '1.4s', '--wc-final': 0.42 } as CSSProperties}
        >
          {FAR.map((b) => (
            <rect key={b.x} x={b.x} y={b.top} width={b.w} height={742 - b.top} fill={P.coolWash} />
          ))}
        </g>
      </g>

      <g mask="url(#w2-m-esb)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w2-wash)"
          transform="translate(-11 8)"
          style={{ '--wc-delay': '2.9s', '--wc-dur': '1.7s', '--wc-final': 0.58 } as CSSProperties}
        >
          <path d={ESB} fill={P.warmWash} />
          <path d={ESB} fill={P.deepWash} opacity={0.42} transform="translate(22 0)" />
        </g>
      </g>

      <g mask="url(#w2-m-mid)" style={{ mixBlendMode: 'multiply' }}>
        <g
          className="wc-layer"
          filter="url(#w2-wash)"
          transform="translate(-8 6)"
          style={{ '--wc-delay': '3.9s', '--wc-dur': '1.4s', '--wc-final': 0.5 } as CSSProperties}
        >
          {MID.map((b) => (
            <rect
              key={b.x}
              x={b.x}
              y={b.top}
              width={b.w}
              height={742 - b.top}
              fill={b.warm ? P.warmWash : P.deepWash}
            />
          ))}
          {FORE.map((b) => (
            <rect key={b.x} x={b.x} y={b.top} width={b.w} height={742 - b.top} fill={P.deepWash} />
          ))}
        </g>
      </g>

      {/* The drawing. Every line draws itself, distance-weighted: far
          buildings get a thin nib, the tower the heaviest. */}
      <g
        filter="url(#w2-pen)"
        fill="none"
        stroke={P.ink}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g opacity={0.4} strokeWidth={1.5}>
          {FAR.map((b, i) => (
            <path
              key={b.x}
              className="wc-ink-stroke"
              d={blockLines(b)}
              style={{ '--wc-len': 2 * (742 - b.top) + b.w, '--wc-delay': `${4.5 + i * 0.07}s` } as CSSProperties}
            />
          ))}
        </g>

        <g opacity={0.62} strokeWidth={2}>
          {MID.map((b, i) => (
            <path
              key={b.x}
              className="wc-ink-stroke"
              d={blockLines(b)}
              style={{ '--wc-len': 2 * (742 - b.top) + b.w, '--wc-delay': `${4.9 + i * 0.07}s` } as CSSProperties}
            />
          ))}
          {FORE.map((b, i) => (
            <path
              key={b.x}
              className="wc-ink-stroke"
              d={blockLines(b)}
              style={{ '--wc-len': 2 * (742 - b.top) + b.w, '--wc-delay': `${5.3 + i * 0.07}s` } as CSSProperties}
            />
          ))}
        </g>

        {/* The tower, heaviest nib, drawn last and slowest */}
        <path
          className="wc-ink-stroke"
          d={ESB}
          strokeWidth={3}
          opacity={0.88}
          style={{ '--wc-len': 2400, '--wc-delay': '3.3s' } as CSSProperties}
        />

        <g opacity={0.5} strokeWidth={1.4}>
          {[490, 508, 526, 546].map((x, i) => (
            <path
              key={x}
              className="wc-ink-stroke"
              d={`M ${x} 250 L ${x} 448`}
              style={{ '--wc-len': 200, '--wc-delay': `${5.7 + i * 0.08}s` } as CSSProperties}
            />
          ))}
          <path
            className="wc-ink-stroke"
            d={`M ${CX} 92 L ${CX} 190`}
            strokeWidth={2}
            style={{ '--wc-len': 100, '--wc-delay': '5.6s' } as CSSProperties}
          />
          {/* Horizon, pulled well past the buildings as a single gesture */}
          <path
            className="wc-ink-stroke"
            d="M 60 742 L 1150 742"
            strokeWidth={2}
            style={{ '--wc-len': 1090, '--wc-delay': '6s' } as CSSProperties}
          />
        </g>
      </g>

      <rect
        width="1200"
        height="820"
        filter="url(#w2-paper)"
        style={{ mixBlendMode: 'multiply', opacity: 'var(--proto-grain, 0.3)' }}
      />
    </svg>
  );
}
