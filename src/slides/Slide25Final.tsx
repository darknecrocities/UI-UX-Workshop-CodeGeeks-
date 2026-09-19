import React, { useState } from 'react';
import { sound } from '../audio/sound';
import { Sparkles, ExternalLink, Check, Copy, QrCode } from 'lucide-react';

export const Slide25Final: React.FC = () => {
  const [copiedBio, setCopiedBio] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const copyInfo = () => {
    sound.playSuccess();
    navigator.clipboard.writeText('Arron Parejas — https://arronparejas.dev (Founder @ DomoDomo · Former GDG Campus Lead)');
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  const copyFormUrl = () => {
    sound.playSuccess();
    navigator.clipboard.writeText('https://forms.gle/4pjCGQDRALJwEBo4A');
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-10 max-w-7xl mx-auto select-none">
      {/* Top Meta */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-3 font-mono text-xs text-[#77736B]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#11100E]" />
          <span className="tracking-widest uppercase font-bold text-[#11100E]">
            30 / AUDIENCE VOTE & FINAL THOUGHT
          </span>
        </div>
        <span className="tracking-wider font-semibold text-[#11100E]">NO AI SLOP</span>
      </div>

      {/* Main Content: 2-Column Balanced Grid */}
      <div className="my-auto py-3 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Column: Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5">
          <div className="space-y-1">
            <h1
              onMouseEnter={() => sound.playClick(1.2)}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none text-[#11100E] cursor-default"
            >
              DON'T JUST GENERATE.
            </h1>
            <h1
              onMouseEnter={() => sound.playClick(0.9)}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none text-[#11100E] cursor-default"
            >
              <span className="underline decoration-4 underline-offset-8 decoration-[#11100E]">
                DESIGN.
              </span>
            </h1>
          </div>

          <div className="space-y-1 max-w-xl">
            <p className="text-lg sm:text-xl text-[#11100E] font-medium tracking-tight">
              AI can help you ship faster.
            </p>
            <p className="text-base sm:text-lg text-[#77736B] font-medium tracking-tight">
              Taste determines what is worth shipping.
            </p>
          </div>

          {/* Interactive Speaker Actions */}
          <div className="pt-3 border-t border-[#11100E]/15 flex flex-wrap items-center gap-3">
            <button
              onClick={copyInfo}
              className="px-4 py-2 rounded-xl bg-[#11100E] text-[#F5F1E8] font-mono text-xs font-bold flex items-center gap-2 cursor-pointer hover:bg-black transition-colors shadow-sm"
            >
              {copiedBio ? <Check className="w-4 h-4 text-[#F5F1E8]" /> : <Copy className="w-4 h-4" />}
              <span>{copiedBio ? 'SPEAKER INFO COPIED!' : 'COPY SPEAKER BIO'}</span>
            </button>
            <a
              href="https://arronparejas.dev"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playClick(1.1)}
              className="px-4 py-2 rounded-xl bg-transparent border border-[#11100E]/20 text-[#11100E] font-mono text-xs font-bold flex items-center gap-1.5 hover:bg-[#11100E]/5 transition-colors"
            >
              <span>arronparejas.dev</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: QR Code Live Audience Voting Box */}
        <div className="lg:col-span-5">
          <div className="bg-white/95 backdrop-blur-sm border-2 border-[#11100E] rounded-2xl p-5 sm:p-6 shadow-[5px_5px_0px_0px_#11100E] flex flex-col items-center text-center">
            {/* Header Badge */}
            <div className="w-full flex items-center justify-between border-b border-[#11100E]/15 pb-2.5 mb-3 font-mono">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#11100E]" />
                <span className="text-[11px] font-black tracking-widest uppercase text-[#11100E]">
                  LIVE VOTE
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#11100E] text-[#F5F1E8] font-bold">
                AT LEAST 3 VOTES EACH
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#11100E] mb-1">
              VOTE FOR BEST UI/UX
            </h2>
            <p className="text-xs sm:text-sm text-[#77736B] font-medium max-w-sm mb-3">
              Scan to vote for the best workshop designs. Please cast{' '}
              <span className="text-[#11100E] font-bold underline decoration-[#11100E] underline-offset-2">
                at least 3 votes
              </span>{' '}
              each!
            </p>

            {/* QR Code Container */}
            <div className="relative p-2.5 bg-white rounded-xl border-2 border-[#11100E] shadow-inner flex flex-col items-center justify-center">
              <img
                src="/assets/images/vote-qr.svg"
                alt="UI/UX Voting Google Form QR Code"
                className="w-40 h-40 sm:w-44 sm:h-44 object-contain"
              />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#11100E] mt-1.5">
                SCAN WITH CAMERA
              </span>
            </div>

            {/* Action Buttons */}
            <div className="w-full mt-3.5 flex flex-col sm:flex-row gap-2">
              <a
                href="https://forms.gle/4pjCGQDRALJwEBo4A"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick(1.2)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#11100E] text-[#F5F1E8] font-mono text-xs font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>OPEN FORM</span>
              </a>
              <button
                onClick={copyFormUrl}
                className="px-4 py-2.5 rounded-xl bg-transparent border border-[#11100E]/30 text-[#11100E] font-mono text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#11100E]/5 transition-colors cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#11100E]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'COPIED!' : 'COPY LINK'}</span>
              </button>
            </div>

            {/* Direct Link Mono Display */}
            <div className="mt-2.5 font-mono text-[11px] text-[#77736B] flex items-center gap-1.5">
              <span>URL:</span>
              <a
                href="https://forms.gle/4pjCGQDRALJwEBo4A"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#11100E] font-bold hover:underline bg-[#11100E]/5 px-2 py-0.5 rounded border border-[#11100E]/10"
              >
                forms.gle/4pjCGQDRALJwEBo4A
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dossier & Contact */}
      <div className="pt-3 border-t border-[#11100E]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-3 font-mono text-xs">
        <div>
          <div className="text-sm font-bold text-[#11100E]">ARRON PAREJAS</div>
          <div className="text-[#77736B] mt-0.5">
            Former GDG Campus Lead · Founder — DomoDomo · ML Engineer — FlyRank
          </div>
        </div>

        <div className="text-right flex flex-col items-end">
          <span className="text-[#77736B] text-[10px] uppercase tracking-widest block">
            WORKSHOP CONCLUDED
          </span>
          <span className="text-xs font-bold text-[#11100E] tracking-wider">
            FROM SKETCH TO SHIP.
          </span>
          <span className="text-[#77736B] text-[10px] font-mono mt-0.5">
            30 / 30
          </span>
        </div>
      </div>
    </div>
  );
};
