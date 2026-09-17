import type { Metadata } from 'next';

/**
 * Metadata only. The access gate is `src/middleware.ts`, which runs before any
 * page is evaluated — see the note there for why a layout check is not enough.
 */
export const metadata: Metadata = {
  title: 'Artemis Security — Aaditya Shete',
  description: 'Case management for an AI-native SIEM. Protected case study.',
  robots: { index: false, follow: false },
};

export default function ArtemisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
