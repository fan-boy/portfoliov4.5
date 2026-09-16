# Experiments design system

Every route under `experiments/` is an interview design challenge. Each one picks a theme, an
expression level, and how much of the portfolio shell it keeps — then builds against one closed set
of tokens, so the same component code re-themes from a dense B2B tool to a magenta consumer app
without being rewritten.

## The one rule that matters

**Style with `var(--exp-*)` tokens. Never write a raw color, size, radius, duration, or spacing
value inside a challenge.**

```tsx
// Correct
<div style={{ background: 'var(--exp-surface)', padding: 'var(--exp-space-4)' }} />

// Incorrect — hardcoded values don't re-theme, and this card stays white
// and cold when the challenge switches to the dark or editorial theme
<div style={{ background: '#fff', padding: '16px' }} />
```

There is no primitive layer to reach past. `--exp-surface` is the whole contract; there is no
`--exp-gray-100`. If a value you need has no token, that is a gap in the system — add the token to
`experiments.css`, don't inline the value.

Tailwind utilities are fine for **structural layout** — `flex`, `grid`, `grid-cols-*`, `items-*`,
`justify-*`, `mx-auto`, `hidden`. They are not fine for color, type, radius, or any value that
should change with the theme, because Tailwind's scale doesn't move when the theme does.

The line for spacing: **gaps and padding between system components use tokens**
(`gap: var(--exp-space-4)`), because those distances shrink and grow with the theme's density.
Tailwind's `gap-4` is acceptable inside one-off challenge-local markup, but prefer the token.

The full token names, so you never have to guess one:

- Spacing — `--exp-space-1` `-2` `-3` `-4` `-5` `-6` `-8` `-10` `-12` `-16` `-24` (a 4px scale:
  `-1` is 4px, `-24` is 96px)
- Radius — `--exp-radius-sm` `--exp-radius-md` `--exp-radius-lg`, plus `--exp-radius-nested` for a
  card inside a card
- Page width — `--exp-container` (1200px) and `--exp-container-narrow` (760px). Use one on any
  full-width page wrapper; uncapped layouts drift apart on a wide monitor.
- Component padding — `--exp-pad-card`, `--exp-pad-control`

Radius and duration values are set by the **expression** level, not the theme, so a hardcoded
`12px` radius stops responding when a challenge switches to `restrained`.

## Every challenge starts the same way

1. Copy `_template/` to `<slug>/`.
2. Move the `brief` object into `challenges` in `registry.ts`.
3. Wrap the page in `<ChallengeFrame challenge={...}>`. It applies the theme, expression, and
   chrome classes, and gives the page a way back. Never hand-write `exp-scope` or `exp-theme-*`
   on a page — `scopeClasses()` owns that.

```tsx
// Correct
export default function Page() {
  return <ChallengeFrame challenge={getChallenge('acme-triage')!}>{/* work */}</ChallengeFrame>;
}

// Incorrect — bypasses the frame, so the brief header, the escape link,
// and the theme classes all go missing
export default function Page() {
  return <div className="exp-scope exp-theme-product">{/* work */}</div>;
}
```

The `.exp-brief-*` classes belong to `ChallengeFrame`. Don't use them in a challenge.

A `fullbleed` page owns its own padding — the frame cancels the root layout's 140px top pad and
adds none of its own. Give the page a wrapper capped at `--exp-container`, and leave
`--exp-space-24` of bottom padding clear of the escape link, which sits fixed at bottom-left.
An `embedded` page gets its bottom padding from the frame already.

## Topic files

Read the one the task needs; don't load all five.

| File | Covers |
| --- | --- |
| [docs/themes.md](docs/themes.md) | Choosing theme, brand, expression, and chrome for a brief |
| [docs/color.md](docs/color.md) | Which surface, text, border, and status token to use |
| [docs/typography.md](docs/typography.md) | Type role classes and the three scales |
| [docs/components.md](docs/components.md) | Buttons, cards, inputs, links, tables |
| [docs/motion.md](docs/motion.md) | Durations, easing, stagger, and what not to animate |

## Closed sets

These unions are the source of truth. A value outside them is a bug, not an option.

- `Theme` — `neutral` `product` `consumer` `editorial` `dark`
- `Brand` — `artemis` (optional palette overlay; see [docs/themes.md](docs/themes.md))
- `Expression` — `restrained` `balanced` `expressive`
- `Chrome` — `embedded` `fullbleed`
- `Status` — `in-progress` `submitted` `archived`

All four live in `registry.ts` as TypeScript unions, so an invented value fails `tsc`.

## Why the CSS looks strange

`globals.css` styles bare `h1`–`h6`, `p`, `a`, and `section` in the unlayered cascade, which
outranks every Tailwind utility in this project. `.exp-scope` resets those elements with
`all: revert-layer` so utilities work normally inside a challenge. This is why you must not
remove the reset block at the top of `experiments.css`.
