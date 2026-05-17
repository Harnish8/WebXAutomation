'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll, useSpring } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

/* ─────────────────────────────────────────
   FAQ DATA ALL CATEGORIES FROM DOCX
───────────────────────────────────────── */
const FAQ_CATEGORIES = [
    {
        id: 'social',
        icon: 'share_reviews',
        label: 'Social Media Marketing',
        faqs: [
            { q: 'I already post on social media what would you do differently?', a: 'Most businesses post without a clear strategy. We focus on positioning, content direction, and performance turning your social media into a growth channel, not just activity.' },
            { q: 'Do I need to be active myself, or do you handle everything?', a: 'We handle the full execution. You can be involved as much or as little as you prefer, but we don\'t rely on you to keep things running.' },
            { q: 'Why should I invest in social media instead of ads?', a: 'Social builds longterm brand equity and trust, while ads deliver immediate traffic. The strongest brands use both together not one instead of the other.' },
            { q: 'How long before I actually see results?', a: 'You will start seeing engagement improvements within weeks, but meaningful growth typically builds over 60 to 90 days with consistent execution.' },
            { q: 'What if my audience is not very active online?', a: 'Then the strategy shifts. We focus on the platforms and content formats where your audience already spends time.' },
            { q: 'I\'ve tried social media before and it didn\'t work why would this be different?', a: 'Most failed efforts lack strategy and consistency. We approach it as a structured system, not random posting.' },
            { q: 'What if the content doesn\'t match my brand?', a: 'Everything is aligned with your brand voice and approved direction before publishing.' },
            { q: 'Will I be able to see what\'s working?', a: 'Yes, you will receive clear insights into performance so you understand exactly what is driving results.' },
        ],
    },
    {
        id: 'seo',
        icon: 'search_insights',
        label: 'SEO & Content Marketing',
        faqs: [
            { q: 'I\'ve heard SEO takes a long time is it even worth it?', a: 'Yes, because it compounds. Unlike ads, SEO continues to generate traffic long after the work is done.' },
            { q: 'Why does SEO cost more than just writing blogs?', a: 'Because effective SEO involves strategy, research, technical optimisation, and content working together not just writing articles.' },
            { q: 'When should I expect to see results?', a: 'Initial traction can appear within three to four months, with stronger results building over time.' },
            { q: 'What if I\'m in a highly competitive industry?', a: 'That\'s exactly where structured SEO makes the biggest difference. We focus on strategic positioning, not just broad keywords.' },
            { q: 'Do you handle both technical SEO and content?', a: 'Yes, both are essential. One without the other limits performance.' },
            { q: 'What if Google changes its algorithm?', a: 'It does regularly. That\'s why we focus on sustainable, best practice strategies rather than shortcuts.' },
            { q: 'How do I know this is not just guesswork?', a: 'Every decision is backed by data, search intent, and performance tracking.' },
            { q: 'Will I be able to track progress?', a: 'Yes, we provide transparent reporting so you can see growth over time.' },
        ],
    },
    {
        id: 'ads',
        icon: 'ads_click',
        label: 'Paid Advertising',
        faqs: [
            { q: 'I\'ve never run ads before is it risky?', a: 'Only if done without strategy. We minimise risk by testing, tracking, and optimising from the start.' },
            { q: 'How much should I realistically spend on ads?', a: 'It depends on your goals and market. We guide you toward a budget that is sustainable and performance driven.' },
            { q: 'Why do some agencies charge less for ads management?', a: 'Lower cost often means less strategy, less testing, and less optimisation which directly impacts results.' },
            { q: 'How quickly will I see results?', a: 'Ads can generate results quickly often within days but optimisation improves performance over time.' },
            { q: 'What happens if a campaign doesn\'t perform?', a: 'We identify the issue fast and adjust. Nothing runs blindly.' },
            { q: 'How do I know you won\'t waste my ad spend?', a: 'Every dollar is tracked and optimised. We treat your budget like it\'s our own.' },
            { q: 'What if I stop running ads does everything disappear?', a: 'Traffic stops, but the data and insights remain, helping inform future strategy.' },
            { q: 'Will I have access to my ad accounts?', a: 'Yes, you always retain full ownership and visibility.' },
        ],
    },
    {
        id: 'branding',
        icon: 'palette',
        label: 'Branding & Creative Design',
        faqs: [
            { q: 'I already have a logo do I really need branding?', a: 'A logo alone is not a brand. Branding includes positioning, messaging, and a complete visual system.' },
            { q: 'Why is branding such an investment?', a: 'Because it influences every customer interaction from first impression to purchase decision.' },
            { q: 'Will I get multiple design options?', a: 'Yes, we explore directions before refining the final identity.' },
            { q: 'Can you match my existing brand or improve it?', a: 'We can either refine your current identity or rebuild it strategically.' },
            { q: 'What if I don\'t like the designs?', a: 'We work collaboratively and refine based on feedback until it aligns with your vision.' },
            { q: 'How do I know the branding will actually work?', a: 'It\'s built on strategy, not just aesthetics designed to resonate with your target audience.' },
            { q: 'What do I receive at the end?', a: 'A complete brand system ready for real world use across all platforms.' },
        ],
    },
    {
        id: 'web',
        icon: 'web',
        label: 'Web Design & Development',
        faqs: [
            { q: 'Do I need a new website or can you improve my current one?', a: 'We assess your existing site first. If it can be improved effectively, we optimise it instead of rebuilding unnecessarily.' },
            { q: 'Why not just use a cheap template?', a: 'Templates can limit performance, flexibility, and scalability. We build websites tailored to your business goals.' },
            { q: 'How long does it take to build a website?', a: 'Typically between three to six weeks depending on complexity.' },
            { q: 'Will my website be optimised for conversions?', a: 'Yes, every design decision is made with user behaviour and conversion in mind.' },
            { q: 'What if I do not like the design?', a: 'We involve you during key stages to ensure alignment before final development.' },
            { q: 'Will my website become outdated quickly?', a: 'No, we build scalable, modern sites designed to evolve with your business.' },
            { q: 'Do you provide support after launch?', a: 'Yes, ongoing support is available to maintain and improve performance.' },
        ],
    },
    {
        id: 'video',
        icon: 'videocam',
        label: 'Video Production',
        faqs: [
            { q: 'I\'ve never done video before where do I even start?', a: 'We guide the entire process, from concept to final production, so you\'re never left guessing.' },
            { q: 'Why invest in video over static content?', a: 'Video captures attention faster, communicates more clearly, and performs better across platforms.' },
            { q: 'Do I need to be on camera?', a: 'Only if it suits your brand. We adapt the approach based on your comfort and goals.' },
            { q: 'What type of videos should I be creating?', a: 'That depends on your audience and objectives. We recommend formats that perform best for your brand.' },
            { q: 'What if the video doesn\'t perform well?', a: 'We base content on proven formats and refine based on performance data.' },
            { q: 'Is video production complicated?', a: 'Not with the right team. We make the process smooth and structured.' },
            { q: 'Can you create ongoing content?', a: 'Yes, we support both one off projects and ongoing content production.' },
        ],
    },
    {
        id: 'ai',
        icon: 'robot_2',
        label: 'AI Automation Systems',
        faqs: [
            { q: 'I\'m not very technical will this be complicated?', a: 'No. We design systems that are easy to use and manage, even if you have no technical background.' },
            { q: 'Why invest in automation instead of hiring more staff?', a: 'Automation reduces longterm costs and increases efficiency without adding overhead.' },
            { q: 'How long does it take to implement?', a: 'It depends on complexity, but most systems are implemented within a few weeks.' },
            { q: 'What exactly can you automate in my business?', a: 'Anything from lead management and follow ups to reporting and campaign optimisation.' },
            { q: 'What if the automation makes mistakes?', a: 'We design systems with checks and controls to ensure reliability.' },
            { q: 'Will this replace my team?', a: 'No, it enhances productivity by removing repetitive tasks.' },
            { q: 'Will I be able to control the system?', a: 'Yes, you will have full visibility and control over how everything operates.' },
        ],
    },
    {
        id: 'whitelabel',
        icon: 'handshake',
        label: 'White Label Services',
        faqs: [
            { q: 'Will my clients know you are involved?', a: 'No, everything is delivered fully under your brand with complete confidentiality.' },
            { q: 'How does this compare to hiring in house?', a: 'It\'s significantly more cost effective and scalable without the risk of hiring.' },
            { q: 'How do you integrate with my agency?', a: 'We align with your workflows and operate as an extension of your team.' },
            { q: 'Can you match my quality standards?', a: 'Yes, we adapt to your brand guidelines and expectations.' },
            { q: 'What if the work doesn\'t meet my expectations?', a: 'We maintain close communication and refine until it meets your standards.' },
            { q: 'Is there a risk to my reputation?', a: 'Our entire model is built around protecting and enhancing your brand.' },
            { q: 'Can I scale up or down easily?', a: 'Yes, our services are flexible and designed to grow with your agency.' },
        ],
    },
]

/* ─────────────────────────────────────────
   GENERAL FAQs created for new clients
───────────────────────────────────────── */
const GENERAL_FAQS = [
    { q: 'How do I know which services are right for my business?', a: 'We start with a free discovery call to understand your goals, market, and current situation. From there, we recommend a tailored strategy never a one size fits all package.' },
    { q: 'Do you work with small businesses or only large companies?', a: 'Both. We work with businesses at every stage from early stage brands finding their footing to established companies ready to scale. The approach is always tailored to where you are and where you want to go.' },
    { q: 'What makes Webxautomation different from other digital agencies?', a: 'We combine real marketing expertise with AI powered automation meaning your campaigns don\'t just run, they compound. Every service we offer connects with the others, creating a growth system that gets stronger over time.' },
    { q: 'How do contracts and pricing work?', a: 'We offer flexible engagement models depending on your needs. Reach out for a free consultation and we\'ll walk you through what makes sense for your goals and budget no pressure, no hidden fees.' },
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
            background: 'linear-gradient(90deg,#732c7c,#d1746d,#f6a16c)', zIndex: 999,
        }} />
    )
}

/* ─────────────────────────────────────────
   SINGLE ACCORDION ITEM
───────────────────────────────────────── */
function AccordionItem({ faq, index, openIndex, setOpenIndex }) {
    const isOpen = openIndex === index
    return (
        <motion.div
            className="rounded-2xl overflow-hidden"
            animate={{ borderColor: isOpen ? '#FFB84C' : '#FFB84C' }}
            transition={{ duration: 0.3 }}
            style={{
                background: 'rgba(243, 238, 249, 0)',
                border: '2px solid #FFB84C',
                borderRadius: '16px',
            }}
        >
            <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
                <span className="font-headline font-bold text-sm md:text-base leading-snug" style={{ color: '#ffffffff' }}>
                    {faq.q}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="material-symbols-outlined flex-shrink-0"
                    style={{ color: '#FFB84C', fontSize: '1.3rem' }}
                >
                    add
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p className="px-5 md:px-6 pb-5 text-sm leading-relaxed" style={{ color: '#ffffffff' }}>
                            {faq.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

/* ─────────────────────────────────────────
   CATEGORY ACCORDION BLOCK
───────────────────────────────────────── */
function CategoryBlock({ category }) {
    const [openIndex, setOpenIndex] = useState(null)
    return (
        <div>
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(115,44,124,0.09)', border: '1px solid rgba(255, 255, 255, 1)' }}>
                    <span className="material-symbols-outlined" style={{ color: '#ffffffff', fontSize: '1.2rem' }}>{category.icon}</span>
                </div>
                <h3 className="font-headline font-black text-lg" style={{ color: '#ffffff' }}>{category.label}</h3>
            </div>
            <div className="space-y-2">
                {category.faqs.map((faq, i) => (
                    <AccordionItem key={i} faq={faq} index={i} openIndex={openIndex} setOpenIndex={setOpenIndex} />
                ))}
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────
   DIVIDER
───────────────────────────────────────── */
function Divider() {
    return (
        <div className="w-full h-px my-2"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(115,44,124,0.28),rgba(209,116,109,0.18),transparent)' }} />
    )
}

/* ─────────────────────────────────────────
   PAGE EXPORT
───────────────────────────────────────── */
export default function FAQPage() {
    const [activeTab, setActiveTab] = useState('all')
    const [generalOpen, setGeneralOpen] = useState(null)

    const displayCategories = activeTab === 'all'
        ? FAQ_CATEGORIES
        : FAQ_CATEGORIES.filter(c => c.id === activeTab)

    return (
        <>
            <ScrollBar />

            <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }
        .tab-btn {
          background: rgba(243,238,249,0.08);
          border: 1px solid rgba(115,44,124,0.15);
          border-radius: 9999px;
          color: rgba(255,255,255,0.6);
          font-family: inherit;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          padding: 0.4rem 1rem;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .tab-btn:hover {
          border-color: rgba(115,44,124,0.4);
          color: #ffffff;
          background: rgba(115,44,124,0.1);
        }
        .tab-btn.active {
          background: linear-gradient(135deg,#732c7c,#d1746d);
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 0 20px rgba(115,44,124,0.35);
        }
      `}</style>

            {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
            <section className="relative pt-36 pb-16 px-5 md:px-10 overflow-hidden" style={{ zIndex: 1 }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(115,44,124,0.18) 0%, transparent 55%)' }} />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
                            style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(115,44,124,0.2)' }}>
                            <span className="w-2 h-2 rounded-full" style={{ background: '#D6008D', boxShadow: '0 0 8px #D6008D', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>
                                Everything You Need to Know
                            </span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.08}>
                        <h1 className="font-headline font-black tracking-tighter leading-[0.88] mb-6"
                            style={{ fontSize: 'clamp(2.8rem,7vw,6rem)', color: '#ffffff' }}>
                            Frequently Asked<br />
                            <span style={{ color: '#FFB84C' }}>Questions.</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.14}>
                        <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 1)' }}>
                            Honest answers to the questions we hear most. If something isn&apos;t covered here,{' '}
                            <Link href="/contact" className="font-bold underline underline-offset-2" style={{ color: '#FFB84C' }}>reach out directly</Link> we&apos;re always happy to talk.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

            {/* ══════════════════════════════════════
          GENERAL FAQs
      ══════════════════════════════════════ */}
            <section className="relative z-10 py-16 px-5 md:px-10">
                <div className="max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                            style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                            <span className="material-symbols-outlined text-sm" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>help</span>
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>General</span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.06}>
                        <h2 className="font-headline font-black tracking-tight leading-[0.9] mb-8"
                            style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#ffffff' }}>
                            New to Webxautomation?<br />
                            <span style={{ color: '#FFB84C' }}>Start Here.</span>
                        </h2>
                    </FadeIn>
                    <div className="space-y-2">
                        {GENERAL_FAQS.map((faq, i) => (
                            <FadeIn key={i} delay={i * 0.06}>
                                <AccordionItem faq={faq} index={i} openIndex={generalOpen} setOpenIndex={setGeneralOpen} />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

            {/* ══════════════════════════════════════
          SERVICE FAQs TAB FILTER + ACCORDIONS
      ══════════════════════════════════════ */}
            <section className="relative z-10 py-16 px-5 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                            style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(115,44,124,0.2)' }}>
                            <span className="material-symbols-outlined text-sm" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>category</span>
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>By Service</span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.06}>
                        <h2 className="font-headline font-black tracking-tight leading-[0.9] mb-3"
                            style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#ffffff' }}>
                            Questions by<br />
                            <span style={{ color: '#FFB84C' }}>Service Area.</span>
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
                            Filter by service or browse everything below.
                        </p>
                    </FadeIn>

                    {/* Tab filter */}
                    <FadeIn delay={0.12}>
                        <div className="flex flex-wrap gap-2 mb-12">
                            <button
                                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                                onClick={() => setActiveTab('all')}
                            >
                                All Services
                            </button>
                            {FAQ_CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(cat.id)}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Category blocks */}
                    <div className={activeTab === 'all' ? 'grid grid-cols-1 lg:grid-cols-2 gap-14' : 'max-w-4xl'}>
                        {displayCategories.map((cat, i) => (
                            <FadeIn key={cat.id} delay={i * 0.07}>
                                <CategoryBlock category={cat} />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

            {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
            <section className="relative z-10 py-24 px-5 md:px-10">
                <div className="max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
                            style={{ background: 'rgba(243, 238, 249, 0)', border: '1px solid #FFB84C', backdropFilter: 'blur(24px)' }}>
                            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -5%,rgba(115,44,124,0.18),transparent 55%)' }} />
                            <motion.div
                                animate={{ scale: [1, 1.06, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-7 relative z-10"
                                style={{ background: 'rgba(115,44,124,0.1)', border: '1px solid #FFB84C' }}
                            >
                                <span className="material-symbols-outlined text-2xl" style={{ color: '#FFB84C', fontVariationSettings: "'FILL' 1" }}>chat</span>
                            </motion.div>
                            <div className="relative z-10">
                                <h2 className="font-headline font-black tracking-tight leading-tight mb-4"
                                    style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#ffffffff' }}>
                                    Still Have Questions?<br />
                                    <span style={{ color: '#FFB84C' }}>
                                        Let&apos;s Talk Directly.
                                    </span>
                                </h2>
                                <p className="text-base leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#ffffffff' }}>
                                    Every business is different. Book a free call and we&apos;ll answer your specific questions and show you exactly how we can help.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/contact">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                background: 'linear-gradient(135deg,#D6008D,#D6008D)',
                                                color: '#ffffff', fontFamily: 'inherit', fontWeight: 800,
                                                borderRadius: '9999px', border: 'none', cursor: 'pointer',
                                                padding: '1rem 2.5rem', fontSize: '1rem',
                                                boxShadow: '0 0 30px rgba(115,44,124,0.4)',
                                            }}
                                        >
                                            Book a Free Call
                                        </motion.button>
                                    </Link>
                                    <Link href="/services">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                background: '#12002F', color: '#ffffff',
                                                fontFamily: 'inherit', fontWeight: 800,
                                                borderRadius: '9999px', border: '1px solid #D6008D',
                                                cursor: 'pointer', backdropFilter: 'blur(12px)',
                                                padding: '1rem 2.5rem', fontSize: '1rem',
                                            }}
                                        >
                                            Explore Our Services
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="text-center text-xs font-headline font-bold mt-8" style={{ color: '#ffffff' }}>
                            WEBXAUTOMATION · Digital Growth & AI Automation Agency · webxautomation.in
                        </p>
                    </FadeIn>
                </div>
            </section>
        </>
    )
}