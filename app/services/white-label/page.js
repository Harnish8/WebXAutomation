import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata = {
  title: 'White Label Services',
  description: 'Deliver more for your clients under your own brand fully confidential, NDA protected digital marketing delivered by Webxautomation behind the scenes.',
}

const data = {
  aiTag: '◈ Fully Confidential & NDA Protected',
  category: 'White Label Services',
  titleLine1: 'Deliver More for Your Clients.',
  titleLine2: 'Under Your Brand.',
  desc: [
    "Running an agency or consultancy means constantly balancing client demand with team capacity. When new briefs arrive that stretch beyond your core offering or when your team is fully committed elsewhere <span class='text-highlight'>Webxautomation becomes the expert capability working behind the scenes.</span>.",
    "We partner with agencies, consultants, and freelancers across Australia to deliver high quality digital marketing services completely under your brand. Your clients see your name. You maintain the relationship. We deliver the work on brief, on time, and to a standard you'd be proud to present yourself.",
    "Every white label engagement begins with a confidentiality agreement and a clear brief. We operate entirely behind the scenes we never contact your clients directly, never use their work in our own portfolio without your permission, and never do anything to compromise the relationship you've built.",
    "Our white label partnerships are flexible by design. Some agencies bring us in for overflow capacity on specific projects. Others use us as their ongoing fulfilment partner for services outside their team's core expertise. We fit around your workflow, your timelines, and your standards so your clients always experience a seamless, professional service that reflects well on you.",
    "<span class='text-highlight'>Interested in a white label partnership?</span> We'd love to talk through how we can support your agency confidentially and completely on your terms."
  ],
  // desc: "Running an agency or consultancy means constantly balancing client demand with team capacity. When new briefs arrive that stretch beyond your core offering or when your team is fully committed elsewhere Webxautomation becomes the expert capability working behind the scenes. We partner with agencies, consultants, and freelancers across Australia to deliver high-quality digital marketing services completely under your brand. Your clients see your name. You maintain the relationship. We deliver the work on brief, on time, and to a standard you would be proud to present yourself.",
  features: [
    { icon: 'lock', title: 'Full Confidentiality & NDA', desc: 'All work completed under strict confidentiality from day one your clients never know we are involved.' },
    { icon: 'verified', title: 'Your Branding Throughout', desc: 'Reports, dashboards, and all deliverables carry your agency\'s brand not ours.' },
    { icon: 'support_agent', title: 'Dedicated Account Support', desc: 'A single point of contact who knows your clients, your standards, and your workflow inside out.' },
    { icon: 'tune', title: 'Flexible Engagement', desc: 'Project based or ongoing retainer scaled to your pipeline and capacity as it grows.' },
    { icon: 'payments', title: 'Agency Friendly Pricing', desc: 'Structured to give you healthy margins when reselling to your clients pricing built for partnership.' },
    { icon: 'block', title: 'Zero Client Contact', desc: 'We never reach out to your clients directly, under any circumstances your relationship is always protected.' },
  ],
  process: [
    { title: 'Partnership Inquiry', desc: 'We start with a confidential conversation about your agency, your clients, and the support that would be most valuable for your team.' },
    { title: 'Agreement & Onboarding', desc: 'We formalise the partnership with an NDA and onboarding process aligning on communication, workflow, timelines, and quality standards.' },
    { title: 'Deliver & Scale Together', desc: 'We deliver work that reflects the quality your clients expect and as the partnership grows, we scale our support to match your pipeline.' },
  ],
  results: [
    { val: '50+', label: 'Active Agency & Consultant Partners' },
    { val: '100%', label: 'Confidentiality Maintained Always' },
    { val: '96%', label: 'White Label Partner Retention Rate' },
  ],
  stack: ['Figma', 'Next.js', 'WordPress', 'HubSpot', 'Google Ads', 'Meta Ads', 'Ahrefs', 'Looker Studio', 'Slack', 'Notion', 'Loom', 'Google Workspace'],
  faqs: [
    { q: 'How do you ensure our clients never find out?', a: 'We operate entirely behind the scenes no Webxautomation branding on any deliverable, no direct client contact, and an NDA signed before any work begins. We have maintained 100% confidentiality across all partnerships.' },
    { q: 'What services can be white labelled?', a: 'All of our services are available as white label social media, SEO, paid ads, web design, branding, video production, and AI automation. Some agencies use us for one service; others for their entire fulfilment.' },
    { q: 'Can we use you for single projects or only ongoing?', a: 'Both some partners bring us in for overflow on specific projects, others use us as their permanent fulfilment partner. We are flexible by design and scale to your pipeline.' },
    { q: 'How do reporting and dashboards work?', a: 'All reports are produced in your branding. For ongoing services, we set up white labelled dashboards in tools like Looker Studio or AgencyAnalytics your clients see your logo, not ours.' },
  ],
}

export default function Page() { return <ServicePageTemplate service={data} /> }
