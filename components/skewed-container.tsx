"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [skewStyle, setSkewStyle] = useState<React.CSSProperties>({});
  
  // Define intensity ranges with useMemo to optimize performance
  const intensityRanges = useMemo(() => ({
    light: { x: 3, y: 3 },
    medium: { x: 5, y: 5 },
    heavy: { x: 10, y: 10 },
  }), []);
  
  // Use useCallback to memoize the function
  const generateRandomSkew = useCallback(() => {
    const range = intensityRanges[intensity];
    const skewX = (Math.random() * 2 - 1) * range.x;
    const skewY = (Math.random() * 2 - 1) * range.y;
    
    return {
      transform: `skew(${skewX}deg, ${skewY}deg)`,
      transition: "transform 0.2s ease-out",
    };
  }, [intensity, intensityRanges]);
  
  // Apply skew on load if enabled
  useEffect(() => {
    if (skewOnLoad) {
      setSkewStyle(generateRandomSkew());
    }
  }, [skewOnLoad, intensity, generateRandomSkew]);
  
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
