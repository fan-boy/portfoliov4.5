'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { BASE_PATH, GATE_COOKIE, safeEqual, sign } from './gate';

export type GateState = { error?: string };

export async function unlock(_prev: GateState, formData: FormData): Promise<GateState> {
  const entered = String(formData.get('password') ?? '');
  const back = String(formData.get('from') ?? BASE_PATH);
  if (!entered) return { error: 'Enter the password to continue.' };

  const expected = process.env.ARTEMIS_PASSWORD;
  if (!expected) return { error: 'The gate is not configured. ARTEMIS_PASSWORD is missing.' };

  if (!safeEqual(entered, expected)) {
    return { error: "That password doesn't match. Try again." };
  }

  (await cookies()).set(GATE_COOKIE, await sign(expected), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: BASE_PATH,
    maxAge: 60 * 60 * 24 * 30,
  });

  /* Back to whatever they were trying to reach, not always the landing page. */
  redirect(back.startsWith(BASE_PATH) ? back : BASE_PATH);
}
