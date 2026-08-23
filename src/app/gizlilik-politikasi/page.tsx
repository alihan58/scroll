import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Gizlilik Politikası & KVKK Aydınlatma Metni — Alihan CENAN',
  description: 'Alihan CENAN web sitesi gizlilik politikası, çerezler ve 6698 sayılı KVKK kapsamında kişisel verilerin korunması aydınlatma metni.',
}

export default function GizlilikPolitikasiPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative z-10">
        
        <Link href="/" className="inline-flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>

        <div className="flex items-center space-x-3 mb-6">
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Gizlilik Politikası & KVKK Metni</h1>
        </div>

        <div className="space-y-6 text-white/70 text-sm leading-relaxed">
          <p className="font-mono text-xs text-white/40">Son Güncelleme: 23 Ağustos 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Kişisel Verilerin Toplanması</h2>
            <p>
              Alihan CENAN (alihancenan.com) olarak, web sitemizi ziyaretiniz ve teklif formları aracılığıyla paylaştığınız ad, soyad, e-posta adresi ve telefon numarası gibi kişisel verilerinizi 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca güvenle saklıyoruz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Verilerin İşlenme Amacı</h2>
            <p>
              Toplanan veriler yalnızca size özel Grafik Tasarım, UI/UX, 3D Render ve Web Geliştirme hizmet tekliflerinin hazırlanması, iletişim kurulması ve proje süreçlerinin yürütülmesi amacıyla işlenmektedir. Verileriniz 3. şahıslarla asla paylaşılmaz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Çerezler (Cookies) ve Analiz</h2>
            <p>
              Sitemizde kullanıcı deneyimini iyileştirmek ve anonim site trafiğini analiz etmek amacıyla teknik çerezler kullanılmaktadır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. İletişim & Haklarınız</h2>
            <p>
              KVKK Madde 11 uyarınca kişisel verilerinizin silinmesini veya güncellenmesini talep etmek için <a href="mailto:cenanalihan@gmail.com" className="text-cyan-400 underline">cenanalihan@gmail.com</a> adresinden bizimle iletişime geçebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
