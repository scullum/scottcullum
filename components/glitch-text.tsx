"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
  tag?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4";
  glitchOnHover?: boolean;
}

/**
 * A text component that applies a glitch effect to the text
 */
function GlitchText({
  text,
  className = "",
  intensity = "medium",
  tag: Tag = "span",
  glitchOnHover = false,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  // Define intensity settings with useMemo to prevent re-renders
  const intensitySettings = useMemo(
    () => ({
      light: { probability: 0.02, maxChars: 2 },
      medium: { probability: 0.05, maxChars: 4 },
      heavy: { probability: 0.1, maxChars: 6 },
    }),
    []
  );

  // Characters to use for glitching
  const glitchChars = "!<>-_\\/@#$%^&*()=+[]{}?|;:,~`";

  const glitchText = useCallback(() => {
    if (!isGlitching) return;

    const settings = intensitySettings[intensity];
    const result = text.split("");

    // Randomly replace characters with glitch characters
    for (let i = 0; i < result.length; i++) {
      if (Math.random() < settings.probability) {
        // Get a random glitch character
        const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        result[i] = glitchChar;
      }
    }

    setDisplayText(result.join(""));

    // Schedule next glitch
    const timeout = setTimeout(
      () => {
        if (Math.random() < 0.7) {
          // Continue glitching
          glitchText();
        } else {
          // Reset to original text
          setDisplayText(text);

          // Schedule next glitch burst
          if (isGlitching) {
            setTimeout(() => glitchText(), Math.random() * 2000 + 500);
          }
        }
      },
      Math.random() * 150 + 50
    );

    return () => clearTimeout(timeout);
  }, [isGlitching, intensity, text, intensitySettings]);

  // Start glitching on mount if not hover-based
  useEffect(() => {
    if (!glitchOnHover) {
      setIsGlitching(true);
      glitchText();
    }

    return () => {
      setIsGlitching(false);
    };
  }, [glitchOnHover, glitchText]);

  // Handle hover events
  const handleMouseEnter = () => {
    if (glitchOnHover) {
      setIsGlitching(true);
      glitchText();
    }
  };

  const handleMouseLeave = () => {
    if (glitchOnHover) {
      setIsGlitching(false);
      setDisplayText(text);
    }
  };

  return (
    <Tag
      className={`glitch-text ${className}`}
      data-text={text}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </Tag>
  );
}

export default GlitchText;
