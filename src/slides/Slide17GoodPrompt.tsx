import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Terminal, Wand2, RefreshCw } from 'lucide-react';

export const Slide17GoodPrompt: React.FC = () => {
  const [layersCount, setLayersCount] = useState<number>(1);

  const layers = [
    { tag: 'RAW (SLOP)', text: '"Make a cool website for my product."', isRaw: true },
    { tag: 'CONTEXT', text: 'You are building a high-focus terminal for autonomous developer workflows.' },
    { tag: 'USER', text: 'Targeting full-stack engineers who navigate primarily via hotkeys and command palette.' },
    { tag: 'GOAL', text: 'Enable developers to audit AI tool executions in real-time with zero latency.' },
    { tag: 'DESIGN', text: 'Warm beige parchment (#E9E1D3) × near-black (#11100E) with Swiss typography hierarchy.' },
    { tag: 'INTERACTION', text: 'Keyboard shortcuts: J/K row selection, Esc closes inspector, Space toggles playback.' },
    { tag: 'CONSTRAINTS', text: 'Strictly no purple gradients, no floating glassmorphism, no fake stats.' },
    { tag: 'TECH', text: 'React 19, TypeScript, Tailwind CSS v4, Motion, zero external CDNs.' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            17 / Prompt Transformation
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">ANATOMY OF A GOOD PROMPT</h2>
      </div>

      {/* Main Content */}
      <div className="my-auto py-2 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#11100E]">
              PROMPT TRANSFORMATION ENGINE
            </h2>
            <p className="text-xs sm:text-sm text-[#77736B]">
              Step-by-step evolution from a lazy prompt into an architectural design brief:
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => {
                sound.playClick(1.3);
                setLayersCount((c) => Math.min(layers.length, c + 1));
              }}
              disabled={layersCount >= layers.length}
              className="px-3 py-1.5 rounded bg-[#11100E] text-[#F5F1E8] disabled:opacity-40 flex items-center gap-1.5 cursor-pointer hover:bg-[#11100E]/90 transition-colors"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Add Layer ({layersCount}/{layers.length})</span>
            </button>

            <button
              onClick={() => {
                sound.playTap();
                setLayersCount(1);
              }}
              className="p-1.5 rounded bg-[#F5F1E8] border border-[#11100E]/20 text-[#11100E] cursor-pointer hover:bg-[#11100E]/5"
              title="Reset"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Structured Prompt Stack Terminal */}
        <div className="p-5 rounded-xl bg-[#11100E] text-[#F5F1E8] border border-[#11100E] font-mono text-xs space-y-2.5 max-h-[300px] overflow-y-auto shadow-xl">
          {layers.slice(0, layersCount).map((l, i) => (
            <div
              key={i}
              className={`p-2.5 rounded border transition-all animate-in fade-in slide-in-from-left-2 duration-200 ${
                l.isRaw
                  ? 'bg-red-950/40 border-red-800/50 text-red-300'
                  : 'bg-white/5 border-white/10 text-[#E9E1D3]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    l.isRaw ? 'bg-red-800 text-white' : 'bg-[#F59E0B] text-[#11100E]'
                  }`}
                >
                  {l.tag}
                </span>
                {l.isRaw && <span className="text-[10px] text-red-400 font-normal">→ High probability of slop</span>}
              </div>
              <p className="text-xs">{l.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>The AI coding model is only as smart as the constraints you give it.</span>
        <span>17 / 25</span>
      </div>
    </div>
  );
};
