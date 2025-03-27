import { NextRequest, NextResponse } from "next/server";
import { middleware } from "@/middleware";
import { features } from "@/config/features";

// Mock the features module
jest.mock("@/config/features", () => ({
  features: {
    showWork: false,
    showThoughts: false,
    showResume: false,
  },
}));

// Mock NextResponse
jest.mock("next/server", () => {
  const originalModule = jest.requireActual("next/server");
  return {
    ...originalModule,
    NextResponse: {
      redirect: jest.fn().mockImplementation((url) => ({ redirectUrl: url })),
      next: jest.fn().mockReturnValue({ type: "next" }),
    },
  };
});

describe("Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function createMockRequest(url: string): NextRequest {
    return {
      nextUrl: new URL(url, "http://localhost:3000"),
      url: url,
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
