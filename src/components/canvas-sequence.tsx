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

  // 60fps akıcı yay etkisi (smooth spring)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.0005,
  })

  // Procedural 3D Neon Spiral Rendering Engine (Bulletproof Error-Free)
  const draw3DSpiral = useCallback((progress: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const cx = w / 2
    const cy = h / 2

    // Screen fill background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, w, h)

    // 8K High-DPI Quality Smoothing
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // Safe Progress Normalization
    const safeProgress = isNaN(progress) ? 0 : Math.max(0, Math.min(1, progress))

    // Dynamic 3D Transformations based on scroll progress
    const rotationX = safeProgress * Math.PI * 4
    const rotationY = safeProgress * Math.PI * 6
    const twistFactor = safeProgress * 8.5
    const zoomScale = Math.min(w, h) * (0.28 + safeProgress * 0.22)

    // Neon Cyber Color Palette
    const colorStops = [
      { r: 0, g: 240, b: 255 },   // Cyan #00f0ff
      { r: 112, g: 0, b: 255 },   // Purple #7000ff
      { r: 255, g: 0, b: 127 },   // Pink #ff007f
      { r: 255, g: 234, b: 0 },   // Yellow #ffea00
      { r: 16, g: 185, b: 129 },  // Emerald #10b981
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

    // Number of spiral arms & nodes
    const arms = 5
    const pointsPerArm = 180

    for (let arm = 0; arm < arms; arm++) {
      const armAngleOffset = (arm / arms) * Math.PI * 2

      ctx.save()
      ctx.lineWidth = Math.max(3, Math.min(w, h) * 0.005)

      for (let i = 0; i < pointsPerArm; i++) {
        const step = i / pointsPerArm
        const spiralRadius = step * zoomScale * (1 + Math.sin(step * 10 + safeProgress * 8) * 0.15)
        const angle = step * Math.PI * 10 + armAngleOffset + rotationY + step * twistFactor

        // 3D Point Coordinates
        let x3d = Math.cos(angle) * spiralRadius
        let y3d = Math.sin(angle) * spiralRadius
        let z3d = (step - 0.5) * zoomScale * 1.8

        // 3D Rotation Matrix X & Y
        const cosX = Math.cos(rotationX)
        const sinX = Math.sin(rotationX)
        const yRotated = y3d * cosX - z3d * sinX
        const zRotated = y3d * sinX + z3d * cosX

        // Perspective Projection
        const fov = 900
        const perspectiveScale = fov / (fov + zRotated + 400)
        const x2d = cx + x3d * perspectiveScale
        const y2d = cy + yRotated * perspectiveScale

        const nodeColor = interpolateColor((step + arm / arms + safeProgress) % 1)

        // Draw Spiral Strand Points with Neon Glow
        ctx.shadowColor = nodeColor
        ctx.shadowBlur = Math.max(1, perspectiveScale * 25)

        ctx.fillStyle = nodeColor
        ctx.beginPath()
        const nodeRadius = Math.max(2.5, (step * 8 + 3) * perspectiveScale)
        ctx.arc(x2d, y2d, nodeRadius, 0, Math.PI * 2)
        ctx.fill()

        // Connecting strands
        if (i > 0) {
          const prevStep = (i - 1) / pointsPerArm
          const prevRadius = prevStep * zoomScale * (1 + Math.sin(prevStep * 10 + safeProgress * 8) * 0.15)
          const prevAngle = prevStep * Math.PI * 10 + armAngleOffset + rotationY + prevStep * twistFactor

          let px3d = Math.cos(prevAngle) * prevRadius
          let py3d = Math.sin(prevAngle) * prevRadius
          let pz3d = (prevStep - 0.5) * zoomScale * 1.8

          const pyRotated = py3d * cosX - pz3d * sinX
          const pzRotated = py3d * sinX + pz3d * cosX

          const pScale = fov / (fov + pzRotated + 400)
          const px2d = cx + px3d * pScale
          const py2d = cy + pyRotated * pScale

          ctx.strokeStyle = nodeColor
          ctx.beginPath()
          ctx.moveTo(px2d, py2d)
          ctx.lineTo(x2d, y2d)
          ctx.stroke()
        }
      }
      ctx.restore()
    }

    // Center Core 3D Glowing Energy Orb
    ctx.save()
    const coreColor = interpolateColor(safeProgress)
    ctx.shadowColor = coreColor
    ctx.shadowBlur = 60
    ctx.fillStyle = coreColor
    ctx.beginPath()
    ctx.arc(cx, cy, Math.max(12, Math.min(w, h) * 0.025), 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

  }, [bgColor])

  // Handle Resize for 8K High-DPI Buffer
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.max(window.devicePixelRatio || 1, 3)
    const rect = canvas.getBoundingClientRect()

    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)

    draw3DSpiral(smoothProgress.get())
  }, [draw3DSpiral, smoothProgress])

  // Event listener for window resize
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  // Motion Value listener for scroll animations
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
      className="w-full h-full object-contain pointer-events-none z-10 [image-rendering:-webkit-optimize-contrast]"
    />
  )
}
