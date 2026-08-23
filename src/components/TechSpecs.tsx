'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Code2, Layers, Printer, Sparkles } from 'lucide-react'

const categories = [
  {
    id: 'design',
    name: 'Görsel Tasarım & Marka',
    icon: Palette,
    specs: [
      { label: 'Tasarım Yazılımları', value: 'Adobe Illustrator, Photoshop, InDesign, Figma' },
      { label: 'Marka Kimliği', value: 'Logo Tasarımı, Kurumsal Kimlik Rehberi, Renk Paleti' },
      { label: 'Tipografi & Düzen', value: 'Tipografi Hiyerarşisi, Izgara Hizalama, Font Çiftleri' },
      { label: 'Vektörel Çizim', value: 'Özel Vektörel İllüstrasyonlar, İkon Setleri, Maskot Tasarımı' },
      { label: 'UI/UX Prototipleri', value: 'İnteraktif Figma Tel Çerçeve (Wireframe) ve Prototipler' },
      { label: 'Tasarım Sistemleri', value: 'Bileşen Kütüphaneleri, Cam Efekti (Glassmorphism), Dark Mode' },
    ],
  },
  {
    id: 'web',
    name: 'Web & UI/UX Geliştirme',
    icon: Code2,
    specs: [
      { label: 'Ana Web Çatısı', value: 'Next.js 14 (App Router, Server Components)' },
      { label: 'Programlama Dili', value: 'TypeScript, JavaScript (ES2024)' },
      { label: 'Arayüz & Stil', value: 'Tailwind CSS, CSS Grid/Flexbox, Custom Animations' },
      { label: 'İnteraktif Render', value: 'HTML5 Canvas 2D, WebGL, Subpixel DPR Ölçekleme' },
      { label: 'Animasyon & Ses', value: 'Framer Motion (useScroll, useSpring), Web Audio API' },
      { label: 'Web Performansı', value: 'Lighthouse %100 Skoru, Core Web Vitals Optimizasyonu' },
    ],
  },
  {
    id: 'motion',
    name: '3D & Motion Graphics',
    icon: Layers,
    specs: [
      { label: '3D Modelleme & Render', value: 'Blender 3D, Cinema 4D, Fotogerçekçi Stüdyo Render' },
      { label: 'Hareketli Grafik', value: 'Adobe After Effects, Motion Design, Promo Videolar' },
      { label: 'Scrollytelling Motoru', value: '60 FPS Kare Sekansı Taraması (Image Sequence Scrubbing)' },
      { label: 'Görsel Efektler', value: 'Işıklandırma, Materyal Tasarımı, Partikül Animasyonları' },
    ],
  },
  {
    id: 'print',
    name: 'Baskı & Yayıncılık',
    icon: Printer,
    specs: [
      { label: 'Baskı Teknikleri', value: 'CMYK Renk Uzayı, Ofset & Dijital Baskı Hazırlığı' },
      { label: 'Ambalaj Tasarımı', value: 'Bıçak İzi (Die-cut) Çizimleri, Kutu ve Etiket Tasarımı' },
      { label: 'Yayıncılık', value: 'Katalog, Broşür, Kitap/Dergi Kapağı, PDF/X Formatlama' },
      { label: 'Renk Yönetimi', value: 'Pantone Renk Eşleme, Profil Yönetimi' },
    ],
  },
]

export default function TechSpecs() {
  const [activeTab, setActiveTab] = useState(categories[0].id)
  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0]

  return (
    <section id="specs" className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Bölüm Başlığı */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-card border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TASARIM VE YAZILIM YETENEKLERİ</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Grafik Tasarım & <span className="text-gradient-cyan">Web Geliştirme Yığını</span>
          </h2>
          <p className="text-white/60 text-base">
            Görsel sanattan dijital web mühendisliğine kadar kullanılan tüm profesyonel araçlar ve teknik standartlar.
          </p>
        </div>

        {/* Sekmeler */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isSelected = activeTab === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 rounded-full text-xs font-mono tracking-wider uppercase transition-all flex items-center space-x-2.5 ${
                  isSelected 
                    ? 'bg-white text-black font-bold shadow-[0_0_25px_rgba(255,255,255,0.3)]' 
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
          className="glass-panel rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl max-w-4xl mx-auto"
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
