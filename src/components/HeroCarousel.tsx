import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar, ShieldCheck, MapPin, 
  Tv, Clock, CheckCircle2, ArrowRight, BookOpen, Coffee, Flame,
  Play, Pause, Bed, Key, Compass, Volume2
} from 'lucide-react';

import slideMountainDawn from '../assets/slide_mountain_dawn.jpg';
import slideSanctuary from '../assets/slide_sanctuary.jpg';
import slideGardens from '../assets/slide_gardens.jpg';
import entryGateImg from '../assets/ENTRY GATE CLEAR.jpg';
import stoneMarkImg from '../assets/HEAVENS GATE STONE MARK.jpg';
import shiloHallImg from '../assets/SHILO HALL.jpg';
import mtSinaiChapel from '../assets/MT SINAI CHAPEL.jpg';
import hostelsImg from '../assets/HOSTELS.jpg';
import gateViewImg from '../assets/GATE VIEW.jpg';

interface HeroCarouselProps {
  onNavigate: (tab: string) => void;
  onOpenAi: () => void;
}

interface CarouselSlide {
  id: string;
  tabLabel: string;
  shortTitle: string;
  tag: string;
  scripture: string;
  title: string;
  highlightedText: string;
  description: string;
  bgImage: string;
  bgAlt: string;
  spotlightImage: string;
  spotlightTitle: string;
  spotlightBadge: string;
  spotlightMetrics: { label: string; value: string }[];
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
      id: 'altar-consecration',
      tabLabel: '01. Sacred Mountain',
      shortTitle: 'Sacred Altar',
      tag: 'Gilgil Altar of Consecration • Nakuru County',
      scripture: '“Come, let us go up to the mountain of the Lord, to the house of the God of Jacob.” — Isaiah 2:3',
      title: 'An Altar of Fire, Prayer &',
      highlightedText: 'Divine Encounter',
      description: 'Perched on the sacred hillsides of Gilgil overlooking the Great Rift Valley, Heavens Gate is a sanctuary of unbroken intercession, solitary fasting, and life-transforming encounters with the Presence of God.',
      bgImage: slideMountainDawn,
      bgAlt: 'Majestic sunrise over Heavens Gate Prayer Mountain in Gilgil Kenya',
      spotlightImage: stoneMarkImg,
      spotlightTitle: 'Sacred Altar Stone',
      spotlightBadge: 'Historic Consecration Ground',
      spotlightMetrics: [
        { label: 'Elevation', value: '2,050m ASL' },
        { label: 'Gate Hours', value: '5:00 AM — 8:00 PM' },
        { label: 'Atmosphere', value: 'Solemn Fasting' }
      ],
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
      pills: ['Strict Consecration Grounds', 'Free Hot Water & Tea', '24/7 Security Gatehouse']
    },
    {
      id: 'shiloh-sanctuary',
      tabLabel: '02. Shiloh Sanctuary',
      shortTitle: 'Shiloh 24/7',
      tag: 'Continuous 24-Hour Intercession • Shiloh Hall',
      scripture: '“I have set watchmen on your walls, O Jerusalem; they shall never hold their peace day or night.” — Isaiah 62:6',
      title: 'The Continuous 3-Hour',
      highlightedText: 'Day & Night Watches',
      description: 'Step into the unbroken rhythm of corporate prayer at Shiloh Main Sanctuary. Four Day Watches and four Night Watches around the clock, interceding for personal breakthrough, family redemption, revival, and Kenya.',
      bgImage: slideSanctuary,
      bgAlt: 'Sunlit timber-beam Shiloh Prayer Sanctuary at Heavens Gate',
      spotlightImage: shiloHallImg,
      spotlightTitle: 'Shiloh Main Sanctuary',
      spotlightBadge: '24/7 Perpetual Altar',
      spotlightMetrics: [
        { label: 'Intercession', value: 'Continuous 24/7' },
        { label: 'Watch Cycle', value: '3 Hours Each' },
        { label: 'Broadcast', value: 'Live Audio/Video' }
      ],
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
      pills: ['4 Day & 4 Night Shifts', 'Live Altar Broadcast', 'Apostle John Kimani William Vision']
    },
    {
      id: 'solitude-gardens',
      tabLabel: '03. Solitude & Gardens',
      shortTitle: 'Solitude Gardens',
      tag: 'Mount Carmel & Gethsemane Gardens',
      scripture: '“Be still, and know that I am God; I will be exalted among the nations.” — Psalm 46:10',
      title: 'Mountaintop Solitude &',
      highlightedText: 'Private Prayer Pergolas',
      description: 'Secluded stone prayer booths at Mount Carmel, quiet prayer pergolas, and stone meditation walkways overlooking the Rift Valley. Retreat into deep silence, biblical study, and undivided fellowship with God.',
      bgImage: slideGardens,
      bgAlt: 'Peaceful prayer gardens and private pergolas on the mountain hillside',
      spotlightImage: mtSinaiChapel,
      spotlightTitle: 'Mt Sinai Prayer Chapel',
      spotlightBadge: 'Sacred Solitude Sanctum',
      spotlightMetrics: [
        { label: 'Privacy', value: 'Individual Booths' },
        { label: 'Environment', value: 'Zero-Noise Zone' },
        { label: 'Access', value: 'All Registered Pilgrims' }
      ],
      primaryCta: {
        label: 'Explore Solitude Spaces',
        action: 'booking',
        icon: Calendar
      },
      secondaryCta: {
        label: 'Visitor Rules & Fasting Guide',
        action: 'ai',
        icon: BookOpen
      },
      pills: ['Mount Carmel Booths', 'Gethsemane Gardens', 'Living Water Dispensary']
    },
    {
      id: 'subsidised-hostels',
      tabLabel: '04. Pilgrim Accommodation',
      shortTitle: 'Pilgrim Hostels',
      tag: 'Subsidised Spiritual Stays • 800+ Beds',
      scripture: '“Come to Me, all you who labor and are heavy laden, and I will give you rest.” — Matthew 11:28',
      title: 'Serene & Subsidised Rest for',
      highlightedText: 'Every Fasting Pilgrim',
      description: 'Clean, peaceful, and heavily subsidised accommodation tailored for spiritual retreats. Budget dormitory beds from KES 300 to self-contained ensuite executive rooms at KES 600 per night, complete with clean linens and warm water.',
      bgImage: hostelsImg,
      bgAlt: 'Clean and serene accommodation blocks at Heavens Gate Prayer Mountain',
      spotlightImage: hostelsImg,
      spotlightTitle: 'Zion & Moriah Hostels',
      spotlightBadge: 'Heavily Subsidised Rates',
      spotlightMetrics: [
        { label: 'Dormitory', value: 'KES 300 / Night' },
        { label: 'Private Room', value: 'KES 600 / Night' },
        { label: 'Security', value: 'Gated 24/7 Grounds' }
      ],
      primaryCta: {
        label: 'Check Bed Availability',
        action: 'booking',
        icon: Bed
      },
      secondaryCta: {
        label: 'View Campus Map & Hostels',
        action: 'map',
        icon: Compass
      },
      pills: ['KES 300 Subsidised Dorms', 'KES 600 Private Ensuite Rooms', 'Separate Male/Female Wings']
    },
    {
      id: 'digital-gate-pass',
      tabLabel: '05. Instant Gate Pass',
      shortTitle: 'Instant Gate Pass',
      tag: 'Instant Digital Access • Kenya & Diaspora',
      scripture: '“Open the gates, that the righteous nation which keeps the truth may enter in.” — Isaiah 26:2',
      title: 'Instant M-Pesa Booking &',
      highlightedText: 'Cryptographic QR Entry',
      description: 'Reserve your retreat seamlessly from anywhere in Kenya or across the diaspora. Instant Daraja STK Push M-Pesa confirmation, real-time bed allocation, and an encrypted offline QR pass for verified admission at the gate in seconds.',
      bgImage: entryGateImg,
      bgAlt: 'Official Entry Gate to Heavens Gate Prayer Mountain in Gilgil',
      spotlightImage: gateViewImg,
      spotlightTitle: 'Main Security Gate',
      spotlightBadge: 'Fast QR Admission',
      spotlightMetrics: [
        { label: 'Payment', value: 'Instant Daraja M-Pesa' },
        { label: 'Gate Scan', value: '< 3 Sec Admission' },
        { label: 'Encryption', value: 'HMAC-SHA256' }
      ],
      primaryCta: {
        label: 'Book Bed & Get QR Pass',
        action: 'booking',
        icon: Calendar
      },
      secondaryCta: {
        label: 'Travel Routes & Directions',
        action: 'transport',
        icon: MapPin
      },
      pills: ['Instant Daraja M-Pesa STK', 'Offline QR Ticket Access', 'Anti-Duplicate Gate Protection']
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

  // Keyboard navigation support
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
      className="relative overflow-hidden bg-slate-900 border-b border-orange-200 select-none shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Heavens Gate Prayer Mountain Highlights Showcase"
    >
      {/* Background Photographic Image Stack with Ken-Burns and Crossfade */}
      <div className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[720px] w-full flex items-center">
        {slides.map((slide, idx) => {
          const isCurrent = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Cinematic Photographic Background with Smooth Scale Animation */}
              <img
                src={slide.bgImage}
                alt={slide.bgAlt}
                className="w-full h-full object-cover object-center transition-transform duration-10000 ease-out"
                style={{
                  transform: isCurrent ? 'scale(1.08)' : 'scale(1.0)'
                }}
              />

              {/* Radiant Light Theme Multi-layer Scrim */}
              {/* Horizontal gradient: Crisp, luminous white on the left text area, gently tapering to reveal photography */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/90 to-white/45 lg:to-white/25"></div>
              
              {/* Bottom-to-top gradient for small screens so text never collides */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent sm:hidden"></div>

              {/* Majestic Sunrise Ambient Warmth Glows */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>
            </div>
          );
        })}

        {/* Floating Top Mini Toolbar (Slide Counter + Play/Pause Toggle + Navigation Arrows) */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-30 flex items-center space-x-2">
          {/* Slide Indicator Badge */}
          <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-orange-200/80 shadow-xs flex items-center space-x-2 text-xs font-mono font-bold text-slate-800">
            <span className="text-orange-600 font-extrabold">0{currentSlide + 1}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">0{slides.length}</span>
          </div>

          {/* Autoplay Pause/Resume Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Resume auto-advance" : "Pause auto-advance"}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-orange-600 border border-orange-200/80 backdrop-blur-md shadow-xs flex items-center justify-center transition active:scale-95"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Arrow Buttons */}
          <div className="hidden sm:flex items-center space-x-1.5">
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-orange-600 border border-orange-200/80 backdrop-blur-md shadow-xs flex items-center justify-center transition hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-orange-600 border border-orange-200/80 backdrop-blur-md shadow-xs flex items-center justify-center transition hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Foreground Content: Split Layout (Left: Hero Text & Actions, Right: Spotlight Facility Card) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headline, Scripture, Details, and CTAs (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 animate-fade-in">
              
              {/* Category Tag & Live Altar Ping */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-orange-300 shadow-xs text-xs font-bold text-orange-700">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
                </span>
                <span className="uppercase tracking-wider font-mono text-[11px] sm:text-xs font-extrabold">
                  {active.tag}
                </span>
              </div>

              {/* Reverent Scripture Citation Tag */}
              <div className="text-[11px] sm:text-xs font-serif italic text-amber-900/80 bg-amber-50/70 border-l-2 border-orange-500 px-3 py-1.5 rounded-r-lg max-w-xl">
                {active.scripture}
              </div>

              {/* Main Headline */}
              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-slate-900 leading-[1.12] tracking-tight">
                {active.title}{' '}
                <span className="orange-gradient-text block sm:inline mt-0.5 sm:mt-0">
                  {active.highlightedText}
                </span>
              </h1>

              {/* Narrative Description */}
              <p className="text-slate-700 text-sm sm:text-base lg:text-[17px] leading-relaxed font-medium max-w-2xl bg-white/40 sm:bg-transparent backdrop-blur-xs rounded-xl p-1 sm:p-0">
                {active.description}
              </p>

              {/* Bulleted Mountain Highlights */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {active.pills.map((pill, pIdx) => (
                  <div 
                    key={pIdx} 
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/85 backdrop-blur-md border border-orange-200/90 text-xs font-semibold text-slate-800 shadow-2xs hover:border-orange-300 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>{pill}</span>
                  </div>
                ))}
              </div>

              {/* Dual Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {/* Primary CTA */}
                <button
                  onClick={() => handleCtaClick(active.primaryCta.action)}
                  className="px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-600/25 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition flex items-center justify-center space-x-2.5 min-h-[46px]"
                >
                  <active.primaryCta.icon className="w-4 h-4 shrink-0" />
                  <span>{active.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                {/* Secondary CTA */}
                <button
                  onClick={() => handleCtaClick(active.secondaryCta.action)}
                  className="px-5 sm:px-6 py-3.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 hover:text-orange-700 border-2 border-orange-300/80 hover:border-orange-500 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition flex items-center justify-center space-x-2 min-h-[46px]"
                >
                  <active.secondaryCta.icon className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{active.secondaryCta.label}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Floating Spotlight Facility Preview Card (Desktop & Tablet) (lg:col-span-5) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative">
                {/* Ambient Card Backlight */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-75"></div>
                
                {/* Spotlight Glass Container */}
                <div className="relative bg-white/90 backdrop-blur-xl border border-orange-200/90 rounded-2xl p-4 shadow-xl">
                  {/* Spotlight Image Frame */}
                  <div className="relative h-56 rounded-xl overflow-hidden border border-slate-200 group">
                    <img 
                      src={active.spotlightImage} 
                      alt={active.spotlightTitle} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-orange-700 font-mono">
                      {active.spotlightBadge}
                    </div>

                    {/* Image Title Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="font-cinzel text-lg font-bold drop-shadow-sm">
                        {active.spotlightTitle}
                      </div>
                      <div className="text-[11px] text-white/80 font-medium">
                        Heavens Gate Campus • Gilgil Nakuru
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-slate-100">
                    {active.spotlightMetrics.map((m, mIdx) => (
                      <div key={mIdx} className="bg-orange-50/70 rounded-xl p-2.5 text-center border border-orange-100">
                        <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider truncate">
                          {m.label}
                        </div>
                        <div className="text-xs sm:text-[13px] font-black font-mono text-orange-800 mt-0.5 truncate">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Card Action */}
                  <div className="mt-3.5 pt-2 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-600" />
                      <span>Gilgil Altar of Worship</span>
                    </span>
                    <button
                      onClick={() => handleCtaClick(active.primaryCta.action)}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center space-x-1 hover:underline"
                    >
                      <span>Explore this facility</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Previous / Next Big Arrow Buttons for Tablet/Desktop Side Navigation */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="hidden md:flex absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-white/85 hover:bg-white text-slate-800 hover:text-orange-600 border border-orange-200/90 backdrop-blur-md shadow-md items-center justify-center transition hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="hidden md:flex absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-white/85 hover:bg-white text-slate-800 hover:text-orange-600 border border-orange-200/90 backdrop-blur-md shadow-md items-center justify-center transition hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Interactive Bottom Slide Navigator Strip (Modern Enterprise Dock) */}
      <div className="relative z-30 bg-white/95 backdrop-blur-md border-t border-orange-200/90 px-3 sm:px-6 lg:px-8 py-3 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-start lg:grid lg:grid-cols-5 gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
          {slides.map((s, idx) => {
            const isCurrent = idx === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`group relative text-left p-2 sm:p-2.5 rounded-xl transition-all duration-300 overflow-hidden border shrink-0 w-[180px] sm:w-[220px] lg:w-auto ${
                  isCurrent
                    ? 'bg-orange-50/90 border-orange-400 shadow-sm ring-1 ring-orange-400/40'
                    : 'bg-white/70 hover:bg-white border-slate-200 text-slate-600 hover:border-orange-200'
                }`}
              >
                {/* Active Slide Timer Progress Fill Line */}
                {isCurrent && (
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500"
                    style={{
                      width: '100%',
                      animation: isPaused ? 'none' : `progressAnim ${SLIDE_DURATION}ms linear infinite`
                    }}
                  />
                )}

                <div className="flex items-center space-x-2.5">
                  {/* Mini Photographic Thumbnail */}
                  <div className={`w-9 h-9 rounded-lg overflow-hidden shrink-0 border ${
                    isCurrent ? 'border-orange-500 ring-2 ring-orange-200' : 'border-slate-200 opacity-70 group-hover:opacity-100'
                  }`}>
                    <img 
                      src={s.spotlightImage} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-black ${
                        isCurrent ? 'text-orange-600' : 'text-slate-400'
                      }`}>
                        0{idx + 1}
                      </span>
                      {isCurrent && (
                        <span className="text-[8px] bg-orange-600 text-white px-1.5 py-0.2 rounded font-bold uppercase font-mono">
                          Active
                        </span>
                      )}
                    </div>
                    <div className={`text-xs font-bold truncate mt-0.5 ${
                      isCurrent ? 'text-slate-900' : 'text-slate-700'
                    }`}>
                      {s.shortTitle}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Animation Keyframes */}
      <style>{`
        @keyframes progressAnim {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
};
