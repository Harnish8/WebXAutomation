import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata = {
  title: 'AI Automation',
  description: 'Intelligent automation systems that remove bottlenecks, eliminate manual tasks, and keep your marketing running smarter 24 hours a day.',
}

const data = {
  aiTag: '⚡ Powered by Industry Leading AI Platforms',
  category: 'AI Automation',
  titleLine1: 'Automate the Repetitive.',
  titleLine2: 'Amplify What Matters.',
  desc: [
    "The biggest challenge facing most growing businesses isn't a lack of ideas it's a lack of <span class='text-highlight'>capacity</span>. There's always more to create, optimise, track, and respond to than any team can comfortably manage.",
    "AI automation is how we solve that. At Webxautomation, we design and deploy <span class='text-highlight'>intelligent automation systems</span> that remove the bottlenecks holding your marketing back handling the timeconsuming, repetitive tasks that drain your team's energy, so your people can focus on the high value work that actually moves the needle.",
    "Our AI automation service is deeply consultative. We start by understanding your current marketing operations where the friction is, where time is being lost, and where automation can create the most immediate impact. We then design, build, and deploy custom systems that fit your business, your tools, and your team.",
    "This isn't about replacing the human side of your marketing. It's about <span class='text-highlight'>giving your team the breathing room to do their best work</span> while intelligent systems handle everything that runs behind the scenes."
  ],
  features: [
    { icon: 'ads_click', title: 'Intelligent Ad Optimisation', desc: 'Real time bidding adjustments, audience refinement, and budget reallocation running continuously without manual intervention.' },
    { icon: 'auto_awesome', title: 'AI Content Pipelines', desc: 'From ideation and drafting through to scheduling and distribution automated workflows that keep content consistent and on brand.' },
    { icon: 'trending_up', title: 'Predictive Analytics', desc: 'AI powered forecasting that identifies trends early, models campaign performance, and helps make smarter decisions before you spend a dollar.' },
    { icon: 'mark_email_read', title: 'Automated Lead Nurturing', desc: 'Intelligent email and CRM workflows that engage your leads at the right moment with the right message personalisation at scale.' },
    { icon: 'dashboard', title: 'Smart Reporting Dashboards', desc: 'Real time dashboards pulling data from every channel automatically no manual reporting, no delays, just clear and actionable insight.' },
    { icon: 'account_tree', title: 'Workflow & Process Automation', desc: 'We map and automate the repetitive internal processes that slow your marketing operations down from approvals to publishing to follow ups.' },
  ],
  process: [
    { title: 'Operations Audit', desc: 'We map your current workflows, identify where time and resources are being lost, and define the highest impact automation opportunities.' },
    { title: 'Design & Build', desc: 'We design your custom automation architecture, integrate with your existing tools, and build the systems end to end.' },
    { title: 'Deploy, Train & Optimise', desc: 'We deploy, train your team, and monitor performance closely refining the systems continuously to maximise efficiency and results.' },
  ],
  results: [
    { val: '60%', label: 'Avg. Reduction in Manual Marketing Tasks' },
    { val: '3×', label: 'Faster Campaign Execution & Deployment' },
    { val: '24/7', label: 'Your Growth System Running Continuously' },
  ],
  stack: ['Make.com', 'Zapier', 'HubSpot', 'OpenAI API', 'Claude API', 'Airtable', 'Slack', 'Google Workspace', 'ActiveCampaign', 'Notion', 'Webflow', 'Meta API'],
  faqs: [
    { q: 'Do we need to already use specific tools?', a: 'Not necessarily we assess what you currently use and recommend the best tools for your needs. We can work with most major marketing platforms and build custom integrations where needed.' },
    { q: 'How long does it take to build automations?', a: 'Simple single workflow automations can be live within a week. Complex multi system automation architectures typically take 3–6 weeks to design, build, test, and deploy properly.' },
    { q: 'Will our team need technical knowledge?', a: 'No we design automations to be as hands off as possible for your team. Where interaction is needed, we provide full training and documentation so anyone can manage it.' },
    { q: 'What happens if an automation breaks?', a: 'All systems we build include monitoring and error alerts. We provide ongoing support as standard and are notified of any failures before you are issues are resolved proactively.' },
  ],
}

export default function Page() { return <ServicePageTemplate service={data} /> }
