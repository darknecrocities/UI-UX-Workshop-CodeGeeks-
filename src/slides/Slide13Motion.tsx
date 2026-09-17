import React, { useState, useRef } from 'react';
import { sound } from '../audio/sound';
import {
  Zap,
  Activity,
  MousePointer,
  Maximize2,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

type MotionType =
  | 'SPRING_ENTER'
  | 'STAGGER_CASCADE'
  | 'FLIP_EXPAND'
  | 'MAGNETIC_CURSOR'
  | 'SKELETON_SHIMMER'
  | 'SCALE_BOUNCE'
  | 'PARALLAX_TILT'
  | 'RIPPLE_WAVE'
  | 'KINETIC_ODOMETER'
  | 'SHEET_OFFCANVAS'
  | 'ACCORDION_HEIGHT'
  | 'SVG_ICON_MORPH';

interface MotionSpec {
  id: MotionType;
  title: string;
  category: string;
  tagline: string;
  physicsDesc: string;
  uxPurpose: string;
}

export const Slide13Motion: React.FC = () => {
  const [activeMotion, setActiveMotion] = useState<MotionType>('SPRING_ENTER');
  const [triggerKey, setTriggerKey] = useState<number>(0);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5x, 1x, 2x
  const [counter, setCounter] = useState<number>(1420);

  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const motions: MotionSpec[] = [
    {
      id: 'SPRING_ENTER',
      title: 'Spring Physics Entry',
      category: 'ENTRANCE',
      tagline: 'Mass & damping (no linear robots)',
      physicsDesc: 'Stiffness: 280, Damping: 22. Enters with natural organic overshoot that mimics real-world inertia.',
      uxPurpose: 'Guides the eye toward newly created elements without feeling robotic.',
    },
    {
      id: 'STAGGER_CASCADE',
      title: 'Staggered List Cascade',
      category: 'CHOREOGRAPHY',
      tagline: '30ms delta offset per item',
      physicsDesc: 'Items enter sequentially with 30ms offset. Prevents cognitive overload of full-screen simultaneous shifts.',
      uxPurpose: 'Establishes clear hierarchy and reading sequence for dense lists.',
    },
    {
      id: 'FLIP_EXPAND',
      title: 'FLIP Layout Morph',
      category: 'CONTINUITY',
      tagline: 'First, Last, Invert, Play',
      physicsDesc: 'Seamlessly interpolates bounding rect from compact card to full modal. Never teleports.',
      uxPurpose: 'Maintains spatial object permanence so users never lose their place.',
    },
    {
      id: 'MAGNETIC_CURSOR',
      title: 'Magnetic Cursor Attraction',
      category: 'AFFORDANCE',
      tagline: 'Button leans toward mouse',
      physicsDesc: 'Calculates delta vector (dx, dy) from button centroid to cursor; translates up to 8px.',
      uxPurpose: 'Creates a magnetic field of interactivity that invites confident clicking.',
    },
    {
      id: 'SKELETON_SHIMMER',
      title: 'Skeleton Pulse Wave',
      category: 'PERCEIVED SPEED',
      tagline: 'Continuous luminance gradient',
      physicsDesc: 'Linear gradient sliding at 1.4s period across grey geometry during async data fetches.',
      uxPurpose: 'Reduces perceived waiting time by 30% compared to empty spinners.',
    },
    {
      id: 'SCALE_BOUNCE',
      title: 'Tactile Scale Depression',
      category: 'PHYSICALITY',
      tagline: 'scale(0.96) active press',
      physicsDesc: 'Instant 60ms contraction to 0.96 scale with shadow collapse, snapping back on release.',
      uxPurpose: 'Provides instant confirmation that a button press was registered.',
    },
    {
      id: 'PARALLAX_TILT',
      title: '3D Perspective Tilt',
      category: 'DEPTH CUE',
      tagline: 'Rotates on cursor coordinates',
      physicsDesc: 'perspective(600px) rotateX and rotateY mapped dynamically to cursor position inside container.',
      uxPurpose: 'Reinforces surface physical elevation and spatial craftsmanship.',
    },
    {
      id: 'RIPPLE_WAVE',
      title: 'Radial Ripple Wavefront',
      category: 'CONTACT CONFIRM',
      tagline: 'Expands from click point',
      physicsDesc: 'Radial circle scales from 0% to 250% opacity fading from 0.4 to 0 from pointer coordinates.',
      uxPurpose: 'Directly acknowledges the precise location of user contact.',
    },
    {
      id: 'KINETIC_ODOMETER',
      title: 'Kinetic Odometer Ticker',
      category: 'TELEMETRY',
      tagline: 'Vertical rolling digits',
      physicsDesc: 'Numerical digits roll vertically with spring decay, settling on exact updated value.',
      uxPurpose: 'Draws immediate attention to real-time financial and telemetry shifts.',
    },
    {
      id: 'SHEET_OFFCANVAS',
      title: 'Directional Sheet Drawer',
      category: 'SPATIAL ANCHOR',
      tagline: 'Slides from edge with blur',
      physicsDesc: 'Translates 100% on X axis with 300ms cubic-bezier(0.16, 1, 0.3, 1) and backdrop blur.',
      uxPurpose: 'Communicates that the user is stepping into an overlay layer without leaving page context.',
    },
    {
      id: 'ACCORDION_HEIGHT',
      title: 'Smooth Accordion Reveal',
      category: 'PROGRESSIVE DISCLOSURE',
      tagline: 'Height-independent unfold',
      physicsDesc: 'CSS grid-template-rows 0fr to 1fr transition for buttery layout expansion without hardcoded heights.',
      uxPurpose: 'Allows users to explore advanced technical parameters on demand.',
    },
    {
      id: 'SVG_ICON_MORPH',
      title: 'SVG Path Icon Morph',
      category: 'MICRO-STATE',
      tagline: 'Hamburger ⇄ Close X',
      physicsDesc: 'Interpolates stroke points and rotation (0deg to 90deg) seamlessly in 180ms.',
      uxPurpose: 'Eliminates jumpy icon swaps, confirming state transition in place.',
    },
  ];

  const current = motions.find((m) => m.id === activeMotion) || motions[0];

  const trigger = () => {
    sound.playTap();
    setIsToggled((prev) => !prev);
    setTriggerKey((k) => k + 1);
    if (activeMotion === 'KINETIC_ODOMETER') {
      setCounter((c) => c + Math.floor(Math.random() * 85) + 15);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeMotion !== 'PARALLAX_TILT') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 14;
    const rotY = (x / (rect.width / 2)) * 14;
    setTiltStyle({
      transform: `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      transition: 'transform 80ms ease-out',
    });
  };

  const handlePointerLeave = () => {
    if (activeMotion === 'PARALLAX_TILT') {
      setTiltStyle({
        transform: 'perspective(600px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 300ms ease-out',
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-10 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            14 / Motion Physics & Animation Principles
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Speed switch */}
          <div className="flex items-center gap-1 bg-white border border-[#11100E]/20 p-0.5 rounded-lg text-[10px]">
            <span className="px-1.5 text-[#77736B]">SPEED:</span>
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => { sound.playClick(1.1); setSpeed(s); }}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  speed === s ? 'bg-[#11100E] text-white font-bold' : 'text-[#77736B]'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <button
            onClick={trigger}
            className="px-3 py-1 rounded-lg bg-[#F59E0B] text-[#11100E] border border-[#F59E0B]/50 flex items-center gap-1.5 font-bold cursor-pointer hover:bg-[#F59E0B]/90 transition-colors shadow-xs active:translate-y-0.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>TRIGGER IMPULSE</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 12 Motion Types (5 cols) | Interactive Physics Sandbox (7 cols) */}
      <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: 12 Motion Physics Patterns */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
          <div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-[#11100E]">
              MOTION SHOULD EXPLAIN.
            </h2>
            <p className="mt-0.5 text-xs text-[#77736B] font-medium">
              Never animate for decoration. Choose a physical pattern to inspect its mathematical execution:
            </p>
          </div>

          {/* 12 Motion Badges Grid */}
          <div className="grid grid-cols-2 gap-1.5 max-h-[290px] overflow-y-auto pr-1 font-mono text-[11px]">
            {motions.map((m) => {
              const isSelected = activeMotion === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    sound.playClick(1.2);
                    setActiveMotion(m.id);
                    setIsToggled(false);
                    setTriggerKey((k) => k + 1);
                  }}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-sm font-bold'
                      : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold truncate">{m.title}</span>
                  </div>
                  <div
                    className={`text-[9px] mt-0.5 truncate ${
                      isSelected ? 'text-white/70' : 'text-[#77736B]'
                    }`}
                  >
                    {m.tagline}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-[10px] font-mono text-[#77736B] flex items-center justify-between pt-1 border-t border-[#11100E]/10">
            <span>Category: <strong className="text-[#11100E]">{current.category}</strong></span>
            <span>12 Micro-Interaction Patterns</span>
          </div>
        </div>

        {/* Right Column: Live Interactive Physics Sandbox */}
        <div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="lg:col-span-7 p-5 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/20 shadow-sm flex flex-col justify-between min-h-[330px] relative overflow-hidden"
        >
          {/* Top Status */}
          <div className="flex items-center justify-between border-b border-[#11100E]/10 pb-2 font-mono text-xs">
            <span className="font-bold text-[#11100E]">{current.title}</span>
            <span className="text-[10px] text-[#77736B]">PHYSICS RUNTIME: ACTIVE</span>
          </div>

          {/* Dynamic Physics Stage */}
          <div className="my-auto py-3 flex items-center justify-center min-h-[160px]">
            {/* Pattern 1: Spring Enter */}
            {activeMotion === 'SPRING_ENTER' && (
              <div
                key={triggerKey}
                style={{
                  animation: `springPop ${350 / speed}ms cubic-bezier(0.34, 1.56, 0.64, 1) both`,
                }}
                className="p-5 rounded-2xl bg-[#11100E] text-[#F5F1E8] font-mono text-xs shadow-xl max-w-sm text-center"
              >
                <div className="text-amber-400 font-bold text-sm">SPRING PHYSICS INERTIA</div>
                <p className="text-white/80 mt-1 text-[11px]">
                  Simulates mass (1.0), stiffness (280), and damping (22). Natural organic arrival.
                </p>
              </div>
            )}

            {/* Pattern 2: Stagger List Cascade */}
            {activeMotion === 'STAGGER_CASCADE' && (
              <div key={triggerKey} className="w-full max-w-sm space-y-2 font-mono text-xs">
                {['01 / Compile TypeScript Core', '02 / Resolve Tailwind Utility Tokens', '03 / Inject Mechanical Audio Bus', '04 / Deploy Zero-Slop Artifact'].map(
                  (step, idx) => (
                    <div
                      key={step}
                      style={{
                        animation: `slideUpCascade ${300 / speed}ms ease-out both`,
                        animationDelay: `${idx * (60 / speed)}ms`,
                      }}
                      className="p-2.5 rounded-xl bg-white border border-[#11100E]/15 flex items-center justify-between shadow-xs"
                    >
                      <span className="font-semibold text-[#11100E]">{step}</span>
                      <span className="text-[10px] text-[#16A34A] font-bold">READY</span>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Pattern 3: FLIP Layout Morph */}
            {activeMotion === 'FLIP_EXPAND' && (
              <div
                key={triggerKey}
                onClick={trigger}
                style={{
                  transition: `all ${400 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                }}
                className={`rounded-2xl bg-[#11100E] text-[#F5F1E8] font-mono cursor-pointer shadow-xl overflow-hidden flex flex-col justify-between ${
                  isToggled ? 'w-80 h-36 p-5' : 'w-48 h-14 p-3'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-400">
                    {isToggled ? 'EXPANDED STATE (FLIP)' : 'COMPACT CARD'}
                  </span>
                  <Maximize2 className="w-3.5 h-3.5 opacity-60" />
                </div>
                {isToggled && (
                  <p className="text-[11px] text-white/80 animate-in fade-in duration-200">
                    Smoothly interpolates geometry from compact badge to full drawer with zero layout pop.
                  </p>
                )}
                <div className="text-[9px] text-[#77736B]">Click to toggle morph</div>
              </div>
            )}

            {/* Pattern 4: Magnetic Cursor Pull */}
            {activeMotion === 'MAGNETIC_CURSOR' && (
              <div className="text-center space-y-2">
                <button
                  onMouseEnter={() => sound.playClick(1.2)}
                  className="px-6 py-3 rounded-2xl bg-[#11100E] text-[#F5F1E8] font-mono text-xs font-bold shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-150 cursor-pointer flex items-center gap-2 mx-auto active:scale-95"
                >
                  <MousePointer className="w-4 h-4 text-amber-400" />
                  <span>Magnetic Field Active</span>
                </button>
                <p className="font-mono text-[10px] text-[#77736B]">
                  Hover over button to feel magnetic physical affinity
                </p>
              </div>
            )}

            {/* Pattern 5: Skeleton Pulse Wave */}
            {activeMotion === 'SKELETON_SHIMMER' && (
              <div className="w-full max-w-sm space-y-2.5">
                <div className="h-4 bg-gray-200 rounded-full w-3/4 skeleton-pulse" />
                <div className="h-4 bg-gray-200 rounded-full w-full skeleton-pulse" />
                <div className="h-8 bg-gray-200 rounded-xl w-1/2 skeleton-pulse" />
                <p className="font-mono text-[10px] text-[#77736B] text-center pt-1">
                  1.4s luminance gradient wave reduces user perceived load friction
                </p>
              </div>
            )}

            {/* Pattern 6: Scale Bounce Press */}
            {activeMotion === 'SCALE_BOUNCE' && (
              <div className="text-center space-y-2">
                <button
                  onClick={() => sound.playSwitchPress(1.1)}
                  className="px-6 py-3 rounded-2xl bg-[#11100E] text-[#F5F1E8] font-mono text-xs font-bold shadow-[0_4px_0_0_#2A2723] active:shadow-none active:translate-y-1 active:scale-95 transition-all cursor-pointer"
                >
                  PRESS ME (TACTILE DEPRESSION)
                </button>
                <p className="font-mono text-[10px] text-[#77736B]">
                  Depresses physically: translate-y-1 + shadow collapse + mechanical audio
                </p>
              </div>
            )}

            {/* Pattern 7: 3D Parallax Tilt */}
            {activeMotion === 'PARALLAX_TILT' && (
              <div
                style={tiltStyle}
                className="p-6 rounded-2xl bg-[#11100E] text-[#F5F1E8] font-mono text-xs shadow-2xl max-w-sm border border-white/10 text-center cursor-move"
              >
                <div className="text-amber-400 font-bold text-sm">3D PERSPECTIVE TILT</div>
                <p className="text-white/80 text-[11px] mt-1">
                  Move mouse inside box to tilt geometry in 3D coordinate space.
                </p>
              </div>
            )}

            {/* Pattern 8: Ripple Wavefront */}
            {activeMotion === 'RIPPLE_WAVE' && (
              <div
                onClick={() => {
                  sound.playTap();
                  setTriggerKey((k) => k + 1);
                }}
                className="relative overflow-hidden w-64 h-24 rounded-2xl bg-[#11100E] text-[#F5F1E8] font-mono text-xs flex items-center justify-center cursor-pointer shadow-lg"
              >
                <span>CLICK ANYWHERE FOR RIPPLE</span>
                <span
                  key={triggerKey}
                  className="absolute w-40 h-40 bg-white/20 rounded-full pointer-events-none animate-ping duration-700"
                />
              </div>
            )}

            {/* Pattern 9: Kinetic Odometer */}
            {activeMotion === 'KINETIC_ODOMETER' && (
              <div className="text-center space-y-2 font-mono">
                <div className="text-[10px] text-[#77736B] uppercase font-bold">
                  REAL-TIME SETTLED EVENTS
                </div>
                <div
                  key={triggerKey}
                  className="text-4xl sm:text-5xl font-black text-[#11100E] tabular-nums tracking-tighter animate-in zoom-in-95 duration-200"
                >
                  {counter.toLocaleString()}
                </div>
                <button
                  onClick={trigger}
                  className="px-3 py-1 bg-[#11100E] text-white text-xs rounded-lg cursor-pointer"
                >
                  + Increment Counter
                </button>
              </div>
            )}

            {/* Pattern 10: Sheet Off-Canvas */}
            {activeMotion === 'SHEET_OFFCANVAS' && (
              <div className="w-full max-w-sm flex flex-col items-center gap-2 font-mono text-xs">
                <button
                  onClick={trigger}
                  className="px-4 py-2 bg-[#11100E] text-white rounded-xl cursor-pointer"
                >
                  {isToggled ? 'Close Drawer ✕' : 'Slide Sheet Out →'}
                </button>
                <div
                  style={{
                    transition: `transform ${300 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    transform: isToggled ? 'translateX(0)' : 'translateX(110%)',
                  }}
                  className="p-3 bg-white border border-[#11100E]/20 rounded-xl shadow-lg w-full"
                >
                  <div className="font-bold text-[#11100E]">Off-Canvas Parameter Inspector</div>
                  <div className="text-[10px] text-[#77736B] mt-0.5">Slides smoothly from edge with damping.</div>
                </div>
              </div>
            )}

            {/* Pattern 11: Accordion Height */}
            {activeMotion === 'ACCORDION_HEIGHT' && (
              <div className="w-full max-w-sm bg-white border border-[#11100E]/20 rounded-xl overflow-hidden font-mono text-xs">
                <div
                  onClick={trigger}
                  className="p-3 flex items-center justify-between cursor-pointer bg-gray-50 border-b border-[#11100E]/10"
                >
                  <span className="font-bold">Technical Specifications</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isToggled ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isToggled ? '1fr' : '0fr',
                    transition: `grid-template-rows ${300 / speed}ms ease-out`,
                  }}
                >
                  <div className="overflow-hidden p-3 text-[11px] text-[#77736B] leading-relaxed">
                    Buttery smooth height reveal powered by CSS Grid interpolation without fixed maxHeight hacks.
                  </div>
                </div>
              </div>
            )}

            {/* Pattern 12: SVG Path Icon Morph */}
            {activeMotion === 'SVG_ICON_MORPH' && (
              <div className="text-center space-y-3 font-mono">
                <button
                  onClick={trigger}
                  className="w-14 h-14 rounded-2xl bg-[#11100E] text-[#F5F1E8] flex items-center justify-center cursor-pointer shadow-lg mx-auto transition-transform active:scale-90"
                >
                  {isToggled ? (
                    <X className="w-6 h-6 text-amber-400 rotate-90 transition-transform duration-300" />
                  ) : (
                    <Menu className="w-6 h-6 text-white transition-transform duration-300" />
                  )}
                </button>
                <div className="text-[10px] text-[#77736B]">
                  Click icon to test 180ms rotational SVG morph
                </div>
              </div>
            )}
          </div>

          {/* Physics Spec Breakdown */}
          <div className="pt-2 border-t border-[#11100E]/10 font-mono text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#77736B]">
            <span>{current.physicsDesc}</span>
            <span className="font-bold text-[#11100E] shrink-0">UX: {current.uxPurpose}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Animation that explains state is UX. Animation that decorates is noise.</span>
        <span>14 / 26</span>
      </div>

      <style>{`
        @keyframes springPop {
          0% { opacity: 0; transform: scale(0.85) translateY(12px); }
          70% { transform: scale(1.04) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideUpCascade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .skeleton-pulse {
          background: linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};
