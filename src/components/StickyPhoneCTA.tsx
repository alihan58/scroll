'use client'

import React from 'react'
import { Phone, MessageCircle, ArrowUp } from 'lucide-react'

export const StickyPhoneCTA: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 pointer-events-auto">
      {/* WhatsApp Quick Link */}
      <a
        href="https://wa.me/905394079872?text=Merhaba%20Alihan%20Bey,%20tasar%C4%B1m%20ve%20web%20projem%20i%C3%A7in%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp İle Hızlı Mesaj Gönder"
        className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-110 transition-transform group"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-14 whitespace-nowrap bg-black/90 text-emerald-400 text-xs font-mono py-1 px-3 rounded-lg border border-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp Destek
        </span>
      </a>

      {/* Direct Phone Call Button */}
      <a
        href="tel:+905394079872"
        aria-label="Alihan CENAN Doğrudan Telefon Araması Yap"
        className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:scale-110 transition-transform group animate-pulse"
      >
        <Phone className="w-5 h-5 fill-current" />
        <span className="absolute right-14 whitespace-nowrap bg-black/90 text-cyan-300 text-xs font-mono py-1 px-3 rounded-lg border border-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          +90 539 407 9872
        </span>
      </a>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        aria-label="Sayfa Başına Git"
        className="w-10 h-10 rounded-full glass-card text-white/70 hover:text-cyan-400 flex items-center justify-center transition-colors border border-white/10"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  )
}
