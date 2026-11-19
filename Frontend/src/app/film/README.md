# Film

The `/records` page's sibling, at `/film`. Each case study is a roll of 35mm
film standing on a shelf (just the canisters; an earlier version had film boxes). Picking one pulls its film out of the canister, real
case-study screens in the frames, and zooms into a frame to open the case
study. It isn't linked from the site yet.

Flat colour field (film-box yellow, shifting to the roll's own colour once it's
picked), bold title with mono metadata, boxed years, the hovered roll's number
huge and faint behind the shelf. No camera: an earlier version loaded the roll
into a camera and fired a flash; it was dropped as too busy.

## Files

| File | What it is |
| --- | --- |
| `page.tsx` | Route. Wraps the scene in the site's `TransitionWrapper`. |
| `FilmScene.tsx` | The shelf, the pick sequence, the phone list. |
| `Canister.tsx` | The shaded 35mm canister, scaled from `--can`. |
| `Strip.tsx` | The film strip (sprockets, edge numbers, frames, leader cut) and the `Tongue`: its first stretch, scaled down, peeking out of the lip. |
| `frames.ts` | Five real images per case study; the first is the frame the view zooms into. |
| `data.ts` | The rolls: the four records from `../records/data.ts` plus a film speed each. |
| `film.css` | All visual styling. Page rules scoped under `.film-page`. |

## The pick sequence

About 3s at 1440×900; a click anywhere or Escape skips to the case study.

1. The canister comes up off the shelf.
2. Everything else clears (other rolls, header, the caption). The canister moves
   to the left of the frame and grows to 368px tall while its leader slides out
   of the lip. The page colour shifts to the roll's.
3. The strip takes over from the leader, at exactly the same position and size,
   and is pulled out until the hero frame sits mid-stage.
4. The hero frame grows to fill the window (the full-size image is preloaded
   during the pull), then fades to the page colour and `router.push` opens the
   case study.

The tongue is the strip's own leader drawn at `1 / ANCHOR.scale`, so once the
canister has grown it is the same size as the strip; `pull` starts with the
leader already out. Sprocket spacing lines up because the leader starts on a
whole sprocket period.

## Other behaviour

- **Hover and focus:** the canister lifts, its leader slides out of the lip, and
  its number shows behind the shelf. Arrow keys move between rolls; Enter or
  Space opens one.
- **Reduced motion:** no movement; picking crossfades to the case study in 200ms.
- **Narrow windows (under 900px):** a plain list; a tap crossfades to the case
  study. The desktop stage scales down to fit windows between 900px and 1440px.
