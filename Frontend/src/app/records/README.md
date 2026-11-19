# Records

An experimental, analog take on the portfolio at `/records`. Each case study is a
record in a shop rack; playing one puts it on the turntable and opens the case
study. It isn't linked from the site yet.

The look is flat and graphic, after the Codrops Record Player demo
(tympanus.net/Development/RecordPlayer): one flat colour field (mint in the shop,
each record's own colour on the deck), black vinyl whose label is the record's
cover, a solid tonearm in the record's accent with a white pivot and headshell,
bold titles with mono metadata, and boxed years. Two views share one stage: the
**shop** (staggered sleeves, discs peeking out, the hovered record's number huge
and faint behind) and the **deck** (title block on the left, turntable on the right).

Everything is DOM, CSS and SVG, animated with framer-motion. No canvas, WebGL or
three.js.

## Files

| File | What it is |
| --- | --- |
| `page.tsx` | Route. Wraps the scene in the site's `TransitionWrapper`. |
| `RecordsScene.tsx` | The colour field, shop and deck views, the play sequence, the phone list. |
| `Turntable.tsx` | Tinted deck, platter, spindle, tonearm. Owns the deck geometry. |
| `Disc.tsx` | The record: grooves, cover label, sheen, hole. |
| `Sleeve.tsx` | The album cover. |
| `data.ts` | The four records: titles, routes, art, field and accent colours. |
| `records.css` | All visual styling, scoped under `.records-page`. |

## Disc geometry

One number, `--disc` (set from the `size` prop), drives the whole record: label is
54%, hole 3.6%, the lead-in band at the outer edge and the run-out band just
outside the label. The same `Disc` renders in the sleeve (197px), in flight and on
the deck (`DISC` = 430px).

Only `.rec-disc-face` rotates. The sheen is a separate, still layer above it: the
light in the room doesn't turn with the record.

The tonearm is placed from `DISC` too (`Turntable.tsx`): the pivot sits 0.68 disc
right and 0.51 disc up from the platter centre, the arm is 0.647 disc long. At
`PLAY_ANGLE` (25°) the stylus lands in the lead-in groove, about 0.83 of the radius
out, never on the label. `REST_ANGLE` (0°) parks it on the post.

## The play sequence

Measured at 1440×900 for a record played onto an empty deck (about 2.8s in total).
Steps overlap; times are when each one starts.

| ms | Step |
| --- | --- |
| 0 | The sleeve lifts out of the rack and grows 4%. |
| 250 | The disc slides out of the sleeve's right edge, toward the deck. |
| ~600 | The shop fades out and the deck fades in while the page colour shifts to the record's field. A fixed-position copy of the disc, portalled to `<body>`, flies to the spindle in an arc, turning slightly so it lands lined up with the platter. The empty sleeve settles back. |
| ~1130 | The disc drops onto the spindle with a small settle; the arm lifts on the cue and swings over the lead-in at the same time. |
| ~1440 | The disc is handed to the platter and the platter spins up to 33⅓ rpm over 0.6s. |
| ~2000 | The cue lowers the needle into the groove. |
| ~2130 | A circle in the record's accent grows from the label until it fills the screen, then fades to the page colour. |
| ~2800 | `router.push` to the case study; `TransitionWrapper` fades it in. |

If another record is on the deck, it's put back in its sleeve first (arm parks,
platter winds down, disc flies home). If the same record is already on the deck,
the sequence starts at the needle drop.

Spin is a real ramp: a `speed` motion value (deg/s) is integrated each frame into
`rotation`, so spin-up and spin-down are eased instead of snapping between running
and paused.

## Other behaviour

- **Skip:** a click anywhere, or Escape, during the sequence stops it and fades
  straight to the case study.
- **Coming back:** the deck view opens with the last-played record
  (`sessionStorage`, `records:last-played`) spinning, needle down. "All records",
  the round stop button or Escape park the arm, wind the platter down and fly the
  record back to its sleeve as the shop returns. "Read the case study" drops the
  needle and goes straight in.
- **Hover and focus:** a record lifts, its disc slides further out of the sleeve,
  and its number shows behind the rack. Arrow keys move between records; Enter or
  Space plays.
- **Reduced motion:** no spin, flight or arm. Playing crossfades to the case study
  in 200ms.
- **Narrow windows (under 900px):** a plain list; a tap crossfades to the case
  study. The desktop stage scales down to fit windows between 900px and 1440px.
- **Prefetch:** each case study route is prefetched on hover or focus.

## Adding a record

Add an entry to `RECORDS` in `data.ts`: the case study's route and h1, a product
screen for the sleeve, a sleeve background, and field and accent colours.
