/* The contents of "Investigation ledger — 1440", verbatim.

   The point of this screen is the part most tools hide: the steps that came
   back empty and the questions that were never asked. An empty result and an
   unasked question are not the same thing, and an analyst deciding whether to
   trust a verdict needs to tell them apart. */

export type Outcome =
  | "Context"
  | "Supported"
  | "Ruled out"
  | "Inconclusive"
  | "Failed"
  | "Not asked";

export interface Step {
  n: string;
  /** Wall clock, so the steps can be interleaved with the attack chain. */
  at: string;
  question: string;
  source: string;
  result: string;
  outcome: Outcome;
}

export interface Phase {
  label: string;
  range: string;
  steps: Step[];
}

export const phases: Phase[] = [
  {
    label: "ORIENT",
    range: "steps 1–4",
    steps: [
      { n: "01", at: "09:28:22", question: "Enumerate entities across the 3 grouped findings", source: "Artemis", result: "3 entities", outcome: "Context" },
      { n: "02", at: "09:28:51", question: "Resolve svc-deploy-prod across connected identity sources", source: "Okta, Entra", result: "2 identities", outcome: "Context" },
      { n: "03", at: "09:29:40", question: "Establish a 90-day authentication baseline for this identity", source: "Okta · 90d", result: "847 rows", outcome: "Context" },
      { n: "04", at: "09:30:18", question: "Has this ASN ever authenticated to this tenant before?", source: "Okta · 90d", result: "0 rows", outcome: "Supported" },
    ],
  },
  {
    label: "GATHER EVIDENCE",
    range: "steps 5–13",
    steps: [
      { n: "05", at: "09:31:02", question: "Retrieve all CloudTrail events for the assumed role", source: "AWS · 6h", result: "1,204 rows", outcome: "Context" },
      { n: "06", at: "09:31:44", question: "Identify management-plane writes by this principal", source: "AWS · 6h", result: "38 rows", outcome: "Supported" },
      { n: "07", at: "09:32:30", question: "Was CloudTrail logging modified during the session?", source: "AWS · 6h", result: "1 row", outcome: "Supported" },
      { n: "08", at: "09:33:15", question: "Was the audit log bucket deleted, and by which principal?", source: "AWS · 6h", result: "1 row", outcome: "Supported" },
      { n: "09", at: "09:34:02", question: "Retrieve MFA challenge results for the session", source: "Okta · 6h", result: "0 rows", outcome: "Supported" },
      { n: "10", at: "09:34:48", question: "Enumerate IAM principals listed during the session", source: "AWS · 6h", result: "14 rows", outcome: "Context" },
      { n: "11", at: "09:35:39", question: "Retrieve endpoint telemetry for linked hosts", source: "CrowdStrike · 6h", result: "340 rows", outcome: "Context" },
      { n: "12", at: "09:36:55", question: "Retrieve Azure sign-in logs for the same identity", source: "Azure · 6h", result: "—", outcome: "Failed" },
      { n: "13", at: "09:38:10", question: "Retrieve GitHub events for linked identities", source: "GitHub · 6h", result: "0 rows", outcome: "Inconclusive" },
    ],
  },
  {
    label: "TEST HYPOTHESES",
    range: "steps 14–20",
    steps: [
      { n: "14", at: "09:39:02", question: "Does a change or maintenance window cover this activity?", source: "ServiceNow · 30d", result: "0 rows", outcome: "Ruled out" },
      { n: "15", at: "09:39:55", question: "Is there an active penetration test engagement on record?", source: "Artemis · 90d", result: "0 rows", outcome: "Ruled out" },
      { n: "16", at: "09:40:48", question: "Is 45.83.140.22 in the corporate VPN egress list?", source: "Okta, Netskope", result: "412 rows", outcome: "Ruled out" },
      { n: "17", at: "09:41:36", question: "Is this ASN used by any sanctioned automation?", source: "AWS · 90d", result: "6 rows", outcome: "Ruled out" },
      { n: "18", at: "09:42:30", question: "Has this principal called StopLogging before?", source: "AWS · 90d", result: "0 rows", outcome: "Supported" },
      { n: "19", at: "09:43:22", question: "Does threat intel associate this address with known activity?", source: "Threat intel", result: "2 of 6", outcome: "Supported" },
      { n: "20", at: "09:44:15", question: "Is the deleted bucket recoverable from an organization trail?", source: "AWS", result: "1 row", outcome: "Ruled out" },
    ],
  },
  {
    label: "CONCLUDE",
    range: "steps 21–23",
    steps: [
      { n: "21", at: "09:45:30", question: "Score severity from blast radius and asset criticality", source: "Artemis", result: "—", outcome: "Context" },
      { n: "22", at: "09:46:44", question: "Draft verdict and confidence from supporting evidence", source: "Artemis", result: "4 claims", outcome: "Supported" },
      { n: "23", at: "09:47:56", question: "Generate response recommendations", source: "Artemis", result: "3 actions", outcome: "Context" },
    ],
  },
];

export const notAsked = {
  label: "NOT ASKED",
  range: "2 questions",
  note: "Questions Artemis deliberately did not investigate. These back the scope boundary shown on the case.",
  items: [
    { question: "Lateral movement from EC2AdminRole into other AWS accounts", why: "Out of scope for this detection type" },
    { question: "Historical behaviour of the 14 enumerated IAM users", why: "Beyond the 3 entities scoped to this case" },
  ],
};

/** Opens under step 04 — the one step whose evidence is shown inline. */
export const expandedStep = {
  step: "04",
  queryNote: "Okta · 90-day window",
  query: [
    { t: "okta.logs\n| " },
    { t: "where", kw: true },
    { t: " asn == 14061\n| " },
    { t: "summarize", kw: true },
    { t: " " },
    { t: "count()", kw: true },
    { t: " " },
    { t: "by", kw: true },
    { t: " actor.id, outcome.result" },
  ] as { t: string; kw?: boolean }[],
  returned: "0 rows",
  comparison: "For comparison: 847 successful logins for svc-deploy-prod in the same window, all from AS7922 and AS3356.",
  concluded: "First-ever authentication from this network for this identity and this tenant.",
  cited: "Cited in the verdict as claim 1 of 4",
};

export const stats = [
  { label: "Duration", value: "19m 42s" },
  { label: "Steps run", value: "23" },
  { label: "Not asked", value: "2" },
  { label: "Sources queried", value: "3 of 4", warn: true },
  { label: "Events examined", value: "21,447" },
];

export const emptyNote = {
  head: "6 steps returned no rows",
  body: "3 of them are load-bearing evidence. An empty result and an unasked question are not the same thing.",
};

export const filters = [
  { label: "All steps", count: "23", active: true },
  { label: "Supported the verdict", count: "8" },
  { label: "Ruled something out", count: "5" },
  { label: "Returned no rows", count: "6" },
  { label: "Failed", count: "1" },
  { label: "Not asked", count: "2" },
];

export const sourcesQueried = [
  { name: "Okta", count: "2,481", ok: true },
  { name: "AWS CloudTrail", count: "18,902", ok: true },
  { name: "CrowdStrike", count: "340", ok: true },
  { name: "Azure", count: "unreachable", ok: false },
  { name: "ServiceNow", count: "0", ok: true },
  { name: "Threat intel", count: "6 vendors", ok: true },
];
