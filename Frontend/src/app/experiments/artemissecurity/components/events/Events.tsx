"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CaseRecord } from "../../lib/types";
import type { ChainEvent } from "../../lib/events";
import type { Step } from "../../lib/ledger";
import * as E from "../../lib/events";
import { phases } from "../../lib/ledger";
import { Nav } from "../queue/Nav";
import { MicroLabel } from "../case/parts";
import { SourceChip } from "../case/parts";
import { ArrowUpRight, ChevronLeft, ChevronRight, Copy, Download } from "../ui/Icon";
import { Disclose } from "../ui/Disclose";
import { Json } from "../ui/Json";
import { QuietButton } from "../case/parts";
import { rawEvent } from "../../lib/rawEvent";

/* The full chain. The case page carries five moments because that's the
   story; this carries all 47 because that's the evidence, and the two read
   from the same array.

   The lens is the reason this is a screen and not an expander: with the
   investigation overlaid, the time axis answers the question the product is
   actually organised around — not "is the verdict right" but "did Artemis
   look at the thing that mattered, and when". */

const steps: Step[] = phases.flatMap((p) => p.steps);

type Row =
  | { kind: "event"; at: string; e: ChainEvent }
  | { kind: "step"; at: string; s: Step }
  | { kind: "detection"; at: string };

const outcomeColor: Record<string, string> = {
  Context: "var(--text-faint)",
  Supported: "var(--text-secondary)",
  "Ruled out": "var(--text-muted)",
  Inconclusive: "var(--text-faint)",
  Failed: "var(--sev-high)",
};

function RailHead({ label, first }: { label: string; first?: boolean }) {
  return (
    <div className={["flex items-center gap-8 pb-11", first ? "pt-0" : "pt-26"].join(" ")}>
      <MicroLabel>{label}</MicroLabel>
      <span className="h-1 flex-1 bg-hairline" />
    </div>
  );
}

function RailToggle({
  label, count, on, onClick,
}: { label: string; count?: string; on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex h-29 w-full items-center justify-between gap-10 rounded-md px-9",
        "transition-colors duration-120 ease-out",
        on ? "bg-hover" : "hover:bg-hover",
      ].join(" ")}
    >
      <span
        className={["text-[12px] leading-[17px]", on ? "font-medium text-primary" : "text-secondary"].join(" ")}
      >
        {label}
      </span>
      {count && (
        <span className="tabular font-mono text-[11px] leading-[15px] text-faint">{count}</span>
      )}
    </button>
  );
}

export function Events({ data }: { data: CaseRecord }) {
  const [lens, setLens] = useState<"events" | "both">("events");
  const [source, setSource] = useState<string | null>(null);
  const [entity, setEntity] = useState<string | null>(null);
  const [keyOnly, setKeyOnly] = useState(false);
  /* A set, not a single id — comparing two records side by side is most of
     what raw is for. */
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  /* Rows that have been opened at least once. The Disclose wrapper is mounted
     for every row so the track has something to transition from, but building
     47 raw records up front is waste — and at 4,700 events it's fatal. So the
     panel mounts on first open and stays; unmounting it on close would make
     the collapse instant, because the track would have nothing to shrink. */
  const [seen, setSeen] = useState<Set<string>>(() => new Set());

  const toggle = (at: string) => {
    setSeen((prev) => (prev.has(at) ? prev : new Set(prev).add(at)));
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(at)) next.delete(at);
      else next.add(at);
      return next;
    });
  };

  const rows = useMemo<Row[]>(() => {
    const kept = E.events.filter(
      (e) =>
        (!source || e.source === source) &&
        (!entity || e.actor === entity) &&
        (!keyOnly || e.key),
    );
    const out: Row[] = kept.map((e) => ({ kind: "event", at: e.at, e }));
    if (lens === "both") {
      out.push({ kind: "detection", at: E.detection.at });
      for (const s of steps) out.push({ kind: "step", at: s.at, s });
    }
    return out.sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0));
  }, [lens, source, entity, keyOnly]);

  const shown = rows.filter((r) => r.kind === "event").length;

  return (
    <div className="flex h-screen bg-canvas">
      <Nav />

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 flex-col gap-12 border-b border-hairline bg-panel px-28 py-16">
          <div className="flex items-center gap-9">
            <Link
              href={`/experiments/artemissecurity/cases/${data.id}`}
              className="flex items-center gap-9 text-muted hover:text-primary"
            >
              <ChevronLeft />
              <span className="text-[12.5px] leading-[18px]">Back to case</span>
            </Link>
            <span className="text-[11px] leading-[15px] text-faint">·</span>
            <span className="font-mono text-[12.5px] leading-[18px] font-medium text-secondary">
              {data.id}
            </span>
            <span className="truncate text-[12.5px] leading-[18px] text-faint">{data.title}</span>
          </div>

          <div className="flex items-center justify-between gap-12">
            <div className="flex items-baseline gap-12">
              <h1 className="text-[19px] leading-[27px] font-semibold tracking-[-0.3px] text-primary">
                Attack chain
              </h1>
              <span className="text-[12.5px] leading-[18px] text-faint">
                every event the case was built from, not just the ones it tells the story with
              </span>
            </div>

            <button className="pressable flex h-32 items-center gap-7 rounded-[7px] border border-line bg-inset pr-12 pl-11 hover:bg-hover">
              <span className="text-muted"><Download /></span>
              <span className="text-[12.5px] leading-[18px] font-medium text-secondary">
                Export events
              </span>
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex min-h-full">
            {/* ── Rail ─────────────────────────────────────────────────── */}
            <aside className="w-320 shrink-0 border-r border-hairline bg-panel px-24 pt-24 pb-32">
              <RailHead label="TIMELINE" first />
              {[
                { label: "Span", value: E.span.duration },
                { label: "Events", value: String(E.events.length) },
                { label: "Entities", value: String(E.byEntity.length) },
                { label: "First event", value: E.span.from },
                { label: "Detected after", value: "14m 12s", warn: true },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between gap-10 py-6">
                  <span className="text-[11.5px] leading-[16px] text-muted">{s.label}</span>
                  <span
                    className="tabular font-mono text-[12px] leading-[17px] font-medium tracking-[0.2px]"
                    style={{ color: s.warn ? "var(--sev-high)" : "var(--text-primary)" }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}

              {/* The fact that survives after you've read the chain once. */}
              <div className="mt-12 flex flex-col gap-4 rounded-[8px] border border-hairline bg-inset px-12 py-10">
                <span className="text-[12px] leading-[17px] font-medium text-primary">
                  3 events landed after the case opened
                </span>
                <span className="text-[11px] leading-[16px] text-faint">
                  Artemis was still investigating when the last one arrived. Overlay the
                  investigation to see where.
                </span>
              </div>

              <RailHead label="LENS" />
              <RailToggle label="Events only" count={String(E.events.length)} on={lens === "events"} onClick={() => setLens("events")} />
              <RailToggle label="Events + investigation" count={String(E.events.length + steps.length)} on={lens === "both"} onClick={() => setLens("both")} />

              <RailHead label="SOURCE" />
              <RailToggle label="All sources" count={String(E.events.length)} on={!source} onClick={() => setSource(null)} />
              {E.bySource.map((s) => (
                <RailToggle
                  key={s.name}
                  label={s.name}
                  count={String(s.count)}
                  on={source === s.name}
                  onClick={() => setSource(source === s.name ? null : s.name)}
                />
              ))}

              <RailHead label="ENTITY" />
              <RailToggle label="All entities" count={String(E.events.length)} on={!entity} onClick={() => setEntity(null)} />
              {E.byEntity.map((s) => (
                <RailToggle
                  key={s.name}
                  label={s.name}
                  count={String(s.count)}
                  on={entity === s.name}
                  onClick={() => setEntity(entity === s.name ? null : s.name)}
                />
              ))}

              <RailHead label="NARROW" />
              <RailToggle label="Key moments only" count="5" on={keyOnly} onClick={() => setKeyOnly(!keyOnly)} />
            </aside>

            {/* ── Chain ────────────────────────────────────────────────── */}
            <div className="min-w-0 flex-1 px-28 pt-20 pb-40">
              <div className="flex items-center gap-10 pb-10">
                <MicroLabel>
                  {shown === E.events.length ? "ALL EVENTS" : "FILTERED"}
                </MicroLabel>
                <span className="tabular shrink-0 font-mono text-[9.5px] leading-[13px] font-medium tracking-[0.3px] text-muted">
                  {shown === E.events.length ? `${shown}` : `${shown} of ${E.events.length}`}
                </span>
                <span className="shrink-0 text-[11px] leading-[15px] text-faint">
                  {E.span.from} – {E.span.to} UTC
                </span>
                <span className="h-1 flex-1 bg-hairline" />
                {(source || entity || keyOnly) && (
                  <button
                    onClick={() => { setSource(null); setEntity(null); setKeyOnly(false); }}
                    className="shrink-0 text-[11.5px] leading-[16px] font-medium hover:underline"
                    style={{ color: "var(--accent-default)" }}
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {rows.map((r, i) =>
                r.kind === "event" ? (
                  <EventRow
                    key={`e${i}`}
                    e={r.e}
                    last={i === rows.length - 1}
                    open={open.has(r.e.at)}
                    seen={seen.has(r.e.at)}
                    onToggle={() => toggle(r.e.at)}
                  />
                ) : r.kind === "detection" ? (
                  <DetectionRow key={`d${i}`} />
                ) : (
                  <StepRow key={`s${i}`} s={r.s} last={i === rows.length - 1} />
                ),
              )}

              {shown === 0 && (
                <p className="py-40 text-center text-[13px] leading-[20px] text-muted">
                  No events match these filters.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* Same six columns as the five-moment chain on the case page, so the full list
   reads as more of the same thing rather than a different screen. */
function EventRow({
  e, last, open, seen, onToggle,
}: { e: ChainEvent; last: boolean; open: boolean; seen: boolean; onToggle: () => void }) {
  return (
    <div className={last && !open ? "" : "border-b border-hairline"}>
    <button
      onClick={onToggle}
      className={[
        "flex w-full items-center gap-12 py-11 text-left",
        "transition-colors duration-120 ease-out",
        open ? "bg-hover" : "hover:bg-hover",
      ].join(" ")}
    >
      <span className="flex size-10 shrink-0 items-center justify-center">
        <span
          className="size-6 rounded-full"
          style={{
            background: e.critical
              ? "var(--sev-critical)"
              : e.key
                ? "var(--text-primary)"
                : "var(--border-strong)",
          }}
        />
      </span>
      <span className="tabular w-62 shrink-0 font-mono text-[11.5px] leading-[16px] text-muted">
        {e.at}
      </span>
      <SourceChip>{e.source}</SourceChip>
      <span className="w-146 shrink-0 truncate font-mono text-[12px] leading-[17px] font-medium text-secondary">
        {e.actor}
      </span>
      <span
        className={[
          "w-148 shrink-0 truncate text-[13px] leading-[18px]",
          e.key ? "font-medium text-primary" : "text-primary",
        ].join(" ")}
      >
        {e.action}
      </span>
      <span className="min-w-0 flex-1 truncate font-mono text-[11.5px] leading-[16px] text-faint">
        {e.detail}
      </span>
      <span
        className="chev flex w-3 shrink-0 justify-center text-faint"
        data-open={open || undefined}
      >
        <ChevronRight size={12} />
      </span>
    </button>

    <Disclose open={open}>{seen && <RawPanel e={e} />}</Disclose>
    </div>
  );
}

/* The record as the source emitted it. Indented past the clock so it reads as
   belonging to the row above rather than as a section of its own. */
function RawPanel({ e }: { e: ChainEvent }) {
  const raw = rawEvent(e);
  const id = (raw.uuid ?? raw.eventID ?? raw.aid) as string;
  return (
    <div className="pt-10 pr-0 pb-14 pl-84">
      <div className="flex items-center justify-between gap-10 pb-8">
        <span className="flex items-center gap-9">
          <MicroLabel>RAW EVENT</MicroLabel>
          <span className="text-[10.5px] leading-[15px] text-faint">
            {e.source} · {id.slice(0, 18)}
          </span>
        </span>
        <span className="flex items-center gap-6">
          <QuietButton>
            <span className="flex items-center gap-6"><Copy size={11} />Copy JSON</span>
          </QuietButton>
          <QuietButton>
            <span className="flex items-center gap-6"><ArrowUpRight />Open in search</span>
          </QuietButton>
        </span>
      </div>
      <Json value={raw} />
    </div>
  );
}

/* Artemis's own rows. Deliberately not column-matched to the events — only the
   clock is shared. The world and the agent are different kinds of fact and
   shouldn't be mistaken for each other at a glance. */
function StepRow({ s, last }: { s: Step; last: boolean }) {
  return (
    <div
      className={[
        "flex items-center gap-12 py-11",
        last ? "" : "border-b border-hairline",
      ].join(" ")}
      style={{ background: "var(--accent-bg)" }}
    >
      <span className="flex size-10 shrink-0 items-center justify-center">
        <span className="size-6 rounded-[1px]" style={{ background: "var(--accent-default)" }} />
      </span>
      <span className="tabular w-62 shrink-0 font-mono text-[11.5px] leading-[16px] text-muted">
        {s.at}
      </span>
      <span
        className="flex size-18 shrink-0 items-center justify-center rounded-[5px] text-[9px] leading-[13px] font-medium"
        style={{ background: "var(--accent-solid)", color: "var(--text-on-accent)" }}
      >
        A
      </span>
      <span className="tabular w-22 shrink-0 font-mono text-[11px] leading-[15px] text-faint">
        {s.n}
      </span>
      <span className="min-w-0 flex-1 truncate text-[13px] leading-[18px] text-secondary">
        {s.question}
      </span>
      <span className="tabular w-88 shrink-0 text-right font-mono text-[11.5px] leading-[16px] text-faint">
        {s.result}
      </span>
      <span
        className="w-80 shrink-0 text-[11px] leading-[15px] font-medium"
        style={{ color: outcomeColor[s.outcome] ?? "var(--text-faint)" }}
      >
        {s.outcome}
      </span>
    </div>
  );
}

/* The moment the case came into existence, sitting inside the attack rather
   than after it. That gap is the number a SOC actually reports. */
function DetectionRow() {
  return (
    <div className="flex items-center gap-12 border-b border-hairline py-11">
      <span className="flex size-10 shrink-0 items-center justify-center">
        <span
          className="size-8 rounded-full"
          style={{ border: "1.5px solid var(--accent-default)" }}
        />
      </span>
      <span className="tabular w-62 shrink-0 font-mono text-[11.5px] leading-[16px] text-muted">
        {E.detection.at}
      </span>
      <span className="text-[13px] leading-[18px] font-medium text-primary">
        {E.detection.label}
      </span>
      <span className="text-[11.5px] leading-[16px] text-faint">{E.detection.note}</span>
      <span className="h-1 flex-1" style={{ background: "var(--accent-border)" }} />
    </div>
  );
}
