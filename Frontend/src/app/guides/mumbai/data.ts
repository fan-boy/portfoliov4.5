import type { Keepsake } from "../shared/Scrapbook";

/**
 * Everything on the Mumbai guide. Entries marked `sample: true` are
 * placeholder text and stock photos (Wikimedia Commons, see credits.ts):
 * swap in your own note and film scan, then drop the flag.
 *
 * Mostly the city as locals use it; the big sights are left out on purpose.
 */

export type Place = {
  name: string;
  /** Where it is, the way you'd tell a cab driver. */
  area: string;
  /** What you go for, in a word or two. */
  what: string;
  /**
   * Dabbawala-style code for the lid: the nearest local station's short code
   * and the stop's number in the section, e.g. "MTN 2".
   */
  code: string;
  note: string;
  photo?: string;
  sample?: boolean;
};

/** A painted shop board: the ground, the letters, their drop shadow, the rim. */
export type BoardPalette = { ground: string; ink: string; shadow: string; rim: string };

export const BOARDS: Record<"peeli" | "kaali" | "lal" | "neela" | "hara", BoardPalette> = {
  /** Taxi yellow, black letters. */
  peeli: { ground: "#F2C230", ink: "#151515", shadow: "#C8321F", rim: "#151515" },
  /** Taxi black, yellow letters. */
  kaali: { ground: "#171717", ink: "#F2C230", shadow: "#C8321F", rim: "#F2C230" },
  lal: { ground: "#C8321F", ink: "#FBF3DF", shadow: "#151515", rim: "#FBF3DF" },
  neela: { ground: "#1F4E8C", ink: "#FBF3DF", shadow: "#F2C230", rim: "#FBF3DF" },
  hara: { ground: "#1E6A4A", ink: "#FBF3DF", shadow: "#151515", rim: "#F2C230" },
};

export const INTRO = {
  /** Shown under the hero board. */
  byline: "grew up here — a guide by Aaditya",
  /** Written on the inland letter. */
  greeting: "Dear whoever's visiting,",
  body: [
    "I grew up here, so this isn't the Gateway-and-Taj list. It's where we actually eat, walk and sit around: breakfast in Matunga, the back lanes of Girgaon, the sea at Carter Road when it's too hot to be inside.",
    "Take the local at least once (not at 9am). Eat standing up. If it starts raining, don't run for cover — that's the best part.",
  ],
  signoff: "— Aaditya",
  sample: true,
};

export type DaySection = {
  id: string;
  /** Painted on the board. */
  board: string;
  /** The same word in Devanagari, painted underneath. */
  boardDeva: string;
  palette: keyof typeof BOARDS;
  /** Shown beside the board. */
  hours: string;
  keepsake?: Keepsake;
  places: Place[];
};

export const DAY: DaySection[] = [
  {
    id: "subah",
    board: "Subah",
    boardDeva: "सुबह",
    palette: "peeli",
    hours: "Morning, 6 to 11",
    keepsake: { kind: "train", line: "WESTERN RLY", from: "CCG", to: "MTN", fare: "₹10", date: "14-08-25", sample: true },
    places: [
      {
        name: "Sassoon Dock",
        area: "Colaba",
        what: "Fish market",
        code: "CCG 1",
        note: "Go at 6. Boats in, ice everywhere, nobody has time for you. It's perfect.",
        photo: "/guides/mumbai/sassoon-dock.jpg",
        sample: true,
      },
      {
        name: "Ram Ashraya",
        area: "King's Circle, Matunga",
        what: "Breakfast",
        code: "MTN 2",
        note: "Neer dosa and filter coffee, shared table, out in fifteen minutes.",
        photo: "/guides/mumbai/ram-ashraya.jpg",
        sample: true,
      },
      {
        name: "Five Gardens",
        area: "Dadar Parsi Colony",
        what: "Morning walk",
        code: "MTN 3",
        note: "Walkers, the laughing club, a lot of squirrels. The quietest part of the city at 7am.",
        photo: "/guides/mumbai/five-gardens.jpg",
        sample: true,
      },
      {
        name: "Mama Kane",
        area: "Dadar West",
        what: "Batata vada",
        code: "DR 4",
        note: "Since 1910. Batata vada and a cutting, standing at the counter.",
        photo: "/guides/mumbai/mama-kane.jpg",
        sample: true,
      },
    ],
  },
  {
    id: "dopahar",
    board: "Dopahar",
    boardDeva: "दोपहर",
    palette: "lal",
    hours: "Afternoon, 11 to 4",
    keepsake: {
      kind: "chit",
      shop: "YAZDANI BAKERY",
      items: [
        ["2 chai", "40"],
        ["bun maska", "50"],
        ["ginger biscuit", "30"],
      ],
      total: "120",
      sample: true,
    },
    places: [
      {
        name: "Khotachiwadi",
        area: "Girgaon",
        what: "Old lanes",
        code: "CYR 1",
        note: "Wooden houses with verandahs, a hundred years in two lanes. Walk slowly, people live here.",
        photo: "/guides/mumbai/khotachiwadi.jpg",
        sample: true,
      },
      {
        name: "Banganga Tank",
        area: "Walkeshwar",
        what: "Quiet",
        code: "GTR 2",
        note: "Steps, temples, ducks, and the city just gone for an hour.",
        photo: "/guides/mumbai/banganga.jpg",
        sample: true,
      },
      {
        name: "Yazdani Bakery",
        area: "Fort",
        what: "Bun maska",
        code: "CSMT 3",
        note: "Irani bakery. Bun maska, chai, and the ginger biscuits for later.",
        photo: "/guides/mumbai/bun-maska.jpg",
        sample: true,
      },
      {
        name: "Kitab Khana",
        area: "Fort",
        what: "Books",
        code: "CSMT 4",
        note: "Old building, tall shelves, a café at the back. Lose an afternoon.",
        sample: true,
      },
    ],
  },
  {
    id: "shaam",
    board: "Shaam",
    boardDeva: "शाम",
    palette: "neela",
    hours: "Evening, 4 to 8",
    keepsake: { kind: "bus", fare: "₹10", route: "84", color: "#BFE0C4", sample: true },
    places: [
      {
        name: "Shivaji Park",
        area: "Dadar",
        what: "Gully cricket",
        code: "DR 1",
        note: "Thirty matches on one ground and they somehow never collide.",
        photo: "/guides/mumbai/shivaji-park.jpg",
        sample: true,
      },
      {
        name: "Carter Road",
        area: "Bandra West",
        what: "Sea walk",
        code: "BA 2",
        note: "Walk it at sunset, then sit on the rocks until it's dark.",
        photo: "/guides/mumbai/carter-road.jpg",
        sample: true,
      },
      {
        name: "Elco Pani Puri",
        area: "Hill Road, Bandra",
        what: "Chaat",
        code: "BA 3",
        note: "Pani puri, then sev puri, then one more pani puri. That's the order.",
        photo: "/guides/mumbai/pani-puri.jpg",
        sample: true,
      },
    ],
  },
  {
    id: "raat",
    board: "Raat",
    boardDeva: "रात",
    palette: "kaali",
    hours: "Night, 8 till late",
    keepsake: { kind: "stub", venue: "PRITHVI THEATRE", event: "ROW F · SEAT 12", date: "22.11.2025", color: "#F2D9A6", sample: true },
    places: [
      {
        name: "Prithvi Theatre",
        area: "Juhu",
        what: "Plays",
        code: "VLP 1",
        note: "A small theatre with a café out front. Irish coffee before the show.",
        photo: "/guides/mumbai/prithvi.jpg",
        sample: true,
      },
      {
        name: "Haji Ali Juice Centre",
        area: "Haji Ali",
        what: "Juice",
        code: "MX 2",
        note: "Sitaphal cream at 11pm. Don't ask questions.",
        sample: true,
      },
      {
        name: "Kala Ghoda lanes",
        area: "Fort",
        what: "Late rolls",
        code: "CSMT 3",
        note: "Walk the lanes after dark and end at a roll stall. Everyone does.",
        photo: "/guides/mumbai/kala-ghoda.jpg",
        sample: true,
      },
    ],
  },
];

/** Paus: only shown when it's raining on the page. */
export const MONSOON = {
  board: "Paus",
  boardDeva: "पाऊस",
  intro: "June to September the city changes. These are the things I'd do if you're here when it rains.",
  places: [
    {
      name: "Worli Sea Face",
      area: "Worli",
      what: "Waves",
      code: "LPR 1",
      note: "High tide, the waves come over the wall. Stand back. Or don't.",
      photo: "/guides/mumbai/worli.jpg",
      sample: true,
    },
    {
      name: "Ashok Vada Pav",
      area: "Kirti College, Dadar",
      what: "Vada pav",
      code: "DR 2",
      note: "Hot vada pav in the rain is the whole point of living here.",
      photo: "/guides/mumbai/vada-pav.jpg",
      sample: true,
    },
    {
      name: "Kanheri Caves",
      area: "Sanjay Gandhi National Park",
      what: "Trail",
      code: "BVI 3",
      note: "The park turns green overnight. Small waterfalls down the rock.",
      photo: "/guides/mumbai/kanheri.jpg",
      sample: true,
    },
    {
      name: "Any tapri",
      area: "Under any tarpaulin",
      what: "Cutting chai",
      code: "ANY 4",
      note: "Half a glass, too sweet, while you wait for it to ease off. It won't.",
      photo: "/guides/mumbai/chai.jpg",
      sample: true,
    },
  ] as Place[],
};

export const SIGNOFF = {
  note: "see you on the parapet",
  sample: true,
};
