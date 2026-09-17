import React, { useState, useEffect, useCallback } from 'react';
import { sound, type SwitchType } from '../audio/sound';
import { usePresentation } from '../context/PresentationContext';
import {
  Keyboard,
  Sparkles,
  Headphones,
  ShieldCheck,
} from 'lucide-react';

interface Keycap {
  code: string;
  label: string;
  subLabel?: string;
  widthClass?: string;
  type?: 'alpha' | 'modifier' | 'accent' | 'space' | 'special';
}

export const Slide14Tactile: React.FC = () => {
  const { switchType, setSwitchType } = usePresentation();
  const [clickCount, setClickCount] = useState<number>(0);
  const [activeKeyCode, setActiveKeyCode] = useState<string | null>(null);
  const [typedBuffer, setTypedBuffer] = useState<string>('DESIGN WITH TASTE');

  const switchData: { type: SwitchType; name: string; stemColor: string; acoustic: string; force: string }[] = [
    { type: 'linear', name: 'Red Linear', stemColor: 'bg-[#DC2626]', acoustic: 'Deep solid thock bottom-out · 45g', force: 'Smooth travel' },
    { type: 'tactile', name: 'Brown Tactile', stemColor: 'bg-[#92400E]', acoustic: 'Padded tactile bump & thack · 50g', force: 'Tactile certainty' },
    { type: 'clicky', name: 'Blue Clicky', stemColor: 'bg-[#2563EB]', acoustic: 'Crisp leaf snap & tick-clack · 55g', force: 'Acoustic spring' },
  ];

  // 60% Mechanical Keyboard Key Matrix (5 Rows)
  const rows: Keycap[][] = [
    [
      { code: 'Escape', label: 'ESC', widthClass: 'w-10 sm:w-11', type: 'special' },
      { code: 'Digit1', label: '1', subLabel: '!' },
      { code: 'Digit2', label: '2', subLabel: '@' },
      { code: 'Digit3', label: '3', subLabel: '#' },
      { code: 'Digit4', label: '4', subLabel: '$' },
      { code: 'Digit5', label: '5', subLabel: '%' },
      { code: 'Digit6', label: '6', subLabel: '^' },
      { code: 'Digit7', label: '7', subLabel: '&' },
      { code: 'Digit8', label: '8', subLabel: '*' },
      { code: 'Digit9', label: '9', subLabel: '(' },
      { code: 'Digit0', label: '0', subLabel: ')' },
      { code: 'Minus', label: '-', subLabel: '_' },
      { code: 'Equal', label: '=', subLabel: '+' },
      { code: 'Backspace', label: 'DELETE', widthClass: 'w-14 sm:w-16', type: 'modifier' },
    ],
    [
      { code: 'Tab', label: 'TAB', widthClass: 'w-12 sm:w-14', type: 'modifier' },
      { code: 'KeyQ', label: 'Q' },
      { code: 'KeyW', label: 'W' },
      { code: 'KeyE', label: 'E' },
      { code: 'KeyR', label: 'R' },
      { code: 'KeyT', label: 'T' },
      { code: 'KeyY', label: 'Y' },
      { code: 'KeyU', label: 'U' },
      { code: 'KeyI', label: 'I' },
      { code: 'KeyO', label: 'O' },
      { code: 'KeyP', label: 'P' },
      { code: 'BracketLeft', label: '[', subLabel: '{' },
      { code: 'BracketRight', label: ']', subLabel: '}' },
      { code: 'Backslash', label: '\\', subLabel: '|', widthClass: 'w-10 sm:w-12', type: 'modifier' },
    ],
    [
      { code: 'CapsLock', label: 'CAPS', widthClass: 'w-14 sm:w-16', type: 'modifier' },
      { code: 'KeyA', label: 'A' },
      { code: 'KeyS', label: 'S' },
      { code: 'KeyD', label: 'D' },
      { code: 'KeyF', label: 'F' },
      { code: 'KeyG', label: 'G' },
      { code: 'KeyH', label: 'H' },
      { code: 'KeyJ', label: 'J' },
      { code: 'KeyK', label: 'K' },
      { code: 'KeyL', label: 'L' },
      { code: 'Semicolon', label: ';', subLabel: ':' },
      { code: 'Quote', label: "'", subLabel: '"' },
      { code: 'Enter', label: 'RETURN', widthClass: 'w-16 sm:w-20', type: 'accent' },
    ],
    [
      { code: 'ShiftLeft', label: 'SHIFT', widthClass: 'w-16 sm:w-20', type: 'modifier' },
      { code: 'KeyZ', label: 'Z' },
      { code: 'KeyX', label: 'X' },
      { code: 'KeyC', label: 'C' },
      { code: 'KeyV', label: 'V' },
      { code: 'KeyB', label: 'B' },
      { code: 'KeyN', label: 'N' },
      { code: 'KeyM', label: 'M' },
      { code: 'Comma', label: ',', subLabel: '<' },
      { code: 'Period', label: '.', subLabel: '>' },
      { code: 'Slash', label: '/', subLabel: '?' },
      { code: 'ShiftRight', label: 'SHIFT', widthClass: 'w-16 sm:w-20', type: 'modifier' },
    ],
    [
      { code: 'ControlLeft', label: 'CTRL', widthClass: 'w-11 sm:w-13', type: 'modifier' },
      { code: 'AltLeft', label: 'OPT', widthClass: 'w-10 sm:w-12', type: 'modifier' },
      { code: 'MetaLeft', label: 'CMD', widthClass: 'w-11 sm:w-13', type: 'modifier' },
      { code: 'Space', label: 'SPACEBAR', widthClass: 'flex-1 max-w-[280px]', type: 'space' },
      { code: 'MetaRight', label: 'CMD', widthClass: 'w-11 sm:w-13', type: 'modifier' },
      { code: 'AltRight', label: 'OPT', widthClass: 'w-10 sm:w-12', type: 'modifier' },
      { code: 'ArrowLeft', label: '◀', widthClass: 'w-9 sm:w-10', type: 'modifier' },
      { code: 'ArrowUp', label: '▲', widthClass: 'w-9 sm:w-10', type: 'modifier' },
      { code: 'ArrowRight', label: '▶', widthClass: 'w-9 sm:w-10', type: 'modifier' },
    ],
  ];

  const handleKeyPress = useCallback((code: string, label: string) => {
    // Pitch variation based on key size
    const pitch =
      code === 'Space' ? 0.72 : code === 'Enter' ? 0.82 : code.startsWith('Shift') ? 0.88 : 1.05;
    sound.playSwitchPress(pitch);

    setClickCount((c) => c + 1);
    setActiveKeyCode(code);
    setTimeout(() => setActiveKeyCode(null), 120);

    if (code === 'Backspace') {
      setTypedBuffer((prev) => prev.slice(0, -1));
    } else if (code === 'Space') {
      setTypedBuffer((prev) => (prev.length < 32 ? prev + ' ' : prev));
    } else if (label.length === 1) {
      setTypedBuffer((prev) => (prev.length < 32 ? prev + label : prev));
    }
  }, []);

  // Listen to actual physical computer keyboard events
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Don't intercept slide navigation keys like ArrowRight/Left or Space if modifier is pressed
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const matchedKey = rows.flat().find((k) => k.code === e.code);
      if (matchedKey) {
        // Prevent default browser scrolling on space/arrows inside keyboard testing
        if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
          e.preventDefault();
        }
        handleKeyPress(matchedKey.code, matchedKey.label);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyPress]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-7 md:p-9 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2">
        <div className="flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            15 / Real Key Sounds & Physical Feel
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Switch selector */}
          <div className="flex items-center gap-1 bg-white border border-[#11100E]/20 p-0.5 rounded-lg text-[10px]">
            {switchData.map((s) => (
              <button
                key={s.type}
                onClick={() => {
                  sound.playClick(1.2);
                  setSwitchType(s.type);
                }}
                className={`px-2 py-1 rounded flex items-center gap-1.5 cursor-pointer font-bold ${
                  switchType === s.type
                    ? 'bg-[#11100E] text-[#F5F1E8]'
                    : 'text-[#77736B] hover:text-[#11100E]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${s.stemColor}`} />
                <span>{s.name}</span>
              </button>
            ))}
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-[#F5F1E8] border border-[#11100E]/15 font-bold text-[#11100E]">
            CLICKS: {clickCount}
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="my-auto py-1 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-[#11100E]">
              SOFTWARE SHOULD FEEL PHYSICAL.
            </h2>
            <p className="mt-0.5 text-xs text-[#77736B] font-medium">
              Click the keycaps below or type directly on your physical computer keyboard to feel the acoustics:
            </p>
          </div>

          {/* Live Buffer Display */}
          <div className="flex items-center gap-2 font-mono text-xs bg-white border border-[#11100E]/20 px-3 py-1.5 rounded-xl shadow-xs">
            <span className="text-[#77736B]">LIVE BUFFER:</span>
            <span className="font-bold text-[#11100E] tracking-wider min-w-[120px]">
              {typedBuffer || <span className="opacity-40 font-normal">type something...</span>}
            </span>
            <span className="w-1.5 h-3.5 bg-[#F59E0B] animate-pulse" />
          </div>
        </div>

        {/* FULL 60% MECHANICAL KEYBOARD CHASSIS */}
        <div className="p-3 sm:p-4 rounded-3xl bg-[#181614] border-2 border-[#2B2723] shadow-2xl space-y-1.5 font-mono max-w-4xl mx-auto">
          {rows.map((row, rIdx) => (
            <div key={rIdx} className="flex items-center justify-center gap-1 sm:gap-1.5">
              {row.map((k) => {
                const isPressed = activeKeyCode === k.code;
                const width = k.widthClass || 'w-8 sm:w-10';

                // Color Themes
                let bgStyle = 'bg-[#F5F1E8] text-[#11100E] shadow-[0_4px_0_0_#C5BDB0]';
                if (k.type === 'modifier') {
                  bgStyle = 'bg-[#2E2B27] text-[#F5F1E8] shadow-[0_4px_0_0_#1A1816] text-[9px] sm:text-[10px]';
                } else if (k.type === 'accent') {
                  bgStyle = 'bg-[#D97706] text-[#FFFFFF] shadow-[0_4px_0_0_#92400E] font-bold text-[9px] sm:text-[10px]';
                } else if (k.type === 'special') {
                  bgStyle = 'bg-[#2563EB] text-[#FFFFFF] shadow-[0_4px_0_0_#1D4ED8] font-bold text-[9px] sm:text-[10px]';
                } else if (k.type === 'space') {
                  bgStyle = 'bg-[#E9E1D3] text-[#77736B] shadow-[0_4px_0_0_#B8B0A2] font-semibold text-[9px]';
                }

                return (
                  <button
                    key={k.code}
                    onMouseDown={() => handleKeyPress(k.code, k.label)}
                    className={`h-9 sm:h-11 rounded-lg sm:rounded-xl border border-black/20 flex flex-col items-center justify-center cursor-pointer transition-all duration-75 select-none ${width} ${bgStyle} ${
                      isPressed
                        ? 'translate-y-1 shadow-none bg-[#F59E0B]! text-[#11100E]! border-[#D97706]!'
                        : 'hover:brightness-105 active:translate-y-1 active:shadow-none'
                    }`}
                  >
                    {k.subLabel && (
                      <span className="text-[8px] opacity-60 leading-none">{k.subLabel}</span>
                    )}
                    <span className="text-[10px] sm:text-xs font-bold leading-tight">{k.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* WHY SFX ARE CRITICAL FOR UX — MANIFEST SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/15 flex items-start gap-2.5 shadow-xs">
            <Headphones className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-[#11100E]">1. INSTANT CONFIRMATION</div>
              <p className="text-[10px] text-[#77736B] mt-0.5 leading-relaxed">
                Sound confirms your click instantly so you never wonder if a button clicked or accidentally double-submit.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/15 flex items-start gap-2.5 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-[#11100E]">2. NO NEED TO STARE</div>
              <p className="text-[10px] text-[#77736B] mt-0.5 leading-relaxed">
                You hear the click right away without having to stop and search the screen for a loading spinner.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#F5F1E8] border border-[#11100E]/15 flex items-start gap-2.5 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-[#11100E]">3. FEELS LIKE A REAL TOOL</div>
              <p className="text-[10px] text-[#77736B] mt-0.5 leading-relaxed">
                Apps like Linear and macOS feel delightful because each tap feels solid and satisfying.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Good sounds make software feel real, responsive, and satisfying to use.</span>
        <span>15 / 26</span>
      </div>
    </div>
  );
};
