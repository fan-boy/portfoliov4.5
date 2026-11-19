# Washington, DC guide

The third of Aaditya's Guides, at `/guides/washington-dc`. Aaditya lived next
door in College Park and spent the weekends here, so it's about DC itself,
through a year. Under About like the others; linked from About (a Metro "M"
magnet) and from the end of the Mumbai guide.

## Sections

1. **Arrival.** A bronze Metro pylon (the M, the line colours, "Aaditya's
   DC") floating over the Metro's coffered vault, flattened into a soft
   pattern. Along the bottom, a strip of the granite platform edge whose
   lights blink in a wave, as when a train is coming in. Same shape as the
   other guides: one crafted object on a quiet backdrop. (A full 3D station
   was tried first and dropped: it looked crude next to the others.)
2. **From next door.** The intro handwritten on a postcard, with a DC plate.
3. **The year.** Spring, Summer, Fall, Winter. The page colour follows the
   season in the middle of the screen, and so does the weather falling past:
   blossom petals, fireflies on a dark summer night, leaves, snow. Each season
   opens with a brown Metro-style sign, a line in pen and a keepsake
   (SmarTrip card, Nationals stub, Terps stub, museum sticker), then its
   places as taped prints with the nearest Metro station and line dots.
4. **The last train.** The platform edge again, lights blinking, over a dark
   band: "see you next season".

## Content

All in `data.ts`; `sample: true` marks placeholder text and stock photos.
Photos are from Wikimedia Commons, credited in `credits.ts` and on the page.

## Files

| File | What it is |
| --- | --- |
| `page.tsx` | Route, metadata, handwriting font. |
| `DCGuide.tsx` | The sections and the weather canvas. |
| `MetroPylon.tsx` | The bronze pylon, as SVG. |
| `MetroMark.tsx` | The small pylon top used as the magnet on About. |
| `data.ts` | Seasons, places, Metro lines. |
| `credits.ts` | Photo credits. |
| `dc.css` | Coffer pattern, platform edge and its blink, postcard, Metro signs, season colour transition. |
