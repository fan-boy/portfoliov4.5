import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import TransitionWrapper from "../../components/TransitionWrapper";
import DCGuide from "./DCGuide";
import "../shared/scrapbook.css";
import "./dc.css";

export const metadata: Metadata = {
  title: "Washington, DC — Aaditya's Guides",
  description: "Aaditya's guide to Washington, DC, through the year: what to do in each season, mostly the local side of the city.",
};

/** Handwriting for the scrapbook notes. */
const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand", display: "swap" });

/** The third of Aaditya's Guides. See README.md in this folder. */
export default function WashingtonDCPage() {
  return (
    <TransitionWrapper>
      <div className={`dc-page sb-page ${hand.variable}`}>
        <DCGuide />
      </div>
    </TransitionWrapper>
  );
}
