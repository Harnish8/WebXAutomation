import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata = {
  title: 'Paid Advertising PPC, Meta & Google',
  description: 'Data driven paid ad campaigns across Google and Meta precisely targeted, rigorously tested, and continuously optimised for maximum return.',
}

const data = {
  aiTag: '⚡ AI Bid Optimisation & Audience Modelling',
  category: 'Paid Advertising PPC, Meta & Google',
  titleLine1: 'Every Dollar Spent',
  titleLine2: 'With Purpose.',
  desc: [
    "Paid advertising, done right, is the fastest and most scalable way to grow a business. Done wrong, it's one of the quickest ways to burn through a budget with very little to show for it. The difference? <span class='text-highlight'>Strategy, structure, and relentless optimisation.</span>.",
    "At Webxautomation, we manage paid campaigns across Google Search, Display, Shopping, Meta (Facebook & Instagram), and additional platforms where your audience is most active. We treat every dollar of your ad spend as a serious responsibility building campaigns that are <span class='text-highlight'>precisely targeted, rigorously tested, and continuously refined</span> until every element is working as hard as it can.",
    "We architect full funnel paid strategies from awareness campaigns that introduce your brand to cold audiences, to retargeting sequences that bring warm prospects back at exactly the right moment. Every campaign is built around your actual revenue goals, not surface level metrics that look good on a report but don't move the business forward.",
    "Our AI powered bid management and audience modelling tools make faster, smarter optimisation decisions giving your campaigns a genuine edge in increasingly competitive ad auctions."
  ],
  features: [
    { icon: 'account_tree', title: 'Campaign Strategy', desc: 'Full funnel architecture aligned to your goals and margins awareness through to conversion.' },
    { icon: 'ads_click', title: 'Google Ads Management', desc: 'Search, Display, Shopping & Performance Max managed and optimised for maximum return.' },
    { icon: 'thumb_up', title: 'Meta Ads Management', desc: 'Facebook & Instagram with creative testing built in finding top performers fast.' },
    { icon: 'group', title: 'Audience Targeting', desc: 'AI assisted modelling to identify and reach your best customers with precision.' },
    { icon: 'image', title: 'Ad Creative & Copy', desc: 'Compelling ads designed to stop the scroll and drive action creative and copy produced in house.' },
    { icon: 'bar_chart', title: 'Weekly Optimisation & Reporting', desc: 'Transparent data with clear next steps you always know what is working and where your money is going.' },
  ],
  process: [
    { title: 'Audit & Account Setup', desc: 'We audit existing accounts, establish campaign structure, conversion tracking, and define clear performance benchmarks from the outset.' },
    { title: 'Launch & Test', desc: 'We launch with creative variables built in systematically testing audiences, messaging, and formats to find top performers fast.' },
    { title: 'Optimise & Scale', desc: 'We invest in what is performing, cut what is not, and scale systematically building a reliable and growing revenue engine for your business.' },
  ],
  results: [
    { val: '3.8×', label: 'Average Return on Ad Spend (ROAS)' },
    { val: '40%', label: 'Avg. Reduction in Cost Per Acquisition' },
    { val: '$50M+', label: 'Total Ad Spend Managed to Date' },
  ],
  stack: ['Google Ads', 'Meta Ads Manager', 'Google Analytics 4', 'Google Tag Manager', 'Performance Max', 'Meta Pixel', 'Looker Studio', 'Triple Whale'],
  faqs: [
    { q: 'What is your minimum ad spend requirement?', a: 'We typically recommend a minimum of $2,000/month in ad spend to generate statistically meaningful data for optimisation. Lower budgets can work but require longer testing windows.' },
    { q: 'Do you charge a percentage of ad spend?', a: 'Our management fee is separate from your ad spend. We charge a flat monthly management fee so we are incentivised to optimise your spend, not inflate it.' },
    { q: 'How quickly can campaigns go live?', a: 'Typically within 7–10 business days from onboarding including account audit, campaign build, creative production, and tracking setup.' },
    { q: 'Do you handle the ad creative as well?', a: 'Yes copywriting, static graphics, and simple video ads are included. For complex video production, we work alongside our Video Production team.' },
  ],
}

export default function Page() { return <ServicePageTemplate service={data} /> }
