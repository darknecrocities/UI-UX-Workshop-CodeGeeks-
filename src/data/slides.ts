import type { SlideMeta, WorkshopBlock, ProductItem } from '../types';

export const SLIDES_DATA: SlideMeta[] = [
  { id: 1, slug: 'cover', title: 'NO AI SLOP', section: 'FUNDAMENTALS', tagline: 'From Sketch to Ship' },
  { id: 2, slug: 'speaker', title: "WHO'S TALKING?", section: 'FUNDAMENTALS', tagline: 'Arron Parejas — Bio & Products' },
  { id: 3, slug: 'problem', title: 'THE PROBLEM', section: 'FUNDAMENTALS', tagline: 'Building Faster ≠ Designing Better' },
  { id: 4, slug: 'judgment', title: 'WHAT ACTUALLY MATTERS', section: 'FUNDAMENTALS', tagline: 'AI Output vs. Human Judgment' },
  { id: 5, slug: 'spectrum', title: 'THE DESIGN SPECTRUM', section: 'FUNDAMENTALS', tagline: 'Style is a Decision System' },
  { id: 6, slug: 'typography', title: 'TYPE IS INTERFACE', section: 'FUNDAMENTALS', tagline: 'Hierarchy Without Decoration' },
  { id: 7, slug: 'font-voice', title: 'CHOOSING A FONT', section: 'FUNDAMENTALS', tagline: 'Stop Picking Fonts. Pick Voices.' },
  { id: 8, slug: 'color-system', title: 'COLOR WITHOUT SLOP', section: 'FUNDAMENTALS', tagline: 'Color Must Have a Job' },
  { id: 9, slug: 'business-ux', title: 'BUSINESS VS UX', section: 'FUNDAMENTALS', tagline: 'Your Business Should Shape UX' },
  { id: 10, slug: 'simple-premium', title: 'SIMPLE → PREMIUM', section: 'FUNDAMENTALS', tagline: 'Premium = Better Decisions' },
  { id: 11, slug: 'mmr-story', title: 'MY $3.25K MMR STORY', section: 'FUNDAMENTALS', tagline: 'Usefulness Precedes Revenue' },
  { id: 12, slug: 'scalability', title: 'SCALABILITY', section: 'FUNDAMENTALS', tagline: 'Good Design Survives Growth' },
  { id: 13, slug: 'grid-system', title: 'LAYOUT GRIDS', section: 'FUNDAMENTALS', tagline: 'Grids Make Clean Layouts' },
  { id: 14, slug: 'motion', title: 'MOTION HAS PURPOSE', section: 'FUNDAMENTALS', tagline: 'Movement Should Explain, Not Distract' },
  { id: 15, slug: 'tactile', title: 'REAL TOUCH & SOUND', section: 'FUNDAMENTALS', tagline: 'Make Software Feel Alive' },
  { id: 16, slug: 'xy-experiment', title: 'POSITION & FEEL', section: 'FUNDAMENTALS', tagline: 'Every Touch Has a Place' },
  { id: 17, slug: 'single-scroll', title: 'SINGLE-SCROLL FLOW', section: 'FUNDAMENTALS', tagline: 'Momentum for Events & Portfolios' },
  { id: 18, slug: 'multipage-business', title: 'BUSINESS WEBSITES', section: 'FUNDAMENTALS', tagline: 'Show Clear Value, Not Clutter' },
  { id: 19, slug: 'prompt-skills', title: 'PROMPTING WITH TASTE', section: 'BUILDING WITH AI', tagline: 'Better Words, Better Screens' },
  { id: 20, slug: 'good-prompt', title: 'A GREAT PROMPT', section: 'BUILDING WITH AI', tagline: 'Clear Rules Beat Guesswork' },
  { id: 21, slug: 'decisions', title: 'DECIDE FIRST, CODE SECOND', section: 'BUILDING WITH AI', tagline: 'Good Choices Beat More Code' },
  { id: 22, slug: 'activity-01', title: 'ACTIVITY 01', section: 'ACTIVITY 01', tagline: 'Paper Sketch → Clean Prototype (60 Min)' },
  { id: 23, slug: 'break', title: 'QUICK BREAK', section: 'BREAK', tagline: '15 Minutes to Recharge' },
  { id: 24, slug: 'pipeline', title: 'BUILDING WITH AI', section: 'BUILDING WITH AI', tagline: 'Let the Machine Help You Ship' },
  { id: 25, slug: 'activity-02', title: 'ACTIVITY 02', section: 'ACTIVITY 02', tagline: 'Prompt → Working App' },
  { id: 26, slug: 'slop-audit', title: 'CHECKING YOUR WORK', section: 'WRAP-UP', tagline: 'Find the Flaws Before Users Do' },
  { id: 27, slug: 'showcase', title: 'SHOWCASE', section: 'WRAP-UP', tagline: 'Show What You Made' },
  { id: 28, slug: 'final', title: 'FINAL THOUGHT', section: 'WRAP-UP', tagline: "Don't Just Generate. Design." },
];

export const WORKSHOP_TIMELINE: WorkshopBlock[] = [
  { time: '0:00 – 1:00', title: 'Design Fundamentals', slides: 'Slides 01–21', description: 'Typography, simple spacing, sound, colors, page architecture, and clear prompts.' },
  { time: '1:00 – 2:00', title: 'Activity 01: Paper to Screen', slides: 'Slide 22', description: 'Find a real problem, sketch the flow, and build a simple prototype.' },
  { time: '2:00 – 2:15', title: 'Break', slides: 'Slide 23', description: '15 minutes to step away, rest your eyes, and grab a drink.' },
  { time: '2:15 – 2:45', title: 'Building with AI', slides: 'Slide 24', description: 'Watch how clean prompts turn ideas into working code fast.' },
  { time: '2:45 – 3:45', title: 'Activity 02: Prompt to Product', slides: 'Slide 25', description: 'Generate your app, test it in the browser, and polish every detail.' },
  { time: '3:45 – 4:00', title: 'Showcase & Review', slides: 'Slides 26–28', description: 'Share what you built, review the work, and wrap up.' }
];

export const SPEAKER_PRODUCTS: ProductItem[] = [
  {
    id: 'domodomo',
    title: 'DomoDomo',
    category: 'Web Utilities & Agentic Tools',
    image: '/assets/product/domodomo_logo.jpg',
    description: 'Web Utilities and Agentic Tools',
    url: 'https://domodomo.site',
  },
  {
    id: 'domoskills',
    title: 'DomoSkills',
    category: 'Agent Skills Marketplace',
    image: '/assets/product/domoskills.png',
    description: 'Marketplace for the agent skills',
    url: 'https://web-beta-six-81.vercel.app',
  },
  {
    id: 'codepyne',
    title: 'Codepyne',
    category: 'AI & ML Learning',
    image: '/assets/product/codepyne.png',
    description: 'Learning platform in the field of AI and ML',
    url: 'https://codepyne-io.vercel.app',
  },
  {
    id: 'agentdeck',
    title: 'AgentDeck',
    category: 'Agentic Remote App',
    image: '/assets/product/agentdeck.webp',
    description: 'Agentic remote app via phone',
    url: 'https://github.com/darknecrocities/Agentdeck',
  },
  {
    id: 'domonote',
    title: 'DomoNote',
    category: 'Local AI Secretary',
    image: '/assets/product/domonote.png',
    description: 'Personal local AI Secretary',
    url: 'https://domonote.vercel.app',
  },
];
