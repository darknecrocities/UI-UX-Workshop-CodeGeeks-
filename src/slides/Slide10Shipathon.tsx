import React, { useState } from 'react';
import { sound } from '../audio/sound';
import {
  Trophy,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
} from 'lucide-react';

interface PhotoMemory {
  id: string;
  src: string;
  caption: string;
  detail: string;
}

export const Slide10Shipathon: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  const photos: PhotoMemory[] = [
    {
      id: 'trophy',
      src: '/assets/images/appbuilder/3de50d09-4d9b-4fb4-8d5e-4740d00b9396.jpeg',
      caption: 'The Shipathon 2026 Trophy',
      detail: 'Proof that building small, real things beats dreaming big and never shipping.',
    },
    {
      id: 'uiux-friend',
      src: '/assets/images/appbuilder/a434464f-110a-4329-8d8e-3228438cb6dd.jpeg',
      caption: 'With a fellow builder & designer',
      detail: 'Seeing his taste in UI and clean layouts was a wake-up call for how I build.',
    },
    {
      id: 'showcase',
      src: '/assets/images/appbuilder/a37e562e-be63-4947-a4ac-bd36ae02f59f.jpeg',
      caption: 'Filipino builders on stage',
      detail: 'Surrounding yourself with creators who ship every week raises your standards.',
    },
    {
      id: 'presentation',
      src: '/assets/images/appbuilder/63ff7623-3306-4fb9-85aa-132f9b859bd5.jpeg',
      caption: 'Sharing the work live',
      detail: 'When your UI is clear and simple, anyone understands your app in seconds.',
    },
    {
      id: 'group-fun',
      src: '/assets/images/appbuilder/ad6c80a6-fe95-48f2-9439-1f4bcc3d4025.jpeg',
      caption: 'Community & friends',
      detail: 'Building alone is hard. Building with friends makes you unstoppable.',
    },
  ];

  const handlePhotoClick = (photo: PhotoMemory) => {
    sound.playClick(1.2);
    setSelectedPhoto(photo);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    sound.playTap();
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    sound.playTap();
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-10 max-w-7xl mx-auto select-none">
      {/* Header — clean, no badges */}
      <div className="flex items-center justify-between border-b border-[#11100E]/15 pb-2.5">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#11100E]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77736B]">
            11 / Story · RevenueCat Shipathon 2026
          </span>
        </div>
        <span className="font-mono text-xs text-[#77736B]">THE TURNING POINT</span>
      </div>

      {/* Main Grid: Left Story & Tagline (5 cols) | Right Clean Photo Collage (7 cols) */}
      <div className="my-auto py-3 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Meaningful, simple words & a strong tagline */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#11100E] leading-[1.08]">
              I WON WITH CODE.
              <br />
              <span className="text-[#77736B]">I STAYED FOR DESIGN.</span>
            </h1>

            {/* Clear, inspiring tagline */}
            <p className="mt-3 text-base sm:text-lg text-[#11100E] font-medium leading-snug">
              Winning a trophy feels great. But meeting people whose taste inspires you changes everything.
            </p>
          </div>

          {/* Simple, heartfelt story paragraph */}
          <div className="space-y-3 text-sm text-[#77736B] leading-relaxed">
            <p>
              I used to believe that as long as my code worked, the design didn't matter.
            </p>
            <p>
              At the Shipathon, I met fellow Filipino students and builders who proved me wrong. Their apps weren't just functional—they were clean, honest, and effortless to use.
            </p>
            <p className="text-[#11100E] font-semibold">
              Code makes software run. Good design makes people care.
            </p>
          </div>

          {/* Quiet bridge to next slide */}
          <div className="pt-2 border-t border-[#11100E]/10 font-mono text-xs text-[#77736B] flex items-center justify-between">
            <span>That simple lesson led directly to my first $3,279 MRR</span>
            <span className="text-[#11100E] font-bold">Next Slide →</span>
          </div>
        </div>

        {/* Right Column: Clean, unadorned 5-photo collage (No badges or stickers) */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-12 gap-3 h-[380px]">
            {/* Hero Photo: The Trophy (5 cols) */}
            <div
              onClick={() => handlePhotoClick(photos[0])}
              className="col-span-5 relative rounded-2xl overflow-hidden border border-[#11100E]/20 bg-[#181614] shadow-sm cursor-pointer group"
            >
              <img
                src={photos[0].src}
                alt={photos[0].caption}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-xs font-bold font-mono">{photos[0].caption}</div>
              </div>
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3" />
              </div>
            </div>

            {/* Right 4 Photos (7 cols) */}
            <div className="col-span-7 grid grid-cols-2 gap-3">
              {/* Photo 1: Fellow builder & designer */}
              <div
                onClick={() => handlePhotoClick(photos[1])}
                className="relative rounded-2xl overflow-hidden border border-[#11100E]/20 bg-[#181614] shadow-xs cursor-pointer group aspect-4/3"
              >
                <img
                  src={photos[1].src}
                  alt={photos[1].caption}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <div className="text-[11px] font-bold font-mono truncate">{photos[1].caption}</div>
                </div>
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-2.5 h-2.5" />
                </div>
              </div>

              {/* Photo 2: Stage showcase */}
              <div
                onClick={() => handlePhotoClick(photos[2])}
                className="relative rounded-2xl overflow-hidden border border-[#11100E]/20 bg-[#181614] shadow-xs cursor-pointer group aspect-4/3"
              >
                <img
                  src={photos[2].src}
                  alt={photos[2].caption}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <div className="text-[11px] font-bold font-mono truncate">{photos[2].caption}</div>
                </div>
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-2.5 h-2.5" />
                </div>
              </div>

              {/* Photo 3: Live demo */}
              <div
                onClick={() => handlePhotoClick(photos[3])}
                className="relative rounded-2xl overflow-hidden border border-[#11100E]/20 bg-[#181614] shadow-xs cursor-pointer group aspect-4/3"
              >
                <img
                  src={photos[3].src}
                  alt={photos[3].caption}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <div className="text-[11px] font-bold font-mono truncate">{photos[3].caption}</div>
                </div>
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-2.5 h-2.5" />
                </div>
              </div>

              {/* Photo 4: Friends & Community */}
              <div
                onClick={() => handlePhotoClick(photos[4])}
                className="relative rounded-2xl overflow-hidden border border-[#11100E]/20 bg-[#181614] shadow-xs cursor-pointer group aspect-4/3"
              >
                <img
                  src={photos[4].src}
                  alt={photos[4].caption}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <div className="text-[11px] font-bold font-mono truncate">{photos[4].caption}</div>
                </div>
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-2.5 h-2.5" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] font-mono text-[#77736B] text-center">
            Click any photo to enlarge
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-[#11100E]/15 flex items-center justify-between font-mono text-xs text-[#77736B]">
        <span>Surround yourself with creators whose taste elevates your own.</span>
        <span>11 / 30</span>
      </div>

      {/* Clean Lightbox Modal — No badges */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-150 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#181614] text-[#F5F1E8] border border-white/20 max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]"
          >
            {/* Modal Header */}
            <div className="p-3.5 border-b border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-white">{selectedPhoto.caption}</span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative bg-black flex items-center justify-center max-h-[55vh] overflow-hidden">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="w-full h-full object-contain max-h-[55vh]"
              />

              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Caption */}
            <div className="p-4 border-t border-white/10 font-mono text-xs text-[#D8D3C8] bg-[#11100E]">
              <p className="leading-relaxed">{selectedPhoto.detail}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
