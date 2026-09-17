import React, { useState } from 'react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { sound } from '../audio/sound';
import { Sparkles, ArrowRight } from 'lucide-react';

type CraftPrinciple = {
  id: string;
  title: string;
  bad: string;
  good: string;
  impact: string;
};

export const Slide10Premium: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'COMPARE' | 'PRINCIPLES'>('COMPARE');
  const [activePrinciple, setActivePrinciple] = useState<number>(0);

  const principles: CraftPrinciple[] = [
    {
      id: 'SPACING',
      title: 'Spatial Rhythm',
      bad: 'Random padding: p-3, p-5, p-7, p-2 (no system)',
      good: 'Strict 8px grid: 8 / 16 / 24 / 32px — every element aligned',
      impact: 'Visual calm, perceived quality goes up immediately',
    },
    {
      id: 'HIERARCHY',
      title: 'Type Hierarchy',
      bad: 'Three font weights all used at similar sizes everywhere',
      good: 'One display size for the hero stat, 11px mono for metadata',
      impact: 'Eye scans 3× faster — the important thing is obvious',
    },
    {
      id: 'FEEDBACK',
      title: 'State Feedback',
      bad: 'Static button — no hover, no pressed state, no loader',
      good: 'Hover lift −1px, active press, spinner on submit',
      impact: 'Product feels alive — users trust it more',
    },
    {
      id: 'RESTRAINT',
      title: 'Radical Restraint',
      bad: 'Gradient border + shadow + glow + badge + animation all at once',
      good: 'One quiet border. One weight shift. Earn each decoration.',
      impact: 'Luxury is what you leave out, not what you add',
    },
  ];

  const current = principles[activePrinciple];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            10 / Craft Principles
          </span>
        </div>
        {/* Tab Switch */}
        <div className="flex items-center gap-1 font-mono text-xs">
          {(['COMPARE', 'PRINCIPLES'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { sound.playClick(1.1); setActiveTab(tab); }}
              className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] font-bold'
                  : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="my-auto py-2 space-y-4">
        <div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#11100E]">
            SIMPLE NECESSITY BECOMES PREMIUM.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#77736B] font-medium">
            {activeTab === 'COMPARE'
              ? 'Drag the divider to compare AI default output vs. intentional craft:'
              : 'Click each craft principle to understand the transformation:'}
          </p>
        </div>

        {activeTab === 'COMPARE' ? (
          /* Interactive Before/After Slider */
          <div className="h-[280px] w-full">
            <BeforeAfterSlider />
          </div>
        ) : (
          /* Craft Principles Interactive Explainer */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Principle selectors */}
            <div className="md:col-span-4 flex flex-col gap-2 font-mono text-xs">
              {principles.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => { sound.playClick(1.2); setActivePrinciple(idx); }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    activePrinciple === idx
                      ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-md'
                      : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
                  }`}
                >
                  <div>
                    <div className="text-[10px] opacity-60">{String(idx + 1).padStart(2, '0')}</div>
                    <div className="font-bold mt-0.5">{p.title}</div>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 transition-opacity ${activePrinciple === idx ? 'opacity-100' : 'opacity-30'}`} />
                </button>
              ))}
            </div>

            {/* Principle Detail Card */}
            <div className="md:col-span-8 p-5 rounded-xl bg-[#F5F1E8] border border-[#11100E]/20 font-mono text-xs flex flex-col gap-3">
              <div className="font-bold text-sm text-[#11100E] border-b border-[#11100E]/10 pb-2">
                {current.title}
              </div>
              <div className="p-3 rounded-lg bg-[#DC2626]/8 border border-[#DC2626]/25">
                <div className="text-[10px] text-[#DC2626] font-bold mb-1">✗ WITHOUT INTENTION</div>
                <div className="text-[#11100E]">{current.bad}</div>
              </div>
              <div className="p-3 rounded-lg bg-[#16A34A]/8 border border-[#16A34A]/25">
                <div className="text-[10px] text-[#16A34A] font-bold mb-1">✓ WITH CRAFT</div>
                <div className="text-[#11100E]">{current.good}</div>
              </div>
              <div className="p-3 rounded-lg bg-[#E9E1D3] border border-[#11100E]/10">
                <div className="text-[10px] text-[#77736B] font-bold mb-1">IMPACT</div>
                <div className="text-[#11100E] font-medium">{current.impact}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>True luxury in digital interfaces is radical clarity.</span>
        <span>10 / 25</span>
      </div>
    </div>
  );
};
