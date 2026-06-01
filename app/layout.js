import "./globals.css";
import Script from "next/script";
import { Manrope, Space_Grotesk } from "next/font/google"; // Next.js Font Engine
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import CustomCursor from "@/components/CustomCursor";
import CookieBanner from "@/components/CookieBanner";

// Configure Manrope globally
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// Configure Space Grotesk for Headings/Buttons
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  title: "Webxautomation | The Kinetic Aurora",
  description:
    "Advanced automation meets cutting-edge design. We build high-performance ecosystems that scale your business.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${manrope.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* Completely optimized Google Tag Manager - Defer loading for mobile speed */}
        <Script id="gtm" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P4X9GBB5');
          `}
        </Script>
      </head>
      <body className="bg-background text-on-surface font-body overflow-x-hidden noise">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P4X9GBB5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <AuroraBackground />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />

        {/* Smart reCAPTCHA Loader - Triggered only on user interaction */}
        <Script id="lazy-recaptcha" strategy="lazyOnload">
          {`
            function initRecaptchaOnInteraction() {
              if (window.grecaptchaScriptLoaded) return;
              window.grecaptchaScriptLoaded = true;
              
              const script = document.createElement('script');
              script.src = "https://www.google.com/recaptcha/api.js?render=6LfGJfMsAAAAALzd9Cj2zUOlnNVLahi0q-cswIPg";
              script.async = true;
              script.defer = true;
              document.head.appendChild(script);
              
              triggerEvents.forEach(e => window.removeEventListener(e, initRecaptchaOnInteraction));
            }
            const triggerEvents = ['mouseover', 'keydown', 'touchstart', 'scroll'];
            triggerEvents.forEach(e => window.addEventListener(e, initRecaptchaOnInteraction, { passive: true }));
          `}
        </Script>

        <CookieBanner />
      </body>
    </html>
  );
}
