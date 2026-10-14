import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar, ShieldCheck, MapPin, 
  Clock, CheckCircle2, ArrowRight, BookOpen, Coffee, Flame,
  Play, Pause
} from 'lucide-react';

import stoneMarkImg from '../assets/HEAVENS GATE STONE MARK.jpg';
import slideMountainDawn from '../assets/slide_mountain_dawn.jpg';
import shiloHallImg from '../assets/SHILO HALL.jpg';
import mtSinaiChapel from '../assets/MT SINAI CHAPEL.jpg';
import entryGateImg from '../assets/ENTRY GATE CLEAR.jpg';

interface HeroCarouselProps {
  onNavigate: (tab: string) => void;
  onOpenAi: () => void;
}

interface PhotoSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  alt: string;
  actionText: string;
  actionTab: string;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate, onOpenAi }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 5500; // 5.5s per photo

  const slides: PhotoSlide[] = [
    {
      id: 'stone-mark',
      title: 'Sacred Altar Stone Monument',
      subtitle: 'Official Stone Monument Inscribed with Genesis 28:17',
      badge: 'Altar Cornerstone',
      image: stoneMarkImg,
      alt: 'Heavens Gate Prayer Mountain Sacred Stone Monument in Gilgil, Kenya',
      actionText: 'Reserve Accommodation',
      actionTab: 'booking'
    },
    {
      id: 'mountain-dawn',
      title: 'Dawn Over Gilgil Prayer Mountain',
      subtitle: 'Elevation 2,050m ASL • Overlooking the Great Rift Valley',
      badge: 'Altar of Fire & Prayer',
      image: slideMountainDawn,
      alt: 'Majestic sunrise over Heavens Gate Prayer Mountain in Gilgil Kenya',
      actionText: 'Reserve Accommodation',
      actionTab: 'booking'
    },
    {
      id: 'shiloh-sanctuary',
      title: 'Shiloh Main Prayer Sanctuary',
      subtitle: '24-Hour Continuous Day & Night Intercession Watches',
      badge: 'Corporate Intercession',
      image: shiloHallImg,
      alt: 'Shiloh Main Prayer Hall at Heavens Gate Prayer Mountain Gilgil',
      actionText: 'Join Prayer Watch',
      actionTab: 'services'
    },
    {
      id: 'mt-sinai',
      title: 'Mount Sinai Prayer Chapel',
      subtitle: 'Quiet Fasting Alcoves, Solitude Pergolas & Gardens',
      badge: 'Sacred Solitude',
      image: mtSinaiChapel,
      alt: 'Mount Sinai Chapel and Solitude Grounds at Heavens Gate Gilgil',
      actionText: 'Explore Solitude Rooms',
      actionTab: 'booking'
    },
    {
      id: 'entry-gate',
      title: 'Main Security Entrance Gate',
      subtitle: 'Verified QR Code Screening & Rapid Check-in Station',
      badge: 'Official Gatehouse',
      image: entryGateImg,
      alt: 'Official Security Entry Gate to Heavens Gate Prayer Mountain Gilgil',
      actionText: 'Access QR Pass',
      actionTab: 'ticket'
    }
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const active = slides[currentSlide];

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-white to-slate-50 border-b border-orange-200/90 py-8 sm:py-12 lg:py-14 select-none"
      aria-label="Heavens Gate Prayer Mountain Foundation Showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ======================================================== */}
          {/* SIDE 1: THE FOUNDATIONAL SCRIPTURE & CORNERSTONE MESSAGE */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Ministry Location Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-100/90 border border-orange-300 text-xs font-bold text-orange-900 shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
              </span>
              <span className="uppercase tracking-wider font-mono text-[11px] sm:text-xs font-extrabold">
                Gilgil Altar of Consecration • Nakuru County, Kenya
              </span>
            </div>

            {/* Main Institution Title */}
            <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              HEAVENS GATE <br className="hidden sm:inline" />
              <span className="orange-gradient-text">PRAYER MOUNTAIN</span>
            </h1>

            {/* The Foundational Scripture Citation Plaque */}
            <div className="relative pl-5 sm:pl-6 border-l-4 border-orange-600 bg-white/90 backdrop-blur-xs rounded-r-2xl p-4 sm:p-5 border border-orange-200/70 shadow-sm space-y-2.5">
              <div className="text-orange-500 font-serif text-3xl sm:text-4xl leading-none select-none">
                “
              </div>
              <blockquote className="font-cinzel text-lg sm:text-xl lg:text-2xl font-black text-slate-900 leading-snug tracking-tight -mt-4">
                ...THIS IS NONE OTHER THAN THE HOUSE OF GOD, AND THIS IS THE GATE OF HEAVEN.
              </blockquote>
              <div className="flex items-center justify-between pt-1 border-t border-orange-100">
                <span className="font-mono text-xs sm:text-sm font-black text-orange-700 tracking-widest uppercase">
                  GENESIS 28:17
                </span>
                <span className="text-[11px] font-medium text-slate-500 font-serif italic">
                  The Altar Cornerstone
                </span>
              </div>
            </div>

            {/* Sacred Narrative Description */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              An altar dedicated to unbroken intercession, solitary fasting, and life-transforming encounters with the Presence of God. Located off the Nairobi-Nakuru Highway in Gilgil, welcoming pilgrims from across Kenya and the nations.
            </p>

            {/* Live Operational Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>Gates Open: 5:00 AM — 8:00 PM</span>
              </div>

              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                <Coffee className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>Strict Fasting Grounds</span>
              </div>

              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>24/7 Unbroken Prayer Watches</span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('booking')}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-600/30 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition flex items-center justify-center space-x-2.5 min-h-[48px]"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Reserve Accommodation Now</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={() => onNavigate('ticket')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-orange-50/50 text-slate-900 border-2 border-orange-300 hover:border-orange-500 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition flex items-center justify-center space-x-2 min-h-[48px]"
              >
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Access My QR Ticket</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SIDE 2: HIGH-QUALITY, CRISP CAMPUS PHOTO SHOWCASE        */}
          {/* ======================================================== */}
          <div className="lg:col-span-6">
            <div 
              className="relative rounded-3xl overflow-hidden border-2 border-orange-300 bg-slate-900 shadow-2xl group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Dedicated Photo Showcase Viewport (Aspect ratio preserved, zero distortion) */}
              <div className="relative h-[360px] sm:h-[430px] lg:h-[460px] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                {slides.map((slide, idx) => {
                  const isCurrent = idx === currentSlide;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      {/* Crisp, natural image with natural saturation and zero washed-out scrim */}
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-full object-cover object-center transition-transform duration-7000 ease-out"
                        style={{
                          transform: isCurrent ? 'scale(1.05)' : 'scale(1.0)'
                        }}
                      />

                      {/* Subtle Bottom Vignette (Only covering bottom 30% for perfect text readability) */}
                      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent"></div>
                    </div>
                  );
                })}

                {/* Top Badge & Counter Pill */}
                <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-orange-800 border border-orange-300/80 text-[11px] font-black uppercase tracking-wider font-mono shadow-sm">
                    {active.badge}
                  </span>

                  <div className="flex items-center space-x-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-bold border border-white/20">
                      0{currentSlide + 1} / 0{slides.length}
                    </span>

                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      title={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
                      className="w-7 h-7 rounded-full bg-black/60 hover:bg-orange-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition"
                    >
                      {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Caption Card at Bottom of Image */}
                <div className="absolute bottom-4 inset-x-4 z-20 text-white space-y-1">
                  <div className="flex items-center space-x-1.5 text-orange-400 text-[11px] font-bold uppercase tracking-wider font-mono">
                    <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                    <span>Heavens Gate Campus • Gilgil Nakuru</span>
                  </div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-black text-white leading-tight drop-shadow-md">
                    {active.title}
                  </h3>
                  <p className="text-slate-200 text-xs sm:text-sm font-medium line-clamp-1 drop-shadow-sm">
                    {active.subtitle}
                  </p>
                </div>

                {/* Prev / Next Chevrons on Photo Frame */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-orange-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition hover:scale-110 active:scale-90"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-orange-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition hover:scale-110 active:scale-90"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Thumbnail Selector Dock */}
              <div className="bg-slate-900 border-t border-slate-800 p-2 sm:p-2.5 flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar">
                {slides.map((s, idx) => {
                  const isCurrent = idx === currentSlide;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`relative flex-1 min-w-[58px] sm:min-w-[70px] h-12 rounded-xl overflow-hidden transition border-2 shrink-0 ${
                        isCurrent
                          ? 'border-orange-500 ring-2 ring-orange-400/50 scale-[1.02]'
                          : 'border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-500'
                      }`}
                      title={s.title}
                    >
                      <img 
                        src={s.image} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-orange-600/20"></div>
                      )}
                      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
