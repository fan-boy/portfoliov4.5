import { chip, EMPTY_BAR, type BarState } from "./filters";

/* Saved views are named filter states, nothing more. Everything is first and
   first is the default — a view called Everything that arrives pre-narrowed
   would be lying about its name. Selecting any other view loads its filters
   into the bar, which is why the bar is controlled from the page and not from
   inside itself. */

export const VIEWS = [
  "Everything",
  "My team's queue",
  "Unassigned critical",
  "My cases",
  "New since shift",
] as const;

export type View = (typeof VIEWS)[number];

export const VIEW_BARS: Record<View, BarState> = {
  Everything: EMPTY_BAR,

  /* The one the Figma bar draws: what's serious and under-investigated, or
     anything the agent raised while you were away. */
  "My team's queue": {
    group: [chip("severity", "is or above", ["HIGH"]), chip("coverage", "is not", ["Complete"])],
    groupJoiner: "and",
    outerJoiner: "or",
    tail: [chip("escalated", "is", ["Yes"])],
  },

  "Unassigned critical": {
    group: [chip("severity", "is", ["CRIT"]), chip("assignee", "is", [""])],
    groupJoiner: "and",
    outerJoiner: "or",
    tail: [],
  },

  "My cases": {
    group: [chip("assignee", "is", ["MC"])],
    groupJoiner: "and",
    outerJoiner: "or",
    tail: [],
  },

  "New since shift": {
    group: [chip("age", "is", ["<1h"])],
    groupJoiner: "and",
    outerJoiner: "or",
    tail: [],
  },
};
