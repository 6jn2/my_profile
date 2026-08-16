import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import PageLoader from '@/components/ui/PageLoader'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Mohammed Mojib | Flutter Developer',
  description: 'Professional Flutter Developer specializing in mobile app development, modern UI design, APIs, Firebase, Laravel and MySQL.',
  keywords: 'Flutter Developer, Mobile App Developer, Flutter Yemen, Mohammed Mojib, Dart, Laravel',
  authors: [{ name: 'Mohammed Mojib Numan Mahyoob' }],
  openGraph: {
    title: 'Mohammed Mojib | Flutter Developer',
    description: 'Professional Flutter Developer specializing in mobile app development.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Mojib | Flutter Developer',
    description: 'Professional Flutter Developer specializing in mobile app development.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050510',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <PageLoader />
        <CustomCursor />
        <ScrollProgress />
        <div id="scroll-progress" />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: 'rgba(13,13,26,0.95)',
              color: '#f8fafc',
              border: '1px solid rgba(0,212,255,0.2)',
              backdropFilter: 'blur(16px)',
              fontSize: '0.875rem',
              maxWidth: '90vw',
            },
          }}
        />
      </body>
    </html>
  )
}
