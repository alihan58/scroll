import React from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowLeft, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Teşekkürler — Mesajınız Alındı | Alihan CENAN',
  description: 'İletişim talebiniz başarıyla iletildi. En kısa sürede tarafınıza dönüş yapılacaktır.',
}

export default function TesekkurlerPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full glass-panel p-10 rounded-3xl border border-emerald-500/30 shadow-[0_0_80px_rgba(16,185,129,0.15)] relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto mb-6 text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-2">TALEP ALINDI</span>
        <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Teşekkür Ederiz!</h1>
        <p className="text-white/60 text-sm mb-8 leading-relaxed">
          Mesajınız ve proje detaylarınız başarıyla Alihan CENAN ekibine ulaştı. En geç <strong className="text-emerald-400 font-bold">24 saat</strong> içerisinde sizinle iletişime geçilecektir.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-bold text-xs tracking-wider uppercase hover:brightness-110 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
