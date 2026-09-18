import React, { useState } from 'react';
import { sound } from '../audio/sound';
import {
  Building2,
  Users,
  Code2,
  DollarSign,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

type PersonaType = 'EXECUTIVE' | 'DEVELOPER' | 'PROCUREMENT';
type ViewMode = 'PROPORTIONAL' | 'OVERCOMPLICATED';

export const Slide17MultiPageBiz: React.FC = () => {
  const [activePersona, setActivePersona] = useState<PersonaType>('EXECUTIVE');
  const [viewMode, setViewMode] = useState<ViewMode>('PROPORTIONAL');

  const personas = [
    {
      id: 'EXECUTIVE' as PersonaType,
      role: 'Enterprise Buyer / VP',
      goal: 'Evaluate ROI, security, and market credibility.',
      destination: '/customers & /security',
      proportionalHighlight: 'Case studies with real % growth + SOC-2 Type II audit report.',
      icon: Users,
    },
    {
      id: 'DEVELOPER' as PersonaType,
      role: 'Tech Lead / Architect',
      goal: 'Inspect API ergonomics, latency, and integration pain.',
      destination: '/docs/api & /changelog',
      proportionalHighlight: 'Interactive curl playground + copyable SDK installation.',
      icon: Code2,
    },
    {
      id: 'PROCUREMENT' as PersonaType,
      role: 'Finance & Operations',
      goal: 'Verify transparent pricing tiers, seats, and invoicing.',
      destination: '/pricing & /legal/sla',
      proportionalHighlight: 'Self-serve pricing calculator with zero hidden paywalls.',
      icon: DollarSign,
    },
  ];

  const currentPersona = personas.find((p) => p.id === activePersona) || personas[0];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto select-none font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#11100E]" />
          <span className="text-xs uppercase tracking-widest text-[#77736B]">
            18 / PAGE ARCHITECTURE · ENTERPRISE ECOSYSTEMS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#11100E] text-[#F5F1E8]">
            MULTI-PAGE BUSINESS SYSTEMS
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Principles & Persona Router (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#11100E]/10 text-[#11100E] text-[10px] font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3 h-3 text-[#11100E]" />
              <span>Information Architecture Law</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#11100E] leading-tight font-sans">
              PROPORTIONAL VALUE.
              <br />
              <span className="text-[#77736B]">NOT OVERCOMPLICATED UI.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#77736B] leading-relaxed">
              Business websites serve multiple stakeholders with competing agendas. Shoving enterprise security, API reference,
              and multi-tier pricing into one endless single-scroll creates chaotic AI slop. Multi-page systems provide dedicated,
              high-signal rooms for each intent.
            </p>
          </div>

          {/* Persona Intent Switcher */}
          <div className="space-y-2">
            <span className="text-[10px] text-[#77736B] uppercase font-bold tracking-wider">
              SELECT STAKEHOLDER INTENT:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {personas.map((p) => {
                const IconComponent = p.icon;
                const isSelected = activePersona === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      sound.playClick(1.1);
                      setActivePersona(p.id);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-sm'
                        : 'bg-[#F5F1E8] text-[#77736B] border-[#11100E]/15 hover:border-[#11100E]/40 hover:text-[#11100E]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
                      <IconComponent className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{p.role.split(' ')[0]}</span>
                    </div>
                    <div className={`text-[9px] truncate ${isSelected ? 'text-[#F5F1E8]/80' : 'text-[#77736B]'}`}>
                      {p.destination}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Persona Deep-Dive Card */}
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#11100E]/20 space-y-2 text-xs shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#11100E] uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{currentPersona.role} Pathway</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-[#11100E]/10 text-[9px] font-bold text-[#11100E]">
                Route: {currentPersona.destination}
              </span>
            </div>

            <p className="text-[#2D2A26] text-xs leading-relaxed">
              <strong>Stakeholder Objective:</strong> {currentPersona.goal}
            </p>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-600/20 text-[11px] text-amber-950 flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Proportional Value Delivery:</strong> {currentPersona.proportionalHighlight}
              </div>
            </div>
          </div>

          {/* 3 Golden Laws of Clean Business Architecture */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-[10px]">
            <div className="p-2.5 rounded-xl bg-[#F5F1E8] border border-[#11100E]/10">
              <div className="font-bold text-[#11100E] mb-0.5">1. Single Intent</div>
              <div className="text-[#77736B]">Homepage qualifies, Pricing compares, Docs instruct.</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F5F1E8] border border-[#11100E]/10">
              <div className="font-bold text-[#11100E] mb-0.5">2. Transparent Pricing</div>
              <div className="text-[#77736B]">Never hide core pricing behind forced sales calls.</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F5F1E8] border border-[#11100E]/10">
              <div className="font-bold text-[#11100E] mb-0.5">3. Predictable Nav</div>
              <div className="text-[#77736B]">No mystery meat mega-menus or hidden links.</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive UI Sanity Workbench (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Mode Switcher Banner */}
          <div className="w-full max-w-sm mb-2 flex items-center justify-between bg-[#F5F1E8] p-1 rounded-xl border border-[#11100E]/15 text-[10px]">
            <span className="font-bold text-[#77736B] px-2">ARCHITECTURE COMPARISON:</span>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  sound.playClick(1.1);
                  setViewMode('PROPORTIONAL');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'PROPORTIONAL'
                    ? 'bg-[#11100E] text-[#F5F1E8] shadow-xs'
                    : 'text-[#77736B] hover:text-[#11100E]'
                }`}
              >
                ✦ Proportional
              </button>
              <button
                onClick={() => {
                  sound.playClick(1.2);
                  setViewMode('OVERCOMPLICATED');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'OVERCOMPLICATED'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'text-[#77736B] hover:text-red-700'
                }`}
              >
                ✕ Overcomplicated
              </button>
            </div>
          </div>

          {/* Browser Mockup */}
          <div className="w-full max-w-sm rounded-2xl border-2 border-[#11100E] bg-[#11100E] shadow-xl overflow-hidden text-[9px]">
            {/* Window Bar */}
            <div className="px-3 py-2 bg-[#181614] flex items-center justify-between border-b border-white/10 text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-green-500/80" />
                <span className="ml-1 text-slate-300 font-mono text-[10px]">
                  {viewMode === 'PROPORTIONAL' ? 'cloudengine.io' : 'synergistic-ai-matrix-corp.com'}
                </span>
              </div>
              <span
                className={`px-1.5 py-0.5 rounded font-bold text-[8px] ${
                  viewMode === 'PROPORTIONAL'
                    ? 'bg-emerald-400/20 text-emerald-300'
                    : 'bg-red-500/20 text-red-300 animate-pulse'
                }`}
              >
                {viewMode === 'PROPORTIONAL' ? '12% CLUTTER (HIGH SIGNAL)' : '94% CLUTTER (SLOP)'}
              </span>
            </div>

            {/* Viewport Render: Proportional vs Overcomplicated */}
            <div className="bg-[#FAF7F2] p-3 text-[#11100E] min-h-[350px] flex flex-col justify-between">
              {viewMode === 'PROPORTIONAL' ? (
                /* Mode A: Clean Proportional Business System (Stripe / Linear style) */
                <div className="space-y-3">
                  {/* Clean 5-Item Top Nav */}
                  <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2">
                    <span className="font-black text-[11px] tracking-tight">CLOUDENGINE</span>
                    <div className="flex items-center gap-2 text-[#77736B] text-[8px] font-bold">
                      <span className={activePersona === 'EXECUTIVE' ? 'text-[#11100E] underline' : ''}>Customers</span>
                      <span className={activePersona === 'DEVELOPER' ? 'text-[#11100E] underline' : ''}>Docs</span>
                      <span className={activePersona === 'PROCUREMENT' ? 'text-[#11100E] underline' : ''}>Pricing</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#11100E] text-[#F5F1E8]">Sign In</span>
                    </div>
                  </div>

                  {/* High-Signal Value Hero */}
                  <div className="text-center py-2 space-y-1">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-900 font-bold text-[8px]">
                      {activePersona === 'EXECUTIVE' && 'SOC-2 COMPLIANT ENTERPRISE CLOUD'}
                      {activePersona === 'DEVELOPER' && 'TYPESCRIPT SDK · 0ms COLD START'}
                      {activePersona === 'PROCUREMENT' && 'TRANSPARENT USAGE BASED PRICING'}
                    </span>
                    <h3 className="text-base font-black tracking-tight text-[#11100E] font-sans">
                      {activePersona === 'EXECUTIVE' && 'Scale infrastructure with zero security compromise.'}
                      {activePersona === 'DEVELOPER' && 'Deploy globally in 1 command. No YAML required.'}
                      {activePersona === 'PROCUREMENT' && 'Predictable billing without unexpected spikes.'}
                    </h3>
                  </div>

                  {/* Proportional Section Card */}
                  <div className="p-3 rounded-xl bg-white border border-[#11100E]/15 shadow-2xs space-y-2">
                    {activePersona === 'EXECUTIVE' && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[8px] font-bold">
                          <span>TRUSTED BY GLOBAL TEAMS:</span>
                          <span className="text-emerald-700">99.999% UPTIME</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 text-center text-[8px]">
                          <div className="p-1 rounded bg-[#F5F1E8] font-bold">Vercel</div>
                          <div className="p-1 rounded bg-[#F5F1E8] font-bold">Linear</div>
                          <div className="p-1 rounded bg-[#F5F1E8] font-bold">Figma</div>
                        </div>
                        <div className="text-[8px] text-[#77736B] pt-1">
                          ↳ Download SOC-2 Type II Independent Audit PDF
                        </div>
                      </div>
                    )}

                    {activePersona === 'DEVELOPER' && (
                      <div className="space-y-1.5">
                        <div className="p-2 rounded-lg bg-[#11100E] text-emerald-400 font-mono text-[8px]">
                          $ npm i @cloudengine/sdk
                        </div>
                        <div className="flex justify-between text-[8px] text-[#77736B]">
                          <span>Edge Latency: 18ms</span>
                          <span>Node / Deno / Bun</span>
                        </div>
                      </div>
                    )}

                    {activePersona === 'PROCUREMENT' && (
                      <div className="grid grid-cols-2 gap-1.5 text-center text-[8px]">
                        <div className="p-2 rounded-lg border border-[#11100E]/15 bg-[#F5F1E8]">
                          <div className="font-bold">PRO TEAM</div>
                          <div className="text-sm font-black">$20/mo</div>
                          <div className="text-[#77736B]">Unlimited seats</div>
                        </div>
                        <div className="p-2 rounded-lg border-2 border-[#11100E] bg-white">
                          <div className="font-bold">ENTERPRISE</div>
                          <div className="text-sm font-black">Custom SLA</div>
                          <div className="text-[#77736B]">Dedicated VPC</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Mode B: Overcomplicated AI Slop Anti-Pattern */
                <div className="space-y-2 text-center relative py-1">
                  {/* Flashing Badges & Nested Mega Menu Maze */}
                  <div className="p-1 bg-red-600 text-white font-bold text-[7px] animate-pulse">
                    🔥 90% OFF SPECIAL LIMITED AI UPGRADE! TALK TO SALES NOW!
                  </div>

                  <div className="flex justify-between text-[7px] text-[#77736B] border-b pb-1">
                    <span>Products (18) ▼</span>
                    <span>Solutions (24) ▼</span>
                    <span>Enterprise (12) ▼</span>
                    <span>Company (9) ▼</span>
                  </div>

                  <h3 className="text-sm font-black text-red-900 leading-tight">
                    NEXT-GEN OMNICHANNEL REVOLUTIONARY SYNERGISTIC AI MATRIX
                  </h3>

                  <div className="p-2 bg-yellow-100 border border-yellow-400 text-[8px] text-yellow-900 space-y-1">
                    <div>⚠️ 4 Popups blocked</div>
                    <div className="text-[7px]">"Enter your phone number to reveal pricing tiers"</div>
                  </div>

                  {/* Competing CTAs */}
                  <div className="space-y-1">
                    <button className="w-full py-1 bg-red-600 text-white font-bold text-[8px]">
                      SCHEDULE MANDATORY 30-MIN DEMO
                    </button>
                    <button className="w-full py-1 bg-blue-600 text-white font-bold text-[8px]">
                      TALK TO BOT BOT (ONLINE)
                    </button>
                  </div>

                  <div className="text-[7px] text-red-700 font-bold">
                    ✕ Result: High bounce rate, confusion, zero trust.
                  </div>
                </div>
              )}

              {/* Bottom Insight Footer */}
              <div className="border-t border-[#11100E]/15 pt-2 flex items-center justify-between text-[8px] text-[#77736B]">
                <span>ARCHITECTURE: {viewMode === 'PROPORTIONAL' ? 'Clean Multi-Page' : 'Bloated Single Mess'}</span>
                <span className="font-bold text-[#11100E]">
                  {viewMode === 'PROPORTIONAL' ? '✦ USER TRUST: 99%' : '✕ USER TRUST: 14%'}
                </span>
              </div>
            </div>
          </div>

          {/* Golden Takeaway Pill */}
          <div className="mt-3 w-full max-w-sm p-2.5 rounded-xl bg-[#FAF7F2] border border-[#11100E]/15 text-[10px] text-[#2D2A26] leading-snug">
            <div className="font-bold text-[#11100E] mb-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
              <span>THE PROPORTIONAL VALUE RULE:</span>
            </div>
            <span>Make what matters most easiest to find. Everything else belongs in clean progressive disclosure.</span>
          </div>
        </div>
      </div>

      {/* Footer / Progression */}
      <div className="flex items-center justify-between border-t border-[#11100E]/15 pt-3 text-xs text-[#77736B]">
        <span>Business UX is about building trust with different minds. Respect their intent.</span>
        <div className="flex items-center gap-4">
          <span className="font-bold text-[#11100E]">PROPORTIONAL CLARITY</span>
          <span>18 / 28</span>
        </div>
      </div>
    </div>
  );
};
