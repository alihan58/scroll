'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layers,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
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
  Cpu,
  Palette,
  Wand2,
} from 'lucide-react'

interface PortfolioItem {
  id: number
  src: string
  title: string
  category: 'Afiş Tasarımı' | 'Kurumsal Kimlik' | 'Ambalaj Tasarımı' | 'UI / UX & Web'
  client: string
  year: string
  tools: string[]
  deliverables: string[]
  description: string
  concept: string
}

// 12 Works categorized strictly based on user files with clean, web-safe URLs
const portfolioImages: PortfolioItem[] = [
  // 1. AFİŞ TASARIMI (4 ESER)
  {
    id: 1,
    src: '/portfolio/afis-1.jpeg',
    title: 'Kültürel & Sanatsal Tipografik Afiş',
    category: 'Afiş Tasarımı',
    client: 'Sanat & Kültür İnisiyatifi',
    year: '2024',
    tools: ['Adobe Illustrator', 'InDesign', 'Photoshop'],
    deliverables: ['B1 & 50x70 Afiş', 'CMYK Matbaa Baskısı', 'Sosyal Medya Formatları'],
    description: 'Tipografinin görsel bir ifade aracına dönüştüğü, harf anatomisi ve dinamik kontrastla üretilmiş kültürel etkinlik afişi.',
    concept: 'Görsel ritim, hiyerarşi ve semiyotik anlam inşası.',
  },
  {
    id: 2,
    src: '/portfolio/afis-2.jpeg',
    title: 'Alfred Hitchcock Sineması Göstergebilimsel Afiş',
    category: 'Afiş Tasarımı',
    client: 'Akademik Tez & Sergi',
    year: '2024',
    tools: ['Adobe Illustrator', 'Photoshop', 'After Effects'],
    deliverables: ['Akademik Eser Afişi', 'Motion Poster (60 FPS)', 'Göstergebilim Analiz Kitapçığı'],
    description: 'Saul Bass tasarım mirası ve C.S. Peirce göstergebilim kuramını temel alan, gerilim hissini soyut formlarla aktaran sinema afişi.',
    concept: 'Minimalist sembolizm ve dramatik psikolojik gerilim.',
  },
  {
    id: 3,
    src: '/portfolio/afis-3.jpg',
    title: 'Sinematik & Deneysel Tipografi Afişi',
    category: 'Afiş Tasarımı',
    client: 'Bağımsız Sanat Kolektifi',
    year: '2024',
    tools: ['Adobe InDesign', 'Illustrator'],
    deliverables: ['Sergi Posteri', 'Tanıtım Bannerları', 'Katalog Kapağı'],
    description: 'Okuma yönü ve grid mimarisi üzerine kurulu, deneysel tipografik düzenlemelerle dikkat çeken özgün poster çalışması.',
    concept: 'Asimetrik denge ve modern İsviçre stilinden esinlenen grid düzeni.',
  },
  {
    id: 4,
    src: '/portfolio/afis-4.jpg',
    title: 'Modern Sergi & Etkinlik Afiş Tasarımı',
    category: 'Afiş Tasarımı',
    client: 'Tasarım Günleri',
    year: '2023',
    tools: ['Adobe Photoshop', 'Illustrator'],
    deliverables: ['Açık Hava Billboard', 'Dijital Ekran Posteri', 'Davetiye Tasarımı'],
    description: 'Etkinliğin ruhunu yansıtan renk blokları, güçlü başlık tipografisi ve yüksek okunabilirlik standartlarına sahip afiş.',
    concept: 'Pozitif-negatif alan kontrastı ve canlı renk dinamizmi.',
  },

  // 2. KURUMSAL KİMLİK (3 ESER)
  {
    id: 5,
    src: '/portfolio/kurumsal-kimlik-1.jpg',
    title: 'Kurumsal Logo Mimarisi & Marka Kimliği',
    category: 'Kurumsal Kimlik',
    client: 'Apex Creative Studio',
    year: '2024',
    tools: ['Adobe Illustrator', 'Photoshop', 'Pantone'],
    deliverables: ['Kurumsal Logo Kılavuzu', 'Kartvizit & Antetli Kağıt', 'Zarf & Dosya Seti'],
    description: 'Şirketin vizyonunu ve güvenilirlik algısını en üst düzeye çıkaran, geometrik oranlarla inşa edilmiş kurumsal marka kimliği.',
    concept: 'Zamansız tipografi, altın oran ve modüler form dili.',
  },
  {
    id: 6,
    src: '/portfolio/kurumsal-kimlik-2.jpg',
    title: 'Bütünsel Kurumsal Kimlik & İletişim Kiti',
    category: 'Kurumsal Kimlik',
    client: 'Nexus Global',
    year: '2024',
    tools: ['Adobe Illustrator', 'InDesign', 'Photoshop'],
    deliverables: ['Marka Rehberi (Brand Book)', 'Dijital İletişim Assetleri', 'Personel Kartları'],
    description: 'Fiziksel ve dijital tüm temas noktalarında tutarlı marka duruşu sağlayan kapsamlı kurumsal tasarım kılavuzu.',
    concept: 'Tek renk tonunda maksimum netlik ve kurumsal prestij.',
  },
  {
    id: 7,
    src: '/portfolio/kurumsal-kimlik-3.jpg',
    title: 'Minimalist Logomark & Tipografik Amblem',
    category: 'Kurumsal Kimlik',
    client: 'Vanguard Ventures',
    year: '2025',
    tools: ['Adobe Illustrator', 'Figma'],
    deliverables: ['Vektörel Vurgular', 'Sosyal Medya İkon Seti', 'Mekan Giydirme Kılavuzu'],
    description: 'Karmaşıklıktan uzak, akılda kalıcılığı yüksek ve küçük boyutlarda dahi kusursuz okunan minimalist amblem tasarımı.',
    concept: 'Sadelik felsefesi ve tek hamlede tanınabilir monoline estetik.',
  },

  // 3. AMBALAJ TASARIMI (2 ESER)
  {
    id: 8,
    src: '/portfolio/ambalaj-1.jpg',
    title: 'Premium Ürün Ambalajı & Kutu Tasarımı',
    category: 'Ambalaj Tasarımı',
    client: 'Botanica Luxury Line',
    year: '2024',
    tools: ['Adobe Illustrator', 'Cinema 4D', 'Photoshop'],
    deliverables: ['Kutu Bıçak İzi (Dieline)', '3D Fotogerçekçi Mockup', 'Özel Varak Yaldız Baskı Dosyası'],
    description: 'Rafta anında fark yaratan, dokunsal lüks algısı yüksek özel kaplamalı mat siyah folyo ambalaj serisi.',
    concept: 'Lüks minimalizm ve dokunma duyusunu tetikleyen malzeme uyumu.',
  },
  {
    id: 9,
    src: '/portfolio/ambalaj-2.jpg',
    title: 'Ekolojik & Modern Ambalaj Konsepti',
    category: 'Ambalaj Tasarımı',
    client: 'EcoAura Organics',
    year: '2024',
    tools: ['Adobe Illustrator', 'Photoshop'],
    deliverables: ['Etiket Tasarımları', 'Şişe Giydirme Mockup', 'CMYK Matbaa Baskı Hazırlığı'],
    description: 'Doğal içerikleri vurgulayan organik renk paletleri ve sürdürülebilir ambalaj standartlarına uygun etiket tasarımı.',
    concept: 'Doğanın yalın renkleri ile modern tipografinin birleşimi.',
  },

  // 4. UI / UX & WEB TASARIM (3 ESER)
  {
    id: 10,
    src: '/portfolio/ux-ui-1.jpeg',
    title: 'Mobil Uygulama Arayüzü & Tasarım Sistemi',
    category: 'UI / UX & Web',
    client: 'FinTech Pulse',
    year: '2025',
    tools: ['Figma', 'Adobe XD', 'Protopie'],
    deliverables: ['Kullanıcı Deneyimi Mimarisi (UX)', 'UI Tasarım Sistemi', 'İnteraktif Prototip'],
    description: 'Kullanıcının tek elle zahmetsizce etkileşim kurabileceği, ergonomik mikro animasyonlarla zenginleştirilmiş mobil uygulama arayüzü.',
    concept: 'Akıcı kullanıcı yolculuğu ve temiz görsel hiyerarşi.',
  },
  {
    id: 11,
    src: '/portfolio/ux-ui-2.jpg',
    title: 'Yüksek Dönüşümlü Web & Dashboard Arayüzü',
    category: 'UI / UX & Web',
    client: 'CyberCore Dashboard',
    year: '2024',
    tools: ['Figma', 'Photoshop', 'Next.js'],
    deliverables: ['Yönetim Paneli UI', 'Karanlık Mod (Dark Theme)', 'Bileşen Kütüphanesi'],
    description: 'Karmaşık veri analitiğini anlaşılır grafiklere dönüştüren, yüksek verimli karanlık mod kurumsal web arayüzü.',
    concept: 'Veri odaklı ergonomi ve 60fps akıcı arayüz hızı.',
  },
  {
    id: 12,
    src: '/portfolio/web-uxui.jpeg',
    title: 'Kreatif Dijital Web Deneyimi & Scrollytelling',
    category: 'UI / UX & Web',
    client: 'Studio Hyperion',
    year: '2025',
    tools: ['Figma', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    deliverables: ['Tam Sayfa Web Tasarımı', 'Mobil Uyumlu Responsive Düzen', 'Mikro Etkileşimler'],
    description: 'Markanın hikayesini kaydırma aksiyonuyla adım adım anlatan yenilikçi, modern ve ödül standartlarında web tasarımı.',
    concept: 'Sinematik kaydırma deneyimi ve interaktif görsel şölen.',
  },
]

const categories = ['Tümü', 'Afiş Tasarımı', 'Kurumsal Kimlik', 'Ambalaj Tasarımı', 'UI / UX & Web']

// Play a synthesized magical chime sound using Web Audio API
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
      gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.04 + 0.35)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + idx * 0.04)
      osc.stop(ctx.currentTime + idx * 0.04 + 0.4)
    })
  } catch {
    // Audio policy safeguard
  }
}

export const CaseStudies: React.FC = () => {
  const [viewMode, setViewMode] = useState<'presentation' | 'grid'>('presentation')
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null)

  // Magic Sparkle Particle Canvas Reference
  const magicCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // Trigger Magic Particle Explosion at (x, y)
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
    const count = 45

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 7 + 2.5
      sparkles.push({
        x: clientX,
        y: clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        isStar: Math.random() > 0.4,
      })
    }

    let frameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.06
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
        ctx.shadowBlur = 15
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
        frameId = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    animate()
  }

  // Sync magic canvas size with viewport
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
    <section id="case-studies" className="py-32 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Global Magic Sparkle Particle Overlay Canvas */}
      <canvas
        ref={magicCanvasRef}
        className="fixed inset-0 pointer-events-none z-[100] w-screen h-screen"
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4"
            >
              <Wand2 className="w-3.5 h-3.5 text-yellow-400 animate-spin-slow" />
              <span>SİHİRLİ PORTFOLYO & SUNUM VİTRİNİ</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4"
            >
              Doğru Kategorilerle & <br />
              <span className="text-gradient-cyan">İnteraktif Tasarım Koleksiyonu.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Alihan CENAN tarafından tasarlanan 12 seçkin eseri kategorilere göre inceleyin. Herhangi bir esere tıkladığınızda <strong>sihir efekti</strong> ile tam ekran yüksek çözünürlüklü detaylar açılır.
            </motion.p>
          </div>

          {/* View Mode Switcher (Presentation vs Grid) */}
          <div className="flex items-center gap-2 p-1.5 rounded-full glass-panel border border-white/10 self-start lg:self-end">
            <button
              onClick={(e) => {
                triggerMagicSparkle(e.clientX, e.clientY)
                setViewMode('presentation')
              }}
              className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                viewMode === 'presentation'
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
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
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Izgara Görünümü</span>
            </button>
          </div>
        </div>

        {/* Category Filters strictly aligned with user file names */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-10">
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
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] scale-105 font-bold'
                    : 'glass-card text-white/60 hover:text-white hover:border-white/20 border border-white/5'
                }`}
              >
                <span>{cat}</span>
                <span className="ml-1.5 opacity-60">({count})</span>
              </button>
            )
          })}
        </div>

        {/* MODE 1: INTERACTIVE PRESENTATION DECK (SUNUM MODU) */}
        {viewMode === 'presentation' && (
          <div className="mb-24">
            <div className="glass-panel p-6 sm:p-10 lg:p-12 rounded-3xl border border-white/15 shadow-[0_0_80px_rgba(0,240,255,0.15)] relative overflow-hidden bg-black/70">
              
              {/* Slide Counter & Controls Header */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-cyan-400 font-black text-lg">
                    {String(safeSlideIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/30 font-mono">/</span>
                  <span className="font-mono text-white/40 text-sm">
                    {String(filteredImages.length).padStart(2, '0')}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 ml-2">
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
                    <span>{isPlaying ? 'Otomatik Oynatılıyor' : 'Otomatik Sunum'}</span>
                  </button>

                  <button
                    onClick={(e) => handleCardClick(currentItem, e)}
                    className="p-2.5 rounded-full glass-card border border-white/10 text-white/80 hover:text-white hover:border-cyan-400 transition-all"
                    title="Sihirli Tam Ekran Büyüt"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slide Main Content Stage */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left 7 Cols: Artwork Image Card with Magic Click */}
                <div className="lg:col-span-7 relative group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItem.id}
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -15 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      onClick={(e) => handleCardClick(currentItem, e)}
                      className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-black/80 border border-white/10 shadow-2xl cursor-pointer group-hover:border-cyan-400/50 transition-colors"
                    >
                      <img
                        src={currentItem.src}
                        alt={currentItem.title}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Hover Overlay with Magic Sparkle Callout */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                        <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest flex items-center space-x-1.5">
                          <Wand2 className="w-4 h-4 text-yellow-300 animate-spin-slow" />
                          <span>Sihir Efektiyle İncelemek İçin Tıklayın ✨</span>
                        </span>
                        <div className="w-9 h-9 rounded-full glass-panel border border-cyan-400 flex items-center justify-center text-cyan-300">
                          <ZoomIn className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Previous / Next Arrow Overlay Buttons */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel border border-white/20 text-white flex items-center justify-center hover:scale-110 hover:border-cyan-400 hover:text-cyan-300 transition-all shadow-xl backdrop-blur-xl z-20"
                    aria-label="Önceki Eser"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel border border-white/20 text-white flex items-center justify-center hover:scale-110 hover:border-cyan-400 hover:text-cyan-300 transition-all shadow-xl backdrop-blur-xl z-20"
                    aria-label="Sonraki Eser"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Right 5 Cols: Deep Project Presentation Specs */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItem.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-6"
                    >
                      <div>
                        <div className="flex items-center space-x-3 mb-2 text-xs font-mono text-white/40">
                          <span>Müşteri: {currentItem.client}</span>
                          <span>•</span>
                          <span>{currentItem.year}</span>
                        </div>

                        <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                          {currentItem.title}
                        </h3>
                      </div>

                      {/* Concept & Description */}
                      <div className="p-4 rounded-2xl glass-card border border-white/5 space-y-2">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block flex items-center space-x-1.5">
                          <Palette className="w-3.5 h-3.5" />
                          <span>Tasarım Konsepti</span>
                        </span>
                        <p className="text-white/80 text-sm font-medium leading-relaxed">
                          {currentItem.concept}
                        </p>
                        <p className="text-white/60 text-xs leading-relaxed pt-1">
                          {currentItem.description}
                        </p>
                      </div>

                      {/* Deliverables List */}
                      <div>
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2.5">
                          Teslim Edilen Çıktılar
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {currentItem.deliverables.map((del, dIdx) => (
                            <span
                              key={dIdx}
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full glass-card border border-white/5 text-xs text-white/80"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{del}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tools Used */}
                      <div>
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2.5">
                          Kullanılan Araçlar & Yazılımlar
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {currentItem.tools.map((tool, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Slide Navigation Dots / Quick Jump */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={prevSlide}
                      className="text-xs font-mono text-white/70 hover:text-cyan-300 flex items-center space-x-1 uppercase"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Önceki</span>
                    </button>

                    <div className="flex items-center space-x-1.5 overflow-x-auto max-w-[200px] py-1">
                      {filteredImages.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={(e) => {
                            triggerMagicSparkle(e.clientX, e.clientY)
                            setCurrentSlide(dotIdx)
                          }}
                          className={`h-2 rounded-full transition-all ${
                            dotIdx === safeSlideIndex
                              ? 'w-6 bg-gradient-to-r from-cyan-400 to-purple-500'
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

              {/* Bottom Thumbnail Strip */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-3">
                  TÜM ESERLERİ HIZLI SEÇİN ({filteredImages.length})
                </span>
                <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-thin">
                  {filteredImages.map((item, thumbIdx) => (
                    <button
                      key={item.id}
                      onClick={(e) => {
                        triggerMagicSparkle(e.clientX, e.clientY)
                        setCurrentSlide(thumbIdx)
                      }}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border transition-all ${
                        thumbIdx === safeSlideIndex
                          ? 'border-cyan-400 scale-105 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                          : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                      }`}
                    >
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MODE 2: 3D ANIMATED GRID (IZGARA GÖRÜNÜMÜ) */}
        {viewMode === 'grid' && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-28">
            <AnimatePresence>
              {filteredImages.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  onClick={(e) => handleCardClick(item, e)}
                  className="group relative rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-cyan-400/60 shadow-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] transition-all duration-500 cursor-pointer bg-black/40 flex flex-col justify-between"
                >
                  <div className="relative w-full aspect-square overflow-hidden bg-black/60">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <div className="w-10 h-10 rounded-full bg-cyan-400/20 backdrop-blur-md border border-cyan-400/60 flex items-center justify-center text-cyan-300 mb-3 group-hover:scale-110 transition-transform">
                        <Wand2 className="w-5 h-5 text-yellow-300" />
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest">
                        {item.category}
                      </span>
                      <h4 className="text-white font-bold text-sm leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-white/90 font-medium text-xs truncate max-w-[180px]">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-white/40 block">
                        {item.category}
                      </span>
                    </div>
                    <span className="w-6 h-6 rounded-full glass-card border border-white/10 flex items-center justify-center text-white/60 group-hover:text-cyan-300 group-hover:border-cyan-400 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[92vh] glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(0,240,255,0.35)] flex flex-col bg-black/90"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-white">
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

              {/* Large Image View */}
              <div className="relative flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-black/60">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>

              {/* Modal Footer Description */}
              <div className="p-4 sm:p-6 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="text-white/80 text-sm">
                    {selectedImage.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedImage.tools?.map((tool, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-full text-[10px] font-mono text-white/60 bg-white/5 border border-white/10">
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
