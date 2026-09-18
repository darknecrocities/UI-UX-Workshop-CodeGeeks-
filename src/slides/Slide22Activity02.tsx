import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { sound } from '../audio/sound';
import {
  Code2,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  Terminal,
  Type,
  Palette,
  Zap,
  Building2,
  User,
  Layers,
  Calendar,
} from 'lucide-react';

type WebsiteArchetype = 'business' | 'portfolio' | 'saas' | 'event';

interface ArchetypeConfig {
  id: WebsiteArchetype;
  label: string;
  tagline: string;
  defaultName: string;
  defaultRole: string;
  defaultHeadline: string;
  defaultItem1Title: string;
  defaultItem1Desc: string;
  defaultItem2Title: string;
  defaultItem2Desc: string;
  defaultItem3Title: string;
  defaultItem3Desc: string;
  defaultExtra: string;
  defaultCta: string;
  labels: {
    name: string;
    role: string;
    headline: string;
    itemsHeader: string;
    itemTitle: string;
    itemDesc: string;
    extra: string;
    cta: string;
  };
}

const ARCHETYPES: Record<WebsiteArchetype, ArchetypeConfig> = {
  business: {
    id: 'business',
    label: 'Business & B2B',
    tagline: 'Clear Value Proposition · Client Trust · Zero Clutter',
    defaultName: 'Apex Systems',
    defaultRole: 'Enterprise Infrastructure & Cloud Security',
    defaultHeadline: 'We engineer resilient cloud infrastructure for mission-critical operations. Zero downtime, zero bloat.',
    defaultItem1Title: 'Cloud Architecture',
    defaultItem1Desc: 'High-throughput distributed systems engineered for 99.999% uptime.',
    defaultItem2Title: 'Enterprise Zero-Trust',
    defaultItem2Desc: 'SOC-2 compliant end-to-end encryption pipelines and access controls.',
    defaultItem3Title: 'Streaming Analytics',
    defaultItem3Desc: 'Sub-second real-time event processing handling 20M+ queries daily.',
    defaultExtra: 'Trusted by: Fintech Global, HealthData, Nexus AI · Metrics: 42% cloud cost reduction',
    defaultCta: 'Schedule Executive Briefing · inquiries@apexsystems.io',
    labels: {
      name: 'Company / Firm Name',
      role: 'Core Industry / Domain',
      headline: 'Clear Value Proposition (No Jargon)',
      itemsHeader: '3 Core Capabilities / Services',
      itemTitle: 'Service / Offering',
      itemDesc: 'Business Outcome / Impact',
      extra: 'Social Proof, Clients & Proof Metrics',
      cta: 'Primary CTA & Inquiries Email',
    },
  },
  portfolio: {
    id: 'portfolio',
    label: 'Portfolio & Craft',
    tagline: 'Personal Taste · Selected Works · Tactile Micro-Interactions',
    defaultName: 'Arron Parejas',
    defaultRole: 'Full-Stack Engineer & AI Toolmaker',
    defaultHeadline: 'I craft tangible, low-latency web utilities and agentic workflows. Zero AI slop.',
    defaultItem1Title: 'DomoSkills',
    defaultItem1Desc: 'Open-source visual workflow composer and registry for AI agent tools.',
    defaultItem2Title: 'DomoDomo',
    defaultItem2Desc: 'High-speed browser utilities and keyboard-first developer shortcuts.',
    defaultItem3Title: 'KeyPulse',
    defaultItem3Desc: 'Physical-feeling tactile Web Audio synthesizer with millisecond feedback.',
    defaultExtra: 'Stack: Next.js 14, TypeScript, Tailwind CSS, Web Audio, SQLite, Zustand',
    defaultCta: 'Available for Select Projects · arron@domodomo.site · @arronparejas',
    labels: {
      name: 'Your Name',
      role: 'Title / Discipline',
      headline: 'Bio / Hero Statement (Punchy & Clear)',
      itemsHeader: '3 Featured Case Studies / Projects',
      itemTitle: 'Project Name',
      itemDesc: '1-Line Value / Description',
      extra: 'Tech Stack & Engineering Skills',
      cta: 'Contact & Socials (Email, GitHub, X)',
    },
  },
  saas: {
    id: 'saas',
    label: 'SaaS / Product',
    tagline: 'High Conversion · Live Interactive Utility · Pricing Tiers',
    defaultName: 'Kairo Focus',
    defaultRole: 'Deep Work & Calendar Operating System',
    defaultHeadline: 'The calm calendar built for deep focus blocks, not meeting clutter.',
    defaultItem1Title: 'Acoustic Time-Blocking',
    defaultItem1Desc: 'Physical mechanical switch feedback on every completed focus milestone.',
    defaultItem2Title: 'Shielded Focus Zones',
    defaultItem2Desc: 'Automated shields protecting 4-hour uninterrupted morning focus blocks.',
    defaultItem3Title: 'Local-First Sync',
    defaultItem3Desc: 'Zero-latency offline engine with end-to-end peer encrypted sync.',
    defaultExtra: 'Pricing: Free Starter, Pro $12/mo (annual), Team $24/seat/mo · SOC2 Certified',
    defaultCta: 'Start 14-Day Free Trial (No Card Required) · team@kairo.app',
    labels: {
      name: 'Product Name',
      role: 'Product Category / Tagline',
      headline: 'Value Proposition & One-Line Hook',
      itemsHeader: '3 Key Product Features & Benefits',
      itemTitle: 'Feature Name',
      itemDesc: 'User Benefit & Tangible Outcome',
      extra: 'Pricing Tiers, Guarantee & Security',
      cta: 'Primary Conversion CTA & Contact',
    },
  },
  event: {
    id: 'event',
    label: 'Event & Launch',
    tagline: 'Momentum Single-Scroll · Keynote Speakers · Ticket Booking',
    defaultName: 'NO AI SLOP 2026',
    defaultRole: 'Annual Design & Engineering Keynote',
    defaultHeadline: 'From Sketch to Ship: Human Taste and Craft in the Age of Generative AI.',
    defaultItem1Title: 'The Anti-Slop Manifesto',
    defaultItem1Desc: 'Why 90% of AI-generated interfaces look cheap, and how to fix them.',
    defaultItem2Title: 'Live Build Challenge',
    defaultItem2Desc: '60-minute paper sketch to working production web app challenge.',
    defaultItem3Title: 'Brutal Design Critique',
    defaultItem3Desc: 'Live audit of real-world digital products with tangible UX transformations.',
    defaultExtra: 'Date: October 24, 2026 · Venue: SF Design District & Global Stream · 500 Seats',
    defaultCta: 'Reserve Seat ($199 Early Bird) · tickets@noaislop.org',
    labels: {
      name: 'Event / Launch Name',
      role: 'Event Type / Subtitle',
      headline: 'Event Theme & Core Vision',
      itemsHeader: '3 Key Sessions / Keynote Highlights',
      itemTitle: 'Session / Speaker',
      itemDesc: 'Session Topic & Takeaways',
      extra: 'Date, Venue, Schedule & Capacity',
      cta: 'Ticket Registration CTA & Email',
    },
  },
};

interface FontPairing {
  id: string;
  name: string;
  heading: string;
  mono: string;
  desc: string;
}

interface ColorRulePalette {
  id: string;
  name: string;
  bgHex: string;
  textHex: string;
  borderHex: string;
  accentHex: string;
  desc: string;
}

interface AnimationStyle {
  id: string;
  name: string;
  speed: string;
  physics: string;
  desc: string;
}

const FONT_PAIRINGS: FontPairing[] = [
  {
    id: 'swiss-grotesk',
    name: 'Swiss Grotesk',
    heading: 'Inter / Space Grotesk',
    mono: 'JetBrains Mono',
    desc: 'Tight tracking (-0.03em), bold weight, utilitarian clarity',
  },
  {
    id: 'editorial-serif',
    name: 'Editorial Monolith',
    heading: 'Playfair Display / Instrument Serif',
    mono: 'Geist Mono',
    desc: 'High-contrast editorial serif paired with crisp hairline monospace',
  },
  {
    id: 'tech-geometric',
    name: 'Technical Geometric',
    heading: 'Syne / Archivo',
    mono: 'Fira Code',
    desc: 'Oversized display geometry for systems engineers and toolsmiths',
  },
];

const COLOR_PALETTES: ColorRulePalette[] = [
  {
    id: 'parchment-charcoal',
    name: 'Parchment & Charcoal',
    bgHex: '#F5F1E8',
    textHex: '#11100E',
    borderHex: '#E2DDD5',
    accentHex: '#C86432',
    desc: '90% warm parchment paper, 10% deep obsidian ink, terracotta status',
  },
  {
    id: 'chalk-navy',
    name: 'Chalk & Midnight Navy',
    bgHex: '#FAFAF8',
    textHex: '#0B132B',
    borderHex: '#E5E7EB',
    accentHex: '#2563EB',
    desc: '90% clean architectural chalk, 10% midnight navy, cobalt accent',
  },
  {
    id: 'sand-bronze',
    name: 'Sandstone & Bronze',
    bgHex: '#EFECE6',
    textHex: '#1C1917',
    borderHex: '#DCD7CE',
    accentHex: '#854D0E',
    desc: '90% warm sandstone, 10% stone black, warm bronze micro-accents',
  },
  {
    id: 'obsidian-bone',
    name: 'Obsidian & Bone (Dark)',
    bgHex: '#11100E',
    textHex: '#F5F1E8',
    borderHex: '#262420',
    accentHex: '#F59E0B',
    desc: '90% obsidian charcoal, 10% crisp bone white, amber signal',
  },
];

const ANIMATIONS: AnimationStyle[] = [
  {
    id: 'tactile-spring',
    name: 'Tactile Physics',
    speed: '120ms spring',
    physics: 'cubic-bezier(0.16, 1, 0.3, 1)',
    desc: 'Active scale(0.98), hover lift -2px, snappy physical button feedback',
  },
  {
    id: 'calm-editorial',
    name: 'Calm Editorial',
    speed: '300ms smooth',
    physics: 'ease-out',
    desc: 'Subtle opacity shifts, gentle 60ms staggered entry, zero visual noise',
  },
  {
    id: 'zero-lag',
    name: 'Instant Zero-Lag',
    speed: '60ms linear',
    physics: 'linear',
    desc: 'Low-latency engineer feel, instantaneous transitions, pure speed',
  },
];

interface FormState {
  name: string;
  role: string;
  headline: string;
  item1Title: string;
  item1Desc: string;
  item2Title: string;
  item2Desc: string;
  item3Title: string;
  item3Desc: string;
  extra: string;
  cta: string;
}

const buildCustomPrompt = (
  archetypeKey: WebsiteArchetype,
  form: FormState,
  font: FontPairing,
  palette: ColorRulePalette,
  anim: AnimationStyle
): string => {
  const isBiz = archetypeKey === 'business';
  const isSaas = archetypeKey === 'saas';
  const isEvent = archetypeKey === 'event';
  const roleName = isBiz
    ? 'Principal Enterprise Design Technologist & B2B Web Architect'
    : isSaas
    ? 'Lead Product Designer & Frontend Systems Engineer'
    : isEvent
    ? 'Creative Director & Single-Scroll Experience Architect'
    : 'Senior Design Technologist & Creative Engineer';

  const objective = isBiz
    ? `Build a clean, high-conversion B2B Business Website for "${form.name}" that highlights clear proportional value without overcomplicating the UI.`
    : isSaas
    ? `Build a high-conversion SaaS Landing Page and Interactive Product Tour for "${form.name}".`
    : isEvent
    ? `Build a momentum-driven Single-Scroll Event & Registration Website for "${form.name}".`
    : `Build an editorial-grade Personal Portfolio and Case Study Showcase for "${form.name}".`;

  return `You are a world-class ${roleName} who creates award-winning digital experiences with absolute zero AI slop.

### GOAL:
${objective}
- BRAND / NAME: ${form.name}
- DOMAIN / SUBTITLE: ${form.role}
- CORE VALUE PROPOSITION: "${form.headline}"

### STRICT DESIGN SYSTEM & CONSTRAINTS (NO AI SLOP):
1. NO EMOJIS: Do NOT use emojis (🚀, 💡, 🔥, ✨, 🧠, ⚡, 💻, 🎯, etc.) anywhere on the page—not in headings, not in bullet points, and not as pseudo-icons. Emojis make websites look amateur and cheap. Use real semantic SVG icons (Lucide/Heroicons) or pure typography.
2. NO GLOWY PURPLE OR GREEN GRADIENTS: Absolutely NO generic AI purple (#8B5CF6, #A855F7), violet neon drop-shadows, or neon green (#22C55E, #10B981) cards. Do NOT use blurry colored background blobs or over-saturated gradient borders.
3. THE 2-COLOR RULE (CANVAS & INK):
   - Primary Canvas Background: ${palette.bgHex} (Takes 90% visual weight)
   - Primary Contrast Ink: ${palette.textHex} (Used for all typography and structure)
   - Hairline Divider: 1px clean border (${palette.borderHex})
   - Single Functional Accent: ${palette.accentHex} (Used ONLY for live status badge or primary CTA button)
   - Do NOT introduce arbitrary extra colors. Maintain disciplined Swiss editorial contrast.
4. TYPOGRAPHY SYSTEM:
   - Heading Typography: ${font.heading} with tight tracking (-0.03em) and bold weight.
   - Metadata / Tags: ${font.mono} in uppercase with wide letter-spacing (+0.08em).
   - Body Copy: Clean, high-legibility sans-serif with 160% line-height.
   - Strict 8px grid rhythm with generous intentional whitespace.
5. ANIMATION & TACTILE MICRO-INTERACTIONS:
   - Interaction Style: ${anim.name} (${anim.speed}) with transition timing: ${anim.physics}.
   - Buttons: Active state scale(0.98), hover lift -2px with crisp box-shadow.
   - Cards: Subtle border color highlight and smooth link arrow animation on hover.
   - Interactive Feedback: Instant copy toast notification when clicking contact / email.

### KEY CONTENT TO HIGHLIGHT:
1. ${form.item1Title}: ${form.item1Desc}
2. ${form.item2Title}: ${form.item2Desc}
3. ${form.item3Title}: ${form.item3Desc}

### SUPPORTING DATA & CREDENTIALS:
${form.extra}

### PRIMARY CALL TO ACTION:
${form.cta}

### ARCHITECTURE & SECTIONS TO IMPLEMENT:
1. Minimal Sticky Header: Brand mark, live availability/status indicator, section jump links, and primary CTA button.
2. Hero Section: Asymmetrical layout featuring an oversized bold headline, clear value pitch, and direct action triggers.
3. 3-Card Value / Capabilities Grid: Crisp cards with hairline borders, category tags, concise impact descriptions, and interactive hover states.
4. Social Proof & Credentials Section: Structured 2-column layout showing metrics, trust signals, and outcomes.
5. Interactive Feature / Demo / Case Study: Functional interactive tabs or preview drawer.
6. Footer & Contact Bar: Direct email copy interaction with toast feedback ("Copied to clipboard!"), socials, and location/timezone.

### DELIVERABLE FORMAT:
Provide the complete, self-contained HTML file with Tailwind CSS (via CDN) and vanilla JavaScript for interactivity (or a single React JSX component). Include working interactive state for the CTA button, card hover states, and copy-to-clipboard toast. Do NOT leave placeholder comments or "TODOs"—write all real markup and styles ready to preview immediately in Google AI Studio.`;
};

export const Slide22Activity02: React.FC = () => {
  const [activeArchetype, setActiveArchetype] = useState<WebsiteArchetype>('business');

  const [formData, setFormData] = useState<FormState>({
    name: ARCHETYPES.business.defaultName,
    role: ARCHETYPES.business.defaultRole,
    headline: ARCHETYPES.business.defaultHeadline,
    item1Title: ARCHETYPES.business.defaultItem1Title,
    item1Desc: ARCHETYPES.business.defaultItem1Desc,
    item2Title: ARCHETYPES.business.defaultItem2Title,
    item2Desc: ARCHETYPES.business.defaultItem2Desc,
    item3Title: ARCHETYPES.business.defaultItem3Title,
    item3Desc: ARCHETYPES.business.defaultItem3Desc,
    extra: ARCHETYPES.business.defaultExtra,
    cta: ARCHETYPES.business.defaultCta,
  });

  const [selectedFontId, setSelectedFontId] = useState<string>('swiss-grotesk');
  const [selectedColorId, setSelectedColorId] = useState<string>('parchment-charcoal');
  const [selectedAnimId, setSelectedAnimId] = useState<string>('tactile-spring');

  const [leftTab, setLeftTab] = useState<'content' | 'design-system'>('content');

  // Direct editable prompt text
  const [promptCode, setPromptCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Workshop Timer
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 60 mins
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const currentFont = useMemo(
    () => FONT_PAIRINGS.find((f) => f.id === selectedFontId) || FONT_PAIRINGS[0],
    [selectedFontId]
  );
  const currentColor = useMemo(
    () => COLOR_PALETTES.find((c) => c.id === selectedColorId) || COLOR_PALETTES[0],
    [selectedColorId]
  );
  const currentAnim = useMemo(
    () => ANIMATIONS.find((a) => a.id === selectedAnimId) || ANIMATIONS[0],
    [selectedAnimId]
  );

  // Initialize prompt on load or archetype switch
  useEffect(() => {
    const generated = buildCustomPrompt(activeArchetype, formData, currentFont, currentColor, currentAnim);
    setPromptCode(generated);
  }, [activeArchetype, formData, currentFont, currentColor, currentAnim]);

  const handleSelectArchetype = (typeKey: WebsiteArchetype) => {
    sound.playClick(1.2);
    setActiveArchetype(typeKey);
    const arch = ARCHETYPES[typeKey];
    const newForm: FormState = {
      name: arch.defaultName,
      role: arch.defaultRole,
      headline: arch.defaultHeadline,
      item1Title: arch.defaultItem1Title,
      item1Desc: arch.defaultItem1Desc,
      item2Title: arch.defaultItem2Title,
      item2Desc: arch.defaultItem2Desc,
      item3Title: arch.defaultItem3Title,
      item3Desc: arch.defaultItem3Desc,
      extra: arch.defaultExtra,
      cta: arch.defaultCta,
    };
    setFormData(newForm);
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopyPrompt = useCallback(() => {
    sound.playSwitch(true);
    navigator.clipboard.writeText(promptCode).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = promptCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  }, [promptCode]);

  const wordCount = useMemo(() => {
    return promptCode.trim().split(/\s+/).filter(Boolean).length;
  }, [promptCode]);

  const charCount = promptCode.length;
  const approxTokens = Math.round(charCount / 4);
  const currentLabels = ARCHETYPES[activeArchetype].labels;

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 md:p-7 max-w-7xl mx-auto select-none font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#11100E] font-bold">
            25 / Prompt Sandbox & Generator
          </span>
          <span className="text-[#77736B] text-xs font-mono hidden md:inline">
            · {ARCHETYPES[activeArchetype].tagline}
          </span>
        </div>

        {/* Live Session Timer */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#77736B] hidden sm:inline">BUILD TIME</span>
          <span className="font-black text-[#11100E] bg-[#11100E]/5 px-2 py-0.5 rounded border border-[#11100E]/10">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <button
            onClick={() => {
              sound.playSwitch(!isRunning);
              setIsRunning((r) => !r);
            }}
            title={isRunning ? 'Pause Timer' : 'Start Timer'}
            className="p-1.5 rounded bg-[#11100E] text-[#F5F1E8] cursor-pointer hover:bg-black transition-all"
          >
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setIsRunning(false);
              setTimeLeft(3600);
            }}
            title="Reset Timer"
            className="p-1.5 rounded border border-[#11100E]/20 text-[#11100E] cursor-pointer hover:bg-[#11100E]/5 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Subheader: Clean Headline and Archetype Tabs */}
      <div className="pt-2 pb-2 shrink-0 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#11100E]">
            DESIGN YOUR ZERO-SLOP PROMPT
          </h2>
          <p className="text-xs text-[#77736B] font-medium mt-0.5">
            Select a project type, adjust the specs, and edit the prompt code directly in the editor on the right.
          </p>
        </div>

        {/* Archetype Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#E8E3D8] p-1 rounded-lg border border-[#11100E]/10 font-mono text-[11px]">
          <button
            onClick={() => handleSelectArchetype('business')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
              activeArchetype === 'business'
                ? 'bg-[#11100E] text-[#F5F1E8] font-bold shadow-sm'
                : 'text-[#77736B] hover:text-[#11100E]'
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>BUSINESS</span>
          </button>

          <button
            onClick={() => handleSelectArchetype('portfolio')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
              activeArchetype === 'portfolio'
                ? 'bg-[#11100E] text-[#F5F1E8] font-bold shadow-sm'
                : 'text-[#77736B] hover:text-[#11100E]'
            }`}
          >
            <User className="w-3 h-3" />
            <span>PORTFOLIO</span>
          </button>

          <button
            onClick={() => handleSelectArchetype('saas')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
              activeArchetype === 'saas'
                ? 'bg-[#11100E] text-[#F5F1E8] font-bold shadow-sm'
                : 'text-[#77736B] hover:text-[#11100E]'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>SAAS / APP</span>
          </button>

          <button
            onClick={() => handleSelectArchetype('event')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
              activeArchetype === 'event'
                ? 'bg-[#11100E] text-[#F5F1E8] font-bold shadow-sm'
                : 'text-[#77736B] hover:text-[#11100E]'
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>EVENT / FLOW</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid (Two Columns) */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 pb-2 items-stretch">
        {/* Left Column: Form & Design System Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-[#11100E]/15 bg-[#F5F1E8] shadow-sm overflow-hidden">
          {/* Sub-Tabs: Content vs Design System */}
          <div className="px-3 pt-2.5 pb-1 border-b border-[#11100E]/10 bg-[#EFEBE0] flex items-center justify-between gap-2 text-xs font-mono shrink-0">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  sound.playClick(1.0);
                  setLeftTab('content');
                }}
                className={`pb-1 border-b-2 cursor-pointer font-bold transition-all ${
                  leftTab === 'content'
                    ? 'border-[#11100E] text-[#11100E]'
                    : 'border-transparent text-[#77736B] hover:text-[#11100E]'
                }`}
              >
                1. {ARCHETYPES[activeArchetype].label.toUpperCase()} DATA
              </button>
              <button
                onClick={() => {
                  sound.playClick(1.0);
                  setLeftTab('design-system');
                }}
                className={`pb-1 border-b-2 cursor-pointer font-bold transition-all flex items-center gap-1 ${
                  leftTab === 'design-system'
                    ? 'border-[#11100E] text-[#11100E]'
                    : 'border-transparent text-[#77736B] hover:text-[#11100E]'
                }`}
              >
                <Palette className="w-3 h-3" />
                <span>2. DESIGN SYSTEM & 2-COLOR RULE</span>
              </button>
            </div>
            <span className="text-[10px] text-[#77736B] uppercase font-bold">
              {ARCHETYPES[activeArchetype].id}
            </span>
          </div>

          {/* Tab 1: Project Content Form */}
          {leftTab === 'content' && (
            <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2 font-mono text-xs prevent-slide-wheel">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">
                    {currentLabels.name}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    className="w-full px-2 py-1 rounded-lg border border-[#11100E]/20 bg-white text-[#11100E] text-xs font-sans focus:outline-none focus:border-[#11100E] prevent-space-nav"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">
                    {currentLabels.role}
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => handleFieldChange('role', e.target.value)}
                    className="w-full px-2 py-1 rounded-lg border border-[#11100E]/20 bg-white text-[#11100E] text-xs font-sans focus:outline-none focus:border-[#11100E] prevent-space-nav"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">
                  {currentLabels.headline}
                </label>
                <textarea
                  rows={2}
                  value={formData.headline}
                  onChange={(e) => handleFieldChange('headline', e.target.value)}
                  className="w-full px-2 py-1 rounded-lg border border-[#11100E]/20 bg-white text-[#11100E] text-xs font-sans focus:outline-none focus:border-[#11100E] resize-none prevent-space-nav"
                />
              </div>

              {/* 3 Featured Items */}
              <div className="border-t border-[#11100E]/10 pt-1.5">
                <span className="block text-[9px] font-bold uppercase text-[#77736B] mb-1">
                  {currentLabels.itemsHeader}
                </span>
                <div className="space-y-1">
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={formData.item1Title}
                      onChange={(e) => handleFieldChange('item1Title', e.target.value)}
                      className="w-1/3 px-2 py-0.5 rounded border border-[#11100E]/20 bg-white text-[11px] font-bold font-sans text-[#11100E] prevent-space-nav"
                      placeholder="Item 1"
                    />
                    <input
                      type="text"
                      value={formData.item1Desc}
                      onChange={(e) => handleFieldChange('item1Desc', e.target.value)}
                      className="w-2/3 px-2 py-0.5 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                      placeholder="Description & Impact"
                    />
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={formData.item2Title}
                      onChange={(e) => handleFieldChange('item2Title', e.target.value)}
                      className="w-1/3 px-2 py-0.5 rounded border border-[#11100E]/20 bg-white text-[11px] font-bold font-sans text-[#11100E] prevent-space-nav"
                      placeholder="Item 2"
                    />
                    <input
                      type="text"
                      value={formData.item2Desc}
                      onChange={(e) => handleFieldChange('item2Desc', e.target.value)}
                      className="w-2/3 px-2 py-0.5 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                      placeholder="Description & Impact"
                    />
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={formData.item3Title}
                      onChange={(e) => handleFieldChange('item3Title', e.target.value)}
                      className="w-1/3 px-2 py-0.5 rounded border border-[#11100E]/20 bg-white text-[11px] font-bold font-sans text-[#11100E] prevent-space-nav"
                      placeholder="Item 3"
                    />
                    <input
                      type="text"
                      value={formData.item3Desc}
                      onChange={(e) => handleFieldChange('item3Desc', e.target.value)}
                      className="w-2/3 px-2 py-0.5 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                      placeholder="Description & Impact"
                    />
                  </div>
                </div>
              </div>

              {/* Supporting Credentials & CTA */}
              <div className="grid grid-cols-2 gap-2 border-t border-[#11100E]/10 pt-1.5">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">
                    {currentLabels.extra}
                  </label>
                  <input
                    type="text"
                    value={formData.extra}
                    onChange={(e) => handleFieldChange('extra', e.target.value)}
                    className="w-full px-2 py-1 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">
                    {currentLabels.cta}
                  </label>
                  <input
                    type="text"
                    value={formData.cta}
                    onChange={(e) => handleFieldChange('cta', e.target.value)}
                    className="w-full px-2 py-1 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Design System & 2-Color Rule */}
          {leftTab === 'design-system' && (
            <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-3 font-mono text-xs prevent-slide-wheel">
              {/* 2-Color Rule Selector */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase text-[#11100E] flex items-center gap-1">
                    <Palette className="w-3 h-3 text-[#C86432]" />
                    THE 2-COLOR RULE (CANVAS & INK)
                  </span>
                  <span className="text-[9px] text-[#77736B]">90% / 10% Ratio</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {COLOR_PALETTES.map((c) => {
                    const isSelected = selectedColorId === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          sound.playClick(1.1);
                          setSelectedColorId(c.id);
                        }}
                        className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#11100E] bg-[#11100E] text-[#F5F1E8] shadow-sm'
                            : 'border-[#11100E]/15 bg-white text-[#11100E] hover:border-[#11100E]/40'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                            style={{ backgroundColor: c.bgHex }}
                          />
                          <div
                            className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: c.textHex }}
                          />
                          <div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: c.accentHex }}
                            title="Functional Accent"
                          />
                        </div>
                        <div className="font-bold text-[10px] truncate">{c.name}</div>
                        <div
                          className={`text-[9px] line-clamp-1 ${
                            isSelected ? 'text-[#D8D3C8]' : 'text-[#77736B]'
                          }`}
                        >
                          {c.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Typography Pairing */}
              <div className="border-t border-[#11100E]/10 pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase text-[#11100E] flex items-center gap-1">
                    <Type className="w-3 h-3 text-[#11100E]" />
                    TYPOGRAPHY PAIRINGS
                  </span>
                  <span className="text-[9px] text-[#77736B]">Display + Monospace</span>
                </div>
                <div className="space-y-1.5">
                  {FONT_PAIRINGS.map((f) => {
                    const isSelected = selectedFontId === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => {
                          sound.playClick(1.1);
                          setSelectedFontId(f.id);
                        }}
                        className={`w-full p-2 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#11100E] bg-[#11100E] text-[#F5F1E8] shadow-sm'
                            : 'border-[#11100E]/15 bg-white text-[#11100E] hover:border-[#11100E]/40'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-[10px]">{f.name}</div>
                          <div className={`text-[9px] ${isSelected ? 'text-[#D8D3C8]' : 'text-[#77736B]'}`}>
                            Heading: {f.heading} · Mono: {f.mono}
                          </div>
                        </div>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/10' : 'bg-black/5'}`}>
                          {f.desc.split(',')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Animation Physics */}
              <div className="border-t border-[#11100E]/10 pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase text-[#11100E] flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-600" />
                    ANIMATION & MICRO-INTERACTIONS
                  </span>
                  <span className="text-[9px] text-[#77736B]">Tactile Physics</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {ANIMATIONS.map((a) => {
                    const isSelected = selectedAnimId === a.id;
                    return (
                      <button
                        key={a.id}
                        onClick={() => {
                          sound.playClick(1.1);
                          setSelectedAnimId(a.id);
                        }}
                        className={`p-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#11100E] bg-[#11100E] text-[#F5F1E8] shadow-sm'
                            : 'border-[#11100E]/15 bg-white text-[#11100E] hover:border-[#11100E]/40'
                        }`}
                      >
                        <div className="font-bold text-[10px] truncate">{a.name}</div>
                        <div className={`text-[8px] ${isSelected ? 'text-[#D8D3C8]' : 'text-[#77736B]'}`}>
                          {a.speed}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Bar: Live compile note */}
          <div className="p-2 border-t border-[#11100E]/15 bg-[#EFEBE0] text-[10px] font-mono text-[#77736B] flex items-center justify-between shrink-0">
            <span>Changes reflect directly in the prompt on the right ➔</span>
            <button
              onClick={() => {
                sound.playTap();
                handleSelectArchetype(activeArchetype);
              }}
              className="text-[#11100E] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Template</span>
            </button>
          </div>
        </div>

        {/* Right Column: Always-Editable Prompt Code Editor (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#11100E] bg-[#11100E] text-[#F5F1E8] shadow-md overflow-hidden">
          {/* Header Bar */}
          <div className="px-3 py-2 border-b border-white/10 bg-black/40 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#F5F1E8]">
                PROMPT CODE (DIRECTLY EDITABLE)
              </span>
              <span className="text-[10px] font-mono text-white/40">
                {wordCount} words · ~{approxTokens} tokens
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-1.5">
              <a
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick(1.0)}
                className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[#F5F1E8] text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                title="Open Google AI Studio in new tab"
              >
                <span>AI STUDIO</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>

              <button
                onClick={handleCopyPrompt}
                className={`px-3 py-1 rounded text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-500 text-white shadow-md scale-105'
                    : 'bg-[#F5F1E8] text-[#11100E] hover:bg-white shadow-sm'
                }`}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY PROMPT'}</span>
              </button>
            </div>
          </div>

          {/* Direct Live Textarea Editor */}
          <div className="flex-1 min-h-0 relative p-3 overflow-hidden bg-[#11100E]">
            <textarea
              value={promptCode}
              onChange={(e) => setPromptCode(e.target.value)}
              className="w-full h-full bg-transparent text-[#F5F1E8] font-mono text-[11px] leading-relaxed resize-none focus:outline-none border-0 p-0 selection:bg-white/20 prevent-space-nav overflow-y-auto"
              placeholder="Type or edit your prompt directly here..."
              spellCheck={false}
            />
          </div>

          {/* Prompt Sandbox Footer Instructions */}
          <div className="px-3 py-2 border-t border-white/10 bg-black/30 flex items-center justify-between text-[10px] font-mono text-[#D8D3C8]/70 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Click anywhere inside the box above to edit directly. Paste into Google AI Studio.</span>
            </div>
            <button
              onClick={() => {
                sound.playTap();
                const fresh = buildCustomPrompt(activeArchetype, formData, currentFont, currentColor, currentAnim);
                setPromptCode(fresh);
              }}
              className="hover:text-white underline cursor-pointer text-[#D8D3C8]/50"
            >
              Recompile from Form
            </button>
          </div>
        </div>
      </div>

      {/* Slide Bottom Bar */}
      <div className="pt-1.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B] shrink-0">
        <span>Prompting with Taste: Business & Portfolio Archetypes + 2-Color Rule</span>
        <span>25 / 28</span>
      </div>
    </div>
  );
};
