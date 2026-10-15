import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Bed, CreditCard, ShieldCheck, 
  Download, Clock, RefreshCw, Search, Plus, CheckCircle2, 
  XCircle, Filter, MessageSquare, AlertTriangle, UserCheck, 
  Send, Trash2, Megaphone, Check, Calendar, ChevronRight
} from 'lucide-react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.js';

interface AdminDashboardPageProps {
  onNavigate?: (tab: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  // Active Admin Sub-Tab
  const [adminTab, setAdminTab] = useState<'overview' | 'bookings' | 'rooms' | 'gate' | 'prayers' | 'staff' | 'broadcast'>('overview');

  // Overview Data
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Bookings Tab Data
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingFilterStatus, setBookingFilterStatus] = useState('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Walk-in Modal State
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [walkInCat, setWalkInCat] = useState('cat-single');
  const [walkInNights, setWalkInNights] = useState(1);
  const [walkInGender, setWalkInGender] = useState<'male' | 'female' | 'any'>('any');

  // Prayer Requests Data
  const [prayerRequests, setPrayerRequests] = useState<any[]>([]);

  // Staff Users Data
  const [usersList, setUsersList] = useState<any[]>([]);

  // Announcements Data
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnMessage, setNewAnnMessage] = useState('');
  const [newAnnType, setNewAnnType] = useState<'info' | 'warning' | 'alert'>('info');

  // Gate Events Data
  const [gateEvents, setGateEvents] = useState<any[]>([]);

  // Feedback Notification
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes, prayersRes, usersRes, annRes, gateRes] = await Promise.all([
        api.getAdminStats(),
        api.getAdminBookings(),
        api.getAdminPrayerRequests(),
        api.getAdminUsers(),
        api.getAnnouncements(),
        api.getGateEvents()
      ]);

      if (statsRes) setStats(statsRes);
      if (bookingsRes?.bookings) setBookings(bookingsRes.bookings);
      if (prayersRes?.requests) setPrayerRequests(prayersRes.requests);
      if (usersRes?.users) setUsersList(usersRes.users);
      if (annRes?.announcements) setAnnouncements(annRes.announcements);
      if (gateRes?.events) setGateEvents(gateRes.events);
    } catch (err) {
      console.error('Error loading admin data:', err);
      showNotification('Could not load some management metrics', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesStatus = bookingFilterStatus === 'all' || b.status === bookingFilterStatus;
    const term = bookingSearch.toLowerCase().trim();
    const matchesSearch = !term || 
      b.visitorName.toLowerCase().includes(term) ||
      b.bookingReference.toLowerCase().includes(term) ||
      b.visitorPhone.includes(term) ||
      (b.assignedRoomNumber && b.assignedRoomNumber.toLowerCase().includes(term));
    return matchesStatus && matchesSearch;
  });

  // Action: Update Booking Status
  const handleBookingStatus = async (bookingId: string, status: string) => {
    setActionLoading(bookingId);
    try {
      const res = await api.updateBookingStatus(bookingId, status, undefined, user?.name || 'Pastor Peter Mwangi');
      if (res?.booking) {
        showNotification(res.message || `Booking status updated to ${status}`);
        // Reload stats and bookings
        const [statsRes, bookingsRes] = await Promise.all([api.getAdminStats(), api.getAdminBookings()]);
        if (statsRes) setStats(statsRes);
        if (bookingsRes?.bookings) setBookings(bookingsRes.bookings);
      }
    } catch (err: any) {
      showNotification(err.message || 'Failed to update status', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Action: Walk-in Booking
  const handleWalkInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.createWalkInBooking({
        visitorName: walkInName,
        visitorPhone: walkInPhone,
        categoryId: walkInCat,
        nights: walkInNights,
        gender: walkInGender
      });

      if (res?.booking) {
        showNotification(res.message || 'Walk-in pilgrim checked in successfully!');
        setShowWalkInModal(false);
        setWalkInName('');
        setWalkInPhone('');
        loadAllData();
      } else {
        showNotification(res?.error || 'Could not allocate bed', 'error');
      }
    } catch (err: any) {
      showNotification(err.message || 'Walk-in booking failed', 'error');
    }
  };

  // Action: Update Prayer Status
  const handlePrayerStatus = async (id: string, status: string, note?: string) => {
    try {
      const res = await api.updatePrayerRequestStatus(id, status, user?.name || 'Pastor Peter Mwangi', note);
      if (res?.prayerRequest) {
        showNotification('Prayer request marked as interceded');
        const prayersRes = await api.getAdminPrayerRequests();
        if (prayersRes?.requests) setPrayerRequests(prayersRes.requests);
      }
    } catch (err: any) {
      showNotification(err.message || 'Update failed', 'error');
    }
  };

  // Action: Update Staff Role
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await api.updateUserRole(userId, newRole);
      if (res?.user) {
        showNotification(res.message || 'Staff role updated');
        const usersRes = await api.getAdminUsers();
        if (usersRes?.users) setUsersList(usersRes.users);
      }
    } catch (err: any) {
      showNotification(err.message || 'Role change failed', 'error');
    }
  };

  // Action: Broadcast Announcement
  const handleBroadcastAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnMessage) return;

    try {
      const res = await api.broadcastAnnouncement({
        title: newAnnTitle,
        message: newAnnMessage,
        type: newAnnType,
        author: user?.name || 'Pastor Peter Mwangi'
      });

      if (res?.announcement) {
        showNotification('Mountain notice broadcasted to campus network');
        setNewAnnTitle('');
        setNewAnnMessage('');
        const annRes = await api.getAnnouncements();
        if (annRes?.announcements) setAnnouncements(annRes.announcements);
      }
    } catch (err: any) {
      showNotification(err.message || 'Announcement broadcast failed', 'error');
    }
  };

  // Action: Delete Announcement
  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await api.deleteAnnouncement(id);
      showNotification('Announcement removed');
      const annRes = await api.getAnnouncements();
      if (annRes?.announcements) setAnnouncements(annRes.announcements);
    } catch (err: any) {
      showNotification(err.message || 'Failed to delete announcement', 'error');
    }
  };

  // Export Comprehensive CSV
  const handleExportCSV = () => {
    if (!stats) return;
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + `Checked-in Visitors,${stats.metrics.checkedInVisitors}\n`
      + `Expected Arrivals,${stats.metrics.expectedArrivals}\n`
      + `Completed Departures,${stats.metrics.checkedOutVisitors}\n`
      + `Total Bookings,${stats.metrics.totalBookings}\n`
      + `M-Pesa Revenue (KES),${stats.metrics.totalRevenueKES}\n`
      + `Occupancy Percentage,${stats.metrics.occupancyPercentage}%\n`
      + `Total Bed Capacity,${stats.metrics.totalBeds}\n`
      + `Available Beds,${stats.metrics.availableBeds}\n`
      + `First-time Pilgrims,${stats.metrics.firstTimePilgrims}\n`
      + `Returning Pilgrims,${stats.metrics.returningPilgrims}\n`
      + `Prayer Requests,${stats.metrics.prayerRequestsCount}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `heavens_gate_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-4 border-[#173F35] border-t-transparent animate-spin mx-auto"></div>
        <p className="text-xs text-slate-600 font-medium">Loading executive management data and live campus registry...</p>
      </div>
    );
  }

  const m = stats?.metrics;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Toast Feedback Notification */}
      {feedback && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl flex items-center space-x-3 text-xs font-bold animate-slide-up ${
          feedback.type === 'success' 
            ? 'bg-[#173F35] text-[#F8F5EC] border border-[#D4AF37]/50' 
            : 'bg-red-900 text-white border border-red-500'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-[#E5C158]" /> : <AlertTriangle className="w-4 h-4 text-red-300" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. TOP EXECUTIVE HEADER                                  */}
      {/* ======================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#173F35] font-bold uppercase tracking-wider bg-[#F8F5EC] border border-[#D4AF37]/40 px-3.5 py-1 rounded-full shadow-xs mb-2 w-fit">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Executive Portal • Logged in as: {user?.name || 'Administrator'} ({user?.role?.replace('_', ' ') || 'system admin'})</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-slate-900">
            Heavens Gate Management Dashboard
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Real-time management control center across Gate Admissions, Room Allocations, M-Pesa Audits, and Altar Prayers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowWalkInModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#E5C158] hover:bg-[#d8b446] text-[#173F35] font-black text-xs uppercase tracking-wider transition flex items-center space-x-1.5 shadow-sm border border-[#173F35]"
          >
            <Plus className="w-4 h-4" />
            <span>Walk-in Check-in</span>
          </button>

          <button
            onClick={loadAllData}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#173F35] border border-slate-300 shadow-sm transition"
            title="Refresh Live Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] font-bold text-xs uppercase tracking-wider transition flex items-center space-x-2 shadow-sm border border-[#D4AF37]/40"
          >
            <Download className="w-4 h-4 text-[#E5C158]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. ADMIN FUNCTIONALITY NAVIGATION TABS                    */}
      {/* ======================================================== */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-slate-200 text-xs font-bold">
        <button
          onClick={() => setAdminTab('overview')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 whitespace-nowrap shrink-0 ${
            adminTab === 'overview'
              ? 'bg-[#173F35] text-[#F8F5EC] shadow-sm border border-[#D4AF37]/40'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Overview & Metrics</span>
        </button>

        <button
          onClick={() => setAdminTab('bookings')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 whitespace-nowrap shrink-0 ${
            adminTab === 'bookings'
              ? 'bg-[#173F35] text-[#F8F5EC] shadow-sm border border-[#D4AF37]/40'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Reservations ({bookings.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('rooms')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 whitespace-nowrap shrink-0 ${
            adminTab === 'rooms'
              ? 'bg-[#173F35] text-[#F8F5EC] shadow-sm border border-[#D4AF37]/40'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bed className="w-4 h-4" />
          <span>Beds & Capacities</span>
        </button>

        <button
          onClick={() => setAdminTab('gate')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 whitespace-nowrap shrink-0 ${
            adminTab === 'gate'
              ? 'bg-[#173F35] text-[#F8F5EC] shadow-sm border border-[#D4AF37]/40'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Gate Security Audit</span>
        </button>

        <button
          onClick={() => setAdminTab('prayers')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 whitespace-nowrap shrink-0 ${
            adminTab === 'prayers'
              ? 'bg-[#173F35] text-[#F8F5EC] shadow-sm border border-[#D4AF37]/40'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Altar Prayers ({prayerRequests.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('staff')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 whitespace-nowrap shrink-0 ${
            adminTab === 'staff'
              ? 'bg-[#173F35] text-[#F8F5EC] shadow-sm border border-[#D4AF37]/40'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Staff Directory ({usersList.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('broadcast')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 whitespace-nowrap shrink-0 ${
            adminTab === 'broadcast'
              ? 'bg-[#173F35] text-[#F8F5EC] shadow-sm border border-[#D4AF37]/40'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Mountain Bulletins</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: EXECUTIVE OVERVIEW & LIVE METRICS                 */}
      {/* ======================================================== */}
      {adminTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* On-Site Admitted */}
            <div className="glass-panel p-5 rounded-2xl space-y-2 border-t-4 border-t-[#173F35] shadow-xs">
              <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                <span>On-Site Pilgrims</span>
                <Users className="w-4 h-4 text-[#173F35]" />
              </div>
              <div className="text-3xl font-black font-mono text-slate-900">
                {m?.checkedInVisitors || 0}
              </div>
              <div className="text-[11px] text-[#173F35] font-bold">Currently in Shiloh & Hostels</div>
            </div>

            {/* Expected Arrivals */}
            <div className="glass-panel p-5 rounded-2xl space-y-2 border-t-4 border-t-[#244E40] shadow-xs">
              <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                <span>Expected Arrivals</span>
                <Clock className="w-4 h-4 text-[#244E40]" />
              </div>
              <div className="text-3xl font-black font-mono text-slate-900">
                {m?.expectedArrivals || 0}
              </div>
              <div className="text-[11px] text-[#244E40] font-bold">Confirmed Gate Tickets</div>
            </div>

            {/* Occupancy Rate */}
            <div className="glass-panel p-5 rounded-2xl space-y-2 border-t-4 border-t-[#D4AF37] shadow-xs">
              <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                <span>Room Occupancy</span>
                <Bed className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="text-3xl font-black font-mono text-slate-900">
                {m?.occupancyPercentage || 0}%
              </div>
              <div className="text-[11px] text-[#173F35] font-bold">
                {m?.availableBeds || 0} beds free of {m?.totalBeds || 0}
              </div>
            </div>

            {/* Total M-Pesa Revenue */}
            <div className="glass-panel p-5 rounded-2xl space-y-2 border-t-4 border-t-[#173F35] shadow-xs">
              <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                <span>Total M-Pesa Revenue</span>
                <CreditCard className="w-4 h-4 text-[#173F35]" />
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 truncate">
                KES {m?.totalRevenueKES?.toLocaleString() || 0}
              </div>
              <div className="text-[11px] text-[#173F35] font-bold">Reconciled via Daraja API</div>
            </div>
          </div>

          {/* Category Occupancy Overview */}
          <div className="glass-panel p-6 rounded-3xl space-y-4 border-t-4 border-t-[#173F35] shadow-xs">
            <h3 className="font-cinzel text-base font-bold text-slate-900 flex items-center space-x-2">
              <Bed className="w-4 h-4 text-[#173F35]" />
              <span>Campus Accommodation Inventory & Occupancy Ratios</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats?.occupancyBreakdown?.map((cat: any) => (
                <div key={cat.categoryId} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900">{cat.categoryName}</span>
                    <span className="font-mono text-[#173F35] font-bold">{cat.occupancyPercent}% Occupied</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#173F35] rounded-full transition-all duration-500"
                      style={{ width: `${cat.occupancyPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                    <span>Occupied: {cat.occupiedBeds} / {cat.totalBeds} beds</span>
                    <span>Remaining: {cat.availableBeds} beds available</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Operations Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Bookings */}
            <div className="glass-panel p-6 rounded-3xl space-y-4 border-t-4 border-t-[#173F35] shadow-xs">
              <div className="flex justify-between items-center">
                <h3 className="font-cinzel text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#173F35]" />
                  <span>Latest Reservations</span>
                </h3>
                <button
                  onClick={() => setAdminTab('bookings')}
                  className="text-xs text-[#173F35] hover:underline font-bold"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                {stats?.recentBookings?.map((b: any) => (
                  <div key={b.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{b.visitorName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Ref: {b.bookingReference} • {b.roomType}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-black text-[#173F35]">KES {b.totalAmountKES}</div>
                      <span className={`text-[9px] uppercase px-2 py-0.5 rounded-full font-bold ${
                        b.status === 'confirmed' || b.status === 'checked_in'
                          ? 'bg-[#173F35]/10 text-[#173F35] border border-[#173F35]/20'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gate Screening Events */}
            <div className="glass-panel p-6 rounded-3xl space-y-4 border-t-4 border-t-[#244E40] shadow-xs">
              <div className="flex justify-between items-center">
                <h3 className="font-cinzel text-base font-bold text-slate-900 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#244E40]" />
                  <span>Recent Gate Admission Screenings</span>
                </h3>
                <button
                  onClick={() => setAdminTab('gate')}
                  className="text-xs text-[#173F35] hover:underline font-bold"
                >
                  Audit Log &rarr;
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                {stats?.recentGateEvents?.map((ev: any) => (
                  <div key={ev.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">{ev.visitorName}</span>
                      <span className="text-[10px] text-[#173F35] font-bold uppercase bg-[#173F35]/10 px-2 py-0.5 rounded border border-[#173F35]/20">
                        {ev.eventType}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Officer: <span className="font-bold text-slate-900">{ev.officerName}</span> • {new Date(ev.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: RESERVATIONS & BOOKINGS MANAGEMENT                */}
      {/* ======================================================== */}
      {adminTab === 'bookings' && (
        <div className="glass-panel p-6 rounded-3xl space-y-5 border-t-4 border-t-[#173F35] shadow-xs animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-cinzel text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[#173F35]" />
                <span>Pilgrim Reservations Management</span>
              </h2>
              <p className="text-xs text-slate-600">
                Filter, search, verify admissions, and allocate beds across all booking records.
              </p>
            </div>

            <button
              onClick={() => setShowWalkInModal(true)}
              className="px-3.5 py-2 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 text-xs font-bold transition flex items-center space-x-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-[#E5C158]" />
              <span>Admit Walk-in Pilgrim</span>
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pilgrim name, phone, or reference (HG-2026-XXXX)..."
                value={bookingSearch}
                onChange={e => setBookingSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#173F35]"
              />
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar text-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center pr-1">
                <Filter className="w-3 h-3 mr-1" /> Status:
              </span>
              {['all', 'confirmed', 'checked_in', 'checked_out', 'cancelled'].map(st => (
                <button
                  key={st}
                  onClick={() => setBookingFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg font-bold uppercase text-[10px] transition ${
                    bookingFilterStatus === st
                      ? 'bg-[#173F35] text-[#F8F5EC]'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 uppercase font-mono text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Ref & Pilgrim</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Room & Bed</th>
                  <th className="p-3.5">Dates</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{b.visitorName}</div>
                        <div className="font-mono text-[10px] text-slate-500">{b.bookingReference}</div>
                      </td>
                      <td className="p-3.5 text-slate-600 font-mono">
                        {b.visitorPhone}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-800">{b.roomType}</div>
                        <div className="text-[10px] text-[#173F35] font-mono font-bold">
                          Room: {b.assignedRoomNumber || 'Auto-assign'} • Bed {b.assignedBedNumber || 1}
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-600 text-[11px]">
                        <div>In: {b.checkInDate}</div>
                        <div>Out: {b.checkOutDate}</div>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        KES {b.totalAmountKES?.toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          b.status === 'checked_in'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : b.status === 'confirmed'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : b.status === 'checked_out'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {b.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                        {b.status === 'confirmed' && (
                          <button
                            disabled={actionLoading === b.id}
                            onClick={() => handleBookingStatus(b.id, 'checked_in')}
                            className="px-2.5 py-1 rounded bg-[#173F35] text-[#F8F5EC] hover:bg-[#244E40] text-[10px] font-bold transition"
                            title="Check in this pilgrim now"
                          >
                            Check In
                          </button>
                        )}
                        {b.status === 'checked_in' && (
                          <button
                            disabled={actionLoading === b.id}
                            onClick={() => handleBookingStatus(b.id, 'checked_out')}
                            className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold transition"
                            title="Depart and free bed back to inventory"
                          >
                            Check Out
                          </button>
                        )}
                        {b.status !== 'cancelled' && b.status !== 'checked_out' && (
                          <button
                            disabled={actionLoading === b.id}
                            onClick={() => handleBookingStatus(b.id, 'cancelled')}
                            className="px-2 py-1 rounded bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-700 text-[10px] font-medium transition"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400 text-xs">
                      No matching reservations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: BEDS & CAPACITIES INVENTORY                       */}
      {/* ======================================================== */}
      {adminTab === 'rooms' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6 border-t-4 border-t-[#173F35] shadow-xs animate-fade-in">
          <div>
            <h2 className="font-cinzel text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Bed className="w-5 h-5 text-[#173F35]" />
              <span>Campus Accommodation Categories & Bed Inventories</span>
            </h2>
            <p className="text-xs text-slate-600">
              Live capacity breakdown per block in Gilgil. All allocations enforce strict gender partition (BR-07).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {stats?.occupancyBreakdown?.map((cat: any) => (
              <div key={cat.categoryId} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{cat.categoryName}</h3>
                    <div className="text-[11px] text-slate-500 font-mono">Code: {cat.code} • KES {cat.priceKES}/night</div>
                  </div>
                  <span className="font-mono text-xs font-black text-[#173F35] bg-[#F8F5EC] border border-[#D4AF37]/50 px-2.5 py-1 rounded-lg">
                    {cat.occupancyPercent}% Occupied
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#173F35] rounded-full transition-all duration-700" 
                    style={{ width: `${cat.occupancyPercent}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="text-slate-500 block text-[9px] uppercase font-bold">Total Beds</span>
                    <strong className="text-slate-900 font-mono">{cat.totalBeds}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="text-slate-500 block text-[9px] uppercase font-bold">Occupied</span>
                    <strong className="text-[#173F35] font-mono">{cat.occupiedBeds}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="text-slate-500 block text-[9px] uppercase font-bold">Available</span>
                    <strong className="text-emerald-700 font-mono">{cat.availableBeds}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: GATE SECURITY & ADMISSION AUDIT LOG               */}
      {/* ======================================================== */}
      {adminTab === 'gate' && (
        <div className="glass-panel p-6 rounded-3xl space-y-5 border-t-4 border-t-[#244E40] shadow-xs animate-fade-in">
          <div>
            <h2 className="font-cinzel text-lg font-bold text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#244E40]" />
              <span>Security Gate Admissions & Luggage Screening Audit</span>
            </h2>
            <p className="text-xs text-slate-600">
              Complete chronological audit of all screenings conducted at the Gilgil main gatehouse (BR-08, BR-05).
            </p>
          </div>

          <div className="space-y-3">
            {gateEvents.length > 0 ? (
              gateEvents.map((ev: any) => (
                <div key={ev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{ev.visitorName}</span>
                      <span className="font-mono text-[10px] text-slate-500">Ref: {ev.bookingReference}</span>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        ev.eventType === 'check_in'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ev.eventType}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Officer in Charge: <strong className="text-slate-900">{ev.officerName}</strong> • {new Date(ev.timestamp).toLocaleString()}
                    </div>
                    {ev.notes && (
                      <div className="text-[11px] text-slate-500 italic">
                        Note: {ev.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 text-[10px] shrink-0 font-bold text-emerald-800">
                    <span className="bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">✓ Modesty Attire</span>
                    <span className="bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">✓ No Food in Luggage</span>
                    <span className="bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">✓ National ID Match</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                No gate admission events logged yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: ALTAR PRAYER REQUESTS MANAGER                     */}
      {/* ======================================================== */}
      {adminTab === 'prayers' && (
        <div className="glass-panel p-6 rounded-3xl space-y-5 border-t-4 border-t-[#173F35] shadow-xs animate-fade-in">
          <div>
            <h2 className="font-cinzel text-lg font-bold text-slate-900 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-[#173F35]" />
              <span>Altar Intercession & Prayer Requests Registry</span>
            </h2>
            <p className="text-xs text-slate-600">
              Senior intercession oversight. Assign requests to watches and record altar responses.
            </p>
          </div>

          <div className="space-y-3.5">
            {prayerRequests.length > 0 ? (
              prayerRequests.map((pr: any) => (
                <div key={pr.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{pr.visitorName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{pr.phone}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold uppercase">
                        {pr.category}
                      </span>
                      {pr.isConfidential && (
                        <span className="text-[9px] bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded font-bold uppercase">
                          Confidential
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {new Date(pr.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-slate-800 leading-relaxed font-serif text-sm">
                    "{pr.requestText}"
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                    <div className="text-[11px] text-slate-600">
                      Intercessor: <strong className="text-[#173F35]">{pr.assignedIntercessor || 'Apostolic Prayer Watch Team'}</strong> • Status: <span className="font-bold uppercase text-[10px]">{pr.status}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {pr.status !== 'answered' && (
                        <button
                          onClick={() => handlePrayerStatus(pr.id, 'in_prayer')}
                          className="px-3 py-1 rounded bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] text-[10px] font-bold transition"
                        >
                          Mark Under Prayer
                        </button>
                      )}
                      <button
                        onClick={() => handlePrayerStatus(pr.id, 'answered')}
                        className="px-3 py-1 rounded bg-[#E5C158] hover:bg-[#d8b446] text-[#173F35] text-[10px] font-black transition"
                      >
                        Praise / Answered
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                No prayer requests currently in the registry.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: STAFF DIRECTORY & ROLE MANAGEMENT                 */}
      {/* ======================================================== */}
      {adminTab === 'staff' && (
        <div className="glass-panel p-6 rounded-3xl space-y-5 border-t-4 border-t-[#173F35] shadow-xs animate-fade-in">
          <div>
            <h2 className="font-cinzel text-lg font-bold text-slate-900 flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-[#173F35]" />
              <span>Ministry Officers & Staff RBAC Directory</span>
            </h2>
            <p className="text-xs text-slate-600">
              Manage operational duty roles for gatekeepers, hostel managers, reception, and intercession staff.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 uppercase font-mono text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Officer Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Phone</th>
                  <th className="p-3.5">Assigned System Role</th>
                  <th className="p-3.5 text-right">Update Duty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {usersList.map((u: any) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-slate-900">
                      {u.name}
                    </td>
                    <td className="p-3.5 text-slate-600 font-mono text-[11px]">
                      {u.email}
                    </td>
                    <td className="p-3.5 text-slate-600 font-mono text-[11px]">
                      {u.phone}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.role === 'system_admin'
                          ? 'bg-[#E5C158] text-[#173F35] font-black border border-[#173F35]'
                          : u.role === 'registered_pilgrim'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-[#173F35]/10 text-[#173F35] border border-[#173F35]/30'
                      }`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <select
                        value={u.role}
                        onChange={e => handleRoleChange(u.id, e.target.value)}
                        className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-slate-800 focus:outline-none focus:border-[#173F35]"
                      >
                        <option value="system_admin">System Admin</option>
                        <option value="gate_officer">Gate Officer</option>
                        <option value="reception_officer">Reception Officer</option>
                        <option value="accommodation_officer">Accommodation Officer</option>
                        <option value="finance_officer">Finance Officer</option>
                        <option value="prayer_admin">Prayer Admin</option>
                        <option value="registered_pilgrim">Registered Pilgrim</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7: CAMPUS BROADCAST ANNOUNCEMENTS                    */}
      {/* ======================================================== */}
      {adminTab === 'broadcast' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6 border-t-4 border-t-[#173F35] shadow-xs animate-fade-in">
          <div>
            <h2 className="font-cinzel text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Megaphone className="w-5 h-5 text-[#173F35]" />
              <span>Mountain Bulletins & Real-Time Pilgrim Announcements</span>
            </h2>
            <p className="text-xs text-slate-600">
              Broadcast critical notices, fasting schedule updates, and weather advisories to all visitors.
            </p>
          </div>

          {/* New Announcement Form */}
          <form onSubmit={handleBroadcastAnnouncement} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <h3 className="font-bold text-slate-900">Broadcast New Notice</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="block text-slate-700 font-bold">Bulletin Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shiloh Fasting Tea Service Schedule Change"
                  value={newAnnTitle}
                  onChange={e => setNewAnnTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] bg-white font-medium text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 font-bold">Severity / Category</label>
                <select
                  value={newAnnType}
                  onChange={e => setNewAnnType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] bg-white font-medium text-slate-900"
                >
                  <option value="info">General Info (Ivory/Green)</option>
                  <option value="warning">Important Caution (Amber)</option>
                  <option value="alert">Emergency Advisory (Red)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-slate-700 font-bold">Notice Content</label>
              <textarea
                rows={2}
                required
                placeholder="Write message to appear on pilgrim banners..."
                value={newAnnMessage}
                onChange={e => setNewAnnMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] bg-white font-medium text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 rounded-xl font-bold text-xs shadow-xs transition flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Broadcast Bulletin</span>
            </button>
          </form>

          {/* List of Active Bulletins */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Active Bulletins</h3>
            {announcements.length > 0 ? (
              announcements.map((ann: any) => (
                <div key={ann.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start justify-between gap-3 text-xs shadow-xs">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{ann.title}</span>
                      <span className={`text-[9px] uppercase px-2 py-0.5 rounded font-bold ${
                        ann.type === 'alert'
                          ? 'bg-red-100 text-red-800'
                          : ann.type === 'warning'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-[#173F35]/10 text-[#173F35]'
                      }`}>
                        {ann.type}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium">{ann.message}</p>
                    <div className="text-[10px] text-slate-400">
                      Author: {ann.author} • {new Date(ann.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteAnnouncement(ann.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                    title="Delete Announcement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-slate-400 text-xs">
                No active announcements currently broadcasted.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* WALK-IN PILGRIM ADMISSION MODAL                          */}
      {/* ======================================================== */}
      {showWalkInModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#173F35] rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-[#173F35]" />
                <h3 className="font-cinzel font-bold text-base text-slate-900">Admit Walk-in Pilgrim</h3>
              </div>
              <button
                onClick={() => setShowWalkInModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleWalkInSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="block text-slate-700 font-bold">Pilgrim Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full name as per National ID"
                  value={walkInName}
                  onChange={e => setWalkInName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] bg-slate-50 font-medium text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 font-bold">Kenyan Phone (M-Pesa or Cash)</label>
                <input
                  type="tel"
                  required
                  placeholder="07XXXXXXXX"
                  value={walkInPhone}
                  onChange={e => setWalkInPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] bg-slate-50 font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold">Category</label>
                  <select
                    value={walkInCat}
                    onChange={e => setWalkInCat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] bg-slate-50 font-medium text-slate-900"
                  >
                    <option value="cat-single">Single Room (KES 600)</option>
                    <option value="cat-double">Double Sharing (KES 450)</option>
                    <option value="cat-dorm">4-Bed Dorm (KES 280)</option>
                    <option value="cat-hall">6-Bed Hall (KES 180)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold">Gender Partition</label>
                  <select
                    value={walkInGender}
                    onChange={e => setWalkInGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] bg-slate-50 font-medium text-slate-900"
                  >
                    <option value="any">Any Room</option>
                    <option value="male">Brother (Male Block)</option>
                    <option value="female">Sister (Female Block)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 font-bold">Nights of Stay</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={walkInNights}
                  onChange={e => setWalkInNights(parseInt(e.target.value || '1', 10))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#173F35] bg-slate-50 font-medium text-slate-900 font-bold"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#F8F5EC] border border-[#D4AF37]/50 text-[11px] text-[#173F35]">
                ✓ Generates immediate valid Gate Ticket QR and assigns specific Bed & Room Number.
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWalkInModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#244E40] text-[#F8F5EC] border border-[#D4AF37]/40 font-bold transition shadow-sm"
                >
                  Confirm Check-in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
