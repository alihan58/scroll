'use client'

import React, { useState, useEffect } from 'react'
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
} from 'lucide-react'

interface PortfolioItem {
  id: number
  src: string
  title: string
  category: string
  client: string
  year: string
  tools: string[]
  deliverables: string[]
  description: string
  concept: string
}

const portfolioImages: PortfolioItem[] = [
  {
    id: 1,
    src: '/portfolio/1.jpg',
    title: 'Kurumsal Kimlik & Geometrik Logo Mimarisi',
    category: 'Kurumsal Kimlik',
    client: 'Apex Creative Co.',
    year: '2024',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Pantone'],
    deliverables: ['Logo Kılavuzu', 'Kartvizit & Antetli', 'Vektörel Çizimler'],
    description: 'Markanın temel değerlerini yansıtan minimalist, ölçeklenebilir ve göstergebilimsel olarak güçlü bir kurumsal kimlik inşası.',
    concept: 'Geometrik denge ve negatif alan kullanımının kusursuz uyumu.',
  },
  {
    id: 2,
    src: '/portfolio/2.jpg',
    title: 'Kreatif Tipografi & Görsel Semiyotik Analiz',
    category: 'Tipografi & Afiş',
    client: 'Kültür & Sanat İnisiyatifi',
    year: '2024',
    tools: ['Adobe InDesign', 'Adobe Illustrator'],
    deliverables: ['Sergi Afişi', 'Tipografik Düzen', 'Dijital Banner'],
    description: 'Harflerin form ve anlam ilişkisini inceleyen, modern tasarım kurallarına uygun deneysel tipografik afiş tasarımı.',
    concept: 'Görsel hiyerarşi ve kontrast ile mesajın en çarpıcı şekilde iletilmesi.',
  },
  {
    id: 3,
    src: '/portfolio/3.jpg',
    title: 'Modern İllüstrasyon & Karakter Konsept Dizaynı',
    category: 'Kreatif Dizayn',
    client: 'Cyber Studios',
    year: '2025',
    tools: ['Adobe Photoshop', 'Procreate', 'Figma'],
    deliverables: ['Karakter Tasarımı', 'Sosyal Medya Kiti', 'Vektör Grafikler'],
    description: 'Dijital dünyada marka hikayesini güçlendiren özgün renk armonileri ve dinamik karakter çizim dili.',
    concept: 'Fütüristik neon tonları ile organik hatların birleşimi.',
  },
  {
    id: 4,
    src: '/portfolio/4.jpg',
    title: 'Görsel Hiyerarşi & Tipografik Poster Kompozisyonu',
    category: 'Tipografi & Afiş',
    client: 'Tasarım Akademisi',
    year: '2023',
    tools: ['Adobe InDesign', 'Adobe Illustrator'],
    deliverables: ['Baskı Öncesi Hazırlık', 'CMYK Matbaa Dosyası', 'Katalog Kapağı'],
    description: 'Gözün okuma akışını yönlendiren grid sistemleri ve kusursuz mikro tipografi prensipleriyle hazırlanmış poster.',
    concept: 'Grid mimarisi ve altın oran yerleşimi.',
  },
  {
    id: 5,
    src: '/portfolio/5.jpg',
    title: 'Minimalist Ambalaj & Ürün Kimliği Geliştirme',
    category: 'Kurumsal Kimlik',
    client: 'Botanica Organics',
    year: '2024',
    tools: ['Adobe Illustrator', 'Cinema 4D', 'Photoshop'],
    deliverables: ['Kutu Açınımı (Dieline)', '3D Ürün Mockup', 'Folyo Baskı Tasarımı'],
    description: 'Lüks algısını yükselten mat siyah folyo detaylar ve dokusal malzeme seçimleriyle tasarlanan çevre dostu ambalaj serisi.',
    concept: 'Yalın şıklık ve dokunma duyusunu tetikleyen malzeme estetiği.',
  },
  {
    id: 6,
    src: '/portfolio/6.jpg',
    title: 'Deneysel Sanatsal İllüstrasyon & Form Araştırması',
    category: 'Kreatif Dizayn',
    client: 'Sanat Galerisi',
    year: '2024',
    tools: ['Adobe Photoshop', 'Cinema 4D'],
    deliverables: ['Dijital Baskı Eseri', 'Koleksiyon Parçası', 'Post Prodüksiyon'],
    description: 'Geleneksel sanat anlayışını dijital üretim araçlarıyla harmanlayan deneysel soyut kompozisyon çalışması.',
    concept: 'Bilinçaltı formların dijital tuvale yansıması.',
  },
  {
    id: 7,
    src: '/portfolio/7.jpeg',
    title: 'Özgün Marka Karakteri & Maskot Tasarımı',
    category: 'Grafik Tasarım',
    client: 'RetroVerse Media',
    year: '2025',
    tools: ['Adobe Illustrator', 'Photoshop'],
    deliverables: ['Maskot Pozlama Kiti', 'Sticker Paketi', 'Vektörel Assetler'],
    description: 'Tüketiciyle duygusal bağ kuran sempatik, akılda kalıcı ve her platforma kolay adapte olan maskot dizaynı.',
    concept: '8-bit retro esintiler ve sıcak renk paleti.',
  },
  {
    id: 8,
    src: '/portfolio/8.jpeg',
    title: 'Alfred Hitchcock Sineması Göstergebilimsel Afiş',
    category: 'Tipografi & Afiş',
    client: 'Akademik Tez Projesi',
    year: '2024',
    tools: ['Adobe Illustrator', 'Photoshop', 'After Effects'],
    deliverables: ['Akademik Eser', 'Hareketli Afiş (Motion Poster)', 'Semiyotik Rapor'],
    description: 'Saul Bass tasarım felsefesi ve C. S. Peirce göstergebilim modeli referans alınarak üretilen hareketli sinema afişi.',
    concept: 'Gerilim duygusunun soyut geometrik formlarla somutlaşması.',
  },
  {
    id: 9,
    src: '/portfolio/9.jpeg',
    title: 'Sinematik Film Afişi & Hareket Tasarımı',
    category: 'Tipografi & Afiş',
    client: 'Bağımsız Sinema Kolektifi',
    year: '2024',
    tools: ['After Effects', 'Premiere Pro', 'Photoshop'],
    deliverables: ['Teaser Afiş', 'Motion Poster (60 FPS)', 'Sosyal Medya Fragman'],
    description: 'Film anlatısının ana çatışmasını tek bir görsel kareye sığdıran, yüksek kontrastlı dramatik kompozisyon.',
    concept: 'Işık ve gölgenin sembolik psikolojik savaşı.',
  },
  {
    id: 10,
    src: '/portfolio/10.JPG',
    title: '3D Vektörel Kompozisyon & Dinamik Hacimler',
    category: 'Kreatif Dizayn',
    client: 'HyperWave Digital',
    year: '2025',
    tools: ['Maxon Cinema 4D', 'Illustrator', 'Octane'],
    deliverables: ['3D Sahne Render', 'Vektör Katmanları', 'Yüksek Çözünürlük Çıktı'],
    description: '3 boyutlu hacimlerin vektörel renk bloklarıyla etkileşime girdiği yenilikçi dijital grafik denemesi.',
    concept: 'Mekansal derinliğin renk katmanlarıyla yeniden tanımlanması.',
  },
  {
    id: 11,
    src: '/portfolio/11.JPG',
    title: 'Dijital İllüstrasyon & Renk Harmonisi',
    category: 'Grafik Tasarım',
    client: 'Nova Magazine',
    year: '2024',
    tools: ['Adobe Photoshop', 'Figma'],
    deliverables: ['Dergi İllüstrasyonu', 'Sosyal Medya Varyasyonları', 'Web Banner'],
    description: 'Görsel dikkat çeken doygun renk geçişleri ve pürüzsüz degrade gölgelendirmelerle hazırlanmış editoryal görsel.',
    concept: 'Doğa ve teknolojinin fütüristik simyası.',
  },
  {
    id: 12,
    src: '/portfolio/12.jpeg',
    title: 'Geometrik Desen & Form Mimarisi',
    category: 'Kurumsal Kimlik',
    client: 'Nexus Architecture',
    year: '2024',
    tools: ['Adobe Illustrator', 'CAD'],
    deliverables: ['Desen Kılavuzu', 'Ambalaj Deseni', 'Mekan Grafiği'],
    description: 'Mimari strüktürlerden ilham alan, sonsuz döngüde tekrarlanabilir modüler desen ve kurumsal kimlik bileşeni.',
    concept: 'Tekrarlanan ritmik modüllerle görsel süreklilik.',
  },
]

const categories = ['Tümü', 'Kurumsal Kimlik', 'Grafik Tasarım', 'Tipografi & Afiş', 'Kreatif Dizayn']

const caseStudies = [
  {
    client: 'CyberCore Tech Studios',
    category: 'KURUMSAL KİMLİK & 3D RENDER',
    title: 'Geleceğin 3D Siber Marka Deneyimi',
    description: 'Siber güvenlik yazılımı geliştiren firma için komple kurumsal logo tasarımı, 3D fotogerçekçi sahne renderları ve 60fps web arayüzü hazırlandı.',
    metrics: ['+240% Dönüşüm Oranı', '8K Özgün Renderlar', '100/100 Lighthouse Skoru'],
    gradient: 'from-cyan-500/20 via-purple-500/10 to-transparent',
    borderColor: 'hover:border-cyan-500/40',
    accentColor: 'text-cyan-400',
  },
  {
    client: 'Aetheria Luxury Goods',
    category: 'AMBALAJ & UI/UX DİZAYN',
    title: 'Premium Ambalaj & E-Ticaret Arayüzü',
    description: 'Lüks kozmetik ve ürün serisi için mat siyah folyo baskılı kutu tasarımları ve Figma tabanlı yüksek konversiyonlu e-ticaret arayüzü tasarımı.',
    metrics: ['%180 Satış Artışı', 'Baskıya Hazır Vektör', 'Figma Sistem Kütüphanesi'],
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    borderColor: 'hover:border-purple-500/40',
    accentColor: 'text-purple-400',
  },
  {
    client: 'Hyperion Motion Media',
    category: 'MOTION GRAPHICS & SOSYAL MEDYA',
    title: '60 FPS Dijital Kampanya & Motion Jenerik',
    description: 'Uluslararası dijital ajans için sosyal medya videolu reklam jenerikleri, 3D logotip animasyonları ve kampanya banner serisi üretildi.',
    metrics: ['1.2 Milyon Etkileşim', '2D/3D Hybrid Animasyon', '60 FPS Akıcılık'],
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    borderColor: 'hover:border-pink-500/40',
    accentColor: 'text-pink-400',
  },
]

export const CaseStudies: React.FC = () => {
  const [viewMode, setViewMode] = useState<'presentation' | 'grid'>('presentation')
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null)

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  return (
    <section id="case-studies" className="py-32 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
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
              <Award className="w-3.5 h-3.5" />
              <span>İNTERAKTİF PORTFOLYO & SUNUM VİTRİNİ</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4"
            >
              Özgün Eserler & <br />
              <span className="text-gradient-cyan">Tasarım Sunum Koleksiyonu.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Alihan CENAN tarafından üretilen 12 seçkin tasarım projesini interaktif sinematik sunum modunda veya 3D holografik ızgara görünümünde keşfedin.
            </motion.p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-full glass-panel border border-white/10 self-start lg:self-end">
            <button
              onClick={() => setViewMode('presentation')}
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
              onClick={() => setViewMode('grid')}
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

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat)
                setCurrentSlide(0)
              }}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] scale-105 font-bold'
                  : 'glass-card text-white/60 hover:text-white hover:border-white/20 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
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
                    onClick={() => setIsPlaying(!isPlaying)}
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
                    onClick={() => setSelectedImage(currentItem)}
                    className="p-2.5 rounded-full glass-card border border-white/10 text-white/80 hover:text-white hover:border-cyan-400 transition-all"
                    title="Tam Ekran Büyüt"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slide Main Content Stage */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left 7 Cols: Big Interactive Artwork Card */}
                <div className="lg:col-span-7 relative group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItem.id}
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -15 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      onClick={() => setSelectedImage(currentItem)}
                      className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-black/80 border border-white/10 shadow-2xl cursor-pointer group-hover:border-cyan-400/50 transition-colors"
                    >
                      <img
                        src={currentItem.src}
                        alt={currentItem.title}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                        <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest flex items-center space-x-1.5">
                          <Eye className="w-4 h-4" />
                          <span>Tam Çözünürlükte İncelemek İçin Tıklayın</span>
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
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div>
                        <div className="flex items-center space-x-3 mb-2 text-xs font-mono text-white/40">
                          <span>Müşteri / Kapsam: {currentItem.client}</span>
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
                          onClick={() => setCurrentSlide(dotIdx)}
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
                      onClick={() => setCurrentSlide(thumbIdx)}
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
                  onClick={() => setSelectedImage(item)}
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
                        <ZoomIn className="w-5 h-5" />
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

        {/* Corporate Case Studies / Kurumsal Vaka Calismalari */}
        <div className="pt-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">KURUMSAL BAŞARI HİKAYELERİ</span>
            <h3 className="text-3xl sm:text-4xl font-black text-white">Stratejik Vaka Çalışmaları</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative p-8 rounded-3xl glass-card border border-white/5 ${study.borderColor} transition-all duration-500 flex flex-col justify-between overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${study.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
                      {study.category}
                    </span>
                    <span className={`text-xs font-mono font-bold ${study.accentColor}`}>
                      {study.client}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-cyan-300 transition-colors">
                    {study.title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {study.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-2">PROJE SONUÇLARI</span>
                  {study.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="flex items-center space-x-2 text-xs font-mono text-white/80">
                      <TrendingUp className={`w-3.5 h-3.5 ${study.accentColor}`} />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
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
