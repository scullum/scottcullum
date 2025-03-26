"use client";

import { useSettings } from "@/contexts/settings-context";
import { Zap, ZapOff } from "lucide-react";

interface InlineToggleControlsProps {
  className?: string;
}

export function InlineToggleControls({ className = "" }: InlineToggleControlsProps) {
  const { isSkewEnabled, isAnimationEnabled, toggleEffects } = useSettings();
  
  // Determine the combined state
  const effectsEnabled = isSkewEnabled && isAnimationEnabled;
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
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
