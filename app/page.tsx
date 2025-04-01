"use client";

import RotatingText from "@/components/rotating-text";
import oneLiners from "@/data/one-liners.json";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { GlitchName } from "@/components/glitch-name";
import { useAccentColor } from "@/contexts/color-context";
import { features } from "@/config/features";

// Dynamically import the SkewedContainer component since it uses client-side features
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true,
});

export default function Home() {
  const { accentColor, accentColorRgb } = useAccentColor();
  return (
    <div className="min-h-[90vh] flex flex-col justify-center pt-20">
      <div className="max-w-4xl">
        <SkewedContainer intensity="light" skewOnLoad={true}>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="block" style={{ color: accentColor }}>
              <GlitchName
                name="Scott M. Cullum"
                glitchIntensity="medium"
                rotationRange={1.5}
                glitchInterval={3000}
                rotationInterval={7000}
              />
            </span>
            <span
              className="block text-3xl md:text-4xl mt-4 max-w-3xl"
              style={{ color: `rgba(${accentColorRgb}, 0.6)` }}
            >
              <RotatingText phrases={oneLiners.phrases} className="glitch" glitchOnRotate={true} />
            </span>
          </h1>
        </SkewedContainer>

        <SkewedContainer intensity="light" skewOnLoad={true}>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl">
            Creative technologist with 20+ years of experience delivering high-impact work at the
            intersection of design, engineering, and strategy.
          </p>
        </SkewedContainer>

        <div className="flex flex-col sm:flex-row gap-6">
          <SkewedContainer intensity="medium" skewOnLoad={true}>
            <Link
              href="/about"
              className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
            >
              About me
            </Link>
          </SkewedContainer>

          {features.showWork && (
            <SkewedContainer intensity="medium" skewOnLoad={true}>
              <Link
                href="/work"
                className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
              >
                See my work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </SkewedContainer>
          )}

          {features.showThoughts && (
            <SkewedContainer intensity="medium" skewOnLoad={true}>
              <Link
                href="/thoughts"
                className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
              >
                Read my thoughts
              </Link>
            </SkewedContainer>
          )}

          {!features.showWork && !features.showThoughts && (
            <SkewedContainer intensity="medium" skewOnLoad={true}>
              <Link
                href="mailto:scott@scullum.com"
                className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
              >
                Get in touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </SkewedContainer>
          )}
        </div>
      </div>
    </div>
  );
}
