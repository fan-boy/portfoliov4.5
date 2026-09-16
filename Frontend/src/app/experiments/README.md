# Experiments

Interview design challenges. Each one gets its own route, its own theme, and its own decision about
how much of the portfolio it keeps.

**The design rules live in [DESIGN.md](DESIGN.md) and [docs/](docs/).** This file is setup and the
things that will bite you.

## Adding a challenge

1. Copy `_template/` to `<slug>/`.
2. Move the `brief` object into the `challenges` array in `registry.ts`, then replace it in the page
   with `getChallenge('<slug>')`.
3. Pick `theme`, `expression`, and `chrome` — see [docs/themes.md](docs/themes.md).

`/experiments/kit` renders every primitive in all five themes and three expression levels. It's the
fastest place to start, and the fastest way to catch a hardcoded value.

## Files

| | |
| --- | --- |
| `experiments.css` | The whole token contract, themes, and primitives. One file on purpose. |
| `registry.ts` | Challenge metadata and the four closed unions. |
| `layout.tsx` | Loads the CSS, sets `noindex` for the section. |
| `components/ChallengeFrame.tsx` | Applies theme/expression/chrome, renders the brief header. |
| `kit/page.tsx` | Live reference for every token and primitive. |
| `_template/` | Starting point. `_`-prefixed, so Next doesn't route it. |

## Two couplings worth knowing

**The scope reset.** `globals.css` styles bare `h1`–`h6`, `p`, `a`, and `section` in the unlayered
cascade, which outranks every Tailwind utility in this project — `class="text-2xl"` on an `<h1>`
loses to the global rule, site-wide, today. `.exp-scope` resets those elements with
`all: revert-layer`, which skips unlayered declarations and falls back to Tailwind's layers. Don't
remove that block.

**The chrome selectors.** `fullbleed` hides the navbar, custom cursor, and chat button using
selectors in section 5 of `experiments.css` that depend on the DOM order of `src/app/layout.tsx`.
If that file changes, these change with it. Giving the root layout a `data-chrome` attribute would
make it robust, at the cost of one edit outside this folder.

## The build downcompiles oklch

Turbopack's Lightning CSS converts every `oklch()` to sRGB hex at build time based on the project's
browser targets — `oklch(77.5% 0.112 258)` ships as `#89b8fd`. Rendering is identical, but the
authored color space doesn't reach the browser and there's no P3 headroom. Adding a modern
`browserslist` to `package.json` would preserve it; that's outside this folder.

`color-mix(in oklch, ...)` does survive, so the derived hover states still mix in oklch at runtime.
