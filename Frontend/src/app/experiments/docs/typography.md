# Typography

Use the role classes. They bundle size, leading, tracking, and wrap mode, so you can't pick a size
and forget the leading that belongs with it. Reaching for `--exp-text-*` directly is how one-off
values get in.

## Which class?

```
Hero headline, one per page → .exp-display
Section heading
 ├── top level    → .exp-h1
 ├── second level → .exp-h2
 └── third level  → .exp-h3
Short descriptive block under a heading, or a card description → .exp-lead
Paragraph of running copy → .exp-body  (wrap it in .exp-measure)
Metadata, helper text, chart footnote → .exp-caption
Small uppercase section label → .exp-caps
Code, IDs, keys → .exp-mono
```

Nothing else exists. There is no `.exp-h4`, no `.exp-small`, no `.exp-title`.

Each role also sets its own color, so you rarely need to override one:

| Class | Color it sets |
| --- | --- |
| `.exp-display` `.exp-h1` `.exp-h2` `.exp-h3` | `--exp-text` |
| `.exp-lead` `.exp-body` | `--exp-text-secondary` |
| `.exp-caption` | `--exp-text-muted` |
| `.exp-caps` | `--exp-text-secondary` |
| `.exp-mono` | inherits — set one where you use it |

```tsx
// Correct
<h2 className="exp-h2">Notification preferences</h2>
<p className="exp-lead">Choose what we email you about.</p>

// Incorrect — hand-rolled size with no leading, no tracking, no wrap mode,
// and it won't re-tune when the theme's scale changes
<h2 style={{ fontSize: '24px', fontWeight: 600 }}>Notification preferences</h2>
```

## Wrap mode is assigned by role, not by taste

- **Headings** get `text-wrap: balance` — already in the class. It evens line lengths.
- **`.exp-lead` and `.exp-caption`** get `pretty` — stops one word stranding on the last line.
- **`.exp-body`** gets neither. Balancing a full paragraph burns horizontal space and buys no
  reading benefit; `balance` gives up past a few lines anyway.

Don't add a wrap mode by hand. Pick the right role class and it's already correct.

## Cap the measure

Wrap every paragraph of running copy in `.exp-measure` (65ch) or `.exp-measure-narrow` (45ch). A
line running the full width of a 1200px container loses the eye on the return sweep.

```tsx
// Correct
<div className="exp-measure">
  <p className="exp-body">…</p>
  <p className="exp-body">…</p>
</div>
```

Consecutive `.exp-body` siblings space themselves at exactly 1× line-height. Don't add
`margin-bottom` to paragraphs.

## The three scales

The scale re-tunes per theme; the class names never change. Body size is the load-bearing
difference.

| Role | `product` (B2B) | `consumer` (B2C) | `editorial` (marketing) |
| --- | --- | --- | --- |
| `.exp-display` | 36px / 1.1 | 48px / 1.1 | 80px / 1.0 |
| `.exp-h1` | 24px / 1.25 | 32px / 1.2 | 48px / 1.1 |
| `.exp-h2` | 19px / 1.3 | 24px / 1.3 | 32px / 1.2 |
| `.exp-h3` | 16px / 1.4 | 20px / 1.4 | 24px / 1.3 |
| `.exp-lead` | 15px / 1.5 | 18px / 1.6 | 20px / 1.65 |
| `.exp-body` | **14px** / 1.5 | **16px** / 1.6 | **18px** / 1.7 |
| `.exp-caption` | 13px / 1.45 | 14px / 1.5 | 16px / 1.6 |
| `.exp-caps` | 12px / 1.35 | 13px / 1.4 | 14px / 1.5 |

B2B runs 14px body because an operator lives in the screen all day and wants more rows visible.
B2C holds 16px because the user is one-handed on a phone and has never seen the screen before.
Marketing runs 18px because it has one job per viewport.

`display` and `h1` in `consumer` and `editorial` use `clamp()`, so an 80px headline doesn't run off
a phone.

Adding a theme? Three invariants, all checkable:

1. Heading ratios decrease monotonically — display→h1→h2→h3. A scale that jumps 1.56 then 1.29
   then 1.40 isn't a scale.
2. Leading tightens as size grows, from display down to body.
3. Nothing below 12px. Body never below 14px, and never below 16px for a consumer-facing theme.

## Numbers

Put `.exp-nums` on anything that ticks — timers, prices, counters, live totals. Most fonts draw a
narrow `1` and a wide `4`, so the row shifts on every update. Tables get it automatically.

```tsx
// Correct
<span className="exp-nums">${total.toLocaleString()}</span>

// Incorrect — this column jitters every time the value changes
<span>${total.toLocaleString()}</span>
```

## Links and terms

`.exp-link` for links: underline thickness and position come from the font's metrics, and the ink
skips descenders. `.exp-term` for defined terms and abbreviations — a dotted underline is the
established "hover for more" cue, and it needs a `title`.

Never use an underline on text that isn't a link. It trains users to click text that goes nowhere.

## Truncation

`.exp-truncate` for one line, `.exp-clamp` for several (set `--exp-clamp-lines`, default 2).

Both hide content, so both need a route to the full string — a `title`, a tooltip, or an expand
control.

```tsx
// Correct
<p className="exp-body exp-truncate" title={fullName}>{fullName}</p>

// Incorrect — the rest of the string is now unreachable
<p className="exp-body exp-truncate">{fullName}</p>
```

## Casing and characters

Keep strings in sentence case in the source and let `.exp-caps` shout. Copy typed in caps has to be
rewritten at the next redesign.

Use `…` not `...`, an en dash for ranges (`Mon–Fri`), and curly quotes in prose.

## Weights

`--exp-weight-normal` (400), `--exp-weight-medium` (500), `--exp-weight-strong` (600). Nothing
heavier exists: only Inter 300–600 is loaded, and the scope sets `font-synthesis: none` so asking
for 700 renders a wrong weight rather than a fabricated bold.
