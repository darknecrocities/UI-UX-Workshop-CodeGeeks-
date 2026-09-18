import React from 'react';
import { usePresentation } from '../context/PresentationContext';
import { SLIDES_DATA } from '../data/slides';
import { sound } from '../audio/sound';
import { X } from 'lucide-react';

export const SlideOverview: React.FC = () => {
  const { overviewOpen, setOverviewOpen, currentSlide, goToSlide } = usePresentation();

  if (!overviewOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#11100E]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
      <div className="bg-[#F5F1E8] border border-[#11100E]/20 text-[#11100E] w-full max-w-6xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#11100E]/15 flex items-center justify-between bg-[#E9E1D3]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">Keynote Index</span>
            <h2 className="text-lg font-bold tracking-tight">28-SLIDE SYLLABUS & DIRECTORY</h2>
          </div>
          <button
            onClick={() => {
              sound.playClick(0.9);
              setOverviewOpen(false);
            }}
            className="p-1.5 rounded hover:bg-[#11100E]/10 transition-colors cursor-pointer border border-[#11100E]/15"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Typographic Grid of 25 Slides */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 bg-[#F5F1E8]">
          {SLIDES_DATA.map((slide, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                onMouseEnter={() => sound.playClick(1.2)}
                className={`text-left p-3 rounded-md border transition-all cursor-pointer flex flex-col justify-between group ${
                  isActive
                    ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-md ring-2 ring-[#11100E]/20'
                    : 'bg-[#E9E1D3]/50 hover:bg-[#E9E1D3] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-[#F5F1E8]' : 'text-[#77736B] group-hover:text-[#11100E]'
                    }`}
                  >
                    {String(slide.id).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-white/10 text-white/80' : 'bg-[#11100E]/5 text-[#77736B]'
                    }`}
                  >
                    {slide.section}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-xs leading-snug line-clamp-2">{slide.title}</h4>
                  <p
                    className={`text-[11px] mt-1 line-clamp-1 ${
                      isActive ? 'text-white/70' : 'text-[#77736B]'
                    }`}
                  >
                    {slide.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="px-6 py-2.5 bg-[#E9E1D3] border-t border-[#11100E]/15 text-xs text-[#77736B] font-mono flex items-center justify-between">
          <span>Click any card or press [ESC] to resume</span>
          <span>4-Hour UI + AI Workshop</span>
        </div>
      </div>
    </div>
  );
};
