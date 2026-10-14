import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar, ShieldCheck, MapPin, 
  Clock, ArrowRight, Flame, Play, Pause, Coffee, Volume2
} from 'lucide-react';

import stoneMarkImg from '../assets/HEAVENS GATE STONE MARK.jpg';
import slideMountainDawn from '../assets/slide_mountain_dawn.jpg';
import shiloHallImg from '../assets/SHILO HALL.jpg';
import slideSanctuary from '../assets/slide_sanctuary.jpg';
import mtSinaiChapel from '../assets/MT SINAI CHAPEL.jpg';
import entryGateImg from '../assets/ENTRY GATE CLEAR.jpg';

interface HeroCarouselProps {
  onNavigate: (tab: string) => void;
  onOpenAi: () => void;
}

interface PhotoSlide {
  id: string;
  headlineMain: string;
  headlineAccent: string;
  subtitle: string;
  tag: string;
  image: string;
  alt: string;
  ctaText: string;
  ctaAction: string;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate, onOpenAi }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 6000; // 6 seconds

  const slides: PhotoSlide[] = [
    {
      id: 'stone-mark',
      headlineMain: 'HEAVENS GATE',
      headlineAccent: 'PRAYER MOUNTAIN',
      subtitle: '“...This is none other than the house of God, and this is the gate of heaven.” — Genesis 28:17',
      tag: 'Sacred Altar Stone Monument',
      image: stoneMarkImg,
      alt: 'Heavens Gate Prayer Mountain Sacred Stone Monument in Gilgil Kenya',
      ctaText: 'Reserve Accommodation',
      ctaAction: 'booking'
    },
    {
      id: 'dawn-altar',
      headlineMain: 'SACRED ALTAR OF',
      headlineAccent: 'FIRE & PRAYER',
      subtitle: 'Unbroken intercession and life-transforming encounters on the Gilgil hillsides overlooking the Great Rift Valley.',
      tag: 'Dawn Over Gilgil (2,050m ASL)',
      image: slideMountainDawn,
      alt: 'Dawn over Heavens Gate Prayer Mountain in Gilgil Kenya',
      ctaText: 'Reserve Accommodation',
      ctaAction: 'booking'
    },
    {
      id: 'shiloh-sanctuary',
      headlineMain: 'SHILOH MAIN',
      headlineAccent: 'PRAYER SANCTUARY',
      subtitle: 'Continuous 3-hour day & night prayer watches around the clock. Standing in the gap for families and the nations.',
      tag: '24/7 Corporate Intercession',
      image: shiloHallImg,
      alt: 'Shiloh Main Prayer Hall at Heavens Gate Prayer Mountain Gilgil',
      ctaText: 'Join Today\'s Prayer Watch',
      ctaAction: 'services'
    },
    {
      id: 'sanctuary-interior',
      headlineMain: 'DAY & NIGHT',
      headlineAccent: 'WATCHES OF PRAYER',
      subtitle: 'Four Day Watches and Four Night Watches unbroken. The perpetual altar of praise, repentance, and revival.',
      tag: 'Shiloh Altar of Worship',
      image: slideSanctuary,
      alt: 'Sunlit interior of Shiloh Sanctuary at Heavens Gate',
      ctaText: 'Join Today\'s Prayer Watch',
      ctaAction: 'services'
    },
    {
      id: 'mt-sinai',
      headlineMain: 'SOLITUDE &',
      headlineAccent: 'PRAYER PERGOLAS',
      subtitle: 'Secluded Mount Carmel stone prayer alcoves and Gethsemane meditation walkways for quiet fasting and reflection.',
      tag: 'Mt Sinai Chapel & Gardens',
      image: mtSinaiChapel,
      alt: 'Mount Sinai Chapel and Solitude Grounds at Heavens Gate Gilgil',
      ctaText: 'Explore Solitude Rooms',
      ctaAction: 'booking'
    },
    {
      id: 'entry-gate',
      headlineMain: 'INSTANT M-PESA &',
      headlineAccent: 'DIGITAL QR PASS',
      subtitle: 'Book from anywhere in Kenya or the diaspora. Instant Daraja STK Push confirmation and rapid gate admission.',
      tag: 'Main Security Gatehouse',
      image: entryGateImg,
      alt: 'Official Entry Gate to Heavens Gate Prayer Mountain in Gilgil',
      ctaText: 'Access My QR Ticket',
      ctaAction: 'ticket'
    }
  ];

  // Auto-cycle timer
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

  const tickerItems = [
    '24/7 CONTINUOUS PRAYER WATCHES',
    'STRICT MOUNTAIN FASTING SANCTUARY',
    'FREE BOILING HOT WATER & SCHEDULED TEA',
    'SECURITY GATES: 5:00 AM — 8:00 PM DAILY',
    'INSTANT DARAJA M-PESA & QR CODE ACCESS',
    'APOSTLE JOHN KIMANI WILLIAM VISION',
    'NAIROBI-NAKURU HIGHWAY, GILGIL',
    'OVERLOOKING GREAT RIFT VALLEY (2,050M ASL)'
  ];

  return (
    <div className="relative select-none border-b border-slate-900 bg-slate-950">
      {/* ======================================================== */}
      {/* MAIN HERO BANNER (ANGLED SPLIT ARCHITECTURE)             */}
      {/* ======================================================== */}
      <div 
        className="relative min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] w-full overflow-hidden flex flex-col lg:flex-row"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* ======================================================== */}
        {/* LEFT SECTION (~62% on Desktop): PHOTO CAROUSEL + TEXT   */}
        {/* ======================================================== */}
        <div className="relative w-full lg:w-[64%] min-h-[440px] sm:min-h-[480px] lg:min-h-[560px] overflow-hidden flex items-center">
          {slides.map((slide, idx) => {
            const isCurrent = idx === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Full-bleed crisp photographic background with gentle zoom */}
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-10000 ease-out"
                  style={{
                    transform: isCurrent ? 'scale(1.06)' : 'scale(1.0)'
                  }}
                />

                {/* Cinematic Vignette Overlay (Dark gradient ensuring 100% text contrast) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30 lg:to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
              </div>
            );
          })}

          {/* Left Hero Foreground Content (Dedicated to Genesis 28:17 Cornerstone) */}
          <div className="relative z-20 max-w-2xl px-6 sm:px-10 lg:pl-12 lg:pr-6 py-12 sm:py-16 space-y-5 sm:space-y-6">
            {/* The Sole Majestic Sentence */}
            <div className="space-y-3">
              <blockquote className="font-cinzel text-2xl sm:text-4xl lg:text-[42px] font-black text-white leading-[1.22] tracking-tight drop-shadow-2xl">
                “...THIS IS NONE OTHER THAN THE HOUSE OF GOD, AND THIS IS THE GATE OF HEAVEN.”
              </blockquote>
              <div className="font-mono text-sm sm:text-base font-black text-orange-400 tracking-widest uppercase drop-shadow-md">
                GENESIS 28:17
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* Primary Solid Orange Button */}
              <button
                onClick={() => onNavigate('booking')}
                className="px-7 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-orange-600/30 hover:scale-105 active:scale-95 transition flex items-center justify-center space-x-2 min-h-[46px]"
              >
                <span>Reserve Accommodation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Dark Button with White Border */}
              <button
                onClick={() => onNavigate('ticket')}
                className="px-7 py-3.5 rounded-xl bg-black/60 hover:bg-black/80 text-white border-2 border-white/80 hover:border-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg backdrop-blur-sm transition flex items-center justify-center space-x-2 min-h-[46px]"
              >
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>Access QR Ticket</span>
              </button>
            </div>
          </div>

          {/* Left Side Slide Chevrons & Counter */}
          <div className="absolute bottom-5 left-6 sm:left-10 z-20 flex items-center space-x-2">
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-orange-600 text-white border border-white/30 backdrop-blur-md flex items-center justify-center transition active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-orange-600 text-white border border-white/30 backdrop-blur-md flex items-center justify-center transition active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-white/80 bg-black/50 px-2 py-1 rounded-md border border-white/20">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT SECTION (~36%): ANGLED ORANGE BANNER + TILTED PILLS */}
        {/* ======================================================== */}
        <div 
          className="relative w-full lg:w-[42%] lg:-ml-[6%] min-h-[320px] sm:min-h-[380px] lg:min-h-[560px] bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 overflow-hidden flex items-center justify-center p-6 sm:p-10 z-20 shadow-2xl"
          style={{
            clipPath: typeof window !== 'undefined' && window.innerWidth >= 1024 
              ? 'polygon(14% 0, 100% 0, 100% 100%, 0% 100%)' 
              : 'none'
          }}
        >
          {/* Subtle Photographic Watermark Texture in Background */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
            <img 
              src={shiloHallImg} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Ambient Lighting Rays */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-300/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-orange-800/40 rounded-full blur-2xl pointer-events-none"></div>

          {/* THE 3 TILTED GRAPHIC PILLS (Exactly matching the user's reference!) */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-3 sm:space-y-4 transform -rotate-12 hover:-rotate-6 transition-transform duration-500 my-6 lg:my-0 lg:pl-10">
            
            {/* Pill 1: Golden Yellow "HEAVENS" */}
            <div className="bg-amber-300 text-slate-950 font-black text-xl sm:text-2xl md:text-3xl px-8 sm:px-12 py-2 sm:py-3 rounded-full shadow-2xl tracking-widest font-cinzel border-2 border-amber-200 uppercase select-none transform hover:scale-105 transition">
              HEAVENS
            </div>

            {/* Pill 2: Electric Cyan / Sky Blue "GATE PRAYER" */}
            <div className="bg-sky-400 text-slate-950 font-black text-xl sm:text-2xl md:text-3xl px-8 sm:px-12 py-2 sm:py-3 rounded-full shadow-2xl tracking-widest font-cinzel border-2 border-sky-300 uppercase select-none transform hover:scale-105 transition">
              GATE PRAYER
            </div>

            {/* Pill 3: Golden Yellow "MOUNTAIN" */}
            <div className="bg-amber-300 text-slate-950 font-black text-xl sm:text-2xl md:text-3xl px-8 sm:px-12 py-2 sm:py-3 rounded-full shadow-2xl tracking-widest font-cinzel border-2 border-amber-200 uppercase select-none transform hover:scale-105 transition">
              MOUNTAIN
            </div>

            {/* Cornerstone Scripture Badge beneath pills */}
            <div className="pt-2 text-center text-white drop-shadow">
              <div className="font-mono text-xs sm:text-sm font-black tracking-widest uppercase bg-black/30 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/30 inline-block">
                GENESIS 28:17
              </div>
              <div className="text-[10px] sm:text-xs text-orange-100 font-bold tracking-wider mt-1 uppercase">
                Gilgil Altar • Nakuru County, Kenya
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM IMPACT RIBBON TICKER STRIP (Exactly like reference) */}
      {/* ======================================================== */}
      <div className="bg-slate-950 border-t border-slate-800 text-white flex items-center overflow-hidden h-12 shadow-inner">
        {/* Fixed Bright Solid Orange Block Badge */}
        <div className="bg-orange-600 text-white font-black text-xs uppercase tracking-widest px-4 sm:px-6 h-full flex items-center justify-center shrink-0 z-10 shadow-md font-cinzel">
          HEAVENS GATE
        </div>

        {/* Continuous Running Marquee Ribbon */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center space-x-6 sm:space-x-8 px-4 text-xs font-bold text-slate-300 whitespace-nowrap">
          {tickerItems.map((item, i) => (
            <div key={i} className="flex items-center space-x-2 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span className="tracking-wide uppercase text-[11px] sm:text-xs text-slate-200 hover:text-white transition">
                {item}
              </span>
            </div>
          ))}
          {/* Repeat for full infinite feel */}
          {tickerItems.map((item, i) => (
            <div key={`dup-${i}`} className="hidden md:flex items-center space-x-2 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span className="tracking-wide uppercase text-[11px] sm:text-xs text-slate-200">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
