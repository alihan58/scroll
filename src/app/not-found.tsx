'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Paintbrush, Home, Sparkles, RotateCcw } from 'lucide-react'

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [animationFinished, setAnimationFinished] = useState(false)
  const [paintProgress, setPaintProgress] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.max(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    // Vibrant Neon Paint Colors
    const colors = ['#00f0ff', '#ff007f', '#7000ff', '#ffea00', '#10b981', '#38bdf8']
    
    // Splatter particles
    interface Splatter {
      x: number
      y: number
      radius: number
      color: string
    }

    const splatters: Splatter[] = []
    
    let frame = 0
    const totalFrames = 120 // 2 seconds sweep animation

    // Curve path points for paint brush
    const getBrushPos = (t: number, w: number, h: number) => {
      const angle = t * Math.PI * 6
      const r = (1 - t) * Math.min(w, h) * 0.45
      const x = w / 2 + Math.cos(angle) * r + Math.sin(t * 12) * 80
      const y = h / 2 + Math.sin(angle) * r + Math.cos(t * 8) * 60
      return { x, y }
    }

    let animId: number

    const render = () => {
      const w = canvas.width
      const h = canvas.height

      if (frame === 0) {
        ctx.fillStyle = '#050505'
        ctx.fillRect(0, 0, w, h)
      }

      const t = Math.min(1, frame / totalFrames)
      setPaintProgress(Math.floor(t * 100))

      if (t <= 1) {
        // Draw continuous colorful paint brush strokes
        const pos = getBrushPos(t, w, h)
        const prevPos = getBrushPos(Math.max(0, t - 0.015), w, h)
        const color = colors[Math.floor(t * colors.length * 2) % colors.length]

        ctx.save()
        ctx.strokeStyle = color
        ctx.lineWidth = Math.sin(t * Math.PI) * 90 + 35
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.shadowColor = color
        ctx.shadowBlur = 40

        ctx.beginPath()
        ctx.moveTo(prevPos.x, prevPos.y)
        ctx.lineTo(pos.x, pos.y)
        ctx.stroke()
        ctx.restore()

        // Create paint drops & splatters
        if (Math.random() > 0.3) {
          for (let s = 0; s < 4; s++) {
            splatters.push({
              x: pos.x + (Math.random() - 0.5) * 120,
              y: pos.y + (Math.random() - 0.5) * 120,
              radius: Math.random() * 14 + 4,
              color,
            })
          }
        }

        // Draw paint splatters
        splatters.forEach((sp) => {
          ctx.fillStyle = sp.color
          ctx.beginPath()
          ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      frame++

      if (frame <= totalFrames + 20) {
        animId = requestAnimationFrame(render)
      } else {
        setAnimationFinished(true)
      }
    }

    animId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      {/* Dynamic 60fps Paint Brush HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 opacity-90"
      />

      {/* Paint Progress Indicator */}
      {!animationFinished && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3 glass-panel px-6 py-2.5 rounded-full border border-cyan-400/40 shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-pulse">
          <Paintbrush className="w-4 h-4 text-cyan-400 animate-spin" />
          <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-widest">
            TUVAL BOYANINIYOR... %{paintProgress}
          </span>
        </div>
      )}

      {/* Reveal 404 Glassmorphic Card */}
      <AnimatePresence>
        {animationFinished && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="max-w-lg w-full mx-4 glass-panel p-8 sm:p-12 rounded-3xl border border-white/20 shadow-[0_0_100px_rgba(0,240,255,0.3)] text-center relative z-30 backdrop-blur-3xl bg-black/70"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-1 mx-auto mb-6 shadow-[0_0_30px_rgba(0,240,255,0.5)]">
              <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center text-cyan-400">
                <Paintbrush className="w-10 h-10" />
              </div>
            </div>

            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full glass-card border border-cyan-400/40 text-[11px] font-mono text-cyan-300 uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>404 SANAT ARAMASI</span>
            </span>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-2">
              404
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-gradient-cyan mb-4">
              Tuvalde Sayfa Bulunamadı!
            </h2>

            <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-sm mx-auto font-light">
              Aradığınız sayfa boya paletinde kayboldu veya henüz tasarlanmadı. Ana sayfaya dönerek dijital portfolyoyu keşfedebilirsiniz.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="py-4 px-8 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-bold text-xs font-mono uppercase tracking-wider hover:scale-105 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>ANA SAYFAYA DÖN</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}
