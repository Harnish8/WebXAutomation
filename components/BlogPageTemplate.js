'use client'
import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

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

function Divider() {
    return (
        <div className="w-full h-px my-2"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(115,44,124,0.28),rgba(209,116,109,0.18),transparent)' }} />
    )
}

export default function BlogPageTemplate({ post }) {
    return (
        <>
            <ScrollBar />
            <Orbs />

            <style>{`
        .text-highlight { color: #FFB84C; font-weight: 600; }
        .blog-content h2 {
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 900;
          color: #ffffff;
          margin: 2.5rem 0 1rem;
          font-family: inherit;
          letter-spacing: -0.02em;
        }
        .blog-content h3 {
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 800;
          color: #FFB84C;
          margin: 2rem 0 0.75rem;
          font-family: inherit;
        }
        .blog-content p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.88);
          margin-bottom: 1.4rem;
        }
        .blog-content ul, .blog-content ol {
          margin: 1rem 0 1.5rem 1.5rem;
          color: rgba(255,255,255,0.85);
        }
        .blog-content li {
          margin-bottom: 0.6rem;
          line-height: 1.7;
          font-size: 1rem;
        }
        .blog-content ul li::marker { color: #FFB84C; }
        .blog-content ol li::marker { color: #FFB84C; font-weight: 700; }
        .blog-content strong { color: #FFB84C; font-weight: 700; }
        .blog-content blockquote {
          border-left: 3px solid #FFB84C;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          background: rgba(255,184,76,0.06);
          border-radius: 0 12px 12px 0;
          color: rgba(255,255,255,0.9);
          font-style: italic;
          font-size: 1.1rem;
          line-height: 1.7;
        }
        .blog-content a {
          color: #FFB84C;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-content hr {
          border: none;
          border-top: 1px solid rgba(255,184,76,0.2);
          margin: 2.5rem 0;
        }
        .share-btn {
          background: rgba(255,255,255,0);
          border: 1.5px solid #FFB84C;
          border-radius: 9999px;
          color: #FFB84C;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 8px 18px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: inherit;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .share-btn:hover {
          background: rgba(255,184,76,0.1);
          box-shadow: 0 0 14px rgba(255,184,76,0.25);
        }
        .tag-pill {
          background: rgba(255,184,76,0.08);
          border: 1px solid rgba(255,184,76,0.35);
          border-radius: 9999px;
          color: #FFB84C;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 14px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: inherit;
        }
        .related-card {
          background: rgba(255,255,255,0);
          border: 2px solid #FFB84C;
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .related-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 24px rgba(255,184,76,0.2);
        }
      `}</style>

            {/* HERO */}
            <section className="relative pt-36 pb-12 px-5 md:px-10 overflow-hidden" style={{ zIndex: 1 }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 30% 50%, rgba(115,44,124,0.10) 0%, transparent 60%)' }} />
                <div className="max-w-4xl mx-auto">
                    {/* Back link */}
                    <FadeIn>
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-headline font-bold mb-10 transition-colors" style={{ color: '#8a6fa0' }}>
                            <span className="material-symbols-outlined text-base">arrow_back</span> All Articles
                        </Link>
                    </FadeIn>

                    {/* Category + read time */}
                    <FadeIn delay={0.04}>
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="tag-pill">{post.category}</span>
                            <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                {post.readTime}
                            </span>
                            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>·</span>
                            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{post.date}</span>
                        </div>
                    </FadeIn>

                    {/* Title */}
                    <FadeIn delay={0.08}>
                        <h1 className="font-headline font-black tracking-tighter leading-[0.9] mb-6"
                            style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', color: '#ffffff' }}>
                            {post.titleLine1}
                            {post.titleLine2 && (
                                <><br /><span style={{ color: '#FFB84C' }}>{post.titleLine2}</span></>
                            )}
                        </h1>
                    </FadeIn>

                    {/* Excerpt */}
                    <FadeIn delay={0.12}>
                        <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '720px' }}>
                            {post.excerpt}
                        </p>
                    </FadeIn>

                    {/* Author row */}
                    <FadeIn delay={0.16}>
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-8"
                            style={{ borderBottom: '1px solid rgba(255,184,76,0.2)' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                                    style={{ background: 'rgba(255,184,76,0.15)', border: '1.5px solid #FFB84C', color: '#FFB84C' }}>
                                    {post.authorInitials}
                                </div>
                                <div>
                                    <p className="text-sm font-headline font-bold" style={{ color: '#ffffff' }}>{post.author}</p>
                                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{post.authorRole}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-headline font-bold uppercase tracking-widest mr-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Share</span>
                                <button className="share-btn">
                                    <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>link</span>
                                    Copy Link
                                </button>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* HERO IMAGE (optional) */}
            {post.heroImage && (
                <section className="px-5 md:px-10 mb-12 relative" style={{ zIndex: 1 }}>
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <div className="rounded-2xl overflow-hidden aspect-video flex items-center justify-center"
                                style={{ border: '2px solid rgba(255,184,76,0.3)', background: 'rgba(255,184,76,0.04)' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '5rem', color: 'rgba(255,184,76,0.2)' }}>
                                    {post.heroIcon || 'article'}
                                </span>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            )}

            <div className="relative px-5 md:px-10" style={{ zIndex: 1 }}>
                <div className="max-w-4xl mx-auto"><Divider /></div>
            </div>

            {/* MAIN CONTENT */}
            <section className="py-12 px-5 md:px-10 relative" style={{ zIndex: 1 }}>
                <div className="max-w-4xl mx-auto">
                    <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </section>

            <div className="relative px-5 md:px-10" style={{ zIndex: 1 }}>
                <div className="max-w-4xl mx-auto"><Divider /></div>
            </div>

            {/* TAGS */}
            {post.tags && post.tags.length > 0 && (
                <section className="py-8 px-5 md:px-10 relative" style={{ zIndex: 1 }}>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-xs font-headline font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Tags</p>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="tag-pill">{tag}</span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* RELATED POSTS */}
            {post.related && post.related.length > 0 && (
                <>
                    <div className="relative px-5 md:px-10" style={{ zIndex: 1 }}>
                        <div className="max-w-4xl mx-auto"><Divider /></div>
                    </div>
                    <section className="py-16 px-5 md:px-10 relative" style={{ zIndex: 1 }}>
                        <div className="max-w-4xl mx-auto">
                            <FadeIn>
                                <p className="font-headline font-bold tracking-widest uppercase text-xs mb-3" style={{ color: '#D6008D' }}>Keep Reading</p>
                                <h2 className="font-headline font-black mb-10" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)', color: '#ffffff' }}>
                                    Related Articles
                                </h2>
                            </FadeIn>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {post.related.map((rel, i) => (
                                    <FadeIn key={rel.slug} delay={i * 0.08}>
                                        <Link href={`/blog/${rel.slug}`} className="block">
                                            <div className="related-card p-6 h-full">
                                                <span className="tag-pill mb-4 inline-block">{rel.category}</span>
                                                <h3 className="font-headline font-black text-base mb-2" style={{ color: '#ffffff' }}>{rel.title}</h3>
                                                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>{rel.excerpt}</p>
                                                <span className="flex items-center gap-2 text-sm font-bold" style={{ color: '#FFB84C' }}>
                                                    Read Article <span className="material-symbols-outlined text-base">arrow_forward</span>
                                                </span>
                                            </div>
                                        </Link>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            )}

            <div className="relative px-5 md:px-10" style={{ zIndex: 1 }}>
                <div className="max-w-4xl mx-auto"><Divider /></div>
            </div>

            {/* CTA */}
            <section className="py-24 px-5 md:px-10 relative" style={{ zIndex: 1 }}>
                <FadeIn>
                    <div className="max-w-4xl mx-auto text-center rounded-3xl p-10 md:p-16 relative overflow-hidden"
                        style={{ background: 'rgba(243,238,249,0)', border: '1px solid #FFB84C' }}>
                        <div className="absolute inset-0 pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(115,44,124,0.10) 0%,transparent 60%)' }} />
                        <motion.div
                            animate={{ scale: [1, 1.06, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10"
                            style={{ background: 'rgba(115,44,124,0.10)', border: '1px solid #FFB84C' }}>
                            <span className="material-symbols-outlined text-2xl" style={{ color: '#FFB84C', fontVariationSettings: "'FILL' 1" }}>
                                flash_on
                            </span>
                        </motion.div>
                        <h2 className="font-headline font-black tracking-tight leading-tight mb-5 relative z-10"
                            style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#ffffff' }}>
                            Ready to Grow Your Business<br />
                            <span style={{ color: '#FFB84C' }}>With Valtrix Media?</span>
                        </h2>
                        <p className="mb-10 relative z-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
                            Let’s build something extraordinary together. No pressure — just a conversation about your goals.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 relative z-10">
                            <Link href="/contact">
                                <button style={{ background: '#D6008D', color: '#fff', fontFamily: 'inherit', fontWeight: 700, borderRadius: '9999px', border: 'none', padding: '16px 40px', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 0 24px rgba(115,44,124,0.35)', transition: 'opacity 0.2s,transform 0.2s' }}
                                    onMouseOver={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.04)' }}
                                    onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}>
                                    Book a Free Call
                                </button>
                            </Link>
                            <Link href="/blog">
                                <button style={{ background: '#12002F', border: '1.5px solid rgba(255,184,76,0.4)', color: '#ffffff', fontFamily: 'inherit', fontWeight: 700, borderRadius: '9999px', padding: '16px 40px', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.25s ease' }}
                                    onMouseOver={e => { e.currentTarget.style.borderColor = '#FFB84C' }}
                                    onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,184,76,0.4)' }}>
                                    More Articles
                                </button>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </>
    )
}