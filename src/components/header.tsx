'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Music, ArrowUpRight, Menu, X, Paintbrush } from 'lucide-react'
import { chiptuneEngine } from '@/lib/audio8bit'

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleAudio = async () => {
    const newState = await chiptuneEngine.toggle()
    setIsPlaying(newState)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300 pointer-events-auto">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-500 flex items-center justify-between ${
          scrolled ? 'glass-panel py-3 px-6 shadow-2xl border-white/10' : 'bg-transparent py-4 px-2'
        }`}
      >
        {/* Logotip - 8-Bit Uzaylı Kafası Logo 👽 */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 via-cyan-500 to-purple-500 flex items-center justify-center text-base group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            👽
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-white/90 group-hover:text-cyan-400 transition-colors leading-none">
              ALIHAN CENAN
            </span>
            <span className="text-[9px] font-mono text-white/40 tracking-wider uppercase mt-0.5">
              Grafik Tasarım & UI Uzmanı
            </span>
          </div>
        </Link>

        {/* Masaüstü Navigasyon Menüsü */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono uppercase tracking-wider text-white/70">
          <a href="#features" className="hover:text-cyan-400 transition-colors">Hizmetler</a>
          <a href="#specs" className="hover:text-cyan-400 transition-colors">Yetenekler</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">İletişim</a>
          <a href="#visualizer" className="hover:text-cyan-400 transition-colors">GAME</a>
          <Link href="/not-found" className="text-pink-400 hover:text-pink-300 transition-colors flex items-center space-x-1">
            <Paintbrush className="w-3.5 h-3.5" />
            <span>404 SAYFASI</span>
          </Link>
        </nav>

        {/* Kontroller & 8-Bit Ses Butonu */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={toggleAudio}
            aria-label="8-bit retro arka plan müziğini aç/kapat"
            className={`px-3.5 py-1.5 rounded-full border text-[10px] font-mono transition-all flex items-center space-x-1.5 ${
              isPlaying
                ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.5)] animate-pulse'
                : 'glass-card border-white/10 text-white/80 hover:border-cyan-400/60 hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>{isPlaying ? '🎵 8-BİT MÜZİK AÇIK' : '🎶 8-BİT MÜZİK ÇAL'}</span>
          </button>

          <a
            href="mailto:cenanalihan@gmail.com"
            className="px-4 py-1.5 rounded-full bg-white text-black font-bold text-[11px] font-mono uppercase tracking-wider hover:bg-cyan-400 transition-all flex items-center space-x-1 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            <span>Teklif Al</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Mobil Menü Butonları */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full glass-card transition-all ${isPlaying ? 'text-cyan-400 border border-cyan-400 animate-pulse' : 'text-white/80'}`}
            title="8-Bit Müzik"
          >
            <Music className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full glass-card text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobil Açılır Menü */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-3 p-6 glass-panel rounded-2xl border border-white/10 flex flex-col space-y-4 text-sm font-mono uppercase tracking-wider max-w-6xl mx-auto"
        >
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Hizmetler</a>
          <a href="#specs" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Yetenekler</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">İletişim</a>
          <a href="#visualizer" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">GAME</a>
          <Link href="/not-found" onClick={() => setMobileMenuOpen(false)} className="text-pink-400 hover:text-pink-300 flex items-center space-x-2">
            <Paintbrush className="w-4 h-4" />
            <span>404 BOYAMA SAYFASI</span>
          </Link>
          <a
            href="mailto:cenanalihan@gmail.com"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-bold text-center text-xs tracking-wider"
          >
            cenanalihan@gmail.com
          </a>
        </motion.div>
      )}
    </header>
  )
}
