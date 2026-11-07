import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fireworks-plum.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'IGNIS Fireworks Hyderabad | Wholesale Diwali Price List 2026',
  description: 'Hyderabad wholesale firecrackers depot with direct Sivakasi factory pricing, express delivery across Telangana & Andhra Pradesh, and instant WhatsApp booking.',
  openGraph: {
    title: 'IGNIS Fireworks Hyderabad | Wholesale Diwali Price List 2026',
    description: 'Hyderabad wholesale firecrackers depot with direct Sivakasi factory pricing, express delivery across Telangana & Andhra Pradesh, and instant WhatsApp booking.',
    url: siteUrl,
    siteName: 'IGNIS Fireworks Hyderabad',
    images: [
      {
        url: '/og-square.png',
        width: 800,
        height: 800,
        alt: 'IGNIS Fireworks Hyderabad',
      },
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'IGNIS Fireworks Hyderabad Wholesale Depot',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IGNIS Fireworks Hyderabad | Wholesale Diwali Price List 2026',
    description: 'Direct Sivakasi wholesale firecrackers depot in Hyderabad. Express delivery across Telangana & AP.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-clip max-w-full">
      <body className="bg-white text-slate-900 min-h-screen antialiased selection:bg-[#B91C1C] selection:text-white overflow-x-clip max-w-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
