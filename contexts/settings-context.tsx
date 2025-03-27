"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SettingsContextType {
  isDarkMode: boolean;
  isSkewEnabled: boolean;
  isAnimationEnabled: boolean;
  toggleDarkMode: () => void;
  toggleSkew: () => void;
  toggleAnimation: () => void;
  toggleEffects: () => void;
}

const defaultSettings: SettingsContextType = {
  isDarkMode: true,
  isSkewEnabled: true,
  isAnimationEnabled: true,
  toggleDarkMode: () => {},
  toggleSkew: () => {},
  toggleAnimation: () => {},
  toggleEffects: () => {},
};

const SettingsContext = createContext<SettingsContextType>(defaultSettings);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with defaults, then load from localStorage if available
  const [isDarkMode, setIsDarkMode] = useState(defaultSettings.isDarkMode);
  const [isSkewEnabled, setIsSkewEnabled] = useState(defaultSettings.isSkewEnabled);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(defaultSettings.isAnimationEnabled);

  // Apply light mode class immediately if in client
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initial application of light/dark mode
      if (!isDarkMode) {
        document.documentElement.classList.add("light-mode");
      } else {
        document.documentElement.classList.remove("light-mode");
      }
    }
  }, [isDarkMode]);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const savedSettings = localStorage.getItem("site-settings");
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setIsDarkMode(parsedSettings.isDarkMode ?? defaultSettings.isDarkMode);
        setIsSkewEnabled(parsedSettings.isSkewEnabled ?? defaultSettings.isSkewEnabled);
        setIsAnimationEnabled(
          parsedSettings.isAnimationEnabled ?? defaultSettings.isAnimationEnabled
        );
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(
        "site-settings",
        JSON.stringify({
          isDarkMode,
          isSkewEnabled,
          isAnimationEnabled,
        })
      );

      // Apply light/dark mode class to html element
      if (isDarkMode) {
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  }, [isDarkMode, isSkewEnabled, isAnimationEnabled]);

  // Toggle functions
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      // Immediately apply the class change for a more responsive feel
      if (typeof window !== "undefined") {
        if (!newValue) {
          document.documentElement.classList.add("light-mode");
        } else {
          document.documentElement.classList.remove("light-mode");
        }
      }
      return newValue;
    });
  };
  const toggleSkew = () => setIsSkewEnabled((prev) => !prev);
  const toggleAnimation = () => setIsAnimationEnabled((prev) => !prev);

  // Combined toggle for both skew and animation
  const toggleEffects = () => {
    // Get current state
    const currentState = isSkewEnabled && isAnimationEnabled;

    // Toggle both to the same new state
    const newState = !currentState;
    setIsSkewEnabled(newState);
    setIsAnimationEnabled(newState);
  };

  return (
    <SettingsContext.Provider
      value={{
        isDarkMode,
        isSkewEnabled,
        isAnimationEnabled,
        toggleDarkMode,
        toggleSkew,
        toggleAnimation,
        toggleEffects,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
