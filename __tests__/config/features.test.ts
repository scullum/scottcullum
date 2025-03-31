import { features } from "@/config/features";

describe("Feature Flags Configuration", () => {
  it("should have the expected feature flags defined", () => {
    // Check that all expected feature flags exist
    expect(features).toHaveProperty("showWork");
    expect(features).toHaveProperty("showThoughts");
    expect(features).toHaveProperty("showResume");
  });

  it("should have all feature flags set to boolean values", () => {
    // Ensure all feature flags are boolean values
    Object.values(features).forEach((value) => {
      expect(typeof value).toBe("boolean");
    });
  });

  it("should have the work section enabled and thoughts section disabled", () => {
    // Work section should be enabled, thoughts still disabled
    expect(features.showWork).toBe(true);
    expect(features.showThoughts).toBe(false);
  });

  it("should have resume download disabled by default", () => {
    // Resume should be hidden initially
    expect(features.showResume).toBe(false);
  });
});
