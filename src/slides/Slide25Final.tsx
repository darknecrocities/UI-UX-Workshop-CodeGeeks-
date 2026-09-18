import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Sparkles, ExternalLink, Check, Copy } from 'lucide-react';

export const Slide25Final: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyInfo = () => {
    sound.playSuccess();
    navigator.clipboard.writeText('Arron Parejas — https://arronparejas.dev (Founder @ DomoDomo)');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 md:p-14 max-w-7xl mx-auto select-none">
      {/* Top Meta */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-4 font-mono text-xs text-[#77736B]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#11100E]" />
          <span className="tracking-widest uppercase font-bold text-[#11100E]">30 / FINAL THOUGHT</span>
        </div>
        <span className="tracking-wider font-semibold text-[#11100E]">NO AI SLOP</span>
      </div>

      {/* Main Massive Editorial Typography */}
      <div className="my-auto py-6">
        <div className="space-y-1 sm:space-y-2">
          <h1
            onMouseEnter={() => sound.playClick(1.2)}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px] font-black tracking-tighter leading-none text-[#11100E] cursor-default"
          >
            DON'T JUST GENERATE.
          </h1>
          <h1
            onMouseEnter={() => sound.playClick(0.9)}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px] font-black tracking-tighter leading-none text-[#11100E] cursor-default"
          >
            <span className="underline decoration-4 underline-offset-8 decoration-[#11100E]">
              DESIGN.
            </span>
          </h1>
        </div>

        <div className="mt-6 space-y-1.5 max-w-xl">
          <p className="text-lg sm:text-2xl text-[#11100E] font-medium tracking-tight">
            AI can help you ship faster.
          </p>
          <p className="text-base sm:text-xl text-[#77736B] font-medium tracking-tight">
            Taste determines what is worth shipping.
          </p>
        </div>

        {/* Interactive Copy Speaker Button */}
        <div className="mt-6">
          <button
            onClick={copyInfo}
            className="px-4 py-2 rounded-xl bg-[#11100E] text-[#F5F1E8] font-mono text-xs font-bold flex items-center gap-2 cursor-pointer hover:bg-black transition-colors shadow-md"
          >
            {copied ? <Check className="w-4 h-4 text-[#F5F1E8]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'SPEAKER INFO COPIED!' : 'COPY SPEAKER LINKS & BIO'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Dossier & Contact */}
      <div className="pt-4 border-t border-[#11100E]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4 font-mono text-xs">
        <div>
          <div className="text-sm font-bold text-[#11100E]">ARRON PAREJAS</div>
          <div className="text-[#77736B] mt-0.5">
            Founder — DomoDomo · ML Engineer — FlyRank
          </div>
          <a
            href="https://arronparejas.dev"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playClick(1.1)}
            className="inline-flex items-center gap-1.5 text-[#11100E] hover:underline font-bold mt-1"
          >
            <span>arronparejas.dev</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="text-right flex flex-col items-end">
          <span className="text-[#77736B] text-[10px] uppercase tracking-widest block">
            WORKSHOP CONCLUDED
          </span>
          <span className="text-xs font-bold text-[#11100E] tracking-wider">
            FROM SKETCH TO SHIP.
          </span>
          <span className="text-[#77736B] text-[10px] font-mono mt-1">
            30 / 30
          </span>
        </div>
      </div>
    </div>
  );
};
