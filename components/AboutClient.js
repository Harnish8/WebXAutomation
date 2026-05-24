
'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const STATS = [
    { val: '120+', label: 'Projects Delivered', color: '#D6008D' },
    { val: '40+', label: 'Hrs Saved Per Client', color: '#D6008D' },
    { val: '98%', label: 'Client Retention', color: '#D6008D' },
    { val: '3×', label: 'Avg ROI Multiplier', color: '#D6008D' },
]

const VALUES = [
    { icon: 'bolt', title: 'Velocity First', desc: 'We ship fast, iterate faster. Speed is a strategic advantage we bake into every engagement.' },
    { icon: 'architecture', title: 'Systems Thinking', desc: 'We build ecosystems, not pages. Every component is designed to scale with your business.' },
    { icon: 'auto_fix_high', title: 'AI-Augmented', desc: 'We do not just use AI as a buzzword. Our workflows are genuinely powered by intelligent automation.' },
    { icon: 'fingerprint', title: 'Brand Precision', desc: 'Identity is sacred. We craft visuals and copy that feel unmistakably yours, nothing off-the-shelf.' },
    { icon: 'handshake', title: 'True Partnership', desc: 'You get a dedicated team that treats your growth as their own KPI, not a line item on an invoice.' },
    { icon: 'visibility', title: 'Full Transparency', desc: 'No black boxes. You see exactly what we build, why we built it, and what it is driving for you.' },
]

const VALUES1 = [
    { num: '01', title: 'Growth Should Be Sustainable', desc: 'We\'re not interested in quick wins that fade. Every strategy we build is designed for the long run creating momentum that compounds over time and delivers returns that grow stronger the further you go.' },
    { num: '02', title: 'Automation Should Serve People', desc: 'AI and automation are powerful tools but they work best when guided by human understanding and empathy. We use intelligent systems to handle the heavy lifting, so our team can focus on what matters most: your goals, your audience, and your story.' },
    { num: '03', title: 'Transparency Builds Trust', desc: 'We believe great partnerships are built on honesty. You\'ll always know what we\'re working on, why we\'re doing it, and what it\'s delivering. Our reporting is clear, our communication is open, and we\'ll always tell you the truth.' },
    { num: '04', title: 'Every Brand Deserves Craft', desc: 'Whether you\'re a small business finding your voice or an established brand refining it, we bring the same level of care and attention to every project. Great work isn\'t reserved for big budgets it\'s a standard we hold for every client we work with.' },
    { num: '05', title: 'Partnership Over Transactional', desc: 'We don\'t think of ourselves as a vendor. We show up as a genuine partner invested in your success, curious about your challenges, and committed to being the kind of team you\'re genuinely glad to have in your corner.' },
]

const JOURNEY = [
    {
        year: '2019',
        title: 'The Genesis',
        sub: 'First client, zero excuses',
        desc: 'Started in a tiny workspace with one laptop and an obsession with making things that actually work not just look pretty.',
        icon: 'rocket_launch',
    },
    {
        year: '2021',
        title: 'The Expansion',
        sub: 'Automation enters the picture',
        desc: 'Unlocked the power of AI workflows Make.com, Zapier, OpenAI and began wiring digital systems that genuinely save businesses hundreds of hours.',
        icon: 'hub',
    },
    {
        year: '2022',
        title: 'The Studio',
        sub: 'Full-service takes form',
        desc: 'Formalized into a full-stack digital studio covering web, SEO, brand, CRM and automation under one roof serving 50+ clients globally.',
        icon: 'corporate_fare',
    },
    {
        year: '2023',
        title: 'The Signal',
        sub: 'Recognition scales',
        desc: 'Crossed 100 delivered projects. Clients from the US, UK, Canada and beyond trusted us to architect their core digital infrastructure.',
        icon: 'trending_up',
    },
    {
        year: '2025',
        title: 'The Standard',
        sub: 'Setting the new benchmark',
        desc: 'Operating at the intersection of high-design and deep automation redefining what a digital agency can actually deliver in the AI era.',
        icon: 'star',
    },
]

const CAPABILITIES = [
    { icon: 'web', label: 'Next.js Development' },
    { icon: 'palette', label: 'UI / UX Design' },
    { icon: 'robot_2', label: 'AI Automation' },
    { icon: 'search_insights', label: 'Technical SEO' },
    { icon: 'alternate_email', label: 'Email Sequences' },
    { icon: 'hub', label: 'CRM Integration' },
    { icon: 'share_reviews', label: 'Social Media' },
    { icon: 'analytics', label: 'Growth Strategy' },
]

/* ─────────────────────────────────────────
   SCROLL-DRAWN SVG JOURNEY LINE
───────────────────────────────────────── */
function JourneySVG({ progress }) {
    // Vertical S-curve path
    const totalLen = 900
    const dashOffset = totalLen * (1 - progress)

    return (
        <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 hidden md:block"
            width="120"
            height="100%"
            viewBox="0 0 120 900"
            preserveAspectRatio="none"
            style={{ overflow: 'visible', pointerEvents: 'none' }}
        >
            <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#732c7c" />
                    <stop offset="50%" stopColor="#d1746d" />
                    <stop offset="100%" stopColor="#f6a16c" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            {/* Background faint track */}
            <path
                d="M60,0 C60,180 60,180 60,450 C60,630 60,720 60,900"
                fill="none"
                stroke="rgba(115,44,124,0.08)"
                strokeWidth="2"
            />
            {/* Animated drawing line */}
            <path
                d="M60,0 C60,180 60,180 60,450 C60,630 60,720 60,900"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="2.5"
                strokeDasharray={totalLen}
                strokeDashoffset={dashOffset}
                filter="url(#glow)"
                style={{ transition: 'stroke-dashoffset 0.05s linear' }}
            />
            {/* Glowing tip */}
            {progress > 0.01 && (
                <circle
                    cx="60"
                    cy={progress * 900}
                    r="5"
                    fill="#732c7c"
                    filter="url(#glow)"
                    opacity={Math.min(1, progress * 8)}
                />
            )}
        </svg>
    )
}

/* ─────────────────────────────────────────
   FLOATING ORBS BACKGROUND
───────────────────────────────────────── */
function FloatingOrbs() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            {[
                { w: 420, h: 420, top: '5%', left: '60%', color: 'rgba(115,44,124,0.07)', delay: 0 },
                { w: 320, h: 320, top: '40%', left: '5%', color: 'rgba(209,116,109,0.08)', delay: 2 },
                { w: 260, h: 260, top: '70%', left: '75%', color: 'rgba(0,229,255,0.06)', delay: 4 },
            ].map((o, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: o.w, height: o.h,
                        top: o.top, left: o.left,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
                    }}
                    animate={{ y: [0, -30, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 8 + i * 2, repeat: Infinity, delay: o.delay, ease: 'easeInOut' }}
                />
            ))}
        </div>
    )
}

/* ─────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────── */
function AnimatedCounter({ target, duration = 1800 }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const num = parseFloat(target)
    const suffix = target.replace(/[\d.]/g, '')

    useEffect(() => {
        if (!inView) return
        let start = 0
        const step = num / (duration / 16)
        const timer = setInterval(() => {
            start += step
            if (start >= num) { setCount(num); clearInterval(timer) }
            else setCount(Math.floor(start * 10) / 10)
        }, 16)
        return () => clearInterval(timer)
    }, [inView, num, duration])

    return <span ref={ref}>{count}{suffix}</span>
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function AboutClient() {
    const journeyRef = useRef(null)
    const [journeyProgress, setJourneyProgress] = useState(0)

    useEffect(() => {
        const onScroll = () => {
            if (!journeyRef.current) return
            const rect = journeyRef.current.getBoundingClientRect()
            const winH = window.innerHeight
            // start drawing when top hits viewport, finish when bottom leaves
            const start = rect.top - winH
            const end = rect.bottom
            const total = end - start
            const scrolled = -start
            const pct = Math.max(0, Math.min(1, scrolled / total))
            setJourneyProgress(pct)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            <style>{`
        .about-capability-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 9999px;
          background: rgba(243,238,249,0.92);
          border: 1px solid rgba(115,44,124,0.15);
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
          cursor: default;
        }
        .about-capability-pill:hover {
          border-color: rgba(115,44,124,0.55);
          background: rgba(115,44,124,0.08);
          transform: translateY(-4px);
          box-shadow: 0 0 24px rgba(115,44,124,0.18);
        }
        .about-value-card {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(115,44,124,0.1);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(16px);
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
          position: relative;
          overflow: hidden;
        }
        .about-value-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #732c7c, #d1746d);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .about-value-card:hover {
          border-color: rgba(115,44,124,0.4);
          transform: translateY(-10px);
          box-shadow: 0 0 60px rgba(115,44,124,0.12), 0 30px 80px rgba(67,23,95,0.12);
        }
        .about-value-card:hover::before { transform: scaleX(1); }
        .journey-node {
          position: relative;
          z-index: 2;
        }
        .journey-dot {
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #732c7c;
          box-shadow: 0 0 0 4px rgba(115,44,124,0.2), 0 0 20px rgba(115,44,124,0.5);
          position: absolute;
          top: 24px;
          transition: box-shadow 0.3s ease;
        }
        .journey-card {
          background: rgba(255,255,255,0.95);
          border: 1px solid rgba(115,44,124,0.12);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(20px);
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
          position: relative;
          overflow: hidden;
        }
        .journey-card:hover {
          border-color: rgba(115,44,124,0.45);
          transform: scale(1.02);
          box-shadow: 0 0 60px rgba(115,44,124,0.15), 0 20px 60px rgba(67,23,95,0.12);
        }
        .stat-card {
          background: rgba(22,8,48,0.7);
          border: 1px solid rgba(115,44,124,0.12);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          backdrop-filter: blur(16px);
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }
        .stat-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 120%, rgba(115,44,124,0.08), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .stat-card:hover { transform: translateY(-8px); border-color: rgba(115,44,124,0.4); }
        .stat-card:hover::after { opacity: 1; }
        .hero-card-glow {
          box-shadow: 0 0 80px rgba(115,44,124,0.12), 0 40px 120px rgba(67,23,95,0.12);
        }
        .btn-primary {
          background: linear-gradient(135deg, #D6008D, #D6008D);
          color: #ffffff;
          font-family: inherit;
          font-weight: 800;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .btn-primary:hover { opacity: 0.9; }
        .btn-outline {
          background: rgba(18,6,38,0.6);
          color: #ffffff;
          font-family: inherit;
          font-weight: 800;
          border-radius: 9999px;
          border: 1px solid #D6008D;
          cursor: pointer;
          backdrop-filter: blur(12px);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .btn-outline:hover { border-color: rgba(115,44,124,0.6); background: rgba(115,44,124,0.08); }
        .glow-pink { box-shadow: 0 0 30px rgba(115,44,124,0.4); }
      `}</style>

            {/* ── HERO ── */}
            <section className="relative pt-36 pb-24 px-5 md:px-10 overflow-hidden">
                <FloatingOrbs />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -5%, rgba(255,46,136,0.16) 0%, transparent 55%)' }} />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
                            <span className="material-symbols-outlined text-sm" style={{ color: '#732c7c', fontVariationSettings: "'FILL' 1" }}>verified</span>
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#732c7c' }}>Who We Are</span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <h1 className="font-headline font-black tracking-tighter leading-[0.88] mb-8 text-glow" style={{ fontSize: 'clamp(3.2rem,9vw,8rem)', color: '#1a0a2e' }}>
                            We Build the<br />
                            <span className="gradient-text">Unfair Advantage</span><br />
                            <span style={{ fontSize: '0.55em', color: '#4a3560', fontWeight: 700 }}>for ambitious brands.</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12" style={{ color: '#4a3560' }}>
                            Webxautomation is a full-service digital studio that fuses world-class design, precision engineering and intelligent automation so your business can outpace, outperform, and outlast.
                        </p>
                    </FadeIn>
                    {/* <FadeIn delay={0.3}>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/contact"><button className="btn-primary px-10 py-4 text-base glow-pink">Start a Project</button></Link>
                            <Link href="/services"><button className="btn-outline px-10 py-4 text-base">Our Services</button></Link>
                        </div>
                    </FadeIn> */}
                </div>

                {/* Scroll indicator */}
                <FadeIn delay={0.5} className="absolute left-1/2 -translate-x-1/2">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-2 opacity-40"
                    >
                        <span className="text-xs uppercase tracking-widest font-headline" style={{ color: '#4a3560' }}>Scroll</span>
                        <span className="material-symbols-outlined text-base" style={{ color: '#732c7c' }}>keyboard_arrow_down</span>
                    </motion.div>
                </FadeIn>
            </section>

            {/* ── STATS ── */}
            {/* <section className="py-20 px-5 md:px-10">
        <div className="neon-line mb-20" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div className="stat-card">
                  <p className="font-headline font-black mb-2" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: s.color }}>
                    <AnimatedCounter target={s.val} />
                  </p>
                  <p className="text-xs uppercase tracking-widest font-headline font-bold" style={{ color: '#4a3560' }}>{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section> */}

            {/* ── MISSION ── */}
            <section className="pb-24 px-5 md:px-10 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(209,116,109,0.1) 0%, transparent 60%)' }} />
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <FadeIn>
                        <span className="tag-pill mb-6 inline-block">Our Mission</span>
                        <h2 className="font-headline font-black leading-tight mb-8" style={{ fontSize: 'clamp(2.2rem,4vw,3.8rem)', color: '#1a0a2e' }}>
                            We do not just<br />build things.<br />
                            <span className="gradient-text">We build leverage.</span>
                        </h2>
                        <p className="text-base leading-relaxed mb-6" style={{ color: '#4a3560' }}>
                            Most agencies hand you a deliverable and walk. We embed ourselves into your operation building digital systems that run, scale and compound without you having to babysit them.
                        </p>
                        <p className="text-base leading-relaxed mb-6" style={{ color: '#4a3560' }}>
                            Whether you need a high-converting website, an AI automation stack that saves your team 40+ hours a week, or a full growth engine we are the team that actually delivers it.
                        </p>
                        <p className="text-sm font-headline font-bold italic" style={{ color: 'rgba(245,230,255,0.45)' }}>
                            We measure success by what moves in your business, not what looks good in a portfolio.
                        </p>
                    </FadeIn>

                    {/* Visual block */}
                    <FadeIn delay={0.15}>
                        <div className="relative">
                            <div className="glass-card rounded-3xl p-10 relative overflow-hidden">
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(115,44,124,0.08), transparent 60%)' }} />
                                <p className="font-headline font-black text-xs uppercase tracking-widest mb-8" style={{ color: '#732c7c' }}>How We Work</p>
                                {[
                                    { step: '01', label: 'Discover', desc: 'Deep-dive into your goals, gaps and growth opportunities.' },
                                    { step: '02', label: 'Architect', desc: 'Map the complete digital system design, code, automation.' },
                                    { step: '03', label: 'Execute', desc: 'Build and launch with speed, precision, and zero excuses.' },
                                    { step: '04', label: 'Compound', desc: 'Optimise, iterate and scale what is already working.' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={item.step}
                                        whileHover={{ x: 6 }}
                                        className="flex items-start gap-5 mb-7 last:mb-0"
                                    >
                                        <span className="font-headline font-black text-2xl shrink-0" style={{ color: 'rgba(115,44,124,0.25)', minWidth: '2.5rem' }}>{item.step}</span>
                                        <div>
                                            <p className="font-headline font-bold text-sm mb-1" style={{ color: '#1a0a2e' }}>{item.label}</p>
                                            <p className="text-xs leading-relaxed" style={{ color: '#4a3560' }}>{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── VALUES ── */}
            <section className="py-24 px-5 md:px-10 relative">
                <div className="neon-line mb-20" />
                <div className="max-w-7xl mx-auto">
                    <FadeIn className="text-center mb-16">
                        <span className="tag-pill mb-6 inline-block">Core Principles</span>
                        <h2 className="font-headline font-black" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#1a0a2e' }}>
                            The DNA of<br /><span className="gradient-text">Everything We Build</span>
                        </h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {VALUES.map((v, i) => (
                            <FadeIn key={v.title} delay={i * 0.08}>
                                <div className="about-value-card h-full">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(115,44,124,0.08)', border: '1px solid rgba(115,44,124,0.2)' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#732c7c', fontSize: '1.5rem' }}>{v.icon}</span>
                                    </div>
                                    <h3 className="font-headline font-black text-lg mb-3" style={{ color: '#1a0a2e' }}>{v.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: '#4a3560' }}>{v.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── JOURNEY (SVG scroll-draw timeline) ── */}

            {/* ══════════════════════════════════════
                      VALUES
                  ══════════════════════════════════════ */}
            <section className="relative z-10 py-24 px-5 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
                            <span className="material-symbols-outlined text-sm" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>favorite</span>
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>Our Values</span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.08}>
                        <h2 className="font-headline font-black tracking-tight leading-[0.9] mb-5" style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', color: '#ffffff' }}>
                            The Principles<br />
                            <span style={{ color: '#D6008D' }}>
                                Behind Our Work.
                            </span>
                        </h2>
                    </FadeIn>

                    <div className="mt-10 space-y-4">
                        {VALUES1.map((v, i) => (
                            <FadeIn key={v.num} delay={i * 0.08}>
                                <div className="value-row p-6 md:p-8 flex gap-6 items-start">
                                    <span className="font-headline font-black text-2xl flex-shrink-0 w-10 tabular-nums" style={{ color: 'rgba(115,44,124,0.3)' }}>{v.num}.</span>
                                    <div>
                                        <h3 className="font-headline font-black text-base md:text-lg mb-2" style={{ color: '#1a0a2e' }}>{v.title}</h3>
                                        <p className="text-sm leading-relaxed" style={{ color: '#4a3560' }}>{v.desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>


            {/* ── CAPABILITIES ── */}
            <section className="py-24 px-5 md:px-10 relative">
                <div className="neon-line mb-20" />
                <div className="max-w-7xl mx-auto">
                    <FadeIn className="text-center mb-16">
                        <span className="tag-pill mb-6 inline-block">What We Do</span>
                        <h2 className="font-headline font-black" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#1a0a2e' }}>
                            Full-Spectrum<br /><span className="gradient-text">Digital Capability</span>
                        </h2>
                        <p className="mt-6 max-w-xl mx-auto text-base" style={{ color: '#4a3560' }}>
                            One studio. Every capability you need to build, grow and automate your business online.
                        </p>
                    </FadeIn>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {CAPABILITIES.map((c, i) => (
                            <FadeIn key={c.label} delay={i * 0.07}>
                                <div className="about-capability-pill">
                                    <span className="material-symbols-outlined text-base" style={{ color: '#732c7c' }}>{c.icon}</span>
                                    <span className="text-sm font-headline font-bold" style={{ color: '#1a0a2e' }}>{c.label}</span>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Split manifesto */}
                    <FadeIn delay={0.2} className="mt-20">
                        <div className="glass-card rounded-3xl p-10 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-10 relative overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(209,116,109,0.1), transparent 60%)' }} />
                            {[
                                { heading: 'We are not cheap.', body: 'We are the most cost-effective decision you will make because everything we build compounds over time.' },
                                { heading: 'We are not fast.', body: 'We are precise. We ship when things are done properly, not when the clock runs out.' },
                                { heading: 'We are not vendors.', body: 'We are architects. Long-term partners who are invested in the outcomes, not the invoice.' },
                            ].map((m, i) => (
                                <div key={i} className="relative z-10">
                                    <h3 className="font-headline font-black text-lg mb-3" style={{ color: '#732c7c' }}>{m.heading}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: '#4a3560' }}>{m.body}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 px-5 md:px-10">
                <FadeIn>
                    <div className="max-w-4xl mx-auto glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,46,136,0.16) 0%, transparent 60%)' }} />
                        <motion.div
                            animate={{ scale: [1, 1.04, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 relative z-10"
                            style={{ background: 'rgba(115,44,124,0.1)', border: '1px solid rgba(115,44,124,0.3)' }}
                        >
                            <span className="material-symbols-outlined text-3xl" style={{ color: '#732c7c', fontVariationSettings: "'FILL' 1" }}>flash_on</span>
                        </motion.div>
                        <h2 className="font-headline font-black mb-5 relative z-10" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#1a0a2e' }}>
                            Let us build your<br /><span className="gradient-text">unfair advantage.</span>
                        </h2>
                        <p className="mb-10 max-w-xl mx-auto leading-relaxed relative z-10" style={{ color: '#4a3560' }}>
                            Whether you are starting from scratch or ready to scale what is already working we have the team, the tools and the drive to get you there.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 relative z-10">
                            <Link href="/contact"><button className="btn-primary px-12 py-4 text-base glow-pink">Book a Free Strategy Call</button></Link>
                            <Link href="/services"><button className="btn-outline px-12 py-4 text-base">See Our Work</button></Link>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </>
    )
}
