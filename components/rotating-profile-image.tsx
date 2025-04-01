"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface RotatingProfileImageProps {
  className?: string;
  interval?: number; // Time in milliseconds between image changes
  alt: string;
}

/**
 * A component that rotates through a collection of profile images
 */
export function RotatingProfileImage({
  className = "",
  interval = 5000, // Default to 5 seconds
  alt
}: RotatingProfileImageProps) {
  // List of profile images to rotate through
  const profileImages = [
    "/me.webp",
    "/me.jpg",
    "/me2.jpg",
    "/me3.jpg",
    "/me4.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Set up rotation interval
    const rotationTimer = setInterval(() => {
      setIsTransitioning(true);
      
      // Wait for fade-out transition to complete
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % profileImages.length
        );
        
        // Wait a bit then fade back in
        setTimeout(() => {
          setIsTransitioning(false);
        }, 150);
      }, 300);
    }, interval);

    // Clean up interval on unmount
    return () => clearInterval(rotationTimer);
  }, [interval, profileImages.length]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image
        src={profileImages[currentImageIndex]}
        alt={alt}
        fill
        priority
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

export default RotatingProfileImage;
