'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Cover from '../../../../public/assets/ArtemisSecurity/Cover Image.webp';
import TransitionWrapper from '../../components/TransitionWrapper';
import DefaultPage from '../../components/Pages/DefaultPage';
import AnimatedBlobs from '../../components/AnimatedBlobs';
import { fadeIn, stagger } from '../../lib/animations';
import { useChatOverflow } from '../../lib/hooks/useChatOverflow';

/**
 * Landing page for the Artemis case study.
 *
 * Follows the same shape as the other case studies — TransitionWrapper +
 * AnimatedBlobs + DefaultPage, a metadata row, a display title, then measured
 * prose in a 3xl column — so it reads as part of the portfolio rather than as
 * a door bolted onto a prototype.
 *
 * The two CTAs are the whole point of the page, so they sit directly under the
 * summary rather than at the bottom: one primary (the thing to actually do),
 * one secondary. Never two primaries.
 */

/* node-id targets the dashboard frame so the file opens there rather than
   wherever the viewer last was. The `t=` session token Figma appends is
   dropped — it is a tracking param, not part of access. */
const FIGMA_URL =
  'https://www.figma.com/design/zUMaDuJ1JaHJQoORNbbn3o/Artemis-Security?node-id=30-1746';


export default function ArtemisLanding() {
  const { chatOpen } = useChatOverflow();

  return (
    <TransitionWrapper>
      {!chatOpen && <AnimatedBlobs expanded={false} loading={false} move={true} />}
      <DefaultPage>
        <article className="w-full z-2">
          <motion.section
            className="w-full pt-32 pb-24"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Metadata — same rhythm as the other case studies */}
            <motion.div className="max-w-4xl mx-auto px-6 mb-6" variants={fadeIn}>
              <div className="flex flex-wrap items-center gap-3 text-fonttertiary text-sm tracking-wide">
                <span>Artemis Security</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted" />
                <span>2026</span>
                <span className="w-1 h-1 rounded-full bg-fontmuted" />
                <span>Product Design</span>
              </div>
            </motion.div>

           

            {/* Cover. Same treatment as the other case studies: 6xl column,
                rounded-2xl, accent-soft behind it so there is no flash before
                the image paints. The static import carries the intrinsic
                3840x1920, so Next reserves the box and nothing shifts. */}
            <motion.div className="w-full px-6 mb-12" variants={fadeIn}>
              <div className="max-w-6xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden bg-accent-soft">
                  <Image
                    src={Cover}
                    alt="The Artemis cases queue, showing critical cases ranked above the review threshold with the agent's verdict and confidence on each row."
                    className="w-full"
                    sizes="(max-width: 768px) 100vw, 1152px"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* The brief. Capped at a readable measure rather than the 4xl the
                title uses — a display line and a paragraph want different widths. */}
            <motion.div className="max-w-3xl mx-auto px-6" variants={fadeIn}>
              <p className="text-xl text-fontsecondary leading-relaxed mb-6">
              Artemis is an AI-native SIEM. Rather than providing raw data, Artemis analyzes alerts and presents conclusions to security teams.
               Unlike other SIEM vendors, Artemis proactively engages the data, gathers evidence, reconstructs the attack chain and proposes a verdict. So the analyst is
                no longer the first investigator. They&rsquo;re the second.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                That changes the job from <em>investigate</em> to <em>adjudicate</em>, and it
                changes the interface&rsquo;s job from &ldquo;give me the data&rdquo; to
                &ldquo;convince me, or let me catch you being wrong.&rdquo; I designed the two
                views that work sits in. A queue that spends attention unevenly, and a case that
                can be checked one claim at a time.
              </p>
              <p>
                The prototype is built heavily using AI and is not fully functioning. It's just there to show the figma screens in action. Also all the test case information is AI generated. 
              </p>
            </motion.div>

            {/* The two things to do. One primary, one secondary — a screen with
                two equally weighted buttons has no next step. */}
            <motion.div className="max-w-3xl mx-auto px-6 mt-12" variants={fadeIn}>
              <div className="flex flex-wrap items-center gap-3">
                {/* --accent-secondary, not --accent-primary: white on #6366F1 is
                    4.47:1, under AA. #4F46E5 is 6.29:1 and is already the token
                    for this job. */}
                <Link
                  href="/experiments/artemissecurity/cases"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-full
                             bg-accent-secondary text-white text-lg font-medium
                             transition-[box-shadow,scale] duration-150 ease-out
                             hover:shadow-md active:scale-[0.97]
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fonttertiary"
                >
                  Open the prototype
                </Link>
                <a
                  href={FIGMA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full
                             border border-black/[0.12] bg-bg-elevated text-lg text-fontprimary
                             transition-[color,border-color,scale] duration-150 ease-out
                             hover:border-accent hover:text-accent-secondary active:scale-[0.97]
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fonttertiary"
                >
                  View in Figma
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </motion.div>

          </motion.section>
        </article>
      </DefaultPage>
    </TransitionWrapper>
  );
}
