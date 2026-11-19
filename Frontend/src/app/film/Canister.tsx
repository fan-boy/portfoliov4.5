'use client'
import React from "react";
import type { FilmRoll } from "./data";

/** Width over height of a 35mm canister seen side-on. */
export const CANISTER_RATIO = 0.42;

/**
 * A 35mm canister, side-on: chrome end caps and spool nub, the printed label
 * with cylinder shading over it, and the felt lip on the right where the film
 * comes out. Everything scales from --can (the canister height).
 */
export default function Canister({ roll, height }: { roll: FilmRoll; height: number }) {
  return (
    <div
      className="st-can"
      style={{ width: height * CANISTER_RATIO, height, ["--can" as string]: `${height}px`, ["--accent" as string]: roll.accent }}
      aria-hidden="true"
    >
      <span className="st-can-nub" />
      <span className="st-can-cap st-can-cap-top" />
      <span className="st-can-body">
        <span className="st-can-band" />
        <span className="st-can-name">{roll.name}</span>
        <span className="st-can-iso">{roll.iso}</span>
        <span className="st-can-shade" />
      </span>
      <span className="st-can-cap st-can-cap-bottom" />
      <span className="st-can-lip" />
    </div>
  );
}
