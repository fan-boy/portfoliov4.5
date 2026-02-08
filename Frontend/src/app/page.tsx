"use client";
import Link from "next/link";
import TransitionWrapper from "./components/TransitionWrapper";
import AnimatedBlobs from "./components/AnimatedBlobs";
import DuneOrgDashboard from "../../public/assets/Dune/dashboard.webp";
import DuneDesignSystem from "../../public/assets/Dune/DesignSystem.webp";
import DuneArchitecture from "../../public/assets/Dune/architecture.webp";
import UniversityParkUserProfile from "../../public/assets/UniversityPark/userprofile.webp";
import ChainReactiveHero from "../../public/assets/ChainReactive/hero.webp";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import DefaultPage from "./components/Pages/DefaultPage";
import { fadeIn, staggerSlow } from "./lib/animations";
import { useChatOverflow } from "./lib/hooks/useChatOverflow";

interface Project {
  title: string;
  subtitle: string;
  href: string;
  image: StaticImageData;
  imageAlt: string;
  company: string;
  year: string;
}

interface OtherProject {
  title: string;
  subtitle: string;
  href: string;
  company: string;
  year: string;
}

const projects: Project[] = [
  {
    title: "Risk Platform",
    subtitle: "Making security risk understandable and actionable",
    href: "/dune/risk-platform",
    image: DuneOrgDashboard,
    imageAlt: "Dune Security risk platform dashboard",
    company: "Dune Security",
    year: "2024",
  },
  {
    title: "Stillsuit Design System",
    subtitle: "Building infrastructure for speed and consistency",
    href: "/dune/stillsuit",
    image: DuneDesignSystem,
    imageAlt: "Stillsuit design system components",
    company: "Dune Security",
    year: "2024",
  },
  {
    title: "University Park",
    subtitle: "Turning sustainability from awareness into habit",
    href: "/universitypark",
    image: UniversityParkUserProfile,
    imageAlt: "University Park platform preview",
    company: "Civic Tech",
    year: "2023",
  },
  {
    title: "Chain Reactive",
    subtitle: "Capturing a $60M market opportunity for small businesses",
    href: "/chainreactive",
    image: ChainReactiveHero,
    imageAlt: "Chain Reactive ordering platform",
    company: "Startup",
    year: "2020",
  },
];

const otherProjects: OtherProject[] = [
  {
    title: "Cadence",
    subtitle: "Interactive art installation that reacts to movement",
    href: "/cadence",
    company: "NextNow Fest",
    year: "2024",
  },
  {
    title: "Crashr",
    subtitle: "Multi-brand design system for gaming platforms",
    href: "/crashr",
    company: "Freelance",
    year: "2023",
  },
  {
    title: "EverestOS",
    subtitle: "Conceptual operating system design exploration",
    href: "/everestos",
    company: "Personal",
    year: "2023",
  },
  {
    title: "Dynamic Workflows",
    subtitle: "Turning dashboards into decision-makers",
    href: "/dune/workflows",
    company: "Dune Security",
    year: "2024",
  },
];

export default function Home() {
  const { chatOpen } = useChatOverflow();

  return (
    <TransitionWrapper>
      {!chatOpen && (
        <AnimatedBlobs expanded={false} loading={false} />
      )}
      <DefaultPage>
        
        {/* ============================================
            HERO SECTION
            ============================================ */}
        <motion.section 
          className="w-full pt-40 pb-32"
          initial="hidden"
          animate="visible"
          variants={staggerSlow}
        >
          <div className="max-w-5xl mx-auto px-6">
            <motion.p 
              className="text-fonttertiary text-base tracking-wider uppercase mb-6"
              variants={fadeIn}
            >
              Aaditya Shete
            </motion.p>
            
            <motion.h1 
              className="text-display text-fontprimary leading-[1.15] tracking-tight max-w-4xl mb-10"
              variants={fadeIn}
            >
              Designing systems that scale with clarity.
            </motion.h1>
            
            <motion.div 
              className="flex flex-col gap-3"
              variants={fadeIn}
            >
              <p className="text-xl text-fontsecondary leading-relaxed">
                Product designer blending visual clarity with AI-first workflows.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                Currently at <span className="text-fontprimary font-medium">Dune Security</span>.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ============================================
            FEATURED PROJECTS SECTION
            ============================================ */}
        <section className="w-full pb-32">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              className="flex flex-col gap-32"
              initial="hidden"
              animate="visible"
              variants={staggerSlow}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={fadeIn}
                >
                  <Link href={project.href} className="group block">
                    {/* Image - Full width, no container */}
                    <div className="relative w-full overflow-hidden rounded-lg mb-8">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
                        style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
                        draggable={false}
                        priority={index < 2}
                      />
                    </div>

                    {/* Text */}
                    <div className="max-w-3xl">
                      <p className="text-fonttertiary text-base tracking-wide mb-4">
                        {project.company} · {project.year}
                      </p>
                      <h2 className="text-h1 text-fontprimary mb-4 group-hover:text-fontsecondary transition-colors duration-300">
                        {project.title}
                      </h2>
                      <p className="text-xl text-fontsecondary leading-relaxed">
                        {project.subtitle}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============================================
            OTHER PROJECTS SECTION
            ============================================ */}
        <section className="w-full py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerSlow}
            >
              <motion.h2 
                className="text-h2 text-fontprimary mb-12"
                variants={fadeIn}
              >
                Other Work
              </motion.h2>
              
              <motion.div 
                className="grid md:grid-cols-2 gap-8"
                variants={fadeIn}
              >
                {otherProjects.map((project) => (
                  <Link 
                    key={project.title}
                    href={project.href} 
                    className="group block p-8 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <p className="text-fonttertiary text-sm tracking-wide mb-3">
                      {project.company} · {project.year}
                    </p>
                    <h3 className="text-xl text-fontprimary font-medium mb-2 group-hover:text-fontsecondary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-fontsecondary">
                      {project.subtitle}
                    </p>
                  </Link>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================
            CONTACT SECTION
            ============================================ */}
        <section className="w-full py-24">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-xl text-fontprimary mb-2">
              Interested in working together?
            </p>
            <Link 
              href="/contact" 
              className="text-h2 text-fontprimary hover:text-fontsecondary transition-colors"
            >
              Get in touch →
            </Link>
          </div>
        </section>

      </DefaultPage>
    </TransitionWrapper>
  );
}
