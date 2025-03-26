"use client";

import dynamic from "next/dynamic";
import React, { ReactNode } from "react";

// Dynamically import the SkewedContainer component
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true
});

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * A wrapper component that applies skewed container effects to page content
 * This ensures a consistent glitch aesthetic across all pages
 */
function PageWrapper({ children, className = "" }: PageWrapperProps) {
  // Function to recursively apply skew to React elements
  const applySkewToChildren = (children: ReactNode): ReactNode => {
    // If it's an array, process each child
    if (Array.isArray(children)) {
      return children.map(child => applySkewToChildren(child));
    }

    // If it's a React element with children
    if (
      children &&
      typeof children === "object" &&
      "props" in children &&
      children.props &&
      typeof children.props === "object" &&
      'children' in children.props
    ) {
      // Skip elements that already have skew or shouldn't be skewed
      const shouldSkip =
        children.type === SkewedContainer ||
        // Skip if it's not a string type (likely a custom component)
        typeof children.type !== "string" ||
        // Skip these HTML elements
        ["a", "button", "input", "textarea", "select", "img", "svg", "path", "canvas"].includes(children.type);

      if (shouldSkip) {
        return children;
      }

      // Determine if this is a heading or paragraph that should be skewed
      const isHeading = 
        typeof children.type === "string" && 
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(children.type);
      
      const isParagraph = 
        typeof children.type === "string" && 
        ["p", "div", "section", "article"].includes(children.type);

      // Apply appropriate skew based on element type
      if (isHeading) {
        return (
          <SkewedContainer intensity="medium" skewOnLoad={true}>
            {children}
          </SkewedContainer>
        );
      } else if (isParagraph) {
        return (
          <SkewedContainer intensity="light" skewOnLoad={true}>
            {children}
          </SkewedContainer>
        );
      }

      // Process children of this element
      const newChildren = applySkewToChildren(children.props.children);
      // Create a properly typed clone of the element with new children
      return React.cloneElement(
        children,
        { ...children.props },
        newChildren
      );
    }

    // Return unchanged if it's a primitive or doesn't have children
    return children;
  };

  return (
    <div className={className}>
      {applySkewToChildren(children)}
    </div>
  );
}

export default PageWrapper;
