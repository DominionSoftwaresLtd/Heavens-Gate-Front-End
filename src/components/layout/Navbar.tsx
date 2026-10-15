import React, { useState } from 'react';
import { 
  Menu, X, PhoneCall, Mail, Clock, HelpCircle, Bell, LogIn, LogOut, 
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
  const { user, logout } = useAuth();

  const isAdmin = user?.role === 'system_admin';

  // Public navigation tabs visible to all pilgrims and visitors
  const baseNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'booking', label: 'Book Stay' },
    { id: 'map', label: 'Campus Map' },
    { id: 'services', label: 'Live Services' },
    { id: 'testimonies', label: 'Testimonies' },
    { id: 'prayer', label: 'Prayer Requests' },
    { id: 'transport', label: 'Transport & Fares' },
  ];

  // Staff Portal is strictly accessible only when authenticated as admin (admin@heavensgate.org)
  const navItems = isAdmin 
    ? [...baseNavItems, { id: 'admin', label: 'Staff Portal' }]
    : baseNavItems;

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 shadow-md shadow-slate-900/10">
      {/* 1. Top Utility Information Bar: Deep Forest Green #173F35 */}
      <div className="bg-[#173F35] text-[#F8F5EC] text-[10px] sm:text-[11px] px-3 sm:px-6 lg:px-8 py-1.5 border-b border-[#244E40] w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Call Us */}
          <div className="flex items-center space-x-2 truncate">
            <a
              href="tel:+254700999111"
              className="flex items-center space-x-1.5 text-[#F8F5EC] hover:text-[#E5C158] transition font-medium whitespace-nowrap"
            >
              <PhoneCall className="w-3 h-3 text-[#D4AF37] shrink-0" />
              <span>Call: <strong className="font-mono text-white">0700 999 111</strong></span>
            </a>
            <span className="text-white/30 hidden md:inline">|</span>
            <a
              href="mailto:info@heavensgate.org"
              className="hidden md:flex items-center space-x-1.5 text-[#F8F5EC] hover:text-[#E5C158] transition font-medium"
            >
              <Mail className="w-3 h-3 text-[#D4AF37] shrink-0" />
              <span>info@heavensgate.org</span>
            </a>
          </div>

          {/* Right: Scripture Motto & Gate Hours */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <div className="hidden md:flex items-center space-x-1.5 text-[#F8F5EC]/90 font-medium text-[11px]">
              <span className="text-[#E5C158] font-semibold italic">This is the Gate of Heaven</span>
              <span className="text-[#F8F5EC]/75 font-mono text-[10px]">• Genesis 28:17</span>
            </div>
            <span className="text-white/30 hidden md:inline">|</span>
            <div className="flex items-center space-x-1 text-[#F8F5EC]/90 font-medium text-[10px] sm:text-[11px] whitespace-nowrap">
              <Clock className="w-3 h-3 text-[#D4AF37] shrink-0" />
              <span><span className="hidden xs:inline">Gate Hours: </span><strong className="font-mono text-white">5AM — 8PM</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Single Unified Row): Warm Ivory #F8F5EC */}
      <div className="bg-[#F8F5EC] text-[#173F35] px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 border-b border-[#E8E3D5] shadow-xs w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Logo & Centered Brand Lockup */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-1.5 sm:space-x-3 cursor-pointer group shrink-0 min-w-0"
          >
            <img 
              src={logoImg} 
              alt="Heavens Gate Prayer Mountain Official Logo" 
              className="w-8 h-8 sm:w-11 sm:h-11 object-contain drop-shadow-sm group-hover:scale-105 transition shrink-0" 
            />

            {/* Subtle Vertical Divider Line */}
            <div className="h-7 sm:h-9 w-[1.5px] bg-gradient-to-b from-transparent via-[#173F35]/25 to-transparent hidden sm:block shrink-0"></div>

            <div className="shrink-0 flex flex-col items-center justify-center text-center">
              {/* Primary Thick Title Name: Montserrat 900 Extra Bold / Black in Sacred Red */}
              <div className="flex items-center justify-center whitespace-nowrap">
                <span className="font-brand font-black text-sm sm:text-lg xl:text-[22px] tracking-tight uppercase leading-none select-none text-[#C22F23]">
                  HEAVENS GATE
                </span>
              </div>

              {/* Subtitle: Elegant Cursive Script with Accent Wing Dividers */}
              <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 w-full mt-0.5">
                <span className="h-[1px] w-2 sm:w-5 bg-gradient-to-r from-transparent via-[#173F35]/40 to-[#173F35] rounded-full"></span>
                <p className="font-script text-[#173F35] text-[11px] sm:text-[14px] font-semibold italic tracking-wide leading-none whitespace-nowrap select-none">
                  Prayer Mountain
                </p>
                <span className="h-[1px] w-2 sm:w-5 bg-gradient-to-l from-transparent via-[#173F35]/40 to-[#173F35] rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Center: Desktop Navigation Links (Single-Row Inline Alignment) */}
          <nav className="hidden lg:flex items-center space-x-2.5 xl:space-x-5 whitespace-nowrap">
            {navItems.map(item => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs xl:text-[13px] tracking-tight transition duration-150 relative py-1 ${
                    active
                      ? 'text-[#173F35] font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#173F35] after:rounded-full'
                      : 'text-slate-700 hover:text-[#173F35] font-semibold hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-[2px] hover:after:bg-[#173F35]/30'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions Group (Staff Portal + Book Stay CTA + Inquiries Bell + Log In / User + Mobile Toggle) */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            
            {/* Direct Staff Portal Shortcut (Strictly if Admin on desktop) */}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className="hidden xl:flex items-center space-x-1.5 bg-[#E5C158] hover:bg-[#d8b446] text-[#173F35] border border-[#173F35] font-black text-xs px-3 py-1.5 rounded-xl shadow-xs transition animate-pulse"
                title="Open Executive Staff Portal"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#173F35]" />
                <span>Staff Portal</span>
              </button>
            )}

            {/* Primary Green Book Stay CTA Button (Visible on sm: and up; mobile users have full CTA in mobile menu) */}
            <button
              onClick={() => handleNavClick('booking')}
              className="hidden sm:flex items-center bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold text-xs px-3 sm:px-4 py-2 rounded-xl shadow-xs transition hover:scale-105 active:scale-95"
            >
              Book Stay
            </button>

            {/* Circular Inquiries Bell Button */}
            <button
              onClick={onOpenAi}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-stone-100 text-[#173F35] border border-[#E8E3D5] flex items-center justify-center transition shadow-xs hover:scale-105 shrink-0"
              title="Campus Inquiries & Visitor Guide"
              aria-label="Campus Inquiries"
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#244E40]" />
            </button>

            {/* User Account / Log In Button (Compact on mobile, full on tablet/desktop) */}
            {user ? (
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <button
                  onClick={onOpenAuth}
                  className="flex items-center space-x-1.5 bg-white hover:bg-stone-50 border border-[#173F35]/30 text-[#173F35] p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold transition shadow-xs group shrink-0"
                  title="Account Details"
                >
                  <div className="w-5 h-5 rounded-full bg-[#173F35] text-[#F8F5EC] flex items-center justify-center text-[10px]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[70px] sm:max-w-[100px] truncate hidden sm:inline">{user.name.split(' ')[0]}</span>
                  {isAdmin && (
                    <span className="text-[9px] bg-[#E5C158] text-[#173F35] px-1 py-0.2 rounded font-extrabold uppercase hidden sm:inline">
                      Admin
                    </span>
                  )}
                </button>
                <button
                  onClick={logout}
                  className="hidden sm:flex p-2 rounded-xl bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 border border-[#E8E3D5] transition shadow-xs shrink-0"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1.5 bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 p-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition shadow-xs hover:scale-105 active:scale-95 shrink-0"
                title="Log In"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#E5C158]" />
                <span className="hidden sm:inline">Log In</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              className="lg:hidden text-[#173F35] p-1.5 sm:p-2 rounded-xl bg-white hover:bg-stone-100 border border-[#E8E3D5] focus:outline-none focus:ring-2 focus:ring-[#173F35] transition shadow-xs shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Drawer Menu in Forest Green */}
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

          {/* Quick Staff Portal in Mobile (strictly if Admin) */}
          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full bg-[#E5C158] text-[#173F35] font-black text-sm py-2.5 px-4 rounded-xl shadow-lg border border-[#F8F5EC] flex items-center justify-center space-x-2 transition"
            >
              <ShieldAlert className="w-4 h-4 text-[#173F35]" />
              <span>Open Staff Portal</span>
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
