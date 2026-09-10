'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award,
  Eye,
  X,
  ZoomIn,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  MonitorPlay,
  LayoutGrid,
  CheckCircle,
  Wand2,
} from 'lucide-react'

interface PortfolioItem {
  id: number
  src: string
  title: string
  category: 'Afiş' | 'Kurumsal Kimlik' | 'Ambalaj' | 'UX / UI'
  tools: string[]
  description: string
}

// 12 Eser: Tamamen dosya isimlerine ve gerçek tasarım disiplinlerine göre mantıklı ve sade içerik
const portfolioImages: PortfolioItem[] = [
  // 1. AFİŞ (4 ESER)
  {
    id: 1,
    src: '/portfolio/afis-1.jpeg',
    title: 'Afiş Tasarımı — 01',
    category: 'Afiş',
    tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    description: 'Tipografi, renk hiyerarşisi ve görsel kompozisyon prensipleriyle hazırlanmış özgün afiş çalışması.',
  },
  {
    id: 2,
    src: '/portfolio/afis-2.jpeg',
    title: 'Afiş Tasarımı — 02 (Alfred Hitchcock Sineması)',
    category: 'Afiş',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'After Effects'],
    description: 'Saul Bass tasarım anlayışı ve göstergebilimsel analiz temelinde üretilmiş sinema afişi çalışması.',
  },
  {
    id: 3,
    src: '/portfolio/afis-3.jpg',
    title: 'Afiş Tasarımı — 03',
    category: 'Afiş',
    tools: ['Adobe InDesign', 'Adobe Illustrator'],
    description: 'Deneysel tipografik düzen ve grid mimarisi üzerine kurulu sanatsal poster tasarımı.',
  },
  {
    id: 4,
    src: '/portfolio/afis-4.jpg',
    title: 'Afiş Tasarımı — 04',
    category: 'Afiş',
    tools: ['Adobe Photoshop', 'Adobe Illustrator'],
    description: 'Görsel kontrast ve modern grafik unsurlar içeren etkinlik afişi tasarımı.',
  },

  // 2. KURUMSAL KİMLİK (3 ESER)
  {
    id: 5,
    src: '/portfolio/kurumsal-kimlik-1.jpg',
    title: 'Kurumsal Kimlik & Logo Tasarımı — 01',
    category: 'Kurumsal Kimlik',
    tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    description: 'Markanın kimliğini yansıtan geometrik logo tasarımı ve kurumsal materyaller.',
  },
  {
    id: 6,
    src: '/portfolio/kurumsal-kimlik-2.jpg',
    title: 'Kurumsal Kimlik & Logo Tasarımı — 02',
    category: 'Kurumsal Kimlik',
    tools: ['Adobe Illustrator', 'Adobe InDesign'],
    description: 'Kartvizit, antetli kağıt ve kurumsal iletişim öğelerini içeren marka kimliği çalışması.',
  },
  {
    id: 7,
    src: '/portfolio/kurumsal-kimlik-3.jpg',
    title: 'Kurumsal Kimlik & Logo Tasarımı — 03',
    category: 'Kurumsal Kimlik',
    tools: ['Adobe Illustrator', 'Figma'],
    description: 'Minimalist amblem, renk paleti ve tipografik kurumsal standartlar.',
  },

  // 3. AMBALAJ (2 ESER)
  {
    id: 8,
    src: '/portfolio/ambalaj-1.jpg',
    title: 'Ambalaj & Kutu Tasarımı — 01',
    category: 'Ambalaj',
    tools: ['Adobe Illustrator', 'Cinema 4D', 'Photoshop'],
    description: 'Bıçak izi (dieline) hazırlığı, ürün yerleşimi ve 3D görselleştirme ile tamamlanan ambalaj tasarımı.',
  },
  {
    id: 9,
    src: '/portfolio/ambalaj-2.jpg',
    title: 'Ambalaj & Etiket Tasarımı — 02',
    category: 'Ambalaj',
    tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    description: 'Baskı tekniklerine ve matbaa standartlarına uygun ürün ambalajı ve etiket tasarımı.',
  },

  // 4. UX / UI (3 ESER)
  {
    id: 10,
    src: '/portfolio/ux-ui-1.jpeg',
    title: 'Mobil Arayüz Tasarımı (UX / UI)',
    category: 'UX / UI',
    tools: ['Figma', 'Adobe XD'],
    description: 'Kullanıcı odaklı ekran akışları, modern arayüz bileşenleri ve mobil prototip tasarımı.',
  },
  {
    id: 11,
    src: '/portfolio/ux-ui-2.jpg',
    title: 'Web & Dashboard Arayüz Tasarımı (UX / UI)',
    category: 'UX / UI',
    tools: ['Figma', 'Adobe Photoshop'],
    description: 'Veri hiyerarşisi, okunabilirlik ve modern UI standartları gözetilerek tasarlanan web panel arayüzü.',
  },
  {
    id: 12,
    src: '/portfolio/web-uxui.jpeg',
    title: 'Kreatif Web Sitesi Arayüzü (Web UX / UI)',
    category: 'UX / UI',
    tools: ['Figma', 'Next.js', 'Tailwind CSS'],
    description: 'Responsive (mobil uyumlu) düzen, modern tipografi ve akıcı görsel hiyerarşiye sahip web tasarımı.',
  },
]

const categories = ['Tümü', 'Afiş', 'Kurumsal Kimlik', 'Ambalaj', 'UX / UI']

// Sihir sesi (Web Audio API Chime)
const playMagicChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const notes = [587.33, 739.99, 880.0, 1174.66, 1479.98, 1760.0]
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04)
      gain.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.04 + 0.35)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + idx * 0.04)
      osc.stop(ctx.currentTime + idx * 0.04 + 0.4)
    })
  } catch {
    // Tarayıcı ses politikası
  }
}

export const CaseStudies: React.FC = () => {
  const [viewMode, setViewMode] = useState<'presentation' | 'grid'>('presentation')
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null)

  const magicCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // Sihir parçacık patlaması
  const triggerMagicSparkle = (clientX: number, clientY: number) => {
    playMagicChime()

    const canvas = magicCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    interface Sparkle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      alpha: number
      decay: number
      rotation: number
      rotSpeed: number
      isStar: boolean
    }

    const sparkles: Sparkle[] = []
    const colors = ['#00f0ff', '#ffd700', '#ff007f', '#a855f7', '#ffffff', '#38bdf8']
    const count = 40

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 6 + 2
      sparkles.push({
        x: clientX,
        y: clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        isStar: Math.random() > 0.4,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.05
        s.vx *= 0.97
        s.vy *= 0.97
        s.alpha -= s.decay
        s.rotation += s.rotSpeed

        if (s.alpha <= 0) {
          sparkles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, s.alpha)
        ctx.fillStyle = s.color
        ctx.shadowColor = s.color
        ctx.shadowBlur = 12
        ctx.translate(s.x, s.y)
        ctx.rotate(s.rotation)

        if (s.isStar) {
          ctx.beginPath()
          const r = s.size * 2
          ctx.moveTo(0, -r)
          ctx.quadraticCurveTo(0, 0, r, 0)
          ctx.quadraticCurveTo(0, 0, 0, r)
          ctx.quadraticCurveTo(0, 0, -r, 0)
          ctx.quadraticCurveTo(0, 0, 0, -r)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, s.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      if (sparkles.length > 0) {
        requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    animate()
  }

  useEffect(() => {
    const handleResize = () => {
      if (magicCanvasRef.current) {
        magicCanvasRef.current.width = window.innerWidth
        magicCanvasRef.current.height = window.innerHeight
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredImages =
    activeCategory === 'Tümü'
      ? portfolioImages
      : portfolioImages.filter((img) => img.category === activeCategory)

  const safeSlideIndex = currentSlide % filteredImages.length
  const currentItem = filteredImages[safeSlideIndex] || portfolioImages[0]

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPlaying, filteredImages.length])

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) triggerMagicSparkle(e.clientX, e.clientY)
    setCurrentSlide((prev) => (prev + 1) % filteredImages.length)
  }

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) triggerMagicSparkle(e.clientX, e.clientY)
    setCurrentSlide((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  const handleCardClick = (item: PortfolioItem, e: React.MouseEvent) => {
    triggerMagicSparkle(e.clientX, e.clientY)
    setSelectedImage(item)
  }

  return (
    <section id="case-studies" className="py-28 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Sihir Efekti Canvas Katmanı */}
      <canvas
        ref={magicCanvasRef}
        className="fixed inset-0 pointer-events-none z-[100] w-screen h-screen"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Bölüm Başlığı */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4"
            >
              <Wand2 className="w-3.5 h-3.5 text-yellow-400" />
              <span>PORTFOLYO</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-white tracking-tight"
            >
              Tasarım Çalışmaları & <span className="text-gradient-cyan">Eserler.</span>
            </motion.h2>
          </div>

          {/* Görünüm Değiştirici: Sunum Modu & Izgara */}
          <div className="flex items-center gap-2 p-1 rounded-full glass-panel border border-white/10 self-start lg:self-end">
            <button
              onClick={(e) => {
                triggerMagicSparkle(e.clientX, e.clientY)
                setViewMode('presentation')
              }}
              className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                viewMode === 'presentation'
                  ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <MonitorPlay className="w-4 h-4" />
              <span>Sunum Modu</span>
            </button>

            <button
              onClick={(e) => {
                triggerMagicSparkle(e.clientX, e.clientY)
                setViewMode('grid')
              }}
              className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                viewMode === 'grid'
                  ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Izgara Görünümü</span>
            </button>
          </div>
        </div>

        {/* Kategori Filtre Butonları (AFİŞ, KURUMSAL KİMLİK, AMBALAJ, UX / UI) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const count =
              cat === 'Tümü'
                ? portfolioImages.length
                : portfolioImages.filter((p) => p.category === cat).length
            return (
              <button
                key={cat}
                onClick={(e) => {
                  triggerMagicSparkle(e.clientX, e.clientY)
                  setActiveCategory(cat)
                  setCurrentSlide(0)
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                    : 'glass-card text-white/70 hover:text-white hover:border-white/20 border border-white/5'
                }`}
              >
                <span>{cat}</span>
                <span className="ml-1.5 opacity-60">({count})</span>
              </button>
            )
          })}
        </div>

        {/* 1. İNTERAKTİF SUNUM MODU */}
        {viewMode === 'presentation' && (
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden bg-black/60">
            {/* Üst Bilgi Barı */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-cyan-400 font-black text-lg">
                  {String(safeSlideIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-white/30 font-mono">/</span>
                <span className="font-mono text-white/40 text-sm">
                  {String(filteredImages.length).padStart(2, '0')}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 ml-2">
                  {currentItem.category}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => {
                    triggerMagicSparkle(e.clientX, e.clientY)
                    setIsPlaying(!isPlaying)
                  }}
                  className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                    isPlaying
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 animate-pulse'
                      : 'glass-card text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Durdur' : 'Otomatik Oynat'}</span>
                </button>

                <button
                  onClick={(e) => handleCardClick(currentItem, e)}
                  className="p-2.5 rounded-full glass-card border border-white/10 text-white/80 hover:text-white hover:border-cyan-400 transition-all"
                  title="Tam Ekran İncele"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slayt İçeriği */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Sol: Büyük Görsel */}
              <div className="lg:col-span-7 relative group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    onClick={(e) => handleCardClick(currentItem, e)}
                    className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-black/80 border border-white/10 shadow-2xl cursor-pointer group-hover:border-cyan-400/50 transition-colors"
                  >
                    <img
                      src={currentItem.src}
                      alt={currentItem.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                      <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
                        Tam Ekran Büyütmek İçin Tıklayın ✨
                      </span>
                      <ZoomIn className="w-5 h-5 text-cyan-300" />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Önceki & Sonraki Butonları */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-panel border border-white/20 text-white flex items-center justify-center hover:scale-110 hover:border-cyan-400 hover:text-cyan-300 transition-all shadow-xl z-20"
                  aria-label="Önceki"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-panel border border-white/20 text-white flex items-center justify-center hover:scale-110 hover:border-cyan-400 hover:text-cyan-300 transition-all shadow-xl z-20"
                  aria-label="Sonraki"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Sağ: Net Bilgiler */}
              <div className="lg:col-span-5 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
                        {currentItem.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {currentItem.title}
                      </h3>
                    </div>

                    <p className="text-white/70 text-sm leading-relaxed">
                      {currentItem.description}
                    </p>

                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">
                        Kullanılan Araçlar
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {currentItem.tools.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-full text-xs font-mono text-white/80 bg-white/5 border border-white/10"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Alt Navigasyon */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={prevSlide}
                    className="text-xs font-mono text-white/70 hover:text-cyan-300 flex items-center space-x-1 uppercase"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Önceki</span>
                  </button>

                  <div className="flex items-center space-x-1.5 overflow-x-auto max-w-[180px] py-1">
                    {filteredImages.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={(e) => {
                          triggerMagicSparkle(e.clientX, e.clientY)
                          setCurrentSlide(dotIdx)
                        }}
                        className={`h-2 rounded-full transition-all ${
                          dotIdx === safeSlideIndex
                            ? 'w-6 bg-cyan-400'
                            : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="text-xs font-mono text-white/70 hover:text-cyan-300 flex items-center space-x-1 uppercase"
                  >
                    <span>Sonraki</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Hızlı Seçim Küçük Resim Şeridi */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-3">
                HIZLI SEÇİM ({filteredImages.length})
              </span>
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {filteredImages.map((item, thumbIdx) => (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      triggerMagicSparkle(e.clientX, e.clientY)
                      setCurrentSlide(thumbIdx)
                    }}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border transition-all ${
                      thumbIdx === safeSlideIndex
                        ? 'border-cyan-400 scale-105 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                        : 'border-white/10 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. IZGARA GÖRÜNÜMÜ */}
        {viewMode === 'grid' && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredImages.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  onClick={(e) => handleCardClick(item, e)}
                  className="group relative rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-cyan-400/60 shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-300 cursor-pointer bg-black/40 flex flex-col justify-between"
                >
                  <div className="relative w-full aspect-square overflow-hidden bg-black/60">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h4 className="text-white font-bold text-sm">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-white/90 font-medium text-xs truncate max-w-[190px]">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-white/40 block">
                        {item.category}
                      </span>
                    </div>
                    <Eye className="w-4 h-4 text-white/40 group-hover:text-cyan-300 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* Tam Ekran Büyütme Modalı */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[92vh] glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_80px_rgba(0,240,255,0.3)] flex flex-col bg-black/90"
            >
              {/* Modal Başlığı */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {selectedImage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-10 h-10 rounded-full glass-card border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-cyan-400 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Büyük Görsel Alanı */}
              <div className="relative flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-black/60">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[66vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>

              {/* Modal Altı Açıklama & Araçlar */}
              <div className="p-4 sm:p-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-white/70 text-sm max-w-2xl">
                  {selectedImage.description}
                </p>
                <div className="flex items-center space-x-2">
                  {selectedImage.tools.map((tool, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-full text-[10px] font-mono text-white/70 bg-white/5 border border-white/10">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
