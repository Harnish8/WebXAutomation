'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

/* ─────────────────────────────────────────
   EXACT CONTENT FROM DOCX ZERO CHANGES
───────────────────────────────────────── */
const SECTIONS = [
    {
        num: '01', icon: 'corporate_fare', title: 'Who We Are',
        clauses: [
            { id: '1.1', text: 'Webxautomation is a digital marketing brand operated by [YOUR LEGAL NAME] trading as Webxautomation, a company registered in India.' },
            { id: '1.2', text: 'For the purposes of this Privacy Policy, [YOUR LEGAL NAME] trading as Webxautomation is the data controller responsible for the collection and processing of personal information collected through Webxautomation\'s platforms, website, and communications.' },
            { id: '1.3', text: 'Contact details for privacy matters: Email: contact@webxautomation.in | Website: www.webxautomation.in' },
        ],
    },
    {
        num: '02', icon: 'database', title: 'Information We Collect',
        clauses: [
            { id: '2.1', text: 'We may collect the following categories of personal information:' },
            { id: '2.1.1', text: 'Contact information: name, email address, mobile phone number, and postal address.' },
            { id: '2.1.2', text: 'Business information: company name, industry, job title, and business contact details.' },
            { id: '2.1.3', text: 'Behavioural data: website usage, pages visited, time spent, clicks, and interactions with our marketing communications.' },
            { id: '2.1.4', text: 'Device and technical data: IP address, browser type, operating system, referral source, and cookies.' },
            { id: '2.1.5', text: 'Communication data: records of your interactions with us, including emails, SMS messages, and support requests.' },
            { id: '2.1.6', text: 'AI interaction data: if you interact with AI powered tools or chatbots on our platforms, we may collect inputs and outputs generated during those interactions.' },
            { id: '2.2', text: 'We collect personal information directly from you, automatically via cookies and tracking technologies, and from third party sources such as advertising platforms (e.g., Meta Ads, Google Ads) and data enrichment providers.' },
        ],
    },
    {
        num: '03', icon: 'manage_search', title: 'How We Use Your Information',
        clauses: [
            { id: '3.1', text: 'We use your personal information for the following purposes:' },
            { id: '3.1.1', text: 'To send marketing communications, including promotional offers, digital marketing insights, and service updates, via SMS and email, where you have provided consent.' },
            { id: '3.1.2', text: 'To operate, manage, and improve our website and digital marketing services.' },
            { id: '3.1.3', text: 'To personalise your experience and deliver targeted advertising and content.' },
            { id: '3.1.4', text: 'To analyse campaign performance, website analytics, and audience behaviour using AI and data analytics tools.' },
            { id: '3.1.5', text: 'To comply with legal obligations and resolve disputes.' },
            { id: '3.1.6', text: 'To process service enquiries, support requests, and communications.' },
            { id: '3.1.7', text: 'To train, test, and improve AI tools used in our digital marketing operations, subject to anonymisation and aggregation where practicable.' },
            { id: '3.2', text: 'We will only use your personal information for the purpose for which it was collected, or a directly related purpose, unless you consent otherwise or we are required by law to do so.' },
        ],
    },
    {
        num: '04', icon: 'robot_2', title: 'Artificial Intelligence and Automated Processing',
        clauses: [
            { id: '4.1', text: 'Webxautomation uses AI tools and automated data processing technologies to enhance our digital marketing services. These tools may include AI content generators, predictive analytics platforms, customer segmentation engines, and marketing automation systems.' },
            { id: '4.2', text: '[YOUR LEGAL NAME] trading as Webxautomation is responsible for ensuring that any AI tools deployed by Webxautomation are used in compliance with applicable Australian privacy laws and ethical AI principles.' },
            { id: '4.3', text: 'Automated processing of your personal information may be used to personalise marketing content, optimise campaign targeting, and analyse engagement. You will not be subject to decisions based solely on automated processing that produce legal or similarly significant effects on you without human review.' },
            { id: '4.4', text: 'Third party AI platforms used by Webxautomation may process personal data as data processors on our behalf. We require all such processors to implement appropriate security and privacy safeguards.' },
            { id: '4.5', text: 'If you wish to opt out of AI assisted personalisation or profiling, please contact us at contact@webxautomation.in.' },
        ],
    },
    {
        num: '05', icon: 'cookie', title: 'Cookies and Tracking Technologies',
        clauses: [
            { id: '5.1', text: 'Our website uses cookies, web beacons, pixels, and similar tracking technologies to collect information about your interactions with our website and advertisements.' },
            { id: '5.2', text: 'Cookies may be used for: website functionality, performance analytics, targeted advertising (including retargeting), and AI assisted personalisation.' },
            { id: '5.3', text: 'You can manage or disable cookies through your browser settings. However, disabling cookies may affect the functionality of certain website features.' },
            { id: '5.4', text: 'We may use third party advertising and analytics platforms (including but not limited to Google Analytics, Meta Pixel, and other ad tech partners) that set their own cookies. These platforms are governed by their respective privacy policies.' },
        ],
    },
    {
        num: '06', icon: 'share', title: 'Disclosure of Your Information',
        clauses: [
            { id: '6.1', text: 'We may disclose your personal information to the following categories of third parties:' },
            { id: '6.1.1', text: 'Service providers: technology, analytics, hosting, email and SMS platforms, and marketing automation providers acting on our behalf.' },
            { id: '6.1.2', text: 'AI and data processing vendors: third party AI platforms used for content generation, analytics, or campaign optimisation.' },
            { id: '6.1.3', text: 'Advertising platforms: digital advertising networks, including social media and search platforms, for the purposes of targeted advertising.' },
            { id: '6.1.4', text: 'Legal and regulatory authorities: where required by law, court order, or regulatory authority.' },
            { id: '6.1.5', text: 'Related entities: other entities within the [YOUR LEGAL NAME] trading as Webxautomation corporate group where necessary for business operations.' },
            { id: '6.2', text: 'We do not sell your personal information to third parties for their own marketing purposes.' },
            { id: '6.3', text: 'Where personal information is disclosed to overseas recipients (e.g., cloud service providers or AI platforms operating internationally), we take reasonable steps to ensure those recipients comply with the APPs or equivalent privacy standards.' },
        ],
    },
    {
        num: '07', icon: 'lock', title: 'Data Security',
        clauses: [
            { id: '7.1', text: '[YOUR LEGAL NAME] trading as Webxautomation and Webxautomation implement reasonable technical and organisational security measures to protect your personal information from unauthorised access, disclosure, alteration, or destruction.' },
            { id: '7.2', text: 'These measures include encrypted storage, access controls, secure communication protocols, and regular security assessments.' },
            { id: '7.3', text: 'In the event of a data breach that is likely to result in serious harm, we will notify affected individuals and the Data Protection Board of India in accordance with the Notifiable Data Breaches (NDB) scheme under Part IIIC of the Digital Personal Data Protection Act 2023 (India).' },
        ],
    },
    {
        num: '08', icon: 'schedule', title: 'Data Retention',
        clauses: [
            { id: '8.1', text: 'We retain personal information only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law.' },
            { id: '8.2', text: 'Marketing communication records are retained for a minimum of 7 years for compliance and legal purposes, unless you request erasure and we are not legally required to retain the data.' },
            { id: '8.3', text: 'Upon request, we will securely destroy or de identify personal information that is no longer required.' },
        ],
    },
    {
        num: '09', icon: 'verified_user', title: 'Your Rights',
        clauses: [
            { id: '9.1', text: 'Under the Digital Personal Data Protection Act 2023 (India) and applicable law, you have the right to:' },
            { id: '9.1.1', text: 'Access the personal information we hold about you.' },
            { id: '9.1.2', text: 'Request correction of inaccurate, incomplete, or out of date personal information.' },
            { id: '9.1.3', text: 'Withdraw consent to marketing communications at any time (see Section 10 below).' },
            { id: '9.1.4', text: 'Request that we de identify or delete your personal information, subject to legal retention obligations.' },
            { id: '9.1.5', text: 'Opt out of AI assisted profiling and personalised advertising.' },
            { id: '9.1.6', text: 'Lodge a complaint with the Data Protection Board of India at www.meity.gov.in.' },
            { id: '9.2', text: 'To exercise any of the above rights, contact us at contact@webxautomation.in. We will respond within 30 days of receiving your request.' },
        ],
    },
    {
        num: '10', icon: 'logout', title: 'Marketing Opt Out',
        clauses: [
            { id: '10.1', text: 'You can opt out of receiving marketing communications from Webxautomation at any time:' },
            { id: '10.1.1', text: 'SMS: Reply STOP to any SMS message.' },
            { id: '10.1.2', text: 'Email: Click the Unsubscribe link at the bottom of any marketing email.' },
            { id: '10.1.3', text: 'Manual request: Email contact@webxautomation.in to be removed from all marketing lists.' },
            { id: '10.2', text: 'Opting out of marketing communications does not prevent us from sending transactional or service related communications where lawfully required.' },
        ],
    },
    {
        num: '11', icon: 'child_care', title: "Children's Privacy",
        clauses: [
            { id: '11.1', text: 'Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal information from minors.' },
            { id: '11.2', text: 'If you believe we have inadvertently collected information from a minor, please contact us immediately at contact@webxautomation.in.' },
        ],
    },
    {
        num: '12', icon: 'link', title: 'Links to Third Party Websites',
        clauses: [
            { id: '12.1', text: 'Our website or communications may contain links to third party websites. We are not responsible for the privacy practices of those websites.' },
            { id: '12.2', text: 'We encourage you to read the privacy policies of any third party websites you visit.' },
        ],
    },
    {
        num: '13', icon: 'edit_note', title: 'Updates to This Policy',
        clauses: [
            { id: '13.1', text: 'Webxautomation, a division of [YOUR LEGAL NAME] trading as Webxautomation, may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or business operations.' },
            { id: '13.2', text: 'All updates will be published on our website with a revised effective date. Continued use of our website or services constitutes acceptance of the updated Policy.' },
            { id: '13.3', text: 'For material changes, we will endeavour to notify you by email or via a notice on our website prior to the changes taking effect.' },
        ],
    },
    {
        num: '14', icon: 'contact_mail', title: 'How to Contact Us',
        clauses: [
            { id: '14.1', text: 'For any privacy related enquiries, access requests, complaints, or concerns, please contact:' },
            { id: 'contact', isContact: true },
            { id: '14.2', text: 'If you are not satisfied with our response, you may escalate your complaint to the Data Protection Board of India at www.meity.gov.in.' },
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
                style={{ background: 'rgba(255,255,255,1)', border: '1px solid rgba(115,44,124,0.13)', backdropFilter: 'blur(20px)' }}>
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
                style={{ background: 'rgba(255,255,255,1)', border: '1px solid rgba(115,44,124,0.1)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>

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
                                style={{ background: 'rgba(255,255,255,1)', border: '1px solid rgba(115,44,124,0.2)' }}>
                                <p className="font-headline font-black text-base mb-1" style={{ color: '#1a0a2e' }}>Privacy Officer Webxautomation</p>
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
                                    <a href="https://www.meity.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-headline font-bold" style={{ color: '#f6a16c', textDecoration: 'none' }}>
                                        <span className="material-symbols-outlined text-base">open_in_new</span>
                                        OAIC: www.meity.gov.in
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
export default function PrivacyPolicyClient() {
    const [activeId, setActiveId] = useState('')
    const { scrollY } = useScroll()

    const heroBgY = useTransform(scrollY, [0, 600], [0, 180])
    const heroBg2Y = useTransform(scrollY, [0, 600], [0, 90])
    const titleY = useTransform(scrollY, [0, 400], [0, 60])
    const subTitleY = useTransform(scrollY, [0, 400], [0, 30])

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
                            style={{ background: 'rgba(255,255,255,1)', border: '1px solid rgba(115,44,124,0.25)', backdropFilter: 'blur(14px)' }}>
                            <span className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ background: '#D6008D', boxShadow: '0 0 8px #732c7c', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>Legal Document</span>
                        </div>
                    </FadeIn>

                    {/* Headline */}
                    <div className="overflow-visible mb-4">
                        <motion.div style={{ y: titleY }}>
                            <FadeIn delay={0.08}>
                                <h1 className="font-headline font-black tracking-tighter leading-[0.86]"
                                    style={{ fontSize: 'clamp(3.2rem,10vw,8.5rem)', color: '#ffffff' }}>
                                    Privacy
                                </h1>
                            </FadeIn>
                        </motion.div>
                        <motion.div style={{ y: subTitleY }}>
                            <FadeIn delay={0.14}>
                                <h1 className="font-headline font-black tracking-tighter leading-[0.86]"
                                    style={{ fontSize: 'clamp(3.2rem,10vw,8.5rem)', color: '#FFB84C' }}>
                                    Policy.
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
                                    <span className="text-xs font-headline font-bold" style={{ color: '#ffffff' }}>{m.text}</span>
                                </div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Intro paragraph */}
                    <FadeIn delay={0.28}>
                        <div className="rounded-2xl p-6 md:p-8 max-w-3xl"
                            style={{ background: 'rgba(255,255,255,1)', border: '1px solid rgba(115,44,124,0.15)', backdropFilter: 'blur(18px)' }}>
                            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#4a3560' }}>
                                Webxautomation, a digital marketing brand and division of{' '}
                                <span style={{ color: '#1a0a2e', fontWeight: 700 }}>[YOUR LEGAL NAME] trading as Webxautomation</span>{' '}
                                (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), is committed to protecting the privacy of individuals who interact with our website, services, and marketing communications. This Privacy Policy explains how we collect, use, disclose, store, and protect your personal information in accordance with the{' '}
                                <span style={{ color: '#1a0a2e', fontWeight: 700 }}>Digital Personal Data Protection Act 2023 (India)</span> and the{' '}
                                <span style={{ color: '#1a0a2e', fontWeight: 700 }}>Digital Personal Data Protection Act 2023 (India)</span>.
                                By using our website or engaging with our services, you consent to the practices described in this Policy.
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
                                        style={{ background: 'rgba(255,255,255,1)', border: '1px solid rgba(115,44,124,0.18)', color: '#4a3560' }}>
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

                        {/* Footer */}
                        <FadeIn>
                            <div className="rounded-2xl p-7 md:p-10 text-center mt-4"
                                style={{ background: 'rgba(255,255,255,1)', border: '1px solid rgba(255,46,136,0.24)', backdropFilter: 'blur(20px)' }}>
                                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
                                    style={{ background: 'rgba(115,44,124,0.09)', border: '1px solid rgba(115,44,124,0.22)' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#732c7c' }}>privacy_tip</span>
                                </motion.div>
                                <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: '#4a3560' }}>
                                    This Privacy Policy is issued by{' '}
                                    <span style={{ color: '#1a0a2e', fontWeight: 700 }}>Webxautomation</span>, a division of [YOUR LEGAL NAME] trading as Webxautomation,
                                    and is governed by the Digital Personal Data Protection Act 2023 (India) and the Digital Personal Data Protection Act 2023 (India).
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