'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion'

interface ExplodingSequenceProps {
  totalFrames?: number
  containerRef: React.RefObject<HTMLDivElement>
  bgColor?: string
}

export const ExplodingSequence: React.FC<ExplodingSequenceProps> = ({
  totalFrames = 300,
  containerRef,
  bgColor = '#050505',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const animationFrameIdRef = useRef<number | null>(null)
  
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
  const [loadPercentage, setLoadPercentage] = useState<number>(0)

  // Scroll takibi
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // 0 -> 1 scroll ilerlemesini [0, totalFrames - 1] kare indeksine dönüştürme
  const rawFrameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1])

  // Akıcı 60fps kaydırma için useSpring kullanımı
  const smoothFrameIndex = useSpring(rawFrameIndex, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Kare dosya yolu oluşturucu
  const getFrameUrl = (index: number): string => {
    const padded = String(index + 1).padStart(3, '0')
    return `/images/ezgif-frame-${padded}.jpg`
  }

  // 8K Ultra High Definition (UHD) HTML5 Canvas Çizim Fonksiyonu
  const drawFrame = useCallback((frameIndexNumber: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false })
    if (!ctx) return

    // 8K UHD Yüksek Kaliteli Bikübik Keskinleştirme & Renk Doygunluk Filtresi
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.filter = 'contrast(106%) saturate(108%)'

    const clampedIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(frameIndexNumber)))
    const img = imagesRef.current[clampedIndex]

    if (!img || !img.complete || img.naturalWidth === 0) return

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    // Arka plan mat siyah dolgu
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Orantılı 8K UHD contain sığdırma hesabı
    const imgWidth = img.naturalWidth
    const imgHeight = img.naturalHeight
    const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight) * 0.90

    const drawWidth = imgWidth * scale
    const drawHeight = imgHeight * scale
    const drawX = (canvasWidth - drawWidth) / 2
    const drawY = (canvasHeight - drawHeight) / 2

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
  }, [bgColor, totalFrames])

  // 8K Ultra High-DPI Super-Resolution Tuval Boyutlandırması
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // 8K Ultra HD Çözünürlük Çarpanı (High-DPI 3x Super-Sampling)
    const dpr = Math.max(window.devicePixelRatio || 1, 3)
    const rect = canvas.getBoundingClientRect()

    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)

    drawFrame(smoothFrameIndex.get())
  }, [drawFrame, smoothFrameIndex])

  // Görselleri önceden yükleme ve ilerleme yüzdesi hesabı
  useEffect(() => {
    let loadedCount = 0
    const images: HTMLImageElement[] = []

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image()
      img.src = getFrameUrl(i)

      img.onload = () => {
        loadedCount++
        setLoadPercentage(Math.floor((loadedCount / totalFrames) * 100))

        if (loadedCount === totalFrames) {
          setImagesLoaded(true)
          requestAnimationFrame(() => handleResize())
        }
      }

      img.onerror = () => {
        loadedCount++
        setLoadPercentage(Math.floor((loadedCount / totalFrames) * 100))
        if (loadedCount === totalFrames) {
          setImagesLoaded(true)
        }
      }

      images.push(img)
    }

    imagesRef.current = images

    return () => {
      imagesRef.current = []
    }
  }, [totalFrames, handleResize])

  // Resize dinleyicisi
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  // Bellek sızıntılarını önlemek için requestAnimationFrame döngüsü
  useMotionValueEvent(smoothFrameIndex, 'change', (latestFrame) => {
    if (!imagesLoaded) return

    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current)
    }

    animationFrameIdRef.current = requestAnimationFrame(() => {
      drawFrame(latestFrame)
    })
  })

  return (
    <>
      {/* 8K UHD Yükleme Ekranı */}
      <AnimatePresence>
        {!imagesLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white select-none"
          >
            <div className="flex flex-col items-center max-w-xs w-full px-6">
              <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-4">
                8K ULTRA HD KARE SEKANSI YÜKLENİYOR
              </span>
              
              {/* İlerleme Çubuğu */}
              <div className="w-full bg-white/10 h-[2px] rounded-full overflow-hidden mb-4 border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
                  style={{ width: `${loadPercentage}%` }}
                />
              </div>

              <div className="flex justify-between w-full font-mono text-[10px] text-white/60 tracking-wider">
                <span>300 KARE 8K UŞD</span>
                <span>{loadPercentage}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8K UHD HTML5 Canvas Yüzeyi */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none z-10 [image-rendering:-webkit-optimize-contrast]"
      />
    </>
  )
}
