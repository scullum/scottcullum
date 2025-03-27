import React from "react";
import { render, screen } from "@testing-library/react";
import Navigation from "@/components/navigation";
import { features } from "@/config/features";

// Mock the features module
jest.mock("@/config/features", () => ({
  features: {
    showWork: false,
    showThoughts: false,
    showResume: false,
  },
}));

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock the InlineToggleControls component
jest.mock("@/components/inline-toggle-controls", () => ({
  InlineToggleControls: () => <div data-testid="toggle-controls">Toggle Controls</div>,
}));

describe("Navigation Component", () => {
  it("should always show Home and About links", () => {
    render(<Navigation />);
    
    // These links should always be visible
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("should always show Contact link", () => {
    render(<Navigation />);
    
    // Contact link should always be visible
    expect(screen.getByText("Contact")).toBeInTheDocument();
    
    // Verify it's a mailto link
    const contactLink = screen.getByText("Contact").closest("a");
    expect(contactLink).toHaveAttribute("href", "mailto:scott@scullum.com");
  });

  it("should not show Work link when showWork is false", () => {
    (features.showWork as boolean) = false;
    render(<Navigation />);
    
    // Work link should not be visible
    expect(screen.queryByText("Work")).not.toBeInTheDocument();
  });

  it("should not show Thoughts link when showThoughts is false", () => {
    (features.showThoughts as boolean) = false;
    render(<Navigation />);
    
    // Thoughts link should not be visible
    expect(screen.queryByText("Thoughts")).not.toBeInTheDocument();
  });

  it("should show Work link when showWork is true", () => {
    // Enable the work feature
    (features.showWork as boolean) = true;
    
    render(<Navigation />);
    
    // Work link should be visible
    expect(screen.getByText("Work")).toBeInTheDocument();
    
    // Reset to default state
    (features.showWork as boolean) = false;
  });

  it("should show Thoughts link when showThoughts is true", () => {
    // Enable the thoughts feature
    (features.showThoughts as boolean) = true;
    
    render(<Navigation />);
    
    // Thoughts link should be visible
    expect(screen.getByText("Thoughts")).toBeInTheDocument();
    
    // Reset to default state
    (features.showThoughts as boolean) = false;
  });
});
