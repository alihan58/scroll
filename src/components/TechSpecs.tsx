'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Code2, Layers, Printer, Sparkles, Cpu, Award } from 'lucide-react'

const categories = [
  {
    id: 'design',
    name: 'Görsel Tasarım & Marka',
    icon: Palette,
    specs: [
      { label: 'Tasarım Yazılımları', value: 'Adobe Illustrator, Photoshop, InDesign, Figma, Adobe XD' },
      { label: 'Marka Kimliği', value: 'Logo Tasarımı, Kurumsal Kimlik Rehberi, Renk Mimarisi' },
      { label: 'Tipografi & Düzen', value: 'Tipografi Hiyerarşisi, Izgara (Grid) Mimarisi, Font Anatomisi' },
      { label: 'Vektörel Çizim', value: 'Özgün İllüstrasyonlar, İkon Setleri, Maskot Tasarımı' },
      { label: 'UI/UX Prototipleri', value: 'İnteraktif Figma Tel Çerçeve (Wireframe) ve Prototipleme' },
      { label: 'Tasarım Sistemleri', value: 'Bileşen Kütüphaneleri, Glassmorphism, Dark Theme Mimarisi' },
    ],
  },
  {
    id: 'ai-creative',
    name: 'Yapay Zeka & Yeni Nesil Araçlar',
    icon: Cpu,
    specs: [
      { label: 'Kreatif Yapay Zeka', value: 'Antigravity, Google Pomelli, Google Stitch' },
      { label: 'Veri & İstatistik', value: 'Jamovi (Kullanıcı Deneyimi & İstatistiksel Analiz)' },
      { label: 'Hızlı İçerik Üretimi', value: 'Canva Pro, Sosyal Medya Şablon Sistemleri' },
      { label: 'Dijital Pazarlama', value: 'Google ADS Search Sertifikalı Kampanya Yönetimi, SEO Optimizasyonu' },
    ],
  },
  {
    id: 'motion',
    name: '3D, Motion & Video',
    icon: Layers,
    specs: [
      { label: '3D Modelleme & Render', value: 'Blender 3D, Maxon Cinema 4D, Fotogerçekçi Renderlar' },
      { label: 'Hareketli Grafik & Kurgu', value: 'Adobe After Effects, Premiere Pro, Final Cut Pro' },
      { label: 'Ses Tasarımı', value: 'Adobe Audition, Web Audio API, Ses Editörlüğü' },
      { label: 'Hava Prodüksiyonu', value: 'SHGM Lisanslı İHA / Drone Çekimleri ve Hava Fotoğrafçılığı' },
    ],
  },
  {
    id: 'web',
    name: 'Web & Kodlama',
    icon: Code2,
    specs: [
      { label: 'Modern Web Altyapısı', value: 'Next.js 14 (App Router, Server Components), React' },
      { label: 'Kodlama Dili', value: 'TypeScript, JavaScript (ES2024), HTML5, CSS3' },
      { label: 'Stil & Efektler', value: 'Tailwind CSS, CSS Grid, Custom Glow & Glassmorphism' },
      { label: 'İnteraktif Görsel Motor', value: 'HTML5 Canvas 2D, Framer Motion, 60 FPS Scrollytelling' },
      { label: 'SEO & Performans', value: 'Lighthouse %100 Skoru, Schema.org Zengin JSON-LD Kartları' },
    ],
  },
  {
    id: 'print',
    name: 'Baskı & Ambalaj',
    icon: Printer,
    specs: [
      { label: 'Baskı Teknikleri', value: 'CMYK Renk Uzayı, Ofset & Dijital Matbaa Baskı Hazırlığı' },
      { label: 'Ambalaj Tasarımı', value: 'Bıçak İzi (Dieline) Çizimleri, Kutu ve Şişe Etiketi Tasarımı' },
      { label: 'Yayıncılık', value: 'Katalog, Broşür, Kitap/Dergi Kapağı, Mizanpaj ve PDF/X Standardı' },
      { label: 'Renk Yönetimi', value: 'Pantone Renk Eşleme, Matbaa Profil Kalibrasyonu' },
    ],
  },
]

export default function TechSpecs() {
  const [activeTab, setActiveTab] = useState(categories[0].id)
  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0]

  return (
    <section id="specs" className="py-28 px-6 bg-[#050505] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Bölüm Başlığı */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-card border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TASARIM VE YAZILIM YETENEKLERİ</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Profesyonel Yetenekler & <span className="text-gradient-cyan">Teknoloji Yığını</span>
          </h2>
          <p className="text-white/60 text-base">
            Görsel sanattan dijital web mühendisliğine, 3D modellemeden yapay zekaya kadar kullanılan tüm profesyonel araçlar.
          </p>
        </div>

        {/* Sekmeler */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isSelected = activeTab === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all flex items-center space-x-2 ${
                  isSelected 
                    ? 'bg-cyan-400 text-black font-bold shadow-[0_0_25px_rgba(0,240,255,0.4)] scale-105' 
                    : 'glass-card text-white/70 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            )
          })}
        </div>

        {/* Teknik Detay Tablosu Kartı */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl max-w-4xl mx-auto bg-black/60"
        >
          <div className="divide-y divide-white/10">
            {currentCategory.specs.map((item, index) => (
              <div key={index} className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">{item.label}</span>
                <span className="text-white font-medium sm:text-right font-sans">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
