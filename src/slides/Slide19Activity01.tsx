import React, { useState, useEffect } from 'react';
import { sound } from '../audio/sound';
import { Flag, Play, Pause, RotateCcw, Check, Circle } from 'lucide-react';

export const Slide19Activity01: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 60 minutes in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((3600 - timeLeft) / 3600) * 100;

  const steps = [
    { num: '01', title: 'Pick a real problem', note: 'Must be an actual friction you or your users face today.', time: '5 min' },
    { num: '02', title: 'Define your specific user', note: 'Device, context, and mental bandwidth — be exact.', time: '5 min' },
    { num: '03', title: 'Define the single goal', note: 'One primary completion event (export / ship / pay / submit).', time: '5 min' },
    { num: '04', title: 'Sketch the flow on paper', note: 'Map screens and decision branches before opening any tool.', time: '15 min' },
    { num: '05', title: 'Build a low-fi Figma frame', note: 'Grayscale only. Zero color. Test usability and ergonomics.', time: '30 min' },
  ];

  const toggleStep = (idx: number) => {
    sound.playClick(1.2);
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Flag className="w-4 h-4 text-[#D97706]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#D97706] font-bold">
            19 / Workshop Mission Briefing
          </span>
        </div>
        <span className="font-mono text-xs text-[#77736B]">LAB SESSION 01</span>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Briefing & 5 Steps (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div>
            <span className="font-mono text-xs text-[#77736B] uppercase tracking-widest">
              IDEA → USER FLOW → LOW-FIDELITY PROTOTYPE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#11100E] mt-1">
              ACTIVITY 01: SKETCH → FIGMA
            </h2>
            <p className="text-xs sm:text-sm text-[#77736B] font-medium mt-1">
              Strict constraint: <strong className="text-[#11100E]">Do NOT polish visuals yet.</strong> Focus on function, user flow, and ergonomics.
            </p>
          </div>

          {/* 5 Steps — clickable to mark complete */}
          <div className="space-y-1.5 font-mono text-xs">
            {steps.map((s, idx) => {
              const done = completedSteps.has(idx);
              return (
                <button
                  key={s.num}
                  onClick={() => toggleStep(idx)}
                  className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 cursor-pointer transition-all ${
                    done
                      ? 'bg-[#16A34A]/10 border-[#16A34A]/40'
                      : 'bg-[#F5F1E8] border-[#11100E]/15 hover:border-[#11100E]/40'
                  }`}
                >
                  <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
                    done
                      ? 'bg-[#16A34A] border-[#16A34A]'
                      : 'border-[#11100E]/30 bg-transparent'
                  }`}>
                    {done
                      ? <Check className="w-3 h-3 text-white" />
                      : <Circle className="w-2.5 h-2.5 text-[#11100E]/20" />
                    }
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className={`font-bold text-xs ${done ? 'text-[#16A34A] line-through' : 'text-[#11100E]'}`}>
                        {s.num}. {s.title}
                      </div>
                      <span className="text-[10px] text-[#77736B] shrink-0">{s.time}</span>
                    </div>
                    <div className="text-[11px] text-[#77736B] mt-0.5">{s.note}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progress tracker */}
          <div className="flex items-center gap-2 font-mono text-xs text-[#77736B]">
            <div className="flex-1 h-1.5 rounded-full bg-[#11100E]/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#16A34A] transition-all duration-300"
                style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
              />
            </div>
            <span className="font-bold text-[#11100E]">{completedSteps.size}/{steps.length} COMPLETE</span>
          </div>
        </div>

        {/* Right: Mission Clock (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#11100E] text-[#F5F1E8] flex flex-col items-center text-center gap-5 shadow-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-white/50">
            SESSION TIMER
          </span>

          {/* Clock face */}
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke="#F59E0B" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-mono text-2xl font-black tracking-tighter text-[#F59E0B]">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="font-mono text-[10px] text-white/40 mt-0.5">remaining</div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs w-full justify-center">
            <button
              onClick={() => {
                sound.playSwitch(!isRunning);
                setIsRunning((r) => !r);
              }}
              className="px-4 py-2 rounded-lg bg-[#F59E0B] text-[#11100E] font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#F59E0B]/90 transition-colors"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'PAUSE' : 'START'}</span>
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setIsRunning(false);
                setTimeLeft(3600);
              }}
              className="p-2 rounded-lg bg-white/10 text-white cursor-pointer hover:bg-white/20 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Adjust buttons */}
          <div className="flex gap-2 font-mono text-[11px] w-full justify-center">
            {[+300, -300].map((delta) => (
              <button
                key={delta}
                onClick={() => {
                  sound.playClick(1.0);
                  setTimeLeft((t) => Math.max(0, Math.min(7200, t + delta)));
                }}
                className="px-3 py-1 rounded-lg bg-white/10 text-white/70 cursor-pointer hover:bg-white/20 transition-colors font-bold"
              >
                {delta > 0 ? '+5m' : '-5m'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>The constraint of grayscale forces hierarchy decisions over decoration decisions.</span>
        <span>19 / 25</span>
      </div>
    </div>
  );
};
