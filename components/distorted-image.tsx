"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface DistortedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  distortionIntensity?: "light" | "medium" | "heavy";
  distortOnHover?: boolean;
  priority?: boolean;
}

/**
 * An image component that applies RGB shift and distortion effects
 */
function DistortedImage({
  src,
  alt,
  width,
  height,
  className = "",
  distortionIntensity = "medium",
  distortOnHover = false,
  priority = false,
}: DistortedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDistorting, setIsDistorting] = useState(!distortOnHover);
  
  // Define intensity settings with useMemo to prevent re-renders
  const intensitySettings = useMemo(() => ({
    light: { rgbShift: 3, glitchProbability: 0.1 },
    medium: { rgbShift: 5, glitchProbability: 0.2 },
    heavy: { rgbShift: 8, glitchProbability: 0.3 },
  }), []);
  
  // Apply distortion effect
  const applyDistortion = useCallback(() => {
    if (!isDistorting || !containerRef.current) return;
    
    const settings = intensitySettings[distortionIntensity];
    const container = containerRef.current;
    
    // Get all image layers
    const redLayer = container.querySelector(".red-layer") as HTMLElement;
    const greenLayer = container.querySelector(".green-layer") as HTMLElement;
    const blueLayer = container.querySelector(".blue-layer") as HTMLElement;
    
    if (!redLayer || !greenLayer || !blueLayer) return;
    
    // Random RGB shift
    if (Math.random() < settings.glitchProbability) {
      const redX = (Math.random() * 2 - 1) * settings.rgbShift;
      const redY = (Math.random() * 2 - 1) * settings.rgbShift;
      const greenX = (Math.random() * 2 - 1) * settings.rgbShift;
      const greenY = (Math.random() * 2 - 1) * settings.rgbShift;
      const blueX = (Math.random() * 2 - 1) * settings.rgbShift;
      const blueY = (Math.random() * 2 - 1) * settings.rgbShift;
      
      redLayer.style.transform = `translate(${redX}px, ${redY}px)`;
      greenLayer.style.transform = `translate(${greenX}px, ${greenY}px)`;
      blueLayer.style.transform = `translate(${blueX}px, ${blueY}px)`;
    } else {
      // Reset occasionally
      redLayer.style.transform = "translate(0, 0)";
      greenLayer.style.transform = "translate(0, 0)";
      blueLayer.style.transform = "translate(0, 0)";
    }
    
    // Schedule next distortion
    const timeout = setTimeout(() => {
      applyDistortion();
    }, Math.random() * 1000 + 200);
    
    return () => clearTimeout(timeout);
  }, [isDistorting, distortionIntensity, intensitySettings]);
  
  // Start distortion effect
  useEffect(() => {
    if (isDistorting && !isLoading) {
      applyDistortion();
    }
    
    return () => {
      // Cleanup
    };
  }, [isDistorting, isLoading, applyDistortion]);
  
  // Handle hover events
  const handleMouseEnter = () => {
    if (distortOnHover) {
      setIsDistorting(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (distortOnHover) {
      setIsDistorting(false);
      
      // Reset all layers
      if (containerRef.current) {
        const container = containerRef.current;
        const layers = container.querySelectorAll(".color-layer") as NodeListOf<HTMLElement>;
        layers.forEach(layer => {
          layer.style.transform = "translate(0, 0)";
        });
      }
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
      )}
      
      {/* Red layer */}
      <div className="absolute inset-0 color-layer red-layer mix-blend-screen">
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          priority={priority}
          className="w-full h-full object-cover transition-transform duration-100 opacity-70"
          style={{ filter: "url(#redFilter)" }}
          aria-hidden="true"
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      
      {/* Green layer */}
      <div className="absolute inset-0 color-layer green-layer mix-blend-screen">
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          priority={priority}
          className="w-full h-full object-cover transition-transform duration-100 opacity-70"
          style={{ filter: "url(#greenFilter)" }}
          aria-hidden="true"
        />
      </div>
      
      {/* Blue layer */}
      <div className="absolute inset-0 color-layer blue-layer mix-blend-screen">
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          priority={priority}
          className="w-full h-full object-cover transition-transform duration-100 opacity-70"
          style={{ filter: "url(#blueFilter)" }}
          aria-hidden="true"
        />
      </div>
      
      {/* Base image (for SEO and accessibility) */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-0'}`}
      />
      
      {/* SVG filters */}
      <svg className="absolute -z-10 opacity-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="redFilter">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="greenFilter">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="blueFilter">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default DistortedImage;
