import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { ShieldCheck } from 'lucide-react';

type AuditStatus = 'NEEDS WORK' | 'INTENTIONAL' | 'READY';

const questions = [
  'Does this solve the original user problem without friction?',
  'Is the visual hierarchy immediately obvious in under 2 seconds?',
  'Are all present buttons strictly necessary, or can some disappear?',
  'Is the typography intentional with a disciplined weight scale?',
  'Is the spacing consistent across all margins and padding?',
  'Does every animation communicate state rather than just look good?',
  'Is every color doing a functional semantic job?',
  'Would this layout still work cleanly across 100 screens?',
  'Does this design feel like something made with genuine care and taste?',
];

const statusOrder: AuditStatus[] = ['NEEDS WORK', 'INTENTIONAL', 'READY'];

const statusStyle: Record<AuditStatus, { bg: string; border: string; badge: string; label: string }> = {
  'READY': { bg: 'bg-[#16A34A]/8', border: 'border-[#16A34A]/30', badge: 'bg-[#16A34A] text-white', label: '✓ READY' },
  'INTENTIONAL': { bg: 'bg-[#F5F1E8]', border: 'border-[#11100E]/15', badge: 'bg-[#D97706] text-white', label: '~ INTENTIONAL' },
  'NEEDS WORK': { bg: 'bg-[#DC2626]/5', border: 'border-[#DC2626]/25', badge: 'bg-[#DC2626] text-white', label: '✗ NEEDS WORK' },
};

export const Slide23SlopAudit: React.FC = () => {
  const [statuses, setStatuses] = useState<AuditStatus[]>([
    'READY', 'READY', 'INTENTIONAL', 'READY', 'INTENTIONAL', 'READY', 'READY', 'INTENTIONAL', 'READY',
  ]);


  const cycleStatus = (index: number) => {
    const current = statuses[index];
    const next = statusOrder[(statusOrder.indexOf(current) + 1) % statusOrder.length];
    if (next === 'NEEDS WORK') sound.playSlopAlert();
    else if (next === 'READY') sound.playSuccess();
    else sound.playClick(1.1);
    setStatuses((prev) => { const n = [...prev]; n[index] = next; return n; });
  };

  const readyCount = statuses.filter((s) => s === 'READY').length;
  const needsWorkCount = statuses.filter((s) => s === 'NEEDS WORK').length;
  const intentionalCount = statuses.filter((s) => s === 'INTENTIONAL').length;
  const score = Math.round((readyCount / questions.length) * 100);

  const resetAll = () => {
    sound.playTap();
    setStatuses(questions.map(() => 'INTENTIONAL'));
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            24 / Quality Self-Audit
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          {/* Live Score */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-bold transition-all ${
            score >= 80 ? 'bg-[#16A34A]/10 border-[#16A34A]/30 text-[#16A34A]'
            : score >= 50 ? 'bg-[#D97706]/10 border-[#D97706]/30 text-[#D97706]'
            : 'bg-[#DC2626]/10 border-[#DC2626]/30 text-[#DC2626]'
          }`}>
            <span>SCORE: {score}%</span>
          </div>
          <button onClick={resetAll} className="px-2 py-1 rounded border border-[#11100E]/20 text-[#11100E] cursor-pointer hover:bg-[#11100E]/5 text-[10px]">
            Reset
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#11100E]">
            NOW BREAK YOUR OWN PRODUCT.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#77736B] font-medium">
            Click each checkpoint to cycle through: <span className="text-[#DC2626] font-bold">NEEDS WORK</span> → <span className="text-[#D97706] font-bold">INTENTIONAL</span> → <span className="text-[#16A34A] font-bold">READY</span>
          </p>
        </div>

        {/* 9 Audit Checklist Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-xs">
          {questions.map((q, idx) => {
            const st = statuses[idx];
            const style = statusStyle[st];
            return (
              <button
                key={idx}
                onClick={() => cycleStatus(idx)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between cursor-pointer transition-all hover:shadow-sm ${style.bg} ${style.border}`}
              >
                <div className="text-[9px] text-[#77736B] mb-1">AUDIT {String(idx + 1).padStart(2, '0')}</div>
                <div className="font-medium text-xs leading-snug text-[#11100E]">{q}</div>
                <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[9px] text-[#77736B]">click to cycle</span>
                  <span className={`font-bold text-[9px] px-2 py-0.5 rounded ${style.badge}`}>
                    {style.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Summary Scoreboard */}
        <div className="grid grid-cols-3 gap-2 font-mono text-xs">
          {[
            { label: 'READY', count: readyCount, color: '#16A34A', bg: 'bg-[#16A34A]/8 border-[#16A34A]/25' },
            { label: 'INTENTIONAL', count: intentionalCount, color: '#D97706', bg: 'bg-[#D97706]/8 border-[#D97706]/25' },
            { label: 'NEEDS WORK', count: needsWorkCount, color: '#DC2626', bg: 'bg-[#DC2626]/8 border-[#DC2626]/25' },
          ].map((s) => (
            <div key={s.label} className={`p-3 rounded-xl border flex flex-col items-center ${s.bg}`}>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.count}</div>
              <div className="text-[9px] font-bold" style={{ color: s.color }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Honest self-critique is the final stage of any design process.</span>
        <span>24 / 26</span>
      </div>
    </div>
  );
};
