import React, { useState } from 'react';
import { sound } from '../audio/sound';
import {
  LayoutGrid,
  Eye,
  EyeOff,
  Briefcase,
  CalendarDays,
  ShoppingBag,
  BookOpen,
  Layers,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

type LayoutPreset = 'BUSINESS' | 'EVENTS' | 'STORE' | 'EDITORIAL' | 'SHOWCASE';

interface PresetOption {
  id: LayoutPreset;
  label: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultCols: number;
  description: string;
}

export const SlideGridSystem: React.FC = () => {
  const [activePreset, setActivePreset] = useState<LayoutPreset>('BUSINESS');
  const [cols, setCols] = useState<number>(12);
  const [gutter, setGutter] = useState<number>(16);
  const [showColumns, setShowColumns] = useState<boolean>(true);
  const [show8pt, setShow8pt] = useState<boolean>(false);
  const [isUnaligned, setIsUnaligned] = useState<boolean>(false);

  const presets: PresetOption[] = [
    {
      id: 'BUSINESS',
      label: 'Business',
      category: 'Dashboard',
      icon: Briefcase,
      defaultCols: 12,
      description: 'Sidebar navigation, metrics summary, and live activity stream',
    },
    {
      id: 'EVENTS',
      label: 'Events',
      category: 'Conference',
      icon: CalendarDays,
      defaultCols: 12,
      description: 'Hero announcement, registration card, and 4-slot agenda',
    },
    {
      id: 'STORE',
      label: 'Store',
      category: 'Marketplace',
      icon: ShoppingBag,
      defaultCols: 12,
      description: 'Category filters with a balanced 3-column product catalog',
    },
    {
      id: 'EDITORIAL',
      label: 'Editorial',
      category: 'Article',
      icon: BookOpen,
      defaultCols: 12,
      description: 'Long-form reading column paired with side index and notes',
    },
    {
      id: 'SHOWCASE',
      label: 'Showcase',
      category: 'Agency',
      icon: Layers,
      defaultCols: 12,
      description: 'Asymmetric feature display with project notes and live link',
    },
  ];

  const spacingTokens = [
    { name: '4px', label: 'Micro', use: 'Icon gaps, badge padding' },
    { name: '8px', label: 'Compact', use: 'Input interior padding, card gap' },
    { name: '16px', label: 'Standard', use: 'Container padding, element margins' },
    { name: '24px', label: 'Comfortable', use: 'Section padding, grid gutters' },
    { name: '32px', label: 'Spacious', use: 'Card separations, hero padding' },
    { name: '48px', label: 'Monumental', use: 'Page margins, major layout breaks' },
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

  // Helper column spans based on current cols count
  const getColSpan = (ratio: number) => {
    return Math.max(1, Math.round(cols * ratio));
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
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#11100E] min-w-[66px]">
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
                  background: `linear-gradient(to right, #11100E 0%, #11100E ${((cols - 2) / 14) * 100}%, #E5E0D6 ${((cols - 2) / 14) * 100}%, #E5E0D6 100%)`
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
            {showColumns ? <Eye className="w-3.5 h-3.5 text-[#F59E0B]" /> : <EyeOff className="w-3.5 h-3.5 text-[#77736B]" />}
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
              Select a real-world layout style to test column rhythm and spacing fit:
            </p>
          </div>

          {/* Real-World Layout Buttons (Button-like style for best fit) */}
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
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F59E0B]' : 'text-[#77736B]'}`} />
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
              className="p-1.5 px-2 rounded-xl bg-white border border-[#11100E]/10 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-[#11100E]">{t.name}</span>
                <span className="text-[9px] text-[#77736B] uppercase font-semibold">{t.label}</span>
              </div>
              <div className="text-[9px] text-[#77736B] truncate mt-0.5">{t.use}</div>
            </div>
          ))}
        </div>

        {/* Interactive Responsive Grid Stage (Strictly Theme Colors) */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#EFEAE0] border border-[#11100E]/15 shadow-inner min-h-[280px] max-h-[380px] flex flex-col justify-between overflow-hidden">
          {/* Cards & Overlay Stage */}
          <div className="relative flex-1 min-h-[220px] flex items-stretch my-0.5">
            {/* Column Grid Overlay in Theme Amber */}
            {showColumns && (
              <div
                className="absolute inset-0 pointer-events-none z-10 flex"
                style={{ gap: `${gutter}px` }}
              >
                {Array.from({ length: cols }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex-1 h-full bg-[#F59E0B]/10 border-x border-[#F59E0B]/25 flex flex-col justify-between items-center py-1 rounded-2xs"
                  >
                    <span className="font-mono text-[9px] font-bold text-[#B45309]">{idx + 1}</span>
                    <span className="font-mono text-[8px] text-[#B45309]/60">COL</span>
                  </div>
                ))}
              </div>
            )}

            {/* 8pt Dots Matrix Overlay */}
            {show8pt && (
              <div className="absolute inset-0 bg-grid-subtle opacity-75 pointer-events-none z-15" />
            )}

            {/* Mock Layout Containers (Dynamically Responsive to cols and preset) */}
            <div
              className={`relative z-20 flex-1 grid my-auto items-stretch font-mono text-xs transition-all duration-300 ${
                isUnaligned ? 'p-[11px] gap-[13px] translate-x-2' : ''
              }`}
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gap: isUnaligned ? '13px' : `${gutter}px`,
              }}
            >
            {/* BUSINESS PRESET */}
            {activePreset === 'BUSINESS' && (
              <>
                {/* Sidebar Navigation */}
                <div
                  className="bg-white border border-[#11100E]/15 rounded-xl p-3 flex flex-col justify-between shadow-xs"
                  style={{ gridColumn: `span ${Math.min(cols, Math.max(1, getColSpan(0.25)))}` }}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#77736B] font-bold uppercase mb-1">
                      <span>Console Nav</span>
                      <span className="text-[#B45309]">SPAN {Math.min(cols, Math.max(1, getColSpan(0.25)))}</span>
                    </div>
                    <div className="font-bold text-xs text-[#11100E]">Acme Workspace</div>
                  </div>
                  <div className="space-y-1 my-2 text-[10px] text-[#77736B]">
                    <div className="p-1.5 bg-[#F5F1E8] rounded font-semibold text-[#11100E]">Dashboard Home</div>
                    <div className="p-1.5 rounded">Deployments (14)</div>
                    <div className="p-1.5 rounded">Security Keys</div>
                  </div>
                  <div className="pt-2 border-t border-[#11100E]/10 text-[9px] text-[#77736B]">
                    Strict 8px margins
                  </div>
                </div>

                {/* Main Dashboard & Metrics */}
                <div
                  className="bg-white border border-[#11100E]/15 rounded-xl p-3.5 flex flex-col justify-between shadow-xs"
                  style={{ gridColumn: `span ${Math.min(cols, Math.max(1, getColSpan(0.5)))}` }}
                >
                  <div className="flex justify-between items-center border-b border-[#11100E]/10 pb-2">
                    <div>
                      <span className="font-bold text-xs text-[#11100E]">Revenue & Flow Performance</span>
                      <div className="text-[10px] text-[#77736B]">Live metrics locked to 16px gutter</div>
                    </div>
                    <span className="font-mono text-[10px] text-[#B45309] font-bold">
                      SPAN {Math.min(cols, Math.max(1, getColSpan(0.5)))}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-2">
                    <div className="p-2.5 rounded-lg bg-[#F5F1E8] border border-[#11100E]/10">
                      <div className="text-[9px] text-[#77736B] uppercase font-bold">Monthly Recurring</div>
                      <div className="text-base font-black text-[#11100E] mt-0.5 tabular-nums">$34,800</div>
                      <div className="text-[9px] text-[#16A34A] font-bold mt-0.5">+18.4% this month</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F5F1E8] border border-[#11100E]/10">
                      <div className="text-[9px] text-[#77736B] uppercase font-bold">Active Seats</div>
                      <div className="text-base font-black text-[#11100E] mt-0.5 tabular-nums">1,420 / 1,500</div>
                      <div className="text-[9px] text-[#77736B] mt-0.5">99.8% retention</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#77736B]">
                    <span>Standardized container padding (16px)</span>
                    <span className="font-bold text-[#11100E]">100% 8pt Aligned</span>
                  </div>
                </div>

                {/* Live Activity & Action */}
                <div
                  className="bg-white border border-[#11100E]/15 rounded-xl p-3 flex flex-col justify-between shadow-xs"
                  style={{
                    gridColumn: `span ${Math.min(
                      cols,
                      Math.max(1, cols - getColSpan(0.25) - getColSpan(0.5))
                    )}`,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#77736B] font-bold uppercase mb-1">
                      <span>Actions</span>
                      <span className="text-[#B45309]">
                        SPAN {Math.min(cols, Math.max(1, cols - getColSpan(0.25) - getColSpan(0.5)))}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-[#11100E]">Quick Actions</div>
                  </div>

                  <div className="space-y-1.5 my-2 text-[10px]">
                    <div className="p-2 rounded bg-[#F5F1E8] text-[#11100E]">
                      <div className="font-bold text-[10px]">Cluster Sync: OK</div>
                      <div className="text-[9px] text-[#77736B]">All nodes responding</div>
                    </div>
                  </div>

                  <button
                    onClick={() => sound.playClick(1.2)}
                    className="w-full py-1.5 rounded-lg bg-[#11100E] hover:bg-black text-[#F5F1E8] font-mono text-[10px] font-bold cursor-pointer transition-colors"
                  >
                    Deploy Update
                  </button>
                </div>
              </>
            )}

            {/* EVENTS PRESET */}
            {activePreset === 'EVENTS' && (
              <>
                {/* Event Hero Banner */}
                <div
                  className="bg-[#11100E] text-[#F5F1E8] rounded-xl p-4 flex flex-col justify-between shadow-sm"
                  style={{ gridColumn: `span ${Math.min(cols, Math.max(1, getColSpan(0.67)))}` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] text-[#F59E0B] font-mono uppercase font-bold tracking-wider">
                        ANNUAL KEYNOTE · OCT 24, 2026
                      </div>
                      <h3 className="text-base sm:text-lg font-black tracking-tight text-white mt-1">
                        CodeGeeks Summit: Craft & Judgment
                      </h3>
                      <p className="text-[11px] text-[#E9E1D3]/80 mt-1 max-w-md">
                        Grand Arena Hall · 1,500 Designers and Builders exploring human-centered UI/UX.
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-[#F59E0B] font-bold shrink-0">
                      SPAN {Math.min(cols, Math.max(1, getColSpan(0.67)))}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-[#E9E1D3]/70 pt-2 border-t border-white/10 mt-3">
                    <span>Keynote: Arron Parejas</span>
                    <span>•</span>
                    <span>12 Live Interactive Workshops</span>
                  </div>
                </div>

                {/* Ticket Pass Card */}
                <div
                  className="bg-white border border-[#11100E]/15 rounded-xl p-4 flex flex-col justify-between shadow-xs"
                  style={{ gridColumn: `span ${Math.min(cols, Math.max(1, cols - getColSpan(0.67)))}` }}
                >
                  <div className="flex items-center justify-between text-[10px] text-[#77736B] font-bold uppercase">
                    <span>Admission</span>
                    <span className="text-[#B45309]">SPAN {Math.min(cols, Math.max(1, cols - getColSpan(0.67)))}</span>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-[#11100E] mt-1">Full-Access Pass</div>
                    <div className="text-xl font-black text-[#11100E] mt-0.5">$249</div>
                    <div className="text-[10px] text-[#77736B]">Badge, seating, and afterparty entry</div>
                  </div>

                  <button
                    onClick={() => sound.playClick(1.2)}
                    className="w-full py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#11100E] font-bold text-xs shadow-xs cursor-pointer transition-colors"
                  >
                    Claim Pass
                  </button>
                </div>

                {/* 4 Agenda Cards */}
                {['09:00 AM · Opening', '11:00 AM · UI/UX Lab', '02:00 PM · Agentic Flow', '04:30 PM · Showcase'].map(
                  (slot, i) => (
                    <div
                      key={slot}
                      className="bg-white border border-[#11100E]/15 rounded-xl p-2.5 flex flex-col justify-between shadow-xs"
                      style={{ gridColumn: `span ${Math.max(1, Math.floor(cols / 4))}` }}
                    >
                      <div className="text-[9px] text-[#B45309] font-bold uppercase">Track 0{i + 1}</div>
                      <div className="text-[11px] font-bold text-[#11100E] mt-0.5 truncate">{slot}</div>
                      <div className="text-[9px] text-[#77736B] mt-1">Hall A · 60m</div>
                    </div>
                  )
                )}
              </>
            )}

            {/* STORE PRESET */}
            {activePreset === 'STORE' && (
              <>
                {/* Category Sidebar */}
                <div
                  className="bg-white border border-[#11100E]/15 rounded-xl p-3 flex flex-col justify-between shadow-xs"
                  style={{ gridColumn: `span ${Math.min(cols, Math.max(1, getColSpan(0.25)))}` }}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#77736B] font-bold uppercase mb-1">
                      <span>Filters</span>
                      <span className="text-[#B45309]">SPAN {Math.min(cols, Math.max(1, getColSpan(0.25)))}</span>
                    </div>
                    <div className="font-bold text-xs text-[#11100E]">Categories</div>
                  </div>

                  <div className="space-y-1 my-2 text-[10px] text-[#77736B]">
                    <div className="p-1.5 bg-[#F5F1E8] font-bold text-[#11100E] rounded">All Hardware (48)</div>
                    <div className="p-1.5 rounded">Tactile Switches (16)</div>
                    <div className="p-1.5 rounded">Desk Mats (12)</div>
                    <div className="p-1.5 rounded">Keycaps (20)</div>
                  </div>

                  <div className="text-[9px] text-[#77736B] pt-2 border-t border-[#11100E]/10">
                    Filter by actuation weight
                  </div>
                </div>

                {/* 3 Store Product Cards */}
                {[
                  { title: 'Tactile Panda Switches', price: '$38.00', desc: '5-pin mechanical switch pack' },
                  { title: 'Minimal Felt Desk Mat', price: '$29.00', desc: '900×400mm waterproof wool' },
                  { title: 'Cream Carbon Keycaps', price: '$54.00', desc: 'PBT dye-sublimated set' },
                ].map((item, idx) => (
                  <div
                    key={item.title}
                    className="bg-white border border-[#11100E]/15 rounded-xl p-3.5 flex flex-col justify-between shadow-xs"
                    style={{
                      gridColumn: `span ${Math.max(
                        1,
                        Math.floor((cols - getColSpan(0.25)) / 3)
                      )}`,
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-[#B45309] font-bold">
                        <span>ITEM 0{idx + 1}</span>
                        <span>
                          SPAN {Math.max(1, Math.floor((cols - getColSpan(0.25)) / 3))}
                        </span>
                      </div>
                      <div className="font-bold text-xs text-[#11100E] mt-1">{item.title}</div>
                      <div className="text-[10px] text-[#77736B] mt-0.5">{item.desc}</div>
                    </div>

                    <div className="pt-3 mt-2 border-t border-[#11100E]/10 flex items-center justify-between">
                      <span className="font-black text-sm text-[#11100E]">{item.price}</span>
                      <button
                        onClick={() => sound.playClick(1.2)}
                        className="px-2.5 py-1 rounded-lg bg-[#11100E] hover:bg-black text-[#F5F1E8] text-[10px] font-bold cursor-pointer transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* EDITORIAL PRESET */}
            {activePreset === 'EDITORIAL' && (
              <>
                {/* Main Article Hero Column */}
                <div
                  className="bg-white border border-[#11100E]/15 rounded-xl p-4 flex flex-col justify-between shadow-xs"
                  style={{ gridColumn: `span ${Math.min(cols, Math.max(1, getColSpan(0.67)))}` }}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#77736B] font-bold uppercase mb-1">
                      <span>ESSAY · ISSUE #14</span>
                      <span className="text-[#B45309]">SPAN {Math.min(cols, Math.max(1, getColSpan(0.67)))}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-[#11100E]">
                      The Return of Human Taste in Software
                    </h3>
                    <p className="text-[11px] text-[#77736B] leading-relaxed mt-2">
                      When anyone can generate thousands of lines of code in seconds, the only differentiator left is
                      human restraint. Knowing what to delete, why spacing matters, and how a button feels under the
                      finger.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#11100E]/10 flex items-center justify-between text-[10px] text-[#77736B]">
                    <span>By Arron Parejas</span>
                    <span>8 Min Read · Aligned to 8pt Baseline</span>
                  </div>
                </div>

                {/* Side Table of Contents */}
                <div
                  className="bg-white border border-[#11100E]/15 rounded-xl p-4 flex flex-col justify-between shadow-xs"
                  style={{ gridColumn: `span ${Math.min(cols, Math.max(1, cols - getColSpan(0.67)))}` }}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#77736B] font-bold uppercase mb-1">
                      <span>Outline</span>
                      <span className="text-[#B45309]">SPAN {Math.min(cols, Math.max(1, cols - getColSpan(0.67)))}</span>
                    </div>
                    <div className="font-bold text-xs text-[#11100E]">In This Issue</div>
                  </div>

                  <div className="space-y-1.5 my-2 text-[10px] text-[#77736B]">
                    <div className="p-1 rounded font-semibold text-[#11100E]">I. The Illusion of Speed</div>
                    <div className="p-1 rounded">II. Grid as Architecture</div>
                    <div className="p-1 rounded">III. Tactile Sound Design</div>
                  </div>

                  <div className="text-[9px] text-[#77736B] pt-2 border-t border-[#11100E]/10">
                    Typography hierarchy without fluff
                  </div>
                </div>
              </>
            )}

            {/* SHOWCASE PRESET */}
            {activePreset === 'SHOWCASE' && (
              <>
                {/* Large Project Feature */}
                <div
                  className="bg-[#11100E] text-[#F5F1E8] rounded-xl p-4 flex flex-col justify-between shadow-sm"
                  style={{ gridColumn: `span ${Math.min(cols, Math.max(1, getColSpan(0.58)))}` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] text-[#F59E0B] font-mono uppercase font-bold tracking-wider">
                        FLAGSHIP WORK · 2026
                      </div>
                      <h3 className="text-base sm:text-lg font-black tracking-tight text-white mt-1">
                        DomoDomo: Tactile Web Utilities
                      </h3>
                      <p className="text-[11px] text-[#E9E1D3]/80 mt-1 max-w-sm">
                        230+ online tools built for speed and privacy. Designed without unnecessary clutter.
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-[#F59E0B] font-bold shrink-0">
                      SPAN {Math.min(cols, Math.max(1, getColSpan(0.58)))}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-[#E9E1D3]/70 mt-3">
                    <span>50K+ Monthly Users</span>
                    <a
                      href="https://domodomo.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F59E0B] hover:underline font-bold"
                    >
                      Visit domodomo.site ↗
                    </a>
                  </div>
                </div>

                {/* Studio Philosophy & Quote */}
                <div
                  className="bg-white border border-[#11100E]/15 rounded-xl p-4 flex flex-col justify-between shadow-xs"
                  style={{ gridColumn: `span ${Math.min(cols, Math.max(1, cols - getColSpan(0.58)))}` }}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#77736B] font-bold uppercase mb-1">
                      <span>Philosophy</span>
                      <span className="text-[#B45309]">SPAN {Math.min(cols, Math.max(1, cols - getColSpan(0.58)))}</span>
                    </div>
                    <div className="text-xs font-bold text-[#11100E] mt-1">Design Thesis</div>
                  </div>

                  <blockquote className="my-2 text-[11px] text-[#11100E] italic border-l-2 border-[#F59E0B] pl-2 font-serif">
                    “Software should feel like an instrument, not a transaction.”
                  </blockquote>

                  <div className="text-[10px] text-[#77736B] pt-2 border-t border-[#11100E]/10">
                    Asymmetric layout with clear visual hierarchy
                  </div>
                </div>
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

            {/* Subtle Alignment Mode Switch (Theme Colors Only) */}
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
              {isUnaligned ? <AlertTriangle className="w-3 h-3 text-[#F59E0B]" /> : <CheckCircle2 className="w-3 h-3 text-[#B45309]" />}
              <span>{isUnaligned ? 'TESTING: UNALIGNED RANDOM PADDING' : 'LOCKED TO 8PT SYSTEM'}</span>
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
