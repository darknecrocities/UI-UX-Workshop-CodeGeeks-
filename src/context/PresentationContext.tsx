import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SLIDES_DATA } from '../data/slides';
import { sound, type SwitchType } from '../audio/sound';

interface PresentationContextType {
  currentSlide: number;
  totalSlides: number;
  soundEnabled: boolean;
  switchType: SwitchType;
  overviewOpen: boolean;
  scheduleOpen: boolean;
  isFullscreen: boolean;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  toggleSound: () => void;
  setSwitchType: (type: SwitchType) => void;
  cycleSwitchType: () => void;
  toggleOverview: () => void;
  setOverviewOpen: (open: boolean) => void;
  toggleSchedule: () => void;
  setScheduleOpen: (open: boolean) => void;
  toggleFullscreen: () => void;
}

const PresentationContext = createContext<PresentationContextType | null>(null);

export const PresentationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [switchType, setSwitchTypeState] = useState<SwitchType>('clicky');
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = SLIDES_DATA.length;

  const setSwitchType = useCallback((type: SwitchType) => {
    setSwitchTypeState(type);
    sound.setSwitchType(type);
  }, []);

  const cycleSwitchType = useCallback(() => {
    const types: SwitchType[] = ['clicky', 'tactile', 'linear'];
    setSwitchTypeState((prev) => {
      const next = types[(types.indexOf(prev) + 1) % types.length];
      sound.setSwitchType(next);
      return next;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      sound.setEnabled(next);
      if (next) {
        sound.playSwitchPress();
      }
      return next;
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
      sound.playTap();
      setOverviewOpen(false);
    }
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev < totalSlides - 1) {
        sound.playTap();
        return prev + 1;
      }
      return prev;
    });
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev > 0) {
        sound.playTap();
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const toggleOverview = useCallback(() => {
    setOverviewOpen((prev) => {
      sound.playClick(prev ? 0.9 : 1.1);
      return !prev;
    });
  }, []);

  const toggleSchedule = useCallback(() => {
    setScheduleOpen((prev) => {
      sound.playClick(prev ? 0.9 : 1.1);
      return !prev;
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const currentSlug = SLIDES_DATA[currentSlide]?.slug;
      const disableSpaceNav =
        currentSlug === 'tactile' ||
        currentSlug === 'multipage-business' ||
        currentSlug === 'single-scroll' ||
        Boolean((e.target as HTMLElement)?.closest?.('.prevent-space-nav'));

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.code === 'Space' && !disableSpaceNav)) {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (scheduleOpen) {
          setScheduleOpen(false);
        } else {
          toggleOverview();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, nextSlide, prevSlide, toggleOverview, scheduleOpen, toggleFullscreen]);

  // Trackpad / Wheel gesture
  useEffect(() => {
    let lastWheelTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.overflow-y-auto') || target.closest('.prevent-slide-wheel')) {
        return;
      }

      const now = Date.now();
      if (now - lastWheelTime < 650) return;

      if (e.deltaY > 35 || e.deltaX > 35) {
        lastWheelTime = now;
        nextSlide();
      } else if (e.deltaY < -35 || e.deltaX < -35) {
        lastWheelTime = now;
        prevSlide();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [nextSlide, prevSlide]);

  return (
    <PresentationContext.Provider
      value={{
        currentSlide,
        totalSlides,
        soundEnabled,
        switchType,
        overviewOpen,
        scheduleOpen,
        isFullscreen,
        nextSlide,
        prevSlide,
        goToSlide,
        toggleSound,
        setSwitchType,
        cycleSwitchType,
        toggleOverview,
        setOverviewOpen,
        toggleSchedule,
        setScheduleOpen,
        toggleFullscreen,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};

export const usePresentation = () => {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentation must be used within a PresentationProvider');
  }
  return context;
};
