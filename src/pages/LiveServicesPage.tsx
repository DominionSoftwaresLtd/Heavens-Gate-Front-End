import React, { useState, useEffect } from 'react';
import { Play, Users, Clock, CheckCircle2, Flame } from 'lucide-react';
import { api } from '../services/api.js';
import { LiveService, PrayerWatch } from '../types/index.js';
import { useAuth } from '../context/AuthContext.js';

export const LiveServicesPage: React.FC = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<LiveService[]>([]);
  const [watches, setWatches] = useState<PrayerWatch[]>([]);
  const [selectedService, setSelectedService] = useState<LiveService | null>(null);
  const [registrationMsg, setRegistrationMsg] = useState<string | null>(null);

  useEffect(() => {
    api.getServices().then(res => {
      if (res?.services) {
        setServices(res.services);
        setSelectedService(res.services[0] || null);
      }
    });

    api.getPrayerWatches().then(res => {
      if (res?.prayerWatches) {
        setWatches(res.prayerWatches);
      }
    });
  }, []);

  const handleRegisterWatch = async (watchId: string) => {
    try {
      const res = await api.registerWatch(watchId, user?.name || 'Pilgrim');
      if (res.success) {
        setRegistrationMsg(res.message);
        api.getPrayerWatches().then(w => setWatches(w.prayerWatches));
        setTimeout(() => setRegistrationMsg(null), 4000);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-orange-600 font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            <span>Altar of Prayer & Worship</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-slate-900">
            Live Sanctuary Broadcasts & Prayer Watches
          </h1>
        </div>
      </div>

      {/* Main Stream Player Showcase */}
      {selectedService && (
        <div className="glass-panel rounded-3xl overflow-hidden border-2 border-orange-500 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Video Player Display */}
            <div className="lg:col-span-2 relative aspect-video bg-slate-950 flex items-center justify-center">
              <div className="text-center p-6 z-20 space-y-3">
                <div className="w-16 h-16 rounded-full bg-orange-600/30 border-2 border-orange-500 text-orange-400 flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-orange-400 ml-1" />
                </div>
                <div className="text-white font-cinzel text-lg font-bold">
                  Shiloh Main Sanctuary Live Feed
                </div>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Broadcasting live fellowship from the mountain heights in Gilgil, Kenya. Join thousands in worship and prayer.
                </p>
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  <span>LIVE NOW • {selectedService.viewersCount.toLocaleString()} Pilgrims Connected</span>
                </div>
              </div>
            </div>

            {/* Service Information & Schedule */}
            <div className="p-6 bg-white flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] text-orange-600 uppercase font-mono font-bold tracking-wider">
                  Daily Service Schedule
                </span>
                <h3 className="font-cinzel text-xl font-bold text-slate-900 mt-1">
                  {selectedService.title}
                </h3>
                <div className="mt-3 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span>Time: <strong className="text-slate-900">{selectedService.startTime} — {selectedService.endTime}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Minister: <strong className="text-slate-900">{selectedService.preacher}</strong></span>
                  </div>
                </div>
              </div>

              {/* Other Upcoming Services */}
              <div className="space-y-2 pt-4 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-800 uppercase">Upcoming Today:</div>
                {services.map(srv => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`p-3 rounded-xl cursor-pointer border-2 text-xs transition ${
                      selectedService.id === srv.id
                        ? 'bg-orange-50 border-orange-500 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-orange-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900">{srv.title}</div>
                    <div className="text-[11px] text-orange-600 font-semibold">{srv.startTime} - {srv.endTime}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3-Hour Prayer Watches Section */}
      <div className="space-y-4">
        {registrationMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{registrationMsg}</span>
          </div>
        )}

        <div className="flex items-end justify-between border-b border-slate-200 pb-3">
          <div>
            <div className="text-xs text-orange-600 font-bold uppercase tracking-wider">
              Continuous 24-Hour Intercession
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-black text-slate-900">
              The 4 Night & Day Prayer Watches
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {watches.map(watch => {
            const isFull = watch.registeredCount >= watch.maxParticipants;
            return (
              <div
                key={watch.id}
                className="glass-card rounded-2xl p-5 flex flex-col justify-between border-slate-200 space-y-4 border-t-4 border-t-orange-500"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded">
                      {watch.timeRange}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono font-medium">
                      {watch.registeredCount}/{watch.maxParticipants} slots
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {watch.shiftTitle}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {watch.focusArea}
                  </p>

                  <div className="mt-3 text-[11px] text-slate-500 font-medium">
                    Leader: <span className="text-slate-800 font-bold">{watch.leader}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRegisterWatch(watch.id)}
                  disabled={isFull}
                  className="w-full py-2.5 rounded-xl bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-700 text-xs font-bold border border-orange-200 transition disabled:opacity-50"
                >
                  {isFull ? 'Watch Full' : 'Join This Watch'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
