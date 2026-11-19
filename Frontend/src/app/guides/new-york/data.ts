/**
 * Everything on the New York guide. Entries marked `sample: true` are
 * placeholder text and stock photos (Wikimedia Commons, see credits.ts):
 * swap in your own place, note and film scan, then drop the flag.
 */

export type CategoryId = "eat" | "coffee" | "walk" | "see" | "night";

/** Route bullets: a letter in a coloured circle, after the subway's own, not copied from it. */
export const CATEGORIES: { id: CategoryId; letter: string; label: string; color: string }[] = [
  { id: "eat", letter: "E", label: "Eat", color: "#E0612B" },
  { id: "coffee", letter: "C", label: "Coffee", color: "#8A5A33" },
  { id: "walk", letter: "W", label: "Walk", color: "#3C8A4B" },
  { id: "see", letter: "S", label: "See", color: "#2D6CB3" },
  { id: "night", letter: "N", label: "Night", color: "#8A4C9E" },
];
export const CATEGORY = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<CategoryId, (typeof CATEGORIES)[number]>;

export type Place = {
  name: string;
  category: CategoryId;
  note: string;
  /** A film scan in /public, e.g. "/guides/new-york/joes.jpg". Leave out for a placeholder frame. */
  photo?: string;
  sample?: boolean;
};

/** Mosaic tablet colours: the field, the letters, and the three rings of the border. */
export type TabletPalette = {
  field: string;
  letter: string;
  outer: string;
  bandA: string;
  bandB: string;
  inner: string;
};

export const PALETTES: Record<"teal" | "terracotta" | "navy" | "umber" | "green", TabletPalette> = {
  teal: { field: "#1F5C56", letter: "#F4EEDF", outer: "#24313D", bandA: "#C9973F", bandB: "#F4EEDF", inner: "#A6513A" },
  terracotta: { field: "#A6513A", letter: "#F4EEDF", outer: "#24313D", bandA: "#1F5C56", bandB: "#E9D9B4", inner: "#C9973F" },
  navy: { field: "#24384F", letter: "#F4EEDF", outer: "#A6513A", bandA: "#C9973F", bandB: "#F4EEDF", inner: "#1F5C56" },
  umber: { field: "#6B4A2E", letter: "#F4EEDF", outer: "#24313D", bandA: "#E9D9B4", bandB: "#1F5C56", inner: "#C9973F" },
  green: { field: "#2F5E3A", letter: "#F4EEDF", outer: "#24313D", bandA: "#C9973F", bandB: "#E9D9B4", inner: "#A6513A" },
};

/** Each neighbourhood opens with its station's name tablet. */
export type Station = {
  station: string;
  neighbourhood: string;
  palette: keyof typeof PALETTES;
  /** A handwritten note in the margin, pointing at the station sign. */
  scribble?: string;
  /** Something you kept from here, stuck beside the sign. */
  keepsake?: Keepsake;
  places: Place[];
};

/** Paper things kept from the city, stuck onto the page. */
export type Keepsake =
  | { kind: "stub"; venue: string; event: string; date: string; color: string; sample?: boolean }
  | { kind: "receipt"; shop: string; address: string; items: [string, string][]; total: string; date: string; sample?: boolean }
  | { kind: "napkin"; text: string; sample?: boolean };

/** The MetroCard taped beside the intro. */
export const METROCARD = { photo: "/guides/new-york/metrocard.jpg", sample: true };

export const INTRO = {
  /** Shown under the hero tablet. */
  byline: "A guide by Aaditya",
  /** The year you moved here. */
  since: "2024",
  years: "2024 – now",
  neighbourhood: "The West Village",
  /** A couple of sentences in your own words. */
  body: [
    "I moved here in 2024 with two suitcases and a list of places friends swore by. Most of that list is on this page now, plus a lot I found by getting off at the wrong stop.",
    "A normal week: coffee on the walk to work, a long walk on Sunday, a slice at least twice. This is the city the way I actually live it.",
  ],
  sample: true,
};

export const STATIONS: Station[] = [
  {
    station: "WEST 4 ST",
    neighbourhood: "Greenwich Village",
    palette: "terracotta",
    scribble: "my stop!",
    keepsake: { kind: "napkin", text: "best slice of my life. no contest.", sample: true },
    places: [
      { name: "Joe's Pizza", photo: "/guides/new-york/joes.jpg", category: "eat", note: "A plain slice, folded, eaten standing up.", sample: true },
      { name: "Caffe Reggio", photo: "/guides/new-york/reggio.jpg", category: "coffee", note: "Old espresso machine, older room.", sample: true },
      { name: "Washington Square Park", photo: "/guides/new-york/washington-square.jpg", category: "walk", note: "Chess tables, the arch, whoever's playing piano.", sample: true },
      { name: "Comedy Cellar", photo: "/guides/new-york/comedy-cellar.jpg", category: "night", note: "Late set, small room, no phones.", sample: true },
    ],
  },
  {
    station: "DELANCEY ST",
    neighbourhood: "Lower East Side",
    palette: "navy",
    scribble: "always hungry here",
    keepsake: {
      kind: "receipt",
      shop: "DELI",
      address: "LOWER EAST SIDE, NY",
      items: [["PASTRAMI ON RYE", "28.95"], ["PICKLES", "0.00"], ["DR BROWN'S", "3.95"]],
      total: "32.90",
      date: "03/14/2025",
      sample: true,
    },
    places: [
      { name: "Russ & Daughters", photo: "/guides/new-york/russ.jpg", category: "eat", note: "Take a number. Bagel, lox, schmear.", sample: true },
      { name: "Katz's Delicatessen", photo: "/guides/new-york/katz.jpg", category: "eat", note: "Pastrami on rye, don't lose the ticket.", sample: true },
      { name: "Tenement Museum", photo: "/guides/new-york/tenement.jpg", category: "see", note: "The city's story, one apartment at a time.", sample: true },
    ],
  },
  {
    station: "14 ST",
    neighbourhood: "Chelsea & the High Line",
    palette: "green",
    keepsake: { kind: "stub", venue: "THE WHITNEY", event: "ADMIT ONE", date: "06.21.2025", color: "#E9D9B4", sample: true },
    places: [
      { name: "The High Line", photo: "/guides/new-york/high-line.jpg", category: "walk", note: "Start at Gansevoort, walk north at golden hour.", sample: true },
      { name: "Chelsea Market", photo: "/guides/new-york/chelsea-market.jpg", category: "eat", note: "Graze through it on a cold day.", sample: true },
      { name: "The Whitney", photo: "/guides/new-york/whitney.jpg", category: "see", note: "The terraces are half the visit.", sample: true },
    ],
  },
  {
    station: "BEDFORD AV",
    neighbourhood: "Williamsburg",
    palette: "umber",
    scribble: "sunsets from here",
    keepsake: { kind: "stub", venue: "BROOKLYN BOWL", event: "LIVE · GA", date: "10.03.2025", color: "#F2C9B8", sample: true },
    places: [
      { name: "Devoción", photo: "/guides/new-york/cortado.jpg", category: "coffee", note: "Skylight, plants, very good cortado.", sample: true },
      { name: "Domino Park", photo: "/guides/new-york/domino.jpg", category: "walk", note: "The skyline across the water at dusk.", sample: true },
      { name: "Brooklyn Bowl", photo: "/guides/new-york/brooklyn-bowl.jpg", category: "night", note: "Live music and a lane if you're lucky.", sample: true },
    ],
  },
];

/** One perfect day: the stops the train makes, in order. */
export type Stop = Place & { time: string };

export const DAY: Stop[] = [
  { time: "08:30", name: "Russ & Daughters", photo: "/guides/new-york/russ.jpg", category: "eat", note: "Breakfast before the line gets long.", sample: true },
  { time: "10:00", name: "The High Line", photo: "/guides/new-york/high-line.jpg", category: "walk", note: "North from Gansevoort, coffee in hand.", sample: true },
  { time: "12:30", name: "Chelsea Market", photo: "/guides/new-york/chelsea-market.jpg", category: "eat", note: "Lunch, grazing.", sample: true },
  { time: "14:30", name: "The Whitney", photo: "/guides/new-york/whitney.jpg", category: "see", note: "An hour inside, the rest on the terraces.", sample: true },
  { time: "17:30", name: "Brooklyn Bridge", photo: "/guides/new-york/brooklyn-bridge.jpg", category: "walk", note: "Walk it towards Manhattan for the view.", sample: true },
  { time: "20:00", name: "Joe's Pizza", photo: "/guides/new-york/joes.jpg", category: "eat", note: "Dinner is a slice. That's the rule.", sample: true },
  { time: "22:00", name: "Comedy Cellar", photo: "/guides/new-york/comedy-cellar.jpg", category: "night", note: "End the day laughing.", sample: true },
];
