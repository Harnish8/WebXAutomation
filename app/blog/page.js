'use client'
import { useState } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import { blogs } from '@/lib/blogs'

// Derive unique categories from blogs data automatically
const allCategories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))]

// Icon map — add entries here if you use new material-symbols icons in blogs.js
const iconMap = {
  hub: 'hub',
  account_tree: 'account_tree',
  insights: 'insights',
  public: 'public',
  security: 'security',
  laptop_mac: 'laptop_mac',
  monitoring: 'monitoring',
}

export default function Blog() {
  const [active, setActive] = useState('All')

  const featured = blogs[0] // Most recent = first entry in blogs.js
  const grid = blogs.slice(1) // Rest go in the grid

  const filtered = active === 'All' ? grid : grid.filter(p => p.category === active)

  return (
    <div className="relative">
      <style>{`
        .blog-post-card {
          background: rgba(255,255,255,0);
          border: 2px solid #FFB84C;
          border-radius: 16px;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .blog-post-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 28px rgba(255,184,76,0.25);
        }
        .author-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,184,76,0.12);
          border: 1.5px solid #FFB84C;
          display: flex; align-items: center; justify-content: center;
          color: #FFB84C; font-weight: 900; font-size: 0.7rem; flex-shrink: 0;
        }
        .cat-filter-btn {
          padding: 8px 20px; border-radius: 9999px;
          font-size: 0.7rem; font-family: inherit; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          cursor: pointer; transition: all 0.25s ease;
          border: 1.5px solid rgba(255,184,76,0.35);
          background: transparent; color: rgba(255,255,255,0.55);
        }
        .cat-filter-btn:hover { border-color: #FFB84C; color: #FFB84C; }
        .cat-filter-btn.active {
          background: #FFB84C; border-color: #FFB84C;
          color: #12002F; box-shadow: 0 0 18px rgba(255,184,76,0.35);
        }
        .newsletter-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,184,76,0.3); border-radius: 9999px;
          padding: 12px 20px; color: #ffffff; font-size: 0.875rem;
          outline: none; font-family: inherit; transition: border-color 0.25s ease;
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.3); }
        .newsletter-input:focus { border-color: #FFB84C; }
        .newsletter-btn {
          background: #D6008D; border: none; border-radius: 9999px;
          color: #fff; font-weight: 700; font-family: inherit;
          padding: 12px 24px; font-size: 0.875rem; cursor: pointer;
          white-space: nowrap; flex-shrink: 0; transition: opacity 0.2s ease;
        }
        .newsletter-btn:hover { opacity: 0.88; }
        .load-more-btn {
          padding: 14px 40px; border-radius: 9999px;
          border: 1.5px solid #FFB84C; background: transparent;
          color: #FFB84C; font-family: inherit; font-weight: 700;
          font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;
          cursor: pointer; transition: all 0.25s ease;
        }
        .load-more-btn:hover {
          background: rgba(255,184,76,0.08);
          box-shadow: 0 0 20px rgba(255,184,76,0.2);
        }
      `}</style>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-32 pb-16 max-w-7xl mx-auto relative">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FFB84C 0%, transparent 70%)', filter: 'blur(100px)' }} />

        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
            <span className="w-2 h-2 rounded-full" style={{ background: '#D6008D' }} />
            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: '#D6008D' }}>Insights & Articles</span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-headline font-black tracking-tighter leading-[0.9] mb-6"
            style={{ fontSize: 'clamp(3rem,7vw,7rem)', color: '#ffffff' }}>
            The Webxautomation <span style={{ color: '#FFB84C' }}>Blog.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Strategy, automation, design, and growth insights from the Webxautomation team on building businesses that last.
          </p>
        </FadeIn>
      </section>

      {/* Featured — always the first blog in blogs.js */}
      <section className="px-6 md:px-10 mb-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <FadeIn className="lg:col-span-8">
            <Link href={`/blog/${featured.slug}`} className="block group">
              <div
                className="relative overflow-hidden rounded-2xl featured-card-hover"
                style={{ border: '2px solid #FFB84C', background: 'rgba(255,255,255,0)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              >
                <div className="aspect-video flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(115,44,124,0.15) 0%, rgba(255,184,76,0.05) 100%)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '5rem', color: 'rgba(255,184,76,0.2)' }}>
                    {featured.heroIcon}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#12002F] via-[#12002F]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="text-xs font-headline font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: 'rgba(255,184,76,0.15)', border: '1px solid rgba(255,184,76,0.4)', color: '#FFB84C' }}>
                      {featured.category}
                    </span>
                    <span className="text-xs font-headline font-bold py-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 className="font-headline font-black mb-4 tracking-tight group-hover:text-[#FFB84C] transition-colors"
                    style={{ fontSize: 'clamp(1.4rem,3vw,2.2rem)', color: '#ffffff' }}>
                    {featured.cardTitle}
                  </h2>
                  <p className="mb-6 max-w-lg text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {featured.excerpt}
                  </p>
                  <span className="flex items-center gap-2 font-headline font-bold text-sm" style={{ color: '#FFB84C' }}>
                    Read Article
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <FadeIn delay={0.1}>
              <div className="p-8 rounded-2xl flex flex-col justify-between h-full min-h-[200px]"
                style={{ background: 'rgba(255,255,255,0)', border: '2px solid #FFB84C' }}>
                <div>
                  <span className="text-xs font-headline font-black uppercase tracking-widest mb-4 block" style={{ color: '#FFB84C' }}>
                    Growth Insight
                  </span>
                  <h3 className="font-headline font-black mb-4" style={{ fontSize: 'clamp(1rem,1.5vw,1.3rem)', color: '#ffffff' }}>
                    AI + Human Strategy: The Future of Digital Growth
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Why blending intelligent automation with human expertise creates compounding growth for brands.
                  </p>
                </div>
                <div className="pt-6 mt-6" style={{ borderTop: '1px solid rgba(255,184,76,0.2)' }}>
                  <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: 'rgba(255,184,76,0.5)' }}>
                    Coming Soon
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0)', border: '2px solid #FFB84C' }}>
                <span className="material-symbols-outlined text-4xl mb-4 block" style={{ color: '#FFB84C', fontVariationSettings: "'FILL' 1" }}>
                  rocket_launch
                </span>
                <h3 className="font-headline font-black text-lg mb-1" style={{ color: '#ffffff' }}>Join the Pulse</h3>
                <p className="text-xs mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>Weekly insights delivered to your inbox.</p>
                <div className="flex gap-2">
                  <input className="newsletter-input" placeholder="your@email.com" type="email" />
                  <button className="newsletter-btn">Join</button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Category Filter — auto-generated from blogs data */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto mb-10">
        <div className="flex gap-2 flex-wrap">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`cat-filter-btn ${active === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-24 md:pb-32">
        <div className="flex items-end justify-between mb-10">
          <FadeIn>
            <p className="font-headline font-bold tracking-widest uppercase text-xs mb-2" style={{ color: '#D6008D' }}>Latest</p>
            <h2 className="font-headline font-black tracking-tight" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: '#ffffff' }}>
              All Articles
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <div
                key={post.slug}
                style={{ opacity: 1, animationDelay: `${i * 0.06}s` }}
                className="fade-in-el fade-in-up fade-in-visible"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="blog-post-card h-full flex flex-col">
                    <div className="aspect-video flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(115,44,124,0.12) 0%, rgba(255,184,76,0.04) 100%)' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '3.5rem', color: 'rgba(255,184,76,0.25)' }}>
                        {post.heroIcon}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-headline font-black uppercase tracking-widest" style={{ color: '#FFB84C' }}>
                          {post.category}
                        </span>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{post.date}</span>
                      </div>

                      <h4 className="font-headline font-black text-lg mb-3 leading-tight flex-grow" style={{ color: '#ffffff' }}>
                        {post.cardTitle}
                      </h4>

                      <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto"
                        style={{ borderTop: '1px solid rgba(255,184,76,0.15)', paddingTop: '16px' }}>
                        <div className="flex items-center gap-2">
                          <div className="author-avatar">{post.authorInitials}</div>
                          <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.7)' }}>{post.author}</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold" style={{ color: '#FFB84C' }}>
                          Read
                          <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>arrow_forward</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-5xl mb-4 block" style={{ color: 'rgba(255,184,76,0.2)' }}>search_off</span>
            <p className="font-headline font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>No articles in this category yet.</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="mt-16 flex justify-center">
            <button className="load-more-btn">Load More Articles</button>
          </div>
        )}
      </section>
    </div>
  )
}