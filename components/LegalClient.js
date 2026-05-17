'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

/* ─────────────────────────────────────────────────────
   PRIVACY DATA
───────────────────────────────────────────────────── */
const PRIVACY_SECTIONS = [
  {
    icon: 'database',
    title: 'Information We Collect',
    content: [
      { sub: 'Information You Provide', body: 'When you contact us, fill out a form, or engage our services, we collect information you directly provide including your name, email address, phone number, company name, and any project details or messages you submit.' },
      { sub: 'Automatically Collected Data', body: 'When you visit our website, we automatically collect certain technical information including your IP address, browser type, operating system, referring URLs, pages visited, and time spent on each page. This data is collected via cookies and similar tracking technologies.' },
      { sub: 'Payment Information', body: 'We do not store payment card details directly. All payment transactions are processed through secure third-party payment processors (such as Stripe or PayPal) that comply with PCI-DSS standards.' },
    ],
  },
  {
    icon: 'manage_search',
    title: 'How We Use Your Information',
    content: [
      { sub: 'Service Delivery', body: 'We use your information to deliver, manage and improve the services you have requested including website design, AI automation workflows, SEO, and digital marketing.' },
      { sub: 'Communication', body: 'We use your contact information to respond to enquiries, send project updates, share invoices and proposals, and provide customer support throughout your engagement with us.' },
      { sub: 'Marketing & Updates', body: 'With your consent, we may send you newsletters, product updates, case studies and promotional content. You can opt out at any time using the unsubscribe link in any email we send.' },
      { sub: 'Analytics & Improvement', body: 'We use aggregated, anonymised data to understand how our website is used, identify areas for improvement, and optimise our service offerings.' },
    ],
  },
  {
    icon: 'share',
    title: 'Information Sharing',
    content: [
      { sub: 'We Do Not Sell Your Data', body: 'Webxautomation does not sell, rent or trade your personal information to third parties for their marketing purposes. Your data stays with us.' },
      { sub: 'Trusted Service Providers', body: 'We may share your information with carefully selected third-party service providers who assist us in operating our business such as cloud hosting providers (Vercel, AWS), email platforms (Postmark), analytics tools (Google Analytics) and project management software. These providers are contractually obligated to protect your data.' },
      { sub: 'Legal Requirements', body: 'We may disclose your information if required to do so by law, court order, or governmental authority, or if we believe in good faith that such disclosure is necessary to protect our rights, your safety, or the safety of others.' },
    ],
  },
  {
    icon: 'cookie',
    title: 'Cookies & Tracking',
    content: [
      { sub: 'Types of Cookies We Use', body: 'We use essential cookies required for the website to function, analytics cookies to understand site usage (Google Analytics), and preference cookies to remember your settings. We do not use advertising or targeting cookies.' },
      { sub: 'Managing Cookies', body: 'You can control and delete cookies through your browser settings at any time. Note that disabling certain cookies may affect the functionality of our website. Most browsers allow you to refuse cookies, delete existing cookies, and set preferences for future cookie use.' },
    ],
  },
  {
    icon: 'security',
    title: 'Data Security',
    content: [
      { sub: 'Our Security Measures', body: 'We implement industry-standard security measures to protect your personal data including SSL/TLS encryption in transit, secure data storage, access controls, and regular security reviews. Our hosting infrastructure is hosted on SOC 2 compliant platforms.' },
      { sub: 'Data Breach Notification', body: 'In the unlikely event of a data breach that affects your personal information, we will notify you and relevant authorities within 72 hours of becoming aware of the breach, in accordance with applicable data protection laws.' },
    ],
  },
  {
    icon: 'person_check',
    title: 'Your Rights',
    content: [
      { sub: 'Access & Portability', body: 'You have the right to request a copy of all personal data we hold about you, in a structured, machine-readable format.' },
      { sub: 'Correction', body: 'You have the right to request that we correct any inaccurate or incomplete personal data we hold about you.' },
      { sub: 'Deletion', body: 'You have the right to request deletion of your personal data ("right to be forgotten"), subject to certain legal exceptions such as data we are required to retain for tax or legal compliance.' },
      { sub: 'Opt-Out', body: 'You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or by contacting us directly at hello@webxautomation.com.' },
    ],
  },
  {
    icon: 'schedule',
    title: 'Data Retention',
    content: [
      { sub: 'Retention Periods', body: 'We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, including providing services to you and complying with legal obligations. Client project data is retained for a minimum of 3 years after project completion. Enquiry data from non-clients is deleted after 12 months of inactivity.' },
    ],
  },
  {
    icon: 'public',
    title: 'International Data Transfers',
    content: [
      { sub: 'Cross-Border Data', body: 'Webxautomation is based in India and serves clients globally including in Australia, the United States and the United Kingdom. When we transfer data internationally, we ensure appropriate safeguards are in place in accordance with applicable data protection laws, including standard contractual clauses where required.' },
    ],
  },
  {
    icon: 'edit_note',
    title: 'Changes to This Policy',
    content: [
      { sub: 'Policy Updates', body: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make material changes, we will update the "Last Updated" date at the top of this page and notify active clients by email. We encourage you to review this policy periodically.' },
    ],
  },
]

/* ─────────────────────────────────────────────────────
   TERMS DATA
───────────────────────────────────────────────────── */
const TERMS_SECTIONS = [
  {
    icon: 'handshake',
    title: 'Acceptance of Terms',
    content: [
      { sub: 'Agreement to Terms', body: 'By accessing or using the Webxautomation website, services, or engaging us for any project, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.' },
      { sub: 'Eligibility', body: 'You must be at least 18 years of age and have the legal authority to enter into a binding contract on behalf of yourself or the organisation you represent. By using our services, you confirm you meet these requirements.' },
    ],
  },
  {
    icon: 'work',
    title: 'Services & Deliverables',
    content: [
      { sub: 'Scope of Work', body: 'All services provided by Webxautomation including website design, AI automation, SEO, CRM integration, email sequences and social media marketing are governed by a project-specific proposal or agreement shared prior to commencement. The scope, timeline and deliverables are defined in that document.' },
      { sub: 'Revisions & Changes', body: 'Each service package includes a specified number of revision rounds as outlined in your proposal. Requests for changes beyond the agreed scope will be assessed and quoted separately. We will always notify you before undertaking out-of-scope work.' },
      { sub: 'Third-Party Tools', body: 'Some services involve third-party platforms such as Make.com, HubSpot, Vercel, Google Analytics, and others. Webxautomation is not responsible for downtime, policy changes, or pricing changes made by these third-party providers. We will communicate any known changes that may affect your project.' },
      { sub: 'Service Availability', body: 'We endeavour to deliver all services within the agreed timelines. However, timelines may be affected by delays in receiving required materials, feedback, or approvals from the client. We will communicate proactively if any delays arise on our end.' },
    ],
  },
  {
    icon: 'payments',
    title: 'Payment Terms',
    content: [
      { sub: 'Payment Structure', body: 'For project-based work, we require a 50% deposit before work commences and the remaining 50% upon project completion before the final deliverable or live launch. For retainer services, payment is due on the 1st of each month in advance.' },
      { sub: 'Late Payments', body: 'Invoices are due within 7 days of issue unless otherwise agreed in writing. Late payments beyond 14 days may result in work being paused until the outstanding balance is settled. We reserve the right to charge a late payment fee of 2% per month on overdue balances.' },
      { sub: 'Refund Policy', body: 'The deposit paid at project commencement is non-refundable once work has begun, as it covers time and resources already allocated. If you cancel mid-project, you are liable for payment of work completed up to the cancellation date. We will provide a detailed breakdown of work completed on request.' },
      { sub: 'Currency', body: 'All prices are quoted in USD unless explicitly stated otherwise in your project proposal. For clients in other regions, currency conversion is handled at the prevailing rate at the time of invoice.' },
    ],
  },
  {
    icon: 'verified',
    title: 'Intellectual Property',
    content: [
      { sub: 'Ownership Upon Full Payment', body: 'Upon receipt of final payment in full, all custom design assets, code and deliverables created specifically for your project are transferred to you. Webxautomation retains no ownership rights over these deliverables once payment is complete.' },
      { sub: 'Portfolio Rights', body: 'Unless you explicitly request otherwise in writing, Webxautomation reserves the right to showcase completed work in our portfolio, case studies, social media and marketing materials. We will never disclose confidential business information in such showcases.' },
      { sub: 'Third-Party Assets', body: 'Stock images, fonts, plugins, or other third-party assets used in your project are subject to their respective licences. Webxautomation will advise on licence requirements during the project. The client is responsible for purchasing any required commercial licences for third-party assets included in the final deliverable.' },
      { sub: 'Pre-existing IP', body: 'Webxautomation retains ownership of all pre-existing intellectual property, frameworks, libraries and tooling created prior to your project and used within it. You are granted a non-exclusive licence to use these components as part of your delivered project.' },
    ],
  },
  {
    icon: 'privacy_tip',
    title: 'Confidentiality',
    content: [
      { sub: 'Mutual Confidentiality', body: 'Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the engagement. This includes business strategies, financial data, unreleased products, customer data, and technical specifications.' },
      { sub: 'Duration', body: 'Confidentiality obligations remain in effect during the project and for a period of 2 years after project completion or termination, whichever is later.' },
    ],
  },
  {
    icon: 'group_work',
    title: 'Client Responsibilities',
    content: [
      { sub: 'Providing Materials', body: 'The client is responsible for providing all required content, assets, credentials, and feedback within agreed timelines. Delays in providing materials will directly impact delivery timelines. Webxautomation is not liable for delays caused by late client input.' },
      { sub: 'Accuracy of Information', body: 'You warrant that all information, content and materials provided to us are accurate, lawful, and do not infringe any third-party rights. You are solely responsible for any legal consequences arising from content you provide.' },
      { sub: 'Access & Credentials', body: 'Where access to existing systems is required (CMS, hosting, CRM, etc.), you are responsible for providing accurate credentials in a secure manner. We recommend using a password manager for credential sharing. Webxautomation will not store client credentials beyond the project period.' },
    ],
  },
  {
    icon: 'gpp_bad',
    title: 'Limitation of Liability',
    content: [
      { sub: 'No Guarantee of Results', body: 'While we work to deliver high-quality results, Webxautomation does not guarantee specific business outcomes such as revenue growth, search ranking positions, or lead volume. Digital results depend on many external factors outside our control.' },
      { sub: 'Liability Cap', body: "To the maximum extent permitted by applicable law, Webxautomation's total liability to you for any claim arising from or related to our services shall not exceed the total amount paid by you for the specific service giving rise to the claim in the 3 months prior to the claim." },
      { sub: 'Exclusion of Consequential Loss', body: 'We are not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profit, loss of data, loss of business, or reputational damage, even if we have been advised of the possibility of such damages.' },
    ],
  },
  {
    icon: 'cancel',
    title: 'Termination',
    content: [
      { sub: 'Termination by Client', body: 'You may terminate the engagement at any time by providing 14 days written notice. You remain liable for all work completed and costs incurred up to the termination date. The non-refundable deposit is forfeited upon early termination.' },
      { sub: 'Termination by Webxautomation', body: 'We reserve the right to terminate or suspend services immediately if you breach these Terms and Conditions, fail to make payment, engage in unlawful activity, or act in a manner that is harmful, abusive, or unethical toward our team.' },
      { sub: 'Effect of Termination', body: 'Upon termination, we will deliver all work completed to date in its current state. Access to any shared tools, accounts, or workspaces will be revoked. Any outstanding invoices become immediately due and payable.' },
    ],
  },
  {
    icon: 'balance',
    title: 'Governing Law',
    content: [
      { sub: 'Jurisdiction', body: 'These Terms and Conditions are governed by and construed in accordance with the laws of India. For clients based in Australia, additional consumer protections under the Australian Consumer Law may also apply where relevant.' },
      { sub: 'Dispute Resolution', body: 'In the event of a dispute, both parties agree to first attempt to resolve the matter through good-faith negotiation. If a resolution cannot be reached within 30 days, the dispute may be referred to mediation before any legal proceedings are initiated.' },
    ],
  },
  {
    icon: 'edit_note',
    title: 'Changes to These Terms',
    content: [
      { sub: 'Updates', body: 'Webxautomation reserves the right to update or modify these Terms and Conditions at any time. Material changes will be communicated to active clients via email with at least 14 days notice. Continued use of our services after changes take effect constitutes acceptance of the updated terms.' },
    ],
  },
]

/* ─────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[99] h-[3px]" style={{ background: 'rgba(115,44,124,0.1)' }}>
      <motion.div
        className="h-full"
        style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#732c7c,#d1746d,#f6a16c)' }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   SECTION CARD
───────────────────────────────────────────── */
function SectionCard({ section, index }) {
  const id = section.title.toLowerCase().replace(/[^a-z]+/g, '-')
  const [open, setOpen] = useState(true)

  return (
    <FadeIn delay={index * 0.05}>
      <motion.div
        id={id}
        initial={{ borderColor: 'rgba(115,44,124,0.1)' }}
        whileHover={{ borderColor: 'rgba(115,44,124,0.35)' }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(22,8,48,0.72)',
          border: '1px solid rgba(115,44,124,0.1)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 50px rgba(115,44,124,0.1), 0 20px 60px rgba(67,23,95,0.12)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        {/* Header clickable to collapse */}
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center gap-4 p-7 md:p-9 text-left group"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
            style={{ background: 'rgba(115,44,124,0.1)', border: '1px solid rgba(115,44,124,0.2)' }}
          >
            <span className="material-symbols-outlined text-lg" style={{ color: '#732c7c' }}>{section.icon}</span>
          </div>
          {/* Title */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-headline font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(155,127,187,0.45)' }}>
              {String(index + 1).padStart(2, '0')}
            </p>
            <h2 className="font-headline font-black text-lg md:text-xl" style={{ color: '#1a0a2e' }}>{section.title}</h2>
          </div>
          {/* Chevron */}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="material-symbols-outlined flex-shrink-0"
            style={{ color: '#732c7c', fontSize: '1.2rem' }}
          >
            expand_more
          </motion.span>
        </button>

        {/* Body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-7 md:px-9 pb-8 space-y-6">
                {/* Top divider */}
                <div className="h-px w-full" style={{ background: 'linear-gradient(90deg,rgba(115,44,124,0.25),rgba(123,47,255,0.15),transparent)' }} />
                {section.content.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: j * 0.07, duration: 0.3 }}
                    className="pl-5"
                    style={{ borderLeft: '2px solid rgba(115,44,124,0.2)' }}
                  >
                    <h3 className="font-headline font-bold text-sm mb-2" style={{ color: '#1a0a2e' }}>{item.sub}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#4a3560' }}>{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </FadeIn>
  )
}

/* ─────────────────────────────────────────────────────
   STICKY SIDEBAR NAV
───────────────────────────────────────────── */
function SidebarNav({ sections, activeId }) {
  return (
    <div className="hidden xl:block">
      <div
        className="sticky top-28 rounded-2xl p-5 space-y-1"
        style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(115,44,124,0.1)', backdropFilter: 'blur(16px)' }}
      >
        <p className="text-xs font-headline font-bold uppercase tracking-widest mb-4 px-2" style={{ color: '#732c7c' }}>On This Page</p>
        {sections.map((s, i) => {
          const id = s.title.toLowerCase().replace(/[^a-z]+/g, '-')
          const isActive = activeId === id
          return (
            <a key={id} href={`#${id}`}>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer"
                style={{
                  background: isActive ? 'rgba(115,44,124,0.1)' : 'transparent',
                  borderLeft: isActive ? '2px solid #732c7c' : '2px solid transparent',
                }}
              >
                <span className="material-symbols-outlined text-sm flex-shrink-0" style={{ color: isActive ? '#732c7c' : 'rgba(74,53,96,0.5)', fontSize: '1rem' }}>{s.icon}</span>
                <span className="text-xs font-headline font-bold leading-tight" style={{ color: isActive ? '#1a0a2e' : '#4a3560' }}>{s.title}</span>
              </motion.div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   CONTACT FOOTER CARD
───────────────────────────────────────────── */
function ContactCard({ title, body }) {
  return (
    <FadeIn>
      <div
        className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(115,44,124,0.3)', backdropFilter: 'blur(20px)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(115,44,124,0.09), transparent 60%)' }} />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(115,44,124,0.1)', border: '1px solid rgba(115,44,124,0.25)' }}>
            <span className="material-symbols-outlined" style={{ color: '#732c7c' }}>contact_support</span>
          </div>
          <h2 className="font-headline font-black text-xl md:text-2xl mb-3" style={{ color: '#1a0a2e' }}>{title}</h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#4a3560' }}>{body}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact"><button className="btn-primary px-8 py-3 text-sm glow-pink">Contact Us</button></Link>
            <a href="mailto:hello@webxautomation.com"><button className="btn-outline px-8 py-3 text-sm">hello@webxautomation.com</button></a>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

/* ─────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function LegalClient() {
  const [activeTab, setActiveTab] = useState('privacy') // 'privacy' | 'terms'
  const [activeId, setActiveId] = useState('')

  const sections = activeTab === 'privacy' ? PRIVACY_SECTIONS : TERMS_SECTIONS

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const ids = sections.map(s => s.title.toLowerCase().replace(/[^a-z]+/g, '-'))
    const observers = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [activeTab, sections])

  /* Scroll to top on tab switch */
  const switchTab = (tab) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <ScrollProgress />

      <style>{`
        .legal-tab-btn {
          position: relative;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          border: 1px solid rgba(115,44,124,0.2);
          transition: all 0.3s ease;
          background: transparent;
          color: #4a3560;
        }
        .legal-tab-btn:hover { border-color: rgba(115,44,124,0.5); color: #1a0a2e; }
        .legal-tab-btn.active {
          background: linear-gradient(135deg, #732c7c, #43175f);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 0 28px rgba(115,44,124,0.45), 0 0 60px rgba(115,44,124,0.15);
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-24px) scale(1.06); }
        }
        .legal-orb { animation: floatOrb ease-in-out infinite; }
      `}</style>

      {/* BG orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {[
          { w: 440, h: 440, top: '8%', left: '65%', color: 'rgba(115,44,124,0.06)', dur: '9s', delay: '0s' },
          { w: 340, h: 340, top: '45%', left: '2%', color: 'rgba(123,47,255,0.07)', dur: '11s', delay: '2s' },
          { w: 280, h: 280, top: '75%', left: '70%', color: 'rgba(246,161,108,0.05)', dur: '8s', delay: '4s' },
        ].map((o, i) => (
          <div key={i} className="legal-orb absolute rounded-full" style={{
            width: o.w, height: o.h, top: o.top, left: o.left,
            background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
            animationDuration: o.dur, animationDelay: o.delay,
          }} />
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-16 px-5 md:px-10 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 40% -5%, rgba(123,47,255,0.14) 0%, transparent 55%)' }} />
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
              <span className="material-symbols-outlined text-sm" style={{ color: '#732c7c', fontVariationSettings: "'FILL' 1" }}>shield</span>
              <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#732c7c' }}>Legal Centre</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-headline font-black tracking-tighter leading-[0.88] mb-6 text-glow" style={{ fontSize: 'clamp(3rem,8vw,6.5rem)', color: '#1a0a2e' }}>
              {activeTab === 'privacy' ? <>Privacy<br /><span className="gradient-text">Policy.</span></> : <>Terms &amp;<br /><span className="gradient-text">Conditions.</span></>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base leading-relaxed mb-3 max-w-2xl" style={{ color: '#4a3560' }}>
              {activeTab === 'privacy'
                ? 'At Webxautomation, your privacy is not an afterthought it is a core principle. This policy explains exactly what data we collect, how we use it, and the rights you hold over it.'
                : 'These Terms and Conditions govern your use of Webxautomation\'s website and services. Please read them carefully before engaging with us. By proceeding, you agree to be bound by these terms.'}
            </p>
            <p className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: 'rgba(155,127,187,0.45)' }}>
              Last Updated: January 2024 &nbsp;·&nbsp; Effective: January 1, 2024
            </p>
          </FadeIn>

          {/* Tab switcher */}
          <FadeIn delay={0.3}>
            <div className="flex items-center gap-3 mt-10 flex-wrap">
              <button onClick={() => switchTab('privacy')} className={`legal-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">shield</span>
                  Privacy Policy
                </span>
              </button>
              <button onClick={() => switchTab('terms')} className={`legal-tab-btn ${activeTab === 'terms' ? 'active' : ''}`}>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">gavel</span>
                  Terms & Conditions
                </span>
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── QUICK NAV (mobile/md) ── */}
      <section className="px-5 md:px-10 mb-8 relative" style={{ zIndex: 1 }}>
        <div className="neon-line mb-10" />
        <div className="max-w-7xl mx-auto xl:hidden">
          <FadeIn>
            <div className="glass-card rounded-2xl p-5 flex flex-wrap gap-2">
              <p className="w-full text-xs font-headline font-bold uppercase tracking-widest mb-2" style={{ color: '#732c7c' }}>Jump To</p>
              {sections.map(s => {
                const id = s.title.toLowerCase().replace(/[^a-z]+/g, '-')
                return (
                  <a key={s.title} href={`#${id}`}>
                    <motion.span
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="tag-pill cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>{s.icon}</span>
                      {s.title}
                    </motion.span>
                  </a>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="px-5 md:px-10 pb-24 relative" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="flex gap-8 items-start"
            >
              {/* Sidebar */}
              <aside className="w-64 flex-shrink-0">
                <SidebarNav sections={sections} activeId={activeId} />
              </aside>

              {/* Cards */}
              <div className="flex-1 min-w-0 space-y-4">
                {sections.map((section, i) => (
                  <SectionCard key={section.title} section={section} index={i} />
                ))}

                {/* Contact card */}
                <div className="pt-4">
                  {activeTab === 'privacy' ? (
                    <ContactCard
                      title="Questions About Your Privacy?"
                      body="If you have any questions, concerns or requests regarding this Privacy Policy or how we handle your data, please reach out to us directly. We aim to respond to all privacy-related enquiries within 48 hours."
                    />
                  ) : (
                    <ContactCard
                      title="Questions About These Terms?"
                      body="If you have any questions about these Terms and Conditions, need clarification on any clause, or wish to discuss a specific engagement, please reach out. We are happy to explain anything in plain language before you commit."
                    />
                  )}
                </div>

                {/* Cross-links */}
                <FadeIn>
                  <div className="flex flex-wrap gap-5 pt-2 pb-2">
                    <button
                      onClick={() => switchTab(activeTab === 'privacy' ? 'terms' : 'privacy')}
                      className="flex items-center gap-2 text-sm font-headline font-bold transition-colors"
                      style={{ color: '#4a3560', background: 'none', border: 'none', cursor: 'pointer' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#732c7c'}
                      onMouseLeave={e => e.currentTarget.style.color = '#4a3560'}
                    >
                      <span className="material-symbols-outlined text-base" style={{ color: '#732c7c' }}>{activeTab === 'privacy' ? 'gavel' : 'shield'}</span>
                      {activeTab === 'privacy' ? 'Terms & Conditions' : 'Privacy Policy'}
                    </button>
                    <span style={{ color: 'rgba(155,127,187,0.3)' }}>·</span>
                    <Link href="/contact" className="flex items-center gap-2 text-sm font-headline font-bold transition-colors" style={{ color: '#4a3560' }}>
                      <span className="material-symbols-outlined text-base" style={{ color: '#732c7c' }}>mail</span>
                      Contact Us
                    </Link>
                  </div>
                </FadeIn>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
