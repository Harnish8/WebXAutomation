import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata = {
  title: 'Social Media Marketing',
  description: 'Strategic social media management that builds genuine communities, drives engagement, and turns followers into loyal customers.',
}

const data = {
  aiTag: '⚡ AI Scheduling & Audience Insights',
  category: 'Social Media Marketing',
  titleLine1: 'Turn Followers Into',
  titleLine2: 'Loyal Customers.',
  desc: [
    "Social media is no longer just a place to post content it's where <span class='text-highlight'>brands are built, trust is established, and communities are formed</span>. But with algorithms shifting constantly and attention spans shrinking, showing up isn't enough. You need a strategy that's sharp, content that's genuinely compelling, and a presence that feels consistent and human every single day.",
    "At Webxautomation, we manage social media the way it was always meant to work as a <span class='text-highlight'>longterm brand asset, not a shortterm content treadmill</span>. We begin by understanding your audience deeply: who they are, what they care about, where they spend their time, and what kind of content moves them to act. From there, we build a platform strategy tailored to your brand not copied from a template.",
    "Our creative team develops content calendars that bring your brand story to life across Instagram, LinkedIn, Facebook, TikTok, X, and beyond. Every piece of content is written, designed, and scheduled with intention. We handle everything from ideation and copywriting through to design, publishing, and community management so you get a <span class='text-highlight'>social presence that genuinely grows your business</span>, without consuming your time.",
    "Our AI tools identify peak engagement windows, analyse audience sentiment, and predict content performance so your social media gets smarter and more effective every single month."
  ],
  features: [
    { icon: 'hub', title: 'Platform Strategy', desc: 'Tailored channel selection and brand positioning we build where your audience actually lives.' },
    { icon: 'calendar_month', title: 'Content Calendar', desc: 'Purposeful content mapped to your goals, voice, and audience behaviour every month.' },
    { icon: 'palette', title: 'Copywriting & Design', desc: 'Scroll stopping captions, graphics, and creative assets produced entirely in house.' },
    { icon: 'schedule', title: 'AI Powered Scheduling', desc: 'Optimal timing driven by audience behaviour data your content lands when it matters most.' },
    { icon: 'forum', title: 'Community Management', desc: 'Responsive, on brand audience engagement that builds real relationships with your followers.' },
    { icon: 'analytics', title: 'Monthly Reporting', desc: 'Clear insights with actionable next steps you always know exactly what is working and why.' },
  ],
  process: [
    { title: 'Audience & Brand Audit', desc: 'We study your audience, competitors, and current presence to find exactly where the opportunity is for your brand.' },
    { title: 'Strategy & Content System', desc: 'We build your platform strategy, content pillars, and brand voice framework a system designed to keep quality consistently high.' },
    { title: 'Publish, Engage & Optimise', desc: 'We go live, manage your community, and use AI driven insights to continuously improve content performance and timing.' },
  ],
  results: [
    { val: '3×', label: 'Avg. Engagement Rate Increase' },
    { val: '60%', label: 'Growth in Organic Reach Within 90 Days' },
    { val: '85%', label: 'Clients Grow Community Month on Month' },
  ],
  stack: ['Instagram', 'LinkedIn', 'TikTok', 'Facebook', 'X (Twitter)', 'YouTube', 'Buffer', 'Sprout Social', 'Canva', 'CapCut'],
  faqs: [
    { q: 'Which platforms do you manage?', a: 'We manage all major platforms Instagram, LinkedIn, Facebook, TikTok, X, and YouTube. We recommend the right mix based on your audience and goals.' },
    { q: 'Do you create the content or do we?', a: 'We handle everything strategy, copywriting, graphic design, and scheduling. You simply review and approve before anything goes live.' },
    { q: 'How long before we see results?', a: 'Most clients see meaningful engagement improvements within 60–90 days. Follower and reach growth compounds significantly from month 3 onwards.' },
    { q: 'Can you manage paid social as well?', a: 'Yes our Paid Advertising service covers Meta ads in detail. Many clients run social management and paid ads together for maximum impact.' },
  ],
}

export default function Page() { return <ServicePageTemplate service={data} /> }
