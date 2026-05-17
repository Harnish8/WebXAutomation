import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata = {
  title: 'Web Design & Development',
  description: 'Custom, high converting websites that reflect your brand quality, perform flawlessly, and guide visitors naturally towards action.',
}

const data = {
  aiTag: '⚡ AI UX Personalisation & Performance Optimisation',
  category: 'Web Design & Development',
  titleLine1: 'Your Website Should',
  titleLine2: 'Work as Hard as You Do.',
  desc: [
    "Your website is almost always the first real impression your business makes and the place where interest either converts into action or quietly walks away. A beautiful site that doesn't convert is a missed opportunity. A fast, functional site that feels visually forgettable won't earn the trust your brand deserves.<span class='text-highlight'>You need both and that's exactly what we build</span>.",
    "Every website we design starts with a thorough understanding of your goals, your audience's expectations, and the journey you want visitors to take. We design <span class='text-highlight'>digital experiences that feel effortless to navigate and impossible to forget</span> purposeful aesthetics combined with conversion focused architecture that guides visitors naturally toward the next step.",
    "Our development team builds on modern, reliable technology ensuring your site is fast, secure, fully responsive across all devices, and technically optimised for search from day one. Every site is <span class='text-highlight'>custom crafted to reflect your brand</span>, not dropped into a template with your logo swapped in.",
    "Beyond launch, we offer ongoing support and continuous improvements  using AI powered analytics to understand how visitors behave and refine the experience over time."
  ],
  // desc: "Your website is almost always the first real impression your business makes and the place where interest either converts into action or quietly walks away. A beautiful site that doesn't convert is a missed opportunity. A fast, functional site that feels visually forgettable won't earn the trust your brand deserves. You need both and that's exactly what we build. Every website we design starts with a thorough understanding of your goals, your audience's expectations, and the journey you want visitors to take. We design digital experiences that feel effortless to navigate and impossible to forget.",
  features: [
    { icon: 'architecture', title: 'UX Strategy & Wireframing', desc: 'User journey mapping and conversion focused architecture planned before a single pixel is designed.' },
    { icon: 'brush', title: 'Custom Visual Design', desc: 'Pixel perfect designs aligned to your brand not dropped into a template with your logo swapped in.' },
    { icon: 'phone_iphone', title: 'Responsive Development', desc: 'Flawless across desktop, tablet, and mobile every interaction tested on real devices.' },
    { icon: 'speed', title: 'Performance Optimisation', desc: 'Fast load times, core web vitals, and technical SEO built into every site from day one.' },
    { icon: 'edit_note', title: 'CMS Integration', desc: 'Easy to manage content systems for your team update your own site without touching code.' },
    { icon: 'support_agent', title: 'Post Launch Support', desc: 'Maintenance, updates, and performance monitoring we stay with you long after launch day.' },
  ],
  process: [
    { title: 'Discovery & UX Planning', desc: 'We map user journeys, define conversion goals, and plan the full site architecture before a single pixel is designed.' },
    { title: 'Design & Prototype', desc: 'We design in full, present interactive prototypes, and refine every detail collaboratively until the experience is exactly right.' },
    { title: 'Build, Test & Launch', desc: 'We develop, QA across all devices, optimise for speed and SEO, and deliver a launch-ready site with you every step of the way.' },
  ],
  results: [
    { val: '2.4×', label: 'Avg. Conversion Rate Improvement Post Launch' },
    { val: '<2s', label: 'Average Page Load Time We Target' },
    { val: '98%', label: 'Client Satisfaction on Delivery' },
  ],
  stack: ['Next.js', 'React', 'WordPress', 'Webflow', 'Figma', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Shopify', 'Sanity CMS'],
  faqs: [
    { q: 'How long does a website project take?', a: 'A standard 5–8 page website typically takes 4–6 weeks from kickoff to launch. Larger or more complex projects are scoped individually with a clear timeline agreed upfront.' },
    { q: 'Do you build on WordPress or custom code?', a: 'Both we match the technology to your needs. WordPress for content heavy sites that need easy self management. Next.js or Webflow for performance critical or highly custom builds.' },
    { q: 'Is SEO included in the build?', a: 'Yes technical SEO foundations are built into every site: semantic HTML, metadata, schema, page speed, and sitemap. Ongoing SEO campaigns are a separate service.' },
    { q: 'Can you redesign our existing website?', a: 'Absolutely. Redesigns are one of our most common projects. We audit your existing site, preserve what is working, and rebuild everything that is not.' },
  ],
}

export default function Page() { return <ServicePageTemplate service={data} /> }
