import React from 'react';
import { sound } from '../audio/sound';
import { usePresentation } from '../context/PresentationContext';
import { ArrowRight, Volume2 } from 'lucide-react';

export const Slide01Cover: React.FC = () => {
  const { soundEnabled, toggleSound, nextSlide } = usePresentation();

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 md:p-14 max-w-7xl mx-auto select-none">
      {/* Top micro metadata */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-4 font-mono text-xs text-[#77736B]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#11100E]" />
          <span className="tracking-widest uppercase font-bold text-[#11100E]">4-HOUR WORKSHOP</span>
        </div>
        <span className="tracking-wider">DESIGN BETTER · SHIP BETTER</span>
      </div>

      {/* Main Monumental Typography */}
      <div className="my-auto py-4">
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
            <h1
              onMouseEnter={() => sound.playClick(1.2)}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-black tracking-tighter leading-none text-[#11100E] cursor-default transition-transform hover:-translate-y-1"
            >
              NO
            </h1>
            <span className="font-mono text-lg sm:text-2xl md:text-3xl text-[#77736B] tracking-tight font-light">
              [TASTE OVER GENERIC CODE]
            </span>
          </div>

          <div className="flex items-baseline gap-4 sm:gap-8 flex-wrap">
            <h1
              onMouseEnter={() => sound.playClick(1.0)}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-black tracking-tighter leading-none text-[#11100E] cursor-default transition-transform hover:-translate-y-1"
            >
              AI
            </h1>
            <span className="text-lg sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#11100E]">
              From Sketch to Ship.
            </span>
          </div>

          <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
            <h1
              onMouseEnter={() => sound.playClick(0.85)}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-black tracking-tighter leading-none text-[#11100E] cursor-default transition-transform hover:-translate-y-1"
            >
              SLOP
            </h1>
          </div>
        </div>

        <p className="mt-6 text-base sm:text-xl text-[#77736B] font-medium max-w-xl tracking-tight">
          Design Better. Prompt Better. Ship Better.
        </p>

        {/* Interactive Quick Launch Buttons on Cover */}
        <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
          <button
            onClick={() => {
              sound.playClick(1.2);
              nextSlide();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#11100E] text-[#F5F1E8] font-bold flex items-center gap-2 hover:bg-[#11100E]/90 transition-all cursor-pointer shadow-md active:scale-98"
          >
            <span>START WORKSHOP</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSound}
            className={`px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 cursor-pointer ${
              soundEnabled
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
                : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{soundEnabled ? 'CLICK SOUNDS ON' : 'TURN ON SOUNDS'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Architectural Details */}
      <div className="pt-4 border-t border-[#11100E]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4 font-mono text-xs">
        <div>
          <div className="text-[#77736B] uppercase text-[10px] tracking-widest">Presenter</div>
          <div className="text-sm font-bold text-[#11100E] mt-0.5">Arron Parejas</div>
          <div className="text-[#77736B]">Founder, DomoDomo · ML Engineer, FlyRank</div>
        </div>

        <div className="flex items-center gap-4 text-[#77736B]">
          <span>Press Space or → to advance</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#11100E]/30" />
          <span>Press Esc for Index</span>
        </div>
      </div>
    </div>
  );
};
