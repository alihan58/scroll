'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Copy, Check, Clock, Github, Twitter, Linkedin, Mail, Phone, MapPin, Sparkles } from 'lucide-react'

export const Footer: React.FC = () => {
  const [emailCopied, setEmailCopied] = useState(false)
  const [phoneCopied, setPhoneCopied] = useState(false)
  const [utcTime, setUtcTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      setUtcTime(`${hours}:${minutes}:${seconds} (GMT+3)`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText('cenanalihan@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  const copyPhone = () => {
    navigator.clipboard.writeText('+90 539 407 9872')
    setPhoneCopied(true)
    setTimeout(() => setPhoneCopied(false), 2000)
  }

  return (
    <footer id="contact" className="relative pt-32 pb-16 px-6 bg-[#030303] border-t border-white/10 overflow-hidden">
      {/* Arka plan ortam ışıması */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-t from-cyan-500/15 via-purple-600/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Ana İletişim Kartı */}
        <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-cyan-500/30 text-center relative overflow-hidden mb-16 shadow-[0_0_100px_rgba(0,240,255,0.1)]">
          <div className="max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-6">
              YENİ PROJE TALEPLERİ VE TASARIM TEKLİFLERİ İÇİN UYGUNDUR
            </span>

            <h2 className="text-4xl sm:text-6xl font-black text-white/90 tracking-tight mb-6">
              Birlikte İkonik Bir Şeyler <br />
              <span className="text-gradient-cyan">İnşa Edelim.</span>
            </h2>

            <p className="text-white/60 text-base sm:text-lg mb-10 leading-relaxed font-light">
              Yeni bir logo, kurumsal kimlik, UI/UX web tasarımı, motion grafik veya 3D görselleştirme projeniz mi var? Doğrudan iletişime geçin.
            </p>

            {/* İletişim Detayları Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
              
              {/* E-Posta Kutusu */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-between text-left hover:border-cyan-400/40 transition-all">
                <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-2">
                  <Mail className="w-4 h-4" />
                  <span>E-POSTA</span>
                </div>
                <a href="mailto:cenanalihan@gmail.com" className="text-white font-mono text-sm hover:text-cyan-300 transition-colors font-bold break-all">
                  cenanalihan@gmail.com
                </a>
                <button
                  onClick={copyEmail}
                  className="mt-3 text-[10px] font-mono text-white/40 hover:text-cyan-400 flex items-center space-x-1"
                >
                  {emailCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{emailCopied ? 'Kopyalandı!' : 'E-Postayı Kopyala'}</span>
                </button>
              </div>

              {/* GSM / Telefon Kutusu */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-between text-left hover:border-cyan-400/40 transition-all">
                <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono mb-2">
                  <Phone className="w-4 h-4" />
                  <span>GSM / WHATSAPP</span>
                </div>
                <a href="tel:+905394079872" className="text-white font-mono text-sm hover:text-purple-300 transition-colors font-bold">
                  +90 539 407 9872
                </a>
                <button
                  onClick={copyPhone}
                  className="mt-3 text-[10px] font-mono text-white/40 hover:text-purple-400 flex items-center space-x-1"
                >
                  {phoneCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{phoneCopied ? 'Kopyalandı!' : 'Numarayı Kopyala'}</span>
                </button>
              </div>

            </div>

            {/* Doğrudan Butonlar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:cenanalihan@gmail.com"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-bold text-xs font-mono uppercase tracking-wider hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>E-POSTA GÖNDER</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/alihancenan"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full glass-card text-white font-mono text-xs hover:border-cyan-400/40 transition-all flex items-center justify-center space-x-2"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span>LINKEDIN PROFİLİ</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

        {/* DEV ANIMASYONLU GRADIENT İMZA: Alihan CENAN */}
        <div className="text-center my-16 select-none overflow-hidden">
          <h1 className="text-6xl sm:text-9xl md:text-[12rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-[linear-gradient(110deg,#00f0ff,45%,#7000ff,55%,#ff007f)] bg-[length:200%_auto] animate-gradient-shift filter drop-shadow-[0_0_60px_rgba(0,240,255,0.25)]">
            Alihan CENAN
          </h1>
        </div>

        {/* Sosyal Bağlantılar ve Canlı Saat Barı */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-12 border-t border-white/10 text-xs font-mono text-white/40 gap-6">
          
          {/* Canlı Yerel Saat */}
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{utcTime || '00:00:00 (GMT+3)'}</span>
          </div>

          {/* Sosyal Medya Bağlantıları */}
          <div className="flex items-center space-x-6">
            <a href="https://www.linkedin.com/in/alihancenan" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:cenanalihan@gmail.com" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>E-Posta</span>
            </a>
            <a href="tel:+905394079872" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>+90 539 407 9872</span>
            </a>
          </div>

          {/* Telif Hakkı */}
          <p>© {new Date().getFullYear()} Alihan CENAN. Tüm hakları saklıdır.</p>
        </div>

      </div>
    </footer>
  )
}
