import { middleware } from "@/middleware";
import { features } from "@/config/features";
import type { NextRequest } from "next/server";

// Mock the features module
jest.mock("@/config/features", () => ({
  features: {
    showWork: false,
    showThoughts: false,
    showResume: false,
  },
}));

// Mock Next.js server components
jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn().mockImplementation(() => ({ type: "redirect" })),
    next: jest.fn().mockReturnValue({ type: "next" }),
  },
}));

// Import NextResponse from the mock
import { NextResponse } from "next/server";

describe("Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Create a mock NextRequest with the minimum required properties
  function createMockRequest(url: string): NextRequest {
    return {
      nextUrl: new URL(url, "http://localhost:3000"),
      url: url,
      // Add mock implementations for required methods
      cookies: {
        getAll: () => [],
        get: () => undefined,
        set: () => {},
        delete: () => {},
        has: () => false,
      },
      // Add other required properties with mock values
      headers: new Headers(),
      method: "GET",
      ip: "",
      geo: undefined,
      clone: () => createMockRequest(url),
    } as unknown as NextRequest;
  }

  describe("when work section is disabled", () => {
    beforeAll(() => {
      // Ensure work is disabled for these tests
      (features.showWork as boolean) = false;
    });

    it("should redirect /work to home page", () => {
      const req = createMockRequest("http://localhost:3000/work");
      middleware(req);
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: "/",
        })
      );
    });

    it("should redirect /work/project-id to home page", () => {
      const req = createMockRequest("http://localhost:3000/work/project-123");
      middleware(req);
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: "/",
        })
      );
    });
  });

  describe("when thoughts section is disabled", () => {
    beforeAll(() => {
      // Ensure thoughts is disabled for these tests
      (features.showThoughts as boolean) = false;
    });

    it("should redirect /thoughts to home page", () => {
      const req = createMockRequest("http://localhost:3000/thoughts");
      middleware(req);
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: "/",
        })
      );
    });

    it("should redirect /thoughts/post-id to home page", () => {
      const req = createMockRequest("http://localhost:3000/thoughts/post-123");
      middleware(req);
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: "/",
        })
      );
    });
  });

  describe("when work section is enabled", () => {
    beforeAll(() => {
      // Enable work for these tests
      (features.showWork as boolean) = true;
    });

    afterAll(() => {
      // Reset to default state
      (features.showWork as boolean) = false;
    });

    it("should allow access to /work", () => {
      const req = createMockRequest("http://localhost:3000/work");
      middleware(req);
      expect(NextResponse.next).toHaveBeenCalled();
      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it("should allow access to /work/project-id", () => {
      const req = createMockRequest("http://localhost:3000/work/project-123");
      middleware(req);
      expect(NextResponse.next).toHaveBeenCalled();
      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });
  });

  describe("when thoughts section is enabled", () => {
    beforeAll(() => {
      // Enable thoughts for these tests
      (features.showThoughts as boolean) = true;
    });

    afterAll(() => {
      // Reset to default state
      (features.showThoughts as boolean) = false;
    });

    it("should allow access to /thoughts", () => {
      const req = createMockRequest("http://localhost:3000/thoughts");
      middleware(req);
      expect(NextResponse.next).toHaveBeenCalled();
      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it("should allow access to /thoughts/post-id", () => {
      const req = createMockRequest("http://localhost:3000/thoughts/post-123");
      middleware(req);
      expect(NextResponse.next).toHaveBeenCalled();
      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });
  });

  it("should allow access to non-restricted paths", () => {
    const req = createMockRequest("http://localhost:3000/about");
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });
});
