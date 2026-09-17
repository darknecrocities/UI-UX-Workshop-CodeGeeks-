import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Palette, ShieldCheck } from 'lucide-react';

interface Swatch {
  id: string;
  name: string;
  hex: string;
  job: string;
  roleDescription: string;
  bgClass: string;
  textClass: string;
  contrastRatio: string;
}

interface ColorRule {
  id: string;
  ruleTitle: string;
  ruleStandard: string;
  badSlop: string;
  uxImpact: string;
}

export const Slide08ColorJob: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PALETTE' | 'RULES'>('PALETTE');
  const [selectedColor, setSelectedColor] = useState<string>('BEIGE');
  const [selectedRule, setSelectedRule] = useState<number>(0);
  const [appState, setAppState] = useState<'IDLE' | 'WARNING' | 'SUCCESS'>('IDLE');

  const swatches: Swatch[] = [
    {
      id: 'BEIGE',
      name: 'Warm Canvas',
      hex: '#E9E1D3',
      job: 'BASE CANVAS (60%)',
      roleDescription: 'Tactile parchment background that reduces glare and eye fatigue during long sessions.',
      bgClass: 'bg-[#E9E1D3]',
      textClass: 'text-[#11100E]',
      contrastRatio: '14.2:1 against near-black',
    },
    {
      id: 'BLACK',
      name: 'Structural Ink',
      hex: '#11100E',
      job: 'STRUCTURE & TYPE (30%)',
      roleDescription: 'Near-black tone for high-contrast typography, structural 1px borders, and primary buttons.',
      bgClass: 'bg-[#11100E]',
      textClass: 'text-[#F5F1E8]',
      contrastRatio: '15.8:1 against white',
    },
    {
      id: 'RED',
      name: 'Crimson Alert',
      hex: '#DC2626',
      job: 'DESTRUCTIVE / ERROR',
      roleDescription: 'Reserved exclusively for critical errors, irreversible delete actions, and security alerts.',
      bgClass: 'bg-[#DC2626]',
      textClass: 'text-white',
      contrastRatio: '4.8:1 against canvas',
    },
    {
      id: 'GREEN',
      name: 'Emerald Verified',
      hex: '#16A34A',
      job: 'SUCCESS / PROD',
      roleDescription: 'Applied to verified test suites, successful transactions, and healthy system statuses.',
      bgClass: 'bg-[#16A34A]',
      textClass: 'text-white',
      contrastRatio: '5.1:1 against canvas',
    },
    {
      id: 'YELLOW',
      name: 'Amber Warning',
      hex: '#D97706',
      job: 'ATTENTION / REVIEW',
      roleDescription: 'Non-blocking cautions, pending reviews, active tab indicators, and rate-limit warnings.',
      bgClass: 'bg-[#D97706]',
      textClass: 'text-white',
      contrastRatio: '4.6:1 against dark ink',
    },
    {
      id: 'BLUE',
      name: 'Cobalt Focus',
      hex: '#2563EB',
      job: 'SELECTION & FOCUS',
      roleDescription: 'Keyboard focus rings, active interactive selection, and clickable hyperlinks.',
      bgClass: 'bg-[#2563EB]',
      textClass: 'text-white',
      contrastRatio: '4.9:1 against light canvas',
    },
    {
      id: 'SLATE',
      name: 'Muted Slate',
      hex: '#77736B',
      job: 'SECONDARY METADATA',
      roleDescription: 'Captions, timestamps, column headers, and subtle dividers that do not compete for attention.',
      bgClass: 'bg-[#77736B]',
      textClass: 'text-white',
      contrastRatio: '4.7:1 against light canvas',
    },
    {
      id: 'VIOLET',
      name: 'Intent Violet',
      hex: '#7C3AED',
      job: 'INTENTIONAL ACCENT (10%)',
      roleDescription: 'Disciplined accent used sparingly on hero conversion points, never as a full-page Gaussian blur.',
      bgClass: 'bg-[#7C3AED]',
      textClass: 'text-white',
      contrastRatio: '5.2:1 against light canvas',
    },
  ];

  const colorRules: ColorRule[] = [
    {
      id: 'RULE_60_30_10',
      ruleTitle: 'Rule 01: The 60-30-10 Distribution Rule',
      ruleStandard: '60% dominant neutral background canvas, 30% structural ink & cards, 10% high-intent accent color.',
      badSlop: 'Covering 50% of the screen with saturated purple or gradient cards that overwhelm visual focus.',
      uxImpact: 'Provides visual rest and immediately guides the user’s eyes to the single most important action.',
    },
    {
      id: 'WCAG_CONTRAST',
      ruleTitle: 'Rule 02: Strict WCAG 2.1 Contrast (4.5:1 / 7:1)',
      ruleStandard: 'Body text must maintain at least 4.5:1 contrast; critical tabular numbers must exceed 7:1 (AAA).',
      badSlop: 'Using faint light-grey text (#9CA3AF) on white backgrounds (2.1:1 ratio) that vanishes in glare.',
      uxImpact: 'Guarantees readable data in outdoor sunlight and accommodates 250M+ low-vision users globally.',
    },
    {
      id: 'DUAL_CODING',
      ruleTitle: 'Rule 03: Never Rely on Color Alone (Dual-Coding)',
      ruleStandard: 'Always pair color changes with an icon, explicit text badge, or underline for colorblind users.',
      badSlop: 'Showing a bare red dot for error and a green dot for success with zero text label or icon.',
      uxImpact: 'Protects 8% of male users who have red-green color blindness from making catastrophic errors.',
    },
    {
      id: 'SEMANTIC_CONSTANCY',
      ruleTitle: 'Rule 04: Semantic Color Constancy',
      ruleStandard: 'Universal meanings must never be flipped: Red is destructive, Green is positive, Amber is caution.',
      badSlop: 'Using Red as a playful brand button for "Sign Up" or Green for a destructive "Wipe Database" action.',
      uxImpact: 'Leverages users’ existing mental models, eliminating catastrophic confirmation misclicks.',
    },
    {
      id: 'LUMINANCE_MAPPING',
      ruleTitle: 'Rule 05: Proper Light/Dark Luminance Inversion',
      ruleStandard: 'Do not simply invert RGB values. Re-calibrate luminance so elevated cards appear lighter than the canvas.',
      badSlop: 'Inverting dark mode naively, causing modals and dropdowns to look darker than the background.',
      uxImpact: 'Maintains consistent spatial depth and elevation hierarchy across all viewing environments.',
    },
    {
      id: 'STATE_DELTAS',
      ruleTitle: 'Rule 06: Deterministic State Tone Deltas',
      ruleStandard: 'Hover states shift luminance by +6%; active pressed states darken by -8% with tactile haptic/audio feedback.',
      badSlop: 'Static flat buttons that give zero visual delta when hovered or pressed.',
      uxImpact: 'Closes the human sensory feedback loop and confirms user intent with physical responsiveness.',
    },
  ];

  const activeSwatch = swatches.find((s) => s.id === selectedColor) || swatches[0];
  const currentRule = colorRules[selectedRule];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-10 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            08 / Color System & Standard UX Laws
          </span>
        </div>
        {/* Toggle between Palette & UX Rules */}
        <div className="flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => { sound.playClick(1.1); setActiveTab('PALETTE'); }}
            className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'PALETTE'
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] font-bold'
                : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
            }`}
          >
            SEMANTIC PALETTE (8)
          </button>
          <button
            onClick={() => { sound.playClick(1.1); setActiveTab('RULES'); }}
            className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'RULES'
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] font-bold'
                : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
            }`}
          >
            STANDARD UX COLOR LAWS (6)
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-auto py-2 space-y-3">
        <div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#11100E]">
            {activeTab === 'PALETTE' ? 'COLOR SHOULD HAVE A JOB.' : 'STANDARD UX LAWS FOR COLOR.'}
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-[#77736B] font-medium">
            {activeTab === 'PALETTE'
              ? 'Never pick 12 random hex colors from a palette generator. Give every tone a deterministic semantic role:'
              : 'Empirical color rules backed by WCAG guidelines, cognitive psychology, and accessibility science:'}
          </p>
        </div>

        {activeTab === 'PALETTE' ? (
          /* TAB 1: 8 SEMANTIC SWATCHES + LIVE COMPONENT SIMULATOR */
          <div className="space-y-3">
            {/* 8 Swatches */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono">
              {swatches.map((s) => {
                const isSelected = selectedColor === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      sound.playClick(1.2);
                      setSelectedColor(s.id);
                    }}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'ring-2 ring-[#11100E] shadow-md border-[#11100E] bg-white'
                        : 'border-[#11100E]/15 hover:border-[#11100E]/60 bg-[#F5F1E8]'
                    }`}
                  >
                    <div className={`w-full h-7 rounded-lg ${s.bgClass} border border-black/10 mb-1.5 flex items-end p-1`}>
                      <span className={`text-[8px] font-bold ${s.textClass}`}>{s.hex}</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-[#11100E] truncate">{s.name}</div>
                      <div className="text-[9px] text-[#77736B] tracking-tight uppercase truncate mt-0.5">{s.job}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Interactive Application Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 space-y-3">
              <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#11100E]">{activeSwatch.name}</span>
                  <span className="text-[#77736B]">/ ROLE:</span>
                  <span className="font-bold px-2 py-0.5 rounded bg-[#11100E] text-white text-[10px]">
                    {activeSwatch.job}
                  </span>
                </div>
                <span className="text-[10px] text-[#16A34A] font-bold">CONTRAST: {activeSwatch.contrastRatio}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center font-mono">
                <div className="md:col-span-8 space-y-2">
                  <p className="text-xs font-medium text-[#11100E] leading-relaxed">
                    {activeSwatch.roleDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setAppState('IDLE');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#11100E] text-[#F5F1E8] font-bold cursor-pointer hover:bg-black active:translate-y-0.5"
                    >
                      Trigger Normal Action
                    </button>
                    <button
                      onClick={() => {
                        sound.playSlopAlert();
                        setAppState('WARNING');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/30 font-bold cursor-pointer hover:bg-[#DC2626]/20 active:translate-y-0.5"
                    >
                      Trigger Error Alert (Red)
                    </button>
                    <button
                      onClick={() => {
                        sound.playSuccess();
                        setAppState('SUCCESS');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30 font-bold cursor-pointer hover:bg-[#16A34A]/20 active:translate-y-0.5"
                    >
                      Trigger Success Event (Green)
                    </button>
                  </div>
                </div>

                <div
                  className="md:col-span-4 p-4 rounded-xl border border-black/10 flex flex-col justify-center items-center text-center space-y-1 shadow-xs"
                  style={{ backgroundColor: activeSwatch.hex }}
                >
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${activeSwatch.textClass}`}>
                    ACTIVE ROLE SURFACE
                  </span>
                  <div className={`text-base font-bold ${activeSwatch.textClass}`}>
                    {appState === 'IDLE' ? 'System Steady' : appState === 'WARNING' ? 'Slop Warning Alert' : 'Deterministic Pass'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: STANDARD UX RULES FOR COLOR */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* 6 Color Rule Selectors (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-1.5 font-mono text-xs">
              {colorRules.map((r, idx) => {
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
                    <ShieldCheck className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#16A34A]' : 'opacity-30'}`} />
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
                    <div className="text-[10px] font-bold text-[#16A34A] mb-1">✓ THE UX LAW</div>
                    <div className="text-[#11100E] font-medium leading-relaxed">{currentRule.ruleStandard}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#DC2626]/8 border border-[#DC2626]/20">
                    <div className="text-[10px] font-bold text-[#DC2626] mb-1">✗ COMMON AI SLOP MISTAKE</div>
                    <div className="text-[#11100E]">{currentRule.badSlop}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#E9E1D3] border border-[#11100E]/10">
                    <div className="text-[10px] font-bold text-[#77736B] mb-0.5">USER BENEFIT</div>
                    <div className="text-[#11100E] text-[11px]">{currentRule.uxImpact}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#11100E]/10 flex items-center justify-between text-[11px] text-[#77736B]">
                <span>Color Law {selectedRule + 1} of 6</span>
                <span className="font-bold text-[#11100E]">Standardized Design Systems</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Color is semantic communication, never decorative wallpaper.</span>
        <span>08 / 26</span>
      </div>
    </div>
  );
};
