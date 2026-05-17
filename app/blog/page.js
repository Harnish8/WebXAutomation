'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

const featured = {
  category: 'Engineering',
  readTime: '8 MIN READ',
  title: 'LLM Optimization in 2024: Beyond the Token Limit',
  desc: 'How we architect recursive inference loops to achieve near-instantaneous automation responses in production environments.',
}

const posts = [
  { category: 'Infrastructure', date: 'JAN 15, 2024', title: 'Edge Computing: The New Front Line', desc: 'Decentralizing automation logic to reduce latency in global e-commerce deployments.', author: 'Alex Volkov', initials: 'AV', color: 'bg-primary-container' },
  { category: 'Automation', date: 'JAN 12, 2024', title: 'Zero-Code Workflows that Scale', desc: 'Bridging the gap between creative vision and technical execution through intuitive logic gates.', author: 'Sarah Moon', initials: 'SM', color: 'bg-secondary-container' },
  { category: 'Case Study', date: 'JAN 08, 2024', title: 'Global Supply Chains & Predictive AI', desc: 'How one enterprise reduced waste by 40% using our temporal forecasting models.', author: 'David Kross', initials: 'DK', color: 'bg-surface-container-highest' },
  { category: 'Security', date: 'DEC 20, 2023', title: 'Hardening Autonomous Endpoints', desc: 'Securing the automated perimeter against sophisticated adversarial injection attacks.', author: 'Ray Norton', initials: 'RN', color: 'bg-surface-bright' },
  { category: 'Culture', date: 'DEC 15, 2023', title: "The Digital Nomad's Terminal", desc: 'A look at the hardware and software setups driving the next generation of builders.', author: 'Lila Park', initials: 'LP', color: 'bg-surface-container' },
  { category: 'DevOps', date: 'DEC 05, 2023', title: 'Observability in Fluid Systems', desc: 'Monitoring what you cannot see: tracing requests through complex ephemeral architectures.', author: 'James Miller', initials: 'JM', color: 'bg-outline-variant' },
]

const categories = ['All', 'Engineering', 'Automation', 'Design', 'Infrastructure', 'Security']

export default function Blog() {
  const [active, setActive] = useState('All')

  return (
    <div className="relative">
      {/* Hero */}
      <section className="px-6 md:px-10 py-16 md:py-20 max-w-7xl mx-auto relative pt-32">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #ff87b9 0%, transparent 70%)', filter: 'blur(100px)' }} />
        <div className="relative z-10 flex flex-col items-start gap-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-headline font-bold uppercase tracking-widest text-primary">Live Transmissions</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-headline font-black tracking-tighter leading-[0.9] max-w-4xl">
              The Digital <span className="gradient-text">Aurora</span> Blog.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl font-light leading-relaxed">
              Exploring the intersection of high-velocity automation, kinetic design systems, and the future of autonomous web architecture.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured */}
      <section className="px-6 md:px-10 mb-16 md:mb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Featured */}
          <FadeIn className="lg:col-span-8">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="group relative overflow-hidden rounded-xl bg-surface-container border border-outline-variant/10 hover:border-primary/30 transition-all duration-500"
            >
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-surface-container-high to-surface-container-highest flex items-center justify-center">
                <motion.span
                  animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="material-symbols-outlined text-[8rem] text-primary/20"
                >
                  hub
                </motion.span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-[10px] font-headline font-black uppercase tracking-widest border border-primary/30">{featured.category}</span>
                  <span className="text-[#4a3560]/50 text-[10px] font-headline font-bold py-1">{featured.readTime}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-headline font-bold mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="text-on-surface-variant max-w-lg mb-6 line-clamp-2 text-sm md:text-base">{featured.desc}</p>
                <motion.button whileHover={{ gap: '16px' }} className="flex items-center gap-2 text-white font-headline font-bold group/btn">
                  Read Transmission
                  <span className="material-symbols-outlined text-primary group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
                </motion.button>
              </div>
            </motion.div>
          </FadeIn>

          {/* Secondary */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <FadeIn delay={0.1} className="h-full">
              <motion.div whileHover={{ scale: 1.02 }} className="h-full p-8 rounded-xl bg-surface-container-high border border-outline-variant/10 flex flex-col justify-between hover:bg-surface-container-highest transition-colors group min-h-[200px]">
                <div>
                  <span className="text-secondary text-[10px] font-headline font-black uppercase tracking-widest mb-4 block">Design Philosophy</span>
                  <h3 className="text-xl md:text-2xl font-headline font-bold mb-4 group-hover:text-secondary transition-colors">The Kinetic Aurora: Design Systems as Living Entities</h3>
                  <p className="text-sm text-on-surface-variant line-clamp-3">Why static style guides are dead and how we built a responsive DNA for Webxautomation.</p>
                </div>
                <div className="pt-6 border-t border-outline-variant/10 mt-6">
                  <span className="text-xs text-[#4a3560]/50 italic">Coming Soon</span>
                </div>
              </motion.div>
            </FadeIn>

            {/* Newsletter */}
            <FadeIn delay={0.2}>
              <div className="p-8 rounded-xl bg-gradient-to-br from-primary-container/20 to-secondary-container/10 border border-primary/20 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                <h3 className="text-xl font-headline font-bold mb-2">Join the Pulse</h3>
                <p className="text-xs text-on-surface-variant mt-1 mb-6">Weekly insights delivered to your inbox.</p>
                <div className="w-full flex rounded-lg overflow-hidden border border-primary/30">
                  <input className="w-full bg-background/50 px-4 py-2 text-sm outline-none text-white placeholder:text-[#4a3560]/40" placeholder="email@domain.com" type="email" />
                  <button className="p-2 bg-primary text-on-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto mb-10">
        <div className="flex gap-3 flex-wrap">
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-xs font-headline font-bold uppercase tracking-widest transition-all ${
                active === cat
                  ? 'bg-primary text-on-primary glow-primary'
                  : 'border border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-24 md:pb-32">
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">Latest Transmissions</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence>
            {posts.map((post, i) => (
              <FadeIn key={post.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, borderColor: 'rgba(255,0,154,0.2)' }}
                  className="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/5 transition-all duration-300 h-full"
                >
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-surface-container-high to-surface-container flex items-center justify-center">
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4 + i, repeat: Infinity }}
                      className="material-symbols-outlined text-[4rem] text-primary/15"
                    >
                      {['insights', 'robot_2', 'public', 'security', 'laptop_mac', 'monitoring'][i]}
                    </motion.span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-headline font-black text-on-surface-variant tracking-widest uppercase">{post.category}</span>
                      <span className="text-[10px] text-[#4a3560]/40">{post.date}</span>
                    </div>
                    <h4 className="text-lg md:text-xl font-headline font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h4>
                    <p className="text-sm text-on-surface-variant mb-6 line-clamp-3 flex-grow">{post.desc}</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className={`w-8 h-8 rounded-full ${post.color} flex items-center justify-center font-black text-[10px] text-white`}>{post.initials}</div>
                      <span className="text-xs font-bold text-white">{post.author}</span>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </AnimatePresence>
        </div>

        {/* Load more */}
        <div className="mt-16 md:mt-20 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,135,185,0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full border border-primary/40 text-primary font-headline font-black uppercase tracking-widest transition-all duration-300"
          >
            Load More Transmissions
          </motion.button>
        </div>
      </section>
    </div>
  )
}
