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
  { id: 17, slug: 'prompt-skills', title: 'PROMPTING WITH TASTE', section: 'BUILDING WITH AI', tagline: 'Better Words, Better Screens' },
  { id: 18, slug: 'good-prompt', title: 'A GREAT PROMPT', section: 'BUILDING WITH AI', tagline: 'Clear Rules Beat Guesswork' },
  { id: 19, slug: 'decisions', title: 'DECIDE FIRST, CODE SECOND', section: 'BUILDING WITH AI', tagline: 'Good Choices Beat More Code' },
  { id: 20, slug: 'activity-01', title: 'ACTIVITY 01', section: 'ACTIVITY 01', tagline: 'Paper Sketch → Clean Prototype (60 Min)' },
  { id: 21, slug: 'break', title: 'QUICK BREAK', section: 'BREAK', tagline: '15 Minutes to Recharge' },
  { id: 22, slug: 'pipeline', title: 'BUILDING WITH AI', section: 'BUILDING WITH AI', tagline: 'Let the Machine Help You Ship' },
  { id: 23, slug: 'activity-02', title: 'ACTIVITY 02', section: 'ACTIVITY 02', tagline: 'Prompt → Working App' },
  { id: 24, slug: 'slop-audit', title: 'CHECKING YOUR WORK', section: 'WRAP-UP', tagline: 'Find the Flaws Before Users Do' },
  { id: 25, slug: 'showcase', title: 'SHOWCASE', section: 'WRAP-UP', tagline: 'Show What You Made' },
  { id: 26, slug: 'final', title: 'FINAL THOUGHT', section: 'WRAP-UP', tagline: "Don't Just Generate. Design." },
];

export const WORKSHOP_TIMELINE: WorkshopBlock[] = [
  { time: '0:00 – 1:00', title: 'Design Fundamentals', slides: 'Slides 01–19', description: 'Typography, simple spacing, sound, colors, and clear prompts.' },
  { time: '1:00 – 2:00', title: 'Activity 01: Paper to Screen', slides: 'Slide 20', description: 'Find a real problem, sketch the flow, and build a simple prototype.' },
  { time: '2:00 – 2:15', title: 'Break', slides: 'Slide 21', description: '15 minutes to step away, rest your eyes, and grab a drink.' },
  { time: '2:15 – 2:45', title: 'Building with AI', slides: 'Slide 22', description: 'Watch how clean prompts turn ideas into working code fast.' },
  { time: '2:45 – 3:45', title: 'Activity 02: Prompt to Product', slides: 'Slide 23', description: 'Generate your app, test it in the browser, and polish every detail.' },
  { time: '3:45 – 4:00', title: 'Showcase & Review', slides: 'Slides 24–26', description: 'Share what you built, review the work, and wrap up.' }
];

export const SPEAKER_PRODUCTS: ProductItem[] = [
  { id: 'buddy', title: 'Buddy', category: 'Desktop Helper', image: '/assets/product/buddy.webp', description: 'Helpful companion app right on your desktop.' },
  { id: 'domodomo', title: 'DomoDomo', category: 'Design Studio', image: '/assets/product/domodomo_logo.jpg', description: 'Creative lab making software that feels good to use.' },
  { id: 'domonote', title: 'DomoNote', category: 'Simple Notes', image: '/assets/product/domonote.png', description: 'Fast, distraction-free note taking.' },
  { id: 'domoskills', title: 'DomoSkills', category: 'Helpful Skills', image: '/assets/product/domoskills.png', description: 'Ready-made actions for AI coding tools.' },
  { id: 'agentdeck', title: 'AgentDeck', category: 'Project Hub', image: '/assets/product/agentdeck.webp', description: 'Clean workspace for running and tracking your builds.' },
  { id: 'hireme', title: 'HireMe', category: 'Portfolio', image: '/assets/product/hireme.webp', description: 'Interactive developer resume and portfolio.' },
];
