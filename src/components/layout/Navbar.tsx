import React, { useState } from 'react';
import { 
  Menu, X, PhoneCall, HelpCircle, LogIn, LogOut, 
  User as UserIcon, ShieldAlert, Sparkles 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import logoImg from '../../assets/LOGO.png';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAi: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onOpenAi, onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, switchRole } = useAuth();

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

  const isAdmin = user?.role === 'system_admin';

  return (
    <header className="sticky top-0 z-40 shadow-md shadow-slate-900/10">
      {/* 1. Top Information Bar: Deep Forest Green #173F35, Ivory Text and Gold Icons */}
      <div className="bg-[#173F35] text-[#F8F5EC] text-[11px] px-4 py-1 flex items-center justify-between border-b border-[#244E40]">
        <div className="flex items-center space-x-2 truncate">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5C158] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
          </span>
          <span className="text-[#F8F5EC]/90 font-medium truncate">
            Strict Fasting Grounds • Gate Hours: 5:00 AM — 8:00 PM Daily
          </span>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <a
            href="tel:+254700999111"
            className="flex items-center space-x-1.5 text-[#F8F5EC] hover:text-[#E5C158] font-bold transition"
          >
            <PhoneCall className="w-3 h-3 text-[#D4AF37]" />
            <span className="font-mono">Clinic: 0700 999 111</span>
          </a>
        </div>
      </div>

      {/* 2. Main Branding Bar: Warm Ivory #F8F5EC, Original Logo, Dark Green Typography, Login & CTA */}
      <div className="bg-[#F8F5EC] text-[#173F35] px-4 sm:px-6 lg:px-8 py-2.5 border-b border-[#E8E3D5] shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Branding */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            <img 
              src={logoImg} 
              alt="Heavens Gate Prayer Mountain Official Logo" 
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-sm group-hover:scale-105 transition shrink-0" 
            />
            <div className="shrink-0 leading-tight">
              <div className="flex items-center space-x-1.5 whitespace-nowrap">
                <span className="font-cinzel font-black text-lg sm:text-xl text-[#173F35] tracking-wide">
                  Heavens Gate
                </span>
                <span className="text-[10px] bg-[#173F35]/10 text-[#173F35] border border-[#173F35]/20 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                  Gilgil
                </span>
              </div>
              <p className="text-[11px] text-[#173F35]/75 font-medium tracking-tight whitespace-nowrap">
                Prayer Mountain • Gilgil, Kenya
              </p>
            </div>
          </div>

          {/* Right-Hand Tools: Log In Button, Admin Quick Link, Green Book Stay CTA, Role Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Admin Portal Direct Badge / Quick Jump (if Admin) */}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className="hidden lg:flex items-center space-x-1.5 bg-[#E5C158] hover:bg-[#d8b446] text-[#173F35] border border-[#173F35] font-black text-xs px-3 py-1.5 rounded-xl shadow-sm transition animate-pulse"
                title="Open Executive Management Dashboard"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#173F35]" />
                <span>Admin Desk</span>
              </button>
            )}

            {/* Primary Green Book Stay CTA Button */}
            <button
              onClick={() => handleNavClick('booking')}
              className="hidden md:flex items-center bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm transition hover:scale-105 active:scale-95"
            >
              Book Stay
            </button>

            {/* Visitor Inquiries Button */}
            <button
              onClick={onOpenAi}
              className="hidden sm:flex items-center space-x-1.5 bg-white hover:bg-stone-100 text-[#173F35] border border-[#E8E3D5] px-3 py-1.5 rounded-xl text-xs font-semibold transition shadow-sm"
              title="Campus Inquiries & Visitor Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#244E40]" />
              <span className="hidden md:inline">Inquiries</span>
            </button>

            {/* Log In / User Account Action Button */}
            {user ? (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={onOpenAuth}
                  className="flex items-center space-x-2 bg-white hover:bg-stone-50 border border-[#173F35]/30 text-[#173F35] px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm group"
                  title="Switch Account or View Details"
                >
                  <div className="w-5 h-5 rounded-full bg-[#173F35] text-[#F8F5EC] flex items-center justify-center text-[10px]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate hidden sm:inline">{user.name.split(' ')[0]}</span>
                  {isAdmin && (
                    <span className="text-[9px] bg-[#E5C158] text-[#173F35] px-1.5 py-0.2 rounded font-extrabold uppercase">
                      Admin
                    </span>
                  )}
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 border border-[#E8E3D5] transition shadow-sm"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1.5 bg-white hover:bg-stone-50 text-[#173F35] border-2 border-[#173F35] px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm hover:scale-105 active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5 text-[#173F35]" />
                <span>Log In</span>
              </button>
            )}

            {/* Desktop Role Switcher Dropdown (Dev / Demo helper) */}
            <div className="relative shrink-0 hidden xl:block">
              <select
                value={user?.role || 'registered_pilgrim'}
                onChange={(e) => switchRole(e.target.value as any)}
                aria-label="Switch User Role"
                className="bg-white hover:bg-stone-50 border border-[#E8E3D5] text-[#173F35] text-xs font-medium rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#173F35] cursor-pointer shadow-sm"
              >
                <option value="system_admin" className="text-slate-900 bg-white">Admin: Pastor Peter</option>
                <option value="registered_pilgrim" className="text-slate-900 bg-white">Pilgrim: John Kamau</option>
                <option value="gate_officer" className="text-slate-900 bg-white">Gate Officer: David</option>
                <option value="reception_officer" className="text-slate-900 bg-white">Reception: Mary</option>
                <option value="accommodation_officer" className="text-slate-900 bg-white">Accommodation: Samuel</option>
                <option value="finance_officer" className="text-slate-900 bg-white">Finance Officer: James</option>
                <option value="prayer_admin" className="text-slate-900 bg-white">Prayer Admin: Grace</option>
              </select>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              className="lg:hidden text-[#173F35] p-2.5 rounded-xl bg-white hover:bg-stone-100 border border-[#E8E3D5] focus:outline-none focus:ring-2 focus:ring-[#173F35] transition shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Navigation Bar: Slightly Lighter Green #244E40, Active Page Ivory Background with Dark Green Text */}
      <div className="hidden lg:block bg-[#244E40] border-t border-[#173F35] text-[#F8F5EC] px-4 sm:px-6 lg:px-8 py-1.5">
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
                className={`px-3.5 py-1.5 rounded-lg text-xs tracking-normal transition whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#F8F5EC] text-[#173F35] shadow-sm font-bold border border-[#D4AF37]/50'
                    : 'text-[#F8F5EC]/85 hover:text-white hover:bg-white/10 font-semibold'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Mobile Drawer Menu in Forest Green */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#173F35] border-t border-[#244E40] px-4 pt-4 pb-8 space-y-3 shadow-2xl animate-fade-in text-[#F8F5EC] max-h-[calc(100vh-100px)] overflow-y-auto">
          
          {/* User Status Card in Mobile Menu */}
          <div className="p-3.5 rounded-2xl bg-[#0F2A23] border border-[#244E40] flex items-center justify-between">
            {user ? (
              <div className="flex items-center space-x-3 truncate">
                <div className="w-9 h-9 rounded-full bg-[#E5C158] text-[#173F35] font-black flex items-center justify-center shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="truncate">
                  <div className="font-bold text-xs text-white truncate">{user.name}</div>
                  <div className="text-[10px] text-[#E5C158] uppercase font-mono font-bold">{user.role.replace('_', ' ')}</div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-300">Not currently signed in</div>
            )}

            {user ? (
              <button
                onClick={logout}
                className="px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-200 text-xs font-bold transition"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="px-3 py-1.5 rounded-lg bg-[#E5C158] text-[#173F35] text-xs font-bold transition flex items-center space-x-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
            )}
          </div>

          {/* Quick Admin Shortcut in Mobile (if Admin) */}
          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full bg-[#E5C158] text-[#173F35] font-black text-sm py-2.5 px-4 rounded-xl shadow-lg border border-[#F8F5EC] flex items-center justify-center space-x-2 transition"
            >
              <ShieldAlert className="w-4 h-4 text-[#173F35]" />
              <span>Open Executive Admin Desk</span>
            </button>
          )}

          {/* Quick Mobile Action CTA */}
          <button
            onClick={() => handleNavClick('booking')}
            className="w-full bg-[#F8F5EC] text-[#173F35] hover:bg-white font-black text-sm py-3 px-4 rounded-xl shadow-lg border border-[#D4AF37]/60 flex items-center justify-center space-x-2 transition"
          >
            <span>Book Accommodation</span>
          </button>

          <div className="text-[11px] font-bold text-[#E5C158] uppercase tracking-wider px-1 pt-2">
            Campus Navigation
          </div>

          <div className="space-y-1">
            {navItems.map(item => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold min-h-[44px] transition ${
                    active
                      ? 'bg-[#F8F5EC] text-[#173F35] shadow-md font-bold border border-[#D4AF37]/60'
                      : 'text-[#F8F5EC]/90 hover:bg-white/10 active:bg-white/15'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Role Switcher */}
          <div className="pt-3 border-t border-[#244E40] space-y-1.5">
            <label className="block text-[11px] font-bold text-[#E5C158] uppercase tracking-wider px-1">
              Switch Test Role:
            </label>
            <select
              value={user?.role || 'registered_pilgrim'}
              onChange={(e) => {
                switchRole(e.target.value as any);
                setMobileMenuOpen(false);
              }}
              aria-label="Switch User Role on Mobile"
              className="w-full bg-[#0F2A23] border border-[#244E40] text-[#F8F5EC] text-xs font-semibold rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="system_admin" className="text-slate-900 bg-white">System Admin: Pastor Peter</option>
              <option value="registered_pilgrim" className="text-slate-900 bg-white">Pilgrim: John Kamau</option>
              <option value="gate_officer" className="text-slate-900 bg-white">Gate Officer: David</option>
              <option value="reception_officer" className="text-slate-900 bg-white">Reception: Mary</option>
              <option value="accommodation_officer" className="text-slate-900 bg-white">Accommodation: Samuel</option>
              <option value="finance_officer" className="text-slate-900 bg-white">Finance Officer: James</option>
              <option value="prayer_admin" className="text-slate-900 bg-white">Prayer Admin: Grace</option>
            </select>
          </div>

          {/* Quick Clinic Emergency Dial */}
          <div className="pt-2">
            <a
              href="tel:+254700999111"
              className="w-full flex items-center justify-center space-x-2 bg-[#0F2A23]/80 border border-[#D4AF37]/30 text-[#E5C158] py-2.5 px-3 rounded-xl text-xs font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Emergency Clinic: 0700 999 111</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
