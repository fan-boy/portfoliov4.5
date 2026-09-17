import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import '../artemis.css';
import { BackToSite } from '../BackToSite';

/**
 * Host layout for the ported Artemis prototype.
 *
 * Stands in for the prototype's own root layout. The font setup is copied from
 * it verbatim — next/font works in a nested layout, so the prototype gets the
 * exact Inter and Geist Mono it was designed against rather than a substitute
 * from the portfolio's own stack.
 *
 *   `artemis-root`  scopes the design tokens, the 1px spacing base, the radius
 *                   scale and the cascade reset to this subtree.
 * The app takes the whole viewport and the portfolio chrome stands down — see
 * the note in artemis.css. `BackToSite` is the single way out, floating in the
 * empty column the app's own left nav leaves above its user chip.
 */

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Artemis — Cases',
  description: 'AI-native SIEM case management',
};

export default function ArtemisLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`artemis-root artemis-scope ${inter.variable} ${geistMono.variable}`}
      data-theme="light"
    >
      {children}
      <BackToSite />
    </div>
  );
}
