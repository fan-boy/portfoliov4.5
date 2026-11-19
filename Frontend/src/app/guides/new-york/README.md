# New York guide

The first of Aaditya's Guides, at `/guides/new-york`. Personal, so it sits under
About: the nav highlights About, and the breadcrumb reads "← About / Guides /
New York". Nothing links here yet, and there's no `/guides` index.

The page is a subway station. The original 1904 stations named themselves in
mosaic tablets (capitals in small square tiles inside a patterned border);
that tablet is the one gesture the page repeats.

It's also a scrapbook: the subway layout stays, with paper stuck on top.
Photos are taped-down prints a few degrees off, notes are handwritten in
ballpoint blue (Caveat, via next/font), the intro is a torn notebook page, and
each neighbourhood can have a keepsake (ticket stub, receipt or napkin) and a
pen note pointing at its sign. On a mouse, the MetroCard and keepsakes can be
picked up and moved around.

## Sections

1. **Arrival.** A white subway tile wall. The NEW YORK tablet is laid tile by
   tile: border first, then the field, then the letters left to right (~1.7s).
   A click or Escape finishes it. Moving the cursor turns wall tiles a tablet
   colour that fades back.
2. **My New York.** Your neighbourhood, years and a few sentences.
3. **Favourites, by station.** A black hanging sign with route bullets filters
   the places (Eat, Coffee, Walk, See, Night). Each neighbourhood opens with its
   own station tablet, laid when it scrolls into view.
4. **One perfect day.** A pinned train ride: scrolling moves the train along a
   strip map, it dwells at each stop and the doors part onto that stop's photo.
   Phones (under 900px) and reduced motion get a plain timetable instead.
5. **Exit.** An EXIT tablet back on the tile wall, linking to About.

## Swapping in your own content

Everything is in `data.ts`. Anything with `sample: true` gets a "Sample"
stamp on the page, so nothing placeholder ships unnoticed.

- `INTRO`: years, neighbourhood and your own two or three sentences.
- `STATIONS`: a station name for each neighbourhood (any text works; it's
  rendered into the tablet), its palette, and its places.
- `DAY`: the stops, with times.
- `METROCARD` and each station's `scribble` and `keepsake` (`stub`,
  `receipt` or `napkin`).
- Photos: put scans in `public/guides/new-york/` and set `photo:
  "/guides/new-york/name.jpg"`. Frames are 3:2, like a 35mm negative.

## Files

| File | What it is |
| --- | --- |
| `page.tsx` | Route and metadata. |
| `NewYorkGuide.tsx` | All the sections, the tile trail and the train ride. |
| `MosaicTablet.tsx` | The tablet: text is drawn one pixel per tile on an offscreen canvas, read back, and laid as tiles on one canvas. Letters in Georgia, digits in Times (Georgia's numerals are old-style and don't read at tile size). |
| `Scrapbook.tsx` | Tape, taped prints, handwriting, pen notes with arrows, the MetroCard, stub, receipt, napkin and notebook page, and `Loose` (makes a keepsake draggable). |
| `data.ts` | Content, categories and tablet palettes. |
| `nyc.css` | Tile wall, hanging sign, photo placeholder, train doors. Scoped under `.nyc-page`, which also opts out of the global h1–p and section rules. |
