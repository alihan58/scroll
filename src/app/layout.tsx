import type { Metadata } from 'next'
import './globals.css'
import { faqs } from '@/data/faqs'

export const metadata: Metadata = {
  metadataBase: new URL('https://alihancenan.com'),
  title: {
    default: 'Alihan CENAN — Grafik Tasarım Uzmanı & Kreatif Web Geliştirici (Kartal, İstanbul)',
    template: '%s | Alihan CENAN',
  },
  description:
    'Alihan CENAN resmi portfolyosu. Kurumsal Kimlik, Logo Tasarımı, UI/UX Web Tasarımı, Motion Graphics, 3D Render, İnteraktif Scrollytelling ve Next.js Mimarisi. Home Office - Kartal / İstanbul.',
  keywords: [
    'Alihan CENAN',
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
  verification: {
    google: 'google-site-verification-code-placeholder',
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
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
      'Kurumsal Kimlik, UI/UX Web Tasarımı, 3D Render, Motion Graphics ve Yüksek Performanslı Next.js Dijital Deneyimleri. Home Office - Kartal, İstanbul.',
    url: 'https://alihancenan.com',
    siteName: 'Alihan CENAN Portfolyo',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alihan CENAN — Grafik Tasarım Uzmanı & Kreatif Web Geliştirici',
    description:
      'Kurumsal Kimlik, UI/UX Web Tasarımı, 3D Render, Motion Graphics ve Yüksek Performanslı Next.js Dijital Deneyimleri.',
    creator: '@alihancenan',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // JSON-LD Person Schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alihan CENAN',
    jobTitle: 'Grafik Tasarım Uzmanı & Kreatif Web Geliştirici',
    url: 'https://alihancenan.com',
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
    name: 'Alihan CENAN — Grafik Tasarım & Web Geliştirme (Home Office)',
    image: 'https://alihancenan.com/og-image.jpg',
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
        item: 'https://alihancenan.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Hizmetler',
        item: 'https://alihancenan.com/#features',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Yetenekler',
        item: 'https://alihancenan.com/#specs',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Vaka Çalışmaları',
        item: 'https://alihancenan.com/#case-studies',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'İletişim',
        item: 'https://alihancenan.com/#contact',
      },
    ],
  }

  return (
    <html lang="tr" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Rich Schemas */}
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
      </head>
      <body className="bg-[#050505] text-white/90 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  )
}
