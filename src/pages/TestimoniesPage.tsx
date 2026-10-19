import React, { useState, useEffect } from 'react';
import { 
  MessageSquareQuote, Heart, MessageCircle, Plus, Send, 
  CheckCircle2, User, MapPin, X, AlertCircle, RefreshCw,
  ExternalLink, Calendar, Sparkles
} from 'lucide-react';
import { api } from '../services/api.js';
import { Testimony } from '../types/index.js';
import { useAuth } from '../context/AuthContext.js';

export const TestimoniesPage: React.FC = () => {
  const { user } = useAuth();
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);

  // Loading and Error States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likingIds, setLikingIds] = useState<Record<string, boolean>>({});
  const [submittingReply, setSubmittingReply] = useState(false);

  // New Testimony Form State
  const [authorName, setAuthorName] = useState(user?.name || '');
  const [countyOrCity, setCountyOrCity] = useState('Nairobi County');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('healing');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Update authorName if user logs in
  useEffect(() => {
    if (user?.name && !authorName) {
      setAuthorName(user.name);
    }
  }, [user?.name, authorName]);

  const fetchTestimonies = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getTestimonies();
      if (res?.testimonies) {
        setTestimonies(res.testimonies);
      } else if (res?.error) {
        setError(res.error);
      } else {
        setTestimonies([]);
      }
    } catch (err: any) {
      setError(err?.message || 'Unable to connect to the testimonies registry. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const handleLike = async (id: string) => {
    if (likingIds[id]) return; // Prevent duplicate rapid clicks
    setLikingIds(prev => ({ ...prev, [id]: true }));
    try {
      const res = await api.likeTestimony(id);
      if (res?.success && typeof res.likesCount === 'number') {
        // Update local state with real server count
        setTestimonies(prev => prev.map(t => 
          t.id === id ? { ...t, likesCount: res.likesCount } : t
        ));
        if (selectedTestimony && selectedTestimony.id === id) {
          setSelectedTestimony(prev => prev ? { ...prev, likesCount: res.likesCount } : null);
        }
      }
    } catch (err) {
      console.error('Failed to register praise like:', err);
    } finally {
      setLikingIds(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleSendReply = async (id: string) => {
    const trimmed = replyText.trim();
    if (!trimmed) return;

    setSubmittingReply(true);
    try {
      const commenter = user?.name || authorName || 'Fellow Pilgrim';
      const res = await api.replyTestimony(id, commenter, trimmed);
      if (res?.success && res.reply) {
        const newReply = res.reply;
        setTestimonies(prev => prev.map(t => {
          if (t.id === id) {
            return {
              ...t,
              replies: [...(t.replies || []), newReply]
            };
          }
          return t;
        }));

        if (selectedTestimony && selectedTestimony.id === id) {
          setSelectedTestimony(prev => prev ? {
            ...prev,
            replies: [...(prev.replies || []), newReply]
          } : null);
        }
        setReplyText('');
      }
    } catch (err) {
      console.error('Failed to post reply:', err);
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleSubmitTestimony = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim() || !content.trim()) {
      setFormError('Please provide both a testimony title and your personal story of praise.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitTestimony({
        authorName: authorName.trim() || 'Anonymous Pilgrim',
        countyOrCity: countyOrCity.trim() || 'Kenya',
        title: title.trim(),
        content: content.trim(),
        category
      });

      if (res?.success) {
        setSuccessMsg(res.message || 'Your testimony has been published to the glory of God!');
        setIsSubmitModalOpen(false);
        setTitle('');
        setContent('');
        // Add new testimony to list or refresh
        if (res.testimony) {
          setTestimonies(prev => [res.testimony, ...prev]);
        } else {
          fetchTestimonies();
        }
        setTimeout(() => setSuccessMsg(null), 5000);
      } else {
        setFormError(res?.error || 'Failed to submit testimony. Please try again.');
      }
    } catch (e: any) {
      setFormError(e?.message || 'Network error while publishing your testimony.');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All Testimonies' },
    { id: 'healing', label: 'Divine Healing' },
    { id: 'deliverance', label: 'Deliverance & Freedom' },
    { id: 'financial_breakthrough', label: 'Financial Breakthrough' },
    { id: 'family_restoration', label: 'Family Restoration' },
    { id: 'spiritual_growth', label: 'Spiritual Growth' }
  ];

  const filtered = testimonies.filter(t => categoryFilter === 'all' || t.category === categoryFilter);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#173F35] font-bold uppercase tracking-wider bg-[#F8F5EC] border border-[#173F35]/20 px-3 py-1 rounded-full w-fit mb-2">
            <MessageSquareQuote className="w-4 h-4 text-[#244E40]" />
            <span>Overcoming by the Blood of the Lamb</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-slate-900">
            Praise Reports & Testimonies of Faith
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Real testimonies of God's power, healing, and supernatural breakthrough experienced at Heavens Gate Prayer Mountain, Gilgil.
          </p>
        </div>

        <button
          onClick={() => {
            setFormError(null);
            setIsSubmitModalOpen(true);
          }}
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-black/10 transition self-start sm:self-auto focus:outline-none focus:ring-2 focus:ring-[#173F35] focus:ring-offset-2"
        >
          <Plus className="w-4 h-4 text-[#E5C158]" />
          <span>Share Your Testimony</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center space-x-2 font-medium shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar" role="tablist" aria-label="Testimony Categories">
        {categories.map(c => (
          <button
            key={c.id}
            role="tab"
            aria-selected={categoryFilter === c.id}
            onClick={() => setCategoryFilter(c.id)}
            className={`min-h-[36px] px-3.5 py-1.5 rounded-full whitespace-nowrap transition font-bold text-xs focus:outline-none focus:ring-2 focus:ring-[#173F35] ${
              categoryFilter === c.id
                ? 'bg-[#173F35] text-[#F8F5EC] border border-[#D4AF37]/50 shadow-sm'
                : 'bg-white text-slate-700 hover:text-[#173F35] border border-slate-300 hover:bg-slate-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4" aria-busy="true" aria-label="Loading testimonies">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-2/3">
                  <div className="h-4 bg-slate-200 rounded w-24"></div>
                  <div className="h-6 bg-slate-200 rounded w-4/5"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 rounded w-full"></div>
                <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between">
                <div className="h-4 bg-slate-200 rounded w-24"></div>
                <div className="h-4 bg-slate-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State with Retry */}
      {!loading && error && (
        <div className="glass-panel p-8 rounded-2xl border-2 border-red-200 bg-red-50/50 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
          <h2 className="font-cinzel text-lg font-bold text-slate-900">Unable to Load Testimonies</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">{error}</p>
          <button
            onClick={fetchTestimonies}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] text-xs font-bold inline-flex items-center space-x-2 shadow-sm transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Loading</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <div className="glass-panel p-10 rounded-2xl border border-slate-200 text-center space-y-4 bg-white shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#F8F5EC] text-[#173F35] flex items-center justify-center mx-auto border border-[#173F35]/20">
            <Sparkles className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <h2 className="font-cinzel text-xl font-bold text-slate-900">No Testimonies In This Category Yet</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Has God done a miraculous work in your life during your retreat, fasting shift, or prayer watch? Share your testimony to encourage the body of Christ.
          </p>
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold text-xs uppercase tracking-wider inline-flex items-center space-x-2 shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#E5C158]" />
            <span>Be the First to Share</span>
          </button>
        </div>
      )}

      {/* Testimonies Feed */}
      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-6">
          {filtered.map(t => (
            <article 
              key={t.id} 
              className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4 border-t-4 border-t-[#173F35] shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#173F35] bg-[#F8F5EC] border border-[#173F35]/20 px-2.5 py-0.5 rounded inline-block">
                    {t.category.replace('_', ' ')}
                  </span>
                  <h2 
                    onClick={() => setSelectedTestimony(t)}
                    className="font-cinzel text-lg font-bold text-slate-900 mt-2 hover:text-[#173F35] cursor-pointer transition flex items-center space-x-2"
                  >
                    <span>{t.title}</span>
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mt-1">
                    <span className="flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <strong className="text-slate-800 font-semibold">{t.authorName}</strong>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.countyOrCity}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTestimony(t)}
                  className="text-xs text-[#173F35] hover:underline font-bold flex items-center space-x-1 shrink-0 p-1"
                  title="Open full testimony details"
                >
                  <span>Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line line-clamp-4">
                "{t.content}"
              </p>

              {/* Like and Reply Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(t.id)}
                    disabled={likingIds[t.id]}
                    aria-label={`Like testimony: ${t.likesCount} praises`}
                    className={`min-h-[44px] flex items-center space-x-1.5 transition font-medium focus:outline-none focus:ring-1 focus:ring-red-400 rounded-lg px-2 ${
                      likingIds[t.id] ? 'opacity-60 cursor-not-allowed' : 'hover:text-red-600'
                    } ${t.likesCount > 0 ? 'text-red-600' : 'text-slate-500'}`}
                  >
                    <Heart className={`w-4 h-4 ${t.likesCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                    <span className="font-bold">{t.likesCount} Praise God</span>
                  </button>

                  <button
                    onClick={() => setActiveReplyId(activeReplyId === t.id ? null : t.id)}
                    className="min-h-[44px] flex items-center space-x-1.5 text-slate-500 hover:text-[#173F35] transition font-medium focus:outline-none focus:ring-1 focus:ring-[#173F35] rounded-lg px-2"
                    aria-expanded={activeReplyId === t.id}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.replies?.length || 0} Comments</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedTestimony(t)}
                  className="text-[11px] text-slate-500 hover:text-[#173F35] font-semibold"
                >
                  Read Full Story →
                </button>
              </div>

              {/* Inline Replies Thread */}
              {activeReplyId === t.id && (
                <div className="pt-3 border-t border-slate-200 space-y-3 animate-fade-in">
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {t.replies && t.replies.length > 0 ? (
                      t.replies.map(rep => (
                        <div key={rep.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-bold text-[#173F35]">{rep.authorName}</span>
                            <span className="text-slate-400">{rep.timestamp}</span>
                          </div>
                          <p className="text-slate-700">{rep.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic py-1">No comments yet. Write a message of encouragement below.</p>
                    )}
                  </div>

                  {/* Reply Input Form */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendReply(t.id);
                    }}
                    className="flex items-center space-x-2 pt-1"
                  >
                    <input
                      type="text"
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      placeholder="Write a message of encouragement / praise..."
                      className="flex-1 min-h-[44px] bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#173F35] focus:bg-white"
                      disabled={submittingReply}
                    />
                    <button
                      type="submit"
                      disabled={submittingReply || !replyText.trim()}
                      className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/30 transition shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send comment"
                    >
                      <Send className="w-4 h-4 text-[#E5C158]" />
                    </button>
                  </form>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Individual Testimony Details Modal */}
      {selectedTestimony && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white border-2 border-[#173F35] rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl relative space-y-5 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setSelectedTestimony(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#173F35] bg-[#F8F5EC] border border-[#173F35]/20 px-3 py-0.5 rounded">
                {selectedTestimony.category.replace('_', ' ')}
              </span>
              <h2 className="font-cinzel text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {selectedTestimony.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500 mt-2">
                <span className="flex items-center space-x-1 font-bold text-slate-800">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedTestimony.authorName}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedTestimony.countyOrCity}</span>
                </span>
                <span>•</span>
                <span>{new Date(selectedTestimony.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F5EC] border border-[#173F35]/15 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-serif italic">
              "{selectedTestimony.content}"
            </div>

            {/* Praise like action */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <button
                onClick={() => handleLike(selectedTestimony.id)}
                disabled={likingIds[selectedTestimony.id]}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center space-x-2 border border-red-200 transition"
              >
                <Heart className={`w-4 h-4 ${selectedTestimony.likesCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{selectedTestimony.likesCount} Praise God</span>
              </button>
              <span className="text-xs text-slate-500">
                {selectedTestimony.replies?.length || 0} Fellow Pilgrim Comments
              </span>
            </div>

            {/* Detailed Discussion List */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Comments & Encouragements</h3>
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {selectedTestimony.replies && selectedTestimony.replies.length > 0 ? (
                  selectedTestimony.replies.map(rep => (
                    <div key={rep.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="font-bold text-[#173F35]">{rep.authorName}</span>
                        <span className="text-slate-400">{rep.timestamp}</span>
                      </div>
                      <p className="text-slate-700 leading-normal">{rep.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No comments yet on this testimony.</p>
                )}
              </div>

              {/* Add comment in modal */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendReply(selectedTestimony.id);
                }}
                className="flex items-center space-x-2 pt-2"
              >
                <input
                  type="text"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Share a word of encouragement..."
                  className="flex-1 min-h-[44px] bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#173F35] focus:bg-white"
                  disabled={submittingReply}
                />
                <button
                  type="submit"
                  disabled={submittingReply || !replyText.trim()}
                  className="min-h-[44px] px-4 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/30 text-xs font-bold transition flex items-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Submit Testimony Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border-2 border-[#173F35] rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl relative space-y-4 sm:space-y-5 animate-fade-in max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
              aria-label="Close testimony form"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-[#173F35]">
              <MessageSquareQuote className="w-5 h-5 text-[#244E40]" />
              <h2 className="font-cinzel text-base sm:text-lg font-bold text-slate-900">Share Your Testimony</h2>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center space-x-2 font-medium">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitTestimony} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="testimonyAuthor" className="block text-slate-700 font-bold mb-1">
                    Your Name (or Anonymous Pilgrim) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="testimonyAuthor"
                    type="text"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    className="w-full min-h-[44px] bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm sm:text-xs text-slate-900 focus:outline-none focus:border-[#173F35]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="testimonyCounty" className="block text-slate-700 font-bold mb-1">
                    Home County / Town <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="testimonyCounty"
                    type="text"
                    value={countyOrCity}
                    onChange={e => setCountyOrCity(e.target.value)}
                    placeholder="e.g. Nakuru / Nairobi / Mombasa"
                    className="w-full min-h-[44px] bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm sm:text-xs text-slate-900 focus:outline-none focus:border-[#173F35]"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="testimonyCategory" className="block text-slate-700 font-bold mb-1">
                  Testimony Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="testimonyCategory"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full min-h-[44px] bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#173F35]"
                >
                  <option value="healing">Divine Healing</option>
                  <option value="deliverance">Deliverance & Freedom</option>
                  <option value="financial_breakthrough">Financial Breakthrough</option>
                  <option value="family_restoration">Family Restoration</option>
                  <option value="spiritual_growth">Spiritual Growth</option>
                </select>
              </div>

              <div>
                <label htmlFor="testimonyTitle" className="block text-slate-700 font-bold mb-1">
                  Testimony Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="testimonyTitle"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Delivered from 5 years of infirmity at Mount Carmel"
                  className="w-full min-h-[44px] bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#173F35]"
                  required
                />
              </div>

              <div>
                <label htmlFor="testimonyContent" className="block text-slate-700 font-bold mb-1">
                  What did God do for you at Heavens Gate? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="testimonyContent"
                  rows={5}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Share details of your fasting, prayer watch experience, and how the Lord answered your prayer..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-[#173F35] resize-none leading-relaxed"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[44px] py-3 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold text-xs uppercase tracking-wider transition shadow-md shadow-black/20 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Publishing to Altar Feed...</span>
                  </>
                ) : (
                  <span>Publish Testimony to the Glory of God</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimoniesPage;
