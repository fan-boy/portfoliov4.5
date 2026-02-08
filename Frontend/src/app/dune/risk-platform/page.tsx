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
import DuneWheel from "../../../../public/assets/Dune/DuneWheel.webp";

import AnimatedBlobs from "../../components/AnimatedBlobs";
import BeforeAfterSlider from "../../components/Miscelaneous/BeforeAfterSlider";
import { fadeIn, stagger } from "../../lib/animations";
import { useChatOverflow } from "../../lib/hooks/useChatOverflow";

const RiskPlatform: React.FC = () => {
  const { chatOpen } = useChatOverflow();

  return (
    <TransitionWrapper>
      {!chatOpen && (
        <AnimatedBlobs expanded={false} loading={false} />
      )}
      <DefaultPage>
        <article className="w-full">
          
          {/* ============================================
              HERO SECTION
              ============================================ */}
          <motion.section 
            className="w-full pt-40 pb-24"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Metadata */}
            <motion.div 
              className="max-w-5xl mx-auto px-6 mb-8"
              variants={fadeIn}
            >
              <div className="flex items-center gap-4 text-fonttertiary text-sm tracking-wide">
                <span>Dune Security</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>2024 to Present</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>Product Design Lead</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div 
              className="max-w-5xl mx-auto px-6 mb-16"
              variants={fadeIn}
            >
              <h1 className="text-display text-fontprimary leading-[1.1] tracking-tight max-w-4xl">
                Making Security Risk Understandable and Actionable
              </h1>
            </motion.div>

            {/* Hero Image - Full Bleed */}
            <motion.div 
              className="w-full px-6"
              variants={fadeIn}
            >
              <div className="max-w-7xl mx-auto">
                <div className="relative w-full rounded-2xl overflow-hidden bg-indigo-50">
                  <Image
                    src={OrgDashboard}
                    alt="Dune Security Risk Dashboard"
                    className="w-full"
                    priority
                    style={{ objectFit: "contain" }}
                  />
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
              <p className="text-xl text-fontsecondary leading-relaxed mt-8">
                As the founding designer at Dune Security, I didn&apos;t just design the product. I helped define what it was. The risk model I created became the centerpiece of our sales narrative. The experience I built changed how enterprise CISOs understood our value.
              </p>
            </div>
          </section>

          {/* ============================================
              THE PROBLEM
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Challenge</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                "I can't tell which users are putting us most at risk."
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed">
                I spent my first weeks talking to CISOs, security admins, and our sales team. The same themes kept emerging: everyone had phishing results and training completion rates. Nobody had a unified view of which people were actually dangerous to the business.
              </p>
            </div>

            {/* Insight Cards - Stacked, not grid */}
            <div className="max-w-3xl mx-auto px-6 mt-16 space-y-6">
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">No clear picture of who's risky</p>
                <p className="text-fontsecondary">Everyone had data. Nobody had a unified view of which people were actually dangerous to the business.</p>
              </div>
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">Training wasn't targeted</p>
                <p className="text-fontsecondary">Security teams care about the small set of high-risk users. They wanted focus, not floods of data for everyone.</p>
              </div>
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">Couldn't explain to the board</p>
                <p className="text-fontsecondary">CISOs needed a risk story they could communicate upward. Opaque scores don't survive executive scrutiny.</p>
              </div>
            </div>
          </section>

          {/* ============================================
              THE APPROACH
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Approach</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Designing a credit score for user risk
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                The original risk score combined multiple signals in ways that were mathematically valid but impossible to explain. When customers asked "why is this person high-risk?" we couldn't give a clear answer.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                I pushed for a constraint: <span className="text-fontprimary font-medium">the model had to be explainable in four factors or fewer</span>. Credit scores are read one at a time. Security admins look at thousands of users at once. Cognitive load matters.
              </p>
            </div>
          </section>

          {/* Full-bleed visual */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={DuneWheel}
                  alt="Four-pillar risk model"
                  className="w-full"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* The Four Pillars */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <h3 className="text-h2 text-fontprimary mb-12">The Four Pillars</h3>
              
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Business Impact</h4>
                    <p className="text-fontsecondary leading-relaxed">Role, access level, what's at stake if this person is compromised. A CFO clicking a phishing link is different from an intern.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Simulated Attacks</h4>
                    <p className="text-fontsecondary leading-relaxed">Performance in phishing, spear-phishing, smishing, and vishing scenarios. Real behavior under simulated pressure.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Training Activity</h4>
                    <p className="text-fontsecondary leading-relaxed">Completion rates and recency. Are they engaged with security education, or ignoring it entirely?</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Cyber Hygiene</h4>
                    <p className="text-fontsecondary leading-relaxed">Signals from connected tools—sign-in patterns, device posture, password behavior. The daily habits that indicate risk.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              THE EXPERIENCE REDESIGN
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Redesign</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                From dark and dense to clear and actionable
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed">
                The existing UI was dark, dense, and organized around what we thought looked sophisticated, not what made security teams faster. Rather than fix isolated issues, I pushed for a full experience reset.
              </p>
            </div>
          </section>

          {/* Before/After - Full width */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <BeforeAfterSlider beforeImage={OldDashboard} afterImage={OrgDashboard} />
            </div>
          </section>

          {/* Key Changes */}
          <section className="w-full py-32">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h3 className="text-sm tracking-wider uppercase text-fonttertiary mb-6">Before</h3>
                  <ul className="space-y-4">
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Dark mode everywhere
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Dense, card-heavy layouts
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Navigation organized by feature
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Color used as decoration
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm tracking-wider uppercase text-indigo-600 mb-6">After</h3>
                  <ul className="space-y-4">
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-indigo-500">→</span>
                      Light mode default, color reserved for meaning
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-indigo-500">→</span>
                      Generous spacing, clear typography hierarchy
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-indigo-500">→</span>
                      Navigation by job: Understand → Investigate → Configure
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-indigo-500">→</span>
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
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The System</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                One language, every zoom level
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed">
                A CISO needs the org-wide view. A security admin needs the individual user view. The same data, different depths. I designed a consistent drilldown pattern where risk scores look the same whether you're viewing 10,000 people or one person.
              </p>
            </div>
          </section>

          {/* Drilldown Visual */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full rounded-2xl"
              >
                <source src="/assets/Dune/OrgToUserDrillDown.mp4" type="video/mp4" />
              </video>
            </div>
          </section>

          {/* Drilldown explanation */}
          <section className="w-full py-32">
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="text-center px-8">
                  <div className="text-4xl font-light text-indigo-600 mb-2">Org</div>
                  <p className="text-fonttertiary text-sm">10,000 users</p>
                </div>
                <div className="text-fontmuted text-2xl">→</div>
                <div className="text-center px-8">
                  <div className="text-4xl font-light text-indigo-600 mb-2">Dept</div>
                  <p className="text-fonttertiary text-sm">500 users</p>
                </div>
                <div className="text-fontmuted text-2xl">→</div>
                <div className="text-center px-8">
                  <div className="text-4xl font-light text-indigo-600 mb-2">User</div>
                  <p className="text-fonttertiary text-sm">1 person</p>
                </div>
                <div className="text-fontmuted text-2xl">→</div>
                <div className="text-center px-8">
                  <div className="text-4xl font-light text-indigo-600 mb-2">Factor</div>
                  <p className="text-fonttertiary text-sm">Why they're risky</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              STRATEGIC IMPACT
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Impact</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Design as product strategy
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed">
                The four-pillar model changed how we sold the product. I worked directly with the GTM team to translate the pillars into sales enablement materials. The risk visualization became the first thing we showed in demos. It was our &quot;aha moment.&quot;
              </p>
            </div>
          </section>

          {/* Architecture diagram */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100">
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
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Outcomes</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-16">
                The numbers
              </h2>
            </div>

            <div className="max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-indigo-600 mb-4">$6M</div>
                  <p className="text-fontsecondary">Seed round closed with investor materials I designed</p>
                </div>
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-indigo-600 mb-4">15+</div>
                  <p className="text-fontsecondary">Fortune 500 clients using the platform</p>
                </div>
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-indigo-600 mb-4">90%</div>
                  <p className="text-fontsecondary">Drop in dashboard-related support tickets</p>
                </div>
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-indigo-600 mb-4">32%</div>
                  <p className="text-fontsecondary">Increase in employee training completion</p>
                </div>
              </div>
            </div>
          </section>

          {/* Customers */}
          <section className="w-full py-8">
            <div className="max-w-5xl mx-auto px-6">
              <div className="rounded-2xl overflow-hidden">
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
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Reflection</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-12">
                What I learned
              </h2>

              <div className="space-y-12">
                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Explainability beats sophistication</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    We could have built a more complex model with more factors. It would have been more "accurate." But accuracy that can't be explained is useless in enterprise software. The constraint of four factors forced clarity.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Design the conversation, not just the screen</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    A lot of my work was designing how sales would demo the product, how CISOs would explain it to their boards, how admins would discuss users with managers. The UI was just one artifact of that thinking.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Own the strategy, not just the execution</h3>
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
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <p className="text-fonttertiary text-sm tracking-wider uppercase mb-4">Next Project</p>
              <a href="/dune/stillsuit" className="text-h2 text-fontprimary hover:text-indigo-600 transition-colors">
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
