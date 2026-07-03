import "./globals.css";
import Script from "next/script";
import { Manrope, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import CustomCursor from "@/components/CustomCursor";
import CookieBanner from "@/components/CookieBanner";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/* ── Root SEO Metadata ── */
export const metadata = {
  metadataBase: new URL("https://webxautomation.in"),
  title: {
    default: "Webxautomation | AI-Powered Digital Marketing Agency",
    template: "%s | Webxautomation",
  },
  description:
    "Full-service digital marketing & AI automation agency. Social media marketing, SEO, PPC, branding, web design & video production — all powered by intelligent automation.",
  keywords: [
    "digital marketing agency",
    "AI automation agency",
    "SEO agency",
    "PPC management",
    "social media marketing",
    "web design agency",
    "AI marketing",
    "brand growth",
  ],
  authors: [{ name: "Webxautomation" }],
  creator: "Webxautomation",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://webxautomation.in",
    siteName: "Webxautomation",
    title: "Webxautomation | AI-Powered Digital Marketing Agency",
    description:
      "We combine proven marketing expertise with cutting-edge AI automation to build sustainable growth systems for your brand.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Webxautomation — Digital Growth & AI Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webxautomation | AI-Powered Digital Marketing Agency",
    description: "Full-service digital marketing & AI automation agency.",
    creator: "@webxautomation",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://webxautomation.in",
  },
  verification: {
    // google: 'your-google-search-console-token',
  },
};

/* ── JSON-LD Organization Schema ── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Webxautomation",
  url: "https://webxautomation.in",
  logo: "https://webxautomation.in/logoal.png",
  description:
    "Full-service digital marketing & AI automation agency helping businesses grow smarter.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@webxautomation.in",
    contactType: "customer service",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.facebook.com/webxautomation",
    "https://www.instagram.com/webxautomation",
    "https://linkedin.com/company/webxautomation",
  ],
  serviceType: [
    "Social Media Marketing",
    "SEO & Content Marketing",
    "Paid Ads PPC",
    "Branding & Creative Design",
    "Web Design & Development",
    "Video Production",
    "AI Automation",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Webxautomation",
  url: "https://webxautomation.in",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://webxautomation.in/?s={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Preconnect for hero image CDN */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Google Tag Manager — deferred, does not block render */}
        <Script id="gtm" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-P4X9GBB5'}');
          `}
        </Script>
      </head>

      <body className="bg-background text-on-surface font-body overflow-x-hidden noise">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-P4X9GBB5'}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        {/* Accessibility: skip link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <AuroraBackground />
        <CustomCursor />
        <Navbar />

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <Footer />

        {/* reCAPTCHA — loaded only on user interaction */}
        <Script id="lazy-recaptcha" strategy="lazyOnload">
          {`
            function initRecaptchaOnInteraction() {
              if (window.grecaptchaScriptLoaded) return;
              window.grecaptchaScriptLoaded = true;
              const script = document.createElement('script');
              script.src = "https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LfGJfMsAAAAALzd9Cj2zUOlnNVLahi0q-cswIPg'}";
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
