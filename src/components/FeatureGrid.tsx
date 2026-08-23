'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Palette, Layers, Film, Box, Printer, Sparkles, Image, ShieldCheck } from 'lucide-react'

const services = [
  {
    icon: Palette,
    category: 'MARKA KİMLİĞİ',
    title: 'Logo & Kurumsal Kimlik Tasarımı',
    description: 'Markanızı öne çıkaran özgün logo tasarımları, kurumsal kimlik rehberleri, tipografi sistemleri ve renk paletleri.',
    highlight: 'Özgün Marka Kimliği',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'hover:border-cyan-500/40',
    accentColor: 'text-cyan-400',
  },
  {
    icon: Layers,
    category: 'ARAYÜZ TASARIMI',
    title: 'UI/UX & Web Arayüz Tasarımı',
    description: 'Kullanıcı odaklı modern web ve mobil arayüz tasarımları, Dark Mode estetiği, Glassmorphism detaylar ve Figma prototipleri.',
    highlight: 'Figma & UI Systems',
    gradient: 'from-purple-500/20 to-indigo-500/10',
    borderColor: 'hover:border-purple-500/40',
    accentColor: 'text-purple-400',
  },
  {
    icon: Film,
    category: 'HAREKETLİ GRAFİK',
    title: 'Motion Graphics & Animasyon',
    description: '2D/3D hareketli grafikler, animasyonlu reklam jenerikleri, promo videoları ve 60fps interaktif canvas görselleri.',
    highlight: '60 FPS Motion',
    gradient: 'from-pink-500/20 to-rose-500/10',
    borderColor: 'hover:border-pink-500/40',
    accentColor: 'text-pink-400',
  },
  {
    icon: Box,
    category: '3D GÖRSELLEŞTİRME',
    title: '3D Ürün Modelleme & Sahne Render',
    description: 'Fotogerçekçi 3D ürün modellemeleri, stüdyo render çekimleri, 3D illüstrasyonlar ve dijital sanat varlıkları.',
    highlight: 'Fotogerçekçi Render',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'hover:border-emerald-500/40',
    accentColor: 'text-emerald-400',
  },
  {
    icon: Printer,
    category: 'BASKI & AMBALAJ',
    title: 'Ambalaj & Katalog Tasarımı',
    description: 'Baskıya hazır ürün ambalajları, kataloglar, broşürler, dergi/kitap kapakları ve kurumsal fuar materyalleri.',
    highlight: 'Baskıya Hazır Vektör',
    gradient: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'hover:border-amber-500/40',
    accentColor: 'text-amber-400',
  },
  {
    icon: Image,
    category: 'DİJİTAL SANAT',
    title: 'Sosyal Medya & Reklam Görselleri',
    description: 'Sosyal medya içerik kitleri, dijital kampanya görselleri, banner tasarımları ve özel dijital illüstrasyonlar.',
    highlight: 'Kreatif Kampanyalar',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    borderColor: 'hover:border-blue-500/40',
    accentColor: 'text-blue-400',
  },
]

export default function FeatureGrid() {
  return (
    <section id="features" className="relative py-32 px-6 bg-[#050505] overflow-hidden">
      {/* Arka plan ortam ışıması */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Bölüm Başlığı */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-card border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>GRAFİK & DİJİTAL TASARIM HİZMETLERİ</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4"
          >
            Tüm Görsel İhtiyaçlarınız İçin <br />
            <span className="text-gradient-cyan">Kreatif Çözümler.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base leading-relaxed"
          >
            Alihan CENAN; kurumsal marka kimliğinden UI/UX web arayüzlerine, 3D görselleştirmeden motion grafiklere kadar geniş bir yelpazede profesyonel tasarım hizmeti sunar.
          </motion.p>
        </div>

        {/* Hizmet Kartları Izgarası */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-8 rounded-2xl glass-card border border-white/5 ${item.borderColor} transition-all duration-500 overflow-hidden flex flex-col justify-between`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">
                      {item.category}
                    </span>
                    <div className={`p-3 rounded-xl glass-panel ${item.accentColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-white/40 font-mono">UZMANLIK</span>
                  <span className={`text-xs font-mono font-bold ${item.accentColor}`}>
                    {item.highlight}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
