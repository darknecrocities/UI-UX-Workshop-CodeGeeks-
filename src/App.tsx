import React from 'react';
import { PresentationProvider, usePresentation } from './context/PresentationContext';
import { NavigationHUD } from './components/NavigationHUD';
import { SlideOverview } from './components/SlideOverview';
import { ScheduleDrawer } from './components/ScheduleDrawer';

// 25 Slide Components
import { Slide01Cover } from './slides/Slide01Cover';
import { Slide02Speaker } from './slides/Slide02Speaker';
import { Slide03Problem } from './slides/Slide03Problem';
import { Slide04Judgment } from './slides/Slide04Judgment';
import { Slide05Spectrum } from './slides/Slide05Spectrum';
import { Slide06Typography } from './slides/Slide06Typography';
import { Slide07FontVoice } from './slides/Slide07FontVoice';
import { Slide08ColorJob } from './slides/Slide08ColorJob';
import { Slide09BusinessUX } from './slides/Slide09BusinessUX';
import { Slide10Premium } from './slides/Slide10Premium';
import { Slide11MMRStory } from './slides/Slide11MMRStory';
import { Slide12Scalability } from './slides/Slide12Scalability';
import { SlideGridSystem } from './slides/SlideGridSystem';
import { Slide13Motion } from './slides/Slide13Motion';
import { Slide14Tactile } from './slides/Slide14Tactile';
import { Slide15XYExperiment } from './slides/Slide15XYExperiment';
import { Slide16PromptSkills } from './slides/Slide16PromptSkills';
import { Slide17GoodPrompt } from './slides/Slide17GoodPrompt';
import { Slide18Decisions } from './slides/Slide18Decisions';
import { Slide19Activity01 } from './slides/Slide19Activity01';
import { Slide20Break } from './slides/Slide20Break';
import { Slide21Pipeline } from './slides/Slide21Pipeline';
import { Slide22Activity02 } from './slides/Slide22Activity02';
import { Slide23SlopAudit } from './slides/Slide23SlopAudit';
import { Slide24Showcase } from './slides/Slide24Showcase';
import { Slide25Final } from './slides/Slide25Final';

const SLIDE_COMPONENTS: React.ComponentType[] = [
  Slide01Cover,
  Slide02Speaker,
  Slide03Problem,
  Slide04Judgment,
  Slide05Spectrum,
  Slide06Typography,
  Slide07FontVoice,
  Slide08ColorJob,
  Slide09BusinessUX,
  Slide10Premium,
  Slide11MMRStory,
  Slide12Scalability,
  SlideGridSystem,
  Slide13Motion,
  Slide14Tactile,
  Slide15XYExperiment,
  Slide16PromptSkills,
  Slide17GoodPrompt,
  Slide18Decisions,
  Slide19Activity01,
  Slide20Break,
  Slide21Pipeline,
  Slide22Activity02,
  Slide23SlopAudit,
  Slide24Showcase,
  Slide25Final,
];

const PresentationStage: React.FC = () => {
  const { currentSlide } = usePresentation();
  const CurrentSlideComponent = SLIDE_COMPONENTS[currentSlide] || Slide01Cover;
  const prevSlideRef = React.useRef<number>(currentSlide);
  const isForward = currentSlide >= prevSlideRef.current;

  React.useEffect(() => {
    prevSlideRef.current = currentSlide;
  }, [currentSlide]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#E9E1D3] text-[#11100E] flex flex-col justify-between">
      {/* Subtle paper grain & grid overlay */}
      <div className="absolute inset-0 paper-texture pointer-events-none z-10" />
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      {/* Main Slide Presentation Stage Area with Key-Based Directional Transition */}
      <main className="relative z-20 w-full h-[calc(100vh-96px)] mt-11 mb-13 overflow-y-auto sm:overflow-hidden flex items-center justify-center">
        <div
          key={currentSlide}
          className={`w-full h-full ${
            isForward ? 'slide-transition-forward' : 'slide-transition-backward'
          }`}
        >
          <CurrentSlideComponent />
        </div>
      </main>

      {/* HUD & Modals */}
      <NavigationHUD />
      <SlideOverview />
      <ScheduleDrawer />
    </div>
  );
};

export function App() {
  return (
    <PresentationProvider>
      <PresentationStage />
    </PresentationProvider>
  );
}

export default App;
