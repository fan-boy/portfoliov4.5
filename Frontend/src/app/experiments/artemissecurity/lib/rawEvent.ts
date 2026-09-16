import type { ChainEvent } from "./events";

/* The record as the source emitted it. Each vendor gets its own shape on
   purpose — an analyst recognises CloudTrail's envelope at a glance, and a
   single normalised blob would throw away the one thing raw is good for.

   Everything is derived from the ChainEvent, so the row and the record it
   opens cannot disagree. */

/* Deterministic so the server and the client render the same ids — no
   Math.random here or hydration mismatches. */
function hash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

function uuid(seed: string): string {
  const a = hash(seed), b = hash(seed + "1"), c = hash(seed + "2"), d = hash(seed + "3");
  return `${a}-${b.slice(0, 4)}-4${b.slice(4, 7)}-a${c.slice(0, 3)}-${c.slice(3)}${d.slice(0, 7)}`;
}

const DATE = "2026-09-16";
/* Decimal milliseconds, not the hex the hash hands back — a log view full of
   `.d41Z` is the first thing an analyst would call out. */
const ms = (at: string) => (parseInt(hash(at).slice(0, 4), 16) % 1000).toString().padStart(3, "0");
const iso = (at: string) => `${DATE}T${at}.${ms(at)}Z`;

const OKTA_TYPE: Record<string, string> = {
  "Sign-in success": "user.session.start",
  "Policy evaluated": "policy.evaluate_sign_on",
  "Session created": "user.session.context.change",
  "App access granted": "user.authentication.sso",
  "SAML assertion issued": "user.authentication.auth_via_saml",
};

const AWS_SERVICE: [RegExp, string][] = [
  [/^(GetCallerIdentity|AssumeRole|Session)/, "sts.amazonaws.com"],
  [/Bucket|^ListBuckets|^DeleteObjects/, "s3.amazonaws.com"],
  [/Trail|^StopLogging|^GetEventSelectors/, "cloudtrail.amazonaws.com"],
  [/^(ListRoles|GetRole|ListUsers|GetUser|ListAccessKeys|ListAttachedUserPolicies|ListGroupsForUser|CreateAccessKey|GetAccountPasswordPolicy)/, "iam.amazonaws.com"],
  [/^Describe(Alarms)/, "monitoring.amazonaws.com"],
  [/Secret/, "secretsmanager.amazonaws.com"],
  [/^Describe/, "ec2.amazonaws.com"],
];

const CS_NAME: Record<string, string> = {
  "Network connection": "NetworkConnectIP4",
  "DNS request": "DnsRequest",
  "File write": "FileWritten",
  "Process execution": "ProcessRollup2",
  "Registry write": "RegGenericValueUpdate",
};

export function rawEvent(e: ChainEvent): Record<string, unknown> {
  const seed = e.at + e.action;

  if (e.source === "Okta") {
    return {
      uuid: uuid(seed),
      published: iso(e.at),
      eventType: OKTA_TYPE[e.action] ?? "user.session.start",
      version: "0",
      severity: e.action === "Sign-in success" ? "WARN" : "INFO",
      displayMessage: e.action,
      actor: {
        id: "00u4f2b9kQm1XpLd7",
        type: "User",
        alternateId: `${e.actor}@company.com`,
        displayName: e.actor,
      },
      client: {
        ipAddress: "45.83.140.22",
        userAgent: { rawUserAgent: "aws-sdk-go/1.44.0 (go1.21; linux; amd64)", os: "Unknown", browser: "UNKNOWN" },
        geographicalContext: { country: "Bulgaria", state: "Sofia-Capital", city: "Sofia" },
        zone: "null",
      },
      authenticationContext: {
        authenticationStep: 0,
        externalSessionId: "0oa8f2b1Lk9QwRt3z",
        credentialType: "PASSWORD",
      },
      outcome: { result: "SUCCESS", reason: null },
      securityContext: { asNumber: 14061, asOrg: "hosting-provider", isp: "AS14061", isProxy: true },
      target: [{ id: "0oa1a2b3c4d5", type: "AppInstance", alternateId: "AWS Account Federation", displayName: "AWS" }],
      debugContext: { debugData: { detail: e.detail } },
    };
  }

  if (e.source === "AWS") {
    const name = e.action.includes(" ") ? e.action.replace(/ /g, "") : e.action;
    const service = AWS_SERVICE.find(([re]) => re.test(name))?.[1] ?? "ec2.amazonaws.com";
    const denied = e.detail.includes("AccessDenied");
    const write = /^(Stop|Delete|Put|Create)/.test(name);
    const record: Record<string, unknown> = {
      eventVersion: "1.09",
      eventTime: iso(e.at),
      eventSource: service,
      eventName: name,
      awsRegion: "us-east-1",
      sourceIPAddress: "45.83.140.22",
      userAgent: "aws-cli/2.15.17 Python/3.11.6 Linux/5.15",
      userIdentity: {
        type: "AssumedRole",
        principalId: `AROA${hash(e.actor).toUpperCase().slice(0, 8)}:${e.actor}`,
        arn: `arn:aws:sts::441700000000:assumed-role/${e.actor === "EC2AdminRole" ? "EC2AdminRole/sess-3f9c21" : `DeployProd/${e.actor}`}`,
        accountId: "441700000000",
        sessionContext: {
          attributes: { mfaAuthenticated: "false", creationDate: iso("09:15:41") },
          sessionIssuer: { type: "Role", userName: e.actor === "EC2AdminRole" ? "EC2AdminRole" : "DeployProd" },
        },
      },
      requestParameters: { detail: e.detail },
      responseElements: write ? { requestId: uuid(seed + "r").slice(0, 18) } : null,
      readOnly: !write,
      managementEvent: true,
      eventCategory: "Management",
      recipientAccountId: "441700000000",
      eventID: uuid(seed),
    };
    if (denied) {
      record.errorCode = "AccessDenied";
      record.errorMessage = `User is not authorized to perform ${name} on this resource`;
    }
    return record;
  }

  return {
    event_simpleName: CS_NAME[e.action] ?? "ProcessRollup2",
    timestamp: iso(e.at),
    aid: hash(e.actor + "aid").repeat(4).slice(0, 32),
    cid: "7c9e6b2f41a84d0b9f3e5a1c8d2b7e40",
    ComputerName: e.actor,
    UserName: "m.okafor",
    UserSid: "S-1-5-21-1004336348-1177238915-682003330-5124",
    PatternDispositionDescription: "Detection, standard detection.",
    SeverityName: e.critical ? "High" : "Informational",
    Tactic: "Execution",
    Technique: "Command and Scripting Interpreter",
    detail: e.detail,
    FileName: e.action === "Process execution" ? e.detail.split(" ")[0] : null,
    SHA256HashData: hash(seed + "sha").repeat(8).slice(0, 64),
    ParentBaseFileName: "explorer.exe",
    LocalAddressIP4: "10.4.22.9",
    RemoteAddressIP4: e.source === "CrowdStrike" && e.action === "Network connection" ? "45.83.140.22" : null,
  };
}
