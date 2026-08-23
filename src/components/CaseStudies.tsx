'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Layers, ArrowUpRight, TrendingUp, Sparkles, Award } from 'lucide-react'

const caseStudies = [
  {
    client: 'CyberCore Tech Studios',
    category: 'KURUMSAL KİMLİK & 3D RENDER',
    title: 'Geleceğin 3D Siber Marka Deneyimi',
    description: 'Siber güvenlik yazılımı geliştiren firma için komple kurumsal logo tasarımı, 3D fotogerçekçi sahne renderları ve 60fps web arayüzü hazırlandı.',
    metrics: ['+240% Dönüşüm Oranı', '8K Ürün Renderları', '100/100 Lighthouse Skoru'],
    gradient: 'from-cyan-500/20 via-purple-500/10 to-transparent',
    borderColor: 'hover:border-cyan-500/40',
    accentColor: 'text-cyan-400',
  },
  {
    client: 'Aetheria Luxury Goods',
    category: 'AMBALAJ & UI/UX DİZAYN',
    title: 'Premio Ambalaj & E-Ticaret Arayüzü',
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
  return (
    <section id="case-studies" className="py-32 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-card border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4"
          >
            <Award className="w-3.5 h-3.5" />
            <span>PORTFOLYO & VAKA ÇALIŞMALARI</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4"
          >
            Öne Çıkan Başarı Hikayeleri & <br />
            <span className="text-gradient-cyan">Vaka Çalışmaları.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base leading-relaxed"
          >
            Alihan CENAN imzalı projelerin somut sonuçları, dönüşüm oranları ve tasarım mimarisi detayları.
          </motion.p>
        </div>

        {/* Case Study Cards */}
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
    </section>
  )
}
