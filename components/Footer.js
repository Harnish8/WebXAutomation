"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    url: "https://www.facebook.com/webxautomation",
    hoverColor: "#1877F2",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    url: "https://linkedin.com/in/yourlink",
    hoverColor: "#0A66C2",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp />,
    url: "https://wa.me/yournumber",
    hoverColor: "#25D366",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    url: "https://www.instagram.com/webxautomation?igsh=MWtjZGQ1czUwMWpvbA==",
    hoverColor: "#C13584",
  },
];

const footerLinks = {
  Ecosystem: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ],
};

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-social-icon {
          transition: transform 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .footer-social-icon:hover {
          transform: scale(1.12);
        }
        .footer-link {
          position: relative;
          display: inline-block;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .footer-link:hover {
          color: #732c7c;
          transform: translateX(4px);
        }
      `}</style>

      <footer
        className="relative bg-[#faf7fd] border-t border-[rgba(115,44,124,0.08)] pt-20 pb-10 overflow-hidden"
        aria-label="Site footer"
      >
        {/* Decorative top gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" aria-label="Webxautomation home">
                <div className="flex items-center gap-3 mb-5 cursor-pointer transition-transform duration-300 hover:scale-105 origin-left">
                  <Image
                    src="/logo.png"
                    alt="Webxautomation"
                    width={130}
                    height={130}
                    className="object-contain"
                  />
                </div>
              </Link>
              <p className="text-sm text-[#4B0082] leading-relaxed mb-6">
                Defining the frontier of technical elegance and digital
                automation. The Kinetic Aurora.
              </p>
              <div className="flex gap-3" role="list" aria-label="Social media links">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label={`Visit Webxautomation on ${social.name}`}
                    className="footer-social-icon w-9 h-9 rounded-full border border-[#4B0082] flex items-center justify-center text-[#4B0082] hover:border-current"
                    style={{ '--hover-color': social.hoverColor }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = social.hoverColor;
                      e.currentTarget.style.borderColor = social.hoverColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                      e.currentTarget.style.borderColor = "";
                    }}
                  >
                    <span className="text-lg" aria-hidden="true">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[#12002F] font-headline font-bold mb-6 text-sm">
                  {title}
                </h4>
                <ul className="space-y-3" role="list">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}>
                        <span className="footer-link text-[#4B0082] text-sm cursor-pointer">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-[rgba(115,44,124,0.08)] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#4B0082]">
              © {new Date().getFullYear()} Webxautomation. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              <span className="text-xs text-[#4B0082] uppercase tracking-widest font-bold">
                contact@webxautomation.in
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
