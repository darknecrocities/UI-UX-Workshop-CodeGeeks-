import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Briefcase, HeartHandshake } from 'lucide-react';

export const Slide09BusinessUX: React.FC = () => {
  const [activePair, setActivePair] = useState<number>(0);

  const pairs = [
    {
      ux: 'Reduce Friction',
      uxDesc: 'Cut unnecessary questions so users get what they need immediately.',
      biz: 'Increase Activation',
      bizDesc: 'Turn signups into active users before they bounce.',
      metric: '+42% Onboarding Completion',
    },
    {
      ux: 'Improve Discoverability',
      uxDesc: 'Put useful tools right where people naturally look for them.',
      biz: 'Increase Feature Adoption',
      bizDesc: 'Build daily habits that make the product indispensable.',
      metric: '3.1× Weekly Retention',
    },
    {
      ux: 'Make Choices Obvious',
      uxDesc: 'One clear main action per screen so users never feel lost.',
      biz: 'Improve Retention & LTV',
      bizDesc: 'Less confusion, fewer support messages, happier users.',
      metric: '-65% Churn Rate',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            09 / Strategic Alignment
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">BUSINESS × DESIGN</h2>
      </div>

      {/* Main Content */}
      <div className="my-auto py-2 space-y-6">
        <div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#11100E] leading-tight">
            THE USER DOESN'T SEE YOUR BUSINESS MODEL.
            <br />
            <span className="text-[#77736B]">BUT YOUR BUSINESS SHOULD SHAPE THE UX.</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#77736B] font-medium">
            Every design choice impacts how people use and pay for your app. Click pairs to connect intent:
          </p>
        </div>

        {/* Interactive Connecting Matrix */}
        <div className="space-y-3">
          {pairs.map((p, idx) => {
            const isSelected = activePair === idx;
            return (
              <div
                key={idx}
                onClick={() => {
                  sound.playClick(1.2);
                  setActivePair(idx);
                }}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#F5F1E8] border-[#11100E] shadow-md ring-2 ring-[#11100E]/15'
                    : 'bg-[#F5F1E8]/50 border-[#11100E]/10 hover:border-[#11100E]/40'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Left: UX Perspective */}
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-[#77736B] uppercase mb-1">
                      <HeartHandshake className="w-3.5 h-3.5 text-[#11100E]" />
                      <span>UX Perspective</span>
                    </div>
                    <div className="text-base font-bold text-[#11100E]">{p.ux}</div>
                    <p className="text-xs text-[#77736B] mt-0.5">{p.uxDesc}</p>
                  </div>

                  {/* Center connector */}
                  <div className="hidden md:flex md:col-span-2 items-center justify-center font-mono text-xs font-bold text-[#11100E]">
                    <span className="px-2 py-0.5 rounded-full bg-[#11100E]/10">↔</span>
                  </div>

                  {/* Right: Business Perspective */}
                  <div className="md:col-span-5 flex flex-col md:items-end md:text-right">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-[#77736B] uppercase mb-1">
                      <span>Business Objective</span>
                      <Briefcase className="w-3.5 h-3.5 text-[#11100E]" />
                    </div>
                    <div className="text-base font-bold text-[#11100E]">{p.biz}</div>
                    <p className="text-xs text-[#77736B] mt-0.5">{p.bizDesc}</p>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-[#11100E]/10 flex items-center justify-between font-mono text-xs text-[#11100E] animate-in fade-in">
                    <span className="text-[11px] text-[#77736B]">Measurable Outcome:</span>
                    <span className="font-bold text-[#11100E] underline">{p.metric}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>If a button or section does not help the user or the business, delete it.</span>
        <span>09 / 30</span>
      </div>
    </div>
  );
};
