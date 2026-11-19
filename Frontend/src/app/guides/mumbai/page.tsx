import type { Metadata } from "next";
import { Caveat, Noto_Sans_Devanagari, Yatra_One } from "next/font/google";
import TransitionWrapper from "../../components/TransitionWrapper";
import MumbaiGuide from "./MumbaiGuide";
import "../shared/scrapbook.css";
import "./mumbai.css";

export const metadata: Metadata = {
  title: "Mumbai — Aaditya's Guides",
  description: "Aaditya's guide to Mumbai, from someone who grew up there: the city through a day, and what to do when it rains.",
};

/** Handwriting for the scrapbook notes. */
const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand", display: "swap" });
/** Yatra One: a display face drawn from Mumbai's hand-painted signs, Latin and Devanagari. */
const sign = Yatra_One({ subsets: ["latin", "devanagari"], weight: "400", variable: "--font-sign", display: "swap" });

/** The plain Devanagari on the station board. */
const deva = Noto_Sans_Devanagari({ subsets: ["devanagari", "latin"], weight: ["600", "700"], variable: "--font-deva", display: "swap" });

/** The second of Aaditya's Guides. See README.md in this folder. */
export default function MumbaiPage() {
  return (
    <TransitionWrapper>
      <div className={`mb-page sb-page ${hand.variable} ${sign.variable} ${deva.variable}`}>
        <MumbaiGuide />
      </div>
    </TransitionWrapper>
  );
}
