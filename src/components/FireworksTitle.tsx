'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export const FireworksTitle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let h = (canvas.height = canvas.parentElement?.clientHeight || 400)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      w = canvas.width = canvas.parentElement.clientWidth
      h = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle explosion class
    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      alpha: number
      color: string
      size: number
      decay: number
      gravity: number
    }

    const particles: Particle[] = []
    const colors = ['#00f0ff', '#ff007f', '#7000ff', '#ffea00', '#10b981', '#ec4899', '#38bdf8']

    // Create a firework explosion burst
    const launchFirework = (targetX?: number, targetY?: number) => {
      const startX = targetX ?? w / 2 + (Math.random() - 0.5) * (w * 0.6)
      const startY = targetY ?? h / 2 + (Math.random() - 0.5) * (h * 0.4)
      const count = 45 + Math.floor(Math.random() * 35)

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4
        const speed = Math.random() * 6 + 2.5
        const color = colors[Math.floor(Math.random() * colors.length)]

        particles.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 3.5 + 1.5,
          decay: Math.random() * 0.018 + 0.012,
          gravity: 0.08,
        })
      }
    }

    // Auto-launch fireworks periodically
    const interval = setInterval(() => {
      launchFirework()
    }, 1200)

    // Initial burst
    launchFirework(w / 2, h / 2)

    let animId: number
    const render = () => {
      ctx.clearRect(0, 0, w, h)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += p.gravity
        p.vx *= 0.98
        p.vy *= 0.98
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      clearInterval(interval)
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleTitleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = ['#00f0ff', '#ff007f', '#7000ff', '#ffea00', '#10b981']
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 8 + 3
      const color = colors[Math.floor(Math.random() * colors.length)]

      ctx.save()
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x + Math.cos(angle) * speed * 4, y + Math.sin(angle) * speed * 4, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  return (
    <div className="relative inline-block cursor-pointer select-none group" onClick={handleTitleClick}>
      {/* 60fps Fireworks Explosion Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute -inset-20 w-[calc(100%+160px)] h-[calc(100%+160px)] pointer-events-none z-0"
      />

      {/* Animated Flowing Gradient Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-5xl sm:text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 via-pink-500 via-yellow-400 to-emerald-400 bg-[length:300%_300%] animate-gradient-flow filter drop-shadow-[0_0_45px_rgba(0,240,255,0.7)] group-hover:scale-105 transition-transform"
      >
        Alihan CENAN
      </motion.h1>
    </div>
  )
}
