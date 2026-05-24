'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

/* ── Scroll progress bar (matches Home3) ── */
function ScrollBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div style={{
      scaleX, transformOrigin: 'left',
      position: 'fixed', top: 0, left: 0, right: 0, height: 3,
      background: 'linear-gradient(90deg,#732c7c,#d1746d,#f6a16c)', zIndex: 999,
    }} />
  )
}

/* ── Floating orbs (matches Home3) ── */
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

/* ── Section divider (matches Home3) ── */
function Divider() {
  return (
    <div className="w-full h-px my-2"
      style={{ background: 'linear-gradient(90deg,transparent,rgba(115,44,124,0.28),rgba(209,116,109,0.18),transparent)' }} />
  )
}

/* ── FAQ accordion ── */
function FAQSection({ faqs }) {
  const [open, setOpen] = useState(null)
  return (
    <section className="py-20 px-5 md:px-10 relative" style={{ zIndex: 1 }}>
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="font-headline font-bold tracking-widest uppercase text-xs mb-3" style={{ color: '#D6008D' }}>FAQs</p>
          <h2 className="font-headline font-black mb-12" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#ffffffff' }}>
            Frequently Asked Questions
          </h2>
        </FadeIn>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <motion.div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(243, 238, 249, 0)',
                  border: open === i ? '1px solid #D6008D' : '1px solid #D6008D',
                  transition: 'border-color 0.3s ease',
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <span className="font-headline font-bold text-base md:text-lg leading-snug" style={{ color: '#ffffffff' }}>
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="material-symbols-outlined flex-shrink-0"
                    style={{ color: '#D6008D', fontSize: '1.4rem' }}
                  >
                    add
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: '#ffffffff' }}>
                    {faq.a}
                  </p>
                </motion.div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   MAIN TEMPLATE
═══════════════════════════════════════════ */
export default function ServicePageTemplate({ service }) {
  return (
    <>
      <ScrollBar />
      <Orbs />

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }
        .text-highlight{
          color:#D6008D;
          font-weight:600;
        }
        .spt-card {
          background: rgba(243, 238, 249, 0);
          border: 2px solid #D6008D !important;
          border-radius: 20px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
        }
        .spt-card:hover {
          border-color: #D6008D;
          box-shadow: 0 0 50px rgba(115,44,124,0.10), 0 24px 70px rgba(67,23,95,0.12);
          transform: translateY(-6px);
        }

        .spt-process-step {
          background: rgba(243, 238, 249, 0);
          border: 2px solid #D6008D;
          border-radius: 20px;
          backdrop-filter: blur(16px);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .spt-process-step::before {
          content:'';
          position: absolute; top:0; left:0; right:0; height:3px;
          background: linear-gradient(90deg,#732c7c,#d1746d);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease;
        }
        .spt-process-step:hover {
          border-color: #D6008D;
          transform: translateY(-6px);
          box-shadow: 0 0 40px rgba(115,44,124,0.10), 0 20px 60px rgba(67,23,95,0.12);
        }
        .spt-process-step:hover::before { transform: scaleX(1); }

        .spt-result-card {
          background: rgba(243, 238, 249, 0);
          border: 2px solid #D6008D;
          border-radius: 20px;
          transition: all 0.3s ease;
        }
        .spt-result-card:hover {
          border-color: #D6008D;
          transform: translateY(-5px);
          box-shadow: 0 0 36px rgba(115,44,124,0.10), 0 16px 50px rgba(67,23,95,0.10);
        }

        .spt-stack-pill {
          background: rgba(243, 238, 249, 0);
          border: 1px solid #D6008D;
          border-radius: 9999px;
          transition: all 0.25s ease;
        }
        .spt-stack-pill:hover {
          border-color: #D6008D;
          background: rgba(115,44,124,0.07);
          transform: scale(1.06);
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 px-5 md:px-10 overflow-hidden" style={{ zIndex: 1 }}>
        <motion.div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 30% 50%, rgba(115,44,124,0.10) 0%, transparent 60%)'
        }} />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border hidden xl:block pointer-events-none"
          style={{ borderColor: 'rgba(115,44,124,0.07)' }}
        />

        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <FadeIn>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-headline font-bold mb-10 transition-colors" style={{ color: '#8a6fa0' }}>
              <span className="material-symbols-outlined text-base">arrow_back</span> All Services
            </Link>
          </FadeIn>

          {/* AI tag */}
          <FadeIn delay={0.04}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(115,44,124,0.18)' }}>
              <span className="text-xs font-headline font-bold tracking-widest" style={{ color: '#D6008D' }}>
                {service.aiTag}
              </span>
            </div>
          </FadeIn>

          {/* Category label */}
          <FadeIn delay={0.07}>
            <p className="font-headline font-bold tracking-widest uppercase text-xs mb-4" style={{ color: '#D6008D' }}>
              {service.category}
            </p>
          </FadeIn>

          {/* Title two-line style from HTML */}
          <FadeIn delay={0.1}>
            <h1 className="font-headline font-black tracking-tighter leading-[0.88] mb-8"
              style={{ fontSize: 'clamp(2.8rem,7vw,6.5rem)', color: '#ffffffff' }}>
              {service.titleLine1}<br />
              <span style={{ color: '#D6008D' }}>
                {service.titleLine2}
              </span>
            </h1>
          </FadeIn>

          {/* Description */}
          {/* <FadeIn delay={0.15}>
            <p className="text-lg md:text-xl max-w-3xl leading-relaxed mb-10" style={{ color: '#ffffffff' }}>
              {service.desc}
            </p>
          </FadeIn> */}

          {/* Optimized Tailwind version */}
          <div className="max-w-3xl mb-10 space-y-6 [&_strong]:text-blue-400 [&_strong]:font-semibold">
            {service.desc.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg md:text-xl leading-relaxed text-white/90"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>

          {/* CTA buttons */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <button className="btn-primary px-8 py-4 text-base" style={{ background: '#D6008D', color: '#fff', fontFamily: 'inherit', fontWeight: 700, borderRadius: '9999px', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s, transform 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                  Start This Project
                </button>
              </Link>
              <Link href="/contact">
                <button style={{ border: '1.5px solid rgba(115,44,124,0.40)', color: '#ffffffff', fontFamily: 'inherit', fontWeight: 700, borderRadius: '9999px', background: 'transparent', padding: '16px 32px', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.25s ease' }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(115,44,124,0.07)'; e.currentTarget.style.borderColor = '#D6008D' }}
                  onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#D6008D' }}>
                  Book a Free Call
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="relative px-5 md:px-10" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto"><Divider /></div>
      </div>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="py-20 px-5 md:px-10 relative" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="font-headline font-bold tracking-widest uppercase text-xs mb-3" style={{ color: '#D6008D' }}>What You Get</p>
            <h2 className="font-headline font-black mb-12" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#ffffffff' }}>
              Everything Included
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.features.map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 0.07}>
                <div className="spt-card p-7 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                    style={{ background: 'rgba(115,44,124,0.09)', border: '1px solid #D6008D' }}>
                    <span className="material-symbols-outlined" style={{ color: '#D6008D', fontSize: '1.3rem' }}>{feat.icon}</span>
                  </div>
                  <h3 className="font-headline font-black text-base mb-2" style={{ color: '#ffffffff' }}>{feat.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#ffffffff' }}>{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="relative px-5 md:px-10" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto"><Divider /></div>
      </div>

      {/* ── HOW WE DELIVER ── */}
      <section className="py-20 px-5 md:px-10 relative" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="font-headline font-bold tracking-widest uppercase text-xs mb-3" style={{ color: '#D6008D' }}>Our Approach</p>
            <h2 className="font-headline font-black mb-12" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#ffffffff' }}>
              How We Deliver
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {service.process.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="spt-process-step p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-headline font-black text-4xl" style={{ color: '#D6008D' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="material-symbols-outlined text-base" style={{ color: '#D6008D' }}>arrow_forward</span>
                  </div>
                  <h3 className="font-headline font-black text-base mb-3" style={{ color: '#ffffffff' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: '#ffffffff' }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="relative px-5 md:px-10" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto"><Divider /></div>
      </div>

      {/* ── RESULTS ── */}
      {/* <section className="py-20 px-5 md:px-10 relative" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="font-headline font-bold tracking-widest uppercase text-xs mb-3" style={{ color: '#D6008D' }}>Results</p>
            <h2 className="font-headline font-black" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#ffffffff' }}>
              Numbers That Matter
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {service.results.map((r, i) => (
              <FadeIn key={r.label} delay={i * 0.08}>
                <div className="spt-result-card p-8 text-center">
                  <p className="font-headline font-black mb-2"
                    style={{ fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: '#D6008D' }}>
                    {r.val}
                  </p>
                  <p className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#8a6fa0' }}>{r.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── TECH STACK (optional) ── */}
      {/* {service.stack && service.stack.length > 0 && (
        <>
          <div className="relative px-5 md:px-10" style={{ zIndex: 1 }}>
            <div className="max-w-7xl mx-auto"><Divider /></div>
          </div>
          <section className="py-16 px-5 md:px-10 relative" style={{ zIndex: 1 }}>
            <div className="max-w-7xl mx-auto">
              <FadeIn>
                <p className="font-headline font-bold tracking-widest uppercase text-xs mb-6" style={{ color: '#D6008D' }}>Platforms & Tools</p>
              </FadeIn>
              <div className="flex flex-wrap gap-3">
                {service.stack.map((tech, i) => (
                  <FadeIn key={tech} delay={i * 0.04}>
                    <span className="spt-stack-pill px-5 py-2.5 text-sm font-headline font-bold" style={{ color: '#ffffffff' }}>
                      {tech}
                    </span>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        </>
      )} */}

      {/* ── FAQ ── */}
      {service.faqs && service.faqs.length > 0 && (
        <>
          <div className="relative px-5 md:px-10" style={{ zIndex: 1 }}>
            <div className="max-w-7xl mx-auto"><Divider /></div>
          </div>
          <FAQSection faqs={service.faqs} />
        </>
      )}

      <div className="relative px-5 md:px-10" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto"><Divider /></div>
      </div>

      {/* ── CTA ── */}
      <section className="py-24 px-5 md:px-10 relative" style={{ zIndex: 1 }}>
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center rounded-3xl p-10 md:p-16 relative overflow-hidden"
            style={{ background: 'rgba(243, 238, 249, 0)', border: '1px solid #D6008D' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(115,44,124,0.10) 0%,transparent 60%)' }} />
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10"
              style={{ background: 'rgba(115,44,124,0.10)', border: '1px solid #D6008D' }}>
              <span className="material-symbols-outlined text-2xl" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>
                flash_on
              </span>
            </motion.div>
            <h2 className="font-headline font-black tracking-tight leading-tight mb-5 relative z-10"
              style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#ffffffff' }}>
              Ready to get started with<br />
              <span style={{ color: '#D6008D' }}>
                {service.category}?
              </span>
            </h2>
            <p className="mb-10 relative z-10 max-w-xl mx-auto" style={{ color: '#ffffffff' }}>
              Let&apos;s build something extraordinary together. No pressure just a conversation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link href="/contact">
                <button style={{ background: '#D6008D', color: '#fff', fontFamily: 'inherit', fontWeight: 700, borderRadius: '9999px', border: 'none', padding: '16px 40px', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 0 24px rgba(115,44,124,0.35)', transition: 'opacity 0.2s, transform 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.04)' }}
                  onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}>
                  Book a Free Call
                </button>
              </Link>
              <Link href="/services">
                <button style={{ background: '#12002F', border: '1.5px solid rgba(115,44,124,0.38)', color: '#ffffffff', fontFamily: 'inherit', fontWeight: 700, borderRadius: '9999px', padding: '16px 40px', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.25s ease' }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(115,44,124,0.7)'; e.currentTarget.style.borderColor = 'rgba(115,44,124,0.7)' }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(115,44,124,1)'; e.currentTarget.style.borderColor = 'rgba(115,44,124,1)' }}>
                  All Services
                </button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
