"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ProjectCardHeroProps {
  title: string;
  outcome: { stat: string; label: string };
  description: string;
  metadata: { company: string; year: string; role?: string };
  image: StaticImageData;
  href: string;
}

const ProjectCardHero: React.FC<ProjectCardHeroProps> = ({
  title,
  outcome,
  description,
  metadata,
  image,
  href,
}) => {
  return (
    <Link href={href} className="group block">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Image - Takes 7 columns on large screens */}
        <div className="lg:col-span-7">
          <div 
            className="relative overflow-hidden rounded-2xl"
            style={{ aspectRatio: '16/10' }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
              priority
              draggable={false}
            />
          </div>
        </div>

        {/* Content - Takes 5 columns on large screens */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Outcome stat */}
          <div className="mb-6">
            <span className="text-6xl lg:text-7xl font-light text-accent tracking-tight">
              {outcome.stat}
            </span>
            <p className="text-lg text-fonttertiary mt-2">
              {outcome.label}
            </p>
          </div>

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl text-fontprimary font-normal tracking-tight mb-4 group-hover:text-fontsecondary transition-colors duration-300">
            {title}
          </h2>

          {/* Description */}
          <p className="text-lg text-fontsecondary leading-relaxed mb-6">
            {description}
          </p>

          {/* Metadata */}
          <p className="text-sm text-fonttertiary tracking-wide">
            {metadata.company} — {metadata.year}
            {metadata.role && ` — ${metadata.role}`}
          </p>

          {/* View project link */}
          <div className="mt-8 flex items-center gap-2 text-fontprimary group-hover:text-accent transition-colors duration-300">
            <span className="text-base font-normal">View project</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCardHero;
