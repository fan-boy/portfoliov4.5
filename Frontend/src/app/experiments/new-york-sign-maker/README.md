# New York sign maker

A study at `/experiments/new-york-sign-maker`, spun out of the New York guide:
type anything and it's laid in subway mosaic tile, like the 1904 station
name tablets, then download it as a PNG or copy it.

- **Preview.** The guide's own `MosaicTablet` on the guide's tile wall
  (`nyc.css`), so what you see is what the guide draws. Text is uppercased
  and kept to three lines of 18. "Set it again", on the wall under the sign, replays the tiling. The
  Download button and focus rings take the chosen palette's colours.
- **Options.** The five tablet palettes from the guide's `data.ts`, three
  letter heights (9, 11 or 13 tiles), and a tile-wall or transparent
  background.
- **Export.** `layoutTablet` + `paintTablet` (exported from `MosaicTablet.tsx`)
  paint the finished tablet onto an offscreen canvas at about 2400px across,
  on a drawn tile wall with a shadow or on its own. Download names the file
  after the text; Copy uses the async clipboard (Safari needs the
  ClipboardItem built immediately with a promise, which is how it's done).
  Cmd/Ctrl+Enter in the text box downloads.

Listed under studies in `../registry.ts`; linked from the end of the New York
guide.
