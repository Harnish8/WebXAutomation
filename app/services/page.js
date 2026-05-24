'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const PROCESS = [
  { num: '01', title: 'Discover & Audit', desc: 'Thorough analysis of your brand, market, competitors, and current performance before we make a single move.' },
  { num: '02', title: 'Strategy & Planning', desc: 'A tailored, integrated growth strategy connecting every channel toward your specific business goals.' },
  { num: '03', title: 'Execute & Automate', desc: 'Our team launches campaigns with AI automation running in the background keeping everything optimised.' },
  { num: '04', title: 'Measure & Scale', desc: 'We track what matters, report with transparency, and scale the strategies that work into long term growth.' },
]

const services = [
  {
    icon: 'share_reviews',
    title: 'Social Media Marketing',
    desc: 'We build genuine communities around your brand through strategic content.',
    span: 'md:col-span-8',
    big: true,
    link: 'Explore',
    href: '/services/social-media',
  },
  {
    icon: 'search_insights',
    title: 'SEO & Content Marketing',
    desc: 'Long term visibility that compounds over time.',
    span: 'md:col-span-4',
    link: 'Explore',
    href: '/services/seo',
  },
  {
    icon: 'ads_click',
    title: 'Paid Ads PPC, Meta & Google',
    desc: 'Strategic, data driven campaigns across Google and Meta.',
    span: 'md:col-span-4',
    link: 'Explore',
    href: '/services/paid-ads',
  },
  {
    icon: 'palette',
    title: 'Branding & Creative Design',
    desc: 'A brand that means something is one of the most valuable assets a business can have.',
    span: 'md:col-span-4',
    link: 'Explore',
    href: '/services/branding',
  },
  {
    icon: 'web',
    title: 'Web Design & Development',
    desc: ' Beautiful, high converting websites that work as hard as you do.',
    span: 'md:col-span-4',
    link: 'Explore',
    href: '/services/web-design',
  },
  {
    icon: 'videocam',
    title: 'Video Production & Editing',
    desc: 'From brand story films to shortform social content.',
    span: 'md:col-span-4',
    link: 'Explore',
    href: '/services/video-production',
  },
  {
    icon: 'model_training',
    title: 'AI Automation',
    desc: 'Automate workflows and scale marketing with AI systems.',
    span: 'md:col-span-4',
    link: 'Explore',
    href: '/services/ai-automation',
  },
  {
    icon: 'label',
    title: 'White Label Services',
    desc: 'Deliver services under your brand with full confidentiality.',
    span: 'md:col-span-4',
    link: 'Explore',
    href: '/services/white-label',
  },
]

const stats = [
  { value: '99.9%', label: 'Core Web Vital Score', color: 'text-primary' },
  { value: '40ms', label: 'Avg. Server Response', color: 'text-secondary' },
  { value: '250+', label: 'Automations Deployed', color: 'text-tertiary' },
  { value: '12x', label: 'Growth Multiplier', color: 'text-white' },
]

export default function Services() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="px-6 md:px-10 pt-32 pb-20 max-w-7xl mx-auto relative">
        <div className="absolute -top-10 right-0 w-[400px] h-[400px] rounded-full opacity-30 hidden lg:block"
          style={{ background: 'radial-gradient(circle, rgba(172,137,255,0.2) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute -top-10 -right-20 hidden lg:block opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="w-[400px] h-[400px] border border-primary/20 rounded-full"
          />
          <div className="w-[320px] h-[320px] border border-secondary/10 rounded-full absolute top-10 left-10" />
        </div>

        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
            <span className="material-symbols-outlined text-sm" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>WHAT WE DO</span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-headline font-black tracking-tighter leading-[0.88] mb-8"
            style={{ fontSize: 'clamp(3rem,7vw,7rem)', color: '#ffffff' }}>
            Everything Your Brand Needs to Grow,<br />
            <span style={{ color: '#D6008D' }}>Automate & Scale.</span>
          </h1>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
          <div>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed" style={{ color: 'rgba(255, 255, 255, 1)' }}>
                At Webxautomation, we&apos;ve built a comprehensive suite of services designed to work together as one <span style={{ color: '#D6008D' }}>connected growth system</span>. From the creative foundations of your brand through to intelligent AI automation and white label partnerships every service we offer is purpose built for businesses that are serious about longterm, sustainable growth.
              </p><br />
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed" style={{ color: 'rgba(255, 255, 255, 1)' }}>
                Whether you need one service or the complete ecosystem, we&apos;ll build a plan around your goals and grow it with you.
              </p>
            </FadeIn>
          </div>
          <div>
            <DotLottieReact
              src="/lottie/7.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* Services Bento */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto">
        {/* <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((svc, i) => (
            <FadeIn key={svc.title} delay={i * 0.08} className={svc.span}>
              <motion.div
                whileHover={{ y: -5, borderColor: 'rgba(255,0,154,0.4)', boxShadow: '0 0 30px rgba(255,0,154,0.15)' }}
                className="glass-card rounded-xl p-8 md:p-10 flex flex-col justify-between h-full min-h-[260px]"
              >
                <div>
                  <span className="material-symbols-outlined text-primary text-4xl md:text-5xl mb-6 block">{svc.icon}</span>
                  <h3 className="font-headline text-2xl md:text-3xl font-bold text-white mb-4">{svc.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm md:text-base max-w-md">{svc.desc}</p>
                </div>
                {svc.tags && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {svc.tags.map(tag => (
                      <span key={tag} className="px-4 py-1 rounded-full border border-outline-variant/30 text-xs font-headline uppercase tracking-widest text-on-surface-variant">{tag}</span>
                    ))}
                  </div>
                )}
                {svc.link && (
                  <a className="text-primary font-bold flex items-center gap-2 mt-6 hover:gap-4 transition-all text-sm" href="#">
                    {svc.link} <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </a>
                )}
              </motion.div>
            </FadeIn>
          ))}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((svc, i) => (
            <FadeIn key={svc.title} delay={i * 0.08} className={svc.span}>

              <Link href={svc.href || "#"} className="block h-full">
                <motion.div
                  whileHover={{
                    y: -5,
                    borderColor: '#D6008D',
                    boxShadow: '0 0 10px #ffb74cd0'
                  }}
                  className="glass-card rounded-xl p-8 md:p-10 flex flex-col justify-between h-full min-h-[260px]"
                  style={{ background: 'rgba(255, 255, 255, 0)', border: '2px solid #D6008D' }}
                >
                  <div>
                    <span className="material-symbols-outlined text-primary text-4xl md:text-5xl mb-6 block"
                      style={{ background: 'rgba(255, 255, 255, 0)', color: '#D6008D' }}>
                      {svc.icon}
                    </span>

                    <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-4" style={{ color: '#ffffffff' }}>
                      {svc.title}
                    </h3>

                    <p className="text-on-surface-variant leading-relaxed text-sm md:text-base max-w-md" style={{ color: '#ffffffff' }}>
                      {svc.desc}
                    </p>
                  </div>

                  {svc.tags && (
                    <div className="flex flex-wrap gap-3 mt-6">
                      {svc.tags.map(tag => (
                        <span key={tag} className="px-4 py-1 rounded-full border border-outline-variant/30 text-xs font-headline uppercase tracking-widest text-on-surface-variant">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {svc.link && (
                    <span className="text-primary font-bold flex items-center gap-2 mt-6 hover:gap-4 transition-all text-sm" style={{ color: '#D6008D' }}>
                      {svc.link}
                      <span className="material-symbols-outlined text-base" style={{ color: '#D6008D' }}>arrow_forward</span>
                    </span>
                  )}
                </motion.div>
              </Link>

            </FadeIn>
          ))}
        </div>
      </section>

      {/* Stats */}
      {/* <section className="px-6 md:px-10 max-w-7xl mx-auto mb-24 md:mb-40">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-20 items-end">
          <FadeIn className="flex-1">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              Technical Precision<br />by the Numbers.
            </h2>
            <div className="grid grid-cols-2 gap-10 md:gap-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`text-4xl md:text-5xl font-headline font-black ${stat.color} mb-2`}>{stat.value}</div>
                  <p className="text-on-surface-variant font-medium tracking-wide text-xs uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="flex-1 w-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-2xl overflow-hidden aspect-video relative"
            >
              <div className="w-full h-full bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-highest flex items-center justify-center">
                <span className="material-symbols-outlined text-[5rem] text-primary/20">analytics</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-headline font-bold text-white uppercase tracking-widest">Live Engine Monitoring</span>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section> */}

      <section className="relative z-10 py-24 px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 60%, rgba(115,44,124,0.07) 0%, transparent 55%)' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
                  <span className="material-symbols-outlined text-sm" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>route</span>
                  <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>Growth System / Process</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2 className="font-headline font-black tracking-tight leading-[0.9] mb-4" style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', color: '#ffffff' }}>
                  How We Build<br />
                  <span style={{ color: '#D6008D' }}>
                    Lasting Growth.
                  </span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="text-base leading-relaxed max-w-2xl mb-4" style={{ color: '#ffffff' }}>
                  We follow a structured, proven process designed to remove guesswork and create clarity at every stage. Here&apos;s how we turn your goals into a growth system that delivers.
                </p>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="text-xs font-headline font-bold uppercase tracking-widest mb-12" style={{ color: '#D6008D' }}>
                  The Webxautomation Growth Framework A four phase approach to building sustainable, compounding growth for your business.
                </p>
              </FadeIn>
            </div>
            <div>
              <DotLottieReact
                src="/lottie/1.lottie"
                loop
                autoplay
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((p, i) => (
              <FadeIn key={p.num} delay={i * 0.1}>
                <div className="process-step p-7 h-full flex flex-col" style={{ background: 'rgba(255, 255, 255, 0)', border: '2px solid #D6008D' }}>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="font-headline font-black text-4xl" style={{ color: '#D6008D' }}>{p.num}</span>
                    <span className="material-symbols-outlined text-base" style={{ color: '#D6008D' }}>arrow_forward</span>
                  </div>
                  <h3 className="font-headline font-black text-base mb-3" style={{ color: '#ffffffff' }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: '#ffffffff' }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="relative z-10 py-24 px-5 md:px-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
              style={{ background: 'rgba(243, 238, 249, 0)', border: '1px solid #D6008D', backdropFilter: 'blur(24px)' }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -5%,rgba(115,44,124,0.18),transparent 55%)' }} />
              <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-7 relative z-10"
                style={{ background: 'rgba(115,44,124,0.1)', border: '1px solid #D6008D' }}>
                <span className="material-symbols-outlined text-2xl" style={{ color: '#D6008D', fontVariationSettings: "'FILL' 1" }}>flash_on</span>
              </motion.div>
              <div className="relative z-10">
                <h2 className="font-headline font-black tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#ffffffff' }}>
                  Ready to Get Started<br />
                  <span style={{ color: '#D6008D' }}>
                    With Our Services?
                  </span>
                </h2>
                <p className="text-base leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#ffffffff' }}>
                  Every service we offer is part of a connected growth system. Tell us where you want to go we&apos;ll build the strategy to get you there.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary px-10 py-4 text-base glow-pink"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                  <Link href="/services">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-outline px-10 py-4 text-base"
                      style={{ color: '#ffffff', backgroundColor: '#12002F' }}
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
    </div>
  )
}
