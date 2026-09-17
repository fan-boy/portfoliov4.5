import type { Band, CaseRecord } from "./types";

/* The 13 rows on "All cases — 1440", verbatim. */

const needsVerdict: CaseRecord[] = [
  {
    id: "CASE-4892", severity: "CRIT", verdict: "TP",
    title: "CrowdStrike Sensor Disabled Minutes Before Encryption Routine Ran",
    tag: { label: "ESCALATED", tone: "Critical" },
    entity: "WIN-FIN-0421", more: "+1", findings: "9 findings", confidence: "High",
    qualifier: { tone: "Escalation", text: "High → Critical, 12m ago" },
    age: "38m", initials: "RT",
  },
  {
    id: "CASE-4888", severity: "CRIT", verdict: "TP",
    title: "Okta Super Admin Role Granted to Account Created Six Minutes Earlier",
    entity: "jm-temp-admin", more: "+2", findings: "4 findings", confidence: "High",
    qualifier: { tone: "Sources", text: "Okta" },
    age: "31m",
  },
  {
    id: "CASE-4885", severity: "CRIT", verdict: "TP",
    title: "CloudTrail Logging Disabled and Audit Logs Destroyed",
    entity: "svc-deploy-prod", more: "+3", findings: "7 findings", confidence: "High",
    qualifier: { tone: "Sources", text: "AWS · Okta · CrowdStrike" },
    age: "24m", selected: true,
  },
  {
    id: "CASE-4871", severity: "HIGH", verdict: "TP",
    title: "Privilege Escalation Path Confirmed — Azure Connector Unreachable",
    entity: "m.okafor@company.com", more: "+1", findings: "4 findings", confidence: "Low",
    qualifier: { tone: "Coverage", text: "2 of 4 sources examined" },
    age: "1h 04m",
  },
  {
    id: "CASE-4869", severity: "HIGH", verdict: "TP",
    title: "Privileged Entra ID Group Modified Outside Change Window",
    entity: "GRP-Global-Admins", more: "+3", findings: "6 findings", confidence: "Low",
    qualifier: { tone: "Sources", text: "Entra" },
    age: "52m",
  },
  {
    id: "CASE-4866", severity: "HIGH", verdict: "TP",
    title: "EC2 Instance Launched with IMDSv1 and Attached Admin Role",
    entity: "EC2AdminRole", more: "+2", findings: "2 findings", confidence: "Low",
    qualifier: { tone: "Sources", text: "AWS" },
    age: "44m",
  },
  {
    id: "CASE-4859", severity: "HIGH", verdict: "TP",
    title: "GitHub PAT with repo:admin Scope Pushed to a Public Gist",
    entity: "gh:acme-platform", more: "+2", findings: "5 findings", confidence: "Medium",
    qualifier: { tone: "Sources", text: "GitHub" },
    age: "1h 12m", initials: "AS",
  },
  {
    id: "CASE-4857", severity: "HIGH", verdict: "TP",
    title: "Impossible Travel Followed by MFA Factor Reset",
    entity: "lisa.wang@company.com", more: "+1", findings: "3 findings", confidence: "Medium",
    qualifier: { tone: "Sources", text: "Okta · Entra" },
    age: "47m",
  },
  {
    id: "CASE-4840", severity: "MED", verdict: "TP",
    title: "Token Reuse from the Same ASN as a Case You Closed",
    tag: { label: "CONTINUES", tone: "Accent" },
    entity: "svc-billing-sync", more: "+1", findings: "2 findings", confidence: "Medium",
    qualifier: { tone: "Succession", text: "CASE-4471 closed false positive 3h ago" },
    age: "2h 10m",
  },
];

const belowBar: CaseRecord[] = [
  {
    id: "CASE-4802", severity: "HIGH", verdict: "Benign",
    title: "Authenticated Scanner Triggered 230 Endpoint Detections",
    entity: "scan-svc-01", more: "+6", findings: "230 findings", confidence: "High",
    qualifier: { tone: "Sources", text: "CrowdStrike" },
    age: "5h 11m",
  },
  {
    id: "CASE-4798", severity: "HIGH", verdict: "Benign",
    title: "Terraform Apply Modified 47 IAM Policies in 90 Seconds",
    entity: "terraform-ci", more: "+2", findings: "11 findings", confidence: "High",
    qualifier: { tone: "Sources", text: "AWS" },
    age: "4h 15m", initials: "MC",
  },
  {
    id: "CASE-4771", severity: "MED", verdict: "Benign",
    /* The screen pairs this benign verdict with the false-positive rail. Kept
       as-is so the build matches the file; flagged as a likely slip. */
    railVerdict: "FP",
    title: "Legacy Service Account Password Rotation Failed Repeatedly",
    entity: "svc-legacy-etl", findings: "5 findings", confidence: "High",
    qualifier: { tone: "Sources", text: "Entra" },
    age: "8h 02m",
  },
  {
    id: "CASE-4764", severity: "LOW", verdict: "TP",
    title: "Developer Cloned 12 Private Repositories Two Days Before Departure",
    entity: "d.reyes@company.com", findings: "3 findings", confidence: "High",
    qualifier: { tone: "Sources", text: "GitHub · Okta" },
    age: "6h 20m", initials: "MC",
  },
];

export const bands: Band[] = [
  {
    id: "needs-verdict",
    label: "NEEDS YOUR VERDICT",
    count: "9",
    note: "Every true positive, medium and above",
    cases: needsVerdict,
  },
  {
    id: "below-bar",
    label: "OPEN, BELOW THE BAR",
    count: "18",
    note: "Artemis left these open; they fall under your review threshold",
    cases: belowBar,
  },
];

/* A sample of the closed pile. The band stays collapsed by default — the
   count is the contract, not the contents — but it opens, because a dismissal
   an analyst cannot inspect is a dismissal they cannot audit. */
const closed: CaseRecord[] = [
  {
    id: "CASE-4756", severity: "MED", verdict: "FP",
    title: "Nightly Backup Agent Read 12,000 Files Across Three Shares",
    entity: "svc-backup-01", more: "+3", findings: "12 findings", confidence: "High",
    qualifier: { tone: "Sources", text: "Matches the 90-day schedule" },
    age: "6h 02m",
  },
  {
    id: "CASE-4741", severity: "LOW", verdict: "FP",
    title: "Okta Sign-In From a New Country Matched an Approved Travel Request",
    entity: "j.park@acme.com", findings: "1 finding", confidence: "High",
    qualifier: { tone: "Sources", text: "Travel request TR-2291, MFA satisfied" },
    age: "7h 18m",
  },
  {
    id: "CASE-4733", severity: "MED", verdict: "Benign",
    title: "Password Spray Blocked at the Edge, No Account Reached Lockout",
    entity: "Okta tenant", more: "+8", findings: "84 findings", confidence: "High",
    qualifier: { tone: "Sources", text: "All attempts rejected pre-auth" },
    age: "9h 41m",
  },
  {
    id: "CASE-4728", severity: "LOW", verdict: "FP",
    title: "Force Push to a Protected Branch Carried Two Approvals",
    entity: "s.adeyemi", more: "+1", findings: "1 finding", confidence: "High",
    qualifier: { tone: "Sources", text: "PR #8821, exception on record" },
    age: "11h 04m",
  },
  {
    id: "CASE-4719", severity: "MED", verdict: "FP",
    title: "EC2 Instances Launched in an Unused Region by the DR Drill Runner",
    entity: "dr-drill-runner", more: "+2", findings: "6 findings", confidence: "High",
    qualifier: { tone: "Sources", text: "Change ticket CHG-1180" },
    age: "14h 26m",
  },
  {
    id: "CASE-4705", severity: "LOW", verdict: "Benign",
    title: "Dormant Account Reactivated Two Days Before Its Rehire Date",
    entity: "k.osei@acme.com", findings: "2 findings", confidence: "Medium",
    qualifier: { tone: "Sources", text: "HR record RH-441" },
    age: "1d 3h",
  },
];

export const closedBand = {
  label: "CLOSED BY ARTEMIS",
  count: "404",
  note: "Frozen on close — later activity arrives as a new case",
  breakdown: ["False positive 361", "True benign 43", "Last sampled 2h ago — no disagreements"],
  cases: closed,
};

export function findCase(id: string): CaseRecord | undefined {
  for (const band of bands) {
    const hit = band.cases.find((c) => c.id === id);
    if (hit) return hit;
  }
  return closedBand.cases.find((c) => c.id === id);
}
