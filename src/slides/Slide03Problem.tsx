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
  FileText,
  Search,
  Download,
  Terminal,
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

  const problems: SlopProblem[] = [
    {
      id: 'ICON_MISMATCH',
      title: 'MIXED ICON STYLES',
      category: 'ICONS',
      tagline: 'Different line thickness',
      defectDesc: 'Mixing thin outline icons with thick solid icons and sharp corners. Looks messy and unpolished.',
      cureDesc: 'Use one consistent icon set with matching line weight, size, and rounded corners.',
      icon: Component,
    },
    {
      id: 'PURPLE_GLOW',
      title: 'PURPLE BLUR EVERYWHERE',
      category: 'COLORS',
      tagline: 'Neon violet glowing blobs',
      defectDesc: 'Throwing glowing purple blobs on every card instead of organizing the layout clearly.',
      cureDesc: 'Calm, readable background with clear dark text, using color only when something needs attention.',
      icon: Palette,
    },
    {
      id: 'BROKEN_SPACING',
      title: 'RANDOM SPACING',
      category: 'SPACING',
      tagline: 'Uneven padding and gaps',
      defectDesc: 'Picking random margins (like 13px here, 27px there). Things look misaligned and messy.',
      cureDesc: 'Simple consistent spacing: multiples of 8px (8, 16, 24, 32px) so everything lines up.',
      icon: Sliders,
    },
    {
      id: 'LOZENGE_RADIUS',
      title: 'SUPER ROUNDED CORNERS',
      category: 'SHAPES',
      tagline: '40px pills that eat space',
      defectDesc: 'Making cards look like medicine pills. The corners waste 35% of the room for text and buttons.',
      cureDesc: 'Gentle, modern rounded corners (8px–12px) that leave plenty of breathing room inside.',
      icon: Square,
    },
    {
      id: 'GENERIC_COPY',
      title: 'EMPTY AI BUZZWORDS',
      category: 'WORDS',
      tagline: '"Unlock Next-Gen Synergy"',
      defectDesc: 'Fancy marketing jargon that sounds smart but never tells the user what the product actually does.',
      cureDesc: 'Plain, honest words: "Download your 14,200 records in 1 click."',
      icon: Type,
    },
    {
      id: 'MISSING_STATES',
      title: 'NO LOADING FEEDBACK',
      category: 'MISSING STATES',
      tagline: 'Blank screens when loading',
      defectDesc: 'The screen stays completely white while waiting for data, leaving users wondering if it crashed.',
      cureDesc: 'Soft skeleton placeholders while loading, helpful messages when empty, and an easy retry button.',
      icon: Loader,
    },
    {
      id: 'CONTRAST_FAIL',
      title: 'HARD TO READ TEXT',
      category: 'CONTRAST',
      tagline: 'Faint grey text on dark',
      defectDesc: 'Light grey text on dark backgrounds. Hard to read on phones outdoors or in bright rooms.',
      cureDesc: 'High-contrast text that is comfortable to read for everyone, anywhere.',
      icon: EyeOff,
    },
    {
      id: 'BADGE_BLOAT',
      title: 'TOO MANY BADGES',
      category: 'TOO BUSY',
      tagline: 'Pill stickers on every corner',
      defectDesc: 'Sticking 7 different "PRO", "AI", "TURBO" badges all over the card. When everything shouts, nothing is heard.',
      cureDesc: 'One simple badge only when it gives real, helpful information.',
      icon: Flame,
    },
    {
      id: 'FLAT_TACTILE',
      title: 'DEAD BUTTONS',
      category: 'BUTTON FEEL',
      tagline: 'Zero response when clicked',
      defectDesc: 'Buttons that do not move, change color, or make a sound when clicked. Feels like frozen glass.',
      cureDesc: 'Satisfying physical press feel, clear hover color change, and a crisp click sound.',
      icon: MousePointer,
    },
    {
      id: 'UNSTYLED_INPUTS',
      title: 'UGLY DEFAULT INPUTS',
      category: 'FORMS & INPUTS',
      tagline: 'Raw blue browser focus rings',
      defectDesc: 'Leaving default browser dropdowns and inputs unstyled. They clash with the rest of the app.',
      cureDesc: 'Clean, custom text boxes and dropdowns that match the rest of your app.',
      icon: Terminal,
    },
    {
      id: 'IDENTICAL_CARDS',
      title: 'CONFUSING TILES',
      category: 'LAYOUT CARDS',
      tagline: '3 cards that look the same',
      defectDesc: 'Putting 3 identical cards in a row with no clear primary choice, leaving users stuck guessing.',
      cureDesc: 'One clearly highlighted best option with a standout button to guide users easily.',
      icon: Layers,
    },
    {
      id: 'FLOATY_ANIM',
      title: 'SLOW FLOATING ANIMATIONS',
      category: 'ANIMATIONS',
      tagline: 'Bouncing cards that waste time',
      defectDesc: 'Cards that slowly float and bounce for 1 second before opening. Looks flashy, but slows people down.',
      cureDesc: 'Snappy, quick transitions (150ms) that explain where things go without making users wait.',
      icon: Film,
    },
  ];

  const current = problems.find((p) => p.id === selectedProblem) || problems[0];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-10 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#DC2626] font-semibold">
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
                ? 'bg-[#16A34A] text-white shadow-sm ring-2 ring-[#16A34A]/30'
                : 'bg-[#11100E] text-[#F5F1E8] hover:bg-[#11100E]/90'
            }`}
          >
            {cureActive ? <Check className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />}
            <span>{cureActive ? 'CLEAN DESIGN SHOWN' : 'SEE CLEAN DESIGN →'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left 12-Problem Selector (5 cols) | Right Interactive Sandbox (7 cols) */}
      <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: 12 Distinct Problems */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#11100E] leading-tight">
              AI BUILDS FAST.
              <br />
              <span className="text-[#DC2626]">TASTE BUILDS RIGHT.</span>
            </h2>
            <p className="mt-1 text-xs text-[#77736B] font-medium">
              Click any of the 12 mistakes below to see what happens and how to fix it:
            </p>
          </div>

          {/* 12 Problem Badges (Scrollable 2-column grid) */}
          <div className="grid grid-cols-2 gap-1.5 max-h-[290px] overflow-y-auto pr-1 font-mono text-[11px]">
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
                  }}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2 ${
                    isSelected && !cureActive
                      ? 'bg-[#DC2626] text-white border-[#DC2626] shadow-sm font-bold'
                      : isSelected && cureActive
                      ? 'bg-[#16A34A] text-white border-[#16A34A] shadow-sm font-bold'
                      : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#DC2626]/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <div className="truncate">
                    <div className="truncate text-[10px] uppercase font-bold tracking-tight">{p.title}</div>
                    <div
                      className={`text-[9px] truncate mt-0.5 ${
                        isSelected ? 'text-white/80' : 'text-[#77736B]'
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

        {/* Right Column: High-Fidelity Interactive Sandbox */}
        <div className="lg:col-span-7 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 shadow-sm relative overflow-hidden min-h-[340px]">
          {/* Top Status Bar */}
          <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#11100E]">{current.title}</span>
              <span className="text-[#77736B] text-[10px]">/ EXAMPLE #0{problems.findIndex(p => p.id === current.id) + 1}</span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                cureActive
                  ? 'bg-[#16A34A]/15 text-[#16A34A] border border-[#16A34A]/30'
                  : 'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20'
              }`}
            >
              {cureActive ? '✓ CLEAN & INTENTIONAL' : '✗ COMMON MISTAKE'}
            </span>
          </div>

          {/* Dynamic Interactive Sandbox Canvas */}
          <div className="my-auto py-3">
            {cureActive ? (
              /* CRAFTED SOLUTION STATE */
              <div className="p-4 rounded-xl bg-white border border-[#11100E]/15 shadow-sm space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                    <span className="text-xs font-bold text-[#11100E]">Export Customer List</span>
                  </div>
                  <span className="text-[10px] text-[#77736B]">BATCH COMPLETED</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#E9E1D3]/50 border border-[#11100E]/10">
                    <div className="text-[9px] text-[#77736B]">RECORDS</div>
                    <div className="text-base font-bold text-[#11100E] tabular-nums mt-0.5">14,200</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#E9E1D3]/50 border border-[#11100E]/10">
                    <div className="text-[9px] text-[#77736B]">EXPORT TIME</div>
                    <div className="text-base font-bold text-[#16A34A] tabular-nums mt-0.5">1.4s</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#E9E1D3]/50 border border-[#11100E]/10">
                    <div className="text-[9px] text-[#77736B]">FORMAT</div>
                    <div className="text-base font-bold text-[#11100E] mt-0.5">CSV / EXCEL</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#11100E]/10">
                  <span className="text-[10px] text-[#77736B]">Consistent spacing, easy to read, clear buttons</span>
                  <button
                    onClick={() => sound.playSuccess()}
                    className="px-3 py-1.5 rounded-lg bg-[#11100E] text-[#F5F1E8] text-xs font-bold hover:bg-black cursor-pointer flex items-center gap-1.5 active:translate-y-0.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>
            ) : (
              /* DEFECT EXAMPLES PER PROBLEM */
              <div className="transition-all duration-200">
                {current.id === 'ICON_MISMATCH' && (
                  <div className="p-4 rounded-xl bg-white border border-[#11100E]/15 space-y-2">
                    <div className="text-xs font-bold text-[#DC2626]">Icon Soup (Conflicting Weights & Viewboxes)</div>
                    <div className="flex items-center justify-around p-3 bg-gray-50 rounded-lg border border-dashed border-red-300">
                      <div className="flex flex-col items-center gap-1">
                        <Search strokeWidth={1} className="w-7 h-7 text-gray-400" />
                        <span className="text-[9px] font-mono text-red-500">1px Hairline</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Download strokeWidth={3} className="w-5 h-5 text-purple-700 fill-purple-200" />
                        <span className="text-[9px] font-mono text-red-500">3px Filled Solid</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Sparkles strokeWidth={1.5} className="w-8 h-8 text-amber-500 animate-spin" />
                        <span className="text-[9px] font-mono text-red-500">Mismatched 32px Box</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <FileText strokeWidth={2.5} className="w-4 h-4 text-emerald-600" />
                        <span className="text-[9px] font-mono text-red-500">Tiny 16px Heavy</span>
                      </div>
                    </div>
                  </div>
                )}

                {current.id === 'PURPLE_GLOW' && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950 via-indigo-950 to-pink-950 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] border border-purple-500 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black tracking-widest text-purple-300 flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                        CYBERNETIC AI PROTOCOL
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-pink-500 text-white text-[9px] font-bold shadow-sm">
                        AI MAGIC
                      </span>
                    </div>
                    <p className="text-xs text-purple-200/80">
                      Gaussian blur blobs masking illegible typography and zero structural hierarchy.
                    </p>
                  </div>
                )}

                {current.id === 'BROKEN_SPACING' && (
                  <div className="p-3 bg-white border-2 border-dashed border-red-300 rounded-lg space-y-1">
                    <div className="text-xs font-bold text-[#DC2626]">Arbitrary Paddings: p-[13px] + gap-7 + mt-[19px]</div>
                    <div className="flex gap-7 items-start">
                      <div className="p-[13px] bg-red-50 border border-red-200 rounded text-[10px]">Padding 13px</div>
                      <div className="p-[5px] mt-[19px] bg-red-50 border border-red-200 rounded text-[10px]">mt 19px</div>
                      <div className="p-[27px] bg-red-50 border border-red-200 rounded text-[10px]">p 27px</div>
                    </div>
                  </div>
                )}

                {current.id === 'LOZENGE_RADIUS' && (
                  <div className="p-6 rounded-[42px] bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-purple-400 text-center space-y-1">
                    <span className="text-xs font-bold text-purple-800 bg-purple-200 px-3 py-1 rounded-full">
                      Extreme 42px Lozenge Pill Card
                    </span>
                    <p className="text-[11px] text-purple-900 mt-1">
                      Rounded corners carve away 35% of interior usable reading and button area.
                    </p>
                  </div>
                )}

                {current.id === 'GENERIC_COPY' && (
                  <div className="p-4 rounded-xl bg-white border border-[#11100E]/20 space-y-1">
                    <h4 className="text-base font-black text-gray-900">
                      "Supercharge Your Workflow With The Power Of Autonomous Intelligence."
                    </h4>
                    <p className="text-xs text-gray-500">
                      What does this product actually do? Nobody knows. It sounds like 10,000 other AI landing pages.
                    </p>
                  </div>
                )}

                {current.id === 'MISSING_STATES' && (
                  <div className="p-4 rounded-xl bg-white border border-red-300 space-y-2">
                    <div className="text-xs font-bold text-[#DC2626]">No Skeleton / White Screen of Death</div>
                    <div className="h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-300">
                      [DATA FETCHING... ZERO LOADING FEEDBACK OR EMPTY STATE]
                    </div>
                  </div>
                )}

                {current.id === 'CONTRAST_FAIL' && (
                  <div className="p-4 rounded-xl bg-[#1E293B] text-[#475569] space-y-1 font-mono">
                    <div className="text-xs text-[#64748B]">Low Contrast Ratio: 2.1:1 (Fails WCAG AA)</div>
                    <p className="text-xs text-[#475569]">
                      Can you comfortably read this text on your laptop under office lighting? Neither can your users.
                    </p>
                  </div>
                )}

                {current.id === 'BADGE_BLOAT' && (
                  <div className="p-4 rounded-xl bg-white border border-red-300 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {['⚡ AI REVOLUTION', '🔥 ULTRA', '✨ SYNERGY', 'PRO v4.9', 'TURBO', 'BETA', 'AUTONOMOUS'].map((badge) => (
                        <span key={badge} className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-xs">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs font-black text-[#11100E]">7 Floating Badges Fighting for Dominance</div>
                    <div className="text-[10px] text-[#77736B]">When everything screams, nothing is heard.</div>
                  </div>
                )}

                {current.id === 'FLAT_TACTILE' && (
                  <div className="p-4 rounded-xl bg-white border border-[#11100E]/20 space-y-2 text-center">
                    <div className="text-xs font-bold text-gray-500">Dead Button (No Hover, No Press, No Sound)</div>
                    <button className="px-5 py-2 bg-blue-500 text-white text-xs rounded">
                      Dead Button Click Me
                    </button>
                    <div className="text-[10px] text-gray-400">Zero active scale, zero keyboard focus outline, zero SFX</div>
                  </div>
                )}

                {current.id === 'UNSTYLED_INPUTS' && (
                  <div className="p-4 rounded-xl bg-white border border-[#11100E]/20 space-y-2">
                    <div className="text-xs font-bold text-[#DC2626]">Unstyled Native HTML Elements</div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="raw input" className="p-1 border text-xs" />
                      <select className="p-1 border text-xs">
                        <option>Option 1 (Default Browser Select)</option>
                      </select>
                    </div>
                  </div>
                )}

                {current.id === 'IDENTICAL_CARDS' && (
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="p-2.5 bg-white border border-gray-200 rounded-lg text-center space-y-1">
                        <div className="text-xs font-bold">Plan #{num}</div>
                        <div className="text-[10px] text-gray-500">$29/mo</div>
                        <button className="w-full py-1 bg-gray-200 text-xs rounded">Select</button>
                      </div>
                    ))}
                  </div>
                )}

                {current.id === 'FLOATY_ANIM' && (
                  <div className="p-4 rounded-xl bg-white border border-purple-200 text-center">
                    <div className="w-24 h-12 mx-auto bg-purple-500 text-white text-xs rounded-lg flex items-center justify-center animate-bounce duration-1000">
                      Floaty 800ms
                    </div>
                    <div className="text-[10px] text-purple-700 mt-2">Decorative bouncing delays user workflow</div>
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
              {cureActive ? 'View AI Slop Defect' : 'Apply Taste Fix →'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>When anyone can generate UI in seconds, taste is your only moat.</span>
        <span>03 / 26</span>
      </div>
    </div>
  );
};
