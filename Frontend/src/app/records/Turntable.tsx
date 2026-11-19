'use client'
import React from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import Disc from "./Disc";
import type { VinylRecord } from "./data";

/** Disc diameter on the deck, px. Everything on the deck is derived from it. */
export const DISC = 430;
export const DECK_W = 740;
export const DECK_H = 540;
/** Platter centre inside the deck. */
const CX = 40 + DISC / 2 + 20;
const CY = DECK_H / 2;
/**
 * Tonearm geometry, as fractions of the disc (the proportions of a real deck):
 * the pivot sits clear of the record at the rear right, and the arm is long
 * enough that at PLAY_ANGLE the stylus lands in the lead-in groove, about 0.83
 * of the radius out, never on the label.
 */
const PIVOT_X = CX + DISC * 0.68;
const PIVOT_Y = CY - DISC * 0.51;
const ARM = DISC * 0.647;
export const REST_ANGLE = 0;
export const PLAY_ANGLE = 25;

/**
 * A flat, graphic turntable: a tinted deck, the record, and a solid tonearm in
 * the record's accent colour with a white pivot and headshell.
 */
export default function Turntable({
  record,
  accent,
  rotation,
  armAngle,
  armLift,
  platterCenterRef,
}: {
  record: VinylRecord | null;
  accent: string;
  rotation: MotionValue<number>;
  armAngle: MotionValue<number>;
  /** 0 = resting on the record or the post, 1 = lifted on the cue lever. */
  armLift: MotionValue<number>;
  platterCenterRef: React.RefObject<HTMLDivElement | null>;
}) {
  const armScale = useTransform(armLift, [0, 1], [1, 1.04]);
  const shadowX = useTransform(armLift, [0, 1], [5, 14]);
  const shadowY = useTransform(armLift, [0, 1], [6, 16]);
  const shadowOpacity = useTransform(armLift, [0, 1], [0.16, 0.1]);

  return (
    <div className="rec-deck" style={{ width: DECK_W, height: DECK_H, ["--accent" as string]: accent }}>
      {/* The platter, seen only while it's empty. */}
      <div className="rec-platter" style={{ width: DISC, height: DISC, left: CX - DISC / 2, top: CY - DISC / 2 }} />
      {record && (
        <div className="absolute" style={{ left: CX - DISC / 2, top: CY - DISC / 2 }}>
          <Disc record={record} size={DISC} rotate={rotation} />
        </div>
      )}
      <div className="rec-spindle" style={{ left: CX, top: CY }} />
      <div ref={platterCenterRef} className="absolute h-0 w-0" style={{ left: CX, top: CY }} />

      {/* Rest post. */}
      <div className="rec-arm-rest" style={{ left: PIVOT_X, top: PIVOT_Y + ARM - 12 }} />

      {/* Tonearm: a 0x0 box at the pivot, so rotation and the lift scale both pivot there. */}
      <motion.div className="rec-arm" style={{ left: PIVOT_X, top: PIVOT_Y, rotate: armAngle, scale: armScale }}>
        <motion.div className="rec-arm-shadow" style={{ height: ARM, x: shadowX, y: shadowY, opacity: shadowOpacity }} />
        <div className="rec-arm-counterweight" />
        <div className="rec-arm-tube" style={{ height: ARM }}>
          <div className="rec-arm-head" />
        </div>
      </motion.div>
      <div className="rec-arm-pivot" style={{ left: PIVOT_X, top: PIVOT_Y }} />
    </div>
  );
}
