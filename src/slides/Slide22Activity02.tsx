import React, { useState, useEffect } from 'react';
import { sound } from '../audio/sound';
import { Code2, Check, Circle, Play, Pause, RotateCcw } from 'lucide-react';

const loop = ['DESIGN', 'PROMPT', 'BUILD', 'TEST', 'COMPARE', 'REFINE'];

const steps = [
  { num: '01', title: 'Bring Figma Frame', desc: 'Export layout specs, color tokens, and element hierarchy from your wireframe.' },
  { num: '02', title: 'Write Clear Prompt', desc: 'Give clear instructions. Specify what NOT to build as clearly as what to build.' },
  { num: '03', title: 'Feed Coding Agent', desc: 'Pass prompt into Antigravity IDE or terminal assistant. Let it run without interruption.' },
  { num: '04', title: 'Generate v1.0', desc: 'Let the agent scaffold components and types. Review, do not rewrite yet.' },
  { num: '05', title: 'Run Locally', desc: 'Spin up localhost. Test responsiveness, keyboard, and click interactions.' },
  { num: '06', title: 'Compare vs Design', desc: 'Put Figma side-by-side with browser. Audit every discrepancy.' },
  { num: '07', title: 'Find Design Flaws', desc: 'Identify generic cards, uncalibrated paddings, and unintentional gradients.' },
  { num: '08', title: 'Refine & Ship', desc: 'Direct the agent to subtract bloat and refine taste. Then deploy.' },
];

export const Slide22Activity02: React.FC = () => {
  const [activeLoopStep, setActiveLoopStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState<number>(5400); // 90 min
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Auto-advance loop
  useEffect(() => {
    if (!isRunning) return;
    const t = setInterval(() => {
      setActiveLoopStep((prev) => (prev + 1) % loop.length);
    }, 2000);
    return () => clearInterval(t);
  }, [isRunning]);

  // Countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

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
          <Code2 className="w-4 h-4 text-[#16A34A]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#16A34A] font-bold">
            23 / Live Build Challenge
          </span>
        </div>
        {/* Live Timer */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#77736B]">SESSION</span>
          <span className="font-black text-[#11100E]">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
          <button onClick={() => { sound.playSwitch(!isRunning); setIsRunning((r) => !r); }} className="p-1 rounded bg-[#11100E] text-[#F5F1E8] cursor-pointer hover:bg-black">
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button onClick={() => { sound.playTap(); setIsRunning(false); setTimeLeft(5400); setActiveLoopStep(0); }} className="p-1 rounded border border-[#11100E]/20 text-[#11100E] cursor-pointer hover:bg-[#11100E]/5">
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-4">
        <div>
          <span className="font-mono text-xs text-[#77736B] uppercase tracking-widest">
            FIGMA → ONE-SHOT PROMPT → AI CODING → WORKING APP
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#11100E] mt-1">
            ACTIVITY 02: PROMPT → PRODUCT
          </h2>
          <p className="text-xs sm:text-sm text-[#77736B] font-medium mt-1">
            Transform your Figma wireframe into a live, interactive app. Click each step to check it off:
          </p>
        </div>

        {/* Interactive Build Loop */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#11100E] text-[#F5F1E8] font-mono text-[10px] overflow-x-auto shadow-md gap-0.5">
          {loop.map((item, idx) => {
            const isCurrent = activeLoopStep === idx;
            return (
              <React.Fragment key={item}>
                <button
                  onClick={() => { sound.playClick(1.2); setActiveLoopStep(idx); }}
                  className={`px-2.5 py-1.5 rounded transition-all cursor-pointer shrink-0 font-bold ${
                    isCurrent ? 'bg-[#F59E0B] text-[#11100E] scale-105 shadow-md' : 'hover:bg-white/10 text-white/60'
                  }`}
                >
                  {item}
                </button>
                {idx < loop.length - 1 && <span className="text-white/25 shrink-0">→</span>}
              </React.Fragment>
            );
          })}
        </div>

        {/* 8-Step Checklist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
          {steps.map((s, idx) => {
            const done = completedSteps.has(idx);
            return (
              <button
                key={s.num}
                onClick={() => toggleStep(idx)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between cursor-pointer transition-all hover:shadow-sm ${
                  done
                    ? 'bg-[#16A34A]/10 border-[#16A34A]/40'
                    : 'bg-[#F5F1E8] border-[#11100E]/15 hover:border-[#11100E]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-[#77736B]">{s.num}</span>
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${done ? 'bg-[#16A34A] border-[#16A34A]' : 'border-[#11100E]/20'}`}>
                    {done ? <Check className="w-2.5 h-2.5 text-white" /> : <Circle className="w-2 h-2 text-[#11100E]/10" />}
                  </span>
                </div>
                <div className={`font-bold text-[10px] ${done ? 'text-[#16A34A] line-through' : 'text-[#11100E]'}`}>{s.title}</div>
                <p className="text-[9px] text-[#77736B] mt-0.5 line-clamp-2">{s.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#77736B]">
          <div className="flex-1 h-1.5 rounded-full bg-[#11100E]/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#16A34A] transition-all duration-500"
              style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
            />
          </div>
          <span className="font-bold text-[#11100E] shrink-0">{completedSteps.size}/{steps.length} STEPS</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>First output is raw clay. The sculptor is in the edits.</span>
        <span>23 / 26</span>
      </div>
    </div>
  );
};
