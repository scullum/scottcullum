"use client"

import { useState, useEffect } from "react"

interface RotatingTextProps {
  phrases: string[]
  interval?: number
  className?: string
}

const RotatingText = ({ phrases, interval = 4000, className = "" }: RotatingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
        setIsVisible(true)
      }, 500) // Transition time
    }, interval)

    return () => clearInterval(intervalId)
  }, [phrases, interval])

  return (
    <div className="relative h-auto min-h-[2.5em] overflow-visible">
      <div
        className={`transition-all duration-500 ${className} ${
          isVisible ? "opacity-100 transform-none" : "opacity-0 -translate-y-2"
        }`}
        data-text={phrases[currentIndex]}
      >
        {phrases[currentIndex]}
      </div>
    </div>
  )
}

export default RotatingText

