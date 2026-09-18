import React, { useState } from 'react';
import { sound } from '../audio/sound';
import {
  DollarSign,
  TrendingUp,
  Users,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Code2,
  Coffee,
  Maximize2,
  X,
} from 'lucide-react';

export const Slide11MMRStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  const chapters = [
    {
      id: '01',
      title: 'OPEN SOURCE FIRST',
      tagline: 'Earn Trust in Public',
      icon: Code2,
      summary: 'Started by building free, open-source utilities in public. Solved real daily frictions for developers and designers with zero fluff.',
      takeaway: 'People trust tools that solve their immediate pain without asking for an email or credit card first.',
    },
    {
      id: '02',
      title: 'SIMPLE PAID UTILITIES',
      tagline: 'High-Frequency Value',
      icon: Sparkles,
      summary: 'Packaged core workflows into standalone, lightning-fast tools (DomoDomo & DomoSkills). No 20-page dashboards—just 2-click instant value.',
      takeaway: 'Users reach the "aha" moment in under 15 seconds. If software saves 3 hours a week, $15–$29/mo is an easy yes.',
    },
    {
      id: '03',
      title: '$3,279 MMR & 42 SUBS',
      tagline: 'Predictable Growth',
      icon: TrendingUp,
      summary: '42 active paying subscribers generated $3,279 in monthly recurring revenue. 100% organic, zero paid ads, powered solely by word-of-mouth.',
      takeaway: 'Revenue is downstream of craft. Build software that feels physical, fast, and dependable, and users gladly pay.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-10 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#11100E] font-bold">
            12 / Founder Story · Student to $3,279 MMR
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="hidden sm:inline text-[#77736B]">REAL COHORT DATA</span>
          <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] font-bold text-[10px]">
            $3,279 / MO
          </span>
        </div>
      </div>

      {/* Main Grid: Story + Live Photo Proof */}
      <div className="flex-1 min-h-0 my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Column: The Story & Lessons (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#77736B] uppercase tracking-wider font-semibold">
              <span className="px-2 py-0.5 rounded bg-[#11100E]/10 text-[#11100E] font-bold">
                PROOF OF CRAFT
              </span>
              <span>OPEN SOURCE ➔ PAID TOOLS ➔ RECURRING REVENUE</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-[40px] font-black tracking-tight text-[#11100E] mt-1.5 leading-[1.1]">
              A SIMPLE, HONEST UI CAN GENERATE REAL INCOME.
            </h1>

            <p className="text-xs sm:text-sm text-[#77736B] font-medium mt-1.5 leading-relaxed max-w-2xl">
              Even as a student, you don’t need venture capital, complex code, or bloated 50-page enterprise software.
              A focused, tactile tool with a clean 2-color UI that solves a real friction can build life-changing income.
            </p>
          </div>

          {/* 3 Interactive Milestones */}
          <div className="space-y-2">
            {chapters.map((ch, idx) => {
              const Icon = ch.icon;
              const isActive = activeTab === idx;
              return (
                <div
                  key={ch.id}
                  onClick={() => {
                    sound.playClick(1.1);
                    setActiveTab(idx);
                  }}
                  className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-md scale-[1.01]'
                      : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#11100E]/10 text-[#11100E]'
                      }`}>
                        <Icon className="w-3 h-3" />
                        PHASE {ch.id}
                      </span>
                      <h3 className="font-bold text-xs sm:text-sm">{ch.title}</h3>
                    </div>
                    <span className={`text-[10px] font-mono ${isActive ? 'text-[#D8D3C8]' : 'text-[#77736B]'}`}>
                      {ch.tagline}
                    </span>
                  </div>

                  <p className={`text-xs leading-snug mt-1 ${isActive ? 'text-[#D8D3C8]' : 'text-[#77736B]'}`}>
                    {ch.summary}
                  </p>

                  {isActive && (
                    <div className="mt-2 pt-2 border-t border-white/15 flex items-start gap-2 text-[11px] text-emerald-300 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                      <span>{ch.takeaway}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Student Mindset Box */}
          <div className="p-3 rounded-xl bg-[#EFEBE0] border border-[#11100E]/15 flex items-start gap-2.5 text-xs font-mono text-[#11100E]">
            <div className="w-7 h-7 rounded-lg bg-[#11100E] text-[#F5F1E8] flex items-center justify-center shrink-0 mt-0.5">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="leading-snug">
              <span className="font-bold uppercase tracking-wider block text-[10px] text-[#77736B] mb-0.5">
                The Lesson for Students & Builders
              </span>
              <span>
                Don't wait for someone to hire you to build good software. Master taste, pick one sharp problem, apply the 2-color rule, and ship.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Proof Photo & Metrics (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-[#11100E]/20 bg-[#FAF7F2] p-3 shadow-xl relative group">
            {/* Photo Container */}
            <div
              onClick={() => {
                sound.playClick(1.2);
                setIsZoomOpen(true);
              }}
              className="relative rounded-xl overflow-hidden cursor-zoom-in border border-[#11100E]/15 bg-black/5 aspect-[4/5] sm:aspect-square flex items-center justify-center group"
            >
              <img
                src="/assets/images/mmr.png"
                alt="Arron Parejas $3,279 MMR Dashboard and Coffee"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating Overlay Pill Top */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#F5F1E8] font-mono text-[10px] font-bold border border-white/20 flex items-center gap-1.5 shadow-md">
                <Coffee className="w-3 h-3 text-amber-300" />
                <span>REAL CAFE CODING · 2026</span>
              </div>

              {/* Inspect Button */}
              <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white font-mono text-[10px] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3" />
                <span>Inspect Proof</span>
              </div>
            </div>

            {/* Dashboard Stats Highlight Strip */}
            <div className="mt-2.5 pt-2 border-t border-[#11100E]/10 grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded-lg bg-[#11100E] text-[#F5F1E8]">
                <div className="text-base sm:text-lg font-black tracking-tight text-emerald-400">
                  $3,279
                </div>
                <div className="text-[9px] text-[#D8D3C8] uppercase tracking-wider mt-0.5">
                  Monthly MRR
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#EAE5DA] text-[#11100E] border border-[#11100E]/10">
                <div className="text-base sm:text-lg font-black tracking-tight flex items-center justify-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 42
                </div>
                <div className="text-[9px] text-[#77736B] uppercase tracking-wider mt-0.5">
                  Paying Subs
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#EAE5DA] text-[#11100E] border border-[#11100E]/10">
                <div className="text-base sm:text-lg font-black tracking-tight text-emerald-700 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 100%
                </div>
                <div className="text-[9px] text-[#77736B] uppercase tracking-wider mt-0.5">
                  Word-of-Mouth
                </div>
              </div>
            </div>

            {/* Photo Caption */}
            <div className="mt-2 text-[10px] font-mono text-[#77736B] text-center">
              Actual laptop dashboard showing $3,279 MRR from simple web utilities & subscriptions.
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#11100E] rounded-2xl overflow-hidden border border-white/20 p-2 shadow-2xl"
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src="/assets/images/mmr.png"
              alt="Arron Parejas $3,279 MMR Dashboard Proof"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
            <div className="p-3 text-center font-mono text-xs text-[#D8D3C8]">
              Dashboard Overview: $3,279 Revenue · $3,279 MRR · 42 Active Subscriptions (Aug 19 – Sep 17, 2026)
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B] shrink-0">
        <span>Usefulness precedes revenue. Simple UI wins users.</span>
        <span>12 / 30</span>
      </div>
    </div>
  );
};
