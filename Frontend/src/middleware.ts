import { NextResponse, type NextRequest } from 'next/server';
import {
  BASE_PATH,
  GATE_COOKIE,
  LOCKED_PATH,
  tokenIsValid,
} from './app/experiments/artemissecurity/gate';

/**
 * Access gate for the Artemis case study.
 *
 * This has to be middleware rather than a check inside the layout. A layout
 * that returns a lock screen instead of `{children}` still lets Next evaluate
 * the page underneath and serialise its props into the RSC payload — the
 * protected case data ends up in a <script> tag in the response, readable from
 * view-source. Middleware runs before any of that, so nothing is rendered and
 * nothing is serialised.
 *
 * Locked requests are REWRITTEN, not redirected: the URL the visitor typed is
 * preserved, so unlocking lands them where they meant to go.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith(BASE_PATH)) return NextResponse.next();

  if (pathname === LOCKED_PATH) return NextResponse.next();

  const ok = await tokenIsValid(req.cookies.get(GATE_COOKIE)?.value);
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = LOCKED_PATH;
  /* Where to return to once the password is accepted. */
  url.searchParams.set('from', pathname);
  return NextResponse.rewrite(url);
}

/* Must be statically analysable — Next reads this at build time, so no
   template literals or computed values. Kept in sync with BASE_PATH by the
   assertion above. */
export const config = {
  matcher: ['/experiments/artemissecurity', '/experiments/artemissecurity/:path*'],
};
