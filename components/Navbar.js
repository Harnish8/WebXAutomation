
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  // { label: 'Pricing', href: '/pricing' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white border-b ${scrolled
          ? 'shadow-md border-[rgba(115,44,124,0.1)]'
          : 'border-transparent'
          }`}
      > */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-[#12002F] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(67,23,95,1)] border-b border-[rgba(115,44,124,1)]'
          : 'bg-[#12002F] backdrop-blur-xl border-b border-[rgba(115,44,124,1)]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center py-3">

          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-2.5 cursor-pointer"
              whileHover={{ scale: 1.5 }}
            >
              <Image
                src="/logoal.png"
                alt="Webxautomation"
                width={130}
                height={130}
                className="object-contain scale-150 origin-center"
                priority
              />
              {/* <span className="text-xl md:text-2xl font-black text-[#1a0a2e] tracking-tighter font-headline leading-none">
                Webx<span style={{ color: '#732c7c' }}>automation</span>
              </span> */}
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 font-headline font-bold tracking-tight">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link key={link.label} href={link.href}>
                  <motion.span
                    className={`relative cursor-pointer transition-colors duration-300 text-sm font-bold ${isActive
                      ? 'text-[#FFFFFF]' // Color when active
                      : 'text-[#FFFFFF]/80 hover:text-[#D6008D]' // Dark blue base, Orange-Yellow on hover
                      }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#12002F] rounded-full"
                      />
                    )}
                  </motion.span>
                </Link>
              )
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block bg-gradient-to-r from-[#D6008D] to-[#D6008D] text-on-primary font-bold px-6 py-2.5 rounded-full text-sm glow-primary transition-all duration-300"
              >
                Get Started
              </motion.button>
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} className="block w-6 h-0.5 bg-[#43175f]" />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="block w-6 h-0.5 bg-[#43175f]" />
              <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} className="block w-6 h-0.5 bg-[#43175f]" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 px-6 glass-panel bg-white"
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
              <span className="text-2xl font-black text-[#1a0a2e] tracking-tighter font-headline">
                Webx<span style={{ color: '#732c7c' }}>automation</span>
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link href={link.href}>
                    <span className={`text-3xl font-headline font-black ${pathname === link.href ? 'text-primary' : 'text-[#1a0a2e]/80'}`}>
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Link href="/contact">
                  <button className="mt-4 bg-gradient-to-r from-[#D6008D] to-[#D6008D] text-on-primary font-bold px-8 py-3 rounded-full glow-primary text-lg">
                    Get Started
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
