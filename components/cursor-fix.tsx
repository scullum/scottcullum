"use client";

import { useEffect } from "react";

/**
 * CursorFix component to ensure all interactive elements display the hand cursor
 * This is a client component that applies cursor styles directly to DOM elements
 */
export function CursorFix() {
  useEffect(() => {
    // Apply cursor styles to all interactive elements
    const applyHandCursor = () => {
      const interactiveSelectors = [
        "a",
        "button",
        "[role='button']",
        ".nav-link",
        "input[type='submit']",
        "input[type='reset']",
        "input[type='button']",
        "summary",
        ".interactive"
      ];
      
      // Apply styles to all matching elements
      interactiveSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          (el as HTMLElement).style.cursor = "pointer";
        });
      });
    };

    // Apply immediately
    applyHandCursor();
    
    // Set up a mutation observer to handle dynamically added elements
    const observer = new MutationObserver(applyHandCursor);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => observer.disconnect();
  }, []);

  // This component doesn't render anything
  return null;
}

export default CursorFix;
