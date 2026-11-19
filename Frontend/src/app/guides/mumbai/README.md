# Mumbai guide

The second of Aaditya's Guides, at `/guides/mumbai`, written by someone who
grew up there: mostly where locals actually go, few tourist sights. Under About
like New York (nav and breadcrumb), not linked from anywhere yet.

Deliberately not New York's structure. It shares only the scrapbook layer in
`../shared` (taped prints, handwriting, draggable keepsakes).

## Sections

1. **Arrival.** The suburban station name board, an enamel diamond with a red
   ring, a blue bar reading MUMBAI and मुंबई above and below, floating with a
   slow bob. Behind it, Mumbai's Art Deco (Marine Drive, Oval Maidan): fan
   scallops over the wall and sunburst rays from behind the board. The ring
   draws itself round, the bar slides in, then the lettering. A click or
   Escape finishes it.
2. **From home.** The intro handwritten on a blue inland letter card, and a
   note on how to read the lid codes.
3. **Through the day.** Subah, Dopahar, Shaam, Raat: each opens with a
   hand-painted shop board that paints itself in (Yatra One, a face drawn from
   Mumbai's painted signs). The board and a keepsake (train ticket, café bill,
   bus ticket, theatre stub) stay put on the left while taped prints run down
   the right like a collage. Each print has a tiffin lid with a dabbawala-style
   code: nearest local station, then stop number.
4. **Paus.** "Make it rain" rains over the whole page (a canvas on body) and
   shows the monsoon places. A floating button stops it from anywhere.
5. **Marine Drive.** Drawn in SVG and CSS (`MarineDriveArt.tsx`): the view
   sitting on the parapet at night. The Queen's Necklace sweeps in from the
   far end of the bay, lamps coming on far to near; the city low on the
   horizon with the Nariman Point towers; traffic on the road; the moon and
   the lamps shimmering on the water; people on the wall.

## Content

All in `data.ts`; `sample: true` marks placeholder text and stock photos.
Photos are from Wikimedia Commons, credited in `credits.ts` and on the page;
several are stand-ins (the dish rather than the place). Kitab Khana and Haji
Ali Juice Centre have none yet and show "photo to come".

## Files

| File | What it is |
| --- | --- |
| `page.tsx` | Route, metadata, fonts (Caveat, Yatra One, Noto Sans Devanagari). |
| `MumbaiGuide.tsx` | The sections, painted boards, rain and Marine Drive. |
| `MarineDriveArt.tsx` | The Marine Drive night scene, as SVG. |
| `StationDiamond.tsx` | The station board, as SVG, with its draw-in. |
| `data.ts` | Content and board palettes. |
| `credits.ts` | Photo credits. |
| `mumbai.css` | Plaster wall, deco pattern and sunburst, boards, inland letter, lids, switch, night. Scoped under `.mb-page`. |
