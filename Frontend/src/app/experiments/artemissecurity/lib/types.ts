/* The case model. Field names and the job each one serves come from
   field-placement-matrix.md; the rendered values come from the Figma screen. */

export type Severity = "CRIT" | "HIGH" | "MED" | "LOW";

/** What Artemis concluded. Separate from status — a case can be closed with any
    verdict, and an open case can already carry one. */
export type Verdict = "TP" | "Benign" | "FP" | "Investigating";

/** Why this case is in front of you. Sources is the quiet default. */
export type QualifierTone = "Sources" | "Coverage" | "Escalation" | "Succession";

export type Confidence = "High" | "Medium" | "Low";

export interface CaseRecord {
  id: string;
  severity: Severity;
  verdict: Verdict;
  /** Overrides which severity-cell variant is used. Only set where the Figma
      screen pairs a verdict with a different rail treatment. */
  railVerdict?: Verdict;
  title: string;
  tag?: { label: string; tone: "Critical" | "Accent" };
  entity: string;
  /** Rendered as "+2". The slot is always present so the meta line keeps its
      rhythm whether or not a case has extra entities. */
  more?: string;
  findings: string;
  confidence: Confidence;
  qualifier: { tone: QualifierTone; text: string };
  age: string;
  initials?: string;
  selected?: boolean;
}

export interface Band {
  id: string;
  label: string;
  count: string;
  note: string;
  cases: CaseRecord[];
}
