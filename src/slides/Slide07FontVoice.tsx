import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Type, Terminal, BookOpen, Smile, Landmark } from 'lucide-react';

type Voice = 'TECHNICAL' | 'EDITORIAL' | 'FRIENDLY' | 'INSTITUTIONAL';

export const Slide07FontVoice: React.FC = () => {
  const [voice, setVoice] = useState<Voice>('TECHNICAL');

  const voices: { id: Voice; label: string; fontName: string; context: string; icon: typeof Terminal }[] = [
    { id: 'TECHNICAL', label: 'Technical', fontName: 'IBM Plex Mono', context: 'Developer Tools & CLI Terminals', icon: Terminal },
    { id: 'EDITORIAL', label: 'Editorial', fontName: 'Anthropic Editorial Serif', context: 'Design Journals & Essays', icon: BookOpen },
    { id: 'FRIENDLY', label: 'Friendly', fontName: 'Inter Optical Rounded', context: 'Consumer Apps & Learning', icon: Smile },
    { id: 'INSTITUTIONAL', label: 'Institutional', fontName: 'Helvetica Neue / Inter Strict', context: 'Financial Ledgers & Infrastructure', icon: Landmark },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            07 / Typography Voice
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">FONT = PERSONALITY</h2>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-4">
        <div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#11100E]">
            STOP PICKING FONTS.
            <br />
            START PICKING VOICES.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#77736B] font-medium">
            Fonts communicate authority and context before a single word is read. Click to test each voice:
          </p>
        </div>

        {/* 4 Voice Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
          {voices.map((v) => {
            const active = voice === v.id;
            const Icon = v.icon;
            return (
              <button
                key={v.id}
                onClick={() => {
                  sound.playClick(active ? 1.0 : 1.25);
                  setVoice(v.id);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  active
                    ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-md ring-2 ring-[#11100E]/20'
                    : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{v.label}</span>
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#F59E0B]' : 'text-[#77736B]'}`} />
                </div>
                <div className={`text-[10px] mt-1 ${active ? 'text-white/70' : 'text-[#77736B]'}`}>
                  {v.fontName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Rich Application Card for the selected voice */}
        <div className="p-6 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 shadow-sm min-h-[220px] flex flex-col justify-between">
          {voice === 'TECHNICAL' && (
            <div className="space-y-4 animate-in fade-in duration-200 font-mono">
              <div className="flex justify-between items-center text-xs border-b border-[#11100E]/10 pb-2">
                <span className="text-[#11100E] font-bold">CLI RUNTIME: ANTIGRAVITY ENGINE</span>
                <span className="text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded text-[10px]">● DETERMINISTIC</span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#11100E]">
                  $ agy generate --spec=tactile-keynote
                </div>
                <p className="text-xs text-[#77736B] mt-1">
                  Fixed-width characters ensure code alignment and machine-precision readouts.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => sound.playClick(1.4)}
                  className="px-3 py-1.5 bg-[#11100E] text-[#F5F1E8] rounded-lg text-xs font-bold hover:bg-black cursor-pointer"
                >
                  RUN PROCESS
                </button>
              </div>
            </div>
          )}

          {voice === 'EDITORIAL' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex justify-between items-center font-mono text-xs text-[#77736B] border-b border-[#11100E]/10 pb-2">
                <span>ESSAY EXCERPT</span>
                <span className="font-bold text-[#11100E]">VOL. IV / NO. 12</span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif italic text-[#11100E] leading-tight">
                  "The interface that requires explanation is already broken."
                </h3>
                <p className="text-xs text-[#77736B] mt-2 leading-relaxed max-w-lg">
                  Serif editorial type commands contemplative patience, framing software as deliberate literature.
                </p>
              </div>
            </div>
          )}

          {voice === 'FRIENDLY' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex justify-between items-center font-mono text-xs border-b border-[#11100E]/10 pb-2">
                <span className="text-[#11100E] font-bold">WELCOME BACK!</span>
                <span className="px-2 py-0.5 rounded-full bg-[#22C55E]/15 text-[#16A34A] text-[10px] font-bold">READY TO SHIP</span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-[#11100E] tracking-tight">
                  Let's craft something delightful today.
                </h3>
                <p className="text-xs text-[#77736B] mt-1">
                  Soft geometric terminals remove user friction and foster welcoming daily engagement.
                </p>
              </div>
              <button
                onClick={() => sound.playSuccess()}
                className="px-4 py-2 rounded-full bg-[#11100E] text-white text-xs font-semibold cursor-pointer hover:bg-black"
              >
                Get Started →
              </button>
            </div>
          )}

          {voice === 'INSTITUTIONAL' && (
            <div className="space-y-3 animate-in fade-in duration-200 font-sans">
              <div className="flex justify-between items-center font-mono text-xs border-b border-[#11100E]/10 pb-2">
                <span className="text-[#11100E] font-bold">LEDGER SETTLEMENT</span>
                <span className="font-mono text-[10px] text-[#77736B]">TXN #8492-AX</span>
              </div>
              <div className="grid grid-cols-3 gap-3 font-mono">
                <div className="p-2.5 bg-white rounded-lg border border-[#11100E]/10">
                  <div className="text-[10px] text-[#77736B]">GROSS VOLUME</div>
                  <div className="text-lg font-bold text-[#11100E]">$148,200.00</div>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-[#11100E]/10">
                  <div className="text-[10px] text-[#77736B]">PROCESSING</div>
                  <div className="text-lg font-bold text-[#16A34A]">CLEARED</div>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-[#11100E]/10">
                  <div className="text-[10px] text-[#77736B]">SETTLEMENT</div>
                  <div className="text-lg font-bold text-[#11100E]">SAME-DAY</div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-[#11100E]/10 font-mono text-xs text-[#77736B] flex items-center justify-between">
            <span>Context: <strong className="text-[#11100E]">{voices.find((v) => v.id === voice)?.context}</strong></span>
            <span>Click voice pills to test tone shifts</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Never load a typeface without understanding its emotional tone.</span>
        <span>07 / 25</span>
      </div>
    </div>
  );
};
