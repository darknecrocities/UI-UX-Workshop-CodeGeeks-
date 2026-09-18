import React, { useState, useRef, useEffect } from 'react';
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
  Sparkles,
  RotateCw,
  Wand2,
  Flashlight,
  Play,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   TYPE DEFINITIONS
───────────────────────────────────────────────────────────── */

type TabMode = 'TRANSITIONS' | 'MICRO_PHYSICS';

type TransitionType =
  | 'COLOR_SHIFT'
  | 'POLKADOT_SPOTLIGHT'
  | 'SPACETIME_WARP'
  | 'CURTAIN_SLICES'
  | 'CIRCLE_PORTAL'
  | 'ORIGAMI_CUBE'
  | 'CYBER_GLITCH'
  | 'DITHER_DISSOLVE'
  | 'PARALLAX_SWEEP'
  | 'DYNAMIC_ISLAND';

interface TransitionSpec {
  id: TransitionType;
  title: string;
  category: string;
  tagline: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  webUsage: string;
  physicsDesc: string;
}

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

interface OrigamiFace {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  metric: string;
  bg: string;
  border: string;
  tagBg: string;
  dotColor: string;
  transform: string;
}

const ORIGAMI_FACES: OrigamiFace[] = [
  {
    id: 0,
    badge: '01 // VELOCITY',
    title: 'ISSUE PIPELINE',
    subtitle: 'Linear Cadence & Sync',
    metric: '42ms Latency · Realtime Sync',
    bg: 'from-[#0F172A] via-[#1E1B4B] to-[#312E81]',
    border: 'border-indigo-400/50',
    tagBg: 'bg-indigo-500/20 text-indigo-200 border border-indigo-400/30',
    dotColor: '#818CF8',
    transform: 'rotateY(0deg) translateZ(100px)',
  },
  {
    id: 1,
    badge: '02 // COMPUTE',
    title: 'SERVERLESS EDGE',
    subtitle: 'Global Vercel Mesh',
    metric: '0ms Cold Start · 32 Regions',
    bg: 'from-[#022C22] via-[#064E3B] to-[#047857]',
    border: 'border-emerald-400/50',
    tagBg: 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30',
    dotColor: '#34D399',
    transform: 'rotateY(90deg) translateZ(100px)',
  },
  {
    id: 2,
    badge: '03 // LEDGER',
    title: 'FINANCIAL ROUTE',
    subtitle: 'Stripe Autonomous Books',
    metric: '$2.4B Volume · 99.999% SLA',
    bg: 'from-[#451A03] via-[#78350F] to-[#B45309]',
    border: 'border-amber-400/50',
    tagBg: 'bg-amber-500/20 text-amber-200 border border-amber-400/30',
    dotColor: '#FBBF24',
    transform: 'rotateY(180deg) translateZ(100px)',
  },
  {
    id: 3,
    badge: '04 // GRAPHICS',
    title: 'METAL 3 SHADER',
    subtitle: 'Apple 120 FPS Rasterizer',
    metric: '120 FPS GPU · Metal API',
    bg: 'from-[#18181B] via-[#27272A] to-[#3F3F46]',
    border: 'border-slate-400/50',
    tagBg: 'bg-slate-500/20 text-slate-200 border border-slate-400/30',
    dotColor: '#E2E8F0',
    transform: 'rotateY(270deg) translateZ(100px)',
  },
];

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */

export const Slide13Motion: React.FC = () => {
  // Navigation & Mode
  const [activeTab, setActiveTab] = useState<TabMode>('TRANSITIONS');
  const [speed, setSpeed] = useState<number>(1); // 0.5x, 1x, 2x

  // 10 Transitions State
  const [activeTransition, setActiveTransition] = useState<TransitionType>('COLOR_SHIFT');
  const [transTriggerKey, setTransTriggerKey] = useState<number>(0);
  const [isTransToggled, setIsTransToggled] = useState<boolean>(false);

  // Transition Specific States
  const [colorPaletteIdx, setColorPaletteIdx] = useState<number>(0);
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number }>({ x: 280, y: 110 });
  const [spotlightRadius, setSpotlightRadius] = useState<number>(150);
  const [isAutoSweep, setIsAutoSweep] = useState<boolean>(false);
  const [isWarpActive, setIsWarpActive] = useState<boolean>(false);
  const [cubeRotation, setCubeRotation] = useState<number>(0);
  const [isCubeAutoRotate, setIsCubeAutoRotate] = useState<boolean>(false);
  const [isCubeTilt, setIsCubeTilt] = useState<boolean>(true);
  const [portalOrigin, setPortalOrigin] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isGlitching, setIsGlitching] = useState<boolean>(false);
  const [parallaxOffset, setParallaxOffset] = useState<number>(0);
  const [ditherResolution, setDitherResolution] = useState<number>(8);
  const [isIslandExpanded, setIsIslandExpanded] = useState<boolean>(false);

  // 12 Micro-Physics State
  const [activeMotion, setActiveMotion] = useState<MotionType>('SPRING_ENTER');
  const [physicsTriggerKey, setPhysicsTriggerKey] = useState<number>(0);
  const [isPhysicsToggled, setIsPhysicsToggled] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(18420);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [morphState, setMorphState] = useState<number>(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Refs
  const spotlightContainerRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLButtonElement>(null);
  const [magneticOffset, setMagneticOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [magneticDistance, setMagneticDistance] = useState<number>(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [tiltCoords, setTiltCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  /* ─────────────────────────────────────────────────────────────
     10 PREMIUM WEBSITE TRANSITIONS SPECS
  ───────────────────────────────────────────────────────────── */
  const transitions: TransitionSpec[] = [
    {
      id: 'COLOR_SHIFT',
      title: '1. Liquid Color Morph',
      category: 'CHROMATIC FLUID',
      tagline: 'Morphing palettes & liquid wave',
      accent: '#2563EB',
      accentBg: '#EFF6FF',
      accentBorder: '#BFDBFE',
      webUsage: 'Apple Keynote, Stripe Atlas, Linear Season releases',
      physicsDesc: 'Seamless chromatic interpolation with dynamic liquid wave displacement wash.',
    },
    {
      id: 'POLKADOT_SPOTLIGHT',
      title: '2. Polkadot Spotlight',
      category: 'RADIAL HALFMASK',
      tagline: 'Cursor-following luminous halftone',
      accent: '#F59E0B',
      accentBg: '#FFFBEB',
      accentBorder: '#FDE68A',
      webUsage: 'Vercel Ship, GitHub Universe, Raycast Pro',
      physicsDesc: 'Halftone dot grid where cursor spotlight scales dots and inverts luminance in real-time.',
    },
    {
      id: 'SPACETIME_WARP',
      title: '3. Spacetime Warp',
      category: 'HYPERSPACE TUNNEL',
      tagline: 'Perspective depth stretch & snap',
      accent: '#8B5CF6',
      accentBg: '#F5F3FF',
      accentBorder: '#DDD6FE',
      webUsage: 'Awwwards Site of the Year, Midjourney showcase, Solana Breakpoint',
      physicsDesc: 'Z-axis perspective zoom with radial chromatic streak lines and elastic destination snap.',
    },
    {
      id: 'CURTAIN_SLICES',
      title: '4. Curtain Slices',
      category: 'STAGGERED SHUTTER',
      tagline: 'Multi-column staggered blinds wipe',
      accent: '#0D9488',
      accentBg: '#F0FDFA',
      accentBorder: '#99F6E4',
      webUsage: 'Locomotive Agency, Gucci Cruise, Balenciaga Editorial',
      physicsDesc: '5 vertical column blades staggered by 35ms delta offset with directional drop-shadows.',
    },
    {
      id: 'CIRCLE_PORTAL',
      title: '5. Circle Portal Wipe',
      category: 'MAGNETIC EXPAND',
      tagline: 'Radial clip-path from click point',
      accent: '#EC4899',
      accentBg: '#FDF2F8',
      accentBorder: '#FBCFE8',
      webUsage: 'Spotify Wrapped, Framer gallery, Airbnb Experiences',
      physicsDesc: 'clip-path: circle(0% at x y) expands to 150% with organic spring cubic-bezier.',
    },
    {
      id: 'ORIGAMI_CUBE',
      title: '6. 3D Origami Cube',
      category: 'VOLUMETRIC REVOLVE',
      tagline: '3D perspective box face flip',
      accent: '#6366F1',
      accentBg: '#EEF2FF',
      accentBorder: '#C7D2FE',
      webUsage: 'Stripe Press, Figma Config, Teenage Engineering',
      physicsDesc: 'perspective(1200px) rotateY(90deg) with realistic cast shadows and specular glass sheen.',
    },
    {
      id: 'CYBER_GLITCH',
      title: '7. Cyber Glitch Slice',
      category: 'CRT RASTER SCAN',
      tagline: 'RGB chromatic shift & jitter',
      accent: '#06B6D4',
      accentBg: '#ECFEFF',
      accentBorder: '#A5F3FC',
      webUsage: 'Cyberpunk 2077, Off-White, Nothing OS launch',
      physicsDesc: 'Horizontal scanline raster displacement, RGB chromatic aberration split, and digital noise.',
    },
    {
      id: 'DITHER_DISSOLVE',
      title: '8. Dither Matrix Wipe',
      category: 'ALGORITHMIC DITHER',
      tagline: 'Ordered Bayer diamond grain fade',
      accent: '#10B981',
      accentBg: '#ECFDF5',
      accentBorder: '#A7F3D0',
      webUsage: 'Playdate OS, Teenage Engineering OP-1, Retro-brutalist studios',
      physicsDesc: 'Algorithmic 8-bit halftone matrix cross-fade that dissolves geometric layout cleanly.',
    },
    {
      id: 'PARALLAX_SWEEP',
      title: '9. Parallax Depth Sweep',
      category: 'MULTI-PLANE MIGRATION',
      tagline: '3-layer velocity depth separation',
      accent: '#EA580C',
      accentBg: '#FFF7ED',
      accentBorder: '#FFEDD5',
      webUsage: 'Apple Mac Pro, Porsche Taycan digital experience, Pitch keynote',
      physicsDesc: 'Independent multi-plane translation (Background 0.3x, Midground 0.7x, Foreground 1.2x).',
    },
    {
      id: 'DYNAMIC_ISLAND',
      title: '10. Dynamic Island Morph',
      category: 'FLUID ENCLOSURE',
      tagline: 'Pill capsule to hero card morph',
      accent: '#11100E',
      accentBg: '#F5F1E8',
      accentBorder: '#E9E1D3',
      webUsage: 'Apple iOS Dynamic Island, Linear quick actions, Raycast HUD',
      physicsDesc: 'Fluid spring interpolation from 40px floating pill (rounded-full) to 220px expanded card.',
    },
  ];

  /* ─────────────────────────────────────────────────────────────
     12 MICRO-PHYSICS MODELS (PRESERVED & ENHANCED)
  ───────────────────────────────────────────────────────────── */
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

  const currentTrans = transitions.find((t) => t.id === activeTransition) || transitions[0];
  const currentMotion = motions.find((m) => m.id === activeMotion) || motions[0];

  /* ─────────────────────────────────────────────────────────────
     INTERACTION HANDLERS
  ───────────────────────────────────────────────────────────── */

  const triggerTransition = () => {
    sound.playTap();
    setTransTriggerKey((k) => k + 1);
    setIsTransToggled((prev) => !prev);

    if (activeTransition === 'COLOR_SHIFT') {
      setColorPaletteIdx((prev) => (prev + 1) % 4);
    } else if (activeTransition === 'SPACETIME_WARP') {
      setIsWarpActive(true);
      setTimeout(() => setIsWarpActive(false), 900 / speed);
    } else if (activeTransition === 'ORIGAMI_CUBE') {
      setCubeRotation((r) => r - 90);
    } else if (activeTransition === 'CYBER_GLITCH') {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 700 / speed);
    } else if (activeTransition === 'PARALLAX_SWEEP') {
      setParallaxOffset((p) => (p === 0 ? -160 : 0));
    } else if (activeTransition === 'DYNAMIC_ISLAND') {
      setIsIslandExpanded((e) => !e);
    }
  };

  const triggerPhysics = () => {
    sound.playTap();
    setIsPhysicsToggled((prev) => !prev);
    setPhysicsTriggerKey((k) => k + 1);
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

  // Spotlight mouse/pointer handler
  const handleSpotlightMove = (e: React.MouseEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>) => {
    if (!spotlightContainerRef.current) return;
    const rect = spotlightContainerRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  // Auto-sweep effect when enabled
  useEffect(() => {
    if (!isAutoSweep || activeTransition !== 'POLKADOT_SPOTLIGHT') return;
    let animId: number;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;
      const width = spotlightContainerRef.current?.clientWidth || 560;
      const height = spotlightContainerRef.current?.clientHeight || 240;
      const x = width / 2 + Math.sin(elapsed * 1.5) * (width * 0.32);
      const y = height / 2 + Math.cos(elapsed * 1.1) * (height * 0.2);
      setSpotlightPos({ x: Math.round(x), y: Math.round(y) });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSweep, activeTransition]);

  // Auto-rotate effect for 3D Origami Cube
  useEffect(() => {
    if (!isCubeAutoRotate || activeTransition !== 'ORIGAMI_CUBE') return;
    const interval = setInterval(() => {
      setCubeRotation((r) => r - 90);
    }, 2200 / speed);
    return () => clearInterval(interval);
  }, [isCubeAutoRotate, activeTransition, speed]);

  const currentCubeFace = ((-Math.round(cubeRotation / 90) % 4) + 4) % 4;

  const goToCubeFace = (targetIdx: number) => {
    sound.playClick(1.2);
    let diff = targetIdx - currentCubeFace;
    if (diff > 2) diff -= 4;
    if (diff < -2) diff += 4;
    setCubeRotation((prev) => prev - diff * 90);
  };

  // Portal wipe click
  const handlePortalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    sound.playTap();
    const rect = e.currentTarget.getBoundingClientRect();
    setPortalOrigin({
      x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
    });
    setTransTriggerKey((k) => k + 1);
    setIsTransToggled((t) => !t);
  };

  // Magnetic button handler
  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magneticBtnRef.current) return;
    const rect = magneticBtnRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    setMagneticDistance(Math.round(dist));

    if (dist < 160) {
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

  // Parallax 3D tilt tracking
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
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
    setTiltStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 350ms ease-out',
    });
    setTiltCoords({ x: 0, y: 0 });
    setGlarePos({ x: 50, y: 50 });
  };

  // Color Morph Palettes
  const palettes = [
    { name: 'Obsidian & Hyper-Violet', bg: 'from-[#0B0F19] via-[#1E1B4B] to-[#4338CA]', text: '#FFFFFF', sub: '#A5B4FC', badge: '#818CF8' },
    { name: 'Sunset Coral & Amber',   bg: 'from-[#7F1D1D] via-[#C2410C] to-[#F59E0B]', text: '#FFFFFF', sub: '#FED7AA', badge: '#FDBA74' },
    { name: 'Cyber Matrix & Mint',    bg: 'from-[#022C22] via-[#065F46] to-[#10B981]', text: '#FFFFFF', sub: '#A7F3D0', badge: '#6EE7B7' },
    { name: 'Electric Cobalt & Cyan', bg: 'from-[#0C4A6E] via-[#0284C7] to-[#38BDF8]', text: '#FFFFFF', sub: '#BAE6FD', badge: '#7DD3FC' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-7 md:p-8 max-w-7xl mx-auto select-none">
      {/* ─────────────────────────────────────────────────────────────
          SLIDE HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shadow-xs transition-colors"
            style={{
              background: activeTab === 'TRANSITIONS' ? currentTrans.accent : currentMotion.accent,
              color: 'white',
            }}
          >
            {activeTab === 'TRANSITIONS' ? <Wand2 className="w-4 h-4" /> : <Activity className="w-4 h-4 animate-pulse" />}
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
              14 / Motion Physics & Website Transitions
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-bold text-xs text-[#11100E]">
                {activeTab === 'TRANSITIONS' ? currentTrans.title : currentMotion.title}
              </span>
              <span
                className="px-2 py-0.5 rounded-full font-mono text-[9px] font-bold"
                style={{
                  background: activeTab === 'TRANSITIONS' ? currentTrans.accentBg : currentMotion.accentBg,
                  color: activeTab === 'TRANSITIONS' ? currentTrans.accent : currentMotion.accent,
                  border: `1px solid ${activeTab === 'TRANSITIONS' ? currentTrans.accentBorder : currentMotion.accentBorder}`,
                }}
              >
                {activeTab === 'TRANSITIONS' ? currentTrans.category : currentMotion.category}
              </span>
            </div>
          </div>
        </div>

        {/* Tab & Controls Bar */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Primary View Switcher: Transitions vs Micro-Physics */}
          <div className="flex items-center gap-1 bg-[#E9E1D3] p-1 rounded-xl border border-[#11100E]/20">
            <button
              onClick={() => { sound.playClick(1.1); setActiveTab('TRANSITIONS'); }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'TRANSITIONS'
                  ? 'bg-[#11100E] text-white shadow-xs'
                  : 'text-[#11100E] hover:bg-black/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>10 WEBSITE TRANSITIONS</span>
            </button>
            <button
              onClick={() => { sound.playClick(1.1); setActiveTab('MICRO_PHYSICS'); }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'MICRO_PHYSICS'
                  ? 'bg-[#11100E] text-white shadow-xs'
                  : 'text-[#11100E] hover:bg-black/5'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>12 MICRO-PHYSICS</span>
            </button>
          </div>

          {/* Speed Toggle */}
          <div className="flex items-center gap-1 bg-white border border-[#11100E]/20 p-1 rounded-xl shadow-2xs">
            <span className="px-1.5 text-[9px] text-[#77736B] font-bold">SPEED:</span>
            {[
              { s: 0.5, label: '0.5x' },
              { s: 1,   label: '1.0x' },
              { s: 2,   label: '2.0x' },
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

          {/* Primary Action Button */}
          <button
            onClick={activeTab === 'TRANSITIONS' ? triggerTransition : triggerPhysics}
            className="px-3.5 py-1.5 rounded-xl font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-xs active:translate-y-0.5 text-white"
            style={{
              background: activeTab === 'TRANSITIONS' ? currentTrans.accent : currentMotion.accent,
            }}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{activeTab === 'TRANSITIONS' ? 'PLAY TRANSITION' : 'TRIGGER IMPULSE'}</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          VIEW 1: 10 PREMIUM WEBSITE TRANSITIONS
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'TRANSITIONS' ? (
        <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Left: 10 Transition Selectors */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#11100E]">
                WEBSITE TRANSITIONS THAT WOW.
              </h2>
              <p className="mt-0.5 text-xs text-[#77736B] font-medium">
                Signature page and component transitions from world-class design systems (Linear, Apple, Stripe, Awwwards):
              </p>
            </div>

            {/* 10 Transition Badges */}
            <div className="grid grid-cols-2 gap-1.5 max-h-[300px] overflow-y-auto pr-1 font-mono text-[11px]">
              {transitions.map((t) => {
                const isSelected = activeTransition === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      sound.playClick(1.2);
                      setActiveTransition(t.id);
                      setTransTriggerKey((k) => k + 1);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? 'shadow-md border-transparent text-white'
                        : 'bg-white hover:border-[#11100E]/40 text-[#11100E]'
                    }`}
                    style={{
                      background: isSelected ? t.accent : undefined,
                      borderColor: isSelected ? t.accent : '#11100E15',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-white' : 'text-[#11100E]'}`}>
                        {t.title}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full transition-all"
                        style={{ background: isSelected ? '#FFFFFF' : t.accent }}
                      />
                    </div>
                    <div
                      className={`text-[9px] mt-1 line-clamp-1 ${
                        isSelected ? 'text-white/85 font-medium' : 'text-[#77736B]'
                      }`}
                    >
                      {t.tagline}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Provenance Badge */}
            <div className="p-2.5 rounded-xl bg-white border border-[#11100E]/15 font-mono text-[10px] flex items-center justify-between text-[#77736B]">
              <span className="flex items-center gap-1.5 truncate mr-2">
                <span className="w-2 h-2 rounded-full animate-ping shrink-0" style={{ background: currentTrans.accent }} />
                <span className="truncate">SEEN ON: <strong className="text-[#11100E]">{currentTrans.webUsage}</strong></span>
              </span>
              <span className="font-bold text-[#11100E] shrink-0">AWWWARDS CALIBER</span>
            </div>
          </div>

          {/* Right: Live Interactive Transition Showcase Stage */}
          <div
            className="lg:col-span-7 p-5 rounded-2xl border shadow-md flex flex-col justify-between min-h-[360px] relative overflow-hidden transition-all"
            style={{
              background: currentTrans.accentBg,
              borderColor: currentTrans.accentBorder,
            }}
          >
            {/* Stage Header */}
            <div className="flex items-center justify-between border-b pb-2.5 font-mono text-xs" style={{ borderColor: currentTrans.accentBorder }}>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: currentTrans.accent, boxShadow: `0 0 8px ${currentTrans.accent}` }}
                />
                <span className="font-black text-sm text-[#11100E]">{currentTrans.title}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-white font-bold text-[#11100E] shadow-2xs border border-[#11100E]/10">
                  ⚡ DURATION: {Math.round(420 / speed)}ms
                </span>
                <span
                  className="px-2 py-0.5 rounded font-bold"
                  style={{ background: currentTrans.accent, color: 'white' }}
                >
                  60 FPS GPU
                </span>
              </div>
            </div>

            {/* Live Interactive Transition Stage Canvas */}
            <div className={`my-auto py-3 flex items-center justify-center min-h-[240px] relative ${activeTransition === 'ORIGAMI_CUBE' ? 'overflow-visible' : 'overflow-hidden'}`}>
              {/* 1. LIQUID COLOR MORPH */}
              {activeTransition === 'COLOR_SHIFT' && (
                <div className="w-full max-w-md flex flex-col gap-3 font-mono">
                  <div
                    key={transTriggerKey}
                    style={{
                      transition: `all ${450 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }}
                    className={`p-6 rounded-2xl bg-gradient-to-br ${palettes[colorPaletteIdx].bg} text-white shadow-xl relative overflow-hidden border border-white/20`}
                  >
                    {/* Liquid decorative wave ripple */}
                    <div
                      key={colorPaletteIdx}
                      className="absolute inset-0 bg-white/10 pointer-events-none animate-ping duration-700"
                    />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-white/20">
                        {palettes[colorPaletteIdx].name}
                      </span>
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </div>

                    <div className="relative z-10 my-4">
                      <div className="text-2xl font-black tracking-tight leading-none">
                        THE ART OF CHROMATIC FLUIDITY
                      </div>
                      <div className="text-xs mt-1 opacity-80">
                        Liquid gradient color shift with zero layout re-render pop.
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/20 text-[10px]">
                      <span>RGB Delta Interpolation</span>
                      <button
                        onClick={triggerTransition}
                        className="underline font-bold cursor-pointer"
                      >
                        Next Palette →
                      </button>
                    </div>
                  </div>

                  {/* 4 Palette selector dots */}
                  <div className="flex items-center justify-center gap-2">
                    {palettes.map((p, i) => (
                      <button
                        key={p.name}
                        onClick={() => { sound.playClick(1.2); setColorPaletteIdx(i); }}
                        className={`w-5 h-5 rounded-full border-2 transition-all cursor-pointer ${
                          colorPaletteIdx === i ? 'scale-125 border-black' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                        style={{ background: p.badge }}
                        title={p.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 2. POLKADOT SPOTLIGHT / OPTICAL FLASHLIGHT REVEAL */}
              {activeTransition === 'POLKADOT_SPOTLIGHT' && (
                <div
                  ref={spotlightContainerRef}
                  onMouseMove={handleSpotlightMove}
                  onPointerMove={handleSpotlightMove}
                  className="w-full h-56 rounded-2xl bg-[#060911] relative overflow-hidden cursor-crosshair border border-amber-900/40 select-none shadow-2xl"
                >
                  {/* Layer 1: Ambient Darkness with subtle, dim dormant grey dots */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(#475569 1.5px, transparent 1.5px)',
                      backgroundSize: '18px 18px',
                    }}
                  />

                  {/* Layer 2: Flashlight Ambient Light Projection (Smooth full-canvas radial wash with soft feathered edge fade) */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                    style={{
                      background: `radial-gradient(circle ${spotlightRadius * 1.35}px at ${spotlightPos.x}px ${spotlightPos.y}px,
                        rgba(251, 191, 36, 0.40) 0%,
                        rgba(245, 158, 11, 0.25) 28%,
                        rgba(217, 119, 6, 0.12) 52%,
                        rgba(180, 83, 9, 0.04) 75%,
                        rgba(120, 53, 15, 0.01) 90%,
                        transparent 100%)`,
                    }}
                  />

                  {/* Flashlight Optical Diode Center (Hotspot filament) */}
                  <div
                    style={{
                      left: `${spotlightPos.x}px`,
                      top: `${spotlightPos.y}px`,
                    }}
                    className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white pointer-events-none shadow-[0_0_20px_6px_#FDE68A]"
                  />

                  {/* Layer 3: THE SECRET REVEALED UNDER THE FLASHLIGHT (Masked with ultra-soft feathered gaussian edge fade) */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      maskImage: `radial-gradient(circle ${spotlightRadius}px at ${spotlightPos.x}px ${spotlightPos.y}px,
                        rgba(0, 0, 0, 1) 0%,
                        rgba(0, 0, 0, 0.95) 28%,
                        rgba(0, 0, 0, 0.65) 55%,
                        rgba(0, 0, 0, 0.28) 78%,
                        rgba(0, 0, 0, 0.06) 92%,
                        transparent 100%)`,
                      WebkitMaskImage: `radial-gradient(circle ${spotlightRadius}px at ${spotlightPos.x}px ${spotlightPos.y}px,
                        rgba(0, 0, 0, 1) 0%,
                        rgba(0, 0, 0, 0.95) 28%,
                        rgba(0, 0, 0, 0.65) 55%,
                        rgba(0, 0, 0, 0.28) 78%,
                        rgba(0, 0, 0, 0.06) 92%,
                        transparent 100%)`,
                    }}
                  >
                    {/* A. Luminous Glowing Golden Polkadot Matrix revealed by beam */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: 'radial-gradient(#FBBF24 2.8px, transparent 2.8px)',
                        backgroundSize: '18px 18px',
                      }}
                    />

                    {/* B. Hidden Hero Typography & Craft Artwork revealed in the flashlight */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-center px-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/25 border border-amber-300/50 text-amber-200 text-[10px] font-bold tracking-widest uppercase mb-1.5 shadow-[0_0_16px_rgba(245,158,11,0.5)]">
                        <Flashlight className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                        <span>FLASHLIGHT OPTICAL REVEAL</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none uppercase drop-shadow-[0_2px_24px_rgba(245,158,11,0.85)]">
                        TASTE OVER AUTOMATION
                      </div>
                      <div className="text-xs sm:text-sm text-amber-300 font-bold tracking-wider mt-1.5 uppercase drop-shadow">
                        ✦ CRAFT BECOMES UNDENIABLE IN THE LIGHT ✦
                      </div>
                      <p className="text-[11px] text-amber-100/90 max-w-md mt-1 leading-relaxed drop-shadow">
                        Sweep flashlight across darkness to reveal hidden typography, grid alignment & intention.
                      </p>
                    </div>
                  </div>

                  {/* Flashlight Controls Overlay Bar */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-slate-300 z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <Flashlight className="w-3 h-3" />
                        <span>FLASHLIGHT: {spotlightPos.x}px, {spotlightPos.y}px</span>
                      </span>
                      <span className="hidden sm:inline text-slate-500">·</span>
                      <span className="hidden sm:inline text-slate-400">SOFT FEATHER FALLOFF</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          sound.playClick(1.2);
                          setIsAutoSweep((s) => !s);
                        }}
                        className={`px-2 py-0.5 rounded cursor-pointer transition-all flex items-center gap-1 ${
                          isAutoSweep
                            ? 'bg-amber-500 text-black font-black shadow-sm'
                            : 'bg-slate-800/80 text-amber-300 border border-amber-500/30 hover:bg-slate-700'
                        }`}
                      >
                        <RotateCw className={`w-2.5 h-2.5 ${isAutoSweep ? 'animate-spin' : ''}`} />
                        <span>{isAutoSweep ? 'SWEEPING...' : 'AUTO-SWEEP'}</span>
                      </button>

                      <div className="flex items-center gap-1 bg-slate-900/80 p-0.5 rounded border border-slate-700">
                        <span className="px-1 text-slate-400">BEAM:</span>
                        {[100, 150, 210].map((r) => (
                          <button
                            key={r}
                            onClick={() => {
                              sound.playClick(1.1);
                              setSpotlightRadius(r);
                            }}
                            className={`px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                              spotlightRadius === r
                                ? 'bg-amber-500 text-black font-bold'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {r}px
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. SPACETIME WARP */}
              {activeTransition === 'SPACETIME_WARP' && (
                <div className="w-full h-52 rounded-2xl bg-[#030712] relative overflow-hidden flex items-center justify-center border border-purple-900/50">
                  {/* Perspective speed lines / warp grid */}
                  <div
                    className={`absolute inset-0 transition-transform duration-700 ${isWarpActive ? 'scale-150 rotate-6 opacity-100' : 'scale-100 opacity-40'}`}
                    style={{
                      backgroundImage: 'radial-gradient(circle, #8B5CF6 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Warp radial streak lines */}
                  {isWarpActive && (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/30 via-transparent to-black animate-ping" />
                  )}

                  {/* Center Warp Core Card */}
                  <div
                    key={transTriggerKey}
                    style={{
                      animation: isWarpActive
                        ? `warpEffect ${700 / speed}ms cubic-bezier(0.16, 1, 0.3, 1) both`
                        : undefined,
                    }}
                    className="relative z-10 p-6 rounded-2xl bg-gradient-to-br from-[#581C87] to-[#1E1B4B] text-white font-mono text-center border border-purple-400/40 shadow-2xl max-w-sm"
                  >
                    <div className="text-[10px] text-purple-300 font-bold uppercase tracking-widest">
                      HYPERSPACE WARP ENGINES
                    </div>
                    <div className="text-xl font-black mt-1 text-white tracking-wide">
                      {isWarpActive ? 'WARP SPEED 9.8' : 'DESTINATION REACHED'}
                    </div>
                    <div className="text-[10px] text-purple-200 mt-2">
                      Z-axis depth expansion + radial chromatic acceleration
                    </div>
                    <button
                      onClick={triggerTransition}
                      className="mt-3 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-xs font-black cursor-pointer shadow-lg active:scale-95"
                    >
                      ENGAGE HYPERDRIVE ⚡
                    </button>
                  </div>
                </div>
              )}

              {/* 4. CURTAIN SLICES */}
              {activeTransition === 'CURTAIN_SLICES' && (
                <div
                  onClick={triggerTransition}
                  className="w-full max-w-md h-48 rounded-2xl overflow-hidden relative cursor-pointer shadow-xl border border-teal-300 select-none flex"
                >
                  {/* 5 Vertical Staggered Column Blades */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={`${transTriggerKey}-${i}`}
                      style={{
                        animation: isTransToggled
                          ? `curtainOpen ${400 / speed}ms cubic-bezier(0.16, 1, 0.3, 1) both`
                          : `curtainClose ${400 / speed}ms cubic-bezier(0.16, 1, 0.3, 1) both`,
                        animationDelay: `${i * (40 / speed)}ms`,
                      }}
                      className="flex-1 h-full bg-[#0F766E] border-r border-teal-400/30 flex flex-col justify-between p-2 text-white font-mono text-[9px]"
                    >
                      <span className="opacity-60">0{i + 1}</span>
                      <div className="w-1 h-8 bg-teal-300/40 rounded-full mx-auto" />
                      <span className="font-bold opacity-80">BLADE</span>
                    </div>
                  ))}

                  {/* Background Layer Revealed Beneath */}
                  <div className="absolute inset-0 -z-10 bg-[#134E4A] flex flex-col items-center justify-center p-4 font-mono text-center text-white">
                    <div className="text-xl font-black text-teal-100">STAGGERED SLICE REVEAL</div>
                    <div className="text-xs text-teal-300 mt-1">Multi-column blades with sequential time offsets</div>
                    <div className="text-[10px] text-teal-400 mt-2">Click card to toggle shutter wipe ⟷</div>
                  </div>
                </div>
              )}

              {/* 5. CIRCLE PORTAL WIPE */}
              {activeTransition === 'CIRCLE_PORTAL' && (
                <div
                  onClick={handlePortalClick}
                  className="w-full max-w-md h-48 rounded-2xl relative overflow-hidden cursor-pointer shadow-xl border border-pink-300 select-none flex flex-col justify-between p-5 bg-[#831843] text-white font-mono"
                >
                  {/* Bottom default state */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-200">PORTAL WIPE A</span>
                    <span className="px-2 py-0.5 rounded bg-white/20 text-[9px]">CLICK ANYWHERE</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-black">EXPANDING CIRCULAR PORTAL</div>
                    <div className="text-[10px] text-pink-200 mt-1">
                      Originates directly beneath your click coordinate ({portalOrigin.x}%, {portalOrigin.y}%)
                    </div>
                  </div>
                  <div className="text-[9px] text-pink-300 text-right">Click to spawn wipe →</div>

                  {/* Expanding Overlay Layer with circle clip-path */}
                  <div
                    key={transTriggerKey}
                    style={{
                      clipPath: isTransToggled
                        ? `circle(150% at ${portalOrigin.x}% ${portalOrigin.y}%)`
                        : `circle(0% at ${portalOrigin.x}% ${portalOrigin.y}%)`,
                      transition: `clip-path ${500 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-[#DB2777] via-[#9D174D] to-[#4C0519] flex flex-col justify-between p-5 text-white font-mono pointer-events-none"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-yellow-300">PORTAL WIPE B (ACTIVE)</span>
                      <span className="px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-200 text-[9px]">RESOLVED</span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-yellow-300">MAGNETIC INGRESS COMPLETED</div>
                      <div className="text-[10px] text-pink-100 mt-1">Full viewport flood without hard edge jump</div>
                    </div>
                    <div className="text-[9px] text-pink-200 text-right">Apple Keynote & Stripe Pattern</div>
                  </div>
                </div>
              )}

              {/* 6. 3D ORIGAMI CUBE */}
              {activeTransition === 'ORIGAMI_CUBE' && (
                <div className="w-full flex flex-col items-center justify-center font-mono py-1 select-none">
                  {/* 3D Perspective Stage */}
                  <div
                    style={{
                      perspective: '1100px',
                      perspectiveOrigin: '50% 45%',
                    }}
                    className="w-[200px] h-[150px] relative flex items-center justify-center"
                  >
                    {/* Rotating 3D Cuboid Box (Mounted continuously without key reset for smooth 60fps GPU transition) */}
                    <div
                      onClick={() => {
                        sound.playTap();
                        setCubeRotation((r) => r - 90);
                      }}
                      style={{
                        width: '200px',
                        height: '150px',
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        transform: `rotateX(${isCubeTilt ? -14 : 0}deg) rotateY(${cubeRotation}deg)`,
                        transition: `transform ${550 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                      }}
                      className="cursor-pointer group"
                      title="Click cube to rotate to next face (90°)"
                    >
                      {/* 4 Lateral Origami Faces */}
                      {ORIGAMI_FACES.map((face) => (
                        <div
                          key={face.id}
                          style={{
                            transform: face.transform,
                            backfaceVisibility: 'hidden',
                          }}
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${face.bg} text-white p-3.5 flex flex-col justify-between shadow-2xl ${face.border} border transition-all`}
                        >
                          {/* Origami diagonal fold sheen */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/12 via-transparent to-transparent pointer-events-none rounded-2xl" />

                          <div className="relative z-10 flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase ${face.tagBg}`}>
                              {face.badge}
                            </span>
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: face.dotColor, boxShadow: `0 0 8px ${face.dotColor}` }}
                            />
                          </div>

                          <div className="relative z-10 text-center my-auto">
                            <div className="text-base font-black tracking-tight leading-tight uppercase drop-shadow-sm">
                              {face.title}
                            </div>
                            <div className="text-[9px] text-white/80 font-mono mt-0.5">
                              {face.subtitle}
                            </div>
                          </div>

                          <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-white/70 border-t border-white/10 pt-1.5">
                            <span>{face.metric}</span>
                            <span className="font-bold text-white/90">FACE #{face.id + 1}</span>
                          </div>
                        </div>
                      ))}

                      {/* Top Lid: Origami Folded Cap */}
                      <div
                        style={{
                          width: '200px',
                          height: '200px',
                          position: 'absolute',
                          left: '0',
                          top: '-25px',
                          transform: 'rotateX(90deg) translateZ(75px)',
                          backfaceVisibility: 'hidden',
                        }}
                        className="rounded-2xl bg-[#090D16] border border-white/15 flex items-center justify-center p-2 shadow-inner"
                      >
                        <div className="w-full h-full rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center text-[8px] font-mono text-slate-400 bg-gradient-to-br from-white/5 to-transparent">
                          <span className="text-amber-300 font-bold">✦ ORIGAMI 3D AXIS ✦</span>
                          <span className="text-[7px] text-slate-500 mt-0.5">VOLUMETRIC FOLD</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Ground Ambient Contact Shadow */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-24px',
                        left: '50%',
                        width: '180px',
                        height: '20px',
                        transform: 'translateX(-50%)',
                        borderRadius: '100%',
                        background: 'radial-gradient(ellipse, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.12) 50%, transparent 70%)',
                        filter: 'blur(5px)',
                      }}
                      className="pointer-events-none"
                    />
                  </div>

                  {/* Interactive Controls Bar */}
                  <div className="mt-5 flex flex-col items-center gap-2 w-full max-w-md">
                    {/* Face Quick Selector Tabs */}
                    <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700 shadow-md">
                      {ORIGAMI_FACES.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => goToCubeFace(f.id)}
                          className={`px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold transition-all cursor-pointer ${
                            currentCubeFace === f.id
                              ? 'bg-amber-500 text-black shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800'
                          }`}
                        >
                          Face {f.id + 1}: {f.title.split(' ')[0]}
                        </button>
                      ))}
                    </div>

                    {/* Action Controls: Prev, Next, Auto-Rotate, 3D Tilt */}
                    <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono">
                      <button
                        onClick={() => {
                          sound.playClick(1.1);
                          setCubeRotation((r) => r + 90);
                        }}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-600 cursor-pointer shadow-xs active:scale-95 flex items-center gap-1"
                      >
                        <span>← Prev (90°)</span>
                      </button>

                      <button
                        onClick={() => {
                          sound.playTap();
                          setCubeRotation((r) => r - 90);
                        }}
                        className="px-3.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Flip Next (90° →)</span>
                      </button>

                      <button
                        onClick={() => {
                          sound.playClick(1.2);
                          setIsCubeAutoRotate((a) => !a);
                        }}
                        className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all flex items-center gap-1 border ${
                          isCubeAutoRotate
                            ? 'bg-amber-500 text-black border-amber-400 font-bold'
                            : 'bg-slate-800 text-amber-300 border-amber-500/30 hover:bg-slate-700'
                        }`}
                      >
                        <Play className={`w-2.5 h-2.5 ${isCubeAutoRotate ? 'fill-current' : ''}`} />
                        <span>{isCubeAutoRotate ? 'AUTO: ON' : 'AUTO-FLIP'}</span>
                      </button>

                      <button
                        onClick={() => {
                          sound.playClick(1.0);
                          setIsCubeTilt((t) => !t);
                        }}
                        className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all border ${
                          isCubeTilt
                            ? 'bg-slate-700 text-white border-slate-500 font-bold'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        <span>3D TILT: {isCubeTilt ? '-14°' : '0°'}</span>
                      </button>
                    </div>

                    <div className="text-[9px] text-slate-500 font-mono flex items-center gap-2">
                      <span>ROTATION: {cubeRotation}°</span>
                      <span>·</span>
                      <span className="text-amber-600 font-bold">ACTIVE: FACE #{currentCubeFace + 1} ({ORIGAMI_FACES[currentCubeFace].title})</span>
                      <span>·</span>
                      <span>CLICK CUBE OR USE BUTTONS</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. CYBER GLITCH */}
              {activeTransition === 'CYBER_GLITCH' && (
                <div className="w-full max-w-md space-y-3 font-mono">
                  <div
                    className={`relative p-5 rounded-2xl bg-[#080E1A] text-white border border-cyan-500/40 overflow-hidden shadow-xl ${
                      isGlitching ? 'glitch-active' : ''
                    }`}
                  >
                    {/* CRT Scanline Overlay */}
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.8) 2px, rgba(6, 182, 212, 0.8) 4px)',
                      }}
                    />

                    <div className="relative z-10 flex items-center justify-between text-[10px] text-cyan-400 border-b border-cyan-900 pb-2">
                      <span className="font-black tracking-widest">CYBER TELEMETRY RASTER</span>
                      <span className="animate-pulse">● SYSTEM RECONFIG</span>
                    </div>

                    <div className="relative z-10 my-3">
                      <div className="text-2xl font-black text-cyan-200 tracking-tight">
                        {isGlitching ? 'ERR_0x4F::REBINDING' : 'SIGNAL NOMINAL · PASS'}
                      </div>
                      <div className="text-xs text-cyan-400/80 mt-1">
                        RGB chromatic aberration split + horizontal slice displace
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between pt-2 border-t border-cyan-900 text-[10px] text-cyan-500">
                      <span>CHANNELS: R(+4px) G(0) B(-4px)</span>
                      <span>STABLE</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={triggerTransition}
                      className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs rounded-xl cursor-pointer shadow-lg active:scale-95"
                    >
                      INJECT GLITCH IMPULSE ⚡
                    </button>
                  </div>
                </div>
              )}

              {/* 8. DITHER MATRIX WIPE */}
              {activeTransition === 'DITHER_DISSOLVE' && (
                <div className="w-full max-w-md flex flex-col items-center gap-3 font-mono">
                  <div
                    onClick={triggerTransition}
                    className="w-full h-44 rounded-2xl bg-[#064E3B] text-white p-5 flex flex-col justify-between cursor-pointer border-2 border-emerald-400 relative overflow-hidden shadow-xl"
                  >
                    {/* Dither pattern overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-30"
                      style={{
                        backgroundImage: `radial-gradient(#A7F3D0 1.5px, transparent 1.5px)`,
                        backgroundSize: `${ditherResolution}px ${ditherResolution}px`,
                      }}
                    />

                    <div className="flex items-center justify-between text-[10px] text-emerald-200">
                      <span className="font-black">BAYER 8-BIT DISSOLVE</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-800">MATRIX {ditherResolution}PX</span>
                    </div>

                    <div className="text-center my-auto">
                      <div className="text-2xl font-black text-emerald-100">
                        RETRO-FUTURIST DITHER
                      </div>
                      <div className="text-xs text-emerald-300 mt-0.5">
                        Pixel ordered dithering with geometric cross-fade
                      </div>
                    </div>

                    <div className="text-[10px] text-emerald-300 flex justify-between">
                      <span>Click to trigger dissolve wipe</span>
                      <span>Teenage Eng & Playdate OS</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-emerald-900">
                    <span>DITHER GRAIN:</span>
                    {[4, 8, 16].map((res) => (
                      <button
                        key={res}
                        onClick={() => setDitherResolution(res)}
                        className={`px-2 py-0.5 rounded cursor-pointer ${ditherResolution === res ? 'bg-emerald-600 text-white font-bold' : 'bg-white border'}`}
                      >
                        {res}px
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 9. PARALLAX DEPTH SWEEP */}
              {activeTransition === 'PARALLAX_SWEEP' && (
                <div className="w-full max-w-md h-48 rounded-2xl bg-[#FFF7ED] border-2 border-orange-300 relative overflow-hidden flex items-center justify-center font-mono select-none">
                  {/* Background Plane (moves slowest: 0.25x) */}
                  <div
                    style={{
                      transform: `translateX(${parallaxOffset * 0.25}px)`,
                      transition: `transform ${600 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }}
                    className="absolute inset-0 opacity-20 pointer-events-none"
                  >
                    <div
                      className="w-[140%] h-full -ml-[20%]"
                      style={{
                        backgroundImage: 'radial-gradient(#EA580C 2px, transparent 2px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                  </div>

                  {/* Midground Plane (moves moderate: 0.65x) */}
                  <div
                    style={{
                      transform: `translateX(${parallaxOffset * 0.65}px)`,
                      transition: `transform ${600 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }}
                    className="absolute text-5xl font-black text-orange-200 tracking-tighter opacity-80 pointer-events-none"
                  >
                    PARALLAX
                  </div>

                  {/* Foreground Plane (moves fastest: 1.2x) */}
                  <div
                    style={{
                      transform: `translateX(${parallaxOffset * 1.2}px)`,
                      transition: `transform ${600 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }}
                    className="relative z-10 p-4 rounded-xl bg-white border border-orange-300 shadow-xl text-center max-w-xs"
                  >
                    <div className="text-[10px] font-black text-orange-600">FOREGROUND HERO CARD</div>
                    <div className="text-sm font-bold text-[#11100E] mt-0.5">3-Plane Velocity Separation</div>
                    <button
                      onClick={triggerTransition}
                      className="mt-2.5 px-3 py-1 rounded-lg bg-orange-500 text-white font-bold text-xs cursor-pointer active:scale-95"
                    >
                      Sweep Layers ⟷
                    </button>
                  </div>
                </div>
              )}

              {/* 10. DYNAMIC ISLAND MORPH */}
              {activeTransition === 'DYNAMIC_ISLAND' && (
                <div className="w-full max-w-md h-52 flex flex-col items-center justify-center font-mono">
                  <div
                    key={transTriggerKey}
                    onClick={triggerTransition}
                    style={{
                      transition: `all ${420 / speed}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
                    }}
                    className={`bg-black text-white shadow-2xl cursor-pointer overflow-hidden flex flex-col justify-between border border-neutral-800 ${
                      isIslandExpanded
                        ? 'w-84 h-44 rounded-3xl p-5'
                        : 'w-48 h-11 rounded-full px-4 py-2 flex-row items-center'
                    }`}
                  >
                    {isIslandExpanded ? (
                      <div className="space-y-3 h-full flex flex-col justify-between animate-in fade-in duration-200">
                        <div className="flex items-center justify-between border-b border-white/15 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-black text-xs">DYNAMIC ISLAND HERO</span>
                          </div>
                          <span className="text-[10px] text-neutral-400">EXPANDED</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            ⌘K
                          </div>
                          <div>
                            <div className="font-bold text-xs text-white">Cluster Nominal 99.98%</div>
                            <div className="text-[10px] text-neutral-400">P99 Latency: 14.2ms steady</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-400">
                          <span>Click anywhere to collapse pill</span>
                          <span className="text-white font-bold">Spring Damped</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-bold text-white">14.2ms</span>
                        </div>
                        <span className="text-[10px] text-neutral-400">Click to expand →</span>
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] font-mono text-[#77736B] mt-3">
                    Fluid pill-to-card geometry morph with mass overshoot (Apple & Linear pattern)
                  </div>
                </div>
              )}
            </div>

            {/* Stage Physics Spec Footer */}
            <div
              className="pt-2.5 border-t font-mono text-[11px] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-[#77736B]"
              style={{ borderColor: currentTrans.accentBorder }}
            >
              <span className="text-[#11100E] font-medium flex-1">{currentTrans.physicsDesc}</span>
              <span className="font-black shrink-0 text-[10px]" style={{ color: currentTrans.accent }}>
                PROVENANCE: {currentTrans.webUsage}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────
           VIEW 2: 12 MICRO-PHYSICS LABORATORY
        ───────────────────────────────────────────────────────────── */
        <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Left Column: 12 Real-Colored Motion Physics Selectors */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#11100E]">
                PHYSICAL MICRO-INTERACTIONS.
              </h2>
              <p className="mt-0.5 text-xs text-[#77736B] font-medium">
                Every animation must reveal state, direction, or mass. Click any pattern to inspect live physics:
              </p>
            </div>

            {/* 12 Motion Tiles */}
            <div className="grid grid-cols-2 gap-1.5 max-h-[300px] overflow-y-auto pr-1 font-mono text-[11px]">
              {motions.map((m) => {
                const isSelected = activeMotion === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      sound.playClick(1.2);
                      setActiveMotion(m.id);
                      setIsPhysicsToggled(false);
                      setPhysicsTriggerKey((k) => k + 1);
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
                <span className="w-2 h-2 rounded-full animate-ping" style={{ background: currentMotion.accent }} />
                <span>FORMULA: <strong className="text-[#11100E] font-mono">{currentMotion.formula}</strong></span>
              </span>
              <span className="font-bold text-[#11100E]">12 PHYSICS MODELS</span>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Physics Sandbox */}
          <div
            className="lg:col-span-7 p-5 rounded-2xl border shadow-md flex flex-col justify-between min-h-[350px] relative overflow-hidden transition-all"
            style={{
              background: currentMotion.accentBg,
              borderColor: currentMotion.accentBorder,
            }}
          >
            {/* Top Status & Live Gauge */}
            <div className="flex items-center justify-between border-b pb-2.5 font-mono text-xs" style={{ borderColor: currentMotion.accentBorder }}>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: currentMotion.accent, boxShadow: `0 0 8px ${currentMotion.accent}` }}
                />
                <span className="font-black text-sm text-[#11100E]">{currentMotion.title}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-white font-bold text-[#11100E] shadow-2xs border border-[#11100E]/10">
                  ⚡ DURATION: {Math.round(350 / speed)}ms
                </span>
                <span
                  className="px-2 py-0.5 rounded font-bold"
                  style={{ background: currentMotion.accent, color: 'white' }}
                >
                  LIVE
                </span>
              </div>
            </div>

            {/* Dynamic Physics Stage */}
            <div className="my-auto py-4 flex items-center justify-center min-h-[190px] relative">
              {/* Pattern 1: Spring Enter */}
              {activeMotion === 'SPRING_ENTER' && (
                <div className="flex flex-col items-center gap-3 w-full max-w-sm">
                  <div
                    key={physicsTriggerKey}
                    style={{
                      animation: `springPop ${380 / speed}ms cubic-bezier(0.34, 1.56, 0.64, 1) both`,
                      boxShadow: '0 12px 28px -6px rgba(37, 99, 235, 0.35)',
                    }}
                    className="w-full p-5 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white font-mono text-xs text-center border border-blue-400/40 relative overflow-hidden"
                  >
                    <div className="text-white font-black text-sm tracking-wide">SPRING INERTIA TRANSIENT</div>
                    <p className="text-blue-100 mt-1 text-[11px]">
                      Stiffness: 280 · Damping: 22 · Mass: 1.0kg
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[10px] bg-blue-900/40 py-1.5 px-3 rounded-xl border border-blue-400/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>NATURAL REBOUND OSCILLATION</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pattern 2: Stagger List Cascade */}
              {activeMotion === 'STAGGER_CASCADE' && (
                <div key={physicsTriggerKey} className="w-full max-w-md space-y-2 font-mono text-xs">
                  {[
                    { title: '01 / Compile TypeScript AST Core', time: '14ms', status: 'VERIFIED' },
                    { title: '02 / Resolve Tailwind Utility Graph', time: '28ms', status: 'VERIFIED' },
                    { title: '03 / Bind Mechanical Sound Bus', time: '42ms', status: 'VERIFIED' },
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
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-black text-[9px]">
                        {step.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Pattern 3: FLIP Layout Morph */}
              {activeMotion === 'FLIP_EXPAND' && (
                <div
                  key={physicsTriggerKey}
                  onClick={triggerPhysics}
                  style={{
                    transition: `all ${420 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    boxShadow: '0 16px 36px -8px rgba(139, 92, 246, 0.35)',
                  }}
                  className={`rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white font-mono cursor-pointer overflow-hidden flex flex-col justify-between border border-violet-400/40 ${
                    isPhysicsToggled ? 'w-96 h-48 p-5' : 'w-56 h-16 p-3.5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs tracking-wider">
                      {isPhysicsToggled ? 'DEVELOPER INSPECTOR (FLIP)' : 'COMPACT AVATAR'}
                    </span>
                    <Maximize2 className={`w-4 h-4 transition-transform duration-300 ${isPhysicsToggled ? 'rotate-180' : ''}`} />
                  </div>
                  {isPhysicsToggled ? (
                    <p className="text-[11px] text-violet-100 leading-snug">
                      FLIP interpolates bounding rectangles smoothly across states without DOM recalculation glitches.
                    </p>
                  ) : (
                    <span className="text-[10px] text-violet-200">Click to morph card →</span>
                  )}
                </div>
              )}

              {/* Pattern 4: Magnetic Cursor */}
              {activeMotion === 'MAGNETIC_CURSOR' && (
                <div
                  onMouseMove={handleMagneticMove}
                  className="w-full h-44 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/50 flex flex-col items-center justify-center gap-2 relative cursor-crosshair"
                >
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

              {/* Pattern 5: Skeleton Pulse Wave */}
              {activeMotion === 'SKELETON_SHIMMER' && (
                <div className="w-full max-w-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-sky-900">
                      {isLoaded ? '✓ ASYNC DATA RESOLVED' : 'FETCHING TELEMETRY...'}
                    </span>
                    <button
                      onClick={triggerPhysics}
                      className="px-2.5 py-1 rounded bg-sky-600 text-white font-mono text-[10px] font-bold cursor-pointer"
                    >
                      {isLoaded ? 'Reset to Skeleton' : 'Simulate Data Return'}
                    </button>
                  </div>
                  {isLoaded ? (
                    <div className="p-4 rounded-2xl bg-white border border-sky-200 shadow-md space-y-2">
                      <div className="font-bold text-xs text-[#11100E]">Frankfurt Edge Node #4092</div>
                      <div className="text-xl font-black text-sky-900 font-mono">1.42 Gbps / 4ms</div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-md space-y-2.5">
                      <div className="h-4 bg-sky-100 rounded-full w-3/4 skeleton-pulse" />
                      <div className="h-4 bg-sky-100 rounded-full w-full skeleton-pulse" />
                    </div>
                  )}
                </div>
              )}

              {/* Pattern 6: Scale Bounce Press */}
              {activeMotion === 'SCALE_BOUNCE' && (
                <div className="text-center space-y-3">
                  <button
                    onClick={() => sound.playSwitchPress(1.2)}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-b from-[#EF4444] to-[#DC2626] text-white font-mono text-sm font-black border-2 border-red-400 shadow-[0_6px_0_0_#991B1B] active:shadow-[0_1px_0_0_#991B1B] active:translate-y-1.5 active:scale-[0.96] transition-all cursor-pointer"
                  >
                    PRESS ME (TACTILE HAMMER)
                  </button>
                  <div className="font-mono text-[10px] text-red-900">
                    Physical depression: 60ms contraction + shadow collapse
                  </div>
                </div>
              )}

              {/* Pattern 7: 3D Perspective Tilt */}
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
                  <div className="relative z-10">
                    <div className="text-xs uppercase tracking-widest text-indigo-200 font-bold">
                      VOLUMETRIC GYRO TILT
                    </div>
                    <div className="text-xl font-black text-white mt-1">PERSPECTIVE 800PX</div>
                    <div className="mt-3 py-2 px-3 bg-white/10 rounded-xl text-[10px] text-indigo-100 flex justify-between">
                      <span>ROLL (X): {tiltCoords.y}°</span>
                      <span>PITCH (Y): {tiltCoords.x}°</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pattern 8: Ripple Wavefront */}
              {activeMotion === 'RIPPLE_WAVE' && (
                <div
                  onClick={(e) => {
                    sound.playTap();
                    const rect = e.currentTarget.getBoundingClientRect();
                    setRipples((prev) => [...prev.slice(-3), { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top }]);
                  }}
                  className="relative overflow-hidden w-80 h-36 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white font-mono text-xs flex flex-col items-center justify-center cursor-pointer shadow-xl border border-teal-300/40"
                >
                  <span className="font-black text-sm tracking-wider">CLICK ANYWHERE FOR RIPPLE</span>
                  {ripples.map((r) => (
                    <span
                      key={r.id}
                      style={{ left: `${r.x}px`, top: `${r.y}px` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-teal-200/80 pointer-events-none animate-ping duration-700"
                    />
                  ))}
                </div>
              )}

              {/* Pattern 9: Kinetic Odometer */}
              {activeMotion === 'KINETIC_ODOMETER' && (
                <div className="text-center space-y-3 font-mono">
                  <div className="text-5xl sm:text-6xl font-black text-emerald-950 tabular-nums tracking-tight">
                    ${counter.toLocaleString()}
                  </div>
                  <button
                    onClick={triggerPhysics}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    + Rapid Increment
                  </button>
                </div>
              )}

              {/* Pattern 10: Sheet Off-Canvas */}
              {activeMotion === 'SHEET_OFFCANVAS' && (
                <div className="w-full max-w-sm flex flex-col items-center gap-3 font-mono text-xs">
                  <button
                    onClick={triggerPhysics}
                    className="px-5 py-2.5 bg-orange-600 text-white rounded-xl font-bold cursor-pointer"
                  >
                    {isPhysicsToggled ? 'Close Drawer ✕' : 'Slide Parameter Sheet →'}
                  </button>
                  <div
                    style={{
                      transition: `transform ${320 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                      transform: isPhysicsToggled ? 'translateX(0)' : 'translateX(110%)',
                    }}
                    className="p-4 bg-white border-2 border-orange-300 rounded-2xl shadow-xl w-full"
                  >
                    <div className="font-black text-orange-950">Off-Canvas Parameters</div>
                    <p className="text-[11px] text-[#77736B] mt-1">Slides smoothly from edge with damping.</p>
                  </div>
                </div>
              )}

              {/* Pattern 11: Accordion Height */}
              {activeMotion === 'ACCORDION_HEIGHT' && (
                <div className="w-full max-w-md bg-white border border-blue-200 rounded-2xl overflow-hidden font-mono text-xs shadow-md">
                  <div
                    onClick={triggerPhysics}
                    className="p-3.5 flex items-center justify-between cursor-pointer bg-blue-50/70 border-b border-blue-100"
                  >
                    <span className="font-black text-blue-950">Architecture Specifications</span>
                    <ChevronDown className={`w-4 h-4 text-blue-600 transition-transform ${isPhysicsToggled ? 'rotate-180' : ''}`} />
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isPhysicsToggled ? '1fr' : '0fr',
                      transition: `grid-template-rows ${320 / speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }}
                  >
                    <div className="overflow-hidden p-4 text-[11px] text-blue-900 leading-relaxed bg-white">
                      CSS Grid 0fr → 1fr smooth height interpolation without brittle pixel hacks.
                    </div>
                  </div>
                </div>
              )}

              {/* Pattern 12: SVG Icon Morph */}
              {activeMotion === 'SVG_ICON_MORPH' && (
                <div className="text-center space-y-3 font-mono">
                  <button
                    onClick={triggerPhysics}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-pink-600 text-white flex items-center justify-center cursor-pointer shadow-lg mx-auto"
                  >
                    {morphState === 0 && <Menu className="w-7 h-7" />}
                    {morphState === 1 && <X className="w-7 h-7 rotate-90" />}
                    {morphState === 2 && <Check className="w-7 h-7 rotate-180" />}
                    {morphState === 3 && <ArrowRight className="w-7 h-7 rotate-270" />}
                  </button>
                  <div className="text-xs font-black text-fuchsia-950">
                    STATE {morphState + 1}/4: {['MENU', 'CLOSE', 'CHECK', 'ARROW'][morphState]}
                  </div>
                </div>
              )}
            </div>

            {/* Physics Spec Breakdown Footer */}
            <div
              className="pt-2.5 border-t font-mono text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#77736B]"
              style={{ borderColor: currentMotion.accentBorder }}
            >
              <span className="text-[#11100E] font-medium">{currentMotion.physicsDesc}</span>
              <span className="font-black shrink-0" style={{ color: currentMotion.accent }}>
                UX GOAL: {currentMotion.uxPurpose}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SLIDE FOOTER
      ───────────────────────────────────────────────────────────── */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Animation that explains state is UX. Transitions that guide attention elevate software to art.</span>
        <span>14 / 26</span>
      </div>

      {/* CSS Keyframes for Transitions & Shimmers */}
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
        @keyframes warpEffect {
          0% { transform: scale(1) translateZ(0); filter: blur(0); }
          40% { transform: scale(2.4) translateZ(80px); filter: blur(4px); }
          100% { transform: scale(1) translateZ(0); filter: blur(0); }
        }
        @keyframes curtainOpen {
          from { transform: scaleY(1); }
          to { transform: scaleY(0); }
        }
        @keyframes curtainClose {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        .glitch-active {
          animation: glitchJitter 0.3s infinite;
          box-shadow: -3px 0 #EF4444, 3px 0 #06B6D4;
        }
        @keyframes glitchJitter {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-2px, 1px); }
          50% { transform: translate(2px, -1px); }
          75% { transform: translate(-1px, -2px); }
          100% { transform: translate(0, 0); }
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
