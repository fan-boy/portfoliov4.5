# Themes, expression, chrome

Four knobs, set once per challenge in its `registry.ts` row. `ChallengeFrame` turns them into
classes via `scopeClasses()` — never write `exp-theme-*` or `exp-x-*` on a page yourself.

```ts
{
  slug: 'acme-triage',
  company: 'Acme',
  title: 'Alert triage queue',
  prompt: 'Redesign how an analyst works through a morning of alerts.',
  chrome: 'fullbleed',
  theme: 'product',
  brand: 'artemis',
  expression: 'restrained',
  status: 'in-progress',
  received: '2026-09-13',
}
```

## Which theme?

```
Is the brief a marketing page, landing page, blog, or docs site?
 └── Yes → editorial
Is it a product screen?
 ├── Who uses it all day at work — an analyst, an admin, an operator?
 │    └── Yes → product        (14px body, dense, tabular figures)
 ├── Who is a member of the public, probably on a phone?
 │    └── Yes → consumer       (16px body floor, wider scale)
 └── Does the company's product ship dark by default?
      └── Yes → dark
Is the brief about structure, flows, or IA, where the palette shouldn't argue?
 └── Yes → neutral
```

`dark` is a full palette, not a mode — there is no light/dark toggle in this system. A challenge is
one or the other. If a brief explicitly asks for both, that's a challenge-level feature: build two
routes or add a class swap inside the page.

## Which brand?

`theme` and `brand` are orthogonal, and conflating them is the most common mistake:

- **`theme`** picks the **type scale and archetype** — how dense, how big the body text, what the
  steps between headings are.
- **`brand`** repaints it with a company's **palette** — surfaces, text, accent. It sets no sizes.

Artemis Security is a B2B SOC tool, so it's `theme: 'product'` for the 14px dense scale, plus
`brand: 'artemis'` for their deep teal. Without the split you'd have to fork the whole product
scale just to change the accent.

`brand` is optional. Omit it and the theme's own palette applies.

Adding one:

1. Create `theme.css` next to the challenge's `page.tsx`, defining `.exp-brand-<name>`.
2. Import it from that page — `import './theme.css'` — so an unused brand costs nothing.
3. Add the name to the `Brand` union in `registry.ts`.

Override **palette tokens only**. A brand that sets `--exp-text-body` is doing the theme's job and
will fight it. `scopeClasses()` emits the brand class after the theme class, so the palette wins
on equal specificity.

See `artemissecurity/theme.css` for a worked example, and [color.md](color.md) for the two
constraints every palette must satisfy.

## Which expression?

The creativity dial. Same components, different amount of personality. It moves radius, duration,
stagger, hover lift, and press scale together.

| | Radii | Durations | Stagger | Hover lift |
| --- | --- | --- | --- | --- |
| `restrained` | 2 / 4 / 6px | 100–180ms | none | none |
| `balanced` | 4 / 8 / 12px | 120–260ms | 40ms | 2px |
| `expressive` | 8 / 14 / 20px | 150–360ms | 60ms | 4px |

```
Is the brief enterprise, financial, medical, or infrastructure — where the
interface should feel inevitable rather than designed?
 └── Yes → restrained
Is the brief explicitly asking for a point of view, a brand moment, or
"show us your personality"?
 └── Yes → expressive
Default → balanced
```

`balanced` is the default. Pick `expressive` because the brief asked for voice, not because it
looks better in a screenshot — on a dense B2B queue, 360ms and a 4px lift read as sluggish.

## Which chrome?

| | Keeps | Use when |
| --- | --- | --- |
| `embedded` | Navbar, custom cursor, chat button, plus a brief header above the work | The challenge is a portfolio artifact — you want the prompt and dates visible |
| `fullbleed` | Nothing. Cancels all portfolio chrome and the root layout's 140px top pad | The work needs to read as the company's own product |

`fullbleed` leaves one quiet escape link bottom-left. Don't add your own back button.

```
Should a viewer see this as your portfolio presenting a case study?
 ├── Yes → embedded
 └── No, it should look like the company's actual product → fullbleed
```

## Status and visibility

`status` drives grouping on the index: `in-progress`, `submitted`, `archived`.

The whole section is `noindex, nofollow` from `layout.tsx`, so Company A can't find the work you
did for Company B. A single challenge opts in by exporting its own `metadata` with
`robots: { index: true }` from its `page.tsx`.

Never link a challenge from the portfolio nav or homepage while `status` is `in-progress`.

## Checking your work

`/experiments/kit` renders every primitive in all five themes and all three expression levels with
live switchers. Before calling a challenge done, switch its theme there — if anything hardcoded
slipped in, it shows up immediately as a component that didn't move.
