import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Wrench, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

type PipelineStep = {
  title: string;
  desc: string;
  detail: string;
  color: string;
};

const pipelineSteps: PipelineStep[] = [
  { title: 'FIGMA', desc: 'Layout, spacing, black & white flow', detail: 'Define spacing rules, establish 8px grid, map all screens in black and white before adding a single color.', color: '#11100E' },
  { title: 'STRUCTURED PROMPT', desc: 'Clear step-by-step instructions', detail: 'Context → User → Goal → Constraints → Visual Language → Interaction → Tech Stack → Content → Edge Cases → Acceptance Criteria.', color: '#11100E' },
  { title: 'CODING AGENT', desc: 'Coding assistant & workflow', detail: 'Give the prompt to your coding tool. Let it write the initial code. Do NOT interrupt until v1 is ready to test.', color: '#11100E' },
  { title: 'CODE', desc: 'React, TypeScript, Tailwind, Motion', detail: 'Review the generated code. Clean up any bad patterns, remove unused props, and keep it fast.', color: '#11100E' },
  { title: 'WORKING PRODUCT', desc: 'Tested, responsive, deployed live', detail: 'Run locally. Test keyboard, responsiveness, and contrast. Check for common flaws, then ship.', color: '#11100E' },
];

const tools = [
  { name: 'Antigravity IDE', role: 'Smart coding environment', link: 'https://antigravity.google/product/antigravity-ide' },
  { name: 'AI Studio', role: 'Fast prototyping & clear prompts', link: 'https://aistudio.google.com/' },
  { name: 'Figma', role: 'Screen design & layout rules', link: 'https://www.figma.com/' },
  { name: 'Google Stitch', role: 'Interactive prototyping & screen flows', link: 'https://stitch.withgoogle.com/' },
  { name: 'GitHub', role: 'Code storage & automatic shipping', link: 'https://github.com' },
  { name: 'DomoSkills', role: 'Marketplace for agent skills', link: 'https://web-beta-six-81.vercel.app/' },
  { name: 'DomoDomo', role: 'Web utilities and agentic tools', link: 'https://domodomo.site/' },
  { name: 'Codepyne', role: 'Learning platform for AI & ML', link: 'https://codepyne-io.vercel.app/' },
];

export const Slide21Pipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleComplete = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
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
          <Wrench className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            22 / Tools & Workflow
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">BUILDING WITH AI TOOLS</h2>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#11100E]">
            NOW LET AI BUILD.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#77736B] font-medium">
            Click each pipeline stage to inspect what happens there. Check it off when you understand it:
          </p>
        </div>

        {/* 5-Step Interactive Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-xs">
          {pipelineSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            const isDone = completedSteps.has(idx);
            return (
              <div key={idx} className="flex sm:flex-col items-stretch gap-0">
                <button
                  onClick={() => {
                    sound.playClick(1.2);
                    setActiveStep(isActive ? null : idx);
                  }}
                  className={`flex-1 p-3 rounded-xl border text-left transition-all cursor-pointer flex sm:flex-col justify-between gap-2 ${
                    isActive
                      ? 'border-[#11100E] shadow-md ring-2 ring-[#11100E]/20 bg-[#FAF7F2]'
                      : isDone
                      ? 'border-[#11100E]/40 bg-[#11100E]/5'
                      : 'bg-[#F5F1E8] border-[#11100E]/15 hover:border-[#11100E]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-[#77736B]">0{idx + 1}</span>
                      {idx < pipelineSteps.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-[#11100E]/30 hidden sm:block" />
                      )}
                    </div>
                    <div className="font-bold text-[10px] mt-1 text-[#11100E]">
                      {step.title}
                    </div>
                    <div className="text-[9px] text-[#77736B] mt-0.5">{step.desc}</div>
                  </div>
                  <button
                    onClick={(e) => toggleComplete(idx, e)}
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                      isDone ? 'bg-[#11100E] border-[#11100E]' : 'border-[#11100E]/20 bg-white hover:border-[#11100E]'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-3 h-3 text-[#F5F1E8]" />}
                  </button>
                </button>
              </div>
            );
          })}
        </div>

        {/* Detail Expansion */}
        {activeStep !== null && (
          <div className="p-4 rounded-xl border border-[#11100E]/30 bg-[#FAF7F2] font-mono text-xs transition-all">
            <div className="text-[10px] font-bold mb-1 text-[#11100E]">
              STAGE {String(activeStep + 1).padStart(2, '0')}: {pipelineSteps[activeStep].title}
            </div>
            <p className="text-[#11100E] font-medium leading-relaxed">{pipelineSteps[activeStep].detail}</p>
          </div>
        )}

        {/* Tools Ecosystem */}
        <div className="p-3 rounded-xl bg-[#F5F1E8] border border-[#11100E]/20">
          <div className="text-[10px] font-mono text-[#77736B] uppercase tracking-wider mb-2">
            Workshop Tooling Ecosystem — click to open:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px]">
            {tools.map((t) => (
              <a
                key={t.name}
                href={t.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playClick(1.1)}
                className="p-2.5 rounded-lg bg-[#E9E1D3]/70 hover:bg-[#11100E] hover:text-[#F5F1E8] border border-[#11100E]/15 transition-all group flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{t.name}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100" />
                </div>
                <div className="text-[9px] text-[#77736B] group-hover:text-white/70 mt-0.5 line-clamp-1">{t.role}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Tools don't make the designer. But knowing your tools removes friction.</span>
        <span>22 / 26</span>
      </div>
    </div>
  );
};
