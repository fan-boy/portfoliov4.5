import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import TransitionWrapper from "../../components/TransitionWrapper";
import NewYorkGuide from "./NewYorkGuide";
import "./nyc.css";

export const metadata: Metadata = {
  title: "New York — Aaditya's Guides",
  description: "Aaditya's guide to New York: favourite places by neighbourhood, and one perfect day.",
};

/** Handwriting for the scrapbook notes. */
const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand", display: "swap" });

/** The first of Aaditya's Guides. See README.md in this folder. */
export default function NewYorkPage() {
  return (
    <TransitionWrapper>
      <div className={`nyc-page ${hand.variable}`}>
        <NewYorkGuide />
      </div>
    </TransitionWrapper>
  );
}
