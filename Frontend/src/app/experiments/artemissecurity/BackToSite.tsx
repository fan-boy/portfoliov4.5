import Link from 'next/link';

/**
 * The way out.
 *
 * Portfolio chrome, not Artemis chrome — deliberately styled to read as
 * "leave this product" rather than as a sixth nav item, so nobody mistakes it
 * for part of the case tool.
 *
 * Returns to the case study's landing page rather than the portfolio home —
 * one step back, not all the way out, so the reader keeps their place.
 *
 * It floats rather than living inside Nav.tsx so the ported component stays
 * untouched.
 */
export function BackToSite() {
  return (
    <Link href="/experiments/artemissecurity" className="artemis-back">
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
      Back to case study
    </Link>
  );
}
