import React, { useState } from 'react';
import { sound } from '../audio/sound';
import {
  Scale,
  CheckCircle2,
  XCircle,
  Zap,
  Search,
  ArrowRight,
} from 'lucide-react';

type Mode = 'tokens' | 'adhoc';
type RadiusToken = '0px' | '6px' | '12px' | '24px';
type DensityToken = 'compact' | 'standard' | 'relaxed';
type ThemeToken = 'ink' | 'parchment' | 'charcoal' | 'minimal';

export const Slide12Scalability: React.FC = () => {
  const [mode, setMode] = useState<Mode>('tokens');
  const [radius, setRadius] = useState<RadiusToken>('12px');
  const [density, setDensity] = useState<DensityToken>('standard');
  const [theme, setTheme] = useState<ThemeToken>('ink');
  const [rebrandFlash, setRebrandFlash] = useState<boolean>(false);

  const themeColors: Record<ThemeToken, { primary: string; accent: string; bg: string; text: string; label: string }> = {
    ink: { primary: '#11100E', accent: '#77736B', bg: '#F5F1E8', text: '#FFFFFF', label: 'Ink & Warm Canvas' },
    parchment: { primary: '#1C1A18', accent: '#D8D3C8', bg: '#E9E1D3', text: '#FFFFFF', label: 'Parchment Tonal' },
    charcoal: { primary: '#181614', accent: '#77736B', bg: '#EFEAE0', text: '#FAF7F2', label: 'Deep Charcoal' },
    minimal: { primary: '#000000', accent: '#11100E', bg: '#FFFFFF', text: '#FFFFFF', label: 'High-Contrast Monochrome' },
  };

  const densityPadding: Record<DensityToken, { pad: string; gap: string; text: string }> = {
    compact: { pad: '8px 12px', gap: '8px', text: 'text-[11px]' },
    standard: { pad: '12px 16px', gap: '12px', text: 'text-xs' },
    relaxed: { pad: '16px 20px', gap: '16px', text: 'text-sm' },
  };

  const activeTheme = themeColors[theme];
  const activeDensity = densityPadding[density];

  const handleInstantRebrand = () => {
    sound.playSuccess();
    setRebrandFlash(true);
    const themes: ThemeToken[] = ['ink', 'parchment', 'charcoal', 'minimal'];
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
    setTimeout(() => setRebrandFlash(false), 1200);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-10 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            13 / Scalability · Design Tokens
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => { sound.playSwitch(true); setMode('tokens'); }}
            className={`px-3 py-1 rounded-lg border cursor-pointer font-bold flex items-center gap-1.5 transition-all ${
              mode === 'tokens'
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-sm ring-2 ring-[#11100E]/20'
                : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#11100E]" />
            <span>WITH DESIGN TOKENS</span>
          </button>
          <button
            onClick={() => { sound.playSlopAlert(); setMode('adhoc'); }}
            className={`px-3 py-1 rounded-lg border cursor-pointer font-bold flex items-center gap-1.5 transition-all ${
              mode === 'adhoc'
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-sm'
                : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20 hover:border-[#11100E]'
            }`}
          >
            <XCircle className="w-3.5 h-3.5 text-[#11100E]" />
            <span>AD-HOC CSS</span>
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#11100E]">
              GOOD DESIGN SURVIVES GROWTH.
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-[#77736B] font-medium">
              {mode === 'tokens'
                ? 'Design tokens are single sources of truth. Adjust tokens below — every component adapts in unison:'
                : 'Ad-hoc CSS hardcodes arbitrary values into every file. Changes create visual fractures and chaos:'}
            </p>
          </div>

          {mode === 'tokens' && (
            <button
              onClick={handleInstantRebrand}
              className="px-3.5 py-1.5 rounded-xl bg-[#11100E] text-[#F5F1E8] font-mono text-xs font-bold hover:bg-black cursor-pointer flex items-center gap-1.5 shrink-0 shadow-sm active:translate-y-0.5"
            >
              <Zap className="w-3.5 h-3.5 text-[#F5F1E8]" />
              <span>CYCLE SYSTEM THEME</span>
            </button>
          )}
        </div>

        {/* Live Token Controls Bar (when in tokens mode) */}
        {mode === 'tokens' ? (
          <div className="p-3 rounded-xl bg-[#F5F1E8] border border-[#11100E]/20 flex flex-wrap items-center justify-between gap-3 font-mono text-xs shadow-xs">
            {/* Radius Tokens */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#77736B] uppercase font-bold">RADIUS TOKEN:</span>
              {(['0px', '6px', '12px', '24px'] as RadiusToken[]).map((r) => (
                <button
                  key={r}
                  onClick={() => { sound.playClick(1.1); setRadius(r); }}
                  className={`px-2 py-0.5 rounded border text-[10px] cursor-pointer ${
                    radius === r
                      ? 'bg-[#11100E] text-white border-[#11100E] font-bold'
                      : 'bg-white text-[#11100E] border-[#11100E]/15'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Density Tokens */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#77736B] uppercase font-bold">SPACING DENSITY:</span>
              {(['compact', 'standard', 'relaxed'] as DensityToken[]).map((d) => (
                <button
                  key={d}
                  onClick={() => { sound.playClick(1.15); setDensity(d); }}
                  className={`px-2 py-0.5 rounded border text-[10px] capitalize cursor-pointer ${
                    density === d
                      ? 'bg-[#11100E] text-white border-[#11100E] font-bold'
                      : 'bg-white text-[#11100E] border-[#11100E]/15'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Current Active Theme indicator */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-[#77736B]">THEME:</span>
              <span className="font-bold text-[#11100E]">{activeTheme.label}</span>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#11100E]/20 font-mono text-xs text-[#11100E] flex items-center justify-between">
            <span className="font-bold">⚠ WARNING: AD-HOC VIBE CODING DETECTED</span>
            <span className="text-[11px] text-[#77736B]">6 components hardcoded across 6 files with random px values</span>
          </div>
        )}

        {/* Live Multi-Component Scalability Application Preview */}
        <div className="p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 shadow-sm min-h-[250px] flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2 font-mono text-xs">
            <span className="font-bold text-[#11100E]">
              {mode === 'tokens' ? 'DESIGN SYSTEM IN SYNC (6 COMPONENTS)' : 'MESSY UNCONNECTED PIECES'}
            </span>
            {rebrandFlash && (
              <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] text-[10px] font-bold animate-pulse">
                ✓ 6 COMPONENTS SYNCHRONIZED INSTANTLY
              </span>
            )}
          </div>

          {/* 6 Real Product Components */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-auto py-2 font-mono">
            {/* Component 1: Primary Action Button */}
            <div
              className="p-3 bg-white border flex flex-col justify-between gap-2 shadow-xs transition-all duration-200"
              style={{
                borderRadius: mode === 'tokens' ? radius : '9999px',
                borderColor: mode === 'tokens' ? '#11100E20' : '#11100E',
              }}
            >
              <div className="text-[10px] text-[#77736B] uppercase">01 / Primary Action</div>
              <button
                onClick={() => sound.playClick(1.2)}
                style={{
                  backgroundColor: mode === 'tokens' ? activeTheme.primary : '#11100E',
                  color: mode === 'tokens' ? activeTheme.text : '#fff',
                  borderRadius: mode === 'tokens' ? radius : '2px',
                  padding: mode === 'tokens' ? activeDensity.pad : '7px 11px',
                }}
                className="font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 active:translate-y-0.5"
              >
                <span>Save Changes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Component 2: Live Number Card */}
            <div
              className="p-3 bg-white border flex flex-col justify-between gap-1 shadow-xs transition-all duration-200"
              style={{
                borderRadius: mode === 'tokens' ? radius : '28px',
                borderColor: mode === 'tokens' ? '#11100E20' : '#77736B',
              }}
            >
              <div className="flex justify-between items-center text-[10px] text-[#77736B]">
                <span>02 / Live Number</span>
                <span className="font-bold" style={{ color: mode === 'tokens' ? activeTheme.primary : '#11100E' }}>
                  {mode === 'tokens' ? '● LIVE' : 'vibe metric'}
                </span>
              </div>
              <div className="text-xl font-bold text-[#11100E] tabular-nums">14.2 GB</div>
              <div className="text-[10px] text-[#77736B]">VRAM usage on Cluster-04</div>
            </div>

            {/* Component 3: Input Field */}
            <div
              className="p-3 bg-white border flex flex-col justify-between gap-1.5 shadow-xs transition-all duration-200"
              style={{
                borderRadius: mode === 'tokens' ? radius : '4px',
                borderColor: mode === 'tokens' ? '#11100E20' : '#181614',
              }}
            >
              <div className="text-[10px] text-[#77736B] uppercase">03 / Search Filter</div>
              <div
                className="flex items-center gap-2 border px-2 py-1 bg-white"
                style={{
                  borderRadius: mode === 'tokens' ? radius : '16px',
                  borderColor: mode === 'tokens' ? '#11100E20' : '#181614',
                }}
              >
                <Search className="w-3 h-3 text-[#77736B]" />
                <input
                  type="text"
                  placeholder="Filter logs..."
                  readOnly
                  value="status:active"
                  className="w-full text-xs font-mono outline-none text-[#11100E]"
                />
              </div>
            </div>

            {/* Component 4: Status Pill Badge */}
            <div
              className="p-3 bg-white border flex items-center justify-between shadow-xs transition-all duration-200"
              style={{
                borderRadius: mode === 'tokens' ? radius : '0px',
                borderColor: mode === 'tokens' ? '#11100E20' : '#2D2A26',
              }}
            >
              <div>
                <div className="text-[10px] text-[#77736B] uppercase">04 / Security Status</div>
                <div className="text-xs font-bold text-[#11100E] mt-0.5">TLS 1.3 Certified</div>
              </div>
              <span
                className="px-2 py-1 text-[10px] font-bold"
                style={{
                  backgroundColor: mode === 'tokens' ? `${activeTheme.primary}15` : '#E9E1D3',
                  color: mode === 'tokens' ? activeTheme.primary : '#11100E',
                  borderRadius: mode === 'tokens' ? radius : '30px',
                }}
              >
                VERIFIED
              </span>
            </div>

            {/* Component 5: User Identity Squircle */}
            <div
              className="p-3 bg-white border flex items-center gap-3 shadow-xs transition-all duration-200"
              style={{
                borderRadius: mode === 'tokens' ? radius : '36px',
                borderColor: mode === 'tokens' ? '#11100E20' : '#77736B',
              }}
            >
              <div
                className="w-8 h-8 flex items-center justify-center font-bold text-xs"
                style={{
                  backgroundColor: mode === 'tokens' ? activeTheme.primary : '#11100E',
                  color: mode === 'tokens' ? activeTheme.text : '#fff',
                  borderRadius: mode === 'tokens' ? radius : '50%',
                }}
              >
                AP
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-[#11100E] truncate">Arron Parejas</div>
                <div className="text-[10px] text-[#77736B]">Product Builder</div>
              </div>
            </div>

            {/* Component 6: Interactive Micro Toggle */}
            <div
              className="p-3 bg-white border flex items-center justify-between shadow-xs transition-all duration-200"
              style={{
                borderRadius: mode === 'tokens' ? radius : '12px',
                borderColor: mode === 'tokens' ? '#11100E20' : '#11100E',
              }}
            >
              <div>
                <div className="text-[10px] text-[#77736B] uppercase">06 / Mechanical Audio</div>
                <div className="text-xs font-bold text-[#11100E] mt-0.5">Click Sounds & Feedback</div>
              </div>
              <div
                className="w-10 h-5 p-0.5 flex items-center cursor-pointer transition-all"
                onClick={() => sound.playClick(1.2)}
                style={{
                  backgroundColor: mode === 'tokens' ? activeTheme.primary : '#11100E',
                  borderRadius: mode === 'tokens' ? radius : '9999px',
                }}
              >
                <div
                  className="w-4 h-4 bg-white shadow-xs transition-transform translate-x-5"
                  style={{ borderRadius: mode === 'tokens' ? (radius === '0px' ? '0px' : '4px') : '50%' }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Diagnostic */}
          <div className="pt-2 border-t border-[#11100E]/10 flex items-center justify-between font-mono text-[11px] text-[#77736B]">
            {mode === 'tokens' ? (
              <>
                <span className="text-[#11100E] font-bold">
                  ✓ Tokenized Harmony: Radius ({radius}), Density ({density}), Theme ({activeTheme.label})
                </span>
                <span>Change 1 CSS variable → 10,000 components update safely</span>
              </>
            ) : (
              <>
                <span className="text-[#77736B] font-bold">
                  ✗ Fragmented Debt: 6 different radii (9999px, 28px, 4px, 0px, 36px, 12px)
                </span>
                <span>Rebrand requires manual rewrite of 45+ separate files</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Design tokens make changes painless. Update once, fix everywhere.</span>
        <span>13 / 30</span>
      </div>
    </div>
  );
};
