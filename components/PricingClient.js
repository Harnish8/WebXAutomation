'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

function ScrollBar() {
    const barRef = useRef(null)
    useEffect(() => {
        const bar = barRef.current
        if (!bar) return
        const update = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = docHeight > 0 ? scrollTop / docHeight : 0
            bar.style.transform = `scaleX(${progress})`
        }
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])
    return (
        <div ref={barRef} aria-hidden="true" style={{
            position: 'fixed', top: 0, left: 0, right: 0, height: 3,
            background: 'linear-gradient(90deg,#732c7c,#d1746d,#f6a16c)',
            zIndex: 999, transformOrigin: 'left', transform: 'scaleX(0)',
            transition: 'transform 0.1s linear',
        }} />
    )
}

function Orbs() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {[
                { w: 500, h: 500, top: '-5%', left: '55%', c: 'rgba(115,44,124,0.055)', dur: '10s', delay: '0s' },
                { w: 380, h: 380, top: '30%', left: '-6%', c: 'rgba(209,116,109,0.065)', dur: '13s', delay: '2.5s' },
                { w: 300, h: 300, top: '60%', left: '72%', c: 'rgba(246,161,108,0.045)', dur: '8s', delay: '5s' },
                { w: 220, h: 220, top: '80%', left: '30%', c: 'rgba(115,44,124,0.04)', dur: '11s', delay: '1.5s' },
            ].map((o, i) => (
                <div key={i} style={{
                    position: 'absolute', width: o.w, height: o.h, top: o.top, left: o.left,
                    borderRadius: '50%', background: `radial-gradient(circle,${o.c},transparent 70%)`,
                    animation: `orb-float ${o.dur} ease-in-out infinite`,
                    animationDelay: o.delay,
                }} />
            ))}
        </div>
    )
}

const PLANS = [
    {
        name: 'Starter', price: '$499', per: 'project',
        desc: 'Perfect for small businesses needing a professional online presence.',
        features: ['5-page responsive website', 'Mobile optimised', 'Basic SEO setup', 'Contact form', '1 revision round', '2 weeks delivery'],
        cta: 'Get Started', popular: false,
    },
    {
        name: 'Growth', price: '$1,499', per: 'project',
        desc: 'For growing businesses that need design, automation and SEO combined.',
        features: ['Up to 10 pages + CMS', 'Advanced animations', 'Full SEO optimisation', 'Make.com automation (3 flows)', 'HubSpot CRM setup', 'Email sequence (5 emails)', '3 revision rounds', '4 weeks delivery'],
        cta: 'Most Popular', popular: true,
    },
    {
        name: 'Enterprise', price: 'Custom', per: 'quote',
        desc: 'Full-service digital partnership for scaling companies.',
        features: ['Unlimited pages', 'Custom web application', 'Full AI automation suite', 'CRM + email automation', 'Social media management', 'Monthly SEO retainer', 'Priority support', 'Dedicated account manager'],
        cta: 'Book a Call', popular: false,
    },
]

const ADDONS = [
    { icon: 'robot_2', title: 'AI Automation Flow', price: '$299', desc: 'One custom Make.com workflow connecting your tools.' },
    { icon: 'search_insights', title: 'SEO Audit & Fix', price: '$199', desc: 'Full technical SEO audit with implementation.' },
    { icon: 'mail', title: 'Email Sequence', price: '$149', desc: '5-email drip sequence written and set up for you.' },
    { icon: 'share_reviews', title: 'Social Media Pack', price: '$399/mo', desc: '20 posts/month with scheduling and analytics.' },
]

export default function PricingClient() {
    return (
        <div className="relative">
            <ScrollBar />
            <Orbs />

            {/* Hero */}
            <section className="pt-32 pb-16 px-5 md:px-10 text-center relative overflow-hidden" style={{ zIndex: 1 }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -10%,rgba(214,0,141,0.15) 0%,transparent 60%)' }} />
                <FadeIn>
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-headline font-bold uppercase tracking-widest mb-8"
                          style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(115,44,124,0.25)', color: '#D6008D' }}>
                        Transparent Pricing
                    </span>
                </FadeIn>
                <FadeIn delay={0.1}>
                    <h1 className="font-headline font-black tracking-tighter leading-[0.9] mb-6" style={{ fontSize: 'clamp(2.5rem,6vw,5.5rem)', color: '#ffffff' }}>
                        Simple, Honest<br /><span style={{ color: '#D6008D' }}>Pricing.</span>
                    </h1>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>No hidden fees. No surprises. Just clear deliverables and real results.</p>
                </FadeIn>
            </section>

            {/* Plans */}
            <section className="px-5 md:px-10 max-w-7xl mx-auto pb-20 relative" style={{ zIndex: 1 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PLANS.map((plan, i) => (
                        <FadeIn key={plan.name} delay={i * 0.12}>
                            <div className={`rounded-2xl p-8 flex flex-col h-full relative transition-all duration-300 ${plan.popular ? 'pricing-popular' : ''}`}
                                 style={{
                                     background: plan.popular ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)',
                                     border: plan.popular ? '2px solid #D6008D' : '1px solid rgba(115,44,124,0.2)',
                                     backdropFilter: 'blur(20px)',
                                     boxShadow: plan.popular ? '0 0 40px rgba(214,0,141,0.15)' : 'none'
                                 }}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-headline font-black" style={{ background: '#D6008D', color: '#fff', boxShadow: '0 0 15px rgba(214,0,141,0.4)' }}>
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="font-headline font-black text-2xl mb-2" style={{ color: '#ffffff' }}>{plan.name}</h3>
                                    <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>{plan.desc}</p>
                                    <div className="flex items-end gap-1">
                                        <span className="font-headline font-black text-4xl md:text-5xl" style={{ color: plan.popular ? '#D6008D' : '#ffffff' }}>{plan.price}</span>
                                        <span className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>/ {plan.per}</span>
                                    </div>
                                </div>
                                <ul className="space-y-3 flex-grow mb-8">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                                            <span className="material-symbols-outlined text-base mt-0.5 flex-shrink-0" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/contact">
                                    <button className="w-full py-3 rounded-full font-headline font-bold text-sm transition-all"
                                            style={{
                                                background: plan.popular ? '#D6008D' : 'transparent',
                                                border: plan.popular ? 'none' : '1px solid #D6008D',
                                                color: '#ffffff',
                                                boxShadow: plan.popular ? '0 0 25px rgba(214,0,141,0.3)' : 'none'
                                            }}>
                                        {plan.cta}
                                    </button>
                                </Link>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* Add-ons */}
            <section className="px-5 md:px-10 max-w-7xl mx-auto pb-24 relative" style={{ zIndex: 1 }}>
                <div className="neon-line mb-16" />
                <FadeIn>
                    <p className="font-headline font-bold tracking-widest uppercase text-xs mb-3" style={{ color: '#D6008D' }}>Optional Add-ons</p>
                    <h2 className="font-headline font-black mb-10" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#ffffff' }}>Supercharge Any Plan</h2>
                </FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {ADDONS.map((a, i) => (
                        <FadeIn key={a.title} delay={i * 0.08}>
                            <div className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                                 style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(115,44,124,0.18)', backdropFilter: 'blur(20px)' }}>
                                <span className="material-symbols-outlined text-3xl mb-4 block" style={{ color: '#D6008D' }}>{a.icon}</span>
                                <h3 className="font-headline font-bold text-base mb-1" style={{ color: '#ffffff' }}>{a.title}</h3>
                                <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>{a.desc}</p>
                                <p className="font-headline font-black text-lg" style={{ color: '#D6008D' }}>{a.price}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* FAQ */}
                <FadeIn delay={0.2} className="mt-16">
                    <h2 className="font-headline font-black mb-8 text-center" style={{ fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: '#ffffff' }}>Common Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            { q: 'Do you offer payment plans?', a: 'Yes we accept 50% upfront and 50% on delivery for all project-based work.' },
                            { q: 'What is your typical turnaround?', a: 'Starter sites in 2 weeks, Growth packages in 4 weeks. Enterprise timelines are scoped per project.' },
                            { q: 'Do you work with international clients?', a: 'Absolutely. We work with clients in Australia, US, UK, India and beyond fully remote.' },
                            { q: 'Is hosting included?', a: 'We recommend and set up Vercel (free tier) or your preferred hosting. We do not resell hosting.' },
                        ].map((faq, i) => (
                            <div key={i} className="rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
                                 style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(115,44,124,0.18)', backdropFilter: 'blur(20px)' }}>
                                <h4 className="font-headline font-bold text-base mb-2" style={{ color: '#ffffff' }}>{faq.q}</h4>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </section>
        </div>
    )
}
