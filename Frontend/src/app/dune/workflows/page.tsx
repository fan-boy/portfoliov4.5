'use client'
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import TransitionWrapper from "../../components/TransitionWrapper";
import DefaultPage from "../../components/Pages/DefaultPage";
import OrgDashboard from "../../../../public/assets/Dune/dashboard.webp";
import architecture from "../../../../public/assets/Dune/architecture.webp";
import Customers from "../../../../public/assets/Dune/customers.webp";

import AnimatedBlobs from "../../components/AnimatedBlobs";
import { fadeIn, stagger } from "../../lib/animations";
import { useChatOverflow } from "../../lib/hooks/useChatOverflow";

const DynamicWorkflows: React.FC = () => {
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
                <span>Product Strategy & Design</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div 
              className="max-w-5xl mx-auto px-6 mb-16"
              variants={fadeIn}
            >
              <h1 className="text-display text-fontprimary leading-[1.1] tracking-tight max-w-4xl">
                Turning Dashboards Into Decision-Makers
              </h1>
            </motion.div>

            {/* Hero Image - Full Bleed */}
            <motion.div 
              className="w-full px-6"
              variants={fadeIn}
            >
              <div className="max-w-7xl mx-auto">
                <div className="relative w-full rounded-2xl overflow-hidden bg-amber-50">
                  <Image
                    src={OrgDashboard}
                    alt="Dynamic Workflows automation engine"
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
                Most security products surface information and leave decisions to overloaded humans. 
                <span className="font-medium"> I designed a system that takes action automatically.</span>
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed mt-8">
                Dynamic Workflows wasn&apos;t just a feature. It was a strategic pivot that transformed Dune from &quot;risk reporting&quot; to &quot;User Risk OS.&quot; I identified the opportunity, built the business case, and designed a system that became our primary competitive differentiator.
              </p>
            </div>
          </section>

          {/* ============================================
              THE OPPORTUNITY
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Opportunity</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                "If the system knows who's risky, why isn't it doing more?"
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                After redesigning Dune's risk model and experience, this question kept surfacing in customer conversations. I recognized it as a strategic opportunity, not just a feature request.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                The market was crowded with dashboards. Nobody was doing automated remediation well.
              </p>
            </div>
          </section>

          {/* ============================================
              THE BUSINESS CASE
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Business Case</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Quantifying the opportunity
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-12">
                I used customer research to build the case for making workflows our next major investment.
              </p>
            </div>

            <div className="max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-10 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-5xl font-light text-amber-600 mb-4">40+</div>
                  <p className="text-fontsecondary">Hours/month spent manually following up on high-risk users</p>
                </div>
                <div className="p-10 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-5xl font-light text-amber-600 mb-4">73%</div>
                  <p className="text-fontsecondary">Of high-risk users never received intervention due to bandwidth</p>
                </div>
                <div className="p-10 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-5xl font-light text-amber-600 mb-4">0</div>
                  <p className="text-fontsecondary">Competitors offering meaningful automation</p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-12">
              <p className="text-xl text-fontsecondary leading-relaxed">
                This became the foundation for roadmap prioritization. Workflows jumped ahead of planned features because the strategic upside was clear.
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
                Powerful enough to matter, safe enough to trust
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed">
                I interviewed security admins and CISOs about their current workflow when they spotted a high-risk user. The same themes emerged:
              </p>
            </div>

            {/* Pain points - stacked */}
            <div className="max-w-3xl mx-auto px-6 mt-16 space-y-6">
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">"By the time I act, it's too late"</p>
                <p className="text-fontsecondary">Manual review cycles meant high-risk users could go weeks before anyone intervened. Attackers don't wait.</p>
              </div>
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">"I can't scale this process"</p>
                <p className="text-fontsecondary">What works for 100 users doesn't work for 10,000. Security teams needed force multiplication, not more headcount.</p>
              </div>
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">"I'm nervous about automation"</p>
                <p className="text-fontsecondary">Past experiences with aggressive automated systems made admins wary. They wanted control, not a black box.</p>
              </div>
            </div>
          </section>

          {/* ============================================
              THE SOLUTION
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Solution</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Workflows as policies
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                I designed workflows as if/then rules that security teams define once and the system enforces continuously. A workflow answers three questions:
              </p>
            </div>

            {/* Workflow structure */}
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="text-center px-8 py-6 bg-gray-50 rounded-xl flex-1">
                  <div className="text-2xl font-light text-amber-600 mb-2">Trigger</div>
                  <p className="text-fontsecondary text-sm">Who does this apply to?</p>
                </div>
                <div className="text-fontmuted text-2xl">→</div>
                <div className="text-center px-8 py-6 bg-gray-50 rounded-xl flex-1">
                  <div className="text-2xl font-light text-amber-600 mb-2">Actions</div>
                  <p className="text-fontsecondary text-sm">What should happen?</p>
                </div>
                <div className="text-fontmuted text-2xl">→</div>
                <div className="text-center px-8 py-6 bg-gray-50 rounded-xl flex-1">
                  <div className="text-2xl font-light text-amber-600 mb-2">Notify</div>
                  <p className="text-fontsecondary text-sm">Who needs to know?</p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-16">
              <div className="p-8 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-fonttertiary text-sm uppercase tracking-wide mb-3">Example Workflow</p>
                <p className="text-xl text-fontprimary leading-relaxed">
                  "If a user has <span className="font-medium">high business impact</span> AND <span className="font-medium">fails multiple phishing simulations</span> → restrict their IAM access, assign targeted training, and notify their manager."
                </p>
                <p className="text-fontsecondary mt-4">
                  Previously required a human to notice, investigate, decide, and act. Now it happens automatically, consistently, at scale.
                </p>
              </div>
            </div>
          </section>

          {/* Video */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full rounded-2xl"
              >
                <source src="/assets/Dune/KeyPivots.mp4" type="video/mp4" />
              </video>
            </div>
          </section>

          {/* ============================================
              DESIGNING FOR TRUST
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Designing for Trust</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Preview, Protect, Prove
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-12">
                Automation in security is high-stakes. Users needed to trust the system before they'd turn it on. I designed around three principles:
              </p>

              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Preview</h4>
                    <p className="text-fontsecondary leading-relaxed">Before any workflow goes live, users see exactly how many people would be affected and who they are. "Wait, that's hitting the entire finance team" is something you want to catch before activation.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Protect</h4>
                    <p className="text-fontsecondary leading-relaxed">Guardrails prevent workflows from doing too much damage: rate limiting, escalation tiers for serious actions, easy rollback, and exclusion lists to protect specific users.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Prove</h4>
                    <p className="text-fontsecondary leading-relaxed">Every action is logged. Admins can see exactly what the system did, when, and why. This audit trail serves compliance needs and builds confidence. Nothing happens in the dark.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              STRATEGIC IMPACT
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Strategic Impact</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                From dashboard to platform
              </h2>
            </div>

            <div className="max-w-5xl mx-auto px-6 mt-12">
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h3 className="text-sm tracking-wider uppercase text-fonttertiary mb-6">Before Workflows</h3>
                  <ul className="space-y-4">
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      "Another security dashboard"
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Feature parity with competitors
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      "See your risk data"
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Sold on training value
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm tracking-wider uppercase text-amber-600 mb-6">After Workflows</h3>
                  <ul className="space-y-4">
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-amber-500">→</span>
                      "User Risk OS" — measures, decides, AND acts
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-amber-500">→</span>
                      Clear competitive differentiation
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-amber-500">→</span>
                      "Reduce risk automatically"
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-amber-500">→</span>
                      Sold on platform value, larger contracts
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Architecture */}
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
              HOW I INFLUENCED
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">My Role</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                This wasn't a feature I was asked to design
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-12">
                I drove this from insight to implementation:
              </p>

              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-600 text-sm font-semibold">1</span>
                  </div>
                  <p className="text-lg text-fontprimary"><span className="font-medium">Identified the opportunity</span> through customer research</p>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-600 text-sm font-semibold">2</span>
                  </div>
                  <p className="text-lg text-fontprimary"><span className="font-medium">Built the business case</span> and presented to leadership</p>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-600 text-sm font-semibold">3</span>
                  </div>
                  <p className="text-lg text-fontprimary"><span className="font-medium">Drove prioritization</span> over other planned features</p>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-600 text-sm font-semibold">4</span>
                  </div>
                  <p className="text-lg text-fontprimary"><span className="font-medium">Shaped the GTM strategy</span> — worked with sales on positioning</p>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-600 text-sm font-semibold">5</span>
                  </div>
                  <p className="text-lg text-fontprimary"><span className="font-medium">Designed the implementation</span> — from strategy through final UI</p>
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
                  alt="Enterprise customers using Dynamic Workflows"
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
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Features can be strategy</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Workflows wasn&apos;t just a product feature. It was a strategic repositioning of the entire company. At the staff level, you recognize when a design opportunity is actually a business opportunity.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Design for the sales conversation</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    I spent time understanding how our sales team pitched, where they lost deals, and what competitors said. Workflows was designed to give sales a differentiated story.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Automation needs to feel controllable</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Users don't trust magic. They trust tools they can inspect, adjust, and override. Preview, Protect, Prove addressed the #1 objection in sales calls.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Own the outcome, not just the output</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    I tracked activation rates, gathered feedback, iterated on templates, and worked with customer success. At the leadership level, you're accountable for whether the work succeeds, not just whether it ships.
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
              <a href="/dune/risk-platform" className="text-h2 text-fontprimary hover:text-amber-600 transition-colors">
                Risk Platform →
              </a>
            </div>
          </section>

        </article>
      </DefaultPage>
    </TransitionWrapper>
  );
};

export default DynamicWorkflows;
