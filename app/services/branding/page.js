import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata = {
  title: 'Branding & Creative Design',
  description: 'Build a distinctive, memorable brand identity from strategy and positioning through to visual design, guidelines, and creative templates.',
}

const data = {
  aiTag: '⚡ AI Assisted Creative Concepting',
  category: 'Branding & Creative Design',
  titleLine1: 'Build a Brand That',
  titleLine2: 'People Remember.',
  desc: [
    "A strong brand isn't just a beautiful logo. It's the complete, cohesive impression your business makes on every person who encounters it and <span class='text-highlight'>one of the most valuable commercial assets you can build.</span> Strong brands command higher prices, earn deeper loyalty, and grow through word of mouth in ways that no ad spend alone can replicate.",
    "At Webxautomation, our branding work goes well beneath the surface. We start where great brands always start with strategy. Who are you, really? What do you stand for? Who are you trying to reach, and why should they choose you? The answers shape everything that follows: your visual identity, messaging framework, tone of voice, and the way your brand shows up across every touchpoint.",
    "Our creative team translates strategy into <span class='text-highlight'>a visual language that's distinctive, consistent, and genuinely memorable.</span> From logo design and colour systems to typography, iconography, brand guidelines, and creative templates we build identities designed to last and built to scale.",
    "Whether you're starting from scratch, rebranding a business that's outgrown its identity, or refreshing your look Webxautomation will create something you're genuinely proud to put your name on."
  ],
  // desc: "A strong brand isn't just a beautiful logo. It's the complete, cohesive impression your business makes on every person who encounters it and one of the most valuable commercial assets you can build. Strong brands command higher prices, earn deeper loyalty, and grow through word-of-mouth in ways that no ad spend alone can replicate. At Webxautomation, our branding work goes well beneath the surface. We start where great brands always start with strategy. Who are you, really? What do you stand for? Who are you trying to reach, and why should they choose you?",
  features: [
    { icon: 'psychology', title: 'Brand Strategy', desc: 'Positioning, values, audience definition, and competitive landscape analysis the thinking that makes everything else work.' },
    { icon: 'star', title: 'Logo Design', desc: 'Primary logo, variations, and icon suite crafted for every use case from digital to print.' },
    { icon: 'palette', title: 'Visual Identity System', desc: 'Colour palette, typography, and full design language a system that scales consistently across every touchpoint.' },
    { icon: 'record_voice_over', title: 'Messaging & Tone of Voice', desc: 'Brand story, tagline, and communication style guide how your brand speaks and what it stands for.' },
    { icon: 'menu_book', title: 'Brand Guidelines', desc: 'A comprehensive, ready to use guide for your team so your brand stays consistent whoever is using it.' },
    { icon: 'layers', title: 'Creative Templates', desc: 'Social, presentation, and marketing assets ready to go designed to your brand so content creation is effortless.' },
  ],
  process: [
    { title: 'Brand Discovery', desc: 'We run workshops and strategic frameworks to deeply understand who you are, who you serve, and the brand position worth owning in your market.' },
    { title: 'Strategy & Creative Direction', desc: 'We define your positioning and present distinct creative directions developed collaboratively until the concept is unmistakably right.' },
    { title: 'Design, Refine & Deliver', desc: 'We build the full identity system, refine with your feedback, and hand over a complete brand toolkit ready to deploy across every channel.' },
  ],
  results: [
    { val: '2×', label: 'Avg. Price Premium After Rebrand' },
    { val: '78%', label: 'Clients Report Stronger Customer Confidence' },
    { val: '100+', label: 'Brand Identities Created & Launched' },
  ],
  stack: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Canva for Teams', 'Notion Brand Hub', 'Loom'],
  faqs: [
    { q: 'How long does a full branding project take?', a: 'A complete brand identity typically takes 4–8 weeks, depending on scope and revision rounds. We set a clear timeline at the outset and keep you informed throughout.' },
    { q: 'What if we only need a logo?', a: 'We can work on standalone logo projects, though we always recommend at minimum a logo + colour palette + typography system for it to be truly usable across all channels.' },
    { q: 'Do you handle rebrands as well as new brands?', a: 'Absolutely rebranding is one of our specialities. We work with businesses that have outgrown their identity and need something that reflects where they are today.' },
    { q: 'What files do we receive at the end?', a: 'You receive all source files (AI, EPS, PDF, PNG, SVG), a full brand guidelines document, and all templates in editable formats. Everything you need to run your brand independently.' },
  ],
}

export default function Page() { return <ServicePageTemplate service={data} /> }
