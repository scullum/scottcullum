"use client";

import { useSettings } from "@/contexts/settings-context";
import { Zap, ZapOff, Sun, Moon } from "lucide-react";

interface InlineToggleControlsProps {
  className?: string;
}

export function InlineToggleControls({ className = "" }: InlineToggleControlsProps) {
  const { 
    isSkewEnabled, 
    isAnimationEnabled, 
    isDarkMode,
    toggleEffects, 
    toggleDarkMode 
  } = useSettings();

  // Determine the combined state
  const effectsEnabled = isSkewEnabled && isAnimationEnabled;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Dark/Light mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="flex items-center hover:text-accent transition-colors duration-200"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Moon size={18} className="text-accent" />
        ) : (
          <Sun size={18} className="text-accent" />
        )}
      </button>

      {/* Combined effects toggle with lightning bolt icon */}
      <button
        onClick={toggleEffects}
        className="flex items-center hover:text-accent transition-colors duration-200"
        aria-label={effectsEnabled ? "Disable effects" : "Enable effects"}
      >
        {effectsEnabled ? (
          <Zap size={18} className="text-accent" />
        ) : (
          <ZapOff size={18} className="opacity-50" />
        )}
      </button>
    </div>
  );
}
