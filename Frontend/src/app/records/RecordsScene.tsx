'use client'
import WorkCrumb from "../components/WorkCrumb";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Disc from "./Disc";
import Sleeve from "./Sleeve";
import Turntable, { DECK_H, DECK_W, DISC, PLAY_ANGLE, REST_ANGLE } from "./Turntable";
import { LAST_PLAYED_KEY, RECORDS, SHOP_FIELD, type VinylRecord } from "./data";

/* ---------- Sizes and timing ---------- */
const SLEEVE = 210;
const SLEEVE_DISC = Math.round(SLEEVE * 0.94);
/** 33⅓ rpm: one turn every 1.8s. */
const RPM_DEG_PER_S = 360 / 1.8;
const LABEL = DISC * 0.54;
/** Natural size of the stage; it scales down to fit smaller desktop windows. */
const STAGE_W = 1290;
const STAGE_H = 640;
const NAV_SPACE = 140;
const PAGE_BG = "#FAFAFA";
/** Shop columns step up and down, like records leaning in a rack. */
const STAGGER = [0, 96, -24, 72];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
const GRAVITY = [0.5, 0, 0.75, 0] as const;

type Controls = ReturnType<typeof animate>;
type ItemMotion = {
  y: MotionValue<number>;
  scale: MotionValue<number>;
  slotX: MotionValue<number>;
  disc: () => HTMLElement | null;
};
type View = "shop" | "deck";
type Overlay = { kind: "zoom"; x: number; y: number; size: number; color: string } | { kind: "fade" } | null;

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const centerOf = (el: Element) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};
const pad = (n: number) => String(n).padStart(2, "0");

/* ---------- One record in the shop ---------- */
function RecordItem({
  record,
  index,
  away,
  raised,
  busy,
  register,
  onPlay,
  onIntent,
}: {
  record: VinylRecord;
  index: number;
  /** The disc isn't in this sleeve (it's on the deck or in the air). */
  away: boolean;
  raised: boolean;
  busy: boolean;
  register: (slug: string, m: ItemMotion) => void;
  onPlay: (r: VinylRecord) => void;
  onIntent: (r: VinylRecord, index: number) => void;
}) {
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const slotX = useMotionValue(0);
  const discRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    register(record.slug, { y, scale, slotX, disc: () => discRef.current });
  }, [record.slug, register, y, scale, slotX]);

  return (
    <div className="relative" style={{ marginTop: STAGGER[index % STAGGER.length], zIndex: raised ? 30 : 1 }}>
      <motion.div style={{ y, scale }}>
        <button
          type="button"
          className="rec-item-btn"
          aria-disabled={busy || undefined}
          aria-label={`Play ${record.name}: ${record.headline}`}
          onClick={() => onPlay(record)}
          onMouseEnter={() => onIntent(record, index)}
          onFocus={() => onIntent(record, index)}
        >
          <div className="rec-item-lift">
            <motion.div
              className="rec-item-slot"
              style={{ x: slotX, left: (SLEEVE - SLEEVE_DISC) / 2, top: (SLEEVE - SLEEVE_DISC) / 2 }}
            >
              <div ref={discRef} className={`rec-item-peek ${away ? "is-away" : ""}`}>
                <Disc record={record} size={SLEEVE_DISC} />
              </div>
            </motion.div>
            <Sleeve record={record} size={SLEEVE} />
            <span className="rec-stamp rec-ink rec-stamp-on-field absolute -bottom-3 right-3 z-[2]">{record.year}</span>
          </div>
          <span className="rec-mono rec-ink mt-5 block text-[12px] opacity-70">{record.company}</span>
          <span className="rec-ink mt-1 block pl-6 text-[20px] font-bold tracking-tight">{record.name}</span>
        </button>
      </motion.div>
    </div>
  );
}

/** A sleeve with a record peeking out: the page's mark. */
function RecordsMark() {
  return (
    <svg width="46" height="40" viewBox="0 0 46 40" fill="none" aria-hidden="true" className="rec-ink">
      <circle cx="28" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="28" cy="20" r="3" fill="currentColor" />
      <rect x="2" y="4" width="32" height="32" className="rec-mark-sleeve" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

/* ---------- The scene ---------- */
export default function RecordsScene() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Record motion values, filled in by each RecordItem.
  const items = useRef(new Map<string, ItemMotion>());
  const register = useCallback((slug: string, m: ItemMotion) => {
    items.current.set(slug, m);
  }, []);

  // View and page colour.
  const [view, setView] = useState<View>("shop");
  const [deckRecord, setDeckRecord] = useState<VinylRecord | null>(null);
  const field = useMotionValue(SHOP_FIELD);
  const [hoverIndex, setHoverIndex] = useState(0);

  // Deck.
  const rotation = useMotionValue(0);
  const speed = useMotionValue(0);
  const armAngle = useMotionValue(REST_ANGLE);
  const armLift = useMotionValue(0);
  const platterCenterRef = useRef<HTMLDivElement>(null);
  const [onPlatter, setOnPlatter] = useState<VinylRecord | null>(null);
  const onPlatterRef = useRef<VinylRecord | null>(null);

  // The disc in flight: drawn at deck size, centred on the platter, placed with transforms.
  const fx = useMotionValue(0);
  const fy = useMotionValue(0);
  const fScale = useMotionValue(1);
  const fRotate = useMotionValue(0);
  const fLift = useMotionValue(0);
  const fShadowOpacity = useTransform(fLift, [0, 1], [0, 0.3]);
  const fShadowY = useTransform(fLift, [0, 1], [8, 40]);
  const [flyer, setFlyer] = useState<{ record: VinylRecord; left: number; top: number } | null>(null);
  const [awaySlug, setAwaySlug] = useState<string | null>(null);

  // Sequence state.
  const [busy, setBusy] = useState(false);
  const [sequencing, setSequencing] = useState(false);
  const [raisedSlug, setRaisedSlug] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayScale = useMotionValue(1);
  const overlayOpacity = useMotionValue(0);
  const [announce, setAnnounce] = useState("");
  const running = useRef<Controls[]>([]);
  const token = useRef({ cancelled: false });
  const activeRecord = useRef<VinylRecord | null>(null);

  // Stage scale, so the whole scene fits windows narrower or shorter than 1440x900.
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const [stageScale, setStageScale] = useState(1);
  const stageScaleRef = useRef(1);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    const el = stageWrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const s = Math.min(1, (el.clientWidth - 64) / STAGE_W, (el.clientHeight - 32) / STAGE_H);
      const next = Math.max(0.55, s);
      stageScaleRef.current = next;
      setStageScale(next);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The platter turns at whatever `speed` is, so spin-up and spin-down are real ramps.
  useAnimationFrame((_, delta) => {
    const s = speed.get();
    if (s !== 0) rotation.set((rotation.get() + (s * delta) / 1000) % 360);
  });

  const placeOnPlatter = useCallback((r: VinylRecord | null) => {
    onPlatterRef.current = r;
    setOnPlatter(r);
  }, []);

  // Coming back from a case study: the record you played is still on the deck, spinning.
  useEffect(() => {
    let slug: string | null = null;
    try {
      slug = sessionStorage.getItem(LAST_PLAYED_KEY);
    } catch {}
    const r = RECORDS.find((x) => x.slug === slug);
    if (!r) return;
    placeOnPlatter(r);
    setDeckRecord(r);
    setView("deck");
    field.set(r.field);
    setAwaySlug(r.slug);
    armAngle.set(PLAY_ANGLE);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) speed.set(RPM_DEG_PER_S);
  }, [armAngle, field, speed, placeOnPlatter]);

  const run = useCallback((c: Controls) => {
    running.current.push(c);
    return c;
  }, []);

  const go = useCallback(
    (r: VinylRecord) => {
      try {
        sessionStorage.setItem(LAST_PLAYED_KEY, r.slug);
      } catch {}
      router.push(r.href);
    },
    [router]
  );

  /** Reduced motion, phones and skips: a short crossfade to the page colour, then go. */
  const fadeAndGo = useCallback(
    async (r: VinylRecord, seconds: number) => {
      overlayOpacity.set(0);
      setOverlay({ kind: "fade" });
      await nextFrame();
      await animate(overlayOpacity, 1, { duration: seconds, ease: "easeOut" });
      go(r);
    },
    [go, overlayOpacity]
  );

  const skip = useCallback(() => {
    const r = activeRecord.current;
    if (!r) return;
    token.current.cancelled = true;
    running.current.forEach((c) => c.stop());
    running.current = [];
    void fadeAndGo(r, 0.15);
  }, [fadeAndGo]);

  /** Lift the arm back to its post and wind the platter down. */
  const parkArm = useCallback(
    async (quick: boolean) => {
      const k = quick ? 0.6 : 1;
      await Promise.all([
        (async () => {
          await run(animate(armLift, 1, { duration: 0.15, ease: EASE_OUT }));
          await run(animate(armAngle, REST_ANGLE, { duration: 0.55 * k, ease: EASE_IN_OUT }));
          await run(animate(armLift, 0, { duration: 0.2, ease: "easeInOut" }));
        })(),
        run(animate(speed, 0, { duration: 0.9 * k, ease: "easeOut" })),
      ]);
    },
    [armAngle, armLift, run, speed]
  );

  /** Back to the shop: the record flies home to its sleeve while the deck fades out. */
  const returnToShop = useCallback(
    async (quick: boolean) => {
      const r = onPlatterRef.current;
      const platter = platterCenterRef.current;
      const item = r && items.current.get(r.slug);
      const disc = item?.disc();
      if (!r || !platter || !item || !disc) return;
      const s = stageScaleRef.current;
      const pc = centerOf(platter);
      const dc = centerOf(disc);
      const target = { x: dc.x - pc.x, y: dc.y - pc.y, s: (SLEEVE_DISC / DISC) * s };
      const startRot = rotation.get();
      fx.set(0);
      fy.set(0);
      fScale.set(s);
      fRotate.set(startRot);
      fLift.set(0);
      setFlyer({ record: r, left: pc.x - DISC / 2, top: pc.y - DISC / 2 });
      placeOnPlatter(null);
      setView("shop");
      run(animate(field, SHOP_FIELD, { duration: 0.5, ease: "easeInOut" }));
      await nextFrame();
      const k = quick ? 0.75 : 1;
      await Promise.all([
        run(animate(fx, target.x, { duration: 0.62 * k, ease: EASE_IN_OUT })),
        run(animate(fy, [0, Math.min(0, target.y) - 60, target.y], { duration: 0.62 * k, ease: ["easeOut", "easeIn"], times: [0, 0.45, 1] })),
        run(animate(fScale, [s, s * 1.04, target.s], { duration: 0.62 * k, ease: "easeInOut" })),
        run(animate(fLift, [0, 1, 0], { duration: 0.62 * k, ease: "easeInOut" })),
        // Land at 0° so it matches the disc drawn in the sleeve.
        run(animate(fRotate, Math.ceil(startRot / 360 + 0.15) * 360, { duration: 0.62 * k, ease: EASE_IN_OUT })),
      ]);
      setFlyer(null);
      setAwaySlug(null);
      setDeckRecord(null);
      try {
        sessionStorage.removeItem(LAST_PLAYED_KEY);
      } catch {}
    },
    [fLift, fRotate, fScale, field, fx, fy, placeOnPlatter, rotation, run]
  );

  const backToShop = useCallback(async () => {
    if (busy || !onPlatterRef.current) return;
    setBusy(true);
    setAnnounce(`Putting ${onPlatterRef.current.name} back`);
    await parkArm(false);
    await returnToShop(false);
    running.current = [];
    setBusy(false);
  }, [busy, parkArm, returnToShop]);

  const play = useCallback(
    async (r: VinylRecord) => {
      if (busy) return;
      activeRecord.current = r;
      setAnnounce(`Opening ${r.name}`);
      router.prefetch(r.href);

      if (reduceMotion) {
        setBusy(true);
        await fadeAndGo(r, 0.2);
        return;
      }

      const t = { cancelled: false };
      token.current = t;
      setBusy(true);
      setSequencing(true);
      setRaisedSlug(r.slug);

      // The arm starts its cue while the disc is still dropping, as a hand would.
      const raiseArm = async () => {
        await run(animate(armLift, 1, { duration: 0.15, ease: EASE_OUT }));
        await run(animate(armAngle, PLAY_ANGLE, { duration: 0.42, ease: EASE_IN_OUT }));
      };
      let armUp: Promise<void> | null = null;

      // Already on the deck: just drop the needle and go.
      const alreadyOn = onPlatterRef.current?.slug === r.slug;
      if (!alreadyOn) {
        if (onPlatterRef.current) {
          await parkArm(true);
          if (t.cancelled) return;
          await returnToShop(true);
          if (t.cancelled) return;
        }

        const item = items.current.get(r.slug);
        if (!item) return;
        const s = stageScaleRef.current;

        // 1 · The sleeve lifts out of the rack.
        run(animate(item.y, -18, { duration: 0.35, ease: EASE_OUT }));
        run(animate(item.scale, 1.04, { duration: 0.35, ease: EASE_OUT }));
        await wait(220);
        if (t.cancelled) return;

        // 2 · The disc slides the rest of the way out of the sleeve.
        await run(animate(item.slotX, SLEEVE * 0.45, { duration: 0.36, ease: EASE_OUT }));
        if (t.cancelled) return;

        // 3 · The shop gives way to the deck, tinted to the record, and the disc
        //     is carried across in an arc to the spindle.
        const disc = item.disc();
        const platter = platterCenterRef.current;
        if (!disc || !platter) return;
        setDeckRecord(r);
        setView("deck");
        run(animate(field, r.field, { duration: 0.6, ease: "easeInOut" }));
        const pc = centerOf(platter);
        const dc = centerOf(disc);
        const start = { x: dc.x - pc.x, y: dc.y - pc.y, s: (SLEEVE_DISC / DISC) * item.scale.get() * s };
        const rest = ((rotation.get() % 360) + 360) % 360;
        fx.set(start.x);
        fy.set(start.y);
        fScale.set(start.s);
        fRotate.set(0);
        fLift.set(0);
        setFlyer({ record: r, left: pc.x - DISC / 2, top: pc.y - DISC / 2 });
        setAwaySlug(r.slug);
        await nextFrame();

        // The empty sleeve settles back into the rack behind it.
        run(animate(item.y, 0, { duration: 0.5, delay: 0.1, ease: EASE_OUT }));
        run(animate(item.scale, 1, { duration: 0.5, delay: 0.1, ease: EASE_OUT }));

        await Promise.all([
          run(animate(fx, 0, { duration: 0.6, ease: EASE_IN_OUT })),
          run(animate(fy, [start.y, Math.min(start.y, 0) - 60, 0], { duration: 0.6, ease: ["easeOut", "easeIn"], times: [0, 0.45, 1] })),
          run(animate(fScale, [start.s, s * 1.05], { duration: 0.6, ease: EASE_OUT })),
          run(animate(fLift, 1, { duration: 0.3, ease: EASE_OUT })),
          // Turn a little in the air and arrive lined up with the platter.
          run(animate(fRotate, rest < 40 ? rest + 360 : rest, { duration: 0.6, ease: EASE_IN_OUT })),
        ]);
        if (t.cancelled) return;
        // Drop onto the spindle, then a tiny settle.
        armUp = raiseArm();
        await Promise.all([
          run(animate(fScale, [s * 1.05, s * 0.995, s], { duration: 0.24, ease: [GRAVITY, EASE_OUT], times: [0, 0.6, 1] })),
          run(animate(fLift, 0, { duration: 0.16, ease: GRAVITY })),
        ]);
        if (t.cancelled) return;
        placeOnPlatter(r);
        setFlyer(null);
        item.slotX.set(0);
      }

      // 4 · Spin up while the arm lifts and swings over the lead-in.
      run(animate(speed, RPM_DEG_PER_S, { duration: 0.6, ease: "easeIn" }));
      if (armUp || armAngle.get() !== PLAY_ANGLE) {
        await (armUp ?? raiseArm());
        await wait(40);
        if (t.cancelled) return;
        // 5 · Cue lever down: the needle lowers into the groove.
        await run(animate(armLift, 0, { duration: 0.2, ease: [0.33, 0, 0.67, 1] }));
      }
      await wait(alreadyOn ? 250 : 160);
      if (t.cancelled) return;

      // 6 · Into the label: it grows until it fills the screen, then the page colour.
      const pc = centerOf(platterCenterRef.current!);
      const size = LABEL * stageScaleRef.current;
      const cover = (2 * Math.hypot(Math.max(pc.x, window.innerWidth - pc.x), Math.max(pc.y, window.innerHeight - pc.y))) / size;
      overlayScale.set(1);
      overlayOpacity.set(0);
      setOverlay({ kind: "zoom", x: pc.x, y: pc.y, size, color: r.accent });
      await nextFrame();
      if (t.cancelled) return;
      await Promise.all([
        run(animate(overlayScale, cover, { duration: 0.42, ease: [0.7, 0, 0.84, 0] })),
        run(animate(overlayOpacity, 1, { duration: 0.14, ease: "easeOut" })),
      ]);
      if (t.cancelled || !overlayRef.current) return;
      await run(animate(overlayRef.current, { backgroundColor: PAGE_BG }, { duration: 0.18, ease: "easeOut" }));
      if (t.cancelled) return;
      go(r);
    },
    [
      armAngle, armLift, busy, fLift, fRotate, fScale, fadeAndGo, field, fx, fy, go, overlayOpacity, overlayScale,
      parkArm, placeOnPlatter, reduceMotion, returnToShop, rotation, router, run, speed,
    ]
  );

  // Escape skips a running sequence; on the deck it goes back to the shop.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (sequencing) skip();
      else if (view === "deck") void backToShop();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sequencing, skip, view, backToShop]);

  const onIntent = useCallback(
    (r: VinylRecord, index: number) => {
      setHoverIndex(index);
      router.prefetch(r.href);
    },
    [router]
  );

  /** Arrow keys move between the records. */
  const onShopKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as { [key: string]: number })[e.key];
    if (!step) return;
    const buttons = [...e.currentTarget.querySelectorAll<HTMLButtonElement>(".rec-item-btn")];
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    e.preventDefault();
    buttons[(Math.max(i, 0) + step + buttons.length) % buttons.length]?.focus();
  };

  const accent = deckRecord?.accent ?? "#1F6B3A";

  return (
    <motion.div
      className="rec-surface relative w-full"
      style={{ backgroundColor: field, marginTop: -NAV_SPACE, paddingTop: NAV_SPACE, ["--accent" as string]: accent, ["--rec-field" as string]: field }}
    >
      {/* Desktop: the shop and the deck share one stage. */}
      <div ref={stageWrapRef} className="relative hidden min-[900px]:block" style={{ height: `calc(100vh - ${NAV_SPACE}px)`, minHeight: 520 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative" style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${stageScale})`, flex: "none" }}>
            {/* ---- Shop ---- */}
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: view === "shop" ? 1 : 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ pointerEvents: view === "shop" ? "auto" : "none" }}
              inert={view !== "shop"}
            >
              {/* The hovered record's number, huge and faint, behind the rack. */}
              <div className="pointer-events-none absolute inset-x-0 top-[110px] flex justify-center" aria-hidden="true">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={hoverIndex}
                    className="rec-ink select-none text-[320px] font-bold leading-none tracking-[-0.05em]"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 0.07, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  >
                    {pad(hoverIndex + 1)}
                  </motion.span>
                </AnimatePresence>
              </div>

              <header className="absolute left-0 top-0 flex flex-col gap-3">
                <WorkCrumb page="Records" className="rec-ink" />
                <div className="flex items-center gap-4">
                  <RecordsMark />
                  <h1 className="rec-ink text-[44px] font-bold leading-none tracking-[-0.03em]">Aadi&apos;s Records</h1>
                </div>
                <p className="rec-mono rec-ink text-[14px] opacity-80">Four case studies, pressed on vinyl. Put one on.</p>
              </header>

              <div
                role="group"
                aria-label="Records"
                className="absolute left-0 top-[150px] flex items-start"
                style={{ gap: 92 }}
                onKeyDown={onShopKeyDown}
              >
                {RECORDS.map((r, i) => (
                  <RecordItem
                    key={r.slug}
                    record={r}
                    index={i}
                    away={awaySlug === r.slug}
                    raised={raisedSlug === r.slug}
                    busy={busy}
                    register={register}
                    onPlay={play}
                    onIntent={onIntent}
                  />
                ))}
              </div>

              <p className="rec-mono rec-ink absolute bottom-0 left-0 text-[12px] opacity-60">← → to browse · Enter to play</p>
            </motion.div>

            {/* ---- Deck ---- */}
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: view === "deck" ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ pointerEvents: view === "deck" ? "auto" : "none" }}
              inert={view !== "deck"}
            >
              <div className="absolute left-0 top-0 flex w-[360px] flex-col items-start gap-5">
                <button type="button" className="rec-link" onClick={() => void backToShop()} disabled={busy}>
                  <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
                    <path d="M21 6H2M6.5 1.5 2 6l4.5 4.5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  All records
                </button>
                {deckRecord && (
                  <>
                    <h2 className="rec-ink mt-4 text-[52px] font-bold leading-[0.95] tracking-[-0.035em]">{deckRecord.name}</h2>
                    <p className="rec-mono rec-ink text-[15px] leading-relaxed opacity-80">{deckRecord.headline}</p>
                    <span className="rec-stamp rec-ink">{deckRecord.year}</span>
                    {onPlatter && !sequencing && (
                      <button type="button" className="rec-link mt-6 underline underline-offset-4" onClick={() => void play(deckRecord)}>
                        Read the case study ↗
                      </button>
                    )}
                  </>
                )}
              </div>

              <div className="absolute" style={{ left: STAGE_W - DECK_W - 60, top: (STAGE_H - DECK_H) / 2 }}>
                <Turntable
                  record={onPlatter}
                  accent={accent}
                  rotation={rotation}
                  armAngle={armAngle}
                  armLift={armLift}
                  platterCenterRef={platterCenterRef}
                />
                <button
                  type="button"
                  className="rec-round absolute bottom-6 right-6"
                  onClick={() => void backToShop()}
                  disabled={busy || !onPlatter}
                  aria-label={onPlatter ? `Stop ${onPlatter.name} and put it back` : "Turntable is empty"}
                  style={{ opacity: onPlatter && !busy ? 1 : 0.4 }}
                >
                  <span className="block h-3.5 w-3.5 bg-white" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Phones and narrow windows: the rack as a list; a tap fades straight to the case study. */}
      <ul className="mx-auto flex min-h-[calc(100vh-140px)] max-w-md flex-col gap-5 px-5 pb-16 pt-4 min-[900px]:hidden">
        <li className="mb-2">
          <WorkCrumb page="Records" className="rec-ink mb-4" />
          <h1 className="rec-ink text-[32px] font-bold leading-none tracking-[-0.03em]">Aadi&apos;s Records</h1>
          <p className="rec-mono rec-ink mt-2 text-[13px] opacity-80">Four case studies, pressed on vinyl.</p>
        </li>
        {RECORDS.map((r) => (
          <li key={r.slug}>
            <button
              type="button"
              onClick={() => {
                if (busy) return;
                activeRecord.current = r;
                setBusy(true);
                setAnnounce(`Opening ${r.name}`);
                void fadeAndGo(r, 0.15);
              }}
              className="flex w-full items-center gap-4 text-left"
            >
              <div className="shrink-0">
                <Sleeve record={r} size={92} />
              </div>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="rec-mono rec-ink text-[11px] opacity-70">
                  {r.company} · {r.year}
                </span>
                <span className="rec-ink text-[18px] font-bold tracking-tight">{r.name}</span>
                <span className="rec-mono rec-ink text-[12px] leading-snug opacity-80">{r.headline}</span>
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
            {flyer && (
              <motion.div
                className="pointer-events-none fixed z-[90]"
                style={{ left: flyer.left, top: flyer.top, width: DISC, height: DISC, x: fx, y: fy, scale: fScale, willChange: "transform" }}
              >
                <motion.div
                  className="absolute inset-[4%] rounded-full bg-[#0a2816]"
                  style={{ opacity: fShadowOpacity, y: fShadowY, filter: "blur(22px)" }}
                />
                <Disc record={flyer.record} size={DISC} rotate={fRotate} />
              </motion.div>
            )}
            {overlay?.kind === "zoom" && (
              <motion.div
                ref={overlayRef}
                className="pointer-events-none fixed z-[100] rounded-full"
                style={{
                  left: overlay.x - overlay.size / 2,
                  top: overlay.y - overlay.size / 2,
                  width: overlay.size,
                  height: overlay.size,
                  backgroundColor: overlay.color,
                  scale: overlayScale,
                  opacity: overlayOpacity,
                  willChange: "transform",
                }}
              />
            )}
            {overlay?.kind === "fade" && (
              <motion.div className="pointer-events-none fixed inset-0 z-[100]" style={{ backgroundColor: PAGE_BG, opacity: overlayOpacity }} />
            )}
            {/* While a record is on its way, a click anywhere skips to the case study. */}
            {sequencing && <div className="fixed inset-0 z-[95] cursor-pointer" onClick={skip} aria-hidden="true" />}
          </>,
          document.body
        )}
    </motion.div>
  );
}
