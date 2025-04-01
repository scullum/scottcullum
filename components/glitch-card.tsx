import type { ReactNode } from "react";

export interface GlitchCardProps {
  children: ReactNode;
  className?: string;
  glitchEffect?: boolean;
  glitchIntensity?: "light" | "medium" | "heavy";
  glitchOnHover?: boolean;
}

const GlitchCard = ({ 
  children, 
  className = "", 
  glitchEffect = false,
  glitchIntensity = "medium",
  glitchOnHover = true
}: GlitchCardProps) => {
  // Determine the glitch class based on intensity
  const glitchClass = glitchEffect ? (
    glitchIntensity === "light" ? "glitch-light" :
    glitchIntensity === "heavy" ? "glitch-heavy" :
    "glitch"
  ) : "";

  // Apply the glitch effect based on hover preference
  const hoverClass = glitchEffect && glitchOnHover ? `hover:${glitchClass}` : glitchEffect ? glitchClass : "";
  
  return (
    <div className={`punk-card ${hoverClass} ${className}`}>{children}</div>
  );
};

export default GlitchCard;
