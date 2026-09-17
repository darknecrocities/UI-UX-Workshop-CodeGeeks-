import React, { useState } from 'react';
import { sound } from '../audio/sound';
import {
  Type,
  Terminal,
  BookOpen,
  Smile,
  Landmark,
  LayoutGrid,
  Zap,
  Crown,
  Monitor,
  CheckCircle2,
} from 'lucide-react';

type VoiceId =
  | 'TECHNICAL'
  | 'EDITORIAL'
  | 'FRIENDLY'
  | 'INSTITUTIONAL'
  | 'SAAS'
  | 'BRUTALIST'
  | 'LUXURY'
  | 'RETRO';

interface FontVoice {
  id: VoiceId;
  label: string;
  fontName: string;
  context: string;
  sampleText: string;
  fontFamilyClass: string;
  icon: typeof Terminal;
}

interface TypographyRule {
  id: string;
  ruleTitle: string;
  ruleStandard: string;
  badSlop: string;
  uxImpact: string;
}

export const Slide07FontVoice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'VOICES' | 'RULES'>('VOICES');
  const [selectedVoice, setSelectedVoice] = useState<VoiceId>('TECHNICAL');
  const [selectedRule, setSelectedRule] = useState<number>(0);

  const voices: FontVoice[] = [
    {
      id: 'TECHNICAL',
      label: 'Technical Mono',
      fontName: 'IBM Plex Mono',
      context: 'Developer Tools, CLI Terminals & Telemetry',
      sampleText: '$ agy build --verify-types --strict=true',
      fontFamilyClass: 'font-mono',
      icon: Terminal,
    },
    {
      id: 'EDITORIAL',
      label: 'Literate Editorial',
      fontName: 'Editorial Serif / Newsreader',
      context: 'Design Essays, Documentation & Thought Leadership',
      sampleText: '"The interface requiring explanation is already broken."',
      fontFamilyClass: 'font-serif',
      icon: BookOpen,
    },
    {
      id: 'FRIENDLY',
      label: 'Friendly Humanist',
      fontName: 'Inter Rounded / Plus Jakarta',
      context: 'Consumer Onboarding, EdTech & Collaboration',
      sampleText: 'Welcome aboard! Let’s ship something delightful today.',
      fontFamilyClass: 'font-sans font-medium',
      icon: Smile,
    },
    {
      id: 'INSTITUTIONAL',
      label: 'Institutional Ledger',
      fontName: 'Helvetica Neue / Strict Inter',
      context: 'Fintech, Compliance Ledgers & Audits',
      sampleText: 'SETTLEMENT: $148,200.00 USD · CLEARED 0ms',
      fontFamilyClass: 'font-sans font-semibold tracking-tight',
      icon: Landmark,
    },
    {
      id: 'SAAS',
      label: 'High-Density SaaS',
      fontName: 'Geist / SF Pro Display',
      context: 'Analytics Dashboards & Operational Workbenches',
      sampleText: 'Pipeline #894 · 12,480 events/sec · 99.98% uptime',
      fontFamilyClass: 'font-sans tracking-tight',
      icon: LayoutGrid,
    },
    {
      id: 'BRUTALIST',
      label: 'Neo-Brutalist',
      fontName: 'Clash Display / Heavy Grotesk',
      context: 'Bold Creative Studios & Hackathon Platforms',
      sampleText: 'RADICAL RESTRAINT OVER NOISE.',
      fontFamilyClass: 'font-mono font-black uppercase tracking-tighter',
      icon: Zap,
    },
    {
      id: 'LUXURY',
      label: 'Refined Luxury',
      fontName: 'Playfair / Cormorant Garamond',
      context: 'High-Ticket Portfolios & Bespoke Goods',
      sampleText: 'Architectural precision meets timeless human craft.',
      fontFamilyClass: 'font-serif italic tracking-wide',
      icon: Crown,
    },
    {
      id: 'RETRO',
      label: 'Retro Cyberpunk',
      fontName: 'VT320 / Space Mono',
      context: 'Indie Hacker Consoles & Retro Computing',
      sampleText: 'SYS.BOOT :: MEM_OK 0x7FFF :: READY',
      fontFamilyClass: 'font-mono tracking-widest uppercase',
      icon: Monitor,
    },
  ];

  const rules: TypographyRule[] = [
    {
      id: 'MODULAR_SCALE',
      ruleTitle: 'Rule 01: Strict Modular Scale Ratio',
      ruleStandard: 'Establish a mathematical ratio (1.25 Major Third or 1.333 Perfect Fourth): 12, 14, 16, 20, 24, 32, 48px.',
      badSlop: 'Arbitrary sizes: font-size: 19px, 23px, 31px with zero ratio.',
      uxImpact: 'Enables users to instantly scan and distinguish headlines, subheads, and metadata in under 50ms.',
    },
    {
      id: 'READING_MEASURE',
      ruleTitle: 'Rule 02: Optimal Line Measure (45–75 Characters)',
      ruleStandard: 'Cap paragraph width with max-w-prose (max 65ch) so the human eye can easily track back to the next line.',
      badSlop: '100% full-width paragraphs spanning 180 characters across ultra-wide monitors.',
      uxImpact: 'Reduces reading fatigue by 40% and prevents line skipping.',
    },
    {
      id: 'LINE_HEIGHT_RATIO',
      ruleTitle: 'Rule 03: Proportional Line-Height (1.4–1.6 Body, 1.05–1.15 Display)',
      ruleStandard: 'Body text requires breathing room (line-height: 1.5); monumental titles require tight leading (line-height: 1.1).',
      badSlop: 'Applying tight leading (1.1) to body paragraphs causing descenders to collide with ascenders.',
      uxImpact: 'Maintains vertical cadence and prevents cognitive visual clutter.',
    },
    {
      id: 'WEIGHT_RESTRAINT',
      ruleTitle: 'Rule 04: Radical Weight Restraint (≤ 3 Weights)',
      ruleStandard: 'Limit any application to maximum 2–3 font weights: Regular (400), SemiBold (600), and Bold (700).',
      badSlop: 'Using Light 300, Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800, and Black 900 in one screen.',
      uxImpact: 'Fosters visual coherence and perceived luxury through intentional restraint.',
    },
    {
      id: 'TABULAR_FIGURES',
      ruleTitle: 'Rule 05: Tabular Numerics for Data Rows',
      ruleStandard: 'Always apply font-variant-numeric: tabular-nums on tables, counters, prices, and timestamps.',
      badSlop: 'Proportional numbers where "1" is narrower than "8", causing column numbers to jitter horizontally.',
      uxImpact: 'Enables instant vertical numerical comparison for financial and telemetry applications.',
    },
    {
      id: 'CONTRAST_STANDARDS',
      ruleTitle: 'Rule 06: WCAG 2.1 AA/AAA Contrast Hierarchy',
      ruleStandard: 'Primary text must exceed 7:1 contrast ratio; secondary metadata must exceed 4.5:1 against canvas.',
      badSlop: 'Faint grey text (#94A3B8 on #E2E8F0) that drops contrast to 2.2:1.',
      uxImpact: 'Ensures accessibility for low-vision users and legibility in direct sunlight.',
    },
  ];

  const currentVoice = voices.find((v) => v.id === selectedVoice) || voices[0];
  const currentRule = rules[selectedRule];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-10 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            07 / Typography System & UX Standards
          </span>
        </div>
        {/* Toggle between Voices & Rules */}
        <div className="flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => { sound.playClick(1.1); setActiveTab('VOICES'); }}
            className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'VOICES'
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] font-bold'
                : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
            }`}
          >
            8 FONT VOICES
          </button>
          <button
            onClick={() => { sound.playClick(1.1); setActiveTab('RULES'); }}
            className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'RULES'
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] font-bold'
                : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
            }`}
          >
            STANDARD UX RULES (6)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-2 space-y-3">
        <div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#11100E]">
            {activeTab === 'VOICES' ? 'STOP PICKING FONTS. PICK VOICES.' : 'STANDARD UX RULES FOR TYPOGRAPHY.'}
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-[#77736B] font-medium">
            {activeTab === 'VOICES'
              ? 'Typography communicates authority, trust, and context before a single word is parsed:'
              : 'Mathematical principles that separate high-taste engineering from arbitrary vibe coding:'}
          </p>
        </div>

        {activeTab === 'VOICES' ? (
          /* TAB 1: 8 FONT VOICES & LIVE INTERACTIVE APPLICATION */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* 8 Voice Selectors (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-2 font-mono text-xs">
              {voices.map((v) => {
                const isSelected = selectedVoice === v.id;
                const Icon = v.icon;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      sound.playClick(1.2);
                      setSelectedVoice(v.id);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-md ring-2 ring-[#11100E]/20'
                        : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] truncate">{v.label}</span>
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F59E0B]' : 'text-[#77736B]'}`} />
                    </div>
                    <div className={`text-[9px] mt-1 truncate ${isSelected ? 'text-white/70' : 'text-[#77736B]'}`}>
                      {v.fontName}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Rendered Canvas for Selected Voice (7 cols) */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 shadow-sm flex flex-col justify-between min-h-[260px]">
              <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2 font-mono text-xs">
                <span className="text-[#11100E] font-bold">{currentVoice.label} Voice</span>
                <span className="text-[10px] text-[#77736B]">{currentVoice.fontName}</span>
              </div>

              {/* Sample Rendered Headline */}
              <div className="my-auto py-3">
                <div className={`text-2xl sm:text-3xl text-[#11100E] leading-snug ${currentVoice.fontFamilyClass}`}>
                  {currentVoice.sampleText}
                </div>
                <div className="mt-3 p-2.5 rounded-lg bg-white/70 border border-[#11100E]/10 font-mono text-[11px] text-[#77736B]">
                  Context: <strong className="text-[#11100E]">{currentVoice.context}</strong>
                </div>
              </div>

              {/* Action trigger button */}
              <div className="flex items-center justify-between pt-2 border-t border-[#11100E]/10 font-mono text-xs">
                <span className="text-[11px] text-[#77736B]">Live Type Rendering Engine</span>
                <button
                  onClick={() => sound.playSuccess()}
                  className="px-3 py-1.5 rounded-lg bg-[#11100E] text-[#F5F1E8] text-xs font-bold hover:bg-black cursor-pointer active:translate-y-0.5"
                >
                  Test Audio Feedback →
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: STANDARD UX RULES FOR TYPOGRAPHY */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* 6 Rule Buttons (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-1.5 font-mono text-xs">
              {rules.map((r, idx) => {
                const isSelected = selectedRule === idx;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      sound.playClick(1.15);
                      setSelectedRule(idx);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-sm font-bold'
                        : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
                    }`}
                  >
                    <span className="truncate">{r.ruleTitle}</span>
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#16A34A]' : 'opacity-30'}`} />
                  </button>
                );
              })}
            </div>

            {/* Rule Deep-Dive Card (7 cols) */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 shadow-sm font-mono text-xs flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="font-bold text-sm text-[#11100E] border-b border-[#11100E]/10 pb-2">
                  {currentRule.ruleTitle}
                </div>

                <div className="mt-3 space-y-2">
                  <div className="p-3 rounded-lg bg-[#16A34A]/10 border border-[#16A34A]/25">
                    <div className="text-[10px] font-bold text-[#16A34A] mb-1">✓ THE UX STANDARD</div>
                    <div className="text-[#11100E] font-medium leading-relaxed">{currentRule.ruleStandard}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#DC2626]/8 border border-[#DC2626]/20">
                    <div className="text-[10px] font-bold text-[#DC2626] mb-1">✗ COMMON AI SLOP MISTAKE</div>
                    <div className="text-[#11100E]">{currentRule.badSlop}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#E9E1D3] border border-[#11100E]/10">
                    <div className="text-[10px] font-bold text-[#77736B] mb-0.5">COGNITIVE IMPACT</div>
                    <div className="text-[#11100E] text-[11px]">{currentRule.uxImpact}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#11100E]/10 flex items-center justify-between text-[11px] text-[#77736B]">
                <span>Rule {selectedRule + 1} of 6</span>
                <span className="font-bold text-[#11100E]">Enforce in prompt constraints</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Never load a typeface without understanding its emotional tone & mathematical scale.</span>
        <span>07 / 26</span>
      </div>
    </div>
  );
};
