import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { DollarSign, Maximize2, X } from 'lucide-react';

export const Slide11MMRStory: React.FC = () => {
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-10 max-w-7xl mx-auto select-none">
      {/* Header — clean & badge-free */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            12 / Proof · Student to $3,279 MRR
          </span>
        </div>
        <span className="font-mono text-xs text-[#77736B]">REAL REVENUE DASHBOARD</span>
      </div>

      {/* Main Grid: Minimalist Story & Tagline (6 cols) | Clean Photo Proof (6 cols) */}
      <div className="my-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Bold, simple words and inspiring tagline */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#11100E] leading-[1.05]">
              SIMPLE UI.
              <br />
              <span className="text-[#77736B]">REAL INCOME.</span>
            </h1>

            {/* Inspiring Tagline */}
            <p className="mt-4 text-base sm:text-lg text-[#11100E] font-medium leading-snug">
              You don’t need venture capital or complex code. A simple tool that solves one real friction can build life-changing income.
            </p>
          </div>

          {/* Minimalist Key Points */}
          <div className="space-y-4 pt-2 border-t border-[#11100E]/10 font-mono text-xs sm:text-sm text-[#11100E]">
            <div className="flex items-start gap-3">
              <span className="font-bold text-[#77736B] text-xs mt-0.5">01</span>
              <div>
                <strong className="block font-bold">42 Paying Subscribers</strong>
                <span className="text-xs text-[#77736B]">People happily pay for software that saves them time and gives zero headaches.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-bold text-[#77736B] text-xs mt-0.5">02</span>
              <div>
                <strong className="block font-bold">100% Word of Mouth</strong>
                <span className="text-xs text-[#77736B]">Zero dollars spent on ads. When software feels fast and honest, users share it.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-bold text-[#77736B] text-xs mt-0.5">03</span>
              <div>
                <strong className="block font-bold">Built as a Student</strong>
                <span className="text-xs text-[#77736B]">Don’t wait for someone to hire you. Pick one sharp problem, design a clean UI, and ship.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Photo Proof without pill stickers */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-md space-y-3">
            {/* Photo Card */}
            <div
              onClick={() => {
                sound.playClick(1.2);
                setIsZoomOpen(true);
              }}
              className="relative rounded-2xl overflow-hidden border border-[#11100E]/20 bg-[#181614] shadow-lg cursor-pointer group aspect-4/3 sm:aspect-[4/3.2]"
            >
              <img
                src="/assets/images/mmr.png"
                alt="Arron Parejas $3,279 MMR Dashboard Proof"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between font-mono">
                <span className="text-xs font-bold">Actual laptop dashboard · 2026</span>
                <span className="text-[11px] text-white/80 flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" /> Click to enlarge
                </span>
              </div>
            </div>

            {/* Minimalist Stat Bar */}
            <div className="p-3 rounded-xl bg-white border border-[#11100E]/15 grid grid-cols-3 gap-2 text-center font-mono">
              <div>
                <div className="text-lg sm:text-xl font-black text-[#11100E]">$3,279</div>
                <div className="text-[10px] text-[#77736B] uppercase tracking-wider mt-0.5">Monthly MRR</div>
              </div>
              <div className="border-x border-[#11100E]/10">
                <div className="text-lg sm:text-xl font-black text-[#11100E]">42</div>
                <div className="text-[10px] text-[#77736B] uppercase tracking-wider mt-0.5">Subscribers</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-[#11100E]">100%</div>
                <div className="text-[10px] text-[#77736B] uppercase tracking-wider mt-0.5">Organic</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B] shrink-0">
        <span>Usefulness precedes revenue. Simple UI wins users.</span>
        <span>12 / 30</span>
      </div>

      {/* Clean Lightbox Modal */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-150 select-none cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#181614] rounded-2xl overflow-hidden border border-white/20 p-2 shadow-2xl"
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-black/70 hover:bg-black text-white cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src="/assets/images/mmr.png"
              alt="Arron Parejas $3,279 MMR Dashboard Proof"
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
            />
            <div className="p-3 text-center font-mono text-xs text-[#D8D3C8]">
              Overview: $3,279 Revenue · $3,279 MRR · 42 Active Subscriptions (Aug 19 – Sep 17, 2026)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
