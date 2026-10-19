const API_BASE = 'http://localhost:5000/api/v1';

export const api = {
  // Auth
  async getDemoAccounts() {
    const res = await fetch(`${API_BASE}/auth/demo-accounts`);
    return res.json();
  },
  async login(identifier: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    return res.json();
  },
  async loginWithGoogle(data: { email: string; name: string; googleId?: string; avatar?: string }) {
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async register(data: any) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Accommodation
  async getCategories() {
    const res = await fetch(`${API_BASE}/accommodation/categories`);
    return res.json();
  },
  async getOccupancy() {
    const res = await fetch(`${API_BASE}/accommodation/occupancy`);
    return res.json();
  },
  async calculatePrice(data: { categoryId: string; checkInDate: string; checkOutDate: string; guestsCount: number }) {
    const res = await fetch(`${API_BASE}/accommodation/calculate-price`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Bookings
  async createBooking(data: any) {
    const res = await fetch(`${API_BASE}/bookings/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async getBooking(identifier: string) {
    const res = await fetch(`${API_BASE}/bookings/${identifier}`);
    return res.json();
  },

  // Payments
  async initiateSTK(bookingId: string, phone: string) {
    const res = await fetch(`${API_BASE}/payments/stk-push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, phone })
    });
    return res.json();
  },
  async simulatePayment(bookingId: string) {
    const res = await fetch(`${API_BASE}/payments/simulate-instant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId })
    });
    return res.json();
  },

  // Tickets
  async getTicket(ref: string) {
    const res = await fetch(`${API_BASE}/tickets/${ref}`);
    return res.json();
  },
  async verifyScan(qrContent: string, ticketReference?: string) {
    const res = await fetch(`${API_BASE}/tickets/verify-scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qrContent, ticketReference })
    });
    return res.json();
  },

  // Gate Operations
  async getGateStatus() {
    const res = await fetch(`${API_BASE}/gate/status`);
    return res.json();
  },
  async checkIn(data: any) {
    const res = await fetch(`${API_BASE}/gate/check-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async checkOut(data: any) {
    const res = await fetch(`${API_BASE}/gate/check-out`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async getExpectedArrivals() {
    const res = await fetch(`${API_BASE}/gate/expected-arrivals`);
    return res.json();
  },

  // Ministry
  async getServices() {
    const res = await fetch(`${API_BASE}/ministry/services`);
    return res.json();
  },
  async getPrayerWatches() {
    const res = await fetch(`${API_BASE}/ministry/prayer-watches`);
    return res.json();
  },
  async registerWatch(watchId: string, pilgrimName: string) {
    const res = await fetch(`${API_BASE}/ministry/prayer-watches/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ watchId, pilgrimName })
    });
    return res.json();
  },
  async getTestimonies() {
    const res = await fetch(`${API_BASE}/ministry/testimonies`);
    return res.json();
  },
  async submitTestimony(data: any) {
    const res = await fetch(`${API_BASE}/ministry/testimonies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async likeTestimony(id: string) {
    const res = await fetch(`${API_BASE}/ministry/testimonies/${id}/like`, { method: 'POST' });
    return res.json();
  },
  async replyTestimony(id: string, authorName: string, comment: string) {
    const res = await fetch(`${API_BASE}/ministry/testimonies/${id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authorName, comment })
    });
    return res.json();
  },
  async submitPrayerRequest(data: any) {
    const res = await fetch(`${API_BASE}/ministry/prayer-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async getMyMessages(identifier?: string) {
    const query = identifier ? `?identifier=${encodeURIComponent(identifier)}` : '';
    const res = await fetch(`${API_BASE}/messages/my-messages${query}`);
    if (!res.ok) {
      throw new Error(`HTTP_${res.status}: Failed to fetch my messages`);
    }
    return res.json();
  },


  // Utilities
  async getMapFeatures() {
    const res = await fetch(`${API_BASE}/utility/map-features`);
    return res.json();
  },
  async getTransportRoutes() {
    const res = await fetch(`${API_BASE}/utility/transport-routes`);
    return res.json();
  },
  async askAI(question: string) {
    const res = await fetch(`${API_BASE}/utility/ai-assistant/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    return res.json();
  },
  async getEmergencyContacts() {
    const res = await fetch(`${API_BASE}/utility/emergency-contacts`);
    return res.json();
  },

  // Admin
  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/dashboard-stats`);
    return res.json();
  },
  async getAdminBookings(status?: string, q?: string) {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (q) params.append('q', q);
    const res = await fetch(`${API_BASE}/admin/bookings?${params.toString()}`);
    return res.json();
  },
  async updateBookingStatus(id: string, status: string, notes?: string, officerName?: string) {
    const res = await fetch(`${API_BASE}/admin/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes, officerName })
    });
    return res.json();
  },
  async createWalkInBooking(data: any) {
    const res = await fetch(`${API_BASE}/admin/bookings/walk-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async getAdminUsers() {
    const res = await fetch(`${API_BASE}/admin/users`);
    return res.json();
  },
  async updateUserRole(id: string, role: string) {
    const res = await fetch(`${API_BASE}/admin/users/${id}/role`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role })
    });
    return res.json();
  },
  async getAdminPrayerRequests() {
    const res = await fetch(`${API_BASE}/admin/prayer-requests`);
    return res.json();
  },
  async updatePrayerRequestStatus(id: string, status: string, assignedIntercessor?: string, responseNote?: string) {
    const res = await fetch(`${API_BASE}/admin/prayer-requests/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, assignedIntercessor, responseNote })
    });
    return res.json();
  },
  async getAnnouncements() {
    const res = await fetch(`${API_BASE}/admin/announcements`);
    return res.json();
  },
  async broadcastAnnouncement(data: { title: string; message: string; type?: string; author?: string }) {
    const res = await fetch(`${API_BASE}/admin/announcements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async deleteAnnouncement(id: string) {
    const res = await fetch(`${API_BASE}/admin/announcements/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },
  async getGateEvents() {
    const res = await fetch(`${API_BASE}/admin/gate-events`);
    return res.json();
  },
  async getEmailStatus() {
    const res = await fetch(`${API_BASE}/admin/email-status`);
    if (!res.ok) {
      throw new Error(`HTTP_${res.status}: Failed to fetch email dispatch status`);
    }
    return res.json();
  }
};

