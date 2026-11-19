"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import TransitionWrapper from "./components/TransitionWrapper";
import AnimatedBlobs from "./components/AnimatedBlobs";
import DuneOrgDashboard from "../../public/assets/Dune/dashboard.webp";
import DuneDesignSystem from "../../public/assets/Dune/DesignSystem.webp";
import AEPTestAndRefine from "../../public/assets/Dune/AEP/step-test.jpg";
import UniversityParkDashboard from "../../public/assets/UniversityPark/redesign/dashboard-1.jpg";
import UniversityParkDashboardLower from "../../public/assets/UniversityPark/redesign/dashboard-2.jpg";
// import ChainReactiveHero from "../../public/assets/ChainReactive/hero.webp";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import DefaultPage from "./components/Pages/DefaultPage";
import { fadeIn, staggerSlow } from "./lib/animations";
import { useChatOverflow } from "./lib/hooks/useChatOverflow";
import { UNIVERSITY_PARK_GRADIENT } from "./lib/universityPark";
import TrinketLedge from "./components/TrinketLedge/TrinketLedge";

interface Project {
  title: string;
  /** What the project set out to do: the case study's own headline. */
  summary: string;
  href: string;
  image: StaticImageData;
  /** Plays in place of the image when set. */
  video?: string;
  /** Use the image as the video's poster. Off when the image doesn't match the video's first frame. */
  imageIsPoster?: boolean;
  /** Gives the card a layered look: this image behind, the screen floating on it. */
  background?: string;
  /** A CSS background-image (e.g. gradients) for the layered look, in place of an image file. */
  backgroundCss?: string;
  /** Slices of one tall screen, stacked; the window scrolls through them on a loop. */
  scroll?: StaticImageData[];
  /** Flip the background horizontally, so two cards can share one image without matching. */
  backgroundMirrored?: boolean;
  /** Turn the background 180°, a third way to share one image. */
  backgroundRotated?: boolean;
  company: string;
  year: string;
}

const projects: Project[] = [
  {
    title: "Risk Platform",
    summary: "Making security risk understandable and actionable",
    href: "/dune/risk-platform",
    image: DuneOrgDashboard,
    // Built in Figma: "Portfolio — hero video" page of the Dune master file.
    video: "/assets/Dune/RiskHeroLoop.mp4",
    imageIsPoster: true,
    background: "/assets/Dune/RiskCardBg.webp",
    company: "Dune Security",
    year: "2025",
  },
  {
    title: "Stillsuit Design System",
    summary: "Building a design system for speed and consistency",
    href: "/dune/stillsuit",
    image: DuneDesignSystem,
    // Built in Figma: "Portfolio — card video" page of the Stillsuit DS v2 file. The real
    // dashboard rendered with the Components collection in Dark, then Light mode.
    video: "/assets/Dune/StillsuitFlipLoop.mp4",
    background: "/assets/Dune/RiskCardBg.webp",
    backgroundMirrored: true,
    company: "Dune Security",
    year: "2024",
  },
  {
    title: "Persona Builder",
    summary: "Designing the UX that trains the AI",
    href: "/dune/persona-creation",
    image: AEPTestAndRefine,
    // Built in Figma: "Portfolio — hero video" page of the Dune master file, from the
    // Red Teaming video states. A test chat plays out, an instruction is applied, the chat resets.
    video: "/assets/Dune/AEP/AEPCardLoop.mp4",
    background: "/assets/Dune/RiskCardBg.webp",
    backgroundRotated: true,
    company: "Dune Security",
    year: "2026",
  },
  {
    title: "University Park",
    summary: "Turning sustainability from awareness into habit",
    href: "/universitypark",
    image: UniversityParkDashboard,
    // The redesigned resident dashboard (Upark Figma file, "Redesign — desktop (2026)"),
    // scrolled in CSS since Figma's video export fails in that file.
    scroll: [UniversityParkDashboard, UniversityParkDashboardLower],
    backgroundCss: UNIVERSITY_PARK_GRADIENT,
    company: "University Park",
    year: "2023–2024",
  },
  // Hidden for launch - keeping code intact
  // {
  //   title: "Chain Reactive",
  //   summary: "How I identified and captured a $60M market opportunity",
  //   href: "/chainreactive",
  //   image: ChainReactiveHero,
  //   company: "Startup",
  //   year: "2021",
  // },
];

// Hidden for launch - keeping code intact
// const selectedWork = [
//   {
//     title: "Dynamic Workflows",
//     subtitle: "Automated remediation saving 40+ hours/month",
//     href: "/dune/workflows",
//     company: "Dune Security",
//     year: "2024",
//   },
//   {
//     title: "Crashr",
//     subtitle: "Multi-brand design system for gaming platforms",
//     href: "/crashr",
//     company: "Freelance",
//     year: "2023",
//   },
// ];

interface SideProject {
  title: string;
  description: string;
  stack: string[];
  /** Leave out until it has somewhere to go; the row renders without a link. */
  href?: string;
}

const sideProjects: SideProject[] = [
  {
    title: "Swingscope",
    description: "AI-powered swing trading scanner. Real market data, Claude enrichment, risk controls.",
    stack: ["Next.js", "Python", "Claude API", "Polygon.io"],
    href: "https://swingscope.app",
  },
  {
    title: "Zine",
    description: "A digital zine creation and publishing platform. Rich layouts, no design tools required.",
    stack: ["Next.js", "TypeScript", "Node.js"],
  },
];

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const CARD_BG = "#F0F1F8";

/**
 * A case study's video. With a poster the card is never empty while it loads;
 * without one, the first frame shows as soon as it arrives. Under reduced
 * motion it stays on that still.
 */
function ProjectVideo({ src, poster }: { src: string; poster?: string }) {
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
    <video
      ref={ref}
      // autoPlay lets the browser keep retrying if an early play() is interrupted;
      // the effect above only has to pause it for reduced motion.
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      preload="auto"
      aria-hidden="true"
      className="h-full w-full object-cover object-left-top"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

/**
 * Stacked slices of one tall screen that scroll inside their window: hold at the
 * top, halfway and the bottom, then return (the .screen-scroll keyframes in
 * globals.css). The travel is measured, since the window's height depends on the card.
 */
function ScrollingScreen({ slices }: { slices: StaticImageData[] }) {
  const windowRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const win = windowRef.current;
    const strip = stripRef.current;
    if (!win || !strip) return;
    const measure = () => setTravel(Math.max(0, strip.offsetHeight - win.offsetHeight));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(win);
    observer.observe(strip);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={windowRef} className="h-full w-full overflow-hidden" aria-hidden="true">
      <div
        ref={stripRef}
        className={travel > 0 ? "screen-scroll" : undefined}
        style={{ ["--travel" as string]: `${travel}px` }}
      >
        {slices.map((slice, i) => (
          <Image key={i} src={slice} alt="" className="block h-auto w-full" sizes="(min-width: 1024px) 912px, 94vw" />
        ))}
      </div>
    </div>
  );
}

/**
 * The background image is its own layer and the screen floats on it, so hover
 * can move them apart: the background swells while the screen rises and its
 * shadow deepens. The screen is taller than the space below it so it always
 * bleeds off the bottom edge, even while lifted.
 */
function LayeredMedia({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[1540/1000] overflow-hidden rounded-2xl isolate">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        style={{
          backgroundImage: project.backgroundCss ?? `url(${project.background})`,
          transform: project.backgroundMirrored ? "scaleX(-1)" : project.backgroundRotated ? "rotate(180deg)" : undefined,
          transitionTimingFunction: EASE,
        }}
      />
      <div
        className="absolute transition-transform duration-500 group-hover:-translate-y-2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
        style={{ left: "6.49%", top: "10%", width: "93.51%", height: "calc(90% + 48px)", transitionTimingFunction: EASE }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-tl-[12px]"
          style={{ boxShadow: "0 2px 6px rgba(13,64,26,0.10), 0 18px 48px rgba(13,64,26,0.12)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-tl-[12px] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none"
          style={{ boxShadow: "0 6px 14px rgba(13,64,26,0.12), 0 32px 72px rgba(13,64,26,0.18)" }}
        />
        <div className="relative h-full w-full overflow-hidden rounded-tl-[12px] bg-white">
          {project.scroll ? (
            <ScrollingScreen slices={project.scroll} />
          ) : project.video ? (
            <ProjectVideo src={project.video} poster={project.imageIsPoster ? project.image.src : undefined} />
          ) : (
            <Image
              src={project.image}
              alt=""
              className="h-full w-full object-cover object-left-top"
              sizes="(min-width: 1024px) 912px, 94vw"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100 pb-4 mb-10">
      <p className="m-0 text-sm text-fonttertiary uppercase tracking-wider">{children}</p>
    </div>
  );
}

export default function Home() {
  const { chatOpen } = useChatOverflow();

  return (
    <TransitionWrapper>
      {!chatOpen && (
        <AnimatedBlobs expanded={false} loading={false} move={true} />
      )}
      <DefaultPage>
        {/* .home-page opts this page out of the bare h1–h6 / p / section rules in
            globals.css, so the utilities below are what renders. */}
        <div className="home-page w-full">

          {/* ============================================
              HERO
              ============================================ */}
          <motion.section
            className="w-full pt-16 pb-16 relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerSlow}
          >
            <div className="max-w-5xl mx-auto px-6">
              <motion.p className="m-0 mb-6 text-fonttertiary text-base tracking-wider uppercase" variants={fadeIn}>
                Aaditya Shete
              </motion.p>
              <motion.h1
                className="m-0 max-w-3xl text-[2.75rem] leading-[1.1] md:text-[5rem] md:leading-[1.05] font-normal tracking-[-0.02em] text-fontprimary text-balance"
                variants={fadeIn}
              >
                Building products where complexity feels effortless.
              </motion.h1>
            </div>
            <motion.div className="max-w-5xl mx-auto px-6 mt-12 md:mt-16" variants={fadeIn}>
              <p className="m-0 max-w-md text-lg text-fontsecondary leading-relaxed text-pretty">
                Product designer blending visual clarity with AI-first workflows. Currently at{" "}
                <span className="text-fontprimary">Dune Security</span>.
              </p>
            </motion.div>
          </motion.section>

          {/* ============================================
              WORK
              ============================================ */}
          <section className="w-full pb-32" aria-label="Work">
            <div className="max-w-5xl mx-auto px-6 flex flex-col gap-20">
              {projects.map((project, index) => (
                <Link key={project.title} href={project.href} className="group block">
                  {project.background || project.backgroundCss ? (
                    <LayeredMedia project={project} />
                  ) : (
                    // The screenshot sits inset from the top-left and bleeds off the
                    // bottom-right, so it reads as a window onto the product.
                    <div className="overflow-hidden rounded-2xl pt-8 pl-8 sm:pt-16 sm:pl-16" style={{ backgroundColor: CARD_BG }}>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-tl-lg">
                        {project.video ? (
                          <ProjectVideo src={project.video} poster={project.imageIsPoster ? project.image.src : undefined} />
                        ) : (
                          <Image
                            src={project.image}
                            alt=""
                            className="h-full w-full object-cover object-left-top rounded-tl-lg origin-top-left scale-[1.04] group-hover:scale-100 transition-transform duration-700"
                            style={{ transitionTimingFunction: EASE }}
                            sizes="(min-width: 1024px) 976px, 100vw"
                            priority={index === 1}
                          />
                        )}
                      </div>
                    </div>
                  )}
                  <div className="mt-5 grid grid-cols-1 gap-1 sm:grid-cols-[1fr_auto] sm:gap-8">
                    <h2 className="m-0 text-base font-normal text-fontprimary">
                      {project.title}
                      <span className="text-fonttertiary"> — {project.summary}</span>
                    </h2>
                    <p className="m-0 text-sm text-fontmuted tabular-nums">
                      {project.company}, {project.year}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ============================================
              OTHER FORMATS: the same work as records, film and race bibs
              ============================================ */}
          <section className="w-full pb-32" aria-labelledby="other-formats">
            <div className="max-w-5xl mx-auto px-6">
              <div className="border-b border-gray-100 pb-4 mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <p id="other-formats" className="m-0 text-sm text-fonttertiary uppercase tracking-wider">Same work, other formats</p>
                <p className="m-0 text-sm text-fontmuted">Experiments</p>
              </div>
              <TrinketLedge />
            </div>
          </section>

          {/* Hidden for launch - keeping code intact
          <section className="w-full py-24 border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-6">
              <p className="text-sm text-fonttertiary uppercase tracking-wider mb-8">
                Selected Work
              </p>

              <div className="flex flex-col">
                {selectedWork.map((project) => (
                  <Link
                    key={project.title}
                    href={project.href}
                    className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-4 border-b border-gray-100 last:border-b-0"
                  >
                    <div>
                      <span className="text-fontprimary group-hover:text-fontsecondary transition-colors">
                        {project.title}
                      </span>
                      <span className="text-fonttertiary mx-2">—</span>
                      <span className="text-fonttertiary">
                        {project.subtitle}
                      </span>
                    </div>
                    <span className="text-sm text-fontmuted">
                      {project.year}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          */}

          {/* ============================================
              SIDE PROJECTS
              ============================================ */}
          <section className="w-full pb-32">
            <div className="max-w-5xl mx-auto px-6">
              <SectionLabel>Side projects</SectionLabel>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
                {sideProjects.map((p) => {
                  const body = (
                    <>
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="m-0 text-lg font-normal text-fontprimary">{p.title}</h3>
                        {p.href ? (
                          <span
                            className="text-fonttertiary transition-[color,transform] duration-300 ease-out group-hover:translate-x-1 group-hover:text-fontprimary"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        ) : (
                          <span className="text-xs text-fontmuted">In progress</span>
                        )}
                      </div>
                      <p className="m-0 text-sm text-fonttertiary text-pretty">{p.description}</p>
                      <p className="m-0 mt-2 text-xs text-fontmuted">{p.stack.join(" · ")}</p>
                    </>
                  );
                  const className = "flex flex-col gap-1 border-t border-gray-100 pt-5";
                  return p.href ? (
                    <a
                      key={p.title}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group ${className} transition-colors duration-300 hover:border-gray-300`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div key={p.title} className={className}>
                      {body}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ============================================
              CONTACT
              ============================================ */}
          <section className="w-full pb-32">
            <div className="max-w-5xl mx-auto px-6">
              <div className="border-t border-gray-100 pt-16">
                <Link
                  href="/contact"
                  className="group inline-flex items-baseline text-4xl md:text-5xl text-fontprimary hover:text-accent transition-colors duration-500"
                >
                  <span>Get in touch&nbsp;</span>
                  <span className="inline-block group-hover:animate-[fadeOutSlideIn_0.6s_cubic-bezier(0.23,1,0.32,1)]">→</span>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </DefaultPage>
    </TransitionWrapper>
  );
}
