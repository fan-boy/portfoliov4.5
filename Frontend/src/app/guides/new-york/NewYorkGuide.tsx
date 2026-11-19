'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import WorkCrumb from "../../components/WorkCrumb";
import MosaicTablet from "./MosaicTablet";
import { CATEGORIES, CATEGORY, DAY, INTRO, METROCARD, PALETTES, STATIONS, type CategoryId, type Place } from "./data";
import { CREDITS } from "./credits";
import { Hand, KeepsakeView, Loose, MetroCard, NotebookScrap, SampleStamp, Scribble, TapedPrint, useNarrow } from "../shared/Scrapbook";

const NAV_SPACE = 140;
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
const INK = "#1d2026";
/** Accent tiles the cursor turns over on the wall: the tablet colours. */
const TRAIL_COLORS = ["#1F5C56", "#C9973F", "#A6513A", "#24384F"];
const TILE_W = 72;
const TILE_H = 36;

/* ============================================================
   Arrival: the tile wall and the NEW YORK tablet
   ============================================================ */

/**
 * Turns over the wall tile under the cursor to an accent colour, which fades
 * back to white. Only runs frames while a tile is still fading.
 */
function useTileTrail(enabled: boolean) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!enabled || !host || !canvas) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const ctx = canvas.getContext("2d")!;
    const lit = new Map<string, { x: number; y: number; at: number; color: string }>();
    let frame = 0;
    let colorIndex = 0;

    const size = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = host.clientWidth * dpr;
      canvas.height = host.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(host);

    const paint = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, host.clientWidth, host.clientHeight);
      for (const [key, t] of lit) {
        const age = (now - t.at) / 900;
        if (age >= 1) {
          lit.delete(key);
          continue;
        }
        ctx.globalAlpha = 0.85 * (1 - age) * (1 - age);
        ctx.fillStyle = t.color;
        ctx.beginPath();
        ctx.roundRect(t.x + 1.5, t.y + 1.5, TILE_W - 3, TILE_H - 3, 2.5);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame = lit.size ? requestAnimationFrame(paint) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const box = host.getBoundingClientRect();
      const px = e.clientX - box.left;
      const py = e.clientY - box.top;
      const row = Math.floor(py / TILE_H);
      const offset = row % 2 ? TILE_W / 2 : 0;
      const col = Math.floor((px + offset) / TILE_W);
      const key = `${row}:${col}`;
      if (!lit.has(key)) colorIndex = (colorIndex + 1) % TRAIL_COLORS.length;
      lit.set(key, { x: col * TILE_W - offset, y: row * TILE_H, at: performance.now(), color: lit.get(key)?.color ?? TRAIL_COLORS[colorIndex] });
      if (!frame) frame = requestAnimationFrame(paint);
    };
    host.addEventListener("pointermove", onMove);
    return () => {
      host.removeEventListener("pointermove", onMove);
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return { hostRef, canvasRef };
}

function Arrival({ reduce }: { reduce: boolean }) {
  const narrow = useNarrow(640);
  const [ready, setReady] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const { hostRef, canvasRef } = useTileTrail(!reduce);

  // A beat after the page has faded in, the tiles start going down.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 350);
    return () => window.clearTimeout(t);
  }, []);

  // Escape finishes the tablet at once.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSkipped(true);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      ref={hostRef}
      className="nyc-wall relative flex flex-col overflow-hidden"
      style={{ marginTop: -NAV_SPACE, paddingTop: NAV_SPACE, minHeight: "100svh" }}
      onClick={() => setSkipped(true)}
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-5xl px-6 pt-4" style={{ color: INK }}>
        <WorkCrumb page="New York" parent={{ href: "/about", label: "About" }} trail={["Guides"]} />
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-24">
        <h1 className="sr-only">New York</h1>
        <div className="w-full max-w-[920px] drop-shadow-[0_10px_18px_rgba(40,30,15,0.18)]">
          <MosaicTablet
            lines={narrow ? ["NEW", "YORK"] : ["NEW YORK"]}
            capHeight={narrow ? 11 : 13}
            palette={PALETTES.teal}
            play={ready}
            instant={reduce || skipped}
            maxCell={12}
          />
        </div>
        <p className="m-0 -mt-2 flex -rotate-2 flex-col items-center text-center sm:flex-row sm:items-end sm:gap-3">
          <svg width="34" height="40" viewBox="0 0 34 40" fill="none" aria-hidden="true" className="hidden sm:block" style={{ color: "#24398C" }}>
            <path d="M22 38 C 26 26, 10 18, 15 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M8 10 L 15 3 L 21 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <Hand size={28}>
            {INTRO.byline.toLowerCase()} — <span className="whitespace-nowrap">living here since {INTRO.since}</span>
          </Hand>
        </p>
      </div>
      <p className="pointer-events-none absolute inset-x-0 bottom-6 m-0 text-center font-mono text-[12px] opacity-50" style={{ color: INK }} aria-hidden="true">
        ↓
      </p>
    </section>
  );
}

/* ============================================================
   Shared bits
   ============================================================ */

function Bullet({ id, size = 22 }: { id: CategoryId; size?: number }) {
  const c = CATEGORY[id];
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-sans font-bold leading-none text-white"
      style={{ width: size, height: size, background: c.color, fontSize: size * 0.56 }}
      aria-hidden="true"
    >
      {c.letter}
    </span>
  );
}

/** A 3:2 film frame: the scan if there is one, a tinted placeholder if not. */
function Frame({ place, sizes, className = "" }: { place: Place; sizes: string; className?: string }) {
  return (
    <div
      className={`relative aspect-[3/2] overflow-hidden ${place.photo ? "" : "nyc-frame-empty"} ${className}`}
      style={{ ["--cat" as string]: CATEGORY[place.category].color }}
    >
      {place.photo ? (
        <Image src={place.photo} alt={place.name} fill sizes={sizes} className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] tracking-[0.04em] opacity-50" style={{ color: INK }}>
          35mm scan goes here
        </span>
      )}
      {place.sample && (
        <span className="absolute left-2.5 top-2.5" style={{ color: INK }}>
          <SampleStamp />
        </span>
      )}
    </div>
  );
}

/* ============================================================
   My New York
   ============================================================ */

function Intro() {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-24 md:grid-cols-[1fr_260px] md:gap-6 md:py-32">
      <div className="flex flex-col gap-5">
        <h2 className="m-0 text-sm uppercase tracking-wider text-fonttertiary">My New York</h2>
        <NotebookScrap>
          <p className="m-0 mb-[36px] font-bold">
            {INTRO.neighbourhood}, {INTRO.years}
          </p>
          {INTRO.body.map((p) => (
            <p key={p} className="m-0 mb-[36px] last:mb-0">
              {p}
            </p>
          ))}
          {INTRO.sample && (
            <span className="absolute bottom-3 right-4 text-fontmuted">
              <SampleStamp />
            </span>
          )}
        </NotebookScrap>
      </div>
      <div className="flex items-start justify-center md:justify-start md:pt-28">
        <Loose seed="metrocard">
          <MetroCard {...METROCARD} />
        </Loose>
      </div>
    </section>
  );
}

/* ============================================================
   Favourites, by station
   ============================================================ */

function FilterSign({ active, onChange }: { active: CategoryId | null; onChange: (c: CategoryId | null) => void }) {
  return (
    <div className="sticky top-[76px] z-30 mx-auto max-w-5xl px-6">
      <div className="nyc-sign rounded-[4px] px-4 pb-3 pt-5 shadow-[0_8px_20px_rgba(0,0,0,0.12)]" role="toolbar" aria-label="Show places by kind">
        <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] sm:gap-2">
          <span className="mr-2 shrink-0 text-[15px] font-bold">Show</span>
          <button
            type="button"
            aria-pressed={active === null}
            onClick={() => onChange(null)}
            className={`flex h-10 shrink-0 items-center rounded-full px-3 text-[15px] transition-opacity duration-150 ${active === null ? "opacity-100" : "opacity-45 hover:opacity-80"}`}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onClick={() => onChange(active === c.id ? null : c.id)}
              className={`flex h-10 shrink-0 items-center gap-2 rounded-full px-2.5 text-[15px] transition-opacity duration-150 ${
                active === null || active === c.id ? "opacity-100" : "opacity-45 hover:opacity-80"
              }`}
            >
              <Bullet id={c.id} size={24} />
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaceCard({ place }: { place: Place }) {
  const c = CATEGORY[place.category];
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15, ease: "easeIn" } }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className="flex list-none flex-col gap-3"
    >
      <TapedPrint seed={place.name}>
        <Frame place={place} sizes="(min-width: 1024px) 310px, (min-width: 640px) 45vw, 100vw" />
      </TapedPrint>
      <div className="mt-2 flex flex-col gap-1">
        <h4 className="m-0 text-lg font-normal text-fontprimary">{place.name}</h4>
        <p className="m-0 flex items-center gap-2 text-sm text-fonttertiary">
          <Bullet id={place.category} size={18} />
          <span>{c.label}</span>
        </p>
        <Hand size={23} className="mt-1 leading-[1.15] text-pretty">
          {place.note}
        </Hand>
      </div>
    </motion.li>
  );
}

function StationSection({ station, filter, reduce, narrow }: { station: (typeof STATIONS)[number]; filter: CategoryId | null; reduce: boolean; narrow: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const places = station.places.filter((p) => !filter || p.category === filter);
  return (
    <motion.section
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className="flex flex-col gap-10"
      aria-labelledby={`st-${station.station}`}
    >
      <div ref={ref} className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_auto]">
      <div className="flex flex-col items-start gap-3">
        <h3 id={`st-${station.station}`} className="sr-only">
          {station.station}, {station.neighbourhood}
        </h3>
        <div className="flex w-full max-w-[640px] flex-wrap items-center gap-x-3 gap-y-1">
        <div className="w-full max-w-[520px]">
          <MosaicTablet
            lines={[station.station]}
            capHeight={9}
            palette={PALETTES[station.palette]}
            play={seen}
            instant={reduce}
            speed={1.7}
            maxCell={narrow ? 6 : 8}
            className="!justify-start"
          />
        </div>
        {station.scribble && <Scribble text={station.scribble} to="up" className="-mt-1 ml-6 -rotate-3" />}
        </div>
        <p className="m-0 text-sm uppercase tracking-wider text-fonttertiary" aria-hidden="true">
          {station.neighbourhood}
        </p>
      </div>
      {station.keepsake && (
        <Loose seed={station.station} className="justify-self-start md:mr-6 md:-mt-4 md:justify-self-end">
          <KeepsakeView item={station.keepsake} />
        </Loose>
      )}
      </div>
      <ul className="m-0 grid grid-cols-1 gap-x-8 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {places.map((p) => (
            <PlaceCard key={p.name} place={p} />
          ))}
        </AnimatePresence>
      </ul>
    </motion.section>
  );
}

function Favourites({ reduce }: { reduce: boolean }) {
  const [filter, setFilter] = useState<CategoryId | null>(null);
  const narrow = useNarrow(640);
  const visible = STATIONS.filter((s) => s.places.some((p) => !filter || p.category === filter));
  return (
    <div className="pb-32">
      <FilterSign active={filter} onChange={setFilter} />
      <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-28 px-6">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((s) => (
            <StationSection key={s.station} station={s} filter={filter} reduce={reduce} narrow={narrow} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================
   One perfect day: a train ride between the stops
   ============================================================ */

const LINE = "#24313D";

/** Rides between stops: the train dwells at each one, then travels. Returns 0..1 along the line. */
function ride(progress: number, stops: number) {
  const s = Math.min(Math.max(progress, 0), 1) * (stops - 1);
  const i = Math.min(Math.floor(s), stops - 2);
  const frac = s - i;
  const travel = Math.min(Math.max((frac - 0.3) / 0.4, 0), 1);
  const eased = travel < 0.5 ? 4 * travel ** 3 : 1 - (-2 * travel + 2) ** 3 / 2;
  return (i + eased) / (stops - 1);
}

function DayRide() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);
  const [stop, setStop] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const along = useTransform(scrollYProgress, (p) => ride(p, DAY.length));
  const trainX = useTransform(along, (a) => a * trackW);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setTrackW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Doors open when the train is at a stop, not between them.
  useMotionValueEvent(along, "change", (a) => {
    const at = Math.round(a * (DAY.length - 1));
    if (at !== stop) setStop(at);
  });

  const current = DAY[stop];
  return (
    <section ref={sectionRef} className="relative" style={{ height: `${DAY.length * 70}vh` }} aria-label="One perfect day">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-10 overflow-hidden pt-24">
        <div className="mx-auto flex w-full max-w-5xl items-baseline justify-between px-6">
          <h2 className="m-0 text-sm uppercase tracking-wider text-fonttertiary">One perfect day</h2>
          <p className="m-0 font-mono text-[13px] tabular-nums text-fontmuted" aria-live="polite">
            Stop {stop + 1} of {DAY.length}
          </p>
        </div>

        {/* The stop: doors part onto the photo. */}
        <div className="mx-auto grid w-full max-w-5xl grid-cols-[1.35fr_1fr] items-center gap-12 px-6">
          <TapedPrint seed={current.name} hover={false}>
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div key={stop} initial={{ opacity: 1 }} exit={{ opacity: 1 }} className="relative">
                <Frame place={current} sizes="(min-width: 1024px) 560px, 55vw" />
                <motion.span
                  className="nyc-door nyc-door-left"
                  initial={{ x: "0%" }}
                  animate={{ x: "-101%" }}
                  transition={{ duration: 0.55, delay: 0.1, ease: EASE_IN_OUT }}
                />
                <motion.span
                  className="nyc-door nyc-door-right"
                  initial={{ x: "0%" }}
                  animate={{ x: "101%" }}
                  transition={{ duration: 0.55, delay: 0.1, ease: EASE_IN_OUT }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          </TapedPrint>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={stop}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.25, ease: EASE_OUT } }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.15, ease: "easeIn" } }}
              className="flex flex-col gap-3"
            >
              <p className="m-0 font-mono text-[15px] tabular-nums text-fontmuted">{current.time}</p>
              <h3 className="m-0 text-3xl font-normal leading-tight text-fontprimary">{current.name}</h3>
              <p className="m-0 flex items-center gap-2 text-sm text-fonttertiary">
                <Bullet id={current.category} size={20} />
                {CATEGORY[current.category].label}
              </p>
              <Hand size={28} className="leading-[1.1] text-pretty">
                {current.note}
              </Hand>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* The line: stops as a strip map, the train riding along it. */}
        <div className="mx-auto w-full max-w-5xl px-6 pb-6">
          <div ref={trackRef} className="relative mx-12 h-[86px]">
            <div className="absolute inset-x-0 top-[34px] h-[6px] rounded-full" style={{ background: LINE }} />
            {DAY.map((d, i) => {
              const left = `${(i / (DAY.length - 1)) * 100}%`;
              const here = i === stop;
              return (
                <div key={d.time} className="absolute top-0 flex -translate-x-1/2 flex-col items-center" style={{ left }}>
                  <span className="font-mono text-[11px] tabular-nums text-fontmuted">{d.time}</span>
                  <span
                    className="mt-[9px] box-border block size-[18px] rounded-full border-[3px] bg-white transition-[background-color,border-color] duration-200"
                    style={{ borderColor: here ? CATEGORY[d.category].color : LINE, background: here ? CATEGORY[d.category].color : "#fff" }}
                  />
                  <span className={`mt-2 max-w-[110px] truncate text-[12px] transition-colors duration-200 ${here ? "text-fontprimary" : "text-fontmuted"}`}>{d.name}</span>
                </div>
              );
            })}
            {/* The train: one car, centred on its position. */}
            <motion.div className="absolute left-0 top-[23px] -ml-[32px]" style={{ x: trainX }} aria-hidden="true">
              <div className="flex h-[28px] w-[64px] items-center justify-center gap-[5px] rounded-[7px] border border-[#6d747b] bg-[#c3c9ce] shadow-[0_3px_6px_rgba(0,0,0,0.18)]">
                {[0, 1, 2, 3].map((w) => (
                  <span key={w} className="h-[11px] w-[9px] rounded-[2px] bg-[#3b4249]" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Phones and reduced motion: the same day, as a plain timetable. */
function DayList() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24" aria-label="One perfect day">
      <h2 className="m-0 mb-10 text-sm uppercase tracking-wider text-fonttertiary">One perfect day</h2>
      <ol className="m-0 flex list-none flex-col p-0">
        {DAY.map((d, i) => (
          <li key={d.time} className="grid grid-cols-[52px_22px_1fr] gap-x-4">
            <span className="pt-0.5 font-mono text-[13px] tabular-nums text-fontmuted">{d.time}</span>
            <span className="flex flex-col items-center">
              <Bullet id={d.category} size={22} />
              {i < DAY.length - 1 && <span className="w-[4px] flex-1 rounded-full" style={{ background: LINE }} />}
            </span>
            <div className="flex flex-col gap-1 pb-10">
              <h3 className="m-0 text-lg font-normal text-fontprimary">{d.name}</h3>
              <Hand size={23} className="leading-[1.15] text-pretty">
                {d.note}
              </Hand>
              <TapedPrint seed={d.name} hover={false} className="mt-4 max-w-[420px]">
                <Frame place={d} sizes="80vw" />
              </TapedPrint>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ============================================================
   Sign-off: the way out
   ============================================================ */

function Exit({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <section className="nyc-wall relative" aria-label="Exit">
      <div ref={ref} className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-28">
        <Link href="/about" className="group flex flex-col items-center gap-5 outline-none" aria-label="Exit to About">
          <div className="w-[240px] transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1" style={{ transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}>
            <MosaicTablet lines={["EXIT"]} capHeight={9} palette={PALETTES.navy} play={seen} instant={reduce} speed={1.6} maxCell={9} />
          </div>
          <span className="font-mono text-[13px] group-focus-visible:underline" style={{ color: INK }}>
            ↑ To About
          </span>
        </Link>
        <p className="m-0 font-mono text-[13px] opacity-60" style={{ color: INK }}>
          Next guide: Mumbai, coming soon
        </p>
        {CREDITS.length > 0 && (
          <details className="mt-6 max-w-2xl font-mono text-[11px] leading-relaxed" style={{ color: INK }}>
            <summary className="cursor-pointer text-center opacity-60 transition-opacity duration-150 hover:opacity-100">Photo credits</summary>
            <ul className="m-0 mt-3 list-none p-0 opacity-70">
              {CREDITS.map((c) => (
                <li key={c.file}>
                  {c.place}: <a href={c.source} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">{c.author}</a>, {c.license}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}

export default function NewYorkGuide() {
  const reduce = !!useReducedMotion();
  const narrow = useNarrow(900);
  return (
    <div className="w-full">
      <Arrival reduce={reduce} />
      <Intro />
      <Favourites reduce={reduce} />
      {narrow || reduce ? <DayList /> : <DayRide />}
      <Exit reduce={reduce} />
    </div>
  );
}
