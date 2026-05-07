import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.local';
const ANALYTICS_DOMAIN = process.env.NEXT_PUBLIC_ANALYTICS_ID;

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Portfolio | Product Designer and Engineer',
    template: '%s | Portfolio',
  },
  description:
    'I design and build fast, accessible digital products with strong UX and engineering foundations.',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Portfolio | Product Designer and Engineer',
    description:
      'I design and build fast, accessible digital products with strong UX and engineering foundations.',
    images: [
      {
        url: `${SITE_URL}/images/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: 'Portfolio Open Graph Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col`}>
        {ANALYTICS_DOMAIN ? (
          <Script
            defer
            data-domain={ANALYTICS_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
