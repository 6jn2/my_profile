import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Admin Panel | Mohammed Mojib',
  robots: { index: false, follow: false }, // Hide from search engines
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" toastOptions={{ style: { background:'#111118', color:'#f8fafc', border:'1px solid #1e1e2e' } }} />
      </body>
    </html>
  )
}
