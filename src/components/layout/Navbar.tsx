import React, { useState } from 'react';
import { Menu, X, PhoneCall, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onOpenAi }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, switchRole } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'booking', label: 'Book Stay' },
    { id: 'ticket', label: 'My Ticket' },
    { id: 'scanner', label: 'Gate Scanner' },
    { id: 'map', label: 'Campus Map' },
    { id: 'services', label: 'Live Services' },
    { id: 'testimonies', label: 'Testimonies' },
    { id: 'prayer', label: 'Prayer Requests' },
    { id: 'transport', label: 'Transport & Fares' },
    { id: 'admin', label: 'Staff Portal' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 shadow-lg shadow-orange-500/10">
      {/* 1. Integrated Slim Top Emergency & Support Strip */}
      <div className="bg-orange-800 text-white text-[11px] px-4 py-1 flex items-center justify-between border-b border-orange-700/60">
        <div className="flex items-center space-x-2 truncate">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
          </span>
          <span className="text-orange-100 font-medium truncate">
            Strict Fasting Grounds • Gate Hours: 5:00 AM — 8:00 PM Daily
          </span>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <a
            href="tel:+254700999111"
            className="flex items-center space-x-1 text-white hover:text-amber-200 font-bold transition"
          >
            <PhoneCall className="w-3 h-3 text-amber-300" />
            <span className="font-mono">Clinic: 0700 999 111</span>
          </a>
        </div>
      </div>

      {/* 2. Main Brand & Quick Actions Row in Vivid Orange */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Branding */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-orange-600 flex items-center justify-center font-black font-cinzel text-xl shadow-md group-hover:scale-105 transition shrink-0">
              HG
            </div>
            <div className="shrink-0 leading-tight">
              <div className="flex items-center space-x-1.5 whitespace-nowrap">
                <span className="font-cinzel font-black text-lg sm:text-xl text-white tracking-wide">
                  Heavens Gate
                </span>
                <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                  Gilgil
                </span>
              </div>
              <p className="text-[11px] text-orange-100 font-medium tracking-tight whitespace-nowrap">
                Prayer Mountain • Gilgil, Kenya
              </p>
            </div>
          </div>

          {/* Right-Hand Tools: Book CTA, Visitor Inquiries, Role Switcher, Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Primary Book Stay CTA Button */}
            <button
              onClick={() => handleNavClick('booking')}
              className="hidden md:flex items-center bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs px-4 py-2 rounded-xl shadow-md transition hover:scale-105 active:scale-95"
            >
              Book Stay
            </button>

            {/* Natural Visitor Inquiries Button */}
            <button
              onClick={onOpenAi}
              className="flex items-center space-x-1.5 bg-orange-700/80 hover:bg-orange-700 text-white border border-white/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition shadow-sm"
              title="Campus Inquiries & Visitor Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-orange-200" />
              <span className="hidden sm:inline">Inquiries</span>
            </button>

            {/* Role Switcher without emoji clutter */}
            <div className="relative shrink-0">
              <select
                value={user?.role || 'registered_pilgrim'}
                onChange={(e) => switchRole(e.target.value as any)}
                aria-label="Switch User Role"
                className="bg-orange-700 hover:bg-orange-800 border border-white/30 text-white text-xs font-medium rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
              >
                <option value="registered_pilgrim" className="text-slate-900 bg-white">Pilgrim: John Kamau</option>
                <option value="gate_officer" className="text-slate-900 bg-white">Gate Officer: David</option>
                <option value="reception_officer" className="text-slate-900 bg-white">Reception: Mary</option>
                <option value="accommodation_officer" className="text-slate-900 bg-white">Accommodation: Samuel</option>
                <option value="finance_officer" className="text-slate-900 bg-white">Finance Officer: James</option>
                <option value="prayer_admin" className="text-slate-900 bg-white">Prayer Admin: Grace</option>
                <option value="system_admin" className="text-slate-900 bg-white">System Admin: Pastor Peter</option>
              </select>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/15 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Secondary Nav Bar Row (Clean, Natural Typography Links, Zero Clutter) */}
      <div className="hidden lg:block bg-orange-700 border-t border-orange-500/40 text-white px-4 sm:px-6 lg:px-8 py-1.5">
        <div 
          className="max-w-7xl mx-auto flex items-center gap-1 xl:gap-1.5 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {navItems.map(item => {
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-normal transition whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white text-orange-600 shadow-sm font-bold'
                    : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-orange-700 border-t border-orange-500/50 px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-fade-in text-white">
          <div className="text-[11px] font-bold text-orange-200 uppercase tracking-wider px-3 py-1">
            Campus Navigation
          </div>
          {navItems.map(item => {
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  active
                    ? 'bg-white text-orange-600 shadow-sm font-bold'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
