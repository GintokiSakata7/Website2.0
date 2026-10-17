import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Majin Studios — Build. Create. Automate. Grow.',
    template: '%s | Majin Studios',
  },
  description:
    'Majin Studios is an independent digital studio engineering high-performance web applications, autonomous AI systems, high-converting digital marketing, and world-class brand creative.',
  keywords: [
    'Majin Studios',
    'Web Development',
    'AI Systems',
    'AI Agents',
    'Digital Marketing',
    'Paid Ads',
    'Meta Ads',
    'Google Ads',
    'Product Studio',
    'Custom Software',
    'Full-Stack Engineering',
    'Brand Identity',
    'Scanfeast',
    'Quantum Arena',
    'Hyderabad Software Studio',
  ],
  authors: [{ name: 'Majin Studios' }],
  creator: 'Majin Studios',
  metadataBase: new URL('https://www.majinstudios.tech'),
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.majinstudios.tech',
    title: 'Majin Studios — Build. Create. Automate. Grow.',
    description:
      'Digital products, custom software, AI systems, creative design and digital marketing from one independent studio.',
    siteName: 'Majin Studios',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Majin Studios — Build. Create. Automate. Grow.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Majin Studios — Build. Create. Automate. Grow.',
    description:
      'Build digital products, automate workflows, sharpen your brand, and run high-ROI digital marketing campaigns with Majin Studios.',
    images: ['/og-image.png'],
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
  applicationName: 'Majin Studios',
};

export const viewport: Viewport = {
  themeColor: '#f8faf8',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://www.majinstudios.tech/#website',
      name: 'Majin Studios',
      alternateName: 'Majin',
      url: 'https://www.majinstudios.tech/',
      publisher: {
        '@id': 'https://www.majinstudios.tech/#organization',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://www.majinstudios.tech/#organization',
      name: 'Majin Studios',
      url: 'https://www.majinstudios.tech/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.majinstudios.tech/logo.jpg',
        width: 1000,
        height: 1000,
      },
      image: 'https://www.majinstudios.tech/logo.jpg',
      description:
        'Majin Studios is an independent digital studio in Hyderabad, India, bringing websites, applications, custom software, AI systems, creative design and digital marketing together.',
      email: 'hello@majin.studio',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressCountry: 'India',
      },
      sameAs: [
        'https://www.linkedin.com/company/majin-studios',
        'https://www.instagram.com/majin_studios/',
      ],
    },
  ];

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#f8faf8] text-[#0a0e0c] antialiased selection:bg-[#00e676] selection:text-[#063d27]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}