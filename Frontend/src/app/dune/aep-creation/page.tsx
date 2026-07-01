'use client'
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import TransitionWrapper from "../../components/TransitionWrapper";
import DefaultPage from "../../components/Pages/DefaultPage";
import InsightCard from "../../components/Cards/InsightCard";
import OrgDashboard from "../../../../public/assets/Dune/dashboard.webp";
import architecture from "../../../../public/assets/Dune/architecture.webp";
import Customers from "../../../../public/assets/Dune/customers.webp";

import AnimatedBlobs from "../../components/AnimatedBlobs";
import { fadeIn, stagger } from "../../lib/animations";
import { useChatOverflow } from "../../lib/hooks/useChatOverflow";

const AEPCreation: React.FC = () => {
  const { chatOpen } = useChatOverflow();

  return (
    <TransitionWrapper>
      {!chatOpen && (
        <AnimatedBlobs expanded={false} loading={false} move={true} />
      )}
      <DefaultPage>
        <article className="w-full z-2">

          {/* ============================================
              HERO SECTION
              ============================================ */}
          <motion.section
            id="hero"
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
              <div className="flex flex-wrap items-center gap-3 text-fonttertiary text-sm tracking-wide">
                <span>Dune Security</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>2024 to Present</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>Product Design & UX Strategy</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              className="max-w-4xl mx-auto px-6 mb-12"
              variants={fadeIn}
            >
              <h1 className="text-display">
                From Word Docs to Self-Serve in Two Steps
              </h1>
            </motion.div>

            {/* Hero Image - Full Bleed */}
            <motion.div
              className="w-full px-6"
              variants={fadeIn}
            >
              <div className="max-w-6xl mx-auto">
                <div className="relative w-full rounded-2xl overflow-hidden bg-indigo-50">
                  <Image
                    src={OrgDashboard}
                    alt="AEP Builder interface"
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
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-2xl md:text-3xl text-fontprimary leading-relaxed font-light">
                Dune&apos;s red teaming product ran on manual handoffs. Customers filled out Word docs,
                emailed them to our operators, and waited a full day to get a persona loaded.
                <span className="font-medium"> I replaced that with a two-step self-serve builder.</span>
              </p>
              <p className="text-lg text-fontsecondary leading-relaxed mt-8">
                AEP Builder wasn&apos;t just a UX improvement. It was a trust-building exercise — 
                convincing enterprise security managers that they could create, test, and publish 
                AI-generated social engineering personas without operator involvement. The design 
                had to be powerful enough to matter and transparent enough to trust.
              </p>
            </div>
          </section>

          {/* ============================================
              THE OPPORTUNITY
              ============================================ */}
          <section id="the-opportunity" className="w-full py-32 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Opportunity</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                &quot;Why do I have to email you to run a simulation?&quot;
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed mb-8">
                This question came up in almost every customer conversation about Red Teaming. 
                The existing process was a bottleneck — every new AEP required an operator to 
                manually translate a form into a backend JSON config. Customers with sophisticated 
                red team programs wanted to iterate quickly. We were slowing them down.
              </p>
              <p className="text-lg text-fontsecondary leading-relaxed">
                I saw an opportunity to turn a support burden into a self-serve product — and in the 
                process, make AEP creation a core differentiator rather than a back-office operation.
              </p>
            </div>
          </section>

          {/* ============================================
              THE BUSINESS CASE
              ============================================ */}
          <section id="business-case" className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Problem, Quantified</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                Every AEP had a 24-hour tax
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed mb-12">
                I mapped the current-state process end-to-end and the numbers told the story clearly.
              </p>
            </div>

            <div className="max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-10 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-5xl font-light text-indigo-600 mb-4">1 day</div>
                  <p className="text-fontsecondary">Minimum operator turnaround per AEP — even for standard requests</p>
                </div>
                <div className="p-10 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-5xl font-light text-indigo-600 mb-4">100%</div>
                  <p className="text-fontsecondary">Of AEP creation required internal operator involvement</p>
                </div>
                <div className="p-10 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-5xl font-light text-indigo-600 mb-4">0</div>
                  <p className="text-fontsecondary">Ways for customers to test or preview persona behavior before launch</p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-12">
              <p className="text-lg text-fontsecondary leading-relaxed">
                The goal was clear: eliminate operator involvement for standard cases entirely. 
                That freed up ops capacity and gave customers the speed and control they were asking for.
              </p>
            </div>
          </section>

          {/* ============================================
              THE CHALLENGE
              ============================================ */}
          <section id="the-challenge" className="w-full py-32 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Challenge</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                Self-serve for something this consequential
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed">
                AEPs are AI personas that conduct live social engineering simulations against real employees. 
                Getting the design wrong had real consequences. Security managers raised consistent concerns:
              </p>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-16 space-y-6">
              <InsightCard
                title={`"How do I know what the AI will actually say?"`}
                description="Customers didn't trust a form to produce a believable, on-brand persona. They needed to see it in action before it went anywhere near their employees."
              />
              <InsightCard
                title={`"I don't want to accidentally go too far"`}
                description="Social engineering simulations can damage trust if they feel manipulative or offensive. Admins needed guardrails, not a blank canvas."
              />
              <InsightCard
                title={`"What if I need to adjust it after I've seen it?"`}
                description="Static generation wasn't enough. The ability to iterate on behavior — quickly, without starting over — was non-negotiable."
              />
            </div>
          </section>

          {/* ============================================
              THE SOLUTION
              ============================================ */}
          <section id="solution" className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Solution</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                A two-step loop: configure, then verify
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed mb-8">
                I designed the AEP Builder as a focused two-step flow. Step 1 captures context. 
                Step 2 gives the manager a live environment to test what they built before it ever reaches employees.
              </p>
            </div>

            {/* Two-step flow */}
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="text-center px-8 py-6 bg-bg-secondary rounded-xl flex-1">
                  <div className="text-2xl font-light text-indigo-600 mb-2">Step 1</div>
                  <p className="text-fontprimary font-medium mb-1">AEP Setup</p>
                  <p className="text-fontsecondary text-sm">Define the scenario, adversary method, and target context</p>
                </div>
                <div className="text-fontmuted text-2xl">→</div>
                <div className="text-center px-8 py-6 bg-bg-secondary rounded-xl flex-1">
                  <div className="text-2xl font-light text-indigo-600 mb-2">Step 2</div>
                  <p className="text-fontprimary font-medium mb-1">Test & Refine</p>
                  <p className="text-fontsecondary text-sm">Chat with the persona, adjust behavior, publish when ready</p>
                </div>
                <div className="text-fontmuted text-2xl">→</div>
                <div className="text-center px-8 py-6 bg-bg-secondary rounded-xl flex-1">
                  <div className="text-2xl font-light text-indigo-600 mb-2">Published</div>
                  <p className="text-fontprimary font-medium mb-1">Live in Campaign Builder</p>
                  <p className="text-fontsecondary text-sm">AEP available instantly — no operator required</p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-16">
              <div className="p-8 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-fonttertiary text-sm uppercase tracking-wide mb-3">The Key Design Decision</p>
                <p className="text-xl text-fontprimary leading-relaxed">
                  The manager plays the <span className="font-medium">employee role</span> in Step 2 — 
                  they experience the AEP firsthand before publishing it. This wasn&apos;t just a 
                  preview. It was the trust mechanism the whole flow depended on.
                </p>
                <p className="text-fontsecondary mt-4">
                  If you&apos;ve been on the receiving end of it, you understand what your employees will feel. 
                  That changes how you calibrate it.
                </p>
              </div>
            </div>
          </section>

          {/* Video placeholder */}
          <section className="w-full py-8">
            <div className="max-w-6xl mx-auto px-6">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full"
              >
                <source src="/assets/Dune/KeyPivots.mp4" type="video/mp4" />
              </video>
            </div>
          </section>

          {/* ============================================
              DESIGNING FOR CONTROL
              ============================================ */}
          <section id="control" className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Designing for Control</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                Power with guardrails
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed mb-12">
                Giving security managers full control over AI-generated personas required careful constraint 
                design. I built three layers of control into Step 2:
              </p>

              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Quick-Action Chips</h4>
                    <p className="text-fontsecondary leading-relaxed">
                      Six one-click behavior modifiers — More casual, Less aggressive, Add urgency, More formal, 
                      Shorter, More empathetic — let managers tune the persona without writing prompts. 
                      Fast iteration without a learning curve.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Natural Language Instructions</h4>
                    <p className="text-fontsecondary leading-relaxed">
                      For nuanced changes, a free-text field lets managers describe exactly what they want: 
                      &quot;Don&apos;t mention dollar amounts so early&quot; or &quot;Sound more like internal IT, less like a vendor.&quot; 
                      The AI applies it and starts a new session automatically.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Hard Guardrails</h4>
                    <p className="text-fontsecondary leading-relaxed">
                      Certain refinements are blocked entirely — hate speech, violence, PII collection. 
                      If a requested change would weaken a required safety guardrail, the system explains 
                      why and prompts for an alternative. Non-negotiable, non-bypassable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              BEFORE / AFTER
              ============================================ */}
          <section id="strategic-impact" className="w-full py-32 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Before & After</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                What changed for the customer
              </h2>
            </div>

            <div className="max-w-5xl mx-auto px-6 mt-12">
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h3 className="text-sm tracking-wider uppercase text-fonttertiary mb-6">Before AEP Builder</h3>
                  <ul className="space-y-4">
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Fill out Word + Excel forms
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Email to Dune operators
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Wait ~1 day for backend config
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      No way to preview before launch
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Revision = start the whole loop again
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm tracking-wider uppercase text-indigo-600 mb-6">After AEP Builder</h3>
                  <ul className="space-y-4">
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-indigo-500">→</span>
                      Focused two-step form in-platform
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-indigo-500">→</span>
                      AI generates persona immediately
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-indigo-500">→</span>
                      Live chat test before any employee sees it
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-indigo-500">→</span>
                      One-click refinement, instant regeneration
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-indigo-500">→</span>
                      Publish in minutes, not days
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Architecture image */}
          <section className="w-full py-8">
            <div className="max-w-6xl mx-auto px-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 ring-1 ring-black/5">
                <Image
                  src={architecture}
                  alt="AEP Builder system architecture"
                  className="w-full"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* ============================================
              MY ROLE
              ============================================ */}
          <section id="my-role" className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">My Role</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                End-to-end, from process audit to shipped product
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed mb-12">
                This was a 0→1 design problem — no existing template, no comparable product to reference. 
                I owned it fully:
              </p>

              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-indigo-600 text-sm font-semibold">1</span>
                  </div>
                  <p className="text-lg text-fontprimary"><span className="font-medium">Mapped the current-state process</span> — shadowed operators, interviewed customers</p>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-indigo-600 text-sm font-semibold">2</span>
                  </div>
                  <p className="text-lg text-fontprimary"><span className="font-medium">Defined the two-step model</span> — setup vs. test as separate mental modes</p>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-indigo-600 text-sm font-semibold">3</span>
                  </div>
                  <p className="text-lg text-fontprimary"><span className="font-medium">Designed every state</span> — empty states, errors, guardrail messaging, version history</p>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-indigo-600 text-sm font-semibold">4</span>
                  </div>
                  <p className="text-lg text-fontprimary"><span className="font-medium">Wrote the product spec</span> — edge cases, integration points, publishing guardrails</p>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-indigo-600 text-sm font-semibold">5</span>
                  </div>
                  <p className="text-lg text-fontprimary"><span className="font-medium">Partnered with engineering</span> on AI generation latency targets and failure handling</p>
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
                  alt="Enterprise security teams using AEP Builder"
                  className="w-full"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* ============================================
              LEARNINGS
              ============================================ */}
          <section id="learnings" className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Reflection</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-12 tracking-tight">
                What I learned
              </h2>

              <div className="space-y-12">
                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Self-serve only works if trust comes first</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    The hardest part wasn&apos;t the form design — it was making managers confident enough to 
                    publish without a safety net. The live chat test in Step 2 wasn&apos;t a nice-to-have; 
                    it was the entire trust architecture. Everything else depended on it.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Empty states are product strategy</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    First-time users landing on an empty AEP Library are at the highest drop-off risk. 
                    I spent disproportionate time on the empty state — the illustration, the two CTAs, 
                    the copy. That&apos;s where activation actually happens.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Guardrails are a feature, not a limitation</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Early feedback suggested surfacing hard limits would frustrate power users. 
                    The opposite turned out to be true — explicit, well-explained guardrails gave 
                    compliance-conscious CISOs confidence to actually use the tool. 
                    &quot;I know it won&apos;t let me do something I&apos;ll regret.&quot;
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Reducing operator involvement is a product moat</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Every hour we saved operators was an hour of scale we didn&apos;t have to hire for. 
                    Self-serve wasn&apos;t just better UX — it was a business model decision that let 
                    us grow customer count without growing headcount proportionally.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              NEXT PROJECT CTA
              ============================================ */}
          <section className="w-full py-32 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-fonttertiary text-sm tracking-wider uppercase mb-4">Next Project</p>
              <a href="/dune/workflows" className="text-2xl md:text-3xl text-fontprimary tracking-tight hover:text-indigo-600 transition-colors">
                Dynamic Workflows →
              </a>
            </div>
          </section>

        </article>
      </DefaultPage>
    </TransitionWrapper>
  );
};

export default AEPCreation;
