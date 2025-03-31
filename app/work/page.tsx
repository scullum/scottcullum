"use client";

import GlitchCard from "@/components/glitch-card";
import workData from "@/data/work.json";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SkewedH1, SkewedH2 } from "@/components/skewed-elements";
import { useSettings } from "@/contexts/settings-context";
import { useAccentColor } from "@/contexts/color-context";
import dynamic from "next/dynamic";

// Import SkewedContainer for unique skew effects
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true,
});

interface WorkItemProps {
  project: {
    id: string;
    title: string;
    subtitle: string;
    summary: string;
    image: string;
    link?: string;
  };
  isAnimationEnabled: boolean;
}

// WorkItem component for individual project cards
function WorkItem({ project, isAnimationEnabled }: WorkItemProps) {
  const CardContent = (
    <GlitchCard
      className="h-full flex flex-col"
      glitchEffect={isAnimationEnabled}
      glitchIntensity="light"
      glitchOnHover={true}
    >
      <div className="relative w-full h-64 mb-6 overflow-hidden punk-border">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`object-cover ${isAnimationEnabled ? "transition-transform duration-700 hover:scale-110" : ""}`}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h2>
          <p className="font-mono text-accent mb-4">{project.subtitle}</p>
          {project.summary !== "tk" && (
            <p className="text-lg mb-6">{project.summary}</p>
          )}
        </div>

        <div className="mt-auto">
          {project.link ? (
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
    </GlitchCard>
  );

  return CardContent;
}

export default function Work() {
  const { isAnimationEnabled } = useSettings();
  const { accentColor } = useAccentColor();
  
  return (
    <div className="py-12">
      <SkewedContainer intensity="medium" skewOnLoad={true}>
        <SkewedH1 className="text-5xl md:text-6xl mb-8">Selected Work</SkewedH1>
        <p className="text-xl md:text-2xl max-w-3xl mb-16" style={{ color: accentColor }}>
          A showcase of projects where I&apos;ve led technical strategy, innovation, and implementation
          across various industries and challenges.
        </p>
      </SkewedContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {workData.projects.map((project, index) => (
          <SkewedContainer 
            key={project.id} 
            intensity="light"
            skewOnLoad={true}
            className={index % 3 === 1 ? "md:translate-y-4" : index % 3 === 2 ? "md:translate-y-8" : ""}
          >
            <WorkItem project={project} isAnimationEnabled={isAnimationEnabled} />
          </SkewedContainer>
        ))}
      </div>

      <SkewedContainer intensity="medium" skewOnLoad={true}>
        <div className="text-center bg-black text-white p-12 punk-border">
          <SkewedH2 className="text-3xl md:text-4xl mb-6 text-accent">Ready to collaborate?</SkewedH2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in discussing new projects, creative challenges, and opportunities to create impact through technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="mailto:scott@scullum.com"
              className="punk-border inline-flex items-center justify-center px-8 py-4 text-lg font-mono uppercase bg-accent text-black hover:bg-white hover:text-black transition-colors duration-200 no-underline"
            >
              Get in touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link
              href="https://www.linkedin.com/in/scottcullum/"
              target="_blank"
              rel="noopener noreferrer"
              className="punk-border inline-flex items-center justify-center px-8 py-4 text-lg font-mono uppercase bg-white text-black hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
            >
              LinkedIn
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </SkewedContainer>
    </div>
  );
}
