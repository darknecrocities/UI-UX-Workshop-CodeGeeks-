import React, { useState } from 'react';
import { sound, type SwitchType } from '../audio/sound';
import { usePresentation } from '../context/PresentationContext';
import { MousePointerClick } from 'lucide-react';

export const Slide14Tactile: React.FC = () => {
  const { switchType, setSwitchType } = usePresentation();
  const [clickCount, setClickCount] = useState<number>(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const switches: { type: SwitchType; name: string; stemColor: string; force: string; travel: string; soundDesc: string }[] = [
    { type: 'clicky', name: 'Blue Clicky', stemColor: 'bg-[#2563EB]', force: '50g Actuation', travel: '2.2mm Pre-travel', soundDesc: 'High-pitch click leaf snap & plastic clack' },
    { type: 'tactile', name: 'Brown Tactile', stemColor: 'bg-[#92400E]', force: '45g Actuation', travel: '2.0mm Pre-travel', soundDesc: 'Soft tactile bump & muted acoustic bottom-out' },
    { type: 'linear', name: 'Red Linear', stemColor: 'bg-[#DC2626]', force: '45g Actuation', travel: '2.0mm Pre-travel', soundDesc: 'Smooth uninterrupted keystroke & deep thock' },
  ];

  const keys = ['Q', 'W', 'E', 'R', 'SPACE', 'ENTER'];

  const handleKeyPress = (k: string) => {
    sound.playSwitchPress(k === 'SPACE' ? 0.75 : k === 'ENTER' ? 0.85 : 1.05);
    setClickCount((c) => c + 1);
    setActiveKey(k);
    setTimeout(() => setActiveKey(null), 120);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <MousePointerClick className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            14 / Tactile Ergonomics & Switches
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">MECHANICAL SWITCH LABORATORY</h2>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-4">
        <div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#11100E]">
            MAKE THE INTERFACE FEEL PHYSICAL.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#77736B] font-medium">
            Great software gives tangible feedback. Test mechanical switch profiles below:
          </p>
        </div>

        {/* 3 Mechanical Switch Profile Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          {switches.map((s) => {
            const isSelected = switchType === s.type;
            return (
              <button
                key={s.type}
                onClick={() => {
                  setSwitchType(s.type);
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-lg scale-102 ring-2 ring-[#11100E]/20'
                    : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${s.stemColor}`} />
                    <span className="font-bold text-xs">{s.name}</span>
                  </div>
                  {isSelected && <span className="text-[10px] text-[#F59E0B] font-bold">● ACTIVE</span>}
                </div>
                <div className={`text-[11px] mt-2 ${isSelected ? 'text-white/80' : 'text-[#77736B]'}`}>
                  {s.soundDesc}
                </div>
                <div className="mt-3 pt-2 border-t border-black/10 flex justify-between text-[10px] text-[#77736B]">
                  <span>{s.force}</span>
                  <span>{s.travel}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Mechanical Keycap Pad */}
        <div className="p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 flex flex-col items-center justify-center space-y-4 shadow-sm">
          <div className="flex items-center justify-between w-full font-mono text-xs text-[#77736B] border-b border-[#11100E]/10 pb-2">
            <span>PRESS KEYCAPS TO HEAR SWITCH MECHANICS:</span>
            <span className="font-bold text-[#11100E]">TOTAL CLICKS: {clickCount}</span>
          </div>

          {/* Keycaps Row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {keys.map((k) => {
              const isPressed = activeKey === k;
              return (
                <button
                  key={k}
                  onMouseDown={() => handleKeyPress(k)}
                  className={`rounded-xl border-2 border-[#11100E] font-mono text-xs font-bold transition-all duration-75 cursor-pointer shadow-[0_4px_0_0_#11100E] active:shadow-none active:translate-y-1 ${
                    k === 'SPACE'
                      ? 'w-36 h-12 bg-white text-[#11100E]'
                      : k === 'ENTER'
                      ? 'w-20 h-12 bg-[#11100E] text-white shadow-[0_4px_0_0_#2B2824]'
                      : 'w-12 h-12 bg-white text-[#11100E]'
                  } ${isPressed ? 'translate-y-1 shadow-none bg-[#F59E0B] text-[#11100E]' : ''}`}
                >
                  {k}
                </button>
              );
            })}
          </div>

          <div className="font-mono text-xs text-[#77736B]">
            Real-time Web Audio synthesis simulating physical leaf snap and bottom-out housing resonance.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Tactile feedback turns an abstract screen into an intuitive instrument.</span>
        <span>14 / 25</span>
      </div>
    </div>
  );
};
