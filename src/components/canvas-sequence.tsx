'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'

interface ExplodingSequenceProps {
  totalFrames?: number
  containerRef: React.RefObject<HTMLDivElement>
  bgColor?: string
}

export const ExplodingSequence: React.FC<ExplodingSequenceProps> = ({
  containerRef,
  bgColor = '#050505',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameIdRef = useRef<number | null>(null)

  // Scroll takibi [0.0 -> 1.0]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Ultra-fast 60fps smooth spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.0005,
  })

  // Ultra-Fast High-FPS 3D Spiral Render Engine (Zero Lag, GPU Optimized)
  const draw3DSpiral = useCallback((progress: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false })
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const cx = w / 2
    const cy = h / 2

    // Background Fill
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, w, h)

    const safeProgress = isNaN(progress) ? 0 : Math.max(0, Math.min(1, progress))

    // Dynamic 3D Transformations
    const rotationX = safeProgress * Math.PI * 3.5
    const rotationY = safeProgress * Math.PI * 5
    const twistFactor = safeProgress * 7
    const zoomScale = Math.min(w, h) * (0.30 + safeProgress * 0.20)

    // Palette
    const colorStops = [
      { r: 0, g: 240, b: 255 },   // Cyan
      { r: 112, g: 0, b: 255 },   // Purple
      { r: 255, g: 0, b: 127 },   // Pink
      { r: 255, g: 234, b: 0 },   // Yellow
      { r: 16, g: 185, b: 129 },  // Emerald
    ]

    const interpolateColor = (t: number) => {
      const normT = Math.max(0, Math.min(1, isNaN(t) ? 0 : Math.abs(t) % 1))
      const scaled = normT * (colorStops.length - 1)
      const i1 = Math.min(colorStops.length - 1, Math.max(0, Math.floor(scaled)))
      const i2 = Math.min(colorStops.length - 1, i1 + 1)
      const ratio = scaled - i1

      const c1 = colorStops[i1] || colorStops[0]
      const c2 = colorStops[i2] || c1

      const r = Math.floor(c1.r + (c2.r - c1.r) * ratio)
      const g = Math.floor(c1.g + (c2.g - c1.g) * ratio)
      const b = Math.floor(c1.b + (c2.b - c1.b) * ratio)

      return `rgb(${r}, ${g}, ${b})`
    }

    const arms = 4
    const pointsPerArm = 85 // Light and fast 60fps!

    const cosX = Math.cos(rotationX)
    const sinX = Math.sin(rotationX)
    const fov = 850

    ctx.save()
    ctx.lineWidth = 2.5

    for (let arm = 0; arm < arms; arm++) {
      const armAngleOffset = (arm / arms) * Math.PI * 2
      const armColor = interpolateColor((arm / arms + safeProgress) % 1)

      ctx.strokeStyle = armColor
      ctx.fillStyle = armColor

      ctx.beginPath()

      for (let i = 0; i < pointsPerArm; i += 2) {
        const step = i / pointsPerArm
        const spiralRadius = step * zoomScale * (1 + Math.sin(step * 8 + safeProgress * 6) * 0.12)
        const angle = step * Math.PI * 8 + armAngleOffset + rotationY + step * twistFactor

        const x3d = Math.cos(angle) * spiralRadius
        const y3d = Math.sin(angle) * spiralRadius
        const z3d = (step - 0.5) * zoomScale * 1.5

        const yRotated = y3d * cosX - z3d * sinX
        const zRotated = y3d * sinX + z3d * cosX

        const pScale = fov / (fov + zRotated + 350)
        const x2d = cx + x3d * pScale
        const y2d = cy + yRotated * pScale

        if (i === 0) {
          ctx.moveTo(x2d, y2d)
        } else {
          ctx.lineTo(x2d, y2d)
        }
      }

      ctx.stroke()
    }

    // Glowing Energy Core
    const coreColor = interpolateColor(safeProgress)
    ctx.fillStyle = coreColor
    ctx.beginPath()
    ctx.arc(cx, cy, Math.max(10, Math.min(w, h) * 0.02), 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }, [bgColor])

  // Resize handler with optimized DPR
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap DPR at 2 for max FPS performance
    const rect = canvas.getBoundingClientRect()

    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)

    draw3DSpiral(smoothProgress.get())
  }, [draw3DSpiral, smoothProgress])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  useMotionValueEvent(smoothProgress, 'change', (latestProgress) => {
    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current)
    }

    animationFrameIdRef.current = requestAnimationFrame(() => {
      draw3DSpiral(latestProgress)
    })
  })

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-contain pointer-events-none z-10"
    />
  )
}
