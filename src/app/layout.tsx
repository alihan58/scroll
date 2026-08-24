import type { Metadata, Viewport } from 'next'
import './globals.css'
import { faqs } from '@/data/faqs'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050505',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://alihancenan1.vercel.app'),
  title: {
    default: 'Alihan CENAN — Grafik Tasarım Uzmanı & Kreatif Web Geliştirici',
    template: '%s | Alihan CENAN',
  },
  description:
    'Alihan CENAN resmi dijital portfolyosu. Kurumsal Kimlik, Logo Tasarımı, UI/UX Web Tasarımı, Motion Graphics, 3D Render, İnteraktif Scrollytelling ve Next.js Mimarisi. Kartal / İstanbul.',
  keywords: [
    'Alihan CENAN',
    'Alihan Cenan',
    'alihan cenan',
    'alihancenan1.vercel.app',
    'Grafik Tasarım Uzmanı Kartal',
    'Kreatif Web Geliştirici İstanbul',
    'UI/UX Tasarım',
    'Logo Tasarımı',
    'Kurumsal Kimlik',
    '3D Ürün Rendering',
    'Motion Graphics',
    'Sosyal Medya Tasarımı',
    'Next.js Portfolio',
    'Web Tasarım Türkiye',
    'Freelance Grafik Tasarımcı Kartal',
  ],
  authors: [{ name: 'Alihan CENAN', url: 'https://www.linkedin.com/in/alihancenan' }],
  creator: 'Alihan CENAN',
  publisher: 'Alihan CENAN',
  applicationName: 'Alihan CENAN Portfolyo',
  verification: {
    google: 'google-site-verification-code-placeholder',
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: 'https://alihancenan1.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Alihan CENAN — Grafik Tasarım Uzmanı & Kreatif Web Geliştirici',
    description:
      'Kurumsal Kimlik, UI/UX Web Tasarımı, 3D Render, Motion Graphics ve Yüksek Performanslı Next.js Dijital Deneyimleri. Kartal, İstanbul.',
    url: 'https://alihancenan1.vercel.app',
    siteName: 'Alihan CENAN Portfolyo',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: 'https://alihancenan1.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alihan CENAN — Grafik Tasarım Uzmanı & Kreatif Web Geliştirici',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alihan CENAN — Grafik Tasarım Uzmanı & Kreatif Web Geliştirici',
    description:
      'Kurumsal Kimlik, UI/UX Web Tasarımı, 3D Render, Motion Graphics ve Yüksek Performanslı Next.js Dijital Deneyimleri.',
    creator: '@alihancenan',
    images: ['https://alihancenan1.vercel.app/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // JSON-LD WebSite Schema for Google Sitelinks & #1 Search Ranking
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Alihan CENAN',
    alternateName: ['Alihan Cenan Portfolyo', 'Alihan CENAN Web'],
    url: 'https://alihancenan1.vercel.app',
  }

  // JSON-LD Person Schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alihan CENAN',
    jobTitle: 'Grafik Tasarım Uzmanı & Kreatif Web Geliştirici',
    url: 'https://alihancenan1.vercel.app',
    sameAs: [
      'https://www.linkedin.com/in/alihancenan',
      'https://github.com/alihan58',
    ],
    email: 'cenanalihan@gmail.com',
    telephone: '+90-539-407-9872',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kartal',
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
  }

  // JSON-LD LocalBusiness Schema (Home Office - Kartal, İstanbul)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Alihan CENAN — Grafik Tasarım & Web Geliştirme',
    image: 'https://alihancenan1.vercel.app/og-image.jpg',
    telephone: '+90-539-407-9872',
    email: 'cenanalihan@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Home Office',
      addressLocality: 'Kartal',
      addressRegion: 'İstanbul',
      postalCode: '34860',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.893264,
      longitude: 29.176466,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:30',
    },
    priceRange: '$$$',
  }

  // JSON-LD FAQPage Schema (5 SSS)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  // JSON-LD BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://alihancenan1.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Hizmetler',
        item: 'https://alihancenan1.vercel.app/#features',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Yetenekler',
        item: 'https://alihancenan1.vercel.app/#specs',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Vaka Çalışmaları',
        item: 'https://alihancenan1.vercel.app/#case-studies',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'İletişim',
        item: 'https://alihancenan1.vercel.app/#contact',
      },
    ],
  }

  return (
    <html lang="tr" className="dark scroll-smooth">
      <body className="bg-[#050505] text-white/90 antialiased selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
        {/* JSON-LD Rich Schemas inside body for Next.js App Router Hydration Safety */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {children}
      </body>
    </html>
  )
}
