"use client"

import { useEffect, useRef } from "react"

const NoiseOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let lastFrameTime = 0
    const frameInterval = 1000 / 15 // Limit to 15 FPS for better performance

    // Pre-generate a noise texture at a lower resolution for better performance
    const generateNoiseTexture = () => {
      if (!canvas || !ctx || canvas.width === 0 || canvas.height === 0) return

      try {
        // Use a smaller size for the noise texture (better performance)
        const scale = 0.25 // 25% of the original size
        const scaledWidth = Math.floor(canvas.width * scale)
        const scaledHeight = Math.floor(canvas.height * scale)
        
        const imageData = ctx.createImageData(scaledWidth, scaledHeight)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const value = Math.random() * 255
          data[i] = value // red
          data[i + 1] = value // green
          data[i + 2] = value // blue
          data[i + 3] = 10 // alpha (low opacity)
        }

        // Create an offscreen canvas for the noise texture
        const offscreenCanvas = new OffscreenCanvas(scaledWidth, scaledHeight)
        const offscreenCtx = offscreenCanvas.getContext("2d")
        if (!offscreenCtx) return

        offscreenCtx.putImageData(imageData, 0, 0)
        
        // Clear the main canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw the scaled noise texture to the main canvas
        ctx.imageSmoothingEnabled = false // Disable smoothing for pixelated effect
        ctx.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height)
      } catch (error) {
        console.error("Error generating noise texture:", error)
      }
    }
    
    const resize = () => {
      if (canvas && window) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // Generate a new noise texture when resizing
        generateNoiseTexture()
      }
    }

    // Initial resize
    resize()

    // Add resize listener with debounce
    let resizeTimeout: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resize, 200)
    }
    window.addEventListener("resize", debouncedResize)

    const animate = (timestamp: number) => {
      // Throttle frame rate for better performance
      if (timestamp - lastFrameTime >= frameInterval) {
        lastFrameTime = timestamp
        generateNoiseTexture()
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }

    // Start the animation
    animationFrameId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(resizeTimeout)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 opacity-5"
      style={{ mixBlendMode: "overlay" }}
      aria-hidden="true"
    />
  )
}

export default NoiseOverlay

