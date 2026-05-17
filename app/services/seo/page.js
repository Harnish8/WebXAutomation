import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata = {
  title: 'SEO & Content Marketing',
  description: 'Build genuine topical authority and longterm organic visibility with AI powered SEO strategies and content that ranks and converts.',
}

const data = {
  aiTag: '⚡ AI SEO Research & Content Intelligence',
  category: 'SEO & Content Marketing',
  titleLine1: 'Visibility That',
  titleLine2: 'Compounds Over Time.',
  desc: [
    "Paid ads stop the moment your budget does. SEO doesn't. A well built organic search strategy is one of the most <span class='text-highlight'>powerful longterm growth assets</span> a business can invest in one that keeps bringing the right people to you, month after month, without a cost per click attached.",
    "At Webxautomation, we approach SEO as a complete ecosystem not a checklist of technical fixes and keyword stuffed blog posts. We build <span class='text-highlight'>genuine topical authority</span> for your brand, crafting content strategies that signal to search engines that your website is the most relevant and trustworthy source in your category. That means more of the right traffic, stronger rankings, and a steady pipeline of ready to buy prospects.",
    "Our content marketing works hand in hand with every SEO decision we make. We create <span class='text-highlight'>genuinely useful, well researched content</span> articles, guides, landing pages, and thought leadership pieces that satisfy search intent at every stage of the buyer journey, build trust, and naturally guide readers toward becoming customers.",
    "We use the latest AI powered SEO research tools to uncover untapped keyword opportunities, analyse competitor content gaps, and model the structures that earn rankings giving us a real strategic edge in every campaign we run."
  ],
  features: [
    { icon: 'search', title: 'SEO Audit & Roadmap', desc: 'Full technical and content audit with a clear, prioritised action plan for your site.' },
    { icon: 'manage_search', title: 'Keyword & Competitor Research', desc: 'AI assisted analysis to uncover high value keyword opportunities your competitors are missing.' },
    { icon: 'tune', title: 'On Page Optimisation', desc: 'Titles, metadata, heading structure, and internal linking optimised for both search and users.' },
    { icon: 'article', title: 'Content Creation', desc: 'Blogs, pillar pages, and guides written to rank, build authority, and convert readers into leads.' },
    { icon: 'speed', title: 'Technical SEO', desc: 'Site speed, crawlability, schema markup, and core web vitals the foundations that make rankings possible.' },
    { icon: 'analytics', title: 'Monthly Reporting', desc: 'Rankings, traffic growth, and content performance transparent data with clear next steps every month.' },
  ],
  process: [
    { title: 'Full SEO Audit', desc: 'We assess technical health, current rankings, content gaps, and the competitive landscape to map the clearest path forward.' },
    { title: 'Content & Keyword Blueprint', desc: 'We design a structured strategy to build topical authority and capture search intent across your entire category.' },
    { title: 'Create, Publish & Compound', desc: 'We execute consistently building content, earning authority, and tracking rankings as your organic presence compounds over time.' },
  ],
  results: [
    { val: '4×', label: 'Average Organic Traffic Increase' },
    { val: 'Top 3', label: 'Avg. Ranking for Target Keywords' },
    { val: '6–9mo', label: 'Typical Timeframe to Significant Results' },
  ],
  stack: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'Surfer SEO', 'Schema.org', 'Google Analytics 4', 'PageSpeed Insights', 'Clearscope'],
  faqs: [
    { q: 'How long does SEO take to show results?', a: 'Typically 6–9 months for meaningful ranking improvements, though technical fixes and quick wins often show results within the first 60 days. SEO is a longterm investment the returns compound.' },
    { q: 'Do you write the content or do we?', a: 'We handle all content production research, writing, optimisation, and publishing. You review and approve before anything goes live.' },
    { q: 'What makes your SEO different?', a: 'We treat SEO as a complete ecosystem strategy, technical, content, and authority building working together. We use AI research tools to find opportunities competitors miss.' },
    { q: 'Do you guarantee first page rankings?', a: "No reputable agency can guarantee specific rankings search engines don't work that way. We can guarantee a rigorous, proven process and transparent monthly reporting on everything we do." },
  ],
}

export default function Page() { return <ServicePageTemplate service={data} /> }
