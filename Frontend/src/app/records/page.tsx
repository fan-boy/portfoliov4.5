import TransitionWrapper from "../components/TransitionWrapper";
import RecordsScene from "./RecordsScene";
import "./records.css";

/**
 * Records: an experimental, analog take on the portfolio. Each case study is a
 * record; playing one puts it on the turntable and opens the case study.
 * Not linked from the site yet. See README.md in this folder.
 */
export default function RecordsPage() {
  return (
    <TransitionWrapper>
      <div className="records-page">
        <RecordsScene />
      </div>
    </TransitionWrapper>
  );
}
