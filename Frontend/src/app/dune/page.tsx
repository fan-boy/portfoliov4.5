'use client'
import React from "react";

import TransitionWrapper from "../components/TransitionWrapper";
import DefaultPage from "../components/Pages/DefaultPage";
import OrgDashboard from "../../../public/assets/Dune/dashboard.webp";
import architecture from "../../../public/assets/Dune/architecture.webp";
import DesignSystem from "../../../public/assets/Dune/DesignSystem.webp";
import OldDashboard from "../../../public/assets/Dune/OldOrganization.webp";
import Customers from "../../../public/assets/Dune/customers.webp";

import { ArrowUp, ArrowDown, ArrowsOutLineVertical, Timer } from "phosphor-react";

import PageSection from "../components/Pages/PageSection";
import FullImage from "../components/Miscelaneous/FullImage";
import Divider from "../components/Miscelaneous/Divider";
import FullMedia from "../components/Miscelaneous/UnifiedMedia";
import BeforeAfterSlider from "../components/Miscelaneous/BeforeAfterSlider";
import AnimatedBlobs from "../components/AnimatedBlobs";
import { useChatOverflow } from "../lib/hooks/useChatOverflow";

const DuneSecurity: React.FC = () => {
  const { chatOpen } = useChatOverflow();
  const duneGradient = "indigo-200/50";

  
  
  return (
  
  <TransitionWrapper>
      {!chatOpen && (
                  <AnimatedBlobs expanded={false} loading={false} />
                )}
    <DefaultPage>
      {/* Header */}
      <PageSection>
        <div className="w-full flex flex-col gap-16">
          <PageSection.FullWidth>
            <div className="w-10/12 mt-48 flex flex ">
              <span className="w-4/12">
                <h2 className=" tracking-tight text-fontsecondary">Dune Security</h2>
              </span>
              <span className="w-8/12">
                <h2 className="tracking-tight text-fontprimary">Redefining User Adaptive Risk Management</h2>
              </span>


            </div>
            <div className="w-10/12 flex flex mb-6">

              <span className="w-4/12">
                {/* <h2 className="text-4xl font-extrabold text-gray-500 tracking-tight mb-6">Dune Security</h2> */}
              </span>
              <span className="w-6/12 flex flex-row gap-4 text-fontsecondary mb-8 mt-3">
                <span>2024-present,</span>
                <span>Product Design, Research, Product Strategy</span>

              </span>

            </div>

            <FullImage src={OrgDashboard} bg gradient={duneGradient} alt="Collage of fragmented dashboards (placeholder)" />
          </PageSection.FullWidth>
          <PageSection.ConstrainedWidth>
            <span className="flex flex-col gap-16">
              <span className="leading-relaxed mb-2 p-8 mt-12 flex flex-col gap-4 bg-gray-50 rounded-lg">
                <h3>Summary</h3>
                <h4 className="text-fontprimary ">
                  As the sole product designer, I led a ground-up redesign of Dune Security’s platform—transforming fragmented, complex security data into actionable, user-centric workflows. My work not only improved the product experience but also drove strategic shifts in how the company positioned, sold, and scaled the platform.
                </h4>

              </span>
              <span>
                <h2 className="text-fontprimary mb-6">The Challenge</h2>
                <p className="mb-4 text-fontsecondary leading-relaxed t">
                  Security awareness training was failing to keep pace with AI-powered threats. CISOs and security teams were overwhelmed by fragmented data (IAM, EDR, DLP, SEG) and lacked actionable insights to reduce human-driven cyber risk. Existing tools felt like static report cards, not dynamic control centers for prevention and action.
                </p>
                <blockquote className="border-l-4 border-indigo-400 pl-6 italic text-gray-600 bg-indigo-50/30 py-3 rounded-md mb-2">
                  “I can’t tell which users are putting us most at risk.” – Fortune 500 CISO
                </blockquote>
              </span>
            </span>

          </PageSection.ConstrainedWidth>
          <PageSection.FullWidth>
            <div className="w-full">
              <FullImage src={architecture} alt="Roadmap snapshot or prioritization matrix (placeholder)" bg={true} />
            </div>
          </PageSection.FullWidth>
          <Divider />
          <div className="w-full flex flex-col gap-16">
            <PageSection.ConstrainedWidth>
              <span className="w-full flex items-left flex-col">
                <h2 className="w-full text-fontprimary mb-6">Hypotheses & Success Metrics</h2>
                <ul className="list-disc pl-6 space-y-2 text-fontsecondary mb-4">
                  <li>Real-time, actionable risk insights (vs. compliance checklists) will increase CISO engagement and drive faster risk mitigation.</li>
                  <li>Adaptive, automated training will raise employee completion rates and reduce manual workload for security teams.</li>
                  <li>A unified design system will speed up development and improve platform consistency.</li>
                </ul>
              </span>
            </PageSection.ConstrainedWidth>
            <PageSection.FullWidth>
              <span className="w-full flex flex-col gap-4">



                <span className=" grid grid-cols-4 gap-4">
                  <span className="flex flex-col items-start p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition">
                    <ArrowUp size={28} weight="duotone" className="text-gray-400 mb-2" />
                    <h4 className="text-fontprimary leading-snug">Employee training completion rates</h4>
                  </span>
                  <span className="flex flex-col items-start p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition">
                    <ArrowDown size={28} weight="duotone" className="text-gray-400 mb-2" />
                    <h4 className="text-fontprimary leading-snug">Dashboard-related support tickets</h4>
                  </span>
                  <span className="flex flex-col items-start p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition">
                    <ArrowsOutLineVertical size={28} weight="duotone" className="text-gray-400 mb-2" />
                    <h4 className="text-fontprimary  leading-snug">Expansion to new enterprise clients</h4>
                  </span>
                  <span className="flex flex-col items-start p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition">
                    <Timer size={28} weight="duotone" className="text-gray-400 mb-2" />
                    <h4 className="text-fontprimary leading-snug">Faster time-to-production for new features</h4>
                  </span>



                </span>

              </span>
            </PageSection.FullWidth>


          </div>

          <Divider />


          {/* <PageSection.FullWidth>
            <div className="w-full">
              <FullImage src={OrgDashboard} alt="Roadmap snapshot or prioritization matrix (placeholder)" />
            </div>
          </PageSection.FullWidth> */}
          <PageSection.ConstrainedWidth>
            <span className="w-full flex flex-col">
              <h2 className="text-fontprimary mb-6">Business & Product Strategy</h2>
              <p className="mb-4 text-fontsecondary leading-relaxed ">
                I co-created the product roadmap with the CEO and CTO, using a RICE scoring model to prioritize features that balanced user impact and engineering effort. For example, we launched the adaptive training module before advanced analytics, as user interviews revealed immediate pain around manual interventions. This accelerated customer value and improved our sales narrative.
              </p>
              <p className="mb-4 text-fontsecondary leading-relaxed ">
                I also worked closely with the GTM team, translating user research into sales enablement materials and product messaging. The new risk score visualization became a core part of our sales pitch, helping the GTM team clearly articulate ROI to prospects and close deals more effectively.
              </p>
            </span>
          </PageSection.ConstrainedWidth>
          {/* <PageSection.FullWidth>
            <div className="w-full">
              <FullImage src={OrgDashboard} alt="Roadmap snapshot or prioritization matrix (placeholder)" />
            </div>
          </PageSection.FullWidth> */}

          <Divider />
          <PageSection.ConstrainedWidth>
            <span className="w-full flex flex-col">
              <h2 className="text-fontprimary mb-6">User Research & Insights</h2>
              <ul className="list-disc pl-6 space-y-2 text-fontsecondary mb-4">
                <li>CISO Committee: Tapped 50+ CISOs for feedback—highlighting the need for real-time, actionable insights.</li>
                <li>Customer Success Feedback: Weekly check-ins surfaced core pain points and usability issues.</li>
                <li>Competitive Analysis: Benchmarked KnowBe4, Hoxhunt, Proofpoint PSAT, and others for opportunities in clarity, speed, and differentiation.</li>
              </ul>
              <blockquote className="border-l-4 border-indigo-400 pl-6 italic text-gray-600 bg-indigo-50/30 py-3 rounded-md mb-2">
                “The dashboard feels like a report card, not a control center.”
              </blockquote>
            </span>
          </PageSection.ConstrainedWidth>
          {/* <PageSection.FullWidth>
            <div className="w-full">
              <FullImage src={battlecard} alt="Roadmap snapshot or prioritization matrix (placeholder)" bg={false} />
            </div>
          </PageSection.FullWidth> */}
          <Divider />

          <PageSection.ConstrainedWidth>

            <span className="w-full flex flex-col">
              <h2 className="text-fontprimary mb-6">Design Process</h2>
              <h3 className="text-fontprimary mt-4 mb-2">Making Data Actionable</h3>
              <ul className="list-disc pl-6 space-y-2 text-fontsecondary mb-4">
                <li>Collaborated with backend engineers to distill raw risk data into 12 key signals (e.g., repeated phishing failures, low training engagement).</li>
                <li>Designed a unified risk score and visualization for instant identification of riskiest users/departments, with drill-downs for root cause analysis.</li>
                <li>Built adaptive workflows to auto-assign targeted training, reducing manual intervention.</li>
              </ul>
            </span>
            </PageSection.ConstrainedWidth>

            <PageSection.FullWidth>
              <FullMedia src={"/assets/Dune/OrgToUserDrillDown.mp4"} containerPadding="p-24" bg={false} alt="Organization to Department to User Risk drilldown "/>
            </PageSection.FullWidth>
            <PageSection.ConstrainedWidth>
            <span>
              <h3 className="text-fontprimary mt-4 mb-2">Building for Scale & Usability: The Stillsuit Design System</h3>
              <ul className="list-disc pl-6 space-y-2 text-fontsecondary mb-4">
                <li>Developed the “Stillsuit” design system to standardize UI components and documentation, reducing onboarding time for new engineers by 50%.</li>
                <li>Supported both CISO dashboards (org-wide risk, benchmarking) and employee views (personal risk, training progress), with accessibility for an older workforce.</li>
              </ul>
              </span>
              </PageSection.ConstrainedWidth>
            <PageSection.FullWidth>
              <FullMedia src={DesignSystem} containerPadding=" p-24 rounded-lg"  bg={false} alt="Organization to Department to User Risk drilldown "/>
            </PageSection.FullWidth>
            <PageSection.ConstrainedWidth>
              <span>
              <h3 className="text-fontprimary mt-4 mb-2">Iteration & Feedback Loops</h3>
              <ul className="list-disc pl-6 space-y-2 text-fontsecondary">
                <li>Instituted a two-week design-to-production cycle for rapid iteration.</li>
                <li>Incorporated customer feedback quickly, e.g., adding a “Trending Threats” widget after multiple CISO requests.</li>
              </ul>
            </span>
          </PageSection.ConstrainedWidth>
          {/* <PageSection.FullWidth>
              <FullMedia src={DesignSystem} containerPadding=" rounded-lg" padding="shadow-lg p-20" bg={false} alt="Organization to Department to User Risk drilldown "/>
            </PageSection.FullWidth> */}
          <Divider />
          <PageSection.ConstrainedWidth>
            <span className="w-full flex flex-col">
              <h2 className="text-fontprimary mb-6">Key Decisions & Pivots</h2>
              <ul className="list-disc pl-6 space-y-2 text-fontsecondary mb-4">
                <li>Shifted from static reporting to dynamic, actionable dashboards based on CISO committee feedback.</li>
                <li>Prioritized adaptive training workflows to address low engagement and high manual workload.</li>
                <li>Invested in a robust design system early to enable rapid scaling and consistent experience.</li>
              </ul>
            </span>
          </PageSection.ConstrainedWidth>
          <PageSection.FullWidth>
              <FullMedia src={"/assets/Dune/KeyPivots.mp4"} containerPadding="p-24" bg={false} alt="Organization to Department to User Risk drilldown "/>
            </PageSection.FullWidth>
          <Divider />
          <PageSection.ConstrainedWidth>
            <span className="w-full flex flex-col">
              <h2 className="text-fontprimary mb-6">Org-Level Impact</h2>
              <p className="mb-4 leading-relaxed text-fontsecondary">
                My design work led to a strategic shift in how Dune Security viewed and communicated user risk. The new risk score visualization fundamentally changed how the GTM team positioned the product, making user risk transparent and actionable. This clarity enabled sales to articulate value more effectively, directly influencing both sales messaging and future roadmap priorities.
              </p>
              {/* <blockquote className="border-l-4 border-indigo-400 pl-6 italic text-gray-600 bg-indigo-50/30 py-3 rounded-md mb-2">
                “The new dashboard made it so much easier to show prospects exactly how Dune reduces risk—our sales conversations are now much more compelling.” – GTM Lead
              </blockquote> */}


            </span>
          </PageSection.ConstrainedWidth>
          <PageSection.FullWidth>
            <div className="w-full">
              <BeforeAfterSlider
              beforeImage={OldDashboard}
              afterImage={OrgDashboard}
              />
              {/* <FullMedia src={DuneWheel} containerPadding="p-20" bg={false} alt="Roadmap snapshot or prioritization matrix (placeholder)" /> */}
            </div>
          </PageSection.FullWidth>
          
          <Divider />
          <PageSection.ConstrainedWidth>
            <span className="w-full flex flex-col">
              <h2 className="text-fontprimary mb-6">Outcomes & Impact</h2>
              <ul className="list-disc pl-6 space-y-2 text-fontsecondary mb-4">
                <li>32% increase in employee training completion</li>
                <li>90% drop in dashboard-related support tickets</li>
                <li>Expanded to 15+ Fortune 500 clients; platform cited as a “must-have” by security leaders</li>
                <li>Designed investor decks and sales materials that helped close a $6M seed round</li>
              </ul>
            </span>
          </PageSection.ConstrainedWidth>
          <PageSection.FullWidth>
            <div className="w-full">
              <FullMedia src={Customers} bg={false} containerPadding="p-24" alt="Roadmap snapshot or prioritization matrix (placeholder)" />
            </div>
          </PageSection.FullWidth>
          <Divider />
          <PageSection.ConstrainedWidth>
            <span className="w-full flex flex-col">
              <h2 className="text-fontprimary mb-6">Reflection & Learnings</h2>
              <p className="mb-4 text-fontsecondary leading-relaxed">
                Working as the sole designer was a masterclass in ownership, prioritization, and cross-functional leadership. Building the design system and rapid feedback loops enabled us to scale quickly and deliver real value. With more resources, I would have invested further in micro-interactions and visual polish—but focusing on speed and user impact was critical in our startup phase.
              </p>
            </span>
          </PageSection.ConstrainedWidth>
        </div>
      </PageSection>

    </DefaultPage>
  </TransitionWrapper>
)};

export default DuneSecurity;
