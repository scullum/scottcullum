"use client";

import React, { ReactNode, useMemo, CSSProperties } from "react";
import { useSettings } from "@/contexts/settings-context";

interface SkewedParagraphGroupProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
}

/**
 * A component that applies the same skew to all paragraph children
 * This ensures consistent skew across related paragraphs
 */
export function SkewedParagraphGroup({
  children,
  className = "",
  intensity = "light",
}: SkewedParagraphGroupProps) {
  // Get the skew enabled setting from context
  const { isSkewEnabled } = useSettings();
  
  // Generate a single random skew value for all children
  const skewValues = useMemo(() => {
    // Define intensity ranges
    const ranges = {
      light: { x: 0.5, y: 0.5 },
      medium: { x: 3, y: 3 },
      heavy: { x: 6, y: 6 },
    };

    const range = ranges[intensity];
    const skewX = (Math.random() * 2 - 1) * range.x;
    const skewY = (Math.random() * 2 - 1) * range.y;

    return { skewX, skewY };
  }, [intensity]);

  // Apply the same skew to all children, but only if skew is enabled
  const skewStyle: CSSProperties = {
    transform: isSkewEnabled ? `skew(${skewValues.skewX}deg, ${skewValues.skewY}deg)` : "none",
    transition: "transform 0.2s ease-out",
  };

  // Apply the skew to each child individually to preserve spacing
  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return <div style={skewStyle}>{child}</div>;
        }
        
        // For each child element, create a wrapper that applies the skew
        return (
          <div style={skewStyle} className="skewed-paragraph-wrapper">
            {child}
          </div>
        );
      })}
    </div>
  );
}
