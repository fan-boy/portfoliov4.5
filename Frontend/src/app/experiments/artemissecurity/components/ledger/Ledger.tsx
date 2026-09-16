"use client";

import Link from "next/link";
import { useState } from "react";
import type { CaseRecord } from "../../lib/types";
import type { Outcome, Step } from "../../lib/ledger";
import * as L from "../../lib/ledger";
import { Nav } from "../queue/Nav";
import {
  ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Download, TriangleOutline, X,
} from "../ui/Icon";
import { MicroLabel, QuietButton } from "../case/parts";
import { Disclose } from "../ui/Disclose";

/* Every question Artemis asked, in the order it asked them. Rows are one line
   each so 23 steps fit in a scan; the one whose evidence you care about opens
   in place. */

const outcomeColor: Record<Outcome, string> = {
  Context: "var(--text-faint)",
  Supported: "var(--text-secondary)",
  "Ruled out": "var(--text-muted)",
  Inconclusive: "var(--text-faint)",
  Failed: "var(--sev-high)",
  "Not asked": "var(--text-faint)",
};

/* The glyph carries the outcome at a glance: a dash did no work, a filled dot
   holds the verdict up, a ring closed something off, a triangle never ran. */
function Glyph({ outcome }: { outcome: Outcome }) {
  if (outcome === "Failed") {
    return (
      <span className="flex size-12 items-center justify-center" style={{ color: "var(--sev-high)" }}>
        <TriangleOutline w={10} h={9} />
      </span>
    );
  }
  if (outcome === "Supported") {
    return (
      <span className="flex size-12 items-center justify-center">
        <span className="size-7 rounded-full" style={{ background: "var(--text-primary)" }} />
      </span>
    );
  }
  if (outcome === "Ruled out" || outcome === "Inconclusive") {
    const ruled = outcome === "Ruled out";
    return (
      <span className="flex size-12 items-center justify-center">
        <span
          className="size-7 rounded-full"
          style={{
            border: `${ruled ? 1.3 : 1.2}px solid ${ruled ? "var(--text-secondary)" : "var(--text-faint)"}`,
          }}
        />
      </span>
    );
  }
  return (
    <span className="flex size-12 items-center justify-center">
      <span className="h-2 w-7 rounded-[1px]" style={{ background: "var(--text-faint)" }} />
    </span>
  );
}

function PhaseHead({ label, range }: { label: string; range: string }) {
  return (
    <div className="flex items-center gap-10 pt-22 pb-10">
      <MicroLabel>{label}</MicroLabel>
      <span className="shrink-0 font-mono text-[9.5px] leading-[13px] font-medium tracking-[0.3px] text-muted">
        {range}
      </span>
      <span className="h-1 flex-1 bg-hairline" />
    </div>
  );
}

function StepRow({ step, open, onToggle }: { step: Step; open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={[
        "flex h-41 w-full items-center gap-12 rounded-md border-b border-hairline px-6 text-left",
        "transition-colors duration-120 ease-out",
        open ? "bg-hover" : "hover:bg-hover",
      ].join(" ")}
    >
      <span className="tabular w-22 shrink-0 font-mono text-[11px] leading-[15px] text-faint">
        {step.n}
      </span>
      <Glyph outcome={step.outcome} />
      <span
        className="min-w-0 flex-1 truncate text-[13px] leading-[18px]"
        style={{ color: step.outcome === "Supported" ? "var(--text-primary)" : "var(--text-secondary)" }}
      >
        {step.question}
      </span>
      <span className="w-122 shrink-0 truncate font-mono text-[11px] leading-[15px] text-faint">
        {step.source}
      </span>
      <span
        className="tabular w-88 shrink-0 text-right font-mono text-[11.5px] leading-[16px]"
        style={{ color: step.result === "0 rows" ? "var(--text-secondary)" : "var(--text-faint)" }}
      >
        {step.result}
      </span>
      <span
        className="w-80 shrink-0 text-[11px] leading-[15px] font-medium"
        style={{ color: outcomeColor[step.outcome] }}
      >
        {step.outcome}
      </span>
      {/* Width is the glyph's, not the SVG box's — an 11px box here would
          steal 8px from the question column and shift everything after it.
          Rotating one glyph rather than swapping two keeps that width honest
          and gives the open state something to animate. */}
      <span
        className="chev flex shrink-0 justify-center text-faint"
        data-open={open || undefined}
        style={{ width: open ? 6 : 3 }}
      >
        <ChevronRight size={12} />
      </span>
    </button>
  );
}

function Expanded() {
  const e = L.expandedStep;
  return (
    <div className="pt-10 pb-14 pl-40">
      <div className="rounded-lg border border-line bg-inset px-18 py-15">
        <div className="flex items-center justify-between gap-10">
          <span className="flex items-center gap-9">
            <MicroLabel>QUERY</MicroLabel>
            <span className="text-[10.5px] leading-[15px] text-faint">{e.queryNote}</span>
          </span>
          <span className="flex items-center gap-6">
            <QuietButton><span className="flex items-center gap-6"><Copy size={11} />Copy</span></QuietButton>
            <QuietButton><span className="flex items-center gap-6"><ArrowUpRight />Open in search</span></QuietButton>
          </span>
        </div>

        <div className="pt-8 pb-16">
          <pre className="overflow-x-auto rounded-[7px] border border-hairline bg-canvas px-14 py-11 font-mono text-[11.5px] leading-[19px] whitespace-pre text-secondary">
            {e.query.map((seg, i) => (
              <span key={i} style={seg.kw ? { color: "var(--accent-default)" } : undefined}>
                {seg.t}
              </span>
            ))}
          </pre>
        </div>

        <div className="flex items-center gap-9">
          <MicroLabel>RETURNED</MicroLabel>
          <span
            className="font-mono text-[11px] leading-[15px] font-medium tracking-[0.2px]"
            style={{ color: "var(--sev-critical)" }}
          >
            {e.returned}
          </span>
        </div>

        <p className="pt-8 pb-14 text-[11.5px] leading-[18px] text-muted">{e.comparison}</p>

        <MicroLabel>CONCLUDED</MicroLabel>
        <p className="pt-6 pb-12 text-[13px] leading-[20px] text-primary">{e.concluded}</p>

        <div className="flex items-center gap-8 border-t border-hairline pt-12">
          <span className="text-[11.5px] leading-[16px] text-faint">{e.cited}</span>
          <button
            className="text-[11.5px] leading-[16px] font-medium hover:underline"
            style={{ color: "var(--accent-default)" }}
          >
            Go to claim
          </button>
        </div>
      </div>
    </div>
  );
}

export function Ledger({ data }: { data: CaseRecord }) {
  const [open, setOpen] = useState("04");

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
                Investigation ledger
              </h1>
              <span className="text-[12.5px] leading-[18px] text-faint">
                every question Artemis asked, including the ones that returned nothing
              </span>
            </div>

            <div className="flex items-center gap-8">
              <span className="flex h-29 items-center gap-7 rounded-md border border-line bg-hover pr-11 pl-10">
                <span className="size-7 rounded-full" style={{ background: "var(--text-primary)" }} />
                <span className="text-[12px] leading-[17px] font-medium text-primary">
                  True positive
                </span>
                <span className="text-[11px] leading-[15px] text-faint">·</span>
                <span className="text-[12px] leading-[17px] text-muted">
                  {data.confidence} confidence
                </span>
              </span>
              <button className="pressable flex h-32 items-center gap-7 rounded-[7px] border border-line bg-inset pr-12 pl-11 hover:bg-hover">
                <span className="text-muted"><Download /></span>
                <span className="text-[12.5px] leading-[18px] font-medium text-secondary">
                  Export ledger
                </span>
              </button>
            </div>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex min-h-full">
          {/* ── Rail ─────────────────────────────────────────────────── */}
          <aside className="w-320 shrink-0 border-r border-hairline bg-panel px-24 pt-24 pb-32">
            <div className="flex items-center gap-8 pb-11">
              <MicroLabel>INVESTIGATION</MicroLabel>
              <span className="h-1 flex-1 bg-hairline" />
            </div>

            {L.stats.map((s) => (
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

            {/* The number that changes how you read the rest of the page. */}
            <div className="mt-12 flex flex-col gap-4 rounded-[8px] border border-hairline bg-inset px-12 py-10">
              <span className="text-[12px] leading-[17px] font-medium text-primary">
                {L.emptyNote.head}
              </span>
              <span className="text-[11px] leading-[16px] text-faint">{L.emptyNote.body}</span>
            </div>

            <div className="flex items-center gap-8 pt-26 pb-11">
              <MicroLabel>FILTER STEPS</MicroLabel>
              <span className="h-1 flex-1 bg-hairline" />
            </div>

            {L.filters.map((f) => (
              <button
                key={f.label}
                className={[
                  "flex h-29 w-full items-center justify-between gap-10 rounded-md px-9",
                  f.active ? "bg-hover" : "hover:bg-hover",
                ].join(" ")}
              >
                <span
                  className={[
                    "text-[12px] leading-[17px]",
                    f.active ? "font-medium text-primary" : "text-secondary",
                  ].join(" ")}
                >
                  {f.label}
                </span>
                <span className="tabular font-mono text-[11px] leading-[15px] text-faint">
                  {f.count}
                </span>
              </button>
            ))}

            <div className="flex items-center gap-8 pt-26 pb-11">
              <MicroLabel>SOURCES QUERIED</MicroLabel>
              <span className="h-1 flex-1 bg-hairline" />
            </div>

            {L.sourcesQueried.map((s) => (
              <div key={s.name} className="flex h-29 items-center gap-9">
                <span style={{ color: s.ok ? "var(--text-muted)" : "var(--sev-high)" }}>
                  {s.ok ? <Check size={12} /> : <X size={12} />}
                </span>
                <span
                  className="min-w-0 flex-1 truncate text-[12px] leading-[17px]"
                  style={{ color: s.ok ? "var(--text-secondary)" : "var(--text-primary)" }}
                >
                  {s.name}
                </span>
                <span
                  className="tabular shrink-0 font-mono text-[11px] leading-[15px]"
                  style={{ color: s.ok ? "var(--text-faint)" : "var(--sev-high)" }}
                >
                  {s.count}
                </span>
              </div>
            ))}
          </aside>

          {/* ── Steps ────────────────────────────────────────────────── */}
          <div className="min-w-0 flex-1 px-28 pt-20 pb-40">
            {L.phases.map((phase) => (
              <section key={phase.label}>
                <PhaseHead label={phase.label} range={phase.range} />
                {phase.steps.map((step) => (
                  <div key={step.n}>
                    <StepRow
                      step={step}
                      open={open === step.n}
                      onToggle={() => setOpen(open === step.n ? "" : step.n)}
                    />
                    {step.n === L.expandedStep.step && (
                      <Disclose open={open === step.n}>
                        <Expanded />
                      </Disclose>
                    )}
                  </div>
                ))}
              </section>
            ))}

            <PhaseHead label={L.notAsked.label} range={L.notAsked.range} />
            <p className="pb-10 text-[11.5px] leading-[17px] text-faint">{L.notAsked.note}</p>
            {L.notAsked.items.map((item) => (
              <div
                key={item.question}
                className="flex h-41 items-center gap-12 border-b border-hairline px-6"
              >
                <span className="w-22 shrink-0 font-mono text-[11px] leading-[15px] text-faint">—</span>
                <Glyph outcome="Not asked" />
                <span className="min-w-0 flex-1 truncate text-[13px] leading-[18px] text-muted">
                  {item.question}
                </span>
                <span className="shrink-0 text-[11.5px] leading-[16px] text-faint">{item.why}</span>
                <span className="w-80 shrink-0 text-[11px] leading-[15px] font-medium text-faint">
                  Not asked
                </span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
