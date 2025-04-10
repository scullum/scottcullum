"use client";

import { FileText } from "lucide-react";
import aboutData from "@/data/about.json";
import { SkewedH1, SkewedH2 } from "@/components/skewed-elements";
import dynamic from "next/dynamic";
import { SkewedParagraphGroup } from "@/components/skewed-paragraph-group";
import { features } from "@/config/features";

// Import SkewedContainer for unique skew effects
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true,
});

// Import the RotatingProfileImage component dynamically
const RotatingProfileImage = dynamic(() => import("@/components/rotating-profile-image"), {
  ssr: false // Use client-side only to ensure proper rotation
});

export default function About() {
  return (
    <div className="py-12">
      <SkewedH1 className="text-5xl md:text-6xl mb-12">About</SkewedH1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <SkewedH2 className="text-2xl md:text-3xl mb-6 text-accent">{aboutData.intro.title}</SkewedH2>

          <SkewedParagraphGroup className="space-y-8" intensity="medium">
            {aboutData.intro.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg paragraph-container">
                <span dangerouslySetInnerHTML={{ __html: paragraph }} />
              </p>
            ))}
          </SkewedParagraphGroup>
        </div>

        <div className="h-full">
          <div className="relative w-full h-[400px] mb-4">
            <RotatingProfileImage
              alt="Scott M. Cullum"
              interval={7000} // Rotate every 7 seconds
              glitchEffect={true}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-24 pt-12 border-t border-[var(--border)]">
        <div className="flex justify-between items-center mb-6">
          <SkewedH2 className="text-2xl md:text-3xl text-accent">{aboutData.experience.title}</SkewedH2>

          {features.showResume && (
            <a
              href="/scott-cullum-resume.pdf"
              download
              className="punk-border inline-flex items-center px-4 py-2 text-sm font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
            >
              <FileText size={16} className="mr-2" />
              Download Resume
            </a>
          )}
        </div>

        <div className="space-y-8">
          {aboutData.experience.positions.map((position, index) => {
            // Generate a unique skew intensity based on the position index
            const skewIntensity = index % 3 === 0 ? "light" : index % 3 === 1 ? "medium" : "heavy";

            return (
              <SkewedContainer
                key={index}
                intensity={skewIntensity}
                skewOnLoad={true}
                className="border-l-2 border-accent pl-6 py-2"
              >
                {position.duration && (
                  <span className="text-sm font-mono text-[var(--muted)] block mb-1">
                    {position.duration.startDate} — {position.duration.endDate}
                  </span>
                )}
                <h3 className="text-xl mb-1">{position.company}</h3>
                <p className="text-accent mb-2">{position.title}</p>
                {position.description && <p>{position.description}</p>}
              </SkewedContainer>
            );
          })}
        </div>
      </div>
    </div>
  );
}
