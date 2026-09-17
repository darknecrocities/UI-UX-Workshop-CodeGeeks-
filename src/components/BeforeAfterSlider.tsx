import React, { useState, useRef, useCallback } from 'react';
import { sound } from '../audio/sound';
import { Sparkles, ArrowRight, Grid3X3, Command } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0-100
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const handlePointerMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    sound.playClick(1.0);
    handlePointerMove(e.clientX);
  };

  const handlePointerDrag = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    handlePointerMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      sound.playClick(0.9);
      isDraggingRef.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between select-none space-y-2">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerDrag}
        onPointerUp={handlePointerUp}
        className="relative flex-1 w-full min-h-[260px] rounded-2xl overflow-hidden border border-[#11100E]/20 bg-[#F5F1E8] touch-none cursor-ew-resize shadow-md"
      >
        {/* Optional 8pt Grid Overlay for comparison */}
        {showGrid && (
          <div className="absolute inset-0 bg-grid-subtle opacity-60 pointer-events-none z-30" />
        )}

        {/* Right side: CRAFTED PREMIUM SYSTEM */}
        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between bg-[#F5F1E8] font-mono text-xs">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span className="font-bold text-[#11100E] tracking-tight">Live Dashboard · Server Stats</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#77736B]">8pt Grid Aligned</span>
              <span className="px-2 py-0.5 rounded bg-[#16A34A]/10 text-[#16A34A] font-bold text-[10px] border border-[#16A34A]/30">
                ✓ ACTIVE & STEADY
              </span>
            </div>
          </div>

          {/* Metric Row with strict tabular numerals and 8px gaps */}
          <div className="grid grid-cols-3 gap-3 my-auto">
            <div className="p-3 rounded-xl bg-white border border-[#11100E]/15 shadow-xs">
              <div className="text-[10px] text-[#77736B]">P99 LATENCY</div>
              <div className="text-xl font-bold text-[#11100E] tabular-nums mt-0.5">14.2ms</div>
              <div className="text-[10px] text-[#16A34A] mt-0.5">↓ −2.4ms (steady)</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#11100E]/15 shadow-xs">
              <div className="text-[10px] text-[#77736B]">THROUGHPUT</div>
              <div className="text-xl font-bold text-[#11100E] tabular-nums mt-0.5">84,920</div>
              <div className="text-[10px] text-[#77736B] mt-0.5">req/sec (peak)</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#11100E]/15 shadow-xs">
              <div className="text-[10px] text-[#77736B]">AVAILABILITY</div>
              <div className="text-xl font-bold text-[#16A34A] tabular-nums mt-0.5">99.98%</div>
              <div className="text-[10px] text-[#77736B] mt-0.5">SLO Target Met</div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between pt-2.5 border-t border-[#11100E]/15">
            <div className="flex items-center gap-2 text-[11px] text-[#77736B]">
              <Command className="w-3 h-3 text-[#11100E]" />
              <span>Press <strong className="text-[#11100E]">⌘K</strong> for command palette</span>
            </div>
            <button
              onClick={() => sound.playSuccess()}
              className="px-3.5 py-1.5 rounded-lg bg-[#11100E] text-[#F5F1E8] font-bold hover:bg-black transition-colors cursor-pointer flex items-center gap-1.5 active:translate-y-0.5 shadow-xs"
            >
              <span>Inspect Run</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Left side: AI SLOP DEFAULT (Clipped by sliderPos) */}
        <div
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
          className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between bg-gradient-to-br from-purple-100 via-indigo-50 to-pink-50 text-gray-800"
        >
          {/* Slop Header with excessive badges */}
          <div className="flex items-center justify-between border-b border-purple-200 pb-2.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
              <span className="font-extrabold text-sm text-purple-900">✨ ULTRA AI CLUSTER</span>
            </div>
            <div className="flex gap-1">
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-[9px] shadow-sm">
                TURBO v4
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-bold text-[9px]">
                PRO
              </span>
            </div>
          </div>

          {/* Slop Metrics: arbitrary paddings, rounded pills, low contrast */}
          <div className="grid grid-cols-3 gap-2 my-auto">
            <div className="p-[15px] rounded-[28px] bg-white/90 border-2 border-purple-300 shadow-lg text-center">
              <div className="text-[9px] text-gray-400">SPEED STAT</div>
              <div className="text-lg font-black text-purple-700">14.2ms</div>
              <div className="text-[8px] text-gray-400">Default generic font</div>
            </div>
            <div className="p-[7px] mt-2 rounded-[28px] bg-white/90 border-2 border-pink-300 shadow-lg text-center">
              <div className="text-[9px] text-gray-400">COUNT STAT</div>
              <div className="text-lg font-black text-pink-600">84920</div>
              <div className="text-[8px] text-gray-400">Uncalibrated digits</div>
            </div>
            <div className="p-[21px] rounded-[28px] bg-white/90 border-2 border-indigo-300 shadow-lg text-center">
              <div className="text-[9px] text-gray-400">SCORE STAT</div>
              <div className="text-lg font-black text-indigo-600">99.98%</div>
              <div className="text-[8px] text-gray-400">No tabular rhythm</div>
            </div>
          </div>

          {/* Slop Footer */}
          <div className="flex items-center justify-between pt-2.5 border-t border-purple-200">
            <span className="text-[10px] text-purple-700 font-semibold">Random margins · 30px pill radius</span>
            <button className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md">
              Upgrade To Pro Now
            </button>
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 w-0.5 bg-[#11100E] z-40 pointer-events-none"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#11100E] text-[#F5F1E8] flex items-center justify-center text-[11px] font-mono shadow-xl border-2 border-[#E9E1D3]">
            ⟷
          </div>
        </div>

      </div>

      {/* Interactive Controls Bar Below Slider */}
      <div className="flex items-center justify-between text-xs font-mono text-[#77736B]">
        <div className="flex items-center gap-3">
          <span>Drag divider ⟷</span>
          <button
            onClick={() => { sound.playClick(1.2); setShowGrid(!showGrid); }}
            className={`px-2 py-0.5 rounded border text-[10px] cursor-pointer flex items-center gap-1 ${
              showGrid
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
                : 'bg-white text-[#11100E] border-[#11100E]/20'
            }`}
          >
            <Grid3X3 className="w-3 h-3" />
            <span>{showGrid ? '8PT GRID: ON' : 'TOGGLE 8PT GRID'}</span>
          </button>
        </div>
        <span className="font-semibold text-[#11100E]">
          Luxury is what you leave out, not what you pile on.
        </span>
      </div>
    </div>
  );
};
