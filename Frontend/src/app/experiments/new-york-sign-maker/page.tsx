import type { Metadata } from "next";
import TransitionWrapper from "../../components/TransitionWrapper";
import { scopeClasses } from "../registry";
import SignMaker from "./SignMaker";
import "../../guides/new-york/nyc.css";
import "./sign-maker.css";

export const metadata: Metadata = {
  title: "New York sign maker",
  description: "Set your own words in subway mosaic tile, like New York's 1904 station tablets, and download it as a PNG.",
};

/**
 * A study spun out of the New York guide: the guide's mosaic tablet renderer,
 * with your words in it, exported as a PNG. See README.md.
 */
export default function NewYorkSignMakerPage() {
  return (
    <TransitionWrapper>
      <div className={scopeClasses({ theme: "neutral", expression: "balanced", chrome: "embedded" })}>
        <SignMaker />
      </div>
    </TransitionWrapper>
  );
}
