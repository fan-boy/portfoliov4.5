'use client'
import React from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import type { VinylRecord } from "../records/data";

/** Width over height of the bib face. */
export const BIB_RATIO = 1.3;

/** A safety pin, drawn flat: wire loop, shaft and the clasp head. */
function PinShape() {
  return (
    <svg viewBox="0 0 40 14" width="100%" height="100%" aria-hidden="true">
      <path d="M6 7 H34 a4 4 0 0 0 0 -4 H10" fill="none" stroke="#9aa0a6" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="4.5" cy="7" r="3.4" fill="none" stroke="#9aa0a6" strokeWidth="1.6" />
      <rect x="28" y="1.4" width="9" height="7.5" rx="1.6" fill="#c9cdd1" stroke="#8d939a" strokeWidth="1" />
    </svg>
  );
}

/** Pins sit right in the corners, clear of the type, the way you'd pin a bib to a shirt. */
const PIN_SPOTS: { pos: React.CSSProperties; rot: number }[] = [
  { pos: { left: "-1%", top: "1%" }, rot: -38 },
  { pos: { right: "-1%", top: "1%" }, rot: 38 },
  { pos: { left: "-1%", bottom: "26%" }, rot: 38 },
  { pos: { right: "-1%", bottom: "26%" }, rot: -38 },
];

/** One corner pin: 0 = pinned, 1 = popped up and off. */
function Pin({ pop, pos, rot }: { pop: MotionValue<number>; pos: React.CSSProperties; rot: number }) {
  const rotate = useTransform(pop, [0, 1], [rot, rot + (rot > 0 ? 70 : -70)]);
  const y = useTransform(pop, [0, 1], [0, -34]);
  const opacity = useTransform(pop, [0, 0.7, 1], [1, 0.6, 0]);
  return (
    <motion.span className="bib-pin" style={{ ...pos, rotate, y, opacity }}>
      <PinShape />
    </motion.span>
  );
}

/** The perforated timing strip: 0 = attached, 1 = torn away and dropped. */
function TimingStrip({ tear, number }: { tear: MotionValue<number>; number: string }) {
  const y = useTransform(tear, [0, 1], [0, 150]);
  const rotate = useTransform(tear, [0, 0.3, 1], [0, 3, 9]);
  const opacity = useTransform(tear, [0, 0.6, 1], [1, 1, 0]);
  return (
    <motion.div className="bib-strip" style={{ y, rotate, opacity }}>
      <span className="bib-barcode" />
      <span className="bib-chip">
        TIMING CHIP <b>·</b> {number}
      </span>
    </motion.div>
  );
}

/**
 * A paper race bib: the event band in the project's colour, the bib number,
 * the organiser, and a perforated timing strip along the bottom, held by four
 * safety pins. Everything scales from --bib (the bib width).
 */
export default function Bib({
  record,
  number,
  width,
  pins,
  tear,
}: {
  record: VinylRecord;
  number: string;
  width: number;
  /** One value per corner, top-left first. Omit for a static bib. */
  pins?: MotionValue<number>[];
  tear?: MotionValue<number>;
}) {
  // Static bibs (the phone list) still need values to hand the parts.
  const still = useMotionValue(0);
  return (
    <div
      className="bib"
      style={{ width, height: width / BIB_RATIO, ["--bib" as string]: `${width}px`, ["--accent" as string]: record.accent }}
      aria-hidden="true"
    >
      <div className="bib-band">
        <span className="bib-event">{record.name}</span>
        <span className="bib-year">{record.year}</span>
      </div>
      <div className="bib-number">{number}</div>
      <div className="bib-org">{record.company}</div>
      <span className="bib-perf" />
      <TimingStrip tear={tear ?? still} number={number} />
      {PIN_SPOTS.map((s, i) => (
        <Pin key={i} pop={pins?.[i] ?? still} pos={s.pos} rot={s.rot} />
      ))}
    </div>
  );
}
