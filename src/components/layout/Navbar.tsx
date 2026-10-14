import React, { useState } from 'react';
import { Menu, X, PhoneCall, Mail, HelpCircle, Clock, Calendar } from 'lucide-react';
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
    { id: 'transport', label: 'Transport' },
    { id: 'admin', label: 'Staff Portal' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 shadow-sm border-b border-slate-200">
      {/* 1. Deep Vivid Orange Top Header Bar (Matching Reference) */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white text-[11px] px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between shadow-xs">
        {/* Contact Info (Email & Phone) */}
        <div className="flex items-center space-x-4 sm:space-x-6 truncate">
          <a 
            href="mailto:inquiries@heavensgate.co.ke" 
            className="flex items-center space-x-1.5 text-white/90 hover:text-white transition font-medium"
          >
            <Mail className="w-3.5 h-3.5 text-amber-200" />
            <span className="hidden sm:inline">inquiries@heavensgate.co.ke</span>
          </a>

          <a 
            href="tel:+254700999111" 
            className="flex items-center space-x-1.5 text-white/90 hover:text-white transition font-medium"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-200" />
            <span className="font-mono font-bold">+254 700 999 111 / 0722 000 000</span>
          </a>
        </div>

        {/* Operating Hours & Location Tag */}
        <div className="flex items-center space-x-3 shrink-0 text-white/90">
          <div className="hidden md:flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-200" />
            <span>Gates Open: 5:00 AM — 8:00 PM</span>
          </div>
          <span className="hidden md:inline text-white/40">•</span>
          <span className="font-semibold text-amber-100">Gilgil, Nakuru County</span>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Clean Crisp White Background with Orange Accents) */}
      <div className="bg-white text-slate-800 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black font-cinzel text-xl shadow-md group-hover:scale-105 transition shrink-0">
              HG
            </div>
            <div className="shrink-0 leading-tight">
              <div className="flex items-center space-x-1.5 whitespace-nowrap">
                <span className="font-cinzel font-black text-base sm:text-lg text-slate-900 tracking-tight">
                  HEAVENS GATE
                </span>
                <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.2 rounded font-mono font-bold uppercase">
                  GILGIL
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-orange-600 font-bold tracking-wider uppercase font-mono">
                PRAYER MOUNTAIN
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map(item => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition relative ${
                    active 
                      ? 'text-orange-600 font-black' 
                      : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50/50'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-orange-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Inquiries, Role Switcher, Book Stay Button */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Campus Inquiries */}
            <button
              onClick={onOpenAi}
              className="flex items-center space-x-1.5 bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-600 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold transition"
              title="Campus Inquiries & Visitor Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
              <span className="hidden sm:inline">Inquiries</span>
            </button>

            {/* Role Switcher */}
            <div className="relative shrink-0 hidden md:block">
              <select
                value={user?.role || 'registered_pilgrim'}
                onChange={(e) => switchRole(e.target.value as any)}
                aria-label="Switch User Role"
                className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-medium rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              >
                <option value="registered_pilgrim">Pilgrim: John Kamau</option>
                <option value="gate_officer">Gate Officer: David</option>
                <option value="reception_officer">Reception: Mary</option>
                <option value="accommodation_officer">Accommodation: Samuel</option>
                <option value="finance_officer">Finance: James</option>
                <option value="prayer_admin">Prayer Admin: Grace</option>
                <option value="system_admin">System Admin: Pastor Peter</option>
              </select>
            </div>

            {/* Prominent Solid Orange Action Button (Matching "Donate" button in reference!) */}
            <button
              onClick={() => handleNavClick('booking')}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-black text-xs px-4 sm:px-5 py-2 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:scale-105 active:scale-95 transition"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Stay</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              className="xl:hidden text-slate-700 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Secondary Nav Bar Row for Tablets / Laptops (xl:hidden) */}
      <div className="hidden lg:block xl:hidden bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navItems.map(item => {
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  active 
                    ? 'bg-orange-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 p-4 shadow-2xl space-y-3 animate-fade-in max-h-[85vh] overflow-y-auto">
          {/* Mobile Role Switcher */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-1">Testing Role Selector:</label>
            <select
              value={user?.role || 'registered_pilgrim'}
              onChange={(e) => switchRole(e.target.value as any)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium text-slate-800"
            >
              <option value="registered_pilgrim">Pilgrim: John Kamau</option>
              <option value="gate_officer">Gate Officer: David</option>
              <option value="reception_officer">Reception: Mary</option>
              <option value="accommodation_officer">Accommodation: Samuel</option>
              <option value="finance_officer">Finance: James</option>
              <option value="prayer_admin">Prayer Admin: Grace</option>
              <option value="system_admin">System Admin: Pastor Peter</option>
            </select>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`p-3 rounded-xl text-left text-xs font-bold transition ${
                  currentTab === item.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-slate-50 hover:bg-orange-50 text-slate-800 border border-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Direct CTA inside mobile menu */}
          <button
            onClick={() => handleNavClick('booking')}
            className="w-full py-3 rounded-xl bg-orange-600 text-white text-xs font-black uppercase tracking-wider shadow-md flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Accommodation</span>
          </button>
        </div>
      )}
    </header>
  );
};
