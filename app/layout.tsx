import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import { Analytics } from '@vercel/analytics/next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

// Optimize font loading with critical subset
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'], // Only load needed weights
  fallback: ['system-ui', 'arial'] // Fast fallback fonts
})

export const metadata: Metadata = {
  title: 'Adarsh - Portfolio',
  description: 'A modern portfolio website showcasing my work, resume, GitHub, and LinkedIn',
  keywords: ['portfolio', 'developer', 'full stack', 'react', 'next.js'],
  authors: [{ name: 'Adarsh' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <head>
        {/* Critical resource hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//vercel.live" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/profile-picture.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/resume.pdf" as="fetch" crossOrigin="anonymous" />
        
        {/* Preconnect to font origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Performance hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={`bg-slate-900 text-slate-100 overflow-x-hidden ${inter.className}`}>
        <ScrollToTop />
        <Navbar />
        <main className="relative min-h-screen">{children}</main>
        <Footer />
        
        {/* Load analytics with optimal strategy */}
        <Script
          src="https://va.vercel-scripts.com/v1/script.debug.js"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  )
}