"use client";

import GlitchCard from "@/components/glitch-card";
import workData from "@/data/work.json";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SkewedH1 } from "@/components/skewed-elements";
import { useSettings } from "@/contexts/settings-context";
import { useAccentColor } from "@/contexts/color-context";
import dynamic from "next/dynamic";

// Import SkewedContainer for unique skew effects
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true,
});

interface ProjectType {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  link?: string;
  hasPage?: boolean;
  aspectRatio?: string;
}

export default function Work() {
  const { isAnimationEnabled } = useSettings();
  const { accentColor } = useAccentColor();

  return (
    <div className="py-12">
      <SkewedContainer intensity="medium" skewOnLoad={true}>
        <SkewedH1 className="text-5xl md:text-6xl mb-8">Selected Work</SkewedH1>
        <p className="text-xl md:text-2xl max-w-3xl mb-16" style={{ color: accentColor }}>
          A showcase of projects where I&apos;ve led technical strategy, innovation, and
          implementation across various industries and challenges.
        </p>
      </SkewedContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {workData.projects.map((project: ProjectType, index) => (
          <GlitchCard
            key={project.id}
            className={`block hover:border-accent transition-colors duration-200 transform ${index % 3 === 0 ? "skew-x-1.5 -skew-y-0.5" : index % 3 === 1 ? "-skew-x-1 skew-y-1" : "skew-x-0.5 skew-y-1.5"}`}
            glitchEffect={isAnimationEnabled}
            glitchIntensity="light"
            glitchOnHover={true}
          >
            <div className="flex flex-col h-full">
              <div className="relative w-full h-48 overflow-hidden punk-border">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover ${isAnimationEnabled ? "transition-transform duration-700 hover:scale-110" : ""}`}
                />
              </div>
              <div className="flex-1 flex flex-col justify-between p-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 text-accent">
                    {project.title}
                  </h2>
                  <p className="font-mono text-sm mb-4">{project.subtitle}</p>
                  {/* Description hidden for now */}
                  {/* <p className="text-lg mb-6 text-[var(--foreground)]">{project.summary}</p> */}
                </div>
                <div className="mt-4">
                  {!project.hasPage && project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-mono text-accent hover:underline"
                    >
                      View project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={`/work/${project.id}`}
                      className="inline-flex items-center font-mono text-accent hover:underline"
                    >
                      View case study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </GlitchCard>
        ))}
      </div>

      {/* Collaboration section hidden as requested */}
    </div>
  );
}
