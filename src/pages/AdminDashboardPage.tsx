import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Bed, CreditCard, ShieldCheck, 
  Download, Clock, RefreshCw
} from 'lucide-react';
import { api } from '../services/api.js';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminStats();
      setStats(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

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
      + `Available Beds,${stats.metrics.availableBeds}\n`
      + `First-time Pilgrims,${stats.metrics.firstTimePilgrims}\n`
      + `Returning Pilgrims,${stats.metrics.returningPilgrims}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `heavens_gate_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="py-24 text-center text-xs text-slate-500 font-medium">Loading live management metrics...</div>;
  }

  const m = stats?.metrics;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-orange-600 font-bold uppercase tracking-wider">
            <LayoutDashboard className="w-4 h-4" />
            <span>Executive Operations & Financial Oversight</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-slate-900">
            Heavens Gate Management Dashboard
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Real-time validated metrics across Gate Admissions, Room Allocations, and M-Pesa Reconciliation.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={loadStats}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm transition"
            title="Refresh Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center space-x-2 shadow-lg shadow-orange-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Checked In */}
        <div className="glass-panel p-5 rounded-2xl space-y-2 border-t-4 border-t-emerald-500 shadow-sm">
          <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
            <span>On-Site Pilgrims</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
            {m?.checkedInVisitors || 0}
          </div>
          <div className="text-[11px] text-emerald-700 font-bold">Currently Admitted</div>
        </div>

        {/* Expected Arrivals */}
        <div className="glass-panel p-5 rounded-2xl space-y-2 border-t-4 border-t-blue-500 shadow-sm">
          <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
            <span>Expected Arrivals</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
            {m?.expectedArrivals || 0}
          </div>
          <div className="text-[11px] text-blue-700 font-bold">Confirmed for Gate Pass</div>
        </div>

        {/* Occupancy */}
        <div className="glass-panel p-5 rounded-2xl space-y-2 border-t-4 border-t-orange-500 shadow-sm">
          <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
            <span>Room Occupancy</span>
            <Bed className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
            {m?.occupancyPercentage || 0}%
          </div>
          <div className="text-[11px] text-orange-700 font-bold">
            {m?.availableBeds || 0} beds available out of {m?.totalBeds || 0}
          </div>
        </div>

        {/* M-Pesa Revenue */}
        <div className="glass-panel p-5 rounded-2xl space-y-2 border-t-4 border-t-purple-500 shadow-sm">
          <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
            <span>Total M-Pesa Revenue</span>
            <CreditCard className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 truncate">
            KES {m?.totalRevenueKES?.toLocaleString() || 0}
          </div>
          <div className="text-[11px] text-purple-700 font-bold">Reconciled via Daraja</div>
        </div>
      </div>

      {/* Occupancy Breakdown by Category */}
      <div className="glass-panel p-6 rounded-3xl space-y-4 border-t-4 border-t-orange-500 shadow-sm">
        <h3 className="font-cinzel text-base font-bold text-slate-900 flex items-center space-x-2">
          <Bed className="w-4 h-4 text-orange-600" />
          <span>Accommodation Category Inventory & Occupancy Ratios</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats?.occupancyBreakdown?.map((cat: any) => (
            <div key={cat.categoryId} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900">{cat.categoryName}</span>
                <span className="font-mono text-orange-600 font-bold">{cat.occupancyPercent}% Occupied</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-600 rounded-full transition-all duration-500"
                  style={{ width: `${cat.occupancyPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                <span>Occupied: {cat.occupiedBeds} / {cat.totalBeds} beds</span>
                <span>Remaining: {cat.availableBeds} beds</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tables: Recent Bookings & Gate Admission Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="glass-panel p-6 rounded-3xl space-y-4 border-t-4 border-t-orange-500 shadow-sm">
          <h3 className="font-cinzel text-base font-bold text-slate-900 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Recent Booking Reservations</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            {stats?.recentBookings?.map((b: any) => (
              <div key={b.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{b.visitorName}</div>
                  <div className="text-[11px] text-slate-500 font-mono font-medium">
                    Ref: {b.bookingReference} • {b.roomType}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-black text-orange-600">KES {b.totalAmountKES}</div>
                  <span className={`text-[9px] uppercase px-2 py-0.5 rounded-full font-bold ${
                    b.status === 'confirmed' || b.status === 'checked_in'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {b.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gate Event Screening Audit */}
        <div className="glass-panel p-6 rounded-3xl space-y-4 border-t-4 border-t-emerald-500 shadow-sm">
          <h3 className="font-cinzel text-base font-bold text-slate-900 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Gate Admission & Security Log</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            {stats?.recentGateEvents?.length > 0 ? (
              stats.recentGateEvents.map((ev: any) => (
                <div key={ev.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{ev.visitorName}</span>
                    <span className="text-[10px] text-emerald-800 font-bold uppercase bg-emerald-100 px-2 py-0.5 rounded">
                      {ev.eventType}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Screening Officer: <span className="font-bold text-slate-900">{ev.officerName}</span> • {new Date(ev.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Checked: Modesty attire, ID match, no-food luggage inspection.
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-slate-500 text-xs">
                No recent gate admission events. Screen a ticket in the Gate Scanner.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
