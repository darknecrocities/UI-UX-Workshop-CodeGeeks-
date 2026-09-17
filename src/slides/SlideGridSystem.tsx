import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { LayoutGrid, CheckCircle2, AlertTriangle, Monitor, Tablet, Smartphone, Eye, EyeOff } from 'lucide-react';

type Breakpoint = 'DESKTOP' | 'TABLET' | 'MOBILE';

export const SlideGridSystem: React.FC = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('DESKTOP');
  const [showColumns, setShowColumns] = useState<boolean>(true);
  const [show8pt, setShow8pt] = useState<boolean>(false);
  const [isUnaligned, setIsUnaligned] = useState<boolean>(false);

  const columnCounts: Record<Breakpoint, number> = {
    DESKTOP: 12,
    TABLET: 8,
    MOBILE: 4,
  };

  const currentCols = columnCounts[breakpoint];

  const spatialTokens = [
    { name: '4px', label: 'Micro', use: 'Icon gaps, badge padding' },
    { name: '8px', label: 'Compact', use: 'Input interior padding, card gap' },
    { name: '16px', label: 'Standard', use: 'Container padding, element margins' },
    { name: '24px', label: 'Comfortable', use: 'Section padding, grid gutters' },
    { name: '32px', label: 'Spacious', use: 'Card separations, hero padding' },
    { name: '48px', label: 'Monumental', use: 'Page margins, major layout breaks' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-10 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            13 / Layout Architecture & Spatial Matrix
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Breakpoint Switcher */}
          <div className="flex items-center gap-1 bg-white border border-[#11100E]/20 p-0.5 rounded-lg">
            <button
              onClick={() => { sound.playClick(1.0); setBreakpoint('MOBILE'); }}
              className={`px-2 py-1 rounded flex items-center gap-1 cursor-pointer ${
                breakpoint === 'MOBILE' ? 'bg-[#11100E] text-white font-bold' : 'text-[#77736B] hover:text-[#11100E]'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>4 COLS</span>
            </button>
            <button
              onClick={() => { sound.playClick(1.1); setBreakpoint('TABLET'); }}
              className={`px-2 py-1 rounded flex items-center gap-1 cursor-pointer ${
                breakpoint === 'TABLET' ? 'bg-[#11100E] text-white font-bold' : 'text-[#77736B] hover:text-[#11100E]'
              }`}
            >
              <Tablet className="w-3 h-3" />
              <span>8 COLS</span>
            </button>
            <button
              onClick={() => { sound.playClick(1.2); setBreakpoint('DESKTOP'); }}
              className={`px-2 py-1 rounded flex items-center gap-1 cursor-pointer ${
                breakpoint === 'DESKTOP' ? 'bg-[#11100E] text-white font-bold' : 'text-[#77736B] hover:text-[#11100E]'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>12 COLS</span>
            </button>
          </div>

          {/* Grid Overlay Toggle */}
          <button
            onClick={() => { sound.playClick(1.2); setShowColumns(!showColumns); }}
            className={`px-2.5 py-1 rounded-lg border cursor-pointer font-bold flex items-center gap-1 ${
              showColumns
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
                : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20'
            }`}
          >
            {showColumns ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showColumns ? 'GRID: ON' : 'GRID: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#11100E]">
              THE 12-COLUMN & 8PT SPATIAL MATRIX.
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-[#77736B] font-medium">
              Every clean interface has an invisible mathematical skeleton. Never place pixels by eye:
            </p>
          </div>

          {/* Unaligned / Aligned Mode Switch */}
          <button
            onClick={() => {
              if (!isUnaligned) sound.playSlopAlert();
              else sound.playSuccess();
              setIsUnaligned(!isUnaligned);
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border cursor-pointer flex items-center gap-1.5 transition-all shadow-xs ${
              isUnaligned
                ? 'bg-[#DC2626] text-white border-[#DC2626]'
                : 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30 hover:bg-[#16A34A]/20'
            }`}
          >
            {isUnaligned ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            <span>{isUnaligned ? 'SLOP: UNALIGNED (RANDOM PADDING)' : 'ALIGNED TO 8PT SYSTEM'}</span>
          </button>
        </div>

        {/* 6 Spatial Tokens Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 font-mono text-xs">
          {spatialTokens.map((t) => (
            <div
              key={t.name}
              className="p-2 rounded-xl bg-[#F5F1E8] border border-[#11100E]/15 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-[#11100E]">{t.name}</span>
                <span className="text-[10px] text-[#77736B] uppercase">{t.label}</span>
              </div>
              <div className="text-[9px] text-[#77736B] mt-1 truncate">{t.use}</div>
            </div>
          ))}
        </div>

        {/* Interactive Responsive Grid Stage */}
        <div className="relative p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 shadow-sm min-h-[230px] flex flex-col justify-between overflow-hidden">
          {/* Column Grid Overlay */}
          {showColumns && (
            <div className="absolute inset-0 px-5 py-4 pointer-events-none z-10 flex gap-2">
              {Array.from({ length: currentCols }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 h-full bg-red-500/10 border-x border-red-500/20 flex flex-col justify-between items-center py-1"
                >
                  <span className="font-mono text-[8px] text-red-700/60">{idx + 1}</span>
                  <span className="font-mono text-[8px] text-red-700/40">COL</span>
                </div>
              ))}
            </div>
          )}

          {/* 8pt Pattern Overlay */}
          {show8pt && (
            <div className="absolute inset-0 bg-grid-subtle opacity-70 pointer-events-none z-15" />
          )}

          {/* Mock Multi-Column Layout Built Over Grid */}
          <div
            className={`relative z-20 flex-1 grid gap-3 my-auto items-stretch font-mono text-xs transition-all duration-300 ${
              isUnaligned ? 'translate-x-3 -translate-y-1' : ''
            }`}
            style={{
              gridTemplateColumns:
                breakpoint === 'DESKTOP'
                  ? 'repeat(12, minmax(0, 1fr))'
                  : breakpoint === 'TABLET'
                  ? 'repeat(8, minmax(0, 1fr))'
                  : 'repeat(4, minmax(0, 1fr))',
            }}
          >
            {/* Sidebar / Navigation (3 cols on desktop, 2 on tablet, full on mobile) */}
            <div
              className={`bg-white border rounded-xl p-3 flex flex-col justify-between shadow-xs ${
                breakpoint === 'DESKTOP'
                  ? 'col-span-3'
                  : breakpoint === 'TABLET'
                  ? 'col-span-2'
                  : 'col-span-4'
              } ${isUnaligned ? 'border-red-400 p-[11px] rounded-tl-[27px]' : 'border-[#11100E]/15'}`}
            >
              <div>
                <div className="text-[10px] text-[#77736B] uppercase font-bold">
                  {isUnaligned ? 'Broken Pad (11px)' : '3 Cols · Navigation'}
                </div>
                <div className="text-sm font-bold text-[#11100E] mt-1">Antigravity Console</div>
              </div>
              <div className="space-y-1 mt-2 text-[10px] text-[#77736B]">
                <div className="p-1.5 bg-[#E9E1D3]/50 rounded">Terminal Session</div>
                <div className="p-1.5 rounded">Artifact Pipeline</div>
              </div>
            </div>

            {/* Main Center Dashboard (6 cols on desktop, 4 on tablet, full on mobile) */}
            <div
              className={`bg-white border rounded-xl p-3 flex flex-col justify-between shadow-xs ${
                breakpoint === 'DESKTOP'
                  ? 'col-span-6'
                  : breakpoint === 'TABLET'
                  ? 'col-span-4'
                  : 'col-span-4'
              } ${isUnaligned ? 'border-red-400 p-[7px] mt-[13px]' : 'border-[#11100E]/15'}`}
            >
              <div className="flex justify-between items-center border-b border-[#11100E]/10 pb-2">
                <span className="font-bold text-xs text-[#11100E]">
                  {isUnaligned ? 'Unaligned Margin (mt 13px)' : '6 Cols · Operational Workbench'}
                </span>
                <span className="text-[10px] text-[#16A34A] font-bold">8PT ALIGNED</span>
              </div>
              <div className="grid grid-cols-2 gap-2 my-2">
                <div className="p-2 rounded bg-[#F5F1E8] border border-[#11100E]/10">
                  <div className="text-[9px] text-[#77736B]">LATENCY</div>
                  <div className="text-base font-bold text-[#11100E] tabular-nums">4ms</div>
                </div>
                <div className="p-2 rounded bg-[#F5F1E8] border border-[#11100E]/10">
                  <div className="text-[9px] text-[#77736B]">ACCURACY</div>
                  <div className="text-base font-bold text-[#16A34A] tabular-nums">99.98%</div>
                </div>
              </div>
              <div className="text-[10px] text-[#77736B]">All gutters strictly locked to 16px.</div>
            </div>

            {/* Telemetry Right Panel (3 cols on desktop, 2 on tablet, full on mobile) */}
            <div
              className={`bg-white border rounded-xl p-3 flex flex-col justify-between shadow-xs ${
                breakpoint === 'DESKTOP'
                  ? 'col-span-3'
                  : breakpoint === 'TABLET'
                  ? 'col-span-2'
                  : 'col-span-4'
              } ${isUnaligned ? 'border-red-400 p-[23px] rounded-br-[35px]' : 'border-[#11100E]/15'}`}
            >
              <div>
                <div className="text-[10px] text-[#77736B] uppercase font-bold">
                  {isUnaligned ? 'Lozenge Corner (35px)' : '3 Cols · Telemetry'}
                </div>
                <div className="text-xs font-bold text-[#11100E] mt-1">Worker Pool A</div>
              </div>
              <div className="mt-2 text-base font-bold text-[#16A34A] tabular-nums">14 / 14 ACTIVE</div>
              <button
                onClick={() => sound.playSuccess()}
                className="mt-2 w-full py-1.5 bg-[#11100E] text-[#F5F1E8] text-[10px] font-bold rounded-lg hover:bg-black cursor-pointer active:translate-y-0.5"
              >
                Inspect Telemetry
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-20 pt-2 border-t border-[#11100E]/10 flex items-center justify-between font-mono text-[11px] text-[#77736B]">
            <div className="flex items-center gap-3">
              <span>Current Grid: <strong className="text-[#11100E]">{currentCols} Columns</strong></span>
              <button
                onClick={() => { sound.playClick(1.05); setShow8pt(!show8pt); }}
                className="underline cursor-pointer text-[#11100E]"
              >
                {show8pt ? 'Hide 8pt Dots' : 'Overlay 8pt Matrix Dots'}
              </button>
            </div>
            <span className="font-semibold text-[#11100E]">
              Odd paddings (13px, 17px) cause subpixel blur on Retina screens.
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Standardize the grid once; eliminate 90% of layout debates forever.</span>
        <span>13 / 26</span>
      </div>
    </div>
  );
};
