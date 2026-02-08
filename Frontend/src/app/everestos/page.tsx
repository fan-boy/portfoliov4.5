'use client'
import React from "react";
import { motion } from "framer-motion";

import TransitionWrapper from "../components/TransitionWrapper";
import DefaultPage from "../components/Pages/DefaultPage";
import AnimatedBlobs from "../components/AnimatedBlobs";
import { fadeIn, stagger } from "../lib/animations";
import { useChatOverflow } from "../lib/hooks/useChatOverflow";

const EverestOS: React.FC = () => {
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
                <span>EverestOS</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>2023</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>Personal Project</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div 
              className="max-w-5xl mx-auto px-6 mb-16"
              variants={fadeIn}
            >
              <h1 className="text-display text-fontprimary leading-[1.1] tracking-tight max-w-4xl">
                Reimagining the Desktop Experience
              </h1>
            </motion.div>

            {/* Hero placeholder */}
            <motion.div 
              className="w-full px-6"
              variants={fadeIn}
            >
              <div className="max-w-7xl mx-auto">
                <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-200 aspect-video flex items-center justify-center">
                  <p className="text-blue-600 text-xl">Conceptual OS Design</p>
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
                A conceptual exploration of what a modern operating system could look like.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed mt-8">
                Focused on high visual polish, consistency, and building a cohesive design language that could work across all system components.
              </p>
            </div>
          </section>

          {/* ============================================
              RESEARCH
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Research</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Evolution of OS design
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-12">
                First step was understanding how operating systems have evolved visually over the decades.
              </p>
            </div>

            <div className="max-w-5xl mx-auto px-6">
              <div className="space-y-8">
                <div className="flex gap-8 items-start">
                  <div className="w-32 flex-shrink-0">
                    <p className="text-blue-600 font-medium">1950s to 1960s</p>
                  </div>
                  <p className="text-fontsecondary">No real operating systems. Computers programmed directly in machine code or assembly language.</p>
                </div>

                <div className="flex gap-8 items-start">
                  <div className="w-32 flex-shrink-0">
                    <p className="text-blue-600 font-medium">1970s to 1980s</p>
                  </div>
                  <p className="text-fontsecondary">First GUIs emerged. Apple Lisa and Macintosh introduced the desktop metaphor with icons and mouse. Windows 1.0 launched with a simple GUI.</p>
                </div>

                <div className="flex gap-8 items-start">
                  <div className="w-32 flex-shrink-0">
                    <p className="text-blue-600 font-medium">1990s to 2000s</p>
                  </div>
                  <p className="text-fontsecondary">Windows 95 brought the Start menu. Mac OS X introduced Aqua. Skeuomorphism dominated with glossy, realistic interfaces.</p>
                </div>

                <div className="flex gap-8 items-start">
                  <div className="w-32 flex-shrink-0">
                    <p className="text-blue-600 font-medium">2010s</p>
                  </div>
                  <p className="text-fontsecondary">Flat design revolution. Windows 8 Metro UI, iOS 7, Material Design. Touch-friendly interfaces for mobile. Minimalism became dominant.</p>
                </div>

                <div className="flex gap-8 items-start">
                  <div className="w-32 flex-shrink-0">
                    <p className="text-blue-600 font-medium">Present</p>
                  </div>
                  <p className="text-fontsecondary">Glassmorphism, subtle depth, dark modes. Gesture-based navigation. Convergence of desktop and mobile paradigms.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              DESIGN APPROACH
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Approach</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-12">
                Design principles
              </h2>

              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Visual Polish</h4>
                    <p className="text-fontsecondary leading-relaxed">Creating a visually refined experience that feels modern without sacrificing usability. Subtle depth, refined typography, and careful color application.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Consistency</h4>
                    <p className="text-fontsecondary leading-relaxed">A design language that applies consistently across all system components: windows, menus, notifications, settings, file management.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">System Design</h4>
                    <p className="text-fontsecondary leading-relaxed">Comprehensive design system including color system with light/dark modes, typography scale, spacing guidelines, component library, and motion principles.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              DESIGN SYSTEM
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase mb-8 block">Design System</span>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <h4 className="text-lg text-fontprimary font-medium mb-4">Color</h4>
                  <ul className="space-y-2 text-fontsecondary">
                    <li>Light and dark modes</li>
                    <li>Semantic color tokens</li>
                    <li>Accessible contrast ratios</li>
                  </ul>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <h4 className="text-lg text-fontprimary font-medium mb-4">Typography</h4>
                  <ul className="space-y-2 text-fontsecondary">
                    <li>System font stack</li>
                    <li>Clear hierarchy</li>
                    <li>Readable at all sizes</li>
                  </ul>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <h4 className="text-lg text-fontprimary font-medium mb-4">Components</h4>
                  <ul className="space-y-2 text-fontsecondary">
                    <li>Buttons and inputs</li>
                    <li>Windows and dialogs</li>
                    <li>Navigation elements</li>
                  </ul>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <h4 className="text-lg text-fontprimary font-medium mb-4">Icons</h4>
                  <ul className="space-y-2 text-fontsecondary">
                    <li>Consistent style</li>
                    <li>Multiple sizes</li>
                    <li>System and app icons</li>
                  </ul>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <h4 className="text-lg text-fontprimary font-medium mb-4">Motion</h4>
                  <ul className="space-y-2 text-fontsecondary">
                    <li>Easing curves</li>
                    <li>Transitions</li>
                    <li>Micro-interactions</li>
                  </ul>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <h4 className="text-lg text-fontprimary font-medium mb-4">Layout</h4>
                  <ul className="space-y-2 text-fontsecondary">
                    <li>Spacing scale</li>
                    <li>Grid system</li>
                    <li>Responsive patterns</li>
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
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Historical context matters</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Understanding how OS design has evolved helps identify patterns that work and opportunities for innovation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">System-level thinking</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Designing an OS requires thinking about how hundreds of different contexts and use cases work together cohesively.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Constraints drive innovation</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Working within the constraints of what users expect from an OS (familiar patterns, discoverability) while pushing visual boundaries.
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
              <a href="/dune/workflows" className="text-h2 text-fontprimary hover:text-blue-600 transition-colors">
                Dynamic Workflows →
              </a>
            </div>
          </section>

        </article>
      </DefaultPage>
    </TransitionWrapper>
  );
};

export default EverestOS;
