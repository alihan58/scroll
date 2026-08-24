'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export const CustomAlienCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Smooth cursor motion spring
  const cursorX = useSpring(-100, { stiffness: 450, damping: 28 })
  const cursorY = useSpring(-100, { stiffness: 450, damping: 28 })

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Detect hover over interactive elements
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-screen"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        animate={{
          scale: isClicked ? 0.75 : isHovered ? 1.45 : 1.0,
          rotate: isHovered ? 15 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 22 }}
        className="relative flex items-center justify-center filter drop-shadow-[0_0_12px_rgba(0,240,255,0.85)]"
      >
        {/* Retro 8-Bit Glowing Alien Head Custom Cursor SVG */}
        <svg
          width="34"
          height="34"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform -rotate-12 transition-transform duration-150"
        >
          {/* Alien Head Outer Glow Outline */}
          <path
            d="M16 2 C9 2 4 8 4 16 C4 23 9 29 13 30 C15 30.5 17 30.5 19 30 C23 29 28 23 28 16 C28 8 23 2 16 2 Z"
            fill="#10b981"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />
          {/* Left Slanted Slit Eye */}
          <ellipse
            cx="11"
            cy="14"
            rx="3.5"
            ry="6"
            transform="rotate(-25 11 14)"
            fill="#050505"
            stroke="#ff007f"
            strokeWidth="1"
          />
          {/* Right Slanted Slit Eye */}
          <ellipse
            cx="21"
            cy="14"
            rx="3.5"
            ry="6"
            transform="rotate(25 21 14)"
            fill="#050505"
            stroke="#ff007f"
            strokeWidth="1"
          />
          {/* Eye Reflection Highlights */}
          <circle cx="10" cy="12" r="1" fill="#00f0ff" />
          <circle cx="22" cy="12" r="1" fill="#00f0ff" />
          {/* Alien Nostrils / Mouth Dot */}
          <circle cx="14.5" cy="23" r="0.75" fill="#050505" />
          <circle cx="17.5" cy="23" r="0.75" fill="#050505" />
        </svg>

        {/* Hover Target Ring */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.6, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400 animate-spin"
            style={{ animationDuration: '4s' }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
