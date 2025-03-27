"use client";

import React, { ReactNode, useMemo } from "react";

interface SkewedParagraphGroupProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
}

/**
 * A component that applies the same skew to all paragraph children
 * This ensures consistent skew across related paragraphs
 */
export function SkewedParagraphGroup({
  children,
  className = "",
  intensity = "light",
}: SkewedParagraphGroupProps) {
  // Generate a single random skew value for all children
  const skewValues = useMemo(() => {
    // Define intensity ranges
    const ranges = {
      light: { x: 0.5, y: 0.5 },
      medium: { x: 3, y: 3 },
      heavy: { x: 6, y: 6 },
    };

    const range = ranges[intensity];
    const skewX = (Math.random() * 2 - 1) * range.x;
    const skewY = (Math.random() * 2 - 1) * range.y;

    return { skewX, skewY };
  }, [intensity]);

  // Apply the same skew to all children
  const style = {
    transform: `skew(${skewValues.skewX}deg, ${skewValues.skewY}deg)`,
    transition: "transform 0.2s ease-out",
    display: "block",
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        // Check if the child is a valid React element
        if (React.isValidElement(child)) {
          // Clone the element and apply the skew style to it directly
          return React.cloneElement(child, {
            style: {
              ...style,
              ...(child.props.style || {}),
            },
            className: `${child.props.className || ""} skewed-paragraph`,
          });
        }
        // For non-element children (like text), wrap them in a div with the skew
        return <div style={style}>{child}</div>;
      })}
    </div>
  );
}
