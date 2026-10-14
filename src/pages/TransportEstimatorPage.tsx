import React, { useState, useEffect } from 'react';
import { 
  Bus, MapPin, Calculator, CheckSquare, Square, Clock, Navigation, ShieldCheck
} from 'lucide-react';
import { api } from '../services/api.js';
import { TransportRoute } from '../types/index.js';

// Authentic Route Landmarks
import billboardImg from '../assets/BILL BOARD.jpg';
import entryGateImg from '../assets/ENTRY GATE CLEAR.jpg';
import gateViewImg from '../assets/GATE VIEW.jpg';

export const TransportEstimatorPage: React.FC = () => {
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('tr-nbo');
  
  const [nights, setNights] = useState<number>(3);
  const [roomCostPerNight, setRoomCostPerNight] = useState<number>(280);
  const includeBoda = true;
  const includePersonalSundries = true;

  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'Original National ID or Passport (Mandatory at Gate)', checked: true, required: true },
    { id: 'c2', label: 'Warm Shawl / Heavy Jacket (Gilgil plateau is windy & cold at night)', checked: true, required: true },
    { id: 'c3', label: 'Personal Thermos / Flask & Cup (For free hot water & tea)', checked: true, required: true },
    { id: 'c4', label: 'Holy Bible, Notebook & Pen (For sermon notes and prayer journaling)', checked: true, required: true },
    { id: 'c5', label: 'Modest Clothing (Long skirts below knees for sisters; modest trousers for brothers)', checked: true, required: true },
    { id: 'c6', label: 'Personal Toiletries & Bathroom Slippers', checked: true, required: true },
    { id: 'c7', label: 'Beddings / Extra Blanket (Provided, but extra warmth recommended in cold months)', checked: false, required: false },
    { id: 'c8', label: 'Mobile Phone Charger / Power Bank', checked: true, required: false }
  ]);

  useEffect(() => {
    api.getTransportRoutes().then(res => {
      if (res?.routes) {
        setRoutes(res.routes);
        setSelectedRouteId(res.routes[0]?.id || 'tr-nbo');
      }
    });
  }, []);

  const selectedRoute = routes.find(r => r.id === selectedRouteId);

  const toggleChecklist = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const transportEst = selectedRouteId === 'tr-nbo' ? 950 : 400;
  const accommodationTotal = nights * roomCostPerNight;
  const sundriesTotal = includePersonalSundries ? 350 : 0;
  const bodaTotal = includeBoda ? 250 : 0;
  const totalBudgetKES = transportEst + accommodationTotal + sundriesTotal + bodaTotal;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs text-orange-700 font-bold uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
          <Bus className="w-4 h-4 text-orange-600" />
          <span>Pilgrim Travel & Financial Preparation</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-slate-900">
          Transport Routes, Fares & Expense Estimator
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Accurate route guides from major towns in Kenya along the Nairobi-Nakuru corridor to Heavens Gate Prayer Mountain, Gilgil.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Routes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-5 border-t-4 border-t-orange-500 shadow-sm">
            <h2 className="font-cinzel text-lg font-bold text-slate-900 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>Select Your Point of Origin</span>
            </h2>

            {/* Origin Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {routes.map(r => {
                const isSelected = selectedRouteId === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRouteId(r.id)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition ${
                      isSelected
                        ? 'bg-orange-50 border-orange-500 text-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-[10px] text-orange-600 font-bold uppercase font-mono">From</div>
                    <div className="font-bold text-xs text-slate-900 mt-0.5 truncate">{r.originCity}</div>
                    <div className="text-[11px] text-orange-700 font-bold mt-1">KES {r.matatuFareKES}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Route Guidance */}
            {selectedRoute && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                  <h3 className="font-bold text-slate-900 text-sm">{selectedRoute.routeTitle}</h3>
                  <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                    <span>Est. Travel Time: <strong className="text-slate-900">{selectedRoute.travelTime}</strong></span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Shuttle / Matatu Fare</span>
                    <div className="text-base font-mono font-black text-slate-900">KES {selectedRoute.matatuFareKES}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Boda Boda to Gate (1.5 km)</span>
                    <div className="text-base font-mono font-black text-orange-600">KES {selectedRoute.bodaBodaFareKES}</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-slate-700">
                  <strong className="text-slate-900 block font-bold">Stage & Alighting Instructions:</strong>
                  <p className="leading-relaxed">{selectedRoute.stageDirections}</p>
                </div>

                <div className="p-3 rounded-xl bg-orange-100 border border-orange-200 text-orange-900 text-[11px] font-medium">
                  💡 <strong>Travel Tip:</strong> {selectedRoute.advice}
                </div>
              </div>
            )}

            {/* Visual Highway Route Landmarks ("Remember the Routes") */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Navigation className="w-4 h-4 text-orange-500" />
                <span>Visual Route Milestones • Highway Landmarks</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                When alighting at the Gilgil weighbridge junction along the Nairobi-Nakuru Highway (A104), look out for these exact authentic physical landmarks to guide your arrival:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* Milestone 1: Billboard */}
                <div className="rounded-xl overflow-hidden bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src={billboardImg} 
                      alt="Official Heavens Gate Highway Billboard" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold text-orange-300">
                      Step 1
                    </div>
                  </div>
                  <div className="p-3">
                    <strong className="text-white text-xs block font-bold">Highway Billboard</strong>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                      Official signpost along A104 at the Gilgil weighbridge turn-off.
                    </p>
                  </div>
                </div>

                {/* Milestone 2: Approach Road */}
                <div className="rounded-xl overflow-hidden bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src={gateViewImg} 
                      alt="Approach Road to Heavens Gate" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold text-orange-300">
                      Step 2
                    </div>
                  </div>
                  <div className="p-3">
                    <strong className="text-white text-xs block font-bold">1.5 km Hillside Approach</strong>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                      Short Boda Boda transfer (KES 100-150) or peaceful 15-min prayer walk.
                    </p>
                  </div>
                </div>

                {/* Milestone 3: Gate */}
                <div className="rounded-xl overflow-hidden bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src={entryGateImg} 
                      alt="Official Security Gatehouse" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold text-orange-300">
                      Step 3
                    </div>
                  </div>
                  <div className="p-3">
                    <strong className="text-white text-xs block font-bold">Security Gatehouse</strong>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                      Present National ID & scanned QR Pass. Open 5:00 AM — 8:00 PM.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Packing Checklist */}
          <div className="glass-panel p-6 rounded-3xl space-y-4 border-t-4 border-t-orange-500 shadow-sm">
            <h3 className="font-cinzel text-lg font-bold text-slate-900 flex items-center space-x-2">
              <CheckSquare className="w-4 h-4 text-orange-600" />
              <span>Mandatory Visitor Packing Checklist</span>
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Check off items as you pack your travel bag for Gilgil:
            </p>

            <div className="space-y-2 pt-2">
              {checklist.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-3.5 rounded-xl border flex items-center space-x-3 cursor-pointer text-xs transition ${
                    item.checked
                      ? 'bg-orange-50/60 border-orange-300 text-slate-900 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                  }`}
                >
                  {item.checked ? (
                    <CheckSquare className="w-4 h-4 text-orange-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className="flex-1">{item.label}</span>
                  {item.required && (
                    <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded border border-red-200 uppercase font-bold">
                      Required
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Total Retreat Budget Planner */}
        <div>
          <div className="glass-panel p-6 rounded-3xl sticky top-24 space-y-5 border-2 border-orange-500 shadow-md">
            <div className="flex items-center space-x-2 text-slate-900">
              <Calculator className="w-4 h-4 text-orange-600" />
              <h3 className="font-cinzel font-bold text-base">Retreat Expense Estimator</h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Number of Days / Nights</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={nights}
                  onChange={e => setNights(parseInt(e.target.value || '1', 10))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Accommodation Preference</label>
                <select
                  value={roomCostPerNight}
                  onChange={e => setRoomCostPerNight(parseInt(e.target.value, 10))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                >
                  <option value={180}>6-Bed General Hall (KES 180 / night)</option>
                  <option value={280}>4-Bed Dormitory (KES 280 / night)</option>
                  <option value={450}>Double Room Sharing (KES 450 / night)</option>
                  <option value={600}>Single Private Room (KES 600 / night)</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Roundtrip Matatu Transport:</span>
                  <span className="font-mono font-bold text-slate-900">KES {transportEst}</span>
                </div>
                <div className="flex justify-between">
                  <span>Boda Boda (Stage ↔ Gate):</span>
                  <span className="font-mono font-bold text-slate-900">KES {bodaTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accommodation ({nights} nights):</span>
                  <span className="font-mono font-bold text-slate-900">KES {accommodationTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>On-site Sundries (Shop/Soap):</span>
                  <span className="font-mono font-bold text-slate-900">KES {sundriesTotal}</span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-900">Estimated Budget:</span>
                  <span className="font-mono text-xl font-black text-orange-600">
                    KES {totalBudgetKES.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed border-t border-slate-200 pt-3">
              Note: This is an advisory financial estimate. Actual fares may fluctuate during peak holidays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
