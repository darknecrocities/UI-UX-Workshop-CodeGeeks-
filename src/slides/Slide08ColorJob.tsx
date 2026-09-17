import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Palette } from 'lucide-react';

interface Swatch {
  id: string;
  name: string;
  hex: string;
  job: string;
  roleDescription: string;
  bgClass: string;
  textClass: string;
}

export const Slide08ColorJob: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('BEIGE');
  const [appState, setAppState] = useState<'IDLE' | 'WARNING' | 'SUCCESS'>('IDLE');

  const swatches: Swatch[] = [
    { id: 'BEIGE', name: 'Warm Beige', hex: '#E9E1D3', job: 'BASE CANVAS', roleDescription: 'Tactile parchment background that reduces eye strain', bgClass: 'bg-[#E9E1D3]', textClass: 'text-[#11100E]' },
    { id: 'BLACK', name: 'Near-Black', hex: '#11100E', job: 'STRUCTURE', roleDescription: 'High-contrast typography, primary buttons, borders', bgClass: 'bg-[#11100E]', textClass: 'text-[#F5F1E8]' },
    { id: 'RED', name: 'Crimson', hex: '#DC2626', job: 'WARNING / ERROR', roleDescription: 'Destructive alerts and AI slop detection flags', bgClass: 'bg-[#DC2626]', textClass: 'text-white' },
    { id: 'GREEN', name: 'Emerald', hex: '#16A34A', job: 'SUCCESS / PROD', roleDescription: 'Verified tests, shipped apps, successful flows', bgClass: 'bg-[#16A34A]', textClass: 'text-white' },
    { id: 'YELLOW', name: 'Amber', hex: '#D97706', job: 'ATTENTION', roleDescription: 'Focused card highlights and active tabs', bgClass: 'bg-[#D97706]', textClass: 'text-white' },
    { id: 'BLUE', name: 'Cobalt', hex: '#2563EB', job: 'SELECTION', roleDescription: 'Active interactive state and keyboard focus', bgClass: 'bg-[#2563EB]', textClass: 'text-white' },
  ];

  const active = swatches.find((s) => s.id === selectedColor)!;

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            08 / Palette System
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">COLOR HAS A JOB</h2>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-4">
        <div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#11100E]">
            COLOR SHOULD HAVE A JOB.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#77736B] font-medium">
            Don't pick 12 colors because a generator suggested them. Give every tone a semantic role:
          </p>
        </div>

        {/* 6 Compact Semantic Swatches (Proportional squircle badges) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 font-mono">
          {swatches.map((s) => {
            const isSelected = selectedColor === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  sound.playClick(1.2);
                  setSelectedColor(s.id);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'ring-2 ring-[#11100E] shadow-md border-[#11100E] bg-white'
                    : 'border-[#11100E]/15 hover:border-[#11100E]/60 bg-[#F5F1E8]'
                }`}
              >
                <div className={`w-full h-8 rounded-lg ${s.bgClass} border border-black/10 mb-2 flex items-end p-1`}>
                  <span className={`text-[9px] font-bold ${s.textClass}`}>{s.hex}</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#11100E]">{s.name}</div>
                  <div className="text-[10px] text-[#77736B] tracking-wider uppercase mt-0.5">{s.job}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Application Widget testing the colors live */}
        <div className="p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 space-y-3">
          <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="font-bold text-[#11100E]">{active.name}</span>
              <span className="text-[#77736B]">/ ROLE:</span>
              <span className="font-bold px-2 py-0.5 rounded bg-[#11100E] text-white text-[10px]">
                {active.job}
              </span>
            </div>
            <span className="font-mono text-xs text-[#77736B]">LIVE APPLICATION TEST</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8">
              <p className="text-sm font-medium text-[#11100E] leading-relaxed">
                {active.roleDescription}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
                <button
                  onClick={() => {
                    sound.playClick();
                    setAppState('IDLE');
                  }}
                  className="px-3 py-1 rounded-lg bg-[#11100E] text-[#F5F1E8] font-bold cursor-pointer"
                >
                  Trigger Normal Action
                </button>
                <button
                  onClick={() => {
                    sound.playSlopAlert();
                    setAppState('WARNING');
                  }}
                  className="px-3 py-1 rounded-lg bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/30 font-bold cursor-pointer hover:bg-[#DC2626]/20"
                >
                  Trigger Warning (Red)
                </button>
                <button
                  onClick={() => {
                    sound.playSuccess();
                    setAppState('SUCCESS');
                  }}
                  className="px-3 py-1 rounded-lg bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30 font-bold cursor-pointer hover:bg-[#16A34A]/20"
                >
                  Trigger Success (Green)
                </button>
              </div>
            </div>

            <div className="md:col-span-4 p-4 rounded-xl border border-black/10 flex flex-col justify-center items-center text-center space-y-1"
                 style={{ backgroundColor: active.hex }}>
              <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${active.textClass}`}>
                ACTIVE PALETTE TONE
              </span>
              <div className={`text-base font-bold ${active.textClass}`}>
                {appState === 'IDLE' ? 'System Steady' : appState === 'WARNING' ? 'Slop Warning Alert' : 'Deterministic Pass'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Color is semantic communication, never decorative wallpaper.</span>
        <span>08 / 25</span>
      </div>
    </div>
  );
};
