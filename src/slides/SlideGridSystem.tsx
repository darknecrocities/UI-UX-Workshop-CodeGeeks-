import React, { useState } from 'react';
import { sound } from '../audio/sound';
import {
  LayoutGrid,
  Eye,
  EyeOff,
  Briefcase,
  BookOpen,
  Layers,
  ShoppingBag,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

type LayoutPreset = 'EQUAL' | 'SPLIT' | 'DASHBOARD' | 'MODULAR' | 'HERO';

interface PresetOption {
  id: LayoutPreset;
  label: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface WireframeBoxProps {
  label: string;
  tag?: string;
  span: number;
  totalCols: number;
  startCol: number;
  gutter: number;
  variant?: 'primary' | 'secondary' | 'dark';
  compact?: boolean;
}

const WireframeBox: React.FC<WireframeBoxProps> = ({
  label,
  tag,
  span,
  totalCols,
  startCol,
  gutter,
  variant = 'primary',
  compact = false,
}) => {
  const percent = Math.round((span / totalCols) * 100);
  const endCol = startCol + span - 1;

  return (
    <div
      className={`relative rounded-xl border p-2 sm:p-3 flex flex-col justify-between transition-all duration-200 shadow-2xs overflow-hidden group ${
        variant === 'dark'
          ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
          : variant === 'secondary'
          ? 'bg-[#FAF7F2] text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
          : 'bg-white text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
      }`}
      style={{
        gridColumn: `span ${span}`,
      }}
    >
      {/* Top Header: Box Title + Span Pill */}
      <div
        className="flex items-center justify-between gap-1 border-b pb-1.5 font-mono text-[10px] sm:text-xs"
        style={{
          borderColor: variant === 'dark' ? 'rgba(245, 241, 232, 0.12)' : 'rgba(17, 16, 14, 0.1)',
        }}
      >
        <div className="flex items-center gap-1 min-w-0">
          <span className="font-bold uppercase tracking-wider truncate">{label}</span>
          {tag && !compact && span > 1 && (
            <span
              className={`text-[8px] px-1 py-0.2 rounded font-bold uppercase shrink-0 ${
                variant === 'dark' ? 'bg-white/15 text-white' : 'bg-[#11100E]/10 text-[#77736B]'
              }`}
            >
              {tag}
            </span>
          )}
        </div>
        <span
          className={`font-mono font-bold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded border shrink-0 ${
            variant === 'dark'
              ? 'bg-white/10 border-white/20 text-[#F59E0B]'
              : 'bg-[#F5F1E8] border-[#11100E]/15 text-[#B45309]'
          }`}
        >
          {span > 1
            ? `SPAN ${span} / ${totalCols}`
            : totalCols <= 4
            ? `SPAN 1 / ${totalCols}`
            : `${span} COL`}
        </span>
      </div>

      {/* Middle: Architectural Blueprint / Wireframe Placeholder (NO CONTENT) */}
      <div className="my-1.5 flex-1 flex flex-col justify-center gap-1 min-h-[44px]">
        {/* Metric & Column Range */}
        <div className="flex items-baseline justify-between font-mono">
          <span className="text-base sm:text-lg md:text-xl font-black tabular-nums tracking-tight">
            {percent}%
          </span>
          <span
            className={`text-[9px] font-bold ${
              variant === 'dark' ? 'text-[#E9E1D3]/70' : 'text-[#77736B]'
            }`}
          >
            {startCol === endCol ? (compact ? '' : `COL ${startCol}`) : `C${startCol}–${endCol}`}
          </span>
        </div>

        {/* Minimalist Wireframe Skeleton Lines (NO CONTENT) */}
        <div className="w-full space-y-1 my-0.5">
          <div
            className={`h-1.5 rounded-full ${
              variant === 'dark' ? 'bg-white/20' : 'bg-[#11100E]/15'
            }`}
            style={{ width: `${Math.max(25, Math.min(100, span * 20))}%` }}
          />
          {span >= 3 && !compact && (
            <div
              className={`h-1 rounded-full ${
                variant === 'dark' ? 'bg-white/10' : 'bg-[#11100E]/8'
              }`}
              style={{ width: '80%' }}
            />
          )}
        </div>

        {/* Column Division Ticks: Shows the underlying grid columns inside this box */}
        {span > 1 && (
          <div
            className="grid h-3.5 w-full rounded border overflow-hidden mt-0.5"
            style={{
              gridTemplateColumns: `repeat(${span}, minmax(0, 1fr))`,
              borderColor: variant === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(17,16,14,0.12)',
              gap: '1px',
              backgroundColor:
                variant === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(17,16,14,0.06)',
            }}
            title={`${span} columns covered by this box`}
          >
            {Array.from({ length: span }).map((_, i) => (
              <div
                key={i}
                className={`flex items-center justify-center font-mono text-[7px] font-bold ${
                  variant === 'dark'
                    ? 'bg-[#1E1C1A] text-[#E9E1D3]/70'
                    : 'bg-[#F5F1E8] text-[#77736B]'
                }`}
              >
                {startCol + i}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Footer: Column Span Units & Active Gutter */}
      <div
        className="flex items-center justify-between text-[9px] font-mono pt-1 border-t"
        style={{
          borderColor: variant === 'dark' ? 'rgba(245, 241, 232, 0.12)' : 'rgba(17, 16, 14, 0.1)',
          color: variant === 'dark' ? '#E9E1D3' : '#77736B',
        }}
      >
        <span>{span} {span === 1 ? 'Col' : 'Cols'}</span>
        <span>Gap {gutter}px</span>
      </div>
    </div>
  );
};

export const SlideGridSystem: React.FC = () => {
  const [activePreset, setActivePreset] = useState<LayoutPreset>('EQUAL');
  const [cols, setCols] = useState<number>(12);
  const [gutter, setGutter] = useState<number>(16);
  const [showColumns, setShowColumns] = useState<boolean>(true);
  const [show8pt, setShow8pt] = useState<boolean>(false);
  const [isUnaligned, setIsUnaligned] = useState<boolean>(false);

  const presets: PresetOption[] = [
    {
      id: 'EQUAL',
      label: '1:1 Columns',
      category: 'Rhythm',
      icon: LayoutGrid,
      description: '1 box per column — direct visual 1-to-1 reflection of grid count',
    },
    {
      id: 'SPLIT',
      label: 'Split 2:1',
      category: 'Asymmetric',
      icon: BookOpen,
      description: 'Major reading column (67%) paired with aside index (33%)',
    },
    {
      id: 'DASHBOARD',
      label: 'Dashboard',
      category: 'App Shell',
      icon: Briefcase,
      description: 'Sidebar nav (25%), main canvas (50%), and utility inspector (25%)',
    },
    {
      id: 'MODULAR',
      label: 'Modular Grid',
      category: 'Cards',
      icon: ShoppingBag,
      description: 'Hierarchical multi-box layout testing card gutters and alignment',
    },
    {
      id: 'HERO',
      label: 'Hero + Shelf',
      category: 'Showcase',
      icon: Layers,
      description: 'Full-width banner spanning all columns over balanced sub-blocks',
    },
  ];

  const spacingTokens = [
    { name: '4px', label: 'Micro', use: 'Icon gaps, badge padding', px: 4 },
    { name: '8px', label: 'Compact', use: 'Input interior padding, card gap', px: 8 },
    { name: '16px', label: 'Standard', use: 'Container padding, element margins', px: 16 },
    { name: '24px', label: 'Comfortable', use: 'Section padding, grid gutters', px: 24 },
    { name: '32px', label: 'Spacious', use: 'Card separations, hero padding', px: 32 },
    { name: '48px', label: 'Monumental', use: 'Page margins, major breaks', px: 48 },
  ];

  const handleSelectPreset = (preset: PresetOption) => {
    sound.playClick(1.2);
    setActivePreset(preset.id);
  };

  const handleSetCols = (c: number) => {
    const nextCols = Math.max(2, Math.min(16, c));
    if (nextCols !== cols) {
      sound.playClick(0.85 + (nextCols / 16) * 0.4);
      setCols(nextCols);
    }
  };

  // Helper calculations for dynamic layout box spans
  const getSplitSpans = () => {
    const major = Math.max(1, Math.round(cols * 0.67));
    const minor = Math.max(1, cols - major);
    return { major, minor };
  };

  const getDashboardSpans = () => {
    if (cols <= 2) {
      return { nav: 1, main: 1, rail: 0 };
    }
    if (cols === 3) {
      return { nav: 1, main: 1, rail: 1 };
    }
    const nav = Math.max(1, Math.floor(cols * 0.25));
    const main = Math.max(1, Math.round(cols * 0.5));
    const rail = Math.max(1, cols - nav - main);
    return { nav, main, rail };
  };

  const getModularSpans = () => {
    const r1Left = Math.floor(cols / 2);
    const r1Right = cols - r1Left;

    if (cols < 4) {
      return {
        r1Left,
        r1Right,
        row2: [{ label: 'CARD 01', span: 1, startCol: 1 }, { label: 'CARD 02', span: cols - 1, startCol: 2 }],
      };
    }

    const c1 = Math.floor(cols / 3);
    const c2 = Math.floor(cols / 3);
    const c3 = cols - c1 - c2;
    return {
      r1Left,
      r1Right,
      row2: [
        { label: 'CARD 01', span: c1, startCol: 1 },
        { label: 'CARD 02', span: c2, startCol: c1 + 1 },
        { label: 'CARD 03', span: c3, startCol: c1 + c2 + 1 },
      ],
    };
  };

  const getHeroSpans = () => {
    if (cols <= 2) {
      return {
        hero: cols,
        subs: [
          { label: 'SHELF 01', span: 1, startCol: 1 },
          { label: 'SHELF 02', span: 1, startCol: 2 },
        ],
      };
    }
    const s1 = Math.floor(cols / 3);
    const s2 = Math.floor(cols / 3);
    const s3 = cols - s1 - s2;
    return {
      hero: cols,
      subs: [
        { label: 'SHELF 01', span: s1, startCol: 1 },
        { label: 'SHELF 02', span: s2, startCol: s1 + 1 },
        { label: 'SHELF 03', span: s3, startCol: s1 + s2 + 1 },
      ],
    };
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-7 md:p-8 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            13 / Layout & Clean Grid Systems
          </span>
        </div>

        {/* Global Grid Controls: Draggable Progress Toggle Bar */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Draggable Column Progress Bar */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white border border-[#11100E]/20 px-3 py-1.5 rounded-xl shadow-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#11100E] min-w-[68px]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B45309]" />
              <span className="tabular-nums">{cols} COLS</span>
            </div>

            {/* Draggable Range / Progress Track */}
            <div className="relative flex items-center w-28 sm:w-44 md:w-56">
              <input
                type="range"
                min="2"
                max="16"
                step="1"
                value={cols}
                onChange={(e) => handleSetCols(Number(e.target.value))}
                className="grid-progress-slider w-full"
                style={{
                  background: `linear-gradient(to right, #11100E 0%, #11100E ${
                    ((cols - 2) / 14) * 100
                  }%, #E5E0D6 ${((cols - 2) / 14) * 100}%, #E5E0D6 100%)`,
                }}
                aria-label="Drag to adjust grid columns"
                title={`Columns: ${cols}`}
              />
            </div>

            {/* Breakpoint Hint */}
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#F5F1E8] border border-[#11100E]/10 text-[10px] font-bold text-[#77736B] uppercase">
              {cols <= 4 ? 'Mobile' : cols <= 8 ? 'Tablet' : cols <= 12 ? 'Desktop' : 'Wide'}
            </span>
          </div>

          {/* Quick Preset Column Chips */}
          <div className="hidden lg:flex items-center gap-1 bg-white border border-[#11100E]/20 px-1.5 py-1 rounded-xl shadow-xs">
            {[2, 4, 8, 12, 16].map((c) => (
              <button
                key={c}
                onClick={() => handleSetCols(c)}
                className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                  cols === c
                    ? 'bg-[#11100E] text-[#F5F1E8]'
                    : 'text-[#77736B] hover:text-[#11100E] hover:bg-[#F5F1E8]'
                }`}
                title={`Set ${c} columns`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid Guides Toggle */}
          <button
            onClick={() => {
              sound.playClick(1.2);
              setShowColumns(!showColumns);
            }}
            className={`px-2.5 py-1.5 rounded-xl border cursor-pointer font-bold flex items-center gap-1.5 text-[11px] shadow-xs transition-colors ${
              showColumns
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
                : 'bg-white text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
            }`}
            title="Toggle column guides overlay"
          >
            {showColumns ? (
              <Eye className="w-3.5 h-3.5 text-[#F59E0B]" />
            ) : (
              <EyeOff className="w-3.5 h-3.5 text-[#77736B]" />
            )}
            <span>{showColumns ? 'GRID: ON' : 'GRID: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-2.5">
        {/* Title & Layout Preset Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#11100E]">
              LAYOUT PRESETS & 8PX GRID.
            </h2>
            <p className="text-xs text-[#77736B] font-medium mt-0.5">
              Select a pure wireframe layout style to test column rhythm, spans, and gutters without content clutter:
            </p>
          </div>

          {/* Wireframe Layout Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {presets.map((p) => {
              const Icon = p.icon;
              const isSelected = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer font-bold ${
                    isSelected
                      ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-sm -translate-y-0.5'
                      : 'bg-white text-[#11100E] border-[#11100E]/15 hover:border-[#F59E0B] hover:bg-[#F5F1E8]'
                  }`}
                  title={p.description}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F59E0B]' : 'text-[#77736B]'}`}
                  />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Spacing Tokens Reference Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 font-mono text-xs">
          {spacingTokens.map((t) => (
            <div
              key={t.name}
              onClick={() => {
                if (t.px === 8 || t.px === 16 || t.px === 24) {
                  sound.playClick(1.1);
                  setGutter(t.px);
                }
              }}
              className={`p-1.5 px-2 rounded-xl bg-white border transition-all ${
                gutter === t.px
                  ? 'border-[#11100E] shadow-xs bg-[#FAF7F2]'
                  : 'border-[#11100E]/10'
              } flex flex-col justify-between cursor-pointer`}
              title={`${t.name} spacing token — click to test gutter`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-[#11100E]">{t.name}</span>
                <span className="text-[9px] text-[#77736B] uppercase font-semibold">{t.label}</span>
              </div>
              <div className="text-[9px] text-[#77736B] truncate mt-0.5">{t.use}</div>
            </div>
          ))}
        </div>

        {/* Interactive Responsive Grid Stage: Pure Wireframe Boxes (NO CONTENT) */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#EFEAE0] border border-[#11100E]/15 shadow-inner min-h-[300px] h-[330px] sm:h-[350px] flex flex-col justify-between overflow-hidden">
          {/* Main Stage: Underlay Grid Tracks + Dynamic Wireframe Boxes */}
          <div className="relative flex-1 min-h-[220px] flex items-stretch my-0.5">
            {/* Background Column Grid (Guaranteed Pixel-Perfect Alignment) */}
            <div
              className="absolute inset-0 pointer-events-none z-10 grid"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gap: isUnaligned ? '13px' : `${gutter}px`,
                padding: isUnaligned ? '11px' : '0px',
              }}
            >
              {Array.from({ length: cols }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-full flex flex-col justify-between items-center py-1.5 rounded-sm transition-colors ${
                    showColumns
                      ? 'bg-[#F59E0B]/12 border-x border-[#F59E0B]/30'
                      : 'bg-[#11100E]/[0.02] border-x border-[#11100E]/[0.06]'
                  }`}
                >
                  <span
                    className={`font-mono text-[9px] font-bold ${
                      showColumns ? 'text-[#B45309]' : 'text-[#77736B]/50'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-mono text-[8px] uppercase tracking-tighter ${
                      showColumns ? 'text-[#B45309]/80' : 'text-[#77736B]/30'
                    }`}
                  >
                    COL
                  </span>
                </div>
              ))}
            </div>

            {/* 8pt Dots Matrix Overlay */}
            {show8pt && (
              <div className="absolute inset-0 bg-grid-subtle opacity-75 pointer-events-none z-15" />
            )}

            {/* Wireframe Layout Box Container: Adapts Dynamically & Reflects Cleanly */}
            <div
              className={`relative z-20 flex-1 grid items-stretch font-mono text-xs transition-all duration-200 ${
                activePreset === 'MODULAR' || activePreset === 'HERO' ? 'grid-rows-2' : ''
              } ${isUnaligned ? 'p-[11px] gap-[13px] translate-x-2' : ''}`}
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gap: isUnaligned ? '13px' : `${gutter}px`,
              }}
            >
              {/* PRESET 1: 1:1 COLUMNS (Every column is an individual box) */}
              {activePreset === 'EQUAL' &&
                Array.from({ length: cols }).map((_, idx) => (
                  <WireframeBox
                    key={idx}
                    label={cols <= 6 ? `COL ${String(idx + 1).padStart(2, '0')}` : `C${String(idx + 1).padStart(2, '0')}`}
                    span={1}
                    totalCols={cols}
                    startCol={idx + 1}
                    gutter={gutter}
                    variant={idx % 2 === 0 ? 'primary' : 'secondary'}
                    compact={cols > 6}
                  />
                ))}

              {/* PRESET 2: SPLIT 2:1 (Major reading column + aside) */}
              {activePreset === 'SPLIT' && (
                <>
                  <WireframeBox
                    label="BOX A"
                    tag="PRIMARY"
                    span={getSplitSpans().major}
                    totalCols={cols}
                    startCol={1}
                    gutter={gutter}
                    variant="primary"
                  />
                  <WireframeBox
                    label="BOX B"
                    tag="ASIDE"
                    span={getSplitSpans().minor}
                    totalCols={cols}
                    startCol={getSplitSpans().major + 1}
                    gutter={gutter}
                    variant="secondary"
                  />
                </>
              )}

              {/* PRESET 3: DASHBOARD (Nav + Main Canvas + Inspector) */}
              {activePreset === 'DASHBOARD' && (
                <>
                  <WireframeBox
                    label="NAV"
                    tag="SIDEBAR"
                    span={getDashboardSpans().nav}
                    totalCols={cols}
                    startCol={1}
                    gutter={gutter}
                    variant="secondary"
                  />
                  <WireframeBox
                    label="MAIN"
                    tag="CANVAS"
                    span={getDashboardSpans().main}
                    totalCols={cols}
                    startCol={getDashboardSpans().nav + 1}
                    gutter={gutter}
                    variant="primary"
                  />
                  {getDashboardSpans().rail > 0 && (
                    <WireframeBox
                      label="INSPECTOR"
                      tag="RAIL"
                      span={getDashboardSpans().rail}
                      totalCols={cols}
                      startCol={getDashboardSpans().nav + getDashboardSpans().main + 1}
                      gutter={gutter}
                      variant="secondary"
                    />
                  )}
                </>
              )}

              {/* PRESET 4: MODULAR GRID (Multi-row wireframe card rhythm) */}
              {activePreset === 'MODULAR' && (
                <>
                  {/* Row 1 */}
                  <WireframeBox
                    label="HERO A"
                    tag="ROW 1"
                    span={getModularSpans().r1Left}
                    totalCols={cols}
                    startCol={1}
                    gutter={gutter}
                    variant="primary"
                    compact
                  />
                  <WireframeBox
                    label="HERO B"
                    tag="ROW 1"
                    span={getModularSpans().r1Right}
                    totalCols={cols}
                    startCol={getModularSpans().r1Left + 1}
                    gutter={gutter}
                    variant="dark"
                    compact
                  />

                  {/* Row 2 */}
                  {getModularSpans().row2.map((c, i) => (
                    <WireframeBox
                      key={c.label}
                      label={c.label}
                      tag="ROW 2"
                      span={c.span}
                      totalCols={cols}
                      startCol={c.startCol}
                      gutter={gutter}
                      variant={i % 2 === 0 ? 'secondary' : 'primary'}
                      compact
                    />
                  ))}
                </>
              )}

              {/* PRESET 5: HERO + SHELF (Full-width banner + sub-blocks) */}
              {activePreset === 'HERO' && (
                <>
                  {/* Row 1: Full-width Hero Banner */}
                  <WireframeBox
                    label="BANNER"
                    tag="FULL SPAN"
                    span={getHeroSpans().hero}
                    totalCols={cols}
                    startCol={1}
                    gutter={gutter}
                    variant="dark"
                    compact
                  />

                  {/* Row 2: Shelf Sub-Cards */}
                  {getHeroSpans().subs.map((s, i) => (
                    <WireframeBox
                      key={s.label}
                      label={s.label}
                      tag="SHELF"
                      span={s.span}
                      totalCols={cols}
                      startCol={s.startCol}
                      gutter={gutter}
                      variant={i % 2 === 0 ? 'primary' : 'secondary'}
                      compact
                    />
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Bottom Live Status Bar */}
          <div className="relative z-20 pt-2 border-t border-[#11100E]/10 flex flex-wrap items-center justify-between font-mono text-[11px] text-[#77736B] gap-2">
            <div className="flex items-center gap-3">
              <span>
                Active System: <strong className="text-[#11100E]">{cols} Columns</strong>
              </span>

              {/* Gutter Selector */}
              <div className="flex items-center gap-1 bg-white border border-[#11100E]/20 px-1.5 py-0.5 rounded-lg text-[10px]">
                <span className="text-[#77736B]">Gutter:</span>
                {[8, 16, 24].map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      sound.playClick(1.05);
                      setGutter(g);
                    }}
                    className={`px-1 py-0.5 rounded cursor-pointer transition-colors ${
                      gutter === g
                        ? 'bg-[#11100E] text-[#F5F1E8] font-bold'
                        : 'text-[#77736B] hover:text-[#11100E]'
                    }`}
                  >
                    {g}px
                  </button>
                ))}
              </div>

              {/* 8pt Dots Matrix Toggle */}
              <button
                onClick={() => {
                  sound.playClick(1.05);
                  setShow8pt(!show8pt);
                }}
                className="underline cursor-pointer text-[#11100E] hover:text-[#B45309]"
              >
                {show8pt ? 'Hide 8pt Dots' : 'Overlay 8pt Matrix'}
              </button>
            </div>

            {/* Subtle Alignment Mode Switch */}
            <button
              onClick={() => {
                if (!isUnaligned) sound.playSlopAlert();
                else sound.playSuccess();
                setIsUnaligned(!isUnaligned);
              }}
              className={`px-2 py-0.5 rounded border text-[10px] font-bold cursor-pointer flex items-center gap-1 transition-all ${
                isUnaligned
                  ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
                  : 'bg-white text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
              }`}
            >
              {isUnaligned ? (
                <AlertTriangle className="w-3 h-3 text-[#F59E0B]" />
              ) : (
                <CheckCircle2 className="w-3 h-3 text-[#B45309]" />
              )}
              <span>
                {isUnaligned ? 'TESTING: UNALIGNED RANDOM PADDING' : 'LOCKED TO 8PT SYSTEM'}
              </span>
            </button>
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
