'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Keepsake } from "./data";

/**
 * The scrappy layer: paper things stuck onto the subway page. Taped prints,
 * a MetroCard, ticket stubs, a receipt, a napkin, a torn notebook page and
 * pen notes in the margins. Each piece sits a few degrees off, picked from its
 * own text so it lands the same way on every visit.
 */

export const PEN = "#24398C";

/** A tilt in degrees between -max and max, seeded from a string. */
export function tiltFor(seed: string, max = 3) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return (((h >>> 0) % 1000) / 1000 - 0.5) * 2 * max;
}

/** True on a mouse or trackpad, where dragging things around makes sense. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(q.matches);
    const apply = () => setFine(q.matches);
    q.addEventListener("change", apply);
    return () => q.removeEventListener("change", apply);
  }, []);
  return fine;
}

/** A strip of masking tape, torn at both ends. */
export function Tape({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <span className={`sb-tape ${className}`} style={style} aria-hidden="true" />;
}

/** Off while the placeholder content is meant to look real; flip on to see what's still a stand-in. */
const SHOW_SAMPLE_STAMPS = false;

export function SampleStamp() {
  if (!SHOW_SAMPLE_STAMPS) return null;
  return (
    <span className="rounded-[3px] border border-current px-1.5 py-[1px] font-mono text-[10px] uppercase tracking-[0.08em] opacity-70">
      Sample
    </span>
  );
}

/**
 * A photo print taped to the page: white border, a couple of degrees off,
 * tape over two corners. Straightens up a little on hover.
 */
export function TapedPrint({
  seed,
  children,
  className = "",
  hover = true,
}: {
  seed: string;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  const tilt = tiltFor(seed, 2.4);
  return (
    <div className={`sb-print-wrap ${hover ? "sb-hoverable" : ""} ${className}`} style={{ ["--tilt" as string]: `${tilt}deg` }}>
      <div className="sb-print">
        {children}
        <Tape className="sb-tape-tl" />
        <Tape className="sb-tape-tr" />
      </div>
    </div>
  );
}

/** Handwriting in ballpoint blue. */
export function Hand({ children, className = "", size = 24 }: { children: React.ReactNode; className?: string; size?: number }) {
  return (
    <span className={`sb-hand ${className}`} style={{ fontSize: size, color: PEN }}>
      {children}
    </span>
  );
}

/** A pen note with a hand-drawn arrow. `to` is the way the arrow points. */
export function Scribble({ text, to = "left", className = "" }: { text: string; to?: "left" | "up"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${to === "up" ? "flex-col items-start" : ""} ${className}`} style={{ color: PEN }}>
      {to === "left" ? (
        <svg width="54" height="30" viewBox="0 0 54 30" fill="none" aria-hidden="true">
          <path d="M52 22 C 38 26, 18 24, 6 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5 19 L 5 9 L 14 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="34" height="40" viewBox="0 0 34 40" fill="none" aria-hidden="true">
          <path d="M22 38 C 26 26, 10 18, 15 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 10 L 15 3 L 21 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="sb-hand text-[24px] leading-none">{text}</span>
    </span>
  );
}

/**
 * Wraps a keepsake so it can be picked up and moved around the page on a
 * mouse, the way you'd shuffle things before gluing them down.
 */
export function Loose({ seed, children, className = "" }: { seed: string; children: React.ReactNode; className?: string }) {
  const fine = useFinePointer();
  const tilt = tiltFor(seed, 6);
  return (
    <motion.div
      className={`relative ${fine ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
      style={{ rotate: tilt, touchAction: fine ? "none" : "auto" }}
      drag={fine}
      dragMomentum={false}
      whileHover={fine ? { scale: 1.02 } : undefined}
      whileDrag={{ scale: 1.05, rotate: tilt + 2, zIndex: 40, boxShadow: "0 18px 30px rgba(0,0,0,0.18)" }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Keepsakes ---------- */

/** A photo of a real MetroCard, trimmed to the card's own shape and taped down. */
export function MetroCard({ photo, sample }: { photo: string; sample?: boolean }) {
  return (
    <div className="sb-metrocard">
      <div className="sb-metrocard-card">
        <Image src={photo} alt="A New York City MetroCard" fill sizes="240px" className="object-cover" draggable={false} />
      </div>
      {sample && (
        <span className="absolute right-2 top-2 text-[#1d2026]">
          <SampleStamp />
        </span>
      )}
      <Tape className="sb-tape-top" />
    </div>
  );
}

function Stub({ venue, event, date, color, sample }: Extract<Keepsake, { kind: "stub" }>) {
  return (
    <div className="sb-stub" style={{ background: color }} role="img" aria-label={`Ticket stub, ${venue}`}>
      <span className="sb-stub-event">{event}</span>
      <span className="sb-stub-venue">{venue}</span>
      <span className="sb-stub-date">{date}</span>
      <span className="sb-stub-no">№ 004211</span>
      {sample && (
        <span className="absolute right-2 top-2 text-[#1d2026]">
          <SampleStamp />
        </span>
      )}
    </div>
  );
}

function Receipt({ shop, address, items, total, date, sample }: Extract<Keepsake, { kind: "receipt" }>) {
  return (
    <div className="sb-receipt" role="img" aria-label={`Receipt from ${shop}`}>
      <span className="sb-receipt-shop">{shop}</span>
      <span className="sb-receipt-line">{address}</span>
      <span className="sb-receipt-line">{date}</span>
      <span className="sb-receipt-rule" />
      {items.map(([name, price]) => (
        <span key={name} className="sb-receipt-row">
          <span>{name}</span>
          <span>{price}</span>
        </span>
      ))}
      <span className="sb-receipt-rule" />
      <span className="sb-receipt-row font-bold">
        <span>TOTAL</span>
        <span>{total}</span>
      </span>
      <span className="sb-receipt-line mt-2 text-center">THANK YOU</span>
      {sample && (
        <span className="mt-2 self-start text-[#1d2026]">
          <SampleStamp />
        </span>
      )}
    </div>
  );
}

function Napkin({ text, sample }: Extract<Keepsake, { kind: "napkin" }>) {
  return (
    <div className="sb-napkin" role="img" aria-label={`A note on a napkin: ${text}`}>
      <Hand size={27} className="leading-[1.05]">
        {text}
      </Hand>
      {sample && (
        <span className="absolute bottom-3 left-3 text-[#1d2026]">
          <SampleStamp />
        </span>
      )}
    </div>
  );
}

export function KeepsakeView({ item }: { item: Keepsake }) {
  if (item.kind === "stub") return <Stub {...item} />;
  if (item.kind === "receipt") return <Receipt {...item} />;
  return <Napkin {...item} />;
}

/** A page torn out of a notebook and taped down, with the intro written on it. */
export function NotebookScrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="sb-notebook" style={{ rotate: "-1.2deg" }}>
      <Tape className="sb-tape-top" />
      {children}
    </div>
  );
}
