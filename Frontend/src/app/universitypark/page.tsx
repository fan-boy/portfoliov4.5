'use client'
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import TransitionWrapper from "../components/TransitionWrapper";
import DefaultPage from "../components/Pages/DefaultPage";
import AnimatedBlobs from "../components/AnimatedBlobs";
import { fadeIn, stagger } from "../lib/animations";
import { useChatOverflow } from "../lib/hooks/useChatOverflow";

import HeroImage from "../../../public/assets/UniversityPark/hero.webp";
import Research from "../../../public/assets/UniversityPark/research.webp";
import MidFi from "../../../public/assets/UniversityPark/mid-fi.webp";
import Gamification from "../../../public/assets/UniversityPark/gamification.webp";
import Admin from "../../../public/assets/UniversityPark/admin.webp";
import CardSort from "../../../public/assets/UniversityPark/cardsort.webp";

const UniversityPark: React.FC = () => {
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
                <span>University Park</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>2023 to 2024</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>Lead Product Designer</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div 
              className="max-w-5xl mx-auto px-6 mb-16"
              variants={fadeIn}
            >
              <h1 className="text-display text-fontprimary leading-[1.1] tracking-tight max-w-4xl">
                Turning Sustainability From Awareness Into Habit
              </h1>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              className="w-full px-6"
              variants={fadeIn}
            >
              <div className="max-w-7xl mx-auto">
                <div className="relative w-full rounded-2xl overflow-hidden bg-green-50">
                  <Image
                    src={HeroImage}
                    alt="University Park Sustainability Platform"
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
                Most sustainability initiatives fail at the same point: the gap between knowing and doing.
                <span className="font-medium"> University Park had educated residents for years, but awareness wasn&apos;t converting to action.</span>
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed mt-8">
                As lead designer, I didn&apos;t just design screens. I defined the product strategy, ran the research that uncovered what was actually blocking behavior change, and built admin tools that let non-technical committee members manage the platform independently.
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
                Information wasn&apos;t the problem
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                University Park&apos;s Sustainability Committee had the usual toolkit: newsletters, workshops, flyers. Awareness was high. Action was low.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                The gap between &quot;I know I should compost&quot; and &quot;I actually compost&quot; wasn&apos;t an information problem. It was a behavior design problem.
              </p>
            </div>
          </section>

          {/* ============================================
              RESEARCH
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Research</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Understanding the real barriers
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-12">
                I spent the first sprint doing what most projects skip: understanding the real barriers through expert interviews, resident conversations, and committee workshops.
              </p>
            </div>

            {/* Research findings */}
            <div className="max-w-3xl mx-auto px-6 space-y-6">
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">&quot;I know what I should do. I just don&apos;t do it&quot;</p>
                <p className="text-fontsecondary">Residents weren&apos;t lacking information. They were lacking triggers, accountability, and a sense that their individual actions mattered.</p>
              </div>
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">&quot;The committee can&apos;t see what&apos;s working&quot;</p>
                <p className="text-fontsecondary">There was no feedback loop. The committee had no visibility into which initiatives were gaining traction and which were being ignored.</p>
              </div>
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">&quot;One size fits none&quot;</p>
                <p className="text-fontsecondary">A platform designed for sustainability enthusiasts would alienate beginners. A platform for beginners would bore experts. We needed progressive depth.</p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-12">
              <div className="p-8 bg-green-50 rounded-xl border border-green-100">
                <p className="text-xl text-fontprimary leading-relaxed">
                  These insights reframed the project. We weren&apos;t building an educational resource. We were building a <span className="font-medium">behavior change system</span>.
                </p>
              </div>
            </div>
          </section>

          {/* Research visual */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative w-full rounded-2xl overflow-hidden">
                <Image
                  src={Research}
                  alt="User research personas"
                  className="w-full"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* ============================================
              GAMIFICATION STRATEGY
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Approach</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Gamification grounded in behavioral science
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                Gamification has a bad reputation for good reason. Most implementations are shallow. Points and badges bolted onto experiences that don&apos;t need them.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed mb-12">
                But behavior change research says something different: when designed well, game mechanics align with how habits actually form.
              </p>

              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Habit Loop (Duhigg)</h4>
                    <p className="text-fontsecondary leading-relaxed">Cue → Routine → Reward. The platform provides cues (challenges), makes routines easy (bite-sized practices), and delivers rewards (points, badges, recognition).</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Self-Determination Theory</h4>
                    <p className="text-fontsecondary leading-relaxed">Intrinsic motivation requires autonomy, competence, and relatedness. Users choose their practices (autonomy), level up (competence), and see community progress (relatedness).</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Variable Reward Schedules</h4>
                    <p className="text-fontsecondary leading-relaxed">Predictable rewards lose power. The system includes surprise elements: bonus challenges, community milestones, seasonal events.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gamification visual */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative w-full rounded-2xl overflow-hidden bg-gray-50">
                <Image
                  src={Gamification}
                  alt="Gamification system with badges and points"
                  className="w-full"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* ============================================
              DESIGN DECISIONS
              ============================================ */}
          <section className="w-full py-32 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Key Decisions</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-12">
                What we built differently
              </h2>

              <div className="space-y-12">
                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Practices over goals</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Instead of abstract targets (&quot;reduce your carbon footprint&quot;), the platform surfaces specific, actionable practices (&quot;Start a compost bin this week&quot;). Each practice has clear steps and a defined completion state.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Progressive commitment</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    New users start with easy wins (switch to LED bulbs). As they build momentum, harder practices unlock. This prevents the overwhelm that kills most behavior change attempts.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Social visibility, not comparison</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Community forums and celebration of wins, not leaderboards. Research shows comparison demotivates lower performers without improving high performers.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Physical-digital bridge</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    I proposed real-world rewards (garden plaques, recognition at town events) to extend the feedback loop beyond the screen. Digital points feel abstract. A plaque in your yard is concrete.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Community post video */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full rounded-2xl"
              >
                <source src="/assets/UniversityPark/communitypost.mp4" type="video/mp4" />
              </video>
            </div>
          </section>

          {/* ============================================
              INFORMATION ARCHITECTURE
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Information Architecture</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Life contexts, not environmental categories
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                I ran card sorting sessions with residents to understand their mental models. How did they categorize sustainable practices? What groupings felt intuitive?
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                The results surprised me. Residents didn&apos;t think in environmental categories (energy, water, waste). They thought in <span className="text-fontprimary font-medium">life contexts</span> (home, yard, shopping, community).
              </p>
            </div>

            {/* IA flow */}
            <div className="max-w-5xl mx-auto px-6 mt-16">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div className="text-center px-6 py-4 bg-green-50 rounded-xl">
                  <p className="text-lg text-green-600 font-medium">At Home</p>
                </div>
                <div className="text-center px-6 py-4 bg-green-50 rounded-xl">
                  <p className="text-lg text-green-600 font-medium">In Your Yard</p>
                </div>
                <div className="text-center px-6 py-4 bg-green-50 rounded-xl">
                  <p className="text-lg text-green-600 font-medium">When Shopping</p>
                </div>
                <div className="text-center px-6 py-4 bg-green-50 rounded-xl">
                  <p className="text-lg text-green-600 font-medium">In the Community</p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-12">
              <p className="text-xl text-fontsecondary leading-relaxed">
                This reduced cognitive load. Users navigate by context, not by learning our taxonomy.
              </p>
            </div>
          </section>

          {/* Wireframes */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative w-full rounded-2xl overflow-hidden">
                <Image
                  src={MidFi}
                  alt="Mid-fidelity wireframes"
                  className="w-full"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* ============================================
              ADMIN TOOLS
              ============================================ */}
          <section className="w-full py-32 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Admin Tools</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Designing for non-technical maintainers
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                The Sustainability Committee would maintain this platform for years. But committee members aren&apos;t developers. If updating content required code, the platform would rot.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed mb-12">
                I designed a WYSIWYG admin dashboard that treated content management as a first-class design problem, not an afterthought.
              </p>

              <div className="space-y-6">
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <p className="text-lg text-fontprimary font-medium mb-2">Visual content editing</p>
                  <p className="text-fontsecondary">Admins see exactly what residents will see. No preview button, no mental translation from backend to frontend.</p>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <p className="text-lg text-fontprimary font-medium mb-2">Metrics that matter</p>
                  <p className="text-fontsecondary">Actionable data: which practices have the most completions, which challenges are gaining traction, where engagement is dropping. Not vanity metrics. Decision-support data.</p>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <p className="text-lg text-fontprimary font-medium mb-2">Guardrails, not freedom</p>
                  <p className="text-fontsecondary">Admins work within templates. This prevents accidental design breakage while still allowing content flexibility.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Admin visual */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={Admin}
                  alt="Admin dashboard interface"
                  className="w-full"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* ============================================
              USER TESTING
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Iteration</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Testing with real residents
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-12">
                I ran usability sessions with 7 residents across different personas: enthusiasts, skeptics, beginners, tech-savvy, tech-averse.
              </p>

              <div className="space-y-8">
                <div className="flex gap-8 items-start">
                  <div className="w-24 flex-shrink-0">
                    <p className="text-fonttertiary text-sm uppercase tracking-wide">Finding</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-fontprimary font-medium">Gamification confusion</p>
                    <p className="text-fontsecondary mt-1">Some users didn&apos;t understand what points &quot;got&quot; them.</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-green-600 font-medium">Response</p>
                    <p className="text-fontsecondary mt-1">Added clearer explanation of reward system and how levels unlock.</p>
                  </div>
                </div>

                <div className="flex gap-8 items-start">
                  <div className="w-24 flex-shrink-0">
                    <p className="text-fonttertiary text-sm uppercase tracking-wide">Finding</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-fontprimary font-medium">Navigation uncertainty</p>
                    <p className="text-fontsecondary mt-1">&quot;Where do I start?&quot; was common.</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-green-600 font-medium">Response</p>
                    <p className="text-fontsecondary mt-1">Added explicit onboarding flow and featured &quot;Start Here&quot; practices.</p>
                  </div>
                </div>

                <div className="flex gap-8 items-start">
                  <div className="w-24 flex-shrink-0">
                    <p className="text-fonttertiary text-sm uppercase tracking-wide">Finding</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-fontprimary font-medium">Admin complexity</p>
                    <p className="text-fontsecondary mt-1">Initial dashboard had too many options.</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-green-600 font-medium">Response</p>
                    <p className="text-fontsecondary mt-1">Simplified to core tasks with advanced features hidden until needed.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Onboarding video */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full rounded-2xl"
              >
                <source src="/assets/UniversityPark/OnboardingFlow.mp4" type="video/mp4" />
              </video>
            </div>
          </section>

          {/* ============================================
              OUTCOMES
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Outcomes</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                From awareness to action
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-12">
                The platform demonstrated that civic technology doesn&apos;t have to be clunky or condescending. By treating residents as real users, not just recipients of information, we built something people actually wanted to use.
              </p>

              <div className="space-y-6">
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <p className="text-lg text-fontprimary font-medium mb-2">Resident adoption</p>
                  <p className="text-fontsecondary">Majority of targeted households engaged with the platform within first quarter</p>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <p className="text-lg text-fontprimary font-medium mb-2">Committee independence</p>
                  <p className="text-fontsecondary">Non-technical admins managing platform independently within days of handoff. No developer dependency.</p>
                </div>
                <div className="p-8 bg-white rounded-xl border border-gray-200">
                  <p className="text-lg text-fontprimary font-medium mb-2">Replicable model</p>
                  <p className="text-fontsecondary">Other municipalities expressed interest in adapting the approach for their communities</p>
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
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Behavior change requires system design, not just UX</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Pretty screens don&apos;t change habits. You need to understand the psychology of motivation, design for progressive commitment, and create feedback loops that reinforce action. At the lead level, you&apos;re not just designing interfaces. You&apos;re designing systems that shape behavior.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Serve multiple audiences without fragmenting</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Beginners, enthusiasts, and admins all needed different things. But building three separate experiences would have been unsustainable. The challenge was creating progressive depth: a single experience that meets users where they are and grows with them.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Design for maintainability, not just launch</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    A beautiful platform that rots six months after handoff isn&apos;t a success. I designed the admin tools as carefully as the resident experience because long-term impact depends on long-term maintainability.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Civic projects demand extra rigor</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    When you&apos;re designing for a community, not a company&apos;s users, the stakes feel different. People are investing trust in a public resource. That demands extra care in research, extra humility in assumptions, and extra focus on accessibility.
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
              <a href="/dune/risk-platform" className="text-h2 text-fontprimary hover:text-green-600 transition-colors">
                Dune Risk Platform →
              </a>
            </div>
          </section>

        </article>
      </DefaultPage>
    </TransitionWrapper>
  );
};

export default UniversityPark;
