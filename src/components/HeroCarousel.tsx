import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar, ShieldCheck, MapPin, 
  Tv, Clock, CheckCircle2, ArrowRight, BookOpen, Coffee, Flame
} from 'lucide-react';

import slideMountainDawn from '../assets/slide_mountain_dawn.jpg';
import slideSanctuary from '../assets/slide_sanctuary.jpg';
import slideGardens from '../assets/slide_gardens.jpg';
import entryGateImg from '../assets/ENTRY GATE CLEAR.jpg';

interface HeroCarouselProps {
  onNavigate: (tab: string) => void;
  onOpenAi: () => void;
}

interface CarouselSlide {
  id: string;
  tabLabel: string;
  tag: string;
  title: string;
  highlightedText: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta: {
    label: string;
    action: string;
    icon: React.ElementType;
  };
  secondaryCta: {
    label: string;
    action: string;
    icon: React.ElementType;
  };
  pills: string[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate, onOpenAi }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 6500; // 6.5 seconds

  const slides: CarouselSlide[] = [
    {
      id: 'dawn',
      tabLabel: '01. Sacred Mountain Dawn',
      tag: 'Gilgil Altar of Consecration',
      title: 'An Altar of Fire, Prayer &',
      highlightedText: 'Divine Encounter',
      description: 'Welcome to Heavens Gate Prayer Mountain in Gilgil, Nakuru County. A sacred hillside sanctuary welcoming pilgrims from across Kenya and the nations into solemn fasting, solitude, and spiritual renewal.',
      image: slideMountainDawn,
      imageAlt: 'Majestic sunrise over Heavens Gate Prayer Mountain in Gilgil Kenya',
      primaryCta: {
        label: 'Reserve Accommodation Now',
        action: 'booking',
        icon: Calendar
      },
      secondaryCta: {
        label: 'Access My QR Ticket',
        action: 'ticket',
        icon: ShieldCheck
      },
      pills: ['Gates Open: 5:00 AM — 8:00 PM', 'Strict Fasting Grounds', 'Free Hot Water & Scheduled Tea']
    },
    {
      id: 'sanctuary',
      tabLabel: '02. Shiloh Sanctuary',
      tag: 'Continuous 24-Hour Intercession',
      title: 'The Continuous 3-Hour',
      highlightedText: 'Day & Night Watches',
      description: 'Step into the unbroken rhythm of the 4 Day and Night prayer watches at Shiloh Main Sanctuary. Stand on the wall in powerful corporate prayer for families, revival, and the nation.',
      image: slideSanctuary,
      imageAlt: 'Sunlit timber-beam Shiloh Prayer Sanctuary at Heavens Gate',
      primaryCta: {
        label: 'Join Today\'s Prayer Watch',
        action: 'services',
        icon: Flame
      },
      secondaryCta: {
        label: 'Watch Live Broadcast',
        action: 'services',
        icon: Tv
      },
      pills: ['4 Watch Shifts 24/7', 'Live Sanctuary Broadcast', 'Apostle John Kimani William Vision']
    },
    {
      id: 'solitude',
      tabLabel: '03. Solitude & Gardens',
      tag: 'Sacred Solitude & Mountain Fasting',
      title: 'Mountaintop Solitude &',
      highlightedText: 'Prayer Pergolas',
      description: 'Secluded prayer booths at Mount Carmel and stone meditation walkways overlooking the Great Rift Valley. Retreat into deep quietude and seeking God away from the noise of the world.',
      image: slideGardens,
      imageAlt: 'Peaceful prayer gardens and private pergolas on the mountain hillside',
      primaryCta: {
        label: 'Explore Solitude Rooms',
        action: 'booking',
        icon: Calendar
      },
      secondaryCta: {
        label: 'Visitor Rules & Fasting Guide',
        action: 'ai',
        icon: BookOpen
      },
      pills: ['Mount Carmel Booths', 'Gethsemane Prayer Gardens', 'Living Water Dispensary']
    },
    {
      id: 'digital',
      tabLabel: '04. Instant Gate Pass',
      tag: 'Seamless Digital Mountain Access',
      title: 'Instant M-Pesa Booking &',
      highlightedText: 'Cryptographic QR Entry',
      description: 'Check active bed inventory in real-time, complete your reservation via Daraja M-Pesa, and present your HMAC-SHA256 encrypted ticket at the security gate for smooth admission.',
      image: entryGateImg,
      imageAlt: 'Official Entry Gate to Heavens Gate Prayer Mountain in Gilgil',
      primaryCta: {
        label: 'Book Bed & Get QR Pass',
        action: 'booking',
        icon: Calendar
      },
      secondaryCta: {
        label: 'Travel Routes & Fares',
        action: 'transport',
        icon: MapPin
      },
      pills: ['Instant Daraja M-Pesa', 'HMAC-SHA256 Signed Passes', 'Anti-Duplicate Admission Lock']
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

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleCtaClick = (action: string) => {
    if (action === 'ai') {
      onOpenAi();
    } else {
      onNavigate(action);
    }
  };

  // Touch swipe support for mobile
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
      className="relative overflow-hidden bg-slate-950 text-slate-900 border-b border-orange-200 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Heavens Gate Highlights Showcase"
    >
      {/* Slides Background Container */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] w-full flex items-center">
        {slides.map((slide, idx) => {
          const isCurrent = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Photographic Image with Subtle Ken Burns Effect */}
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
                style={{
                  transform: isCurrent ? 'scale(1.08)' : 'scale(1.0)'
                }}
              />

              {/* Light Theme Scrim Overlay (Clean, Radiant White & Vivid Orange Gradients) */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/88 to-white/40 lg:to-white/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent sm:hidden"></div>
              
              {/* Subtle Warm Sunrise Ambient Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/15 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>
            </div>
          );
        })}

        {/* Foreground Content Card & Callouts */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
          <div className="max-w-2xl lg:max-w-3xl space-y-5 sm:space-y-6">
            {/* Slide Category Tag Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-orange-300 shadow-sm text-xs font-bold text-orange-700 animate-fade-in">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
              </span>
              <span className="uppercase tracking-wider font-mono text-[11px] sm:text-xs">
                {active.tag}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
              {active.title}{' '}
              <span className="orange-gradient-text block sm:inline mt-1 sm:mt-0">
                {active.highlightedText}
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed font-medium max-w-2xl bg-white/40 sm:bg-transparent backdrop-blur-xs rounded-xl p-1 sm:p-0">
              {active.description}
            </p>

            {/* Bulleted Mountain Highlights */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {active.pills.map((pill, pIdx) => (
                <div 
                  key={pIdx} 
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-md border border-orange-200/80 text-xs font-semibold text-slate-800 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>{pill}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons (Responsive Stacking for Mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              {/* Primary CTA */}
              <button
                onClick={() => handleCtaClick(active.primaryCta.action)}
                className="px-7 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-orange-600/30 hover:scale-105 active:scale-95 transition flex items-center justify-center space-x-2.5 min-h-[46px]"
              >
                <active.primaryCta.icon className="w-4 h-4 shrink-0" />
                <span>{active.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => handleCtaClick(active.secondaryCta.action)}
                className="px-6 py-3.5 rounded-xl bg-white/90 hover:bg-white text-slate-900 border-2 border-orange-300 hover:border-orange-500 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 min-h-[46px]"
              >
                <active.secondaryCta.icon className="w-4 h-4 text-orange-600 shrink-0" />
                <span>{active.secondaryCta.label}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Previous / Next Arrow Controls (Desktop/Tablet) */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-white/80 hover:bg-white text-slate-800 hover:text-orange-600 border border-orange-200 backdrop-blur-md shadow-lg flex items-center justify-center transition hover:scale-110 active:scale-90 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-white/80 hover:bg-white text-slate-800 hover:text-orange-600 border border-orange-200 backdrop-blur-md shadow-lg flex items-center justify-center transition hover:scale-110 active:scale-90 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Interactive Bottom Slide Navigator Tabs (Modern Enterprise Bar) */}
      <div className="relative z-30 bg-white/95 backdrop-blur-md border-t border-orange-200 px-4 sm:px-6 lg:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {slides.map((s, idx) => {
            const isCurrent = idx === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`relative text-left p-2.5 sm:p-3 rounded-xl transition overflow-hidden border ${
                  isCurrent
                    ? 'bg-orange-50/90 border-orange-400 shadow-sm'
                    : 'bg-white/60 hover:bg-white border-slate-200 text-slate-600'
                }`}
              >
                {/* Active Slide Timer Progress Fill Line */}
                {isCurrent && (
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"
                    style={{
                      width: '100%',
                      animation: isPaused ? 'none' : `progressAnim ${SLIDE_DURATION}ms linear infinite`
                    }}
                  />
                )}

                <div className="flex items-center justify-between">
                  <span className={`text-[11px] sm:text-xs font-mono font-black ${
                    isCurrent ? 'text-orange-600' : 'text-slate-400'
                  }`}>
                    0{idx + 1}
                  </span>
                  {isCurrent && (
                    <span className="text-[9px] bg-orange-600 text-white px-1.5 py-0.2 rounded font-bold uppercase font-mono">
                      Active
                    </span>
                  )}
                </div>
                <div className={`text-xs font-bold truncate mt-0.5 ${
                  isCurrent ? 'text-slate-900' : 'text-slate-700'
                }`}>
                  {s.tag}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Animation Style Tag */}
      <style>{`
        @keyframes progressAnim {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
};
