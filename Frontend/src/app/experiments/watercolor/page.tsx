import Link from 'next/link';
import type { CSSProperties } from 'react';
import { scopeClasses } from '../registry';
import './watercolor.css';

/**
 * Watercolor — a study.
 *
 * The Empire State Building painting itself in, wash by wash. Everything is
 * SVG: the paper, the bleed at each wet edge, the pigment granulation and the
 * reveal are all filter and mask work, so there is no raster asset.
 *
 * Server component on purpose — the whole sequence is CSS, nothing hydrates.
 *
 * Two rules the first attempt got wrong, kept here on purpose:
 *
 *   1. Temperature, not value, carries a watercolor cityscape. Lit faces are
 *      warm (H~68), shadowed faces cool (H~276) — 152 degrees apart. Grey
 *      buildings separated only by lightness read as cardboard.
 *   2. Displacing a hard vector edge gives torn paper, not pigment. Every
 *      wash is blurred FIRST and displaced second, so the soft edge goes
 *      ragged-soft instead of zigzag-hard.
 */

const P = {
  paper: 'oklch(97.5% 0.014 78)',
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
} as const;

const RAINBOW = [
  'oklch(66% 0.17 27)',
  'oklch(76% 0.15 62)',
  'oklch(88% 0.14 96)',
  'oklch(72% 0.15 146)',
  'oklch(64% 0.15 242)',
  'oklch(56% 0.14 288)',
];

/* The tower sits left of centre at x=520; the skyline is weighted right and
   the rainbow's apex is offset further right again, so nothing mirrors. */
const CX = 520;

const ESB =
  'M 375 742 L 375 592 L 402 592 L 402 512 L 432 512 L 432 452 ' +
  'L 471 452 L 471 236 L 483 236 L 483 212 L 495 212 L 495 192 ' +
  'L 506 192 L 506 156 L 514 156 L 517 112 L 520 88 ' +
  'L 523 112 L 526 156 L 534 156 L 534 192 L 545 192 L 545 212 ' +
  'L 557 212 L 557 236 L 569 236 L 569 452 L 608 452 L 608 512 ' +
  'L 638 512 L 638 592 L 665 592 L 665 742 Z';

/** Everything right of the ridge line is in shadow. */
const ESB_SHADE =
  'M 520 88 L 523 112 L 526 156 L 534 156 L 534 192 L 545 192 L 545 212 ' +
  'L 557 212 L 557 236 L 569 236 L 569 452 L 608 452 L 608 512 ' +
  'L 638 512 L 638 592 L 665 592 L 665 742 L 520 742 Z';

type Blk = { x: number; w: number; top: number; warm?: boolean };

const FAR: Blk[] = [
  { x: 40, w: 90, top: 560 },
  { x: 118, w: 72, top: 528 },
  { x: 690, w: 88, top: 500 },
  { x: 768, w: 78, top: 466 },
  { x: 840, w: 92, top: 522 },
  { x: 924, w: 82, top: 486 },
  { x: 996, w: 112, top: 512 },
  { x: 1096, w: 108, top: 478 },
];

const MID: Blk[] = [
  { x: -8, w: 104, top: 620 },
  { x: 214, w: 96, top: 596, warm: true },
  { x: 300, w: 80, top: 634 },
  { x: 654, w: 88, top: 588 },
  { x: 736, w: 78, top: 626, warm: true },
  { x: 900, w: 94, top: 602 },
  { x: 1058, w: 92, top: 588, warm: true },
];

const FORE: Blk[] = [
  { x: -12, w: 124, top: 674, warm: true },
  { x: 338, w: 94, top: 690 },
  { x: 798, w: 106, top: 668, warm: true },
  { x: 1008, w: 90, top: 686 },
  { x: 1128, w: 92, top: 662 },
];

type Bloom = { cx: number; cy: number; rx: number; ry: number; d: number };

function BloomMask({ id, blur, blooms }: { id: string; blur: number; blooms: Bloom[] }) {
  return (
    <mask id={id} maskUnits="userSpaceOnUse" x="-200" y="-200" width="1600" height="1220">
      <g filter={`url(#wc-soft-${blur})`}>
        {blooms.map((b, i) => (
          <ellipse
            key={i}
            className="wc-bloom"
            cx={b.cx}
            cy={b.cy}
            rx={b.rx}
            ry={b.ry}
            fill="#fff"
            style={{ '--wc-delay': `${b.d}s` } as CSSProperties}
          />
        ))}
      </g>
    </mask>
  );
}

export default function Watercolor() {
  return (
    <div
      className={scopeClasses({ theme: 'editorial', expression: 'expressive', chrome: 'fullbleed' })}
    >
      <div className="wc-stage">
        <svg
          className="wc-canvas"
          viewBox="0 0 1200 820"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="A watercolor painting of the Empire State Building and the surrounding Manhattan skyline beneath a faint rainbow, appearing wash by wash."
        >
          <defs>
            <filter id="wc-soft-70" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="70" />
            </filter>
            <filter id="wc-soft-40" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="40" />
            </filter>

            {/*
              A wet wash.

              Order matters: blur BEFORE displacing. Displacing a hard edge
              gives a zigzag; displacing an already-soft edge gives the ragged,
              feathered boundary a loaded brush leaves on damp paper.

              The final composite modulates ALPHA with high-frequency noise —
              that is granulation, pigment settling unevenly into the tooth of
              the paper. It is the single thing that separates pigment-in-water
              from flat vector fill.
            */}
            <filter id="wc-wash" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="soft" />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.011"
                numOctaves={4}
                seed={7}
                result="n"
              />
              <feDisplacementMap
                in="soft"
                in2="n"
                scale={24}
                xChannelSelector="R"
                yChannelSelector="G"
                result="warp"
              />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.42"
                numOctaves={3}
                seed={13}
                result="grain"
              />
              <feColorMatrix
                in="grain"
                type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0.26 0.26 0.26 0 0.44"
                result="grainA"
              />
              <feComposite in="warp" in2="grainA" operator="in" />
            </filter>

            {/*
              Same, tighter, plus a wet edge: compositing against a blurred
              copy of itself leaves a darker rim where pigment pools and dries.
              Used on the buildings, where an edge should still read as an edge.
            */}
            <filter id="wc-edge" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="soft" />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.016"
                numOctaves={4}
                seed={19}
                result="n"
              />
              <feDisplacementMap
                in="soft"
                in2="n"
                scale={11}
                xChannelSelector="R"
                yChannelSelector="G"
                result="warp"
              />
              <feGaussianBlur in="warp" stdDeviation={3} result="halo" />
              <feComposite
                in="warp"
                in2="halo"
                operator="arithmetic"
                k1="0"
                k2="1.18"
                k3="-0.2"
                k4="0.01"
                result="rim"
              />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.5"
                numOctaves={3}
                seed={5}
                result="g2"
              />
              <feColorMatrix
                in="g2"
                type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0.22 0.22 0.22 0 0.52"
                result="g2A"
              />
              <feComposite in="rim" in2="g2A" operator="in" />
            </filter>

            {/* Cold-press tooth, laid over the finished sheet */}
            <filter id="wc-paper" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.62"
                numOctaves={4}
                seed={23}
                result="t"
              />
              <feColorMatrix in="t" type="saturate" values="0" />
            </filter>

            {/* Variegated sky: cool above, warm glow at the horizon */}
            <linearGradient id="wc-sky" x1="0.15" y1="0" x2="0.35" y2="1">
              <stop offset="0%" stopColor={P.skyTop} />
              <stop offset="46%" stopColor={P.skyMid} />
              <stop offset="82%" stopColor={P.skyHorizon} />
              <stop offset="100%" stopColor={P.skyHorizon} />
            </linearGradient>

            {/*
              A real rainbow is atmosphere, not an object: brightest near the
              apex and gone before it reaches the ground. This fades the bands
              out as they descend so they never become a croquet hoop.
            */}
            <linearGradient id="wc-bow-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="16%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="44%" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="72%" stopColor="#fff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="wc-m-bow" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="820">
              <rect width="1200" height="820" fill="url(#wc-bow-fade)" />
            </mask>

            <BloomMask
              id="wc-m-sky"
              blur={70}
              blooms={[
                { cx: 330, cy: 250, rx: 520, ry: 340, d: 0.25 },
                { cx: 880, cy: 220, rx: 500, ry: 330, d: 0.5 },
                { cx: 600, cy: 500, rx: 640, ry: 290, d: 0.75 },
              ]}
            />
            <BloomMask
              id="wc-m-far"
              blur={40}
              blooms={[
                { cx: 150, cy: 640, rx: 260, ry: 190, d: 2.1 },
                { cx: 900, cy: 610, rx: 330, ry: 200, d: 2.3 },
                { cx: 1130, cy: 630, rx: 240, ry: 190, d: 2.5 },
              ]}
            />
            <BloomMask
              id="wc-m-esb"
              blur={40}
              blooms={[
                { cx: CX, cy: 672, rx: 230, ry: 150, d: 3.0 },
                { cx: CX, cy: 500, rx: 175, ry: 190, d: 3.3 },
                { cx: CX, cy: 260, rx: 140, ry: 215, d: 3.6 },
                { cx: CX, cy: 118, rx: 85, ry: 135, d: 3.9 },
              ]}
            />
            <BloomMask
              id="wc-m-mid"
              blur={40}
              blooms={[
                { cx: 140, cy: 700, rx: 280, ry: 165, d: 4.3 },
                { cx: 760, cy: 690, rx: 300, ry: 175, d: 4.5 },
                { cx: 1120, cy: 700, rx: 250, ry: 165, d: 4.7 },
              ]}
            />
            <BloomMask
              id="wc-m-fore"
              blur={40}
              blooms={[
                { cx: 120, cy: 730, rx: 280, ry: 130, d: 5.0 },
                { cx: 880, cy: 730, rx: 320, ry: 130, d: 5.15 },
              ]}
            />
          </defs>

          {/* The sheet */}
          <rect width="1200" height="820" fill={P.paper} />

          {/*
            Sky. Inset from the edges so bare paper frames the painting —
            a wash stops where the brush stopped, it does not run to the
            trimmed edge of the sheet.
          */}
          <g mask="url(#wc-m-sky)" className="wc-damp">
            <g
              className="wc-layer"
              filter="url(#wc-wash)"
              style={
                { '--wc-delay': '0.25s', '--wc-dur': '2s', '--wc-final': 0.94 } as CSSProperties
              }
            >
              <rect x="26" y="24" width="1148" height="722" fill="url(#wc-sky)" />
              {/* Wet-in-wet: pigment dropped into a damp wash and left to spread */}
              <ellipse cx="300" cy="200" rx="210" ry="96" fill={P.skyTop} opacity={0.3} />
              <ellipse cx="880" cy="150" rx="250" ry="84" fill={P.skyTop} opacity={0.24} />
              <ellipse cx="620" cy="330" rx="300" ry="70" fill="oklch(97% 0.02 80)" opacity={0.5} />
              <ellipse cx="1020" cy="420" rx="220" ry="90" fill={P.skyHorizon} opacity={0.45} />
            </g>
          </g>

          {/*
            Rainbow. Painted as you would paint one — each band swept across in
            a single stroke, outermost first — then masked so it dissolves
            toward the horizon. Low opacity and a heavy blur keep the bands
            bleeding into one another instead of reading as printed stripes.
          */}
          <g mask="url(#wc-m-bow)">
            <g style={{ mixBlendMode: 'multiply', filter: 'blur(2.5px)' }}>
              {RAINBOW.map((c, i) => {
                const r = 604 - i * 15;
                return (
                  <path
                    key={c}
                    className="wc-ink-stroke"
                    d={`M ${660 - r} 812 A ${r} ${r} 0 0 1 ${660 + r} 812`}
                    fill="none"
                    stroke={c}
                    strokeWidth={15}
                    strokeLinecap="round"
                    opacity={0.16}
                    style={
                      {
                        '--wc-len': Math.round(Math.PI * r),
                        '--wc-delay': `${1.15 + i * 0.13}s`,
                      } as CSSProperties
                    }
                  />
                );
              })}
            </g>
          </g>

          {/* Distant skyline — most water, least pigment, so it sits back */}
          <g mask="url(#wc-m-far)" style={{ mixBlendMode: 'multiply' }}>
            <g
              className="wc-layer"
              filter="url(#wc-edge)"
              style={
                { '--wc-delay': '2.1s', '--wc-dur': '1.5s', '--wc-final': 0.62 } as CSSProperties
              }
            >
              {FAR.map((b) => (
                <rect key={b.x} x={b.x} y={b.top} width={b.w} height={742 - b.top} fill={P.far} />
              ))}
            </g>
          </g>

          {/* The building */}
          <g mask="url(#wc-m-esb)" style={{ mixBlendMode: 'multiply' }}>
            <g
              className="wc-layer"
              filter="url(#wc-edge)"
              style={{ '--wc-delay': '3s', '--wc-dur': '2s', '--wc-final': 0.92 } as CSSProperties}
            >
              <path d={ESB} fill={P.esbLit} />
              {/* Second pass over the dry first: the shadowed face, cool against warm */}
              <path d={ESB_SHADE} fill={P.esbShade} opacity={0.62} />
              {/* Each tier casts onto the one below */}
              <rect x={432} y={452} width={137} height={10} fill={P.esbShade} opacity={0.38} />
              <rect x={402} y={512} width={206} height={9} fill={P.esbShade} opacity={0.32} />
              <rect x={375} y={592} width={263} height={9} fill={P.esbShade} opacity={0.26} />
            </g>
          </g>

          {/* Middle distance — warm and cool blocks alternating */}
          <g mask="url(#wc-m-mid)" style={{ mixBlendMode: 'multiply' }}>
            <g
              className="wc-layer"
              filter="url(#wc-edge)"
              style={
                { '--wc-delay': '4.3s', '--wc-dur': '1.5s', '--wc-final': 0.72 } as CSSProperties
              }
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
              {[
                { x: 246, y: 596 },
                { x: 922, y: 602 },
              ].map((t) => (
                <g key={t.x} fill={P.midCool}>
                  <path
                    d={`M ${t.x} ${t.y - 24} L ${t.x + 32} ${t.y - 24} L ${t.x + 26} ${t.y} L ${t.x + 6} ${t.y} Z`}
                  />
                  <rect x={t.x + 4} y={t.y} width={4} height={11} />
                  <rect x={t.x + 24} y={t.y} width={4} height={11} />
                  <path
                    d={`M ${t.x + 1} ${t.y - 24} L ${t.x + 16} ${t.y - 35} L ${t.x + 31} ${t.y - 24} Z`}
                  />
                </g>
              ))}
            </g>
          </g>

          {/* Foreground — densest pigment, warmest darks, shallowest band */}
          <g mask="url(#wc-m-fore)" style={{ mixBlendMode: 'multiply' }}>
            <g
              className="wc-layer"
              filter="url(#wc-edge)"
              style={
                { '--wc-delay': '5s', '--wc-dur': '1.4s', '--wc-final': 0.6 } as CSSProperties
              }
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

          {/* Pen over the dry painting. Sparse — the mast, a few piers, the base. */}
          <g stroke={P.ink} fill="none" strokeLinecap="round" opacity={0.34}>
            <path
              className="wc-ink-stroke"
              d="M 520 92 L 520 190"
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

          {/* Paper tooth over the whole sheet, so pigment and paper share a grain */}
          <rect
            width="1200"
            height="820"
            filter="url(#wc-paper)"
            style={{ mixBlendMode: 'multiply' }}
            opacity={0.3}
          />
        </svg>

        <div className="wc-signature">
          <p className="exp-caps">Empire State · study in watercolor</p>
        </div>

        <Link href="/experiments" className="exp-escape exp-focusable">
          ← Experiments
        </Link>
      </div>
    </div>
  );
}
