'use client'
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import TransitionWrapper from "../../components/TransitionWrapper";
import DefaultPage from "../../components/Pages/DefaultPage";
import DesignSystem from "../../../../public/assets/Dune/DesignSystem.webp";
import AnimatedBlobs from "../../components/AnimatedBlobs";
import { fadeIn, stagger } from "../../lib/animations";
import { useChatOverflow } from "../../lib/hooks/useChatOverflow";

const StillsuitDesignSystem: React.FC = () => {
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
                <span>Systems Design</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div 
              className="max-w-5xl mx-auto px-6 mb-16"
              variants={fadeIn}
            >
              <h1 className="text-display text-fontprimary leading-[1.1] tracking-tight max-w-4xl">
                Building a Design System for Speed and Consistency
              </h1>
            </motion.div>

            {/* Hero Image - Full Bleed */}
            <motion.div 
              className="w-full px-6"
              variants={fadeIn}
            >
              <div className="max-w-7xl mx-auto">
                <div className="relative w-full rounded-2xl overflow-hidden bg-teal-50">
                  <Image
                    src={DesignSystem}
                    alt="Stillsuit Design System"
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
                As the sole designer at an early-stage startup, I couldn&apos;t afford to rebuild components from scratch every sprint. 
                <span className="font-medium"> I created Stillsuit: a practical design system built for speed.</span>
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed mt-8">
                The system reduced engineer onboarding time by 50%, enabled a complete rebrand in 2 weeks instead of 6, and established the foundation for design quality as Dune scales.
              </p>
            </div>
          </section>

          {/* ============================================
              THE CASE FOR BUILDING EARLY
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Decision</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Why build a design system when you&apos;re the only designer?
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                I&apos;m cautious about design systems. They&apos;re often created too early, easily overcomplicated, and become maintenance burdens that slow teams down instead of speeding them up.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                At Dune, I didn&apos;t think we needed one at first. But I was thinking ahead.
              </p>
            </div>

            {/* Strategic reasons - stacked */}
            <div className="max-w-3xl mx-auto px-6 mt-16 space-y-6">
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">We were about to scale</p>
                <p className="text-fontsecondary">Every component I built without a system was technical debt for the future team.</p>
              </div>
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">The rebrand was coming</p>
                <p className="text-fontsecondary">Moving from dark to light mode across an entire product is painful without centralized styles.</p>
              </div>
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">Engineering velocity was at stake</p>
                <p className="text-fontsecondary">Without a shared language for components, every ticket required extra explanation.</p>
              </div>
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">Design quality needed to compound</p>
                <p className="text-fontsecondary">I wanted every new feature to be better than the last. A system meant learnings accumulated.</p>
              </div>
            </div>
          </section>

          {/* ============================================
              THE MATH
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Business Case</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Making the case with math
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                I made the case to leadership that investing 3-4 weeks in a design system would pay back 10x over the next year.
              </p>
              <div className="p-8 bg-teal-50 rounded-xl border border-teal-100">
                <p className="text-xl text-fontprimary leading-relaxed">
                  We were planning to ship <span className="font-medium">12+ major features</span>. If each saved <span className="font-medium">3-4 days</span> of design/eng overhead, the system paid for itself by <span className="font-medium">feature #3</span>.
                </p>
              </div>
            </div>
          </section>

          {/* ============================================
              PRINCIPLES
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Approach</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-12">
                Four principles that guided every decision
              </h2>

              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Speed over completeness</h4>
                    <p className="text-fontsecondary leading-relaxed">The system needed to accelerate work this week, not in six months. Build components as needed, not speculatively.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Engineer-first documentation</h4>
                    <p className="text-fontsecondary leading-relaxed">The primary consumer was engineering. Documentation had to answer their questions without requiring a meeting with me.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Flexible but opinionated</h4>
                    <p className="text-fontsecondary leading-relaxed">Sensible defaults for 90% of use cases, with clear escape hatches for the other 10%.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">One source of truth</h4>
                    <p className="text-fontsecondary leading-relaxed">Tokens in Figma had to match code exactly. Drift between design and implementation defeats the purpose.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              TOKEN ARCHITECTURE
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Foundation</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Token architecture
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-12">
                I started with design tokens, the foundational layer that everything else builds on. Getting this right meant the rebrand could happen by changing values in one place.
              </p>
            </div>

            {/* Token flow */}
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="text-center px-8 py-6 bg-gray-50 rounded-xl flex-1">
                  <div className="text-2xl font-light text-teal-600 mb-2">Primitives</div>
                  <p className="text-fonttertiary text-sm">Raw values</p>
                  <p className="text-fontsecondary text-sm mt-2">gray-100, space-4</p>
                </div>
                <div className="text-fontmuted text-2xl">→</div>
                <div className="text-center px-8 py-6 bg-gray-50 rounded-xl flex-1">
                  <div className="text-2xl font-light text-teal-600 mb-2">Semantic</div>
                  <p className="text-fonttertiary text-sm">Contextual meaning</p>
                  <p className="text-fontsecondary text-sm mt-2">color-background-primary</p>
                </div>
                <div className="text-fontmuted text-2xl">→</div>
                <div className="text-center px-8 py-6 bg-gray-50 rounded-xl flex-1">
                  <div className="text-2xl font-light text-teal-600 mb-2">Component</div>
                  <p className="text-fonttertiary text-sm">Specific usage</p>
                  <p className="text-fontsecondary text-sm mt-2">button-padding-horizontal</p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-16">
              <div className="p-8 bg-teal-50 rounded-xl border border-teal-100">
                <p className="text-xl text-fontprimary leading-relaxed">
                  When we flipped from dark to light mode, I changed the semantic token mappings. <span className="font-medium">Every component updated automatically.</span>
                </p>
              </div>
            </div>
          </section>

          {/* ============================================
              COLOR SYSTEM
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Color Philosophy</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Color earns its place
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                The old product used color decoratively. Dark backgrounds, gradient accents, colorful cards. It looked &quot;sophisticated&quot; but made the interface noisy and risk states hard to spot.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                In the new system, <span className="text-fontprimary font-medium">saturated colors are reserved for risk and status</span>. This means when something is red, it actually means something.
              </p>
            </div>
          </section>

          {/* Color usage */}
          <section className="w-full py-16">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <div className="flex gap-2 mb-4">
                    <span className="w-6 h-6 rounded-full bg-red-500"></span>
                    <span className="w-6 h-6 rounded-full bg-orange-500"></span>
                    <span className="w-6 h-6 rounded-full bg-yellow-500"></span>
                    <span className="w-6 h-6 rounded-full bg-green-500"></span>
                  </div>
                  <h4 className="text-lg text-fontprimary font-medium mb-2">Risk & Status</h4>
                  <p className="text-fontsecondary">The only place we use saturated color liberally. High signal, no noise.</p>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <div className="flex gap-2 mb-4">
                    <span className="w-6 h-6 rounded-full bg-gray-100"></span>
                    <span className="w-6 h-6 rounded-full bg-gray-200"></span>
                    <span className="w-6 h-6 rounded-full bg-gray-300"></span>
                    <span className="w-6 h-6 rounded-full bg-gray-400"></span>
                  </div>
                  <h4 className="text-lg text-fontprimary font-medium mb-2">Everything Else</h4>
                  <p className="text-fontsecondary">Neutrals that let meaningful color pop. The restraint makes the signal clear.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              COMPONENT DEEP DIVE
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Deep Dive</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                The risk indicator
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed">
                The most important component in the system. It appears everywhere—dashboard summaries, user rows, inline mentions. It needed to work at multiple sizes while remaining instantly scannable.
              </p>
            </div>
          </section>

          {/* Risk indicator sizes */}
          <section className="w-full py-8">
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-12 items-center justify-center py-16 bg-gray-50 rounded-2xl">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white text-4xl font-semibold">73</span>
                  </div>
                  <p className="text-fontprimary font-medium">Large</p>
                  <p className="text-fonttertiary text-sm">Dashboard hero</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white text-lg font-semibold">73</span>
                  </div>
                  <p className="text-fontprimary font-medium">Medium</p>
                  <p className="text-fonttertiary text-sm">User row</p>
                </div>
                <div className="text-center">
                  <div className="px-3 py-1 rounded-full bg-orange-500 mb-4 mx-auto inline-block">
                    <span className="text-white text-sm font-semibold">73</span>
                  </div>
                  <p className="text-fontprimary font-medium">Small</p>
                  <p className="text-fonttertiary text-sm">Inline mention</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              DOCUMENTATION
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Handoff</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Documentation that engineers actually use
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                Documentation that lives in a separate wiki gets stale. Documentation that&apos;s too sparse doesn&apos;t help. I needed something that engineers would actually use.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                My solution: <span className="text-fontprimary font-medium">documentation lives directly in Figma, attached to components</span>. When an engineer inspects a component, the usage guidelines are right there.
              </p>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-16">
              <div className="p-8 bg-teal-50 rounded-xl border border-teal-100">
                <p className="text-xl text-fontprimary leading-relaxed">
                  Engineers stopped asking &quot;what&apos;s the padding here?&quot; The answer was always <span className="font-medium">&quot;check the component.&quot;</span>
                </p>
              </div>
            </div>
          </section>

          {/* ============================================
              OUTCOMES
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Outcomes</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-16">
                The numbers
              </h2>
            </div>

            <div className="max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-teal-600 mb-4">50%</div>
                  <p className="text-fontsecondary">Faster engineer onboarding</p>
                </div>
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-teal-600 mb-4">2 wks</div>
                  <p className="text-fontsecondary">Rebrand execution (vs. 6 estimated)</p>
                </div>
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-teal-600 mb-4">30%</div>
                  <p className="text-fontsecondary">Faster average feature shipping</p>
                </div>
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-teal-600 mb-4">↓↓</div>
                  <p className="text-fontsecondary">Visual bugs and &quot;doesn&apos;t match&quot; tickets</p>
                </div>
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
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Infrastructure is a leadership decision</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Building a design system when you&apos;re the only designer feels indulgent. But at the staff level, you think about what the team will need in 12 months, not just what you need today.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">The system is a product</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    It has users (engineers, future designers). It needs UX. It needs maintenance. Treating it as a product, with strategy, roadmap, and success metrics, is what made it successful.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Document for the person who isn&apos;t here yet</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Every piece of documentation was written for the engineer or designer who would join in 6 months and need to understand &quot;why is it this way?&quot;
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Make the case with math</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Leadership approved the investment because I showed the ROI. Staff designers speak in business outcomes, not just design quality.
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
              <a href="/dune/workflows" className="text-h2 text-fontprimary hover:text-teal-600 transition-colors">
                Dynamic Workflows →
              </a>
            </div>
          </section>

        </article>
      </DefaultPage>
    </TransitionWrapper>
  );
};

export default StillsuitDesignSystem;
