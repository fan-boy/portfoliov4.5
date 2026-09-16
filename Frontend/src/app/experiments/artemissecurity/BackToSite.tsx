import Link from 'next/link';

/**
 * The way out.
 *
 * Portfolio chrome, not Artemis chrome — deliberately styled to read as
 * "leave this product" rather than as a sixth nav item, so nobody mistakes it
 * for part of the case tool.
 *
 * It floats rather than living inside Nav.tsx so the ported component stays
 * untouched, and it sits in the empty column the nav's `flex-1` spacer leaves
 * between the last nav item and the user chip — over the app, but not over
 * anything.
 */
export function BackToSite() {
  return (
    <Link href="/" className="artemis-back">
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
      Back to portfolio
    </Link>
  );
}
