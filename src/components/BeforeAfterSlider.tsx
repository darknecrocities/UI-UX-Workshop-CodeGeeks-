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

        {/* Right side: CRAFTED PREMIUM SYSTEM (Real Semantic Colors) */}
        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between bg-[#F5F1E8] font-mono text-xs">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="font-bold text-[#11100E] tracking-tight">Production Telemetry · Cluster EU-West</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#77736B]">8pt Grid Law</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                VERIFIED NOMINAL
              </span>
            </div>
          </div>

          {/* Metric Row with strict tabular numerals and 8px gaps */}
          <div className="grid grid-cols-3 gap-3 my-auto">
            <div className="p-3 rounded-xl bg-white border border-[#11100E]/15 shadow-xs transition-colors hover:border-blue-500/40">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#77736B]">P99 LATENCY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="text-xl font-bold text-[#11100E] tabular-nums mt-0.5">14.2ms</div>
              <div className="text-[10px] text-emerald-600 font-medium mt-0.5 flex items-center gap-0.5">
                <span>↓ −2.4ms</span>
                <span className="text-[#77736B]">(steady)</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#11100E]/15 shadow-xs transition-colors hover:border-blue-500/40">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#77736B]">THROUGHPUT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              </div>
              <div className="text-xl font-bold text-[#11100E] tabular-nums mt-0.5">84,920</div>
              <div className="text-[10px] text-blue-600 font-medium mt-0.5">req/sec (peak)</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#11100E]/15 shadow-xs transition-colors hover:border-blue-500/40">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#77736B]">AVAILABILITY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="text-xl font-bold text-[#11100E] tabular-nums mt-0.5">99.98%</div>
              <div className="text-[10px] text-emerald-600 font-medium mt-0.5">SLO Target Met</div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between pt-2.5 border-t border-[#11100E]/15">
            <div className="flex items-center gap-2 text-[11px] text-[#77736B]">
              <Command className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Press <strong className="text-[#11100E] bg-[#E9E1D3] px-1.5 py-0.5 rounded border border-[#11100E]/20">⌘K</strong> for command palette</span>
            </div>
            <button
              onClick={() => sound.playSuccess()}
              className="px-3.5 py-1.5 rounded-lg bg-[#11100E] text-[#F5F1E8] font-bold hover:bg-[#2563EB] transition-colors cursor-pointer flex items-center gap-1.5 active:translate-y-0.5 shadow-xs"
            >
              <span>Inspect Run</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Left side: AI SLOP DEFAULT (Real Gaudy Colors: Rainbow gradient, neon glow, uncalibrated pills) */}
        <div
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
          className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between font-sans text-white overflow-hidden"
        >
          {/* Background mesh glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] via-[#DB2777] to-[#F59E0B] opacity-95" />
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-cyan-400/40 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-pink-500/40 rounded-full blur-2xl" />

          {/* Slop Header with excessive badges */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/25 pb-2.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
              <span className="font-extrabold text-sm text-white tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                ✨ ULTRA AI CLOUD PRO
              </span>
            </div>
            <div className="flex gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-[9px] shadow-[0_0_12px_rgba(244,63,94,0.8)] animate-pulse">
                TURBO v4
              </span>
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-[9px] shadow-[0_0_10px_rgba(251,191,36,0.6)]">
                VIP
              </span>
            </div>
          </div>

          {/* Slop Metrics: arbitrary paddings, rounded pills, glowing borders */}
          <div className="relative z-10 grid grid-cols-3 gap-2 my-auto">
            <div className="p-[14px] rounded-[26px] bg-white/20 backdrop-blur-md border-2 border-pink-400/60 shadow-[0_0_16px_rgba(236,72,153,0.35)] text-center">
              <div className="text-[9px] font-bold text-pink-200">SPEED BOOST</div>
              <div className="text-xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">14.2ms</div>
              <div className="text-[8px] text-pink-200">Arbitrary margins</div>
            </div>
            <div className="p-[8px] mt-2 rounded-[26px] bg-white/20 backdrop-blur-md border-2 border-yellow-300/60 shadow-[0_0_16px_rgba(251,191,36,0.35)] text-center">
              <div className="text-[9px] font-bold text-yellow-200">SUPER COUNT</div>
              <div className="text-xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">84920</div>
              <div className="text-[8px] text-yellow-200">Uncalibrated fonts</div>
            </div>
            <div className="p-[20px] rounded-[26px] bg-white/20 backdrop-blur-md border-2 border-cyan-300/60 shadow-[0_0_16px_rgba(6,182,212,0.35)] text-center">
              <div className="text-[9px] font-bold text-cyan-200">HYPER STAT</div>
              <div className="text-xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">99.98%</div>
              <div className="text-[8px] text-cyan-200">Glow on everything</div>
            </div>
          </div>

          {/* Slop Footer */}
          <div className="relative z-10 flex items-center justify-between pt-2.5 border-t border-white/25">
            <span className="text-[10px] text-pink-100 font-semibold drop-shadow">
              30px pill radius · Neon overdrive
            </span>
            <button className="px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 text-black font-black text-xs shadow-[0_0_18px_rgba(236,72,153,0.7)] hover:scale-105 transition-transform cursor-pointer">
              Upgrade To VIP ⚡
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
