import type { Keepsake } from "../shared/Scrapbook";

/**
 * Everything on the Washington, DC guide. Entries marked `sample: true` are
 * placeholder text and stock photos (Wikimedia Commons, see credits.ts):
 * swap in your own note and film scan, then drop the flag.
 *
 * The city through a year, mostly the local side of it.
 */

export type Place = {
  name: string;
  /** Neighbourhood, as you'd say it. */
  area: string;
  /** Nearest Metro station and its lines, for the little line dots. */
  metro: { station: string; lines: LineId[] };
  note: string;
  photo?: string;
  sample?: boolean;
};

export type LineId = "red" | "orange" | "blue" | "green" | "yellow" | "silver";
export const LINE_COLORS: Record<LineId, string> = {
  red: "#BF0D3E",
  orange: "#ED8B00",
  blue: "#009CDE",
  green: "#00B140",
  yellow: "#FFD100",
  silver: "#919D9D",
};

export type SeasonId = "spring" | "summer" | "fall" | "winter";

export type Season = {
  id: SeasonId;
  name: string;
  months: string;
  /** The page colour while this season is on screen. */
  field: string;
  /** Text and pen colours on that field. */
  ink: string;
  muted: string;
  pen: string;
  /** What's falling past the page. */
  weather: "petals" | "fireflies" | "leaves" | "snow";
  /** One line in your own words, under the sign. */
  line: string;
  keepsake?: Keepsake;
  places: Place[];
};

export const INTRO = {
  byline: "lived next door in College Park — spent every weekend here",
  body: [
    "I lived just over the line in Maryland, so DC was where the weekends went. The Green Line in, a whole day out, the last train back.",
    "It's a city of seasons more than sights. This is what I'd do in each one.",
  ],
  signoff: "— Aaditya",
  sample: true,
};

/** Stuck beside the intro. */
export const PLATE: Keepsake = { kind: "plate", text: "GU 4224", sample: true };

export const SEASONS: Season[] = [
  {
    id: "spring",
    name: "Spring",
    months: "March to May",
    field: "#FBEDEF",
    ink: "#2a1d22",
    muted: "#8a6f78",
    pen: "#24398C",
    weather: "petals",
    line: "Skip the Tidal Basin crowds. The blossoms are just as good where nobody's taking photos.",
    keepsake: { kind: "smartrip", sample: true },
    places: [
      {
        name: "Hains Point",
        area: "East Potomac Park",
        metro: { station: "Smithsonian", lines: ["orange", "blue", "silver"] },
        note: "Cherry blossoms along the water, a bike, nobody else around.",
        photo: "/guides/washington-dc/hains-point.jpg",
        sample: true,
      },
      {
        name: "Eastern Market",
        area: "Capitol Hill",
        metro: { station: "Eastern Market", lines: ["orange", "blue", "silver"] },
        note: "Saturday morning. Blueberry buckwheat pancakes, then the flea market.",
        photo: "/guides/washington-dc/eastern-market.jpg",
        sample: true,
      },
      {
        name: "Dumbarton Oaks",
        area: "Georgetown",
        metro: { station: "Dupont Circle", lines: ["red"] },
        note: "Terraced gardens behind a wall. Go when the wisteria's out.",
        photo: "/guides/washington-dc/dumbarton-oaks.jpg",
        sample: true,
      },
    ],
  },
  {
    id: "summer",
    name: "Summer",
    months: "June to August",
    field: "#0F1D1E",
    ink: "#EEF3E6",
    muted: "#9FB3A8",
    pen: "#F3E3A2",
    weather: "fireflies",
    line: "Too hot by noon, so summer happens in the evenings.",
    keepsake: { kind: "stub", venue: "NATIONALS PARK", event: "SEC 401 · ROW J", date: "07.04.2024", color: "#F1D4D4", sample: true },
    places: [
      {
        name: "Meridian Hill Park",
        area: "Columbia Heights",
        metro: { station: "Columbia Heights", lines: ["green", "yellow"] },
        note: "The Sunday drum circle, the cascading fountain, the whole neighbourhood out.",
        photo: "/guides/washington-dc/meridian-hill.jpg",
        sample: true,
      },
      {
        name: "Kenilworth Aquatic Gardens",
        area: "Northeast",
        metro: { station: "Deanwood", lines: ["orange"] },
        note: "Go early in July when the lotuses open. It doesn't feel like a city at all.",
        photo: "/guides/washington-dc/kenilworth.jpg",
        sample: true,
      },
      {
        name: "Nationals Park",
        area: "Navy Yard",
        metro: { station: "Navy Yard", lines: ["green"] },
        note: "Cheap seats up top, a half-smoke, the sun going down over the river.",
        photo: "/guides/washington-dc/nationals-park.jpg",
        sample: true,
      },
    ],
  },
  {
    id: "fall",
    name: "Fall",
    months: "September to November",
    field: "#F6E6D2",
    ink: "#2d1f12",
    muted: "#8f7458",
    pen: "#24398C",
    weather: "leaves",
    line: "The best season here, and it's not close.",
    keepsake: { kind: "stub", venue: "MARYLAND STADIUM", event: "TERPS · GEN ADM", date: "10.19.2024", color: "#F4DF9C", sample: true },
    places: [
      {
        name: "C&O Canal towpath",
        area: "Georgetown",
        metro: { station: "Foggy Bottom", lines: ["orange", "blue", "silver"] },
        note: "Start in Georgetown and keep walking until the leaves run out.",
        photo: "/guides/washington-dc/towpath.jpg",
        sample: true,
      },
      {
        name: "Rock Creek Park",
        area: "Northwest",
        metro: { station: "Cleveland Park", lines: ["red"] },
        note: "Boulder Bridge on a cold morning. You forget there's a city around it.",
        photo: "/guides/washington-dc/rock-creek.jpg",
        sample: true,
      },
      {
        name: "Union Market",
        area: "NoMa",
        metro: { station: "NoMa–Gallaudet U", lines: ["red"] },
        note: "A food hall in an old market. Graze, then sit outside while it's still warm.",
        photo: "/guides/washington-dc/union-market.jpg",
        sample: true,
      },
    ],
  },
  {
    id: "winter",
    name: "Winter",
    months: "December to February",
    field: "#E7EDF3",
    ink: "#1a2330",
    muted: "#6f7f92",
    pen: "#24398C",
    weather: "snow",
    line: "Cold, grey, and the museums are free. That's the whole plan.",
    keepsake: { kind: "sticker", text: "free museums", color: "#E5523C", sample: true },
    places: [
      {
        name: "National Gallery, East Building",
        area: "The Mall",
        metro: { station: "Archives", lines: ["green", "yellow"] },
        note: "The atrium on a snowy afternoon. Free, warm, and mostly empty.",
        photo: "/guides/washington-dc/east-building.jpg",
        sample: true,
      },
      {
        name: "Little Ethiopia",
        area: "Shaw",
        metro: { station: "Shaw–Howard U", lines: ["green", "yellow"] },
        note: "Injera and a big shared platter when it's dark at five.",
        photo: "/guides/washington-dc/little-ethiopia.jpg",
        sample: true,
      },
      {
        name: "Kramers",
        area: "Dupont Circle",
        metro: { station: "Dupont Circle", lines: ["red"] },
        note: "A bookshop with a café in the back, open late. Browse, then stay for dessert.",
        photo: "/guides/washington-dc/kramers.jpg",
        sample: true,
      },
    ],
  },
];

export const SIGNOFF = { note: "see you next season", sample: true };
