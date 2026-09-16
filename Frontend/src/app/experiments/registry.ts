/**
 * One entry per design challenge. The index page and every ChallengeFrame
 * read from here, so a challenge only needs its page.tsx plus a row below.
 */

/** embedded keeps the portfolio shell, fullbleed hands the viewport to the challenge. */
export type Chrome = 'embedded' | 'fullbleed';

/** How much personality the interface is allowed. Maps to radius, motion and density. */
export type Expression = 'restrained' | 'balanced' | 'expressive';

/**
 * Built-in themes. A company-specific one lives in the challenge's own theme.css.
 *
 * neutral   — structure-first, no argument from the palette
 * product   — B2B tooling: 14px body, tight ratio, tabular figures
 * consumer  — B2C: 16px body floor, wider ratio, phone-first
 * editorial — marketing and long-form: serif display, perfect-fourth ratio
 * dark      — dark surfaces, solid borders
 */
export type Theme = 'neutral' | 'product' | 'consumer' | 'editorial' | 'dark';

/**
 * A company's palette, layered on top of a theme. The theme picks the type
 * scale and the archetype; the brand repaints it. They're orthogonal — Artemis
 * is a B2B tool (product scale) in teal, not indigo.
 *
 * Each one lives in a theme.css next to its challenge and is imported by that
 * page, so an unused brand costs nothing.
 */
export type Brand = 'artemis';

export type Status = 'in-progress' | 'submitted' | 'archived';

export interface Challenge {
  /** Folder name under experiments/, and the URL segment. */
  slug: string;
  company: string;
  title: string;
  /** The brief in one sentence, in their words where possible. */
  prompt: string;
  chrome: Chrome;
  /** Picks the type scale and the archetype. */
  theme: Theme;
  /** Optional palette overlay on top of `theme`. Omit to use the theme's own. */
  brand?: Brand;
  expression: Expression;
  status: Status;
  /** ISO date the brief landed. */
  received: string;
  /** ISO date it's due back. */
  due?: string;
  /** Opt this one route in to search indexing. The section is noindex by default. */
  indexed?: boolean;
  /** Anything you want on the index card: constraints, time box, what they're testing. */
  note?: string;
}

export const challenges: Challenge[] = [
  {
    slug: 'artemissecurity',
    company: 'Artemis Security',
    title: 'Cases queue and case detail',
    prompt:
      'Design how an analyst works with AI-investigated cases: a queue where they decide what to look at next, and a detail view where they understand what happened and decide what to do.',
    chrome: 'fullbleed',
    /* The ported prototype ships its own token system and does not call
       scopeClasses(), so theme/expression are inert for this entry. */
    theme: 'product',
    expression: 'restrained',
    status: 'in-progress',
    received: '2026-09-13',
    note: 'Ported from the standalone prototype. Self-themed; 1px spacing base scoped to its subtree.',
  },
];

/**
 * A visual study — no brief, no company, no deadline. Kept separate from
 * `Challenge` rather than bolted onto it: a study has no prompt to answer and
 * no status to track, and faking those fields would make the challenge data
 * lie about itself.
 */
export interface Study {
  slug: string;
  title: string;
  /** One line on what it explores. */
  blurb: string;
  /** ISO date it was made. */
  made: string;
}

export const studies: Study[] = [
  {
    slug: 'watercolor',
    title: 'Watercolor',
    blurb: 'The Empire State Building painting itself in, wash by wash. All SVG filters.',
    made: '2026-09-13',
  },
];

export function getChallenge(slug: string): Challenge | undefined {
  return challenges.find((c) => c.slug === slug);
}

export function byStatus(status: Status): Challenge[] {
  return challenges.filter((c) => c.status === status);
}

const EXPRESSION_CLASS: Record<Expression, string> = {
  restrained: 'exp-x-restrained',
  balanced: 'exp-x-balanced',
  expressive: 'exp-x-expressive',
};

export function scopeClasses(
  challenge: Pick<Challenge, 'theme' | 'expression' | 'chrome'> & { brand?: Brand }
) {
  return [
    'exp-scope',
    `exp-theme-${challenge.theme}`,
    // after the theme, so the brand's palette wins
    challenge.brand && `exp-brand-${challenge.brand}`,
    EXPRESSION_CLASS[challenge.expression],
    challenge.chrome === 'fullbleed' ? 'exp-fullbleed' : 'exp-embedded',
  ]
    .filter(Boolean)
    .join(' ');
}
