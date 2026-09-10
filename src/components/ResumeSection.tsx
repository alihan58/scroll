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
} from 'lucide-react'

const educationList = [
  {
    period: '2024 - 2026',
    degree: 'Tezli Yüksek Lisans (Master)',
    school: 'İstanbul Gedik Üniversitesi',
    department: 'Görsel İletişim Tasarımı',
    badge: 'Devam Ediyor',
    description: 'Akademik göstergebilim, hareketli grafikler ve modern görsel iletişim kuramları üzerine tez çalışması.',
  },
  {
    period: '2020 - 2023',
    degree: 'Lisans',
    school: 'İstanbul Gedik Üniversitesi',
    department: 'Görsel İletişim Tasarımı',
    badge: 'Tamamlandı',
    description: 'Bitirme Projesi: "Barış Manço Şarkılarının AR (Artırılmış Gerçeklik) Yöntemiyle Afiş Olarak Yorumlanması".',
  },
  {
    period: '2018 - 2020',
    degree: 'Önlisans',
    school: 'Marmara Üniversitesi',
    department: 'Grafik Tasarımı',
    badge: 'Tamamlandı',
    description: 'Tipografi, kurumsal kimlik, ambalaj tasarımı, baskı teknikleri ve renk teorisi odaklı temel eğitim.',
  },
  {
    period: '2017',
    degree: 'Mesleki ve Teknik Lise',
    school: 'Yakacık Anadolu Teknik Lisesi',
    department: 'Bilişim Teknolojileri / Web Programcılığı Ana Dalı',
    badge: 'Mezuniyet',
    description: 'Web geliştirme, kodlama temelleri, veritabanı ve algoritma mimarisi.',
  },
]

const certifications = [
  {
    icon: Plane,
    title: 'İHA Sportif / Amatör Pilot Sertifikası',
    issuer: 'Sivil Havacılık Genel Müdürlüğü (SHGM)',
    detail: 'Profesyonel drone çekimleri, hava fotoğrafçılığı ve havadan video prodüksiyonu yetkisi.',
    color: 'from-cyan-500/20 to-blue-500/10',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  {
    icon: Target,
    title: 'Google ADS Search Sertifikası',
    issuer: 'Google Digital Academy',
    detail: 'Arama ağı reklamcılığı, veri analitiği, dönüşüm optimizasyonu ve ROI odaklı dijital kampanya yönetimi.',
    color: 'from-purple-500/20 to-pink-500/10',
    accent: 'text-purple-400',
    border: 'border-purple-500/30',
  },
  {
    icon: BookOpen,
    title: 'Kitap Bölümü Yazarlığı (Akademik Yayın)',
    issuer: 'Uluslararası Akademik Yayın',
    detail: '“Hitchcock Sinemasında Saul Bass İmzalı Grafik Eserlerin C. S. Peirce’ın Göstergebilim Modeli Bağlamında İncelenmesi”.',
    color: 'from-emerald-500/20 to-teal-500/10',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
  },
  {
    icon: FilmIcon,
    title: 'Akademik Tez Çalışması',
    issuer: 'Lisansüstü Tez Projesi',
    detail: '“Alfred Hitchcock Film Afişlerinin Göstergebilimsel Olarak Karşılaştırmalı Analizi ve Hareketlendirilmesi”.',
    color: 'from-pink-500/20 to-rose-500/10',
    accent: 'text-pink-400',
    border: 'border-pink-500/30',
  },
]

function FilmIcon(props: any) {
  return <Video {...props} />
}

const softwareSkills = [
  { name: 'Adobe Illustrator', level: 98, category: 'Vektör & Logo' },
  { name: 'Adobe Photoshop', level: 95, category: 'Görsel & Mockup' },
  { name: 'Figma / UI-UX', level: 94, category: 'Arayüz Tasarımı' },
  { name: 'Adobe InDesign', level: 90, category: 'Mizanpaj & Basım' },
  { name: 'Adobe After Effects', level: 88, category: 'Motion Graphics' },
  { name: 'Maxon Cinema 4D', level: 85, category: '3D Render & Modelleme' },
  { name: 'Adobe Premiere Pro', level: 90, category: 'Video Kurgu' },
  { name: 'WordPress & Web', level: 92, category: 'CMS & Geliştirme' },
  { name: 'Adobe Audition', level: 84, category: 'Ses Editörlüğü' },
  { name: 'Canva / Social', level: 95, category: 'Hızlı İçerik' },
  { name: 'Jamovi', level: 80, category: 'Veri & İstatistik' },
  { name: 'Final Cut Pro', level: 82, category: 'Post Prodüksiyon' },
]

const seminars = [
  { date: '11.05.2023', title: 'Gelenekselden Dijitale; Kültür mü? Kültürsüzlük mü?' },
  { date: '20.03.2023', title: 'CV Hazırlama ve Profesyonel Kariyer Eğitimi' },
  { date: '02.03.2023', title: 'Travma Sürecinde Çocuk Resimlerinin Analizi' },
  { date: '16.11.2022', title: 'Türkçe’yi Doğru Konuşma Sanatı ve Diksiyon' },
  { date: '23.11.2021', title: 'Grafik ve Görsel İletişim Tasarımında Tipografinin Gerekliliği ve Önemi' },
]

export const ResumeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'skills' | 'credentials' | 'seminars'>('education')

  return (
    <section id="resume" className="py-32 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with CV Download Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 pb-12 border-b border-white/10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>RESMİ ÖZGEÇMİŞ & AKADEMİK BİYOGRAFİ</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4"
            >
              Alihan CENAN — <br />
              <span className="text-gradient-cyan">Kreatif & Akademik Kimlik.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-base sm:text-lg leading-relaxed"
            >
              Kullanıcı odaklı, yaratıcı ve estetik tasarım çözümleri üretmeyi hedefleyen; web geliştirme, grafik tasarım, kullanıcı arayüz tasarımları ve dijital medya projelerinde yüksek sorumluluk alan görsel iletişim uzmanı.
            </motion.p>

            {/* Quick Meta Badges */}
            <div className="flex flex-wrap gap-3 mt-6 text-xs font-mono text-white/60">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-card border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Kartal / İstanbul</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-card border border-white/5">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>D.T: 15.12.1998</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-card border border-white/5">
                <Award className="w-3.5 h-3.5 text-pink-400" />
                <span>İngilizce (B1) • Askerlik Tecilli</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-card border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>2018 - 2026 Freelance Tasarım</span>
              </span>
            </div>
          </div>

          {/* Download Official CV Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <a
              href="/Alihan_CENAN_CV.pdf"
              download="Alihan_CENAN_CV_Ozgecmis.pdf"
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-extrabold text-xs font-mono uppercase tracking-wider hover:scale-105 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all group"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>RESMİ CV'Yİ İNDİR (PDF)</span>
            </a>
          </motion.div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-12">
          {[
            { id: 'education', label: 'Eğitim Hayatı', icon: GraduationCap },
            { id: 'credentials', label: 'Sertifikalar & Yayınlar', icon: Award },
            { id: 'skills', label: 'Beceriler & Araçlar', icon: Layers },
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
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.35)] scale-105'
                    : 'glass-card text-white/60 hover:text-white hover:border-white/20 border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {/* 1. Eğitim Tab */}
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

          {/* 2. Sertifikalar & Akademik Eserler Tab */}
          {activeTab === 'credentials' && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {certifications.map((cert, idx) => {
                const Icon = cert.icon
                return (
                  <div
                    key={idx}
                    className={`p-8 rounded-3xl glass-card border ${cert.border} transition-all duration-500 relative group overflow-hidden bg-black/40 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <div>
                      <div className="w-12 h-12 rounded-2xl glass-panel border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                        <Icon className={`w-6 h-6 ${cert.accent}`} />
                      </div>

                      <span className="font-mono text-[11px] uppercase tracking-widest text-white/40 block mb-2">
                        {cert.issuer}
                      </span>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-300 transition-colors">
                        {cert.title}
                      </h3>

                      <p className="text-white/70 text-sm leading-relaxed">
                        {cert.detail}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/5 flex items-center space-x-2 text-xs font-mono text-white/50">
                      <CheckCircle2 className={`w-4 h-4 ${cert.accent}`} />
                      <span>Resmi Doğrulanmış Kayıt</span>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}

          {/* 3. Beceriler & Araçlar Tab */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {softwareSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl glass-card border border-white/10 hover:border-cyan-400/40 transition-all bg-black/40 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-white text-base leading-tight">
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

                  {/* Level Progress Bar */}
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.05 }}
                      className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* 4. Seminerler Tab */}
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
    </section>
  )
}
