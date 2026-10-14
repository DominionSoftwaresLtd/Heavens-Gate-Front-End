import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, Scan, AlertTriangle, CheckCircle2, 
  XCircle, Bed, Clock, Loader2, LogOut
} from 'lucide-react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.js';

export const GateScannerPage: React.FC = () => {
  const { user } = useAuth();
  const [ticketInput, setTicketInput] = useState('TKT-2026-9821');
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [gateStatus, setGateStatus] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [checks, setChecks] = useState({
    dressCode: true,
    orientation: true,
    identity: true,
    luggageNoFood: true
  });

  const refreshGateStatus = () => {
    api.getGateStatus().then(res => setGateStatus(res));
  };

  useEffect(() => {
    refreshGateStatus();
  }, []);

  const handleVerifyTicket = async (ref: string) => {
    if (!ref.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setScanResult(null);

    try {
      const res = await api.verifyScan('', ref.trim());
      setScanResult(res);
      if (!res.isValid) {
        setErrorMsg(res.message);
      }
    } catch (err: any) {
      setErrorMsg('Error verifying ticket with server.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdmitPilgrim = async () => {
    if (!scanResult?.ticket) return;

    if (!checks.dressCode || !checks.orientation || !checks.identity || !checks.luggageNoFood) {
      setErrorMsg('All 4 mandatory gate checklist items must be verified before granting admission.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await api.checkIn({
        ticketReference: scanResult.ticket.ticketReference,
        officerName: user?.name || 'Gate Officer David Kiprono',
        checks,
        notes: 'Cleared through Main Gate. Standard orientation briefing conducted.'
      });

      if (res.success) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        setSuccessMsg(res.message);
        handleVerifyTicket(scanResult.ticket.ticketReference);
      } else {
        setErrorMsg(res.error || 'Check-in failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Check-in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutPilgrim = async () => {
    if (!scanResult?.ticket) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await api.checkOut({
        ticketReference: scanResult.ticket.ticketReference,
        officerName: user?.name || 'Gate Officer David Kiprono',
        notes: 'Pilgrim checked out safely. Bed released to inventory.'
      });

      if (res.success) {
        setSuccessMsg(res.message);
        handleVerifyTicket(scanResult.ticket.ticketReference);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Checkout failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header and Gate Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-orange-600 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Gate Control & Admission Desk</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-slate-900">
            Ticket Screening & Verification Station
          </h1>
        </div>

        {gateStatus && (
          <div className={`px-4 py-2 rounded-xl border flex items-center space-x-2 text-xs font-bold ${
            gateStatus.isOpen
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-red-50 text-red-800 border-red-300'
          }`}>
            <Clock className="w-4 h-4" />
            <span>Gate Status: {gateStatus.isOpen ? 'OPEN (5 AM - 8 PM)' : 'CLOSED (After Hours)'}</span>
          </div>
        )}
      </div>

      {/* Quick Test Bar */}
      <div className="glass-panel p-5 rounded-2xl space-y-3 border-t-4 border-t-orange-500">
        <label className="block text-xs font-bold text-slate-800">
          Scan QR Code or Input Ticket Reference Number:
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Scan className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={ticketInput}
              onChange={e => setTicketInput(e.target.value)}
              placeholder="e.g. TKT-2026-9821"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-mono font-medium"
            />
          </div>
          <button
            onClick={() => handleVerifyTicket(ticketInput)}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition flex items-center justify-center space-x-2 shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scan className="w-4 h-4" />}
            <span>Verify Ticket</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center space-x-2 pt-1 font-medium">
          <span>Quick test:</span>
          <button
            onClick={() => {
              setTicketInput('TKT-2026-9821');
              handleVerifyTicket('TKT-2026-9821');
            }}
            className="text-orange-600 hover:underline font-mono font-bold"
          >
            [Pre-seeded Valid Ticket: TKT-2026-9821]
          </button>
        </div>
      </div>

      {/* Feedback Alerts */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center space-x-2.5 shadow-sm font-medium">
          <XCircle className="w-5 h-5 text-red-600 shrink-0" />
          <div className="flex-1 font-medium">{errorMsg}</div>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2.5 shadow-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="flex-1 font-medium">{successMsg}</div>
        </div>
      )}

      {/* Ticket Details & Mandatory Screening Checklist */}
      {scanResult?.ticket && (
        <div className="glass-panel p-6 rounded-3xl space-y-6 border-2 border-orange-500 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
            <div>
              <span className="text-[10px] text-orange-600 uppercase font-mono font-bold">
                Ref: {scanResult.ticket.ticketReference}
              </span>
              <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <span>{scanResult.ticket.visitorName}</span>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${
                  scanResult.ticket.status === 'valid'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : scanResult.ticket.status === 'checked_in'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {scanResult.ticket.status.replace('_', ' ')}
                </span>
              </h2>
            </div>

            <div className="text-xs text-slate-600">
              Dates: <strong className="text-slate-900">{scanResult.ticket.checkInDate}</strong> to <strong className="text-slate-900">{scanResult.ticket.checkOutDate}</strong>
            </div>
          </div>

          {/* Room Allocation Banner (Stacks on mobile) */}
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-orange-800 uppercase font-bold">Room & Bed Allocation</div>
                <div className="text-sm font-bold text-slate-900">
                  {scanResult.roomNumber || 'Mount Zion Z-101'} • {scanResult.bedNumber || 'Bed 1'}
                </div>
                <div className="text-xs text-orange-700 font-medium">{scanResult.ticket.categoryName}</div>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-600">
              Phone: <span className="font-mono font-bold text-slate-900">{scanResult.ticket.phone}</span>
            </div>
          </div>

          {/* Mandatory Admission Screening Checklist */}
          {scanResult.ticket.status === 'valid' && (
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>Mandatory Gate Admission Checklist (Rule BR-08)</span>
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Officers must verify each item physically before granting gate pass:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3 cursor-pointer hover:border-orange-300">
                  <input
                    type="checkbox"
                    checked={checks.dressCode}
                    onChange={e => setChecks({ ...checks, dressCode: e.target.checked })}
                    className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                  />
                  <div className="text-xs">
                    <strong className="text-slate-900 block font-bold">1. Modest Attire Verified</strong>
                    <span className="text-slate-600">Ladies long skirts below knees; men modest clothes.</span>
                  </div>
                </label>

                <label className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3 cursor-pointer hover:border-orange-300">
                  <input
                    type="checkbox"
                    checked={checks.luggageNoFood}
                    onChange={e => setChecks({ ...checks, luggageNoFood: e.target.checked })}
                    className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                  />
                  <div className="text-xs">
                    <strong className="text-slate-900 block font-bold">2. Strict Baggage Inspection</strong>
                    <span className="text-slate-600">Verified NO cooked food, outside snacks, or fruits.</span>
                  </div>
                </label>

                <label className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3 cursor-pointer hover:border-orange-300">
                  <input
                    type="checkbox"
                    checked={checks.identity}
                    onChange={e => setChecks({ ...checks, identity: e.target.checked })}
                    className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                  />
                  <div className="text-xs">
                    <strong className="text-slate-900 block font-bold">3. National ID Verified</strong>
                    <span className="text-slate-600">Matches registered name and identity.</span>
                  </div>
                </label>

                <label className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3 cursor-pointer hover:border-orange-300">
                  <input
                    type="checkbox"
                    checked={checks.orientation}
                    onChange={e => setChecks({ ...checks, orientation: e.target.checked })}
                    className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                  />
                  <div className="text-xs">
                    <strong className="text-slate-900 block font-bold">4. In-Person Safety Briefing</strong>
                    <span className="text-slate-600">Water points, silence hours, and emergency assembly.</span>
                  </div>
                </label>
              </div>

              {/* Action Button: Admit Pilgrim */}
              <button
                onClick={handleAdmitPilgrim}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Screening & Grant Gate Admission</span>
              </button>
            </div>
          )}

          {/* If already checked in: Offer Checkout Button */}
          {scanResult.ticket.status === 'checked_in' && (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
              <div className="text-xs text-blue-900 font-medium">
                Pilgrim is currently admitted on campus (Checked in at: {new Date(scanResult.ticket.checkedInAt).toLocaleString()}).
              </div>
              <button
                onClick={handleCheckoutPilgrim}
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-orange-50 text-orange-700 border-2 border-orange-300 text-xs font-bold transition flex items-center justify-center space-x-2 shadow-sm"
              >
                <LogOut className="w-4 h-4 text-orange-600" />
                <span>Record Departure & Check Out Pilgrim (Releases Bed)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
