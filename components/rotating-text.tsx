"use client"

import { useState, useEffect, useMemo, useCallback } from "react"

interface RotatingTextProps {
  phrases: string[]
  interval?: number
  className?: string
}

const RotatingText = ({ phrases, interval = 4000, className = "" }: RotatingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Memoize the phrases array length calculation
  const phrasesLength = useMemo(() => phrases.length, [phrases])
  
  // Use useCallback for the transition function
  const transitionToNextPhrase = useCallback(() => {
    setIsVisible(false)
    
    const transitionTimeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrasesLength)
      setIsVisible(true)
    }, 500) // Transition time
    
    return transitionTimeout
  }, [phrasesLength])
  
  useEffect(() => {
    // Setup interval for rotating text
    const intervalId = setInterval(transitionToNextPhrase, interval)
    
    // Cleanup function
    return () => {
      clearInterval(intervalId)
    }
  }, [interval, transitionToNextPhrase])

  // Memoize the current phrase
  const currentPhrase = useMemo(() => phrases[currentIndex], [phrases, currentIndex])
  
  // Memoize the combined className
  const combinedClassName = useMemo(() => {
    return `transition-all duration-500 ${className} ${
      isVisible ? "opacity-100 transform-none" : "opacity-0 -translate-y-2"
    }`
  }, [className, isVisible])
  
  return (
    <div className="relative h-auto min-h-[2.5em] overflow-visible max-w-full">
      <div
        className={combinedClassName}
        data-text={currentPhrase}
        style={{ maxWidth: '100%', display: 'inline-block' }}
      >
        {currentPhrase}
      </div>
    </div>
  )
}

export default RotatingText

