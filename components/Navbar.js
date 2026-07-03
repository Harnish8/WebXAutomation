"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);

  // Entry animation via mount state
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const focusable = mobileMenuRef.current?.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable?.length) focusable[0].focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        @keyframes navbar-enter {
          from { transform: translateY(-80px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .navbar-root {
          transform: translateY(0);
          opacity: 1;
          animation: navbar-enter 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .nav-link-underline {
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: #D6008D;
          border-radius: 999px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .nav-link-item.active .nav-link-underline { transform: scaleX(1); }
        .nav-link-item:hover .nav-link-underline { transform: scaleX(1); }
        /* Mobile menu slide */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 40;
          padding-top: 5rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          background: #12002F;
          transform: translateY(-100%);
          opacity: 0;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
        }
        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
        }
        .mobile-link {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.3s ease, transform 0.3s ease, color 0.2s;
        }
        .mobile-menu.open .mobile-link {
          opacity: 1;
          transform: translateX(0);
        }
        .mobile-menu.open .mobile-link:nth-child(1) { transition-delay: 0.05s; }
        .mobile-menu.open .mobile-link:nth-child(2) { transition-delay: 0.10s; }
        .mobile-menu.open .mobile-link:nth-child(3) { transition-delay: 0.15s; }
        .mobile-menu.open .mobile-link:nth-child(4) { transition-delay: 0.20s; }
        .mobile-menu.open .mobile-link:nth-child(5) { transition-delay: 0.25s; }
        .mobile-menu.open .mobile-link:nth-child(6) { transition-delay: 0.30s; }
        .mobile-menu.open .mobile-cta { transition-delay: 0.35s; opacity: 1; transform: translateX(0); }
        .mobile-cta {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        /* Hamburger bars */
        .ham-bar {
          display: block;
          width: 1.5rem;
          height: 2px;
          background: #ffffff;
          border-radius: 999px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .ham-open .bar-1 { transform: rotate(45deg) translate(5px, 5px); }
        .ham-open .bar-2 { opacity: 0; }
        .ham-open .bar-3 { transform: rotate(-45deg) translate(5px, -5px); }
      `}</style>

      <nav
        className={`navbar-root fixed top-0 w-full z-50 transition-all duration-500 bg-[#12002F] backdrop-blur-xl border-b border-[rgba(115,44,124,1)] ${mounted ? "navbar-mounted" : ""} ${scrolled ? "shadow-[0_8px_32px_0_rgba(67,23,95,0.6)]" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" aria-label="Webxautomation home">
            <div className="flex items-center gap-2.5 cursor-pointer transition-transform duration-300 hover:scale-105 origin-left">
              <Image
                src="/logoal.png"
                alt="Webxautomation logo"
                width={130}
                height={130}
                className="object-contain scale-150 origin-center"
                priority
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 font-headline font-bold tracking-tight" role="menubar">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.label} href={link.href} role="menuitem">
                  <span
                    className={`nav-link-item relative cursor-pointer text-sm font-bold transition-colors duration-300 ${isActive ? "text-white active" : "text-white/80 hover:text-[#D6008D]"}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    <span className="nav-link-underline" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link href="/contact">
              <button
                className="hidden md:block bg-gradient-to-r from-[#D6008D] to-[#D6008D] text-white font-bold px-6 py-2.5 rounded-full text-sm glow-primary transition-all duration-300 hover:scale-105 hover:opacity-90"
                aria-label="Get started with Webxautomation"
              >
                Get Started
              </button>
            </Link>

            {/* Hamburger */}
            <button
              className={`md:hidden flex flex-col gap-1.5 p-2 ${mobileOpen ? "ham-open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span className="ham-bar bar-1" />
              <span className="ham-bar bar-2" />
              <span className="ham-bar bar-3" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`mobile-menu ${mobileOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Logo inside mobile menu */}
        <div className="flex items-center gap-3 mb-8 mt-4">
          <Image
            src="/without_bg.png"
            alt="Webxautomation"
            width={44}
            height={44}
            className="object-contain"
          />
          <span className="text-2xl font-black text-white tracking-tighter font-headline">
            Webx<span style={{ color: "#D6008D" }}>automation</span>
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <div key={link.label} className="mobile-link">
              <Link href={link.href}>
                <span
                  className={`text-3xl font-headline font-black transition-colors duration-200 ${pathname === link.href ? "text-[#D6008D]" : "text-white/80 hover:text-white"}`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </span>
              </Link>
            </div>
          ))}
          <div className="mobile-cta">
            <Link href="/contact">
              <button
                className="mt-4 bg-gradient-to-r from-[#D6008D] to-[#D6008D] text-white font-bold px-8 py-3 rounded-full text-lg hover:opacity-90 transition-opacity"
                aria-label="Get started with Webxautomation"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
