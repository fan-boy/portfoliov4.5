'use client'
import React from "react";
import { motion } from "framer-motion";

import TransitionWrapper from "../components/TransitionWrapper";
import DefaultPage from "../components/Pages/DefaultPage";
import AnimatedBlobs from "../components/AnimatedBlobs";
import { fadeIn, stagger } from "../lib/animations";
import { useChatOverflow } from "../lib/hooks/useChatOverflow";

const Crashr: React.FC = () => {
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
                <span>Crashr</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>2023</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>Product Designer</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div 
              className="max-w-5xl mx-auto px-6 mb-16"
              variants={fadeIn}
            >
              <h1 className="text-display text-fontprimary leading-[1.1] tracking-tight max-w-4xl">
                One System, Multiple Brands
              </h1>
            </motion.div>

            {/* Hero placeholder */}
            <motion.div 
              className="w-full px-6"
              variants={fadeIn}
            >
              <div className="max-w-7xl mx-auto">
                <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-red-200 aspect-video flex items-center justify-center">
                  <p className="text-orange-600 text-xl">Design System Components</p>
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
                A flexible design system that supports multiple brand identities while maintaining consistency and development efficiency.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed mt-8">
                Designed a unified component architecture for Crashr and Bombers, two gaming platforms with distinct visual identities but shared functionality across desktop and mobile.
              </p>
            </div>
          </section>

          {/* ============================================
              THE CHALLENGE
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Challenge</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Multi-brand architecture
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed">
                How do you build a design system that serves multiple brands with distinct visual identities while keeping the underlying component architecture unified?
              </p>
            </div>
          </section>

          {/* ============================================
              THE APPROACH
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Approach</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-12">
                Token-based theming
              </h2>

              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Understanding Brand Identity</h4>
                    <p className="text-fontsecondary leading-relaxed">Identified elements that needed to be brand-specific (colors, typography, imagery) versus elements that could be shared (spacing, layout patterns, interaction behaviors).</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Setting Up the Foundation</h4>
                    <p className="text-fontsecondary leading-relaxed">Built a token-based architecture: primitive tokens (raw values), semantic tokens (brand-specific mappings), component tokens (consistent across brands).</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Building the Icon System</h4>
                    <p className="text-fontsecondary leading-relaxed">Created a unified icon library that worked across both brands with appropriate style adjustments.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Creating Components</h4>
                    <p className="text-fontsecondary leading-relaxed">Built a component library that could be themed per-brand while maintaining consistent behavior and accessibility standards.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              DELIVERABLES
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase mb-8 block">Deliverables</span>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <h4 className="text-lg text-fontprimary font-medium mb-4">Crashr</h4>
                  <ul className="space-y-2 text-fontsecondary">
                    <li>Desktop design drafts</li>
                    <li>Mobile design drafts</li>
                    <li>Brand-specific tokens</li>
                  </ul>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <h4 className="text-lg text-fontprimary font-medium mb-4">Bombers</h4>
                  <ul className="space-y-2 text-fontsecondary">
                    <li>Desktop design drafts</li>
                    <li>Mobile design drafts</li>
                    <li>Brand-specific tokens</li>
                  </ul>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <h4 className="text-lg text-fontprimary font-medium mb-4">Shared System</h4>
                  <ul className="space-y-2 text-fontsecondary">
                    <li>Unified component library</li>
                    <li>Icon system</li>
                    <li>Documentation</li>
                  </ul>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <h4 className="text-lg text-fontprimary font-medium mb-4">Token Architecture</h4>
                  <ul className="space-y-2 text-fontsecondary">
                    <li>Primitive tokens</li>
                    <li>Semantic tokens</li>
                    <li>Component tokens</li>
                  </ul>
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
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Theming at the token level</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    The key to multi-brand systems is theming at the token level, not the component level. Components stay consistent; tokens change per brand.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Consistent behavior, flexible visuals</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Users expect consistent interaction patterns across platforms. Visual differentiation should not compromise usability.
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
              <a href="/everestos" className="text-h2 text-fontprimary hover:text-orange-600 transition-colors">
                EverestOS →
              </a>
            </div>
          </section>

        </article>
      </DefaultPage>
    </TransitionWrapper>
  );
};

export default Crashr;
