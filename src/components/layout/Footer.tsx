import React from 'react';
import { MapPin, ShieldCheck, Heart, Clock, AlertTriangle } from 'lucide-react';
import logoImg from '../../assets/LOGO.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-4 border-[#173F35] text-slate-600 text-xs mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Ministry Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img 
                src={logoImg} 
                alt="Heavens Gate Prayer Mountain Official Logo" 
                className="w-14 h-14 object-contain drop-shadow-sm shrink-0"
              />
              <div className="shrink-0">
                <span className="font-brand font-black text-lg sm:text-xl uppercase tracking-tight block leading-tight">
                  <span className="text-[#173F35]">HEAVENS</span> <span className="text-[#EA580C]">GATE</span>
                </span>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="h-[1px] w-3 bg-[#2E6352]/40"></span>
                  <span className="font-script text-[#2E6352] text-sm font-semibold italic">Prayer Mountain • Gilgil</span>
                  <span className="h-[1px] w-3 bg-[#2E6352]/40"></span>
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Heavens Gate Prayer Mountain in Gilgil is an altar of divine encounter, fasting, and continuous intercession established under the apostolic vision of Apostle John Kimani William.
            </p>
            <div className="flex items-center space-x-1.5 text-[#173F35] font-semibold text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-[#244E40]" />
              <span>Gilgil, Nakuru County, Kenya</span>
            </div>
          </div>

          {/* Col 2: Strict Mountain Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#173F35] uppercase tracking-wider text-xs">Fasting & Gate Policies</h4>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start space-x-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Strict Fasting:</strong> No cooked food, outside snacks, or fruits allowed in the compound.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-3.5 h-3.5 text-[#244E40] shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Gate Hours:</strong> Open 5:00 AM — Strictly closed at 8:00 PM for security and order.</span>
              </li>
              <li className="flex items-start space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#173F35] shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Modest Attire:</strong> Long skirts/dresses for ladies; no shorts or sleeveless tops.</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Tea & Sustenance Times */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#173F35] uppercase tracking-wider text-xs">Prayer Mountain Services</h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>• Morning Glory: 06:00 AM — 08:00 AM</li>
              <li>• Midday Prayer: 12:00 PM — 01:30 PM</li>
              <li>• Evening Revival: 05:00 PM — 07:30 PM</li>
              <li>• 3-Hour Continuous Night Prayer Watches</li>
              <li>• Scheduled Tea: 06:30 AM, 01:00 PM, 06:30 PM</li>
              <li>• Filtered Drinking Water: Free 24/7</li>
            </ul>
          </div>

          {/* Col 4: Contacts & Emergency */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#173F35] uppercase tracking-wider text-xs">Contact & Inquiries</h4>
            <p className="text-slate-600">Nehemiah Administration Office:</p>
            <div className="space-y-1 text-slate-800 font-mono text-xs">
              <div>Phone: +254 722 000 000</div>
              <div>Security: +254 711 000 002</div>
              <div>Medical Clinic: +254 700 999 111</div>
            </div>
            <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
              Off Nairobi-Nakuru Highway at Heavens Gate Stage, Gilgil.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            © {new Date().getFullYear()} Heavens Gate Prayer Mountain Digital System. All rights reserved.
          </div>
          <div className="flex items-center space-x-1.5">
            <span>Powered by</span>
            <strong className="text-slate-800 font-bold tracking-tight">Dominion Softwares</strong>
            <span className="font-script text-[#2E6352] text-xs sm:text-sm italic font-semibold">— Heavenly Inspired —</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
