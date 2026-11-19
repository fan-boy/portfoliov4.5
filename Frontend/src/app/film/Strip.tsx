'use client'
import React from "react";
import Image from "next/image";
import type { FilmRoll } from "./data";
import { FRAMES } from "./frames";

/** 35mm strip: frames are 3:2 between two rows of sprocket holes. */
export const FRAME_W = 252;
export const FRAME_H = 168;
const FRAME_GAP = 18;
const BAND = 34;
export const STRIP_H = FRAME_H + BAND * 2;
export const LEADER = 110;
const FRAME_COUNT = 5;
export const STEP = FRAME_W + FRAME_GAP;
export const STRIP_W = LEADER + FRAME_COUNT * STEP;
/** The trimmed end of the roll: the top edge stops short and angles down to the tip. */
const LEADER_CUT = `polygon(0 0, ${STRIP_W - LEADER * 0.45}px 0, 100% 34%, 100% 100%, 0 100%)`;

/**
 * The roll's film, laid out as it comes out of the canister: the leader at the
 * right end (it came out first), then frames 1, 2, 3… toward the canister.
 * Frame 2 is the hero, the one the view zooms into.
 */
export default function Strip({ roll, heroRef }: { roll: FilmRoll; heroRef: React.RefObject<HTMLDivElement | null> }) {
  const images = FRAMES[roll.slug];
  const order = [4, 3, 2, 0, 1];
  return (
    <div className="st-strip" style={{ width: STRIP_W, height: STRIP_H, clipPath: LEADER_CUT }}>
      <span className="st-sprockets st-sprockets-top" />
      <span className="st-sprockets st-sprockets-bottom" />
      {order.map((img, i) => (
        <div key={i} className="st-frame-slot" style={{ left: i * STEP, width: STEP }}>
          <span className="st-edge">
            AADI {roll.iso} <b>▸</b> {FRAME_COUNT - i}A
          </span>
          <div ref={img === 0 ? heroRef : undefined} className="st-frame" style={{ width: FRAME_W, height: FRAME_H, top: BAND }}>
            <Image src={images[img]} alt="" fill sizes={`${FRAME_W * 2}px`} className="object-cover object-left-top" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** The first stretch of the same strip, scaled down: what pokes out of the lip before the pull. */
export function Tongue({
  scale,
  left,
  out,
  hidden,
}: {
  /** The size the canister will grow to, relative to now; the tongue is drawn at 1/scale. */
  scale: number;
  left: number;
  out: boolean;
  hidden: boolean;
}) {
  const w = LEADER / scale;
  const h = STRIP_H / scale;
  return (
    <span
      className={`st-tongue ${out ? "is-out" : ""} ${hidden ? "is-hidden" : ""}`}
      style={{ left, width: w, height: h, marginTop: -h / 2 }}
      aria-hidden="true"
    >
      <span className="st-tongue-slide">
        <span className="st-tongue-film" style={{ width: LEADER, height: STRIP_H, scale: 1 / scale }}>
          <span className="st-sprockets st-sprockets-top" />
          <span className="st-sprockets st-sprockets-bottom" />
        </span>
      </span>
    </span>
  );
}
