import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Layers, ArrowUpRight } from 'lucide-react';

type StyleMode =
  | 'MINIMAL' | 'BRUTALIST' | 'NEO-BRUTALIST' | 'MAXIMALIST' | 'EDITORIAL'
  | 'GLASSMORPHISM' | 'NEUMORPHISM' | 'FLAT' | 'SWISS' | 'DARK-IDE'
  | 'RETRO-PIXEL' | 'ORGANIC' | 'CORPORATE' | 'GAMING-HUD' | 'PAPER-ANALOG'
  | 'COSMIC' | 'WABI-SABI' | 'TYPOGRAPHIC' | 'SKEUOMORPHIC' | 'ANTI-DESIGN';

const styles: { id: StyleMode; label: string; desc: string; tag: string }[] = [
  { id: 'MINIMAL',       label: 'Minimal',     desc: 'Radical whitespace & disciplined hierarchy',         tag: 'ELEGANT'    },
  { id: 'BRUTALIST',     label: 'Brutalist',   desc: 'Exposed raw grid, monospaced, high-contrast',        tag: 'RAW'        },
  { id: 'NEO-BRUTALIST', label: 'Neo-Brut',    desc: '4px offset shadows, solid border, neutral fills',     tag: 'BOLD'       },
  { id: 'MAXIMALIST',    label: 'Maximalist',  desc: 'High data density, live metrics, layered UI',        tag: 'DENSE'      },
  { id: 'EDITORIAL',     label: 'Editorial',   desc: 'Drop caps, asymmetric rhythm, magazine hierarchy',   tag: 'LITERARY'   },
  { id: 'GLASSMORPHISM', label: 'Glass',       desc: 'Frosted blur panels — restrained neutral depth',     tag: 'SLOP RISK'  },
  { id: 'NEUMORPHISM',   label: 'Neumorphic',  desc: 'Soft inset shadows, clay-like extruded depth',       tag: 'SOFT'       },
  { id: 'FLAT',          label: 'Flat',        desc: 'Pure 2D, zero depth, monochrome task surfaces',      tag: 'PURE'       },
  { id: 'SWISS',         label: 'Swiss/Intl',  desc: 'International Typographic Style — grid is law',      tag: 'STRUCTURAL' },
  { id: 'DARK-IDE',      label: 'Dark IDE',    desc: 'Terminal-first, code editor aesthetic',              tag: 'DEV'        },
  { id: 'RETRO-PIXEL',   label: 'Retro Pixel', desc: '8-bit pixel grid, dithered fills, bitmap fonts',     tag: 'NOSTALGIC'  },
  { id: 'ORGANIC',       label: 'Organic',     desc: 'Handcrafted asymmetric curves, warm beige canvas',    tag: 'FLUID'      },
  { id: 'CORPORATE',     label: 'Corporate',   desc: 'Enterprise dashboard — structured, clean, monochrome', tag: 'SAFE'     },
  { id: 'GAMING-HUD',    label: 'Gaming HUD',  desc: 'Heads-up display, scanlines, monochrome telemetry',  tag: 'INTENSE'    },
  { id: 'PAPER-ANALOG',  label: 'Paper',       desc: 'Physical texture, ink grain, handwritten cues',      tag: 'TACTILE'    },
  { id: 'COSMIC',        label: 'Cosmic',      desc: 'Deep space interface, star field, crisp starlight',  tag: 'SCI-FI'     },
  { id: 'WABI-SABI',     label: 'Wabi-Sabi',   desc: 'Intentional imperfection — asymmetry as beauty',     tag: 'ZEN'        },
  { id: 'TYPOGRAPHIC',   label: 'Typographic', desc: 'Type IS the interface — no icons, no chrome',        tag: 'PURE TYPE'  },
  { id: 'SKEUOMORPHIC',  label: 'Skeuo',       desc: 'Tactile tactile surfaces, physical depth & texture',  tag: 'REALISTIC'  },
  { id: 'ANTI-DESIGN',   label: 'Anti-Design', desc: 'Rules intentionally broken as conceptual statement',  tag: 'CHAOS'      },
];

/* ─────────────────────── individual demos ─────────────────────── */

const MinimalDemo: React.FC = () => {
  const [done, setDone] = useState([true, true, false, false]);
  return (
    <div className="h-full flex flex-col gap-3 p-6 bg-[#FAF7F2]">
      <div className="flex items-baseline justify-between border-b border-[#11100E]/10 pb-3">
        <span className="text-[10px] font-mono tracking-[0.2em] text-[#77736B] uppercase">Today's Focus</span>
        <span className="font-mono text-[10px] text-[#77736B]">{done.filter(Boolean).length} / {done.length}</span>
      </div>
      {['Strip every decoration', 'Establish 8px rhythm', 'Verify 7:1 contrast', 'Ship to production'].map((t, i) => (
        <div key={i} onClick={() => { sound.playClick(1.0); setDone(d => { const n=[...d]; n[i]=!n[i]; return n; }); }}
          className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all ${done[i] ? 'bg-[#11100E] border-[#11100E]' : 'border-[#11100E]/30 group-hover:border-[#11100E]'}`}>
            {done[i] && <div className="w-1.5 h-1.5 rounded-full bg-[#F5F1E8]" />}
          </div>
          <span className={`text-sm font-medium transition-all ${done[i] ? 'line-through text-[#77736B]' : 'text-[#11100E]'}`}>{t}</span>
        </div>
      ))}
      <button onClick={() => sound.playSuccess()} className="mt-auto w-full py-2.5 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all bg-[#11100E] text-[#F5F1E8] hover:bg-black cursor-pointer">
        COMMIT CHANGES
      </button>
    </div>
  );
};

const BrutalistDemo: React.FC = () => {
  const [logs, setLogs] = useState(['> INIT_KERNEL: OK', '> GRID_BOUND: ENFORCED', '> CONTRAST: 21:1']);
  const cmds = ['> EXEC_TRANSFORM: DONE','> HEAP: 14.2MB DET','> VIEWPORT: 1470×835','> BUILD: PASS 0 ERR'];
  return (
    <div className="h-full bg-[#FAF7F2] border-4 border-[#11100E] flex flex-col">
      <div className="bg-[#11100E] text-[#F5F1E8] font-mono text-[10px] px-3 py-2 flex items-center justify-between">
        <span className="font-bold tracking-[0.25em]">SYSTEM / TERMINAL v2.0</span>
        <div className="flex gap-1.5">
          {['▪','▪','▪'].map((d,i) => <span key={i} className="text-white/30">{d}</span>)}
        </div>
      </div>
      <div className="flex-1 p-3 font-mono text-[10px] overflow-hidden space-y-1 border-b-2 border-[#11100E]">
        {logs.map((l,i) => <div key={i} className="text-[#11100E] font-bold">{l}</div>)}
        <div className="text-[#11100E]/30 animate-pulse">█</div>
      </div>
      <div className="p-2 flex gap-2">
        <button onClick={() => { const l=cmds[Math.floor(Math.random()*cmds.length)]; setLogs(p=>[...p.slice(-4),l]); sound.playClick(1.3); }}
          className="flex-1 bg-[#11100E] text-[#F5F1E8] font-mono text-[10px] font-bold py-2 hover:bg-[#FAF7F2] hover:text-[#11100E] border-2 border-[#11100E] transition-colors cursor-pointer">
          EXEC CMD
        </button>
        <button onClick={() => { setLogs(['> KERNEL: RESET']); sound.playTap(); }}
          className="px-3 border-2 border-[#11100E] font-mono text-[10px] font-bold hover:bg-[#11100E] hover:text-[#F5F1E8] transition-colors cursor-pointer">
          CLR
        </button>
      </div>
    </div>
  );
};

const NeoBrutalistDemo: React.FC = () => {
  const [count, setCount] = useState(42);
  const [liked, setLiked] = useState(false);
  const [tag, setTag] = useState('DESIGN');
  const tags = ['DESIGN','CODE','SHIP','TASTE'];
  return (
    <div className="h-full p-4 flex flex-col gap-3 bg-[#E9E1D3]">
      <div className="p-4 bg-[#FAF7F2] border-2 border-[#11100E] shadow-[4px_4px_0_#11100E]">
        <div className="font-black text-xs text-[#11100E] tracking-wider mb-2">SHIPS THIS SPRINT</div>
        <div className="flex items-center justify-between">
          <button onClick={() => { sound.playClick(1.4); setCount(c=>Math.max(0,c-1)); }}
            className="w-10 h-10 border-2 border-[#11100E] font-black bg-[#F5F1E8] hover:bg-[#11100E] hover:text-[#F5F1E8] cursor-pointer transition-all active:translate-y-0.5 text-lg flex items-center justify-center">−</button>
          <span className="text-4xl font-black text-[#11100E]">{count}</span>
          <button onClick={() => { sound.playClick(1.4); setCount(c=>c+1); }}
            className="w-10 h-10 border-2 border-[#11100E] font-black bg-[#F5F1E8] hover:bg-[#11100E] hover:text-[#F5F1E8] cursor-pointer transition-all active:translate-y-0.5 text-lg flex items-center justify-center">+</button>
        </div>
      </div>
      <div className="flex gap-2">
        {tags.map(t => (
          <button key={t} onClick={() => { sound.playClick(1.1); setTag(t); }}
            className={`flex-1 py-1.5 border-2 border-[#11100E] font-mono font-black text-[9px] cursor-pointer transition-all active:translate-y-0.5 ${tag===t ? 'bg-[#11100E] text-[#F5F1E8] shadow-none' : 'bg-[#FAF7F2] text-[#11100E] shadow-[2px_2px_0_#11100E]'}`}>
            {t}
          </button>
        ))}
      </div>
      <button onClick={() => { sound.playSuccess(); setLiked(l=>!l); }}
        className={`w-full py-2.5 border-2 border-[#11100E] font-black text-xs cursor-pointer transition-all active:translate-y-0.5 ${liked ? 'bg-[#11100E] text-[#F5F1E8] shadow-none' : 'bg-[#F5F1E8] text-[#11100E] shadow-[4px_4px_0_#11100E] hover:shadow-[2px_2px_0_#11100E]'}`}>
        {liked ? '★ MARKED SHIPPED' : '☆ MARK AS SHIPPED'}
      </button>
    </div>
  );
};

const MaximalistDemo: React.FC = () => {
  const [refresh, setRefresh] = useState(0);
  const metrics = [
    { l:'CPU LOAD', v:'14.2%' }, { l:'MEMORY', v:'6.1 GB' },
    { l:'LATENCY', v:'4ms' },    { l:'LOSS', v:'0.042' },
    { l:'EPOCH', v:'18/50' },    { l:'VRAM', v:'14.2 GB' },
  ];
  return (
    <div className="h-full flex flex-col font-mono text-[9px] bg-[#11100E]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#2D2A26]">
        <span className="font-bold tracking-widest text-[#F5F1E8]">LIVE STATS · ACTIVE FEED</span>
        <div className="flex items-center gap-2">
          <button onClick={() => { setRefresh(r=>r+1); sound.playClick(1.2); }} className="px-2 py-0.5 rounded text-[8px] font-bold cursor-pointer bg-[#181614] text-[#D8D3C8] border border-[#2D2A26]">REFRESH</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-px flex-1 bg-[#2D2A26]">
        {metrics.map((m,i) => (
          <div key={i} className="flex flex-col justify-between p-2.5 bg-[#11100E]">
            <span className="text-[#77736B]">{m.l}</span>
            <div>
              <div className="text-lg font-black mt-1 text-[#F5F1E8]">{m.v}</div>
              <div className="h-0.5 rounded mt-1 bg-[#2D2A26]">
                <div className="h-full rounded transition-all duration-700 bg-[#F5F1E8]" style={{ width:`${55+Math.random()*35}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 border-t border-[#2D2A26] flex items-center justify-between text-[#77736B]">
        <span>RUN #{1047 + refresh} · MODEL v2.4</span>
        <span className="font-bold text-[#F5F1E8]">CHECKPOINT SAVED</span>
      </div>
    </div>
  );
};

const EditorialDemo: React.FC = () => (
  <div className="h-full p-5 flex flex-col justify-between bg-[#FAF7F2]" style={{ fontFamily:'Georgia, serif' }}>
    <div className="flex items-baseline gap-3 border-b border-[#11100E]/15 pb-3">
      <span className="text-7xl font-black leading-none text-[#11100E]" style={{ lineHeight:'0.85' }}>A</span>
      <div>
        <div className="text-sm font-black leading-tight text-[#11100E]">Design is not what it looks like.</div>
        <div className="text-sm font-black leading-tight text-[#11100E]">Design is how it works.</div>
        <div className="text-[10px] mt-1 text-[#77736B] font-mono">— Steve Jobs · 2003</div>
      </div>
    </div>
    <p className="text-xs leading-relaxed flex-1 py-3 text-[#2D2A26]">
      Every interface decision carries implicit meaning. The weight of a typeface, the distance between elements, the temperature of a background canvas — all of it communicates before a word is read.
    </p>
    <div className="flex items-center justify-between border-t border-[#11100E]/15 pt-3 font-mono">
      <span className="text-[9px] text-[#77736B]">NO AI SLOP WORKSHOP · VOL. I · PG. 05</span>
      <span className="text-[9px] font-bold flex items-center gap-1 text-[#11100E]">CONTINUE <ArrowUpRight className="w-3 h-3 inline" /></span>
    </div>
  </div>
);

const GlassDemo: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="h-full relative overflow-hidden bg-[#181614]">
      <div className="absolute top-3 right-3 w-32 h-32 rounded-full bg-white/5 blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-full bg-white/5 blur-lg" />
      <div className="relative z-10 h-full flex flex-col justify-between p-5 bg-white/5 backdrop-blur-md border border-white/10">
        <div>
          <div className="text-white/60 text-[9px] font-mono tracking-[0.25em] uppercase">Frosted Interface Layer</div>
          <div className="text-[#F5F1E8] font-black text-xl mt-1 leading-tight">Glass Card UI</div>
          <div className="text-[#77736B] text-[10px] mt-1">backdrop-filter: blur(16px)</div>
        </div>
        <div className="p-3 rounded-xl text-[10px] font-mono bg-white/5 border border-white/10 text-[#D8D3C8]">
          ⚠ NOTE: Restrain blur usage. Only use when depth creates genuine spatial hierarchy.
        </div>
        <button onClick={() => { sound.playClick(1.0); setClicked(c=>!c); }}
          className="py-2.5 rounded-xl font-bold text-xs font-mono cursor-pointer transition-all bg-white/10 text-[#F5F1E8] hover:bg-white/20 border border-white/20">
          {clicked ? '✓ Acknowledged — Use With Restraint' : 'I Understand the Principle →'}
        </button>
      </div>
    </div>
  );
};

const NeumorphicDemo: React.FC = () => {
  const [vol, setVol] = useState(65);
  const [active, setActive] = useState(1);
  return (
    <div className="h-full p-5 flex flex-col gap-4 justify-center bg-[#E9E1D3]">
      <div className="text-[9px] font-mono text-[#77736B] uppercase tracking-[0.2em] text-center">Soft Tactile Controls</div>
      <div className="p-4 rounded-2xl bg-[#E9E1D3] border border-[#11100E]/15 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-[10px] text-[#11100E]">Volume</span>
          <span className="font-mono text-[10px] text-[#77736B]">{vol}%</span>
        </div>
        <input type="range" min="0" max="100" value={vol}
          onChange={(e) => { setVol(+e.target.value); sound.playClick(0.7); }}
          className="w-full cursor-pointer accent-[#11100E]" />
      </div>
      <div className="flex gap-3 justify-center">
        {[{ icon:'⏮', i:0 },{ icon:'⏸', i:1 },{ icon:'⏭', i:2 }].map(({ icon, i }) => (
          <button key={i} onClick={() => { sound.playClick(1.1); setActive(i); }}
            className={`w-14 h-14 rounded-2xl font-bold text-xl cursor-pointer flex items-center justify-center transition-all ${active===i ? 'bg-[#11100E] text-[#F5F1E8]' : 'bg-[#FAF7F2] text-[#11100E] border border-[#11100E]/20 shadow-xs'}`}>
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

const FlatDemo: React.FC = () => {
  const [sel, setSel] = useState<number|null>(null);
  const items = [{ label:'Design', icon:'✏' },{ label:'Prototype', icon:'⬡' },{ label:'Test', icon:'◎' },{ label:'Ship', icon:'↑' }];
  return (
    <div className="h-full p-4 flex flex-col gap-3 bg-[#FAF7F2]">
      <div className="text-[9px] font-mono text-[#77736B] uppercase tracking-widest">Design Pipeline · Flat System</div>
      <div className="grid grid-cols-2 gap-2.5 flex-1">
        {items.map((item, i) => (
          <button key={i} onClick={() => { sound.playClick(1.2); setSel(i===sel?null:i); }}
            className={`rounded-xl flex flex-col items-center justify-center gap-2 py-5 cursor-pointer transition-all hover:scale-[1.02] border ${sel===i ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]' : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20'}`}>
            <span className="text-3xl">{item.icon}</span>
            <span className="font-bold text-xs">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="text-[9px] font-mono text-[#77736B] text-center">No gradients · No shadows · Pure typography signal</div>
    </div>
  );
};

const SwissDemo: React.FC = () => (
  <div className="h-full flex font-mono overflow-hidden bg-[#FAF7F2]">
    <div className="w-8 bg-[#11100E] flex flex-col items-center justify-end pb-4 shrink-0">
      <span className="text-[7px] text-white/60 tracking-[0.3em] uppercase" style={{ writingMode:'vertical-rl', transform:'rotate(180deg)' }}>INTERNATIONALE TYPOGRAPHISCHE GESTALTUNG</span>
    </div>
    <div className="flex-1 p-4 flex flex-col justify-between border-l border-[#11100E]/15">
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2">
        <span className="text-[8px] uppercase tracking-[0.2em] text-[#77736B]">Column A · 8-Unit Grid System</span>
        <span className="text-[8px] font-bold text-[#11100E]">NEUE HELVETICA 55</span>
      </div>
      <div className="flex flex-col justify-center flex-1 my-3">
        <div className="text-[40px] font-black text-[#11100E] tracking-[-0.04em] leading-none">GRID</div>
        <div className="text-[40px] font-black text-[#11100E] tracking-[-0.04em] leading-none">IS</div>
        <div className="text-[40px] font-black text-[#11100E] tracking-[-0.04em] leading-none">LAW.</div>
        <div className="text-[8px] font-mono text-[#77736B] mt-2">J. Müller-Brockmann · Zürich · 1961</div>
      </div>
      <div className="grid grid-cols-12 gap-px h-1">
        {Array.from({length:12}).map((_,i) => (
          <div key={i} className="rounded-sm bg-[#11100E]" style={{ opacity: i<9 ? 1 : 0.15 }} />
        ))}
      </div>
    </div>
  </div>
);

const DarkIdeDemo: React.FC = () => {
  const [built, setBuilt] = useState(false);
  return (
    <div className="h-full flex flex-col font-mono text-[10px] rounded-xl overflow-hidden bg-[#11100E]">
      <div className="flex items-center gap-1.5 px-3 py-2 shrink-0 border-b border-[#2D2A26] bg-[#181614]">
        <div className="w-3 h-3 rounded-full bg-[#77736B]" />
        <div className="w-3 h-3 rounded-full bg-[#AAA69E]" />
        <div className="w-3 h-3 rounded-full bg-[#D8D3C8]" />
        <span className="ml-2 text-[#77736B]">workshop / slide_05.tsx</span>
      </div>
      <div className="flex-1 p-3 overflow-hidden space-y-0.5">
        <div><span className="text-[#D8D3C8]">const </span><span className="text-[#F5F1E8]">style</span><span className="text-[#77736B]"> = </span><span className="text-white">intentional</span><span className="text-[#77736B]">;</span></div>
        <div><span className="text-[#D8D3C8]">const </span><span className="text-[#F5F1E8]">slop</span><span className="text-[#77736B]"> = </span><span className="text-[#D8D3C8]">false</span><span className="text-[#77736B]">;</span></div>
        <div className="text-[#77736B]">// Design system tokens:</div>
        <div><span className="text-[#77736B]">tokens.</span><span className="text-[#F5F1E8]">ink</span><span className="text-[#77736B]"> = </span><span className="text-white">#11100E</span><span className="text-[#77736B]">;</span></div>
        <div><span className="text-[#77736B]">tokens.</span><span className="text-[#F5F1E8]">spacing</span><span className="text-[#77736B]"> = </span><span className="text-white">8</span><span className="text-[#77736B]">;</span></div>
        <div><span className="text-[#77736B]">tokens.</span><span className="text-[#F5F1E8]">radius</span><span className="text-[#77736B]"> = </span><span className="text-white">12</span><span className="text-[#77736B]">;</span></div>
        {built && <div className="text-white font-bold animate-in fade-in">// Build complete · 0 errors · 945ms</div>}
      </div>
      <div className="px-3 pb-3">
        <button onClick={() => { sound.playClick(1.1); setBuilt(b=>!b); }}
          className="w-full py-1.5 rounded text-[10px] font-bold cursor-pointer transition-all bg-[#F5F1E8] text-[#11100E] hover:bg-white border border-white/20">
          {built ? '✓ BUILD SUCCESSFUL' : '▶ npm run build'}
        </button>
      </div>
    </div>
  );
};

const RetroPixelDemo: React.FC = () => {
  const [score, setScore] = useState(1420);
  return (
    <div className="h-full p-4 flex flex-col gap-3 bg-[#11100E]">
      <div className="flex items-center justify-between font-mono">
        <span className="text-[11px] font-bold text-[#F5F1E8]">DESIGN_OS v2.4</span>
        <span className="text-[10px] text-[#77736B]">HI: 9999</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 font-mono">
        {[['TASTE','100%'],['SKILL','98%'],['SPEED','87%'],['SLOP','0%']].map(([l,v]) => (
          <div key={l} className="flex flex-col items-center gap-1 p-2 border border-[#2D2A26] bg-[#181614]">
            <span className="text-[7px] font-bold text-[#77736B]">{l}</span>
            <span className="text-[11px] font-black text-[#F5F1E8]">{v}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 border border-[#2D2A26] p-2 space-y-0.5 font-mono bg-[#181614]">
        <div className="text-[9px] text-[#77736B]">{'> PIXEL GRID: 8×8 ENFORCED'}</div>
        <div className="text-[9px] text-[#77736B]">{'> DITHERING: ACTIVE'}</div>
        <div className="text-[9px] text-[#F5F1E8] animate-pulse">{'> █ CURSOR BLINK_'}</div>
      </div>
      <button onClick={() => { sound.playClick(1.5); setScore(s=>s+100); }}
        className="w-full py-2 font-bold text-[10px] cursor-pointer transition-all border border-[#F5F1E8] text-[#F5F1E8] font-mono hover:bg-white/10">
        [PRESS START · SCORE: {score}]
      </button>
    </div>
  );
};

const OrganicDemo: React.FC = () => {
  const [active, setActive] = useState<string|null>(null);
  const tags = ['Fluid','Natural','Alive','Warm','Crafted'];
  return (
    <div className="h-full relative overflow-hidden p-5 flex flex-col gap-4 bg-[#FAF7F2]">
      <div className="relative z-10">
        <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#77736B]">Organic Interface</div>
        <div className="text-xl font-black leading-tight mt-1 text-[#11100E]" style={{ fontFamily:'Georgia, serif' }}>Curves & Crafted Intention</div>
      </div>
      <div className="relative z-10 flex flex-wrap gap-2">
        {tags.map(t => (
          <button key={t} onClick={() => { sound.playClick(0.9); setActive(a=>a===t?null:t); }}
            className={`px-3 py-1.5 text-[10px] font-bold cursor-pointer transition-all hover:scale-105 rounded-full border ${active===t ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E]' : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/20'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="relative z-10 mt-auto text-[10px] font-mono text-[#77736B]">
        {active ? `"${active}" — chosen with intention.` : 'Asymmetry as deliberate design choice.'}
      </div>
    </div>
  );
};

const CorporateDemo: React.FC = () => (
  <div className="h-full p-4 flex flex-col gap-2.5 font-sans bg-[#FAF7F2]">
    <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2">
      <span className="text-[10px] font-semibold text-[#77736B] tracking-wide uppercase">Q3 Performance · FY2026</span>
      <span className="text-[9px] px-2 py-0.5 rounded font-bold bg-[#11100E] text-[#F5F1E8]">ENTERPRISE TIER</span>
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 font-mono">
      {[{ label:'Revenue', val:'$2.4M', delta:'+12%' },{ label:'Active Users', val:'14,200', delta:'+8%' },{ label:'Churn Rate', val:'2.1%', delta:'-0.4%' },{ label:'NPS Score', val:'74', delta:'+6pts' }].map((m) => (
        <div key={m.label} className="p-2.5 rounded flex flex-col justify-between bg-[#F5F1E8] border border-[#11100E]/15">
          <div className="text-[8px] text-[#77736B] font-medium uppercase tracking-wide">{m.label}</div>
          <div className="text-base font-bold text-[#11100E]">{m.val}</div>
          <div className="text-[9px] font-semibold text-[#11100E]">{m.delta} YoY</div>
        </div>
      ))}
    </div>
    <button onClick={() => sound.playClick(0.8)} className="w-full py-1.5 text-xs font-semibold rounded cursor-pointer bg-[#11100E] text-[#F5F1E8] hover:bg-black">
      Export Report (PDF)
    </button>
  </div>
);

const GamingHudDemo: React.FC = () => {
  const [pct, setPct] = useState(73);
  return (
    <div className="h-full relative overflow-hidden p-3 font-mono bg-[#11100E] border border-[#2D2A26]">
      <div className="relative z-10 h-full flex flex-col gap-2">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-bold tracking-widest text-[#F5F1E8]">DESIGN_OS v2.4</span>
          <span className="animate-pulse text-[#D8D3C8]">◉ LIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-[9px]">
          {[['SKILL','98'],['TASTE','100'],['SLOP','0']].map(([k,v]) => (
            <div key={k} className="p-2 flex flex-col gap-1.5 border border-[#2D2A26] bg-[#181614]">
              <span className="text-[#77736B]">{k}</span>
              <span className="font-black text-base text-[#F5F1E8]">{v}</span>
              <div className="h-0.5 rounded bg-[#2D2A26]">
                <div className="h-full rounded bg-[#F5F1E8]" style={{ width:`${v}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[9px]">
          <span className="text-[#77736B]">PROGRESS:</span>
          <div className="flex-1 h-1.5 rounded-full bg-[#2D2A26]">
            <div className="h-full rounded-full transition-all duration-500 bg-[#F5F1E8]" style={{ width:`${pct}%` }} />
          </div>
          <span className="text-[#F5F1E8] font-bold">{pct}%</span>
        </div>
        <button onClick={() => { sound.playClick(1.4); setPct(p=>Math.min(100,p+Math.floor(Math.random()*15)+5)); }}
          className="w-full py-2 font-black text-[10px] tracking-[0.2em] cursor-pointer bg-[#181614] text-[#F5F1E8] border border-[#2D2A26] hover:bg-[#2D2A26]">
          ▶ INITIATE BUILD
        </button>
      </div>
    </div>
  );
};

const PaperDemo: React.FC = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState(['Good design starts on paper.', '"Sketch first, code second."']);
  return (
    <div className="h-full p-5 flex flex-col gap-3 bg-[#F5F1E8]" style={{ fontFamily:'Georgia, serif' }}>
      <div className="flex items-baseline justify-between border-b border-[#11100E]/15 pb-2">
        <span className="text-xl font-black text-[#11100E]">Studio Notes</span>
        <span className="text-[9px] font-mono text-[#77736B]">Sep 17, 2026</span>
      </div>
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {notes.map((n, i) => (
          <div key={i} className="text-xs leading-relaxed text-[#11100E]">
            {i === 0 ? <strong>{n}</strong> : <em className="text-[#77736B]">{n}</em>}
          </div>
        ))}
      </div>
      <div className="flex items-end gap-2 border-t border-[#11100E]/15 pt-2">
        <input value={note} onChange={e=>setNote(e.target.value)}
          placeholder="Add a note..."
          className="flex-1 bg-transparent text-xs outline-none placeholder-[#77736B] text-[#11100E] border-b border-[#11100E]/20"
          style={{ fontFamily:'Georgia, serif' }} />
        <button onClick={() => { if(note.trim()){sound.playClick(0.9);setNotes(n=>[...n,note]);setNote('');} }}
          className="text-[9px] font-mono cursor-pointer hover:underline text-[#11100E] font-bold">+ save</button>
      </div>
    </div>
  );
};

const CosmicDemo: React.FC = () => {
  const [launched, setLaunched] = useState(false);
  return (
    <div className="h-full relative overflow-hidden p-4 font-mono bg-[#11100E]">
      {Array.from({length:28}).map((_,i) => (
        <div key={i} className="absolute rounded-full bg-white" style={{ top:`${Math.random()*100}%`, left:`${Math.random()*100}%`, width: i%5===0?'2px':'1px', height: i%5===0?'2px':'1px', opacity: Math.random()*0.8+0.2 }} />
      ))}
      <div className="relative z-10 h-full flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F5F1E8]" />
          <span className="text-[9px] tracking-[0.2em] uppercase text-[#77736B]">Deep Space UI · Sector 7G</span>
        </div>
        <div className="text-2xl font-black leading-tight text-[#F5F1E8]">BEYOND<br />THE SLOP</div>
        <div className="grid grid-cols-2 gap-1.5 text-[9px] flex-1">
          {[['STARS MAPPED','∞'],['SLOP RATE','0.000%'],['TASTE INDEX','99.8'],['LAUNCH','T+14:22']].map(([k,v]) => (
            <div key={k} className="p-2 flex flex-col justify-between border border-[#2D2A26] bg-[#181614]">
              <div className="text-[#77736B]">{k}</div>
              <div className="font-bold text-sm text-[#F5F1E8]">{v}</div>
            </div>
          ))}
        </div>
        <button onClick={() => { sound.playSuccess(); setLaunched(l=>!l); }}
          className="py-2 text-[10px] font-bold tracking-widest cursor-pointer transition-all bg-[#181614] border border-[#2D2A26] text-[#F5F1E8] hover:bg-[#2D2A26]">
          {launched ? '✓ MISSION LAUNCHED' : 'LAUNCH MISSION →'}
        </button>
      </div>
    </div>
  );
};

const WabiSabiDemo: React.FC = () => (
  <div className="h-full p-6 flex flex-col gap-5 bg-[#FAF7F2]">
    <div className="text-[8px] font-mono tracking-[0.35em] uppercase text-[#77736B]">不完全さの美学</div>
    <div>
      <div className="text-3xl font-black leading-[1.1] text-[#11100E]" style={{ fontFamily:'Georgia, serif', letterSpacing:'-0.02em' }}>
        Imperfect.<br /><span style={{ marginLeft:'1.5rem' }}>Incomplete.</span><br />Impermanent.
      </div>
    </div>
    <div className="space-y-2 font-mono text-[10px] text-[#77736B]">
      {[['12px','Asymmetry is intentional'],['20px','Empty space speaks'],['8px','Texture over perfection'],['16px','Imperfection as beauty']].map(([ml,t]) => (
        <div key={t} className="flex items-center gap-2" style={{ marginLeft: ml }}>
          <div className="h-px bg-current opacity-30" style={{ width:`${20+parseInt(ml)}px` }} />
          <span>{t}</span>
        </div>
      ))}
    </div>
  </div>
);

const TypographicDemo: React.FC = () => {
  const [size, setSize] = useState(48);
  return (
    <div className="h-full p-5 flex flex-col justify-between overflow-hidden bg-[#FAF7F2]">
      <div className="text-[8px] font-mono text-[#77736B] uppercase tracking-widest">Type IS the Interface · No icons · No chrome</div>
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <div className="font-black tracking-tighter leading-none text-[#11100E]" style={{ fontSize:`${size}px`, letterSpacing:'-0.04em' }}>TYPE.</div>
        <div className="text-[10px] font-mono text-[#11100E] font-bold tracking-tighter">IS THE</div>
        <div className="font-black tracking-tighter leading-none text-[#77736B]" style={{ fontSize:`${size*0.65}px`, letterSpacing:'-0.03em' }}>INTERFACE.</div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between font-mono text-[9px] text-[#77736B]">
          <span>Font size: {size}px</span>
          <span>Inter · 900 · −0.04em</span>
        </div>
        <input type="range" min="24" max="72" value={size} onChange={(e)=>{setSize(+e.target.value);sound.playClick(0.7);}} className="w-full cursor-pointer accent-[#11100E]" />
      </div>
    </div>
  );
};

const SkeuomorphicDemo: React.FC = () => {
  const [on, setOn] = useState(false);
  return (
    <div className="h-full p-4 flex flex-col gap-3 bg-[#E9E1D3] border-2 border-[#D8D3C8] shadow-inner">
      <div className="text-[10px] font-bold text-[#11100E] uppercase tracking-wide text-center">DESIGN STUDIO PRO</div>
      <div className="flex gap-3 justify-center">
        {['🎨','✏️','📐','🔍'].map((icon, i) => (
          <button key={i} onClick={() => sound.playClick(1.2)}
            className="rounded-xl flex items-center justify-center text-xl cursor-pointer active:shadow-none transition-all bg-[#FAF7F2] border border-[#11100E]/20 shadow-md"
            style={{ width:'48px', height:'48px' }}>
            {icon}
          </button>
        ))}
      </div>
      <div className="p-3 rounded text-[10px] font-mono text-[#11100E] bg-white/60 border border-[#11100E]/15">
        Imitates real materials. Depth through light simulation.
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-[#77736B] font-mono">Power</span>
        <button onClick={() => { sound.playSwitch(!on); setOn(o=>!o); }}
          className="relative w-12 h-6 rounded-full cursor-pointer transition-all bg-[#11100E] border border-black">
          <div className="absolute top-0.5 w-5 h-5 rounded-full transition-all bg-[#F5F1E8]" style={{ left: on ? '24px' : '2px' }} />
        </button>
      </div>
    </div>
  );
};

const AntiDesignDemo: React.FC = () => {
  const [hits, setHits] = useState(0);
  return (
    <div className="h-full overflow-hidden relative cursor-crosshair bg-[#11100E]" onClick={() => { sound.playSlopAlert(); setHits(h=>h+1); }}>
      <div className="absolute top-2 left-2 font-black leading-none rotate-[-12deg] text-white/70" style={{ fontFamily:'Impact, sans-serif', fontSize:'36px' }}>RULES?</div>
      <div className="absolute top-8 right-2 font-mono text-[7px] text-white/50 rotate-[3deg]">border: none; padding: chaos;</div>
      <div className="absolute bottom-10 left-6 text-white font-black text-2xl rotate-[5deg]" style={{ fontFamily:'Impact,sans-serif' }}>BROKEN</div>
      <div className="absolute bottom-5 right-3 text-white/60 font-mono text-[8px] rotate-[-4deg]">intentionally wrong.</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="bg-white text-[#11100E] font-black px-4 py-2 rotate-1 border-3 border-black shadow-[4px_4px_0_black]" style={{ fontFamily:'Impact,sans-serif', fontSize:'13px' }}>
          CLICK IF YOU DARE
        </div>
        {hits > 0 && (
          <div className="font-mono text-[10px] text-white/90 bg-white/20 px-2 py-1 rotate-[-2deg]">
            {hits} click{hits>1?'s':''} · chaos level: {Math.min(100, hits*12)}%
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────── main component ─────────────────────── */

export const Slide05Spectrum: React.FC = () => {
  const [styleMode, setStyleMode] = useState<StyleMode>('NEO-BRUTALIST');
  const current = styles.find((s) => s.id === styleMode)!;

  const renderDemo = () => {
    switch (styleMode) {
      case 'MINIMAL':       return <MinimalDemo />;
      case 'BRUTALIST':     return <BrutalistDemo />;
      case 'NEO-BRUTALIST': return <NeoBrutalistDemo />;
      case 'MAXIMALIST':    return <MaximalistDemo />;
      case 'EDITORIAL':     return <EditorialDemo />;
      case 'GLASSMORPHISM': return <GlassDemo />;
      case 'NEUMORPHISM':   return <NeumorphicDemo />;
      case 'FLAT':          return <FlatDemo />;
      case 'SWISS':         return <SwissDemo />;
      case 'DARK-IDE':      return <DarkIdeDemo />;
      case 'RETRO-PIXEL':   return <RetroPixelDemo />;
      case 'ORGANIC':       return <OrganicDemo />;
      case 'CORPORATE':     return <CorporateDemo />;
      case 'GAMING-HUD':    return <GamingHudDemo />;
      case 'PAPER-ANALOG':  return <PaperDemo />;
      case 'COSMIC':        return <CosmicDemo />;
      case 'WABI-SABI':     return <WabiSabiDemo />;
      case 'TYPOGRAPHIC':   return <TypographicDemo />;
      case 'SKEUOMORPHIC':  return <SkeuomorphicDemo />;
      case 'ANTI-DESIGN':   return <AntiDesignDemo />;
      default:              return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">05 / Design Spectrum</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] px-2 py-0.5 rounded border font-bold text-[#11100E] border-[#11100E]/20 bg-[#F5F1E8]">
            {current.tag}
          </span>
          <h2 className="font-mono text-xs font-bold text-[#11100E] hidden sm:block">STYLE = DECISION SYSTEM</h2>
        </div>
      </div>

      {/* Main */}
      <div className="my-auto py-2 space-y-3">
        <div>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight text-[#11100E]">A STYLE IS A DECISION SYSTEM.</h2>
          <p className="mt-0.5 text-xs text-[#77736B]">20 distinct styles — each a complete interactive interface. Click to switch:</p>
        </div>

        {/* 20-style grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 font-mono text-[9px]">
          {styles.map((s) => {
            const active = styleMode === s.id;
            return (
              <button key={s.id} onClick={() => { sound.playClick(active ? 1.0 : 1.3); setStyleMode(s.id); }}
                title={s.desc}
                className={`px-1.5 py-1.5 rounded-lg border transition-all cursor-pointer text-center leading-tight ${active ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-sm font-bold' : 'bg-[#F5F1E8] text-[#11100E] border-[#11100E]/15 hover:border-[#11100E]/50'}`}>
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Demo area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Description */}
          <div className="md:col-span-3 p-4 rounded-xl bg-[#F5F1E8] border border-[#11100E]/15 font-mono text-xs flex flex-col gap-2">
            <div className="text-[9px] text-[#77736B] uppercase tracking-widest">Active Style</div>
            <div className="font-black text-sm text-[#11100E]">{current.label}</div>
            <div className="text-[10px] text-[#77736B] leading-relaxed">{current.desc}</div>
            <div className="mt-auto pt-2 border-t border-[#11100E]/10 text-[9px] text-[#77736B]">
              {styles.indexOf(current) + 1} of {styles.length} styles
            </div>
          </div>

          {/* Interactive demo */}
          <div className="md:col-span-9 rounded-xl overflow-hidden border border-[#11100E]/15 shadow-md" style={{ height: '220px' }}>
            {renderDemo()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Style is a system of decisions — not a skin applied at the end.</span>
        <span>05 / 26</span>
      </div>
    </div>
  );
};
