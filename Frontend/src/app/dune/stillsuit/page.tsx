'use client'
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

import TransitionWrapper from "../../components/TransitionWrapper";
import DefaultPage from "../../components/Pages/DefaultPage";
import InsightCard from "../../components/Cards/InsightCard";
import DesignSystem from "../../../../public/assets/Dune/DesignSystem.webp";
import RiskScoreStates from "../../../../public/assets/Dune/Stillsuit/risk-score-states.png";
import RiskColorPalette from "../../../../public/assets/Dune/Stillsuit/risk-color-palette.png";
import SemanticColorDocs from "../../../../public/assets/Dune/Stillsuit/semantic-color-docs.png";
import AnimatedBlobs from "../../components/AnimatedBlobs";
import { fadeIn, stagger } from "../../lib/animations";
import { useChatOverflow } from "../../lib/hooks/useChatOverflow";

/** A real export from the Stillsuit Figma file, with a short caption under it. */
function Figure({ src, alt, caption, className = "" }: { src: StaticImageData; alt: string; caption: string; className?: string }) {
  return (
    <figure className={`m-0 ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <Image src={src} alt={alt} className="w-full h-auto" sizes="(min-width: 1024px) 896px, 100vw" />
      </div>
      <figcaption className="mt-3 text-sm text-fonttertiary">{caption}</figcaption>
    </figure>
  );
}

/** Loops silently; holds still for visitors who prefer reduced motion. */
function LoopVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (query.matches) video.pause();
      else void video.play().catch(() => {});
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  return (
    <video ref={ref} autoPlay muted loop playsInline preload="auto" aria-label={label} className="block w-full h-auto">
      <source src={src} type="video/mp4" />
    </video>
  );
}

const StillsuitDesignSystem: React.FC = () => {
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
                <span>2024</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>Systems Design</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div 
              className="max-w-4xl mx-auto px-6 mb-12"
              variants={fadeIn}
            >
              <h1 className="text-display">
                Building a Design System for Speed and Consistency
              </h1>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              className="w-full px-6"
              variants={fadeIn}
            >
              <div className="max-w-6xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden bg-accent-soft">
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
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-2xl md:text-3xl text-fontprimary leading-relaxed font-light">
                As the sole designer at an early-stage startup, I couldn&apos;t afford to rebuild components from scratch every sprint. 
                <span className="font-medium"> I created Stillsuit: a practical design system built for speed.</span>
              </p>
              <p className="text-lg text-fontsecondary leading-relaxed mt-8">
                The system reduced engineer onboarding time by 50%, enabled a complete rebrand in 2 weeks instead of 6, and established the foundation for design quality as Dune scales.
              </p>
            </div>
          </section>

          {/* ============================================
              THE CASE FOR BUILDING EARLY
              ============================================ */}
          <section id="the-decision" className="w-full py-32 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Decision</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                Why build a design system when you&apos;re the only designer?
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed mb-6">
                I&apos;m cautious about design systems. They&apos;re often created too early, easily overcomplicated, and become maintenance burdens that slow teams down instead of speeding them up.
              </p>
              <p className="text-lg text-fontsecondary leading-relaxed">
                At Dune, I didn&apos;t think we needed one at first. But I was thinking ahead.
              </p>
            </div>

            {/* Strategic reasons */}
            <div className="max-w-3xl mx-auto px-6 mt-16 space-y-6">
              <InsightCard 
                title="We were about to scale" 
                description="Every component I built without a system was technical debt for the future team." 
              />
              <InsightCard 
                title="The rebrand was coming" 
                description="Moving from dark to light mode across an entire product is painful without centralized styles." 
              />
              <InsightCard 
                title="Engineering velocity was at stake" 
                description="Without a shared language for components, every ticket required extra explanation." 
              />
              <InsightCard 
                title="Design quality needed to compound" 
                description="I wanted every new feature to be better than the last. A system meant learnings accumulated." 
              />
            </div>
          </section>

          {/* ============================================
              THE MATH
              ============================================ */}
          <section id="business-case" className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Business Case</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                Making the case with math
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed mb-8">
                I made the case to leadership that investing 3-4 weeks in a design system would pay back 10x over the next year.
              </p>
              <div className="p-6 bg-accent-soft rounded-xl border border-accent-soft">
                <p className="text-lg text-fontprimary leading-relaxed">
                  We were planning to ship <span className="font-medium">12+ major features</span>. If each saved <span className="font-medium">3-4 days</span> of design/eng overhead, the system paid for itself by <span className="font-medium">feature #3</span>.
                </p>
              </div>
            </div>
          </section>

          {/* ============================================
              PRINCIPLES
              ============================================ */}
          <section id="principles" className="w-full py-32 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Approach</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-12 tracking-tight">
                Four principles that guided every decision
              </h2>

              <div className="space-y-10">
                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg text-fontprimary font-normal mb-1">Speed over completeness</h4>
                    <p className="text-fontsecondary leading-relaxed">The system needed to accelerate work this week, not in six months. Build components as needed, not speculatively.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg text-fontprimary font-normal mb-1">Engineer-first documentation</h4>
                    <p className="text-fontsecondary leading-relaxed">The primary consumer was engineering. Documentation had to answer their questions without requiring a meeting with me.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg text-fontprimary font-normal mb-1">Flexible but opinionated</h4>
                    <p className="text-fontsecondary leading-relaxed">Sensible defaults for 90% of use cases, with clear escape hatches for the other 10%.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="text-lg text-fontprimary font-normal mb-1">One source of truth</h4>
                    <p className="text-fontsecondary leading-relaxed">Tokens in Figma had to match code exactly. Drift between design and implementation defeats the purpose.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              TOKEN ARCHITECTURE
              ============================================ */}
          <section id="token-architecture" className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Foundation</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                Token architecture
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed mb-12">
                I started with design tokens, the foundational layer that everything else builds on. Getting this right meant the rebrand could happen by changing values in one place.
              </p>
            </div>

            {/* Token flow */}
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div className="text-center px-6 py-5 bg-bg-secondary rounded-xl flex-1 w-full md:w-auto">
                  <div className="text-xl font-light text-accent mb-1">Primitives</div>
                  <p className="text-fonttertiary text-xs">Raw values</p>
                  <p className="text-fontsecondary text-xs mt-1">gray-100, space-4</p>
                </div>
                <div className="text-fontmuted text-xl hidden md:block">→</div>
                <div className="text-fontmuted text-xl md:hidden">↓</div>
                <div className="text-center px-6 py-5 bg-bg-secondary rounded-xl flex-1 w-full md:w-auto">
                  <div className="text-xl font-light text-accent mb-1">Semantic</div>
                  <p className="text-fonttertiary text-xs">Contextual meaning</p>
                  <p className="text-fontsecondary text-xs mt-1">color-bg-primary</p>
                </div>
                <div className="text-fontmuted text-xl hidden md:block">→</div>
                <div className="text-fontmuted text-xl md:hidden">↓</div>
                <div className="text-center px-6 py-5 bg-bg-secondary rounded-xl flex-1 w-full md:w-auto">
                  <div className="text-xl font-light text-accent mb-1">Component</div>
                  <p className="text-fonttertiary text-xs">Specific usage</p>
                  <p className="text-fontsecondary text-xs mt-1">button-padding-x</p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-12">
              <div className="p-6 bg-accent-soft rounded-xl border border-accent-soft">
                <p className="text-lg text-fontprimary leading-relaxed">
                  When we flipped from dark to light mode, I changed the semantic token mappings. <span className="font-medium">Every component updated automatically.</span>
                </p>
              </div>
            </div>

            <figure className="max-w-4xl mx-auto px-6 mt-12 m-0">
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                <LoopVideo
                  src="/assets/Dune/StillsuitFlipLoop.mp4"
                  label="The organization dashboard switching from dark mode to light mode"
                />
              </div>
              <figcaption className="mt-3 text-sm text-fonttertiary">
                The same dashboard, rendered twice from Figma with only the Components collection switched from Dark to Light mode.
              </figcaption>
            </figure>
          </section>

          {/* ============================================
              COLOR SYSTEM
              ============================================ */}
          <section id="color-system" className="w-full py-32 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Color Philosophy</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                Color earns its place
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed mb-6">
                The old product used color decoratively. Dark backgrounds, gradient accents, colorful cards. It looked &quot;sophisticated&quot; but made the interface noisy and risk states hard to spot.
              </p>
              <p className="text-lg text-fontsecondary leading-relaxed">
                In the new system, <span className="text-fontprimary font-medium">saturated colors are reserved for risk and status</span>. This means when something is red, it actually means something.
              </p>
            </div>

            <Figure
              src={RiskColorPalette}
              alt="Stillsuit's risk color palette: green, red, orange and yellow ramps from 100 to 1100"
              caption="The risk palette. These four ramps are the only saturated colors in the system; everything else is neutral."
              className="max-w-4xl mx-auto px-6 mt-12"
            />
          </section>

          {/* ============================================
              COMPONENT DEEP DIVE
              ============================================ */}
          <section id="risk-indicator" className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Deep Dive</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                The risk indicator
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed">
                The most important component in the system. It appears everywhere: dashboard summaries, user rows, inline mentions. It needed to work at multiple sizes while remaining instantly scannable.
              </p>
            </div>

            <Figure
              src={RiskScoreStates}
              alt="The Risk Score Card component in its Low, Moderate, High and Severe states, scoring 23, 46, 72 and 99"
              caption="The Risk Score Card's four levels. The badge names the level, and the gauge places the score along the same green-to-red ramp."
              className="max-w-5xl mx-auto px-6 mt-12"
            />
          </section>

          {/* ============================================
              DOCUMENTATION
              ============================================ */}
          <section id="documentation" className="w-full py-32 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Handoff</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-6 tracking-tight">
                Documentation that engineers actually use
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed mb-6">
                Documentation that lives in a separate wiki gets stale. Documentation that&apos;s too sparse doesn&apos;t help. I needed something that engineers would actually use.
              </p>
              <p className="text-lg text-fontsecondary leading-relaxed">
                My solution: <span className="text-fontprimary font-medium">documentation lives directly in Figma, attached to components</span>. When an engineer inspects a component, the usage guidelines are right there.
              </p>
            </div>

            <Figure
              src={SemanticColorDocs}
              alt="Stillsuit's semantic color documentation in Figma: error, warning, info and success tokens with light and dark values"
              caption="Semantic color documentation, as it lives in the Figma file: every status token with its light and dark value, its name, and where to use it."
              className="max-w-2xl mx-auto px-6 mt-12"
            />

            <div className="max-w-3xl mx-auto px-6 mt-12">
              <div className="p-6 bg-accent-soft rounded-xl border border-accent-soft">
                <p className="text-lg text-fontprimary leading-relaxed">
                  Engineers stopped asking &quot;what&apos;s the padding here?&quot; The answer was always <span className="font-medium">&quot;check the component.&quot;</span>
                </p>
              </div>
            </div>
          </section>

          {/* ============================================
              OUTCOMES
              ============================================ */}
          <section id="outcomes" className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Outcomes</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-12 tracking-tight">
                The numbers
              </h2>
            </div>

            <div className="max-w-4xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 bg-bg-secondary rounded-xl">
                  <div className="text-5xl font-light text-accent mb-3">50%</div>
                  <p className="text-fontsecondary text-sm">Faster engineer onboarding</p>
                </div>
                <div className="p-8 bg-bg-secondary rounded-xl">
                  <div className="text-5xl font-light text-accent mb-3">2 wks</div>
                  <p className="text-fontsecondary text-sm">Rebrand execution (vs. 6 estimated)</p>
                </div>
                <div className="p-8 bg-bg-secondary rounded-xl">
                  <div className="text-5xl font-light text-accent mb-3">30%</div>
                  <p className="text-fontsecondary text-sm">Faster average feature shipping</p>
                </div>
                <div className="p-8 bg-bg-secondary rounded-xl">
                  <div className="text-5xl font-light text-accent mb-3">↓↓</div>
                  <p className="text-fontsecondary text-sm">Visual bugs and &quot;doesn&apos;t match&quot; tickets</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              LEARNINGS
              ============================================ */}
          <section id="learnings" className="w-full py-32 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Reflection</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary font-light mt-4 mb-12 tracking-tight">
                What I learned
              </h2>

              <div className="space-y-10">
                <div>
                  <h3 className="text-lg text-fontprimary font-normal mb-2">Infrastructure is a leadership decision</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Building a design system when you&apos;re the only designer feels indulgent. But I was thinking about what the team would need in 12 months, not just what I needed that week.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-fontprimary font-normal mb-2">The system is a product</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    It has users (engineers, future designers). It needs UX. It needs maintenance. Treating it as a product, with strategy, roadmap, and success metrics, is what made it successful.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-fontprimary font-normal mb-2">Document for the person who isn&apos;t here yet</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Every piece of documentation was written for the engineer or designer who would join in 6 months and need to understand &quot;why is it this way?&quot;
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-fontprimary font-normal mb-2">Make the case with math</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Leadership approved the investment because I showed the ROI. Speaking in business outcomes, not just design quality, is how you get buy-in.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              NEXT PROJECT CTA
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-fonttertiary text-sm tracking-wider uppercase mb-4">Next Project</p>
              <a href="/universitypark" className="text-2xl md:text-3xl text-fontprimary hover:text-accent transition-colors tracking-tight">
                University Park →
              </a>
            </div>
          </section>

        </article>
      </DefaultPage>
    </TransitionWrapper>
  );
};

export default StillsuitDesignSystem;
