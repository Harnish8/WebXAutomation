import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata = {
  title: 'Video Production & Editing',
  description: 'Professional video production from concept to final edit brand films, short form content, and everything in between, enhanced by AI post production.',
}

const data = {
  aiTag: '⚡ AI Video Enhancement & Post Production',
  category: 'Video Production & Editing',
  titleLine1: 'Video That Captures',
  titleLine2: 'Attention and Keeps It.',
  desc: [
    "Video is the most powerful content format available to brands today and the gap between brands using it well and brands simply using it grows wider every year. Great video communicates your value in seconds, builds emotional connection, and creates lasting impressions that static content rarely achieves.<span class='text-highlight'>It's the format your audience prefers, and the one the algorithms reward.</span>",
    "At Webxautomation, video production is handled entirely in house from the first concept conversation to the final colour grade. Our production team brings together <span class='text-highlight'>creative directors, experienced cinematographers, editors, and motion designers</span> who understand not just how to make video look beautiful, but how to make it perform for your goals and platforms.",
    "Whether you need a cinematic brand film, scroll stopping short form content for Instagram and TikTok, clear product videos, or a library of social ready clips we create video that <span class='text-highlight'>feels right for your brand and works hard for your marketing.</span>",
    "Our post production pipeline is enhanced by AI tools that accelerate editing, colour grading, and audio allowing us to deliver broadcast quality results at the pace modern marketing demands."
  ],
  // desc: "Video is the most powerful content format available to brands today and the gap between brands using it well and brands simply using it grows wider every year. Great video communicates your value in seconds, builds emotional connection, and creates lasting impressions that static content rarely achieves. It's the format your audience prefers, and the one the algorithms reward. At Webxautomation, video production is handled entirely in-house from the first concept conversation to the final colour grade. Our production team brings together creative directors, experienced cinematographers, editors, and motion designers who understand not just how to make video look beautiful, but how to make it perform.",
  features: [
    { icon: 'movie_creation', title: 'Creative Concept & Scripting', desc: 'Story development, scripts, and shot lists the creative foundation that makes every video perform.' },
    { icon: 'videocam', title: 'Full Production', desc: 'Professional filming with lighting, sound, and direction handled entirely by our in house team.' },
    { icon: 'cut', title: 'Editing & Post Production', desc: 'Editing, colour grading, and sound design crafted to feel right for your brand and your platform.' },
    { icon: 'animation', title: 'Motion Graphics & Animation', desc: 'On brand title cards, lower thirds, and animated elements that elevate production quality.' },
    { icon: 'crop', title: 'Platform Reformatting', desc: 'Optimised cuts for every format 16:9, 9:16, and 1:1 ready for every channel you publish on.' },
    { icon: 'auto_awesome', title: 'AI Enhanced Post Production', desc: 'Faster turnarounds without compromising quality AI tools accelerating editing and colour grading.' },
  ],
  process: [
    { title: 'Brief & Creative Development', desc: 'We work closely with you on the goal, audience, and message then build a creative concept, script, and production plan.' },
    { title: 'Production Day(s)', desc: 'Our team handles the full shoot directing, lighting, sound, and camera capturing everything needed to a high standard.' },
    { title: 'Edit, Refine & Deliver', desc: 'We edit and perfect your video through a collaborative review delivering all formats and platform cuts ready to publish.' },
  ],
  results: [
    { val: '5×', label: 'More Engagement Than Static Content Average' },
    { val: '80%', label: 'Audiences Recall Video vs. Text Content' },
    { val: '48hr', label: 'Avg. First Cut Turnaround on Short Form Content' },
  ],
  stack: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Frame.io', 'CapCut', 'Descript', 'ElevenLabs', 'Runway ML', 'Sony FX Series', 'DJI Drones'],
  faqs: [
    { q: 'Do you film on location or only in studio?', a: 'Both we work on location across Australia and in studio depending on the brief. Location shoots are scoped individually based on travel and logistics.' },
    { q: 'How many revision rounds are included?', a: 'All projects include two revision rounds as standard. Additional rounds can be added if needed. We find two rounds is almost always enough when the brief is clear.' },
    { q: 'Can you produce short form social content only?', a: 'Absolutely short form content for Instagram, TikTok, and LinkedIn is one of our most in demand offerings. We can produce batches of content in a single shoot day for efficiency.' },
    { q: 'What is your typical turnaround time?', a: 'Short form content: 48 hours for the first cut. Brand films and longer productions: 7–14 days depending on complexity. We agree on a timeline at the brief stage.' },
  ],
}

export default function Page() { return <ServicePageTemplate service={data} /> }
