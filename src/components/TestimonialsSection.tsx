'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, MessageSquare, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Mert Aksoy',
    role: 'CEO, CyberCore Tech',
    comment: 'Alihan Bey markamızın 3D ürün renderlarını ve web sitesini o kadar üst seviye hazırladı ki, satışlarımız ve yatırımcı görüşmelerimiz inanılmaz bir ivme kazandı. Tasarım vizyonu harika.',
    rating: 5,
    company: 'İstanbul',
  },
  {
    name: 'Selin Yılmaz',
    role: 'Pazarlama Direktörü, Aetheria',
    comment: 'Kutu ambalaj tasarımlarımızdan web sitemizin mikro animasyonlarına kadar tüm detaylar kusursuz. Zamanında teslimat ve profesyonel yaklaşımı için Alihan Cenan ekibine teşekkürler.',
    rating: 5,
    company: 'Ankara',
  },
  {
    name: 'Kaan Demir',
    role: 'Kurucu, Hyperion Media',
    comment: 'Sosyal medya video reklamlarımız ve motion graphics işlerimiz için sürekli birlikte çalışıyoruz. 60fps akıcılıkta dijital içerikler üreten nadir kreatif uzmanlardan biri.',
    rating: 5,
    company: 'İzmir',
  },
]

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-32 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-card border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>MÜŞTERİ DEĞERLENDİRMELERİ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4"
          >
            Müşterilerimizin Deneyimleri & <br />
            <span className="text-gradient-cyan">Geri Bildirimler.</span>
          </motion.h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl glass-panel border border-white/10 relative flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-cyan-400/30 mb-4" />

              <p className="text-white/80 text-sm leading-relaxed mb-8 italic">
                "{item.comment}"
              </p>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">{item.name}</h4>
                  <span className="text-xs font-mono text-white/50">{item.role} • {item.company}</span>
                </div>

                <div className="flex text-amber-400 space-x-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
