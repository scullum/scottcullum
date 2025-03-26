"use client";

import React, { useEffect, useState } from "react";
import { useSettings } from "@/contexts/settings-context";

interface SkewProviderProps {
  children: React.ReactNode;
}

/**
 * A simpler provider component that applies skew effects to the main content
 * This is a safer approach that won't break the page layout
 */
export function SkewProvider({ children }: SkewProviderProps) {
  const { isSkewEnabled } = useSettings();
  
  // Start with no skew to avoid hydration mismatch
  const [style, setStyle] = useState<React.CSSProperties>({
    transition: "transform 0.2s ease-out",
    transformOrigin: "center center",
    width: "100%",
    height: "100%"
  });
  
  // Apply skew only on the client side after hydration
  useEffect(() => {
    if (isSkewEnabled) {
      // Generate random skew values within safe ranges
      const skewX = (Math.random() * 2 - 1) * 1.5; // Very subtle page-level skew
      const skewY = (Math.random() * 2 - 1) * 1.5;
      
      // Update the style with skew transform
      setStyle(prevStyle => ({
        ...prevStyle,
        transform: `skew(${skewX}deg, ${skewY}deg)`
      }));
    } else {
      // Remove skew when disabled
      setStyle(prevStyle => ({
        ...prevStyle,
        transform: 'none'
      }));
    }
  }, [isSkewEnabled]);
  
  return (
    <div style={style}>
      {children}
    </div>
  );
}
