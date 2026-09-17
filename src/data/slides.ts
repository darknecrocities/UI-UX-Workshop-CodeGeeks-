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
  { id: 13, slug: 'grid-system', title: 'STANDARD GRID SYSTEM', section: 'FUNDAMENTALS', tagline: '12-Column & 8pt Spatial Matrix' },
  { id: 14, slug: 'motion', title: 'MOTION IS NOT DECORATION', section: 'FUNDAMENTALS', tagline: 'Motion Should Explain' },
  { id: 15, slug: 'tactile', title: 'TACTILE INTERACTION', section: 'FUNDAMENTALS', tagline: 'Make Software Feel Physical' },
  { id: 16, slug: 'xy-experiment', title: 'THE X/Y EXPERIMENT', section: 'FUNDAMENTALS', tagline: 'Every Interaction Has a Position' },
  { id: 17, slug: 'prompt-skills', title: 'PROMPT DESIGN SKILLS', section: 'AI ENGINEERING', tagline: 'Prompting as an Architectural Skill' },
  { id: 18, slug: 'good-prompt', title: 'ANATOMY OF A PROMPT', section: 'AI ENGINEERING', tagline: 'From Generic to Precise' },
  { id: 19, slug: 'decisions', title: 'PROMPT FOR DECISIONS', section: 'AI ENGINEERING', tagline: 'Constraints > Components' },
  { id: 20, slug: 'activity-01', title: 'ACTIVITY 01', section: 'ACTIVITY 01', tagline: 'Sketch → Figma (60 Min)' },
  { id: 21, slug: 'break', title: 'TAKE A BREAK', section: 'BREAK', tagline: '15 Minutes Offline' },
  { id: 22, slug: 'pipeline', title: 'AI-ASSISTED DEV', section: 'AI ENGINEERING', tagline: 'Now Let the Machines Code' },
  { id: 23, slug: 'activity-02', title: 'ACTIVITY 02', section: 'ACTIVITY 02', tagline: 'Prompt → Working Product' },
  { id: 24, slug: 'slop-audit', title: 'THE SLOP AUDIT', section: 'WRAP-UP', tagline: 'Break Your Own Product' },
  { id: 25, slug: 'showcase', title: 'SHOWCASE', section: 'WRAP-UP', tagline: 'From Sketch to Ship' },
  { id: 26, slug: 'final', title: 'FINAL', section: 'WRAP-UP', tagline: "Don't Just Generate. Design." },
];

export const WORKSHOP_TIMELINE: WorkshopBlock[] = [
  { time: '0:00 – 1:00', title: 'UI/UX Fundamentals', slides: 'Slides 01–18', description: 'Typography, spacing, tactile micro-interactions, business UX, and prompt architecture.' },
  { time: '1:00 – 2:00', title: 'Activity 01: Sketch to Figma', slides: 'Slide 19', description: 'Define the real problem, sketch the interaction flow, and assemble a low-fidelity prototype.' },
  { time: '2:00 – 2:15', title: 'Break', slides: 'Slide 20', description: '15-minute screen rest, offline reflection, and coffee recharge.' },
  { time: '2:15 – 2:45', title: 'AI-Assisted Development', slides: 'Slide 21', description: 'Pipeline demo: Figma → Structured prompt → Antigravity CLI / DomoSkills → Production code.' },
  { time: '2:45 – 3:45', title: 'Activity 02: Prompt to Product', slides: 'Slide 22', description: 'One-shot prompt generation, testing in browser, hunting AI slop, and intentional refinement.' },
  { time: '3:45 – 4:00', title: 'Showcase & Slop Audit', slides: 'Slides 23–25', description: 'Auditing decisions, interactive demonstrations, peer critique, and final closing remarks.' }
];

export const SPEAKER_PRODUCTS: ProductItem[] = [
  { id: 'buddy', title: 'Buddy', category: 'AI Desktop Companion', image: '/assets/product/buddy.webp', description: 'Delightful native desktop assistant with local intelligence.' },
  { id: 'domodomo', title: 'DomoDomo', category: 'Creative Tech Studio', image: '/assets/product/domodomo_logo.jpg', description: 'Design engineering lab crafting tactile web software.' },
  { id: 'domonote', title: 'DomoNote', category: 'Markdown Workspace', image: '/assets/product/domonote.png', description: 'Distraction-free tactile editor built for speed and clarity.' },
  { id: 'domoskills', title: 'DomoSkills', category: 'Agentic Skill Library', image: '/assets/product/domoskills.png', description: 'Curated skills and tools for autonomous coding agents.' },
  { id: 'agentdeck', title: 'AgentDeck', category: 'Autonomous Dev Console', image: '/assets/product/agentdeck.webp', description: 'High-density terminal console for orchestrating AI pipelines.' },
  { id: 'hireme', title: 'HireMe', category: 'Developer Portfolio', image: '/assets/product/hireme.webp', description: 'Interactive developer resume and showcase engine.' },
];
