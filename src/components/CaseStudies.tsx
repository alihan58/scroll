'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, ArrowUpRight, TrendingUp, Sparkles, Award, Eye, X, ZoomIn } from 'lucide-react'
import Image from 'next/image'

interface PortfolioItem {
  id: number
  src: string
  title: string
  category: string
  aspect: string
}

const portfolioImages: PortfolioItem[] = [
  { id: 1, src: '/portfolio/1.jpg', title: 'Kurumsal Kimlik & Logo Mimarisi', category: 'Kurumsal Kimlik', aspect: 'aspect-square' },
  { id: 2, src: '/portfolio/2.jpg', title: 'Kreatif Tipografi & Görsel Kimlik', category: 'Grafik Tasarım', aspect: 'aspect-[4/5]' },
  { id: 3, src: '/portfolio/3.jpg', title: 'Modern İllüstrasyon & Konsept Dizayn', category: 'Kreatif Dizayn', aspect: 'aspect-square' },
  { id: 4, src: '/portfolio/4.jpg', title: 'Görsel Hiyerarşi & Tipografik Tasarım', category: 'Tipografi & Afiş', aspect: 'aspect-[4/5]' },
  { id: 5, src: '/portfolio/5.jpg', title: 'Minimalist Ambalaj & Ürün Kimliği', category: 'Kurumsal Kimlik', aspect: 'aspect-square' },
  { id: 6, src: '/portfolio/6.jpg', title: 'Deneysel Sanatsal İllüstrasyon', category: 'Kreatif Dizayn', aspect: 'aspect-[4/5]' },
  { id: 7, src: '/portfolio/7.jpeg', title: 'Özgün Marka Karakter Tasarımı', category: 'Grafik Tasarım', aspect: 'aspect-square' },
  { id: 8, src: '/portfolio/8.jpeg', title: 'Poster Dizaynı & Göstergebilimsel Analiz', category: 'Tipografi & Afiş', aspect: 'aspect-[4/5]' },
  { id: 9, src: '/portfolio/9.jpeg', title: 'Sinematik Film Afişi & Hareket Tasarımı', category: 'Tipografi & Afiş', aspect: 'aspect-square' },
  { id: 10, src: '/portfolio/10.JPG', title: '3D Vektörel Kompozisyon', category: 'Kreatif Dizayn', aspect: 'aspect-[4/5]' },
  { id: 11, src: '/portfolio/11.JPG', title: 'Dijital İlüstrasyon & Renk Paleti', category: 'Grafik Tasarım', aspect: 'aspect-square' },
  { id: 12, src: '/portfolio/12.jpeg', title: 'Geometrik Desen & Form Mimarisi', category: 'Kurumsal Kimlik', aspect: 'aspect-[4/5]' },
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
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null)

  const filteredImages =
    activeCategory === 'Tümü'
      ? portfolioImages
      : portfolioImages.filter((img) => img.category === activeCategory)

  return (
    <section id="case-studies" className="py-32 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4"
          >
            <Award className="w-3.5 h-3.5" />
            <span>PORTFOLYO & ÖZGÜN TASARIM GALERİSİ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4"
          >
            Seçkin Tasarım Eserleri & <br />
            <span className="text-gradient-cyan">Portfolyo Koleksiyonu.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Alihan CENAN tarafından tasarlanan kurumsal kimlik, tipografi, afiş ve illüstrasyon çalışmalarından seçilen görsel koleksiyon.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                  : 'glass-card text-white/70 hover:text-white hover:border-cyan-400/40 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 12-Image Portfolio Visual Showcase Grid */}
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
                {/* Image Container with Zoom Effect */}
                <div className="relative w-full aspect-square overflow-hidden bg-black/60">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Hover Overlay */}
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

                {/* Card Bottom Meta */}
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

        {/* Case Studies / Vaka Calismalari Section */}
        <div className="pt-12 border-t border-white/10">
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

                {/* Metrics Badge List */}
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_80px_rgba(0,240,255,0.3)] flex flex-col bg-black/80"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
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

              {/* Large Image View */}
              <div className="relative flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-black/50">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
