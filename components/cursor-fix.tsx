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
        ".interactive",
        "[onclick]",
        "[data-action]",
        ".cursor-pointer",
        ".punk-border a",
        ".skewed-container a",
        ".nav-item a",
        ".footer a",
        "[class*='link']",
        "[class*='button']"
      ];
      
      // Apply styles to all matching elements
      interactiveSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          (el as HTMLElement).style.cursor = "pointer";
        });
      });
      
      // Add a special class to the body to enable CSS cursor fixes
      document.body.classList.add('cursor-fixes-enabled');
    };

    // Apply immediately
    applyHandCursor();
    
    // Set up a mutation observer to handle dynamically added elements
    const observer = new MutationObserver(mutations => {
      // Only reapply if relevant nodes were added
      const shouldReapply = mutations.some(mutation => 
        mutation.type === 'childList' && mutation.addedNodes.length > 0
      );
      
      if (shouldReapply) {
        applyHandCursor();
      }
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      observer.disconnect();
      document.body.classList.remove('cursor-fixes-enabled');
    };
  }, []);

  // This component doesn't render anything
  return null;
}

export default CursorFix;
