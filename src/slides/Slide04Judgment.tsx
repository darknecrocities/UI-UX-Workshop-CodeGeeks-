import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Bot, UserCheck, ArrowRightLeft, Check, Minus, Sparkles, RotateCcw } from 'lucide-react';

export const Slide04Judgment: React.FC = () => {
  const [activeSide, setActiveSide] = useState<'AI' | 'HUMAN'>('HUMAN');
  const [removedElements, setRemovedElements] = useState<string[]>([]);

  const noiseItems = [
    {
      id: 'Chaotic Glow Orbs',
      label: 'Chaotic Glow Orbs',
      icon: '◎',
      desc: 'Unnecessary decorative radial gradients',
    },
    {
      id: 'Floating Blobs',
      label: 'Floating Blobs',
      icon: '◇',
      desc: 'Amorphous floating vector shapes',
    },
    {
      id: 'Fake Testimonials',
      label: 'Fake Testimonials',
      icon: '★',
      desc: '"10x velocity!" — Unverified bot quote',
    },
    {
      id: 'Generic Dashboards',
      label: 'Generic Dashboards',
      icon: '▤',
      desc: '+842% AI synergy circular chart widget',
    },
  ];

  const toggleSubtract = (elem: string) => {
    setRemovedElements((prev) => {
      const willRemove = !prev.includes(elem);
      if (willRemove) {
        if (prev.length === noiseItems.length - 1) {
          sound.playSuccess();
        } else {
          sound.playClick(1.25);
        }
        return [...prev, elem];
      } else {
        sound.playSlopAlert();
        return prev.filter((e) => e !== elem);
      }
    });
  };

  const cutAll = () => {
    sound.playSuccess();
    setRemovedElements(noiseItems.map((n) => n.id));
  };

  const restoreAll = () => {
    sound.playSlopAlert();
    setRemovedElements([]);
  };

  const aiGenerates = [
    { title: 'Code Syntax', desc: 'Components, classes, DOM nodes' },
    { title: 'Scaffold Layout', desc: 'Default grid and flex boxes' },
    { title: 'Generic Copy', desc: 'Standard placeholder text' },
    { title: 'Excess Widgets', desc: 'Floating badges, blobs, shadows' },
  ];

  const humansDecide = [
    { title: 'Why does this exist?', desc: 'Core purpose & real problem' },
    { title: 'Who is this for?', desc: 'How real people think & tap' },
    { title: 'What gets cut?', desc: 'Removing all the clutter' },
    { title: 'What creates trust?', desc: 'Clean details & great feel' },
  ];

  const allSubtracted = removedElements.length === noiseItems.length;

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
          <ArrowRightLeft className="w-3 h-3 text-[#F5F1E8]" />
          <span>Focus: {activeSide}</span>
        </button>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-4">
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

        {/* Modular Columns — Pure Beige & Black */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AI Column with Live Noise Layer (Beige & Black Only) */}
          <div
            onClick={() => {
              setActiveSide('AI');
              sound.playClick(0.9);
            }}
            className={`relative p-5 rounded-2xl border transition-all cursor-pointer overflow-hidden ${
              activeSide === 'AI'
                ? 'bg-[#E9E1D3] border-[#11100E] shadow-md ring-2 ring-[#11100E]/15'
                : 'bg-[#F5F1E8]/60 border-[#11100E]/15 opacity-85'
            }`}
          >
            <div className="relative z-10 flex items-center justify-between mb-3 pb-2 border-b border-[#11100E]/10">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#11100E]" />
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#11100E]">
                  WHAT AI GENERATES
                </h3>
              </div>

              {/* Live Noise Level Pill — Beige & Black */}
              <span
                className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all ${
                  allSubtracted
                    ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
                    : 'bg-white text-[#11100E] border-[#11100E]/20'
                }`}
              >
                {allSubtracted
                  ? 'CLEAN (0 NOISE)'
                  : `${noiseItems.length - removedElements.length} NOISE ACTIVE`}
              </span>
            </div>

            {/* Core Scaffold Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-2 font-mono text-xs">
              {aiGenerates.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-white/60 border border-[#11100E]/10 flex flex-col justify-between min-h-[54px]"
                >
                  <div className="font-bold text-[#11100E] text-[11px]">{item.title}</div>
                  <div className="text-[10px] text-[#77736B] mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Live Active Noise Layer: Direct Visual Proof of Subtraction (Beige & Black Only) */}
            <div className="relative z-10 mt-3 pt-2.5 border-t border-[#11100E]/10 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-[#77736B] mb-1.5 font-bold uppercase">
                <span>Active Slop Layer:</span>
                <span className="text-[#11100E]">
                  {allSubtracted ? 'All Subtracted' : 'Click Badge to Cut'}
                </span>
              </div>

              {allSubtracted ? (
                <div className="p-2 rounded-xl bg-white border border-[#11100E]/20 text-[#11100E] flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#11100E]" />
                    <span>Pure Intentional Craft Restored — Zero Slop</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      restoreAll();
                    }}
                    className="underline text-[10px] text-[#77736B] hover:text-[#11100E] cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1.5">
                  {noiseItems.map((n) => {
                    const isRemoved = removedElements.includes(n.id);
                    if (isRemoved) return null;
                    return (
                      <div
                        key={n.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubtract(n.id);
                        }}
                        className="p-1.5 px-2 rounded-lg border border-[#11100E]/20 bg-white text-[#11100E] flex items-center justify-between gap-1 text-[10px] shadow-xs cursor-pointer hover:border-[#11100E] transition-all group"
                        title={`Click to subtract ${n.label}`}
                      >
                        <div className="flex items-center gap-1.5 truncate font-mono">
                          <span className="text-[11px] opacity-70">{n.icon}</span>
                          <span className="font-bold truncate">{n.label}</span>
                        </div>
                        <span className="text-[9px] font-bold opacity-50 group-hover:opacity-100 shrink-0">
                          ✕ CUT
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Human Column — Pure Beige & Black */}
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
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/15">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#F5F1E8]" />
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#F5F1E8]">
                  WHAT HUMANS DECIDE
                </h3>
              </div>
              <span className="font-mono text-[10px] font-bold text-[#F5F1E8] px-2 py-0.5 rounded bg-white/10 border border-white/10">
                TASTE & RESTRAINT
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {humansDecide.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex flex-col justify-between min-h-[54px] ${
                    activeSide === 'HUMAN'
                      ? 'bg-white/10 border-white/10'
                      : 'bg-[#11100E]/5 border-[#11100E]/5'
                  }`}
                >
                  <div
                    className={`font-bold text-[11px] ${
                      activeSide === 'HUMAN' ? 'text-white' : 'text-[#11100E]'
                    }`}
                  >
                    {item.title}
                  </div>
                  <div
                    className={`text-[10px] mt-0.5 ${
                      activeSide === 'HUMAN' ? 'text-white/70' : 'text-[#77736B]'
                    }`}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Human Restraint Principle Banner */}
            <div className="mt-3 pt-2.5 border-t border-white/10 font-mono text-xs text-[#E9E1D3]/80">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[10px] leading-relaxed">
                <span className="text-[#F5F1E8] font-bold">Rule #1: </span>
                Every element on screen must earn its right to exist. If it doesn't solve a user problem, delete it.
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Subtraction Bar — Beige & Black Only */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-[#F5F1E8] border border-[#11100E]/15 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#77736B] font-bold">Test Subtracting Noise:</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                allSubtracted
                  ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
                  : 'bg-white text-[#11100E] border-[#11100E]/20'
              }`}
            >
              {allSubtracted
                ? '0% NOISE (CLEAN)'
                : `${noiseItems.length - removedElements.length} NOISE REMAINING`}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {noiseItems.map((elem) => {
              const isRemoved = removedElements.includes(elem.id);
              return (
                <button
                  key={elem.id}
                  onClick={() => toggleSubtract(elem.id)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] flex items-center gap-1.5 cursor-pointer transition-all ${
                    isRemoved
                      ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-xs'
                      : 'bg-white text-[#11100E] border-[#11100E]/20 hover:border-[#11100E] hover:bg-[#FAF7F2]'
                  }`}
                  title={isRemoved ? `Restore ${elem.label}` : `Subtract ${elem.label}`}
                >
                  {isRemoved ? (
                    <Check className="w-3 h-3 text-[#F5F1E8]" />
                  ) : (
                    <Minus className="w-3 h-3 text-[#11100E]" />
                  )}
                  <span>{elem.label}</span>
                  <span className="text-[9px] opacity-75">
                    {isRemoved ? '(CUT)' : ''}
                  </span>
                </button>
              );
            })}

            {/* Quick Action Button — Beige & Black */}
            <button
              onClick={allSubtracted ? restoreAll : cutAll}
              className="px-2.5 py-1 rounded-lg bg-[#11100E] text-[#F5F1E8] text-[10px] font-bold cursor-pointer hover:bg-black transition-colors flex items-center gap-1 border border-[#11100E]"
              title={allSubtracted ? 'Restore all noisy widgets' : 'Cut all noise at once'}
            >
              {allSubtracted ? (
                <>
                  <RotateCcw className="w-3 h-3 text-[#F5F1E8]" />
                  <span>Restore</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-[#F5F1E8]" />
                  <span>Cut All</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>When anyone can generate UI, good choices matter most.</span>
        <span>04 / 30</span>
      </div>
    </div>
  );
};
