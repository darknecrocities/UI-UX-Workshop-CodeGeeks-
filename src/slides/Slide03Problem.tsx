import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { AlertTriangle, Sparkles, Check, Zap } from 'lucide-react';

export const Slide03Problem: React.FC = () => {
  const [selectedSymptom, setSelectedSymptom] = useState<string>('TOO_GLOWY');
  const [cureActive, setCureActive] = useState<boolean>(false);

  const symptoms = [
    {
      id: 'TOO_MUCH',
      title: 'TOO MUCH',
      tagline: 'Decorative bloat',
      preview: '6 useless metrics, 14 floating badges, 3 status pills nobody asked for.',
    },
    {
      id: 'TOO_ROUND',
      title: 'TOO ROUND',
      tagline: 'Excessive pill shapes',
      preview: 'Cards rounded like lozenges (40px) that destroy content hierarchy.',
    },
    {
      id: 'TOO_GLOWY',
      title: 'TOO GLOWY',
      tagline: 'Neon purple blurs',
      preview: 'Heavy purple and cyan Gaussian blurs masking poor visual structure.',
    },
    {
      id: 'TOO_GENERIC',
      title: 'TOO GENERIC',
      tagline: '"Unlock the Future"',
      preview: 'Placeholder marketing copy that could belong to 10,000 SaaS apps.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <span className="font-mono text-xs uppercase tracking-widest text-[#DC2626] font-semibold flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          03 / The Problem
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playSwitch(!cureActive);
              setCureActive((prev) => !prev);
            }}
            className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              cureActive
                ? 'bg-[#16A34A] text-white shadow-sm'
                : 'bg-[#11100E] text-[#F5F1E8] hover:bg-[#11100E]/90'
            }`}
          >
            {cureActive ? <Check className="w-3 h-3" /> : <Zap className="w-3 h-3 text-[#F59E0B]" />}
            <span>{cureActive ? 'CLEAN RESTRAINT ACTIVE' : 'CURE WITH TASTE'}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="my-auto py-2 space-y-4">
        <div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#11100E] leading-tight">
            AI MADE BUILDING FASTER.
            <br />
            <span className="text-[#DC2626]">IT DIDN'T MAKE DESIGN BETTER.</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#77736B] max-w-xl font-medium">
            AI Slop: Code that compiles, but lacks human taste. Click symptoms below to inspect live specimen:
          </p>
        </div>

        {/* 4 Interactive Compact Squircle Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {symptoms.map((s) => {
            const isSelected = selectedSymptom === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  sound.playSlopAlert();
                  setSelectedSymptom(s.id);
                  setCureActive(false);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected && !cureActive
                    ? 'bg-[#DC2626] text-white border-[#DC2626] shadow-md scale-102 ring-2 ring-[#DC2626]/30'
                    : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#DC2626]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold ${isSelected && !cureActive ? 'text-white' : 'text-[#DC2626]'}`}>
                    ⚠ {s.title}
                  </span>
                </div>
                <div className={`text-[11px] mt-1.5 font-mono ${isSelected && !cureActive ? 'text-white/80' : 'text-[#77736B]'}`}>
                  {s.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Specimen Sandbox */}
        <div className="p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 relative overflow-hidden transition-all min-h-[170px] flex flex-col justify-between">
          {/* Subtle background grain / glow indicator */}
          {!cureActive && selectedSymptom === 'TOO_GLOWY' && (
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
          )}

          <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#77736B]">
              SPECIMEN DIAGNOSTIC: {cureActive ? 'CLEAN & INTENTIONAL' : symptoms.find((s) => s.id === selectedSymptom)?.title}
            </span>
            <span
              className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                cureActive
                  ? 'bg-[#16A34A]/15 text-[#16A34A] border border-[#16A34A]/30'
                  : 'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20'
              }`}
            >
              {cureActive ? 'ZERO SLOP: VERIFIED' : 'DETECTED: COMMON AI DEFECT'}
            </span>
          </div>

          {/* Interactive Dynamic Component Specimen */}
          <div className="py-3">
            {cureActive ? (
              // Clean Cured State
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-[#11100E]/15 shadow-xs">
                <div>
                  <div className="font-mono text-[11px] text-[#77736B] uppercase tracking-wider">01 / Intentional Component</div>
                  <div className="text-base font-bold text-[#11100E] mt-0.5">Export Dataset (CSV / JSON)</div>
                  <div className="text-xs text-[#77736B] mt-0.5">Quiet typography, clear action, single primary button.</div>
                </div>
                <button
                  onClick={() => sound.playSuccess()}
                  className="px-4 py-2 rounded-lg bg-[#11100E] text-[#F5F1E8] font-mono text-xs font-bold cursor-pointer hover:bg-black transition-colors self-start sm:self-center"
                >
                  Download 14.2 MB
                </button>
              </div>
            ) : (
              // Slop Symptoms States
              <div
                className={`p-4 transition-all ${
                  selectedSymptom === 'TOO_ROUND'
                    ? 'rounded-[36px] bg-white border-2 border-purple-300 shadow-xl'
                    : selectedSymptom === 'TOO_GLOWY'
                    ? 'rounded-xl bg-gradient-to-r from-purple-900/10 via-indigo-900/10 to-pink-900/10 border border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.35)]'
                    : 'rounded-xl bg-white border border-[#11100E]/15 shadow-xs'
                }`}
              >
                {selectedSymptom === 'TOO_MUCH' && (
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {['⚡ AI REVOLUTION', '🔥 ULTRA', '✨ SYNERGY', 'PRO v4.9', 'TURBO', 'BETA'].map((badge) => (
                        <span key={badge} className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-xs">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm font-black text-[#11100E]">6 Floating Badges Fighting for Attention</div>
                    <div className="text-[11px] text-[#77736B] mt-0.5">When everything screams, nothing is heard.</div>
                  </div>
                )}

                {selectedSymptom === 'TOO_ROUND' && (
                  <div className="text-center py-1">
                    <span className="text-xs font-bold text-purple-700 bg-purple-100 px-4 py-1.5 rounded-full inline-block">
                      Extreme 36px Lozenge Pill Card
                    </span>
                    <p className="text-[11px] text-[#77736B] mt-1">Corners eat 35% of interior usable reading surface.</p>
                  </div>
                )}

                {selectedSymptom === 'TOO_GLOWY' && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-purple-950 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
                        Neon Purple Glow & Gaussian Blur
                      </div>
                      <div className="text-[11px] text-purple-900/80 mt-0.5">Hiding lack of typography contrast behind glowing blobs.</div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-[10px] font-bold shadow-lg shadow-purple-500/50">
                      AI MAGIC
                    </span>
                  </div>
                )}

                {selectedSymptom === 'TOO_GENERIC' && (
                  <div>
                    <div className="text-base font-black text-[#11100E]">
                      "Supercharge Your Workflow With The Power Of Autonomous Intelligence."
                    </div>
                    <div className="text-[11px] text-[#77736B] mt-1">
                      What does this product actually do? Nobody knows. It sounds like 10,000 other apps.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-[11px] font-mono text-[#77736B] flex items-center justify-between border-t border-[#11100E]/10 pt-2">
            <span>{symptoms.find((s) => s.id === selectedSymptom)?.preview}</span>
            <span className="font-bold text-[#11100E] underline cursor-pointer" onClick={() => setCureActive(!cureActive)}>
              {cureActive ? 'View Slop Defect' : 'Apply Taste Fix →'}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>When anyone can generate UI in seconds, taste is your only moat.</span>
        <span>03 / 25</span>
      </div>
    </div>
  );
};
