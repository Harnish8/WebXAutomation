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

        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          strategy="afterInteractive"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="69fc2d1801f21cd7bca225fd"
        />


        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
