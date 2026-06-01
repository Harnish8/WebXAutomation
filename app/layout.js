import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import CustomCursor from "@/components/CustomCursor";
import CookieBanner from "@/components/CookieBanner";

export const metadata = {
  title: "Webxautomation | The Kinetic Aurora",
  description:
    "Advanced automation meets cutting-edge design. We build high-performance ecosystems that scale your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

        <Script id="gtm" strategy="beforeInteractive">
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
        {/* reCAPTCHA v3 */}
        {/* <Script
          src="https://www.google.com/recaptcha/api.js?render=6LfGJfMsAAAAALzd9Cj2zUOlnNVLahi0q-cswIPg"
          strategy="afterInteractive"
        /> */}
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
              
              // Clean up event listeners once initialized
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
