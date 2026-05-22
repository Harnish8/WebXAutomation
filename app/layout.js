import './globals.css'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuroraBackground from '@/components/AuroraBackground'
import CustomCursor from '@/components/CustomCursor'
import CookieBanner from '@/components/CookieBanner'

export const metadata = {
  title: 'Webxautomation | The Kinetic Aurora',
  description: 'Advanced automation meets cutting-edge design. We build high-performance ecosystems that scale your business.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-on-surface font-body overflow-x-hidden noise">
        <AuroraBackground />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
