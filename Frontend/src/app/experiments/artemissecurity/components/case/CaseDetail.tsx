"use client";

import Link from "next/link";
import { useState } from "react";
import { Disclose } from "../ui/Disclose";
import type { CaseRecord, Severity } from "../../lib/types";
import * as D from "../../lib/caseDetail";
import { Nav } from "../queue/Nav";
import {
  ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Copy, X,
} from "../ui/Icon";
import {
  MicroLabel, PrimaryButton, QuietButton, RailHead, SecondaryButton, SectionHead, SourceChip,
} from "./parts";

const sevName: Record<Severity, string> = {
  CRIT: "CRITICAL", HIGH: "HIGH", MED: "MEDIUM", LOW: "LOW",
};
const sevVar: Record<Severity, string> = {
  CRIT: "critical", HIGH: "high", MED: "medium", LOW: "low",
};
const verdictText = {
  TP: "True positive", Benign: "True benign", FP: "False positive", Investigating: "Investigating",
} as const;

export function CaseDetail({ data }: { data: CaseRecord }) {
  const [openClaim, setOpenClaim] = useState(0);
  const sev = sevVar[data.severity];
  const hasTint = data.severity === "CRIT" || data.severity === "HIGH";

  return (
    <div className="flex h-screen bg-canvas">
      <Nav />

      <main className="flex min-w-0 flex-1 flex-col">
        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <div className="flex h-44 shrink-0 items-center justify-between gap-10 border-b border-hairline px-28">
          <div className="flex items-center gap-9">
            <Link href="/experiments/artemissecurity" className="flex items-center gap-9 text-muted hover:text-primary">
              <ChevronLeft />
              <span className="text-[12.5px] leading-[18px]">Cases</span>
            </Link>
            <span className="text-[12px] leading-[17px] text-faint">/</span>
            <span className="font-mono text-[12.5px] leading-[18px] font-medium text-secondary">
              {data.id}
            </span>
            <button className="flex items-center gap-6 rounded-sm px-8 py-4 text-faint hover:bg-hover">
              <Copy />
              <span className="text-[11.5px] leading-[16px]">Copy ID</span>
            </button>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-[11.5px] leading-[16px] text-faint">
              3 of 9 in Needs your verdict
            </span>
            <button className="flex size-26 items-center justify-center rounded-sm border border-line bg-inset text-muted hover:bg-hover">
              <ChevronLeft size={12} />
            </button>
            <button className="flex size-26 items-center justify-center rounded-sm border border-line bg-inset text-muted hover:bg-hover">
              <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {/* ── Case header ────────────────────────────────────────────── */}
        <header className="flex shrink-0 flex-col gap-12 border-b border-hairline bg-panel px-28 pt-18 pb-16">
          <div className="flex items-center gap-12">
            <span
              className="shrink-0 rounded-[5px] border py-4 pr-9 pl-8 font-mono text-[10.5px] leading-[15px] font-medium tracking-[0.6px]"
              style={{
                background: hasTint ? `var(--sev-${sev}-bg)` : "transparent",
                borderColor: hasTint ? `var(--sev-${sev}-border)` : "var(--border-default)",
                color: `var(--sev-${sev})`,
              }}
            >
              {sevName[data.severity]}
            </span>
            <h1 className="min-w-0 flex-1 truncate text-[19px] leading-[27px] font-semibold tracking-[-0.3px] text-primary">
              {data.title}
            </h1>
          </div>

          <div className="flex items-center justify-between gap-16">
            <div className="flex items-center gap-9">
              <span className="size-7 rounded-full" style={{ background: "var(--text-primary)" }} />
              <span className="text-[12.5px] leading-[18px] font-medium text-primary">
                {verdictText[data.verdict]}
              </span>
              <span className="text-[11.5px] leading-[16px] text-faint">·</span>
              <span className="text-[12.5px] leading-[18px] text-muted">
                {data.confidence} confidence
              </span>
              <span className="h-14 w-1 bg-line" />
              <Dropdown label="Status" value="Open" />
              <Dropdown label="Assignee" value={data.initials ? "Assigned" : "Unassigned"} />
              <span className="h-14 w-1 bg-line" />
              <span className="text-[11.5px] leading-[16px] text-faint">
                Detected {data.age} ago
              </span>
              <span className="text-[11px] leading-[15px] text-faint">·</span>
              <span className="text-[11.5px] leading-[16px] text-faint">Released 4m ago</span>
            </div>

            <div className="flex items-center gap-8">
              <SecondaryButton inset>
                Respond &amp; Remediate
                <span className="rounded-xs bg-hover px-6 py-1 font-mono text-[10.5px] leading-[15px] font-medium text-secondary">
                  3
                </span>
              </SecondaryButton>
              <SecondaryButton inset>Override</SecondaryButton>
              <PrimaryButton>Confirm verdict</PrimaryButton>
            </div>
          </div>
        </header>

        {/* ── Body ─────────────────────────────────────────────────────
            Only this scrolls. The nav stays put, and so do the breadcrumb and
            the header — which is the point of the header: the two buttons that
            resolve the case shouldn't scroll away while you read the evidence.

            The inner min-h-full is what keeps the rail's panel background
            running the full length of a long case; without it the rail stops
            at the fold. */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex min-h-full">
          <div className="min-w-0 flex-1 px-28 pt-24 pb-32">
            <SectionHead label="WHAT HAPPENED" first />

            <p className="text-[14.5px] leading-[24px] text-secondary">
              {D.summary.map((s, i) =>
                s.mono ? (
                  <span key={i} className="font-mono text-[13.5px] font-medium text-primary">
                    {s.text}
                  </span>
                ) : (
                  <span key={i}>{s.text}</span>
                ),
              )}
            </p>

            <SectionHead label="VERDICT" />

            {/* Verdict block */}
            <div className="rounded-xl border border-line bg-inset px-22 pt-20 pb-18">
              <div className="flex items-center justify-between gap-9">
                <div className="flex items-center gap-9">
                  <span className="size-8 rounded-full" style={{ background: "var(--text-primary)" }} />
                  <span className="text-[15px] leading-[21px] font-semibold tracking-[-0.1px] text-primary">
                    {verdictText[data.verdict]}
                  </span>
                  <span className="text-[13px] leading-[18px] text-faint">·</span>
                  <span className="text-[14px] leading-[20px] text-muted">
                    {data.confidence} confidence
                  </span>
                </div>
                <span className="text-[12px] leading-[17px] text-faint">
                  Corroborated across Okta, AWS and CrowdStrike
                </span>
              </div>

              {/* Scope. Examined / not examined / not asked, in that order, so
                  the gaps sit next to the claims rather than in a footnote. */}
              <div className="pt-16 pb-18">
                <div className="flex flex-col gap-10 rounded-lg border border-hairline bg-hover px-16 py-14">
                  <MicroLabel>SCOPE OF INVESTIGATION</MicroLabel>
                  {D.scope.map((r) => (
                    <div key={r.label} className="flex gap-14">
                      <span className="w-96 shrink-0 text-[11.5px] leading-[16px] font-medium text-faint">
                        {r.label}
                      </span>
                      <span
                        className="flex-1 text-[12.5px] leading-[19px]"
                        style={{
                          color:
                            r.tone === "high" ? "var(--sev-high)"
                              : r.tone === "muted" ? "var(--text-muted)"
                                : "var(--text-secondary)",
                        }}
                      >
                        {r.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <MicroLabel>WHY</MicroLabel>

              {/* Claims. Evidence opens inline, under the sentence it supports —
                  send someone to a drawer and they stop checking and start
                  trusting. */}
              <div className="flex flex-col gap-12 pt-12 pb-18">
                {D.claims.map((c, i) => {
                  const open = openClaim === i;
                  return (
                    <div key={c.statement} className="flex flex-col">
                      <button
                        onClick={() => setOpenClaim(open ? -1 : i)}
                        className="flex gap-11 text-left"
                      >
                        {/* One glyph rotated, not two swapped — the turn is
                            the affordance. Width stays the glyph's. */}
                        <span
                          className="chev flex shrink-0 justify-center pt-4 text-muted"
                          data-open={open || undefined}
                          style={{ width: open ? 7 : 3 }}
                        >
                          <ChevronRight size={13} />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col gap-5">
                          <span
                            className={[
                              "text-[13.5px] leading-[20px] text-primary",
                              open ? "font-medium" : "",
                            ].join(" ")}
                          >
                            {c.statement}
                          </span>
                          <span className="flex items-center gap-8">
                            <SourceChip>{c.source}</SourceChip>
                            <span className="text-[11.5px] leading-[16px] text-faint">
                              {c.detail}
                            </span>
                          </span>
                        </span>
                      </button>

                      {i === 0 && (
                        <Disclose open={open}>
                          <EvidencePanel ledgerHref={`/experiments/artemissecurity/cases/${data.id}/ledger`} />
                        </Disclose>
                      )}
                    </div>
                  );
                })}
              </div>

              <MicroLabel>RULED OUT</MicroLabel>
              <div className="flex flex-col gap-9 pt-12 pb-18">
                {D.ruledOut.map((r) => (
                  <div key={r.name} className="flex items-center gap-11">
                    <span
                      className="size-5 shrink-0 rounded-full"
                      style={{ border: "1px solid var(--text-faint)" }}
                    />
                    <span className="text-[13px] leading-[18px] text-muted">{r.name}</span>
                    <span className="text-[11.5px] leading-[16px] text-faint">{r.why}</span>
                  </div>
                ))}
              </div>

              {/* The falsifier. One sentence naming what would overturn this. */}
              <div className="pb-16">
                <div
                  className="flex items-center gap-10 rounded-[8px] px-14 py-11"
                  style={{
                    background: "var(--accent-subtle)",
                    border: "1px solid var(--accent-default)",
                  }}
                >
                  <span className="shrink-0 text-[12.5px] leading-[18px] text-muted">
                    {D.falsifier.lead}
                  </span>
                  <span className="shrink-0 text-[12.5px] leading-[18px] font-medium text-secondary">
                    {D.falsifier.verdict}
                  </span>
                  <span className="flex-1 text-[12.5px] leading-[18px] text-muted">
                    {D.falsifier.condition}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-10 border-t border-hairline pt-16">
                <div className="flex items-center gap-8">
                  <Link
                    href={`/experiments/artemissecurity/cases/${data.id}/ledger`}
                    className="text-[12.5px] leading-[18px] font-medium hover:underline"
                    style={{ color: "var(--accent-default)" }}
                  >
                    Show full investigation
                  </Link>
                  <span className="text-[11.5px] leading-[16px] text-faint">
                    23 steps · 6 returned nothing
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <SecondaryButton>Override</SecondaryButton>
                  <PrimaryButton>Confirm verdict</PrimaryButton>
                </div>
              </div>

              <p className="pt-12 text-[11.5px] leading-[16px] text-faint">
                A false-positive or benign verdict freezes this case. Later related activity
                arrives as a new case.
              </p>
            </div>

            <SectionHead
              label="ATTACK CHAIN"
              note="5 key moments of 47 events · 09:14–09:31 UTC"
              trailing={
                <Link
                  href={`/experiments/artemissecurity/cases/${data.id}/events`}
                  className="pressable shrink-0 rounded-[5px] border border-line bg-hover px-9 py-4 text-[11.5px] leading-[16px] font-medium text-secondary hover:bg-inset"
                >
                  All events
                </Link>
              }
            />

            <div className="flex flex-col">
              {D.timeline.map((e, i) => (
                <div
                  key={e.at}
                  className={[
                    "flex items-center gap-12 py-11",
                    i < D.timeline.length - 1 ? "border-b border-hairline" : "",
                  ].join(" ")}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center">
                    <span
                      className="size-6 rounded-full"
                      style={{ background: e.critical ? "var(--sev-critical)" : "var(--text-faint)" }}
                    />
                  </span>
                  <span className="tabular w-62 shrink-0 font-mono text-[11.5px] leading-[16px] text-muted">
                    {e.at}
                  </span>
                  <SourceChip>{e.source}</SourceChip>
                  <span className="w-146 shrink-0 truncate font-mono text-[12px] leading-[17px] font-medium text-secondary">
                    {e.actor}
                  </span>
                  <span className="w-148 shrink-0 truncate text-[13px] leading-[18px] text-primary">
                    {e.action}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-[11.5px] leading-[16px] text-faint">
                    {e.detail}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-12 pl-22">
              <Link
                href={`/experiments/artemissecurity/cases/${data.id}/events`}
                className="block text-[12.5px] leading-[18px] font-medium hover:underline"
                style={{ color: "var(--accent-default)" }}
              >
                Show all 47 events
              </Link>
            </div>

            <SectionHead label="FINDINGS" note="3 detection types · 7 firings" />

            <div className="flex flex-col">
              {D.findings.map((f, i) => (
                <div
                  key={f.name}
                  className={[
                    "flex items-center gap-11 py-12",
                    i < D.findings.length - 1 ? "border-b border-hairline" : "",
                  ].join(" ")}
                >
                  <span className="flex w-3 shrink-0 justify-center text-faint">
                    <ChevronRight size={11} />
                  </span>
                  <span
                    className="w-38 shrink-0 font-mono text-[10px] leading-[14px] font-medium tracking-[0.5px]"
                    style={{ color: f.severity === "CRIT" ? "var(--sev-critical)" : "var(--sev-high)" }}
                  >
                    {f.severity}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[13px] leading-[18px] text-primary">
                    {f.name}
                  </span>
                  <SourceChip>{f.source}</SourceChip>
                  <span className="shrink-0 text-[11.5px] leading-[16px] text-faint">{f.firings}</span>
                </div>
              ))}
            </div>

            <SectionHead label="RESPOND &amp; REMEDIATE" note="3 recommended · none approved yet" />

            {/* Artemis can execute these itself. The tag says where it runs and
                whether a second admin has to sign off first. */}
            <div className="flex flex-col gap-10">
              {D.actions.map((a) => (
                <div key={a.title} className="flex flex-col gap-10 rounded-[10px] border border-line bg-inset px-18 py-15">
                  <div className="flex items-center gap-10">
                    <span className="min-w-0 flex-1 text-[13.5px] leading-[19px] font-medium text-primary">
                      {a.title}
                    </span>
                    <span
                      className="shrink-0 rounded-xs border px-7 py-3 font-mono text-[10px] leading-[14px] font-medium tracking-[0.3px]"
                      style={
                        a.tagTone === "high"
                          ? { background: "var(--sev-high-bg)", borderColor: "var(--sev-high-border)", color: "var(--sev-high)" }
                          : { background: "var(--bg-surface-hover)", borderColor: "var(--border-hairline)", color: "var(--text-muted)" }
                      }
                    >
                      {a.tag}
                    </span>
                  </div>
                  <p className="text-[12.5px] leading-[19px] text-muted">{a.body}</p>
                  <div className="flex items-center justify-between gap-10">
                    <span className="text-[11.5px] leading-[16px] text-faint">{a.note}</span>
                    {a.cta && (
                      <button className="pressable rounded-[7px] border border-line-strong bg-hover px-13 py-6 text-[12px] leading-[17px] font-medium text-primary hover:bg-inset">
                        {a.cta}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Rail ─────────────────────────────────────────────────── */}
          <aside className="w-340 shrink-0 border-l border-hairline bg-panel px-22 pt-24 pb-32">
            <RailHead label="ENTITIES" count="3" first />
            {D.entities.map((e) => (
              <div key={e.name} className="flex flex-col gap-4 py-8">
                <div className="flex items-center gap-7">
                  <span className="min-w-0 flex-1 truncate font-mono text-[12px] leading-[17px] font-medium tracking-[-0.1px] text-secondary">
                    {e.name}
                  </span>
                  {e.tag && (
                    <span
                      className="shrink-0 rounded-[3px] border px-5 py-[1.5px] font-mono text-[9px] leading-[13px] font-medium tracking-[0.3px]"
                      style={{ background: "var(--sev-high-bg)", borderColor: "var(--sev-high-border)", color: "var(--sev-high)" }}
                    >
                      {e.tag}
                    </span>
                  )}
                </div>
                <span className="text-[11px] leading-[15px] text-faint">{e.sub}</span>
              </div>
            ))}

            <RailHead label="OBSERVABLES" count="2" />
            {D.observables.map((o) => (
              <div key={o.name} className="flex flex-col gap-5 py-8">
                <span className="font-mono text-[12px] leading-[17px] font-medium tracking-[-0.1px] text-secondary">
                  {o.name}
                </span>
                {o.lines.map((l) => (
                  <span key={l} className="text-[11px] leading-[16px] text-faint">{l}</span>
                ))}
              </div>
            ))}

            <RailHead label="SOURCES" count="3 of 4" />
            {D.sources.map((s) => (
              <div key={s.name} className="flex items-center gap-9 py-7">
                <span
                  className="shrink-0"
                  style={{ color: s.ok ? "var(--text-muted)" : "var(--sev-high)" }}
                >
                  {s.ok ? <Check /> : <X size={12} />}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-2">
                  <span
                    className="text-[12px] leading-[17px] font-medium"
                    style={{ color: s.ok ? "var(--text-secondary)" : "var(--text-primary)" }}
                  >
                    {s.name}
                  </span>
                  <span
                    className="text-[10.5px] leading-[15px]"
                    style={{ color: s.ok ? "var(--text-faint)" : "var(--sev-high)" }}
                  >
                    {s.sub}
                  </span>
                </span>
              </div>
            ))}

            <RailHead label="MITRE ATT&amp;CK" count="3" />
            {D.mitre.map((m) => (
              <div key={m.tactic} className="flex flex-col gap-3 py-7">
                <span className="text-[11px] leading-[15px] font-medium text-muted">{m.tactic}</span>
                <span className="font-mono text-[11px] leading-[15px] text-faint">{m.technique}</span>
              </div>
            ))}

            <RailHead label="ACTIVITY" count="3" />
            {D.activity.map((a) => (
              <div key={a.text} className="flex gap-9 py-8">
                <span
                  className="flex size-18 shrink-0 items-center justify-center rounded-[5px] text-[9px] leading-[13px] font-medium"
                  style={{ background: "var(--accent-solid)", color: "var(--text-on-accent)" }}
                >
                  A
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-3">
                  <span className="text-[11.5px] leading-[17px] text-muted">{a.text}</span>
                  <span className="text-[10.5px] leading-[15px] text-faint">{a.at}</span>
                </span>
              </div>
            ))}
          </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function Dropdown({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-center gap-6">
      <span className="text-[11.5px] leading-[16px] text-faint">{label}</span>
      <span className="text-[12.5px] leading-[18px] font-medium text-secondary">{value}</span>
      <span className="text-faint"><ChevronDown size={11} /></span>
    </span>
  );
}

/* Depth 2: the question Artemis asked, the query it ran, what came back, and
   what it concluded — with the step counter so you know where you are in the
   ledger without opening it. */
function EvidencePanel({ ledgerHref }: { ledgerHref: string }) {
  const e = D.evidence;
  return (
    <div className="pt-22 pr-0 pb-6 pl-24">
      <div className="rounded-lg border border-line bg-hover px-18 pt-16 pb-14">
        <MicroLabel>QUESTION</MicroLabel>
        <p className="pt-6 pb-16 text-[13.5px] leading-[20px] font-medium text-primary">
          {e.question}
        </p>

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

        <div className="pt-8 pb-10">
          <div className="flex flex-col gap-8 rounded-[7px] border border-hairline bg-canvas px-14 py-10">
            <div className="flex font-mono text-[10.5px] leading-[15px] tracking-[0.2px] text-faint">
              <span className="w-260">{e.columns[0]}</span>
              <span className="w-180">{e.columns[1]}</span>
              <span className="w-80">{e.columns[2]}</span>
            </div>
            <span className="h-1 bg-hairline" />
            <span className="font-mono text-[11.5px] leading-[16px] text-muted">{e.empty}</span>
          </div>
        </div>

        <p className="pb-16 text-[11.5px] leading-[18px] text-muted">{e.comparison}</p>

        <MicroLabel>CONCLUDED</MicroLabel>
        <p className="pt-6 pb-14 text-[13px] leading-[20px] text-primary">{e.concluded}</p>

        <div className="flex items-center justify-between gap-10 border-t border-hairline pt-13">
          <span className="flex items-center gap-8">
            <span className="tabular font-mono text-[11px] leading-[15px] text-faint">{e.step}</span>
            <span className="text-[11px] leading-[15px] text-faint">·</span>
            <span className="text-[11px] leading-[15px] text-faint">{e.nothing}</span>
          </span>
          <span className="flex items-center gap-6">
            <QuietButton>Previous step</QuietButton>
            <QuietButton>Next step</QuietButton>
            <Link
              href={ledgerHref}
              className="shrink-0 text-[11.5px] leading-[16px] font-medium hover:underline"
              style={{ color: "var(--accent-default)" }}
            >
              Show full ledger
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
