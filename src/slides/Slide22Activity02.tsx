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
  Sparkles,
  Ban,
  Sliders,
  Edit3,
  Terminal,
} from 'lucide-react';

interface PortfolioTemplate {
  id: string;
  presetName: string;
  name: string;
  role: string;
  tone: string;
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

const PRESETS: PortfolioTemplate[] = [
  {
    id: 'minimalist-dev',
    presetName: 'Minimalist Engineer',
    name: 'Arron Parejas',
    role: 'Full-Stack Engineer & AI Toolmaker',
    tone: 'Monochrome Swiss Brutalism with crisp monospace typography and warm bone accents',
    bio: 'I build tangible, low-latency developer tools and agentic web apps. Zero AI slop.',
    proj1Title: 'DomoSkills',
    proj1Desc: 'Open-source registry and visual workflow composer for agentic skills.',
    proj2Title: 'DomoDomo',
    proj2Desc: 'High-speed browser utilities and local keyboard-driven shortcuts.',
    proj3Title: 'KeyPulse',
    proj3Desc: 'Physical-feeling tactile Web Audio synthesizer with millisecond feedback.',
    techStack: 'Next.js 14, TypeScript, Tailwind CSS, Web Audio API, Zustand, SQLite',
    contact: 'arron@domodomo.site · GitHub: @arronkian · X: @arronparejas',
  },
  {
    id: 'product-designer',
    presetName: 'Product Designer',
    name: 'Alex Rivera',
    role: 'Staff Product & Interaction Designer',
    tone: 'Editorial Swiss typography with warm parchment (#F5F1E8) and deep charcoal (#11100E)',
    bio: 'Designing software that feels physical, calm, and unmistakably human.',
    proj1Title: 'Slate Design System',
    proj1Desc: 'Accessible, token-driven component architecture for high-velocity teams.',
    proj2Title: 'Kairo Focus',
    proj2Desc: 'Minimalist calendar and time-blocking desktop app with tactile micro-interactions.',
    proj3Title: 'Monolith Editorial',
    proj3Desc: 'Independent publication exploring craft, physical materials, and humane tech.',
    techStack: 'Figma, React, Tailwind CSS, Framer Motion, Radix UI, Accessible Tokens',
    contact: 'alex@rivera.design · Read.cv: @alexrivera · Bluesky: @alex.rivera',
  },
  {
    id: 'creative-ai',
    presetName: 'Creative Technologist',
    name: 'Jordan Chen',
    role: 'Creative Developer & AI Systems Builder',
    tone: 'High-density computational aesthetic, bone-white surfaces, and tactile hairline borders',
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
];

const buildPrompt = (tpl: PortfolioTemplate): string => {
  return `You are a world-class Senior Design Technologist and Frontend Engineer who crafts award-winning, editorial-grade web experiences.

### GOAL:
Build a complete, single-file, production-ready interactive Personal Portfolio website for:
- NAME: ${tpl.name}
- TITLE / ROLE: ${tpl.role}
- DESIGN VIBE / TONE: ${tpl.tone}
- BIO / HERO STATEMENT: "${tpl.bio}"

### STRICT DESIGN CONSTRAINTS (NO AI SLOP):
1. NO EMOJIS: Do NOT use emojis (🚀, 💡, 🔥, ✨, 🧠, ⚡, 💻, 🎯, etc.) anywhere on the page—not in titles, not in bullet points, and not as pseudo-icons. Emojis look amateurish and scream "AI generated". Use clean semantic SVG icons (Lucide / Heroicons style) or pure typographic hierarchy.
2. NO GLOWY AI SLOP GRADIENTS: Absolutely NO generic AI purple (#8B5CF6, #A855F7), violet neon drop-shadows, or neon green (#22C55E, #10B981) cards. Do NOT use blurry colored background blobs or over-saturated gradient borders.
3. CURATED COLOR PALETTE:
   - Primary Surface: Warm Parchment (#F5F1E8) or Crisp Chalk (#FAFAF8)
   - Dark Contrast Surface: Deep Obsidian Charcoal (#11100E)
   - Hairline Borders: 1px subtle divider (#11100E at 15% opacity, or #E2DDD5)
   - Typography: High contrast charcoal (#11100E) for headings, muted graphite (#77736B) for metadata and captions.
4. TYPOGRAPHIC MASTERY:
   - Headings: Bold, tight-tracking grotesque or geometric sans-serif (e.g. Inter / Space Grotesk / Outfit).
   - Metadata & Tags: Crisp monospace font (e.g. JetBrains Mono, Fira Code) in uppercase with wide letter-spacing.
   - Generous Whitespace: Let the content breathe with an intentional 8px grid rhythm.
5. TACTILE & RESPONSIVE:
   - Fast, tactile hover transitions (150ms ease-out).
   - Fully responsive layout that looks breathtaking on mobile, tablet, and desktop.

### FEATURED PROJECTS TO SHOWCASE:
1. ${tpl.proj1Title}: ${tpl.proj1Desc}
2. ${tpl.proj2Title}: ${tpl.proj2Desc}
3. ${tpl.proj3Title}: ${tpl.proj3Desc}

### TECH STACK & SKILLS:
${tpl.techStack}

### KEY SECTIONS TO INCLUDE:
1. Minimal Sticky Header: Monogram/logo, live status badge ("AVAILABLE FOR WORK"), smooth navigation links, and a tactile "Copy Email" button.
2. Hero Section: Asymmetrical editorial layout with an oversized punchy headline, role credentials, and clean primary action buttons.
3. Selected Works Grid: 3 project cards featuring project category pill, title, concise description, tech tags, and external link arrow icon.
4. Experience & Tech Stack: Two-column layout with clean date ranges, organizations, and roles.
5. Philosophy / Craft Rules: 3 short, sharp principles on design judgment, performance, and simplicity.
6. Footer & Contact: Direct email copy interaction with toast feedback ("Email copied!"), GitHub, and social links:
   ${tpl.contact}

### DELIVERABLE FORMAT:
Provide the complete, self-contained HTML file with Tailwind CSS (via CDN) and vanilla JavaScript for interactivity (or a single React JSX component). Include working interactive state for the email copy button, project link hover states, and theme/sound toggle. Do NOT leave placeholder comments or "TODOs"—write all real markup and styles ready to preview immediately in Google AI Studio.`;
};

export const Slide22Activity02: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('minimalist-dev');
  const [formData, setFormData] = useState<PortfolioTemplate>(PRESETS[0]);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isRawEditor, setIsRawEditor] = useState<boolean>(false);
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

  // Active prompt calculation
  const activePromptText = useMemo(() => {
    if (isRawEditor && customPrompt.trim().length > 0) {
      return customPrompt;
    }
    return buildPrompt(formData);
  }, [isRawEditor, customPrompt, formData]);

  const handleSelectPreset = (preset: PortfolioTemplate) => {
    sound.playClick(1.2);
    setSelectedPresetId(preset.id);
    setFormData({ ...preset });
    setCustomPrompt(buildPrompt(preset));
  };

  const handleFieldChange = (field: keyof PortfolioTemplate, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (!isRawEditor) {
        setCustomPrompt(buildPrompt(updated));
      }
      return updated;
    });
  };

  const handleCopyPrompt = useCallback(() => {
    sound.playSwitch(true);
    navigator.clipboard.writeText(activePromptText).catch(() => {
      // Fallback
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

  const wordCount = useMemo(() => {
    return activePromptText.trim().split(/\s+/).filter(Boolean).length;
  }, [activePromptText]);

  const charCount = activePromptText.length;
  const approxTokens = Math.round(charCount / 4);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-7 md:p-8 max-w-7xl mx-auto select-none font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#11100E] font-bold">
            25 / Activity 02: Portfolio Prompt Sandbox
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded bg-[#11100E]/5 text-[#77736B] border border-[#11100E]/10">
            AI STUDIO COMPATIBLE
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

      {/* Subheader: Clear Rules & Constraints */}
      <div className="pt-2 pb-2 shrink-0 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#11100E]">
            DESIGN YOUR PORTFOLIO PROMPT
          </h2>
          <p className="text-xs text-[#77736B] font-medium mt-0.5">
            Customize your details below or pick a preset. Then copy this zero-slop prompt directly into Google AI Studio.
          </p>
        </div>

        {/* Strict Constraint Pills */}
        <div className="flex items-center gap-1.5 flex-wrap font-mono text-[10px]">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-700 border border-red-500/20 font-semibold">
            <Ban className="w-2.5 h-2.5" /> NO EMOJIS
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-700 border border-red-500/20 font-semibold">
            <Ban className="w-2.5 h-2.5" /> NO PURPLE / GREEN GLOWS
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#11100E]/10 text-[#11100E] border border-[#11100E]/20 font-semibold">
            <Sparkles className="w-2.5 h-2.5" /> REAL SVG ICONS
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#11100E]/10 text-[#11100E] border border-[#11100E]/20 font-semibold">
            ✓ SWISS PALETTE
          </span>
        </div>
      </div>

      {/* Main Sandbox Grid (Two Columns) */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 pb-2 items-stretch">
        {/* Left Column: Form & Presets (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-[#11100E]/15 bg-[#F5F1E8] shadow-sm overflow-hidden">
          {/* Preset Selector Bar */}
          <div className="p-2.5 border-b border-[#11100E]/15 bg-[#EFEBE0] flex items-center justify-between gap-1 shrink-0">
            <div className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-[#77736B]" />
              <span className="font-mono text-[11px] font-bold text-[#11100E] uppercase">PRESETS</span>
            </div>
            <div className="flex items-center gap-1">
              {PRESETS.map((p) => {
                const isSelected = selectedPresetId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#11100E] text-[#F5F1E8] shadow-sm font-bold'
                        : 'bg-[#F5F1E8] text-[#77736B] hover:text-[#11100E] border border-[#11100E]/10'
                    }`}
                  >
                    {p.presetName.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Fields Container (Scrollable) */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5 font-mono text-xs prevent-slide-wheel">
            {/* Name and Role */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className="w-full px-2 py-1.5 rounded-lg border border-[#11100E]/20 bg-white text-[#11100E] text-xs font-sans focus:outline-none focus:border-[#11100E] prevent-space-nav"
                  placeholder="e.g. Arron Parejas"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">Title / Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleFieldChange('role', e.target.value)}
                  className="w-full px-2 py-1.5 rounded-lg border border-[#11100E]/20 bg-white text-[#11100E] text-xs font-sans focus:outline-none focus:border-[#11100E] prevent-space-nav"
                  placeholder="e.g. Full-Stack Engineer"
                />
              </div>
            </div>

            {/* Bio / Headline */}
            <div>
              <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">
                Bio / Hero Statement (Punchy & Clear)
              </label>
              <textarea
                rows={2}
                value={formData.bio}
                onChange={(e) => handleFieldChange('bio', e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg border border-[#11100E]/20 bg-white text-[#11100E] text-xs font-sans focus:outline-none focus:border-[#11100E] resize-none prevent-space-nav"
                placeholder="What do you build? Who is it for?"
              />
            </div>

            {/* Aesthetic Tone */}
            <div>
              <label className="block text-[9px] font-bold uppercase text-[#77736B] mb-0.5">
                Design Vibe / Tone
              </label>
              <input
                type="text"
                value={formData.tone}
                onChange={(e) => handleFieldChange('tone', e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg border border-[#11100E]/20 bg-white text-[#11100E] text-xs font-sans focus:outline-none focus:border-[#11100E] prevent-space-nav"
                placeholder="e.g. Swiss Brutalism with warm bone parchment"
              />
            </div>

            {/* 3 Featured Projects */}
            <div className="border-t border-[#11100E]/10 pt-2">
              <span className="block text-[9px] font-bold uppercase text-[#77736B] mb-1.5">
                3 Featured Projects (Title & 1-Line Impact)
              </span>
              <div className="space-y-1.5">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={formData.proj1Title}
                    onChange={(e) => handleFieldChange('proj1Title', e.target.value)}
                    className="w-1/3 px-2 py-1 rounded border border-[#11100E]/20 bg-white text-[11px] font-bold font-sans text-[#11100E] prevent-space-nav"
                    placeholder="Project 1"
                  />
                  <input
                    type="text"
                    value={formData.proj1Desc}
                    onChange={(e) => handleFieldChange('proj1Desc', e.target.value)}
                    className="w-2/3 px-2 py-1 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                    placeholder="Short description"
                  />
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={formData.proj2Title}
                    onChange={(e) => handleFieldChange('proj2Title', e.target.value)}
                    className="w-1/3 px-2 py-1 rounded border border-[#11100E]/20 bg-white text-[11px] font-bold font-sans text-[#11100E] prevent-space-nav"
                    placeholder="Project 2"
                  />
                  <input
                    type="text"
                    value={formData.proj2Desc}
                    onChange={(e) => handleFieldChange('proj2Desc', e.target.value)}
                    className="w-2/3 px-2 py-1 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                    placeholder="Short description"
                  />
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={formData.proj3Title}
                    onChange={(e) => handleFieldChange('proj3Title', e.target.value)}
                    className="w-1/3 px-2 py-1 rounded border border-[#11100E]/20 bg-white text-[11px] font-bold font-sans text-[#11100E] prevent-space-nav"
                    placeholder="Project 3"
                  />
                  <input
                    type="text"
                    value={formData.proj3Desc}
                    onChange={(e) => handleFieldChange('proj3Desc', e.target.value)}
                    className="w-2/3 px-2 py-1 rounded border border-[#11100E]/20 bg-white text-[11px] font-sans text-[#11100E] prevent-space-nav"
                    placeholder="Short description"
                  />
                </div>
              </div>
            </div>

            {/* Tech Stack & Contact */}
            <div className="grid grid-cols-2 gap-2 border-t border-[#11100E]/10 pt-2">
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

          {/* Bottom helper tip */}
          <div className="p-2 border-t border-[#11100E]/15 bg-[#EFEBE0] text-[10px] font-mono text-[#77736B] flex items-center justify-between shrink-0">
            <span>Fields dynamically compile into the prompt ➔</span>
            <button
              onClick={() => {
                sound.playClick(1.1);
                setIsRawEditor((prev) => !prev);
              }}
              className="text-[#11100E] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              {isRawEditor ? <Sliders className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
              {isRawEditor ? 'Switch to Form' : 'Direct Edit Prompt'}
            </button>
          </div>
        </div>

        {/* Right Column: Live Prompt Editor / Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#11100E] bg-[#11100E] text-[#F5F1E8] shadow-md overflow-hidden">
          {/* Header Bar */}
          <div className="px-3 py-2 border-b border-white/10 bg-black/40 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#D8D3C8]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#F5F1E8]">
                GOOGLE AI STUDIO PROMPT
              </span>
              <span className="text-[10px] font-mono text-white/40">
                {wordCount} words · ~{approxTokens} tokens
              </span>
            </div>

            {/* Quick action buttons */}
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

          {/* Prompt Viewer / Editor Body */}
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

          {/* Prompt Sandbox Footer Instructions */}
          <div className="px-3 py-2 border-t border-white/10 bg-black/30 flex items-center justify-between text-[10px] font-mono text-[#D8D3C8]/70 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Paste into Gemini 2.0 Flash / 1.5 Pro in Google AI Studio to generate in 1-shot.</span>
            </div>
            <button
              onClick={() => {
                sound.playTap();
                setFormData(PRESETS[0]);
                setSelectedPresetId('minimalist-dev');
                setCustomPrompt('');
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
      <div className="pt-2 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B] shrink-0">
        <span>Target: 1-Shot Working App with Zero Emojis and Zero Slop</span>
        <span>25 / 28</span>
      </div>
    </div>
  );
};
