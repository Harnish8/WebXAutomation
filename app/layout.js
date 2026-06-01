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

        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
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
  );
}
