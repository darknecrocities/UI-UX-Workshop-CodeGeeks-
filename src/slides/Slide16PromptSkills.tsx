import React, { useState } from 'react';
import { sound } from '../audio/sound';
import {
  Cpu,
  Copy,
  Check,
  Sliders,
  Palette,
  Type,
  Activity,
  ShieldAlert,
  Code2,
} from 'lucide-react';

interface PromptConfig {
  theme: string;
  colors: string;
  typography: string;
  spatial: string;
  motion: string;
  audio: string;
  antiSlop: boolean;
}

export const Slide16PromptSkills: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [config, setConfig] = useState<PromptConfig>({
    theme: 'Clean Minimalist',
    colors: 'Warm Parchment (#E9E1D3) + Near-Black Ink (#11100E) + Semantic Green/Red',
    typography: 'IBM Plex Mono (11-13px tabular) + Inter Display (Major Third 1.25 scale)',
    spatial: 'Strict 8pt grid rhythm (8, 16, 24, 32px), 12px squircle radiuses',
    motion: 'Spring physics (stiffness: 280, damping: 22, max duration: 250ms)',
    audio: 'Web Audio mechanical switch thock/thack synthesis on click + active press depression',
    antiSlop: true,
  });

  const themes = [
    {
      name: 'Clean Minimalist',
      colors: 'Warm Parchment (#E9E1D3) + Near-Black Ink (#11100E) + Semantic Green/Red',
      typography: 'IBM Plex Mono (11-13px tabular) + Inter Display (Major Third 1.25 scale)',
      spatial: 'Strict 8pt grid rhythm (8, 16, 24, 32px), 12px squircle radiuses',
      motion: 'Spring physics (stiffness: 280, damping: 22, max duration: 250ms)',
      audio: 'Web Audio mechanical switch thock/thack synthesis on click + active press depression',
    },
    {
      name: 'High-Density Developer Console',
      colors: 'Deep Slate (#0F172A) + Cyan Accent (#22D3EE) + Emerald (#10B981)',
      typography: 'JetBrains Mono / Fira Code throughout, tabular numerals, 11px compact',
      spatial: '4pt micro-matrix, 4px subtle radiuses, 1px technical borders',
      motion: 'Instantaneous 120ms transitions, zero bouncy float delay',
      audio: 'High-frequency tick-clack mechanical audio triggers on commit',
    },
    {
      name: 'Literate Editorial Journal',
      colors: 'Ivory Cream (#FFFEF7) + Charcoal (#1C1917) + Burgundy Accent (#991B1B)',
      typography: 'Editorial Serif / Newsreader titles + 65ch measure body paragraphs',
      spatial: 'Generous 32px/48px vertical rhythm, asymmetric margins',
      motion: 'Soft 300ms cubic-bezier page turn and opacity fade',
      audio: 'Muted acoustic leaf bump feedback on link navigation',
    },
    {
      name: 'Neo-Brutalist Hardware HUD',
      colors: 'High-contrast Zinc (#FAFAFA) + Jet Black (#000000) + Safety Yellow (#FACC15)',
      typography: 'Space Grotesk + Heavy Uppercase Mono, tight tracking (-0.04em)',
      spatial: 'Zero radius (0px sharp corners), 2px solid ink outlines, 8px rigid grid',
      motion: 'Snap layout shifts with zero easing curve (mechanical relay feel)',
      audio: 'Heavy tactile switch bottom-out clack on every button action',
    },
  ];

  const generatedPrompt = `SYSTEM ROLE: Senior UI/UX Design Technologist & Systems Architect.
GOAL: Generate a production-ready, zero-slop web interface adhering to strict visual constraints.

DESIGN SPECIFICATION:
- THEME ARCHETYPE: ${config.theme}
- COLOR PALETTE: ${config.colors}
  * Strictly enforce 60-30-10 distribution rule (60% canvas, 30% structure, 10% semantic intent).
  * Guarantee WCAG 2.1 AA/AAA contrast ratios (minimum 4.5:1 for body, 7:1 for tables).
- TYPOGRAPHY SYSTEM: ${config.typography}
  * Cap maximum line measure at 65 characters (max-w-prose).
  * Enforce tabular numbers for all metrics and prices (font-variant-numeric: tabular-nums).
- SPACING & GRID: ${config.spatial}
  * All paddings, margins, gutters, and element heights MUST be multiples of 4 or 8px.
- MOTION & PHYSICS: ${config.motion}
  * Animate only to explain state changes or object permanence. Never animate for generic decoration.
- TACTILE FEEDBACK & SFX: ${config.audio}
  * Provide physical press states (translate-y-0.5, shadow collapse) on all clickable surfaces.

${
  config.antiSlop
    ? `NEGATIVE CONSTRAINTS (MANDATORY ZERO-SLOP FILTER):
- DO NOT use generic purple/indigo Gaussian blur gradient overlays or glowing blobs.
- DO NOT use 30px+ lozenge pill-rounded cards that destroy interior reading surface.
- DO NOT write placeholder SaaS marketing copy ("Unlock Next-Gen Synergy"). Use concrete metrics.
- DO NOT introduce arbitrary paddings (e.g. p-[13px], gap-7). Lock to 8pt design tokens.
- DO NOT leave native OS form elements or scrollbars unstyled.
- DO NOT skip empty, loading, or error states. Always include skeleton and recovery UI.`
    : ''
}

OUTPUT: Fully functional React + TypeScript + Vanilla/Tailwind CSS with cohesive component hierarchy.`;

  const copyToClipboard = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-7 md:p-9 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            17 / Design Prompt Builder
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={copyToClipboard}
            className="px-3.5 py-1.5 rounded-lg bg-[#11100E] text-[#F5F1E8] font-bold hover:bg-black cursor-pointer flex items-center gap-1.5 shadow-sm active:translate-y-0.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5 text-[#F59E0B]" />}
            <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY SYSTEM PROMPT'}</span>
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="my-auto py-1 space-y-3">
        <div>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight text-[#11100E]">
            BETTER WORDS, BETTER SCREENS.
          </h2>
          <p className="mt-0.5 text-xs text-[#77736B] font-medium">
            Vague prompts say "make a nice app". Great prompts give exact colors, fonts, and clear rules:
          </p>
        </div>

        {/* 4 Theme Archetypes Quick Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
          {themes.map((t) => {
            const isSelected = config.theme === t.name;
            return (
              <button
                key={t.name}
                onClick={() => {
                  sound.playClick(1.2);
                  setConfig((prev) => ({
                    ...prev,
                    theme: t.name,
                    colors: t.colors,
                    typography: t.typography,
                    spatial: t.spatial,
                    motion: t.motion,
                    audio: t.audio,
                  }));
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-sm font-bold ring-2 ring-[#11100E]/20'
                    : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wide truncate">{t.name}</div>
                <div className={`text-[9px] mt-1 truncate ${isSelected ? 'text-white/70' : 'text-[#77736B]'}`}>
                  {t.colors.split('+')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Prompt Matrix & Output Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch font-mono text-xs">
          {/* Parameter Config Panel (5 cols) */}
          <div className="lg:col-span-5 p-4 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-1.5">
              <span className="font-bold text-[11px] text-[#11100E]">DESIGN TOKEN DIRECTIVES</span>
              <span className="text-[10px] text-[#77736B]">REAL-TIME CONSTRUCTOR</span>
            </div>

            <div className="space-y-2 text-[10px]">
              {/* Color directive */}
              <div className="p-2 bg-white rounded-lg border border-[#11100E]/10">
                <div className="text-[#77736B] uppercase font-bold flex items-center gap-1">
                  <Palette className="w-3 h-3 text-[#11100E]" />
                  <span>Color & Semantic Ratio</span>
                </div>
                <div className="text-[#11100E] font-medium mt-0.5">{config.colors}</div>
              </div>

              {/* Typography directive */}
              <div className="p-2 bg-white rounded-lg border border-[#11100E]/10">
                <div className="text-[#77736B] uppercase font-bold flex items-center gap-1">
                  <Type className="w-3 h-3 text-[#11100E]" />
                  <span>Typography Scale & Measure</span>
                </div>
                <div className="text-[#11100E] font-medium mt-0.5">{config.typography}</div>
              </div>

              {/* Spatial directive */}
              <div className="p-2 bg-white rounded-lg border border-[#11100E]/10">
                <div className="text-[#77736B] uppercase font-bold flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-[#11100E]" />
                  <span>Spacing & Corner Radius</span>
                </div>
                <div className="text-[#11100E] font-medium mt-0.5">{config.spatial}</div>
              </div>

              {/* Motion & Audio directive */}
              <div className="p-2 bg-white rounded-lg border border-[#11100E]/10">
                <div className="text-[#77736B] uppercase font-bold flex items-center gap-1">
                  <Activity className="w-3 h-3 text-[#11100E]" />
                  <span>Motion Physics & Audio SFX</span>
                </div>
                <div className="text-[#11100E] font-medium mt-0.5">{config.motion}</div>
              </div>

              {/* Anti-Slop Checkbox */}
              <div
                onClick={() => {
                  sound.playClick(1.2);
                  setConfig((p) => ({ ...p, antiSlop: !p.antiSlop }));
                }}
                className={`p-2 rounded-lg border cursor-pointer flex items-center justify-between transition-colors ${
                  config.antiSlop
                    ? 'bg-[#16A34A]/10 border-[#16A34A]/30 text-[#16A34A]'
                    : 'bg-white border-[#11100E]/15 text-[#77736B]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>ENFORCE NEGATIVE CONSTRAINTS (ANTI-SLOP)</span>
                </div>
                <span className="font-mono text-[9px]">{config.antiSlop ? 'ENABLED' : 'DISABLED'}</span>
              </div>
            </div>
          </div>

          {/* Generated Code Terminal Output (7 cols) */}
          <div className="lg:col-span-7 p-4 rounded-2xl bg-[#11100E] text-[#F5F1E8] border border-white/10 flex flex-col justify-between shadow-xl max-h-[300px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[10px] text-white/60">
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-white font-bold">GENERATED DESIGN PROMPT</span>
              </div>
              <span>Ready for Claude / Gemini / GPT-4</span>
            </div>

            <pre className="my-2 p-2 rounded-lg bg-black/40 text-[10px] text-white/80 overflow-y-auto leading-relaxed font-mono whitespace-pre-wrap flex-1 max-h-[220px]">
              {generatedPrompt}
            </pre>

            <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-white/60">
              <span>Clear rules guarantee clean, polished screens every time</span>
              <button
                onClick={copyToClipboard}
                className="text-amber-400 font-bold hover:underline cursor-pointer"
              >
                {copied ? '✓ Prompt Copied' : 'Copy Prompt →'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Clear instructions in your prompt mean clean screens from the AI.</span>
        <span>17 / 26</span>
      </div>
    </div>
  );
};
