"use client";
import Link from "next/link";
import TransitionWrapper from "./components/TransitionWrapper";
import AnimatedBlobs from "./components/AnimatedBlobs";
import DuneOrgDashboard from "../../public/assets/Dune/dashboard.webp";
import DuneDesignSystem from "../../public/assets/Dune/DesignSystem.webp";
import UniversityParkUserProfile from "../../public/assets/UniversityPark/userprofile.webp";
// import ChainReactiveHero from "../../public/assets/ChainReactive/hero.webp";
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
  company: string;
  year: string;
}

const projects: Project[] = [
  {
    title: "Risk Platform",
    subtitle: "Designed the risk model that closed a $6M seed round",
    href: "/dune/risk-platform",
    image: DuneOrgDashboard,
    company: "Dune Security",
    year: "2024",
  },
  {
    title: "Stillsuit Design System",
    subtitle: "50% faster engineer onboarding. Full rebrand in 2 weeks.",
    href: "/dune/stillsuit",
    image: DuneDesignSystem,
    company: "Dune Security",
    year: "2024",
  },
  {
    title: "University Park",
    subtitle: "Behavior change platform adopted by majority of households in first quarter",
    href: "/universitypark",
    image: UniversityParkUserProfile,
    company: "University Park",
    year: "2023–2024",
  },
  // Hidden for launch - keeping code intact
  // {
  //   title: "Chain Reactive",
  //   subtitle: "Capturing a $60M market opportunity for small businesses",
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

export default function Home() {
  const { chatOpen } = useChatOverflow();

  return (
    <TransitionWrapper>
      {!chatOpen && (
        <AnimatedBlobs expanded={false} loading={false} move={true} />
      )}
      <DefaultPage>
        
        {/* ============================================
            HERO
            ============================================ */}
        <motion.section 
          className="w-full pt-40 pb-32 relative z-10"
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
              className="text-display text-fontprimary leading-[1.05] tracking-tight max-w-4xl mb-10"
              variants={fadeIn}
            >
              Building products where complexity feels effortless.
            </motion.h1>
            
            <motion.div 
              className="flex flex-col gap-3"
              variants={fadeIn}
            >
              <p className="text-xl text-fontsecondary leading-relaxed">
                Product designer blending visual clarity with AI-first workflows.
              </p>
              <p className="text-xl text-fontsecondary leading-relaxed">
                Currently at <span className="text-accent font-medium">Dune Security</span>.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ============================================
            WORK
            ============================================ */}
        <section className="w-full pb-32">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col gap-32 lg:gap-40">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                >
                  <Link href={project.href} className="group block">
                    {/* Header - Title left, subtitle right */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                      <h2 className="text-xl text-fontprimary group-hover:text-fontsecondary transition-colors duration-500 ease-out flex items-center">
                        <span className="inline-block opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-8 transition-all duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}>→&nbsp;</span>
                        <span>{project.title}</span>
                      </h2>
                      <p className="text-base text-fonttertiary group-hover:text-fontsecondary transition-colors duration-500 ease-out">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Image in colored container with hover effect */}
                    <div className="rounded-2xl pt-8 pl-8 sm:pt-12 sm:pl-12 overflow-hidden" style={{ backgroundColor: '#F0F1F8' }}>
                      <div className="relative overflow-hidden rounded-tl-lg">
                        <Image
                          src={project.image}
                          alt={project.title}
                          className="w-full rounded-tl-lg origin-top-left scale-[1.05] group-hover:scale-100 transition-all duration-700"
                          style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
                          draggable={false}
                          priority={index < 2}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
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
            CONTACT
            ============================================ */}
        <section className="w-full py-32">
          <div className="max-w-4xl mx-auto px-6">
            <Link 
              href="/contact" 
              className="text-4xl md:text-5xl text-fontprimary hover:text-accent transition-colors duration-300"
            >
              Get in touch →
            </Link>
          </div>
        </section>

      </DefaultPage>
    </TransitionWrapper>
  );
}
