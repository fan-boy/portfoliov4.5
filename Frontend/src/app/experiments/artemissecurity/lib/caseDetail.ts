/* The contents of "Case detail — 1440", verbatim. One case is written out in
   full; opening any other row shows the same investigation with that row's
   title, severity and verdict in the header. */

export const summary: { text: string; mono?: boolean }[] = [
  { text: "At 09:14 UTC the service account " },
  { text: "svc-deploy-prod", mono: true },
  { text: " authenticated to AWS from " },
  { text: "45.83.140.22", mono: true },
  { text: ", an ASN never previously seen for this tenant. Within four minutes it called " },
  { text: "StopLogging", mono: true },
  { text: " on the primary CloudTrail trail, then deleted the S3 bucket holding " },
  { text: "90 days", mono: true },
  { text: " of audit logs. The same session assumed " },
  { text: "EC2AdminRole", mono: true },
  { text: " and enumerated 14 IAM users. No MFA challenge was satisfied at any point, and no change ticket or maintenance window covers the activity." },
];

export const scope = [
  { label: "Examined", tone: "secondary", text: "Okta · AWS CloudTrail · AWS S3 · CrowdStrike   —   14-day window, 3 entities" },
  { label: "Not examined", tone: "high", text: "Azure — connector unreachable for 2h   ·   GitHub — no activity matched these identities" },
  { label: "Not asked", tone: "muted", text: "Lateral movement from EC2AdminRole into other accounts — out of scope for this detection type" },
] as const;

export const claims = [
  { statement: "Authentication from an ASN never seen in this tenant", source: "Okta", detail: "0 of 847 prior logins for this identity" },
  { statement: "CloudTrail logging stopped four minutes after first access", source: "AWS", detail: "StopLogging by a non-automation principal" },
  { statement: "The audit log bucket was deleted in the same session", source: "AWS", detail: "s3:DeleteBucket, same assumed role" },
  { statement: "No MFA challenge was satisfied in the session", source: "Okta", detail: "Policy requires MFA for this group" },
];

export const evidence = {
  question: "Has this ASN ever authenticated to this tenant before?",
  queryNote: "Okta · 90-day window",
  /* Keywords are highlighted the way the query editor would show them —
     the panel is meant to look like the thing you would run yourself. */
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
  columns: ["actor.id", "outcome.result", "count"],
  empty: "— no rows returned —",
  comparison: "For comparison: 847 successful logins for svc-deploy-prod in the same window, all from AS7922 and AS3356.",
  concluded: "First-ever authentication from this network for this identity and this tenant.",
  step: "Step 4 of 23",
  nothing: "6 steps returned nothing",
};

export const ruledOut = [
  { name: "Scheduled automation", why: "No maintenance window covers 09:14–09:31 UTC" },
  { name: "Known penetration test", why: "No active engagement on record" },
];

export const falsifier = {
  lead: "Would flip to",
  verdict: "False positive",
  condition: "if 45.83.140.22 appeared in the corporate VPN egress list.",
};

/* The five moments the case tells the story with. Taken from the full chain
   rather than retyped, so the narrative and the evidence can't drift. */
export { keyMoments as timeline } from "./events";

export const findings = [
  { severity: "CRIT", name: "CloudTrail logging disabled by non-automation principal", source: "AWS", firings: "1 firing" },
  { severity: "CRIT", name: "S3 bucket with audit-log tag deleted", source: "AWS", firings: "1 firing" },
  { severity: "HIGH", name: "Sign-in from unseen ASN for service account", source: "Okta", firings: "5 firings" },
] as const;

export const actions = [
  {
    title: "Disable svc-deploy-prod in Okta",
    tag: "Executes in Okta", tagTone: "quiet",
    body: "Terminates 6 active sessions. Revokes 3 OAuth grants. Blocks SSO to 14 applications.",
    note: "Reversible from this case", cta: "Approve",
  },
  {
    title: "Block 45.83.140.22 at the edge",
    tag: "Requires a second admin approval", tagTone: "high",
    body: "Drops all inbound and outbound traffic for this address across 4 network integrations.",
    note: "Reversible from this case", cta: "Request approval",
  },
  {
    title: "Restore CloudTrail from the organization trail",
    tag: "No connector — written guidance", tagTone: "quiet",
    body: "Re-enables logging and recovers 90 days of audit history from the organization-level trail.",
    note: "Perform in the AWS console", cta: null,
  },
] as const;

export const entities = [
  { name: "svc-deploy-prod", tag: "PRIVILEGED", sub: "Service account · AWS + Okta" },
  { name: "EC2AdminRole", tag: "PRIVILEGED", sub: "IAM role · 14 users can assume" },
  { name: "WIN-FIN-0421", tag: null, sub: "Host · Finance · M. Okafor" },
];

export const observables = [
  {
    name: "45.83.140.22",
    lines: [
      "Bulgaria · AS14061 · known VPN exit node",
      "First seen in your org 4 minutes before this case",
      "Threat intel: 2 of 6 vendors flag as malicious",
    ],
  },
  { name: "acme-audit-logs-prod", lines: ["S3 bucket · created 2023-04-11 · now deleted"] },
];

export const sources = [
  { name: "Okta", sub: "2,481 events examined", ok: true },
  { name: "AWS CloudTrail", sub: "18,902 events examined", ok: true },
  { name: "CrowdStrike", sub: "340 events examined", ok: true },
  { name: "Azure", sub: "Connector unreachable for 2h", ok: false },
];

export const mitre = [
  { tactic: "Defense Evasion", technique: "T1562.008 · Disable Cloud Logs" },
  { tactic: "Impact", technique: "T1485 · Data Destruction" },
  { tactic: "Privilege Escalation", technique: "T1098 · Account Manipulation" },
];

export const activity = [
  { text: "Investigation completed · verdict True positive", at: "4m ago" },
  { text: "3 findings grouped into this case", at: "22m ago" },
  { text: "Case created from CloudTrail detection", at: "24m ago" },
];
