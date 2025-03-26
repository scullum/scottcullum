"use client";

import { useSettings } from "@/contexts/settings-context";
import { Moon, Sun, Zap, ZapOff, Box, Package } from "lucide-react";
import { useState } from "react";

interface ToggleControlsProps {
  className?: string;
}

export function ToggleControls({ className = "" }: ToggleControlsProps) {
  const { isDarkMode, isSkewEnabled, isAnimationEnabled, toggleDarkMode, toggleSkew, toggleAnimation } = useSettings();
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className={`fixed top-4 right-4 z-50 flex flex-col items-end gap-2 ${className}`}>
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(prev => !prev)}
        className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-accent hover:text-black transition-colors duration-200"
        aria-label="Toggle settings"
      >
        <span className="text-xl font-mono">⚙️</span>
      </button>
      
      {/* Controls panel */}
      {isExpanded && (
        <div className="bg-black/80 dark:bg-white/20 backdrop-blur-md p-3 rounded-md flex flex-col gap-3 text-white dark:text-white">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <>
                <Sun size={18} />
                <span className="text-sm">Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={18} />
                <span className="text-sm">Dark Mode</span>
              </>
            )}
          </button>
          
          {/* Skew toggle */}
          <button
            onClick={toggleSkew}
            className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
            aria-label={isSkewEnabled ? "Disable skew effect" : "Enable skew effect"}
          >
            {isSkewEnabled ? (
              <>
                <Box size={18} />
                <span className="text-sm">Disable Skew</span>
              </>
            ) : (
              <>
                <Package size={18} />
                <span className="text-sm">Enable Skew</span>
              </>
            )}
          </button>
          
          {/* Animation toggle */}
          <button
            onClick={toggleAnimation}
            className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
            aria-label={isAnimationEnabled ? "Disable animations" : "Enable animations"}
          >
            {isAnimationEnabled ? (
              <>
                <ZapOff size={18} />
                <span className="text-sm">Disable Animations</span>
              </>
            ) : (
              <>
                <Zap size={18} />
                <span className="text-sm">Enable Animations</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
