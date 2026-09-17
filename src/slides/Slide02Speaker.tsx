import React, { useState } from 'react';
import { UnoProductStack } from '../components/UnoProductStack';
import { sound } from '../audio/sound';
import { User } from 'lucide-react';

export const Slide02Speaker: React.FC = () => {
  const [appCount, setAppCount] = useState<number>(70);
  const [activeBadge, setActiveBadge] = useState<number | null>(null);

  const badges = [
    { title: '8× Hackathons', subtitle: 'Champion' },
    { title: 'Shipaton 2026', subtitle: 'Winner' },
    { title: 'Top 11 in PH', subtitle: 'GitHub Rank' },
    { title: 'GDG Campus Lead', subtitle: 'HAU Chapter' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            02 / Speaker & Works
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">WHO'S TALKING?</h2>
      </div>

      {/* Main Grid */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center py-2">
        {/* Left Column: Speaker Info & Compact Tactile Tiles (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="font-mono text-xs font-bold tracking-widest text-[#77736B] uppercase mb-1">
              BUILDER & DESIGNER
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#11100E]">
              ARRON PAREJAS
            </h1>
            <p className="text-sm sm:text-base text-[#77736B] mt-1 font-medium">
              Founder @ <span className="text-[#11100E] font-semibold">DomoDomo</span> · ML Engineer @{' '}
              <span className="text-[#11100E] font-semibold">FlyRank</span>
            </p>
          </div>

          {/* Minimalist Stat Cards — beige × black only */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#11100E]/20 rounded-2xl overflow-hidden border border-[#11100E]/20 font-mono text-xs">
            {badges.map((b, idx) => {
              const isSelected = activeBadge === idx;
              return (
                <button
                  key={b.title}
                  onClick={() => {
                    sound.playClick(1.2);
                    setActiveBadge(isSelected ? null : idx);
                  }}
                  className={`relative p-4 flex flex-col justify-between text-left cursor-pointer transition-all duration-200 min-h-[88px] ${
                    isSelected
                      ? 'bg-[#11100E]'
                      : 'bg-[#F5F1E8] hover:bg-[#EFEAE0]'
                  }`}
                >
                  {/* Index number */}
                  <span className={`text-[10px] font-bold tracking-widest ${isSelected ? 'text-[#F5F1E8]/40' : 'text-[#11100E]/30'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Main stat */}
                  <div className="mt-3">
                    <div className={`text-sm font-black leading-none tracking-tight ${isSelected ? 'text-[#F5F1E8]' : 'text-[#11100E]'}`}>
                      {b.title}
                    </div>
                    <div className={`text-[10px] mt-1 uppercase tracking-widest ${isSelected ? 'text-[#F5F1E8]/50' : 'text-[#77736B]'}`}>
                      {b.subtitle}
                    </div>
                  </div>

                  {/* Active indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#F5F1E8]/60" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Shipped Apps Badge */}
          <div className="p-4 rounded-2xl bg-[#11100E] text-[#F5F1E8] flex items-center justify-between shadow-lg">
            <button
              onClick={() => {
                sound.playClick(1.3);
                setAppCount((c) => c + 1);
              }}
              className="flex items-center gap-3 cursor-pointer group text-left"
              title="Click to ship another app"
            >
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-[#F5F1E8] group-hover:scale-105 transition-transform">
                {appCount}+
              </span>
              <div>
                <div className="font-mono text-xs uppercase tracking-wider font-bold">
                  Shipped Open-Source Apps
                </div>
                <div className="text-[11px] text-[#E9E1D3]/70">
                  Click to test release counter
                </div>
              </div>
            </button>

            <a
              href="https://arronparejas.dev"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playClick(1.1)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>arronparejas.dev</span>
              <span className="text-[11px]">↗</span>
            </a>
          </div>
        </div>

        {/* Right Column: Profile Squircle Card + Uno Product Cards Fan (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Profile Card with natural squircle proportion - Enlarged */}
          <div className="relative w-52 h-52 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-3xl bg-[#181614] border border-[#2D2A26] p-2.5 shadow-2xl overflow-hidden aspect-square">
            <img
              src="/assets/images/profile.png"
              alt="Arron Parejas"
              className="w-full h-full object-cover rounded-2xl filter grayscale-15 contrast-105"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
          </div>

          {/* Uno Product Card Fan */}
          <div className="w-full mt-3">
            <UnoProductStack />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Ship software that solves real friction.</span>
        <span>Click cards to open live applications</span>
      </div>
    </div>
  );
};
