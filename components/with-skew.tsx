"use client";

import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamically import the SkewedContainer
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true,
});

/**
 * Higher-order component that adds skew effects to HTML elements
 * This allows us to automatically apply skew to elements across the site
 */
export function withSkew<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    intensity?: "light" | "medium" | "heavy";
    selector?: string;
    applyToAll?: boolean;
  } = {}
) {
  const { intensity = "medium", selector = "", applyToAll = false } = options;

  // Return a new component that wraps the original with skew effects
  const WithSkew = (props: P & { className?: string; children?: ReactNode }) => {
    const { className = "", children, ...rest } = props;

    // Function to determine if an element should be skewed
    const shouldSkew = () => {
      // If applyToAll is true, skew everything
      if (applyToAll) return true;

      // If a selector is provided, only skew elements with that class
      if (selector && className) {
        return className.includes(selector);
      }

      // Default: skew headings and paragraphs
      const isHeading =
        Component.displayName?.startsWith("h") ||
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(Component.displayName || "");

      const isParagraph = Component.displayName === "p";

      return isHeading || isParagraph;
    };

    // Apply skew if the element meets the criteria
    if (shouldSkew()) {
      return (
        <SkewedContainer intensity={intensity} skewOnLoad={true}>
          <Component className={className} {...(rest as P)}>
            {children}
          </Component>
        </SkewedContainer>
      );
    }

    // Otherwise, render the original component
    return (
      <Component className={className} {...(rest as P)}>
        {children}
      </Component>
    );
  };

  // Set display name for debugging
  WithSkew.displayName = `WithSkew(${Component.displayName || Component.name || "Component"})`;

  return WithSkew;
}

// Create skewed versions of common HTML elements
export const SkewedH1 = withSkew(
  ({ className = "", children, ...props }: { className?: string; children?: ReactNode }) => (
    <h1 className={className} {...props}>
      {children}
    </h1>
  ),
  { intensity: "medium" }
);
SkewedH1.displayName = "h1";

export const SkewedH2 = withSkew(
  ({ className = "", children, ...props }: { className?: string; children?: ReactNode }) => (
    <h2 className={className} {...props}>
      {children}
    </h2>
  ),
  { intensity: "medium" }
);
SkewedH2.displayName = "h2";

export const SkewedH3 = withSkew(
  ({ className = "", children, ...props }: { className?: string; children?: ReactNode }) => (
    <h3 className={className} {...props}>
      {children}
    </h3>
  ),
  { intensity: "light" }
);
SkewedH3.displayName = "h3";

export const SkewedP = withSkew(
  ({ className = "", children, ...props }: { className?: string; children?: ReactNode }) => (
    <p className={className} {...props}>
      {children}
    </p>
  ),
  { intensity: "light" }
);
SkewedP.displayName = "p";

export const SkewedDiv = withSkew(
  ({ className = "", children, ...props }: { className?: string; children?: ReactNode }) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
  { intensity: "light", selector: "skew" }
);
SkewedDiv.displayName = "div";

// Export a function to apply skew to any component
export function applySkew(
  component: ReactNode,
  intensity: "light" | "medium" | "heavy" = "medium"
): ReactNode {
  if (!component) return null;

  return (
    <SkewedContainer intensity={intensity} skewOnLoad={true}>
      {component}
    </SkewedContainer>
  );
}
