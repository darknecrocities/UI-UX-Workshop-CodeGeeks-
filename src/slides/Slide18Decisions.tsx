import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Target, CheckCircle, XCircle, ToggleLeft, ToggleRight } from 'lucide-react';

export const Slide18Decisions: React.FC = () => {
  const [showGood, setShowGood] = useState<boolean>(true);
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const decisions = [
    {
      label: 'PURPOSE',
      bad: 'Generic card box container',
      good: 'Single primary focal point per card with clear action',
      why: 'Users need to know what to do before they read the label.',
    },
    {
      label: 'HIERARCHY',
      bad: 'Everything bold with equal visual weight',
      good: 'Display size for key stat, 11px mono for metadata',
      why: 'The eye must land somewhere. Flat hierarchy lands nowhere.',
    },
    {
      label: 'STATE',
      bad: 'Static design without hover or focus',
      good: 'Hover lift −1px, active press, loading spinner on submit',
      why: 'Feedback = perceived responsiveness = trust.',
    },
    {
      label: 'SPACING',
      bad: 'Random padding and uneven gaps',
      good: 'Consistent 8px spacing with 16px inside padding',
      why: 'Consistent spacing keeps things calm. Random spacing creates confusion.',
    },
    {
      label: 'ACCESSIBILITY',
      bad: 'Unlabeled click divs without keyboard support',
      good: 'Native <button>, tab focus ring, ARIA live announcement',
      why: 'Accessible = usable by everyone, including you under stress.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            22 / Making Choices First
          </span>
        </div>
        {/* Toggle bad vs good */}
        <button
          onClick={() => { sound.playSwitch(!showGood); setShowGood((p) => !p); setActiveRow(null); }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs font-bold cursor-pointer transition-all ${
            showGood
              ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
              : 'bg-[#FAF7F2] text-[#11100E] border-[#11100E]/30'
          }`}
        >
          {showGood
            ? <><ToggleRight className="w-4 h-4" /> SHOWING: INTENTIONAL</>
            : <><ToggleLeft className="w-4 h-4" /> SHOWING: UNREFINED</>
          }
        </button>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#11100E]">
            DON'T PROMPT FOR COMPONENTS.
            <br />
            <span className="text-[#11100E] underline underline-offset-4">PROMPT FOR DECISIONS.</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#77736B] font-medium">
            Toggle between slop and intentional design. Click each row for the rationale:
          </p>
        </div>

        {/* Live Card Preview */}
        <div className={`p-4 rounded-xl border transition-all duration-500 ${
          showGood
            ? 'bg-[#F5F1E8] border-[#11100E]/20 shadow-sm'
            : 'bg-[#FAF7F2] border-[#11100E]/15 shadow-none'
        }`}>
          <div className={`flex items-center justify-between border-b pb-2 mb-3 ${
            showGood ? 'border-[#11100E]/10' : 'border-[#11100E]/10'
          }`}>
            <div>
              <div className={`font-mono text-[10px] uppercase ${showGood ? 'text-[#77736B] tracking-widest' : 'text-[#77736B]'}`}>
                {showGood ? 'CARD COMPONENT' : 'card thing here'}
              </div>
              <div className={`font-bold mt-0.5 ${showGood ? 'text-[#11100E] text-base' : 'text-[#11100E] text-base font-bold'}`}>
                {showGood ? 'Export Dataset v2.4' : 'Card Item Box #1'}
              </div>
            </div>
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${
              showGood
                ? 'bg-[#11100E] text-[#F5F1E8]'
                : 'bg-[#E9E1D3] text-[#77736B]'
            }`}>
              {showGood ? '● VERIFIED' : 'Active Status'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-xs ${showGood ? 'text-[#77736B]' : 'text-[#77736B]'}`}>
              {showGood ? 'Last synced: 2 minutes ago · 14.2 MB' : 'some subtitle text here info'}
            </span>
            <button
              onClick={() => sound.playClick(1.2)}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded cursor-pointer transition-all hover:scale-95 ${
                showGood
                  ? 'bg-[#11100E] text-[#F5F1E8] rounded-lg hover:bg-black'
                  : 'bg-[#77736B] text-white rounded hover:bg-[#11100E]'
              }`}
              style={!showGood ? { padding: '7px 11px' } : {}}
            >
              {showGood ? 'Download' : 'Click Here!!'}
            </button>
          </div>
        </div>

        {/* Decision Comparison Table */}
        <div className="overflow-hidden rounded-xl border border-[#11100E]/20 bg-[#F5F1E8] font-mono text-xs shadow-xs">
          <div className="grid grid-cols-12 bg-[#E9E1D3] p-3 font-bold border-b border-[#11100E]/10 text-[#11100E]">
            <div className="col-span-2">DIMENSION</div>
            <div className="col-span-5 text-[#77736B] flex items-center gap-1">
              <XCircle className="w-3 h-3 text-[#77736B]" />
              <span>Prompting for Code</span>
            </div>
            <div className="col-span-5 text-[#11100E] flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-[#11100E]" />
              <span>Prompting for Decision</span>
            </div>
          </div>

          <div className="divide-y divide-[#11100E]/10">
            {decisions.map((d, i) => (
              <div
                key={i}
                onClick={() => {
                  sound.playClick(1.1);
                  setActiveRow(activeRow === i ? null : i);
                }}
                className={`grid grid-cols-12 p-3 items-center cursor-pointer transition-all ${
                  activeRow === i ? 'bg-[#11100E] text-[#F5F1E8]' : 'hover:bg-black/5'
                }`}
              >
                <div className={`col-span-2 font-bold text-[11px] ${activeRow === i ? 'text-[#FAF7F2]' : 'text-[#11100E]'}`}>
                  {d.label}
                </div>
                <div className={`col-span-5 text-[11px] pr-2 line-through decoration-[#11100E]/40 ${
                  activeRow === i ? 'text-white/50' : 'text-[#77736B]'
                }`}>
                  {d.bad}
                </div>
                <div className={`col-span-5 text-[11px] font-medium ${activeRow === i ? 'text-[#E9E1D3]' : 'text-[#11100E]'}`}>
                  {activeRow === i ? `WHY: ${d.why}` : d.good}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Tell the AI why a feature exists, not just what to code.</span>
        <span>22 / 30</span>
      </div>
    </div>
  );
};
