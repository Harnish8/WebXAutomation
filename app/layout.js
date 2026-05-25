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
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-RFRFMHN88Z`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RFRFMHN88Z');
          `}
        </Script>
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      <body className="bg-background text-on-surface font-body overflow-x-hidden noise">
        <AuroraBackground />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* reCAPTCHA v3 */}
        <Script
          src="https://www.google.com/recaptcha/api.js?render=6LfGJfMsAAAAALzd9Cj2zUOlnNVLahi0q-cswIPg"
          strategy="afterInteractive"
        />
        <CookieBanner />
      </body>
    </html>
  )
}


