import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer";
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

// Mock the color context
jest.mock("@/contexts/color-context", () => ({
  useAccentColor: () => ({
    accentColorName: "purple",
    setColor: jest.fn(),
  }),
  colorOptions: [
    { name: "purple", value: "#8855ff" },
    { name: "blue", value: "#3355ff" },
  ],
}));

// Mock the InlineToggleControls component
jest.mock("@/components/inline-toggle-controls", () => ({
  InlineToggleControls: () => <div data-testid="toggle-controls">Toggle Controls</div>,
}));

describe("Footer Component", () => {
  it("should always show LinkedIn link", () => {
    render(<Footer />);
    
    // LinkedIn link should always be visible
    const linkedinLink = screen.getByLabelText("LinkedIn Profile");
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/scullum");
  });

  it("should not show Resume link when showResume is false", () => {
    (features.showResume as boolean) = false;
    render(<Footer />);
    
    // Resume link should not be visible
    expect(screen.queryByLabelText("Download Resume")).not.toBeInTheDocument();
    expect(screen.queryByText("Resume")).not.toBeInTheDocument();
  });

  it("should show Resume link when showResume is true", () => {
    // Enable the resume feature
    (features.showResume as boolean) = true;
    
    render(<Footer />);
    
    // Resume link should be visible
    const resumeLink = screen.getByLabelText("Download Resume");
    expect(resumeLink).toBeInTheDocument();
    expect(resumeLink).toHaveAttribute("href", "/scott-cullum-resume.pdf");
    
    // Reset to default state
    (features.showResume as boolean) = false;
  });

  it("should show copyright with current year", () => {
    render(<Footer />);
    
    // Copyright should include the current year
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`© ${currentYear} Scott M. Cullum`))).toBeInTheDocument();
  });
});
