import React from 'react';
import { InteractiveCanvas } from '../components/InteractiveCanvas';
import { Compass } from 'lucide-react';

export const Slide15XYExperiment: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            15 / Spatial Physics Experiment
          </span>
        </div>
        <h2 className="font-mono text-sm font-bold text-[#11100E]">MOTION HAS A COORDINATE SYSTEM</h2>
      </div>

      {/* Main Area */}
      <div className="my-auto py-2 space-y-4">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#11100E]">
            EVERY INTERACTION HAS A POSITION.
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#77736B] font-medium">
            Drag the coordinate puck. Audio frequency and telemetry respond dynamically to physical position and velocity:
          </p>
        </div>

        {/* 2D Coordinate Playground Canvas */}
        <div className="h-[310px] w-full">
          <InteractiveCanvas />
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Intentional design maps input coordinates to continuous sensory feedback.</span>
        <span>15 / 25</span>
      </div>
    </div>
  );
};
