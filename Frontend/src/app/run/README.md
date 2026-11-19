# Bibs

A running sibling of `/records` and `/film`, at `/run`. Each case study is a
paper race bib pinned to the wall; picking one pops the pins, tears off the timing
strip and zooms into the bib number to open the case study. Not linked from the
site.

Flat pale track-clay field, bold title with mono metadata. Each bib: the event
band in the project's colour (project name and year), the bib number (01–04), the
organiser (company), a perforated timing strip with a barcode, four safety pins in
the corners. Under each, the case study's headline in mono.

## Files

| File | What it is |
| --- | --- |
| `page.tsx` | Route. Wraps the scene in the site's `TransitionWrapper`. |
| `BibScene.tsx` | The wall, the pick sequence, the phone list. |
| `Bib.tsx` | The bib, scaled from `--bib` (its width). Pins and the timing strip take motion values so the sequence can pop and tear them. |
| `bibs.css` | All styling. Page rules scoped under `.bibs-page`. |

Data comes from `../records/data.ts`.

## The pick sequence

About 2.7s at 1440×900; a click anywhere or Escape skips to the case study.

1. The other bibs step back. The four pins pop off, one corner after another
   (80ms apart).
2. The bib comes off the wall to the middle of the stage, straightened and 1.7×
   bigger. It scales around the point 41% of the way down, where the number is.
3. The timing strip tears off along the perforation and drops away.
4. The bib keeps growing around its number until the paper fills the window, then
   fades to the page colour and `router.push` opens the case study.

## Other behaviour

- **Hover and focus:** the bib straightens and lifts. Arrow keys move between
  bibs; Enter or Space opens one.
- **Reduced motion:** no movement; picking crossfades to the case study in 200ms.
- **Narrow windows (under 900px):** a plain list with small bibs; a tap crossfades
  to the case study. The desktop stage scales down to fit windows between 900px
  and 1440px.
