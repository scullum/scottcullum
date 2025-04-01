"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/contexts/settings-context";

interface NoiseOverlayProps {
  imagesOnly?: boolean;
}

const NoiseOverlay = ({ imagesOnly = true }: NoiseOverlayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isAnimationEnabled, isDarkMode } = useSettings();

  // Track if component is mounted to prevent hydration issues
  const isMountedRef = useRef(false);

  useEffect(() => {
    // Set mounted flag
    isMountedRef.current = true;

    // Delay initialization slightly to ensure hydration is complete
    const initTimeout = setTimeout(() => {
      if (!isMountedRef.current) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear the canvas if animations are disabled
      if (!isAnimationEnabled) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      let animationFrameId: number;
      let lastFrameTime = 0;
      const frameInterval = 1000 / 5; // Reduce to 5 FPS for slower movement

      // Store previous noise values for persistence
      let previousNoiseValues: number[] = [];

      // Pre-generate a noise texture at a lower resolution for better performance
      const generateNoiseTexture = () => {
        if (!canvas || !ctx || canvas.width === 0 || canvas.height === 0) return;

        try {
          // Use a smaller size for the noise texture (better performance)
          const scale = 0.25; // 25% of the original size
          const scaledWidth = Math.floor(canvas.width * scale);
          const scaledHeight = Math.floor(canvas.height * scale);

          const imageData = ctx.createImageData(scaledWidth, scaledHeight);
          const data = imageData.data;

          // Initialize previousNoiseValues if it's empty
          if (previousNoiseValues.length === 0) {
            previousNoiseValues = new Array(data.length / 4).fill(0).map(() => Math.random() * 255);
          }

          // Update only a portion of the noise values each frame for persistence
          for (let i = 0; i < previousNoiseValues.length; i++) {
            // Only update 10% of the pixels each frame for slower movement
            if (Math.random() < 0.1) {
              previousNoiseValues[i] = Math.random() * 255;
            }
          }

          // Apply the noise values to the image data
          for (let i = 0; i < data.length; i += 4) {
            const value = previousNoiseValues[i / 4];
            data[i] = value; // red
            data[i + 1] = value; // green
            data[i + 2] = value; // blue
            data[i + 3] = isDarkMode ? 50 : 30; // alpha (adjusted for light/dark mode)
          }

          // Create an offscreen canvas for the noise texture
          const offscreenCanvas = new OffscreenCanvas(scaledWidth, scaledHeight);
          const offscreenCtx = offscreenCanvas.getContext("2d");
          if (!offscreenCtx) return;

          offscreenCtx.putImageData(imageData, 0, 0);

          // Clear the main canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw the scaled noise texture to the main canvas
          ctx.imageSmoothingEnabled = false; // Disable smoothing for pixelated effect
          ctx.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);
        } catch (error) {
          console.error("Error generating noise texture:", error);
        }
      };

      const resize = () => {
        if (canvas && window) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          // Generate a new noise texture when resizing
          generateNoiseTexture();
        }
      };

      // Initial resize
      resize();

      // Add resize listener with debounce
      let resizeTimeout: NodeJS.Timeout;
      const debouncedResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resize, 200);
      };
      window.addEventListener("resize", debouncedResize);

      const animate = (timestamp: number) => {
        // Throttle frame rate for better performance
        if (timestamp - lastFrameTime >= frameInterval) {
          lastFrameTime = timestamp;
          generateNoiseTexture();
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      // Start the animation
      animationFrameId = requestAnimationFrame(animate);

      // Cleanup
      return () => {
        isMountedRef.current = false;
        window.removeEventListener("resize", debouncedResize);
        clearTimeout(resizeTimeout);
        clearTimeout(initTimeout);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }, 100); // Add delay in milliseconds

    // Cleanup for the outer useEffect
    return () => {
      isMountedRef.current = false;
      clearTimeout(initTimeout);
    };
  }, [isAnimationEnabled, isDarkMode]);

  return (
    <div
      className={`fixed ${imagesOnly ? 'pointer-events-none' : 'inset-0 w-full h-full overflow-hidden pointer-events-none'}`}
      style={{
        zIndex: imagesOnly ? 5 : 1000,
        opacity: isAnimationEnabled ? 1 : 0,
        transition: "opacity 0.3s ease-out",
      }}
    >
      <canvas
        ref={canvasRef}
        className={`${imagesOnly ? 'absolute w-full h-full' : 'absolute inset-0 w-full h-full opacity-20'}`}
        style={{
          mixBlendMode: isDarkMode ? "overlay" : "multiply",
          opacity: isDarkMode ? 0.2 : 0.1,
        }}
        aria-hidden="true"
      />
      {imagesOnly && (
        <style jsx global>{`
          img {
            position: relative;
          }
          img::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23000" opacity="0.1"/></svg>');
            mix-blend-mode: overlay;
            pointer-events: none;
            z-index: 1;
          }
        `}</style>
      )}
    </div>
  );
};

export default NoiseOverlay;
