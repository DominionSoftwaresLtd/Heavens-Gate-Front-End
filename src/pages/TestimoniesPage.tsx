import React, { useState, useEffect } from 'react';
import { 
  MessageSquareQuote, Heart, MessageCircle, Plus, Send, 
  Sparkles, CheckCircle2, User, MapPin, X
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

  // New Testimony Form State
  const [authorName, setAuthorName] = useState(user?.name || '');
  const [countyOrCity, setCountyOrCity] = useState('Nairobi County');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('healing');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchTestimonies = async () => {
    try {
      const res = await api.getTestimonies();
      if (res?.testimonies) {
        setTestimonies(res.testimonies);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const handleLike = async (id: string) => {
    await api.likeTestimony(id);
    fetchTestimonies();
  };

  const handleSendReply = async (id: string) => {
    if (!replyText.trim()) return;
    await api.replyTestimony(id, user?.name || 'Fellow Pilgrim', replyText.trim());
    setReplyText('');
    setActiveReplyId(null);
    fetchTestimonies();
  };

  const handleSubmitTestimony = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setSubmitting(true);
    try {
      const res = await api.submitTestimony({
        authorName,
        countyOrCity,
        title,
        content,
        category
      });
      if (res.success) {
        setSuccessMsg(res.message);
        setIsSubmitModalOpen(false);
        setTitle('');
        setContent('');
        fetchTestimonies();
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (e: any) {
      alert(e.message);
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-orange-600 font-bold uppercase tracking-wider">
            <MessageSquareQuote className="w-4 h-4" />
            <span>Overcoming by the Blood of the Lamb</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-slate-900">
            Praise Reports & Testimonies of Faith
          </h1>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-orange-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Share Your Testimony</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setCategoryFilter(c.id)}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition font-bold ${
              categoryFilter === c.id
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Testimonies Feed */}
      <div className="space-y-6">
        {filtered.map(t => (
          <div key={t.id} className="glass-panel p-6 rounded-2xl border-slate-200 space-y-4 border-t-4 border-t-orange-500 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded">
                  {t.category.replace('_', ' ')}
                </span>
                <h3 className="font-cinzel text-lg font-bold text-slate-900 mt-2">
                  {t.title}
                </h3>
                <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-800 font-bold">{t.authorName}</span>
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.countyOrCity}</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              "{t.content}"
            </p>

            {/* Like and Reply Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLike(t.id)}
                  className="flex items-center space-x-1.5 text-slate-500 hover:text-red-600 transition font-medium"
                >
                  <Heart className={`w-4 h-4 ${t.likesCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                  <span>{t.likesCount} Praise God</span>
                </button>

                <button
                  onClick={() => setActiveReplyId(activeReplyId === t.id ? null : t.id)}
                  className="flex items-center space-x-1.5 text-slate-500 hover:text-orange-600 transition font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.replies?.length || 0} Comments</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-400">
                {new Date(t.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Replies Thread */}
            {activeReplyId === t.id && (
              <div className="pt-3 border-t border-slate-200 space-y-3">
                {t.replies?.map(rep => (
                  <div key={rep.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-bold text-orange-600">{rep.authorName}</span>
                      <span className="text-slate-400">{rep.timestamp}</span>
                    </div>
                    <p className="text-slate-700">{rep.comment}</p>
                  </div>
                ))}

                {/* Reply Input */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Write a message of encouragement..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    onClick={() => handleSendReply(t.id)}
                    className="p-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white transition shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Testimony Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-orange-500 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5 animate-fade-in">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-orange-600">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-cinzel text-lg font-bold text-slate-900">Share Your Testimony</h3>
            </div>

            <form onSubmit={handleSubmitTestimony} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Your Name (or Anonymous)</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Home County / Town</label>
                  <input
                    type="text"
                    value={countyOrCity}
                    onChange={e => setCountyOrCity(e.target.value)}
                    placeholder="e.g. Nakuru / Nairobi"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Testimony Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500"
                >
                  <option value="healing">Divine Healing</option>
                  <option value="deliverance">Deliverance & Freedom</option>
                  <option value="financial_breakthrough">Financial Breakthrough</option>
                  <option value="family_restoration">Family Restoration</option>
                  <option value="spiritual_growth">Spiritual Growth</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Testimony Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Delivered from 5 years of infirmity at Mount Carmel"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">What did God do for you at Heavens Gate?</label>
                <textarea
                  rows={5}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Share details of your fasting, prayer watch experience, and how the Lord answered your prayer..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500 resize-none leading-relaxed"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-orange-500/20"
              >
                {submitting ? 'Publishing...' : 'Publish Testimony to the Glory of God'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
