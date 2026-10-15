import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, ArrowRight
} from 'lucide-react';

// Authentic Campus Roots & High-Fidelity Assets:
import stoneMarkImg from '../assets/HEAVENS GATE STONE MARK.jpg'; // Groundbreaking 2011 & Genesis 28:17
import shiloHallImg from '../assets/SHILO HALL.jpg'; // Shiloh Main Sanctuary
import shiloFrontImg from '../assets/SHILO FRONT VIEW 2.jpg'; // Shiloh Front Sanctuary & Steps
import mtSinaiChapel from '../assets/MT SINAI CHAPEL.jpg'; // Mount Sinai Chapel & Solitude
import hostelsImg from '../assets/AL HOSTELS.jpg'; // Pilgrim Hostels
import entryGateImg from '../assets/ENTRY GATE CLEAR.jpg'; // Official Security Gatehouse
import kitchenImg from '../assets/KITCHEN AREA.webp'; // Pilgrim Fasting Tea & Kitchen
import fullViewImg from '../assets/HEAVENS GATE FULL VIEW.jpg'; // Mountain Panoramic Grounds
import billboardImg from '../assets/BILL BOARD.jpg'; // Highway Route Landmark & Billboard

interface HeroCarouselProps {
  onNavigate: (tab: string) => void;
  onOpenAi: () => void;
}

interface PhotoSlide {
  id: string;
  tag: string;
  image: string;
  alt: string;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate, onOpenAi }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  // Curated authentic deck honoring the spiritual roots and pilgrimage grounds
  const slides: PhotoSlide[] = [
    {
      id: 'stone-mark',
      tag: 'Foundational Altar Stone Monument • Genesis 28:17 Dedication',
      image: stoneMarkImg,
      alt: 'Heavens Gate Prayer Mountain Official Stone Monument in Gilgil, Nakuru County'
    },
    {
      id: 'shiloh-hall',
      tag: 'Shiloh Main Prayer Sanctuary • 24/7 Corporate Intercession',
      image: shiloHallImg,
      alt: 'Shiloh Main Sanctuary Hall at Heavens Gate Prayer Mountain'
    },
    {
      id: 'shiloh-front',
      tag: 'Shiloh Sanctuary Altar & Entrance • House of Continuous Worship',
      image: shiloFrontImg,
      alt: 'Shiloh Sanctuary Front View at Heavens Gate'
    },
    {
      id: 'mt-sinai',
      tag: 'Mount Sinai Chapel • Sacred Solitude & Personal Fasting Grounds',
      image: mtSinaiChapel,
      alt: 'Mount Sinai Chapel and Solitude Grounds at Heavens Gate'
    },
    {
      id: 'hostels',
      tag: 'Subsidised Pilgrim Hostels • Clean & Serene Accommodation Blocks',
      image: hostelsImg,
      alt: 'Clean and serene accommodation blocks at Heavens Gate Prayer Mountain'
    },
    {
      id: 'entry-gate',
      tag: 'Official Security Gatehouse • Verified Admission & Registration',
      image: entryGateImg,
      alt: 'Official Main Entrance Gate at Heavens Gate Prayer Mountain'
    },
    {
      id: 'kitchen-area',
      tag: 'Pilgrim Fasting Refectory • Free Continuous Hot Water & Tea Station',
      image: kitchenImg,
      alt: 'Pilgrim tea and hot water kitchen station at Heavens Gate'
    },
    {
      id: 'full-view',
      tag: 'Mountain Panoramic Compound • 2,050m ASL Sacred Elevation',
      image: fullViewImg,
      alt: 'Panoramic view of Heavens Gate Prayer Mountain compound in Gilgil Kenya'
    },
    {
      id: 'billboard-route',
      tag: 'Highway Route Landmark • Nairobi-Nakuru Highway Turn-off Billboard',
      image: billboardImg,
      alt: 'Official highway billboard directing pilgrims to Heavens Gate Prayer Mountain'
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
        {/* LEFT SECTION (62% on Desktop): PHOTO CAROUSEL + TEXT     */}
        {/* ======================================================== */}
        <div className="relative w-full lg:w-[62%] min-h-[440px] sm:min-h-[480px] lg:min-h-[560px] overflow-hidden flex items-center justify-center">
          {slides.map((slide, idx) => {
            const isCurrent = idx === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* 1. Ambient Blurred Backdrop (Fills widescreen borders naturally without stretching artifacts) */}
                <img
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover object-center filter blur-xl opacity-40 scale-110 pointer-events-none"
                />

                {/* 2. Main Crisp Centered Image (Sharp aspect ratio preserved) */}
                <div className="absolute inset-0 flex items-center justify-center p-0">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-10000 ease-out"
                    style={{
                      transform: isCurrent ? 'scale(1.04)' : 'scale(1.0)',
                      imageRendering: 'auto'
                    }}
                  />
                </div>

                {/* 3. Cinematic Vignette Overlay (Ensures 100% text contrast without obscuring the photo) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 lg:to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35"></div>
              </div>
            );
          })}

          {/* Left Hero Content: The Sole Majestic Sentence (Genesis 28:17) - Strictly 2 Lines */}
          <div className="relative z-20 max-w-4xl w-full px-4 sm:px-8 py-10 sm:py-16 space-y-5 sm:space-y-6 text-center flex flex-col items-center justify-center mx-auto">
            {/* The Sole Majestic Sentence - Strictly 2 Lines */}
            <div className="space-y-3 sm:space-y-4 text-center w-full">
              <blockquote className="font-cinzel text-sm sm:text-lg md:text-2xl lg:text-[25px] xl:text-[31px] font-black text-white leading-tight drop-shadow-2xl text-center mx-auto tracking-tight">
                <span className="block whitespace-nowrap">“...THIS IS NONE OTHER THAN THE HOUSE OF GOD,</span>
                <span className="block whitespace-nowrap mt-1 sm:mt-2 text-white">AND THIS IS THE GATE OF HEAVEN.”</span>
              </blockquote>
              <div className="font-mono text-xs sm:text-base font-black text-orange-400 tracking-widest uppercase drop-shadow-md text-center pt-0.5">
                GENESIS 28:17
              </div>
            </div>

            {/* Action Buttons - Centered */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full">
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
        </div>

        {/* ======================================================== */}
        {/* RIGHT SECTION (~38%): STRAIGHT ORANGE BANNER + CAPSULES */}
        {/* ======================================================== */}
        <div 
          className="relative w-full lg:w-[38%] min-h-[320px] sm:min-h-[380px] lg:min-h-[560px] bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 overflow-hidden flex items-center justify-center p-6 sm:p-10 z-20 shadow-2xl border-t-4 lg:border-t-0 lg:border-l-4 border-amber-400/90"
        >
          {/* Subtle High-Resolution Photographic Watermark in Background */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
            <img 
              src={stoneMarkImg} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Ambient Lighting Rays */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-300/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-orange-800/40 rounded-full blur-2xl pointer-events-none"></div>

          {/* THE 3 TILTED GRAPHIC PILLS */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-3 sm:space-y-4 transform -rotate-12 hover:-rotate-6 transition-transform duration-500 my-6 lg:my-0">
            
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
      {/* BOTTOM IMPACT RIBBON TICKER STRIP                         */}
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
          {/* Duplicate for infinite seamless scroll */}
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
