import React, { useState, useEffect, useCallback } from 'react';
import { 
  HeartHandshake, Lock, Send, CheckCircle2, ShieldCheck, 
  AlertCircle, RefreshCw, ListFilter, User, Phone, Mail,
  Calendar, FileText
} from 'lucide-react';

import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.js';
import { PrayerRequest } from '../types/index.js';

const STORAGE_KEY = 'hg_my_prayer_requests';

export const PrayerRequestPage: React.FC = () => {
  const { user } = useAuth();

  // Navigation tab: 'submit' or 'my_requests'
  const [activeTab, setActiveTab] = useState<'submit' | 'my_requests'>('submit');

  // Form State
  const [visitorName, setVisitorName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [category, setCategory] = useState('Healing and Health Restoration');
  const [requestText, setRequestText] = useState('');
  const [isConfidential, setIsConfidential] = useState(true);

  // Submission States
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // My Requests States
  const [myRequests, setMyRequests] = useState<PrayerRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [requestsError, setRequestsError] = useState<string | null>(null);
  const [backendEndpointStatus, setBackendEndpointStatus] = useState<string | null>(null);

  // Synchronize auth user details when logged in
  useEffect(() => {
    if (user?.name && !visitorName) setVisitorName(user.name);
    if (user?.phone && !phone) setPhone(user.phone);
    if (user?.email && !email) setEmail(user.email);
  }, [user, visitorName, phone, email]);

  // Load My Prayer Requests
  const loadMyPrayerRequests = useCallback(async () => {
    setLoadingRequests(true);
    setRequestsError(null);
    setBackendEndpointStatus(null);

    // Read locally tracked requests submitted on this device
    let localRequests: PrayerRequest[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        localRequests = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read cached prayer requests', e);
    }

    try {
      // Check real backend endpoint GET /messages/my-messages as requested
      const identifier = user?.phone || phone || user?.email || email;
      const res = await api.getMyMessages(identifier);

      if (res?.messages || res?.requests) {
        const fetched = res.messages || res.requests;
        setMyRequests(fetched);
        setBackendEndpointStatus('connected');
      } else {
        // Fallback to local session store
        setMyRequests(localRequests);
      }
    } catch (err: any) {
      // Document missing endpoint status for team lead without crashing
      const is404 = err?.message?.includes('HTTP_404') || err?.message?.includes('Failed to fetch');
      if (is404) {
        setBackendEndpointStatus('missing_endpoint');
        // Filter local requests to current user's phone or email if available
        if (user?.phone || user?.email) {
          const matched = localRequests.filter(r => 
            (user.phone && r.phone === user.phone) || 
            (user.email && r.email === user.email)
          );
          setMyRequests(matched.length > 0 ? matched : localRequests);
        } else {
          setMyRequests(localRequests);
        }
      } else {
        setRequestsError(err?.message || 'Error querying your prayer requests.');
        setMyRequests(localRequests);
      }
    } finally {
      setLoadingRequests(false);
    }
  }, [user?.phone, phone, user?.email, email]);

  useEffect(() => {
    if (activeTab === 'my_requests') {
      loadMyPrayerRequests();
    }
  }, [activeTab, loadMyPrayerRequests]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!phone.trim()) {
      setFormError('Phone number is required so our intercessors can reach you for pastoral confirmation.');
      return;
    }
    if (!requestText.trim()) {
      setFormError('Please write your prayer request before submitting to the altar.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        visitorName: visitorName.trim() || 'Intercession Seeker',
        phone: phone.trim(),
        email: email.trim(),
        category,
        requestText: requestText.trim(),
        isConfidential
      };

      const res = await api.submitPrayerRequest(payload);

      if (res?.success) {
        const newRequestId = res.requestId || `pr-${Date.now()}`;
        setSubmittedRef(newRequestId);

        // Store into local session audit list
        const newRecord: PrayerRequest = {
          id: newRequestId,
          visitorId: user?.id,
          visitorName: payload.visitorName,
          phone: payload.phone,
          email: payload.email,
          requestText: payload.requestText,
          category: payload.category,
          isConfidential: payload.isConfidential,
          status: 'received',
          createdAt: new Date().toISOString()
        };

        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          const current: PrayerRequest[] = stored ? JSON.parse(stored) : [];
          localStorage.setItem(STORAGE_KEY, JSON.stringify([newRecord, ...current]));
        } catch (e) {
          console.warn('Storage error', e);
        }

        setRequestText('');
      } else {
        setFormError(res?.error || 'Failed to submit prayer request. Please check your information.');
      }
    } catch (err: any) {
      setFormError(err?.message || 'Network error while transmitting your request to the altar.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs text-[#173F35] font-bold uppercase tracking-wider bg-[#F8F5EC] border border-[#173F35]/20 px-3 py-1 rounded-full">
          <HeartHandshake className="w-4 h-4 text-[#244E40]" />
          <span>Intercessory Prayer Altar</span>
        </div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-slate-900">
          Mount Sinai Intercession Altar
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          "For where two or three are gathered together in My name, I am there in the midst of them." — Matthew 18:20
        </p>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => {
            setActiveTab('submit');
            setSubmittedRef(null);
          }}
          className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition min-h-[44px] flex items-center justify-center space-x-2 ${
            activeTab === 'submit'
              ? 'border-[#173F35] text-[#173F35] bg-[#F8F5EC]/50'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Submit Prayer Request</span>
        </button>

        <button
          onClick={() => setActiveTab('my_requests')}
          className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition min-h-[44px] flex items-center justify-center space-x-2 ${
            activeTab === 'my_requests'
              ? 'border-[#173F35] text-[#173F35] bg-[#F8F5EC]/50'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ListFilter className="w-4 h-4" />
          <span>My Prayer Requests</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: SUBMIT PRAYER REQUEST FORM                         */}
      {/* ======================================================== */}
      {activeTab === 'submit' && (
        <>
          {submittedRef ? (
            <div className="glass-panel p-8 rounded-3xl text-center space-y-4 border-2 border-emerald-500 shadow-lg bg-white animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-cinzel text-2xl font-bold text-slate-900">Prayer Request Received in Faith</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your prayer burden has been securely submitted to the pastoral prayer team at Heavens Gate. We are standing with you in fasting and intercession during continuous prayer watches on the mountain.
              </p>
              
              <div className="text-xs font-mono font-bold text-[#173F35] bg-[#F8F5EC] border border-[#173F35]/20 p-3 rounded-xl max-w-xs mx-auto">
                Reference ID: {submittedRef}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => setSubmittedRef(null)}
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 text-xs font-bold shadow-md transition"
                >
                  Submit Another Request
                </button>
                <button
                  onClick={() => setActiveTab('my_requests')}
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold transition"
                >
                  View My Requests
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-[#173F35] shadow-lg space-y-6 bg-white animate-fade-in">
              {/* Privacy Guarantee Banner (BR-11) */}
              <div className="p-4 rounded-2xl bg-[#F8F5EC] border border-[#173F35]/20 flex items-start space-x-3 text-xs text-slate-700">
                <Lock className="w-5 h-5 text-[#244E40] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Strict Pastoral Confidentiality (Rule BR-11):</strong>
                  Your private request is only accessible to authorized intercessors. It will never be indexed publicly, shared with moderators, or shown on public testimony feeds.
                </div>
              </div>

              {formError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center space-x-2 font-medium">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label htmlFor="prName" className="block text-slate-700 mb-1.5 font-bold">
                    Your Name (or Intercession Seeker)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      id="prName"
                      type="text"
                      value={visitorName}
                      onChange={e => setVisitorName(e.target.value)}
                      placeholder="e.g. John Mwangi or Anonymous"
                      className="w-full min-h-[44px] pl-10 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#173F35] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="prPhone" className="block text-slate-700 mb-1.5 font-bold">
                    Phone Number (Required for SMS Pastoral Follow-up) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      id="prPhone"
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="0722 000 000"
                      className="w-full min-h-[44px] pl-10 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#173F35] focus:bg-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label htmlFor="prEmail" className="block text-slate-700 mb-1.5 font-bold">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      id="prEmail"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="pilgrim@example.com"
                      className="w-full min-h-[44px] pl-10 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#173F35] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="prCategory" className="block text-slate-700 mb-1.5 font-bold">
                    Prayer Need Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="prCategory"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full min-h-[44px] bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#173F35] focus:bg-white"
                  >
                    <option value="Healing and Health Restoration">Healing and Health Restoration</option>
                    <option value="Deliverance & Overcoming Addictions">Deliverance & Overcoming Addictions</option>
                    <option value="Family, Marriage & Children Restoration">Family, Marriage & Children Restoration</option>
                    <option value="Financial Breakthrough & Stalled Projects">Financial Breakthrough & Stalled Projects</option>
                    <option value="Salvation & Transformation of Loved Ones">Salvation & Transformation of Loved Ones</option>
                    <option value="Spiritual Impartation & Fasting Breakthrough">Spiritual Impartation & Fasting Breakthrough</option>
                    <option value="General Intercession">General Intercession</option>
                  </select>
                </div>
              </div>

              <div className="text-xs">
                <label htmlFor="prContent" className="block text-slate-700 mb-1.5 font-bold">
                  Write Your Prayer Request <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="prContent"
                  rows={5}
                  value={requestText}
                  onChange={e => setRequestText(e.target.value)}
                  placeholder="Describe your situation in faith. What burden are you laying at the altar of Heavens Gate?..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-[#173F35] focus:bg-white resize-none leading-relaxed"
                  required
                ></textarea>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium min-h-[44px]">
                <input
                  type="checkbox"
                  id="confidentialCheck"
                  checked={isConfidential}
                  onChange={e => setIsConfidential(e.target.checked)}
                  className="rounded text-[#173F35] focus:ring-[#173F35] w-5 h-5 cursor-pointer"
                />
                <label htmlFor="confidentialCheck" className="cursor-pointer select-none">
                  Keep this request strictly confidential to senior pastoral prayer intercessors only
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[44px] py-3.5 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/20 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Laying Request at Altar...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#E5C158]" />
                    <span>Submit Prayer Request to the Mountain Altar</span>
                  </>
                )}
              </button>
            </form>
          )}
        </>
      )}

      {/* ======================================================== */}
      {/* TAB 2: MY PRAYER REQUESTS SECTION                         */}
      {/* ======================================================== */}
      {activeTab === 'my_requests' && (
        <div className="space-y-6 animate-fade-in">
          {/* Status Note on Backend Endpoint */}
          {backendEndpointStatus === 'missing_endpoint' && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
              <div className="font-bold flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Backend Architecture Note: Endpoint Dependency</span>
              </div>
              <p className="leading-relaxed">
                The centralized endpoint <code>GET /messages/my-messages</code> is awaiting backend implementation by the ministry team lead. Your submitted requests are safely recorded by the server altar and tracked in your local session.
              </p>
            </div>
          )}

          {/* User Session Banner */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
            <div>
              <span className="text-slate-500">Tracking prayer requests for:</span>
              <div className="font-bold text-slate-900 text-sm">
                {user?.name || visitorName || 'Pilgrim Visitor'} {phone ? `(${phone})` : ''}
              </div>
            </div>
            <button
              onClick={loadMyPrayerRequests}
              className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#F8F5EC] hover:bg-[#eae4d5] text-[#173F35] font-bold border border-[#173F35]/20 flex items-center space-x-1.5 self-start sm:self-auto transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingRequests ? 'animate-spin' : ''}`} />
              <span>Refresh Status</span>
            </button>
          </div>

          {/* Loading Indicator */}
          {loadingRequests && (
            <div className="py-12 text-center space-y-3" aria-busy="true">
              <div className="w-8 h-8 rounded-full border-4 border-[#173F35] border-t-transparent animate-spin mx-auto"></div>
              <p className="text-xs text-slate-600">Retrieving prayer requests from the altar registry...</p>
            </div>
          )}

          {/* Error State */}
          {!loadingRequests && requestsError && (
            <div className="glass-panel p-6 rounded-2xl border-2 border-red-200 bg-red-50/50 text-center space-y-3">
              <AlertCircle className="w-6 h-6 text-red-600 mx-auto" />
              <h2 className="font-cinzel text-base font-bold text-slate-900">Failed to Retrieve Requests</h2>
              <p className="text-xs text-slate-600">{requestsError}</p>
              <button
                onClick={loadMyPrayerRequests}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#173F35] text-[#F8F5EC] text-xs font-bold inline-flex items-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loadingRequests && !requestsError && myRequests.length === 0 && (
            <div className="glass-panel p-10 rounded-2xl border border-slate-200 text-center space-y-4 bg-white shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#F8F5EC] text-[#173F35] flex items-center justify-center mx-auto border border-[#173F35]/20">
                <FileText className="w-6 h-6 text-[#244E40]" />
              </div>
              <h2 className="font-cinzel text-xl font-bold text-slate-900">No Prayer Requests Found</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                You have not submitted any prayer requests yet. Bring your burdens to the Lord and our continuous prayer watch teams will stand in agreement with you.
              </p>
              <button
                onClick={() => setActiveTab('submit')}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold text-xs uppercase tracking-wider inline-flex items-center space-x-2 shadow-sm"
              >
                <Send className="w-4 h-4 text-[#E5C158]" />
                <span>Submit Your First Request</span>
              </button>
            </div>
          )}

          {/* List of Previous Requests */}
          {!loadingRequests && !requestsError && myRequests.length > 0 && (
            <div className="space-y-4">
              {myRequests.map((req) => (
                <div 
                  key={req.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-3 border-l-4 border-l-[#173F35] shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold bg-[#F8F5EC] text-[#173F35] border border-[#173F35]/20 px-2.5 py-0.5 rounded">
                        REF: {req.id.substring(0, 16)}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {req.category}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center space-x-2 self-start sm:self-auto">
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        req.status === 'answered'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : req.status === 'in_prayer'
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {req.status === 'in_prayer' ? 'Under Continuous Prayer' : req.status === 'answered' ? 'Answered Praise' : 'Received at Altar'}
                      </span>
                      {req.isConfidential && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded flex items-center space-x-1" title="Strictly confidential to senior intercessors">
                          <Lock className="w-3 h-3" />
                          <span>Confidential</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                    "{req.requestText}"
                  </p>

                  {/* Intercessor Response Note if available */}
                  {req.responseNote && (
                    <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                      <div className="font-bold flex items-center space-x-1 text-[11px] text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Pastoral Intercession Note ({req.assignedIntercessor || 'Prayer Team'}):</span>
                      </div>
                      <p className="leading-relaxed">{req.responseNote}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Submitted: {req.createdAt ? new Date(req.createdAt).toLocaleString() : 'Recent'}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-slate-600 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#173F35]" />
                      <span>Pastoral Altar Agreement</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PrayerRequestPage;
