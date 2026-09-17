import React from 'react';
import { usePresentation } from '../context/PresentationContext';
import { WORKSHOP_TIMELINE } from '../data/slides';
import { sound } from '../audio/sound';
import { X, Clock, ArrowUpRight } from 'lucide-react';

export const ScheduleDrawer: React.FC = () => {
  const { scheduleOpen, setScheduleOpen, goToSlide } = usePresentation();

  if (!scheduleOpen) return null;

  const sectionSlideMap: Record<number, number> = {
    0: 0,  // Lecture 1 -> Slide 01
    1: 18, // Activity 01 -> Slide 19
    2: 19, // Break -> Slide 20
    3: 20, // AI Demo -> Slide 21
    4: 21, // Activity 02 -> Slide 22
    5: 22  // Showcase -> Slide 23
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#11100E]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#F5F1E8] border border-[#11100E]/20 text-[#11100E] w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#11100E]/15 flex items-center justify-between bg-[#E9E1D3]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#11100E]" />
            <h2 className="text-sm font-mono font-bold tracking-wider uppercase">4-Hour Workshop Timeline</h2>
          </div>
          <button
            onClick={() => {
              sound.playClick(0.9);
              setScheduleOpen(false);
            }}
            className="p-1 rounded hover:bg-[#11100E]/10 transition-colors cursor-pointer border border-[#11100E]/15"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Schedule List */}
        <div className="p-6 divide-y divide-[#11100E]/10 overflow-y-auto max-h-[70vh]">
          {WORKSHOP_TIMELINE.map((block, idx) => (
            <div
              key={idx}
              className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#11100E]/5 px-3 rounded transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-[#11100E] bg-[#11100E]/10 px-2 py-0.5 rounded">
                    {block.time}
                  </span>
                  <span className="text-xs font-mono text-[#77736B]">{block.slides}</span>
                </div>
                <h4 className="font-bold text-sm text-[#11100E] mt-1">{block.title}</h4>
                <p className="text-xs text-[#77736B] mt-0.5">{block.description}</p>
              </div>

              <button
                onClick={() => {
                  goToSlide(sectionSlideMap[idx] || 0);
                  setScheduleOpen(false);
                }}
                onMouseEnter={() => sound.playClick(1.1)}
                className="self-start sm:self-center px-2.5 py-1 text-xs font-mono border border-[#11100E]/20 hover:border-[#11100E] hover:bg-[#11100E] hover:text-[#F5F1E8] transition-all rounded flex items-center gap-1 cursor-pointer"
              >
                <span>Jump</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#E9E1D3] border-t border-[#11100E]/15 text-[11px] font-mono text-[#77736B] flex items-center justify-between">
          <span>Speaker: Arron Parejas</span>
          <span>From Sketch to Ship</span>
        </div>
      </div>
    </div>
  );
};
