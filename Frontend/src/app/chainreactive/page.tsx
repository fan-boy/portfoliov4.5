'use client'
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import TransitionWrapper from "../components/TransitionWrapper";
import DefaultPage from "../components/Pages/DefaultPage";
import AnimatedBlobs from "../components/AnimatedBlobs";
import { fadeIn, stagger } from "../lib/animations";
import { useChatOverflow } from "../lib/hooks/useChatOverflow";

import MenuExample from "../../../public/assets/ChainReactive/menu-example.webp";
import ThaiExample from "../../../public/assets/ChainReactive/thai-example.webp";
import CafeExample from "../../../public/assets/ChainReactive/cafe-example.webp";

const ChainReactive: React.FC = () => {
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
                <span>Chain Reactive</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted"></span>
                <span>2020 to 2021</span>
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
                How I Identified and Captured a $60M Market Opportunity
              </h1>
            </motion.div>

            {/* Hero Video */}
            <motion.div 
              className="w-full px-6"
              variants={fadeIn}
            >
              <div className="max-w-7xl mx-auto">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full rounded-2xl"
                >
                  <source src="/assets/ChainReactive/hero.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </motion.section>

          {/* ============================================
              SUMMARY
              ============================================ */}
          <section className="w-full py-24">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-2xl md:text-3xl text-fontprimary leading-relaxed font-light">
                While DoorDash and Uber Eats fought over delivery marketplaces, I saw a different opportunity.
                <span className="font-medium"> Small-town restaurants didn&apos;t need another middleman taking 30% of their margins.</span>
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed mt-8">
                As lead designer, I identified the market gap through systematic research, designed a platform that addressed multiple business challenges simultaneously, and influenced the company&apos;s pivot from POS vendor to platform provider.
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
                What the big players missed
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                COVID created a forcing function for digital transformation in markets that had resisted technology for decades. The existing options were terrible for small-town businesses.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                Marketplace apps charged 15-30% commissions on already thin margins. They required complex onboarding, offered no POS integration, and provided zero value for pickup-focused businesses.
              </p>
            </div>

            {/* Competitive gap */}
            <div className="max-w-5xl mx-auto px-6 mt-16">
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h3 className="text-sm tracking-wider uppercase text-fonttertiary mb-6">What Marketplaces Offered</h3>
                  <ul className="space-y-4">
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Delivery logistics
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Customer acquisition
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Brand aggregation
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      15-30% commissions
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm tracking-wider uppercase text-emerald-600 mb-6">What Small Businesses Needed</h3>
                  <ul className="space-y-4">
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-emerald-500">→</span>
                      Pickup optimization
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-emerald-500">→</span>
                      Customer retention
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-emerald-500">→</span>
                      Brand control
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-emerald-500">→</span>
                      Operational cost savings
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              MARKET SIZING
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Market Opportunity</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-16">
                The numbers
              </h2>
            </div>

            <div className="max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-10 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-5xl font-light text-emerald-600 mb-4">50K</div>
                  <p className="text-fontsecondary">Small-town restaurants needing integrated solutions</p>
                </div>
                <div className="p-10 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-5xl font-light text-emerald-600 mb-4">200K+</div>
                  <p className="text-fontsecondary">Adjacent small retail businesses facing similar challenges</p>
                </div>
                <div className="p-10 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-5xl font-light text-emerald-600 mb-4">$60M</div>
                  <p className="text-fontsecondary">Total addressable opportunity in our segment</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              RESEARCH INSIGHT
              ============================================ */}
          <section className="w-full py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">The Key Insight</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Decision fatigue as design constraint
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                I spent weeks doing field research in small college towns. Not surveys. Actual time in restaurants, talking to owners, watching how they operated.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                The key finding: college students made 3-5 daily micro-decisions before 11 AM. Cognitive load from complex menus directly correlated with cart abandonment. And 67% of orders were repeats. Nobody was optimizing for that.
              </p>
            </div>

            {/* Research findings */}
            <div className="max-w-3xl mx-auto px-6 mt-16 space-y-6">
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">Decision fatigue epidemic</p>
                <p className="text-fontsecondary">Users weren&apos;t struggling with our interface. They were struggling with decisions themselves. More choice led to more abandonment.</p>
              </div>
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">Staffing crisis</p>
                <p className="text-fontsecondary">Restaurants were operating at 40-60% capacity not because of demand, but because they couldn&apos;t hire. Any solution requiring staff training was dead on arrival.</p>
              </div>
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">Safety imperative</p>
                <p className="text-fontsecondary">Physical menus were liability concerns. Existing QR solutions required app downloads and broke constantly.</p>
              </div>
              <div className="p-8 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-fontprimary font-medium mb-2">Margin pressure</p>
                <p className="text-fontsecondary">Small-town restaurants operate on 3-5% margins. Marketplace commissions of 15-30% weren&apos;t sustainable.</p>
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
                2-step ordering in under 60 seconds
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                I eliminated decision complexity through progressive disclosure. The entire ordering flow:
              </p>
            </div>

            {/* 2-step flow */}
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="text-center px-12 py-8 bg-emerald-50 rounded-xl flex-1">
                  <div className="text-6xl font-light text-emerald-600 mb-4">1</div>
                  <p className="text-xl text-fontprimary font-medium mb-2">What do you want?</p>
                  <p className="text-fontsecondary">Smart suggestions based on time, history, popularity</p>
                </div>
                <div className="text-fontmuted text-4xl">→</div>
                <div className="text-center px-12 py-8 bg-emerald-50 rounded-xl flex-1">
                  <div className="text-6xl font-light text-emerald-600 mb-4">2</div>
                  <p className="text-xl text-fontprimary font-medium mb-2">When do you want it?</p>
                  <p className="text-fontsecondary">Pickup time selection</p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-16">
              <div className="p-8 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-xl text-fontprimary leading-relaxed">
                  That&apos;s it. Two steps. <span className="font-medium">Under 60 seconds.</span> With 67% of orders being repeats, previous orders surfaced immediately on return visits for one-tap reordering.
                </p>
              </div>
            </div>
          </section>

          {/* Order flow visual */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={MenuExample}
                  alt="Chain Reactive ordering interface"
                  className="w-full"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* ============================================
              MULTI-PROBLEM ARCHITECTURE
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Systems Thinking</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Four problems, one platform
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-12">
                Small businesses don&apos;t have separate problems. They have interconnected challenges. I designed Chain Reactive to solve four problems simultaneously:
              </p>

              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Staffing Crisis</h4>
                    <p className="text-fontsecondary leading-relaxed">Self-service ordering reduced front-of-house staff requirements by 40%. Zero staff training required.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Safety Concerns</h4>
                    <p className="text-fontsecondary leading-relaxed">In-restaurant QR ordering eliminated physical menu contact. Seamless transition between remote and on-premise ordering.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Brand Control</h4>
                    <p className="text-fontsecondary leading-relaxed">Template-based approach with strategic flexibility points. Restaurants kept their identity, not buried under a marketplace brand.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-fontprimary font-medium mb-2">Technical Complexity</h4>
                    <p className="text-fontsecondary leading-relaxed">Real-time POS integration eliminated manual inventory management. Sophisticated backend, simple frontend.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Brand examples */}
          <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative w-full rounded-2xl overflow-hidden">
                  <Image
                    src={CafeExample}
                    alt="Cafe branded ordering"
                    className="w-full"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="relative w-full rounded-2xl overflow-hidden">
                  <Image
                    src={ThaiExample}
                    alt="Thai restaurant branded ordering"
                    className="w-full"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
              <p className="text-center text-fontsecondary mt-4">Same UX, different restaurant brands</p>
            </div>
          </section>

          {/* ============================================
              DATA-DRIVEN OPTIMIZATION
              ============================================ */}
          <section className="w-full py-32 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Data-Driven Optimization</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                Checkout abandonment: 78% → 23%
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                Initial analytics revealed a serious problem: 78% drop-off at checkout (industry benchmark: 45%). Users were making it through ordering but abandoning at payment.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                The issue wasn&apos;t UX friction. It was trust. Small-town customers were skeptical of entering payment info on unfamiliar websites.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                <span className="text-fontprimary font-medium">Solution:</span> One-click checkout with saved payment methods, trust signals, and payment info saved across all Chain Reactive restaurants (network effect).
              </p>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-12">
              <div className="p-8 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-xl text-fontprimary leading-relaxed">
                  Result: Checkout abandonment dropped from 78% to 23%. <span className="font-medium">A 52% improvement.</span>
                </p>
              </div>
            </div>
          </section>

          {/* ============================================
              BUSINESS MODEL INFLUENCE
              ============================================ */}
          <section className="w-full py-32">
            <div className="max-w-3xl mx-auto px-6">
              <span className="text-fonttertiary text-sm tracking-wider uppercase">Strategic Influence</span>
              <h2 className="text-h1 text-fontprimary mt-4 mb-8">
                From POS vendor to platform provider
              </h2>
              <p className="text-xl text-fontsecondary leading-relaxed mb-8">
                The design strategy didn&apos;t just shape the product. It reshaped the company.
              </p>
            </div>

            <div className="max-w-5xl mx-auto px-6 mt-12">
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h3 className="text-sm tracking-wider uppercase text-fonttertiary mb-6">Before</h3>
                  <ul className="space-y-4">
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      POS vendor selling hardware and licenses
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      One-time sales model
                    </li>
                    <li className="text-fontsecondary flex items-start gap-3">
                      <span className="text-fontmuted">→</span>
                      Limited customer stickiness
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm tracking-wider uppercase text-emerald-600 mb-6">After</h3>
                  <ul className="space-y-4">
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-emerald-500">→</span>
                      Platform-as-a-service with recurring revenue
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-emerald-500">→</span>
                      Integration creates massive switching costs
                    </li>
                    <li className="text-fontprimary flex items-start gap-3">
                      <span className="text-emerald-500">→</span>
                      100% pilot retention
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-16">
              <p className="text-xl text-fontsecondary leading-relaxed">
                <span className="text-fontprimary font-medium">International expansion:</span> The platform successfully deployed in Thailand, proving the model wasn&apos;t US-specific but applicable to underserved small business markets globally.
              </p>
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
                  <div className="text-6xl font-light text-emerald-600 mb-4">30-40%</div>
                  <p className="text-fontsecondary">Monthly revenue increase across pilot businesses</p>
                </div>
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-emerald-600 mb-4">$2,400</div>
                  <p className="text-fontsecondary">Average monthly labor cost savings per business</p>
                </div>
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-emerald-600 mb-4">100%</div>
                  <p className="text-fontsecondary">Pilot retention (vs. 67% industry average)</p>
                </div>
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-emerald-600 mb-4">&lt;60s</div>
                  <p className="text-fontsecondary">Order completion time (vs. 3-5 min industry)</p>
                </div>
              </div>
            </div>

            {/* Additional metrics */}
            <div className="max-w-5xl mx-auto px-6 mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-emerald-600 mb-4">67%</div>
                  <p className="text-fontsecondary">Repeat order rate (vs. 31% for marketplaces)</p>
                </div>
                <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center">
                  <div className="text-6xl font-light text-emerald-600 mb-4">73%</div>
                  <p className="text-fontsecondary">Lower customer acquisition cost vs. marketplace</p>
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
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Crisis creates adoption windows</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Small businesses are notoriously resistant to technology adoption. COVID changed that equation. At the lead level, you recognize when market conditions create opportunities that pure product quality can&apos;t manufacture.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Constraint-driven design creates competitive advantage</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    The limitations of small-town markets forced design decisions that became our moat. Simple interfaces, deep integrations, trust-building patterns. These weren&apos;t compromises. They were strategic advantages.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Integration beats aggregation in underserved markets</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    Marketplaces aggregate supply and demand. In underserved markets, the value is in making existing businesses work better, not connecting them to more customers.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-fontprimary font-medium mb-3">Design the business case, not just the experience</h3>
                  <p className="text-fontsecondary leading-relaxed">
                    I didn&apos;t pitch the 2-step ordering flow as &quot;better UX.&quot; I pitched it as &quot;$2,400/month in labor savings.&quot; Framing design decisions in business outcomes got leadership buy-in and resources.
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
              <a href="/universitypark" className="text-h2 text-fontprimary hover:text-emerald-600 transition-colors">
                University Park →
              </a>
            </div>
          </section>

        </article>
      </DefaultPage>
    </TransitionWrapper>
  );
};

export default ChainReactive;
