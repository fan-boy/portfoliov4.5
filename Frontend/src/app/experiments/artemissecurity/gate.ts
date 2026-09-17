/**
 * The gate for /experiments/artemissecurity.
 *
 * Signing lives here so the middleware and the server action share one
 * implementation. Web Crypto rather than node:crypto because middleware runs
 * on the Edge runtime, where node:crypto is unavailable — and a second,
 * subtly-different signer is exactly how auth bugs happen.
 */

export const GATE_COOKIE = 'artemis_access';
export const LOCKED_PATH = '/experiments/artemissecurity/locked';
export const BASE_PATH = '/experiments/artemissecurity';

/** The cookie carries a signature of the password, never the password itself. */
export async function sign(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(GATE_COOKIE));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Constant-time compare, so a wrong guess cannot be narrowed by timing. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function tokenIsValid(token: string | undefined): Promise<boolean> {
  const pw = process.env.ARTEMIS_PASSWORD;
  if (!pw || !token) return false;
  return safeEqual(token, await sign(pw));
}
