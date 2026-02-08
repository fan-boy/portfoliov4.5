// app/about/page.tsx

"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Profile from "../../../public/assets/About/profile.webp";
import AnimatedBlobs from "../components/AnimatedBlobs";
import { useChat } from '../context/ChatContext';

const experience = [
  {
    company: "Dune Security",
    title: "Head of Product Design",
    years: "2024 to Present",
  },
  {
    company: "University Park",
    title: "Product Designer (0→1 Product)",
    years: "2023 to Present",
  },
  {
    company: "Crashr",
    title: "Product Design Intern",
    years: "2023",
  },
  {
    company: "Chain Reactive LLC",
    title: "Lead Product Designer & Full-Stack Developer",
    years: "2021 to 2022",
  },
  {
    company: "Ingram Micro India SSC",
    title: "Product Design Specialist & Software Engineer",
    years: "2018 to 2021",
  },
];

export default function AboutPage() {
  const { chatOpen } = useChat()
    useEffect(() => {
      if (chatOpen) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = '';
      return () => { document.body.style.overflow = '' };
    }, [chatOpen]);
  return (

    <main className="min-h-screen text-gray-900 px-6 py-16 flex flex-col items-center">
       {!chatOpen && (
        <AnimatedBlobs expanded={false} loading={false} />
      )}
      <section className="max-w-3xl w-full flex flex-col gap-10 items-start z-10">
        {/* Profile Image Section */}
        <div className="mb-6 w-full overflow-hidden">
          <Image
            src={Profile}
            alt="Aaditya Shete profile photo"
            width={640}
            height={100}
            className="rounded-lg object-cover w-full border border-gray-200 shadow-sm"
            priority
          />
        </div>

        <div className="w-full">
          <h1 className="text-fontprimary font-medium mb-2">Aaditya Shete</h1>
          <h2 className="text-fontsecondary  mb-4">Product Designer, Systems Thinker, Builder</h2>
          <p className="text-fontsecondary mb-4">
            I design digital products that turn complexity into clarity. My sweet spot? Building 0→1 products and scaling design systems for teams that want to move fast <span className="text-gray-500">(but never break things that matter)</span>.
          </p>
          <p className="text-fontsecondary mb-4">
            I&apos;ve led design for AI-powered security platforms, gamified sustainability apps, and food tech tools for small businesses. Whether I&apos;m sketching flows, running workshops, or obsessing over micro-interactions, I&apos;m happiest when I&apos;m helping teams ship work that&apos;s both beautiful and useful.
          </p>
          <p className="text-fontsecondary mb-4">
            My journey has taken me from Mumbai to Maryland to New York—across startups, enterprise, and everything in between. I thrive in ambiguity, love a good whiteboard session, and believe that the best products are built by teams who listen deeply and iterate relentlessly.
          </p>
          <p className="text-fontsecondary mb-4">
            Outside of work, you&apos;ll find me exploring new cities, reading about behavioral science, or searching for the perfect cup of coffee.
          </p>
        </div>

        <div className="w-full">
          {/* <h3 className="text-xl font-semibold mb-4">Experience</h3> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
            {/* <div className="font-semibold text-gray-900">Company</div>
            <div className="font-semibold text-gray-900">Role</div>
            <div className="font-semibold text-gray-900">Years</div> */}
            {experience.map((role) => (
              <React.Fragment key={role.company}>
                <div className="text-gray-800">{role.company}</div>
                <div className="text-gray-700">{role.title}</div>
                <div className="text-gray-500">{role.years}</div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-xl font-semibold mb-2">Design Philosophy</h3>
          <p className="text-base text-gray-700">
            I believe great design is equal parts empathy, rigor, and craft. I&apos;m driven by the challenge of making the complex feel simple, and I&apos;m energized by collaborating with ambitious teams to build products that matter.
          </p>
        </div>
      </section>
    </main>
  );
}
