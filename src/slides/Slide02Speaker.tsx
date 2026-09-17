import React, { useState } from 'react';
import { UnoProductStack } from '../components/UnoProductStack';
import { sound } from '../audio/sound';
import { Award, GitFork, ExternalLink, Sparkles, User } from 'lucide-react';

export const Slide02Speaker: React.FC = () => {
  const [appCount, setAppCount] = useState<number>(70);
  const [activeBadge, setActiveBadge] = useState<number | null>(null);

  const badges = [
    { title: '8× Hackathons', subtitle: 'Champion', icon: Award, color: 'text-[#D97706]' },
    { title: 'Shipaton 2026', subtitle: 'Winner', icon: Sparkles, color: 'text-[#16A34A]' },
    { title: 'Top 11 in PH', subtitle: 'GitHub Rank', icon: GitFork, color: 'text-[#2563EB]' },
    { title: 'GDG Campus Lead', subtitle: 'HAU Chapter', icon: User, color: 'text-[#11100E]' },
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
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#11100E] text-[#F5F1E8] font-mono text-[10px] tracking-wider uppercase mb-2">
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

          {/* Compact Tactile Squircle Badges (Not stretched rectangles!) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            {badges.map((b, idx) => {
              const Icon = b.icon;
              const isSelected = activeBadge === idx;
              return (
                <button
                  key={b.title}
                  onClick={() => {
                    sound.playClick(1.2);
                    setActiveBadge(isSelected ? null : idx);
                  }}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-md scale-102'
                      : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#F59E0B]' : b.color}`} />
                  <div className="mt-2">
                    <div className="font-bold text-xs">{b.title}</div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/70' : 'text-[#77736B]'}`}>
                      {b.subtitle}
                    </div>
                  </div>
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
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-[#F59E0B] group-hover:scale-105 transition-transform">
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
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Profile Squircle Card + Uno Product Cards Fan (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Profile Card with natural squircle proportion */}
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-3xl bg-[#181614] border border-[#2D2A26] p-2 shadow-2xl overflow-hidden aspect-square">
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
        <span>Click Uno cards to inspect live products</span>
      </div>
    </div>
  );
};
