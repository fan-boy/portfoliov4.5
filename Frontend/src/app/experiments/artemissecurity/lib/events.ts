/* Every event the case was built from — the raw chain, not the five moments
   the case page tells the story with. Those five live in here too, flagged
   `key`, so the narrative on the case can't drift away from the evidence
   behind it. One source of truth, two densities. */

export type EventSource = "Okta" | "AWS" | "CrowdStrike";

export interface ChainEvent {
  at: string;
  source: EventSource;
  actor: string;
  action: string;
  detail: string;
  /** Raised the severity or carries a claim. Renders as a filled red dot. */
  critical: boolean;
  /** One of the five the case page shows. */
  key?: boolean;
}

export const events: ChainEvent[] = [
  { at: "09:14:02", source: "Okta", actor: "svc-deploy-prod", action: "Sign-in success", detail: "45.83.140.22 · Bulgaria", critical: false, key: true },
  { at: "09:14:03", source: "Okta", actor: "svc-deploy-prod", action: "Policy evaluated", detail: "Default sign-on policy · allow", critical: false },
  { at: "09:14:05", source: "Okta", actor: "svc-deploy-prod", action: "Session created", detail: "sid 0oa8f2b…", critical: false },
  { at: "09:14:11", source: "Okta", actor: "svc-deploy-prod", action: "App access granted", detail: "AWS Account Federation", critical: false },
  { at: "09:14:12", source: "Okta", actor: "svc-deploy-prod", action: "SAML assertion issued", detail: "role/DeployProd", critical: false },
  { at: "09:14:40", source: "AWS", actor: "svc-deploy-prod", action: "GetCallerIdentity", detail: "sts.amazonaws.com", critical: false },
  { at: "09:14:58", source: "AWS", actor: "svc-deploy-prod", action: "DescribeRegions", detail: "16 regions returned", critical: false },
  { at: "09:15:12", source: "AWS", actor: "svc-deploy-prod", action: "ListRoles", detail: "38 roles returned", critical: false },
  { at: "09:15:29", source: "AWS", actor: "svc-deploy-prod", action: "GetRole", detail: "EC2AdminRole", critical: false },
  { at: "09:15:41", source: "AWS", actor: "svc-deploy-prod", action: "AssumeRole", detail: "EC2AdminRole", critical: false, key: true },
  { at: "09:15:42", source: "AWS", actor: "EC2AdminRole", action: "Session started", detail: "sess-3f9c21 · 1h TTL", critical: false },
  { at: "09:16:03", source: "AWS", actor: "EC2AdminRole", action: "DescribeInstances", detail: "212 instances", critical: false },
  { at: "09:16:18", source: "AWS", actor: "EC2AdminRole", action: "ListBuckets", detail: "64 buckets", critical: false },
  { at: "09:16:35", source: "AWS", actor: "EC2AdminRole", action: "GetBucketTagging", detail: "acme-audit-logs-prod", critical: false },
  { at: "09:16:51", source: "AWS", actor: "EC2AdminRole", action: "GetBucketPolicy", detail: "acme-audit-logs-prod", critical: false },
  { at: "09:17:09", source: "AWS", actor: "EC2AdminRole", action: "DescribeTrails", detail: "2 trails returned", critical: false },
  { at: "09:17:22", source: "AWS", actor: "EC2AdminRole", action: "GetTrailStatus", detail: "trail/primary · logging on", critical: false },
  { at: "09:17:44", source: "AWS", actor: "EC2AdminRole", action: "GetEventSelectors", detail: "trail/primary", critical: false },
  { at: "09:18:01", source: "AWS", actor: "EC2AdminRole", action: "DescribeAlarms", detail: "0 alarms on trail/primary", critical: false },
  { at: "09:18:20", source: "AWS", actor: "EC2AdminRole", action: "StopLogging", detail: "trail/primary", critical: true, key: true },
  { at: "09:18:21", source: "AWS", actor: "EC2AdminRole", action: "GetTrailStatus", detail: "trail/primary · logging off", critical: false },
  { at: "09:18:39", source: "AWS", actor: "EC2AdminRole", action: "PutBucketVersioning", detail: "acme-audit-logs-prod · suspended", critical: false },
  { at: "09:18:52", source: "AWS", actor: "EC2AdminRole", action: "DeleteObjects", detail: "acme-audit-logs-prod · 1,000 keys", critical: false },
  { at: "09:18:57", source: "AWS", actor: "EC2AdminRole", action: "DeleteObjects", detail: "acme-audit-logs-prod · 1,000 keys", critical: false },
  { at: "09:19:03", source: "AWS", actor: "EC2AdminRole", action: "DeleteBucket", detail: "acme-audit-logs-prod", critical: true, key: true },
  { at: "09:19:20", source: "AWS", actor: "EC2AdminRole", action: "ListUsers", detail: "14 users returned", critical: false },
  { at: "09:19:31", source: "AWS", actor: "EC2AdminRole", action: "GetUser", detail: "j.mercer", critical: false },
  { at: "09:19:33", source: "AWS", actor: "EC2AdminRole", action: "GetUser", detail: "m.okafor", critical: false },
  { at: "09:19:35", source: "AWS", actor: "EC2AdminRole", action: "GetUser", detail: "d.reyes", critical: false },
  { at: "09:19:48", source: "AWS", actor: "EC2AdminRole", action: "ListAccessKeys", detail: "j.mercer · 2 keys", critical: false },
  { at: "09:20:02", source: "AWS", actor: "EC2AdminRole", action: "ListAttachedUserPolicies", detail: "m.okafor · 4 policies", critical: false },
  { at: "09:20:19", source: "AWS", actor: "EC2AdminRole", action: "ListGroupsForUser", detail: "m.okafor", critical: false },
  { at: "09:20:41", source: "AWS", actor: "EC2AdminRole", action: "CreateAccessKey", detail: "m.okafor · AccessDenied", critical: false },
  { at: "09:20:58", source: "AWS", actor: "EC2AdminRole", action: "GetAccountPasswordPolicy", detail: "min length 14", critical: false },
  { at: "09:21:16", source: "AWS", actor: "EC2AdminRole", action: "DescribeSecurityGroups", detail: "47 groups", critical: false },
  { at: "09:21:44", source: "AWS", actor: "EC2AdminRole", action: "DescribeVpcs", detail: "6 VPCs", critical: false },
  { at: "09:22:10", source: "CrowdStrike", actor: "WIN-FIN-0421", action: "Network connection", detail: "45.83.140.22:443 · outbound", critical: false },
  { at: "09:22:38", source: "CrowdStrike", actor: "WIN-FIN-0421", action: "DNS request", detail: "cdn-telemetry.example.net", critical: false },
  { at: "09:23:05", source: "AWS", actor: "EC2AdminRole", action: "GetSecretValue", detail: "prod/db/readonly · AccessDenied", critical: false },
  { at: "09:23:41", source: "AWS", actor: "EC2AdminRole", action: "ListSecrets", detail: "22 secrets", critical: false },
  { at: "09:24:12", source: "CrowdStrike", actor: "WIN-FIN-0421", action: "File write", detail: "AppData\\Local\\Temp\\t.ps1", critical: false },
  { at: "09:25:30", source: "AWS", actor: "EC2AdminRole", action: "DescribeImages", detail: "owner self · 84 AMIs", critical: false },
  { at: "09:26:02", source: "AWS", actor: "EC2AdminRole", action: "DescribeSnapshots", detail: "1,204 snapshots", critical: false },
  { at: "09:27:19", source: "AWS", actor: "EC2AdminRole", action: "DescribeKeyPairs", detail: "18 key pairs", critical: false },
  { at: "09:28:44", source: "CrowdStrike", actor: "WIN-FIN-0421", action: "Process execution", detail: "cmd.exe /c whoami", critical: false },
  { at: "09:29:57", source: "CrowdStrike", actor: "WIN-FIN-0421", action: "Registry write", detail: "Run\\OneDriveSync", critical: false },
  { at: "09:31:17", source: "CrowdStrike", actor: "WIN-FIN-0421", action: "Process execution", detail: "powershell.exe -enc …", critical: false, key: true },
];

/** The five the case page shows. Same objects, so they cannot disagree. */
export const keyMoments = events.filter((e) => e.key);

/* The case existed before the attack finished — three events land after it.
   That is the honest reading of "Artemis is investigating continuously", and
   it is why the interleaved lens is worth having. */
export const detection = {
  at: "09:28:14",
  label: "Case created from CloudTrail detection",
  note: "14m 12s after the first event",
};

export const span = { from: "09:14:02", to: "09:31:17", duration: "17m 15s" };

export const bySource = (["Okta", "AWS", "CrowdStrike"] as EventSource[]).map((s) => ({
  name: s,
  count: events.filter((e) => e.source === s).length,
}));

export const byEntity = ["svc-deploy-prod", "EC2AdminRole", "WIN-FIN-0421"].map((name) => ({
  name,
  count: events.filter((e) => e.actor === name).length,
}));
