import { TopBanner } from '@/components/TopBanner'
import { Header } from '@/components/header'
import { ScrollytellingSection } from '@/components/scrollytelling-section'
import FeatureGrid from '@/components/FeatureGrid'
import { CaseStudies } from '@/components/CaseStudies'
import InteractiveAudioVisualizer from '@/components/InteractiveAudioVisualizer'
import TechSpecs from '@/components/TechSpecs'
import { FAQSection } from '@/components/FAQSection'
import { GoogleMapSection } from '@/components/GoogleMapSection'
import { Footer } from '@/components/footer'
import { StickyPhoneCTA } from '@/components/StickyPhoneCTA'
import { CustomAlienCursor } from '@/components/CustomAlienCursor'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 selection:text-cyan-200 relative lg:cursor-none">
      {/* Custom Retro 8-Bit Alien Head Cursor */}
      <CustomAlienCursor />

      {/* Top CTA Announcement Ribbon */}
      <TopBanner />

      {/* Floating Navigation Header */}
      <Header />

      {/* Hero 60fps Scrollytelling Pinned Canvas */}
      <ScrollytellingSection />

      {/* Graphic Design & Visual Services */}
      <FeatureGrid />

      {/* Portfolio Case Studies */}
      <CaseStudies />

      {/* 8-Bit Cyber Pong VS Computer Arcade Game */}
      <InteractiveAudioVisualizer />

      {/* Tech Stack & Design Tools */}
      <TechSpecs />

      {/* 5 SSS Accordion & FAQPage Schema */}
      <FAQSection />

      {/* Google Maps Embed & Office Location (Kartal, İstanbul - Home Office) */}
      <GoogleMapSection />

      {/* Footer & Signature */}
      <Footer />

      {/* Sticky Floating Mobile Phone & WhatsApp CTA */}
      <StickyPhoneCTA />
    </main>
  )
}
