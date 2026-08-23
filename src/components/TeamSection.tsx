'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Linkedin, Mail, Sparkles } from 'lucide-react'

const teamMembers = [
  {
    name: 'Alihan CENAN',
    role: 'Kreatif Direktör & Kurucu',
    specialty: 'Grafik Tasarım, UI/UX & Next.js Mimarisi',
    avatarBg: 'bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500',
    avatarText: 'AC',
    email: 'cenanalihan@gmail.com',
    linkedin: 'https://www.linkedin.com/in/alihancenan',
  },
  {
    name: 'Canan CENAN',
    role: '3D Art Director & Render Uzmanı',
    specialty: '3D Ürün Modelleme & Fotogerçekçi Sahne',
    avatarBg: 'bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-500',
    avatarText: 'CC',
    email: 'cenanalihan@gmail.com',
    linkedin: 'https://www.linkedin.com/in/alihancenan',
  },
  {
    name: 'Emre K.',
    role: 'Motion Lead & Animasyon Uzmanı',
    specialty: '2D/3D Motion Graphics & Promo Jenerik',
    avatarBg: 'bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500',
    avatarText: 'EK',
    email: 'cenanalihan@gmail.com',
    linkedin: 'https://www.linkedin.com/in/alihancenan',
  },
]

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-32 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-card border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4"
          >
            <Users className="w-3.5 h-3.5" />
            <span>STÜDYO TAKIMIMIZ & UZMAN KADRO</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4"
          >
            Projelerinize Hayat Veren <br />
            <span className="text-gradient-cyan">Kreatif Ekip.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base leading-relaxed"
          >
            Tasarım disiplini, 3D görselleştirme ve yüksek mühendislik birikimiyle markanıza değer katan ekibimiz.
          </motion.p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl glass-panel border border-white/10 text-center group hover:border-cyan-400/40 transition-all duration-300 flex flex-col items-center"
            >
              {/* Stylized Cyber Avatar Photo Container */}
              <div className={`w-28 h-28 rounded-full ${member.avatarBg} p-1 shadow-[0_0_30px_rgba(0,240,255,0.25)] mb-6 group-hover:scale-105 transition-transform duration-300`}>
                <div className="w-full h-full rounded-full bg-[#08080c] flex items-center justify-center font-black text-2xl text-white tracking-wider border border-white/10">
                  {member.avatarText}
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-1">{member.name}</h3>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-3">{member.role}</span>
              
              <p className="text-white/60 text-xs leading-relaxed mb-6 font-light">
                {member.specialty}
              </p>

              <div className="flex items-center space-x-3 mt-auto">
                <a
                  href={`mailto:${member.email}`}
                  className="p-2.5 rounded-full glass-card text-white/70 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
                  title="E-Posta Gönder"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full glass-card text-white/70 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
                  title="LinkedIn Profili"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
