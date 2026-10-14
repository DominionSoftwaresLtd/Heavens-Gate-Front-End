import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ShieldCheck, Calendar, MapPin, Printer, Download, Clock, 
  AlertTriangle, Bed, User, CheckCircle2, Search, ArrowRight
} from 'lucide-react';
import { api } from '../services/api.js';

interface TicketViewPageProps {
  initialTicketRef?: string;
  onNavigateToMap?: () => void;
}

export const TicketViewPage: React.FC<TicketViewPageProps> = ({ initialTicketRef, onNavigateToMap }) => {
  const [ticketRefInput, setTicketRefInput] = useState(initialTicketRef || 'TKT-2026-9821');
  const [ticketData, setTicketData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchTicket = async (ref: string) => {
    if (!ref.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await api.getTicket(ref.trim());
      if (res.ticket) {
        setTicketData(res);
      } else {
        setErrorMsg('No active ticket found for this reference. Please check your confirmation SMS or booking ID.');
        setTicketData(null);
      }
    } catch (err: any) {
      setErrorMsg('Failed to retrieve ticket. Check network connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTicketRef) {
      fetchTicket(initialTicketRef);
    } else {
      fetchTicket('TKT-2026-9821');
    }
  }, [initialTicketRef]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Header for Ticket Retrieval */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border-t-4 border-t-orange-500">
        <div className="text-left w-full sm:w-auto">
          <div className="text-xs text-orange-600 font-bold uppercase tracking-wider">Gate Verification Pass</div>
          <h2 className="font-cinzel text-lg font-bold text-slate-900">Retrieve Pilgrim Ticket</h2>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            fetchTicket(ticketRefInput);
          }}
          className="flex items-center space-x-2 w-full sm:w-auto"
        >
          <div className="relative flex-1 sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={ticketRefInput}
              onChange={e => setTicketRefInput(e.target.value)}
              placeholder="Enter Ticket or Booking Ref..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-sm transition"
          >
            Search
          </button>
        </form>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-xs text-slate-500">Loading digital ticket...</div>
      ) : ticketData?.ticket ? (
        <div className="bg-white border-2 border-orange-500 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden print:border-black print:text-black">
          {/* Top Seal & Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-cinzel font-black text-2xl shadow-md">
                HG
              </div>
              <div>
                <h1 className="font-cinzel text-xl font-bold text-slate-900 tracking-wide">
                  Heavens Gate Prayer Mountain
                </h1>
                <p className="text-xs text-slate-500">
                  Official Admission Ticket • Gilgil, Nakuru County, Kenya
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
                ticketData.ticket.status === 'valid'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : ticketData.ticket.status === 'checked_in'
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Status: {ticketData.ticket.status.replace('_', ' ')}</span>
              </span>
            </div>
          </div>

          {/* Ticket Body: QR Code & Details */}
          <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* QR Code Presentation */}
            <div className="flex flex-col items-center justify-center p-5 bg-orange-50/50 rounded-2xl shadow-inner border-2 border-orange-300">
              <QRCodeSVG
                value={ticketData.ticket.qrData}
                size={180}
                level="H"
                includeMargin={false}
              />
              <div className="text-xs text-slate-900 font-mono font-bold mt-3">
                {ticketData.ticket.ticketReference}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Cryptographically Signed HMAC-SHA256
              </div>
            </div>

            {/* Pilgrim & Accommodation Details */}
            <div className="md:col-span-2 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Pilgrim Name</span>
                  <span className="font-bold text-slate-900 text-sm">{ticketData.ticket.visitorName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Booking Reference</span>
                  <span className="font-mono font-black text-orange-600 text-sm">{ticketData.ticket.bookingReference}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Stay Duration</span>
                  <span className="font-semibold text-slate-800">
                    {ticketData.ticket.checkInDate} to {ticketData.ticket.checkOutDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Accommodation Wing</span>
                  <span className="font-bold text-slate-900">{ticketData.ticket.categoryName}</span>
                </div>
              </div>

              {/* Room Assignment (Stacks gracefully on mobile) */}
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Bed className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-orange-800 uppercase font-bold">Assigned Room & Bed</div>
                    <div className="font-bold text-sm text-slate-900">
                      {ticketData.booking?.assignedRoomNumber || 'Mount Zion Z-101'} • {ticketData.booking?.assignedBedNumber || 'Bed 1'}
                    </div>
                  </div>
                </div>

                {onNavigateToMap && (
                  <button
                    onClick={onNavigateToMap}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition flex items-center justify-center space-x-1 shadow-sm"
                  >
                    <span>View Room Route</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Arrival Checklist */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="text-slate-900 font-bold flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Gate Hours: 5:00 AM — 8:00 PM Daily</span>
                </div>
                <div>• Present this QR ticket and your original National ID at the Main Gate.</div>
                <div>• Strict Fasting Ground: No cooked food or snacks allowed in bags.</div>
                <div>• Bring your personal thermos, cup, warm clothes, and Bible.</div>
              </div>
            </div>
          </div>

          {/* Ticket Footer Actions (Stacks gracefully on mobile) */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] text-slate-500 font-medium text-center sm:text-left">
              Heavens Gate Security Desk: 0711 000 002 • Emergency Clinic: 0700 999 111
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-2 transition shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Pass</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
