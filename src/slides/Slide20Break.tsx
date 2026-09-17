import React, { useState, useEffect } from 'react';
import { sound } from '../audio/sound';
import { Coffee, Play, Pause, RotateCcw } from 'lucide-react';

const BREAK_TIPS = [
  'Drink water. Your brain is 73% water.',
  'Step outside for 2 minutes. Natural light resets focus.',
  'Stretch your hands — they\'ve been typing for 2 hours.',
  'Close your eyes for 60 seconds. Let your visual cortex reset.',
  'Talk to a real human. Even a quick "hey" counts.',
  'Breathe in for 4 counts, hold 4, out 4. Box breathing.',
];

export const Slide20Break: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 mins in seconds
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [tipIndex, setTipIndex] = useState<number>(0);
  const [breathPhase, setBreathPhase] = useState<'IN' | 'HOLD' | 'OUT'>('IN');


  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isRunning, timeLeft]);

  // Breath cycle: 4s in, 4s hold, 4s out = 12s cycle
  useEffect(() => {
    const phases: ('IN' | 'HOLD' | 'OUT')[] = ['IN', 'HOLD', 'OUT'];
    const durations = [4000, 4000, 4000];
    let idx = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setBreathPhase(phases[idx]);

      timeout = setTimeout(() => {
        idx = (idx + 1) % 3;
        cycle();
      }, durations[idx]);
    };
    cycle();
    return () => clearTimeout(timeout);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((900 - timeLeft) / 900) * 100;

  const circumference = 2 * Math.PI * 56;

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 md:p-16 max-w-7xl mx-auto select-none">
      {/* Top Meta */}
      <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-4 font-mono text-xs text-[#77736B]">
        <div className="flex items-center gap-2">
          <Coffee className="w-4 h-4 text-[#11100E]" />
          <span className="tracking-widest uppercase">Intermission · 15 Min</span>
        </div>
        <span>RECHARGE · HYDRATE · BREATHE</span>
      </div>

      {/* Main content */}
      <div className="my-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

        {/* Left: Big headline + tip */}
        <div className="md:col-span-7 space-y-6">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#11100E] leading-none">
            TAKE A<br />BREAK.
          </h1>
          <div className="p-4 rounded-xl bg-[#F5F1E8] border border-[#11100E]/15 font-mono text-sm text-[#11100E] space-y-3">
            <div className="text-[10px] text-[#77736B] uppercase tracking-wider">Break Tip {tipIndex + 1} of {BREAK_TIPS.length}</div>
            <p className="font-medium leading-relaxed">{BREAK_TIPS[tipIndex]}</p>
            <button
              onClick={() => {
                sound.playClick(1.1);
                setTipIndex((i) => (i + 1) % BREAK_TIPS.length);
              }}
              className="px-3 py-1 rounded-lg bg-[#11100E] text-[#F5F1E8] text-xs font-bold cursor-pointer hover:bg-black transition-colors"
            >
              Next Tip →
            </button>
          </div>
        </div>

        {/* Right: Breathing ring + timer */}
        <div className="md:col-span-5 flex flex-col items-center gap-6">
          {/* Breathing ring */}
          <div className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56">
            {/* Animated breathing glow */}
            <div
              className="absolute inset-0 rounded-full border border-[#11100E]/15 transition-all duration-[4000ms] ease-in-out"
              style={{
                transform: breathPhase === 'IN' ? 'scale(1.15)' : breathPhase === 'HOLD' ? 'scale(1.15)' : 'scale(0.92)',
                opacity: breathPhase === 'OUT' ? 0.4 : 0.9,
              }}
            />
            <div
              className="absolute inset-4 rounded-full bg-[#11100E]/5 transition-all duration-[4000ms] ease-in-out"
              style={{
                transform: breathPhase === 'IN' ? 'scale(1.1)' : breathPhase === 'OUT' ? 'scale(0.88)' : 'scale(1.1)',
              }}
            />

            {/* Timer ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="56" fill="none" stroke="#11100E" strokeOpacity="0.07" strokeWidth="4" />
              <circle
                cx="64" cy="64" r="56" fill="none"
                stroke="#11100E" strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={`${circumference * (1 - progress / 100)}`}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>

            {/* Center content */}
            <div className="z-10 text-center">
              <div className="font-mono text-3xl font-black tracking-tight text-[#11100E]">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className={`font-mono text-xs font-bold mt-1 tracking-wider transition-colors duration-1000 ${
                breathPhase === 'IN' ? 'text-[#11100E]' : breathPhase === 'HOLD' ? 'text-[#77736B]' : 'text-[#77736B]/60'
              }`}>
                {breathPhase === 'IN' ? 'BREATHE IN' : breathPhase === 'HOLD' ? 'HOLD' : 'BREATHE OUT'}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => { sound.playSwitch(!isRunning); setIsRunning((r) => !r); }}
              className="px-4 py-2 rounded-full bg-[#11100E] text-[#F5F1E8] flex items-center gap-1.5 cursor-pointer hover:bg-[#11100E]/90 transition-colors font-bold"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'PAUSE' : 'START'}</span>
            </button>
            <button
              onClick={() => { sound.playTap(); setIsRunning(false); setTimeLeft(900); }}
              className="p-2 rounded-full border border-[#11100E]/20 text-[#11100E] cursor-pointer hover:bg-[#11100E]/5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { sound.playClick(1.0); setTimeLeft((t) => Math.min(1800, t + 300)); }}
              className="px-3 py-1.5 rounded-full border border-[#11100E]/20 text-[#11100E] font-bold cursor-pointer hover:bg-[#11100E]/5"
            >
              +5m
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-[#11100E]/10 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>The best ideas arrive when you stop forcing them.</span>
        <span>21 / 26</span>
      </div>
    </div>
  );
};
