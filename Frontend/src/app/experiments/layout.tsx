import type { Metadata } from 'next';
import './experiments.css';

/**
 * Unlisted by default. A single challenge can opt back in by exporting its
 * own `metadata` with `robots: { index: true }` from its page.tsx.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ExperimentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
