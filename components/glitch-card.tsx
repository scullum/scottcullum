import type { ReactNode } from "react";

interface GlitchCardProps {
  children: ReactNode;
  className?: string;
  glitchEffect?: boolean;
}

const GlitchCard = ({ children, className = "", glitchEffect = false }: GlitchCardProps) => {
  return (
    <div className={`punk-card ${glitchEffect ? "hover:glitch" : ""} ${className}`}>{children}</div>
  );
};

export default GlitchCard;
