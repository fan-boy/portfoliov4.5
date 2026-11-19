'use client'
import React from "react";
import { motion, type MotionValue } from "framer-motion";
import type { VinylRecord } from "./data";

/**
 * A flat, graphic record. Every measurement is a fraction of --disc (set from
 * `size`), so one design works in the sleeve, in flight and on the deck.
 *
 * The label is the record's own cover: the sleeve background with the title,
 * the way a pressing carries the album art. Only the face turns; the faint
 * sheen sits on a still layer above it.
 */
export default function Disc({
  record,
  size,
  rotate,
  className = "",
}: {
  record: VinylRecord;
  size: number;
  /** Rotation in degrees. Omit for a disc at rest. */
  rotate?: MotionValue<number> | number;
  className?: string;
}) {
  return (
    <div
      className={`rec-disc ${className}`}
      style={{ ["--disc" as string]: `${size}px`, ["--accent" as string]: record.accent }}
      aria-hidden="true"
    >
      <motion.div className="rec-disc-face" style={{ rotate: rotate ?? 0 }}>
        <div className="rec-disc-label">
          <div
            className="rec-disc-label-art"
            style={{ backgroundImage: record.sleeveBg, transform: record.sleeveBgTransform }}
          />
          <span className="rec-disc-title" style={{ color: record.sleeveInk }}>
            {record.name}
          </span>
          <span className="rec-disc-meta" style={{ color: record.sleeveInk }}>
            {record.company}
          </span>
        </div>
      </motion.div>
      <div className="rec-disc-sheen" />
      <div className="rec-disc-hole" />
    </div>
  );
}
