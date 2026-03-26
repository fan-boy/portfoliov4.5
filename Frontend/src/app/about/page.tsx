// app/about/page.tsx

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Profile from "../../../public/assets/About/profile.webp";
import AnimatedBlobs from "../components/AnimatedBlobs";
import { useChat } from '../context/ChatContext';
import { motion } from "framer-motion";

const experience = [
  {
    company: "Dune Security",
    title: "Head of Product Design",
    years: "2024 — Present",
    description: "Leading design for AI-powered security risk platform. Founding designer.",
  },
  {
    company: "University Park",
    title: "Lead Product Designer",
    years: "2023 — 2024",
    description: "0→1 behavior change platform for municipal sustainability.",
  },
  {
    company: "Chain Reactive",
    title: "Lead Designer & Developer",
    years: "2021 — 2022",
    description: "End-to-end product for small business ordering.",
  },
  {
    company: "Ingram Micro",
    title: "Product Design Specialist",
    years: "2018 — 2021",
    description: "Enterprise tools and internal platforms.",
  },
];

export default function AboutPage() {
  const { chatOpen } = useChat();
  
  useEffect(() => {
    if (chatOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = '' };
  }, [chatOpen]);

  return (
    <main className="min-h-screen text-gray-900">
      {!chatOpen && (
        <AnimatedBlobs expanded={false} loading={false} move={true} />
      )}
      
      {/* Hero Image - Full width */}
      <section className="w-full pt-24 pb-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <Image
              src={Profile}
              alt="Aaditya Shete"
              className="w-full object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="w-full py-16 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="text-4xl md:text-5xl text-fontprimary font-normal tracking-tight mb-6">
              Aaditya Shete
            </h1>
            <p className="text-xl text-fontsecondary leading-relaxed mb-6">
              Product designer building 0→1 products and scaling design systems. Currently leading design at <span className="text-fontprimary">Dune Security</span>.
            </p>
            <p className="text-lg text-fonttertiary leading-relaxed">
              Mumbai → Maryland → New York. I thrive in ambiguity, love a good whiteboard session, and believe the best products come from teams who listen deeply and iterate relentlessly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="w-full py-16 px-6 bg-bg-secondary relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-sm text-fonttertiary uppercase tracking-wider mb-8">Experience</p>
            
            <div className="flex flex-col gap-8">
              {experience.map((role, index) => (
                <div key={role.company} className="flex flex-col sm:flex-row sm:gap-8">
                  <div className="sm:w-32 flex-shrink-0 mb-1 sm:mb-0">
                    <span className="text-sm text-fontmuted">{role.years}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-fontprimary mb-1">
                      {role.title}
                    </h3>
                    <p className="text-fonttertiary mb-1">{role.company}</p>
                    <p className="text-sm text-fontmuted">{role.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What I do */}
      <section className="w-full py-16 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-sm text-fonttertiary uppercase tracking-wider mb-8">What I Do</p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg text-fontprimary mb-2">Product Design</h3>
                <p className="text-fonttertiary text-sm">End-to-end design from research through shipped product. I care about outcomes, not deliverables.</p>
              </div>
              <div>
                <h3 className="text-lg text-fontprimary mb-2">Design Systems</h3>
                <p className="text-fonttertiary text-sm">Building infrastructure that lets teams move fast without breaking quality.</p>
              </div>
              <div>
                <h3 className="text-lg text-fontprimary mb-2">0→1 Products</h3>
                <p className="text-fonttertiary text-sm">Turning ambiguity into clarity. Finding the right problem before solving it.</p>
              </div>
              <div>
                <h3 className="text-lg text-fontprimary mb-2">Design Strategy</h3>
                <p className="text-fonttertiary text-sm">Connecting design decisions to business outcomes. Making the case with data.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="w-full py-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link 
              href="/contact" 
              className="text-3xl md:text-4xl text-fontprimary hover:text-accent transition-colors duration-300"
            >
              Get in touch →
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
