import TransitionWrapper from "../components/TransitionWrapper";
import BibScene from "./BibScene";
import "./bibs.css";

/**
 * Bibs: each case study is a race bib pinned to the wall. Picking one pops its
 * pins, tears off the timing strip and zooms into the number to open the case
 * study. Not linked from the site. See README.md in this folder.
 */
export default function BibsPage() {
  return (
    <TransitionWrapper>
      <div className="bibs-page">
        <BibScene />
      </div>
    </TransitionWrapper>
  );
}
