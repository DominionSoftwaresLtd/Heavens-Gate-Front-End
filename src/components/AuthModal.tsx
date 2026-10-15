import React, { useState } from 'react';
import { 
  X, Mail, Lock, User as UserIcon, Phone, ShieldCheck, 
  Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Sparkles 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import logoImg from '../assets/LOGO.png';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLoginSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAdminLoginSuccess }) => {
  const { loginWithCredentials, loginWithGoogle, registerUser } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Google Account Chooser Simulation State
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Login Form Fields
  const [identifier, setIdentifier] = useState('admin@heavensgate.org');
  const [password, setPassword] = useState('HeavensGate');

  // Registration Form Fields
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regNationalId, setRegNationalId] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regFellowship, setRegFellowship] = useState('Nairobi Fellowship');
  const [agreeRules, setAgreeRules] = useState(true);

  if (!isOpen) return null;

  const handleFillAdmin = () => {
    setIdentifier('admin@heavensgate.org');
    setPassword('HeavensGate');
    setErrorMsg(null);
  };

  const handleFillPilgrim = () => {
    setIdentifier('kamau@example.com');
    setPassword('HeavensGate@2026');
    setErrorMsg(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await loginWithCredentials(identifier.trim(), password);
      if (res.success && res.user) {
        const isAdmin = res.isAdmin || 
          res.user.role === 'system_admin' || 
          identifier.trim().toLowerCase() === 'admin@heavensgate.org';

        if (isAdmin) {
          setSuccessMsg('Administrator authenticated. Landing on Management Portal...');
          setTimeout(() => {
            onClose();
            if (onAdminLoginSuccess) {
              onAdminLoginSuccess();
            }
          }, 800);
        } else {
          setSuccessMsg(`Welcome, ${res.user.name}!`);
          setTimeout(() => {
            onClose();
          }, 800);
        }
      } else {
        setErrorMsg(res.error || 'Invalid credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSelect = async (email: string, name: string) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await loginWithGoogle({ email, name });
      if (res.success && res.user) {
        setSuccessMsg(`Signed in with Google as ${res.user.name}`);
        setTimeout(() => {
          setShowGoogleChooser(false);
          onClose();
          if (res.isAdmin && onAdminLoginSuccess) {
            onAdminLoginSuccess();
          }
        }, 800);
      } else {
        setErrorMsg(res.error || 'Google login failed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Google authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!agreeRules) {
      setErrorMsg('Please confirm agreement with mountain consecration and fasting guidelines.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({
        name: regName,
        phone: regPhone,
        email: regEmail,
        nationalId: regNationalId,
        password: regPassword,
        fellowshipTown: regFellowship
      });

      if (res.success && res.user) {
        setSuccessMsg('Pilgrim account created successfully!');
        setTimeout(() => {
          onClose();
        }, 900);
      } else {
        setErrorMsg(res.error || 'Registration failed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error during registration.');
    } finally {
      setLoading(false);
    }
  };

  const isEnteringAdmin = identifier.trim().toLowerCase() === 'admin@heavensgate.org';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white border-2 border-[#173F35] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden relative my-auto">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#173F35] via-[#244E40] to-[#0F2A23] p-5 text-white relative border-b-2 border-[#D4AF37]/50 shadow-md">
          <button
            onClick={onClose}
            aria-label="Close Authentication Dialog"
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3.5">
            <img 
              src={logoImg} 
              alt="Heavens Gate Ministry Logo" 
              className="w-12 h-12 object-contain drop-shadow-md shrink-0" 
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-brand text-lg sm:text-xl font-black uppercase tracking-tight leading-none">
                  <span className="text-[#F8F5EC]">HEAVENS</span> <span className="text-[#E5C158]">GATE</span>
                </h2>
                <span className="text-[10px] bg-[#E5C158] text-[#173F35] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                  Portal
                </span>
              </div>
              <p className="font-script text-[#E5C158] text-sm sm:text-base italic font-semibold mt-0.5 leading-none">
                Prayer Mountain Access & Ministry Desk
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 bg-[#F8F5EC] border-b border-[#E8E3D5] p-1.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(null); setSuccessMsg(null); }}
            className={`py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 ${
              mode === 'login'
                ? 'bg-[#173F35] text-[#F8F5EC] shadow-sm border border-[#D4AF37]/40'
                : 'text-[#173F35]/70 hover:text-[#173F35] hover:bg-white/60'
            }`}
          >
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMsg(null); setSuccessMsg(null); }}
            className={`py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 ${
              mode === 'register'
                ? 'bg-[#173F35] text-[#F8F5EC] shadow-sm border border-[#D4AF37]/40'
                : 'text-[#173F35]/70 hover:text-[#173F35] hover:bg-white/60'
            }`}
          >
            <span>Register Pilgrim</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[calc(85vh-140px)] overflow-y-auto">
          
          {/* Status Messages */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center space-x-2 animate-fade-in font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Continue with Google Button */}
          <div>
            <button
              type="button"
              onClick={() => setShowGoogleChooser(!showGoogleChooser)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center space-x-3 shadow-xs hover:border-slate-400 transition"
            >
              {/* Official Google G Logo SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Google Account Selector Dropdown/Box */}
            {showGoogleChooser && (
              <div className="mt-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs animate-fade-in shadow-inner">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Select Google Account:
                </div>
                
                {/* Pilgrim Google Option */}
                <button
                  type="button"
                  onClick={() => handleGoogleSelect('kamau.pilgrim@gmail.com', 'John Kamau Karanja')}
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left flex items-center space-x-2.5 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-[#173F35] text-[#F8F5EC] flex items-center justify-center font-bold text-xs">
                    J
                  </div>
                  <div className="flex-1 truncate">
                    <div className="font-bold text-slate-900">John Kamau</div>
                    <div className="text-[10px] text-slate-500">kamau.pilgrim@gmail.com</div>
                  </div>
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">
                    Pilgrim
                  </span>
                </button>

                {/* Pastor / Admin Google Option */}
                <button
                  type="button"
                  onClick={() => handleGoogleSelect('admin@heavensgate.org', 'Pastor Peter Mwangi')}
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-left flex items-center space-x-2.5 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-[#E5C158] text-[#173F35] flex items-center justify-center font-bold text-xs">
                    P
                  </div>
                  <div className="flex-1 truncate">
                    <div className="font-bold text-slate-900">Pastor Peter Mwangi</div>
                    <div className="text-[10px] text-slate-500">admin@heavensgate.org</div>
                  </div>
                  <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold uppercase border border-amber-300">
                    Admin
                  </span>
                </button>

                {/* Custom Google Account Entry */}
                <div className="pt-2 border-t border-slate-200 space-y-1.5">
                  <span className="text-[10px] text-slate-500 block">Or enter other Google email:</span>
                  <div className="flex space-x-1.5">
                    <input
                      type="email"
                      placeholder="you@gmail.com"
                      value={customGoogleEmail}
                      onChange={e => setCustomGoogleEmail(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#173F35]"
                    />
                    <button
                      type="button"
                      disabled={!customGoogleEmail.includes('@')}
                      onClick={() => handleGoogleSelect(customGoogleEmail, customGoogleEmail.split('@')[0])}
                      className="px-3 py-1.5 bg-[#173F35] text-white rounded-lg font-bold text-xs disabled:opacity-50"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] text-slate-400 uppercase font-semibold">
              or continue with email
            </span>
          </div>

          {/* ======================================================== */}
          {/* MODE 1: LOG IN FORM                                      */}
          {/* ======================================================== */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              
              {/* Quick Fill Chips */}
              <div className="flex items-center space-x-2 pt-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Quick Fill:</span>
                <button
                  type="button"
                  onClick={handleFillAdmin}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold transition flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Admin Credentials</span>
                </button>
                <button
                  type="button"
                  onClick={handleFillPilgrim}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-medium transition"
                >
                  Pilgrim
                </button>
              </div>

              {/* Identifier Input */}
              <div className="space-y-1">
                <label className="block text-slate-700 font-bold">Email Address or Phone Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder="admin@heavensgate.org or 07XXXXXXXX"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] font-medium text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-slate-700 font-bold">Password</label>
                  <span className="text-[10px] text-slate-500">
                    {isEnteringAdmin ? 'Admin Pass: HeavensGate' : ''}
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] font-medium text-slate-900 bg-slate-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Admin Privileges Callout Badge */}
              {isEnteringAdmin && (
                <div className="p-3 rounded-xl bg-[#F8F5EC] border border-[#D4AF37]/50 text-[#173F35] text-[11px] flex items-center space-x-2 animate-fade-in font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>
                    Executive management account detected. Logging in will land you directly on the <strong>Staff Admin Dashboard</strong>.
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Heavens Gate</span>
                    <ArrowRight className="w-4 h-4 text-[#E5C158]" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* ======================================================== */
            /* MODE 2: REGISTER PILGRIM FORM                            */
            /* ======================================================== */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              
              <div className="space-y-1">
                <label className="block text-slate-700 font-bold">Full Pilgrim Name (Per National ID)</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="e.g. Catherine Wambui Njoroge"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] font-medium text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold">Kenyan Phone (M-Pesa)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      placeholder="0712345678"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] font-medium text-slate-900 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold">National ID / Passport</label>
                  <input
                    type="text"
                    value={regNationalId}
                    onChange={e => setRegNationalId(e.target.value)}
                    placeholder="e.g. 31245678"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] font-medium text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 font-bold">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="pilgrim@example.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] font-medium text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 font-bold">Home Fellowship / Town</label>
                <select
                  value={regFellowship}
                  onChange={e => setRegFellowship(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] font-medium text-slate-900 bg-slate-50/50"
                >
                  <option value="Nairobi Fellowship">Nairobi & Environs</option>
                  <option value="Nakuru KSF Main">Nakuru Kingdom Seekers</option>
                  <option value="Eldoret Fellowship">Eldoret & North Rift</option>
                  <option value="Mombasa Coastal Fellowship">Mombasa / Coast</option>
                  <option value="Kisumu / Western">Kisumu / Western Kenya</option>
                  <option value="Diaspora Pilgrim">International / Diaspora</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold">Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder="At least 6 chars"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] font-medium text-slate-900 bg-slate-50/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={e => setRegConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] font-medium text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Consecration Pledge Checkbox */}
              <div className="pt-1">
                <label className="flex items-start space-x-2 text-[11px] text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeRules}
                    onChange={e => setAgreeRules(e.target.checked)}
                    className="mt-0.5 rounded text-[#173F35] focus:ring-[#173F35]"
                  />
                  <span>
                    I commit to the sacred rules of Heavens Gate Prayer Mountain: modest apparel, strict dry/water fasting sanctuary discipline, and zero outside foodstuffs.
                  </span>
                </label>
              </div>

              {/* Submit Registration */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer mt-2"
              >
                {loading ? (
                  <span>Registering Pilgrim Account...</span>
                ) : (
                  <>
                    <span>Create Pilgrim Account</span>
                    <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Footer Note */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center text-[10px] text-slate-500">
          Protected by Ministry Security Seals • Heavens Gate Gilgil, Kenya
        </div>

      </div>
    </div>
  );
};
