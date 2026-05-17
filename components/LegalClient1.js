'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

/* ─────────────────────────────────────────
   EXACT CONTENT FROM DOCX ZERO CHANGES
───────────────────────────────────────── */
const SECTIONS = [
  {
    num: '01', icon: 'group', title: 'Parties and Scope',
    clauses: [
      { id: '1.1', text: 'These Terms apply to all marketing communications sent by Webxautomation, operating as a digital marketing brand under the parent company [YOUR LEGAL NAME] trading as Webxautomation, to individuals who have opted in to receive such communications.' },
      { id: '1.2', text: 'Webxautomation specialises in digital marketing services including but not limited to paid media, performance marketing, AI assisted campaign management, content creation, and marketing automation.' },
      { id: '1.3', text: 'By submitting your mobile number and/or email address and selecting the opt in checkbox on our website, you acknowledge that you have read, understood, and agreed to these Terms.' },
      { id: '1.4', text: 'If you do not agree to these Terms, please do not provide your contact details or select the opt in checkbox.' },
    ],
  },
  {
    num: '02', icon: 'check_circle', title: 'Consent and Opt In',
    clauses: [
      { id: '2.1', text: 'When you submit your mobile number and/or email address and check the consent checkbox on our form, you are providing express written consent to receive recurring marketing messages from Webxautomation through SMS and/or email channels.' },
      { id: '2.2', text: 'This consent is entirely voluntary. Consent is not a condition of purchase or receipt of services.' },
      { id: '2.3', text: 'You represent and warrant that you are the authorised user of the mobile number and/or email address you provide.' },
      { id: '2.4', text: 'Marketing communications may include, but are not limited to: promotional offers, service updates, product announcements, campaign reports, digital marketing insights, AI generated content previews, and other marketing related content.' },
      { id: '2.5', text: 'Message and email frequency: approximately 2–4 times per month, although frequency may vary based on promotional periods or service updates.' },
      { id: '2.6', text: 'Standard message and data rates may apply to SMS communications, as determined by your mobile network provider.' },
      { id: '2.7', text: 'Messages may be sent using an automatic telephone dialing system (ATDS) or email automation software, including AI assisted delivery tools.' },
    ],
  },
  {
    num: '03', icon: 'robot_2', title: 'Use of Artificial Intelligence (AI) Tools',
    clauses: [
      { id: '3.1', text: 'Webxautomation utilises artificial intelligence (AI) tools and automated systems in the preparation, generation, and delivery of marketing communications. This may include AI assisted content creation, personalisation engines, predictive analytics, and automated scheduling software.' },
      { id: '3.2', text: 'AI generated content used in our communications is reviewed and approved by authorised personnel at Webxautomation prior to delivery, to ensure accuracy, relevance, and compliance with applicable laws.' },
      { id: '3.3', text: 'By opting in, you acknowledge and accept that some or all of the communications you receive may be prepared or personalised using AI driven tools operated by or on behalf of [YOUR LEGAL NAME] trading as Webxautomation.' },
      { id: '3.4', text: 'We are committed to ensuring that AI assisted communications comply with the Australian Spam Act 2003, the Digital Personal Data Protection Act 2023 (India), and all relevant ACMA (Australian Communications and Media Authority) guidelines.' },
      { id: '3.5', text: 'AI tools used by Webxautomation shall not make autonomous decisions that directly and materially affect your legal rights without human oversight.' },
      { id: '3.6', text: 'If you have concerns regarding AI generated communications, you may contact us at contact@webxautomation.in to request human review or opt out.' },
    ],
  },
  {
    num: '04', icon: 'logout', title: 'How to Opt Out',
    clauses: [
      { id: '4.1', text: 'You may withdraw your consent and opt out of marketing communications at any time, free of charge.' },
      { id: '4.2', text: 'SMS opt out: Reply STOP to any SMS message received from us to unsubscribe immediately from future text messages.' },
      { id: '4.3', text: 'Email opt out: Click the Unsubscribe link located at the bottom of any marketing email to remove yourself from our email list.' },
      { id: '4.4', text: 'Manual opt out: You may also contact us directly at contact@webxautomation.in to request removal from both SMS and email marketing communications.' },
      { id: '4.5', text: 'Opt out requests will be processed within a reasonable timeframe, generally within 5 business days. You may receive one additional message confirming your opt out.' },
      { id: '4.6', text: 'Opting out of marketing communications will not affect any transactional or service related communications that may be necessary for the delivery of services you have engaged with.' },
    ],
  },
  {
    num: '05', icon: 'support_agent', title: 'Help and Support',
    clauses: [
      { id: '5.1', text: 'SMS support: Reply HELP to any SMS message to receive assistance regarding our communications.' },
      { id: '5.2', text: 'Email/General support: Contact us at contact@webxautomation.in for any queries, complaints, or requests relating to our marketing communications.' },
      { id: '5.3', text: 'All support enquiries will be acknowledged within 2 business days and resolved within 10 business days where possible.' },
    ],
  },
  {
    num: '06', icon: 'warning', title: 'Delivery Disclaimer',
    clauses: [
      { id: '6.1', text: 'Webxautomation and [YOUR LEGAL NAME] trading as Webxautomation do not guarantee the delivery of SMS or email messages. Delivery may be impacted by factors outside our control, including your mobile network provider, spam filters, technical outages, or incorrect contact details.' },
      { id: '6.2', text: 'We shall not be liable for any loss, damage, or inconvenience arising from failed, delayed, or misdirected communications.' },
      { id: '6.3', text: 'It is your responsibility to ensure the contact details you provide are accurate and up to date.' },
    ],
  },
  {
    num: '07', icon: 'verified', title: 'Intellectual Property',
    clauses: [
      { id: '7.1', text: 'All content contained in our marketing communications, including text, graphics, images, and AI generated materials, is the intellectual property of Webxautomation or [YOUR LEGAL NAME] trading as Webxautomation, unless otherwise stated.' },
      { id: '7.2', text: 'You may not reproduce, distribute, or use any of our marketing content without prior written consent from [YOUR LEGAL NAME] trading as Webxautomation.' },
    ],
  },
  {
    num: '08', icon: 'gpp_bad', title: 'Limitation of Liability',
    clauses: [
      { id: '8.1', text: 'To the fullest extent permitted by applicable Australian law, Webxautomation and [YOUR LEGAL NAME] trading as Webxautomation shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your receipt of or reliance on our marketing communications.' },
      { id: '8.2', text: 'Nothing in these Terms limits or excludes any rights you may have under the Australian Consumer Law (ACL) or any other non excludable statutory rights.' },
    ],
  },
  {
    num: '09', icon: 'balance', title: 'Governing Law and Jurisdiction',
    clauses: [
      { id: '9.1', text: 'These Terms are governed by and construed in accordance with the laws of the State of New South Wales, Australia.' },
      { id: '9.2', text: 'Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of New South Wales, Australia.' },
      { id: '9.3', text: "[YOUR LEGAL NAME] trading as Webxautomation is the legal entity responsible for Webxautomation's operations and is subject to all applicable Australian regulatory requirements." },
    ],
  },
  {
    num: '10', icon: 'edit_note', title: 'Updates to These Terms',
    clauses: [
      { id: '10.1', text: 'Webxautomation, a division of [YOUR LEGAL NAME] trading as Webxautomation, reserves the right to update or modify these Terms at any time.' },
      { id: '10.2', text: 'Any changes will be posted on our website with the updated effective date. Continued receipt of or subscription to our marketing communications following any such changes constitutes your acceptance of the updated Terms.' },
      { id: '10.3', text: 'If material changes are made, we will endeavour to notify you via email or SMS prior to the changes taking effect.' },
    ],
  },
  {
    num: '11', icon: 'contact_mail', title: 'Contact Details',
    clauses: [
      { id: '11.1', text: 'For all enquiries relating to these Terms and Conditions, please contact:' },
      { id: 'contact', isContact: true },
    ],
  },
]

/* ─────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────── */
function ScrollBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      style={{
        scaleX, transformOrigin: 'left',
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 3,
        background: 'linear-gradient(90deg,#732c7c,#d1746d,#f6a16c)',
        zIndex: 999,
      }}
    />
  )
}

/* ─────────────────────────────────────────
   FLOATING ORBS
───────────────────────────────────────── */
function Orbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {[
        { w: 520, h: 520, top: '-5%', left: '52%', c: 'rgba(115,44,124,0.055)', dur: 10, delay: 0 },
        { w: 400, h: 400, top: '38%', left: '-8%', c: 'rgba(209,116,109,0.065)', dur: 13, delay: 2.5 },
        { w: 320, h: 320, top: '68%', left: '70%', c: 'rgba(246,161,108,0.045)', dur: 8, delay: 5 },
        { w: 240, h: 240, top: '85%', left: '28%', c: 'rgba(115,44,124,0.04)', dur: 11, delay: 1.5 },
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
   STICKY SIDEBAR
───────────────────────────────────────── */
function Sidebar({ activeId }) {
  return (
    <div className="hidden xl:block w-64 flex-shrink-0">
      <div className="sticky top-28 rounded-2xl p-5"
        style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(255,46,136,0.13)', backdropFilter: 'blur(20px)' }}>
        <p className="text-xs font-headline font-bold uppercase tracking-widest px-3 pb-4" style={{ color: '#732c7c' }}>
          Sections
        </p>
        {SECTIONS.map(s => {
          const id = `sec-${s.num}`
          const active = activeId === id
          return (
            <a key={id} href={`#${id}`} style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.18 }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer mb-0.5"
                style={{ background: active ? 'rgba(115,44,124,0.1)' : 'transparent', borderLeft: active ? '2px solid #732c7c' : '2px solid transparent', transition: 'background 0.25s,border-color 0.25s' }}>
                <span className="material-symbols-outlined flex-shrink-0"
                  style={{ color: active ? '#732c7c' : 'rgba(74,53,96,0.4)', fontSize: '0.95rem' }}>{s.icon}</span>
                <span className="text-xs font-headline font-bold truncate leading-snug"
                  style={{ color: active ? '#1a0a2e' : '#4a3560' }}>{s.num}. {s.title}</span>
              </motion.div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   SECTION CARD
───────────────────────────────────────── */
function SectionCard({ section, index }) {
  const id = `sec-${section.num}`
  return (
    <FadeIn delay={0.05 * (index % 5)}>
      <motion.div id={id}
        whileHover={{ borderColor: 'rgba(115,44,124,0.38)', boxShadow: '0 0 55px rgba(115,44,124,0.1),0 24px 70px rgba(67,23,95,0.12)', y: -4 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl overflow-hidden"
        style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(115,44,124,0.1)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>

        {/* Header */}
        <div className="flex items-center gap-4 px-7 md:px-9 pt-7 pb-5">
          <motion.div whileHover={{ rotate: -8, scale: 1.12 }} transition={{ duration: 0.28 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(115,44,124,0.09)', border: '1px solid rgba(115,44,124,0.22)' }}>
            <span className="material-symbols-outlined" style={{ color: '#732c7c', fontSize: '1.35rem' }}>{section.icon}</span>
          </motion.div>
          <div>
            <p className="text-xs font-headline font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(115,44,124,0.38)' }}>
              Section {section.num}
            </p>
            <h2 className="font-headline font-black text-lg md:text-xl leading-tight" style={{ color: '#1a0a2e' }}>
              {section.title}
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-7 md:mx-9 h-px mb-6"
          style={{ background: 'linear-gradient(90deg,rgba(115,44,124,0.28),rgba(123,47,255,0.14),transparent)' }} />

        {/* Clauses */}
        <div className="px-7 md:px-9 pb-8 space-y-5">
          {section.clauses.map((clause, j) => {
            if (clause.isContact) return (
              <motion.div key="contact"
                initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: j * 0.07 }}
                className="rounded-xl p-6"
                style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(115,44,124,0.2)' }}>
                <p className="font-headline font-black text-base mb-1" style={{ color: '#1a0a2e' }}>Webxautomation</p>
                <p className="text-sm mb-4" style={{ color: '#4a3560' }}>A Division of [YOUR LEGAL NAME] trading as Webxautomation</p>
                <div className="flex flex-col gap-3">
                  <a href="mailto:contact@webxautomation.in" className="inline-flex items-center gap-2 text-sm font-headline font-bold" style={{ color: '#732c7c', textDecoration: 'none' }}>
                    <span className="material-symbols-outlined text-base">mail</span>
                    contact@webxautomation.in
                  </a>
                  <a href="https://www.webxautomation.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-headline font-bold" style={{ color: '#d1746d', textDecoration: 'none' }}>
                    <span className="material-symbols-outlined text-base">language</span>
                    www.webxautomation.in
                  </a>
                </div>
              </motion.div>
            )
            return (
              <motion.div key={clause.id}
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: j * 0.055, duration: 0.32 }}
                className="flex gap-4 group">
                <span className="font-headline font-black text-xs pt-0.5 flex-shrink-0 w-8 tabular-nums"
                  style={{ color: 'rgba(255,46,136,0.32)' }}>{clause.id}</span>
                <p className="text-sm leading-relaxed transition-colors duration-200 group-hover:text-[#c9aaee]"
                  style={{ color: '#4a3560', borderLeft: '1px solid rgba(115,44,124,0.12)', paddingLeft: '1rem' }}>
                  {clause.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </FadeIn>
  )
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function LegalClient() {
  const [activeId, setActiveId] = useState('')
  const { scrollY } = useScroll()

  // Parallax layers
  const heroBgY = useTransform(scrollY, [0, 600], [0, 180])
  const heroBg2Y = useTransform(scrollY, [0, 600], [0, 90])
  const titleY = useTransform(scrollY, [0, 400], [0, 60])
  const subTitleY = useTransform(scrollY, [0, 400], [0, 30])

  // Active section tracker
  useEffect(() => {
    const ids = SECTIONS.map(s => `sec-${s.num}`)
    const obs = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveId(id) },
        { rootMargin: '-25% 0px -65% 0px' }
      )
      o.observe(el); obs.push(o)
    })
    return () => obs.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      <ScrollBar />
      <Orbs />

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.65)} }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 px-5 md:px-10 overflow-hidden" style={{ zIndex: 1 }}>

        {/* Parallax radial backgrounds */}
        <motion.div style={{
          y: heroBgY, position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 42% -10%, rgba(115,44,124,0.2) 0%, transparent 55%)'
        }} />
        <motion.div style={{
          y: heroBg2Y, position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 78% 70%, rgba(209,116,109,0.1) 0%, transparent 50%)'
        }} />

        <div className="max-w-5xl mx-auto relative z-10">

          {/* Badge */}
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10"
              style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(115,44,124,0.25)', backdropFilter: 'blur(14px)' }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: '#D6008D', boxShadow: '0 0 8px #732c7c', animation: 'pulse-dot 2s ease-in-out infinite' }} />
              <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>Legal Document</span>
            </div>
          </FadeIn>

          {/* Headline parallax layers */}
          <div className="overflow-visible mb-4">
            <motion.div style={{ y: titleY }}>
              <FadeIn delay={0.08}>
                <h1 className="font-headline font-black tracking-tighter leading-[0.86]"
                  style={{ fontSize: 'clamp(3.2rem,10vw,8.5rem)', color: '#ffffffff' }}>
                  Terms &amp;
                </h1>
              </FadeIn>
            </motion.div>
            <motion.div style={{ y: subTitleY }}>
              <FadeIn delay={0.14}>
                <h1 className="font-headline font-black tracking-tighter leading-[0.86]"
                  style={{
                    fontSize: 'clamp(3.2rem,10vw,8.5rem)',
                    color: '#FFB84C'
                  }}>
                  Conditions.
                </h1>
              </FadeIn>
            </motion.div>
          </div>

          {/* Meta info row */}
          <FadeIn delay={0.22}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 mb-7">
              {[
                { icon: 'corporate_fare', text: 'Webxautomation A Division of [YOUR LEGAL NAME] trading as Webxautomation' },
                { icon: 'calendar_today', text: 'Effective Date: 1 January 2025' },
                { icon: 'tag', text: 'Version 1.0' },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined" style={{ color: '#D6008D', fontSize: '0.95rem' }}>{m.icon}</span>
                  <span className="text-xs font-headline font-bold" style={{ color: '#ffffffff' }}>{m.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Intro paragraph verbatim */}
          <FadeIn delay={0.28}>
            <div className="rounded-2xl p-6 md:p-8 max-w-3xl"
              style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(115,44,124,0.15)', backdropFilter: 'blur(18px)' }}>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#4a3560' }}>
                These Terms and Conditions (&ldquo;Terms&rdquo;) govern the marketing communications sent by{' '}
                <span style={{ color: '#1a0a2e', fontWeight: 700 }}>Webxautomation</span>, a brand and division of{' '}
                <span style={{ color: '#1a0a2e', fontWeight: 700 }}>[YOUR LEGAL NAME] trading as Webxautomation</span> (ABN as registered),
                a company incorporated under the laws of India (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).
                By providing your contact details and opting in on our website, you agree to be bound by these Terms.
                Please read them carefully before consenting.
              </p>
            </div>
          </FadeIn>

          {/* Mobile quick-jump */}
          <FadeIn delay={0.34}>
            <div className="flex flex-wrap gap-2 mt-8 xl:hidden">
              <p className="w-full text-xs font-headline font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(115,44,124,0.45)' }}>Jump to</p>
              {SECTIONS.map(s => (
                <a key={s.num} href={`#sec-${s.num}`} style={{ textDecoration: 'none' }}>
                  <motion.span whileHover={{ scale: 1.06, y: -2 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-headline font-bold cursor-pointer"
                    style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(115,44,124,0.18)', color: '#4a3560' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '0.8rem', color: '#732c7c' }}>{s.icon}</span>
                    {s.title}
                  </motion.span>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="relative z-10 px-5 md:px-10 mb-12">
        <div className="max-w-7xl mx-auto h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(115,44,124,0.3),rgba(209,116,109,0.2),transparent)' }} />
      </div>

      {/* ── CONTENT ── */}
      <section className="relative z-10 px-5 md:px-10 pb-28">
        <div className="max-w-7xl mx-auto flex gap-8 items-start">
          <Sidebar activeId={activeId} />

          <div className="flex-1 min-w-0 space-y-4">
            {SECTIONS.map((s, i) => <SectionCard key={s.num} section={s} index={i} />)}

            {/* Footer verbatim */}
            <FadeIn>
              <div className="rounded-2xl p-7 md:p-10 text-center mt-4"
                style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(255,46,136,0.24)', backdropFilter: 'blur(20px)' }}>
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'rgba(115,44,124,0.09)', border: '1px solid rgba(115,44,124,0.22)' }}>
                  <span className="material-symbols-outlined" style={{ color: '#732c7c' }}>shield</span>
                </motion.div>
                <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: '#4a3560' }}>
                  This document constitutes the full Terms and Conditions for marketing communications issued by{' '}
                  <span style={{ color: '#1a0a2e', fontWeight: 700 }}>Webxautomation</span>, a division of [YOUR LEGAL NAME] trading as Webxautomation.
                </p>
                <p className="text-xs mt-4 font-headline font-bold" style={{ color: '#12002F' }}>
                  © 2025 Webxautomation, a Division of [YOUR LEGAL NAME] trading as Webxautomation. All rights reserved.&nbsp;·&nbsp;contact@webxautomation.in
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-7">
                  <a href="/contact">
                    <button className="btn-primary px-8 py-3 text-sm glow-pink">Contact Us</button>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
