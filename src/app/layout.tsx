import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'IGNIS Fireworks Hyderabad | Wholesale Diwali Price List 2026',
  description: 'Hyderabad wholesale firecrackers depot with direct Sivakasi factory pricing, express delivery across Telangana & Andhra Pradesh, and instant WhatsApp booking.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
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
