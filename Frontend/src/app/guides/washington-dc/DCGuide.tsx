'use client'
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import WorkCrumb from "../../components/WorkCrumb";
import { Hand, KeepsakeView, Loose, SampleStamp, TapedPrint } from "../shared/Scrapbook";
import MetroPylon from "./MetroPylon";
import { INTRO, LINE_COLORS, PLATE, SEASONS, SIGNOFF, type Place, type Season } from "./data";
import { CREDITS } from "./credits";

const NAV_SPACE = 140;

/* ============================================================
   Arrival: the pylon, the vault, a train coming in
   ============================================================ */

/** The platform edge: granite with lights set in, blinking while a train comes in. */
function PlatformEdge({ arriving }: { arriving: boolean }) {
  return (
    <div className={`dc-edge ${arriving ? "is-arriving" : ""}`} aria-hidden="true">
      <div className="dc-edge-lights">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className="dc-edge-light" style={{ animationDelay: `${(i * 0.06).toFixed(2)}s` }} />
        ))}
      </div>
    </div>
  );
}

function Arrival({ reduce }: { reduce: boolean }) {
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setLit(true), 450);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <section className="relative flex flex-col overflow-hidden bg-[#dcd4c6]" style={{ marginTop: -NAV_SPACE, paddingTop: NAV_SPACE, minHeight: "100svh" }}>
      <span className="dc-coffers" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-4 text-[#2a2118]">
        <WorkCrumb page="Washington, DC" parent={{ href: "/about", label: "About" }} trail={["Guides"]} />
      </div>
      <h1 className="sr-only">Washington, DC</h1>
      <div className="relative flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-16">
        <div className={`dc-float w-[clamp(130px,15vw,190px)] ${reduce ? "" : "is-floating"}`}>
          <div className="-rotate-[2deg] drop-shadow-[0_26px_30px_rgba(40,25,10,0.26)]">
            <MetroPylon name={["Aaditya's", "DC"]} lit={lit} instant={reduce} />
          </div>
        </div>
        <p className="dc-tape m-0 max-w-[320px] rotate-[1.5deg] text-center sm:max-w-none">
          <Hand size={28}>{INTRO.byline}</Hand>
        </p>
      </div>
      <PlatformEdge arriving={lit && !reduce} />
    </section>
  );
}

/* ============================================================
   The intro, on a postcard
   ============================================================ */

function Postcard() {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-[1fr_260px] md:gap-10 md:py-28">
      <div className="flex flex-col gap-5">
        <h2 className="m-0 text-sm uppercase tracking-wider" style={{ color: "var(--dc-muted)" }}>
          From next door
        </h2>
        <div className="dc-postcard rotate-[0.8deg]">
          <div className="flex flex-col gap-4">
            {INTRO.body.map((p) => (
              <p key={p} className="m-0 text-pretty">
                {p}
              </p>
            ))}
            <p className="m-0">{INTRO.signoff}</p>
          </div>
          <div className="dc-postcard-side" aria-hidden="true">
            <span className="dc-postcard-stamp">
              USA
              <br />
              FOREVER
            </span>
            <span className="dc-postcard-line" />
            <span className="dc-postcard-line" />
            <span className="dc-postcard-line" />
          </div>
          {INTRO.sample && (
            <span className="absolute bottom-3 left-4 text-fontmuted">
              <SampleStamp />
            </span>
          )}
        </div>
      </div>
      <div className="flex items-start justify-center md:justify-start md:pt-24">
        <Loose seed="plate">
          <KeepsakeView item={PLATE} />
        </Loose>
      </div>
    </section>
  );
}

/* ============================================================
   The seasons
   ============================================================ */

function LineDots({ place }: { place: Place }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-flex gap-[3px]" aria-hidden="true">
        {place.metro.lines.map((l) => (
          <span key={l} className="block size-[9px] rounded-full" style={{ background: LINE_COLORS[l] }} />
        ))}
      </span>
      <span>{place.metro.station}</span>
    </span>
  );
}

function PlaceCard({ place, season }: { place: Place; season: Season }) {
  return (
    <li className="flex list-none flex-col gap-3">
      <TapedPrint seed={place.name}>
        <div className="relative aspect-[3/2] overflow-hidden bg-[#d9d2c4]">
          {place.photo ? (
            <Image src={place.photo} alt={place.name} fill sizes="(min-width: 1024px) 310px, (min-width: 640px) 45vw, 90vw" className="object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] opacity-50">photo to come</span>
          )}
          {place.sample && (
            <span className="absolute left-2.5 top-2.5 text-white">
              <SampleStamp />
            </span>
          )}
        </div>
      </TapedPrint>
      <div className="mt-1 flex flex-col gap-1">
        <h4 className="m-0 text-lg font-normal" style={{ color: season.ink }}>
          {place.name}
        </h4>
        <p className="m-0 flex flex-wrap items-center gap-x-2 font-mono text-[12px]" style={{ color: season.muted }}>
          <span>{place.area}</span>
          <span aria-hidden="true">·</span>
          <LineDots place={place} />
        </p>
        <Hand size={23} color={season.pen} className="mt-1 leading-[1.15] text-pretty">
          {place.note}
        </Hand>
      </div>
    </li>
  );
}

/** A brown Metro-style station sign naming the season. */
function SeasonSign({ season }: { season: Season }) {
  return (
    <div className="dc-sign">
      <span className="dc-sign-name">{season.name}</span>
      <span className="dc-sign-months">{season.months}</span>
    </div>
  );
}

function SeasonSection({ season }: { season: Season }) {
  return (
    <section data-season={season.id} className="relative mx-auto max-w-5xl px-6 py-24" aria-labelledby={`season-${season.id}`}>
      <h3 id={`season-${season.id}`} className="sr-only">
        {season.name}, {season.months}
      </h3>
      <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-start gap-5">
          <SeasonSign season={season} />
          <Hand size={26} color={season.pen} className="max-w-[38ch] leading-[1.15]">
            {season.line}
          </Hand>
        </div>
        {season.keepsake && (
          <Loose seed={season.id} className="self-start md:mr-6">
            <KeepsakeView item={season.keepsake} />
          </Loose>
        )}
      </div>
      <ul className="m-0 grid grid-cols-1 gap-x-10 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {season.places.map((p) => (
          <PlaceCard key={p.name} place={p} season={season} />
        ))}
      </ul>
    </section>
  );
}

/* ---------- Weather: what's falling past the page ---------- */

type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number; va: number; phase: number; color: string };

const WEATHER = {
  petals: { per: 20000, colors: ["#f6b8c6", "#f9d3dc", "#f3a6b9"] },
  fireflies: { per: 26000, colors: ["#e8f59a", "#f6f0a0"] },
  leaves: { per: 22000, colors: ["#c8572b", "#d98a2b", "#9b3d1e", "#e0a13a"] },
  snow: { per: 8000, colors: ["#ffffff"] },
} as const;

function spawn(kind: Season["weather"], w: number, h: number, anywhere: boolean): Particle {
  const colors = WEATHER[kind].colors;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const y = anywhere ? Math.random() * h : -20;
  const x = Math.random() * w;
  if (kind === "fireflies") return { x, y: Math.random() * h, vx: 0, vy: 0, r: 1.4 + Math.random() * 1.4, a: 0, va: 0, phase: Math.random() * Math.PI * 2, color };
  if (kind === "snow") return { x, y, vx: 0, vy: 0.5 + Math.random() * 0.8, r: 1 + Math.random() * 2.2, a: 0, va: 0, phase: Math.random() * Math.PI * 2, color };
  if (kind === "leaves") return { x, y, vx: 0.4, vy: 0.9 + Math.random() * 0.9, r: 5 + Math.random() * 4, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.08, phase: Math.random() * Math.PI * 2, color };
  return { x, y, vx: 0.5, vy: 0.6 + Math.random() * 0.6, r: 3.5 + Math.random() * 2.5, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.06, phase: Math.random() * Math.PI * 2, color };
}

function Weather({ kind }: { kind: Season["weather"] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, frame = 0, t = 0;
    let parts: Particle[] = [];
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((w * h) / WEATHER[kind].per);
      parts = Array.from({ length: n }, () => spawn(kind, w, h, true));
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        const sway = Math.sin(t * 0.02 + p.phase);
        if (kind === "fireflies") {
          p.vx = p.vx * 0.96 + (Math.random() - 0.5) * 0.08;
          p.vy = p.vy * 0.96 + (Math.random() - 0.5) * 0.08;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) Object.assign(p, spawn(kind, w, h, true));
          const glow = Math.max(0, Math.sin(t * 0.03 + p.phase));
          ctx.globalAlpha = glow;
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }
        p.x += p.vx + sway * (kind === "snow" ? 0.35 : 0.6);
        p.y += p.vy;
        p.a += p.va;
        if (p.y > h + 20 || p.x > w + 30) Object.assign(p, spawn(kind, w, h, false));
        ctx.shadowBlur = 0;
        ctx.fillStyle = p.color;
        if (kind === "snow") {
          // A faint shadow, or white flakes vanish on the pale winter page.
          ctx.shadowBlur = 3;
          ctx.shadowColor = "rgba(70, 90, 120, 0.55)";
          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalAlpha = kind === "petals" ? 0.85 : 0.9;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.a);
          // Tumbling: squash one axis as it turns.
          ctx.scale(1, Math.abs(Math.cos(t * 0.03 + p.phase)) * 0.7 + 0.3);
          ctx.beginPath();
          if (kind === "leaves") {
            ctx.moveTo(-p.r, 0);
            ctx.quadraticCurveTo(0, -p.r * 0.7, p.r, 0);
            ctx.quadraticCurveTo(0, p.r * 0.7, -p.r, 0);
          } else {
            ctx.ellipse(0, 0, p.r, p.r * 0.62, 0, 0, Math.PI * 2);
          }
          ctx.fill();
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
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
  }, [kind]);
  return <canvas ref={ref} className="dc-weather pointer-events-none fixed inset-0 z-[44] h-full w-full" aria-hidden="true" />;
}

function Seasons({ reduce }: { reduce: boolean }) {
  const [active, setActive] = useState<Season["id"]>("spring");
  const [inRegion, setInRegion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => setMounted(true), []);
  // On every scroll: the season whose section is nearest the middle of the
  // screen is the one in the air, and the weather only runs while the
  // seasons fill the middle of the screen. Measured rather than observed, so
  // a jump straight to the bottom still lands on the right season.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      const box = el.getBoundingClientRect();
      setInRegion(box.top < mid && box.bottom > mid);
      let best: { id: Season["id"]; d: number } | null = null;
      el.querySelectorAll<HTMLElement>("[data-season]").forEach((s) => {
        const r = s.getBoundingClientRect();
        const d = r.top > mid ? r.top - mid : r.bottom < mid ? mid - r.bottom : 0;
        if (!best || d < best.d) best = { id: s.dataset.season as Season["id"], d };
      });
      if (best) setActive((best as { id: Season["id"] }).id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  const season = SEASONS.find((s) => s.id === active)!;
  return (
    <div ref={ref} className="dc-seasons" style={{ background: season.field }}>
      {SEASONS.map((s) => (
        <SeasonSection key={s.id} season={s} />
      ))}
      {mounted && inRegion && !reduce && createPortal(<Weather key={season.weather} kind={season.weather} />, document.body)}
    </div>
  );
}

/* ============================================================
   The last train
   ============================================================ */

function LastTrain({ reduce }: { reduce: boolean }) {
  return (
    <section className="relative overflow-hidden bg-[#1c1510] text-[#efe7da]" aria-label="The last train">
      <PlatformEdge arriving={!reduce} />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 pb-24 pt-20">
        <Hand size={44} color="#F2D9A6" className="-rotate-2 leading-none">
          {SIGNOFF.note}
        </Hand>
        <Link href="/about" className="font-mono text-[13px] underline-offset-4 opacity-80 transition-opacity duration-150 hover:opacity-100 focus-visible:underline" style={{ color: "inherit" }}>
          ← Back to About
        </Link>
        <p className="m-0 font-mono text-[13px] opacity-50">Next guide: Bar Harbor, coming soon</p>
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

export default function DCGuide() {
  const reduce = !!useReducedMotion();
  return (
    <div className="w-full" style={{ ["--dc-muted" as string]: "#8a6f78" }}>
      <Arrival reduce={reduce} />
      <div style={{ background: SEASONS[0].field }}>
        <Postcard />
      </div>
      <Seasons reduce={reduce} />
      <LastTrain reduce={reduce} />
    </div>
  );
}
