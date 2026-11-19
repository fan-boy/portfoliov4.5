'use client'
import React, { useId, useMemo, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import WorkCrumb from "../../components/WorkCrumb";
import MosaicTablet, { layoutTablet, paintTablet } from "../../guides/new-york/MosaicTablet";
import { PALETTES, type TabletPalette } from "../../guides/new-york/data";

const MAX_LINES = 3;
const MAX_CHARS = 18;
const NAV_SPACE = 140;
const INK = "#1d2026";

const COLOURS: { id: keyof typeof PALETTES; name: string }[] = [
  { id: "teal", name: "Teal" },
  { id: "terracotta", name: "Terracotta" },
  { id: "navy", name: "Navy" },
  { id: "umber", name: "Umber" },
  { id: "green", name: "Green" },
];

const SIZES = [
  { id: "small", name: "Small", capHeight: 9 },
  { id: "medium", name: "Medium", capHeight: 11 },
  { id: "large", name: "Large", capHeight: 13 },
] as const;

type Backdrop = "wall" | "none";

/** Tablets are set in capitals: uppercase it, keep to three lines of eighteen. */
function tidy(raw: string) {
  return raw
    .toUpperCase()
    .split("\n")
    .slice(0, MAX_LINES)
    .map((l) => l.slice(0, MAX_CHARS))
    .join("\n");
}

const linesOf = (text: string) => text.split("\n").map((l) => l.trim()).filter(Boolean);

/* ---------- Export ---------- */

/** White subway tile in a running bond, the way the guide's wall is drawn, at `tile` px wide. */
function paintWall(ctx: CanvasRenderingContext2D, w: number, h: number, tile: number) {
  const th = tile / 2;
  const inset = Math.max(1, tile * 0.02);
  ctx.fillStyle = "#d9d2c4";
  ctx.fillRect(0, 0, w, h);
  for (let row = 0, y = 0; y < h; row++, y += th) {
    const offset = row % 2 ? -tile / 2 : 0;
    for (let x = offset; x < w; x += tile) {
      const g = ctx.createLinearGradient(0, y, 0, y + th);
      g.addColorStop(0, "#fdfcf8");
      g.addColorStop(1, "#efebe2");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.roundRect(x + inset, y + inset, tile - inset * 2, th - inset * 2, tile * 0.035);
      ctx.fill();
    }
  }
}

/**
 * Renders the finished sign to a PNG: big enough to print (about 2400px
 * across the tablet), on the tile wall or on its own with a transparent
 * background.
 */
function renderPNG(lines: string[], capHeight: number, palette: TabletPalette, backdrop: Backdrop): Promise<Blob> {
  const plan = layoutTablet(lines, capHeight, palette);
  const cell = Math.max(10, Math.min(36, Math.floor(2400 / plan.cols)));
  const tw = plan.cols * cell;
  const th = plan.rows * cell;
  const margin = backdrop === "wall" ? Math.round(Math.max(tw, th) * 0.14) : 0;
  const canvas = document.createElement("canvas");
  canvas.width = tw + margin * 2;
  canvas.height = th + margin * 2;
  const ctx = canvas.getContext("2d")!;
  if (backdrop === "wall") {
    paintWall(ctx, canvas.width, canvas.height, cell * 6);
    // The tablet's shadow on the wall.
    ctx.save();
    ctx.shadowColor = "rgba(40, 30, 15, 0.28)";
    ctx.shadowBlur = cell * 1.6;
    ctx.shadowOffsetY = cell * 0.7;
    ctx.fillStyle = "#cfc7b6";
    ctx.fillRect(margin, margin, tw, th);
    ctx.restore();
  }
  ctx.translate(margin, margin);
  paintTablet(ctx, plan, cell, Infinity);
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Couldn't make the image."))), "image/png"));
}

const slug = (lines: string[]) =>
  lines
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "sign";

/* ---------- Controls ---------- */

function Choice<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
  swatch,
}: {
  legend: string;
  name: string;
  value: T;
  options: { id: T; name: string }[];
  onChange: (v: T) => void;
  swatch?: (id: T) => React.ReactNode;
}) {
  return (
    <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
      <legend className="mb-3 p-0 text-sm uppercase tracking-wider text-fonttertiary">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.id} className="sm-choice">
            <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} className="sr-only" />
            {swatch?.(o.id)}
            <span>{o.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function SignMaker() {
  const [text, setText] = useState("WEST 4 ST");
  const [colour, setColour] = useState<keyof typeof PALETTES>("teal");
  const [size, setSize] = useState<(typeof SIZES)[number]["id"]>("large");
  const [backdrop, setBackdrop] = useState<Backdrop>("wall");
  const [take, setTake] = useState(0);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const textId = useId();
  const reduce = !!useReducedMotion();

  const lines = useMemo(() => linesOf(text), [text]);
  const capHeight = SIZES.find((s) => s.id === size)!.capHeight;
  const palette = PALETTES[colour];
  const empty = lines.length === 0;

  const flash = (msg: string) => {
    setStatus(msg);
    window.setTimeout(() => setStatus(""), 2000);
  };

  const download = async () => {
    if (empty || busy) return;
    setBusy(true);
    try {
      const blob = await renderPNG(lines, capHeight, palette, backdrop);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug(lines)}.png`;
      a.click();
      // Some browsers drop the download if the URL is revoked straight away.
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      flash("Downloaded");
    } catch {
      flash("Couldn't make the image. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (empty || busy) return;
    if (typeof ClipboardItem === "undefined" || !navigator.clipboard?.write) {
      flash("This browser can't copy images. Use Download instead.");
      return;
    }
    setBusy(true);
    try {
      // Safari wants the ClipboardItem built right away, holding a promise for the image.
      await navigator.clipboard.write([new ClipboardItem({ "image/png": renderPNG(lines, capHeight, palette, backdrop) })]);
      flash("Copied");
    } catch {
      flash("Couldn't copy it. Use Download instead.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full">
      {/* The sign, on the wall, as you make it. */}
      <section className="nyc-wall relative flex flex-col" style={{ marginTop: -NAV_SPACE, paddingTop: NAV_SPACE, minHeight: "min(78svh, 760px)" }}>
        <div className="mx-auto w-full max-w-5xl px-6 pt-4" style={{ color: INK }}>
          <WorkCrumb page="New York sign maker" parent={{ href: "/experiments", label: "Experiments" }} />
        </div>
        <div className="relative flex flex-1 items-center justify-center px-6 py-14">
          <div className="w-full max-w-[960px] drop-shadow-[0_10px_18px_rgba(40,30,15,0.18)]">
            {empty ? (
              <p className="m-0 text-center font-mono text-[13px] opacity-60" style={{ color: INK }}>
                Type something below.
              </p>
            ) : (
              <MosaicTablet key={take} lines={lines} capHeight={capHeight} palette={palette} play instant={reduce} maxCell={14} speed={1.4} />
            )}
          </div>
          {!empty && !reduce && (
            <button type="button" className="sm-replay" onClick={() => setTake((t) => t + 1)}>
              Set it again
            </button>
          )}
        </div>
      </section>

      <form
        className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16"
        style={{ ["--sm-field" as string]: palette.field, ["--sm-letter" as string]: palette.letter }}
        onSubmit={(e) => {
          e.preventDefault();
          download();
        }}
      >
        <div className="flex flex-col gap-3">
          <h1 className="m-0 text-2xl font-normal text-fontprimary">Make a subway sign</h1>
          <p className="m-0 max-w-[60ch] text-fonttertiary text-pretty">
            Your words, set in tile the way New York has named its subway stations since 1904. Same tiles as the{" "}
            <Link href="/guides/new-york" className="underline underline-offset-2" style={{ color: "inherit" }}>
              New York guide
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={textId} className="text-sm uppercase tracking-wider text-fonttertiary">
            Your sign
          </label>
          <textarea
            id={textId}
            value={text}
            onChange={(e) => setText(tidy(e.target.value))}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                download();
              }
            }}
            rows={3}
            spellCheck={false}
            autoComplete="off"
            data-1p-ignore
            data-lpignore="true"
            className="sm-textarea"
          />
          <p className="m-0 text-sm text-fontmuted">Three lines, {MAX_CHARS} letters each.</p>
        </div>

        <Choice
          legend="Colours"
          name="colour"
          value={colour}
          options={COLOURS}
          onChange={setColour}
          swatch={(id) => (
            <span className="sm-swatch" style={{ background: PALETTES[id].field, boxShadow: `inset 0 0 0 3px ${PALETTES[id].bandA}` }} aria-hidden="true" />
          )}
        />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <Choice legend="Size" name="size" value={size} options={SIZES.map((s) => ({ id: s.id, name: s.name }))} onChange={setSize} />
          <Choice
            legend="Background"
            name="backdrop"
            value={backdrop}
            options={[
              { id: "wall" as Backdrop, name: "Tile wall" },
              { id: "none" as Backdrop, name: "Transparent" },
            ]}
            onChange={setBackdrop}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="sm-button sm-button-primary" disabled={empty || busy}>
            {busy ? "Making it…" : "Download PNG"}
          </button>
          <button type="button" className="sm-button" onClick={copy} disabled={empty || busy}>
            Copy image
          </button>
          <span className="text-sm text-fonttertiary" role="status" aria-live="polite">
            {status}
          </span>
        </div>
      </form>
    </div>
  );
}
