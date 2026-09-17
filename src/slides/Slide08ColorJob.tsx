import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Palette, ShieldCheck, Check, X, Copy, CheckCircle2, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

interface Swatch {
  id: string;
  name: string;
  hex: string;
  job: string;
  roleDescription: string;
  bgClass: string;
  textClass: string;
  contrastRatio: string;
  semanticType: 'CANVAS' | 'STRUCTURE' | 'ACTION' | 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO' | 'MUTED';
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
  const [selectedColor, setSelectedColor] = useState<string>('BLUE');
  const [selectedRule, setSelectedRule] = useState<number>(0);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Live Component Simulator State
  const [appState, setAppState] = useState<'IDLE' | 'SUCCESS' | 'WARNING' | 'ERROR'>('IDLE');

  const swatches: Swatch[] = [
    {
      id: 'BEIGE',
      name: 'Warm Canvas',
      hex: '#E9E1D3',
      job: 'BASE CANVAS (60%)',
      roleDescription: 'Tactile neutral background that anchors the workspace, reduces glare, and creates calm focus.',
      bgClass: 'bg-[#E9E1D3]',
      textClass: 'text-[#11100E]',
      contrastRatio: '14.2:1 against near-black',
      semanticType: 'CANVAS',
    },
    {
      id: 'INK',
      name: 'Structural Ink',
      hex: '#11100E',
      job: 'STRUCTURE & TYPE (30%)',
      roleDescription: 'Deep near-black tone for high-contrast typography, structural 1px borders, and prominent surfaces.',
      bgClass: 'bg-[#11100E]',
      textClass: 'text-[#F5F1E8]',
      contrastRatio: '15.8:1 against white',
      semanticType: 'STRUCTURE',
    },
    {
      id: 'BLUE',
      name: 'Cobalt Focus',
      hex: '#2563EB',
      job: 'PRIMARY ACTION (10%)',
      roleDescription: 'Primary buttons, active link anchors, keyboard focus rings, and high-priority interactive flows.',
      bgClass: 'bg-[#2563EB]',
      textClass: 'text-white',
      contrastRatio: '4.9:1 against light canvas',
      semanticType: 'ACTION',
    },
    {
      id: 'GREEN',
      name: 'Emerald Verified',
      hex: '#16A34A',
      job: 'SUCCESS / CONFIRMED',
      roleDescription: 'Deployed environments, passing test suites, healthy metrics, and positive financial deltas.',
      bgClass: 'bg-[#16A34A]',
      textClass: 'text-white',
      contrastRatio: '5.1:1 against canvas',
      semanticType: 'SUCCESS',
    },
    {
      id: 'RED',
      name: 'Crimson Alert',
      hex: '#DC2626',
      job: 'DESTRUCTIVE / ERROR',
      roleDescription: 'Critical failures, destructive purge events, irreversible actions, and security alerts.',
      bgClass: 'bg-[#DC2626]',
      textClass: 'text-white',
      contrastRatio: '4.8:1 against canvas',
      semanticType: 'ERROR',
    },
    {
      id: 'AMBER',
      name: 'Amber Warning',
      hex: '#D97706',
      job: 'CAUTION / ATTENTION',
      roleDescription: 'Non-blocking cautions, pending reviews, active tab indicators, and rate-limit thresholds.',
      bgClass: 'bg-[#D97706]',
      textClass: 'text-white',
      contrastRatio: '4.6:1 against dark ink',
      semanticType: 'WARNING',
    },
    {
      id: 'TEAL',
      name: 'Teal Telemetry',
      hex: '#0D9488',
      job: 'INFO & TELEMETRY',
      roleDescription: 'Informational badges, runtime latency tags, live streaming indicators, and telemetry signals.',
      bgClass: 'bg-[#0D9488]',
      textClass: 'text-white',
      contrastRatio: '4.7:1 against canvas',
      semanticType: 'INFO',
    },
    {
      id: 'SLATE',
      name: 'Muted Graphite',
      hex: '#77736B',
      job: 'SECONDARY METADATA',
      roleDescription: 'Timestamps, column headers, subtle dividing strokes, and muted secondary subtitles.',
      bgClass: 'bg-[#77736B]',
      textClass: 'text-white',
      contrastRatio: '4.7:1 against light canvas',
      semanticType: 'MUTED',
    },
  ];

  const colorRules: ColorRule[] = [
    {
      id: 'RULE_60_30_10',
      ruleTitle: 'Rule 01: The 60-30-10 Distribution Rule',
      ruleStandard: '60% dominant neutral background canvas, 30% structural ink & cards, 10% high-intent semantic accent.',
      badSlop: 'Flooding screens with saturated multi-color gradients and random badges that fatigue user attention.',
      uxImpact: 'Provides visual tranquility and immediately guides the user’s eyes to the single most important action.',
    },
    {
      id: 'WCAG_CONTRAST',
      ruleTitle: 'Rule 02: Strict WCAG 2.1 Contrast (AAA)',
      ruleStandard: 'Body text requires at least 4.5:1 (AA) and preferably 7:1+ (AAA) against its direct background canvas.',
      badSlop: 'Using faint light-grey text on white backgrounds that washes out in bright ambient light.',
      uxImpact: 'Guarantees total readability in outdoor sunlight and accommodates all vision spectrums.',
    },
    {
      id: 'DUAL_CODING',
      ruleTitle: 'Rule 03: Rely on Shape & Copy, Not Color Alone',
      ruleStandard: 'Pair every colored indicator with an explicit label, distinctive icon, or structural border (Dual Coding).',
      badSlop: 'Showing isolated colored dots with zero labels, breaking comprehension for colorblind users.',
      uxImpact: 'Accessible by design: 100% understandable even in pure grayscale or high-contrast mode.',
    },
    {
      id: 'SEMANTIC_CONSISTENCY',
      ruleTitle: 'Rule 04: Semantic Intent Is Sacred',
      ruleStandard: 'Red means destruction or error. Green means success. Blue means action. Amber means caution. Never swap.',
      badSlop: 'Using green for a generic "Cancel" button or red for an informational notification badge.',
      uxImpact: 'Honors established user mental models, eliminating cognitive hesitation and misclicks.',
    },
    {
      id: 'MONOCHROME_DISCIPLINE',
      ruleTitle: 'Rule 05: The Monochrome Restraint Test',
      ruleStandard: 'A great user interface must function flawlessly and look stunning in black and beige alone.',
      badSlop: 'Hiding poor spatial structure and random margins behind gaudy decorative illustrations.',
      uxImpact: 'Forces the designer to solve real hierarchy, spacing, and typographic weight first.',
    },
    {
      id: 'TACTILE_DELTAS',
      ruleTitle: 'Rule 06: State Feedback via Contrast & Sound',
      ruleStandard: 'Hover brightens or elevates surface; active press inverts or depresses with an authentic mechanical click.',
      badSlop: 'Flat static elements that provide zero tactile response or visual confirmation when clicked.',
      uxImpact: 'Gives users instant, physical confirmation that their interaction succeeded.',
    },
  ];

  const activeSwatch = swatches.find((s) => s.id === selectedColor) || swatches[2];
  const currentRule = colorRules[selectedRule];

  const copyToClipboard = (hex: string) => {
    sound.playSuccess();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

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
            REAL COLOR PALETTE (8)
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
            {activeTab === 'PALETTE' ? 'COLOR HAS A FUNCTIONAL JOB.' : 'SIMPLE COLOR RULES THAT WORK.'}
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-[#77736B] font-medium">
            {activeTab === 'PALETTE'
              ? 'Color is functional syntax — not decoration. Every hue must execute a clear job: Canvas, Structure, Action, Success, Error, or Warning:'
              : 'Proven design principles that keep interfaces calm, readable, and timeless:'}
          </p>
        </div>

        {activeTab === 'PALETTE' ? (
          /* TAB 1: 8 REAL PRODUCTION SWATCHES + LIVE COMPONENT SIMULATOR */
          <div className="space-y-3">
            {/* 8 Real Swatches */}
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
                      className="w-full h-8 rounded-lg mb-1.5 flex items-end justify-between p-1.5 shadow-xs border border-black/10"
                      style={{ backgroundColor: s.hex }}
                    >
                      <span className={`text-[9px] font-bold ${s.textClass}`}>{s.hex}</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-[#11100E] truncate">{s.name}</div>
                      <div className="text-[8.5px] text-[#77736B] tracking-tight uppercase truncate mt-0.5 font-semibold">
                        {s.job.split(' ')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Interactive Application Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 space-y-3 shadow-xs">
              <div className="flex flex-wrap items-center justify-between border-b border-[#11100E]/10 pb-2.5 font-mono text-xs gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: activeSwatch.hex }}
                  />
                  <span className="font-bold text-[#11100E] text-sm">{activeSwatch.name}</span>
                  <span className="text-[#77736B] text-xs">/ JOB:</span>
                  <span
                    className="font-bold px-2 py-0.5 rounded text-[10px] text-white"
                    style={{ backgroundColor: activeSwatch.hex === '#E9E1D3' ? '#11100E' : activeSwatch.hex }}
                  >
                    {activeSwatch.job}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#11100E] font-bold">
                    CONTRAST: {activeSwatch.contrastRatio}
                  </span>
                  <button
                    onClick={() => copyToClipboard(activeSwatch.hex)}
                    className="px-2.5 py-1 rounded bg-white text-[#11100E] border border-[#11100E]/20 hover:bg-[#11100E] hover:text-[#F5F1E8] transition-colors flex items-center gap-1.5 text-[10px] font-bold cursor-pointer"
                  >
                    {copiedHex === activeSwatch.hex ? <Check className="w-3 h-3 text-[#16A34A]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHex === activeSwatch.hex ? 'COPIED!' : activeSwatch.hex}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center font-mono">
                {/* Left: Role description and state triggers */}
                <div className="md:col-span-8 space-y-3">
                  <p className="text-xs font-medium text-[#11100E] leading-relaxed">
                    {activeSwatch.roleDescription}
                  </p>

                  {/* Interactive Semantic State Triggers */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold text-[#77736B] uppercase tracking-wider">
                      Test Functional UI States with Audio Feedback:
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <button
                        onClick={() => {
                          sound.playClick(1.2);
                          setAppState('IDLE');
                        }}
                        className={`px-3 py-1.5 rounded-lg border font-bold cursor-pointer transition-all active:translate-y-0.5 ${
                          appState === 'IDLE'
                            ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                            : 'bg-white text-[#11100E] border-[#11100E]/20 hover:border-[#2563EB]'
                        }`}
                      >
                        Action Focus (Blue)
                      </button>
                      <button
                        onClick={() => {
                          sound.playSuccess();
                          setAppState('SUCCESS');
                        }}
                        className={`px-3 py-1.5 rounded-lg border font-bold cursor-pointer transition-all active:translate-y-0.5 ${
                          appState === 'SUCCESS'
                            ? 'bg-[#16A34A] text-white border-[#16A34A] shadow-xs'
                            : 'bg-white text-[#16A34A] border-[#16A34A]/40 hover:bg-[#16A34A]/10'
                        }`}
                      >
                        Success (Green)
                      </button>
                      <button
                        onClick={() => {
                          sound.playClick(1.4);
                          setAppState('WARNING');
                        }}
                        className={`px-3 py-1.5 rounded-lg border font-bold cursor-pointer transition-all active:translate-y-0.5 ${
                          appState === 'WARNING'
                            ? 'bg-[#D97706] text-white border-[#D97706] shadow-xs'
                            : 'bg-white text-[#D97706] border-[#D97706]/40 hover:bg-[#D97706]/10'
                        }`}
                      >
                        Warning (Amber)
                      </button>
                      <button
                        onClick={() => {
                          sound.playSlopAlert();
                          setAppState('ERROR');
                        }}
                        className={`px-3 py-1.5 rounded-lg border font-bold cursor-pointer transition-all active:translate-y-0.5 ${
                          appState === 'ERROR'
                            ? 'bg-[#DC2626] text-white border-[#DC2626] shadow-xs'
                            : 'bg-white text-[#DC2626] border-[#DC2626]/40 hover:bg-[#DC2626]/10'
                        }`}
                      >
                        Destructive (Red)
                      </button>
                    </div>
                  </div>

                  {/* Color Combinator Chips */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-bold text-[#77736B] uppercase tracking-wider">
                      Palette Swatch Quick-Pick:
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {swatches.map((s) => (
                        <button
                          key={'chip-' + s.id}
                          onClick={() => {
                            sound.playClick(1.1);
                            setSelectedColor(s.id);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                            selectedColor === s.id
                              ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
                              : 'bg-white text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
                          }`}
                        >
                          <span
                            className="w-2 h-2 rounded-full border border-black/20"
                            style={{ backgroundColor: s.hex }}
                          />
                          <span>{s.name.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Live Interactive Card Preview */}
                <div className="md:col-span-4">
                  {(() => {
                    const stateColor =
                      appState === 'SUCCESS'
                        ? '#16A34A'
                        : appState === 'WARNING'
                        ? '#D97706'
                        : appState === 'ERROR'
                        ? '#DC2626'
                        : '#2563EB';

                    const stateIcon =
                      appState === 'SUCCESS' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      ) : appState === 'WARNING' ? (
                        <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                      ) : appState === 'ERROR' ? (
                        <AlertCircle className="w-4 h-4 text-[#DC2626]" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-[#2563EB]" />
                      );

                    const stateLabel =
                      appState === 'SUCCESS'
                        ? 'PAYMENT VERIFIED'
                        : appState === 'WARNING'
                        ? 'RATE LIMIT CAUTION'
                        : appState === 'ERROR'
                        ? 'TRANSACTION HALTED'
                        : 'SYSTEM NOMINAL';

                    return (
                      <div
                        className="p-4 rounded-xl border bg-white flex flex-col justify-between space-y-3 shadow-sm transition-all"
                        style={{ borderColor: `${stateColor}40` }}
                      >
                        <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2">
                          <div className="flex items-center gap-1.5">
                            {stateIcon}
                            <span
                              className="text-[10px] font-mono font-bold tracking-wider"
                              style={{ color: stateColor }}
                            >
                              {stateLabel}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono text-[#77736B]">v2.4.0</span>
                        </div>

                        <div>
                          <div className="text-sm font-bold text-[#11100E] leading-snug">
                            {appState === 'SUCCESS'
                              ? 'Production API Live'
                              : appState === 'WARNING'
                              ? '94% Quota Reached'
                              : appState === 'ERROR'
                              ? 'Build Pipeline Failed'
                              : 'Ready for Deployment'}
                          </div>
                          <p className="text-[10px] text-[#77736B] mt-1 leading-relaxed">
                            {appState === 'SUCCESS'
                              ? 'All 14 unit test assertions cleared without regressions.'
                              : appState === 'WARNING'
                              ? 'Throttling background jobs to prevent API rate exhaustion.'
                              : appState === 'ERROR'
                              ? 'Syntax error in component tree. Automatic rollback triggered.'
                              : 'Color communicates condition immediately without ambiguity.'}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#11100E]/10 flex items-center justify-between">
                          <span className="text-[10px] font-mono font-semibold text-[#77736B]">
                            {activeSwatch.hex}
                          </span>
                          <button
                            onClick={() => {
                              sound.playClick(1.3);
                              setAppState(
                                appState === 'IDLE'
                                  ? 'SUCCESS'
                                  : appState === 'SUCCESS'
                                  ? 'WARNING'
                                  : appState === 'WARNING'
                                  ? 'ERROR'
                                  : 'IDLE'
                              );
                            }}
                            className="px-2.5 py-1 rounded text-[10px] font-bold text-white cursor-pointer transition-transform active:scale-95 shadow-xs"
                            style={{ backgroundColor: stateColor }}
                          >
                            Next State →
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: SIMPLE COLOR RULES THAT WORK */
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
                    <div className="text-[10px] font-bold text-[#16A34A] mb-1 flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#16A34A]" />
                      <span>THE GOLDEN RULE</span>
                    </div>
                    <div className="text-[#11100E] font-medium leading-relaxed">
                      {currentRule.ruleStandard}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#E9E1D3] border border-[#11100E]/15">
                    <div className="text-[10px] font-bold text-[#DC2626] mb-1 flex items-center gap-1">
                      <X className="w-3 h-3 text-[#DC2626]" />
                      <span>COMMON DESIGN MISTAKE</span>
                    </div>
                    <div className="text-[#11100E]">{currentRule.badSlop}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/70 border border-[#11100E]/10">
                    <div className="text-[10px] font-bold text-[#2563EB] mb-0.5">USER BENEFIT</div>
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
