# Motion

Every duration and easing comes from a token, because the expression level retunes them all at
once. A hardcoded `300ms` stays 300ms when the challenge switches to `restrained`.

## Durations

| Token | Range across expression | For |
| --- | --- | --- |
| `--exp-dur-fast` | 100–150ms | Hover, focus, color and border changes |
| `--exp-dur-base` | 140–240ms | Hover lift, small position changes |
| `--exp-dur-slow` | 180–360ms | Entrances, modals, drawers, sheets |

Hover at 150ms feels native; at 400ms the UI feels like it's thinking. Anything the user waits on
past 400ms needs a spinner or skeleton, not a longer transition — silence past that reads as broken.

## Easing

| Token | For |
| --- | --- |
| `--exp-ease-out` | Entrances. Anything arriving. |
| `--exp-ease-in` | Exits. Anything leaving. |
| `--exp-ease-in-out` | Movement between two on-screen positions |
| `--exp-ease-sheet` | Drawers, bottom sheets, iOS-style panels |

**Entrances are `ease-out`, exits are `ease-in`.** Never `ease-in` on an entrance — it delays the
initial movement, which is exactly when the user is looking.

Exit and enter should not be mirror images. An exit is a departure, not an entrance played
backwards, and it's usually faster.

## List the properties

```css
/* Correct */
transition: opacity var(--exp-dur-base) var(--exp-ease-out),
            transform var(--exp-dur-base) var(--exp-ease-out);

/* Incorrect — silently animates width, height and color too,
   triggering layout recalculation on every frame */
transition: all 0.3s;
```

`transition: all` is never correct. Animate `opacity` and `transform` by preference: they run on
the compositor and don't force layout.

## Staggering a list

`.exp-enter` plus `--exp-index` on each item. The delay is `index × --exp-stagger`, which is 0 in
`restrained`, so the whole effect switches off with the expression level.

```tsx
// Correct
{rows.map((row, i) => (
  <div key={row.id} className="exp-card exp-enter" style={{ '--exp-index': i } as React.CSSProperties}>
    …
  </div>
))}

// Incorrect — hardcoded delay ignores the expression level and
// keeps animating for users who asked for reduced motion
<div style={{ animationDelay: `${i * 60}ms` }}>…</div>
```

Eight items entering at once reads as a flash; staggered at 40ms it reads as arrival. Past about
ten items, drop the stagger — the last row arrives too late to feel connected to the first.

## Hover and press

- `.exp-lift` for a card hover-raise. Reads `--exp-lift`, so it's 0px in `restrained`.
- `.exp-btn` already scales to `--exp-press` on `:active`. Don't add your own.

A button with no pressed state feels dead. A button with two feels broken — check the class before
adding one.

## Reduced motion

`.exp-scope` already zeroes every duration, the stagger, the lift, and the press scale under
`prefers-reduced-motion: reduce`, and disables `.exp-enter`.

This only works because motion runs through the tokens. A hardcoded duration inside a challenge
ignores the media query entirely and keeps moving for users who asked it not to — that's the real
cost of inlining a value, not just theme drift.

If you add a keyframe animation, gate it yourself:

```css
@media (prefers-reduced-motion: reduce) {
  .my-animation { animation: none; }
}
```

## What not to animate

- **Theme or palette switches.** Every component has its own transition timing, so a palette change
  becomes a ragged cascade. The switch should be instant.
- **Three things at once.** If three elements would move simultaneously and clash, let one move at a
  time. Competing parallel motion is noise.
- **Scroll position.** No scroll-hijacking, no parallax, no fade-in-on-scroll for product UI. On a
  marketing challenge, one restrained entrance per section is the ceiling.
- **Anything on first paint** that isn't the page's own entrance. An intro animation delays the
  content the user came for.
