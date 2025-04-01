"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSettings } from "@/contexts/settings-context";

interface GlitchNameProps {
  name: string;
  className?: string;
  glitchIntensity?: "light" | "medium" | "heavy";
  rotationRange?: number;
  glitchInterval?: number;
  rotationInterval?: number;
}

/**
 * A component that applies glitch and rotation effects to a name
 */
export function GlitchName({
  name,
  className = "",
  glitchIntensity = "medium",
  rotationRange = 3,
  glitchInterval = 2000,
  rotationInterval = 5000,
}: GlitchNameProps) {
  const { isAnimationEnabled } = useSettings();
  const [displayText, setDisplayText] = useState(name);
  const [rotation, setRotation] = useState(0);

  // Define intensity settings
  const intensitySettings = useMemo(
    () => ({
      light: { probability: 0.02, maxChars: 1 },
      medium: { probability: 0.05, maxChars: 2 },
      heavy: { probability: 0.1, maxChars: 3 },
    }),
    []
  );

  // Characters to use for glitching
  const glitchChars = "!<>-_\\/@#$%^&*()=+[]{}?|;:,~`";

  // Function to apply glitch effect to text
  const glitchText = useCallback(() => {
    const settings = intensitySettings[glitchIntensity];
    const result = name.split("");

    // Randomly replace characters with glitch characters
    for (let i = 0; i < result.length; i++) {
      if (Math.random() < settings.probability) {
        const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        result[i] = glitchChar;
      }
    }

    setDisplayText(result.join(""));

    // Schedule reset after a short time
    setTimeout(() => {
      setDisplayText(name);
    }, 150);
  }, [name, glitchIntensity, intensitySettings]);

  // Function to rotate the text
  const rotateText = useCallback(() => {
    const newRotation = (Math.random() * 2 - 1) * rotationRange;
    setRotation(newRotation);
  }, [rotationRange]);

  // Set up intervals for glitch and rotation effects
  useEffect(() => {
    // Skip animation if disabled
    if (!isAnimationEnabled) {
      // Reset to original state when animations are disabled
      setDisplayText(name);
      setRotation(0);
      return;
    }

    // Flag to ensure we only run client-side after hydration
    let isMounted = true;

    // Delay initial effects slightly to ensure hydration is complete
    const initialEffectsTimeout = setTimeout(() => {
      if (isMounted) {
        glitchText();
        rotateText();
      }
    }, 100);

    // Set up intervals with a slight delay
    const glitchTimer = setTimeout(() => {
      if (isMounted) {
        const interval = setInterval(glitchText, glitchInterval);
        return () => clearInterval(interval);
      }
    }, 200);

    const rotationTimer = setTimeout(() => {
      if (isMounted) {
        const interval = setInterval(rotateText, rotationInterval);
        return () => clearInterval(interval);
      }
    }, 300);

    // Clean up intervals and timeouts on unmount
    return () => {
      isMounted = false;
      clearTimeout(initialEffectsTimeout);
      clearTimeout(glitchTimer);
      clearTimeout(rotationTimer);
    };
  }, [glitchText, rotateText, glitchInterval, rotationInterval, isAnimationEnabled, name]);

  // Reset to original state when animations are toggled off
  useEffect(() => {
    if (!isAnimationEnabled) {
      setDisplayText(name);
      setRotation(0);
    }
  }, [isAnimationEnabled, name]);

  return (
    <span
      className={`inline-block relative ${className}`}
      style={{
        transform: isAnimationEnabled ? `rotate(${rotation}deg)` : "none",
        transition: isAnimationEnabled ? "transform 1s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        display: "inline-block",
      }}
      data-text={isAnimationEnabled ? name : ""}
    >
      <span className="relative inline-block">
        {isAnimationEnabled ? displayText : name}
        {isAnimationEnabled && (
          <span
            className="absolute left-0 top-0 overflow-hidden opacity-20 text-accent"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: "translateX(2px)", // Fixed value to avoid hydration mismatch
            }}
            aria-hidden="true"
          >
            {displayText}
          </span>
        )}
      </span>
    </span>
  );
}
