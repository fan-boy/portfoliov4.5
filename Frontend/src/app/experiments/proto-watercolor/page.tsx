'use client';

/* THROWAWAY — prototype harness for the watercolor art direction.
   Nothing in the app imports this. Deleted in Phase 7 once a direction wins. */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './proto.css';
import Wash from './v1-wash';
import Ink from './v2-ink';
import BloomVariant from './v3-bloom';
import HardEdge from './v4-hardedge';

const VARIANTS = [
  { name: 'Wash', axis: 'Soft atmospheric realism — current direction' },
  { name: 'Ink & Wash', axis: 'Line-led — pen carries it, colour misses the lines' },
  { name: 'Bloom', axis: 'Edge dissolution — nearly abstract' },
  { name: 'Hard Edge', axis: 'Crisp flat washes — no bleed at all' },
];

/** Discrete, because each step recomputes an feTurbulence — a continuous
    slider here would recompute the whole filter graph on every pixel. */
const BLEED = [
  { label: 'Dry', v: 0 },
  { label: 'Damp', v: 8 },
  { label: 'Wet', v: 15 },
  { label: 'Flooded', v: 26 },
];

export default function ProtoWatercolor() {
  const [current, setCurrent] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [bleed, setBleed] = useState(15);

  const rootRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Live values live outside React so a slider never re-renders the tree —
     a stutter on drag reads as the artwork feeling bad. */
  const vals = useRef({ rainbow: 1, grain: 0.3, speed: 1 });
  const rainbowOut = useRef<HTMLSpanElement>(null);
  const grainOut = useRef<HTMLSpanElement>(null);

  const moveHighlight = useCallback(() => {
    const el = itemRefs.current[current];
    const hl = highlightRef.current;
    if (!el || !hl) return;
    hl.style.width = `${el.offsetWidth}px`;
    hl.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [current]);

  useLayoutEffect(() => {
    moveHighlight();
  }, [moveHighlight]);

  useEffect(() => {
    const onResize = () => moveHighlight();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [moveHighlight]);

  /* Restore from ?v=, then enable the slide so load doesn't animate. */
  useEffect(() => {
    const v = parseInt(new URLSearchParams(location.search).get('v') ?? '', 10);
    if (v >= 1 && v <= VARIANTS.length) setCurrent(v - 1);
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => pickerRef.current?.setAttribute('data-ready', ''))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  const select = useCallback((i: number) => {
    if (i < 0 || i >= VARIANTS.length) return;
    setCurrent(i);
    setNonce((n) => n + 1);
    const url = new URL(location.href);
    url.searchParams.set('v', String(i + 1));
    history.replaceState(null, '', url);
  }, []);

  const replay = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= VARIANTS.length) select(n - 1);
      else if (e.key === 'ArrowRight') select((current + 1) % VARIANTS.length);
      else if (e.key === 'ArrowLeft') select((current - 1 + VARIANTS.length) % VARIANTS.length);
      else if (e.key === 'r' || e.key === 'R') replay();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [current, select, replay]);

  const setVar = (k: 'rainbow' | 'grain' | 'speed', value: number) => {
    vals.current[k] = value;
    rootRef.current?.style.setProperty(`--proto-${k}`, String(value));
    if (k === 'rainbow' && rainbowOut.current) rainbowOut.current.textContent = value.toFixed(2);
    if (k === 'grain' && grainOut.current) grainOut.current.textContent = value.toFixed(2);
  };

  const copyConfig = () => {
    const { rainbow, grain, speed } = vals.current;
    const b = BLEED.find((x) => x.v === bleed);
    navigator.clipboard?.writeText(
      `variant: ${VARIANTS[current].name} · rainbow: ${rainbow} · bleed: ${b?.label} (${bleed}) · grain: ${grain} · speed: ${speed}x`
    );
  };

  const Variant = [Wash, Ink, BloomVariant, HardEdge][current];

  return (
    <div
      ref={rootRef}
      className="proto-stage"
      style={
        {
          '--proto-rainbow': 1,
          '--proto-grain': 0.3,
          '--proto-speed': 1,
        } as React.CSSProperties
      }
    >
      {/* key re-mounts the variant so the paint-in re-runs on switch and on R */}
      <Variant key={`${current}-${nonce}`} bleed={bleed} />

      <p className="proto-caption">{VARIANTS[current].axis}</p>

      <aside className="proto-panel">
        <div className="proto-row">
          <label htmlFor="p-rainbow">Rainbow</label>
          <span className="proto-val" ref={rainbowOut}>
            1.00
          </span>
        </div>
        <input
          id="p-rainbow"
          className="proto-ctl"
          type="range"
          min={0}
          max={2}
          step={0.05}
          defaultValue={1}
          onInput={(e) => setVar('rainbow', Number(e.currentTarget.value))}
        />

        <div className="proto-row">
          <label htmlFor="p-bleed">Bleed</label>
          <span className="proto-val">{BLEED.find((b) => b.v === bleed)?.label}</span>
        </div>
        <select
          id="p-bleed"
          className="proto-ctl"
          value={bleed}
          onChange={(e) => setBleed(Number(e.target.value))}
        >
          {BLEED.map((b) => (
            <option key={b.v} value={b.v}>
              {b.label}
            </option>
          ))}
        </select>

        <div className="proto-row" style={{ marginTop: 14 }}>
          <label htmlFor="p-grain">Paper grain</label>
          <span className="proto-val" ref={grainOut}>
            0.30
          </span>
        </div>
        <input
          id="p-grain"
          className="proto-ctl"
          type="range"
          min={0}
          max={0.7}
          step={0.02}
          defaultValue={0.3}
          onInput={(e) => setVar('grain', Number(e.currentTarget.value))}
        />

        <div className="proto-row" style={{ marginTop: 14 }}>
          <label htmlFor="p-speed">Paint speed</label>
        </div>
        <select
          id="p-speed"
          className="proto-ctl"
          defaultValue="1"
          onChange={(e) => setVar('speed', Number(e.target.value))}
          style={{ marginBottom: 12 }}
        >
          <option value="1">1x</option>
          <option value="2">0.5x</option>
          <option value="4">0.25x</option>
        </select>

        <button className="proto-copy" onClick={copyConfig}>
          Copy config
        </button>
      </aside>

      <nav className="proto-picker" ref={pickerRef} aria-label="Prototype variants">
        <span className="proto-picker-highlight" ref={highlightRef} aria-hidden="true" />
        {VARIANTS.map((v, i) => (
          <button
            key={v.name}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="proto-picker-item"
            {...(i === current ? { 'data-active': true, 'aria-current': 'true' as const } : {})}
            onClick={() => select(i)}
          >
            {v.name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true" />
        <button
          className="proto-picker-item proto-picker-replay"
          aria-label="Replay animation (R)"
          onClick={replay}
        >
          ↻
        </button>
      </nav>
    </div>
  );
}
