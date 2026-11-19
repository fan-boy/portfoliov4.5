'use client'
import WorkCrumb from "../components/WorkCrumb";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { animate, motion, motionValue, useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";
import Bib from "./Bib";
import { RECORDS, type VinylRecord } from "../records/data";

/* ---------- Sizes, in stage px ---------- */
const STAGE_W = 1290;
const STAGE_H = 640;
const NAV_SPACE = 140;
const PAGE_BG = "#FAFAFA";
/** Pale track clay. */
const FIELD = "#F2D6C9";
const BIB_W = 250;
/** How the bibs hang: a few degrees off, a little up or down. */
const HANG = [
  { tilt: -3, y: 0 },
  { tilt: 2.5, y: 36 },
  { tilt: -1.5, y: -6 },
  { tilt: 3, y: 24 },
];
/** Where the picked bib comes to, and how big. The number sits 41% of the way down. */
const CENTER = { x: STAGE_W / 2, y: STAGE_H / 2 + 10, scale: 1.7 };
const NUMBER_Y = 0.41;

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
const GRAVITY = [0.5, 0, 0.75, 0] as const;
const DIVE = [0.7, 0, 0.84, 0] as const;

type Controls = ReturnType<typeof animate>;
type BibMotion = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  pins: MotionValue<number>[];
  tear: MotionValue<number>;
  el: () => HTMLElement | null;
};

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
const pad = (n: number) => String(n).padStart(2, "0");

/* ---------- One bib on the wall ---------- */
function BibItem({
  record,
  index,
  dimmed,
  picked,
  busy,
  register,
  onPick,
  onIntent,
}: {
  record: VinylRecord;
  index: number;
  dimmed: boolean;
  picked: boolean;
  busy: boolean;
  register: (slug: string, m: BibMotion) => void;
  onPick: (r: VinylRecord) => void;
  onIntent: (r: VinylRecord) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const pins = useRef([0, 1, 2, 3].map(() => motionValue(0))).current;
  const tear = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    register(record.slug, { x, y, scale, pins, tear, el: () => ref.current });
  }, [pins, record.slug, register, scale, tear, x, y]);

  const hang = HANG[index % HANG.length];
  return (
    <motion.div
      className="relative"
      style={{ marginTop: hang.y, zIndex: picked ? 30 : 1 }}
      initial={false}
      animate={{ opacity: dimmed ? 0 : 1, y: dimmed ? 18 : 0 }}
      transition={{ duration: 0.32, ease: "easeOut", delay: dimmed ? index * 0.03 : 0 }}
    >
      <motion.div ref={ref} style={{ x, y, scale, originY: NUMBER_Y }}>
        <button
          type="button"
          className="bb-item"
          aria-disabled={busy || undefined}
          aria-label={`Open ${record.name}: ${record.headline}`}
          onClick={() => onPick(record)}
          onMouseEnter={() => onIntent(record)}
          onFocus={() => onIntent(record)}
        >
          <div className={`bb-item-hover ${picked ? "is-picked" : ""}`} style={{ ["--tilt" as string]: `${hang.tilt}deg` }}>
            <Bib record={record} number={pad(index + 1)} width={BIB_W} pins={pins} tear={tear} />
          </div>
        </button>
      </motion.div>
      <motion.p
        className="bb-mono bb-ink mt-6 max-w-[240px] text-[12px] leading-relaxed opacity-70"
        initial={false}
        animate={{ opacity: picked ? 0 : 0.7 }}
        transition={{ duration: 0.2 }}
      >
        {record.headline}
      </motion.p>
    </motion.div>
  );
}

/* ---------- The scene ---------- */
export default function BibScene() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const items = useRef(new Map<string, BibMotion>());
  const register = useCallback((slug: string, m: BibMotion) => {
    items.current.set(slug, m);
  }, []);

  const [active, setActive] = useState<VinylRecord | null>(null);
  const [busy, setBusy] = useState(false);
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

  const go = useCallback((r: VinylRecord) => router.push(r.href), [router]);

  /** Reduced motion, phones and skips: a short crossfade to the page colour, then go. */
  const fadeAndGo = useCallback(
    async (r: VinylRecord, seconds: number) => {
      fade.set(0);
      setFading(true);
      await nextFrame();
      await animate(fade, 1, { duration: seconds, ease: "easeOut" });
      go(r);
    },
    [fade, go]
  );

  const pick = useCallback(
    async (r: VinylRecord) => {
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
      const el = item?.el();
      if (!item || !stage || !el) return;

      // 1 · The others step back; the four pins pop off, one corner after another.
      setActive(r);
      await Promise.all(
        item.pins.map((p, i) => run(animate(p, 1, { duration: 0.34, delay: i * 0.08, ease: EASE_OUT })))
      );
      if (t.cancelled) return;

      // 2 · The bib comes off the wall to the middle, straightened and closer.
      const s = stageScaleRef.current;
      const sr = stage.getBoundingClientRect();
      const br = el.getBoundingClientRect();
      // Measure the point the bib scales around: its centre, at the height of the number.
      const ox = (br.left + br.width / 2 - sr.left) / s;
      const oy = (br.top + br.height * NUMBER_Y - sr.top) / s;
      await Promise.all([
        run(animate(item.x, CENTER.x - ox, { duration: 0.65, ease: EASE_IN_OUT })),
        run(animate(item.y, CENTER.y - oy, { duration: 0.65, ease: EASE_IN_OUT })),
        run(animate(item.scale, CENTER.scale, { duration: 0.65, ease: EASE_IN_OUT })),
      ]);
      if (t.cancelled) return;

      // 3 · The timing strip tears off along the perforation and drops away.
      await run(animate(item.tear, 1, { duration: 0.6, ease: GRAVITY }));
      if (t.cancelled) return;
      await wait(120);

      // 4 · Into the number: the bib grows until the paper fills the screen, then the page.
      run(animate(item.scale, CENTER.scale * 18, { duration: 0.75, ease: DIVE }));
      await wait(430);
      fade.set(0);
      setFading(true);
      await nextFrame();
      await run(animate(fade, 1, { duration: 0.3, ease: "easeIn" }));
      if (t.cancelled) return;
      go(r);
    },
    [busy, fade, fadeAndGo, go, reduceMotion, router, run]
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

  const onIntent = useCallback((r: VinylRecord) => !busy && router.prefetch(r.href), [busy, router]);

  const onWallKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as { [k: string]: number })[e.key];
    if (!step) return;
    const buttons = [...e.currentTarget.querySelectorAll<HTMLButtonElement>(".bb-item")];
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    e.preventDefault();
    buttons[(Math.max(i, 0) + step + buttons.length) % buttons.length]?.focus();
  };

  return (
    <div className="relative w-full" style={{ background: FIELD, marginTop: -NAV_SPACE, paddingTop: NAV_SPACE, ["--bb-field" as string]: FIELD }}>
      {/* Desktop: the bibs pinned to the wall. */}
      <div ref={wrapRef} className="relative hidden overflow-hidden min-[900px]:block" style={{ height: `calc(100vh - ${NAV_SPACE}px)`, minHeight: 520 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={stageRef} className="relative" style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${stageScale})`, flex: "none" }}>
            <motion.header
              className="absolute left-0 top-0"
              initial={false}
              animate={{ opacity: active ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <WorkCrumb page="Races" className="bb-ink mb-3" />
              <h1 className="bb-ink text-[44px] font-bold leading-none tracking-[-0.03em]">Aadi&apos;s Races</h1>
              <p className="bb-mono bb-ink mt-3 text-[14px] opacity-80">Four case studies, four races. Pick a bib.</p>
            </motion.header>

            <div
              role="group"
              aria-label="Race bibs"
              className="absolute inset-x-0 flex items-start justify-center"
              style={{ top: 170, gap: 64 }}
              onKeyDown={onWallKeyDown}
            >
              {RECORDS.map((r, i) => (
                <BibItem
                  key={r.slug}
                  record={r}
                  index={i}
                  dimmed={!!active && active.slug !== r.slug}
                  picked={active?.slug === r.slug}
                  busy={busy}
                  register={register}
                  onPick={pick}
                  onIntent={onIntent}
                />
              ))}
            </div>

            <motion.p
              className="bb-mono bb-ink absolute bottom-0 left-0 text-[12px] opacity-60"
              initial={false}
              animate={{ opacity: active ? 0 : 0.6 }}
            >
              ← → to browse · Enter to open
            </motion.p>
          </div>
        </div>
      </div>

      {/* Phones and narrow windows: the bibs as a list; a tap fades straight to the case study. */}
      <ul className="mx-auto flex min-h-[calc(100vh-140px)] max-w-md flex-col gap-7 px-5 pb-16 pt-4 min-[900px]:hidden">
        <li className="mb-1">
          <WorkCrumb page="Races" className="bb-ink mb-4" />
          <h1 className="bb-ink text-[32px] font-bold leading-none tracking-[-0.03em]">Aadi&apos;s Races</h1>
          <p className="bb-mono bb-ink mt-2 text-[13px] opacity-80">Four case studies, four races.</p>
        </li>
        {RECORDS.map((r, i) => (
          <li key={r.slug}>
            <button
              type="button"
              className="flex w-full items-center gap-4 text-left"
              onClick={() => {
                if (busy) return;
                setBusy(true);
                setAnnounce(`Opening ${r.name}`);
                void fadeAndGo(r, 0.15);
              }}
            >
              <div className="shrink-0">
                <Bib record={r} number={pad(i + 1)} width={120} />
              </div>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="bb-ink text-[18px] font-bold tracking-tight">{r.name}</span>
                <span className="bb-mono bb-ink text-[12px] leading-snug opacity-75">{r.headline}</span>
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
            {fading && <motion.div className="pointer-events-none fixed inset-0 z-[100]" style={{ background: PAGE_BG, opacity: fade }} />}
            {busy && active && <div className="fixed inset-0 z-[95] cursor-pointer" onClick={skip} aria-hidden="true" />}
          </>,
          document.body
        )}
    </div>
  );
}
