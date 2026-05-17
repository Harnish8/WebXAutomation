'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

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
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 px-5 md:px-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -10%,rgba(115,44,124,0.12) 0%,transparent 60%)' }} />
                <FadeIn>
                    <span className="inline-block px-4 py-1.5 rounded-full glass-card text-xs font-headline font-bold uppercase tracking-widest mb-8" style={{ color: '#732c7c' }}>Transparent Pricing</span>
                </FadeIn>
                <FadeIn delay={0.1}>
                    <h1 className="font-headline font-black tracking-tighter leading-[0.9] mb-6" style={{ fontSize: 'clamp(2.5rem,6vw,5.5rem)', color: '#1a0a2e' }}>
                        Simple, Honest<br /><span className="gradient-text">Pricing.</span>
                    </h1>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: '#4a3560' }}>No hidden fees. No surprises. Just clear deliverables and real results.</p>
                </FadeIn>
            </section>

            {/* Plans */}
            <section className="px-5 md:px-10 max-w-7xl mx-auto pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PLANS.map((plan, i) => (
                        <FadeIn key={plan.name} delay={i * 0.12}>
                            <motion.div whileHover={{ y: -8, scale: 1.01 }} className={`glass-card rounded-2xl p-8 flex flex-col h-full relative ${plan.popular ? 'pricing-popular' : ''}`}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-headline font-black" style={{ background: 'linear-gradient(135deg,#732c7c,#d1746d)', color: '#fff' }}>
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="font-headline font-black text-2xl mb-2" style={{ color: '#1a0a2e' }}>{plan.name}</h3>
                                    <p className="text-sm mb-4" style={{ color: '#4a3560' }}>{plan.desc}</p>
                                    <div className="flex items-end gap-1">
                                        <span className="font-headline font-black text-4xl md:text-5xl gradient-text">{plan.price}</span>
                                        <span className="text-sm mb-2" style={{ color: '#4a3560' }}>/ {plan.per}</span>
                                    </div>
                                </div>
                                <ul className="space-y-3 flex-grow mb-8">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-start gap-3 text-sm" style={{ color: '#4a3560' }}>
                                            <span className="material-symbols-outlined text-base mt-0.5 flex-shrink-0" style={{ color: '#732c7c', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/contact">
                                    <button className={`w-full py-3 rounded-full font-headline font-bold text-sm transition-all ${plan.popular ? 'btn-primary glow-pink' : 'btn-outline'}`}>
                                        {plan.cta}
                                    </button>
                                </Link>
                            </motion.div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* Add-ons */}
            <section className="px-5 md:px-10 max-w-7xl mx-auto pb-24">
                <div className="neon-line mb-16" />
                <FadeIn>
                    <p className="font-headline font-bold tracking-widest uppercase text-xs mb-3" style={{ color: '#732c7c' }}>Optional Add-ons</p>
                    <h2 className="font-headline font-black mb-10" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#1a0a2e' }}>Supercharge Any Plan</h2>
                </FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {ADDONS.map((a, i) => (
                        <FadeIn key={a.title} delay={i * 0.08}>
                            <motion.div whileHover={{ y: -8, borderColor: 'rgba(115,44,124,0.4)' }} className="glass-card rounded-2xl p-7">
                                <span className="material-symbols-outlined text-3xl mb-4 block" style={{ color: '#732c7c' }}>{a.icon}</span>
                                <h3 className="font-headline font-bold text-base mb-1" style={{ color: '#1a0a2e' }}>{a.title}</h3>
                                <p className="text-xs mb-3" style={{ color: '#4a3560' }}>{a.desc}</p>
                                <p className="font-headline font-black text-lg" style={{ color: '#732c7c' }}>{a.price}</p>
                            </motion.div>
                        </FadeIn>
                    ))}
                </div>

                {/* FAQ */}
                <FadeIn delay={0.2} className="mt-16">
                    <h2 className="font-headline font-black mb-8 text-center" style={{ fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: '#1a0a2e' }}>Common Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            { q: 'Do you offer payment plans?', a: 'Yes we accept 50% upfront and 50% on delivery for all project-based work.' },
                            { q: 'What is your typical turnaround?', a: 'Starter sites in 2 weeks, Growth packages in 4 weeks. Enterprise timelines are scoped per project.' },
                            { q: 'Do you work with international clients?', a: 'Absolutely. We work with clients in Australia, US, UK, India and beyond fully remote.' },
                            { q: 'Is hosting included?', a: 'We recommend and set up Vercel (free tier) or your preferred hosting. We do not resell hosting.' },
                        ].map((faq, i) => (
                            <motion.div key={faq.q} whileHover={{ borderColor: 'rgba(115,44,124,0.3)' }} className="glass-card rounded-xl p-6">
                                <h4 className="font-headline font-bold text-base mb-2" style={{ color: '#1a0a2e' }}>{faq.q}</h4>
                                <p className="text-sm leading-relaxed" style={{ color: '#4a3560' }}>{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </FadeIn>
            </section>
        </>
    )
}
