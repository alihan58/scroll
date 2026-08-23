'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExplodingSequence } from '@/components/canvas-sequence'
import { ChevronDown, Sparkles, Layers, Cpu } from 'lucide-react'

export const ScrollytellingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // --- Scroll Aralık Katman Animasyonları ---
  
  // Aralık [0.0 - 0.20]: Hero Metni
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.20], [1, 1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.20], [0, -50])

  // Aralık [0.35 - 0.55]: Bölüm 01 (Sola Hizalı)
  const section1Opacity = useTransform(scrollYProgress, [0.30, 0.36, 0.50, 0.58], [0, 1, 1, 0])
  const section1Y = useTransform(scrollYProgress, [0.30, 0.36, 0.50, 0.58], [40, 0, 0, -40])

  // Aralık [0.65 - 0.85]: Bölüm 02 (Sağa Hizalı)
  const section2Opacity = useTransform(scrollYProgress, [0.60, 0.66, 0.80, 0.88], [0, 1, 1, 0])
  const section2Y = useTransform(scrollYProgress, [0.60, 0.66, 0.80, 0.88], [40, 0, 0, -40])

  // Aralık [0.90 - 1.00]: Alt Bölüme Geçiş
  const transitionOpacity = useTransform(scrollYProgress, [0.88, 0.94, 1], [0, 1, 1])
  const transitionY = useTransform(scrollYProgress, [0.88, 0.94, 1], [40, 0, 0])

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] sm:h-[450vh] bg-[#050505]">
      {/* Sabit Canvas Ekran Alanı */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Ortam ışıması arka planı */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,240,255,0.06)_0%,rgba(112,0,255,0.03)_40%,transparent_70%)] pointer-events-none" />

        {/* 60fps HTML5 Canvas Görsel Sekansı */}
        <ExplodingSequence containerRef={containerRef} totalFrames={300} bgColor="#050505" />

        {/* --- SCROLL PARALLAX TİPOGRAFİ KATMANLARI --- */}

        {/* 1. Hero Katmanı [0.0 - 0.20] */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-between py-16 sm:py-20 px-4 sm:px-6 pointer-events-none"
        >
          <div className="mt-12 sm:mt-16 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full glass-card border border-white/10 text-[10px] sm:text-[11px] font-mono text-white/60 tracking-widest uppercase mb-4 sm:mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>PORTFOLYO & KREATİF MÜHENDİSLİK</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-white/90 mb-4 sm:mb-6 leading-tight"
            >
              Alihan <span className="text-gradient-cyan">CENAN</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-3xl text-white/60 font-light tracking-tight max-w-2xl mx-auto leading-relaxed"
            >
              Tasarım Uzmanı & Kreatif Web Geliştirici
            </motion.p>
          </div>

          {/* Kaydırma Göstergesi */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center space-y-2 text-white/40 mb-4"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest">Ayrıştırmak İçin Kaydırın</span>
            <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
          </motion.div>
        </motion.div>

        {/* 2. Bölüm 01 [0.35 - 0.55]: Mobil Uyumlu Sol Kart */}
        <motion.div
          style={{ opacity: section1Opacity, y: section1Y }}
          className="absolute left-4 right-4 sm:left-16 sm:right-auto top-1/2 -translate-y-1/2 z-20 sm:max-w-lg pointer-events-none"
        >
          <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-2 sm:mb-3">
              <Cpu className="w-4 h-4" />
              <span>BÖLÜM 01 — FELSEFE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white/90 mb-3 sm:mb-4 tracking-tight leading-tight">
              Hassas Mühendislik ve Estetik Sezginin Buluşması
            </h2>
            <p className="text-white/60 leading-relaxed text-xs sm:text-sm">
              Mikro etkileşimlerin, yüksek hızlı Canvas rendering süreçlerinin ve modüler kod mimarilerinin zahmetsiz kullanıcı deneyimlerine dönüştüğü modern dijital ürünler tasarlıyorum.
            </p>
          </div>
        </motion.div>

        {/* 3. Bölüm 02 [0.65 - 0.85]: Mobil Uyumlu Sağ Kart */}
        <motion.div
          style={{ opacity: section2Opacity, y: section2Y }}
          className="absolute left-4 right-4 sm:left-auto sm:right-16 top-1/2 -translate-y-1/2 z-20 sm:max-w-lg pointer-events-none"
        >
          <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center space-x-2 text-purple-400 font-mono text-[10px] uppercase tracking-widest mb-2 sm:mb-3">
              <Layers className="w-4 h-4" />
              <span>BÖLÜM 02 — MİMARİ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white/90 mb-3 sm:mb-4 tracking-tight leading-tight">
              Karmaşık Dijital Deneyimleri Bileşenlerine Ayırmak
            </h2>
            <p className="text-white/60 leading-relaxed text-xs sm:text-sm">
              Gelişmiş görsel tasarım sistemlerini atomik bileşenlere, yüksek performanslı animasyon hatlarına ve güçlü Next.js 14 sunucu mimarilerine ayrıştırıyorum.
            </p>
          </div>
        </motion.div>

        {/* 4. Geçiş Katmanı [0.90 - 1.00] */}
        <motion.div
          style={{ opacity: transitionOpacity, y: transitionY }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-black/60 backdrop-blur-md pointer-events-auto"
        >
          <div className="max-w-2xl w-full mx-auto glass-panel p-6 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-[0_0_80px_rgba(0,240,255,0.15)]">
            <span className="inline-block text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-3 sm:mb-4">
              ÖZEL PROJELER VE DANIŞMANLIK İÇİN UYGUNDUR
            </span>

            <h2 className="text-3xl sm:text-6xl font-black text-white/90 mb-3 sm:mb-4 tracking-tight">
              Alihan CENAN
            </h2>

            <p className="text-white/60 text-sm sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
              Yüksek kaliteli hareket tasarımı, ses mimarisi ve kod hassasiyetiyle bir sonraki dijital ürününüzü geliştirmeye hazır.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-bold text-xs tracking-wider uppercase hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all"
            >
              <span>Detayları Keşfet</span>
            </a>
          </div>
        </motion.div>

        {/* Sağ İlerleme Çubuğu */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center space-y-3 pointer-events-none">
          <span className="text-[9px] font-mono text-white/40 tracking-widest rotate-90 mb-4">İLERLEME</span>
          <div className="w-[2px] h-32 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500"
              style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
