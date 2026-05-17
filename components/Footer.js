

'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'Facebook',
    icon: <FaFacebookF />,
    url: 'https://www.facebook.com/webxautomation',
    color: 'hover:text-[#1877F2]'
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedinIn />,
    url: 'https://linkedin.com/in/yourlink',
    color: 'hover:text-[#0A66C2]'
  },
  {
    name: 'WhatsApp',
    icon: <FaWhatsapp />,
    url: 'https://wa.me/yournumber',
    color: 'hover:text-[#25D366]'
  },
  {
    name: 'Instagram',
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/webxautomation?igsh=MWtjZGQ1czUwMWpvbA==',
    color: 'hover:text-[#C13584]'
  },
];

const footerLinks = {
  Ecosystem: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
  // Company: [
  //   { label: 'Website Design', href: '/services/website-design' },
  //   { label: 'SEO Optimization', href: '/services/seo' },
  //   { label: 'Workflow Automation', href: '/services/ai-automation' },
  //   { label: 'CRM Integration', href: '/services/crm-integration' },
  // ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
    // { label: 'Pricing', href: '/pricing' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-[#faf7fd] border-t border-[rgba(115,44,124,0.08)] pt-20 pb-10 overflow-hidden">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <motion.div
                className="flex items-center gap-3 mb-5 cursor-pointer"
                whileHover={{ scale: 1.5 }}
              >
                <Image
                  src="/logo.png"
                  alt="Webxautomation"
                  width={130}
                  height={130}
                  className="object-contain"
                />
                {/* <span className="text-xl font-black text-white font-headline tracking-tighter leading-none">
                  Webx<span style={{ color: '#732c7c' }}>automation</span>
                </span> */}
              </motion.div>
            </Link>
            <p className="text-sm text-[#4B0082] leading-relaxed mb-6">
              Defining the frontier of technical elegance and digital automation. The Kinetic Aurora.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 rounded-full glass-panel border border-[#4B0082] flex items-center justify-center text-[#4B0082] transition-colors duration-300 ${social.color} hover:border-current`}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[#12002F] font-headline font-bold mb-6 text-sm">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <motion.span
                        whileHover={{ x: 4 }}
                        className="text-[#4B0082] hover:text-primary text-sm transition-colors inline-block cursor-pointer"
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[rgba(115,44,124,0.08)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#4B0082]">© 2025 Webxautomation. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-[#4B0082] uppercase tracking-widest font-bold">contact@webxautomation.in</span>
          </div>
        </div>
      </div>
    </footer>
  )
}