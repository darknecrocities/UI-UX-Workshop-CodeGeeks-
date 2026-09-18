import React, { useState } from 'react';
import { sound } from '../audio/sound';
import {
  AlertTriangle,
  Check,
  Zap,
  Sparkles,
  Sliders,
  Type,
  Square,
  Layers,
  Palette,
  EyeOff,
  Component,
  Loader,
  MousePointer,
  Film,
  Flame,
  Search,
  Terminal,
  Bell,
  Settings,
  User,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Clock,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface SlopProblem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  defectDesc: string;
  cureDesc: string;
  icon: typeof AlertTriangle;
}

export const Slide03Problem: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<string>('ICON_MISMATCH');
  const [cureActive, setCureActive] = useState<boolean>(false);

  // Interactive sandbox states
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [feedState, setFeedState] = useState<'loading' | 'empty' | 'data'>('loading');
  const [paidState, setPaidState] = useState<boolean>(false);

  const problems: SlopProblem[] = [
    {
      id: 'ICON_MISMATCH',
      title: 'MIXED ICON STYLES',
      category: 'ICONS',
      tagline: 'Different line thickness',
      defectDesc: 'Mixing thin 1px outline icons with 3px solid icons and sharp corners. Destroys navigation harmony.',
      cureDesc: 'Uniform icon family with identical 1.5px stroke weight, 18px bounding box, and consistent optical weight.',
      icon: Component,
    },
    {
      id: 'PURPLE_GLOW',
      title: 'CHAOTIC BLURS & CLUTTER',
      category: 'COLORS',
      tagline: 'Mismatched blobs & heavy shadows',
      defectDesc: 'Chaotic purple-cyan multi-gradient blurs and glowing dropshadows that burn eyes and destroy contrast.',
      cureDesc: 'Calibrated monochrome dark palette with high-contrast text and a single purposeful warm accent.',
      icon: Palette,
    },
    {
      id: 'BROKEN_SPACING',
      title: 'RANDOM SPACING',
      category: 'SPACING',
      tagline: 'Uneven padding and gaps',
      defectDesc: 'Random magic margins (13px, 27px, 31px, 3px) creating visual anxiety and broken vertical rhythm.',
      cureDesc: 'Strict 8-point spatial grid (8, 16, 24, 32px) creating instant mathematical calmness and alignment.',
      icon: Sliders,
    },
    {
      id: 'LOZENGE_RADIUS',
      title: 'SUPER ROUNDED CORNERS',
      category: 'SHAPES',
      tagline: '44px pills that eat space',
      defectDesc: 'Extreme 44px pill corners that carve away 38% of interior layout room and awkwardly squeeze text.',
      cureDesc: 'Ergonomic 12px rounded corners that maximize readable layout room without visual clipping.',
      icon: Square,
    },
    {
      id: 'GENERIC_COPY',
      title: 'EMPTY AI BUZZWORDS',
      category: 'WORDS',
      tagline: '"Unlock Next-Gen Synergy"',
      defectDesc: 'Jargon-stuffed AI buzzwords that sound fancy but fail to explain what the product actually does.',
      cureDesc: 'Direct, honest, concrete human copywriting that explains the exact outcome in under 5 seconds.',
      icon: Type,
    },
    {
      id: 'MISSING_STATES',
      title: 'NO LOADING FEEDBACK',
      category: 'MISSING STATES',
      tagline: 'Blank screens when loading',
      defectDesc: 'Frozen blank white screen or raw unhandled error string while data queries execute.',
      cureDesc: 'Smooth skeleton placeholder shimmer, friendly empty state explanation, and a quick retry action.',
      icon: Loader,
    },
    {
      id: 'CONTRAST_FAIL',
      title: 'HARD TO READ TEXT',
      category: 'CONTRAST',
      tagline: 'Faint grey text on dark',
      defectDesc: 'Low-contrast dark grey on dark background (1.9:1) failing WCAG AA and invisible outdoors.',
      cureDesc: 'High-contrast 14.8:1 calibrated text hierarchy: crisp creamy white headers with clear legible subtitles.',
      icon: EyeOff,
    },
    {
      id: 'BADGE_BLOAT',
      title: 'TOO MANY BADGES',
      category: 'TOO BUSY',
      tagline: 'Pill stickers on every corner',
      defectDesc: '6 competing neon badge stickers screaming for attention while burying the actual core task information.',
      cureDesc: 'Exactly one purposeful semantic badge indicating high-signal information (e.g. Due Today).',
      icon: Flame,
    },
    {
      id: 'FLAT_TACTILE',
      title: 'DEAD BUTTONS',
      category: 'BUTTON FEEL',
      tagline: 'Zero response when clicked',
      defectDesc: 'Unresponsive glass button with no hover reaction, no active press depth, and zero feedback on click.',
      cureDesc: 'Physical tactile micro-interaction: smooth hover darkening, active depression, and crisp click SFX.',
      icon: MousePointer,
    },
    {
      id: 'UNSTYLED_INPUTS',
      title: 'UGLY DEFAULT INPUTS',
      category: 'FORMS & INPUTS',
      tagline: 'Raw blue browser focus rings',
      defectDesc: 'Default 1990s browser select dropdown and text input with harsh blue halo outline that clashes with UI.',
      cureDesc: 'Bespoke custom input controls with subtle focus rings, integrated search icon, and styled chevron.',
      icon: Terminal,
    },
    {
      id: 'IDENTICAL_CARDS',
      title: 'CONFUSING TILES',
      category: 'LAYOUT CARDS',
      tagline: '3 cards that look the same',
      defectDesc: 'Three identical tiers with equal visual weight causing user decision paralysis and lower conversions.',
      cureDesc: 'Visual dominance: one standout recommended tier in bold solid black with clear guidance.',
      icon: Layers,
    },
    {
      id: 'FLOATY_ANIM',
      title: 'SLOW FLOATING ANIMATIONS',
      category: 'ANIMATIONS',
      tagline: 'Bouncing cards that waste time',
      defectDesc: 'Sluggish 900ms spring wobble animation delaying user actions and making the app feel slow and cheap.',
      cureDesc: 'Instant 120ms cubic-bezier transition that reveals menu options immediately without friction.',
      icon: Film,
    },
  ];

  const current = problems.find((p) => p.id === selectedProblem) || problems[0];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-7 md:p-9 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#11100E] font-semibold">
            03 / The Problem · Common AI Design Mistakes
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playSwitch(!cureActive);
              setCureActive((prev) => !prev);
            }}
            className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              cureActive
                ? 'bg-[#11100E] text-[#F5F1E8] shadow-sm'
                : 'bg-[#F5F1E8] text-[#11100E] border border-[#11100E]/20 hover:border-[#11100E]'
            }`}
          >
            {cureActive ? <Check className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5 text-[#11100E]" />}
            <span>{cureActive ? 'CLEAN DESIGN SHOWN' : 'SEE CLEAN DESIGN →'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left 12-Problem Selector (5 cols) | Right Interactive Sandbox (7 cols) */}
      <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: 12 Distinct Problems */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#11100E] leading-tight">
              AI BUILDS FAST.
              <br />
              <span className="text-[#77736B]">TASTE BUILDS RIGHT.</span>
            </h2>
            <p className="mt-1 text-xs text-[#77736B] font-medium">
              Click any of the 12 mistakes to preview the broken UI vs the clean fix:
            </p>
          </div>

          {/* 12 Problem Badges (Scrollable 2-column grid) */}
          <div className="grid grid-cols-2 gap-1.5 max-h-[300px] overflow-y-auto pr-1 font-mono text-[11px]">
            {problems.map((p) => {
              const isSelected = selectedProblem === p.id;
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    sound.playSlopAlert();
                    setSelectedProblem(p.id);
                    setCureActive(false);
                    setPaidState(false);
                    setMenuOpened(false);
                  }}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2 ${
                    isSelected
                      ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-sm font-bold'
                      : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <div className="truncate">
                    <div className="truncate text-[10px] uppercase font-bold tracking-tight">{p.title}</div>
                    <div
                      className={`text-[9px] truncate mt-0.5 ${
                        isSelected ? 'text-[#F5F1E8]/80' : 'text-[#77736B]'
                      }`}
                    >
                      {p.tagline}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-[10px] font-mono text-[#77736B] flex items-center justify-between pt-1 border-t border-[#11100E]/10">
            <span>Group: <strong className="text-[#11100E]">{current.category}</strong></span>
            <span>12 Common Mistakes</span>
          </div>
        </div>

        {/* Right Column: High-Fidelity Interactive Sandbox Preview */}
        <div className="lg:col-span-7 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 shadow-sm relative overflow-hidden min-h-[380px]">
          {/* Top Status Bar with Live Switch */}
          <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2.5 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#11100E]">{current.title}</span>
              <span className="text-[#77736B] text-[10px]">/ UI PREVIEW #0{problems.findIndex(p => p.id === current.id) + 1}</span>
            </div>

            {/* Direct Problem vs Cure Toggle Switch */}
            <div className="flex items-center bg-[#11100E]/10 p-0.5 rounded-lg border border-[#11100E]/15 text-[10px]">
              <button
                onClick={() => {
                  sound.playSlopAlert();
                  setCureActive(false);
                }}
                className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                  !cureActive
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-[#77736B] hover:text-[#11100E]'
                }`}
              >
                ✗ ISSUE DEFECT
              </button>
              <button
                onClick={() => {
                  sound.playSuccess();
                  setCureActive(true);
                }}
                className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                  cureActive
                    ? 'bg-[#11100E] text-[#F5F1E8] shadow-xs'
                    : 'text-[#77736B] hover:text-[#11100E]'
                }`}
              >
                ✓ CLEAN CURE
              </button>
            </div>
          </div>

          {/* Dynamic Interactive Sandbox Canvas — Tailored UI Base for Each Problem */}
          <div className="my-auto py-3">
            {/* PROBLEM 1: ICON_MISMATCH */}
            {current.id === 'ICON_MISMATCH' && (
              <div className="space-y-3 font-mono">
                {!cureActive ? (
                  /* DEFECT UI PREVIEW */
                  <div className="p-4 rounded-xl bg-white border border-red-300 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-[11px] font-bold text-gray-800">Navigation Toolbar (Mismatched Weights)</span>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[9px] font-bold">
                        DEFECT: 4 DIFFERENT ICON STYLES
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-dashed border-red-300">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-gray-900">Dashboard</span>
                      </div>

                      {/* Chaotic Icon Soup */}
                      <div className="flex items-center gap-4">
                        {/* 1px Hairline Search */}
                        <div className="flex flex-col items-center" title="1px Hairline thin stroke">
                          <Search strokeWidth={0.75} className="w-7 h-7 text-gray-400" />
                          <span className="text-[8px] text-red-500 mt-0.5">0.75px Line</span>
                        </div>
                        {/* 3px Solid Bell */}
                        <div className="flex flex-col items-center" title="3px Heavy filled stroke">
                          <Bell strokeWidth={3} className="w-4 h-4 text-black fill-black" />
                          <span className="text-[8px] text-red-500 mt-0.5">3px Solid</span>
                        </div>
                        {/* Boxy Sharp Gear */}
                        <div className="flex flex-col items-center" title="Square corner misaligned box">
                          <Settings strokeWidth={1.2} className="w-8 h-8 text-indigo-600" />
                          <span className="text-[8px] text-red-500 mt-0.5">32px Box</span>
                        </div>
                        {/* Different Stroke User */}
                        <div className="flex flex-col items-center" title="Inconsistent linecap">
                          <User strokeWidth={2.2} className="w-5 h-5 text-gray-700" />
                          <span className="text-[8px] text-red-500 mt-0.5">2.2px Heavy</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-red-600 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Icons fight each other: thin 0.75px next to 3px solid filled destroys visual harmony.</span>
                    </div>
                  </div>
                ) : (
                  /* CURE UI PREVIEW */
                  <div className="p-4 rounded-xl bg-white border border-[#11100E]/20 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2">
                      <span className="text-[11px] font-bold text-[#11100E]">Navigation Toolbar (Lucide 1.5px Family)</span>
                      <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] text-[9px] font-bold">
                        CURE: 100% UNIFORM 1.5px STROKE
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[#11100E]/15">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#11100E]" />
                        <span className="font-bold text-xs text-[#11100E]">Dashboard</span>
                      </div>

                      {/* Cohesive Icon Set */}
                      <div className="flex items-center gap-2">
                        {[
                          { icon: Search, label: 'Search' },
                          { icon: Bell, label: 'Alerts' },
                          { icon: Settings, label: 'Settings' },
                          { icon: User, label: 'Profile' },
                        ].map(({ icon: Icon, label }) => (
                          <button
                            key={label}
                            onClick={() => sound.playClick(1.2)}
                            className="p-2 rounded-lg hover:bg-[#11100E]/10 transition-colors text-[#11100E] cursor-pointer flex items-center justify-center w-8 h-8"
                            title={label}
                          >
                            <Icon strokeWidth={1.5} className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-[10px] text-[#11100E] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Every icon uses exact 1.5px stroke, uniform 18px box, and calibrated 8px hit targets.</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROBLEM 2: PURPLE_GLOW */}
            {current.id === 'PURPLE_GLOW' && (
              <div className="space-y-3 font-mono">
                {!cureActive ? (
                  /* DEFECT UI PREVIEW */
                  <div className="p-5 rounded-2xl bg-gradient-to-tr from-purple-900 via-indigo-900 to-cyan-900 text-white shadow-[0_0_40px_rgba(168,85,247,0.4)] border border-purple-400/40 space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-widest text-cyan-300 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        AI COGNITIVE SUITE v4
                      </span>
                      <span className="px-2 py-0.5 rounded bg-purple-500/40 text-purple-200 text-[9px] font-bold border border-purple-300/30">
                        CHAOTIC BLURS
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-300 drop-shadow-md">
                        Autonomous Neural Synthesis
                      </h4>
                      <p className="text-[11px] text-purple-200/70 mt-1">
                        Heavy radial gradients and multi-colored neon glows make the text nearly impossible to read.
                      </p>
                    </div>

                    <div className="pt-1 flex items-center gap-2">
                      <button className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-purple-500/50">
                        Launch Copilot ✨
                      </button>
                      <span className="text-[9px] text-red-300 font-bold">Contrast ratio: 2.1:1 (Fails WCAG)</span>
                    </div>
                  </div>
                ) : (
                  /* CURE UI PREVIEW */
                  <div className="p-5 rounded-2xl bg-[#181614] text-[#F5F1E8] border border-[#2D2A26] shadow-md space-y-3">
                    <div className="flex items-center justify-between border-b border-[#2D2A26] pb-2">
                      <span className="text-[10px] font-bold tracking-widest text-[#9E988D] uppercase">
                        AI COGNITIVE SUITE · MODEL 4.2
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#2D2A26] text-[#F5F1E8] text-[9px] font-bold">
                        CALIBRATED MONOCHROME
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-[#F5F1E8] tracking-tight">
                        Autonomous Document Parser
                      </h4>
                      <p className="text-xs text-[#9E988D] mt-1 leading-relaxed">
                        High-contrast matte carbon background with crisp typography. Zero eye fatigue.
                      </p>
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <button
                        onClick={() => sound.playSuccess()}
                        className="px-4 py-2 rounded-xl bg-[#F5F1E8] text-[#11100E] text-xs font-bold hover:bg-white transition-colors cursor-pointer"
                      >
                        Run Extraction →
                      </button>
                      <span className="text-[10px] text-[#9E988D]">Contrast: 14.8:1 (WCAG AAA)</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROBLEM 3: BROKEN_SPACING */}
            {current.id === 'BROKEN_SPACING' && (
              <div className="space-y-3 font-mono">
                {!cureActive ? (
                  /* DEFECT UI PREVIEW */
                  <div className="p-3 bg-white border border-red-300 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-[11px] font-bold text-gray-800">Profile Settings (Arbitrary Margins)</span>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[9px] font-bold">
                        DEFECT: RANDOM PADDING
                      </span>
                    </div>

                    {/* Broken spacing container */}
                    <div className="border border-dashed border-red-400 p-1 rounded-lg bg-red-50/30">
                      <div className="pt-[13px] pl-[27px] pb-[3px]">
                        <span className="text-xs font-bold text-gray-900">John Doe</span>
                        <span className="text-[9px] text-red-500 block">pt-[13px] pl-[27px]</span>
                      </div>

                      <div className="mt-[29px] mb-[7px] px-[11px]">
                        <input
                          type="text"
                          readOnly
                          value="john@domain.com"
                          className="w-full p-[3px] border border-gray-300 rounded text-xs bg-white"
                        />
                        <span className="text-[8px] text-red-500">mt-[29px] mb-[7px] p-[3px]</span>
                      </div>

                      <div className="mt-[4px] mb-[38px] px-[5px]">
                        <button className="px-2 py-0.5 bg-gray-900 text-white text-[11px] rounded">
                          Save Profile
                        </button>
                        <span className="text-[8px] text-red-500 ml-2">mt-[4px] mb-[38px]</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-red-600 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Random magic numbers make the UI feel claustrophobic and unaligned.</span>
                    </div>
                  </div>
                ) : (
                  /* CURE UI PREVIEW */
                  <div className="p-4 bg-white border border-[#11100E]/20 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2">
                      <span className="text-[11px] font-bold text-[#11100E]">Profile Settings (8-Point Grid)</span>
                      <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] text-[9px] font-bold">
                        CURE: 8PT SPATIAL RHYTHM
                      </span>
                    </div>

                    <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#11100E]/15 space-y-3">
                      <div>
                        <div className="text-xs font-bold text-[#11100E]">John Doe</div>
                        <div className="text-[10px] text-[#77736B]">Software Architect</div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase text-[#77736B] block mb-1">
                          Email Address
                        </label>
                        <input
                          type="text"
                          readOnly
                          value="john@domain.com"
                          className="w-full px-3 py-2 border border-[#11100E]/20 rounded-lg text-xs bg-white text-[#11100E]"
                        />
                      </div>

                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[10px] text-[#77736B]">Locked to 8px, 16px, 24px multiples</span>
                        <button
                          onClick={() => sound.playClick(1.2)}
                          className="px-3.5 py-1.5 bg-[#11100E] text-[#F5F1E8] text-xs font-bold rounded-lg cursor-pointer hover:bg-black transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>

                    <div className="text-[10px] text-[#11100E] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Exact 16px padding and 12px gaps create natural visual rhythm.</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROBLEM 4: LOZENGE_RADIUS */}
            {current.id === 'LOZENGE_RADIUS' && (
              <div className="space-y-3 font-mono">
                {!cureActive ? (
                  /* DEFECT UI PREVIEW */
                  <div className="p-5 rounded-[44px] bg-white border-2 border-red-300 shadow-sm space-y-2 text-center relative overflow-hidden">
                    <div className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold inline-block">
                      DEFECT: 44px PILL RADIUS
                    </div>

                    <div className="py-2">
                      <div className="text-xs text-red-500 font-bold">38% CORNER LAYOUT AREA CHOPPED OFF</div>
                      <div className="text-2xl font-black text-gray-900 mt-1">$48,250 MRR</div>
                      <p className="text-[10px] text-gray-400 mt-1 max-w-[200px] mx-auto">
                        Text must be artificially squeezed to avoid clipping the extreme round corners.
                      </p>
                    </div>

                    <button className="px-4 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold">
                      Awkwardly Squeezed CTA
                    </button>
                  </div>
                ) : (
                  /* CURE UI PREVIEW */
                  <div className="p-5 rounded-xl bg-white border border-[#11100E]/20 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2">
                      <span className="text-[11px] font-bold text-[#11100E]">Monthly Revenue Metric</span>
                      <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] text-[9px] font-bold">
                        CURE: 12px ERGONOMIC RADIUS
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#77736B] font-bold">Total MRR</div>
                        <div className="text-3xl font-black text-[#11100E] mt-0.5">$48,250</div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#11100E] bg-[#E9E1D3] px-2 py-1 rounded-md">
                          <TrendingUp className="w-3 h-3" /> +19.4%
                        </span>
                        <div className="text-[10px] text-[#77736B] mt-1">vs last month</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#11100E]/10 flex items-center justify-between">
                      <span className="text-[10px] text-[#77736B]">100% usable rectangular interior space</span>
                      <button
                        onClick={() => sound.playSuccess()}
                        className="px-3.5 py-1.5 rounded-lg bg-[#11100E] text-[#F5F1E8] text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                      >
                        Download Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROBLEM 5: GENERIC_COPY */}
            {current.id === 'GENERIC_COPY' && (
              <div className="space-y-3 font-mono">
                {!cureActive ? (
                  /* DEFECT UI PREVIEW */
                  <div className="p-5 rounded-xl bg-white border border-red-300 shadow-sm space-y-2">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-[11px] font-bold text-gray-800">Landing Page Hero (AI Hallucinated Jargon)</span>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[9px] font-bold">
                        DEFECT: EMPTY BUZZWORDS
                      </span>
                    </div>

                    <div className="py-2 space-y-1.5">
                      <h3 className="text-sm sm:text-base font-black text-gray-900 leading-snug">
                        "Orchestrate Autonomous Synergy Across Next-Gen Cognitive Paradigms."
                      </h3>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Our multi-dimensional quantum framework empowers hyper-scale transformations through intuitive enterprise velocities.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[9px] text-red-600 font-bold">Nobody knows what this product does.</span>
                      <button className="px-3.5 py-1.5 rounded bg-red-600 text-white text-xs font-bold">
                        Unleash The Future
                      </button>
                    </div>
                  </div>
                ) : (
                  /* CURE UI PREVIEW */
                  <div className="p-5 rounded-xl bg-white border border-[#11100E]/20 shadow-sm space-y-2">
                    <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2">
                      <span className="text-[11px] font-bold text-[#11100E]">Landing Page Hero (Concrete Value)</span>
                      <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] text-[9px] font-bold">
                        CURE: HONEST HUMAN COPY
                      </span>
                    </div>

                    <div className="py-2 space-y-1.5">
                      <h3 className="text-base font-black text-[#11100E] leading-snug">
                        Convert messy bank statement PDFs into clean Excel sheets in 4 seconds.
                      </h3>
                      <p className="text-[11px] text-[#77736B] leading-relaxed">
                        Drop your monthly statement. Automatically categorizes 500+ line items with formulas ready for your accountant.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#11100E]/10 flex items-center justify-between">
                      <span className="text-[10px] text-[#11100E]">Users understand the value in 2 seconds.</span>
                      <button
                        onClick={() => sound.playSuccess()}
                        className="px-3.5 py-1.5 rounded-lg bg-[#11100E] text-[#F5F1E8] text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                      >
                        Convert First PDF — Free
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROBLEM 6: MISSING_STATES */}
            {current.id === 'MISSING_STATES' && (
              <div className="space-y-3 font-mono">
                {!cureActive ? (
                  /* DEFECT UI PREVIEW */
                  <div className="p-4 rounded-xl bg-white border border-red-300 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-[11px] font-bold text-gray-800">Transactions Feed (Zero Feedback)</span>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[9px] font-bold">
                        DEFECT: BLANK WHITE VOID
                      </span>
                    </div>

                    {/* Simulates blank freeze */}
                    <div className="h-28 rounded-lg bg-gray-50 border border-dashed border-red-300 flex flex-col items-center justify-center text-center p-4">
                      <div className="text-xs text-red-600 font-bold">[WHITE SCREEN OF DEATH]</div>
                      <div className="text-[10px] text-gray-400 mt-1">
                        API queried... screen is completely frozen white. Did it crash? Did the network drop?
                      </div>
                    </div>

                    <div className="text-[10px] text-red-600 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>72% of users abandon the page when a query produces zero visual feedback.</span>
                    </div>
                  </div>
                ) : (
                  /* CURE UI PREVIEW */
                  <div className="p-4 rounded-xl bg-white border border-[#11100E]/20 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#11100E]">Transactions Feed</span>
                        <div className="flex gap-1 bg-[#11100E]/5 p-0.5 rounded">
                          {(['loading', 'empty', 'data'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => {
                                sound.playClick(1.2);
                                setFeedState(st);
                              }}
                              className={`px-1.5 py-0.5 text-[8px] rounded uppercase font-bold cursor-pointer ${
                                feedState === st ? 'bg-[#11100E] text-[#F5F1E8]' : 'text-[#77736B]'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] text-[9px] font-bold">
                        CURE: ALL 3 STATES HANDLED
                      </span>
                    </div>

                    {/* State Renderers */}
                    <div className="min-h-[100px] flex flex-col justify-center">
                      {feedState === 'loading' && (
                        <div className="space-y-2 animate-pulse">
                          <div className="h-4 bg-[#E9E1D3] rounded w-3/4" />
                          <div className="h-4 bg-[#E9E1D3] rounded w-full" />
                          <div className="h-4 bg-[#E9E1D3] rounded w-1/2" />
                          <div className="text-[9px] text-[#77736B] text-center pt-1">Shimmer placeholder active...</div>
                        </div>
                      )}

                      {feedState === 'empty' && (
                        <div className="p-3 text-center rounded-lg bg-[#FAF8F5] border border-[#11100E]/10 space-y-1.5">
                          <div className="text-xs font-bold text-[#11100E]">No Transactions Yet</div>
                          <p className="text-[10px] text-[#77736B]">
                            When you make your first sale, it will appear here in real time.
                          </p>
                          <button
                            onClick={() => sound.playSuccess()}
                            className="px-3 py-1 rounded bg-[#11100E] text-[#F5F1E8] text-[10px] font-bold cursor-pointer"
                          >
                            Create First Sale →
                          </button>
                        </div>
                      )}

                      {feedState === 'data' && (
                        <div className="space-y-1.5">
                          <div className="p-2 rounded bg-[#FAF8F5] border border-[#11100E]/10 flex items-center justify-between text-xs">
                            <span className="font-bold text-[#11100E]">Acme Corp Invoice #1042</span>
                            <span className="font-bold text-[#11100E]">$1,250.00</span>
                          </div>
                          <div className="p-2 rounded bg-[#FAF8F5] border border-[#11100E]/10 flex items-center justify-between text-xs">
                            <span className="font-bold text-[#11100E]">Design Sprint Retainer</span>
                            <span className="font-bold text-[#11100E]">$3,500.00</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-[10px] text-[#11100E] flex items-center gap-1.5 pt-1 border-t border-[#11100E]/10">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Never leave the user guessing: loading skeleton, friendly empty state, clear retry.</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROBLEM 7: CONTRAST_FAIL */}
            {current.id === 'CONTRAST_FAIL' && (
              <div className="space-y-3 font-mono">
                {!cureActive ? (
                  /* DEFECT UI PREVIEW */
                  <div className="p-5 rounded-xl bg-[#171513] text-[#38342E] border border-[#2D2A26] space-y-2">
                    <div className="flex items-center justify-between border-b border-[#262421] pb-2">
                      <span className="text-[10px] font-bold text-[#443F38]">Server Log Console</span>
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 text-[9px] font-bold border border-red-800">
                        CONTRAST 1.9:1 (WCAG FAIL)
                      </span>
                    </div>

                    <div className="py-2 space-y-1">
                      <p className="text-xs text-[#38342E]">
                        [14:22:01] INFO: Worker 04 authenticated user session token.
                      </p>
                      <p className="text-xs text-[#2E2B25]">
                        [14:22:03] WARN: Secondary cache connection took 412ms.
                      </p>
                      <p className="text-xs text-[#282520]">
                        Try reading this in a brightly lit room or on a mobile screen in sunlight. It is invisible.
                      </p>
                    </div>

                    <div className="text-[9px] text-red-400 pt-1">
                      ✗ Fails WCAG AA minimum 4.5:1 ratio by over 50%.
                    </div>
                  </div>
                ) : (
                  /* CURE UI PREVIEW */
                  <div className="p-5 rounded-xl bg-[#11100E] text-[#F5F1E8] border border-[#2D2A26] space-y-2">
                    <div className="flex items-center justify-between border-b border-[#2D2A26] pb-2">
                      <span className="text-[10px] font-bold text-[#F5F1E8]">Server Log Console</span>
                      <span className="px-2 py-0.5 rounded bg-[#2D2A26] text-[#F5F1E8] text-[9px] font-bold">
                        CONTRAST 14.8:1 (WCAG AAA)
                      </span>
                    </div>

                    <div className="py-2 space-y-1">
                      <p className="text-xs text-[#F5F1E8] font-medium">
                        [14:22:01] <span className="text-[#E9E1D3] font-bold">INFO:</span> Worker 04 authenticated user session token.
                      </p>
                      <p className="text-xs text-[#E9E1D3]">
                        [14:22:03] <span className="text-[#F5F1E8] font-bold">WARN:</span> Secondary cache connection took 412ms.
                      </p>
                      <p className="text-xs text-[#9E988D]">
                        Calibrated high-contrast palette is effortlessly readable anywhere, under any glare.
                      </p>
                    </div>

                    <div className="text-[10px] text-[#F5F1E8] flex items-center gap-1.5 pt-1 border-t border-[#2D2A26]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Crisp creamy white text ensures 100% accessible readability.</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROBLEM 8: BADGE_BLOAT */}
            {current.id === 'BADGE_BLOAT' && (
              <div className="space-y-3 font-mono">
                {!cureActive ? (
                  /* DEFECT UI PREVIEW */
                  <div className="p-4 rounded-xl bg-white border border-red-300 shadow-sm space-y-2">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-[11px] font-bold text-gray-800">Kanban Task Ticket</span>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[9px] font-bold">
                        DEFECT: 6 SHOUTING BADGES
                      </span>
                    </div>

                    {/* Bloated badges covering card */}
                    <div className="flex flex-wrap gap-1 py-1">
                      <span className="px-1.5 py-0.5 bg-red-500 text-white rounded text-[8px] font-bold">🔥 URGENT</span>
                      <span className="px-1.5 py-0.5 bg-purple-600 text-white rounded text-[8px] font-bold">⚡ AI-POWERED</span>
                      <span className="px-1.5 py-0.5 bg-yellow-500 text-black rounded text-[8px] font-bold">v2.4 BETA</span>
                      <span className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-[8px] font-bold">💎 PRO TIER</span>
                      <span className="px-1.5 py-0.5 bg-green-600 text-white rounded text-[8px] font-bold">P0 CRITICAL</span>
                      <span className="px-1.5 py-0.5 bg-pink-600 text-white rounded text-[8px] font-bold">MACHINE LEARNING</span>
                    </div>

                    <div className="pt-1">
                      <div className="text-xs font-bold text-gray-900 truncate">
                        Task: Fix Stripe webhook callback timeout on...
                      </div>
                      <div className="text-[9px] text-gray-400 mt-0.5">
                        Actual task details are pushed down and drowned out by badge clutter.
                      </div>
                    </div>

                    <div className="text-[10px] text-red-600 pt-1 border-t border-gray-100">
                      When everything screams for attention, nothing is heard.
                    </div>
                  </div>
                ) : (
                  /* CURE UI PREVIEW */
                  <div className="p-4 rounded-xl bg-white border border-[#11100E]/20 shadow-sm space-y-2">
                    <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#11100E]">Task #304</span>
                        <span className="px-2 py-0.5 rounded bg-[#E9E1D3] text-[#11100E] text-[9px] font-bold flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> Due Tomorrow
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] text-[9px] font-bold">
                        CURE: 1 SEMANTIC BADGE
                      </span>
                    </div>

                    <div className="py-1">
                      <div className="text-sm font-bold text-[#11100E]">
                        Fix Stripe webhook callback timeout on Safari mobile
                      </div>
                      <div className="text-[11px] text-[#77736B] mt-1">
                        Assigned to Arron Parejas · Pull Request #88 open
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#11100E]/10 flex items-center justify-between text-[10px] text-[#77736B]">
                      <span>Clean visual hierarchy without sticker noise</span>
                      <span className="font-bold text-[#11100E]">High Priority</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROBLEM 9: FLAT_TACTILE */}
            {current.id === 'FLAT_TACTILE' && (
              <div className="space-y-3 font-mono">
                {!cureActive ? (
                  /* DEFECT UI PREVIEW */
                  <div className="p-5 rounded-xl bg-white border border-red-300 shadow-sm space-y-3 text-center">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-[11px] font-bold text-gray-800">Checkout Action (Frozen Glass)</span>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[9px] font-bold">
                        DEFECT: DEAD BUTTON
                      </span>
                    </div>

                    <div className="py-2 space-y-2">
                      <div className="text-xs text-gray-500">
                        Click the button below: notice how it produces zero movement, zero depression, zero sound.
                      </div>
                      {/* Dead button */}
                      <button className="px-6 py-2.5 bg-gray-900 text-white text-xs rounded cursor-default">
                        Confirm Payment ($29.00)
                      </button>
                      <div className="text-[9px] text-red-500">
                        User wonders: "Did that work? Should I click 3 more times?"
                      </div>
                    </div>
                  </div>
                ) : (
                  /* CURE UI PREVIEW */
                  <div className="p-5 rounded-xl bg-white border border-[#11100E]/20 shadow-sm space-y-3 text-center">
                    <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2">
                      <span className="text-[11px] font-bold text-[#11100E]">Checkout Action (Physical Feedback)</span>
                      <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] text-[9px] font-bold">
                        CURE: TACTILE CLICK & SFX
                      </span>
                    </div>

                    <div className="py-2 space-y-2">
                      <div className="text-xs text-[#77736B]">
                        Click the button below: feel the physical press depth and audio click SFX.
                      </div>
                      {/* Physical tactile button */}
                      <button
                        onClick={() => {
                          sound.playClick(1.4);
                          setPaidState(true);
                          setTimeout(() => setPaidState(false), 2000);
                        }}
                        className="px-6 py-2.5 bg-[#11100E] text-[#F5F1E8] text-xs font-bold rounded-xl hover:bg-black transition-all duration-75 cursor-pointer active:translate-y-0.5 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 mx-auto"
                      >
                        {paidState ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span>Paid $29.00 — Confirmed!</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Confirm Payment ($29.00)</span>
                          </>
                        )}
                      </button>
                      <div className="text-[10px] text-[#11100E]">
                        Immediate tactile reassurance eliminates accidental double charges.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROBLEM 10: UNSTYLED_INPUTS */}
            {current.id === 'UNSTYLED_INPUTS' && (
              <div className="space-y-3 font-mono">
                {!cureActive ? (
                  /* DEFECT UI PREVIEW */
                  <div className="p-4 rounded-xl bg-white border border-red-300 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-[11px] font-bold text-gray-800">Filter Bar (Browser Defaults)</span>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[9px] font-bold">
                        DEFECT: RAW HTML INPUTS
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 p-3 bg-gray-50 border border-dashed border-red-300 rounded-lg">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="p-1 border border-gray-400 text-xs text-gray-800 outline-blue-500"
                        defaultValue="Search query..."
                      />
                      <select className="p-1 border border-gray-400 text-xs bg-gray-200">
                        <option>Sort by Date (Default Select)</option>
                        <option>Price: Low to High</option>
                      </select>
                    </div>

                    <div className="text-[10px] text-red-600 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Default Windows/Mac browser controls clash violently with modern app styling.</span>
                    </div>
                  </div>
                ) : (
                  /* CURE UI PREVIEW */
                  <div className="p-4 rounded-xl bg-white border border-[#11100E]/20 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2">
                      <span className="text-[11px] font-bold text-[#11100E]">Filter Bar (Custom Design System)</span>
                      <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] text-[9px] font-bold">
                        CURE: BESPOKE CONTROLS
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 p-3 bg-[#FAF8F5] border border-[#11100E]/15 rounded-lg">
                      <div className="relative flex-1">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#77736B]" />
                        <input
                          type="text"
                          defaultValue="Search 14,200 records..."
                          className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#11100E]/20 text-xs bg-white text-[#11100E] focus:outline-none focus:border-[#11100E] focus:ring-1 focus:ring-[#11100E]"
                        />
                      </div>
                      <div className="relative">
                        <select className="appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-[#11100E]/20 text-xs bg-white text-[#11100E] focus:outline-none focus:border-[#11100E] cursor-pointer">
                          <option>Sort: Newest First</option>
                          <option>Sort: Revenue Highest</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-[#77736B] pointer-events-none" />
                      </div>
                    </div>

                    <div className="text-[10px] text-[#11100E] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Custom focus rings, integrated search icon, and matching typography.</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROBLEM 11: IDENTICAL_CARDS */}
            {current.id === 'IDENTICAL_CARDS' && (
              <div className="space-y-3 font-mono">
                {!cureActive ? (
                  /* DEFECT UI PREVIEW */
                  <div className="p-3 bg-white border border-red-300 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-[11px] font-bold text-gray-800">Pricing Grid (Zero Hierarchy)</span>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[9px] font-bold">
                        DEFECT: 3 IDENTICAL TILES
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: 'Starter', price: '$9' },
                        { name: 'Pro', price: '$29' },
                        { name: 'Enterprise', price: '$99' },
                      ].map((tier) => (
                        <div key={tier.name} className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-center space-y-1">
                          <div className="text-[11px] font-bold text-gray-800">{tier.name}</div>
                          <div className="text-base font-bold text-gray-900">{tier.price}</div>
                          <button className="w-full py-1 rounded bg-gray-200 text-gray-800 text-[10px]">
                            Choose
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="text-[9px] text-red-600 text-center">
                      Analysis paralysis: Which plan is best? Users must read all 3 cards from scratch.
                    </div>
                  </div>
                ) : (
                  /* CURE UI PREVIEW */
                  <div className="p-3 bg-white border border-[#11100E]/20 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-1.5">
                      <span className="text-[11px] font-bold text-[#11100E]">Pricing Grid (Visual Dominance)</span>
                      <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] text-[9px] font-bold">
                        CURE: CLEAR PRIMARY CHOICE
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 items-center">
                      {/* Starter */}
                      <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#11100E]/15 text-center space-y-1">
                        <div className="text-[10px] text-[#77736B]">Starter</div>
                        <div className="text-sm font-bold text-[#11100E]">$9</div>
                        <button className="w-full py-1 rounded border border-[#11100E]/30 text-[#11100E] text-[9px] font-bold">
                          Select
                        </button>
                      </div>

                      {/* Standout Pro */}
                      <div className="p-3 rounded-xl bg-[#11100E] text-[#F5F1E8] shadow-md text-center space-y-1 scale-105 border border-[#11100E]">
                        <span className="px-1.5 py-0.5 rounded bg-white/20 text-[#F5F1E8] text-[8px] font-bold">
                          RECOMMENDED
                        </span>
                        <div className="text-xs font-bold">Pro Tier</div>
                        <div className="text-lg font-black">$29/mo</div>
                        <button
                          onClick={() => sound.playSuccess()}
                          className="w-full py-1 rounded-lg bg-[#F5F1E8] text-[#11100E] text-[10px] font-bold hover:bg-white cursor-pointer"
                        >
                          Start Free Trial →
                        </button>
                      </div>

                      {/* Enterprise */}
                      <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#11100E]/15 text-center space-y-1">
                        <div className="text-[10px] text-[#77736B]">Enterprise</div>
                        <div className="text-sm font-bold text-[#11100E]">$99</div>
                        <button className="w-full py-1 rounded border border-[#11100E]/30 text-[#11100E] text-[9px] font-bold">
                          Contact
                        </button>
                      </div>
                    </div>

                    <div className="text-[10px] text-[#11100E] text-center pt-1 border-t border-[#11100E]/10">
                      80% of users immediately spot and pick the elevated tier in under 1 second.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROBLEM 12: FLOATY_ANIM */}
            {current.id === 'FLOATY_ANIM' && (
              <div className="space-y-3 font-mono">
                {!cureActive ? (
                  /* DEFECT UI PREVIEW */
                  <div className="p-5 rounded-xl bg-white border border-red-300 shadow-sm space-y-3 text-center">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-[11px] font-bold text-gray-800">Quick Actions (900ms Spring Wobble)</span>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[9px] font-bold">
                        DEFECT: SLOW BOUNCING
                      </span>
                    </div>

                    <div className="py-2 space-y-2">
                      <button
                        onClick={() => {
                          sound.playSlopAlert();
                          setMenuOpened(!menuOpened);
                        }}
                        className="px-4 py-2 bg-gray-900 text-white text-xs rounded cursor-pointer"
                      >
                        Toggle Menu (Click to test 900ms lag)
                      </button>

                      {menuOpened && (
                        <div className="p-3 bg-red-50 border border-red-300 rounded-lg max-w-xs mx-auto animate-bounce duration-1000">
                          <div className="text-xs font-bold text-red-700">Sluggish 900ms Floating Menu</div>
                          <div className="text-[10px] text-gray-600 mt-0.5">User waits nearly 1 second just to click an action.</div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* CURE UI PREVIEW */
                  <div className="p-5 rounded-xl bg-white border border-[#11100E]/20 shadow-sm space-y-3 text-center">
                    <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2">
                      <span className="text-[11px] font-bold text-[#11100E]">Quick Actions (120ms Snappy Ease)</span>
                      <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] text-[9px] font-bold">
                        CURE: 120ms INSTANT REVEAL
                      </span>
                    </div>

                    <div className="py-2 space-y-2">
                      <button
                        onClick={() => {
                          sound.playClick(1.3);
                          setMenuOpened(!menuOpened);
                        }}
                        className="px-4 py-2 bg-[#11100E] text-[#F5F1E8] text-xs font-bold rounded-xl cursor-pointer hover:bg-black transition-colors"
                      >
                        Toggle Menu (Click to test 120ms speed)
                      </button>

                      {menuOpened && (
                        <div className="p-3 bg-[#FAF8F5] border border-[#11100E]/20 rounded-xl max-w-xs mx-auto transition-all duration-150 transform scale-100 opacity-100 shadow-sm">
                          <div className="text-xs font-bold text-[#11100E]">Snappy 120ms Instant Action Menu</div>
                          <div className="text-[10px] text-[#77736B] mt-0.5">Zero wobble, immediate responsiveness.</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Diagnostic Breakdown Footer */}
          <div className="pt-2 border-t border-[#11100E]/10 font-mono text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-[#77736B]">
              {cureActive ? current.cureDesc : current.defectDesc}
            </span>
            <button
              onClick={() => {
                sound.playSwitch(!cureActive);
                setCureActive(!cureActive);
              }}
              className="text-[#11100E] font-bold underline cursor-pointer shrink-0"
            >
              {cureActive ? 'View Issue Defect' : 'Apply Taste Fix →'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>When anyone can generate UI, good choices matter most.</span>
        <span>03 / 30</span>
      </div>
    </div>
  );
};
