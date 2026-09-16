# Components

Class-based primitives, not React components. Compose them on real elements — `.exp-btn` belongs
on a `<button>`, never a `<div>`, because the button gets keyboard focus, Enter/Space activation,
and screen-reader semantics for free.

## Button

Use for actions. Navigation styled as a button is a link with `.exp-link`.

Variants: `.exp-btn-primary`, `.exp-btn-secondary`, `.exp-btn-ghost`, `.exp-btn-danger`. Nothing
else exists — an unlisted variant is a bug, not an option. Always pair with the base `.exp-btn`.

```
Is it the single most important action on the screen?
 ├── Yes → .exp-btn-primary
 └── No
      ├── Is it destructive or hard to undo?
      │    └── Yes → .exp-btn-danger
      ├── Does it need to read as a real button — a form's Cancel, a toolbar action?
      │    └── Yes → .exp-btn-secondary   ← the default
      └── Is it a tertiary action in a dense row or a table cell?
           └── Yes → .exp-btn-ghost
```

**One `.exp-btn-primary` per view.** Two primary buttons means the screen has no hierarchy and the
user has no next step.

A form's Cancel is `.exp-btn-secondary`. Reserve `.exp-btn-ghost` for tertiary actions inside a
dense row or table cell, where a bordered button would add noise to every line.

```tsx
// Correct
<button className="exp-btn exp-btn-primary">Save changes</button>
<button className="exp-btn exp-btn-secondary">Cancel</button>

// Incorrect — two primaries, a div that isn't focusable, and "Submit"
// tells the user nothing about what will happen
<div className="exp-btn exp-btn-primary">Submit</div>
<button className="exp-btn exp-btn-primary">Cancel</button>
```

Label buttons with the outcome: "Save changes", "Delete workspace", "Send invite". Never "Submit",
"OK", or "Yes".

Never place a `.exp-btn-danger` next to the confirming action. Proximity implies equivalence —
separate destructive actions with whitespace and a divider.

Loading and disabled both use the native `disabled` attribute, which the class already styles. Do
not add `opacity`.

## Card

`.exp-card` for a contained block on the canvas. Add `.exp-card-raised` on top of it for anything
floating — modal, dropdown, popover.

```tsx
// Correct
<div className="exp-card exp-card-raised">…</div>

// Incorrect — hand-built card that won't re-theme and gets the
// single-shadow look instead of the layered one
<div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12 }}>…</div>
```

Nesting a card inside a card: inner radius = outer radius − padding, or the corners visibly don't
sit concentric. `--exp-radius-nested` does this for the standard `--exp-pad-card`.

Use `.exp-lift` for a hover-raise on interactive cards. Don't build your own transform — `.exp-lift`
reads the expression level, so it's 0px in `restrained` and 4px in `expressive`.

## Input

`.exp-input` on the control, `.exp-label` on a real `<label>` with `htmlFor` wired to the input's
`id`. The class already covers four distinct states: default, hover, focus, and `aria-invalid`.

```tsx
// Correct
<label className="exp-label" htmlFor="workspace">Workspace name</label>
<input id="workspace" className="exp-input" placeholder="Acme Corp" />

// Incorrect — placeholder as the label disappears the moment typing starts,
// exactly when the reminder is needed, and clicking it focuses nothing
<input className="exp-input" placeholder="Workspace name" />
```

A placeholder is never a label. It's an example of valid input or it's absent.

Error state: set `aria-invalid="true"` plus `aria-describedby` pointing at a `.exp-error` — the
class that styles the message line, icon and all. `.exp-input` handles its own border from
`aria-invalid`; see [color.md](color.md) for why color alone isn't enough.

`.exp-input` is already 16px on touch devices and drops to the theme's body size on
`pointer: fine`. Don't override `font-size` — under 16px, mobile Safari zooms the page on focus.

## Checkbox, radio, and toggle

There is no custom control primitive, and you should not build one for a checkbox or radio. Use the
native input and tint it:

```tsx
// Correct
<input type="checkbox" id="alerts" style={{ accentColor: 'var(--exp-accent)' }} />
<label className="exp-label" htmlFor="alerts" style={{ display: 'inline', marginBlockEnd: 0 }}>
  Email me about critical alerts
</label>

// Incorrect — a div switch has no keyboard support, no screen-reader role,
// and doesn't participate in the form
<div className="my-toggle" onClick={toggle} />
```

`accent-color` is the sanctioned way to brand a native control. It costs nothing and keeps focus,
keyboard, and screen-reader behaviour for free.

Build a custom pill switch only when the brief explicitly asks for that look. It needs a track
width, knob size, and pill radius — values the system has no tokens for, so put them in the
challenge's own `challenge.css`, not in `experiments.css`.

`.exp-label` is `display: block` with a bottom margin, sized for a stacked field. On an inline
checkbox row, override both as above.

## Table

Plain `<table>` inside `.exp-scope` gets tabular figures automatically. Right-align numeric columns
and left-align text. Do that before reaching for zebra striping — alignment is what striping was
compensating for.

Header cells take `.exp-caps`.

## Focus

`.exp-focusable` on any custom interactive element that isn't a `button`, `a`, or `input` — those
three are already covered by the base classes.

Never write `outline: none`. The focus ring is a 2px `--exp-focus` outline at `outline-offset: 2px`;
removing it without a replacement is an accessibility failure.

## Divider

`.exp-hairline` on an `<hr>`. Don't use a bordered empty `<div>`.

## What doesn't exist yet

There is no modal, dropdown, tooltip, toast, badge, or tab primitive. Build what the brief needs
from `.exp-card-raised` and the tokens. Keep it in the challenge's own `challenge.css`; promote it
into `experiments.css` only once a second challenge needs the same thing.

Two rules when you build one:

- A tooltip can't contain interactive elements — a "Learn more" link inside a hover tooltip is
  unreachable. Use a click-triggered popover.
- A modal traps focus. If focus escapes to the page behind, background content becomes reachable
  and disorienting for screen-reader users.
