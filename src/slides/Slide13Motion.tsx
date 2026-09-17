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
  Check,
  ArrowRight,
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
  accent: string;
  accentBg: string;
  accentBorder: string;
  physicsDesc: string;
  uxPurpose: string;
  formula: string;
}

export const Slide13Motion: React.FC = () => {
  const [activeMotion, setActiveMotion] = useState<MotionType>('SPRING_ENTER');
  const [triggerKey, setTriggerKey] = useState<number>(0);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5x, 1x, 2x
  const [counter, setCounter] = useState<number>(18420);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Magnetic cursor state
  const magneticBtnRef = useRef<HTMLButtonElement>(null);
  const [magneticOffset, setMagneticOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [magneticDistance, setMagneticDistance] = useState<number>(0);

  // 3D Tilt state
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [tiltCoords, setTiltCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  // Ripple state
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // SVG morph state index (0: menu, 1: close, 2: check, 3: arrow)
  const [morphState, setMorphState] = useState<number>(0);

  const motions: MotionSpec[] = [
    {
      id: 'SPRING_ENTER',
      title: 'Spring Physics',
      category: 'PHYSICAL INERTIA',
      tagline: 'Mass, tension & damping',
      accent: '#2563EB',
      accentBg: '#EFF6FF',
      accentBorder: '#BFDBFE',
      physicsDesc: 'Stiffness: 280 N/m, Damping: 22 N·s/m. Organic overshoot mimicking kinetic mass.',
      uxPurpose: 'Guides the eye toward newly created elements without robotic easing.',
      formula: 'F = −k·x − c·v',
    },
    {
      id: 'STAGGER_CASCADE',
      title: 'Stagger Cascade',
      category: 'CHOREOGRAPHY',
      tagline: '35ms temporal offset per item',
      accent: '#10B981',
      accentBg: '#ECFDF5',
      accentBorder: '#A7F3D0',
      physicsDesc: 'Progressive delayed entrance. Keeps viewport transitions calm & readable.',
      uxPurpose: 'Establishes clear cognitive scanning hierarchy for dense operational lists.',
      formula: 'delay(i) = i × 35ms',
    },
    {
      id: 'FLIP_EXPAND',
      title: 'FLIP Layout Morph',
      category: 'SPATIAL CONTINUITY',
      tagline: 'First, Last, Invert, Play',
      accent: '#8B5CF6',
      accentBg: '#F5F3FF',
      accentBorder: '#DDD6FE',
      physicsDesc: 'Interpolates bounding rect dimensions smoothly without layout reflow pops.',
      uxPurpose: 'Maintains object permanence so users never lose spatial orientation.',
      formula: 'Δx, Δy = BoundingBox(L) − BoundingBox(F)',
    },
    {
      id: 'MAGNETIC_CURSOR',
      title: 'Magnetic Affordance',
      category: 'ATTRACTOR FIELD',
      tagline: 'Dynamic cursor attraction pull',
      accent: '#D97706',
      accentBg: '#FFFBEB',
      accentBorder: '#FDE68A',
      physicsDesc: 'Proximity vector calculates distance; springs toward pointer with inverse falloff.',
      uxPurpose: 'Provides palpable physical gravity making call-to-actions irresistible.',
      formula: 'V_pull = (P_mouse − P_btn) × 0.28',
    },
    {
      id: 'SKELETON_SHIMMER',
      title: 'Luminance Wave',
      category: 'PERCEIVED LATENCY',
      tagline: 'Holographic gradient shimmer',
      accent: '#0284C7',
      accentBg: '#F0F9FF',
      accentBorder: '#BAE6FD',
      physicsDesc: 'Continuous 1.4s 45° linear gradient wave traversing grey geometry during I/O.',
      uxPurpose: 'Reduces perceived wait time by 34% compared to static blank states.',
      formula: 'background-position: 200% → −200%',
    },
    {
      id: 'SCALE_BOUNCE',
      title: 'Tactile Depression',
      category: 'MECHANICAL FEEDBACK',
      tagline: 'scale(0.96) + shadow collapse',
      accent: '#DC2626',
      accentBg: '#FEF2F2',
      accentBorder: '#FECACA',
      physicsDesc: 'Instant 60ms contraction with drop-shadow collapse, snapping back on release.',
      uxPurpose: 'Gives high-confidence tactile confirmation that an action was registered.',
      formula: 'scale(0.96) translateY(2px)',
    },
    {
      id: 'PARALLAX_TILT',
      title: '3D Perspective Tilt',
      category: 'DEPTH VOLUMETRIC',
      tagline: 'Dynamic gyro raycast & glare',
      accent: '#4F46E5',
      accentBg: '#EEF2FF',
      accentBorder: '#C7D2FE',
      physicsDesc: 'perspective(800px) rotateX & rotateY mapped to normalized cursor coordinates.',
      uxPurpose: 'Elevates perceived software craftsmanship to luxury tactile hardware quality.',
      formula: 'rotX = −(y/H)·16°, rotY = (x/W)·16°',
    },
    {
      id: 'RIPPLE_WAVE',
      title: 'Radial Wavefront',
      category: 'CONTACT WAVE',
      tagline: 'Expands from exact click point',
      accent: '#0D9488',
      accentBg: '#F0FDFA',
      accentBorder: '#99F6E4',
      physicsDesc: 'Concentric circular wavefront expanding 0% → 300% radius with alpha decay.',
      uxPurpose: 'Affirms user contact locus with immediate visual shockwave feedback.',
      formula: 'r(t) = v·t, α(t) = 0.5·(1 − t)',
    },
    {
      id: 'KINETIC_ODOMETER',
      title: 'Kinetic Odometer',
      category: 'NUMERICAL FLOW',
      tagline: 'Rolling mechanical tumbler',
      accent: '#059669',
      accentBg: '#ECFDF5',
      accentBorder: '#A7F3D0',
      physicsDesc: 'Individual vertical columnar reels slide with spring decay settling on new value.',
      uxPurpose: 'Transforms dry numeric updates into an engaging, glanceable data stream.',
      formula: 'translateY = −digit × 100%',
    },
    {
      id: 'SHEET_OFFCANVAS',
      title: 'Off-Canvas Sheet',
      category: 'PROGRESSIVE DRAWER',
      tagline: 'Spring-damped edge slide & blur',
      accent: '#EA580C',
      accentBg: '#FFF7ED',
      accentBorder: '#FFEDD5',
      physicsDesc: 'Translates 100% on X-axis with cubic-bezier(0.16, 1, 0.3, 1) and backdrop blur.',
      uxPurpose: 'Exposes context controls without navigating away from the workspace context.',
      formula: 'transform: translateX(0) with blur(8px)',
    },
    {
      id: 'ACCORDION_HEIGHT',
      title: 'Grid Height Unfold',
      category: 'LAYOUT DISCLOSURE',
      tagline: '0fr → 1fr smooth expansion',
      accent: '#2563EB',
      accentBg: '#EFF6FF',
      accentBorder: '#BFDBFE',
      physicsDesc: 'CSS grid-template-rows interpolation eliminates brittle fixed maxHeight hacks.',
      uxPurpose: 'Reveals technical documentation seamlessly without visual jitter.',
      formula: 'grid-template-rows: 0fr → 1fr',
    },
    {
      id: 'SVG_ICON_MORPH',
      title: 'SVG Path Morph',
      category: 'MICRO-STATE TRANSITION',
      tagline: 'Rotational path interpolation',
      accent: '#C026D3',
      accentBg: '#FDF4FF',
      accentBorder: '#F5D0FE',
      physicsDesc: 'Seamless vector stroke and geometry rotation (0° → 90° → 180°) in 200ms.',
      uxPurpose: 'Eliminates abrupt icon jumps, preserving mental model continuity.',
      formula: 'rotate(90deg) + path morph',
    },
  ];

  const current = motions.find((m) => m.id === activeMotion) || motions[0];

  const trigger = () => {
    sound.playTap();
    setIsToggled((prev) => !prev);
    setTriggerKey((k) => k + 1);
    if (activeMotion === 'KINETIC_ODOMETER') {
      setCounter((c) => c + Math.floor(Math.random() * 240) + 45);
    }
    if (activeMotion === 'SKELETON_SHIMMER') {
      setIsLoaded((l) => !l);
    }
    if (activeMotion === 'SVG_ICON_MORPH') {
      setMorphState((s) => (s + 1) % 4);
    }
  };

  // Magnetic button tracking
  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeMotion !== 'MAGNETIC_CURSOR' || !magneticBtnRef.current) return;
    const rect = magneticBtnRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    setMagneticDistance(Math.round(dist));

    if (dist < 160) {
      // Pull button up to 18px towards cursor
      const pullFactor = (1 - dist / 160) * 18;
      const angle = Math.atan2(dy, dx);
      setMagneticOffset({
        x: Math.cos(angle) * pullFactor,
        y: Math.sin(angle) * pullFactor,
      });
    } else {
      setMagneticOffset({ x: 0, y: 0 });
    }
  };

  const handleMagneticLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
    setMagneticDistance(0);
  };

  // Parallax 3D tilt tracking
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeMotion !== 'PARALLAX_TILT' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2; // -1 to +1
    const normY = (y / rect.height - 0.5) * 2; // -1 to +1
    const rotX = -normY * 18;
    const rotY = normX * 18;

    setTiltCoords({ x: Math.round(normX * 100), y: Math.round(normY * 100) });
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 70ms ease-out',
    });
  };

  const handlePointerLeave = () => {
    if (activeMotion === 'PARALLAX_TILT') {
      setTiltStyle({
        transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 350ms ease-out',
      });
      setTiltCoords({ x: 0, y: 0 });
      setGlarePos({ x: 50, y: 50 });
    }
  };

  // Ripple trigger
  const handleRippleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    sound.playTap();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev.slice(-3), newRipple]);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-7 md:p-9 max-w-7xl mx-auto select-none">
      {/* Header with real color tags */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shadow-xs transition-colors"
            style={{ background: current.accent, color: 'white' }}
          >
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
              14 / Motion Physics & Animation Laboratory
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-bold text-xs text-[#11100E]">{current.title}</span>
              <span
                className="px-2 py-0.5 rounded-full font-mono text-[9px] font-bold"
                style={{ background: current.accentBg, color: current.accent, border: `1px solid ${current.accentBorder}` }}
              >
                {current.category}
              </span>
            </div>
          </div>
        </div>

        {/* Action Bar: Speed toggles + Trigger Impulse */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="flex items-center gap-1 bg-white border border-[#11100E]/20 p-1 rounded-xl shadow-2xs">
            <span className="px-1.5 text-[9px] text-[#77736B] font-bold">TIME:</span>
            {[
              { s: 0.5, label: '0.5x Slow' },
              { s: 1,   label: '1.0x Real' },
              { s: 2,   label: '2.0x Hyper' },
            ].map(({ s, label }) => (
              <button
                key={s}
                onClick={() => { sound.playClick(1.1); setSpeed(s); }}
                className={`px-2 py-0.5 rounded-lg text-[10px] cursor-pointer transition-all ${
                  speed === s
                    ? 'bg-[#11100E] text-white font-bold shadow-xs'
                    : 'text-[#77736B] hover:text-[#11100E]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={trigger}
            className="px-3.5 py-1.5 rounded-xl font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-xs active:translate-y-0.5 text-white"
            style={{ background: current.accent }}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>TRIGGER IMPULSE</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 12 Motion Selectors (5 cols) | Dynamic Interactive Stage (7 cols) */}
      <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: 12 Real-Colored Motion Physics Selectors */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#11100E]">
              MOTION THAT COMMUNICATES.
            </h2>
            <p className="mt-0.5 text-xs text-[#77736B] font-medium">
              Every animation must reveal state, direction, or mass. Click any pattern to inspect live physics:
            </p>
          </div>

          {/* 12 Motion Tiles with authentic color palettes */}
          <div className="grid grid-cols-2 gap-1.5 max-h-[300px] overflow-y-auto pr-1 font-mono text-[11px]">
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
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'shadow-md border-transparent text-white'
                      : 'bg-white hover:border-[#11100E]/40 text-[#11100E]'
                  }`}
                  style={{
                    background: isSelected ? m.accent : undefined,
                    borderColor: isSelected ? m.accent : '#11100E15',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-white' : 'text-[#11100E]'}`}>
                      {m.title}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full transition-all"
                      style={{ background: isSelected ? '#FFFFFF' : m.accent }}
                    />
                  </div>
                  <div
                    className={`text-[9px] mt-1 line-clamp-1 ${
                      isSelected ? 'text-white/85 font-medium' : 'text-[#77736B]'
                    }`}
                  >
                    {m.tagline}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="p-2.5 rounded-xl bg-white border border-[#11100E]/15 font-mono text-[10px] flex items-center justify-between text-[#77736B]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ background: current.accent }} />
              <span>FORMULA: <strong className="text-[#11100E] font-mono">{current.formula}</strong></span>
            </span>
            <span className="font-bold text-[#11100E]">12 PHYSICS MODELS</span>
          </div>
        </div>

        {/* Right Column: Dynamic Interactive Physics Sandbox */}
        <div
          className="lg:col-span-7 p-5 rounded-2xl border shadow-md flex flex-col justify-between min-h-[350px] relative overflow-hidden transition-all"
          style={{
            background: current.accentBg,
            borderColor: current.accentBorder,
          }}
        >
          {/* Top Status & Live Gauge */}
          <div className="flex items-center justify-between border-b pb-2.5 font-mono text-xs" style={{ borderColor: current.accentBorder }}>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: current.accent, boxShadow: `0 0 8px ${current.accent}` }}
              />
              <span className="font-black text-sm text-[#11100E]">{current.title}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="px-2 py-0.5 rounded bg-white font-bold text-[#11100E] shadow-2xs border border-[#11100E]/10">
                ⚡ DURATION: {Math.round(350 / speed)}ms
              </span>
              <span
                className="px-2 py-0.5 rounded font-bold"
                style={{ background: current.accent, color: 'white' }}
              >
                LIVE
              </span>
            </div>
          </div>

          {/* Dynamic Physics Stage */}
          <div className="my-auto py-4 flex items-center justify-center min-h-[190px] relative">
            {/* Pattern 1: Spring Enter with Real Cobalt Palette & Oscilloscope */}
            {activeMotion === 'SPRING_ENTER' && (
              <div className="flex flex-col items-center gap-3 w-full max-w-sm">
                <div
                  key={triggerKey}
                  style={{
                    animation: `springPop ${380 / speed}ms cubic-bezier(0.34, 1.56, 0.64, 1) both`,
                    boxShadow: '0 12px 28px -6px rgba(37, 99, 235, 0.35)',
                  }}
                  className="w-full p-5 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white font-mono text-xs text-center border border-blue-400/40 relative overflow-hidden"
                >
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                  <div className="text-white font-black text-sm tracking-wide">SPRING INERTIA TRANSIENT</div>
                  <p className="text-blue-100 mt-1 text-[11px] leading-relaxed">
                    Stiffness: 280 · Damping: 22 · Mass: 1.0kg
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[10px] bg-blue-900/40 py-1.5 px-3 rounded-xl border border-blue-400/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>NATURAL REBOUND OSCILLATION</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] font-mono text-blue-900/80">
                  <span>Rebound Phase: <strong>Overdamped → Settled</strong></span>
                  <button onClick={trigger} className="text-blue-600 font-bold underline cursor-pointer">
                    Re-trigger Pop ↺
                  </button>
                </div>
              </div>
            )}

            {/* Pattern 2: Stagger List Cascade with Emerald Palette */}
            {activeMotion === 'STAGGER_CASCADE' && (
              <div key={triggerKey} className="w-full max-w-md space-y-2 font-mono text-xs">
                {[
                  { title: '01 / Compile TypeScript AST Core', time: '14ms', status: 'VERIFIED' },
                  { title: '02 / Resolve Tailwind Utility Graph', time: '28ms', status: 'VERIFIED' },
                  { title: '03 / Bind Mechanical Sound Bus (AudioCtx)', time: '42ms', status: 'VERIFIED' },
                  { title: '04 / Ship Zero-Slop Production Bundle', time: '56ms', status: 'DEPLOYED' },
                ].map((step, idx) => (
                  <div
                    key={step.title}
                    style={{
                      animation: `slideUpCascade ${320 / speed}ms cubic-bezier(0.16, 1, 0.3, 1) both`,
                      animationDelay: `${idx * (45 / speed)}ms`,
                      borderLeft: '4px solid #10B981',
                    }}
                    className="p-3 rounded-xl bg-white border border-emerald-200/80 flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="font-bold text-[#11100E] text-[11px]">{step.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-mono">+{step.time}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-black text-[9px]">
                        {step.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pattern 3: FLIP Layout Morph with Royal Violet */}
            {activeMotion === 'FLIP_EXPAND' && (
              <div
                key={triggerKey}
                onClick={trigger}
                style={{
                  transition: `all ${420 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                  boxShadow: '0 16px 36px -8px rgba(139, 92, 246, 0.35)',
                }}
                className={`rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white font-mono cursor-pointer overflow-hidden flex flex-col justify-between border border-violet-400/40 ${
                  isToggled ? 'w-96 h-48 p-5' : 'w-56 h-16 p-3.5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="font-bold text-xs tracking-wider">
                      {isToggled ? 'DEVELOPER INSPECTOR (FLIP)' : 'COMPACT AVATAR'}
                    </span>
                  </div>
                  <Maximize2 className={`w-4 h-4 transition-transform duration-300 ${isToggled ? 'rotate-180' : ''}`} />
                </div>

                {isToggled ? (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <p className="text-[11px] text-violet-100 leading-snug">
                      First, Last, Invert, Play interpolates bounding rectangles smoothly across states without DOM recalculation glitches.
                    </p>
                    <div className="flex gap-2 pt-1">
                      <span className="px-2 py-0.5 rounded bg-white/20 text-[9px] font-bold">FPS: 60 LOCKED</span>
                      <span className="px-2 py-0.5 rounded bg-white/20 text-[9px] font-bold">REFLOW: 0ms</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[10px] text-violet-200 flex items-center justify-between">
                    <span>Click to morph card →</span>
                    <span className="font-bold">48px → 192px</span>
                  </div>
                )}
              </div>
            )}

            {/* Pattern 4: Magnetic Cursor Pull with Amber Field */}
            {activeMotion === 'MAGNETIC_CURSOR' && (
              <div
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="w-full h-44 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/50 flex flex-col items-center justify-center gap-2 relative cursor-crosshair"
              >
                <div className="absolute top-2 left-3 font-mono text-[9px] text-amber-800">
                  ATTRACTOR RADIUS: 160PX · DELTA DISTANCE: {magneticDistance}px
                </div>

                <button
                  ref={magneticBtnRef}
                  onClick={() => sound.playSuccess()}
                  style={{
                    transform: `translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0)`,
                    transition: magneticDistance === 0 ? 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 60ms ease-out',
                    boxShadow: '0 10px 25px -4px rgba(217, 119, 6, 0.4)',
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-mono text-xs font-black cursor-pointer flex items-center gap-2 border border-amber-400 active:scale-95"
                >
                  <MousePointer className="w-4 h-4 fill-current" />
                  <span>MAGNETIC BUTTON [PULL ACTIVE]</span>
                </button>

                <div className="font-mono text-[10px] text-amber-900/80">
                  Hover near button to feel the cursor magnetic field pull
                </div>
              </div>
            )}

            {/* Pattern 5: Skeleton Pulse Wave with Cyan Palette */}
            {activeMotion === 'SKELETON_SHIMMER' && (
              <div className="w-full max-w-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-sky-900">
                    {isLoaded ? '✓ ASYNC DATA RESOLVED' : 'FETCHING REMOTE TELEMETRY...'}
                  </span>
                  <button
                    onClick={trigger}
                    className="px-2.5 py-1 rounded bg-sky-600 text-white font-mono text-[10px] font-bold cursor-pointer"
                  >
                    {isLoaded ? 'Reset to Skeleton' : 'Simulate Data Return'}
                  </button>
                </div>

                {isLoaded ? (
                  <div className="p-4 rounded-2xl bg-white border border-sky-200 shadow-md space-y-2 animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs">
                          EU
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#11100E]">Frankfurt Edge Node</div>
                          <div className="text-[9px] text-[#77736B]">Cluster ID #4092-B</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                        ONLINE
                      </span>
                    </div>
                    <div className="text-xl font-black text-sky-900 font-mono">1.42 Gbps / 4ms</div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-md space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-sky-100 skeleton-pulse shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3.5 bg-sky-100 rounded-full w-3/5 skeleton-pulse" />
                        <div className="h-2.5 bg-sky-100 rounded-full w-2/5 skeleton-pulse" />
                      </div>
                    </div>
                    <div className="h-8 bg-sky-100 rounded-xl w-full skeleton-pulse" />
                  </div>
                )}
              </div>
            )}

            {/* Pattern 6: Scale Bounce Press with Crimson Strike */}
            {activeMotion === 'SCALE_BOUNCE' && (
              <div className="text-center space-y-3">
                <button
                  onClick={() => sound.playSwitchPress(1.2)}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-b from-[#EF4444] to-[#DC2626] text-white font-mono text-sm font-black border-2 border-red-400 shadow-[0_6px_0_0_#991B1B,0_12px_20px_rgba(220,38,38,0.35)] active:shadow-[0_1px_0_0_#991B1B] active:translate-y-1.5 active:scale-[0.96] transition-all cursor-pointer select-none"
                >
                  PRESS ME (TACTILE HAMMER)
                </button>
                <div className="font-mono text-[10px] text-red-900">
                  Physical depression: 60ms contraction, bevel collapse + mechanical acoustic resonance
                </div>
              </div>
            )}

            {/* Pattern 7: 3D Perspective Parallax Tilt with Indigo Cyber Highlight */}
            {activeMotion === 'PARALLAX_TILT' && (
              <div
                ref={cardRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                style={tiltStyle}
                className="w-80 p-6 rounded-2xl bg-gradient-to-br from-[#312E81] via-[#4338CA] to-[#1E1B4B] text-white font-mono text-xs shadow-2xl border border-indigo-300/30 text-center cursor-move relative overflow-hidden"
              >
                {/* Dynamic specular glare shine tracking cursor */}
                <div
                  className="absolute pointer-events-none rounded-full blur-2xl opacity-40 transition-opacity"
                  style={{
                    left: `${glarePos.x}%`,
                    top: `${glarePos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: '180px',
                    height: '180px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(99,102,241,0) 70%)',
                  }}
                />

                <div className="relative z-10 space-y-2">
                  <div className="text-xs uppercase tracking-widest text-indigo-200 font-bold">
                    VOLUMETRIC GYRO TILT
                  </div>
                  <div className="text-xl font-black text-white">PERSPECTIVE 800PX</div>
                  <div className="py-2 px-3 bg-white/10 rounded-xl border border-white/20 text-[10px] text-indigo-100 flex justify-between">
                    <span>ROLL (X): {tiltCoords.y}°</span>
                    <span>PITCH (Y): {tiltCoords.x}°</span>
                  </div>
                  <p className="text-[10px] text-indigo-200">
                    Move cursor across this card to rotate 3D geometry and dynamic specular shine.
                  </p>
                </div>
              </div>
            )}

            {/* Pattern 8: Ripple Wavefront with Ocean Teal Palette */}
            {activeMotion === 'RIPPLE_WAVE' && (
              <div
                onClick={handleRippleClick}
                className="relative overflow-hidden w-80 h-36 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white font-mono text-xs flex flex-col items-center justify-center cursor-pointer shadow-xl border border-teal-300/40 select-none"
              >
                <span className="font-black text-sm tracking-wider">CLICK ANYWHERE TO SPAWN WAVE</span>
                <span className="text-[10px] text-teal-200 mt-1">Wavefront expands from exact click coordinates</span>

                {ripples.map((r) => (
                  <span
                    key={r.id}
                    style={{
                      left: `${r.x}px`,
                      top: `${r.y}px`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-teal-200/80 pointer-events-none animate-ping duration-700"
                  />
                ))}
              </div>
            )}

            {/* Pattern 9: Kinetic Odometer Ticker with Mint Green Palette */}
            {activeMotion === 'KINETIC_ODOMETER' && (
              <div className="text-center space-y-3 font-mono">
                <div className="text-[10px] text-emerald-800 uppercase font-black tracking-widest">
                  LIVE TELEMETRY ODOTICKER
                </div>
                <div
                  key={triggerKey}
                  className="text-5xl sm:text-6xl font-black text-emerald-950 tabular-nums tracking-tight animate-in zoom-in-90 duration-200"
                  style={{ textShadow: '0 4px 12px rgba(16, 185, 129, 0.25)' }}
                >
                  ${counter.toLocaleString()}
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={trigger}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs active:translate-y-0.5"
                  >
                    + Rapid Increment
                  </button>
                  <button
                    onClick={() => { sound.playClick(0.8); setCounter(18420); }}
                    className="px-3 py-1.5 bg-white text-emerald-800 border border-emerald-300 text-xs font-bold rounded-xl cursor-pointer hover:bg-emerald-50"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {/* Pattern 10: Sheet Off-Canvas with Coral Orange Palette */}
            {activeMotion === 'SHEET_OFFCANVAS' && (
              <div className="w-full max-w-sm flex flex-col items-center gap-3 font-mono text-xs">
                <button
                  onClick={trigger}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold cursor-pointer shadow-md active:translate-y-0.5"
                >
                  {isToggled ? 'Close Drawer ✕' : 'Slide Parameter Sheet →'}
                </button>
                <div
                  style={{
                    transition: `transform ${320 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    transform: isToggled ? 'translateX(0)' : 'translateX(110%)',
                  }}
                  className="p-4 bg-white border-2 border-orange-300 rounded-2xl shadow-xl w-full space-y-2"
                >
                  <div className="flex items-center justify-between border-b pb-1.5 border-orange-100">
                    <span className="font-black text-orange-950">Off-Canvas Parameters</span>
                    <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 text-[9px] font-bold">DRAWER</span>
                  </div>
                  <p className="text-[11px] text-[#77736B]">
                    Slides smoothly from the viewport edge with spatial damping. Maintains workflow context.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button onClick={trigger} className="px-3 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-lg cursor-pointer">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Pattern 11: Accordion Height Reveal with Sapphire Palette */}
            {activeMotion === 'ACCORDION_HEIGHT' && (
              <div className="w-full max-w-md bg-white border border-blue-200 rounded-2xl overflow-hidden font-mono text-xs shadow-md">
                <div
                  onClick={trigger}
                  className="p-3.5 flex items-center justify-between cursor-pointer bg-blue-50/70 hover:bg-blue-100/70 transition-colors border-b border-blue-100"
                >
                  <span className="font-black text-blue-950">Technical Architecture Specifications</span>
                  <ChevronDown
                    className={`w-4 h-4 text-blue-600 transition-transform duration-300 ${
                      isToggled ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isToggled ? '1fr' : '0fr',
                    transition: `grid-template-rows ${320 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                  }}
                >
                  <div className="overflow-hidden p-4 text-[11px] text-blue-900 leading-relaxed bg-white space-y-2">
                    <p>
                      Buttery smooth zero-jank height expansion powered by modern CSS Grid interpolation (0fr → 1fr) rather than brittle fixed maxHeight approximations.
                    </p>
                    <div className="flex gap-2 text-[10px] font-bold">
                      <span className="text-emerald-700">✓ No fixed pixel limit</span>
                      <span className="text-blue-700">✓ 60fps GPU Composited</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pattern 12: SVG Path Icon Morph with Fuchsia Palette */}
            {activeMotion === 'SVG_ICON_MORPH' && (
              <div className="text-center space-y-3 font-mono">
                <button
                  onClick={trigger}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-pink-600 text-white flex items-center justify-center cursor-pointer shadow-lg mx-auto transition-transform active:scale-90 border border-fuchsia-400"
                >
                  {morphState === 0 && <Menu className="w-7 h-7 transition-all rotate-0 duration-300" />}
                  {morphState === 1 && <X className="w-7 h-7 transition-all rotate-90 duration-300" />}
                  {morphState === 2 && <Check className="w-7 h-7 transition-all rotate-180 duration-300" />}
                  {morphState === 3 && <ArrowRight className="w-7 h-7 transition-all rotate-270 duration-300" />}
                </button>
                <div className="space-y-1">
                  <div className="text-xs font-black text-fuchsia-950">
                    STATE {morphState + 1}/4: {['MENU HAMBURGER', 'CLOSE X', 'VERIFIED CHECK', 'DIRECTIONAL ARROW'][morphState]}
                  </div>
                  <div className="text-[10px] text-fuchsia-800">
                    Click icon to cycle through rotational SVG state transitions
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Physics Spec Breakdown Footer */}
          <div
            className="pt-2.5 border-t font-mono text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#77736B]"
            style={{ borderColor: current.accentBorder }}
          >
            <span className="text-[#11100E] font-medium">{current.physicsDesc}</span>
            <span className="font-black shrink-0" style={{ color: current.accent }}>
              UX GOAL: {current.uxPurpose}
            </span>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Animation that explains state is UX. Animation that decorates is noise.</span>
        <span>14 / 26</span>
      </div>

      <style>{`
        @keyframes springPop {
          0% { opacity: 0; transform: scale(0.85) translateY(14px); }
          65% { transform: scale(1.05) translateY(-3px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideUpCascade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .skeleton-pulse {
          background: linear-gradient(90deg, #E0F2FE 25%, #BAE6FD 50%, #E0F2FE 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};
