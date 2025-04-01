"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

interface RotatingProfileImageProps {
  className?: string;
  interval?: number; // Time in milliseconds between image changes
  alt: string;
  glitchEffect?: boolean;
}

/**
 * A component that rotates through a collection of profile images with glitch effects
 */
export function RotatingProfileImage({
  className = "",
  interval = 7000, // Default to 7 seconds
  alt,
  glitchEffect = true,
}: RotatingProfileImageProps) {
  // List of profile images to rotate through (ensure they have the same aspect ratio)
  const profileImages = useMemo(() => ["/me.jpg", "/me2.jpg", "/me3.jpg", "/me4.jpg"], []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Preload all images to prevent flashing
  useEffect(() => {
    profileImages.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });
  }, [profileImages]);

  // Handle image rotation with glitch effect
  useEffect(() => {
    if (!glitchEffect) return;
    
    const rotationTimer = setInterval(() => {
      // Start glitch effect
      setIsGlitching(true);
      
      // After short glitch, start transition
      setTimeout(() => {
        setIsTransitioning(true);
        
        // Calculate next image index
        const nextIndex = (currentImageIndex + 1) % profileImages.length;
        setNextImageIndex(nextIndex);
        
        // After transition out completes, update current image
        setTimeout(() => {
          setCurrentImageIndex(nextIndex);
          setIsTransitioning(false);
          
          // End glitch effect after everything is done
          setTimeout(() => {
            setIsGlitching(false);
          }, 150);
        }, 300);
      }, 200);
    }, interval);

    return () => clearInterval(rotationTimer);
  }, [currentImageIndex, glitchEffect, interval, profileImages.length]);

  // Simple rotation without glitch if glitchEffect is disabled
  useEffect(() => {
    if (glitchEffect) return;
    
    const rotationTimer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, 150);
      }, 300);
    }, interval);

    return () => clearInterval(rotationTimer);
  }, [glitchEffect, interval, profileImages.length]);

  // Apply glitch effect to container
  const glitchClass = isGlitching ? 'glitch-effect' : '';
  
  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden punk-border ${glitchClass} ${className}`}
    >
      {/* Current image */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image
          src={profileImages[currentImageIndex]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 600px"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        />
      </div>
      
      {/* Next image (preloaded and hidden until transition) */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image
          src={profileImages[nextImageIndex]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        />
      </div>
    </div>
  );
}

export default RotatingProfileImage;
