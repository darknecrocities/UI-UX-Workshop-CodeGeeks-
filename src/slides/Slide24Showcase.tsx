import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Presentation } from 'lucide-react';

export const Slide24Showcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const stages = [
    {
      name: 'SKETCH',
      desc: 'Raw paper mental model',
      whatChanged: 'Stripped 8 unnecessary fields down to 1 direct query bar.',
      whyChange: 'Too many options made people feel overwhelmed.',
      aiError: 'AI originally suggested a 4-step wizard modal with progress ring.',
      humanDecision: 'Chose a single-line command bar that resolves instantly.',
    },
    {
      name: 'FIGMA',
      desc: 'Low-fi auto layout frame',
      whatChanged: 'Established strict 8px grid and 2 font weights.',
      whyChange: 'Needed predictable auto layout before writing CSS tokens.',
      aiError: 'AI had placed 7 uncalibrated icon buttons on the top bar.',
      humanDecision: 'Hidden all secondary actions inside an Esc command palette.',
    },
    {
      name: 'PROMPT',
      desc: 'Clear prompt guidelines',
      whatChanged: 'Specified warm beige (#E9E1D3) and IBM Plex Mono typography.',
      whyChange: 'Prevented the AI from defaulting to chromatic colors and dark gradients.',
      aiError: 'Default prompt generated standard SaaS marketing fluff.',
      humanDecision: 'Built custom audio clicks with zero external packages.',
    },
    {
      name: 'CODE',
      desc: 'Tested React & TypeScript',
      whatChanged: 'Replaced stateful DOM mutations with pure declarative React hooks.',
      whyChange: 'Guaranteed 60fps framerate without memory leaks.',
      aiError: 'AI generated dangerous innerHTML and nested unmemoized callbacks.',
      humanDecision: 'Refactored into clean modular components with accessible ARIA.',
    },
    {
      name: 'PRODUCT',
      desc: 'Deployed on Vercel',
      whatChanged: 'Added tactile mechanical sound feedback and Uno-style fanned cards.',
      whyChange: 'Made the web app feel tangible and fun to interact with.',
      aiError: 'AI does not have fingers or ears; it cannot feel physical rhythm.',
      humanDecision: 'Tuned sound volume and spring feel for smooth clicks.',
    },
  ];

  const current = stages[activeTab];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Presentation className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            25 / Review & Showcase
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">FROM SKETCH TO SHIP</h2>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-5">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#11100E]">
            THE COMPLETE JOURNEY.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#77736B] font-medium">
            Human judgment across every single transformation milestone:
          </p>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="flex gap-2 font-mono text-xs overflow-x-auto pb-1">
          {stages.map((s, idx) => (
            <button
              key={s.name}
              onClick={() => {
                sound.playClick(1.2);
                setActiveTab(idx);
              }}
              className={`px-4 py-2 rounded-lg border transition-all cursor-pointer shrink-0 ${
                activeTab === idx
                  ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] font-bold shadow-md'
                  : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
              }`}
            >
              <span>0{idx + 1}. {s.name}</span>
            </button>
          ))}
        </div>

        {/* Reveal Card Matrix */}
        <div className="p-6 rounded-xl bg-[#F5F1E8] border border-[#11100E]/20 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-3.5 rounded-lg bg-[#E9E1D3]/80 border border-[#11100E]/10">
            <div className="text-[10px] text-[#77736B] uppercase font-bold">01 / WHAT CHANGED?</div>
            <p className="text-sm font-semibold text-[#11100E] mt-1">{current.whatChanged}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#E9E1D3]/80 border border-[#11100E]/10">
            <div className="text-[10px] text-[#77736B] uppercase font-bold">02 / WHY DID YOU CHANGE IT?</div>
            <p className="text-sm font-semibold text-[#11100E] mt-1">{current.whyChange}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#11100E]/20">
            <div className="text-[10px] text-[#77736B] uppercase font-bold">03 / WHAT NEEDED CORRECTION?</div>
            <p className="text-sm font-semibold text-[#11100E] mt-1">{current.aiError}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#11100E] text-[#F5F1E8] border border-[#11100E]">
            <div className="text-[10px] text-[#D8D3C8] uppercase font-bold">04 / WHAT DID YOU DECIDE?</div>
            <p className="text-sm font-semibold text-[#F5F1E8] mt-1">{current.humanDecision}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>You are not measured by how much you prompt, but by what you decide to keep.</span>
        <span>25 / 26</span>
      </div>
    </div>
  );
};
