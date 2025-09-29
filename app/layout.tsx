import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

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
    <html lang="en" className="dark">
      <body className="bg-slate-900 text-slate-100 overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        <main className="relative min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}