import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { DollarSign, CheckCircle2 } from 'lucide-react';

export const Slide11MMRStory: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: '01',
      title: 'SIMPLE PRODUCT',
      short: 'Single utility',
      details: 'Instead of building an all-in-one bloated platform, built 1 hyper-focused tool that did 1 thing reliably in 2 clicks.',
    },
    {
      step: '02',
      title: 'SOLVES REAL NEED',
      short: 'Acute friction',
      details: 'Identified a painful daily chore developers and designers were manually doing in terminal or spreadsheets.',
    },
    {
      step: '03',
      title: 'GOOD UX',
      short: 'Zero friction',
      details: 'Removed mandatory logins and upfront paywalls. Users reached the "aha" moment within 15 seconds.',
    },
    {
      step: '04',
      title: 'CLEAR VALUE',
      short: 'Obvious ROI',
      details: 'Users saved 3+ hours per week immediately. Value was so clear that sharing happened purely through word of mouth.',
    },
    {
      step: '05',
      title: 'POLISHED & FAST',
      short: 'Reliable software',
      details: 'Packaged into clean software that simply works every time, loads fast, and has zero bloat.',
    },
    {
      step: '06',
      title: '$3.25K MMR',
      short: 'Natural outcome',
      details: 'Revenue was the natural result of being genuinely useful. No pushy sales tricks, no dark patterns.',
    },
  ];

  const current = steps[activeStep];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#16A34A]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            11 / Real Story
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">FROM USEFUL TO PAID</h2>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-4">
        <div>
          <span className="font-mono text-xs text-[#16A34A] font-bold uppercase tracking-widest">
            A TRUE STORY
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#11100E] mt-1 leading-tight">
            HOW A SIMPLE APP BECAME
            <br />
            <span className="text-[#16A34A]">A $3.25K MMR PRODUCT.</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#77736B] font-medium max-w-xl">
            Click each step to see how simple, honest design decisions turned into real happy users:
          </p>
        </div>

        {/* 6 Interactive Milestone Tiles (Proportional squircle pads) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 font-mono">
          {steps.map((item, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={item.step}
                onClick={() => {
                  sound.playClick(1.2);
                  setActiveStep(idx);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-lg scale-102 ring-2 ring-[#11100E]/20'
                    : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-[#F59E0B]' : 'text-[#77736B]'}`}>
                    {item.step}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />}
                </div>
                <div className="my-2">
                  <div className="font-bold text-xs">{item.title}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/70' : 'text-[#77736B]'}`}>
                    {item.short}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Card */}
        <div className="p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs shadow-sm">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#11100E]">{current.step} / {current.title}</span>
              <span className="text-[#77736B]">• WHY THIS WORKED</span>
            </div>
            <p className="text-sm font-medium text-[#11100E] leading-relaxed">
              {current.details}
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-[#E9E1D3] border border-[#11100E]/15 font-mono text-xs font-bold text-[#11100E] shrink-0 text-center">
            SOLVE REAL PROBLEMS
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Design starts with usefulness. Everything else is downstream.</span>
        <span>11 / 26</span>
      </div>
    </div>
  );
};
