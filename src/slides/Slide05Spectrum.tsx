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
  { id: 'NEO-BRUTALIST', label: 'Neo-Brut',    desc: '4px offset shadows, solid border, vibrant fills',    tag: 'BOLD'       },
  { id: 'MAXIMALIST',    label: 'Maximalist',  desc: 'Dense info density, live telemetry, layered UI',     tag: 'DENSE'      },
  { id: 'EDITORIAL',     label: 'Editorial',   desc: 'Drop caps, asymmetric rhythm, magazine hierarchy',   tag: 'LITERARY'   },
  { id: 'GLASSMORPHISM', label: 'Glass',       desc: 'Frosted blur panels — beautiful but overused',       tag: '⚠ SLOP RISK'},
  { id: 'NEUMORPHISM',   label: 'Neumorphic',  desc: 'Soft inset shadows, clay-like extruded depth',       tag: 'SOFT'       },
  { id: 'FLAT',          label: 'Flat',        desc: 'Pure 2D, zero depth, colour-coded task surfaces',    tag: 'PURE'       },
  { id: 'SWISS',         label: 'Swiss/Intl',  desc: 'International Typographic Style — grid is law',      tag: 'STRUCTURAL' },
  { id: 'DARK-IDE',      label: 'Dark IDE',    desc: 'Terminal-first, code editor aesthetic',              tag: 'DEV'        },
  { id: 'RETRO-PIXEL',   label: 'Retro Pixel', desc: '8-bit pixel grid, dithered fills, bitmap fonts',     tag: 'NOSTALGIC'  },
  { id: 'ORGANIC',       label: 'Organic',     desc: 'Handcrafted asymmetric blobs, warm palette',         tag: 'FLUID'      },
  { id: 'CORPORATE',     label: 'Corporate',   desc: 'Enterprise dashboard — safe, sterile, beige',        tag: 'SAFE'       },
  { id: 'GAMING-HUD',    label: 'Gaming HUD',  desc: 'Heads-up display, scanlines, real-time overlay',     tag: 'INTENSE'    },
  { id: 'PAPER-ANALOG',  label: 'Paper',       desc: 'Physical texture, ink grain, handwritten cues',      tag: 'TACTILE'    },
  { id: 'COSMIC',        label: 'Cosmic',      desc: 'Sci-fi space UI, star field, neon glows',            tag: '🚀 SCI-FI'  },
  { id: 'WABI-SABI',     label: 'Wabi-Sabi',   desc: 'Intentional imperfection — asymmetry as beauty',     tag: 'ZEN'        },
  { id: 'TYPOGRAPHIC',   label: 'Typographic', desc: 'Type IS the interface — no icons, no chrome',        tag: 'PURE TYPE'  },
  { id: 'SKEUOMORPHIC',  label: 'Skeuo',       desc: 'Physical materials, real-world depth & texture',     tag: 'REALISTIC'  },
  { id: 'ANTI-DESIGN',   label: 'Anti-Design', desc: 'Rules intentionally broken as conceptual statement',  tag: '🔥 CHAOS'   },
];

/* ─────────────────────── individual demos ─────────────────────── */

const MinimalDemo: React.FC = () => {
  const [done, setDone] = useState([true, true, false, false]);
  return (
    <div className="h-full flex flex-col gap-3 p-6 bg-white">
      <div className="flex items-baseline justify-between border-b border-gray-100 pb-3">
        <span className="text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase">Today's Focus</span>
        <span className="font-mono text-[10px] text-gray-300">{done.filter(Boolean).length} / {done.length}</span>
      </div>
      {['Strip every decoration', 'Establish 8px rhythm', 'Verify 7:1 contrast', 'Ship to production'].map((t, i) => (
        <div key={i} onClick={() => { sound.playClick(1.0); setDone(d => { const n=[...d]; n[i]=!n[i]; return n; }); }}
          className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all ${done[i] ? 'bg-gray-900 border-gray-900' : 'border-gray-200 group-hover:border-gray-400'}`}>
            {done[i] && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
          </div>
          <span className={`text-sm font-medium transition-all ${done[i] ? 'line-through text-gray-300' : 'text-gray-800'}`}>{t}</span>
        </div>
      ))}
      <button onClick={() => sound.playSuccess()} className="mt-auto w-full py-2.5 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all bg-gray-900 text-white hover:bg-black cursor-pointer">
        COMMIT CHANGES
      </button>
    </div>
  );
};

const BrutalistDemo: React.FC = () => {
  const [logs, setLogs] = useState(['> INIT_KERNEL: OK', '> GRID_BOUND: ENFORCED', '> CONTRAST: 21:1']);
  const cmds = ['> EXEC_TRANSFORM: DONE','> HEAP: 14.2MB DET','> VIEWPORT: 1470×835','> BUILD: PASS 0 ERR'];
  return (
    <div className="h-full bg-white border-4 border-black flex flex-col">
      <div className="bg-black text-white font-mono text-[10px] px-3 py-2 flex items-center justify-between">
        <span className="font-bold tracking-[0.25em]">SYSTEM / TERMINAL v2.0</span>
        <div className="flex gap-1.5">
          {['▪','▪','▪'].map((d,i) => <span key={i} className="text-white/30">{d}</span>)}
        </div>
      </div>
      <div className="flex-1 p-3 font-mono text-[10px] overflow-hidden space-y-1 border-b-2 border-black">
        {logs.map((l,i) => <div key={i} className="text-black font-bold">{l}</div>)}
        <div className="text-black/30 animate-pulse">█</div>
      </div>
      <div className="p-2 flex gap-2">
        <button onClick={() => { const l=cmds[Math.floor(Math.random()*cmds.length)]; setLogs(p=>[...p.slice(-4),l]); sound.playClick(1.3); }}
          className="flex-1 bg-black text-white font-mono text-[10px] font-bold py-2 hover:bg-white hover:text-black border-2 border-black transition-colors cursor-pointer">
          EXEC CMD
        </button>
        <button onClick={() => { setLogs(['> KERNEL: RESET']); sound.playTap(); }}
          className="px-3 border-2 border-black font-mono text-[10px] font-bold hover:bg-black hover:text-white transition-colors cursor-pointer">
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
    <div className="h-full p-4 flex flex-col gap-3" style={{ background: '#F0F0F0' }}>
      <div className="p-4 bg-[#FDE68A] border-2 border-black shadow-[4px_4px_0_black]">
        <div className="font-black text-xs text-black tracking-wider mb-2">SHIPS THIS SPRINT</div>
        <div className="flex items-center justify-between">
          <button onClick={() => { sound.playClick(1.4); setCount(c=>Math.max(0,c-1)); }}
            className="w-10 h-10 border-2 border-black font-black bg-white hover:bg-black hover:text-white cursor-pointer transition-all active:translate-y-0.5 text-lg flex items-center justify-center">−</button>
          <span className="text-4xl font-black text-black">{count}</span>
          <button onClick={() => { sound.playClick(1.4); setCount(c=>c+1); }}
            className="w-10 h-10 border-2 border-black font-black bg-white hover:bg-black hover:text-white cursor-pointer transition-all active:translate-y-0.5 text-lg flex items-center justify-center">+</button>
        </div>
      </div>
      <div className="flex gap-2">
        {tags.map(t => (
          <button key={t} onClick={() => { sound.playClick(1.1); setTag(t); }}
            className={`flex-1 py-1.5 border-2 border-black font-mono font-black text-[9px] cursor-pointer transition-all active:translate-y-0.5 ${tag===t ? 'bg-black text-white shadow-none' : 'bg-white text-black shadow-[2px_2px_0_black]'}`}>
            {t}
          </button>
        ))}
      </div>
      <button onClick={() => { sound.playSuccess(); setLiked(l=>!l); }}
        className={`w-full py-2.5 border-2 border-black font-black text-xs cursor-pointer transition-all active:translate-y-0.5 ${liked ? 'bg-black text-white shadow-none' : 'bg-[#FF6B6B] text-black shadow-[4px_4px_0_black] hover:shadow-[2px_2px_0_black]'}`}>
        {liked ? '★ MARKED SHIPPED' : '☆ MARK AS SHIPPED'}
      </button>
    </div>
  );
};

const MaximalistDemo: React.FC = () => {
  const [refresh, setRefresh] = useState(0);
  const metrics = [
    { l:'CPU LOAD', v:'14.2%', c:'#16A34A' }, { l:'MEMORY', v:'6.1 GB', c:'#F59E0B' },
    { l:'LATENCY', v:'4ms', c:'#16A34A' },    { l:'LOSS', v:'0.042', c:'#11100E' },
    { l:'EPOCH', v:'18/50', c:'#3B82F6' },    { l:'VRAM', v:'14.2 GB', c:'#DC2626' },
  ];
  return (
    <div className="h-full flex flex-col font-mono text-[9px]" style={{ background:'#0F172A' }}>
      <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor:'#1E293B' }}>
        <span className="font-bold tracking-widest text-cyan-400">TELEMETRY · LIVE STREAM</span>
        <div className="flex items-center gap-2">
          <span className="text-green-400 animate-pulse font-bold">◉ ONLINE</span>
          <button onClick={() => { setRefresh(r=>r+1); sound.playClick(1.2); }} className="px-2 py-0.5 rounded text-[8px] font-bold cursor-pointer" style={{ background:'#1E293B', color:'#94A3B8', border:'1px solid #334155' }}>REFRESH</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-px flex-1 bg-[#1E293B]">
        {metrics.map((m,i) => (
          <div key={i} className="flex flex-col justify-between p-2.5" style={{ background:'#0F172A' }}>
            <span className="text-[#475569]">{m.l}</span>
            <div>
              <div className="text-lg font-black mt-1" style={{ color: m.c }}>{m.v}</div>
              <div className="h-0.5 rounded mt-1" style={{ background:'#1E293B' }}>
                <div className="h-full rounded transition-all duration-700" style={{ width:`${55+Math.random()*35}%`, background: m.c }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 border-t flex items-center justify-between" style={{ borderColor:'#1E293B' }}>
        <span style={{ color:'#334155' }}>RUN #{1047 + refresh} · MODEL v2.4</span>
        <span style={{ color:'#22D3EE' }} className="font-bold">CHECKPOINT SAVED</span>
      </div>
    </div>
  );
};

const EditorialDemo: React.FC = () => (
  <div className="h-full p-5 flex flex-col justify-between" style={{ background:'#FFFEF7', fontFamily:'Georgia, serif' }}>
    <div className="flex items-baseline gap-3 border-b pb-3" style={{ borderColor:'#E5E0D5' }}>
      <span className="text-7xl font-black leading-none" style={{ color:'#1A1208', lineHeight:'0.85' }}>A</span>
      <div>
        <div className="text-sm font-black leading-tight" style={{ color:'#1A1208' }}>Design is not what it looks like.</div>
        <div className="text-sm font-black leading-tight" style={{ color:'#1A1208' }}>Design is how it works.</div>
        <div className="text-[10px] mt-1" style={{ color:'#8B7355', fontFamily:'monospace' }}>— Steve Jobs · 2003</div>
      </div>
    </div>
    <p className="text-xs leading-relaxed flex-1 py-3" style={{ color:'#4A3728' }}>
      Every interface decision carries implicit meaning. The weight of a typeface, the distance between elements, the temperature of a background colour — all of it communicates before a word is read.
    </p>
    <div className="flex items-center justify-between border-t pt-3" style={{ borderColor:'#E5E0D5', fontFamily:'monospace' }}>
      <span className="text-[9px]" style={{ color:'#8B7355' }}>NO AI SLOP WORKSHOP · VOL. I · PG. 05</span>
      <span className="text-[9px] font-bold flex items-center gap-1" style={{ color:'#1A1208' }}>CONTINUE <ArrowUpRight className="w-3 h-3 inline" /></span>
    </div>
  </div>
);

const GlassDemo: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="h-full relative overflow-hidden" style={{ background:'linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f093fb 100%)' }}>
      <div className="absolute top-3 right-3 w-32 h-32 rounded-full" style={{ background:'rgba(255,255,255,0.2)', filter:'blur(20px)' }} />
      <div className="absolute -bottom-4 -left-4 w-28 h-28" style={{ background:'rgba(240,147,251,0.3)', borderRadius:'60% 40% 70% 30%', filter:'blur(16px)' }} />
      <div className="relative z-10 h-full flex flex-col justify-between p-5" style={{ background:'rgba(255,255,255,0.10)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.22)' }}>
        <div>
          <div className="text-white/60 text-[9px] font-mono tracking-[0.25em] uppercase">Frosted Interface Layer</div>
          <div className="text-white font-black text-xl mt-1 leading-tight">Glass Card UI</div>
          <div className="text-white/60 text-[10px] mt-1">backdrop-filter: blur(16px)</div>
        </div>
        <div className="p-3 rounded-xl text-[10px] font-mono" style={{ background:'rgba(220,38,38,0.2)', border:'1px solid rgba(220,38,38,0.4)', color:'#FCA5A5' }}>
          ⚠ WARNING: Heavily overused by AI generators. Only use when blur has clear semantic purpose.
        </div>
        <button onClick={() => { sound.playClick(1.0); setClicked(c=>!c); }}
          className="py-2.5 rounded-xl font-bold text-xs font-mono cursor-pointer transition-all"
          style={{ background: clicked ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.35)', color:'white', backdropFilter:'blur(8px)' }}>
          {clicked ? '✓ Acknowledged — Use With Restraint' : 'I Understand the Risk →'}
        </button>
      </div>
    </div>
  );
};

const NeumorphicDemo: React.FC = () => {
  const [vol, setVol] = useState(65);
  const [active, setActive] = useState(1);
  const bg = '#DDE1E7';
  const shadow = '6px 6px 12px #B8BEC7, -6px -6px 12px #FFFFFF';
  const inset = 'inset 4px 4px 8px #B8BEC7, inset -4px -4px 8px #FFFFFF';
  return (
    <div className="h-full p-5 flex flex-col gap-4 justify-center" style={{ background: bg }}>
      <div className="text-[9px] font-mono text-[#7A8494] uppercase tracking-[0.2em] text-center">Soft UI Controls</div>
      <div className="p-4 rounded-2xl" style={{ background: bg, boxShadow: shadow }}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-[10px] text-[#4A5568]">Volume</span>
          <span className="font-mono text-[10px] text-[#7A8494]">{vol}%</span>
        </div>
        <input type="range" min="0" max="100" value={vol}
          onChange={(e) => { setVol(+e.target.value); sound.playClick(0.7); }}
          className="w-full cursor-pointer" style={{ accentColor:'#667eea' }} />
      </div>
      <div className="flex gap-3 justify-center">
        {[{ icon:'⏮', i:0 },{ icon:'⏸', i:1 },{ icon:'⏭', i:2 }].map(({ icon, i }) => (
          <button key={i} onClick={() => { sound.playClick(1.1); setActive(i); }}
            className="w-14 h-14 rounded-2xl font-bold text-xl text-[#4A5568] cursor-pointer flex items-center justify-center transition-all"
            style={{ background: bg, boxShadow: active===i ? inset : shadow }}>
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

const FlatDemo: React.FC = () => {
  const [sel, setSel] = useState<number|null>(null);
  const items = [{ label:'Design', color:'#3B82F6', icon:'✏' },{ label:'Prototype', color:'#8B5CF6', icon:'⬡' },{ label:'Test', color:'#F59E0B', icon:'◎' },{ label:'Ship', color:'#10B981', icon:'↑' }];
  return (
    <div className="h-full p-4 flex flex-col gap-3" style={{ background:'#F8FAFC' }}>
      <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Design Pipeline · Flat System</div>
      <div className="grid grid-cols-2 gap-2.5 flex-1">
        {items.map((item, i) => (
          <button key={i} onClick={() => { sound.playClick(1.2); setSel(i===sel?null:i); }}
            className="rounded-xl flex flex-col items-center justify-center gap-2 py-5 cursor-pointer transition-all hover:scale-[1.02]"
            style={{ background: sel===i ? item.color : `${item.color}18`, border: `2px solid ${sel===i ? item.color : 'transparent'}` }}>
            <span className="text-3xl">{item.icon}</span>
            <span className="font-bold text-xs" style={{ color: sel===i ? 'white' : item.color }}>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="text-[9px] font-mono text-gray-400 text-center">No gradients · No shadows · Pure colour signal</div>
    </div>
  );
};

const SwissDemo: React.FC = () => (
  <div className="h-full flex font-mono overflow-hidden" style={{ background:'#FFFEF9' }}>
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
          <div key={i} className="rounded-sm" style={{ background: i<9 ? '#11100E' : '#11100E22' }} />
        ))}
      </div>
    </div>
  </div>
);

const DarkIdeDemo: React.FC = () => {
  const [built, setBuilt] = useState(false);
  return (
    <div className="h-full flex flex-col font-mono text-[10px] rounded-xl overflow-hidden" style={{ background:'#0D1117' }}>
      <div className="flex items-center gap-1.5 px-3 py-2 shrink-0" style={{ background:'#161B22', borderBottom:'1px solid #30363D' }}>
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-2" style={{ color:'#8B949E' }}>workshop / slide_05.tsx</span>
      </div>
      <div className="flex-1 p-3 overflow-hidden space-y-0.5">
        <div><span style={{color:'#FF7B72'}}>const </span><span style={{color:'#79C0FF'}}>style</span><span style={{color:'#C9D1D9'}}> = </span><span style={{color:'#A5D6FF'}}>'intentional'</span><span style={{color:'#C9D1D9'}}>;</span></div>
        <div><span style={{color:'#FF7B72'}}>const </span><span style={{color:'#79C0FF'}}>slop</span><span style={{color:'#C9D1D9'}}> = </span><span style={{color:'#FF7B72'}}>false</span><span style={{color:'#C9D1D9'}}>;</span></div>
        <div style={{color:'#8B949E'}}>{'// Design system tokens:'}</div>
        <div><span style={{color:'#C9D1D9'}}>tokens.</span><span style={{color:'#79C0FF'}}>ink</span><span style={{color:'#C9D1D9'}}> = </span><span style={{color:'#A5D6FF'}}>'#11100E'</span><span style={{color:'#C9D1D9'}}>;</span></div>
        <div><span style={{color:'#C9D1D9'}}>tokens.</span><span style={{color:'#79C0FF'}}>spacing</span><span style={{color:'#C9D1D9'}}> = </span><span style={{color:'#79C0FF'}}>8</span><span style={{color:'#C9D1D9'}}>;</span></div>
        <div><span style={{color:'#C9D1D9'}}>tokens.</span><span style={{color:'#79C0FF'}}>radius</span><span style={{color:'#C9D1D9'}}> = </span><span style={{color:'#79C0FF'}}>12</span><span style={{color:'#C9D1D9'}}>;</span></div>
        {built && <div style={{color:'#3FB950'}} className="animate-in fade-in">{'// ✓ Build complete · 0 errors · 945ms'}</div>}
      </div>
      <div className="px-3 pb-3">
        <button onClick={() => { sound.playClick(1.1); setBuilt(b=>!b); }}
          className="w-full py-1.5 rounded text-[10px] font-bold cursor-pointer transition-all"
          style={{ background: built ? '#1F6FEB22' : '#238636', color: built ? '#58A6FF' : '#fff', border: built ? '1px solid #1F6FEB' : '1px solid #2EA043' }}>
          {built ? '✓ BUILD SUCCESSFUL' : '▶ npm run build'}
        </button>
      </div>
    </div>
  );
};

const RetroPixelDemo: React.FC = () => {
  const [score, setScore] = useState(1420);
  return (
    <div className="h-full p-4 flex flex-col gap-3" style={{ background:'#0A0A0A', imageRendering:'pixelated' }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold" style={{ color:'#33FF33', fontFamily:'monospace', textShadow:'0 0 8px #33FF33' }}>DESIGN_OS v2.4</span>
        <span className="text-[10px]" style={{ color:'#33FF33', fontFamily:'monospace', opacity:0.6 }}>HI: 9999</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {[['TASTE','100%','#33FF33'],['SKILL','98%','#33FF33'],['SPEED','87%','#FFFF00'],['SLOP','0%','#FF4444']].map(([l,v,c]) => (
          <div key={l} className="flex flex-col items-center gap-1 p-2" style={{ border:`1px solid ${c}22`, background:`${c}08` }}>
            <span className="text-[7px] font-bold" style={{ color:`${c}99`, fontFamily:'monospace' }}>{l}</span>
            <span className="text-[11px] font-black" style={{ color: c as string, fontFamily:'monospace', textShadow:`0 0 6px ${c}` }}>{v}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 border p-2 space-y-0.5" style={{ borderColor:'#33FF3330', background:'#00110022' }}>
        <div className="text-[9px]" style={{ color:'#33FF3388', fontFamily:'monospace' }}>{'> PIXEL GRID: 8×8 ENFORCED'}</div>
        <div className="text-[9px]" style={{ color:'#33FF3388', fontFamily:'monospace' }}>{'> DITHERING: ACTIVE'}</div>
        <div className="text-[9px] animate-pulse" style={{ color:'#33FF33', fontFamily:'monospace' }}>{'> █ CURSOR BLINK_'}</div>
      </div>
      <button onClick={() => { sound.playClick(1.5); setScore(s=>s+100); }}
        className="w-full py-2 font-bold text-[10px] cursor-pointer transition-all hover:scale-[1.02]"
        style={{ border:'2px solid #33FF33', color:'#33FF33', background:'transparent', fontFamily:'monospace', textShadow:'0 0 8px #33FF33', boxShadow:'0 0 12px #33FF3333' }}>
        [PRESS START · SCORE: {score}]
      </button>
    </div>
  );
};

const OrganicDemo: React.FC = () => {
  const [active, setActive] = useState<string|null>(null);
  const tags = ['Fluid','Natural','Alive','Warm','Crafted'];
  return (
    <div className="h-full relative overflow-hidden p-5 flex flex-col gap-4" style={{ background:'#FEF9F0' }}>
      <div className="absolute -top-10 -right-10 w-40 h-40 opacity-20" style={{ background:'#FCA5A5', borderRadius:'60% 40% 70% 30%', filter:'blur(20px)' }} />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 opacity-20" style={{ background:'#86EFAC', borderRadius:'30% 70% 40% 60%', filter:'blur(16px)' }} />
      <div className="relative z-10">
        <div className="text-[9px] font-mono uppercase tracking-[0.2em]" style={{ color:'#92400E' }}>Organic Interface</div>
        <div className="text-xl font-black leading-tight mt-1" style={{ color:'#78350F', fontFamily:'Georgia, serif' }}>Curves & Crafted Imperfection</div>
      </div>
      <div className="relative z-10 flex flex-wrap gap-2">
        {tags.map(t => (
          <button key={t} onClick={() => { sound.playClick(0.9); setActive(a=>a===t?null:t); }}
            className="px-3 py-1.5 text-[10px] font-bold cursor-pointer transition-all hover:scale-105"
            style={{
              background: active===t ? '#78350F' : 'rgba(255,255,255,0.7)',
              color: active===t ? 'white' : '#78350F',
              borderRadius:'50% 30% 60% 40% / 40% 60% 30% 50%',
              border:'1.5px solid rgba(120,53,15,0.2)',
              backdropFilter:'blur(4px)',
            }}>
            {t}
          </button>
        ))}
      </div>
      <div className="relative z-10 mt-auto text-[10px] font-mono" style={{ color:'#92400E' }}>
        {active ? `"${active}" — chosen with intention.` : 'Asymmetry as deliberate design choice.'}
      </div>
    </div>
  );
};

const CorporateDemo: React.FC = () => (
  <div className="h-full p-4 flex flex-col gap-2.5 font-sans" style={{ background:'#F8FAFC' }}>
    <div className="flex items-center justify-between border-b pb-2" style={{ borderColor:'#E2E8F0' }}>
      <span className="text-[10px] font-semibold text-gray-500 tracking-wide uppercase">Q3 Performance · FY2026</span>
      <span className="text-[9px] px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-700">ENTERPRISE TIER</span>
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1">
      {[{ label:'Revenue', val:'$2.4M', delta:'+12%', pos:true },{ label:'Active Users', val:'14,200', delta:'+8%', pos:true },{ label:'Churn Rate', val:'2.1%', delta:'-0.4%', pos:true },{ label:'NPS Score', val:'74', delta:'+6pts', pos:true }].map((m) => (
        <div key={m.label} className="p-2.5 rounded flex flex-col justify-between" style={{ background:'#fff', border:'1px solid #E2E8F0' }}>
          <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wide">{m.label}</div>
          <div className="text-base font-bold text-gray-800">{m.val}</div>
          <div className="text-[9px] font-semibold text-green-600">{m.delta} YoY</div>
        </div>
      ))}
    </div>
    <button onClick={() => sound.playClick(0.8)} className="w-full py-1.5 text-xs font-semibold rounded cursor-pointer" style={{ background:'#2563EB', color:'#fff' }}>
      Export Report (PDF)
    </button>
  </div>
);

const GamingHudDemo: React.FC = () => {
  const [pct, setPct] = useState(73);
  return (
    <div className="h-full relative overflow-hidden p-3 font-mono" style={{ background:'#020B14', border:'1px solid rgba(0,255,170,0.2)' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 12px,rgba(0,255,170,0.8) 12px,rgba(0,255,170,0.8) 13px)' }} />
      <div className="relative z-10 h-full flex flex-col gap-2">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-bold tracking-widest" style={{ color:'#00FFAA', textShadow:'0 0 8px #00FFAA' }}>DESIGN_OS v2.4</span>
          <span className="animate-pulse" style={{ color:'#00FFAA' }}>◉ LIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-[9px]">
          {[['SKILL','98'],['TASTE','100'],['SLOP','0']].map(([k,v]) => (
            <div key={k} className="p-2 flex flex-col gap-1.5" style={{ border:'1px solid rgba(0,255,170,0.2)', background:'rgba(0,255,170,0.03)' }}>
              <span style={{ color:'rgba(0,255,170,0.5)' }}>{k}</span>
              <span className="font-black text-base" style={{ color:'#00FFAA', textShadow:`0 0 10px #00FFAA` }}>{v}</span>
              <div className="h-0.5 rounded" style={{ background:'rgba(0,255,170,0.15)' }}>
                <div className="h-full rounded" style={{ width:`${v}%`, background:'#00FFAA', boxShadow:'0 0 4px #00FFAA' }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[9px]">
          <span style={{ color:'rgba(0,255,170,0.5)' }}>PROGRESS:</span>
          <div className="flex-1 h-1.5 rounded-full" style={{ background:'rgba(0,255,170,0.1)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width:`${pct}%`, background:'#00FFAA', boxShadow:'0 0 8px #00FFAA' }} />
          </div>
          <span style={{ color:'#00FFAA', fontWeight:'900' }}>{pct}%</span>
        </div>
        <button onClick={() => { sound.playClick(1.4); setPct(p=>Math.min(100,p+Math.floor(Math.random()*15)+5)); }}
          className="w-full py-2 font-black text-[10px] tracking-[0.2em] cursor-pointer"
          style={{ background:'rgba(0,255,170,0.08)', color:'#00FFAA', border:'1px solid rgba(0,255,170,0.35)', textShadow:'0 0 8px #00FFAA', boxShadow:'0 0 12px rgba(0,255,170,0.1)' }}>
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
    <div className="h-full p-5 flex flex-col gap-3" style={{ background:'#FDF6E3', fontFamily:'Georgia, serif', boxShadow:'inset 0 0 80px rgba(0,0,0,0.04)' }}>
      <div className="flex items-baseline justify-between border-b pb-2" style={{ borderColor:'#D4C5A0' }}>
        <span className="text-xl font-black" style={{ color:'#3D2B1F' }}>Studio Notes</span>
        <span className="text-[9px] font-mono" style={{ color:'#8B7355' }}>Sep 17, 2026</span>
      </div>
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {notes.map((n, i) => (
          <div key={i} className="text-xs leading-relaxed" style={{ color:'#3D2B1F' }}>
            {i === 0 ? <strong>{n}</strong> : <em style={{ color:'#8B7355' }}>{n}</em>}
          </div>
        ))}
      </div>
      <div className="flex items-end gap-2 border-t pt-2" style={{ borderColor:'#D4C5A0' }}>
        <input value={note} onChange={e=>setNote(e.target.value)}
          placeholder="Add a note..."
          className="flex-1 bg-transparent text-xs outline-none placeholder-[#C4A97D]"
          style={{ color:'#3D2B1F', fontFamily:'Georgia, serif', borderBottom:'1px solid #D4C5A0' }} />
        <button onClick={() => { if(note.trim()){sound.playClick(0.9);setNotes(n=>[...n,note]);setNote('');} }}
          className="text-[9px] font-mono cursor-pointer hover:underline" style={{ color:'#8B7355' }}>+ save</button>
      </div>
    </div>
  );
};

const CosmicDemo: React.FC = () => {
  const [launched, setLaunched] = useState(false);
  return (
    <div className="h-full relative overflow-hidden p-4 font-mono" style={{ background:'#050813' }}>
      {Array.from({length:28}).map((_,i) => (
        <div key={i} className="absolute rounded-full" style={{ top:`${Math.random()*100}%`, left:`${Math.random()*100}%`, width: i%5===0?'2px':'1px', height: i%5===0?'2px':'1px', background:'white', opacity: Math.random()*0.8+0.2 }} />
      ))}
      <div className="relative z-10 h-full flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full animate-pulse" style={{ background:'#A855F7', boxShadow:'0 0 12px #A855F7' }} />
          <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color:'#A855F7' }}>Deep Space UI · Sector 7G</span>
        </div>
        <div className="text-2xl font-black leading-tight" style={{ color:'#F8FAFC', textShadow:'0 0 24px rgba(168,85,247,0.6)' }}>BEYOND<br />THE SLOP</div>
        <div className="grid grid-cols-2 gap-1.5 text-[9px] flex-1">
          {[['STARS MAPPED','∞'],['SLOP RATE','0.000%'],['TASTE INDEX','99.8'],['LAUNCH','T+14:22']].map(([k,v]) => (
            <div key={k} className="p-2 flex flex-col justify-between" style={{ border:'1px solid rgba(168,85,247,0.2)', background:'rgba(168,85,247,0.05)' }}>
              <div style={{ color:'rgba(196,181,253,0.5)' }}>{k}</div>
              <div className="font-bold text-sm" style={{ color:'#c4b5fd' }}>{v}</div>
            </div>
          ))}
        </div>
        <button onClick={() => { sound.playSuccess(); setLaunched(l=>!l); }}
          className="py-2 text-[10px] font-bold tracking-widest cursor-pointer transition-all"
          style={{ background: launched ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.12)', border:'1px solid rgba(168,85,247,0.4)', color:'#c4b5fd', boxShadow: launched ? '0 0 20px rgba(168,85,247,0.3)' : 'none' }}>
          {launched ? '🚀 MISSION LAUNCHED' : 'LAUNCH MISSION →'}
        </button>
      </div>
    </div>
  );
};

const WabiSabiDemo: React.FC = () => (
  <div className="h-full p-6 flex flex-col gap-5" style={{ background:'#F7F3EE' }}>
    <div className="text-[8px] font-mono tracking-[0.35em] uppercase" style={{ color:'#9E8E7E' }}>不完全さの美学</div>
    <div>
      <div className="text-3xl font-black leading-[1.1]" style={{ color:'#3D3530', fontFamily:'Georgia, serif', letterSpacing:'-0.02em' }}>
        Imperfect.<br /><span style={{ marginLeft:'1.5rem' }}>Incomplete.</span><br />Impermanent.
      </div>
    </div>
    <div className="space-y-2 font-mono text-[10px]" style={{ color:'#7A6D65' }}>
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
    <div className="h-full p-5 flex flex-col justify-between overflow-hidden" style={{ background:'#FFFEF7' }}>
      <div className="text-[8px] font-mono text-gray-400 uppercase tracking-widest">Type IS the Interface · No icons · No chrome</div>
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <div className="font-black tracking-tighter leading-none" style={{ fontSize:`${size}px`, color:'#11100E', letterSpacing:'-0.04em' }}>TYPE.</div>
        <div className="text-[10px] font-mono text-red-500 font-bold tracking-tighter">IS THE</div>
        <div className="font-black tracking-tighter leading-none" style={{ fontSize:`${size*0.65}px`, color:'#77736B', letterSpacing:'-0.03em' }}>INTERFACE.</div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between font-mono text-[9px] text-gray-400">
          <span>Font size: {size}px</span>
          <span>Inter · 900 · −0.04em</span>
        </div>
        <input type="range" min="24" max="72" value={size} onChange={(e)=>{setSize(+e.target.value);sound.playClick(0.7);}} className="w-full cursor-pointer" style={{ accentColor:'#11100E' }} />
      </div>
    </div>
  );
};

const SkeuomorphicDemo: React.FC = () => {
  const [on, setOn] = useState(false);
  return (
    <div className="h-full p-4 flex flex-col gap-3" style={{ background:'linear-gradient(180deg,#d4d4d4,#b8b8b8)', border:'2px solid #aaa', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.6)' }}>
      <div className="text-[10px] font-bold text-[#444] uppercase tracking-wide text-center" style={{ textShadow:'0 1px 0 rgba(255,255,255,0.7)' }}>DESIGN STUDIO PRO</div>
      <div className="flex gap-3 justify-center">
        {['🎨','✏️','📐','🔍'].map((icon, i) => (
          <button key={i} onClick={() => sound.playClick(1.2)}
            className="w-13 h-13 rounded-xl flex items-center justify-center text-xl cursor-pointer active:shadow-none transition-all"
            style={{ background:'linear-gradient(180deg,#e8e8e8,#c8c8c8)', border:'1px solid #aaa', boxShadow:'0 4px 8px rgba(0,0,0,0.25),inset 0 1px 0 rgba(255,255,255,0.6)', width:'48px', height:'48px' }}>
            {icon}
          </button>
        ))}
      </div>
      <div className="p-3 rounded text-[10px] font-mono text-[#333]" style={{ background:'rgba(255,255,255,0.4)', border:'1px solid rgba(255,255,255,0.6)', boxShadow:'inset 0 1px 3px rgba(0,0,0,0.1)' }}>
        Imitates real materials. Depth through light simulation.
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-[#555] font-mono">Power</span>
        <button onClick={() => { sound.playSwitch(!on); setOn(o=>!o); }}
          className="relative w-12 h-6 rounded-full cursor-pointer transition-all"
          style={{ background: on ? 'linear-gradient(180deg,#4CAF50,#388E3C)' : 'linear-gradient(180deg,#999,#777)', border:'1px solid rgba(0,0,0,0.3)', boxShadow:'inset 0 2px 4px rgba(0,0,0,0.3)' }}>
          <div className="absolute top-0.5 w-5 h-5 rounded-full transition-all" style={{ left: on ? '24px' : '2px', background:'linear-gradient(180deg,#f0f0f0,#d0d0d0)', boxShadow:'0 2px 4px rgba(0,0,0,0.3)' }} />
        </button>
      </div>
    </div>
  );
};

const AntiDesignDemo: React.FC = () => {
  const [hits, setHits] = useState(0);
  return (
    <div className="h-full overflow-hidden relative cursor-crosshair" style={{ background:'#FF0066' }} onClick={() => { sound.playSlopAlert(); setHits(h=>h+1); }}>
      <div className="absolute top-2 left-2 font-black leading-none rotate-[-12deg]" style={{ fontFamily:'Impact, sans-serif', fontSize:'36px', color:'rgba(255,255,255,0.7)' }}>RULES?</div>
      <div className="absolute top-8 right-2 font-mono text-[7px] text-white/50 rotate-[3deg]">{'{ border: none; padding: chaos; }'}</div>
      <div className="absolute bottom-10 left-6 text-white font-black text-2xl rotate-[5deg]" style={{ fontFamily:'Impact,sans-serif' }}>BROKEN</div>
      <div className="absolute bottom-5 right-3 text-white/60 font-mono text-[8px] rotate-[-4deg]">intentionally wrong.</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="bg-white text-[#FF0066] font-black px-4 py-2 rotate-1" style={{ fontFamily:'Impact,sans-serif', fontSize:'13px', border:'3px solid white', boxShadow:'4px 4px 0 rgba(0,0,0,0.3)' }}>
          CLICK IF YOU DARE
        </div>
        {hits > 0 && (
          <div className="font-mono text-[10px] text-white/80 bg-black/30 px-2 py-1 rotate-[-2deg]">
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
          <span className={`font-mono text-[10px] px-2 py-0.5 rounded border font-bold ${current.tag.includes('⚠') || current.tag.includes('CHAOS') ? 'text-[#DC2626] border-[#DC2626]/30 bg-[#DC2626]/5' : 'text-[#11100E] border-[#11100E]/20'}`}>
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
        <span>05 / 25</span>
      </div>
    </div>
  );
};
