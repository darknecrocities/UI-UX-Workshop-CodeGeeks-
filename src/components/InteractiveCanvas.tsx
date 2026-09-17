import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sound } from '../audio/sound';
import { usePresentation } from '../context/PresentationContext';

interface Point {
  x: number;
  y: number;
}

export const InteractiveCanvas: React.FC = () => {
  const { soundEnabled, toggleSound } = usePresentation();
  const containerRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<Point>({ x: 180, y: 140 });
  const [normalized, setNormalized] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [velocity, setVelocity] = useState<number>(0);
  const [direction, setDirection] = useState<string>('IDLE');
  const [distance, setDistance] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [trail, setTrail] = useState<Point[]>([]);

  const lastPosRef = useRef<Point>({ x: 180, y: 140 });
  const lastTimeRef = useRef<number>(Date.now());

  const updateFromCoords = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const clampedX = Math.max(16, Math.min(rect.width - 16, clientX - rect.left));
    const clampedY = Math.max(16, Math.min(rect.height - 16, clientY - rect.top));

    const normX = clampedX / rect.width;
    const normY = clampedY / rect.height;

    const now = Date.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dx = clampedX - lastPosRef.current.x;
    const dy = clampedY - lastPosRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const vel = Math.round((dist / dt) * 100);

    let dir = 'IDLE';
    if (Math.abs(dx) > Math.abs(dy)) {
      dir = dx > 0 ? 'EAST →' : 'WEST ←';
    } else if (Math.abs(dy) > 1) {
      dir = dy > 0 ? 'SOUTH ↓' : 'NORTH ↑';
    }

    setPosition({ x: clampedX, y: clampedY });
    setNormalized({ x: Math.round(normX * 100), y: Math.round(normY * 100) });
    setVelocity(vel);
    setDirection(dir);
    setDistance((prev) => Math.round(prev + dist));

    // Update trail
    setTrail((prev) => [...prev.slice(-8), { x: clampedX, y: clampedY }]);

    // Play coordinate SFX
    sound.playXY(normX, normY, vel);

    lastPosRef.current = { x: clampedX, y: clampedY };
    lastTimeRef.current = now;
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromCoords(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateFromCoords(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // Center point on initial mount
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      setPosition({ x: cx, y: cy });
      setNormalized({ x: 50, y: 50 });
      lastPosRef.current = { x: cx, y: cy };
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      {/* Coordinate Plane Area */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative flex-1 w-full bg-[#11100E] border border-[#11100E] rounded-xl overflow-hidden cursor-crosshair touch-none shadow-inner"
      >
        {/* Subtle coordinate grid lines */}
        <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />

        {/* Center axes */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 pointer-events-none" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 pointer-events-none" />

        {/* Trail points */}
        {trail.map((p, idx) => (
          <div
            key={idx}
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              opacity: (idx + 1) / trail.length * 0.4,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#11100E] pointer-events-none transition-opacity duration-300"
          />
        ))}

        {/* Draggable puck */}
        <div
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-white flex items-center justify-center transition-transform duration-75 shadow-lg ${
            isDragging ? 'bg-[#11100E] scale-110' : 'bg-[#FAF7F2]'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${isDragging ? 'bg-[#F5F1E8]' : 'bg-[#11100E]'}`} />
        </div>

        {/* On-screen HUD tags inside canvas */}
        <div className="absolute top-3 left-4 font-mono text-[11px] text-white/50 tracking-wider">
          TOUCH CANVAS
        </div>
        <div className="absolute bottom-3 left-4 font-mono text-xs text-white/80">
          DRAG THE DOT
        </div>
      </div>

      {/* Live Motion Stats */}
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs font-mono">
        <div className="p-2.5 rounded bg-[#F5F1E8] border border-[#11100E]/15">
          <div className="text-[10px] text-[#77736B] uppercase">Coord X</div>
          <div className="text-sm font-bold text-[#11100E] mt-0.5">{normalized.x}%</div>
        </div>

        <div className="p-2.5 rounded bg-[#F5F1E8] border border-[#11100E]/15">
          <div className="text-[10px] text-[#77736B] uppercase">Coord Y</div>
          <div className="text-sm font-bold text-[#11100E] mt-0.5">{normalized.y}%</div>
        </div>

        <div className="p-2.5 rounded bg-[#F5F1E8] border border-[#11100E]/15">
          <div className="text-[10px] text-[#77736B] uppercase">Velocity</div>
          <div className="text-sm font-bold text-[#11100E] mt-0.5">{velocity} px/s</div>
        </div>

        <div className="p-2.5 rounded bg-[#F5F1E8] border border-[#11100E]/15">
          <div className="text-[10px] text-[#77736B] uppercase">Direction</div>
          <div className="text-sm font-bold text-[#11100E] mt-0.5">{direction}</div>
        </div>

        <div className="p-2.5 rounded bg-[#F5F1E8] border border-[#11100E]/15">
          <div className="text-[10px] text-[#77736B] uppercase">Distance</div>
          <div className="text-sm font-bold text-[#11100E] mt-0.5">{distance} px</div>
        </div>

        <div
          onClick={toggleSound}
          className={`p-2.5 rounded border cursor-pointer transition-colors ${
            soundEnabled
              ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]'
              : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:bg-[#11100E]/5'
          }`}
        >
          <div className="text-[10px] opacity-70 uppercase">Audio SFX</div>
          <div className="text-sm font-bold mt-0.5">{soundEnabled ? 'ACTIVE 🔊' : 'MUTED 🔈'}</div>
        </div>
      </div>
    </div>
  );
};
