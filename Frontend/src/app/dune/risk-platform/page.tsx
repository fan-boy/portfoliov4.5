'use client'
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import TransitionWrapper from "../../components/TransitionWrapper";
import DefaultPage from "../../components/Pages/DefaultPage";
import OrgDashboard from "../../../../public/assets/Dune/dashboard.webp";
import architecture from "../../../../public/assets/Dune/architecture.webp";
import OldDashboard from "../../../../public/assets/Dune/OldOrganization.webp";
import Customers from "../../../../public/assets/Dune/customers.webp";
import DuneRiskPlatformFourPillars from "../../../../public/assets/Dune/DuneRiskPlatformFourPillars.webp";

import AnimatedBlobs from "../../components/AnimatedBlobs";
import BeforeAfterSlider from "../../components/Miscelaneous/BeforeAfterSlider";
import { fadeIn, stagger } from "../../lib/animations";
import { useChatOverflow } from "../../lib/hooks/useChatOverflow";

const RiskPlatform: React.FC = () => {
  const { chatOpen } = useChatOverflow();

  return (
    <TransitionWrapper>
      {!chatOpen && (
        <AnimatedBlobs expanded={false} loading={false} move={false} />
      )}
      <DefaultPage>
        <article className="w-full z-2">
          
          {/* ============================================
              HERO SECTION
              ============================================ */}
          <motion.section 
            className="w-full pt-32 pb-16"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Metadata */}
            <motion.div 
              className="max-w-4xl mx-auto px-6 mb-6"
              variants={fadeIn}
            >
              <div className="flex items-center gap-3 text-fonttertiary text-sm tracking-wide">
                <span>Dune Security</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>2024 to Present</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>Product Design Lead</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div 
              className="max-w-4xl mx-auto px-6 mb-12"
              variants={fadeIn}
            >
              <h1 className="text-display">
                Making Security Risk Understandable and Actionable
              </h1>
            </motion.div>

            {/* Hero Video */}
            <motion.div 
              className="w-full px-6"
              variants={fadeIn}
            >
              <div className="max-w-6xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 ring-1 ring-black/5">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full"
                  >
                    <source src="/assets/Dune/DuneRiskHero.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* ============================================
              SUMMARY
              ============================================ */}
          <section className="w-full py-24">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-2xl md:text-3xl text-fontprimary leading-relaxed font-light">
                Security teams drown in data but struggle to answer a simple question: 
                <span className="font-medium"> which users are actually putting us at risk?</span>
              </p>
              <p className="text-lg text-fontsecondary leading-relaxed mt-8">
                As the founding designer at Dune Security, I didn&apos;t just design the product. I helped define what it was. The risk model I created became the centerpiece of our sales narrative. The experience I built changed how enterprise CISOs understood our value.
              </p>
            </div>
          </section>

          {/* ============================================
              THE PROBLEM
              ============================================ */}
          <section className="w-full py-24 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Challenge</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary mt-4 mb-6 tracking-tight">
                &quot;I can&apos;t tell which users are putting us most at risk.&quot;
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed">
                I spent my first weeks talking to CISOs, security admins, and our sales team. The same themes kept emerging: everyone had phishing results and training completion rates. Nobody had a unified view of which people were actually dangerous to the business.
              </p>
            </div>

            {/* Insight Cards */}
            <div className="max-w-3xl mx-auto px-6 mt-12 space-y-4">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-base text-fontprimary font-medium mb-1">No clear picture of who&apos;s risky</p>
                <p className="text-fontsecondary text-sm leading-relaxed">Everyone had data. Nobody had a unified view of which people were actually dangerous to the business.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-base text-fontprimary font-medium mb-1">Training wasn&apos;t targeted</p>
                <p className="text-fontsecondary text-sm leading-relaxed">Security teams care about the small set of high-risk users. They wanted focus, not floods of data for everyone.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-base text-fontprimary font-medium mb-1">Couldn&apos;t explain to the board</p>
                <p className="text-fontsecondary text-sm leading-relaxed">CISOs needed a risk story they could communicate upward. Opaque scores don&apos;t survive executive scrutiny.</p>
              </div>
            </div>
          </section>

          {/* ============================================
              THE APPROACH
              ============================================ */}
          <section className="w-full py-24">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Approach</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary mt-4 mb-6 tracking-tight">
                Designing a credit score for user risk
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed mb-6">
                The original risk score combined multiple signals in ways that were mathematically valid but impossible to explain. When customers asked &quot;why is this person high-risk?&quot; we couldn&apos;t give a clear answer.
              </p>
              <p className="text-lg text-fontsecondary leading-relaxed">
                I pushed for a constraint: <span className="text-fontprimary font-medium">the model had to be explainable in four factors or fewer</span>. Credit scores are read one at a time. Security admins look at thousands of users at once. Cognitive load matters.
              </p>
            </div>
          </section>

          {/* Four Pillars Visual */}
          <section className="w-full pb-24">
            <div className="max-w-6xl mx-auto px-6">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={DuneRiskPlatformFourPillars}
                  alt="Four-pillar risk model"
                  className="w-full"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* The Four Pillars List */}
          <section className="w-full py-24 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <h3 className="text-2xl md:text-3xl text-fontprimary mb-12 tracking-tight">The Four Pillars</h3>
              
              <div className="space-y-10">
                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg text-fontprimary font-medium mb-1">Business Impact</h4>
                    <p className="text-fontsecondary leading-relaxed">Role, access level, what&apos;s at stake if this person is compromised. A CFO clicking a phishing link is different from an intern.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg text-fontprimary font-medium mb-1">Simulated Attacks</h4>
                    <p className="text-fontsecondary leading-relaxed">Performance in phishing, spear-phishing, smishing, and vishing scenarios. Real behavior under simulated pressure.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg text-fontprimary font-medium mb-1">Training Activity</h4>
                    <p className="text-fontsecondary leading-relaxed">Completion rates and recency. Are they engaged with security education, or ignoring it entirely?</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="text-lg text-fontprimary font-medium mb-1">Cyber Hygiene</h4>
                    <p className="text-fontsecondary leading-relaxed">Signals from connected tools: sign-in patterns, device posture, password behavior. The daily habits that indicate risk.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              THE EXPERIENCE REDESIGN
              ============================================ */}
          <section className="w-full py-24">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Redesign</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary mt-4 mb-6 tracking-tight">
                From dark and dense to clear and actionable
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed">
                The existing UI was dark, dense, and organized around what we thought looked sophisticated, not what made security teams faster. Rather than fix isolated issues, I pushed for a full experience reset.
              </p>
            </div>

            {/* Before/After Slider */}
            <div className="max-w-6xl mx-auto px-6 mt-16">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10 ring-1 ring-black/5">
                <BeforeAfterSlider beforeImage={OldDashboard} afterImage={OrgDashboard} />
              </div>
            </div>

            {/* Key Changes */}
            <div className="max-w-4xl mx-auto px-6 mt-16">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xs tracking-wider uppercase text-fonttertiary mb-5">Before</h3>
                  <ul className="space-y-3">
                    <li className="text-fontsecondary flex items-start gap-3 text-sm">
                      <span className="text-fontmuted mt-0.5">→</span>
                      Dark mode everywhere
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3 text-sm">
                      <span className="text-fontmuted mt-0.5">→</span>
                      Dense, card-heavy layouts
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3 text-sm">
                      <span className="text-fontmuted mt-0.5">→</span>
                      Navigation organized by feature
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3 text-sm">
                      <span className="text-fontmuted mt-0.5">→</span>
                      Color used as decoration
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs tracking-wider uppercase text-indigo-600 mb-5">After</h3>
                  <ul className="space-y-3">
                    <li className="text-fontprimary flex items-start gap-3 text-sm">
                      <span className="text-indigo-500 mt-0.5">→</span>
                      Light mode default, color reserved for meaning
                    </li>
                    <li className="text-fontprimary flex items-start gap-3 text-sm">
                      <span className="text-indigo-500 mt-0.5">→</span>
                      Generous spacing, clear typography hierarchy
                    </li>
                    <li className="text-fontprimary flex items-start gap-3 text-sm">
                      <span className="text-indigo-500 mt-0.5">→</span>
                      Navigation by job: Understand → Investigate → Configure
                    </li>
                    <li className="text-fontprimary flex items-start gap-3 text-sm">
                      <span className="text-indigo-500 mt-0.5">→</span>
                      Color as signal (risk levels, status, actions)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              DRILLDOWN FLOW
              ============================================ */}
          <section className="w-full py-24 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The System</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary mt-4 mb-6 tracking-tight">
                One language, every zoom level
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed">
                A CISO needs the org-wide view. A security admin needs the individual user view. The same data, different depths. I designed a consistent drilldown pattern where risk scores look the same whether you&apos;re viewing 10,000 people or one person.
              </p>
            </div>

            {/* Drilldown Visual */}
            <div className="max-w-6xl mx-auto px-6 mt-16">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10 ring-1 ring-black/5">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full"
                >
                  <source src="/assets/Dune/OrgToUserDrillDown.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Drilldown explanation */}
            <div className="max-w-4xl mx-auto px-6 mt-16">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="text-center">
                  <div className="text-3xl font-light text-indigo-600 mb-1">Org</div>
                  <p className="text-fonttertiary text-sm">10,000 users</p>
                </div>
                <div className="text-fontmuted text-xl hidden md:block">→</div>
                <div className="text-center">
                  <div className="text-3xl font-light text-indigo-600 mb-1">Dept</div>
                  <p className="text-fonttertiary text-sm">500 users</p>
                </div>
                <div className="text-fontmuted text-xl hidden md:block">→</div>
                <div className="text-center">
                  <div className="text-3xl font-light text-indigo-600 mb-1">User</div>
                  <p className="text-fonttertiary text-sm">1 person</p>
                </div>
                <div className="text-fontmuted text-xl hidden md:block">→</div>
                <div className="text-center">
                  <div className="text-3xl font-light text-indigo-600 mb-1">Factor</div>
                  <p className="text-fonttertiary text-sm">Why they&apos;re risky</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              STRATEGIC IMPACT
              ============================================ */}
          <section className="w-full py-24">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Impact</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary mt-4 mb-6 tracking-tight">
                Design as product strategy
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed">
                The four-pillar model changed how we sold the product. I worked directly with the GTM team to translate the pillars into sales enablement materials. The risk visualization became the first thing we showed in demos. It was our &quot;aha moment.&quot;
              </p>
            </div>

            {/* Architecture diagram */}
            <div className="max-w-6xl mx-auto px-6 mt-16">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={architecture}
                  alt="User Risk OS architecture"
                  className="w-full"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* ============================================
              OUTCOMES
              ============================================ */}
          <section className="w-full py-24 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Outcomes</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary mt-4 mb-12 tracking-tight">
                The numbers
              </h2>
            </div>

            <div className="max-w-4xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-5xl font-light text-indigo-600 mb-3">$6M</div>
                  <p className="text-fontsecondary text-sm">Seed round closed with investor materials I designed</p>
                </div>
                <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-5xl font-light text-indigo-600 mb-3">15+</div>
                  <p className="text-fontsecondary text-sm">Fortune 500 clients using the platform</p>
                </div>
                <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-5xl font-light text-indigo-600 mb-3">90%</div>
                  <p className="text-fontsecondary text-sm">Drop in dashboard-related support tickets</p>
                </div>
                <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-5xl font-light text-indigo-600 mb-3">32%</div>
                  <p className="text-fontsecondary text-sm">Increase in employee training completion</p>
                </div>
              </div>
            </div>

            {/* Customers */}
            <div className="max-w-4xl mx-auto px-6 mt-12">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={Customers}
                  alt="Fortune 500 customers"
                  className="w-full"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* ============================================
              LEARNINGS
              ============================================ */}
          <section className="w-full py-24">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Reflection</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary mt-4 mb-12 tracking-tight">
                What I learned
              </h2>

              <div className="space-y-10">
                <div>
                  <h3 className="text-lg text-fontprimary font-medium mb-2">Explainability beats sophistication</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    We could have built a more complex model with more factors. It would have been more &quot;accurate.&quot; But accuracy that can&apos;t be explained is useless in enterprise software. The constraint of four factors forced clarity.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-fontprimary font-medium mb-2">Design the conversation, not just the screen</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    A lot of my work was designing how sales would demo the product, how CISOs would explain it to their boards, how admins would discuss users with managers. The UI was just one artifact of that thinking.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-fontprimary font-medium mb-2">Own the strategy, not just the execution</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    I ran the customer research, proposed the four-pillar model, and built the case for why this should be our priority. At early-stage companies, the best designers don&apos;t wait for requirements. They shape them.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              NEXT PROJECT CTA
              ============================================ */}
          <section className="w-full py-24 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-fonttertiary text-sm tracking-wider uppercase mb-4">Next Project</p>
              <a href="/dune/stillsuit" className="text-2xl md:text-3xl text-fontprimary hover:text-indigo-600 transition-colors tracking-tight">
                Stillsuit Design System →
              </a>
            </div>
          </section>

        </article>
      </DefaultPage>
    </TransitionWrapper>
  );
};

export default RiskPlatform;
