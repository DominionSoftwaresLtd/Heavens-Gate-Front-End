export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'public_visitor' | 'registered_pilgrim' | 'gate_officer' | 'reception_officer' | 
        'accommodation_officer' | 'finance_officer' | 'prayer_admin' | 'prayer_team' | 
        'testimony_moderator' | 'comms_officer' | 'system_admin' | 'senior_management';
  nationalId?: string;
  isFirstTime?: boolean;
  totalVisits?: number;
}

export interface AccommodationCategory {
  id: string;
  code: string;
  name: string;
  description: string;
  pricePerNightKES: number;
  billingUnit: 'per_room' | 'per_person';
  capacityPerUnit: number;
  genderRestriction: string;
  amenities: string[];
}

export interface Booking {
  id: string;
  bookingReference: string;
  visitorId: string;
  visitorName: string;
  visitorPhone: string;
  visitorEmail?: string;
  categoryId: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  totalAmountKES: number;
  status: 'pending_payment' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
  assignedRoomNumber?: string;
  assignedBedNumber?: string;
  ticketId?: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  ticketReference: string;
  bookingId: string;
  bookingReference: string;
  visitorId: string;
  visitorName: string;
  phone: string;
  categoryName: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'valid' | 'checked_in' | 'checked_out' | 'cancelled';
  qrData: string;
  signedHash: string;
  checkedInAt?: string;
  checkedInByOfficer?: string;
}

export interface MapFeature {
  id: string;
  name: string;
  category: 'gate' | 'sanctuary' | 'prayer_garden' | 'prayer_booth' | 'accommodation' | 'medical' | 'dining' | 'assembly';
  description: string;
  coordinates: { x: number; y: number };
  icon: string;
  rules?: string;
}

export interface LiveService {
  id: string;
  title: string;
  preacher: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'live' | 'ended';
  streamUrl: string;
  viewersCount: number;
}

export interface PrayerWatch {
  id: string;
  shiftTitle: string;
  timeRange: string;
  focusArea: string;
  leader: string;
  maxParticipants: number;
  registeredCount: number;
}

export interface Testimony {
  id: string;
  authorName: string;
  countyOrCity: string;
  title: string;
  content: string;
  category: string;
  status: string;
  likesCount: number;
  replies: Array<{
    id: string;
    authorName: string;
    comment: string;
    timestamp: string;
  }>;
  createdAt: string;
}

export interface TransportRoute {
  id: string;
  originCity: string;
  routeTitle: string;
  stageDirections: string;
  matatuFareKES: string;
  bodaBodaFareKES: string;
  travelTime: string;
  advice: string;
}

export interface PrayerRequest {
  id: string;
  visitorId?: string;
  visitorName: string;
  phone: string;
  email?: string;
  requestText: string;
  category: string;
  isConfidential: boolean;
  status: 'received' | 'assigned' | 'in_prayer' | 'answered';
  assignedIntercessor?: string;
  responseNote?: string;
  createdAt: string;
}

export interface GateEvent {
  id: string;
  ticketId: string;
  bookingReference: string;
  visitorName: string;
  eventType: 'check_in' | 'check_out' | 'denied';
  timestamp: string;
  officerName: string;
  notes?: string;
  checks?: {
    dressCode?: boolean;
    orientation?: boolean;
    identity?: boolean;
    luggageNoFood?: boolean;
  };
}

export interface EmailDeliveryRecord {
  id: string;
  emailType: 'welcome' | 'thank_you' | 'booking_confirmation';
  recipientName: string;
  recipientEmail: string;
  visitorOrVisitRef: string;
  status: 'delivered' | 'sent' | 'pending' | 'failed';
  timestamp: string;
  failureReason?: string;
}

