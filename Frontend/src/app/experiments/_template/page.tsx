import ChallengeFrame from '../components/ChallengeFrame';
import type { Challenge } from '../registry';

/**
 * Starting point for a new challenge. Next ignores `_`-prefixed folders, so
 * this isn't routable — copy the folder, rename it to the slug, then:
 *
 *   1. move `brief` into the `challenges` array in registry.ts
 *   2. swap it here for `getChallenge('your-slug')`
 *   3. pick theme + expression + chrome for what the brief is actually asking
 *   4. add a theme.css next to this file if the company's palette needs it
 *
 * Style with the tokens (`var(--exp-accent)`) rather than raw values, and the
 * whole thing re-themes when you change your mind about the palette.
 */
const brief: Challenge = {
  slug: '_template',
  company: 'Company',
  title: 'What the exercise is',
  prompt: 'The brief in one sentence, in their words where you have them.',
  chrome: 'embedded',
  theme: 'neutral',
  // brand: 'artemis',   // optional palette overlay; see docs/themes.md
  expression: 'balanced',
  status: 'in-progress',
  received: '2026-01-01',
  due: '2026-01-08',
  note: '4 hour time box',
};

export default function TemplateChallenge() {
  return (
    <ChallengeFrame challenge={brief}>
      <div
        className="mx-auto"
        style={{ maxWidth: 'var(--exp-container)', padding: '0 var(--exp-space-6)' }}
      >
        <div className="exp-card">
          <h2 className="exp-h3">The work goes here</h2>
          <p className="exp-body exp-measure" style={{ marginTop: 'var(--exp-space-2)' }}>
            Primitives available: exp-card, exp-btn (primary / secondary / ghost / danger),
            exp-input, exp-label, exp-error, exp-display, exp-caps, exp-nums, exp-measure,
            exp-lift, exp-enter, exp-hairline. See /experiments/kit for all of them in every
            theme.
          </p>
          <div style={{ display: 'flex', gap: 'var(--exp-space-3)', marginTop: 'var(--exp-space-6)' }}>
            <button className="exp-btn exp-btn-primary">Primary action</button>
            <button className="exp-btn exp-btn-ghost">Secondary</button>
          </div>
        </div>
      </div>
    </ChallengeFrame>
  );
}
