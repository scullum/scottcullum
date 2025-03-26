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

    const resize = () => {
      if (canvas && window) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    // Initial resize
    resize()

    // Add resize listener
    window.addEventListener("resize", resize)

    const generateNoise = () => {
      if (!canvas || !ctx || canvas.width === 0 || canvas.height === 0) {
        // Skip if canvas dimensions aren't valid yet
        animationFrameId = requestAnimationFrame(generateNoise)
        return
      }

      try {
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const value = Math.random() * 255
          data[i] = value // red
          data[i + 1] = value // green
          data[i + 2] = value // blue
          data[i + 3] = 10 // alpha (low opacity)
        }

        ctx.putImageData(imageData, 0, 0)
      } catch (error) {
        console.error("Error generating noise:", error)
      }

      animationFrameId = requestAnimationFrame(generateNoise)
    }

    // Start the animation
    generateNoise()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize)
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

