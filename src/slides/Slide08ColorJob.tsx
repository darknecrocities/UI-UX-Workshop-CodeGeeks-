import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Palette, ShieldCheck, Check, X } from 'lucide-react';

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
  // Color theory combinator — Beige & Black Only
  const [bgPick, setBgPick] = useState<string>('INK');
  const [textPick, setTextPick] = useState<string>('BEIGE');
  const [mixMode, setMixMode] = useState<'MONO' | 'SPLIT' | 'SURFACE'>('MONO');

  const swatches: Swatch[] = [
    {
      id: 'BEIGE',
      name: 'Parchment Canvas',
      hex: '#E9E1D3',
      job: 'BASE CANVAS (60%)',
      roleDescription: 'Tactile parchment background that reduces glare and eye fatigue during long workshop and coding sessions.',
      bgClass: 'bg-[#E9E1D3]',
      textClass: 'text-[#11100E]',
      contrastRatio: '14.2:1 against near-black',
    },
    {
      id: 'INK',
      name: 'Structural Ink',
      hex: '#11100E',
      job: 'STRUCTURE & TYPE (30%)',
      roleDescription: 'Deep near-black tone for high-contrast typography, structural 1px borders, and primary action buttons.',
      bgClass: 'bg-[#11100E]',
      textClass: 'text-[#F5F1E8]',
      contrastRatio: '15.8:1 against white',
    },
    {
      id: 'PAPER',
      name: 'Paper Cream',
      hex: '#F5F1E8',
      job: 'CONTAINER SURFACE',
      roleDescription: 'Card and container background offering soft architectural separation from the base canvas.',
      bgClass: 'bg-[#F5F1E8]',
      textClass: 'text-[#11100E]',
      contrastRatio: '13.9:1 against ink',
    },
    {
      id: 'SURFACE',
      name: 'Elevated Surface',
      hex: '#FAF7F2',
      job: 'ELEVATED CARDS',
      roleDescription: 'Clean off-white surface for floating dialogs, interactive cards, and active selected states.',
      bgClass: 'bg-[#FAF7F2]',
      textClass: 'text-[#11100E]',
      contrastRatio: '15.2:1 against ink',
    },
    {
      id: 'GRAPHITE',
      name: 'Muted Graphite',
      hex: '#77736B',
      job: 'METADATA (10%)',
      roleDescription: 'Captions, timestamps, column headers, and secondary subtitles that guide without shouting.',
      bgClass: 'bg-[#77736B]',
      textClass: 'text-white',
      contrastRatio: '4.8:1 against light canvas',
    },
    {
      id: 'HAIRLINE',
      name: 'Hairline Stroke',
      hex: '#D8D3C8',
      job: 'ARCHITECTURAL DIVIDERS',
      roleDescription: 'Subtle 1px structural dividers and grid lines defining layout rhythm without visual noise.',
      bgClass: 'bg-[#D8D3C8]',
      textClass: 'text-[#11100E]',
      contrastRatio: '3.2:1 structural divider',
    },
    {
      id: 'CHARCOAL',
      name: 'Deep Charcoal',
      hex: '#1C1A18',
      job: 'TERMINAL & HUD SHELL',
      roleDescription: 'Dark modular containers for console navigation, HUD controls, and focus states.',
      bgClass: 'bg-[#1C1A18]',
      textClass: 'text-[#F5F1E8]',
      contrastRatio: '14.6:1 against cream',
    },
    {
      id: 'WHITE',
      name: 'Pure Contrast',
      hex: '#FFFFFF',
      job: 'HIGH-CONTRAST INVERT',
      roleDescription: 'Crisp inverted badges, pill containers, and stark tabular metric panels.',
      bgClass: 'bg-[#FFFFFF]',
      textClass: 'text-[#11100E]',
      contrastRatio: '18.1:1 against ink',
    },
  ];

  const colorRules: ColorRule[] = [
    {
      id: 'RULE_60_30_10',
      ruleTitle: 'Rule 01: The 60-30-10 Neutral Rule',
      ruleStandard: '60% parchment canvas, 30% structural ink & cards, 10% secondary graphite metadata.',
      badSlop: 'Flooding screens with chaotic chromatic gradients and rainbow badges that fatigue the user.',
      uxImpact: 'Provides visual tranquility and immediately anchors the eye to intentional typography.',
    },
    {
      id: 'WCAG_CONTRAST',
      ruleTitle: 'Rule 02: Strict WCAG 2.1 Contrast (AAA)',
      ruleStandard: 'Near-black on warm beige yields 14.2:1 to 18.1:1 contrast, dramatically exceeding WCAG AAA (7:1).',
      badSlop: 'Using faint light-grey text on white backgrounds that washes out in bright ambient light.',
      uxImpact: 'Guarantees total readability in outdoor sunlight and accommodates all vision spectrums.',
    },
    {
      id: 'DUAL_CODING',
      ruleTitle: 'Rule 03: Rely on Shape & Copy, Not Color Alone',
      ruleStandard: 'Differentiate states with clear icons, explicit copy, borders, and tactile position rather than colored dots.',
      badSlop: 'Showing isolated colored dots with zero labels, breaking comprehension for colorblind users.',
      uxImpact: 'Accessible by design: 100% understandable even in pure grayscale or monochrome mode.',
    },
    {
      id: 'LUMINANCE_HIERARCHY',
      ruleTitle: 'Rule 04: Luminance Creates Depth, Not Hue',
      ruleStandard: 'Use lightness layers (Canvas → Container → Elevated Card) to build true spatial depth.',
      badSlop: 'Layering clashing hues to force visual separation instead of disciplined tonal hierarchy.',
      uxImpact: 'Eliminates visual fatigue and produces an interface that feels calm, tactile, and premium.',
    },
    {
      id: 'MONOCHROME_DISCIPLINE',
      ruleTitle: 'Rule 05: The Monochrome Restraint Test',
      ruleStandard: 'A great user interface must function flawlessly and look stunning in black and beige alone.',
      badSlop: 'Hiding poor spatial structure behind gaudy neon colors and decorative illustrations.',
      uxImpact: 'Forces the designer to solve real hierarchy, spacing, and typographic weight first.',
    },
    {
      id: 'TACTILE_DELTAS',
      ruleTitle: 'Rule 06: State Feedback via Contrast & Sound',
      ruleStandard: 'Hover brightens surface; active press inverts or depresses with an authentic mechanical click.',
      badSlop: 'Flat static elements that provide zero tactile response when clicked.',
      uxImpact: 'Gives users instant, physical confirmation that their interaction succeeded.',
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
            08 / Color System & Visual Rules
          </span>
        </div>
        {/* Toggle between Palette & UX Rules */}
        <div className="flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => {
              sound.playClick(1.1);
              setActiveTab('PALETTE');
            }}
            className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'PALETTE'
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] font-bold'
                : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
            }`}
          >
            TONAL PALETTE (8)
          </button>
          <button
            onClick={() => {
              sound.playClick(1.1);
              setActiveTab('RULES');
            }}
            className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'RULES'
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] font-bold'
                : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
            }`}
          >
            6 COLOR RULES
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-auto py-2 space-y-3">
        <div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#11100E]">
            {activeTab === 'PALETTE' ? 'COLOR SHOULD HAVE A JOB.' : 'SIMPLE COLOR RULES THAT WORK.'}
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-[#77736B] font-medium">
            {activeTab === 'PALETTE'
              ? 'Never pick random hex colors from a generator. Restraint wins — master the beige & black palette:'
              : 'Proven design principles that keep interfaces calm, readable, and timeless:'}
          </p>
        </div>

        {activeTab === 'PALETTE' ? (
          /* TAB 1: 8 TONAL SWATCHES + LIVE COMPONENT SIMULATOR */
          <div className="space-y-3">
            {/* 8 Swatches — Beige & Black Only */}
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
                    <div
                      className={`w-full h-7 rounded-lg ${s.bgClass} border border-black/15 mb-1.5 flex items-end p-1 shadow-2xs`}
                    >
                      <span className={`text-[8px] font-bold ${s.textClass}`}>{s.hex}</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-[#11100E] truncate">{s.name}</div>
                      <div className="text-[9px] text-[#77736B] tracking-tight uppercase truncate mt-0.5">
                        {s.job}
                      </div>
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
                  <span className="font-bold px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] text-[10px]">
                    {activeSwatch.job}
                  </span>
                </div>
                <span className="text-[10px] text-[#11100E] font-bold">
                  CONTRAST: {activeSwatch.contrastRatio}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center font-mono">
                <div className="md:col-span-8 space-y-3">
                  <p className="text-xs font-medium text-[#11100E] leading-relaxed">
                    {activeSwatch.roleDescription}
                  </p>

                  {/* Color Theory Combinator — Pure Beige & Black */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-[#77736B] uppercase tracking-wider">
                      Tonal Harmony Builder — pick bg + text, see AAA contrast:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(['MONO', 'SPLIT', 'SURFACE'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => {
                            sound.playClick(1.1);
                            setMixMode(m);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border cursor-pointer transition-all ${
                            mixMode === m
                              ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
                              : 'bg-white text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
                          }`}
                        >
                          {m === 'MONO'
                            ? 'Monochrome'
                            : m === 'SPLIT'
                            ? 'Split Parchment'
                            : 'Surface Card'}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="space-y-1">
                        <div className="text-[9px] font-bold text-[#77736B] uppercase">Background</div>
                        <div className="flex gap-1 flex-wrap">
                          {swatches.slice(0, mixMode === 'MONO' ? 2 : 8).map((s) => (
                            <button
                              key={'bg-' + s.id}
                              onClick={() => {
                                sound.playClick(1.0);
                                setBgPick(s.id);
                              }}
                              title={s.name}
                              className={`w-6 h-6 rounded-md border-2 transition-all cursor-pointer ${
                                bgPick === s.id
                                  ? 'border-[#11100E] scale-110 shadow-md ring-2 ring-[#11100E]/20'
                                  : 'border-black/20 hover:border-[#11100E]'
                              }`}
                              style={{ backgroundColor: s.hex }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[9px] font-bold text-[#77736B] uppercase">Text / Foreground</div>
                        <div className="flex gap-1 flex-wrap">
                          {swatches.slice(0, mixMode === 'MONO' ? 2 : 8).map((s) => (
                            <button
                              key={'txt-' + s.id}
                              onClick={() => {
                                sound.playClick(1.0);
                                setTextPick(s.id);
                              }}
                              title={s.name}
                              className={`w-6 h-6 rounded-md border-2 transition-all cursor-pointer ${
                                textPick === s.id
                                  ? 'border-[#11100E] scale-110 shadow-md ring-2 ring-[#11100E]/20'
                                  : 'border-black/20 hover:border-[#11100E]'
                              }`}
                              style={{ backgroundColor: s.hex }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Preview Card */}
                {(() => {
                  const bgSwatch = swatches.find((s) => s.id === bgPick) || swatches[1];
                  const txtSwatch = swatches.find((s) => s.id === textPick) || swatches[0];
                  return (
                    <div
                      className="md:col-span-4 p-4 rounded-xl border border-black/20 flex flex-col justify-between space-y-2 shadow-xs min-h-[100px]"
                      style={{ backgroundColor: bgSwatch.hex }}
                    >
                      <div
                        className="text-[9px] font-mono font-bold uppercase tracking-wider"
                        style={{ color: txtSwatch.hex }}
                      >
                        ACTIVE ROLE SURFACE
                      </div>
                      <div
                        className="text-base font-bold leading-tight"
                        style={{ color: txtSwatch.hex }}
                      >
                        {bgSwatch.name}
                      </div>
                      <div
                        className="text-[10px] font-mono"
                        style={{ color: txtSwatch.hex, opacity: 0.75 }}
                      >
                        {bgSwatch.hex} × {txtSwatch.hex}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: SIMPLE COLOR RULES THAT WORK — BEIGE & BLACK ONLY */
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
                    <ShieldCheck
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isSelected ? 'text-[#F5F1E8]' : 'text-[#11100E]/40'
                      }`}
                    />
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
                  <div className="p-3 rounded-lg bg-white border border-[#11100E]/20">
                    <div className="text-[10px] font-bold text-[#11100E] mb-1 flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#11100E]" />
                      <span>THE GOLDEN RULE</span>
                    </div>
                    <div className="text-[#11100E] font-medium leading-relaxed">
                      {currentRule.ruleStandard}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#E9E1D3] border border-[#11100E]/15">
                    <div className="text-[10px] font-bold text-[#77736B] mb-1 flex items-center gap-1">
                      <X className="w-3 h-3 text-[#77736B]" />
                      <span>COMMON DESIGN MISTAKE</span>
                    </div>
                    <div className="text-[#11100E]">{currentRule.badSlop}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/70 border border-[#11100E]/10">
                    <div className="text-[10px] font-bold text-[#77736B] mb-0.5">USER BENEFIT</div>
                    <div className="text-[#11100E] text-[11px]">{currentRule.uxImpact}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#11100E]/10 flex items-center justify-between text-[11px] text-[#77736B]">
                <span>Rule {selectedRule + 1} of 6</span>
                <span className="font-bold text-[#11100E]">Consistent Color Rules</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Use color with purpose, not just for decoration.</span>
        <span>08 / 26</span>
      </div>
    </div>
  );
};
