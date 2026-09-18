import React, { useState, useEffect } from 'react';
import { sound } from '../audio/sound';
import {
  Building2,
  Users,
  Wrench,
  DollarSign,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

type VisitorType = 'CUSTOMER' | 'USER' | 'BUYER';
type ViewMode = 'CLEAN' | 'MESSY';

export const Slide17MultiPageBiz: React.FC = () => {
  const [activeVisitor, setActiveVisitor] = useState<VisitorType>('CUSTOMER');
  const [viewMode, setViewMode] = useState<ViewMode>('CLEAN');

  // Prevent spacebar from advancing slide on Slide 18
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, []);

  const visitors = [
    {
      id: 'CUSTOMER' as VisitorType,
      role: 'New Visitor',
      question: 'What does this product do, and can I trust it?',
      bestPage: 'Home & Customer Stories',
      whatToHighlight: 'Show a 1-sentence explanation and 3 real companies who love it.',
      icon: Users,
    },
    {
      id: 'USER' as VisitorType,
      role: 'Everyday User',
      question: 'How does it work, and is it easy to learn?',
      bestPage: 'Features & Step-by-Step Guide',
      whatToHighlight: 'A simple 30-second preview video and a clean 3-step walkthrough.',
      icon: Wrench,
    },
    {
      id: 'BUYER' as VisitorType,
      role: 'Paying Buyer',
      question: 'How much does it cost, and are there hidden fees?',
      bestPage: 'Clear Pricing Page',
      whatToHighlight: 'Exact monthly price, clear feature list, and a 30-day money-back guarantee.',
      icon: DollarSign,
    },
  ];

  const currentVisitor = visitors.find((v) => v.id === activeVisitor) || visitors[0];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            18 / Business Websites · Clear Structure
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono px-2 py-0.5 rounded text-[10px] font-bold bg-[#11100E] text-[#F5F1E8]">
            SIMPLE BUSINESS PAGES
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Core Rules & Visitor Pathways (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#11100E]/10 text-[#11100E] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3 h-3 text-[#11100E]" />
              <span>The Rule of Honest Value</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#11100E] leading-tight">
              SHOW REAL VALUE.
              <br />
              <span className="text-[#77736B]">DON'T OVERCOMPLICATE THE DESIGN.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#77736B] leading-relaxed font-normal">
              People visit your business website with 3 simple questions: <em>What do you do? How much does it cost? Can I trust you?</em>
              &nbsp;When you cram 50 features and popups onto one page, visitors leave. Simple separate pages give visitors the exact answers they want in seconds.
            </p>
          </div>

          {/* Visitor Type Selector */}
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] text-[#77736B] uppercase font-bold tracking-wider">
              WHO IS VISITING YOUR SITE?
            </span>
            <div className="grid grid-cols-3 gap-2">
              {visitors.map((v) => {
                const IconComponent = v.icon;
                const isSelected = activeVisitor === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      sound.playClick(1.1);
                      setActiveVisitor(v.id);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#11100E] text-[#F5F1E8] border-[#11100E] shadow-sm'
                        : 'bg-[#F5F1E8] text-[#77736B] border-[#11100E]/15 hover:border-[#11100E]/40 hover:text-[#11100E]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold mb-0.5">
                      <IconComponent className="w-3.5 h-3.5 shrink-0" />
                      <span>{v.role}</span>
                    </div>
                    <div className={`text-[10px] truncate font-mono ${isSelected ? 'text-[#F5F1E8]/80' : 'text-[#77736B]'}`}>
                      {v.bestPage.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visitor Insight Card */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#11100E]/15 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#11100E] uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>When a {currentVisitor.role} Arrives:</span>
              </span>
              <span className="font-mono px-2 py-0.5 rounded bg-[#11100E]/10 text-[9px] font-bold text-[#11100E]">
                Best Destination: {currentVisitor.bestPage}
              </span>
            </div>

            <p className="text-[#2D2A26] text-xs leading-relaxed">
              <strong>Their Main Question:</strong> "{currentVisitor.question}"
            </p>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-600/20 text-xs text-amber-950 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong>How to Answer Clearly:</strong> {currentVisitor.whatToHighlight}
              </div>
            </div>
          </div>

          {/* 3 Simple Rules for Clean Business Websites */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
            <div className="p-3 rounded-xl bg-[#F5F1E8] border border-[#11100E]/10">
              <div className="font-bold text-[#11100E] mb-1">1. Clear Words</div>
              <div className="text-[11px] text-[#77736B] leading-snug">Say what you do in plain words anyone can understand.</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F5F1E8] border border-[#11100E]/10">
              <div className="font-bold text-[#11100E] mb-1">2. Honest Prices</div>
              <div className="text-[11px] text-[#77736B] leading-snug">Show prices upfront. Never force people onto a sales call.</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F5F1E8] border border-[#11100E]/10">
              <div className="font-bold text-[#11100E] mb-1">3. Short Menus</div>
              <div className="text-[11px] text-[#77736B] leading-snug">Use 4 or 5 clear links so visitors never feel lost.</div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Comparison (Clean vs Overcomplicated) (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Comparison Toggle */}
          <div className="w-full max-w-sm mb-2 flex items-center justify-between bg-[#F5F1E8] p-1.5 rounded-xl border border-[#11100E]/15 text-xs">
            <span className="font-bold text-[#77736B] px-2 text-[11px]">SEE THE DIFFERENCE:</span>
            <div className="flex gap-1 font-mono text-[10px]">
              <button
                onClick={() => {
                  sound.playClick(1.1);
                  setViewMode('CLEAN');
                }}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'CLEAN'
                    ? 'bg-[#11100E] text-[#F5F1E8] shadow-xs'
                    : 'text-[#77736B] hover:text-[#11100E]'
                }`}
              >
                ✦ Simple & Clear
              </button>
              <button
                onClick={() => {
                  sound.playClick(1.2);
                  setViewMode('MESSY');
                }}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'MESSY'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'text-[#77736B] hover:text-red-700'
                }`}
              >
                ✕ Overcomplicated
              </button>
            </div>
          </div>

          {/* Browser Preview Window */}
          <div className="w-full max-w-sm rounded-2xl border-2 border-[#11100E] bg-[#11100E] shadow-xl overflow-hidden text-xs">
            {/* Window Bar */}
            <div className="px-3 py-2 bg-[#181614] flex items-center justify-between border-b border-white/10 text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-1 text-slate-300 font-mono text-[10px]">
                  {viewMode === 'CLEAN' ? 'simplebiz.com' : 'complicated-enterprise-ai.com'}
                </span>
              </div>
              <span
                className={`font-mono px-2 py-0.5 rounded font-bold text-[8px] ${
                  viewMode === 'CLEAN'
                    ? 'bg-emerald-400/20 text-emerald-300'
                    : 'bg-red-500/20 text-red-300 animate-pulse'
                }`}
              >
                {viewMode === 'CLEAN' ? 'HIGH TRUST (99%)' : 'TOO COMPLICATED (14%)'}
              </span>
            </div>

            {/* Viewport Canvas */}
            <div className="bg-[#FAF7F2] p-3.5 text-[#11100E] min-h-[350px] flex flex-col justify-between">
              {viewMode === 'CLEAN' ? (
                /* Simple, Clean, Honest Design */
                <div className="space-y-3.5">
                  {/* Clean 4-Item Menu */}
                  <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2 text-xs">
                    <span className="font-black text-sm tracking-tight">SIMPLEBIZ</span>
                    <div className="flex items-center gap-2.5 text-[#77736B] text-[10px] font-bold">
                      <span className={activeVisitor === 'CUSTOMER' ? 'text-[#11100E] underline' : ''}>Stories</span>
                      <span className={activeVisitor === 'USER' ? 'text-[#11100E] underline' : ''}>How It Works</span>
                      <span className={activeVisitor === 'BUYER' ? 'text-[#11100E] underline' : ''}>Pricing</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#11100E] text-[#F5F1E8] text-[9px]">Sign In</span>
                    </div>
                  </div>

                  {/* Clear Hero Headline */}
                  <div className="text-center py-2 space-y-1">
                    <span className="font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-900 font-bold text-[9px]">
                      {activeVisitor === 'CUSTOMER' && 'TRUSTED BY 2,000+ TEAMS'}
                      {activeVisitor === 'USER' && 'READY IN 5 MINUTES'}
                      {activeVisitor === 'BUYER' && 'SIMPLE PRICING · NO HIDDEN FEES'}
                    </span>
                    <h3 className="text-lg font-black tracking-tight text-[#11100E]">
                      {activeVisitor === 'CUSTOMER' && 'The fastest way to manage your daily team tasks.'}
                      {activeVisitor === 'USER' && 'Click, type, and ship. No training needed.'}
                      {activeVisitor === 'BUYER' && '$15 a month. Everything included. Cancel anytime.'}
                    </h3>
                  </div>

                  {/* Clean Section Content */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#11100E]/15 shadow-2xs space-y-2">
                    {activeVisitor === 'CUSTOMER' && (
                      <div className="space-y-2 text-center">
                        <div className="text-[10px] font-bold text-[#77736B] uppercase tracking-wider">
                          LOVED BY FAST GROWING TEAMS
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="p-1.5 rounded-lg bg-[#F5F1E8] font-bold">Acme Corp</div>
                          <div className="p-1.5 rounded-lg bg-[#F5F1E8] font-bold">Studio X</div>
                          <div className="p-1.5 rounded-lg bg-[#F5F1E8] font-bold">Beacon Labs</div>
                        </div>
                        <div className="text-[10px] text-emerald-800 font-bold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          <span>4.9 / 5 Average Rating from 450+ Reviews</span>
                        </div>
                      </div>
                    )}

                    {activeVisitor === 'USER' && (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#F5F1E8]">
                          <span className="w-5 h-5 rounded-full bg-[#11100E] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                          <span>Create your free workspace</span>
                        </div>
                        <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#F5F1E8]">
                          <span className="w-5 h-5 rounded-full bg-[#11100E] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                          <span>Invite your team with one link</span>
                        </div>
                        <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#F5F1E8]">
                          <span className="w-5 h-5 rounded-full bg-[#11100E] text-white flex items-center justify-center text-[10px] font-bold">3</span>
                          <span>Start getting work done together</span>
                        </div>
                      </div>
                    )}

                    {activeVisitor === 'BUYER' && (
                      <div className="grid grid-cols-2 gap-2 text-center text-xs">
                        <div className="p-2.5 rounded-lg border border-[#11100E]/15 bg-[#F5F1E8]">
                          <div className="font-bold text-[11px]">MONTHLY</div>
                          <div className="text-base font-black my-0.5">$15 <span className="text-[10px] font-normal text-[#77736B]">/mo</span></div>
                          <div className="text-[9px] text-[#77736B]">Billed monthly</div>
                        </div>
                        <div className="p-2.5 rounded-lg border-2 border-[#11100E] bg-white">
                          <div className="font-bold text-[11px]">YEARLY (SAVE 20%)</div>
                          <div className="text-base font-black my-0.5">$12 <span className="text-[10px] font-normal text-[#77736B]">/mo</span></div>
                          <div className="text-[9px] text-emerald-700 font-bold">Best value</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Overcomplicated Mess Anti-Pattern */
                <div className="space-y-2 text-center relative py-1">
                  {/* Cluttered Banners and Jargon */}
                  <div className="p-1 bg-red-600 text-white font-bold text-[8px] animate-pulse">
                    ⚠️ LIMITED TIME! TALK TO SALES TO UNLOCK ENTERPRISE PRICING!
                  </div>

                  <div className="flex justify-between text-[7px] text-[#77736B] border-b pb-1 font-mono">
                    <span>Products (18) ▼</span>
                    <span>Solutions (24) ▼</span>
                    <span>Ecosystem (14) ▼</span>
                    <span>Resources (30) ▼</span>
                  </div>

                  <h3 className="text-sm font-black text-red-900 leading-tight">
                    NEXT-GEN OMNICHANNEL DEEP-LEARNING SYNERGY PLATFORM
                  </h3>

                  <div className="p-2 bg-yellow-100 border border-yellow-400 text-[9px] text-yellow-900 space-y-1">
                    <div className="font-bold">⚠️ Hidden Prices</div>
                    <div className="text-[8px]">"Fill out this 12-question form to speak with an account executive."</div>
                  </div>

                  {/* Annoying Popups */}
                  <div className="space-y-1">
                    <button className="w-full py-1.5 bg-red-600 text-white font-bold text-[9px] rounded">
                      SCHEDULE MANDATORY 30-MIN CALL
                    </button>
                    <button className="w-full py-1.5 bg-blue-600 text-white font-bold text-[9px] rounded">
                      CHAT WITH ROBOT ASSISTANT
                    </button>
                  </div>

                  <div className="text-[9px] text-red-700 font-bold pt-1">
                    ✕ Result: Visitors feel overwhelmed, confused, and bounce.
                  </div>
                </div>
              )}

              {/* Bottom Evaluation */}
              <div className="border-t border-[#11100E]/15 pt-2 flex items-center justify-between text-[10px] text-[#77736B]">
                <span>PAGES: {viewMode === 'CLEAN' ? 'Dedicated Clean Rooms' : 'One Huge Confusing Mess'}</span>
                <span className="font-bold text-[#11100E]">
                  {viewMode === 'CLEAN' ? '✦ CONVERSION: HIGH' : '✕ BOUNCE RATE: 86%'}
                </span>
              </div>
            </div>
          </div>

          {/* Simple Takeaway Box */}
          <div className="mt-3 w-full max-w-sm p-3 rounded-xl bg-[#FAF7F2] border border-[#11100E]/15 text-xs text-[#2D2A26] leading-snug">
            <div className="font-bold text-[#11100E] mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>THE GOLDEN RULE OF BUSINESS WEBSITES:</span>
            </div>
            <span>Make what people care about easiest to find. Honest clarity always beats fancy confusion.</span>
          </div>
        </div>
      </div>

      {/* Footer / Progression */}
      <div className="flex items-center justify-between border-t border-[#11100E]/15 pt-3 text-xs text-[#77736B]">
        <span>Great business design answers questions fast. Keep it simple and honest.</span>
        <div className="flex items-center gap-4">
          <span className="font-bold text-[#11100E]">CLEAR VALUE</span>
          <span className="font-mono">18 / 28</span>
        </div>
      </div>
    </div>
  );
};
