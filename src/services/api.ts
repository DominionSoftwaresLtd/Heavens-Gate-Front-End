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
  }
};
