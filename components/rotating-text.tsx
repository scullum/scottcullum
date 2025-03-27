"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSettings } from "@/contexts/settings-context";

interface RotatingTextProps {
  phrases: string[];
  interval?: number;
  className?: string;
  glitchOnRotate?: boolean;
}

const RotatingText = ({
  phrases,
  interval = 4000,
  className = "",
  glitchOnRotate = false,
}: RotatingTextProps) => {
  const { isAnimationEnabled } = useSettings();
  // Generate a random starting index
  const randomStartIndex = useMemo(() => Math.floor(Math.random() * phrases.length), [phrases]);
  
  const [currentIndex, setCurrentIndex] = useState(randomStartIndex);
  const [isVisible, setIsVisible] = useState(true);
  const [displayText, setDisplayText] = useState(phrases[randomStartIndex]);

  // Memoize the phrases array length calculation
  const phrasesLength = useMemo(() => phrases.length, [phrases]);

  // Glitch characters to use
  const glitchChars = "!<>-_\\/@#$%^&*()=+[]{}?|;:,~`";

  // Apply glitch effect to text
  const applyGlitchEffect = useCallback(
    (text: string) => {
      if (!glitchOnRotate || !isAnimationEnabled) return text;

      const result = text.split("");

      // Randomly replace characters with glitch characters
      for (let i = 0; i < result.length; i++) {
        if (Math.random() < 0.1) {
          const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          result[i] = glitchChar;
        }
      }

      return result.join("");
    },
    [glitchOnRotate, isAnimationEnabled]
  );

  // Use useCallback for the transition function
  const transitionToNextPhrase = useCallback(() => {
    setIsVisible(false);

    const transitionTimeout = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % phrasesLength;
      setCurrentIndex(nextIndex);

      // Apply glitch effect if enabled
      if (glitchOnRotate) {
        const nextPhrase = phrases[nextIndex];

        // Apply initial glitch
        setDisplayText(applyGlitchEffect(nextPhrase));

        // Schedule a few more glitches
        const glitchCount = 3;
        const glitchDuration = 150;

        for (let i = 0; i < glitchCount; i++) {
          setTimeout(
            () => {
              setDisplayText(applyGlitchEffect(nextPhrase));
            },
            500 + i * glitchDuration
          );
        }

        // Reset to normal text
        setTimeout(
          () => {
            setDisplayText(nextPhrase);
          },
          500 + glitchCount * glitchDuration
        );
      } else {
        setDisplayText(phrases[nextIndex]);
      }

      setIsVisible(true);
    }, 500); // Transition time

    return transitionTimeout;
  }, [phrasesLength, currentIndex, phrases, glitchOnRotate, applyGlitchEffect]);

  useEffect(() => {
    // Skip animation if disabled
    if (!isAnimationEnabled) {
      // Reset to first phrase when animations are disabled
      setCurrentIndex(0);
      setDisplayText(phrases[0]);
      setIsVisible(true);
      return;
    }

    // Setup interval for rotating text
    const intervalId = setInterval(transitionToNextPhrase, interval);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, [interval, transitionToNextPhrase, isAnimationEnabled, phrases]);

  // Reset to random phrase when animations are toggled off
  useEffect(() => {
    if (!isAnimationEnabled) {
      setCurrentIndex(randomStartIndex);
      setDisplayText(phrases[randomStartIndex]);
      setIsVisible(true);
    }
  }, [isAnimationEnabled, phrases, randomStartIndex]);

  // Memoize the current phrase
  const currentPhrase = useMemo(() => phrases[currentIndex], [phrases, currentIndex]);

  // Memoize the combined className
  const combinedClassName = useMemo(() => {
    // Don't apply animation classes when animations are disabled
    if (!isAnimationEnabled) {
      return `${className}`;
    }

    return `transition-all duration-500 ${className} ${
      isVisible ? "opacity-100 transform-none" : "opacity-0 -translate-y-2"
    }`;
  }, [className, isVisible, isAnimationEnabled]);

  return (
    <div className="relative h-auto min-h-[2.5em] overflow-visible max-w-full">
      <div
        className={combinedClassName}
        data-text={isAnimationEnabled ? currentPhrase : ""}
        style={{
          maxWidth: "100%",
          display: "inline-block",
          // Ensure no animations or transitions when disabled
          transition: isAnimationEnabled ? undefined : "none",
        }}
      >
        {isAnimationEnabled ? (glitchOnRotate ? displayText : currentPhrase) : phrases[randomStartIndex]}
      </div>
    </div>
  );
};

export default RotatingText;
