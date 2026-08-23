'use client'

import React, { useState } from 'react'
import { Sparkles, ArrowRight, X } from 'lucide-react'

export const TopBanner: React.FC = () => {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-black py-2 px-4 text-xs font-mono font-bold tracking-wider relative z-50 flex items-center justify-between shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-center space-x-2 text-center w-full">
        <Sparkles className="w-4 h-4 text-black animate-spin" />
        <span>🚀 2026 Q3/Q4 Projeleriniz İçin Ücretsiz Tasarım & Yazılım Ön Görüşmesi Randevusu Alın!</span>
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center space-x-1 underline hover:text-white transition-colors ml-2"
        >
          <span>Hemen İncele</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="p-1 hover:bg-black/10 rounded-full transition-colors text-black"
        aria-label="Duyuruyu Kapat"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
