import React, { useState } from 'react';
import { 
  Menu, X, Sparkles, Shield, MapPin, PhoneCall,
  Tv, MessageSquareQuote, HeartHandshake, Bus, LayoutDashboard, QrCode, Calendar
} from 'lucide-react';
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
    { id: 'home', label: 'Home', icon: null },
    { id: 'booking', label: 'Book Stay', icon: Calendar, highlight: true },
    { id: 'ticket', label: 'My Ticket', icon: QrCode },
    { id: 'scanner', label: 'Gate Scanner', icon: Shield, badge: 'Officers' },
    { id: 'map', label: 'Campus Map', icon: MapPin },
    { id: 'services', label: 'Live Services', icon: Tv },
    { id: 'testimonies', label: 'Testimonies', icon: MessageSquareQuote },
    { id: 'prayer', label: 'Prayer Request', icon: HeartHandshake },
    { id: 'transport', label: 'Transport & Fares', icon: Bus },
    { id: 'admin', label: 'Admin Portal', icon: LayoutDashboard, badge: 'Staff' },
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
          <span className="font-bold text-amber-200 uppercase tracking-wider shrink-0">Gilgil Altar:</span>
          <span className="hidden sm:inline text-orange-100 truncate">Strict Fasting Grounds • Gate Hours: 5:00 AM — 8:00 PM</span>
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
          {/* Logo & Branding (shrink-0 with whitespace-nowrap prevents ANY text wrapping) */}
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
                Prayer Mountain Digital Management System
              </p>
            </div>
          </div>

          {/* Right-Hand Tools: Book CTA, Ask AI, Role Switcher, Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Primary Book Stay CTA Button */}
            <button
              onClick={() => handleNavClick('booking')}
              className="hidden md:flex items-center space-x-1.5 bg-white text-orange-600 hover:bg-orange-50 font-black text-xs px-3.5 py-2 rounded-xl shadow-md transition hover:scale-105 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-orange-600" />
              <span>Book Stay</span>
            </button>

            {/* Ask AI Assistant Button */}
            <button
              onClick={onOpenAi}
              className="flex items-center space-x-1.5 bg-orange-700/80 hover:bg-orange-700 text-white border border-white/30 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Quick Demo Role Switcher */}
            <div className="relative shrink-0">
              <select
                value={user?.role || 'registered_pilgrim'}
                onChange={(e) => switchRole(e.target.value as any)}
                aria-label="Switch User Role"
                className="bg-orange-700 hover:bg-orange-800 border border-white/30 text-white text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
              >
                <option value="registered_pilgrim" className="text-slate-900 bg-white">👤 Pilgrim (John Kamau)</option>
                <option value="gate_officer" className="text-slate-900 bg-white">🛡️ Gate Officer (David)</option>
                <option value="reception_officer" className="text-slate-900 bg-white">📋 Reception (Mary)</option>
                <option value="accommodation_officer" className="text-slate-900 bg-white">🛏️ Accommodation (Samuel)</option>
                <option value="finance_officer" className="text-slate-900 bg-white">💰 Finance Officer (James)</option>
                <option value="prayer_admin" className="text-slate-900 bg-white">🙏 Prayer Admin (Grace)</option>
                <option value="system_admin" className="text-slate-900 bg-white">⚙️ System Admin (Pastor Peter)</option>
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

      {/* 3. Secondary Nav Bar Row (Spacious & Clean Horizontal Links, No Scrollbars) */}
      <div className="hidden lg:block bg-orange-700 border-t border-orange-500/40 text-white px-4 sm:px-6 lg:px-8 py-1.5">
        <div 
          className="max-w-7xl mx-auto flex items-center gap-1 xl:gap-1.5 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {navItems.map(item => {
            const active = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 py-1.5 xl:px-3 xl:py-1.5 rounded-lg text-[11px] xl:text-xs font-bold transition flex items-center space-x-1.5 whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase font-mono ${
                    active ? 'bg-orange-100 text-orange-700' : 'bg-white/20 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-orange-700 border-t border-orange-500/50 px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-fade-in text-white">
          <div className="text-[11px] font-bold text-orange-200 uppercase tracking-wider px-3 py-1">
            Platform Modules
          </div>
          {navItems.map(item => {
            const active = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  active
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
