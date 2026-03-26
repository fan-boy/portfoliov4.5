"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ProjectCardFeaturedProps {
  title: string;
  outcome: string;
  metadata: { company: string; year: string };
  image: StaticImageData;
  href: string;
  imagePosition?: "left" | "right";
}

const ProjectCardFeatured: React.FC<ProjectCardFeaturedProps> = ({
  title,
  outcome,
  metadata,
  image,
  href,
  imagePosition = "left",
}) => {
  const imageFirst = imagePosition === "left";

  return (
    <Link href={href} className="group block">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center ${!imageFirst ? 'lg:flex-row-reverse' : ''}`}>
        {/* Image */}
        <div className={`${!imageFirst ? 'lg:order-2' : ''}`}>
          <div 
            className="relative overflow-hidden rounded-xl transition-all duration-500 group-hover:shadow-xl group-hover:shadow-black/8"
            style={{ 
              aspectRatio: '4/3',
              transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
              draggable={false}
            />
          </div>
        </div>

        {/* Content */}
        <div className={`${!imageFirst ? 'lg:order-1' : ''} flex flex-col justify-center`}>
          {/* Title */}
          <h3 className="text-2xl lg:text-3xl text-fontprimary font-normal tracking-tight mb-3 group-hover:text-fontsecondary transition-colors duration-300">
            {title}
          </h3>

          {/* Outcome */}
          <p className="text-lg text-fontsecondary leading-relaxed mb-4">
            {outcome}
          </p>

          {/* Metadata */}
          <p className="text-sm text-fonttertiary tracking-wide">
            {metadata.company} — {metadata.year}
          </p>

          {/* View project link */}
          <div className="mt-6 flex items-center gap-2 text-fonttertiary group-hover:text-accent transition-colors duration-300">
            <span className="text-sm">View project</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCardFeatured;
