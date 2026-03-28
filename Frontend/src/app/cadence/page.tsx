'use client'
import React from "react";
import { motion } from "framer-motion";

import TransitionWrapper from "../components/TransitionWrapper";
import DefaultPage from "../components/Pages/DefaultPage";
import AnimatedBlobs from "../components/AnimatedBlobs";
import { fadeIn, stagger } from "../lib/animations";
import { useChatOverflow } from "../lib/hooks/useChatOverflow";

const Cadence: React.FC = () => {
  const { chatOpen } = useChatOverflow();

  return (
    <TransitionWrapper>
      {!chatOpen && (
        <AnimatedBlobs expanded={false} loading={false} move={true} />
      )}
      <DefaultPage>
        <article className="w-full">
          
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
                <span>Cadence</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>June to August 2024</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>Lead Designer & Developer</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div 
              className="max-w-4xl mx-auto px-6 mb-12"
              variants={fadeIn}
            >
              <h1 className="text-display">
                When Body Movement Creates Music
              </h1>
            </motion.div>

            {/* Hero placeholder */}
            <motion.div 
              className="w-full px-6"
              variants={fadeIn}
            >
              <div className="max-w-6xl mx-auto">
                <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-violet-100 to-purple-200 aspect-video flex items-center justify-center">
                  <p className="text-violet-600 text-xl">Interactive Installation Demo</p>
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
                An interactive art installation that transforms body movement into an audiovisual experience.
                <span className="font-medium"> Developed for NextNow Fest 2024 at the University of Maryland.</span>
              </p>
              <p className="text-lg text-fontsecondary leading-relaxed mt-8">
                As lead designer and developer, I designed new interaction patterns, built the technical prototype using motion detection, and created an immersive projection-mapped experience that users described as &quot;magical.&quot;
              </p>
            </div>
          </section>

          {/* ============================================
              THE CHALLENGE
              ============================================ */}
          <section id="the-challenge" className="w-full py-24 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Challenge</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary mt-4 mb-6 tracking-tight">
                Music from movement
              </h2>
              <p className="text-lg text-fontsecondary leading-relaxed mb-8">
                How might we create a seamless and harmonious experience where users could influence music and visuals through their movements?
              </p>
              <p className="text-lg text-fontsecondary leading-relaxed">
                The idea came from an unexpected place: watching the movie Whiplash. An orchestra conductor controls music through body movement. What if anyone could do that?
              </p>
            </div>
          </section>

          {/* ============================================
              TECHNICAL APPROACH
              ============================================ */}
          <section id="approach" className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Approach</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary mt-4 mb-12 tracking-tight">
                Building the experience
              </h2>

              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-violet-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">POC Phase</h4>
                    <p className="text-fontsecondary leading-relaxed">Built a basic theremin-like interface using TouchDesigner and Kinect Azure to validate the core concept of motion-to-sound.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-violet-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Visual Layer</h4>
                    <p className="text-fontsecondary leading-relaxed">Added audio-reactive particle cloud visualizations that responded to both the music and user movement.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-violet-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Physical Surfaces</h4>
                    <p className="text-fontsecondary leading-relaxed">Built custom projection surfaces using cardboard, white paper, and spray paint. Used Kantan Mapper for multi-surface projection mapping.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-violet-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Pivot</h4>
                    <p className="text-fontsecondary leading-relaxed">Original goal of generating music from scratch proved too difficult. Pivoted to modifying existing music based on movement, achieving the creative vision within technical constraints.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              TECH STACK
              ============================================ */}
          <section id="tech-stack" className="w-full py-24 bg-bg-secondary">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                  <p className="text-violet-600 font-medium mb-2">Motion Detection</p>
                  <p className="text-fontsecondary text-sm">Kinect Azure</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                  <p className="text-violet-600 font-medium mb-2">Audio</p>
                  <p className="text-fontsecondary text-sm">Max MSP</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                  <p className="text-violet-600 font-medium mb-2">Visuals</p>
                  <p className="text-fontsecondary text-sm">TouchDesigner</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                  <p className="text-violet-600 font-medium mb-2">Projection</p>
                  <p className="text-fontsecondary text-sm">Kantan Mapper</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              USER TESTING
              ============================================ */}
          <section id="user-testing" className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">User Testing</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary mt-4 mb-6 tracking-tight">
                Testing with 10 users
              </h2>

              <div className="space-y-6">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <p className="text-lg text-fontprimary font-medium mb-2">Magical experience</p>
                  <p className="text-fontsecondary">Users described the experience as &quot;magical&quot; and feeling &quot;part of the art.&quot;</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <p className="text-lg text-fontprimary font-medium mb-2">Unclear interaction patterns</p>
                  <p className="text-fontsecondary">Gestures for changing music weren&apos;t immediately intuitive. Updated to make interactions more discoverable.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              LEARNINGS
              ============================================ */}
          <section id="learnings" className="w-full py-24 bg-bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Reflection</span>
              <h2 className="text-3xl md:text-4xl text-fontprimary mt-4 mb-12 tracking-tight">
                What I learned
              </h2>

              <div className="space-y-12">
                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Designing new interaction patterns</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Combining familiar elements with novel interactions leads to more intuitive experiences. Continuous experimentation and iteration were essential.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Balancing technical and creative</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Flexibility matters. When the original goal proved too difficult technically, pivoting allowed us to achieve the creative vision within constraints.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-12">
              <p className="text-fontsecondary">
                <span className="text-fontprimary font-medium">Team:</span> Collaborated with Arjav Jain
              </p>
            </div>
          </section>

          {/* ============================================
              NEXT PROJECT CTA
              ============================================ */}
          <section className="w-full py-24">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-fonttertiary text-sm tracking-wider uppercase mb-4">Next Project</p>
              <a href="/crashr" className="text-2xl md:text-3xl text-fontprimary tracking-tight hover:text-violet-600 transition-colors">
                Crashr Design System →
              </a>
            </div>
          </section>

        </article>
      </DefaultPage>
    </TransitionWrapper>
  );
};

export default Cadence;
