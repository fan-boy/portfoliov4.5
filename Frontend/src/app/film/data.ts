import { RECORDS, type VinylRecord } from "../records/data";

/** A roll of film: the same case study as its record, plus what's printed on the box. */
export type FilmRoll = VinylRecord & {
  /** Film speed printed on the box and canister. */
  iso: number;
};

const ISO: { [slug: string]: number } = {
  "risk-platform": 400,
  stillsuit: 200,
  "persona-builder": 800,
  "university-park": 100,
};

export const ROLLS: FilmRoll[] = RECORDS.map((r) => ({ ...r, iso: ISO[r.slug] ?? 400 }));

/** The shelf's own flat field, before a roll is picked: film-box yellow. */
export const SHELF_FIELD = "#EED9A1";
