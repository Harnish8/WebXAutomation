"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const WHO_WE_ARE_POINTS = [
  { icon: "hub", title: "Built as a Growth System", desc: "Every service connects with the others creating a compounding growth engine that gets stronger over time." },
  { icon: "robot_2", title: "Powered by AI Automation", desc: "Advanced AI tools integrated into our workflows from intelligent content systems to automated ad optimisation." },
  { icon: "psychology", title: "Guided by Real Expertise", desc: "AI gives us speed and precision. Our people give it strategy and direction backed by deep experience." },
];

const AI_BULLETS = [
  { icon: "ads_click", title: "Intelligent Ad Optimisation", desc: "Real time bidding, audience refinement, and budget allocation automated and always improving." },
  { icon: "auto_awesome", title: "AI Content Systems", desc: "From ideation to scheduling, AI accelerates our content pipeline without compromising quality." },
  { icon: "analytics", title: "Predictive Analytics", desc: "We use AI to forecast campaign performance, identify trends early, and stay ahead of the curve." },
  { icon: "dashboard", title: "Automated Reporting", desc: "Clear, real time dashboards that surface what's working — no manual pulling, no delays." },
];

const SERVICES = [
  { num: "01", icon: "share_reviews", title: "Social Media Marketing", desc: "We build genuine communities around your brand through strategic content, platform native storytelling, and consistent engagement that turns followers into loyal customers and brand advocates.", tag: "AI Scheduling & Insights" },
  { num: "02", icon: "search_insights", title: "SEO & Content Marketing", desc: "Long term visibility that compounds over time. We craft content strategies and search frameworks that earn organic rankings, build topical authority, and bring the right audiences to you consistently.", tag: "AI SEO Research" },
  { num: "03", icon: "ads_click", title: "Paid Ads PPC, Meta & Google", desc: "Strategic, data driven campaigns across Google, Meta, and beyond where every pound spent is purposeful, every audience is carefully defined, and performance is monitored and improved continuously.", tag: "AI Bid Optimisation" },
  { num: "04", icon: "palette", title: "Branding & Creative Design", desc: "A brand that means something is one of the most valuable assets a business can have. We build thoughtful, distinctive identities visual systems, messaging, and brand strategy that earns recognition and trust.", tag: "AI Assisted Concepting" },
  { num: "05", icon: "web", title: "Web Design & Development", desc: "Beautiful, high converting websites that work as hard as you do. We design and develop digital experiences that reflect your brand's quality, perform flawlessly, and guide visitors naturally towards action.", tag: "AI UX Personalisation" },
  { num: "06", icon: "videocam", title: "Video Production & Editing", desc: "From brand story films to short form social content, we produce video that captures attention and communicates your value with clarity. Concept to final edit handled entirely in house, enhanced by AI tools.", tag: "AI Video Enhancement" },
];

const PROCESS = [
  { num: "01", title: "Discover & Audit", desc: "Thorough analysis of your brand, market, competitors, and current performance before we make a single move." },
  { num: "02", title: "Strategy & Planning", desc: "A tailored, integrated growth strategy connecting every channel toward your specific business goals." },
  { num: "03", title: "Execute & Automate", desc: "Our team launches campaigns with AI automation running in the background keeping everything optimised." },
  { num: "04", title: "Measure & Scale", desc: "We track what matters, report with transparency, and scale the strategies that work into long term growth." },
];

const MARQUEE_ITEMS = ["Social Media Marketing", "SEO & Content", "AI Automation", "Paid Ads", "Web Design", "Branding & Creative", "Video Production", "Growth Systems"];

/* ─────────────────────────────────────────
   SCROLL PROGRESS BAR — native, zero JS per frame
───────────────────────────────────────── */
function ScrollBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg,#732c7c,#d1746d,#f6a16c)",
        zIndex: 999, transformOrigin: "left", transform: "scaleX(0)",
        transition: "transform 0.1s linear",
      }}
    />
  );
}

/* ─────────────────────────────────────────
   FLOATING ORBS — pure CSS animations
───────────────────────────────────────── */
function Orbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      {[
        { w: 500, h: 500, top: "-5%", left: "55%", c: "rgba(115,44,124,0.055)", dur: "10s", delay: "0s" },
        { w: 380, h: 380, top: "30%", left: "-6%", c: "rgba(209,116,109,0.065)", dur: "13s", delay: "2.5s" },
        { w: 300, h: 300, top: "60%", left: "72%", c: "rgba(246,161,108,0.045)", dur: "8s", delay: "5s" },
        { w: 220, h: 220, top: "80%", left: "30%", c: "rgba(115,44,124,0.04)", dur: "11s", delay: "1.5s" },
      ].map((o, i) => (
        <div
          key={i}
          style={{
            position: "absolute", width: o.w, height: o.h, top: o.top, left: o.left,
            borderRadius: "50%", background: `radial-gradient(circle,${o.c},transparent 70%)`,
            animation: `orb-float ${o.dur} ease-in-out infinite`,
            animationDelay: o.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function Counter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const num = parseFloat(target.replace(/[^0-9.]/g, ""));
  const prefix = target.startsWith("$") ? "$" : "";
  const suffix = target.replace(/[$0-9.]/g, "");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const step = num / (1600 / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= num) { setCount(num); clearInterval(t); }
      else setCount(Math.floor(cur * 10) / 10);
    }, 16);
    return () => clearInterval(t);
  }, [started, num]);

  return <span ref={ref} aria-live="polite">{prefix}{count}{suffix}</span>;
}

/* ─────────────────────────────────────────
   SECTION DIVIDER
───────────────────────────────────────── */
function Divider() {
  return (
    <div
      className="w-full h-px my-2"
      style={{ background: "linear-gradient(90deg,transparent,rgba(115,44,124,0.28),rgba(209,116,109,0.18),transparent)" }}
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────────────────────
   HERO ENTRY ANIMATION STATE
───────────────────────────────────────── */
function useHeroEntry() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  return entered;
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function HomeClient() {
  const entered = useHeroEntry();

  return (
    <>
      <ScrollBar />
      <Orbs />

      <style>{`
        @keyframes orb-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-28px) scale(1.08); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.6); }
        }
        @keyframes badge-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        @keyframes cta-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }

        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        /* Hero text entry */
        .hero-badge { opacity: 1; transform: translateY(0); animation: hero-fade-up 0.6s ease forwards; }
        .hero-h1-1 { opacity: 1; transform: translateY(0); animation: hero-fade-up 0.7s ease 0.1s forwards; }
        .hero-h1-2 { opacity: 1; transform: translateY(0); animation: hero-fade-up 0.7s ease 0.15s forwards; }
        .hero-body { opacity: 1; transform: translateY(0); animation: hero-fade-up 0.7s ease 0.2s forwards; }
        .hero-ctas { opacity: 1; transform: translateY(0); animation: hero-fade-up 0.7s ease 0.25s forwards; }
        .hero-img { opacity: 1; transform: scale(1); animation: hero-scale-in 0.8s ease 0.15s forwards; }
        .hero-scroll-indicator { opacity: 1; animation: scroll-bounce 2s ease-in-out infinite; }

        /* Service / about cards */
        .about-card {
          background: rgba(243, 238, 249, 0);
          border: 2px solid #D6008D;
          border-radius: 20px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .about-card:hover { border-color: #D6008D; transform: translateY(-5px); box-shadow: 0 0 40px rgba(214,0,141,0.15); }
        .about-card-hover-x { transition: transform 0.25s ease; }
        .about-card-hover-x:hover { transform: translateX(6px); }

        .ai-bullet-card {
          background: rgba(243, 238, 249, 0);
          border: 2px solid #D6008D;
          border-radius: 20px;
          backdrop-filter: blur(20px);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .ai-bullet-card:hover { transform: translateY(-6px); border-color: #D6008D; box-shadow: 0 0 40px rgba(214,0,141,0.15); }
        .ai-icon-wrap { transition: transform 0.25s ease; }
        .ai-bullet-card:hover .ai-icon-wrap { transform: rotate(-8deg) scale(1.12); }

        .service-card {
          background: rgba(243, 238, 249, 0);
          border: 2px solid #D6008D;
          border-radius: 20px;
          backdrop-filter: blur(20px);
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
          position: relative; overflow: hidden;
        }
        .service-card::before {
          content:''; position: absolute; top:0; left:0; right:0;
          height: 2px; background: linear-gradient(90deg,#732c7c,#d1746d);
          transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
        }
        .service-card:hover { border-color:#D6008D; transform:translateY(-8px); box-shadow:0 0 55px rgba(214,0,141,0.15),0 28px 80px rgba(67,23,95,0.12); }
        .service-card:hover::before { transform: scaleX(1); }

        .process-step {
          background: rgba(243, 238, 249, 0);
          border: 2px solid #D6008D;
          border-radius: 20px;
          backdrop-filter: blur(16px);
          transition: all 0.3s ease;
          position: relative; overflow: hidden;
        }
        .process-step:hover { border-color: #D6008D; transform: translateY(-6px); box-shadow: 0 0 40px rgba(214,0,141,0.15), 0 20px 60px rgba(67,23,95,0.12); }

        .cta-icon { animation: cta-pulse 4s ease-in-out infinite; }

        /* Buttons in this component */
        .btn-primary-home {
          background: linear-gradient(135deg, #D6008D, #D6008D);
          color: #ffffff; font-family: inherit; font-weight: 800;
          border-radius: 9999px; border: none; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .btn-primary-home:hover { opacity: 0.9; transform: scale(1.05); }
        .btn-primary-home:active { transform: scale(0.96); }
        .btn-outline-home {
          background: rgba(18,6,38,0.6); color: #ffffff; font-family: inherit; font-weight: 800;
          border-radius: 9999px; border: 1px solid rgba(255, 255, 255, 0.6); cursor: pointer;
          backdrop-filter: blur(12px); transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }
        .btn-outline-home:hover { border-color: rgba(255,255,255,0.8); background: rgba(115,44,124,0.08); transform: scale(1.05); }
        .btn-outline-home:active { transform: scale(0.96); }

        /* Glass card */
        .glass-card-home {
          background: rgba(243, 238, 249, 0.95);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(115, 44, 124, 0.13);
        }
      `}</style>

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center py-20 overflow-hidden"
        style={{ zIndex: 1 }}
        aria-label="Hero — We Grow Brands, We Automate the Future"
      >
        {/* Two-column grid */}
        <div className="max-w-7xl mx-auto px-5 md:px-10 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div className={`hero-badge ${entered ? "entered" : ""} inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-home mb-10`} style={{ border: "1px solid rgba(115,44,124,0.2)" }}>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#D6008D", boxShadow: "0 0 8px #D6008D", animation: "pulse-dot 2s ease-in-out infinite" }}
                  aria-hidden="true"
                />
                <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: "#D6008D" }}>
                  Digital Growth &amp; AI Automation Agency
                </span>
              </div>

              {/* Headlines */}
              <div className="overflow-visible mb-8">
                <h1 className={`hero-h1-1 ${entered ? "entered" : ""} font-headline font-black tracking-tighter leading-[0.86] mb-2`} style={{ fontSize: "clamp(3rem,7vw,7rem)", color: "#ffffff" }}>
                  We Grow Brands.
                </h1>
                <h2 className={`hero-h1-2 ${entered ? "entered" : ""} font-headline font-black tracking-tighter leading-[0.86]`} style={{ fontSize: "clamp(3rem,7vw,7rem)", color: "#D6008D" }}>
                  We Automate the Future.
                </h2>
              </div>

              {/* Body copy */}
              <div className={`hero-body ${entered ? "entered" : ""} max-w-2xl mb-10`}>
                <p className="text-lg md:text-xl leading-relaxed mb-5" style={{ color: "#ffffff" }}>
                  Webxautomation is a{" "}
                  <span style={{ color: "#D6008D", fontWeight: 700 }}>full service digital agency</span>{" "}
                  that helps businesses grow smarter not just faster. We combine proven marketing expertise with cutting-edge AI automation to build sustainable growth systems that work for your brand around the clock.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "#ffffff" }}>
                  From the first impression to the final conversion, every touchpoint we create is thoughtfully designed, strategically powered, and continuously optimised so your business keeps moving forward, even when you&apos;re not at your desk.
                </p>
              </div>

              {/* CTAs */}
              <div className={`hero-ctas ${entered ? "entered" : ""} flex flex-wrap gap-4`}>
                <Link href="/contact">
                  <button className="btn-primary-home px-8 py-4 text-base" aria-label="Get started with Webxautomation">
                    Get Started
                    <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }} aria-hidden="true">arrow_forward</span>
                  </button>
                </Link>
                <Link href="/services">
                  <button className="btn-outline-home px-8 py-4 text-base" aria-label="Explore our services">
                    Explore Our Services
                  </button>
                </Link>
              </div>
            </div>

            {/* ── RIGHT COLUMN — Photogenic UI Showcase ── */}
            <div className="lg:col-span-5 relative">
              <div
                className={`hero-img ${entered ? "entered" : ""} relative w-full rounded-[2.5rem] overflow-hidden p-3 transition-all duration-700 hover:scale-[1.02]`}
                style={{
                  background: "linear-gradient(135deg, rgba(214,0,141,0.25) 0%, rgba(115,44,124,0.1) 100%)",
                  border: "1px solid rgba(214,0,141,0.4)",
                  boxShadow: "0 25px 80px rgba(214,0,141,0.2), 0 0 40px rgba(115,44,124,0.3)",
                }}
              >
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] w-full bg-[#0d041a]">
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                    alt="Webxautomation AI Marketing Dashboard & Analytics UI"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                    priority
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0314] via-transparent to-transparent opacity-60" />
                  
                  {/* Glowing Overlay Badges */}
                  <div className="absolute top-4 left-4 glass-card-home px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-2xl backdrop-blur-md border border-[#D6008D]/40 animate-pulse">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] shadow-[0_0_10px_#00FF88]" />
                    <span className="text-xs font-headline font-bold text-white tracking-wide">+314% Avg. Client ROAS</span>
                  </div>

                  <div className="absolute bottom-4 right-4 glass-card-home px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-md border border-[#D6008D]/50 bg-black/60">
                    <span className="material-symbols-outlined text-[#D6008D] text-lg">smart_toy</span>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#D6008D] font-bold">Automated Flow</div>
                      <div className="text-xs font-bold text-white">24/7 AI Lead Pipeline Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`hero-scroll-indicator ${entered ? "entered" : ""} absolute bottom-8 left-1/2 flex flex-col items-center gap-2`}
          style={{ color: "#ffffff" }}
          aria-hidden="true"
        >
          <span className="text-xs font-headline uppercase tracking-widest">Scroll</span>
          <span className="material-symbols-outlined">expand_more</span>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════ */}
      <div
        className="relative z-10 py-5 overflow-hidden"
        style={{ background: "rgba(115,44,124,0.04)", borderTop: "1px solid rgba(115,44,124,0.12)", borderBottom: "1px solid rgba(115,44,124,0.12)" }}
        aria-hidden="true"
      >
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-headline font-bold uppercase tracking-widest" style={{ color: "#ffffff" }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#732c7c" }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

      {/* ══════════════════════════════════════
          PHOTOGENIC PORTFOLIO / CASE STUDIES
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-5 md:px-10 overflow-hidden" aria-labelledby="portfolio-heading">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-home mb-8" style={{ border: "1px solid rgba(115,44,124,0.2)" }}>
              <span className="material-symbols-outlined text-sm" style={{ color: "#D6008D", fontVariationSettings: "'FILL' 1" }} aria-hidden="true">photo_camera</span>
              <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: "#D6008D" }}>Photogenic Proof</span>
            </div>
          </FadeIn>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <FadeIn delay={0.08}>
                <h2 id="portfolio-heading" className="font-headline font-black tracking-tight leading-[0.9]" style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", color: "#ffffff" }}>
                  Real Work.<br />
                  <span style={{ color: "#D6008D" }}>Photogenic Results.</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.12}>
              <p className="text-base text-white/80 max-w-xl leading-relaxed">
                Explore high-impact visual transformations and automation systems we&apos;ve engineered for industry leaders worldwide.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Aura Luxury Apparel",
                category: "E-Commerce & AI Personalisation",
                metrics: "+314% Revenue Growth",
                desc: "Complete visual redesign paired with automated email drip funnels and AI sizing recommendations.",
                img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Nexus FinTech Pipeline",
                category: "AI Workflow Automation",
                metrics: "10x Faster Lead Response",
                desc: "Autonomous lead scoring and instant multi-channel WhatsApp & HubSpot synchronization.",
                img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Vanguard SaaS Platform",
                category: "SEO & Brand Evolution",
                metrics: "12.4x Organic Traffic",
                desc: "High-converting dark mode web experience powered by generative programmatic SEO architectures.",
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
              },
            ].map((cs, idx) => (
              <FadeIn key={cs.title} delay={0.1 + idx * 0.1}>
                <div className="group relative rounded-[2rem] overflow-hidden bg-[#110622] border border-[#D6008D]/25 hover:border-[#D6008D] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full shadow-2xl">
                  {/* Visual Image Banner */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1a0c30]">
                    <Image
                      src={cs.img}
                      alt={cs.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#110622] via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-[#D6008D] text-white text-xs font-headline font-black px-3 py-1.5 rounded-full shadow-lg">
                      {cs.metrics}
                    </div>
                  </div>
                  {/* Card Content */}
                  <div className="p-7 flex flex-col flex-grow">
                    <span className="text-xs font-headline uppercase tracking-widest text-[#D6008D] font-bold mb-2">
                      {cs.category}
                    </span>
                    <h3 className="font-headline font-black text-2xl text-white mb-3 group-hover:text-[#D6008D] transition-colors">
                      {cs.title}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed mb-6 flex-grow">
                      {cs.desc}
                    </p>
                    <Link href="/services" className="inline-flex items-center gap-2 text-xs font-headline font-bold text-white uppercase tracking-wider group-hover:text-[#D6008D] transition-colors">
                      Explore Case Study <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

      {/* ══════════════════════════════════════
          WHO WE ARE
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-5 md:px-10" aria-labelledby="who-we-are-heading">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-home mb-8" style={{ border: "1px solid rgba(115,44,124,0.2)" }}>
              <span className="material-symbols-outlined text-sm" style={{ color: "#D6008D", fontVariationSettings: "'FILL' 1" }} aria-hidden="true">groups</span>
              <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: "#D6008D" }}>Who We Are</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <FadeIn delay={0.08}>
                <h2 id="who-we-are-heading" className="font-headline font-black tracking-tight leading-[0.9] mb-8" style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", color: "#ffffff" }}>
                  An Agency Built Around<br />
                  <span style={{ color: "#D6008D" }}>Your Growth.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="text-base leading-relaxed mb-5" style={{ color: "#ffffff" }}>
                  Webxautomation was built around a straightforward belief:{" "}
                  <span style={{ color: "#D6008D", fontWeight: 600 }}>businesses deserve a marketing partner that genuinely cares about their growth</span>{" "}
                  not just their monthly retainer. So we built an agency where every strategy, every campaign, and every creative decision is made with your long-term success in mind.
                </p>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="text-base leading-relaxed mb-5" style={{ color: "#ffffff" }}>
                  Our team brings together experienced strategists, talented creatives, and performance focused marketers who&apos;ve worked across industries, budgets, and growth stages. We&apos;ve helped businesses launch from zero, scale past their ceilings, and reimagine what their brand can be.
                </p>
              </FadeIn>
              <FadeIn delay={0.22}>
                <p className="text-base leading-relaxed mb-5" style={{ color: "#ffffff" }}>
                  What truly sets us apart is how we blend{" "}
                  <span style={{ color: "#D6008D", fontWeight: 600 }}>human insight with intelligent automation</span>. We&apos;ve built AI powered systems into the core of how we work — accelerating research, sharpening targeting, and optimising campaigns in real time.
                </p>
              </FadeIn>
              <FadeIn delay={0.26}>
                <p className="text-base leading-relaxed" style={{ color: "#ffffff" }}>
                  At Webxautomation, we don&apos;t just run your marketing. We build a{" "}
                  <span style={{ color: "#D6008D", fontWeight: 600 }}>growth infrastructure</span>{" "}
                  that compounds over time.
                </p>
              </FadeIn>
            </div>

            <div className="space-y-4">
              {WHO_WE_ARE_POINTS.map((p, i) => (
                <FadeIn key={p.title} delay={0.1 + i * 0.1}>
                  <article className="about-card about-card-hover-x p-7 flex gap-5 items-start" aria-label={p.title}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(115,44,124,0)", border: "1px solid #D6008D" }} aria-hidden="true">
                      <span className="material-symbols-outlined" style={{ color: "#D6008D", fontSize: "1.3rem" }}>{p.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-headline font-black text-base mb-2" style={{ color: "#ffffff" }}>{p.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#ffffff" }}>{p.desc}</p>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

      {/* ══════════════════════════════════════
          AI & AUTOMATION
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-5 md:px-10 overflow-hidden" aria-labelledby="ai-section-heading">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(209,116,109,0.08) 0%, transparent 65%)" }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-home mb-8" style={{ border: "1px solid rgba(115,44,124,0.2)" }}>
              <span className="material-symbols-outlined text-sm" style={{ color: "#D6008D", fontVariationSettings: "'FILL' 1" }} aria-hidden="true">robot_2</span>
              <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: "#D6008D" }}>AI &amp; Automation</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <FadeIn delay={0.08}>
                <h2 id="ai-section-heading" className="font-headline font-black tracking-tight leading-[0.9] mb-6" style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", color: "#ffffff" }}>
                  Smarter Marketing,<br />
                  <span style={{ color: "#D6008D" }}>Powered by AI.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="text-base leading-relaxed mb-6" style={{ color: "#ffffff" }}>
                  We don&apos;t use AI as a gimmick. We&apos;ve embedded intelligent automation into the heart of our agency so every campaign runs leaner, every decision is better informed, and every result is achieved faster.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="rounded-2xl p-6 mb-6" style={{ background: "rgba(115,44,124,0.06)", border: "1px solid rgba(115,44,124,0.18)" }}>
                  <p className="font-headline font-black text-base mb-3" style={{ color: "#D6008D" }}>Your Growth System, Running 24/7</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#ffffff" }}>
                    While your team sleeps, our AI powered systems keep working —{" "}
                    <span style={{ color: "#D6008D" }}>optimising your ads</span>,{" "}
                    <span style={{ color: "#D6008D" }}>scheduling your content</span>,{" "}
                    <span style={{ color: "#D6008D" }}>analysing your audience</span>, and surfacing the insights that matter most.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.24}>
                <p className="text-base leading-relaxed" style={{ color: "#ffffff" }}>
                  We&apos;ve built automation pipelines that eliminate the repetitive, time consuming tasks that slow most marketing teams down — freeing up our strategists to focus entirely on creative and strategic work that moves the needle.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AI_BULLETS.map((b, i) => (
                <FadeIn key={b.title} delay={0.08 + i * 0.09}>
                  <article className="ai-bullet-card p-6 h-full" aria-label={b.title}>
                    <div className="ai-icon-wrap w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(115,44,124,0)", border: "1px solid #D6008D" }} aria-hidden="true">
                      <span className="material-symbols-outlined" style={{ color: "#D6008D", fontSize: "1.2rem" }}>{b.icon}</span>
                    </div>
                    <h3 className="font-headline font-black text-sm mb-2" style={{ color: "#ffffff" }}>{b.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#ffffff" }}>{b.desc}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

      {/* ══════════════════════════════════════
          PROCESS
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-5 md:px-10 overflow-hidden" aria-labelledby="process-heading">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 0% 60%, rgba(115,44,124,0.07) 0%, transparent 55%)" }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-10 mb-12">
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-home mb-8" style={{ border: "1px solid rgba(115,44,124,0.2)" }}>
                  <span className="material-symbols-outlined text-sm" style={{ color: "#D6008D", fontVariationSettings: "'FILL' 1" }} aria-hidden="true">route</span>
                  <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: "#D6008D" }}>Growth System / Process</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2 id="process-heading" className="font-headline font-black tracking-tight leading-[0.9] mb-4" style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", color: "#ffffff" }}>
                  How We Build<br />
                  <span style={{ color: "#D6008D" }}>Lasting Growth.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="text-base leading-relaxed max-w-2xl mb-4" style={{ color: "#ffffff" }}>
                  We follow a structured, proven process designed to remove guesswork and create clarity at every stage. Here&apos;s how we turn your goals into a growth system that delivers.
                </p>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="text-xs font-headline font-bold uppercase tracking-widest mb-4" style={{ color: "#D6008D" }}>
                  The Webxautomation Growth Framework — A four phase approach to building sustainable, compounding growth.
                </p>
              </FadeIn>
            </div>
            {/* Photogenic Process Visual Showcase */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-[2.5rem] overflow-hidden border border-[#D6008D]/40 shadow-[0_0_50px_rgba(214,0,141,0.2)] p-2 bg-gradient-to-br from-[#D6008D]/20 to-transparent group">
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#0a0314]">
                  <Image
                    src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop"
                    alt="AI Growth System Neural Framework Visual"
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0314] via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/80 backdrop-blur-md border border-[#D6008D]/30">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#D6008D] text-3xl animate-spin" style={{ animationDuration: '10s' }}>auto_awesome</span>
                      <div>
                        <div className="text-xs font-bold text-white font-headline uppercase tracking-wider">Automated Synchronization</div>
                        <div className="text-sm font-medium text-white/80">Continuous multi-channel optimization</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((p, i) => (
              <FadeIn key={p.num} delay={i * 0.1}>
                <article className="process-step p-7 h-full flex flex-col" aria-label={`Step ${p.num}: ${p.title}`}>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="font-headline font-black text-4xl" style={{ color: "#D6008D" }}>{p.num}</span>
                    <span className="material-symbols-outlined text-base" style={{ color: "#D6008D" }} aria-hidden="true">arrow_forward</span>
                  </div>
                  <h3 className="font-headline font-black text-base mb-3" style={{ color: "#ffffff" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#eeeaf3ec" }}>{p.desc}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-5 md:px-10" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-home mb-8" style={{ border: "1px solid rgba(115,44,124,0.2)" }}>
              <span className="material-symbols-outlined text-sm" style={{ color: "#D6008D", fontVariationSettings: "'FILL' 1" }} aria-hidden="true">bolt</span>
              <span className="text-xs font-headline font-bold uppercase tracking-widest" style={{ color: "#D6008D" }}>Services</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 id="services-heading" className="font-headline font-black tracking-tight leading-[0.9] mb-5" style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", color: "#ffffff" }}>
              Six Services.<br />
              <span style={{ color: "#D6008D" }}>One Growth System.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="text-base leading-relaxed max-w-3xl mb-14" style={{ color: "#ffffff" }}>
              Every service we provide is part of a connected whole. When your content fuels your SEO, your ads amplify your brand, and your website converts what your social media attracts — that&apos;s when real, lasting growth takes hold.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.07}>
                <article className="service-card p-8 h-full flex flex-col" aria-label={s.title}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-headline font-black text-3xl" style={{ color: "#D6008D" }}>{s.num}</span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(115,44,124,0.09)", border: "1px solid #D6008D" }} aria-hidden="true">
                      <span className="material-symbols-outlined" style={{ color: "#D6008D", fontSize: "1.2rem" }}>{s.icon}</span>
                    </div>
                  </div>
                  <h3 className="font-headline font-black text-lg mb-3" style={{ color: "#ffffff" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#ffffff" }}>{s.desc}</p>
                  <div className="mt-6 flex items-center gap-1.5">
                    <span className="material-symbols-outlined" style={{ color: "#D6008D", fontSize: "0.9rem" }} aria-hidden="true">bolt</span>
                    <span className="text-xs font-headline font-bold" style={{ color: "#D6008D" }}>{s.tag}</span>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

      {/* ══════════════════════════════════════
          BRAND MANIFESTO
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-5 md:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden" style={{ background: "rgba(243,238,249,0)", border: "1px solid #D6008D", backdropFilter: "blur(24px)" }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(115,44,124,0.12),transparent 55%)" }} aria-hidden="true" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%,rgba(209,116,109,0.08),transparent 55%)" }} aria-hidden="true" />
              <div className="relative z-10">
                <p className="text-xs font-headline font-bold uppercase tracking-widest mb-6" style={{ color: "#D6008D" }}>The Webxautomation Belief</p>
                <h2 className="font-headline font-black tracking-tight leading-tight mb-8" style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", color: "#ffffff" }}>
                  Growth isn&apos;t a campaign.<br />
                  <span style={{ color: "#D6008D" }}>It&apos;s a system — and we&apos;re here to build yours.</span>
                </h2>
                <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "#ffffff" }}>
                  The most successful brands aren&apos;t the ones that ran the cleverest ad or went viral once. They&apos;re the ones that built a connected, intelligent marketing infrastructure that kept delivering month after month, year after year. That&apos;s what Webxautomation exists to create for you.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="relative z-10 px-5 md:px-10"><div className="max-w-7xl mx-auto"><Divider /></div></div>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-5 md:px-10" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden" style={{ background: "rgba(243,238,249,0)", border: "2px solid #D6008D", backdropFilter: "blur(24px)" }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% -5%,rgba(115,44,124,0.18),transparent 55%)" }} aria-hidden="true" />
              <div
                className="cta-icon w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-7 relative z-10"
                style={{ background: "rgba(115,44,124,0.1)", border: "1px solid #D6008D" }}
                aria-hidden="true"
              >
                <span className="material-symbols-outlined text-2xl" style={{ color: "#D6008D", fontVariationSettings: "'FILL' 1" }}>flash_on</span>
              </div>
              <div className="relative z-10">
                <h2 id="cta-heading" className="font-headline font-black tracking-tight leading-tight mb-6" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: "#ffffff" }}>
                  Let&apos;s Build Your<br />
                  <span style={{ color: "#D6008D" }}>Growth System.</span>
                </h2>
                <p className="text-base leading-relaxed max-w-xl mx-auto mb-10" style={{ color: "#ffffff" }}>
                  Whether you&apos;re launching something new or scaling something proven, Webxautomation has the strategy, the tools, and the team to take you there. Let&apos;s start the conversation.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/contact">
                    <button className="btn-primary-home px-10 py-4 text-base" aria-label="Get started with Webxautomation — contact us">
                      Get Started
                    </button>
                  </Link>
                  <Link href="/services">
                    <button className="btn-outline-home px-10 py-4 text-base" aria-label="Explore Webxautomation services">
                      Explore Our Services
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-center text-xs font-headline font-bold mt-8" style={{ color: "#ffffff" }}>
              WEBXAUTOMATION · Digital Growth &amp; AI Automation Agency · webxautomation.in
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
