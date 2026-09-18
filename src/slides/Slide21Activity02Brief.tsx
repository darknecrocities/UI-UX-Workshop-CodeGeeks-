import React from 'react';
import { sound } from '../audio/sound';
import { usePresentation } from '../context/PresentationContext';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  Palette,
  Terminal,
  Clock,
  CheckCircle2,
  Building2,
  User,
  Zap,
  Calendar,
} from 'lucide-react';

export const Slide21Activity02Brief: React.FC = () => {
  const { nextSlide } = usePresentation();

  const handleStartSandbox = () => {
    sound.playSwitch(true);
    nextSlide();
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#11100E] font-bold">
            26 / Activity 02 Mission
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="flex items-center gap-1 text-[#77736B]">
            <Clock className="w-3.5 h-3.5" /> 60 MINUTES
          </span>
          <span className="px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] font-bold text-[10px]">
            HANDS-ON LAB
          </span>
        </div>
      </div>

      {/* Main Briefing Content */}
      <div className="my-auto py-3 space-y-6">
        {/* Title & Core Purpose */}
        <div>
          <span className="font-mono text-xs text-[#77736B] uppercase tracking-widest font-semibold">
            PAPER WIREFRAME → STRUCTURED PROMPT → LIVE WORKING PRODUCT
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#11100E] mt-1.5 leading-tight">
            ACTIVITY 02: FROM PROMPT TO WORKING APP.
          </h1>
          <p className="text-sm sm:text-base text-[#77736B] font-medium mt-2 max-w-3xl leading-relaxed">
            In Activity 01, you mapped your user flow on paper. Now, you will turn that design into a
            fully functioning, interactive web application in <strong className="text-[#11100E]">Google AI Studio</strong> with zero AI slop.
          </p>
        </div>

        {/* 3 Step Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="p-4 sm:p-5 rounded-2xl border border-[#11100E]/15 bg-[#F5F1E8] flex flex-col justify-between hover:border-[#11100E]/40 transition-all shadow-sm group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#11100E] px-2 py-0.5 rounded bg-[#11100E]/10">
                  STEP 01
                </span>
                <Layers className="w-4 h-4 text-[#77736B] group-hover:text-[#11100E] transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#11100E] mb-1.5">
                Pick Your Project Type
              </h3>
              <p className="text-xs text-[#77736B] leading-relaxed mb-3">
                Select the archetype that matches your vision:
              </p>
              <div className="space-y-1.5 font-mono text-[11px] text-[#11100E]">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-[#77736B]" />
                  <span><strong>Business Site</strong>: Clear offer & trust</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3 text-[#77736B]" />
                  <span><strong>Portfolio</strong>: Personal craft & works</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-[#77736B]" />
                  <span><strong>SaaS Landing</strong>: Live demo & pricing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#77736B]" />
                  <span><strong>Event Page</strong>: Single-scroll momentum</span>
                </div>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-[#11100E]/10 text-[10px] font-mono text-[#77736B]">
              Custom specs populate automatically.
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 sm:p-5 rounded-2xl border border-[#11100E]/15 bg-[#F5F1E8] flex flex-col justify-between hover:border-[#11100E]/40 transition-all shadow-sm group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#11100E] px-2 py-0.5 rounded bg-[#11100E]/10">
                  STEP 02
                </span>
                <Palette className="w-4 h-4 text-[#77736B] group-hover:text-[#11100E] transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#11100E] mb-1.5">
                Enforce Zero-Slop Rules
              </h3>
              <p className="text-xs text-[#77736B] leading-relaxed mb-3">
                Lock in strict visual constraints so AI doesn't produce generic junk:
              </p>
              <div className="space-y-1.5 font-mono text-[11px] text-[#11100E]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span><strong>The 2-Color Rule</strong>: 90% canvas, 10% ink</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span><strong>No Emojis</strong>: Clean semantic SVG icons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span><strong>No Purple/Green Glows</strong>: Pure contrast</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span><strong>Tactile Feel</strong>: Real micro-interactions</span>
                </div>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-[#11100E]/10 text-[10px] font-mono text-[#77736B]">
              Rules injected straight into the prompt.
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 sm:p-5 rounded-2xl border border-[#11100E]/15 bg-[#F5F1E8] flex flex-col justify-between hover:border-[#11100E]/40 transition-all shadow-sm group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#11100E] px-2 py-0.5 rounded bg-[#11100E]/10">
                  STEP 03
                </span>
                <Terminal className="w-4 h-4 text-[#77736B] group-hover:text-[#11100E] transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#11100E] mb-1.5">
                Generate in AI Studio
              </h3>
              <p className="text-xs text-[#77736B] leading-relaxed mb-3">
                Copy your complete prompt into Google AI Studio and build:
              </p>
              <div className="space-y-1.5 font-mono text-[11px] text-[#11100E]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#11100E]" />
                  <span>Use <strong>Gemini 2.0 Flash</strong> or <strong>1.5 Pro</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#11100E]" />
                  <span>Direct 1-shot single file generation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#11100E]" />
                  <span>Test in browser & audit discrepancies</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#11100E]" />
                  <span>Subtract bloat and polish interactions</span>
                </div>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-[#11100E]/10 text-[10px] font-mono text-[#77736B]">
              Goal: A real working app, not a static mockup.
            </div>
          </div>
        </div>

        {/* Action Callout Bar */}
        <div className="p-4 rounded-2xl bg-[#11100E] text-[#F5F1E8] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#F5F1E8]" />
            </div>
            <div>
              <div className="text-sm font-bold">Ready to build your prompt?</div>
              <div className="text-xs text-[#D8D3C8] opacity-80">
                The next slide contains your interactive prompt editor and customizer.
              </div>
            </div>
          </div>

          <button
            onClick={handleStartSandbox}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F5F1E8] text-[#11100E] font-bold text-xs font-mono flex items-center justify-center gap-2 hover:bg-white cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-sm shrink-0"
          >
            <span>LAUNCH PROMPT SANDBOX</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B] shrink-0">
        <span>A clear, simple prompt gives you a working app on the first try.</span>
        <span>26 / 30</span>
      </div>
    </div>
  );
};
