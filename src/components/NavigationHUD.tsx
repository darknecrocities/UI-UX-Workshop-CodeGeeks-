import React, { useState } from 'react';
import { usePresentation } from '../context/PresentationContext';
import { SLIDES_DATA } from '../data/slides';
import { sound } from '../audio/sound';
import { Volume2, VolumeX, Grid, Calendar, Maximize2, Minimize2, ArrowRight, ArrowLeft, Disc } from 'lucide-react';

export const NavigationHUD: React.FC = () => {
  const {
    currentSlide,
    totalSlides,
    soundEnabled,
    switchType,
    cycleSwitchType,
    toggleSound,
    toggleOverview,
    toggleSchedule,
    toggleFullscreen,
    isFullscreen,
    nextSlide,
    prevSlide,
    goToSlide,
  } = usePresentation();

  const [hoverNext, setHoverNext] = useState(false);
  const nextSlideData = currentSlide < totalSlides - 1 ? SLIDES_DATA[currentSlide + 1] : null;
  const currentSlideData = SLIDES_DATA[currentSlide];

  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  const switchLabelMap = {
    clicky: 'BLUE CLICKY',
    tactile: 'BROWN TACTILE',
    linear: 'RED LINEAR',
  };

  return (
    <>
      {/* Top subtle meta bar */}
      <header className="fixed top-0 left-0 right-0 h-11 px-5 flex items-center justify-between border-b border-[#11100E]/10 bg-[#E9E1D3]/95 backdrop-blur-xs z-40 text-xs font-mono select-none">
        <div className="flex items-center gap-4">
          <span className="font-bold tracking-wider text-[#11100E]">NO AI SLOP</span>
          <span className="text-[#77736B] hidden sm:inline">/</span>
          <span className="text-[#77736B] hidden sm:inline uppercase tracking-widest text-[11px]">
            {currentSlideData.section}
          </span>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleSchedule}
            onMouseEnter={() => sound.playClick(1.2)}
            className="px-2.5 py-1 rounded text-[#11100E] hover:bg-[#11100E]/5 transition-colors flex items-center gap-1.5 cursor-pointer border border-[#11100E]/15 text-[11px]"
            title="Workshop 4-Hour Schedule"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden md:inline">SCHEDULE</span>
          </button>

          <button
            onClick={toggleOverview}
            onMouseEnter={() => sound.playClick(1.2)}
            className="px-2.5 py-1 rounded text-[#11100E] hover:bg-[#11100E]/5 transition-colors flex items-center gap-1.5 cursor-pointer border border-[#11100E]/15 text-[11px]"
            title="Syllabus Index (Esc)"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden md:inline">INDEX</span>
            <kbd className="text-[10px] text-[#77736B] hidden sm:inline font-mono">ESC</kbd>
          </button>

          {/* Mechanical Switch Selector (when SFX is enabled) */}
          {soundEnabled && (
            <button
              onClick={cycleSwitchType}
              className="px-2 py-1 rounded bg-[#11100E] text-[#F59E0B] font-mono text-[10px] tracking-wider font-bold border border-[#F59E0B]/40 hover:border-[#F59E0B] transition-colors flex items-center gap-1 cursor-pointer"
              title="Click to cycle mechanical switch sound (Clicky / Tactile / Linear)"
            >
              <Disc className="w-3 h-3 animate-spin duration-1000" />
              <span>{switchLabelMap[switchType]}</span>
            </button>
          )}

          {/* Master SFX Toggle */}
          <button
            onClick={toggleSound}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 cursor-pointer border text-[11px] ${
              soundEnabled
                ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
                : 'text-[#11100E] hover:bg-[#11100E]/5 border-[#11100E]/15'
            }`}
            title="Toggle Mechanical Switch SFX"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#F5F1E8]" /> : <VolumeX className="w-3.5 h-3.5 text-[#77736B]" />}
            <span>{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1 rounded text-[#11100E] hover:bg-[#11100E]/5 transition-colors cursor-pointer border border-[#11100E]/15"
            title="Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Persistent Bottom Controls Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-13 px-5 sm:px-8 flex items-center justify-between border-t border-[#11100E]/10 bg-[#E9E1D3]/95 backdrop-blur-xs z-40 select-none">
        {/* Slide Counter & Current Title */}
        <div className="flex items-center gap-4">
          <div className="font-mono text-sm tracking-tighter font-semibold text-[#11100E] min-w-[54px]">
            {String(currentSlide + 1).padStart(2, '0')}{' '}
            <span className="text-[#77736B] font-normal">/ {String(totalSlides).padStart(2, '0')}</span>
          </div>
          <div className="h-4 w-px bg-[#11100E]/20 hidden sm:block" />
          <div className="text-xs text-[#11100E] font-medium tracking-tight truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {currentSlideData.title}
          </div>
        </div>

        {/* Progress line in center */}
        <div
          className="hidden lg:block w-48 h-1 bg-[#11100E]/10 rounded-full overflow-hidden cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            goToSlide(Math.floor(ratio * totalSlides));
          }}
        >
          <div
            className="h-full bg-[#11100E] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            onMouseEnter={() => sound.playClick(0.9)}
            className="p-1.5 rounded border border-[#11100E]/15 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#11100E]/5 transition-colors cursor-pointer text-[#11100E]"
            title="Previous Slide (←)"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Next Button with hover preview popup */}
          <div className="relative">
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              onMouseEnter={() => {
                setHoverNext(true);
                sound.playClick(1.1);
              }}
              onMouseLeave={() => setHoverNext(false)}
              className="px-3.5 py-1.5 rounded border border-[#11100E] bg-[#11100E] text-[#F5F1E8] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#11100E]/90 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-mono font-medium tracking-wide shadow-xs"
              title="Next Slide (→ or Space)"
            >
              <span>NEXT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {hoverNext && nextSlideData && (
              <div className="absolute bottom-11 right-0 bg-[#11100E] text-[#F5F1E8] px-3 py-2 rounded shadow-xl border border-white/10 text-right min-w-[200px] pointer-events-none z-50 animate-in fade-in slide-in-from-bottom-1 duration-150">
                <div className="text-[10px] font-mono text-[#77736B] tracking-wider uppercase">
                  SLIDE {String(currentSlide + 2).padStart(2, '0')}
                </div>
                <div className="text-xs font-semibold text-white truncate">{nextSlideData.title}</div>
                <div className="text-[11px] text-[#E9E1D3]/70 truncate">{nextSlideData.tagline}</div>
              </div>
            )}
          </div>
        </div>
      </footer>
    </>
  );
};
