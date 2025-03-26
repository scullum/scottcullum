"use client";

import React from "react";

interface SkewProviderProps {
  children: React.ReactNode;
}

/**
 * A simpler provider component that applies skew effects to the main content
 * This is a safer approach that won't break the page layout
 */
export function SkewProvider({ children }: SkewProviderProps) {
  // Generate random skew values within safe ranges
  const skewX = (Math.random() * 2 - 1) * 1.5; // Very subtle page-level skew
  const skewY = (Math.random() * 2 - 1) * 1.5;
  
  return (
    <div style={{ 
      transform: `skew(${skewX}deg, ${skewY}deg)`,
      transition: "transform 0.2s ease-out",
      transformOrigin: "center center",
      width: "100%",
      height: "100%"
    }}>
      {children}
    </div>
  );
}
