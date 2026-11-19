import type { StaticImageData } from "next/image";
import RiskDashboard from "../../../public/assets/Dune/dashboard.webp";
import RiskOld from "../../../public/assets/Dune/OldOrganization.webp";
import RiskPillars from "../../../public/assets/Dune/DuneRiskPlatformFourPillars.webp";
import RiskArchitecture from "../../../public/assets/Dune/architecture.webp";
import RiskBefore from "../../../public/assets/Dune/before.webp";
import StillsuitDS from "../../../public/assets/Dune/DesignSystem.webp";
import StillsuitStates from "../../../public/assets/Dune/Stillsuit/risk-score-states.png";
import StillsuitPalette from "../../../public/assets/Dune/Stillsuit/risk-color-palette.png";
import StillsuitDocs from "../../../public/assets/Dune/Stillsuit/semantic-color-docs.png";
import PersonaTest from "../../../public/assets/Dune/AEP/step-test.jpg";
import PersonaSetup from "../../../public/assets/Dune/AEP/step-setup.jpg";
import PersonaSignals from "../../../public/assets/Dune/AEP/ai-signals.jpg";
import PersonaQuick from "../../../public/assets/Dune/AEP/quick-actions.jpg";
import PersonaOutcomes from "../../../public/assets/Dune/AEP/refinement-outcomes.jpg";
import UPDashboard from "../../../public/assets/UniversityPark/redesign/dashboard-1.jpg";
import UPPractices from "../../../public/assets/UniversityPark/redesign/practices.jpg";
import UPCommunity from "../../../public/assets/UniversityPark/redesign/community.jpg";
import UPChallenge from "../../../public/assets/UniversityPark/redesign/challenge-1.jpg";
import UPOnboarding from "../../../public/assets/UniversityPark/redesign/onboarding-3.jpg";

/**
 * The frames on each roll: real images from the case study. The first is the
 * hero, the frame the view zooms into.
 */
export const FRAMES: { [slug: string]: StaticImageData[] } = {
  "risk-platform": [RiskDashboard, RiskOld, RiskPillars, RiskArchitecture, RiskBefore],
  stillsuit: [StillsuitDS, StillsuitStates, StillsuitPalette, StillsuitDocs, StillsuitDS],
  "persona-builder": [PersonaTest, PersonaSetup, PersonaSignals, PersonaQuick, PersonaOutcomes],
  "university-park": [UPDashboard, UPPractices, UPCommunity, UPChallenge, UPOnboarding],
};
