"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSettings } from "@/contexts/settings-context";

interface SkewedContainerProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
  skewOnLoad?: boolean;
}

/**
 * A container component that applies a random skew transform to its children
 */
function SkewedContainer({
  children,
  className = "",
  intensity = "medium",
  skewOnLoad = true,
}: SkewedContainerProps) {
  const { isSkewEnabled } = useSettings();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We now use fixed values instead of ranges
  
  // Use fixed skew values for each intensity to ensure consistent rendering
  // This completely eliminates hydration mismatches by avoiding any calculation
  const generateSkew = useCallback(() => {
    // Fixed values for each intensity level
    let skewX = 0;
    let skewY = 0;
    
    // Assign fixed values based on intensity with more pronounced Y-axis skew
    if (intensity === 'light') {
      skewX = 0.8;
      skewY = 0.6;
    } else if (intensity === 'medium') {
      skewX = 2.0;
      skewY = 1.5;
    } else if (intensity === 'heavy') {
      skewX = 4.0;
      skewY = 3.0;
    }
    
    return {
      transform: `skew(${skewX}deg, ${skewY}deg)`,
      transition: "transform 0.2s ease-out",
      display: "block", // Ensure consistent display property
    };
  }, [intensity]);
  
  // Update skew style when settings change
  useEffect(() => {
    if (skewOnLoad && isSkewEnabled) {
      setSkewStyle(generateSkew());
    } else {
      // Reset skew when disabled globally
      setSkewStyle({
        transform: 'none',
        transition: "transform 0.2s ease-out",
        display: "block",
      });
    }
  }, [skewOnLoad, intensity, generateSkew, isSkewEnabled]);
  
  // Set initial state synchronously to avoid hydration mismatch
  // We use a ref to track if we're on the client side to avoid useEffect
  const initialStyle = useMemo(() => {
    if (skewOnLoad && isSkewEnabled) {
      return generateSkew();
    } else {
      return {
        transform: 'none',
        transition: "transform 0.2s ease-out",
        display: "block",
      };
    }
  }, [generateSkew, isSkewEnabled, skewOnLoad]);
  
  // Initialize state with the calculated style
  const [skewStyle, setSkewStyle] = useState(initialStyle);
  
  // No hover effects that change skew values
  
  return (
    <div
      ref={containerRef}
      className={className}
      style={skewStyle}
    >
      {children}
    </div>
  );
}

export default SkewedContainer;
