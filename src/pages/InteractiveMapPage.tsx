import React, { useState, useEffect } from 'react';
import { 
  MapPin, Navigation, Compass, Layers, Shield, HeartPulse, 
  Coffee, Church, Home, Tent, Trees, Info, X, CheckCircle2, ArrowRight
} from 'lucide-react';
import { api } from '../services/api.js';
import { MapFeature } from '../types/index.js';

export const InteractiveMapPage: React.FC = () => {
  const [features, setFeatures] = useState<MapFeature[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<MapFeature | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [routeToRoom, setRouteToRoom] = useState<boolean>(false);

  useEffect(() => {
    api.getMapFeatures().then(res => {
      if (res?.features) {
        setFeatures(res.features);
      }
    });
  }, []);

  const categories = [
    { id: 'all', label: 'All Grounds' },
    { id: 'sanctuary', label: 'Sanctuary & Prayer' },
    { id: 'accommodation', label: 'Accommodation Wings' },
    { id: 'dining', label: 'Water & Tea Points' },
    { id: 'medical', label: 'Medical & Assembly' },
    { id: 'gate', label: 'Gates & Reception' }
  ];

  const filteredFeatures = features.filter(f => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'sanctuary') return f.category === 'sanctuary' || f.category === 'prayer_garden' || f.category === 'prayer_booth';
    if (activeCategory === 'accommodation') return f.category === 'accommodation';
    if (activeCategory === 'dining') return f.category === 'dining';
    if (activeCategory === 'medical') return f.category === 'medical' || f.category === 'assembly';
    if (activeCategory === 'gate') return f.category === 'gate';
    return true;
  });

  const getIcon = (category: string) => {
    switch (category) {
      case 'sanctuary': return Church;
      case 'prayer_garden': return Trees;
      case 'prayer_booth': return Tent;
      case 'accommodation': return Home;
      case 'dining': return Coffee;
      case 'medical': return HeartPulse;
      case 'assembly': return Shield;
      default: return MapPin;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#173F35] font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#244E40]" />
            <span>Interactive Grounds & Wayfinding</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-slate-900">
            Heavens Gate Campus 2D Map (Gilgil)
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setRouteToRoom(!routeToRoom)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
              routeToRoom
                ? 'bg-[#173F35] text-[#F8F5EC] border border-[#D4AF37]/50 shadow-md'
                : 'bg-white text-[#173F35] hover:bg-[#F8F5EC] border-2 border-[#173F35]/30'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{routeToRoom ? 'Hide Room Route' : 'Show Route to Room Z-101'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition font-bold ${
              activeCategory === cat.id
                ? 'bg-[#173F35] text-[#F8F5EC] border border-[#D4AF37]/50 shadow-sm'
                : 'bg-white text-slate-700 hover:text-[#173F35] border border-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive 2D Vector Campus Canvas */}
      <div className="glass-panel p-3 sm:p-6 rounded-2xl sm:rounded-3xl relative overflow-hidden border-2 border-slate-200">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] min-h-[360px] sm:min-h-[440px] bg-gradient-to-br from-amber-50/60 via-orange-50/30 to-slate-100 rounded-xl sm:rounded-2xl border-2 border-orange-200 overflow-hidden shadow-inner">
          {/* Subtle Grid and Topographical Contours */}
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="lightGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fed7aa" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lightGrid)" />
            <path d="M 0 300 Q 250 180 500 250 T 1000 150" fill="none" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="4 4" />
            <path d="M 0 450 Q 300 350 650 400 T 1000 320" fill="none" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="4 4" />
          </svg>

          {/* Navigation Path Overlay */}
          {routeToRoom && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 15 75 L 25 70 L 40 65 L 30 30"
                fill="none"
                stroke="#EA580C"
                strokeWidth="1.8"
                strokeDasharray="2 2"
                className="animate-pulse"
              />
              <circle cx="15" cy="75" r="2.5" fill="#10B981" />
              <circle cx="30" cy="30" r="3" fill="#EA580C" />
            </svg>
          )}

          {/* Map Feature Pinpoints */}
          {filteredFeatures.map(f => {
            const Icon = getIcon(f.category);
            const isSelected = selectedFeature?.id === f.id;
            return (
              <div
                key={f.id}
                onClick={() => setSelectedFeature(f)}
                style={{ left: `${f.coordinates.x}%`, top: `${f.coordinates.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              >
                <div className={`p-2.5 rounded-2xl flex items-center justify-center transition shadow-md ${
                  isSelected
                    ? 'bg-[#173F35] text-[#F8F5EC] scale-125 ring-4 ring-[#D4AF37]/50 border border-[#D4AF37]'
                    : 'bg-white text-[#173F35] border-2 border-[#173F35]/40 hover:scale-110 hover:bg-[#F8F5EC]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                {/* Tooltip Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap bg-slate-900 text-[10px] text-white font-bold px-2 py-0.5 rounded shadow-lg border border-slate-800 opacity-90 group-hover:opacity-100 transition pointer-events-none">
                  {f.name}
                </div>
              </div>
            );
          })}

          {/* Compass Rose */}
          <div className="absolute top-4 right-4 bg-white/90 border border-slate-300 p-2 rounded-xl text-center text-[10px] text-slate-700 z-10 font-mono shadow-sm">
            <div className="text-[#173F35] font-bold text-xs">N</div>
            <div>▲</div>
            <div>Gilgil</div>
          </div>

          {/* Scale Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 border border-slate-300 px-3 py-1.5 rounded-xl text-[10px] text-slate-700 z-10 font-medium shadow-sm">
            <span>Dozens of acres of prayer hillsides</span>
          </div>
        </div>

        {/* Selected Location Information Drawer */}
        {selectedFeature && (
          <div className="mt-4 p-5 rounded-2xl bg-white border-2 border-[#173F35] relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg animate-fade-in">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#173F35] bg-[#F8F5EC] border border-[#D4AF37]/40 px-2 py-0.5 rounded">
                  {selectedFeature.category.replace('_', ' ')}
                </span>
                <h3 className="font-bold text-slate-900 text-base">{selectedFeature.name}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedFeature.description}
              </p>
              {selectedFeature.rules && (
                <div className="text-[11px] text-amber-800 font-bold pt-1">
                  ⚠️ Note: {selectedFeature.rules}
                </div>
              )}
            </div>

            <div className="shrink-0 flex items-center space-x-2">
              <button
                onClick={() => setRouteToRoom(true)}
                className="px-4 py-2 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold text-xs shadow-md transition"
              >
                Directions from Gate
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ground Navigation Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="glass-panel p-4 rounded-2xl space-y-1 border-t-2 border-t-emerald-500">
          <div className="font-bold text-slate-900 flex items-center space-x-1.5">
            <Trees className="w-4 h-4 text-emerald-600" />
            <span>Gethsemane Prayer Gardens</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Follow the marked paved stone walkways along the eastern ridge. Maintain quiet solemnity for personal weeping and supplication.
          </p>
        </div>

        <div className="glass-panel p-4 rounded-2xl space-y-1 border-t-2 border-t-[#173F35]">
          <div className="font-bold text-slate-900 flex items-center space-x-1.5">
            <Coffee className="w-4 h-4 text-[#173F35]" />
            <span>Water & Tea Dispensary</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Boiling hot water is accessible 24/7. Hot nourishing tea is served at 06:30 AM, 01:00 PM, and 06:30 PM. Carry your personal thermos/cup.
          </p>
        </div>

        <div className="glass-panel p-4 rounded-2xl space-y-1 border-t-2 border-t-red-500">
          <div className="font-bold text-slate-900 flex items-center space-x-1.5">
            <HeartPulse className="w-4 h-4 text-red-600" />
            <span>Bethesda Health Clinic</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Located next to Nehemiah Administration. Free blood pressure and sugar tests are available for fasting believers at any hour.
          </p>
        </div>
      </div>
    </div>
  );
};
