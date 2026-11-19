'use client'
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import Disc from "../../records/Disc";
import Sleeve from "../../records/Sleeve";
import Canister from "../../film/Canister";
import Bib from "../../run/Bib";
import { RECORDS, SHOP_FIELD } from "../../records/data";
import { ROLLS, SHELF_FIELD } from "../../film/data";
import "../../records/records.css";
import "../../film/film.css";
import "../../run/bibs.css";
import "./trinkets.css";

/** Each page's own opening colour, so the wipe hands straight over to it. */
const RACES_FIELD = "#F2D6C9";

type Trinket = {
  href: string;
  label: string;
  note: string;
  field: string;
  object: React.ReactNode;
};

const TRINKETS: Trinket[] = [
  {
    href: "/records",
    label: "Records",
    note: "Pressed on vinyl",
    field: SHOP_FIELD,
    object: (
      <div className="trinket-record">
        <div className="trinket-record-disc">
          <Disc record={RECORDS[0]} size={118} />
        </div>
        <div className="trinket-record-sleeve">
          <Sleeve record={RECORDS[0]} size={128} />
        </div>
      </div>
    ),
  },
  {
    href: "/film",
    label: "Film",
    note: "Shot on 35mm",
    field: SHELF_FIELD,
    object: (
      <div className="trinket-film">
        <Canister roll={ROLLS[2]} height={148} />
      </div>
    ),
  },
  {
    href: "/run",
    label: "Races",
    note: "Pinned on bibs",
    field: RACES_FIELD,
    object: (
      <div className="trinket-bib">
        <Bib record={RECORDS[3]} number="04" width={164} />
      </div>
    ),
  },
];

/**
 * Wipes the page with the destination's colour from where it was clicked,
 * opens the page, then fades the colour off once the page has had time to
 * fade in on the same colour. Plain DOM, so it outlives the home page.
 */
function wipeTo(href: string, color: string, from: DOMRect, push: (href: string) => void) {
  const cx = from.left + from.width / 2;
  const cy = from.top + from.height / 2;
  const far = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
  const el = document.createElement("div");
  el.setAttribute("aria-hidden", "true");
  Object.assign(el.style, { position: "fixed", inset: "0", zIndex: "60", background: color, pointerEvents: "none" });
  document.body.appendChild(el);
  const grow = el.animate(
    [{ clipPath: `circle(${from.width / 2}px at ${cx}px ${cy}px)` }, { clipPath: `circle(${far}px at ${cx}px ${cy}px)` }],
    { duration: 520, easing: "cubic-bezier(0.32, 0.72, 0, 1)", fill: "forwards" },
  );
  grow.onfinish = () => {
    push(href);
    window.setTimeout(() => {
      const fade = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, easing: "ease-out", fill: "forwards" });
      fade.onfinish = () => el.remove();
    }, 650);
  };
}

/** The other formats of the work, standing on a ledge under the case studies. */
export default function TrinketLedge() {
  const router = useRouter();
  const reduce = useReducedMotion();

  const open = (t: Trinket) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    // New tab, new window and reduced motion all take the plain link.
    if (reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    const object = e.currentTarget.querySelector(".trinket-object") as HTMLElement;
    wipeTo(t.href, t.field, object.getBoundingClientRect(), router.push);
  };

  return (
    <ul className="trinket-ledge m-0 grid list-none grid-cols-3 p-0">
      {TRINKETS.map((t) => (
        <li key={t.href}>
          <Link
            href={t.href}
            onClick={open(t)}
            onMouseEnter={() => router.prefetch(t.href)}
            className="trinket group block outline-none"
          >
            <span className="trinket-stage">
              <span className="trinket-object">{t.object}</span>
            </span>
            <span className="mt-4 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <span className="text-base text-fontprimary">{t.label}</span>
              <span className="text-sm text-fontmuted">{t.note}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
