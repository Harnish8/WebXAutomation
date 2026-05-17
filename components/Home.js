'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

/* ─────────────────────────────────────────
   DATA EXACT FROM DOCX, ZERO CHANGES
───────────────────────────────────────── */
const STATS = [
    { val: '200+', label: 'Brands Grown Across Industries', color: '#732c7c' },
    { val: '$50M+', label: 'In Ad Spend Managed & Optimised', color: '#d1746d' },
    { val: '94%', label: 'Client Retention Rate', color: '#f6a16c' },
]

const WHO_WE_ARE_POINTS = [
    { icon: 'hub', title: 'Built as a Growth System', desc: 'Every service connects with the others creating a compounding growth engine that gets stronger over time.' },
    { icon: 'robot_2', title: 'Powered by AI Automation', desc: 'Advanced AI tools integrated into our workflows from intelligent content systems to automated ad optimisation.' },
    { icon: 'psychology', title: 'Guided by Real Expertise', desc: 'AI gives us speed and precision. Our people give it strategy and direction backed by deep experience.' },
]

const AI_BULLETS = [
    { icon: 'ads_click', title: 'Intelligent Ad Optimisation', desc: 'Real-time bidding, audience refinement, and budget allocation automated and always improving.' },
    { icon: 'auto_awesome', title: 'AI Content Systems', desc: 'From ideation to scheduling, AI accelerates our content pipeline without compromising quality.' },
    { icon: 'analytics', title: 'Predictive Analytics', desc: 'We use AI to forecast campaign performance, identify trends early, and stay ahead of the curve.' },
    { icon: 'dashboard', title: 'Automated Reporting', desc: 'Clear, real-time dashboards that surface what\'s working no manual pulling, no delays.' },
]

const SERVICES = [
    { num: '01', icon: 'share_reviews', title: 'Social Media Marketing', desc: 'We build genuine communities around your brand through strategic content, platform-native storytelling, and consistent engagement that turns followers into loyal customers and brand advocates.', tag: 'AI Scheduling & Insights' },
    { num: '02', icon: 'search_insights', title: 'SEO & Content Marketing', desc: 'Long-term visibility that compounds over time. We craft content strategies and search frameworks that earn organic rankings, build topical authority, and bring the right audiences to you consistently.', tag: 'AI SEO Research' },
    { num: '03', icon: 'ads_click', title: 'Paid Ads PPC, Meta & Google', desc: 'Strategic, data-driven campaigns across Google, Meta, and beyond where every pound spent is purposeful, every audience is carefully defined, and performance is monitored and improved continuously.', tag: 'AI Bid Optimisation' },
    { num: '04', icon: 'palette', title: 'Branding & Creative Design', desc: 'A brand that means something is one of the most valuable assets a business can have. We build thoughtful, distinctive identities visual systems, messaging, and brand strategy that earns recognition and trust.', tag: 'AI-Assisted Concepting' },
    { num: '05', icon: 'web', title: 'Web Design & Development', desc: 'Beautiful, high-converting websites that work as hard as you do. We design and develop digital experiences that reflect your brand\'s quality, perform flawlessly, and guide visitors naturally towards action.', tag: 'AI UX Personalisation' },
    { num: '06', icon: 'videocam', title: 'Video Production & Editing', desc: 'From brand story films to short-form social content, we produce video that captures attention and communicates your value with clarity. Concept to final edit handled entirely in-house, enhanced by AI tools.', tag: 'AI Video Enhancement' },
]

const PROCESS = [
    { num: '01', title: 'Discover & Audit', desc: 'Thorough analysis of your brand, market, competitors, and current performance before we make a single move.' },
    { num: '02', title: 'Strategy & Planning', desc: 'A tailored, integrated growth strategy connecting every channel toward your specific business goals.' },
    { num: '03', title: 'Execute & Automate', desc: 'Our team launches campaigns with AI automation running in the background keeping everything optimised.' },
    { num: '04', title: 'Measure & Scale', desc: 'We track what matters, report with transparency, and scale the strategies that work into long-term growth.' },
]

const VALUES = [
    { num: '01', title: 'Growth Should Be Sustainable', desc: 'We\'re not interested in quick wins that fade. Every strategy we build is designed for the long run creating momentum that compounds over time and delivers returns that grow stronger the further you go.' },
    { num: '02', title: 'Automation Should Serve People', desc: 'AI and automation are powerful tools but they work best when guided by human understanding and empathy. We use intelligent systems to handle the heavy lifting, so our team can focus on what matters most: your goals, your audience, and your story.' },
    { num: '03', title: 'Transparency Builds Trust', desc: 'We believe great partnerships are built on honesty. You\'ll always know what we\'re working on, why we\'re doing it, and what it\'s delivering. Our reporting is clear, our communication is open, and we\'ll always tell you the truth.' },
    { num: '04', title: 'Every Brand Deserves Craft', desc: 'Whether you\'re a small business finding your voice or an established brand refining it, we bring the same level of care and attention to every project. Great work isn\'t reserved for big budgets it\'s a standard we hold for every client we work with.' },
    { num: '05', title: 'Partnership Over Transactional', desc: 'We don\'t think of ourselves as a vendor. We show up as a genuine partner invested in your success, curious about your challenges, and committed to being the kind of team you\'re genuinely glad to have in your corner.' },
]

/* ─────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────── */
function ScrollBar() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
    return (
        <motion.div style={{
            scaleX, transformOrigin: 'left',
            position: 'fixed', top: 0, left: 0, right: 0, height: 3,
            background: 'linear-gradient(90deg,#43175f,#732c7c,#d1746d,#f6a16c)', zIndex: 999,
        }} />
    )
}

/* ─────────────────────────────────────────
   FLOATING ORBS
───────────────────────────────────────── */
function Orbs() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {[
                { w: 500, h: 500, top: '-5%', left: '55%', c: 'rgba(115,44,124,0.055)', dur: 10, delay: 0 },
                { w: 380, h: 380, top: '30%', left: '-6%', c: 'rgba(209,116,109,0.065)', dur: 13, delay: 2.5 },
                { w: 300, h: 300, top: '60%', left: '72%', c: 'rgba(246,161,108,0.045)', dur: 8, delay: 5 },
                { w: 220, h: 220, top: '80%', left: '30%', c: 'rgba(115,44,124,0.04)', dur: 11, delay: 1.5 },
            ].map((o, i) => (
                <motion.div key={i}
                    style={{ position: 'absolute', width: o.w, height: o.h, top: o.top, left: o.left, borderRadius: '50%', background: `radial-gradient(circle,${o.c},transparent 70%)` }}
                    animate={{ y: [0, -28, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
                />
            ))}
        </div>
    )
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function Counter({ target }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const [started, setStarted] = useState(false)
    const num = parseFloat(target.replace(/[^0-9.]/g, ''))
    const prefix = target.startsWith('$') ? '$' : ''
    const suffix = target.replace(/[$0-9.]/g, '')

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.5 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    useEffect(() => {
        if (!started) return
        let cur = 0
        const step = num / (1600 / 16)
        const t = setInterval(() => {
            cur += step
            if (cur >= num) { setCount(num); clearInterval(t) }
            else setCount(Math.floor(cur * 10) / 10)
        }, 16)
        return () => clearInterval(t)
    }, [started, num])

    return <span ref={ref}>{prefix}{count}{suffix}</span>
}

/* ─────────────────────────────────────────
   SECTION DIVIDER
───────────────────────────────────────── */
function Divider() {
    return (
        <div className="w-full h-px my-2"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(115,44,124,0.28),rgba(209,116,109,0.18),transparent)' }} />
    )
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function AboutClient() {
    const { scrollY } = useScroll()
    const heroY = useTransform(scrollY, [0, 600], [0, 180])
    const heroY2 = useTransform(scrollY, [0, 600], [0, 90])
    const titleY = useTransform(scrollY, [0, 400], [0, 55])
    const subY = useTransform(scrollY, [0, 400], [0, 28])

    return (
        <>
            <ScrollBar />
            <Orbs />

            <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }
        .about-card {
          background: rgba(243,238,249,0.95);
          border: 1px solid rgba(115,44,124,0.1);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .about-card:hover {
          border-color: rgba(115,44,124,0.38);
          box-shadow: 0 0 50px rgba(115,44,124,0.1), 0 24px 70px rgba(67,23,95,0.12);
          transform: translateY(-5px);
        }
        .service-card {
          background: rgba(243,238,249,0.95);
          border: 1px solid rgba(115,44,124,0.1);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content:'';
          position: absolute;
          top:0; left:0; right:0;
          height: 2px;
          background: linear-gradient(90deg,#732c7c,#d1746d);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .service-card:hover { border-color:rgba(115,44,124,0.4); transform:translateY(-8px); box-shadow:0 0 55px rgba(115,44,124,0.12),0 28px 80px rgba(67,23,95,0.12); }
        .service-card:hover::before { transform: scaleX(1); }
        .value-row {
          background: rgba(243,238,249,0.90);
          border: 1px solid rgba(115,44,124,0.08);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .value-row:hover {
          border-color: rgba(115,44,124,0.3);
          background: rgba(115,44,124,0.04);
          transform: translateX(8px);
        }
        .process-step {
          background: rgba(243,238,249,0.95);
          border: 1px solid rgba(115,44,124,0.1);
          border-radius: 20px;
          backdrop-filter: blur(16px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .process-step:hover {
          border-color: rgba(115,44,124,0.38);
          transform: translateY(-6px);
          box-shadow: 0 0 40px rgba(115,44,124,0.1), 0 20px 60px rgba(67,23,95,0.12);
        }
      `}</style>

            {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
            <section className="relative pt-36 pb-24 px-5 md:px-10 overflow-hidden" style={{ zIndex: 1 }}>
                <motion.div style={{
                    y: heroY, position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at 42% -5%, rgba(115,44,124,0.2) 0%, transparent 55%)'
                }} />
                <motion.div style={{
                    y: heroY2, position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at 80% 65%, rgba(209,116,109,0.1) 0%, transparent 50%)'
                }} />

                <div className="max-w-6xl mx-auto relative z-10">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-10">
                            <span className="w-2 h-2 rounded-full" style={{ background: '#732c7c', boxShadow: '0 0 8px #732c7c', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#732c7c' }}>
                                Digital Growth & AI Automation Agency
                            </span>
                        </div>
                    </FadeIn>

                    <div className="overflow-visible">
                        <motion.div style={{ y: titleY }}>
                            <FadeIn delay={0.08}>
                                <h1 className="font-headline font-black tracking-tighter leading-[0.86] mb-2" style={{ fontSize: 'clamp(3rem,9vw,8rem)', color: '#1a0a2e' }}>
                                    We Grow Brands.
                                </h1>
                            </FadeIn>
                        </motion.div>
                        <motion.div style={{ y: subY }}>
                            <FadeIn delay={0.14}>
                                <h1 className="font-headline font-black tracking-tighter leading-[0.86]" style={{
                                    fontSize: 'clamp(3rem,9vw,8rem)',
                                    background: 'linear-gradient(135deg,#732c7c 0%,#d1746d 55%,#f6a16c 100%)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                                }}>
                                    We Automate the Future.
                                </h1>
                            </FadeIn>
                        </motion.div>
                    </div>

                    <FadeIn delay={0.22}>
                        <div className="max-w-3xl mt-10 mb-12">
                            <p className="text-lg md:text-xl leading-relaxed mb-5" style={{ color: '#4a3560' }}>
                                Webxautomation is a <span style={{ color: '#1a0a2e', fontWeight: 700 }}>full-service digital agency</span> that helps businesses grow smarter not just faster. We combine proven marketing expertise with cutting-edge AI automation to build sustainable growth systems that work for your brand around the clock.
                            </p>
                            <p className="text-base leading-relaxed" style={{ color: '#4a3560' }}>
                                From the first impression to the final conversion, every touchpoint we create is thoughtfully designed, strategically powered, and continuously optimised so your business keeps moving forward, even when you&apos;re not at your desk.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {STATS.map((s, i) => (
                            <FadeIn key={s.label} delay={0.28 + i * 0.08}>
                                <div className="about-card p-7 text-center">
                                    <p className="font-headline font-black mb-2" style={{ fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: s.color }}>
                                        <Counter target={s.val} />
                                    </p>
                                    <p className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#4a3560' }}>{s.label}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

            {/* ══════════════════════════════════════
          WHO WE ARE
      ══════════════════════════════════════ */}
            <section className="relative z-10 py-24 px-5 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
                            <span className="material-symbols-outlined text-sm" style={{ color: '#732c7c', fontVariationSettings: "'FILL' 1" }}>groups</span>
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#732c7c' }}>Who We Are</span>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                        <div>
                            <FadeIn delay={0.08}>
                                <h2 className="font-headline font-black tracking-tight leading-[0.9] mb-8" style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', color: '#1a0a2e' }}>
                                    An Agency Built Around<br />
                                    <span style={{ background: 'linear-gradient(135deg,#732c7c,#d1746d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                        Your Growth.
                                    </span>
                                </h2>
                            </FadeIn>
                            <FadeIn delay={0.14}>
                                <p className="text-base leading-relaxed mb-5" style={{ color: '#4a3560' }}>
                                    Webxautomation was built around a straightforward belief: <span style={{ color: '#1a0a2e', fontWeight: 600 }}>businesses deserve a marketing partner that genuinely cares about their growth</span> not just their monthly retainer. So we built an agency where every strategy, every campaign, and every creative decision is made with your long-term success in mind.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.18}>
                                <p className="text-base leading-relaxed mb-5" style={{ color: '#4a3560' }}>
                                    Our team brings together experienced strategists, talented creatives, and performance-focused marketers who&apos;ve worked across industries, budgets, and growth stages. We&apos;ve helped businesses launch from zero, scale past their ceilings, and reimagine what their brand can be and we bring that same dedication to every new partnership we form.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.22}>
                                <p className="text-base leading-relaxed mb-5" style={{ color: '#4a3560' }}>
                                    What truly sets us apart is how we blend <span style={{ color: '#1a0a2e', fontWeight: 600 }}>human insight with intelligent automation</span>. We&apos;ve built AI-powered systems into the core of how we work accelerating research, sharpening targeting, streamlining content production, and optimising campaigns in real time so you get the benefit of enterprise-level capability, whatever your size.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.26}>
                                <p className="text-base leading-relaxed" style={{ color: '#4a3560' }}>
                                    At Webxautomation, we don&apos;t just run your marketing. We build a <span style={{ color: '#1a0a2e', fontWeight: 600 }}>growth infrastructure</span> that compounds over time one that brings more visibility, more engagement, and more revenue as every layer builds on the last.
                                </p>
                            </FadeIn>
                        </div>

                        <div className="space-y-4">
                            {WHO_WE_ARE_POINTS.map((p, i) => (
                                <FadeIn key={p.title} delay={0.1 + i * 0.1}>
                                    <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}
                                        className="about-card p-7 flex gap-5 items-start">
                                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'rgba(115,44,124,0.09)', border: '1px solid rgba(115,44,124,0.22)' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#732c7c', fontSize: '1.3rem' }}>{p.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-headline font-black text-base mb-2" style={{ color: '#1a0a2e' }}>{p.title}</h3>
                                            <p className="text-sm leading-relaxed" style={{ color: '#4a3560' }}>{p.desc}</p>
                                        </div>
                                    </motion.div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

            {/* ══════════════════════════════════════
          AI & AUTOMATION
      ══════════════════════════════════════ */}
            <section className="relative z-10 py-24 px-5 md:px-10 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(209,116,109,0.08) 0%, transparent 65%)' }} />
                <div className="max-w-7xl mx-auto relative z-10">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
                            <span className="material-symbols-outlined text-sm" style={{ color: '#732c7c', fontVariationSettings: "'FILL' 1" }}>robot_2</span>
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#732c7c' }}>AI & Automation</span>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <FadeIn delay={0.08}>
                                <h2 className="font-headline font-black tracking-tight leading-[0.9] mb-6" style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', color: '#1a0a2e' }}>
                                    Smarter Marketing,<br />
                                    <span style={{ background: 'linear-gradient(135deg,#732c7c,#d1746d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                        Powered by AI.
                                    </span>
                                </h2>
                            </FadeIn>
                            <FadeIn delay={0.14}>
                                <p className="text-base leading-relaxed mb-6" style={{ color: '#4a3560' }}>
                                    We don&apos;t use AI as a gimmick. We&apos;ve embedded intelligent automation into the heart of our agency so every campaign runs leaner, every decision is better informed, and every result is achieved faster.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <div className="rounded-2xl p-6 mb-6" style={{ background: 'rgba(115,44,124,0.06)', border: '1px solid rgba(115,44,124,0.18)' }}>
                                    <p className="font-headline font-black text-base mb-3" style={{ color: '#1a0a2e' }}>Your Growth System, Running 24/7</p>
                                    <p className="text-sm leading-relaxed" style={{ color: '#4a3560' }}>
                                        While your team sleeps, our AI-powered systems keep working <span style={{ color: '#1a0a2e' }}>optimising your ads</span>, <span style={{ color: '#1a0a2e' }}>scheduling your content</span>, <span style={{ color: '#1a0a2e' }}>analysing your audience</span>, and surfacing the insights that matter most for your next move.
                                    </p>
                                </div>
                            </FadeIn>
                            <FadeIn delay={0.24}>
                                <p className="text-base leading-relaxed" style={{ color: '#4a3560' }}>
                                    We&apos;ve built automation pipelines that eliminate the repetitive, time-consuming tasks that slow most marketing teams down freeing up our strategists to focus entirely on the creative and strategic work that moves the needle.
                                </p>
                            </FadeIn>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {AI_BULLETS.map((b, i) => (
                                <FadeIn key={b.title} delay={0.08 + i * 0.09}>
                                    <motion.div whileHover={{ y: -6, borderColor: 'rgba(115,44,124,0.4)' }}
                                        transition={{ duration: 0.25 }}
                                        className="about-card p-6 h-full">
                                        <motion.div whileHover={{ rotate: -8, scale: 1.12 }} transition={{ duration: 0.25 }}
                                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                            style={{ background: 'rgba(115,44,124,0.09)', border: '1px solid rgba(115,44,124,0.2)' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#732c7c', fontSize: '1.2rem' }}>{b.icon}</span>
                                        </motion.div>
                                        <h3 className="font-headline font-black text-sm mb-2" style={{ color: '#1a0a2e' }}>{b.title}</h3>
                                        <p className="text-xs leading-relaxed" style={{ color: '#4a3560' }}>{b.desc}</p>
                                    </motion.div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

            {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
            <section className="relative z-10 py-24 px-5 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
                            <span className="material-symbols-outlined text-sm" style={{ color: '#732c7c', fontVariationSettings: "'FILL' 1" }}>bolt</span>
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#732c7c' }}>Services Section</span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.08}>
                        <h2 className="font-headline font-black tracking-tight leading-[0.9] mb-5" style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', color: '#1a0a2e' }}>
                            Six Services.<br />
                            <span style={{ background: 'linear-gradient(135deg,#732c7c,#d1746d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                One Growth System.
                            </span>
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.14}>
                        <p className="text-base leading-relaxed max-w-3xl mb-14" style={{ color: '#4a3560' }}>
                            Every service we provide is part of a connected whole. When your content fuels your SEO, your ads amplify your brand, and your website converts what your social media attracts that&apos;s when real, lasting growth takes hold.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {SERVICES.map((s, i) => (
                            <FadeIn key={s.num} delay={i * 0.07}>
                                <div className="service-card p-8 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-5">
                                        <span className="font-headline font-black text-3xl" style={{ color: 'rgba(115,44,124,0.2)' }}>{s.num}</span>
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                            style={{ background: 'rgba(115,44,124,0.09)', border: '1px solid rgba(115,44,124,0.2)' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#732c7c', fontSize: '1.2rem' }}>{s.icon}</span>
                                        </div>
                                    </div>
                                    <h3 className="font-headline font-black text-lg mb-3" style={{ color: '#1a0a2e' }}>{s.title}</h3>
                                    <p className="text-sm leading-relaxed flex-1" style={{ color: '#4a3560' }}>{s.desc}</p>
                                    <div className="mt-6 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm" style={{ color: '#732c7c', fontSize: '0.9rem' }}>bolt</span>
                                        <span className="text-xs font-headline font-bold" style={{ color: '#732c7c' }}>{s.tag}</span>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

            {/* ══════════════════════════════════════
          PROCESS THE Webxautomation GROWTH FRAMEWORK
      ══════════════════════════════════════ */}
            <section className="relative z-10 py-24 px-5 md:px-10 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 60%, rgba(115,44,124,0.07) 0%, transparent 55%)' }} />
                <div className="max-w-7xl mx-auto relative z-10">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
                            <span className="material-symbols-outlined text-sm" style={{ color: '#732c7c', fontVariationSettings: "'FILL' 1" }}>route</span>
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#732c7c' }}>Growth System / Process</span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.08}>
                        <h2 className="font-headline font-black tracking-tight leading-[0.9] mb-4" style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', color: '#1a0a2e' }}>
                            How We Build<br />
                            <span style={{ background: 'linear-gradient(135deg,#732c7c,#d1746d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                Lasting Growth.
                            </span>
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.14}>
                        <p className="text-base leading-relaxed max-w-2xl mb-4" style={{ color: '#4a3560' }}>
                            We follow a structured, proven process designed to remove guesswork and create clarity at every stage. Here&apos;s how we turn your goals into a growth system that delivers.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.18}>
                        <p className="text-xs font-headline font-bold uppercase tracking-widest mb-12" style={{ color: 'rgba(115,44,124,0.5)' }}>
                            The Webxautomation Growth Framework A four-phase approach to building sustainable, compounding growth for your business.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {PROCESS.map((p, i) => (
                            <FadeIn key={p.num} delay={i * 0.1}>
                                <div className="process-step p-7 h-full flex flex-col">
                                    {/* Number + arrow */}
                                    <div className="flex items-center gap-2 mb-5">
                                        <span className="font-headline font-black text-4xl" style={{ color: 'rgba(115,44,124,0.15)' }}>{p.num}</span>
                                        <span className="material-symbols-outlined text-base" style={{ color: 'rgba(115,44,124,0.4)' }}>arrow_forward</span>
                                    </div>
                                    <h3 className="font-headline font-black text-base mb-3" style={{ color: '#1a0a2e' }}>{p.title}</h3>
                                    <p className="text-sm leading-relaxed flex-1" style={{ color: '#4a3560' }}>{p.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

            {/* ══════════════════════════════════════
          BRAND MANIFESTO
      ══════════════════════════════════════ */}
            <section className="relative z-10 py-24 px-5 md:px-10">
                <div className="max-w-5xl mx-auto">
                    <FadeIn>
                        <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
                            style={{ background: 'rgba(243,238,249,0.95)', border: '1px solid rgba(115,44,124,0.22)', backdropFilter: 'blur(24px)' }}>
                            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(115,44,124,0.12),transparent 55%)' }} />
                            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%,rgba(209,116,109,0.08),transparent 55%)' }} />
                            <div className="relative z-10">
                                <p className="text-xs font-headline font-bold uppercase tracking-widest mb-6" style={{ color: '#732c7c' }}>The Webxautomation Belief</p>
                                <h2 className="font-headline font-black tracking-tight leading-tight mb-8" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#1a0a2e' }}>
                                    Growth isn&apos;t a campaign.<br />
                                    <span style={{ background: 'linear-gradient(135deg,#732c7c,#d1746d,#f6a16c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                        It&apos;s a system and we&apos;re here to build yours.
                                    </span>
                                </h2>
                                <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: '#4a3560' }}>
                                    The most successful brands aren&apos;t the ones that ran the cleverest ad or went viral once. They&apos;re the ones that built a connected, intelligent marketing infrastructure that kept delivering month after month, year after year. That&apos;s what Webxautomation exists to create for you.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

            {/* ══════════════════════════════════════
          VALUES
      ══════════════════════════════════════ */}
            <section className="relative z-10 py-24 px-5 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
                            <span className="material-symbols-outlined text-sm" style={{ color: '#732c7c', fontVariationSettings: "'FILL' 1" }}>favorite</span>
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#732c7c' }}>Our Values</span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.08}>
                        <h2 className="font-headline font-black tracking-tight leading-[0.9] mb-5" style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', color: '#1a0a2e' }}>
                            The Principles<br />
                            <span style={{ background: 'linear-gradient(135deg,#732c7c,#d1746d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                Behind Our Work.
                            </span>
                        </h2>
                    </FadeIn>

                    <div className="mt-10 space-y-4">
                        {VALUES.map((v, i) => (
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

            <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

            {/* ══════════════════════════════════════
          CTA CALL TO ACTION
      ══════════════════════════════════════ */}
            <section className="relative z-10 py-24 px-5 md:px-10">
                <div className="max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
                            style={{ background: 'rgba(243,238,249,0.95)', border: '1px solid rgba(115,44,124,0.28)', backdropFilter: 'blur(24px)' }}>
                            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -5%,rgba(115,44,124,0.18),transparent 55%)' }} />
                            <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-7 relative z-10"
                                style={{ background: 'rgba(115,44,124,0.1)', border: '1px solid rgba(115,44,124,0.28)' }}>
                                <span className="material-symbols-outlined text-2xl" style={{ color: '#732c7c', fontVariationSettings: "'FILL' 1" }}>flash_on</span>
                            </motion.div>
                            <div className="relative z-10">
                                <h2 className="font-headline font-black tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#1a0a2e' }}>
                                    Let&apos;s Build Your<br />
                                    <span style={{ background: 'linear-gradient(135deg,#732c7c,#d1746d,#f6a16c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                        Growth System.
                                    </span>
                                </h2>
                                <p className="text-base leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#4a3560' }}>
                                    Whether you&apos;re launching something new or scaling something proven, Webxautomation has the strategy, the tools, and the team to take you there. Let&apos;s start the conversation.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/contact"><button className="btn-primary px-10 py-4 text-base glow-pink">Get Started</button></Link>
                                    <Link href="/services"><button className="btn-outline px-10 py-4 text-base">Explore Our Services</button></Link>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="text-center text-xs font-headline font-bold mt-8" style={{ color: 'rgba(74,53,96,0.35)' }}>
                            WEBXAUTOMATION · Digital Growth & AI Automation Agency · webxautomation.in
                        </p>
                    </FadeIn>
                </div>
            </section>
        </>
    )
}
