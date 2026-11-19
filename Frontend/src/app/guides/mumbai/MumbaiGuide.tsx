'use client'
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import WorkCrumb from "../../components/WorkCrumb";
import { Hand, KeepsakeView, Loose, SampleStamp, TapedPrint, tiltFor } from "../shared/Scrapbook";
import { BOARDS, DAY, INTRO, MONSOON, SIGNOFF, type BoardPalette, type DaySection, type Place } from "./data";
import { CREDITS } from "./credits";
import StationDiamond from "./StationDiamond";
import MarineDriveArt from "./MarineDriveArt";

const NAV_SPACE = 140;
const INK = "#1d1a14";
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/* ============================================================
   Painted board: a shop sign whose letters paint themselves in.
   Each part of the day opens with one.
   ============================================================ */

function Screws() {
  return (
    <>
      {[
        { left: 8, top: 8, turn: "20deg" },
        { right: 8, top: 8, turn: "-40deg" },
        { left: 8, bottom: 8, turn: "65deg" },
        { right: 8, bottom: 8, turn: "5deg" },
      ].map(({ turn, ...pos }, i) => (
        <span key={i} className="mb-screw" style={{ ...pos, ["--turn" as string]: turn }} aria-hidden="true" />
      ))}
    </>
  );
}

function PaintedBoard({
  text,
  deva,
  palette,
  painted,
  instant,
}: {
  text: string;
  deva: string;
  palette: BoardPalette;
  painted: boolean;
  instant: boolean;
}) {
  const vars = {
    ["--ground" as string]: palette.ground,
    ["--ink" as string]: palette.ink,
    ["--shadow" as string]: palette.shadow,
    ["--rim" as string]: palette.rim,
    ["--rim-gap" as string]: "7px",
    ["--rim-w" as string]: "2px",
  };
  const timing = (dur: number, delay: number) =>
    ({ ["--dur" as string]: instant ? "0ms" : `${dur}ms`, ["--delay" as string]: instant ? "0ms" : `${delay}ms` }) as React.CSSProperties;
  return (
    <div
      className={`mb-board px-9 pb-4 pt-5 ${painted || instant ? "is-painted" : ""}`}
      style={vars}
      aria-hidden="true"
    >
      <Screws />
      <span className="mb-paint mb-sign" style={{ fontSize: 54 }}>
        <span className="mb-paint-layer mb-paint-shadow" style={timing(900, 260)}>
          {text}
        </span>
        <span className="mb-paint-layer mb-paint-ink" style={timing(900, 0)}>
          {text}
        </span>
      </span>
      <span className="mb-paint mb-sign mt-[0.1em]" style={{ fontSize: 24 }}>
        <span className="mb-paint-layer mb-paint-ink" style={timing(650, 700)}>
          {deva}
        </span>
      </span>
    </div>
  );
}

/* ============================================================
   Arrival
   ============================================================ */

function Arrival({ reduce }: { reduce: boolean }) {
  const [painted, setPainted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setPainted(true), 400);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSkipped(true);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <section
      className="mb-wall relative flex flex-col overflow-hidden"
      style={{ marginTop: -NAV_SPACE, paddingTop: NAV_SPACE, minHeight: "100svh" }}
      onClick={() => setSkipped(true)}
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-4" style={{ color: INK }}>
        <WorkCrumb page="Mumbai" parent={{ href: "/about", label: "About" }} trail={["Guides"]} />
      </div>
      {/* Art Deco, as on the Marine Drive and Oval Maidan buildings: fan scallops over the wall, a sunburst behind the board. */}
      <span className="mb-deco" aria-hidden="true" />
      <span className="mb-sunburst" aria-hidden="true" />
      <div className="relative flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-24">
        <h1 className="sr-only">Mumbai, मुंबई</h1>
        {/* Floating: a slow bob, with its shadow on the wall breathing in time. */}
        <div className={`mb-float w-[clamp(250px,40vw,410px)] ${reduce ? "" : "is-floating"}`}>
          <div className="-rotate-[2deg] drop-shadow-[0_26px_30px_rgba(30,20,5,0.22)]">
            <StationDiamond name="MUMBAI" deva="मुंबई" play={painted} instant={reduce || skipped} />
          </div>
        </div>
        <p className="mb-tape-label m-0 max-w-[300px] rotate-[2deg] text-center sm:max-w-none">
          <Hand size={28}>{INTRO.byline}</Hand>
        </p>
      </div>
      <p className="pointer-events-none absolute inset-x-0 bottom-6 m-0 text-center font-mono text-[12px] opacity-50" style={{ color: INK }} aria-hidden="true">
        ↓
      </p>
    </section>
  );
}

/* ============================================================
   From home: the intro, on an inland letter
   ============================================================ */

function Lid({ code, seed }: { code: string; seed: string }) {
  return (
    <span className="mb-lid" style={{ ["--lid-tilt" as string]: `${tiltFor(seed, 14)}deg` }} title="Nearest station, then stop number">
      <span className="mb-sign">{code}</span>
    </span>
  );
}

function Letter() {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-[1fr_250px] md:gap-10 md:py-32">
      <div className="flex flex-col gap-5">
        <h2 className="m-0 text-sm uppercase tracking-wider text-fonttertiary">From home</h2>
        <div className="mb-inland -rotate-[0.8deg]">
          <div className="mb-inland-head">
            <span>
              INLAND LETTER CARD
              <br />
              अंतर्देशीय पत्र
            </span>
            <span className="mb-inland-stamp">
              INDIA
              <br />
              POSTAGE
              <br />
              <br />
              ₹ 2.50
            </span>
          </div>
          <span className="mb-postmark">
            MUMBAI
            <br />
            400 019
            <br />
            ✶
          </span>
          <div className="flex max-w-[58ch] flex-col gap-4">
            <p className="m-0">{INTRO.greeting}</p>
            {INTRO.body.map((p) => (
              <p key={p} className="m-0 text-pretty">
                {p}
              </p>
            ))}
            <p className="m-0 self-end">{INTRO.signoff}</p>
          </div>
          {INTRO.sample && (
            <span className="absolute bottom-3 left-4 text-fontmuted">
              <SampleStamp />
            </span>
          )}
        </div>
      </div>
      {/* How to read the codes on the lids. */}
      <div className="flex flex-col items-start gap-4 md:pt-24">
        <span className="relative block h-16 w-16">
          <Lid code="MTN 2" seed="legend" />
        </span>
        <Hand size={24} className="leading-[1.15]">
          the code on each lid: nearest local station, then stop number. the way a dabbawala marks a tiffin.
        </Hand>
      </div>
    </section>
  );
}

/* ============================================================
   Through the day
   ============================================================ */

function Photo({ place }: { place: Place }) {
  return (
    <div className="relative aspect-[3/2] overflow-hidden bg-[#e6dcc6]">
      {place.photo ? (
        <Image src={place.photo} alt={place.name} fill sizes="(min-width: 1024px) 520px, (min-width: 768px) 55vw, 90vw" className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] tracking-[0.04em] opacity-50" style={{ color: INK }}>
          photo to come
        </span>
      )}
      {place.sample && (
        <span className="absolute left-2.5 top-2.5 text-white">
          <SampleStamp />
        </span>
      )}
    </div>
  );
}

function PlaceCard({ place }: { place: Place }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <TapedPrint seed={place.name}>
          <Photo place={place} />
        </TapedPrint>
        <Lid code={place.code} seed={place.name} />
      </div>
      <div className="flex flex-col gap-1 pr-10">
        <h4 className="m-0 text-lg font-normal text-fontprimary">{place.name}</h4>
        <p className="m-0 font-mono text-[12px] text-fontmuted">
          {place.area} · {place.what}
        </p>
        <Hand size={24} className="mt-1 leading-[1.15] text-pretty">
          {place.note}
        </Hand>
      </div>
    </div>
  );
}

/** Prints laid down like a collage: alternating sides and widths, overlapping a little. */
function Collage({ places }: { places: Place[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-14 p-0 md:gap-0">
      {places.map((p, i) => (
        <li key={p.name} className={`w-full md:w-[74%] ${i % 2 ? "md:self-end" : "md:self-start"} ${i > 0 ? "md:-mt-6" : ""} md:pb-16`}>
          <PlaceCard place={p} />
        </li>
      ))}
    </ul>
  );
}

function DayPart({ part, reduce }: { part: DaySection; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[280px_1fr] md:gap-14" aria-labelledby={`part-${part.id}`}>
      <div ref={ref} className="flex flex-col items-start gap-5 self-start md:sticky md:top-28">
        <h3 id={`part-${part.id}`} className="sr-only">
          {part.board}, {part.hours}
        </h3>
        <div className="-rotate-2">
          <PaintedBoard text={part.board} deva={part.boardDeva} palette={BOARDS[part.palette]} painted={seen} instant={reduce} />
        </div>
        <p className="m-0 font-mono text-[13px] text-fontmuted">{part.hours}</p>
        {part.keepsake && (
          <Loose seed={part.id} className="mt-4">
            <KeepsakeView item={part.keepsake} />
          </Loose>
        )}
      </div>
      <Collage places={part.places} />
    </section>
  );
}

/* ============================================================
   Paus: the monsoon switch
   ============================================================ */

/** Rain over the whole page, on a canvas. Runs frames only while it's on and the tab is visible. */
function Rain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, frame = 0;
    type Drop = { x: number; y: number; len: number; speed: number };
    let drops: Drop[] = [];
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 7000);
      drops = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, len: 10 + Math.random() * 18, speed: 9 + Math.random() * 8 }));
    };
    resize();
    window.addEventListener("resize", resize);
    const slant = 0.18;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(110, 140, 170, 0.45)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      for (const d of drops) {
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * slant, d.y + d.len);
        d.y += d.speed;
        d.x -= d.speed * slant;
        if (d.y > h) {
          d.y = -d.len;
          d.x = Math.random() * (w + 100);
        }
      }
      ctx.stroke();
      frame = requestAnimationFrame(tick);
    };
    const onVisible = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisible);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[45] h-full w-full" aria-hidden="true" />;
}

function Monsoon({ reduce }: { reduce: boolean }) {
  const [raining, setRaining] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  useEffect(() => setMounted(true), []);

  return (
    <section className="mx-auto max-w-5xl px-6 py-24" aria-labelledby="part-paus">
      <div ref={ref} className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col items-start gap-5">
          <h3 id="part-paus" className="sr-only">
            Paus, the monsoon
          </h3>
          <div className="rotate-1">
            <PaintedBoard text={MONSOON.board} deva={MONSOON.boardDeva} palette={BOARDS.hara} painted={seen} instant={reduce} />
          </div>
          <Hand size={26} className="max-w-[40ch] leading-[1.15]">
            {MONSOON.intro}
          </Hand>
        </div>
        <button type="button" className="mb-switch shrink-0" aria-pressed={raining} onClick={() => setRaining((r) => !r)}>
          <span className="mb-switch-knob" aria-hidden="true" />
          {raining ? "Stop the rain" : "Make it rain"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {raining && (
          <motion.div
            key="monsoon"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" } }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2"
          >
            {MONSOON.places.map((p) => (
              <PlaceCard key={p.name} place={p} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The rain covers the whole page, so it lives on body. */}
      {mounted &&
        raining &&
        createPortal(
          <>
            <div className="pointer-events-none fixed inset-0 z-[44] bg-[rgba(40,60,85,0.08)]" aria-hidden="true" />
            {!reduce && <Rain />}
            <button
              type="button"
              onClick={() => setRaining(false)}
              className="fixed bottom-24 left-6 z-[46] flex h-11 items-center gap-2 rounded-full bg-[#171717] px-4 font-mono text-[13px] text-[#f2c230] shadow-[0_8px_18px_rgba(0,0,0,0.2)] transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              Stop the rain
            </button>
          </>,
          document.body,
        )}
    </section>
  );
}

/* ============================================================
   Marine Drive: the lights come on
   ============================================================ */

function MarineDrive({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -35% 0px" });
  const on = seen || reduce;
  return (
    <section className="mb-night relative overflow-hidden" aria-label="Marine Drive at night">
      {/* Sitting on the parapet at night: the lights come on from the far end of the bay as you arrive. */}
      <div ref={ref} className="relative h-[clamp(480px,78vh,820px)] w-full">
        <MarineDriveArt lit={on} />
        {/* Blend the drawing's top and bottom edges into the section. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#0b1220] to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0b1220] to-transparent" aria-hidden="true" />
        <div className="relative mx-auto flex h-full max-w-5xl flex-col items-start gap-3 px-6 pt-[14vh]">
          <motion.div
            initial={false}
            animate={{ opacity: on ? 1 : 0, y: on ? 0 : 8 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 1.2, ease: EASE_OUT }}
            className="flex flex-col gap-2"
          >
            <Hand size={44} color="#F2D9A6" className="-rotate-2 leading-none">
              {SIGNOFF.note}
            </Hand>
            <Hand size={24} color="#C9D3E6" className="-rotate-1">
              Marine Drive at night. We call it the Queen&apos;s Necklace.
            </Hand>
          </motion.div>
        </div>
      </div>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 pb-24 pt-14">
        <Link href="/about" className="font-mono text-[13px] text-[#f3ead6] underline-offset-4 opacity-80 transition-opacity duration-150 hover:opacity-100 focus-visible:underline">
          ← Back to About
        </Link>
        <Link href="/guides/washington-dc" className="font-mono text-[13px] text-[#f3ead6] underline-offset-4 opacity-60 transition-opacity duration-150 hover:opacity-100 focus-visible:underline">
          Next guide: Washington, DC →
        </Link>
        {CREDITS.length > 0 && (
          <details className="max-w-2xl font-mono text-[11px] leading-relaxed">
            <summary className="cursor-pointer text-center opacity-60 transition-opacity duration-150 hover:opacity-100">Photo credits</summary>
            <ul className="m-0 mt-3 list-none p-0 opacity-70">
              {CREDITS.map((c) => (
                <li key={c.file}>
                  {c.place}:{" "}
                  <a href={c.source} className="underline underline-offset-2" style={{ color: "inherit" }} target="_blank" rel="noopener noreferrer">
                    {c.author}
                  </a>
                  , {c.license}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}

export default function MumbaiGuide() {
  const reduce = !!useReducedMotion();
  return (
    <div className="w-full">
      <Arrival reduce={reduce} />
      <Letter />
      <div className="flex flex-col gap-8 pb-16">
        {DAY.map((part) => (
          <DayPart key={part.id} part={part} reduce={reduce} />
        ))}
      </div>
      <Monsoon reduce={reduce} />
      <MarineDrive reduce={reduce} />
    </div>
  );
}
