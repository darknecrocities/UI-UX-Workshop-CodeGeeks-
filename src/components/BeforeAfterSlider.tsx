import React, { useState, useRef, useCallback } from 'react';
import { sound } from '../audio/sound';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0-100
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
    <div className="w-full h-full flex flex-col justify-between select-none">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerDrag}
        onPointerUp={handlePointerUp}
        className="relative flex-1 w-full rounded-xl overflow-hidden border border-[#11100E]/20 bg-[#F5F1E8] touch-none cursor-ew-resize shadow-md"
      >
        {/* Right side: AFTER (Premium / Restrained / Architectural) */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between bg-[#F5F1E8]">
          <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-3">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#77736B] uppercase">Premium System</span>
              <h4 className="text-base font-bold text-[#11100E] tracking-tight">Deploy Artifact v2.4</h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16A34A]/10 text-[#16A34A] font-semibold">
              ● PROD VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 my-auto">
            <div className="p-4 rounded-lg bg-[#E9E1D3]/70 border border-[#11100E]/10">
              <div className="text-[10px] font-mono text-[#77736B]">LATENCY</div>
              <div className="text-xl font-mono font-bold text-[#11100E] mt-1">14ms</div>
              <div className="text-[11px] text-[#77736B] mt-0.5">Optimized memory profile</div>
            </div>
            <div className="p-4 rounded-lg bg-[#E9E1D3]/70 border border-[#11100E]/10">
              <div className="text-[10px] font-mono text-[#77736B]">ACCURACY</div>
              <div className="text-xl font-mono font-bold text-[#11100E] mt-1">99.8%</div>
              <div className="text-[11px] text-[#77736B] mt-0.5">Verified deterministic test</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#11100E]/10">
            <span className="text-xs font-mono text-[#77736B]">Restrained spacing · Intentional hierarchy</span>
            <button className="px-4 py-1.5 rounded bg-[#11100E] text-[#F5F1E8] text-xs font-mono font-medium hover:bg-[#11100E]/90 transition-colors">
              Execute Action
            </button>
          </div>
        </div>

        {/* Left side: BEFORE (Cluttered / Unrefined generic) */}
        <div
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
          className="absolute inset-0 p-6 flex flex-col justify-between bg-[#E5E7EB] text-gray-800"
        >
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <div>
              <span className="text-[10px] text-gray-500 uppercase">Default Output</span>
              <h4 className="text-base font-bold text-gray-900">Card Item Box #1</h4>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-gray-300 text-gray-700 rounded">
              Active Status
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 my-auto">
            <div className="p-3 bg-white border border-gray-300 rounded shadow-xs">
              <div className="text-[10px] text-gray-400">SPEED STAT</div>
              <div className="text-lg font-bold text-gray-800">14ms</div>
              <div className="text-[10px] text-gray-500">Uncalibrated text dump</div>
            </div>
            <div className="p-3 bg-white border border-gray-300 rounded shadow-xs">
              <div className="text-[10px] text-gray-400">SCORE STAT</div>
              <div className="text-lg font-bold text-gray-800">99.8%</div>
              <div className="text-[10px] text-gray-500">Default generic font</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-300">
            <span className="text-xs text-gray-500">Unbalanced margins · Random padding</span>
            <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded">
              Submit Form
            </button>
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 w-0.5 bg-[#11100E] z-20 pointer-events-none"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#11100E] text-[#F5F1E8] flex items-center justify-center text-[10px] font-mono shadow-xl border-2 border-[#E9E1D3]">
            ⟷
          </div>
        </div>

        {/* Floating Labels */}
        <div className="absolute top-3 left-3 bg-[#11100E]/70 text-white font-mono text-[10px] px-2 py-0.5 rounded pointer-events-none z-10">
          RAW / GENERIC
        </div>
        <div className="absolute top-3 right-3 bg-[#11100E] text-white font-mono text-[10px] px-2 py-0.5 rounded pointer-events-none z-10">
          PREMIUM CRAFT
        </div>
      </div>

      {/* Bottom explanation */}
      <div className="mt-3 flex items-center justify-between text-xs font-mono text-[#77736B]">
        <span>Drag slider to compare decisions</span>
        <span className="font-semibold text-[#11100E]">Premium ≠ More Stuff. Premium = Better Decisions.</span>
      </div>
    </div>
  );
};
