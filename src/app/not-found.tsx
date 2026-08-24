'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Paintbrush, Home, Sparkles, RotateCcw, Play } from 'lucide-react'

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [animationFinished, setAnimationFinished] = useState(false)
  const [paintProgress, setPaintProgress] = useState(0)

  const colors = ['#00f0ff', '#ff007f', '#7000ff', '#ffea00', '#10b981', '#38bdf8', '#ec4899']

  const startPaintAnimation = useCallback(() => {
    setAnimationFinished(false)
    setPaintProgress(0)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.max(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth * dpr
    const h = window.innerHeight * dpr

    canvas.width = w
    canvas.height = h

    // Fill initial dark canvas
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, w, h)

    interface Splatter {
      x: number
      y: number
      radius: number
      color: string
    }

    const splatters: Splatter[] = []
    let frame = 0
    const totalFrames = 130 // ~2.1 seconds sweep animation
    let animId: number

    // Organic spiral paint brush sweep path
    const getBrushPos = (t: number) => {
      const angle = t * Math.PI * 8
      const r = (1 - t * 0.85) * Math.min(w, h) * 0.48
      const x = w / 2 + Math.cos(angle) * r + Math.sin(t * 14) * (w * 0.12)
      const y = h / 2 + Math.sin(angle) * r + Math.cos(t * 10) * (h * 0.10)
      return { x, y }
    }

    const renderFrame = () => {
      const t = Math.min(1, frame / totalFrames)
      setPaintProgress(Math.floor(t * 100))

      if (t <= 1) {
        const pos = getBrushPos(t)
        const prevPos = getBrushPos(Math.max(0, t - 0.012))
        const currentColor = colors[Math.floor(t * colors.length * 3) % colors.length]

        // Main Paint Stroke
        ctx.save()
        ctx.strokeStyle = currentColor
        ctx.lineWidth = Math.sin(t * Math.PI) * (Math.min(w, h) * 0.12) + 40
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.shadowColor = currentColor
        ctx.shadowBlur = 50

        ctx.beginPath()
        ctx.moveTo(prevPos.x, prevPos.y)
        ctx.lineTo(pos.x, pos.y)
        ctx.stroke()
        ctx.restore()

        // Splatters & Drips
        if (Math.random() > 0.25) {
          for (let s = 0; s < 5; s++) {
            splatters.push({
              x: pos.x + (Math.random() - 0.5) * (w * 0.15),
              y: pos.y + (Math.random() - 0.5) * (h * 0.15),
              radius: Math.random() * 18 + 5,
              color: currentColor,
            })
          }
        }

        // Draw Splatters
        splatters.forEach((sp) => {
          ctx.fillStyle = sp.color
          ctx.shadowColor = sp.color
          ctx.shadowBlur = 15
          ctx.beginPath()
          ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      frame++

      if (frame <= totalFrames + 15) {
        animId = requestAnimationFrame(renderFrame)
      } else {
        setAnimationFinished(true)
      }
    }

    animId = requestAnimationFrame(renderFrame)

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [])

  useEffect(() => {
    const cleanup = startPaintAnimation()
    return () => {
      if (cleanup) cleanup()
    }
  }, [startPaintAnimation])

  // Interactive User Brush Painting on Mouse / Touch Move
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.max(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * dpr
    const y = (e.clientY - rect.top) * dpr

    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    ctx.save()
    ctx.fillStyle = randomColor
    ctx.shadowColor = randomColor
    ctx.shadowBlur = 30
    ctx.beginPath()
    ctx.arc(x, y, Math.random() * 25 + 15, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  const skipAnimation = () => {
    setPaintProgress(100)
    setAnimationFinished(true)
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      {/* 60fps Interactive HTML5 Paint Canvas */}
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        className="absolute inset-0 w-full h-full object-cover z-10 opacity-95 cursor-crosshair"
      />

      {/* Top Banner Paint Progress Indicator */}
      {!animationFinished && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-4 glass-panel px-6 py-3 rounded-full border border-cyan-400/50 shadow-[0_0_35px_rgba(0,240,255,0.4)]">
          <Paintbrush className="w-5 h-5 text-cyan-400 animate-spin" />
          <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-widest">
            🎨 TUVAL BOYANINIYOR... %{paintProgress}
          </span>
          <button
            onClick={skipAnimation}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-mono text-white/80 transition-all border border-white/20"
          >
            ATLA ⏩
          </button>
        </div>
      )}

      {/* Reveal Glassmorphic 404 Card */}
      <AnimatePresence>
        {animationFinished && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 16 }}
            className="max-w-lg w-full mx-4 glass-panel p-8 sm:p-12 rounded-3xl border border-white/20 shadow-[0_0_120px_rgba(0,240,255,0.35)] text-center relative z-30 backdrop-blur-3xl bg-black/80"
          >
            {/* Glowing Icon Badge */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-1 mx-auto mb-6 shadow-[0_0_35px_rgba(0,240,255,0.6)] animate-pulse">
              <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center text-cyan-400">
                <Paintbrush className="w-10 h-10" />
              </div>
            </div>

            <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full glass-card border border-cyan-400/50 text-[11px] font-mono text-cyan-300 uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>404 SANAT ARAMASI</span>
            </span>

            <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-white mb-2 drop-shadow-[0_0_30px_rgba(0,240,255,0.5)]">
              404
            </h1>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gradient-cyan mb-4">
              Tuvalde Sayfa Bulunamadı!
            </h2>

            <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-sm mx-auto font-light">
              Aradığınız sayfa boya paletinde kayboldu veya henüz tasarlanmadı. Ekrana dokunarak tuvali boyayabilir veya ana sayfaya dönebilirsiniz.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="py-4 px-8 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-extrabold text-xs font-mono uppercase tracking-wider hover:scale-105 shadow-[0_0_35px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>🎨 ANA SAYFAYA DÖN</span>
              </Link>
              <button
                onClick={startPaintAnimation}
                className="py-4 px-6 rounded-full glass-card border border-white/20 text-white/90 hover:text-white hover:border-cyan-400/60 font-bold text-xs font-mono uppercase tracking-wider hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>TEKRAR BOYA</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}
