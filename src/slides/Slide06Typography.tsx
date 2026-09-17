import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Sliders, RotateCcw } from 'lucide-react';

export const Slide06Typography: React.FC = () => {
  const [headline, setHeadline] = useState<string>('MAKE THE SIMPLE THING FEEL OBVIOUS.');
  const [fontSize, setFontSize] = useState<number>(42);
  const [fontWeight, setFontWeight] = useState<number>(700);
  const [lineHeight, setLineHeight] = useState<number>(1.15);
  const [letterSpacing, setLetterSpacing] = useState<number>(-0.03);
  const [isMono, setIsMono] = useState<boolean>(false);

  const presets = [
    'MAKE THE SIMPLE THING FEEL OBVIOUS.',
    'AI CANNOT REPLACE TASTE.',
    'RADICAL RESTRAINT OVER NOISE.',
    'FROM SKETCH TO SHIP.',
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            06 / Typography Laboratory
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">TYPE IS INTERFACE</h2>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive Specimen Canvas & Live Input (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/15 min-h-[260px] flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#77736B] uppercase tracking-wider border-b border-[#11100E]/10 pb-2">
              <span>LIVE RENDERED SPECIMEN</span>
              <button
                onClick={() => {
                  sound.playSwitch(!isMono);
                  setIsMono((m) => !m);
                }}
                className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] cursor-pointer hover:bg-black font-bold"
              >
                {isMono ? 'FONT: IBM PLEX MONO' : 'FONT: INTER'}
              </button>
            </div>

            <div
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: fontWeight,
                lineHeight: lineHeight,
                letterSpacing: `${letterSpacing}em`,
                fontFamily: isMono ? 'IBM Plex Mono, monospace' : 'Inter, sans-serif',
              }}
              className="text-[#11100E] transition-all duration-100 my-auto py-4"
            >
              {headline}
            </div>

            <div className="flex items-center justify-between font-mono text-xs text-[#77736B] pt-3 border-t border-[#11100E]/10">
              <span>Scale: {fontSize}px / {fontWeight}w</span>
              <span>Leading: {lineHeight.toFixed(2)}</span>
            </div>
          </div>

          {/* Quick Preset Buttons & Custom Input */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Type your own headline to test..."
                className="flex-1 px-3 py-2 rounded-xl bg-[#F5F1E8] border border-[#11100E]/20 text-xs font-mono text-[#11100E] focus:outline-none focus:border-[#11100E]"
              />
              <button
                onClick={() => {
                  sound.playClick(0.9);
                  setHeadline('MAKE THE SIMPLE THING FEEL OBVIOUS.');
                  setFontSize(42);
                  setFontWeight(700);
                  setLineHeight(1.15);
                  setLetterSpacing(-0.03);
                  setIsMono(false);
                }}
                className="p-2 rounded-xl bg-[#F5F1E8] border border-[#11100E]/20 text-[#11100E] hover:bg-[#E9E1D3] cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              {presets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sound.playClick(1.2);
                    setHeadline(p);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#E9E1D3]/80 hover:bg-[#11100E] hover:text-[#F5F1E8] border border-[#11100E]/15 transition-all cursor-pointer truncate max-w-[200px]"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Tactile Metric Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-[#E9E1D3] border border-[#11100E]/20 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#11100E]/10">
              <span className="font-bold text-[#11100E]">METRIC CONTROLS</span>
              <span className="text-[10px] text-[#77736B]">MECHANICAL SLIDERS</span>
            </div>

            {/* Font Size Slider */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#77736B]">SIZE</span>
                <span className="font-bold text-[#11100E]">{fontSize}px</span>
              </div>
              <input
                type="range"
                min="24"
                max="68"
                value={fontSize}
                onChange={(e) => {
                  sound.playClick(0.95);
                  setFontSize(Number(e.target.value));
                }}
                className="w-full accent-[#11100E] cursor-pointer"
              />
            </div>

            {/* Font Weight Slider */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#77736B]">WEIGHT</span>
                <span className="font-bold text-[#11100E]">{fontWeight}</span>
              </div>
              <input
                type="range"
                min="300"
                max="900"
                step="100"
                value={fontWeight}
                onChange={(e) => {
                  sound.playClick(1.05);
                  setFontWeight(Number(e.target.value));
                }}
                className="w-full accent-[#11100E] cursor-pointer"
              />
            </div>

            {/* Line Height Slider */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#77736B]">LEADING (Line-height)</span>
                <span className="font-bold text-[#11100E]">{lineHeight.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.95"
                max="1.5"
                step="0.05"
                value={lineHeight}
                onChange={(e) => {
                  sound.playClick(1.1);
                  setLineHeight(Number(e.target.value));
                }}
                className="w-full accent-[#11100E] cursor-pointer"
              />
            </div>

            {/* Letter Spacing Slider */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#77736B]">TRACKING</span>
                <span className="font-bold text-[#11100E]">{letterSpacing.toFixed(2)}em</span>
              </div>
              <input
                type="range"
                min="-0.06"
                max="0.10"
                step="0.01"
                value={letterSpacing}
                onChange={(e) => {
                  sound.playClick(1.15);
                  setLetterSpacing(Number(e.target.value));
                }}
                className="w-full accent-[#11100E] cursor-pointer"
              />
            </div>
          </div>

          {/* Hierarchy Scale ladder */}
          <div className="p-3 rounded-xl bg-[#F5F1E8] border border-[#11100E]/15 flex justify-between text-[11px] text-[#77736B]">
            <span className="text-[#11100E] font-bold">Display</span>
            <span>Heading</span>
            <span>Body</span>
            <span>Caption</span>
            <span>Metadata</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Great typography communicates 80% of the UI without images.</span>
        <span>06 / 25</span>
      </div>
    </div>
  );
};
