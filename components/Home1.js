'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import StackingCards from '@/components/StackingCards'

const services = [
  { icon: 'table_chart', title: 'Website Design', desc: 'Immersive UI/UX that prioritizes emotional resonance and flawless technical execution.', tags: ['Interactive', 'Immersive'], color: 'primary', span: 'md:col-span-8' },
  { icon: 'rocket_launch', title: 'SEO Mastery', desc: 'Command the digital landscape. We optimize for algorithms while designing for humans.', color: 'secondary', span: 'md:col-span-4' },
  { icon: 'campaign', title: 'Marketing', desc: 'Strategic narrative-driven campaigns that spark viral interest and sustainable growth.', color: 'primary', span: 'md:col-span-4' },
  { icon: 'terminal', title: 'Advanced Web Dev', desc: 'Scalable architecture meets fluid front-end. We build the infrastructure of tomorrow.', color: 'secondary', span: 'md:col-span-8', trusted: true },
]

const testimonials = [
  { quote: "Webxautomation didn't just build a site; they built a digital sensory experience. Our engagement spiked 300% within weeks.", name: 'Marcus Thorne', role: 'CEO, Zenith Media' },
  { quote: "The automation workflows they implemented saved us 40 hours a week. It's like having a superhuman workforce.", name: 'Sienna Vance', role: 'Founder, Nova Labs', featured: true },
  { quote: 'Technically flawless. Their code is poetry, and their design is pure kinetic energy. Highly recommended.', name: 'Julian Rossi', role: 'CTO, PulseTech' },
]

const marqueeItems = ['Website Design', 'SEO Mastery', 'AI Automation', 'Digital Marketing', 'Web Development', 'CRM Integration', 'Email Sequences', 'Social Media']

const PROCESS = [
  { num: '01', icon: 'search', title: 'Discovery', desc: 'Deep audit of your brand, goals, and technical landscape.' },
  { num: '02', icon: 'architecture', title: 'Architect', desc: 'We blueprint your digital ecosystem with precision and intent.' },
  { num: '03', icon: 'code', title: 'Build', desc: 'Pixel-perfect execution with cutting-edge tech stack.' },
  { num: '04', icon: 'rocket_launch', title: 'Launch', desc: 'Deploy, optimize, and scale with ongoing support.' },
]

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="relative">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 aurora-bg overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(172,137,255,0.3) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
          {/* Left */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-highest border border-outline-variant/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary mr-3 animate-pulse" style={{ boxShadow: '0 0 8px #FF009A' }} />
              <span className="text-xs font-bold font-headline uppercase tracking-widest text-primary">Next Gen Automation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-headline font-black text-white leading-[0.9] tracking-tighter mb-8"
            >
              The Only{' '}
              <span className="gradient-text glow-text">
                Digital Partner
              </span>{' '}
              You&apos;ll Ever Need
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-on-surface-variant max-w-xl mb-12 leading-relaxed"
            >
              We fuse technical precision with high-velocity aesthetics to build digital ecosystems that breathe, move, and convert.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-primary-dim text-on-primary text-base md:text-lg font-bold px-8 py-4 rounded-full glow-primary flex items-center gap-2 group"
                >
                  Launch Project
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-panel text-white border border-outline-variant/20 text-base md:text-lg font-bold px-8 py-4 rounded-full hover:bg-surface-variant/40 transition-all"
              >
                View Showreel
              </motion.button>
            </motion.div>
          </div>

          {/* Right – Hero Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, rotate: 6, scale: 0.9 }}
              animate={{ opacity: 1, rotate: 3, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden glass-panel border border-outline-variant/20 shadow-2xl group transition-all duration-700"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent z-10" />
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="w-full h-full bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-highest flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[8rem] text-primary/20">hub</span>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
              {/* Live metric card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-8 left-6 right-6 p-5 glass-panel rounded-2xl border border-[rgba(115,44,124,0.12)] z-30"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-primary font-bold font-headline uppercase tracking-tighter mb-1">Live Metric</p>
                    <p className="text-2xl font-black text-white">+420% Growth</p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-4xl">insights</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#4a3560]/40"
        >
          <span className="text-xs font-headline uppercase tracking-widest">Scroll</span>
          <span className="material-symbols-outlined">expand_more</span>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-6 bg-primary/5 border-y border-primary/10 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-4 text-sm font-headline font-bold uppercase tracking-widest text-[#4a3560]/50">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES BENTO ── */}
      <section className="py-24 md:py-32 px-6 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-16 md:mb-20">
              <p className="text-primary font-headline font-bold tracking-widest uppercase text-xs md:text-sm mb-4">Core Capabilities</p>
              <h2 className="text-4xl md:text-5xl font-headline font-black text-white max-w-2xl leading-tight">
                Engineered for Velocity, Designed for Impact.
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {services.map((svc, i) => (
              <FadeIn key={svc.title} delay={i * 0.1} className={`${svc.span}`}>
                <motion.div
                  whileHover={{ scale: 1.02, borderColor: svc.color === 'primary' ? 'rgba(255,0,154,0.4)' : 'rgba(172,137,255,0.4)' }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel p-8 md:p-10 rounded-[2rem] border border-outline-variant/10 h-full flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <span className={`material-symbols-outlined text-${svc.color} text-4xl md:text-5xl mb-6 block`}>{svc.icon}</span>
                    <h3 className="text-2xl md:text-3xl font-headline font-black text-white mb-4">{svc.title}</h3>
                    <p className="text-on-surface-variant max-w-md text-sm md:text-base">{svc.desc}</p>
                  </div>
                  {svc.tags && (
                    <div className="mt-8 flex flex-wrap gap-3">
                      {svc.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 rounded-full bg-surface-container-high text-xs font-bold text-on-surface-variant border border-outline-variant/20 uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                  )}
                  {svc.trusted && (
                    <div className="mt-8 flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {['bg-primary-container', 'bg-secondary-container', 'bg-surface-container-highest'].map((c, j) => (
                          <div key={j} className={`w-10 h-10 rounded-full border-2 border-background ${c}`} />
                        ))}
                      </div>
                      <span className="text-sm text-on-surface-variant">Trusted by 200+ Developers</span>
                    </div>
                  )}
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 px-5 md:px-10 relative">
        <div className="neon-line absolute top-0 inset-x-0" />
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="font-headline font-bold tracking-widest uppercase text-xs mb-3" style={{ color: '#732c7c' }}>How We Work</p>
            <h2 className="font-headline font-black" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#1a0a2e' }}>Our Kinetic Process</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PROCESS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.12}>
                <motion.div whileHover={{ y: -8, scale: 1.02 }} className="glass-card rounded-2xl p-8 text-center relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-headline font-black" style={{ background: '#732c7c', color: '#fff' }}>{step.num}</div>
                  <span className="material-symbols-outlined text-4xl mt-4 mb-4 block" style={{ color: '#732c7c' }}>{step.icon}</span>
                  <h3 className="font-headline font-black text-lg mb-2" style={{ color: '#1a0a2e' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4a3560' }}>{step.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      {/* <section className="py-20 px-6 md:px-10 bg-surface-container-low/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '99.9%', label: 'Core Web Vital Score', color: 'text-primary' },
            { value: '40ms', label: 'Avg. Server Response', color: 'text-secondary' },
            { value: '250+', label: 'Automations Deployed', color: 'text-tertiary' },
            { value: '12x', label: 'Growth Multiplier', color: 'text-white' },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.05 }} className="text-center p-6">
                <p className={`text-4xl md:text-5xl font-headline font-black ${stat.color} mb-2`}>{stat.value}</p>
                <p className="text-on-surface-variant font-medium text-xs uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section> */}

      {/* ── STACKING CARDS ── */}
      {/* <StackingCards /> */}

      {/* ── TESTIMONIALS ── */}
      {/* <section className="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16 md:mb-24">
            <p className="text-primary font-headline font-bold tracking-widest uppercase text-sm mb-4">Client Echoes</p>
            <h2 className="text-4xl md:text-5xl font-headline font-black text-white">The Kinetic Impact</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`glass-panel p-8 rounded-3xl border h-full ${t.featured ? 'border-primary/20 bg-primary/5' : 'border-outline-variant/10'}`}
                >
                  <div className="flex gap-1 text-primary mb-6">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-base md:text-lg text-white/80 italic mb-8 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold font-headline">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-white font-headline">{t.name}</p>
                      <p className="text-xs text-on-surface-variant uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── CTA ── */}
      <section className="py-20 md:py-32 px-6 md:px-10">
        <FadeIn>
          <div className="max-w-7xl mx-auto glass-panel rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 border border-outline-variant/20 relative overflow-hidden text-center">
            <div className="absolute inset-0 aurora-bg-2 opacity-30" />
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl md:text-7xl font-headline font-black text-white mb-6 md:mb-8 tracking-tighter"
              >
                Ready to ignite your{' '}
                <span className="text-primary">digital edge?</span>
              </motion.h2>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 md:mb-12">
                Stop settling for static. Start evolving with the speed of technical precision.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-primary-dim text-on-primary text-lg md:text-xl font-bold px-10 md:px-12 py-4 md:py-5 rounded-full glow-primary"
                >
                  Book a Strategy Session
                </motion.button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
