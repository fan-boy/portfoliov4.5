'use client'
import React from "react";
import Image from "next/image";
import type { VinylRecord } from "./data";

/**
 * The album cover: the project's own background, a product screen bleeding off
 * the bottom-right like the home page cards, and the title set like a record.
 * A faint ring wear shows where the disc has pressed through the card.
 */
export default function Sleeve({ record, size }: { record: VinylRecord; size: number }) {
  return (
    <div className="rec-sleeve" style={{ width: size, height: size, ["--sleeve" as string]: `${size}px` }}>
      <div
        className="rec-sleeve-bg"
        style={{ backgroundImage: record.sleeveBg, transform: record.sleeveBgTransform }}
      />
      <div className="rec-sleeve-art">
        <Image src={record.art} alt="" fill sizes={`${Math.round(size * 1.2)}px`} className="object-cover object-left-top" />
      </div>
      <div className="rec-sleeve-type" style={{ color: record.sleeveInk }}>
        <span className="rec-sleeve-title">{record.name}</span>
        <span className="rec-sleeve-meta">{record.company} · {record.year}</span>
      </div>
      <div className="rec-sleeve-wear" />
    </div>
  );
}
