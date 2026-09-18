import React, { useState } from 'react';
import { sound } from '../audio/sound';
import {
  Compass,
  Calendar,
  User,
  Zap,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

type BlueprintType = 'EVENT' | 'PORTFOLIO';

interface BlueprintSection {
  step: string;
  name: string;
  purpose: string;
  conversionRole: string;
  uiTip: string;
}

export const Slide16SingleScroll: React.FC = () => {
  const [blueprint, setBlueprint] = useState<BlueprintType>('EVENT');
  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const eventSections: BlueprintSection[] = [
    {
      step: '01',
      name: 'HERO HOOK & STICKY CTA',
      purpose: 'State Date, Location & Immediate Value Proposition in 3 seconds.',
      conversionRole: 'Captures 70% of instant high-intent RSVPs without scrolling.',
      uiTip: 'Pin a sticky RSVP pill to viewport corner so conversion is always 1 click away.',
    },
    {
      step: '02',
      name: 'HEADLINERS & SOCIAL PROOF',
      purpose: 'Showcase keynote speakers, judges, or sponsor logos.',
      conversionRole: 'Establishes instant authority and creates FOMO (Fear of Missing Out).',
      uiTip: 'Use circular avatars with recognizable company tags (Vercel, Figma, Apple).',
    },
    {
      step: '03',
      name: 'INTERACTIVE AGENDA & TRACKS',
      purpose: 'Allow attendees to toggle Day 1 / Day 2 / Tracks without page loads.',
      conversionRole: 'Satisfies logistical evaluation without breaking scroll momentum.',
      uiTip: 'Keep time blocks compact with collapsible description accordions.',
    },
    {
      step: '04',
      name: 'DE-RISKING FAQ & VENUE',
      purpose: 'Eliminate friction: Travel, refunds, dietary, live stream access.',
      conversionRole: 'Removes final hesitation barriers for undecided visitors.',
      uiTip: 'Maximum 5-6 high-signal questions. Do not write a documentation manual.',
    },
    {
      step: '05',
      name: 'FRICTIONLESS CONVERSION PASS',
      purpose: 'Final ticket tier selection or 1-click email registration pass.',
      conversionRole: 'Catches the user at peak accumulated interest after reviewing proof.',
      uiTip: 'Single-column form. Name + Email + Submit. Zero unnecessary dropdowns.',
    },
  ];

  const portfolioSections: BlueprintSection[] = [
    {
      step: '01',
      name: 'IDENTITY & CRAFT STATEMENT',
      purpose: 'Who you are, what you build, and current availability status.',
      conversionRole: 'Hiring managers decide to keep scrolling within 4 seconds.',
      uiTip: 'Clear typography over decorative fluff: "Senior Product Designer building systems at scale."',
    },
    {
      step: '02',
      name: 'SELECTED HERO CASE STUDIES',
      purpose: 'Top 3-4 impactful projects with real shipped metrics, not 20 drafts.',
      conversionRole: 'Demonstrates tangible business outcomes and polished craft.',
      uiTip: 'Show high-resolution interactive previews with role + outcome pills (+40% activation).',
    },
    {
      step: '03',
      name: 'SKILLS & TECH CAPABILITIES',
      purpose: 'Clean categorization of stack, design tooling, and systems thinking.',
      conversionRole: 'Assures technical recruiters that requirements are satisfied.',
      uiTip: 'Group into Design Systems, Frontend Engineering, and Product Strategy.',
    },
    {
      step: '04',
      name: 'PROOF OF RECOGNITION',
      purpose: 'Awards, GitHub stars, conference talks, recommendations.',
      conversionRole: 'Third-party validation elevates you above other applicants.',
      uiTip: 'Quotes with author avatar and LinkedIn verification link.',
    },
    {
      step: '05',
      name: 'DIRECT CALL-TO-ACTION',
      purpose: 'Direct booking link (Cal.com / email / X / GitHub).',
      conversionRole: 'Zero-step gateway to immediate conversation.',
      uiTip: 'Copyable email button with tactile feedback ("Copied to clipboard!").',
    },
  ];

  const activeSections = blueprint === 'EVENT' ? eventSections : portfolioSections;

  const handleSimulate = () => {
    sound.playTap();
    setIsSimulating(true);
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % activeSections.length;
      setActiveSectionIdx(idx);
      sound.playClick(1.0 + idx * 0.1);
      if (idx === activeSections.length - 1) {
        setTimeout(() => setIsSimulating(false), 800);
        clearInterval(interval);
      }
    }, 650);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            17 / Page Architecture · The Continuous Flow
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono px-2 py-0.5 rounded text-[10px] font-bold bg-[#11100E] text-[#F5F1E8]">
            SINGLE-SCROLL ARCHITECTURE
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Pedagogical Framework (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#11100E]/10 text-[#11100E] text-[10px] font-bold uppercase tracking-wider mb-2">
              <Zap className="w-3 h-3 text-[#11100E]" />
              <span>Zero Drop-Off Narrative Momentum</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#11100E] leading-tight font-sans">
              ONE PAGE. ONE GOAL.
              <br />
              <span className="text-[#77736B]">ZERO COGNITIVE FRICTION.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#77736B] leading-relaxed">
              Every extra page load loses <strong>20–40%</strong> of your visitors. When a visitor's decision is binary
              (<em>"RSVP to event"</em> or <em>"Hire this person"</em>), a continuous single-scroll funnel guides attention with unbroken momentum.
            </p>
          </div>

          {/* Blueprint Selector Tabs */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                sound.playClick(1.1);
                setBlueprint('EVENT');
                setActiveSectionIdx(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                blueprint === 'EVENT'
                  ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-sm'
                  : 'bg-[#F5F1E8] text-[#77736B] border-[#11100E]/15 hover:text-[#11100E]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Event / Hackathon Architecture</span>
            </button>

            <button
              onClick={() => {
                sound.playClick(1.2);
                setBlueprint('PORTFOLIO');
                setActiveSectionIdx(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                blueprint === 'PORTFOLIO'
                  ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-sm'
                  : 'bg-[#F5F1E8] text-[#77736B] border-[#11100E]/15 hover:text-[#11100E]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Creative Portfolio Architecture</span>
            </button>
          </div>

          {/* 5-Step Anatomy Accordion Card */}
          <div className="space-y-1.5">
            {activeSections.map((sec, idx) => {
              const isActive = activeSectionIdx === idx;
              return (
                <div
                  key={sec.step}
                  onClick={() => {
                    sound.playClick(1.0 + idx * 0.1);
                    setActiveSectionIdx(idx);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FAF7F2] border-[#11100E] shadow-sm ring-1 ring-[#11100E]/20'
                      : 'bg-[#F5F1E8]/70 border-[#11100E]/10 hover:border-[#11100E]/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px] ${
                          isActive ? 'bg-[#11100E] text-[#F5F1E8]' : 'bg-[#11100E]/10 text-[#77736B]'
                        }`}
                      >
                        {sec.step}
                      </span>
                      <span className="font-black text-[#11100E] tracking-tight">{sec.name}</span>
                    </div>
                    <span className="text-[10px] text-[#77736B] hidden sm:inline">{sec.conversionRole}</span>
                  </div>

                  {isActive && (
                    <div className="mt-2.5 pt-2 border-t border-[#11100E]/10 text-xs space-y-1">
                      <p className="text-[#2D2A26] leading-relaxed">{sec.purpose}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-800 font-bold bg-amber-500/10 p-1.5 rounded-lg border border-amber-600/20 mt-1">
                        <Sparkles className="w-3 h-3 text-amber-700 shrink-0" />
                        <span>TACTICAL UI TIP: {sec.uiTip}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-2 rounded-xl bg-[#F5F1E8] border border-[#11100E]/10">
              <div className="text-base sm:text-lg font-black text-[#11100E]">+38%</div>
              <div className="text-[9px] text-[#77736B]">Conversion vs Multi-Page</div>
            </div>
            <div className="p-2 rounded-xl bg-[#F5F1E8] border border-[#11100E]/10">
              <div className="text-base sm:text-lg font-black text-[#11100E]">0 ms</div>
              <div className="text-[9px] text-[#77736B]">Route Navigation Lag</div>
            </div>
            <div className="p-2 rounded-xl bg-[#F5F1E8] border border-[#11100E]/10">
              <div className="text-base sm:text-lg font-black text-[#11100E]">100%</div>
              <div className="text-[9px] text-[#77736B]">Thumb Scroll Affinity</div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Viewport Mockup (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Browser Chrome Frame */}
          <div className="w-full max-w-sm rounded-2xl border-2 border-[#11100E] bg-[#11100E] shadow-xl overflow-hidden">
            {/* Window Bar */}
            <div className="px-3 py-2 bg-[#181614] flex items-center justify-between border-b border-white/10 text-[9px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-1 text-slate-300 font-mono text-[10px]">
                  {blueprint === 'EVENT' ? 'shipaton.dev' : 'arronparejas.design'}
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold text-[8px]">
                SINGLE-SCROLL FLOW
              </span>
            </div>

            {/* Viewport Canvas */}
            <div className="bg-[#FAF7F2] p-3 text-[#11100E] min-h-[340px] flex flex-col justify-between relative overflow-hidden">
              {/* Sticky Top Nav Mock */}
              <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2 text-[9px]">
                <span className="font-black tracking-tight">
                  {blueprint === 'EVENT' ? '⚡ SHIPATON 2026' : '✦ ARRON PAREJAS'}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[#77736B] hidden sm:inline">#agenda</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#11100E] text-[#F5F1E8] font-bold text-[8px] animate-pulse">
                    {blueprint === 'EVENT' ? 'RSVP NOW' : 'HIRE ME'}
                  </span>
                </div>
              </div>

              {/* Dynamic Active Section Screen Display */}
              <div className="my-auto py-4 text-center space-y-2">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#11100E]/10 text-[9px] font-bold">
                  <span>SECTION {activeSections[activeSectionIdx].step} / 05</span>
                </div>
                <div className="text-lg sm:text-xl font-black tracking-tight text-[#11100E] uppercase font-sans">
                  {activeSections[activeSectionIdx].name}
                </div>
                <p className="text-[11px] text-[#77736B] max-w-xs mx-auto leading-relaxed">
                  {activeSections[activeSectionIdx].purpose}
                </p>

                {/* Wireframe Mini-Graphic Mock based on section */}
                <div className="mt-3 p-3 rounded-xl bg-[#F5F1E8] border border-[#11100E]/15 text-left text-[10px] space-y-1.5 shadow-2xs">
                  {activeSectionIdx === 0 && (
                    <div className="space-y-1">
                      <div className="h-4 w-3/4 bg-[#11100E] rounded" />
                      <div className="h-2.5 w-1/2 bg-[#77736B]/40 rounded" />
                      <div className="h-6 w-full bg-amber-500 rounded flex items-center justify-center text-black font-bold text-[9px] mt-2">
                        {blueprint === 'EVENT' ? 'CLAIM ACCESS PASS →' : 'EXPLORE CASE STUDIES ↓'}
                      </div>
                    </div>
                  )}

                  {activeSectionIdx === 1 && (
                    <div className="flex items-center justify-center gap-2 py-1">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="w-10 h-10 rounded-full bg-[#11100E] text-[#F5F1E8] flex items-center justify-center font-bold text-[9px] border border-amber-400">
                          P{n}
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSectionIdx === 2 && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        <span className="px-2 py-0.5 bg-[#11100E] text-white rounded text-[8px] font-bold">STAGE 01</span>
                        <span className="px-2 py-0.5 bg-white text-black rounded text-[8px] border">STAGE 02</span>
                      </div>
                      <div className="p-1.5 rounded bg-white border border-[#11100E]/10 text-[9px]">
                        <strong>10:00 AM</strong> — Keynote: Designing Without Slop
                      </div>
                    </div>
                  )}

                  {activeSectionIdx === 3 && (
                    <div className="space-y-1">
                      <div className="p-1.5 rounded bg-white border text-[8px] font-bold flex justify-between">
                        <span>Is there a remote live stream?</span>
                        <span>+</span>
                      </div>
                      <div className="p-1.5 rounded bg-white border text-[8px] font-bold flex justify-between">
                        <span>What tooling is provided?</span>
                        <span>+</span>
                      </div>
                    </div>
                  )}

                  {activeSectionIdx === 4 && (
                    <div className="space-y-1.5 text-center">
                      <input
                        readOnly
                        value="developer@company.com"
                        className="w-full text-center px-2 py-1 rounded bg-white border border-[#11100E]/20 text-[9px]"
                      />
                      <button className="w-full py-1.5 rounded bg-[#11100E] text-[#F5F1E8] font-bold text-[9px]">
                        CONFIRM INSTANT RESERVATION ✦
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Scroll Track Visualizer */}
              <div className="border-t border-[#11100E]/15 pt-2 flex items-center justify-between text-[9px] text-[#77736B]">
                <div className="flex items-center gap-1">
                  <span>SCROLL:</span>
                  <div className="flex gap-1">
                    {activeSections.map((_, i) => (
                      <span
                        key={i}
                        className={`w-4 h-1.5 rounded-full transition-all ${
                          activeSectionIdx === i ? 'bg-[#11100E] w-6' : 'bg-[#11100E]/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] font-bold text-[8px] cursor-pointer hover:bg-black active:scale-95 disabled:opacity-50"
                >
                  {isSimulating ? 'SCROLLING...' : 'PLAY SCROLL ↓'}
                </button>
              </div>
            </div>
          </div>

          {/* When to Avoid Single Scroll */}
          <div className="mt-3 w-full max-w-sm p-2.5 rounded-xl bg-amber-500/10 border border-amber-600/30 text-[10px] text-amber-900 leading-snug">
            <div className="flex items-center gap-1 font-bold mb-0.5">
              <AlertCircle className="w-3 h-3 text-amber-700" />
              <span>WHEN NOT TO USE SINGLE-SCROLL:</span>
            </div>
            <span>E-commerce with 20+ products, SaaS enterprise governance, multi-role user dashboards.</span>
          </div>
        </div>
      </div>

      {/* Footer / Progression */}
      <div className="flex items-center justify-between border-t border-[#11100E]/15 pt-3 text-xs text-[#77736B]">
        <span>Single-scroll funnels eliminate route hesitation. Keep the destination in sight.</span>
        <div className="flex items-center gap-4">
          <span className="font-bold text-[#11100E]">NARRATIVE VELOCITY</span>
          <span className="font-mono">17 / 28</span>
        </div>
      </div>
    </div>
  );
};
