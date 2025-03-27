"use client";

import { ReactNode } from "react";
import { useAccentColor } from "@/contexts/color-context";
import { GlitchName } from "@/components/glitch-name";
import dynamic from "next/dynamic";

// Dynamically import the SkewedContainer component
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true,
});

interface ClientHomeContentProps {
  children: ReactNode;
}

export default function ClientHomeContent({ children }: ClientHomeContentProps) {
  const { accentColor, accentColorRgb } = useAccentColor();
  
  return (
    <>
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
            Creative Technologist & Strategist
          </span>
        </h1>

        {children}
      </SkewedContainer>
    </>
  );
}
