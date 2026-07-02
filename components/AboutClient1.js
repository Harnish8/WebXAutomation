'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
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
  { icon: 'auto_fix_high', title: 'AI Augmented', desc: 'We do not just use AI as a buzzword. Our workflows are genuinely powered by intelligent automation.' },
  { icon: 'fingerprint', title: 'Brand Precision', desc: 'Identity is sacred. We craft visuals and copy that feel unmistakably yours, nothing off the shelf.' },
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
   FLOATING ORBS BACKGROUND
───────────────────────────────────────── */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {[
        { w: 420, h: 420, top: '5%', left: '60%', color: 'rgba(214,0,141,0.07)', dur: '10s', delay: '0s' },
        { w: 320, h: 320, top: '40%', left: '5%', color: 'rgba(255,184,76,0.06)', dur: '14s', delay: '2s' },
        { w: 260, h: 260, top: '70%', left: '75%', color: 'rgba(214,0,141,0.05)', dur: '11s', delay: '4s' },
      ].map((o, i) => (
        <div key={i} style={{
          position: 'absolute', width: o.w, height: o.h, top: o.top, left: o.left,
          borderRadius: '50%', background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
          animation: `orb-float ${o.dur} ease-in-out infinite`,
          animationDelay: o.delay,
        }} />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────── */
function AnimatedCounter({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true })
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
   DIVIDER
───────────────────────────────────────── */
function Divider() {
  return (
    <div className="px-5 md:px-10 my-2">
      <div className="max-w-7xl mx-auto">
        <div className="w-full h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(214,0,141,0.28),rgba(255,184,76,0.18),transparent)' }} />
      </div>
    </div>
  )
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
          border: 1px solid rgba(214,0,141,0.15);
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
          cursor: default;
        }
        .about-capability-pill:hover {
          border-color: rgba(214,0,141,0.5);
          background: rgba(214,0,141,0.06);
          transform: translateY(-4px);
          box-shadow: 0 0 24px rgba(214,0,141,0.15);
        }
        .about-value-card1 {
          background: rgba(243,238,249,0.95);
          border: 1px solid rgba(115,44,124,0.1);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(16px);
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
          position: relative;
          overflow: hidden;
        }
        .about-value-card1::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg,#732c7c,#d1746d);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .about-value-card1:hover {
          border-color: rgba(115,44,124,0.4);
          transform: translateY(-10px);
          box-shadow: 0 0 60px rgba(115,44,124,0.12),0 28px 80px rgba(67,23,95,0.12);
        }
        .about-value-card1:hover::before { transform: scaleX(1); }
        .stat-card {
          background: rgba(243,238,249,0.90);
          border: 1px solid rgba(115,44,124,0.08);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          backdrop-filter: blur(16px);
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        .about-value-card {
          background: rgba(243, 238, 249, 0);
          border: 2px solid #D6008D;
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
          background: linear-gradient(90deg,#732c7c,#d1746d);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .about-value-card:hover {
          border-color: #D6008D;
          transform: translateY(-10px);
        }
        .about-value-card:hover::before { transform: scaleX(1); }
        .stat-card {
          background: rgba(243,238,249,0.90);
          border: 1px solid #D6008D;
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          backdrop-filter: blur(16px);
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }


        .stat-card:hover { transform: translateY(-8px); border-color: rgba(214,0,141,0.4); }
        .value-row1 {
          background: rgba(243,238,249,0.90);
          border: 1px solid rgba(115,44,124,0.08);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .value-row1:hover {
          background: rgba(243,238,249,0.90);
          transform: translateX(8px);
        }

        .value-row {
          background: rgba(243, 238, 249, 0);
          border: 2px solid #D6008D;
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .value-row:hover {
          background: rgba(243, 238, 249, 0);
          transform: translateX(8px);
          border-color: #D6008D;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-24 px-5 md:px-10 overflow-hidden">
        <FloatingOrbs />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% -5%, rgba(214,0,141,0.16) 0%, transparent 55%)' }} />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
              <span className="material-symbols-outlined text-sm" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>Who We Are</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-headline font-black tracking-tighter leading-[0.88] mb-8"
              style={{ fontSize: 'clamp(3rem,7vw,7rem)', color: '#ffffff' }}>
              We Build the<br />
              <span style={{ color: '#D6008D' }}>Unfair Advantage</span><br />
              <span style={{ fontSize: '0.55em', color: 'rgba(255, 255, 255, 1)', fontWeight: 700 }}>for ambitious brands.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12" style={{ color: 'rgba(255, 255, 255, 1)' }}>
              Webxautomation is a full service digital studio that uses world class design, precision engineering and intelligent automation so your business can outpace, outperform, and outlast.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.5} className="absolute left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2" style={{ color: '#ffffff', animation: 'scroll-bounce 2s ease-in-out infinite' }} aria-hidden="true">
            <span className="text-xs font-headline uppercase tracking-widest">Scroll</span>
            <span className="material-symbols-outlined">keyboard_arrow_down</span>
          </div>
        </FadeIn>
      </section>

      {/* ── PHOTOGENIC AGENCY WORKSPACE & DNA SHOWCASE ── */}
      <section className="py-16 px-5 md:px-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-[#D6008D]/30 shadow-[0_20px_70px_rgba(214,0,141,0.15)] group">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Webxautomation Digital Architects & Strategy Collective"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0314] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[#0a0314]/85 backdrop-blur-md border border-white/10">
                  <div>
                    <span className="text-xs font-headline uppercase tracking-widest text-[#D6008D] font-bold block mb-1">Our Studio</span>
                    <h3 className="text-xl font-headline font-black text-white">Engineering Growth Systems 24/7</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 rounded-full bg-[#D6008D]/20 border border-[#D6008D] text-white text-xs font-bold">
                      100% Remote Architecture
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="p-8 rounded-[2.2rem] bg-[#120524] border border-[#D6008D]/30 relative overflow-hidden group hover:border-[#D6008D] transition-all duration-300">
                  <span className="material-symbols-outlined text-4xl text-[#D6008D] mb-4 block">auto_awesome</span>
                  <h4 className="font-headline font-black text-xl text-white mb-2">AI-Powered Speed</h4>
                  <p className="text-sm text-white/80 leading-relaxed">
                    By integrating generative workflows directly into our design and ad operations, we deliver enterprise precision at 3x standard velocity.
                  </p>
                </div>
                <div className="p-8 rounded-[2.2rem] bg-[#120524] border border-[#D6008D]/30 relative overflow-hidden group hover:border-[#D6008D] transition-all duration-300">
                  <span className="material-symbols-outlined text-4xl text-[#D6008D] mb-4 block">query_stats</span>
                  <h4 className="font-headline font-black text-xl text-white mb-2">Compounding ROI</h4>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Every asset connects. Content ranks SEO, ads retarget visitors, and automation converts leads seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="pb-24 px-5 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(255,184,76,0.08) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
              <span className="material-symbols-outlined text-sm" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>target</span>
              <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>Our Mission</span>
            </div>
            <h2 className="font-headline font-black leading-tight mb-8"
              style={{ fontSize: 'clamp(2.2rem,4vw,3.8rem)', color: '#ffffff' }}>
              We do not just<br />build things.<br />
              <span style={{ color: '#D6008D' }}>We build leverage.</span>
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255, 255, 255, 1)' }}>
              Most agencies hand you a deliverable and walk. We embed ourselves into your operation building digital systems that run, scale and compound without you having to babysit them.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255, 255, 255, 1)' }}>
              Whether you need a high converting website, an AI automation stack that saves your team 40+ hours a week, or a full growth engine we are the team that actually delivers it.
            </p>
            <p className="text-sm font-headline font-bold italic" style={{ color: '#D6008D' }}>
              We measure success by what moves in your business, not what looks good in a portfolio.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-3xl p-10 relative overflow-hidden"
              style={{ background: 'rgba(255, 255, 255, 0)', border: '2px solid #D6008D' }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(214,0,141,0.07), transparent 60%)' }} />
              <p className="font-headline font-black text-xs uppercase tracking-widest mb-8" style={{ color: '#D6008D' }}>How We Work</p>
              {[
                { step: '01', label: 'Discover', desc: 'Deep-dive into your goals, gaps and growth opportunities.' },
                { step: '02', label: 'Architect', desc: 'Map the complete digital system design, code, automation.' },
                { step: '03', label: 'Execute', desc: 'Build and launch with speed, precision, and zero excuses.' },
                { step: '04', label: 'Compound', desc: 'Optimise, iterate and scale what is already working.' },
              ].map((item) => (
                <div key={item.step} className="about-card-hover-x flex items-start gap-5 mb-7 last:mb-0"
                  style={{ transition: 'transform 0.25s ease' }}
                >
                  <span className="font-headline font-black text-2xl shrink-0"
                    style={{ color: '#D6008D', minWidth: '2.5rem' }}>{item.step}</span>
                  <div>
                    <p className="font-headline font-bold text-sm mb-1" style={{ color: '#ffffffff' }}>{item.label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#ffffffff' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ── VALUES ── */}
      <section className="py-24 px-5 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
              <span className="material-symbols-outlined text-sm" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>view_in_ar</span>
              <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>Core Principles</span>
            </div>
            <h2 className="font-headline font-black" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#ffffff' }}>
              The DNA of<br />
              <span style={{ color: '#D6008D' }}>Everything We Build</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="about-value-card h-full">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(214, 0, 143, 0)', border: '1px solid #D6008D' }}>
                    <span className="material-symbols-outlined" style={{ color: '#D6008D', fontSize: '1.5rem' }}>{v.icon}</span>
                  </div>
                  <h3 className="font-headline font-black text-lg mb-3" style={{ color: '#ffffffff' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#ffffffff' }}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />


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
                  <span className="font-headline font-black text-2xl flex-shrink-0 w-10 tabular-nums" style={{ color: '#D6008D' }}>{v.num}.</span>
                  <div>
                    <h3 className="font-headline font-black text-base md:text-lg mb-2" style={{ color: '#ffffffff' }}>{v.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#ffffffff' }}>{v.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      <Divider />

      {/* ── CAPABILITIES ── */}
      <section className="py-24 px-5 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
              <span className="material-symbols-outlined text-sm" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>build_circle</span>
              <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>What We Do</span>
            </div>
            <h2 className="font-headline font-black" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#ffffff' }}>
              Full Spectrum<br />
              <span style={{ color: '#D6008D' }}>Digital Capability</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-base" style={{ color: 'rgba(255, 255, 255, 1)' }}>
              One studio. Every capability you need to build, grow and automate your business online.
            </p>
          </FadeIn>

          {/* <div className="flex flex-wrap gap-3 justify-center">
            {CAPABILITIES.map((c, i) => (
              <FadeIn key={c.label} delay={i * 0.07}>
                <div className="about-capability-pill">
                  <span className="material-symbols-outlined text-base" style={{ color: '#D6008D' }}>{c.icon}</span>
                  <span className="text-sm font-headline font-bold" style={{ color: '#1a0a2e' }}>{c.label}</span>
                </div>
              </FadeIn>
            ))}
          </div> */}

          {/* Split manifesto */}
          <FadeIn delay={0.2} className="mt-20">
            <div className="rounded-3xl p-10 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-10 relative overflow-hidden"
              style={{ background: 'rgba(243, 238, 249, 0)', border: '2px solid #D6008D' }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,184,76,0.08), transparent 60%)' }} />
              {[
                { heading: 'We are not cheap.', body: 'We are the most cost effective decision you will make because everything we build compounds over time.' },
                { heading: 'We are not fast.', body: 'We are precise. We ship when things are done properly, not when the clock runs out.' },
                { heading: 'We are not vendors.', body: 'We are architects. Long term partners who are invested in the outcomes, not the invoice.' },
              ].map((m, i) => (
                <div key={i} className="relative z-10">
                  <h3 className="font-headline font-black text-lg mb-3" style={{ color: '#ffffffff' }}>{m.heading}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#ffffffff' }}>{m.body}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-5 md:px-10">
        <FadeIn>
          <div className="max-w-4xl mx-auto rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{ background: 'rgba(243, 238, 249, 0)', border: '1px solid #D6008D', backdropFilter: 'blur(24px)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% -5%, rgba(214,0,141,0.18), transparent 55%)' }} />
            <div
              className="cta-icon w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-7 relative z-10"
              style={{ background: 'rgba(214,0,141,0.08)', border: '1px solid #D6008D', animation: 'cta-pulse 4s ease-in-out infinite' }}
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-2xl" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>flash_on</span>
            </div>
            <h2 className="font-headline font-black mb-5 relative z-10"
              style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#ffffffff' }}>
              Let us build your<br />
              <span style={{ color: '#D6008D' }}>
                unfair advantage.
              </span>
            </h2>
            <p className="mb-10 max-w-xl mx-auto leading-relaxed relative z-10" style={{ color: '#ffffffff' }}>
              Whether you are starting from scratch or ready to scale what is already working we have the team, the tools and the drive to get you there.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link href="/contact">
                <button
                  style={{
                    background: '#D6008D', color: '#ffffff',
                    fontFamily: 'inherit', fontWeight: 800,
                    borderRadius: '9999px', border: 'none', cursor: 'pointer',
                    padding: '1rem 3rem', fontSize: '1rem',
                    boxShadow: '0 0 30px rgba(214,0,141,0.4)',
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Book a Free Strategy Call
                </button>
              </Link>
              <Link href="/services">
                <button
                  style={{
                    background: '#12002F', color: '#ffffff',
                    fontFamily: 'inherit', fontWeight: 800,
                    borderRadius: '9999px', border: '1px solid #D6008D',
                    cursor: 'pointer', backdropFilter: 'blur(12px)',
                    padding: '1rem 3rem', fontSize: '1rem',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  See Our Work
                </button>
              </Link>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-center text-xs font-headline font-bold mt-8" style={{ color: '#ffffff' }}>
            WEBXAUTOMATION · Digital Growth & AI Automation Agency · webxautomation.in
          </p>
        </FadeIn>
      </section>
    </>
  )
}