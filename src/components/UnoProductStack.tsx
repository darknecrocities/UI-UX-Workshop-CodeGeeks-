import React, { useState } from 'react';
import { SPEAKER_PRODUCTS } from '../data/slides';
import { sound } from '../audio/sound';
import { ExternalLink } from 'lucide-react';

export const UnoProductStack: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Precise fan angles and subtle arc curvature for 5 product cards
  const cardTransforms = [
    { rotate: -16, translateY: 6, zIndex: 1 },
    { rotate: -8, translateY: 2, zIndex: 2 },
    { rotate: 0, translateY: 0, zIndex: 3 },
    { rotate: 8, translateY: 2, zIndex: 4 },
    { rotate: 16, translateY: 6, zIndex: 5 },
  ];

  const activeProduct = SPEAKER_PRODUCTS[activeIndex] || SPEAKER_PRODUCTS[0];

  const handleCardClick = (prod: (typeof SPEAKER_PRODUCTS)[0], idx: number) => {
    sound.playClick(1.2);
    setActiveIndex(idx);
    if (prod.url) {
      window.open(prod.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-md mx-auto">
      {/* Product Card Fan Container */}
      <div className="relative flex items-end justify-center h-34 sm:h-38 w-full px-6 pt-3">
        {SPEAKER_PRODUCTS.map((prod, idx) => {
          const isSelected = activeIndex === idx;
          const tf = cardTransforms[idx] || { rotate: 0, translateY: 0, zIndex: 1 };

          return (
            <button
              key={prod.id}
              onClick={() => handleCardClick(prod, idx)}
              onMouseEnter={() => {
                sound.playClick(1.3);
                setActiveIndex(idx);
              }}
              style={{
                zIndex: isSelected ? 35 : tf.zIndex,
                transform: isSelected
                  ? `translateY(-20px) rotate(0deg) scale(1.15)`
                  : `translateY(${tf.translateY}px) rotate(${tf.rotate}deg)`,
                marginLeft: idx === 0 ? 0 : '-20px',
              }}
              className={`relative w-20 h-26 sm:w-24 sm:h-30 rounded-2xl cursor-pointer transition-all duration-200 ease-out flex items-center justify-center p-1.5 shadow-xl group ${
                isSelected
                  ? 'ring-2 ring-white/80 shadow-lg bg-[#1A1816]'
                  : 'bg-[#181614] border border-[#2D2A26] hover:border-white/40'
              }`}
              title={`Click to open ${prod.title} (${prod.url})`}
            >
              {/* Product Icon */}
              <img
                src={prod.image}
                alt={prod.title}
                className="w-full h-full object-cover rounded-xl pointer-events-none"
                loading="eager"
              />

              {/* Gloss edge highlight */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/55 via-transparent to-white/15 pointer-events-none" />

              {/* Mini external link pill indicator */}
              <div
                className={`absolute top-1.5 right-1.5 p-1 rounded-md bg-[#11100E]/80 backdrop-blur-xs border border-white/20 text-[#F5F1E8] transition-opacity duration-150 ${
                  isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <ExternalLink className="w-2.5 h-2.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Product Detail Badge */}
      <div className="mt-3 text-center transition-all duration-200 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#11100E] text-[#F5F1E8] border border-white/15 shadow-sm">
          <span className="font-mono text-xs font-bold text-[#F5F1E8]">
            {activeProduct.title}
          </span>
          <span className="text-[#77736B] text-xs font-mono">•</span>
          <span className="text-xs text-[#E9E1D3]">
            {activeProduct.category}
          </span>
        </div>

        <p className="text-[11px] text-[#77736B] mt-1.5 max-w-sm mx-auto font-medium">
          {activeProduct.description}
        </p>

        {/* Direct Open App Action Link */}
        {activeProduct.url && (
          <a
            href={activeProduct.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick(1.2);
            }}
            className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-lg bg-[#F5F1E8] hover:bg-white text-[#11100E] font-mono text-[11px] font-bold shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Open {activeProduct.title}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Quick Select Dots */}
      <div className="flex items-center gap-1.5 mt-2.5">
        {SPEAKER_PRODUCTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => {
              sound.playClick(1.1);
              setActiveIndex(i);
            }}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              activeIndex === i ? 'bg-[#11100E] w-5' : 'bg-[#11100E]/25 hover:bg-[#11100E]/50 w-2'
            }`}
            title={`Preview ${p.title}`}
          />
        ))}
      </div>
    </div>
  );
};
