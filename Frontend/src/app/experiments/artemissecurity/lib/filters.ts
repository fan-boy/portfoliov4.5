import type { CaseRecord } from "./types";

/* The filter model behind the bar, the add-filter popover and the dropdowns.

   Two rules the design turns on:
   - An ordinal field gets ≥ and ≤; one that isn't ordinal doesn't. Severity
     and confidence have a rank, verdict and coverage don't.
   - A field with no value picked doesn't participate. It isn't "matches
     everything" — that would make an `or` term swallow the whole query — it
     drops out of the expression entirely, the way an empty row does in any
     real builder. */

export type Operator = "is" | "is not" | "is or above" | "is or below" | "is any of";
export type Joiner = "and" | "or";

export const ORDINAL_OPS: Operator[] = ["is", "is not", "is or above", "is or below", "is any of"];
export const PLAIN_OPS: Operator[] = ["is", "is not", "is any of"];

/** The bar draws ordinal operators as glyphs; the menu spells them out. */
export const GLYPH: Partial<Record<Operator, string>> = {
  "is or above": "≥",
  "is or below": "≤",
};

export interface FieldValue {
  value: string;
  label: string;
  /** Severity carries its colour into the menu. Nothing else does. */
  swatch?: string;
}

export interface FieldDef {
  key: string;
  label: string;
  /** Has a rank, so ≥ and ≤ mean something. */
  ordinal?: boolean;
  values: FieldValue[];
  /** Absent means the mock data has no column behind this field yet. */
  get?: (c: CaseRecord) => string;
}

const sev = (v: string, label: string, swatch: string): FieldValue => ({ value: v, label, swatch });

const minutesOf = (age: string) => {
  const m = age.match(/(?:(\d+)h\s*)?(\d+)m/);
  return m ? Number(m[1] ?? 0) * 60 + Number(m[2]) : 0;
};

export const FIELDS: Record<string, FieldDef> = {
  severity: {
    key: "severity", label: "Severity", ordinal: true,
    values: [
      sev("CRIT", "Critical", "var(--sev-critical)"),
      sev("HIGH", "High", "var(--sev-high)"),
      sev("MED", "Medium", "var(--sev-medium)"),
      sev("LOW", "Low", "var(--sev-low)"),
    ],
    get: (c) => c.severity,
  },
  confidence: {
    key: "confidence", label: "Confidence", ordinal: true,
    values: [
      { value: "High", label: "High" },
      { value: "Medium", label: "Medium" },
      { value: "Low", label: "Low" },
    ],
    get: (c) => c.confidence,
  },
  verdict: {
    key: "verdict", label: "Verdict",
    values: [
      { value: "TP", label: "True positive" },
      { value: "Benign", label: "True benign" },
      { value: "FP", label: "False positive" },
    ],
    get: (c) => c.verdict,
  },
  coverage: {
    key: "coverage", label: "Coverage",
    values: [
      { value: "Complete", label: "Complete" },
      { value: "Partial", label: "Partial" },
      { value: "Failed", label: "Failed" },
    ],
    get: (c) => (c.qualifier.tone === "Coverage" ? "Partial" : "Complete"),
  },
  escalated: {
    key: "escalated", label: "Escalated",
    values: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
    get: (c) => (c.tag?.label === "ESCALATED" ? "Yes" : "No"),
  },
  assignee: {
    key: "assignee", label: "Assignee",
    values: [
      { value: "MC", label: "Me" },
      { value: "", label: "Unassigned" },
      { value: "RT", label: "R. Torres" },
      { value: "AS", label: "A. Silva" },
    ],
    get: (c) => c.initials ?? "",
  },
  age: {
    key: "age", label: "Age", ordinal: true,
    values: [
      { value: "<1h", label: "Under 1 hour" },
      { value: "1-4h", label: "1 to 4 hours" },
      { value: ">4h", label: "Over 4 hours" },
    ],
    get: (c) => {
      const m = minutesOf(c.age);
      return m < 60 ? "<1h" : m <= 240 ? "1-4h" : ">4h";
    },
  },
  status: {
    key: "status", label: "Status",
    values: [
      { value: "Open", label: "Open" },
      { value: "In review", label: "In review" },
      { value: "Closed", label: "Closed" },
    ],
  },
  source: {
    key: "source", label: "Source",
    values: ["Okta", "AWS", "CrowdStrike", "Entra", "GitHub", "Azure", "ServiceNow"].map((v) => ({ value: v, label: v })),
  },
};

/* Anything the add-filter popover offers that has no FieldDef gets a generic
   one, so every row in that menu opens something rather than dead-ending. */
function generic(label: string, hint: string): FieldDef {
  const values = /[,/]/.test(hint)
    ? hint.split(/[,/]/).map((v) => v.trim()).filter(Boolean)
    : ["Any value"];
  return { key: label.toLowerCase().replace(/\s+/g, "-"), label, values: values.map((v) => ({ value: v, label: v[0].toUpperCase() + v.slice(1) })) };
}

export function fieldFor(label: string, hint: string): FieldDef {
  const k = Object.values(FIELDS).find((f) => f.label === label);
  return k ?? generic(label, hint);
}

export function operatorsFor(f: FieldDef): Operator[] {
  return f.ordinal ? ORDINAL_OPS : PLAIN_OPS;
}

/* ── Bar state ──────────────────────────────────────────────────────────── */

export interface Chip {
  field: FieldDef;
  op: Operator;
  values: string[];
}

export interface BarState {
  group: Chip[];
  groupJoiner: Joiner;
  outerJoiner: Joiner;
  tail: Chip[];
}

export const chip = (key: string, op: Operator = "is", values: string[] = []): Chip => ({
  field: FIELDS[key], op, values,
});

export const EMPTY_BAR: BarState = {
  group: [], groupJoiner: "and", outerJoiner: "or", tail: [],
};

function test(c: CaseRecord, ch: Chip): boolean | null {
  if (!ch.values.length || !ch.field.get) return null;
  const actual = ch.field.get(c);
  const rank = ch.field.values.map((v) => v.value);
  const i = rank.indexOf(actual);
  const pick = rank.indexOf(ch.values[0]);
  switch (ch.op) {
    case "is": return actual === ch.values[0];
    case "is not": return actual !== ch.values[0];
    case "is or above": return i <= pick;
    case "is or below": return i >= pick;
    case "is any of": return ch.values.includes(actual);
  }
}

function combine(joiner: Joiner, terms: (boolean | null)[]): boolean | null {
  const live = terms.filter((t): t is boolean => t !== null);
  if (!live.length) return null;
  return joiner === "and" ? live.every(Boolean) : live.some(Boolean);
}

export function matches(c: CaseRecord, bar: BarState): boolean {
  const group = combine(bar.groupJoiner, bar.group.map((ch) => test(c, ch)));
  const tail = combine("and", bar.tail.map((ch) => test(c, ch)));
  return combine(bar.outerJoiner, [group, tail]) ?? true;
}

/** What the chip shows for its value once more than one is picked. */
export function summarise(ch: Chip): string {
  if (!ch.values.length) return "Any";
  const label = (v: string) => ch.field.values.find((x) => x.value === v)?.label ?? v;
  if (ch.values.length <= 2) return ch.values.map(label).join(", ");
  return `${ch.values.length} selected`;
}

/* ── Sort ───────────────────────────────────────────────────────────────── */

export const SORTS = [
  "Severity, then confidence ascending",
  "Severity, then newest",
  "Newest first",
  "Oldest first",
  "Confidence ascending",
] as const;
export type Sort = (typeof SORTS)[number];

const SEV_RANK = ["CRIT", "HIGH", "MED", "LOW"];
const CONF_RANK = ["Low", "Medium", "High"];
const minutes = minutesOf;

export function sortCases(cases: CaseRecord[], sort: Sort): CaseRecord[] {
  const by = [...cases];
  const sev = (c: CaseRecord) => SEV_RANK.indexOf(c.severity);
  const conf = (c: CaseRecord) => CONF_RANK.indexOf(c.confidence);
  switch (sort) {
    case "Severity, then confidence ascending":
      return by.sort((a, b) => sev(a) - sev(b) || conf(a) - conf(b));
    case "Severity, then newest":
      return by.sort((a, b) => sev(a) - sev(b) || minutes(a.age) - minutes(b.age));
    case "Newest first":
      return by.sort((a, b) => minutes(a.age) - minutes(b.age));
    case "Oldest first":
      return by.sort((a, b) => minutes(b.age) - minutes(a.age));
    case "Confidence ascending":
      return by.sort((a, b) => conf(a) - conf(b));
  }
}

/* ── Query text ─────────────────────────────────────────────────────────────
   The third view of the same state. Symbols rather than words because the
   query is the exact one, and the brackets are the same grouping the bar
   draws — that correspondence is the point of having three views. */

export const OP_SYMBOL: Record<Operator, string> = {
  "is": "=",
  "is not": "!=",
  "is or above": ">=",
  "is or below": "<=",
  "is any of": "in",
};

const term = (c: Chip): string => {
  const v = c.values.length
    ? c.op === "is any of"
      ? `(${c.values.map((x) => x.toLowerCase()).join(", ")})`
      : c.values[0].toLowerCase()
    : "any";
  return `${c.field.key} ${OP_SYMBOL[c.op]} ${v}`;
};

export function toQuery(bar: BarState): string {
  const g = bar.group.filter((c) => c.values.length);
  const t = bar.tail.filter((c) => c.values.length);
  const gs = g.length ? (g.length > 1 ? `(${g.map(term).join(` ${bar.groupJoiner} `)})` : term(g[0])) : "";
  const ts = t.length ? (t.length > 1 ? `(${t.map(term).join(" and ")})` : term(t[0])) : "";
  if (gs && ts) return `${gs}\n${bar.outerJoiner} ${ts}`;
  return gs || ts || "";
}
