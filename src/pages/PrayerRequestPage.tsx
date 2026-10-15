import React, { useState } from 'react';
import { HeartHandshake, Lock, Send, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.js';

export const PrayerRequestPage: React.FC = () => {
  const { user } = useAuth();
  const [visitorName, setVisitorName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [category, setCategory] = useState('Healing and Health Restoration');
  const [requestText, setRequestText] = useState('');
  const [isConfidential, setIsConfidential] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim() || !phone.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.submitPrayerRequest({
        visitorName,
        phone,
        category,
        requestText,
        isConfidential
      });

      if (res.success) {
        setSubmittedRef(res.requestId);
        setRequestText('');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs text-[#173F35] font-bold uppercase tracking-wider bg-[#F8F5EC] border border-[#173F35]/20 px-3 py-1 rounded-full">
          <HeartHandshake className="w-4 h-4 text-[#244E40]" />
          <span>Intercessory Prayer Altar</span>
        </div>
        <h1 className="font-cinzel text-3xl font-black text-slate-900">
          Submit Confidential Prayer Request
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          "For where two or three are gathered together in My name, I am there in the midst of them." — Matthew 18:20
        </p>
      </div>

      {submittedRef ? (
        <div className="glass-panel p-8 rounded-3xl text-center space-y-4 border-2 border-emerald-500 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-cinzel text-2xl font-bold text-slate-900">Prayer Request Received in Faith</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Your prayer burden has been encrypted and assigned to the pastoral prayer team at Heavens Gate. We are standing with you in fasting and intercession during the continuous prayer watches.
          </p>
          <div className="text-xs font-mono font-bold text-[#173F35] bg-[#F8F5EC] border border-[#173F35]/20 p-3 rounded-xl max-w-xs mx-auto">
            Submission Reference: {submittedRef}
          </div>
          <button
            onClick={() => setSubmittedRef(null)}
            className="mt-4 px-6 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 text-xs font-bold shadow-md"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-[#173F35] shadow-lg space-y-6">
          {/* Privacy Guarantee Banner */}
          <div className="p-4 rounded-2xl bg-[#F8F5EC] border border-[#173F35]/20 flex items-start space-x-3 text-xs text-slate-700">
            <Lock className="w-5 h-5 text-[#244E40] shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block font-bold">Strict Pastoral Confidentiality (Rule BR-11):</strong>
              Your private request is only accessible to authorized intercessors. It will never be indexed publicly, shared with moderators, or shown to general visitors.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 mb-1.5 font-bold">Your Name (or Intercession Seeker)</label>
              <input
                type="text"
                value={visitorName}
                onChange={e => setVisitorName(e.target.value)}
                placeholder="e.g. John"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#173F35]"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1.5 font-bold">Phone Number (For Prayer Response SMS)</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="0722 000 000"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#173F35]"
                required
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-700 mb-1.5 font-bold">Prayer Need Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#173F35]"
            >
              <option value="Healing and Health Restoration">Healing and Health Restoration</option>
              <option value="Deliverance & Overcoming Addictions">Deliverance & Overcoming Addictions</option>
              <option value="Family, Marriage & Children Restoration">Family, Marriage & Children Restoration</option>
              <option value="Financial Breakthrough & Stalled Projects">Financial Breakthrough & Stalled Projects</option>
              <option value="Salvation & Transformation of Loved Ones">Salvation & Transformation of Loved Ones</option>
              <option value="Spiritual Impartation & Fasting Breakthrough">Spiritual Impartation & Fasting Breakthrough</option>
            </select>
          </div>

          <div className="text-xs">
            <label className="block text-slate-700 mb-1.5 font-bold">Write Your Prayer Request</label>
            <textarea
              rows={5}
              value={requestText}
              onChange={e => setRequestText(e.target.value)}
              placeholder="Describe your situation in faith. What burden are you laying at the altar of Heavens Gate?..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-[#173F35] resize-none leading-relaxed"
              required
            ></textarea>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
            <input
              type="checkbox"
              id="confidentialCheck"
              checked={isConfidential}
              onChange={e => setIsConfidential(e.target.checked)}
              className="rounded text-[#173F35] focus:ring-[#173F35] w-4 h-4"
            />
            <label htmlFor="confidentialCheck" className="cursor-pointer">
              Keep this request strictly private to senior intercessors only
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/20 transition flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4 text-[#E5C158]" />
            <span>{submitting ? 'Submitting in Prayer...' : 'Submit Prayer Request to the Mountain Altar'}</span>
          </button>
        </form>
      )}
    </div>
  );
};
