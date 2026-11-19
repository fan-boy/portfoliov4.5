import type { StaticImageData } from "next/image";
import RiskArt from "../../../public/assets/Dune/dashboard.webp";
import StillsuitArt from "../../../public/assets/Dune/DesignSystem.webp";
import PersonaArt from "../../../public/assets/Dune/AEP/step-test.jpg";
import UniversityParkArt from "../../../public/assets/UniversityPark/redesign/dashboard-1.jpg";
import { UNIVERSITY_PARK_GRADIENT } from "../lib/universityPark";

export type VinylRecord = {
  slug: string;
  name: string;
  /** The case study's own h1. */
  headline: string;
  href: string;
  company: string;
  year: string;
  /** Product screen shown on the sleeve. */
  art: StaticImageData;
  /** Sleeve background: a CSS background-image value. */
  sleeveBg: string;
  /** How the shared background image is turned, so sleeves that share it don't match. */
  sleeveBgTransform?: string;
  /** Title colour on the sleeve. */
  sleeveInk: string;
  /** Flat page colour while this record is on the deck. */
  field: string;
  /** Tonearm and controls. */
  accent: string;
};

const DUNE_BG = "url(/assets/Dune/RiskCardBg.webp)";

export const RECORDS: VinylRecord[] = [
  {
    slug: "risk-platform",
    name: "Risk Platform",
    headline: "Making Security Risk Understandable and Actionable",
    href: "/dune/risk-platform",
    company: "Dune Security",
    year: "2024",
    art: RiskArt,
    sleeveBg: DUNE_BG,
    sleeveInk: "#10301B",
    field: "#A9DDB6",
    accent: "#1F6B3A",
  },
  {
    slug: "stillsuit",
    name: "Stillsuit",
    headline: "Building a Design System for Speed and Consistency",
    href: "/dune/stillsuit",
    company: "Dune Security",
    year: "2024",
    art: StillsuitArt,
    sleeveBg: DUNE_BG,
    sleeveBgTransform: "scaleX(-1)",
    sleeveInk: "#10301B",
    field: "#C9DDC6",
    accent: "#26372C",
  },
  {
    slug: "persona-builder",
    name: "Persona Builder",
    headline: "Designing the UX That Trains the AI",
    href: "/dune/persona-creation",
    company: "Dune Security",
    year: "2024",
    art: PersonaArt,
    sleeveBg: DUNE_BG,
    sleeveBgTransform: "rotate(180deg)",
    sleeveInk: "#10301B",
    field: "#9FD6C2",
    accent: "#1E6650",
  },
  {
    slug: "university-park",
    name: "University Park",
    headline: "Turning Sustainability From Awareness Into Habit",
    href: "/universitypark",
    company: "University Park",
    year: "2023–2024",
    art: UniversityParkArt,
    sleeveBg: UNIVERSITY_PARK_GRADIENT,
    sleeveInk: "#0E3B25",
    field: "#E6DCC2",
    accent: "#0E3B25",
  },
];

/** The shop's own flat field, before any record is picked. */
export const SHOP_FIELD = "#BFE4C9";

export const LAST_PLAYED_KEY = "records:last-played";
