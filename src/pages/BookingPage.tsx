import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, Users, Bed, CreditCard, ShieldCheck, CheckCircle2, 
  Clock, AlertCircle, ArrowRight, Loader2, Phone
} from 'lucide-react';
import { api } from '../services/api.js';
import { AccommodationCategory, Booking } from '../types/index.js';
import { useAuth } from '../context/AuthContext.js';
import logoImg from '../assets/LOGO.jpg';

interface BookingPageProps {
  onBookingSuccess: (bookingRef: string, ticketRef?: string) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onBookingSuccess }) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<AccommodationCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('cat-single');
  const [checkInDate, setCheckInDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const defaultCheckout = new Date();
  defaultCheckout.setDate(defaultCheckout.getDate() + 3);
  const [checkOutDate, setCheckOutDate] = useState<string>(defaultCheckout.toISOString().split('T')[0]);
  
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [gender, setGender] = useState<'male' | 'female' | 'any'>('any');

  // Visitor Form
  const [visitorName, setVisitorName] = useState(user?.name || '');
  const [visitorPhone, setVisitorPhone] = useState(user?.phone || '');
  const [visitorEmail, setVisitorEmail] = useState(user?.email || '');
  const [nationalId, setNationalId] = useState(user?.nationalId || '');

  // Pricing snapshot state
  const [pricing, setPricing] = useState<any>(null);
  const [calculatingPrice, setCalculatingPrice] = useState(false);

  // Booking Hold & Payment Modal state
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState(visitorPhone || '0722123456');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    api.getCategories().then(data => {
      if (data?.categories) {
        setCategories(data.categories);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedCategory || !checkInDate || !checkOutDate) return;
    setCalculatingPrice(true);
    api.calculatePrice({
      categoryId: selectedCategory,
      checkInDate,
      checkOutDate,
      guestsCount
    }).then(res => {
      setPricing(res);
      setCalculatingPrice(false);
    }).catch(err => {
      console.error(err);
      setCalculatingPrice(false);
    });
  }, [selectedCategory, checkInDate, checkOutDate, guestsCount]);

  const handleCreateReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!visitorName || !visitorPhone) {
      setErrorMsg('Please enter your full name and valid phone number.');
      return;
    }

    try {
      setPaymentLoading(true);
      const res = await api.createBooking({
        visitorId: user?.id,
        visitorName,
        visitorPhone,
        visitorEmail,
        nationalId,
        categoryId: selectedCategory,
        checkInDate,
        checkOutDate,
        guestsCount,
        gender
      });

      if (res.booking) {
        setCreatedBooking(res.booking);
        setMpesaPhone(visitorPhone);
        setIsPaymentModalOpen(true);
      } else if (res.error) {
        setErrorMsg(res.message || res.error);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error creating reservation hold.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleInitiateSTK = async () => {
    if (!createdBooking) return;
    setPaymentLoading(true);
    setPaymentMessage('Sending Safaricom Daraja STK Push prompt to your phone...');
    try {
      const res = await api.initiateSTK(createdBooking.id, mpesaPhone);
      setPaymentMessage(res.message);
    } catch (err: any) {
      setPaymentMessage(`STK Push failed: ${err.message}. You can use the instant simulator below.`);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleSimulatePayment = async () => {
    if (!createdBooking) return;
    setPaymentLoading(true);
    setPaymentMessage('Processing simulated M-Pesa confirmation and generating signed QR ticket...');
    try {
      const res = await api.simulatePayment(createdBooking.id);
      if (res.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setPaymentMessage(`Payment approved! M-Pesa Receipt: ${res.receiptNumber}`);
        setTimeout(() => {
          setIsPaymentModalOpen(false);
          onBookingSuccess(createdBooking.bookingReference, res.ticket?.ticketReference);
        }, 1500);
      }
    } catch (err: any) {
      setPaymentMessage(`Simulation error: ${err.message}`);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto flex flex-col items-center">
        <img 
          src={logoImg} 
          alt="Heavens Gate Official Logo" 
          className="w-14 h-14 rounded-2xl object-contain bg-white p-1 border-2 border-orange-400 shadow-md mb-3" 
        />
        <span className="text-orange-600 text-xs font-bold uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
          Online Reservation & M-Pesa Gate Pass
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-slate-900 mt-2">
          Reserve Your Prayer Retreat Accommodation
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          Secure your bed in advance. Capacity is calculated in real-time from active inventory at Heavens Gate, Gilgil.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleCreateReservation} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Controls (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Select Category */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 border-t-4 border-t-orange-500">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <Bed className="w-4 h-4 text-orange-600" />
              <span>1. Choose Accommodation Category</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map(cat => {
                const selected = selectedCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-xl cursor-pointer border-2 transition ${
                      selected
                        ? 'bg-orange-50/80 border-orange-500 text-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-orange-300 text-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm text-slate-900">{cat.name}</span>
                      <span className="text-xs font-mono font-bold text-orange-600">
                        KES {cat.pricePerNightKES}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="mt-2 text-[10px] text-slate-400 font-medium">
                      Billing: {cat.billingUnit === 'per_person' ? 'Per Person / Night' : 'Per Room / Night'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Dates & Guests */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 border-t-4 border-t-orange-500">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span>2. Select Dates & Attendance</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-700 mb-1.5 font-bold">Arrival Date (Gate Check-in)</label>
                <input
                  type="date"
                  value={checkInDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setCheckInDate(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1.5 font-bold">Departure Date (Check-out)</label>
                <input
                  type="date"
                  value={checkOutDate}
                  min={checkInDate}
                  onChange={e => setCheckOutDate(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1.5 font-bold">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={guestsCount}
                  onChange={e => setGuestsCount(parseInt(e.target.value || '1', 10))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1.5 font-bold">Gender Allocation (Dorm Rules)</label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                >
                  <option value="any">General / Single Room</option>
                  <option value="male">Brother (Male Wing)</option>
                  <option value="female">Sister (Female Wing)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Pilgrim Details */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 border-t-4 border-t-orange-500">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <Users className="w-4 h-4 text-orange-600" />
              <span>3. Pilgrim Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-700 mb-1.5 font-bold">Full Name (As on National ID)</label>
                <input
                  type="text"
                  value={visitorName}
                  onChange={e => setVisitorName(e.target.value)}
                  placeholder="e.g. John Kamau Karanja"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1.5 font-bold">M-Pesa Mobile Number</label>
                <input
                  type="tel"
                  value={visitorPhone}
                  onChange={e => setVisitorPhone(e.target.value)}
                  placeholder="e.g. 0722 123 456"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1.5 font-bold">National ID / Passport Number</label>
                <input
                  type="text"
                  value={nationalId}
                  onChange={e => setNationalId(e.target.value)}
                  placeholder="e.g. 29876543 (Required at Gate)"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1.5 font-bold">Email Address (Optional)</label>
                <input
                  type="email"
                  value={visitorEmail}
                  onChange={e => setVisitorEmail(e.target.value)}
                  placeholder="For ticket delivery"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Summary & Checkout Button (1 Col) */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl sticky top-24 space-y-5 border-2 border-orange-500 shadow-md">
            <h3 className="font-cinzel font-bold text-slate-900 text-base border-b border-slate-200 pb-3 flex items-center justify-between">
              <span>Reservation Summary</span>
              <span className="text-[10px] text-orange-700 font-mono font-bold bg-orange-100 px-2 py-0.5 rounded">
                Server Verified
              </span>
            </h3>

            {calculatingPrice ? (
              <div className="py-8 text-center text-xs text-slate-500 flex items-center justify-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                <span>Calculating pricing snapshot...</span>
              </div>
            ) : pricing ? (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Category:</span>
                  <span className="font-bold text-slate-900">{pricing.categoryName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Duration:</span>
                  <span className="font-bold text-slate-900">{pricing.nights} Night{pricing.nights > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Rate:</span>
                  <span className="font-mono text-slate-700 font-semibold">KES {pricing.pricePerUnitNightKES} / night</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Guests:</span>
                  <span className="font-bold text-slate-900">{pricing.guestsCount}</span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-900">Total Amount:</span>
                  <span className="font-mono text-xl font-black text-orange-600">
                    KES {pricing.totalAmountKES.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500">Select accommodation and dates above.</div>
            )}

            <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-[11px] text-slate-700 space-y-1.5">
              <div className="flex items-center space-x-1 text-orange-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>15-Minute Hold Protection</span>
              </div>
              <p>
                When you proceed, a bed will be held exclusively for you. Your QR ticket is generated immediately upon M-Pesa confirmation.
              </p>
            </div>

            <button
              type="submit"
              disabled={paymentLoading || !pricing}
              className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30 transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {paymentLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reserving Hold...</span>
                </>
              ) : (
                <>
                  <span>Proceed to M-Pesa Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* M-Pesa Payment Modal (Fully Responsive & Scrollable on Mobile) */}
      {isPaymentModalOpen && createdBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border-2 border-orange-500 rounded-2xl sm:rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative space-y-4 sm:space-y-5 animate-fade-in max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2 text-slate-900">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <h3 className="font-cinzel font-bold text-sm sm:text-base">M-Pesa Express Checkout</h3>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-orange-700 bg-orange-100 px-2 py-0.5 rounded font-bold">
                Ref: {createdBooking.bookingReference}
              </span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Pilgrim:</span>
                <span className="font-bold text-slate-900">{createdBooking.visitorName}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Room Assigned:</span>
                <span className="font-bold text-orange-600">{createdBooking.assignedRoomNumber} ({createdBooking.assignedBedNumber})</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Due:</span>
                <span className="font-mono font-black text-slate-900 text-sm sm:text-base">KES {createdBooking.totalAmountKES.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-700 mb-1 font-bold">M-Pesa Phone Number</label>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  value={mpesaPhone}
                  onChange={e => setMpesaPhone(e.target.value)}
                  placeholder="07XXXXXXXX"
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm sm:text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {paymentMessage && (
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-xs flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <span>{paymentMessage}</span>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleInitiateSTK}
                disabled={paymentLoading}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md disabled:opacity-50"
              >
                {paymentLoading ? 'Connecting Daraja API...' : 'Prompt Phone via STK Push'}
              </button>

              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={paymentLoading}
                className="w-full py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs border border-orange-300 transition"
              >
                Instant Simulator (Developer Test Sandbox)
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsPaymentModalOpen(false)}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 pt-1 font-medium"
            >
              Cancel Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
