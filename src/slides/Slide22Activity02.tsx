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
  Sliders,
  Edit3,
  Terminal,
  Image as ImageIcon,
  Eye,
  Type,
  Palette,
  Zap,
  ArrowUpRight,
} from 'lucide-react';

interface FontPairing {
  id: string;
  name: string;
  heading: string;
  mono: string;
  desc: string;
  fontClass: string;
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

interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  proj1Title: string;
  proj1Desc: string;
  proj2Title: string;
  proj2Desc: string;
  proj3Title: string;
  proj3Desc: string;
  techStack: string;
  contact: string;
}

const FONT_PAIRINGS: FontPairing[] = [
  {
    id: 'swiss-grotesk',
    name: 'Swiss Grotesk',
    heading: 'Inter / Space Grotesk',
    mono: 'JetBrains Mono',
    desc: 'Tight tracking (-0.03em), bold weight, utilitarian clarity',
    fontClass: 'font-sans',
  },
  {
    id: 'editorial-serif',
    name: 'Editorial Monolith',
    heading: 'Playfair Display / Instrument Serif',
    mono: 'Geist Mono',
    desc: 'High-contrast editorial serif paired with crisp hairline monospace',
    fontClass: 'font-serif',
  },
  {
    id: 'tech-geometric',
    name: 'Technical Geometric',
    heading: 'Syne / Archivo',
    mono: 'Fira Code',
    desc: 'Oversized display geometry for systems engineers and toolsmiths',
    fontClass: 'font-sans',
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

const PRESETS: { id: string; name: string; fontId: string; colorId: string; animId: string; data: PortfolioData }[] = [
  {
    id: 'minimalist-dev',
    name: 'Minimalist Engineer',
    fontId: 'swiss-grotesk',
    colorId: 'parchment-charcoal',
    animId: 'tactile-spring',
    data: {
      name: 'Arron Parejas',
      role: 'Full-Stack Engineer & AI Toolmaker',
      bio: 'I build tangible, low-latency developer tools and agentic web apps. Zero AI slop.',
      proj1Title: 'DomoSkills',
      proj1Desc: 'Open-source registry and visual workflow composer for agentic tools.',
      proj2Title: 'DomoDomo',
      proj2Desc: 'High-speed browser utilities and local keyboard-driven shortcuts.',
      proj3Title: 'KeyPulse',
      proj3Desc: 'Physical-feeling tactile Web Audio synthesizer with millisecond latency.',
      techStack: 'Next.js 14, TypeScript, Tailwind CSS, Web Audio API, Zustand, SQLite',
      contact: 'arron@domodomo.site · GitHub: @arronkian · X: @arronparejas',
    },
  },
  {
    id: 'product-designer',
    name: 'Product Designer',
    fontId: 'editorial-serif',
    colorId: 'chalk-navy',
    animId: 'calm-editorial',
    data: {
      name: 'Alex Rivera',
      role: 'Staff Product & Interaction Designer',
      bio: 'Designing software that feels physical, calm, and unmistakably human.',
      proj1Title: 'Slate Design System',
      proj1Desc: 'Accessible, token-driven component architecture for product teams.',
      proj2Title: 'Kairo Focus',
      proj2Desc: 'Minimalist time-blocking desktop app with tactile acoustic micro-interactions.',
      proj3Title: 'Monolith Editorial',
      proj3Desc: 'Independent publication exploring digital craftsmanship and humane tools.',
      techStack: 'Figma, React, Tailwind CSS, Framer Motion, Radix UI, Accessible Tokens',
      contact: 'alex@rivera.design · Read.cv: @alexrivera · Bluesky: @alex.rivera',
    },
  },
  {
    id: 'creative-ai',
    name: 'Creative Technologist',
    fontId: 'tech-geometric',
    colorId: 'sand-bronze',
    animId: 'zero-lag',
    data: {
      name: 'Jordan Chen',
      role: 'Creative Developer & AI Systems Builder',
      bio: 'Bridging generative AI with real-time browser graphics and responsive physical interfaces.',
      proj1Title: 'Latent Canvas',
      proj1Desc: 'Real-time multi-modal latent space explorer powered by WebGL shaders.',
      proj2Title: 'PromptMatrix',
      proj2Desc: 'Deterministic schema compiler for LLMs with zero hallucination rate.',
      proj3Title: 'Kinetic Type Engine',
      proj3Desc: 'Physical spring-driven variable typography playground in the browser.',
      techStack: 'TypeScript, WebGL / Three.js, Tailwind CSS, Python, PyTorch, Gemini API',
      contact: 'jordan@chen.ai · GitHub: @jordanchen · X: @jordan_ai',
    },
  },
];

const buildExpandedPrompt = (
  data: PortfolioData,
  font: FontPairing,
  palette: ColorRulePalette,
  anim: AnimationStyle
): string => {
  return `You are a world-class Senior Design Technologist and Frontend Engineer who crafts award-winning, editorial-grade web experiences with zero AI slop.

### GOAL:
Build a complete, single-file, production-ready interactive Personal Portfolio website for:
- NAME: ${data.name}
- TITLE / ROLE: ${data.role}
- HERO STATEMENT: "${data.bio}"

### STRICT DESIGN SYSTEM & CONSTRAINTS (NO AI SLOP):
1. NO EMOJIS: Do NOT use emojis (🚀, 💡, 🔥, ✨, 🧠, ⚡, 💻, 🎯, etc.) anywhere on the page—not in titles, not in bullet points, and not as pseudo-icons. Emojis look amateurish and scream "AI slop". Use clean semantic SVG icons (Lucide / Heroicons style) or pure typographic hierarchy.
2. NO GLOWY PURPLE OR GREEN GRADIENTS: Absolutely NO generic AI purple (#8B5CF6, #A855F7), violet neon drop-shadows, or neon green (#22C55E, #10B981) cards. Do NOT use blurry colored background blobs or over-saturated gradient borders.
3. STRICT 2-COLOR RULE:
   - Primary Canvas Background: ${palette.bgHex} (Takes 90% visual weight)
   - Primary Contrast Ink: ${palette.textHex} (Used for all typography and structure)
   - Hairline Divider Border: 1px subtle divider (${palette.borderHex})
   - Single Functional Accent: ${palette.accentHex} (Used ONLY for live status indicator or key CTA link)
   - Do NOT add a third or fourth accent color. Maintain stark, confident Swiss discipline.
4. TYPOGRAPHY SYSTEM:
   - Heading Pairing: ${font.heading} with tight tracking (-0.03em) and bold weight.
   - Metadata / Tags: ${font.mono} in uppercase with wide letter-spacing (+0.08em).
   - Body Copy: Clean, high-legibility sans-serif with 160% line-height.
   - Generous Whitespace: Let the layout breathe with an intentional 8px spacing rhythm.
5. ANIMATION & TACTILE MICRO-INTERACTIONS:
   - Interaction Style: ${anim.name} (${anim.speed}) with transition timing: ${anim.physics}.
   - Interactive Buttons: Active state scale(0.98), hover lift -2px with crisp box-shadow.
   - Project Cards: Smooth border color highlight and subtle link arrow animation on hover.
   - Feedback: When clicking "Copy Email", display a smooth toast notification ("Email copied to clipboard!") that fades out automatically.

### FEATURED PROJECTS TO SHOWCASE:
1. ${data.proj1Title}: ${data.proj1Desc}
2. ${data.proj2Title}: ${data.proj2Desc}
3. ${data.proj3Title}: ${data.proj3Desc}

### TECH STACK & CREDENTIALS:
${data.techStack}

### KEY SECTIONS TO IMPLEMENT:
1. Minimal Sticky Header: Monogram/logo, live status dot ("AVAILABLE FOR WORK"), section links, and a tactile "Copy Email" button.
2. Hero Section: Asymmetrical editorial layout with an oversized punchy headline, role credentials, and clean primary action buttons.
3. Selected Works Grid: 3 project cards featuring project category pill, title, concise description, tech tags, and external link arrow icon.
4. Experience & Tech Stack: Two-column layout with clean date ranges, organizations, and roles.
5. Philosophy / Craft Rules: 3 short, sharp principles on design judgment, performance, and simplicity.
6. Footer & Contact: Direct email copy interaction with toast feedback ("Email copied!"), GitHub, and social links:
   ${data.contact}

### DELIVERABLE FORMAT:
Provide the complete, self-contained HTML file with Tailwind CSS (via CDN) and vanilla JavaScript for interactivity (or a single React JSX component). Include working interactive state for the email copy button, project link hover states, and theme/sound toggle. Do NOT leave placeholder comments or "TODOs"—write all real markup and styles ready to preview immediately in Google AI Studio.`;
};

export const Slide22Activity02: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('minimalist-dev');
  const [formData, setFormData] = useState<PortfolioData>(PRESETS[0].data);
  const [selectedFontId, setSelectedFontId] = useState<string>('swiss-grotesk');
  const [selectedColorId, setSelectedColorId] = useState<string>('parchment-charcoal');
  const [selectedAnimId, setSelectedAnimId] = useState<string>('tactile-spring');

  // View mode for right pane: 'prompt' | 'demo-image' | 'live-preview'
  const [rightViewMode, setRightViewMode] = useState<'prompt' | 'demo-image' | 'live-preview'>('prompt');
  const [leftTab, setLeftTab] = useState<'content' | 'design-system'>('content');
  const [isRawEditor, setIsRawEditor] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const compiledPrompt = useMemo(() => {
    return buildExpandedPrompt(formData, currentFont, currentColor, currentAnim);
  }, [formData, currentFont, currentColor, currentAnim]);

  const activePromptText = useMemo(() => {
    if (isRawEditor && customPrompt.trim().length > 0) {
      return customPrompt;
    }
    return compiledPrompt;
  }, [isRawEditor, customPrompt, compiledPrompt]);

  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    sound.playClick(1.2);
    setSelectedPresetId(preset.id);
    setFormData({ ...preset.data });
    setSelectedFontId(preset.fontId);
    setSelectedColorId(preset.colorId);
    setSelectedAnimId(preset.animId);
    setCustomPrompt(
      buildExpandedPrompt(
        preset.data,
        FONT_PAIRINGS.find((f) => f.id === preset.fontId) || FONT_PAIRINGS[0],
        COLOR_PALETTES.find((c) => c.id === preset.colorId) || COLOR_PALETTES[0],
        ANIMATIONS.find((a) => a.id === preset.animId) || ANIMATIONS[0]
      )
    );
  };

  const handleFieldChange = (field: keyof PortfolioData, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (!isRawEditor) {
        setCustomPrompt(buildExpandedPrompt(updated, currentFont, currentColor, currentAnim));
      }
      return updated;
    });
  };

  const handleCopyPrompt = useCallback(() => {
    sound.playSwitch(true);
    navigator.clipboard.writeText(activePromptText).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = activePromptText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  }, [activePromptText]);

  const handleTestToast = () => {
    sound.playTap();
    setToastMessage(`Email copied: ${formData.contact.split('·')[0].trim() || 'hi@developer.dev'}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const wordCount = useMemo(() => {
    return activePromptText.trim().split(/\s+/).filter(Boolean).length;
  }, [activePromptText]);

  const charCount = activePromptText.length;
  const approxTokens = Math.round(charCount / 4);

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 md:p-7 max-w-7xl mx-auto select-none font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#11100E] font-bold">
            25 / Portfolio Prompt Sandbox
          </span>
          <span className="text-[#77736B] text-xs font-mono hidden md:inline">
            · 2-Color Rule & Swiss Precision
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

      {/* Subheader: Clean Headline and Mode Tabs */}
      <div className="pt-2 pb-2 shrink-0 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#11100E]">
            DESIGN YOUR ZERO-SLOP PORTFOLIO
          </h2>
          <p className="text-xs text-[#77736B] font-medium mt-0.5">
            Craft your custom portfolio prompt with strict 2-color discipline, typography pairings, and tactile animation physics.
          </p>
        </div>

        {/* Right Pane View Switcher */}
        <div className="flex items-center gap-1 bg-[#E8E3D8] p-0.5 rounded-lg border border-[#11100E]/10 font-mono text-[11px]">
          <button
            onClick={() => {
              sound.playClick(1.0);
              setRightViewMode('prompt');
            }}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
              rightViewMode === 'prompt'
                ? 'bg-[#11100E] text-[#F5F1E8] font-bold shadow-sm'
                : 'text-[#77736B] hover:text-[#11100E]'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>PROMPT CODE</span>
          </button>

          <button
            onClick={() => {
              sound.playClick(1.0);
              setRightViewMode('demo-image');
            }}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
              rightViewMode === 'demo-image'
                ? 'bg-[#11100E] text-[#F5F1E8] font-bold shadow-sm'
                : 'text-[#77736B] hover:text-[#11100E]'
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            <span>DEMO MOCKUP</span>
          </button>

          <button
            onClick={() => {
              sound.playClick(1.0);
              setRightViewMode('live-preview');
            }}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
              rightViewMode === 'live-preview'
                ? 'bg-[#11100E] text-[#F5F1E8] font-bold shadow-sm'
                : 'text-[#77736B] hover:text-[#11100E]'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>LIVE INTERACTIVE</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid (Two Columns) */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 pb-2 items-stretch">
        {/* Left Column: Form & Design System Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-[#11100E]/15 bg-[#F5F1E8] shadow-sm overflow-hidden">
          {/* Presets & Config Bar */}
          <div className="p-2 border-b border-[#11100E]/15 bg-[#EFEBE0] flex items-center justify-between gap-1 shrink-0">
            <div className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-[#77736B]" />
              <span className="font-mono text-[10px] font-bold text-[#11100E] uppercase">PRESETS</span>
            </div>
            <div className="flex items-center gap-1">
              {PRESETS.map((p) => {
                const isSelected = selectedPresetId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#11100E] text-[#F5F1E8] shadow-sm font-bold'
                        : 'bg-[#F5F1E8] text-[#77736B] hover:text-[#11100E] border border-[#11100E]/10'
                    }`}
                  >
                    {p.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Left Sub-Tabs: Content vs Design System */}
          <div className="px-3 pt-2 pb-1 border-b border-[#11100E]/10 flex gap-4 text-xs font-mono shrink-0">
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
              1. PORTFOLIO DATA
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
              <span>2. DESIGN SYSTEM & RULES</span>
            </button>
          </div>

          {/* Tab 1: Portfolio Content Editor */}
          {leftTab === 'content' && (
            <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2 font-mono text-xs prevent-slide-wheel">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    className="w-full px-2 py-1 rounded-lg border border-[#11100E]/20 bg-white text-[#11100E] text-xs font-sans focus:outline-none focus:border-[#11100E] prevent-space-nav"
                    placeholder="e.g. Arron Parejas"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">Title / Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => handleFieldChange('role', e.target.value)}
                    className="w-full px-2 py-1 rounded-lg border border-[#11100E]/20 bg-white text-[#11100E] text-xs font-sans focus:outline-none focus:border-[#11100E] prevent-space-nav"
                    placeholder="e.g. Full-Stack Engineer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">
                  Bio / Hero Statement
                </label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => handleFieldChange('bio', e.target.value)}
                  className="w-full px-2 py-1 rounded-lg border border-[#11100E]/20 bg-white text-[#11100E] text-xs font-sans focus:outline-none focus:border-[#11100E] resize-none prevent-space-nav"
                  placeholder="What do you build? Who is it for?"
                />
              </div>

              {/* 3 Featured Projects */}
              <div className="border-t border-[#11100E]/10 pt-1.5">
                <span className="block text-[9px] font-bold uppercase text-[#77736B] mb-1">
                  3 Featured Projects (Title & Impact)
                </span>
                <div className="space-y-1">
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={formData.proj1Title}
                      onChange={(e) => handleFieldChange('proj1Title', e.target.value)}
                      className="w-1/3 px-2 py-0.5 rounded border border-[#11100E]/20 bg-white text-[11px] font-bold font-sans text-[#11100E] prevent-space-nav"
                      placeholder="Project 1"
                    />
                    <input
                      type="text"
                      value={formData.proj1Desc}
                      onChange={(e) => handleFieldChange('proj1Desc', e.target.value)}
                      className="w-2/3 px-2 py-0.5 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                      placeholder="Short description"
                    />
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={formData.proj2Title}
                      onChange={(e) => handleFieldChange('proj2Title', e.target.value)}
                      className="w-1/3 px-2 py-0.5 rounded border border-[#11100E]/20 bg-white text-[11px] font-bold font-sans text-[#11100E] prevent-space-nav"
                      placeholder="Project 2"
                    />
                    <input
                      type="text"
                      value={formData.proj2Desc}
                      onChange={(e) => handleFieldChange('proj2Desc', e.target.value)}
                      className="w-2/3 px-2 py-0.5 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                      placeholder="Short description"
                    />
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={formData.proj3Title}
                      onChange={(e) => handleFieldChange('proj3Title', e.target.value)}
                      className="w-1/3 px-2 py-0.5 rounded border border-[#11100E]/20 bg-white text-[11px] font-bold font-sans text-[#11100E] prevent-space-nav"
                      placeholder="Project 3"
                    />
                    <input
                      type="text"
                      value={formData.proj3Desc}
                      onChange={(e) => handleFieldChange('proj3Desc', e.target.value)}
                      className="w-2/3 px-2 py-0.5 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                      placeholder="Short description"
                    />
                  </div>
                </div>
              </div>

              {/* Tech Stack & Contact */}
              <div className="grid grid-cols-2 gap-2 border-t border-[#11100E]/10 pt-1.5">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">Tech Stack</label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => handleFieldChange('techStack', e.target.value)}
                    className="w-full px-2 py-1 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                    placeholder="Next.js, Tailwind, TS..."
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">Contact / Socials</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => handleFieldChange('contact', e.target.value)}
                    className="w-full px-2 py-1 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                    placeholder="email, x, github..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Design System & 2-Color Rule & Fonts & Animation */}
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

              {/* Animation & Micro-Interactions */}
              <div className="border-t border-[#11100E]/10 pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase text-[#11100E] flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-600" />
                    ANIMATION & MICRO-INTERACTIONS
                  </span>
                  <span className="text-[9px] text-[#77736B]">Physics & Springs</span>
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

          {/* Bottom Bar: Mode Toggle */}
          <div className="p-2 border-t border-[#11100E]/15 bg-[#EFEBE0] text-[10px] font-mono text-[#77736B] flex items-center justify-between shrink-0">
            <span>Live compilation into AI Studio prompt</span>
            <button
              onClick={() => {
                sound.playClick(1.1);
                setIsRawEditor((prev) => !prev);
              }}
              className="text-[#11100E] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isRawEditor ? 'Return to Form' : 'Direct Edit Markdown'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Pane (Prompt / Demo Image / Live Interactive) (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#11100E] bg-[#11100E] text-[#F5F1E8] shadow-md overflow-hidden">
          {/* Header Bar */}
          <div className="px-3 py-2 border-b border-white/10 bg-black/40 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#D8D3C8]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#F5F1E8]">
                {rightViewMode === 'prompt' && 'GOOGLE AI STUDIO PROMPT'}
                {rightViewMode === 'demo-image' && 'HIGH-RESOLUTION PORTFOLIO DEMO MOCKUP'}
                {rightViewMode === 'live-preview' && 'LIVE INTERACTIVE COMPONENT PREVIEW'}
              </span>
              {rightViewMode === 'prompt' && (
                <span className="text-[10px] font-mono text-white/40">
                  {wordCount} words · ~{approxTokens} tokens
                </span>
              )}
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

          {/* VIEW 1: PROMPT CODE VIEWER / RAW EDITOR */}
          {rightViewMode === 'prompt' && (
            <div className="flex-1 min-h-0 relative p-3 overflow-y-auto prevent-slide-wheel bg-[#11100E]">
              {isRawEditor ? (
                <textarea
                  value={activePromptText}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="w-full h-full min-h-[300px] bg-transparent text-[#F5F1E8] font-mono text-[11px] leading-relaxed resize-none focus:outline-none border-0 p-0 prevent-space-nav"
                  placeholder="Write or edit prompt directly..."
                />
              ) : (
                <pre className="font-mono text-[11px] text-[#D8D3C8] whitespace-pre-wrap leading-relaxed select-text font-normal">
                  {activePromptText}
                </pre>
              )}
            </div>
          )}

          {/* VIEW 2: DEMO IMAGE (MOCKUP OF GENERATED RESULT) */}
          {rightViewMode === 'demo-image' && (
            <div className="flex-1 min-h-0 relative p-3 overflow-y-auto prevent-slide-wheel bg-[#181715] flex flex-col items-center justify-center">
              {/* Browser Window Frame */}
              <div className="w-full max-w-2xl rounded-xl border border-white/15 bg-[#11100E] shadow-2xl overflow-hidden">
                {/* Browser Title Bar */}
                <div className="px-3 py-1.5 bg-black/60 border-b border-white/10 flex items-center justify-between font-mono text-[10px] text-white/50">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-white/80 font-bold tracking-wider">
                    https://{formData.name.toLowerCase().replace(/\s+/g, '')}.dev
                  </span>
                  <div className="flex items-center gap-1 text-[9px] text-white/40">
                    <span>100% SCALE</span>
                  </div>
                </div>

                {/* Actual Generated Demo Image */}
                <div className="relative group bg-[#F5F1E8] overflow-hidden">
                  <img
                    src="/assets/images/portfolio_demo.jpg"
                    alt="Portfolio Demo Mockup"
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  {/* Subtle overlay indicator */}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[9px] tracking-wider uppercase backdrop-blur-sm">
                    Swiss Brutalism · 2-Color Rule
                  </div>
                </div>

                {/* Mockup Annotation Bar */}
                <div className="p-2.5 bg-[#11100E] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#D8D3C8]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Pure typography, 0 emojis, 0 purple/green gradients, 100% tactile responsive layout.</span>
                  </div>
                  <button
                    onClick={() => setRightViewMode('prompt')}
                    className="text-[#F5F1E8] underline hover:text-white cursor-pointer"
                  >
                    View Prompt ➔
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: LIVE INTERACTIVE COMPONENT PREVIEW */}
          {rightViewMode === 'live-preview' && (
            <div
              className="flex-1 min-h-0 relative p-4 overflow-y-auto prevent-slide-wheel flex flex-col justify-between transition-colors duration-300"
              style={{
                backgroundColor: currentColor.bgHex,
                color: currentColor.textHex,
              }}
            >
              {/* Toast Feedback */}
              {toastMessage && (
                <div className="absolute top-3 right-3 z-30 px-3 py-1.5 rounded-lg bg-[#11100E] text-[#F5F1E8] font-mono text-[10px] font-bold shadow-lg animate-bounce border border-white/20">
                  ✓ {toastMessage}
                </div>
              )}

              {/* Mini Website Header */}
              <div
                className="flex items-center justify-between pb-2.5 border-b shrink-0"
                style={{ borderColor: currentColor.borderHex }}
              >
                <div className="flex items-center gap-2 font-mono text-xs font-black tracking-wider">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: currentColor.accentHex }}
                  />
                  <span>{formData.name.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="opacity-60 hidden sm:inline">WORK / ABOUT / CONTACT</span>
                  <button
                    onClick={handleTestToast}
                    className="px-2.5 py-1 rounded border font-bold cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-sm"
                    style={{
                      backgroundColor: currentColor.textHex,
                      color: currentColor.bgHex,
                      borderColor: currentColor.textHex,
                    }}
                  >
                    COPY EMAIL
                  </button>
                </div>
              </div>

              {/* Mini Hero Area */}
              <div className="my-auto py-3 space-y-2">
                <div className="font-mono text-[9px] uppercase tracking-widest opacity-60">
                  {formData.role} · {currentFont.name} · {currentColor.name}
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                  {formData.name.toUpperCase()} — {formData.role.toUpperCase()}.
                </h1>
                <p className="text-xs max-w-xl opacity-80 leading-relaxed font-sans font-medium">
                  {formData.bio}
                </p>

                {/* 3 Interactive Project Cards */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {[
                    { title: formData.proj1Title, desc: formData.proj1Desc, tag: '01' },
                    { title: formData.proj2Title, desc: formData.proj2Desc, tag: '02' },
                    { title: formData.proj3Title, desc: formData.proj3Desc, tag: '03' },
                  ].map((p) => (
                    <div
                      key={p.tag}
                      onClick={() => sound.playClick(1.2)}
                      className="p-2.5 rounded-lg border group cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:shadow-md"
                      style={{
                        borderColor: currentColor.borderHex,
                        backgroundColor: currentColor.bgHex === '#11100E' ? '#181715' : '#FFFFFF',
                      }}
                    >
                      <div className="flex items-center justify-between text-[9px] font-mono opacity-50 mb-1">
                        <span>{p.tag}</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <div className="font-bold text-[11px] truncate mb-0.5">{p.title}</div>
                      <div className="text-[9px] opacity-70 line-clamp-2 leading-snug">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Footer */}
              <div
                className="pt-2 border-t flex items-center justify-between text-[9px] font-mono opacity-60 shrink-0"
                style={{ borderColor: currentColor.borderHex }}
              >
                <span>NO EMOJIS · 2-COLOR RULE APPLIED</span>
                <span className="font-bold">CLICK CARDS TO TEST TACTILE FEEL</span>
              </div>
            </div>
          )}

          {/* Prompt Sandbox Footer Instructions */}
          <div className="px-3 py-2 border-t border-white/10 bg-black/30 flex items-center justify-between text-[10px] font-mono text-[#D8D3C8]/70 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Paste into Gemini 2.0 Flash / 1.5 Pro in Google AI Studio to generate in 1-shot.</span>
            </div>
            <button
              onClick={() => {
                sound.playTap();
                handleSelectPreset(PRESETS[0]);
                setIsRawEditor(false);
              }}
              className="hover:text-white underline cursor-pointer text-[#D8D3C8]/50"
            >
              Reset Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Slide Bottom Bar */}
      <div className="pt-1.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B] shrink-0">
        <span>Prompting with Taste: Swiss Layout + Typography Hierarchy + 2-Color Rule</span>
        <span>25 / 28</span>
      </div>
    </div>
  );
};
