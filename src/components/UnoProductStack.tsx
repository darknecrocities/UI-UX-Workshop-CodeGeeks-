import React, { useState } from 'react';
import { SPEAKER_PRODUCTS } from '../data/slides';
import { sound } from '../audio/sound';

export const UnoProductStack: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Precise fan angles and subtle arc curvature for the 6 cards
  const cardTransforms = [
    { rotate: -16, translateY: 8, zIndex: 1 },
    { rotate: -9, translateY: 3, zIndex: 2 },
    { rotate: -2, translateY: 0, zIndex: 3 },
    { rotate: 5, translateY: 2, zIndex: 4 },
    { rotate: 11, translateY: 5, zIndex: 5 },
    { rotate: 17, translateY: 10, zIndex: 6 },
  ];

  const activeProduct = SPEAKER_PRODUCTS[activeIndex] || SPEAKER_PRODUCTS[0];

  return (
    <div className="flex flex-col items-center select-none w-full max-w-md mx-auto">
      {/* Product Card Fan Container */}
      <div className="relative flex items-end justify-center h-32 sm:h-36 w-full px-6 pt-3">
        {SPEAKER_PRODUCTS.map((prod, idx) => {
          const isSelected = activeIndex === idx;
          const tf = cardTransforms[idx] || { rotate: 0, translateY: 0, zIndex: 1 };

          return (
            <button
              key={prod.id}
              onClick={() => {
                sound.playClick(1.2);
                setActiveIndex(idx);
              }}
              onMouseEnter={() => {
                sound.playClick(1.3);
                setActiveIndex(idx);
              }}
              style={{
                zIndex: isSelected ? 35 : tf.zIndex,
                transform: isSelected
                  ? `translateY(-18px) rotate(0deg) scale(1.12)`
                  : `translateY(${tf.translateY}px) rotate(${tf.rotate}deg)`,
                marginLeft: idx === 0 ? 0 : '-26px',
              }}
              className={`relative w-18 h-24 sm:w-22 sm:h-28 rounded-2xl cursor-pointer transition-all duration-200 ease-out flex items-center justify-center p-1.5 shadow-xl ${
                isSelected
                  ? 'ring-3 ring-[#F59E0B] shadow-[#F59E0B]/40 bg-[#1A1816]'
                  : 'bg-[#181614] border border-[#2D2A26] hover:border-[#F59E0B]/70'
              }`}
              title={`Select ${prod.title}`}
            >
              {/* Product Icon */}
              <img
                src={prod.image}
                alt={prod.title}
                className="w-full h-full object-cover rounded-xl pointer-events-none"
                loading="eager"
              />

              {/* Gloss edge highlight */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-white/15 pointer-events-none" />
            </button>
          );
        })}
      </div>

      {/* Dynamic Product Detail Badge */}
      <div className="mt-3 text-center transition-all duration-200">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#11100E] text-[#F5F1E8] border border-white/15 shadow-sm">
          <span className="font-mono text-xs font-bold text-[#F59E0B]">
            {activeProduct.title}
          </span>
          <span className="text-[#77736B] text-xs font-mono">•</span>
          <span className="text-xs text-[#E9E1D3]">
            {activeProduct.category}
          </span>
        </div>
        <p className="text-[11px] text-[#77736B] mt-1 max-w-xs mx-auto">
          {activeProduct.description}
        </p>
      </div>

      {/* Quick Select Dots for Interactive Testing */}
      <div className="flex items-center gap-1.5 mt-2">
        {SPEAKER_PRODUCTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => {
              sound.playClick(1.1);
              setActiveIndex(i);
            }}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              activeIndex === i ? 'bg-[#F59E0B] w-4' : 'bg-[#11100E]/20 hover:bg-[#11100E]/40'
            }`}
            title={p.title}
          />
        ))}
      </div>
    </div>
  );
};
