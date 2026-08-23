'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Clock, Phone, Mail } from 'lucide-react'

export const GoogleMapSection: React.FC = () => {
  return (
    <section id="location" className="py-32 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-card border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>STÜDYO LOKASYONU & HARİTA</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4"
          >
            Kartal, İstanbul <br />
            <span className="text-gradient-cyan">Home Office Çalışma Alanı.</span>
          </motion.h2>
        </div>

        {/* Map & Location Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Info Card */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-2 font-bold">ÇALIŞMA MODELİ</span>
              <h3 className="text-2xl font-bold text-white mb-4">Home Office Stüdyo</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6 font-mono">
                📍 Home Office — Kartal / İstanbul, Türkiye
              </p>

              <div className="space-y-4 text-xs font-mono text-white/80">
                <div className="flex items-center space-x-3">
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  <span>Kartal, İstanbul (Çevrim içi & Yüz Yüze Proje Görüşmesi)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Hafta İçi: 09:00 - 18:30 (GMT+3)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <a href="tel:+905394079872" className="hover:underline">+90 539 407 9872</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <a href="mailto:cenanalihan@gmail.com" className="hover:underline">cenanalihan@gmail.com</a>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Kartal+Istanbul"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-bold text-xs tracking-wider uppercase text-center hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all block"
            >
              Google Haritalarda Aç
            </a>
          </div>

          {/* Interactive Google Maps Frame */}
          <div className="lg:col-span-2 rounded-3xl glass-panel border border-white/10 overflow-hidden min-h-[380px] shadow-2xl relative">
            <iframe
              title="Alihan CENAN Kartal İstanbul Home Office Stüdyo Haritası"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48243.68482455829!2d29.176466384594242!3d40.8932646698651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cadb62d3a3c2cd%3A0x6b8d2e858f7e2d9b!2sKartal%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[380px]"
            />
          </div>

        </div>

      </div>
    </section>
  )
}
