'use client'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";
import Canister, { CANISTER_RATIO } from "./Canister";
import Strip, { LEADER, STEP, STRIP_H, STRIP_W, FRAME_W, Tongue } from "./Strip";
import { FRAMES } from "./frames";
import { ROLLS, SHELF_FIELD, type FilmRoll } from "./data";

/* ---------- Sizes, in stage px ---------- */
const STAGE_W = 1290;
const STAGE_H = 640;
const NAV_SPACE = 140;
const PAGE_BG = "#FAFAFA";
/** Canister height on the shelf. */
const SHELF_CAN = 250;
const CAN_W = SHELF_CAN * CANISTER_RATIO;
/** Canisters step up and down along the shelf. */
const STAGGER = [40, 110, 10, 90];

/** Where the picked canister settles, and how big it grows, so the film fits its lip. */
const ANCHOR = { x: 196, y: 330, scale: 368 / SHELF_CAN };
const LIP_X = ANCHOR.x + (CAN_W * ANCHOR.scale) / 2 - 2;
/** Pull the strip out until the hero frame (second from the leader) sits mid-stage. */
const HERO_FROM_END = LEADER + STEP + FRAME_W / 2;
const PULLED = STAGE_W / 2 + HERO_FROM_END - LIP_X;

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
const PULL = [0.16, 1, 0.3, 1] as const;

type Controls = ReturnType<typeof animate>;
type ItemMotion = {
  lift: MotionValue<number>;
  cx: MotionValue<number>;
  cy: MotionValue<number>;
  cs: MotionValue<number>;
  can: () => HTMLElement | null;
};

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
const pad = (n: number) => String(n).padStart(2, "0");

/* ---------- One roll on the shelf ---------- */
function RollItem({
  roll,
  index,
  dimmed,
  active,
  tongueOut,
  tongueHidden,
  hovered,
  busy,
  register,
  onPick,
  onIntent,
}: {
  roll: FilmRoll;
  index: number;
  /** Another roll was picked: this one steps back. */
  dimmed: boolean;
  /** This roll was picked: its box and caption clear away, the canister stays. */
  active: boolean;
  tongueOut: boolean;
  tongueHidden: boolean;
  hovered: boolean;
  busy: boolean;
  register: (slug: string, m: ItemMotion) => void;
  onPick: (r: FilmRoll) => void;
  onIntent: (r: FilmRoll, index: number) => void;
}) {
  const lift = useMotionValue(0);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const cs = useMotionValue(1);
  const canRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    register(roll.slug, { lift, cx, cy, cs, can: () => canRef.current });
  }, [cs, cx, cy, lift, register, roll.slug]);

  return (
    <motion.div
      className="relative"
      style={{ marginTop: STAGGER[index % STAGGER.length], zIndex: active ? 30 : 1 }}
      initial={false}
      animate={{ opacity: dimmed ? 0 : 1, y: dimmed ? 16 : 0 }}
      transition={{ duration: 0.32, ease: "easeOut", delay: dimmed ? index * 0.03 : 0 }}
    >
      <button
        type="button"
        className="film-item-btn"
        aria-disabled={busy || undefined}
        aria-label={`Open ${roll.name}: ${roll.headline}`}
        onClick={() => onPick(roll)}
        onMouseEnter={() => onIntent(roll, index)}
        onFocus={() => onIntent(roll, index)}
      >
        <motion.div style={{ y: lift }}>
          <div className="film-item-lift">
            {/* This roll's number, large and faint, behind the canister. */}
            <span
              className={`film-number film-ink ${hovered ? "is-hovered" : ""} ${active && busy ? "is-gone" : ""}`}
              style={{ left: CAN_W / 2 }}
              aria-hidden="true"
            >
              {pad(index + 1)}
            </span>
            {/* Exactly the canister's width, so it scales about the canister's own centre. */}
            <motion.div ref={canRef} className="relative" style={{ width: CAN_W, x: cx, y: cy, scale: cs }}>
              <Tongue scale={ANCHOR.scale} left={CAN_W - 2 / ANCHOR.scale} out={tongueOut} hidden={tongueHidden} />
              <Canister roll={roll} height={SHELF_CAN} />
            </motion.div>
          </div>
        </motion.div>
        <motion.span className="block" initial={false} animate={{ opacity: active && busy ? 0 : 1 }} transition={{ duration: 0.2 }}>
          <span className="mt-7 flex items-center gap-3">
            <span className="film-mono film-ink text-[12px] opacity-70">{roll.company}</span>
            <span className="film-stamp film-ink">{roll.year}</span>
          </span>
          <span className="film-ink mt-2 block text-[20px] font-bold tracking-tight">{roll.name}</span>
        </motion.span>
      </button>
    </motion.div>
  );
}

/** A canister: the page's mark. */
function FilmMark() {
  return (
    <svg width="28" height="44" viewBox="0 0 28 44" fill="none" aria-hidden="true" className="film-ink">
      <rect x="10" y="1.5" width="8" height="4" fill="currentColor" />
      <rect x="1.5" y="6" width="25" height="36.5" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="1.5" y="6" width="25" height="10" fill="currentColor" />
    </svg>
  );
}

/* ---------- The scene ---------- */
export default function FilmScene() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const items = useRef(new Map<string, ItemMotion>());
  const register = useCallback((slug: string, m: ItemMotion) => {
    items.current.set(slug, m);
  }, []);

  const field = useMotionValue(SHELF_FIELD);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [active, setActive] = useState<FilmRoll | null>(null);
  const [busy, setBusy] = useState(false);
  const [tongueOut, setTongueOut] = useState(false);
  const [stripOut, setStripOut] = useState(false);
  const pull = useMotionValue(-STRIP_W + LEADER);
  const stripOpacity = useMotionValue(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState<{ roll: FilmRoll; rect: DOMRect } | null>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const fade = useMotionValue(0);
  const [fading, setFading] = useState(false);
  const [announce, setAnnounce] = useState("");
  const running = useRef<Controls[]>([]);
  const token = useRef({ cancelled: false });

  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [stageScale, setStageScale] = useState(1);
  const stageScaleRef = useRef(1);

  useEffect(() => setMounted(true), []);
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const s = Math.max(0.55, Math.min(1, (el.clientWidth - 64) / STAGE_W, (el.clientHeight - 32) / STAGE_H));
      stageScaleRef.current = s;
      setStageScale(s);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const run = useCallback((c: Controls) => {
    running.current.push(c);
    return c;
  }, []);

  const go = useCallback((r: FilmRoll) => router.push(r.href), [router]);

  /** Reduced motion, phones and skips: a short crossfade to the page colour, then go. */
  const fadeAndGo = useCallback(
    async (r: FilmRoll, seconds: number) => {
      fade.set(0);
      setFading(true);
      await nextFrame();
      await animate(fade, 1, { duration: seconds, ease: "easeOut" });
      go(r);
    },
    [fade, go]
  );

  const pick = useCallback(
    async (r: FilmRoll) => {
      if (busy) return;
      setBusy(true);
      setAnnounce(`Opening ${r.name}`);
      router.prefetch(r.href);
      if (reduceMotion) {
        await fadeAndGo(r, 0.2);
        return;
      }
      const t = { cancelled: false };
      token.current = t;
      const item = items.current.get(r.slug);
      const stage = stageRef.current;
      if (!item || !stage) return;
      setActive(r);

      // 1 · The canister comes up off the shelf.
      await run(animate(item.lift, -18, { duration: 0.3, ease: EASE_OUT }));
      if (t.cancelled) return;

      // 2 · Everything else clears; the canister comes to the left of the frame and grows,
      //     with its leader already poking out of the lip.
      const can = item.can();
      if (!can) return;
      const s = stageScaleRef.current;
      const sr = stage.getBoundingClientRect();
      const cr = can.getBoundingClientRect();
      const x = (cr.left + cr.width / 2 - sr.left) / s;
      const y = (cr.top + cr.height / 2 - sr.top) / s;
      setTongueOut(true);
      run(animate(field, r.field, { duration: 0.7, ease: "easeInOut" }));
      await Promise.all([
        run(animate(item.cx, ANCHOR.x - x, { duration: 0.7, ease: EASE_IN_OUT })),
        run(animate(item.cy, ANCHOR.y - y, { duration: 0.7, ease: EASE_IN_OUT })),
        run(animate(item.cs, ANCHOR.scale, { duration: 0.7, ease: EASE_IN_OUT })),
      ]);
      if (t.cancelled) return;

      // 3 · The film is drawn out, frames and all, picking up where the leader left off.
      pull.set(-STRIP_W + LEADER);
      stripOpacity.set(1);
      setStripOut(true);
      await run(animate(pull, -STRIP_W + PULLED, { duration: 1.0, ease: PULL }));
      if (t.cancelled) return;
      await wait(200);

      // 4 · Into the frame: it grows to fill the screen, then the page.
      const hero = heroRef.current;
      if (!hero) return;
      setZoom({ roll: r, rect: hero.getBoundingClientRect() });
      await nextFrame();
      const z = zoomRef.current;
      if (!z || t.cancelled) return;
      await run(
        animate(z, { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight, borderRadius: 0 }, { duration: 0.7, ease: EASE_IN_OUT })
      );
      fade.set(0);
      setFading(true);
      await nextFrame();
      await run(animate(fade, 1, { duration: 0.28, ease: "easeOut" }));
      if (t.cancelled) return;
      go(r);
    },
    [busy, fade, fadeAndGo, field, go, pull, reduceMotion, router, run, stripOpacity]
  );

  const skip = useCallback(() => {
    if (!active) return;
    token.current.cancelled = true;
    running.current.forEach((c) => c.stop());
    running.current = [];
    void fadeAndGo(active, 0.15);
  }, [active, fadeAndGo]);

  useEffect(() => {
    if (!busy) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, skip]);

  const onIntent = useCallback(
    (r: FilmRoll, index: number) => {
      if (busy) return;
      setHoverIndex(index);
      router.prefetch(r.href);
    },
    [busy, router]
  );

  const onShelfKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as { [k: string]: number })[e.key];
    if (!step) return;
    const buttons = [...e.currentTarget.querySelectorAll<HTMLButtonElement>(".film-item-btn")];
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    e.preventDefault();
    buttons[(Math.max(i, 0) + step + buttons.length) % buttons.length]?.focus();
  };

  return (
    <motion.div
      className="relative w-full"
      style={{ backgroundColor: field, marginTop: -NAV_SPACE, paddingTop: NAV_SPACE, ["--film-field" as string]: field }}
    >
      {/* Desktop: the shelf. */}
      <div ref={wrapRef} className="relative hidden min-[900px]:block" style={{ height: `calc(100vh - ${NAV_SPACE}px)`, minHeight: 520 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={stageRef} className="relative" style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${stageScale})`, flex: "none" }}>
            <motion.div className="absolute inset-0" initial={false} animate={{ opacity: active ? 0 : 1 }} transition={{ duration: 0.3 }} aria-hidden={!!active}>
              <header className="absolute left-0 top-0 flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <FilmMark />
                  <h1 className="film-ink text-[44px] font-bold leading-none tracking-[-0.03em]">Aadi&apos;s Film</h1>
                </div>
                <p className="film-mono film-ink text-[14px] opacity-80">Four case studies, shot on 35mm. Pick a roll.</p>
              </header>
              <p className="film-mono film-ink absolute bottom-0 left-0 text-[12px] opacity-60">← → to browse · Enter to open</p>
            </motion.div>

            <div
              role="group"
              aria-label="Film rolls"
              className="absolute left-0 top-[150px] flex items-start"
              style={{ gap: 170 }}
              onKeyDown={onShelfKeyDown}
            >
              {ROLLS.map((r, i) => (
                <RollItem
                  key={r.slug}
                  roll={r}
                  index={i}
                  dimmed={!!active && active.slug !== r.slug}
                  active={active?.slug === r.slug}
                  tongueOut={tongueOut && active?.slug === r.slug}
                  tongueHidden={stripOut}
                  hovered={hoverIndex === i && !active}
                  busy={busy}
                  register={register}
                  onPick={pick}
                  onIntent={onIntent}
                />
              ))}
            </div>

            {/* The film, drawn out of the picked canister's lip. */}
            {active && (
              <>
                <motion.div
                  className="absolute overflow-hidden"
                  style={{ left: LIP_X, top: ANCHOR.y - STRIP_H / 2, width: STAGE_W - LIP_X + 40, height: STRIP_H + 40, opacity: stripOpacity, zIndex: 40 }}
                >
                  <motion.div style={{ x: pull, filter: "drop-shadow(0 14px 18px rgba(40, 25, 5, 0.22))" }}>
                    <Strip roll={active} heroRef={heroRef} />
                  </motion.div>
                </motion.div>
                {/* Fetch the full-screen hero while the film comes out, so the zoom never shows a blank. */}
                <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true">
                  <Image src={FRAMES[active.slug][0]} alt="" width={1440} height={900} sizes="100vw" priority />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Phones and narrow windows: the shelf as a list; a tap fades straight to the case study. */}
      <ul className="mx-auto flex min-h-[calc(100vh-140px)] max-w-md flex-col gap-6 px-5 pb-16 pt-4 min-[900px]:hidden">
        <li className="mb-2">
          <h1 className="film-ink text-[32px] font-bold leading-none tracking-[-0.03em]">Aadi&apos;s Film</h1>
          <p className="film-mono film-ink mt-2 text-[13px] opacity-80">Four case studies, shot on 35mm.</p>
        </li>
        {ROLLS.map((r) => (
          <li key={r.slug}>
            <button
              type="button"
              onClick={() => {
                if (busy) return;
                setBusy(true);
                setAnnounce(`Opening ${r.name}`);
                void fadeAndGo(r, 0.15);
              }}
              className="flex w-full items-center gap-4 text-left"
            >
              <div className="shrink-0">
                <Canister roll={r} height={96} />
              </div>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="film-mono film-ink text-[11px] opacity-70">
                  {r.company} · {r.year}
                </span>
                <span className="film-ink text-[18px] font-bold tracking-tight">{r.name}</span>
                <span className="film-mono film-ink text-[12px] leading-snug opacity-80">{r.headline}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      {mounted &&
        createPortal(
          <>
            {zoom && (
              <div
                ref={zoomRef}
                className="pointer-events-none fixed z-[90] overflow-hidden bg-white"
                style={{ left: zoom.rect.left, top: zoom.rect.top, width: zoom.rect.width, height: zoom.rect.height, borderRadius: 2 }}
              >
                <Image src={FRAMES[zoom.roll.slug][0]} alt="" fill sizes="100vw" className="object-cover object-left-top" />
              </div>
            )}
            {fading && <motion.div className="pointer-events-none fixed inset-0 z-[100]" style={{ background: PAGE_BG, opacity: fade }} />}
            {busy && active && <div className="fixed inset-0 z-[95] cursor-pointer" onClick={skip} aria-hidden="true" />}
          </>,
          document.body
        )}
    </motion.div>
  );
}
