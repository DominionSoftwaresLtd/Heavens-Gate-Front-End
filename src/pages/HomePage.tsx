import React from 'react';
import { 
  Sparkles, Calendar, Clock, MapPin, ShieldCheck, HeartHandshake, 
  ArrowRight, CheckCircle2, AlertTriangle, Coffee, BookOpen, Users
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onOpenAi: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAi }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section with Vivid Orange Dawn Accent */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-20 bg-gradient-to-b from-orange-100/70 via-orange-50/40 to-slate-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {/* Live Service Pill */}
            <div 
              onClick={() => onNavigate('services')}
              className="inline-flex max-w-full items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-orange-300 text-[11px] sm:text-xs text-orange-700 hover:border-orange-500 cursor-pointer shadow-sm hover:shadow transition font-semibold"
            >
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
              </span>
              <span className="truncate">Shiloh Sanctuary: Daily Services & Prayer Watches</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            </div>

            {/* Title */}
            <h1 className="font-cinzel text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              An Altar of Fire, Prayer & <span className="orange-gradient-text">Divine Encounter</span>
            </h1>

            <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              Official digital management portal for <strong>Heavens Gate Prayer Mountain</strong> in Gilgil, Nakuru County, Kenya. Reserve clean accommodation, generate your QR gate pass, and seek God in solemn prayer and fasting.
            </p>

            {/* Primary Action Buttons (Responsive Stacking for Mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 sm:pt-3">
              <button
                onClick={() => onNavigate('booking')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Reserve Accommodation Now</span>
              </button>

              <button
                onClick={() => onNavigate('ticket')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-orange-200 hover:border-orange-400 text-xs sm:text-sm font-bold shadow-sm transition flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Access My QR Ticket</span>
              </button>

              <button
                onClick={onOpenAi}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-300 text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <BookOpen className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Visitor Guide & Rules</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats / Highlights Bar (Grid adjusts gracefully from 1 col on mobile to 4 on desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex items-center space-x-3.5 border-t-2 border-t-orange-500">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Security Gate Window</div>
              <div className="text-sm font-bold text-slate-900">5:00 AM — 8:00 PM</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex items-center space-x-3.5 border-t-2 border-t-emerald-500">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Strict Mountain Fasting</div>
              <div className="text-sm font-bold text-slate-900">Free Hot Water & Tea</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex items-center space-x-3.5 border-t-2 border-t-blue-500">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Continuous Watches</div>
              <div className="text-sm font-bold text-slate-900">3-Hour Night Shifts</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex items-center space-x-3.5 border-t-2 border-t-purple-500">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Gilgil Location</div>
              <div className="text-sm font-bold text-slate-900">Nairobi-Nakuru Hwy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation Categories Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">
              Affordable Spiritual Retreat Quarters
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-slate-900">
              Accommodation Inventory & Subsidised Rates
            </h2>
          </div>
          <button
            onClick={() => onNavigate('booking')}
            className="mt-3 md:mt-0 text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center space-x-1"
          >
            <span>Check live bed availability</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Single Room */}
          <div className="glass-card rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded">
                  Private Solitude
                </span>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-orange-600">KES 600</span>
                  <span className="text-[10px] text-slate-500 block">per night</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Single Private Room</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Quiet self-contained prayer room with writing desk, private washroom, and single bed for intensive fasting.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Mount Zion Executive Wing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Ensuite Private Bath</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Beddings & Towel Provided</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('booking')}
              className="w-full py-2.5 rounded-xl bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-700 text-xs font-bold border border-orange-200 transition"
            >
              Select Single Room
            </button>
          </div>

          {/* Double Sharing */}
          <div className="glass-card rounded-2xl p-5 flex flex-col justify-between border-2 border-orange-500 relative shadow-md">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
              Popular Choice
            </div>
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
                  Twin Sharing
                </span>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-orange-600">KES 450</span>
                  <span className="text-[10px] text-slate-500 block">per person / night</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Double Sharing Room</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Two comfortable single beds for 2 pilgrims of the same gender or married couples with documentation.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Mount Zion Wing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Two Independent Beds</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Hot Water Shower</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('booking')}
              className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition shadow-md shadow-orange-500/20"
            >
              Select Double Room
            </button>
          </div>

          {/* 4-Person Dormitory */}
          <div className="glass-card rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">
                  Brothers / Sisters
                </span>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-orange-600">KES 280</span>
                  <span className="text-[10px] text-slate-500 block">per person / night</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">4-Bed Dormitory Wing</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Bethany Hall wings strictly separated by gender. Clean individual beds with lockable storage lockers.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Bethany Hall Blocks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Strict Gender Separation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Clean Ablution Blocks</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('booking')}
              className="w-full py-2.5 rounded-xl bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-700 text-xs font-bold border border-orange-200 transition"
            >
              Select 4-Bed Dorm
            </button>
          </div>

          {/* 6-Person Hall */}
          <div className="glass-card rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded">
                  Community Hall
                </span>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-orange-600">KES 180</span>
                  <span className="text-[10px] text-slate-500 block">per person / night</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">6-Person General Hall</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Bethesda Pavilion spacious communal hall. Warm, clean, and highly affordable for fellowship delegations.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Bethesda Pavilion</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>High Ceilings & Ventilation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>Direct Access to Gardens</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('booking')}
              className="w-full py-2.5 rounded-xl bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-700 text-xs font-bold border border-orange-200 transition"
            >
              Select General Hall
            </button>
          </div>
        </div>
      </section>

      {/* Mandatory Mountain Orientation & Rules Callout Area in Vivid Orange */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 rounded-3xl p-6 lg:p-10 shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Mandatory Visitor Preparation Checklist</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-white leading-tight">
                Important Fasting & Gate Regulations Before Arrival
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-white">
                <div className="flex items-start space-x-2.5 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <AlertTriangle className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Strict Fasting Ground:</strong>
                    No cooked food, snacks, or fruits allowed in luggage. Free hot water & tea provided.
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Modest Dress Policy:</strong>
                    Long skirts or dresses below knees for ladies. No shorts or sleeveless tops.
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <Clock className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Gate Hours (5 AM - 8 PM):</strong>
                    Arrive before 7:30 PM. Security gates close strictly at 8:00 PM.
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <BookOpen className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Mandatory Items:</strong>
                    Carry National ID, personal flask/thermos, cup, warm clothes, and Bible.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 justify-center">
              <button
                onClick={() => onNavigate('transport')}
                className="w-full py-3.5 rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition"
              >
                <span>Travel Fares & Route Guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('map')}
                className="w-full py-3.5 rounded-xl bg-orange-700/80 hover:bg-orange-700 text-white font-bold text-xs border border-white/30 flex items-center justify-center space-x-2 transition"
              >
                <MapPin className="w-4 h-4 text-white" />
                <span>Explore 2D Grounds Map</span>
              </button>

              <button
                onClick={() => onNavigate('prayer')}
                className="w-full py-3.5 rounded-xl bg-amber-300 hover:bg-white text-orange-950 font-black text-xs flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <HeartHandshake className="w-4 h-4 text-orange-600" />
                <span>Submit Confidential Prayer Request</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
