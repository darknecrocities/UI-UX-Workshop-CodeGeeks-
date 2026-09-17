import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Scale, CheckCircle2, XCircle, Sliders, Zap } from 'lucide-react';

type Scenario = 'tokens' | 'adhoc';

export const Slide12Scalability: React.FC = () => {
  const [componentCount, setComponentCount] = useState<number>(6);
  const [scenario, setScenario] = useState<Scenario>('tokens');
  const [rebrandTriggered, setRebrandTriggered] = useState<boolean>(false);

  const tokensComponents = Array.from({ length: componentCount }, (_, i) => ({
    id: i + 1,
    label: `MODULE #${i + 1}`,
    color: '#F5F1E8',
    border: '#11100E',
    padding: '16px',
    radius: '12px',
  }));

  const adhocComponents = Array.from({ length: componentCount }, (_, i) => ({
    id: i + 1,
    label: `card_item_${i + 1}`,
    color: i % 3 === 0 ? '#DC2626' : i % 3 === 1 ? '#8B5CF6' : '#F59E0B',
    border: i % 2 === 0 ? '#DC2626' : '#8B5CF6',
    padding: `${11 + (i % 5) * 3}px`,
    radius: i % 2 === 0 ? '8px' : '24px',
  }));

  const handleRebrand = () => {
    sound.playSuccess();
    setRebrandTriggered(true);
    setTimeout(() => setRebrandTriggered(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            12 / System Scalability
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">RULES THAT SURVIVE GROWTH</h2>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#11100E]">
              GOOD DESIGN SURVIVES GROWTH.
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#77736B] font-medium">
              Design tokens = one change updates everything. Ad-hoc CSS = every component breaks differently:
            </p>
          </div>

          <div className="flex flex-col gap-2 font-mono text-xs shrink-0">
            <button
              onClick={() => { sound.playSwitch(true); setScenario('tokens'); }}
              className={`px-3 py-1.5 rounded-xl border cursor-pointer font-bold flex items-center gap-1.5 transition-all ${
                scenario === 'tokens'
                  ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-md'
                  : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
              With Design Tokens
            </button>
            <button
              onClick={() => { sound.playSlopAlert(); setScenario('adhoc'); }}
              className={`px-3 py-1.5 rounded-xl border cursor-pointer font-bold flex items-center gap-1.5 transition-all ${
                scenario === 'adhoc'
                  ? 'bg-[#DC2626] text-white border-[#DC2626] shadow-md'
                  : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20'
              }`}
            >
              <XCircle className="w-3.5 h-3.5 text-[#DC2626]" />
              Ad-Hoc CSS (Slop)
            </button>
          </div>
        </div>

        {/* Live Scaling Simulation Playground */}
        <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 space-y-3">
          <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2.5 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#11100E]" />
              <span className="font-bold">SCALE: {componentCount} COMPONENTS</span>
              {scenario === 'tokens' && rebrandTriggered && (
                <span className="px-2 py-0.5 rounded bg-[#16A34A] text-white text-[10px] font-bold animate-pulse">
                  ✓ REBRANDED IN 1 CHANGE
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="2"
                max="12"
                value={componentCount}
                onChange={(e) => {
                  sound.playClick(0.9);
                  setComponentCount(Number(e.target.value));
                }}
                className="w-28 accent-[#11100E] cursor-pointer"
              />
              {scenario === 'tokens' && (
                <button
                  onClick={handleRebrand}
                  className="px-3 py-1 rounded-lg bg-[#11100E] text-[#F5F1E8] font-bold cursor-pointer hover:bg-black transition-colors flex items-center gap-1"
                >
                  <Zap className="w-3 h-3 text-[#F59E0B]" />
                  Rebrand All
                </button>
              )}
            </div>
          </div>

          {/* Rendered Component Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-[180px] overflow-y-auto p-1 font-mono text-xs">
            {(scenario === 'tokens' ? tokensComponents : adhocComponents).map((c) => (
              <div
                key={c.id}
                onClick={() => sound.playClick(1.1)}
                style={{
                  background: scenario === 'adhoc' ? `${c.color}15` : rebrandTriggered ? '#E9E1D3' : '#fff',
                  borderColor: scenario === 'adhoc' ? c.color : rebrandTriggered ? '#F59E0B' : '#11100E',
                  padding: scenario === 'adhoc' ? c.padding : '12px',
                  borderRadius: scenario === 'adhoc' ? c.radius : '12px',
                  borderWidth: '1px',
                  borderStyle: scenario === 'adhoc' ? (c.id % 2 === 0 ? 'dashed' : 'dotted') : 'solid',
                }}
                className="flex flex-col gap-0.5 cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-[9px] font-bold" style={{ color: scenario === 'adhoc' ? c.color : '#77736B' }}>
                  {scenario === 'tokens' ? `MOD.${c.id}` : c.label.substring(0, 10)}
                </div>
                <div className="text-[10px] font-semibold text-[#11100E]">
                  {scenario === 'tokens'
                    ? rebrandTriggered ? 'amber-50 / 4px' : '8px Grid'
                    : `pad: ${c.padding}`}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Bar */}
          <div className="flex items-center justify-between font-mono text-[10px] text-[#77736B] border-t border-[#11100E]/10 pt-2">
            {scenario === 'tokens' ? (
              <>
                <span className="text-[#16A34A] font-bold">✓ Consistent: 8px grid, uniform radius, single color source</span>
                <span>Click "Rebrand All" → all {componentCount} update instantly</span>
              </>
            ) : (
              <>
                <span className="text-[#DC2626] font-bold">✗ Chaotic: {componentCount} components × {componentCount} different padding values</span>
                <span>Rebrand = manually edit {componentCount} files</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>A design system is insurance. You pay upfront; it saves you every sprint.</span>
        <span>12 / 25</span>
      </div>
    </div>
  );
};
