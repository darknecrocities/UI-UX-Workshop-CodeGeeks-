import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Play, RotateCcw, Zap } from 'lucide-react';

type MotionMode = 'ENTER' | 'EXIT' | 'TRANSFORM';

export const Slide13Motion: React.FC = () => {
  const [mode, setMode] = useState<MotionMode>('TRANSFORM');
  const [triggerKey, setTriggerKey] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(false);

  const principles = [
    { title: 'CONTINUITY', desc: 'Objects do not teleport. They transition logically through space.', emoji: '→' },
    { title: 'HIERARCHY', desc: 'Primary items move first. Secondary items follow with slight stagger.', emoji: '↓' },
    { title: 'CAUSE & EFFECT', desc: 'User action directly initiates the motion impulse.', emoji: '⚡' },
    { title: 'ORIENTATION', desc: 'Spatial cues tell users where they came from and where to return.', emoji: '◎' },
  ];

  const trigger = () => {
    sound.playTap();
    setExpanded((prev) => !prev);
    setTriggerKey((k) => k + 1);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            13 / Motion Physics
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">MOTION AS EXPLANATION</h2>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#11100E]">
            MOTION SHOULD EXPLAIN.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#77736B] font-medium">
            Never animate for decoration. Click mode then "Trigger" to see the physics:
          </p>
        </div>

        {/* Mode Selector + Trigger */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {(['ENTER', 'EXIT', 'TRANSFORM'] as MotionMode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                sound.playClick(1.2);
                setMode(m);
                setExpanded(false);
                setTriggerKey((k) => k + 1);
              }}
              className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
                mode === m
                  ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] font-bold'
                  : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15'
              }`}
            >
              {m}
            </button>
          ))}

          <button
            onClick={trigger}
            className="ml-auto px-3 py-1.5 rounded bg-[#F59E0B] text-[#11100E] border border-[#F59E0B]/50 flex items-center gap-1.5 font-mono text-xs font-bold cursor-pointer hover:bg-[#F59E0B]/90 transition-colors shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Trigger State Change</span>
          </button>

          <button
            onClick={() => {
              sound.playTap();
              setExpanded(false);
              setTriggerKey((k) => k + 1);
            }}
            className="p-1.5 rounded bg-[#E9E1D3] text-[#11100E] border border-[#11100E]/20 flex items-center cursor-pointer hover:bg-[#11100E]/5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Motion Stage */}
        <div className="relative h-36 sm:h-44 rounded-xl bg-[#F5F1E8] border border-[#11100E]/20 p-6 flex items-center justify-center overflow-hidden">
          {/* Axis labels */}
          <span className="absolute top-2 left-3 font-mono text-[9px] text-[#11100E]/25 uppercase tracking-widest">Motion Stage</span>

          {mode === 'ENTER' && (
            <div
              key={triggerKey}
              className="p-5 rounded-lg bg-[#11100E] text-[#F5F1E8] font-mono text-xs shadow-xl"
              style={{
                animation: 'slideInUp 300ms cubic-bezier(0.22, 1, 0.36, 1) both',
              }}
            >
              <div className="font-bold text-sm text-[#F59E0B]">ENTER STATE</div>
              <p className="text-[#E9E1D3]/80 mt-1">
                Enters with opacity + 12px upward translation. Duration: 300ms ease-out.
              </p>
            </div>
          )}

          {mode === 'EXIT' && (
            <div
              key={triggerKey}
              className={`p-5 rounded-lg bg-[#11100E] text-[#F5F1E8] font-mono text-xs shadow-xl transition-all duration-300 ${
                expanded
                  ? 'opacity-0 translate-y-3 pointer-events-none'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="font-bold text-sm text-[#DC2626]">EXIT STATE</div>
              <p className="text-[#E9E1D3]/80 mt-1">
                Fades + descends 8px before next element takes focus. Hit Trigger to exit.
              </p>
            </div>
          )}

          {mode === 'TRANSFORM' && (
            <div
              key={triggerKey}
              onClick={() => { sound.playClick(1.1); setExpanded((p) => !p); }}
              className={`rounded-xl bg-[#11100E] text-[#F5F1E8] font-mono text-xs shadow-xl cursor-pointer transition-all duration-500 ease-in-out overflow-hidden ${
                expanded ? 'w-72 h-28' : 'w-44 h-16'
              } flex flex-col justify-center`}
              style={{ padding: expanded ? '20px' : '14px' }}
            >
              <div className={`font-bold transition-all duration-300 ${expanded ? 'text-sm text-[#F59E0B]' : 'text-xs text-white'}`}>
                {expanded ? 'EXPANDED STATE' : 'COMPACT →'}
              </div>
              {expanded && (
                <p className="text-[#E9E1D3]/80 mt-1 text-xs">
                  Size transforms with spring physics. Click card to collapse.
                </p>
              )}
            </div>
          )}
        </div>

        {/* 4 Principles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs">
          {principles.map((p, idx) => (
            <div
              key={idx}
              onClick={() => sound.playClick(1.0)}
              className="p-3 rounded-xl bg-[#F5F1E8] border border-[#11100E]/15 hover:border-[#11100E]/40 transition-all cursor-default"
            >
              <div className="text-lg mb-1">{p.emoji}</div>
              <div className="font-bold text-[11px] text-[#11100E]">{p.title}</div>
              <div className="text-[10px] text-[#77736B] mt-0.5 leading-relaxed">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Animation that explains state is UX. Animation that decorates is noise.</span>
        <span>13 / 25</span>
      </div>

      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
