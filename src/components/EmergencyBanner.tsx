import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, HeartPulse, X } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-orange-100 border-b border-orange-200 text-xs px-3 py-1.5 flex items-center justify-between text-orange-950 font-medium">
        <div className="flex items-center space-x-2 truncate">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span className="font-bold text-orange-900 uppercase tracking-wider">Gilgil Fasting & Security Support:</span>
          <span className="hidden sm:inline text-orange-800">Bethesda Clinic & 24/7 Gate Response Desk</span>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <a
            href="tel:+254700999111"
            className="flex items-center space-x-1 text-orange-700 hover:text-orange-900 font-bold transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="font-mono">0700 999 111</span>
          </a>
          <button
            onClick={() => setIsOpen(true)}
            className="text-xs bg-orange-600 hover:bg-orange-700 text-white font-semibold px-2.5 py-0.5 rounded-lg shadow-sm transition"
          >
            All Emergency Lines
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 mb-4 text-orange-600">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-cinzel text-lg font-bold text-slate-900">Heavens Gate Emergency Desk</h3>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              During prayer and fasting retreats in Gilgil, on-site nursing and security officers are on call 24 hours a day.
            </p>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                    <HeartPulse className="w-4 h-4 text-red-500" />
                    <span>Bethesda Medical & First Aid</span>
                  </div>
                  <div className="text-xs text-slate-500">Free blood pressure & glucose checks</div>
                </div>
                <a
                  href="tel:+254700999111"
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  Call Now
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                    <ShieldAlert className="w-4 h-4 text-orange-600" />
                    <span>Main Gate Security & Access</span>
                  </div>
                  <div className="text-xs text-slate-500">Gate opening / closing & order</div>
                </div>
                <a
                  href="tel:+254711000002"
                  className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  Call Desk
                </a>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800"
            >
              Close Dialog
            </button>
          </div>
        </div>
      )}
    </>
  );
};
