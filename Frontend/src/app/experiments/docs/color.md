# Color

One closed set of semantic tokens. There is no primitive layer — no `--exp-gray-100` exists to
reach past `--exp-surface`. Every value below is authored in `oklch()` and verified against APCA;
substituting your own hex breaks that guarantee silently.

## What background do I use?

```
Is this the page backdrop?
 └── Yes → --exp-canvas
Is it a card, panel, or input sitting on the canvas?
 └── Yes → --exp-surface
Is it floating above the page — modal, dropdown, popover, toast?
 └── Yes → --exp-surface-raised
Is it a recess — table header, code block, hover row, inset well?
 └── Yes → --exp-surface-sunken
Is it a tinted accent area — selected row, info callout?
 └── Yes → --exp-accent-subtle
Is it a filled primary button or badge?
 └── Yes → --exp-accent (text on it must be --exp-text-on-accent)
```

In the dark theme `--exp-surface-raised` is the *lightest* surface, not the darkest. Layering
survives because elevation always moves toward the viewer, never away.

## What text color do I use?

```
Headings and primary body copy → --exp-text
Supporting copy, labels, secondary paragraphs → --exp-text-secondary
Placeholders, timestamps, non-critical hints → --exp-text-muted
Sitting on --exp-accent or --exp-danger → --exp-text-on-accent
Inside a disabled control → --exp-disabled-text
```

`--exp-text-muted` is verified to APCA Lc 45, which is the floor for non-critical text only. Never
put it on anything a user must read to complete a task — a form label, an error, a button. Those
take `--exp-text-secondary` or `--exp-text`, verified to Lc 75.

12px uppercase counts as text people read. That is why `.exp-caps` uses `--exp-text-secondary` and
not `--exp-text-muted`.

## Borders

- `--exp-border` — default hairlines, card edges, dividers.
- `--exp-border-strong` — input outlines and anything the user is meant to notice as a boundary.

Never write `1px solid rgba(0,0,0,0.1)`. In light themes the token is alpha-based so it sinks into
the surface; in the dark theme it switches to a solid color, because alpha white glows. Hardcoding
either one breaks the other mode.

## Status colors

| Token | For | Never for |
| --- | --- | --- |
| `--exp-success` | Confirmation, completed, healthy | A primary action |
| `--exp-warning` | Needs attention, degraded, expiring | Errors |
| `--exp-danger` | Destructive actions, validation errors, failures | Emphasis |

All three are held 45° or more from every theme's accent hue so "primary action" never reads as
"it worked". Don't reassign them: if a challenge's brand is green, change `--exp-accent`, not
`--exp-success`.

**Color is never the only signal.** An error state carries three: `--exp-border` swapped to
`--exp-danger`, an icon, and message text.

```tsx
// Correct
<input className="exp-input" aria-invalid="true" aria-describedby="email-err" />
<p className="exp-error" id="email-err">
  <span aria-hidden="true">⚠</span> Your email must include an @ symbol.
</p>

// Incorrect — red border alone is invisible to a colorblind user,
// and "Invalid input" tells them nothing about how to fix it
<input style={{ borderColor: 'red' }} />
<p style={{ color: 'red' }}>Invalid input</p>
```

## Hover and active

Derive them, don't pick them:

- `--exp-accent-hover` and `--exp-accent-active` are already `color-mix(in oklch, ...)` off the
  accent. Use them.
- `--exp-danger-hover` likewise.

A hand-picked darker hex drifts hue when the theme changes. In the dark theme these mix toward
white instead of black, which a hardcoded value can't do.

## Disabled

Use `--exp-disabled-bg` and `--exp-disabled-text`. Never `opacity: 0.4` — opacity's contrast
depends on whatever is behind it, so the same disabled button passes on the canvas and fails on a
sunken row. The tokens are predictable.

## Adding a company theme

Override the contract on a new class in a `theme.css` next to the challenge, then add the name to
the `Theme` union in `registry.ts`.

```css
.exp-theme-acme {
  --exp-canvas: oklch(98% 0.004 250);
  --exp-accent: oklch(52% 0.17 250);
}
```

Two constraints, both checkable:

1. **One hue for the whole neutral ramp, a second for the accent ramp.** More than ~10° of spread
   inside one ramp reads as a color cast.
2. **Keep chroma under the sRGB ceiling for that L and H.** The same chroma value is far more vivid
   at some hues than others, and an out-of-gamut value clips unpredictably.

Override only what differs. Everything you leave alone inherits the verified base — layered
shadows, focus ring, reduced-motion handling.
