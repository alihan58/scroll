'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Award,
  BookOpen,
  FileText,
  Download,
  CheckCircle2,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Sparkles,
  Plane,
  Target,
  Layers,
  Wand2,
  BookmarkCheck,
  Video,
  Eye,
  X,
  ExternalLink,
  Globe,
  Newspaper,
  Cpu,
} from 'lucide-react'

const educationList = [
  {
    period: '2024 - 2026',
    degree: 'Tezli Yüksek Lisans (Master)',
    school: 'İstanbul Gedik Üniversitesi',
    department: 'Görsel İletişim Tasarımı',
    badge: 'Devam Ediyor',
    description: 'Görsel göstergebilim, hareketli grafikler ve modern görsel iletişim kuramları üzerine lisansüstü tez çalışması.',
  },
  {
    period: '2020 - 2023',
    degree: 'Lisans',
    school: 'İstanbul Gedik Üniversitesi',
    department: 'Görsel İletişim Tasarımı',
    badge: 'Tamamlandı',
    description: 'Kullanıcı odaklı görsel iletişim tasarımı, afiş ve tipografi tasarımı, dijital medya projeleri.',
  },
  {
    period: '2018 - 2020',
    degree: 'Önlisans',
    school: 'Marmara Üniversitesi',
    department: 'Grafik Tasarımı',
    badge: 'Tamamlandı',
    description: 'Tipografi, kurumsal kimlik, ambalaj tasarımı, baskı teknikleri ve renk teorisi odaklı temel sanat ve tasarım eğitimi.',
  },
  {
    period: '2017',
    degree: 'Mesleki ve Teknik Lise',
    school: 'Yakacık Anadolu Teknik Lisesi',
    department: 'Bilişim Teknolojileri / Web Programcılığı Ana Dalı',
    badge: 'Mezuniyet',
    description: 'Web geliştirme, kodlama temelleri, veritabanı yönetimi ve algoritma mimarisi.',
  },
]

const certifications = [
  {
    icon: Newspaper,
    title: 'Akademik Makale Yazarlığı',
    issuer: 'Akademik Hakemli Yayın',
    detail: '“Alfred Hitchcock Film Afişlerinde Tipografinin Göstergebilimsel Analizi” başlıklı özgün akademik makale çalışması.',
    color: 'from-cyan-500/20 to-blue-500/10',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    tag: 'YENİ AKADEMİK MAKALE',
  },
  {
    icon: BookOpen,
    title: 'Kitap Bölümü Yazarlığı (Akademik Kitap)',
    issuer: 'Uluslararası Akademik Yayın',
    detail: '“Hitchcock Sinemasında Saul Bass İmzalı Grafik Eserlerin C. S. Peirce’ın Göstergebilim Modeli Bağlamında İncelenmesi” başlıklı tezden türetilen kitap bölümü.',
    color: 'from-purple-500/20 to-pink-500/10',
    accent: 'text-purple-400',
    border: 'border-purple-500/30',
    tag: 'KİTAP BÖLÜMÜ',
  },
  {
    icon: Video,
    title: 'Lisansüstü Tez Çalışması',
    issuer: 'İstanbul Gedik Üniversitesi',
    detail: '“Alfred Hitchcock Film Afişlerinin Göstergebilimsel Olarak Karşılaştırmalı Analizi ve Hareketlendirilmesi” başlıklı master tezi.',
    color: 'from-pink-500/20 to-rose-500/10',
    accent: 'text-pink-400',
    border: 'border-pink-500/30',
    tag: 'MASTER TEZİ',
  },
  {
    icon: Plane,
    title: 'İHA Sportif / Amatör Pilot Sertifikası',
    issuer: 'Sivil Havacılık Genel Müdürlüğü (SHGM)',
    detail: 'Profesyonel drone çekimleri, hava fotoğrafçılığı ve havadan video prodüksiyonu lisansı.',
    color: 'from-emerald-500/20 to-teal-500/10',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    tag: 'SHGM PİLOT LİSANSI',
  },
  {
    icon: Target,
    title: 'Google ADS Search Sertifikası',
    issuer: 'Google Digital Academy',
    detail: 'Arama ağı reklamcılığı, veri analitiği, dönüşüm optimizasyonu ve ROI odaklı dijital kampanya yönetimi.',
    color: 'from-amber-500/20 to-yellow-500/10',
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
    tag: 'GOOGLE RESMİ SERTİFİKA',
  },
]

// Güncel CV'deki tüm 18 yazılım ve yaratıcı araç
const softwareSkills = [
  { name: 'Adobe Illustrator', level: 98, category: 'Vektör & Logo' },
  { name: 'Adobe Photoshop', level: 96, category: 'Görsel & Mockup' },
  { name: 'Figma', level: 95, category: 'UI / UX Tasarım' },
  { name: 'Adobe InDesign', level: 92, category: 'Mizanpaj & Basım' },
  { name: 'Adobe Premiere Pro', level: 92, category: 'Video Kurgu' },
  { name: 'Adobe After Effects', level: 90, category: 'Motion Graphics' },
  { name: 'Blender 3D', level: 88, category: '3D Modelleme & Animasyon' },
  { name: 'Maxon Cinema 4D', level: 86, category: '3D Render & Sahne' },
  { name: 'Antigravity', level: 94, category: 'Kreatif AI & Mimariler' },
  { name: 'WordPress', level: 92, category: 'CMS & Web Geliştirme' },
  { name: 'Google Pomelli', level: 88, category: 'Yapay Zeka Tasarım' },
  { name: 'Google Stitch', level: 86, category: 'Görsel Entegrasyon' },
  { name: 'Adobe Audition', level: 85, category: 'Ses Editörlüğü' },
  { name: 'Final Cut Pro', level: 84, category: 'Post Prodüksiyon' },
  { name: 'Adobe XD', level: 90, category: 'Arayüz Prototipleri' },
  { name: 'Canva', level: 95, category: 'Hızlı Sosyal İçerik' },
  { name: 'Jamovi', level: 82, category: 'Veri & İstatistik Analizi' },
  { name: 'MS Office', level: 90, category: 'Raporlama & Sunum' },
]

const seminars = [
  { date: '11.05.2023', title: 'Gelenekselden Dijitale; Kültür mü? Kültürsüzlük mü?' },
  { date: '20.03.2023', title: 'CV Hazırlama Eğitimi' },
  { date: '02.03.2023', title: 'Travma Sürecinde Çocuk Resimlerinin Analizi' },
  { date: '16.11.2022', title: 'Türkçe’yi Doğru Konuşma Sanatı' },
  { date: '23.11.2021', title: 'Grafik ve Görsel İletişim Tasarımında Tipografinin Gerekliliği ve Önemi' },
]

export const ResumeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'credentials' | 'skills' | 'seminars'>('education')
  const [pdfModalOpen, setPdfModalOpen] = useState(false)

  return (
    <section id="resume" className="py-28 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Arka plan ışık ambiyansı */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Üst Başlık & CV İşlem Butonları */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 pb-12 border-b border-white/10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>GÜNCEL RESMİ ÖZGEÇMİŞ & BİYOGRAFİ</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4"
            >
              ALİHAN CENAN — <br />
              <span className="text-gradient-cyan">Web - Grafik & Görsel İletişim Tasarımı Uzmanı</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-base sm:text-lg leading-relaxed"
            >
              Kullanıcı odaklı, yaratıcı ve estetik tasarım çözümleri üretmeyi hedefliyor; web geliştirme, grafik tasarım, kullanıcı arayüz tasarımları ve dijital medya projelerinde sorumluluk almaya hazırım.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-white/60 text-sm leading-relaxed mt-3"
            >
              İçerik yazarlığı, ses editörlüğü, motion grafik, yapay zeka destekli tasarım ve modelleme, drone çekimleri, veri analizi, Google ADS hizmetleri ve SEO uyumlu içerik düzenleme, medya ve iletişim ekip liderliği, tasarım danışmanlığı, ürün fotoğrafçılığı ve mockup, video editörlüğü ve post prodüksiyon, sosyal medya yönetimi, ajans hizmetleri, basım ve yayın, web ve mobil uygulama tasarımı ve geliştirme, ambalaj tasarımı, kurumsal kimlik oluşturma.
            </motion.p>

            {/* Hızlı Bilgi Rozetleri (Yeni CV verileriyle) */}
            <div className="flex flex-wrap gap-2.5 mt-6 text-xs font-mono text-white/70">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-card border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>İstanbul / Kartal</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-card border border-white/5">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>D.T: 15.12.1998</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-card border border-white/5">
                <Award className="w-3.5 h-3.5 text-pink-400" />
                <span>İngilizce (Orta Seviye)</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-card border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Askerlik: Tecilli</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-card border border-white/5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>alihancenan.vercel.app</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-card border border-white/5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>2018 - 2026 Freelance Hizmet</span>
              </span>
            </div>
          </div>

          {/* İki Adet Aksiyon Butonu: Canlı PDF İnceleme & PDF İndirme */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0"
          >
            {/* Modal İçi Canlı PDF Önizleme */}
            <button
              onClick={() => setPdfModalOpen(true)}
              className="inline-flex items-center justify-center space-x-2.5 px-6 py-4 rounded-full glass-card border border-cyan-400/40 text-cyan-300 font-extrabold text-xs font-mono uppercase tracking-wider hover:bg-cyan-500/20 hover:border-cyan-400 hover:scale-105 transition-all shadow-[0_0_25px_rgba(0,240,255,0.25)]"
            >
              <Eye className="w-4 h-4" />
              <span>GÜNCEL CV'Yİ GÖRÜNTÜLE</span>
            </button>

            {/* Doğrudan İndirme Butonu */}
            <a
              href="/Alihan_CENAN_CV.pdf"
              download="Alihan_CENAN_CV_Ozgecmis.pdf"
              className="inline-flex items-center justify-center space-x-2.5 px-6 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-extrabold text-xs font-mono uppercase tracking-wider hover:scale-105 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all group"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>İNDİR (PDF)</span>
            </a>
          </motion.div>
        </div>

        {/* Sekme Kontrolleri */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-12">
          {[
            { id: 'education', label: 'Eğitim Hayatı', icon: GraduationCap },
            { id: 'credentials', label: 'Sertifikalar & Akademik Yayınlar', icon: Award },
            { id: 'skills', label: 'Yazılımlar & Araçlar (18)', icon: Layers },
            { id: 'seminars', label: 'Seminerler & Eğitimler', icon: BookmarkCheck },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.35)] scale-105 font-bold'
                    : 'glass-card text-white/60 hover:text-white hover:border-white/20 border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Sekme İçerikleri */}
        <AnimatePresence mode="wait">
          {/* 1. Eğitim Sekmesi */}
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {educationList.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl glass-card border border-white/10 hover:border-cyan-400/40 transition-all duration-300 relative group overflow-hidden bg-black/40 flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center space-x-1.5 text-cyan-400 font-mono text-xs font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{edu.period}</span>
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase glass-panel border border-white/10 text-white/70">
                        {edu.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {edu.school}
                    </h3>
                    <div className="text-purple-400 font-mono text-sm mb-4 font-semibold">
                      {edu.department} — <span className="text-white/80">{edu.degree}</span>
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* 2. Sertifikalar, Makaleler & Tez Sekmesi */}
          {activeTab === 'credentials' && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certifications.map((cert, idx) => {
                const Icon = cert.icon
                return (
                  <div
                    key={idx}
                    className={`p-7 rounded-3xl glass-card border ${cert.border} transition-all duration-500 relative group overflow-hidden bg-black/40 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 rounded-2xl glass-panel border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <Icon className={`w-5 h-5 ${cert.accent}`} />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-white/5 border border-white/10 text-white/70">
                          {cert.tag}
                        </span>
                      </div>

                      <span className="font-mono text-[11px] uppercase tracking-widest text-white/40 block mb-1.5">
                        {cert.issuer}
                      </span>

                      <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-cyan-300 transition-colors">
                        {cert.title}
                      </h3>

                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                        {cert.detail}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-white/5 flex items-center space-x-2 text-xs font-mono text-white/50">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${cert.accent}`} />
                      <span>Resmi CV Doğrulanmış Kayıt</span>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}

          {/* 3. Beceriler & Araçlar Sekmesi (18 Araç: Antigravity, Blender, Pomelli, Stitch dahil) */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {softwareSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl glass-card border border-white/10 hover:border-cyan-400/40 transition-all bg-black/40 flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base leading-tight group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[10px] font-mono text-white/40">
                        {skill.category}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-xs text-cyan-400">
                      %{skill.level}
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.03 }}
                      className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* 4. Seminerler Sekmesi */}
          {activeTab === 'seminars' && (
            <motion.div
              key="seminars"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-3xl glass-card border border-white/10 bg-black/40 max-w-4xl mx-auto space-y-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <BookmarkCheck className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Sürekli Gelişim & Katılınan Seminerler</h3>
              </div>

              <div className="divide-y divide-white/5">
                {seminars.map((sem, idx) => (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group">
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform" />
                      <span className="text-white/90 text-sm sm:text-base font-medium group-hover:text-cyan-300 transition-colors">
                        {sem.title}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-white/40 pl-5 sm:pl-0">
                      {sem.date}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* İnteraktif Gömülü PDF CV Okuyucu Modalı */}
      <AnimatePresence>
        {pdfModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPdfModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full h-[90vh] glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_90px_rgba(0,240,255,0.3)] flex flex-col bg-[#0a0a0a]"
            >
              {/* PDF Başlık Barı */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/50">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      Alihan_CENAN_CV_Özgeçmiş.pdf
                    </h3>
                    <span className="text-[10px] font-mono text-white/50 block">
                      Web - Grafik & Görsel İletişim Tasarımı Uzmanı Güncel CV
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href="/Alihan_CENAN_CV.pdf"
                    download="Alihan_CENAN_CV_Ozgecmis.pdf"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 text-xs font-mono uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">İndir</span>
                  </a>

                  <a
                    href="/Alihan_CENAN_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full glass-card border border-white/10 text-white/70 hover:text-white transition-colors"
                    title="Yeni Sekmede Aç"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setPdfModalOpen(false)}
                    className="p-2 rounded-full glass-card border border-white/10 text-white/70 hover:text-white hover:border-red-400 transition-colors"
                    title="Kapat"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Gömülü PDF Okuyucu */}
              <div className="flex-1 w-full h-full bg-[#1e1e1e] relative">
                <iframe
                  src="/Alihan_CENAN_CV.pdf#toolbar=1"
                  className="w-full h-full border-none"
                  title="Alihan CENAN Güncel CV PDF Görüntüleyici"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
