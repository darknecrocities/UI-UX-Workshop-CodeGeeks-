import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Bot, UserCheck, ArrowRightLeft, Check, Minus } from 'lucide-react';

export const Slide04Judgment: React.FC = () => {
  const [activeSide, setActiveSide] = useState<'AI' | 'HUMAN'>('HUMAN');
  const [removedElements, setRemovedElements] = useState<string[]>([]);

  const toggleSubtract = (elem: string) => {
    sound.playClick(1.2);
    setRemovedElements((prev) =>
      prev.includes(elem) ? prev.filter((e) => e !== elem) : [...prev, elem]
    );
  };

  const aiGenerates = [
    { title: 'Code Syntax', desc: 'Components, classes, DOM nodes' },
    { title: 'Scaffold Layout', desc: 'Default grid and flex boxes' },
    { title: 'Generic Copy', desc: 'Standard placeholder text' },
    { title: 'Excess Widgets', desc: 'Floating badges, blobs, shadows' },
  ];

  const humansDecide = [
    { title: 'Why does this exist?', desc: 'Core purpose & real problem' },
    { title: 'Who is using it?', desc: 'Ergonomics & mental model' },
    { title: 'What should disappear?', desc: 'Radical subtraction of noise' },
    { title: 'What creates trust?', desc: 'Restraint & tactile quality' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
          04 / Responsibility
        </span>
        <button
          onClick={() => {
            sound.playSwitch(activeSide === 'AI');
            setActiveSide((prev) => (prev === 'AI' ? 'HUMAN' : 'AI'));
          }}
          className="px-3 py-1 rounded-lg bg-[#11100E] text-[#F5F1E8] font-mono text-xs flex items-center gap-1.5 cursor-pointer hover:bg-[#11100E]/90 transition-colors"
        >
          <ArrowRightLeft className="w-3 h-3" />
          <span>Toggle: {activeSide}</span>
        </button>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-5">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#11100E] leading-tight">
            AI IS NOT THE DESIGNER.
            <br />
            <span className="underline decoration-2 underline-offset-8 decoration-[#11100E]">
              YOU ARE.
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#77736B] max-w-xl font-medium">
            AI can churn out infinite options. Humans decide what is worth keeping.
          </p>
        </div>

        {/* Modular Squircle Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AI Column */}
          <div
            onClick={() => {
              setActiveSide('AI');
              sound.playClick(0.9);
            }}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeSide === 'AI'
                ? 'bg-[#E9E1D3] border-[#11100E] shadow-md ring-2 ring-[#11100E]/15'
                : 'bg-[#F5F1E8]/60 border-[#11100E]/15 opacity-75'
            }`}
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#11100E]/10">
              <Bot className="w-4 h-4 text-[#77736B]" />
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#11100E]">
                AI CAN GENERATE (Commodity)
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {aiGenerates.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/50 border border-[#11100E]/10">
                  <div className="font-bold text-[#11100E] text-[11px]">{item.title}</div>
                  <div className="text-[10px] text-[#77736B] mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Human Column */}
          <div
            onClick={() => {
              setActiveSide('HUMAN');
              sound.playClick(1.2);
            }}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeSide === 'HUMAN'
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-lg ring-2 ring-[#11100E]/30'
                : 'bg-[#F5F1E8]/60 border-[#11100E]/15 opacity-75'
            }`}
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/15">
              <UserCheck className="w-4 h-4 text-[#16A34A]" />
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#F5F1E8]">
                HUMANS DECIDE (Taste & Intent)
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {humansDecide.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border ${
                    activeSide === 'HUMAN'
                      ? 'bg-white/10 border-white/10'
                      : 'bg-[#11100E]/5 border-[#11100E]/5'
                  }`}
                >
                  <div className={`font-bold text-[11px] ${activeSide === 'HUMAN' ? 'text-white' : 'text-[#11100E]'}`}>
                    {item.title}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${activeSide === 'HUMAN' ? 'text-white/70' : 'text-[#77736B]'}`}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Subtraction Bar */}
        <div className="p-3.5 rounded-xl bg-[#F5F1E8] border border-[#11100E]/15 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="text-[#77736B]">Test Subtracting Noise:</span>
          <div className="flex flex-wrap gap-2">
            {['Purple Orbs', 'Floating Blobs', 'Fake Testimonials', 'Generic Dashboards'].map((elem) => {
              const isRemoved = removedElements.includes(elem);
              return (
                <button
                  key={elem}
                  onClick={() => toggleSubtract(elem)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] flex items-center gap-1 cursor-pointer transition-all ${
                    isRemoved
                      ? 'bg-[#16A34A] text-white border-[#16A34A]'
                      : 'bg-[#E9E1D3] text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
                  }`}
                >
                  {isRemoved ? <Check className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  <span>{elem} {isRemoved ? '(SUBTRACTED)' : ''}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>The best design decision is often what you refuse to add.</span>
        <span>04 / 25</span>
      </div>
    </div>
  );
};
