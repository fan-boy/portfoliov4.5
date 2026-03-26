"use client";
import React from "react";
import Link from "next/link";

interface ProjectCardCompactProps {
  title: string;
  description: string;
  metadata: { company: string; year: string };
  href: string;
}

const ProjectCardCompact: React.FC<ProjectCardCompactProps> = ({
  title,
  description,
  metadata,
  href,
}) => {
  return (
    <Link 
      href={href} 
      className="group block py-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 -mx-4 px-4 transition-colors duration-200"
      style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div className="flex-1">
          {/* Title with arrow */}
          <div className="flex items-center gap-2">
            <h4 className="text-lg text-fontprimary font-normal group-hover:text-fontsecondary transition-colors duration-200">
              {title}
            </h4>
            <span className="text-fonttertiary opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              →
            </span>
          </div>
          
          {/* Description */}
          <p className="text-sm text-fonttertiary mt-1">
            {description}
          </p>
        </div>

        {/* Metadata - right aligned on desktop */}
        <p className="text-sm text-fontmuted whitespace-nowrap">
          {metadata.company} — {metadata.year}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCardCompact;
