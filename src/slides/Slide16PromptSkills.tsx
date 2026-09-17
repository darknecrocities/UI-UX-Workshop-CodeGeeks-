import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Cpu } from 'lucide-react';

export const Slide16PromptSkills: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    { title: 'CONTEXT', prompt: 'You are building an offline-first terminal for ML engineers.' },
    { title: 'USER', prompt: 'Senior developers who prefer keyboard navigation over mouse clicks.' },
    { title: 'GOAL', prompt: 'Inspect training loss and trigger checkpoint rollbacks in under 2s.' },
    { title: 'CONSTRAINTS', prompt: 'Zero purple gradients, maximum 16px padding, no external CDNs.' },
    { title: 'VISUAL LANGUAGE', prompt: 'Near-black ink, parchment beige, IBM Plex Mono typography.' },
    { title: 'INTERACTION', prompt: 'Esc closes modals, J/K moves rows, Enter triggers confirmation.' },
    { title: 'TECH STACK', prompt: 'React 19, TypeScript, Tailwind CSS v4, Motion.' },
    { title: 'CONTENT', prompt: 'Deterministic real metrics: loss 0.042, epoch 18/50, VRAM 14.2GB.' },
    { title: 'EDGE CASES', prompt: 'Empty loss array, network disconnection, high-DPI zoom.' },
    { title: 'ACCEPTANCE', prompt: 'Lighthouse score > 98, zero hydration errors, accessible ARIA roles.' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            16 / Prompt Architecture
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">PROMPTING AS DESIGN</h2>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-6">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#11100E]">
            PROMPTING IS A DESIGN SKILL.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#77736B] font-medium">
            Weak prompts yield AI slop. Architectural prompts define exact operational constraints:
          </p>
        </div>

        {/* 10 Anatomy Pillars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
          {pillars.map((p, idx) => {
            const isSelected = activePillar === idx;
            return (
              <button
                key={p.title}
                onClick={() => {
                  sound.playClick(1.2);
                  setActivePillar(idx);
                }}
                className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-md ring-2 ring-[#11100E]/20'
                    : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
                }`}
              >
                <div className="text-[10px] text-[#77736B]">{String(idx + 1).padStart(2, '0')}</div>
                <div className="font-bold mt-0.5">{p.title}</div>
              </button>
            );
          })}
        </div>

        {/* Live Pillar Inspector Box */}
        <div className="p-5 rounded-xl bg-[#F5F1E8] border border-[#11100E]/20 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2 text-[11px] text-[#77736B]">
            <span>PILLAR SPECIFICATION: <strong className="text-[#11100E]">{pillars[activePillar].title}</strong></span>
            <span>SECTION 0{activePillar + 1} / 10</span>
          </div>
          <p className="text-sm font-semibold text-[#11100E] py-1">
            "{pillars[activePillar].prompt}"
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Weak prompt: "Make me a cool dashboard." · Strong prompt: Precision requirements.</span>
        <span>16 / 25</span>
      </div>
    </div>
  );
};
