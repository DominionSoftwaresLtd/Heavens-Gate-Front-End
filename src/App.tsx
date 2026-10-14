import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext.js';
import { EmergencyBanner } from './components/EmergencyBanner.js';
import { Navbar } from './components/layout/Navbar.js';
import { Footer } from './components/layout/Footer.js';
import { AiAssistantModal } from './components/AiAssistantModal.js';

// Application Pages
import { HomePage } from './pages/HomePage.js';
import { BookingPage } from './pages/BookingPage.js';
import { TicketViewPage } from './pages/TicketViewPage.js';
import { GateScannerPage } from './pages/GateScannerPage.js';
import { InteractiveMapPage } from './pages/InteractiveMapPage.js';
import { LiveServicesPage } from './pages/LiveServicesPage.js';
import { TestimoniesPage } from './pages/TestimoniesPage.js';
import { PrayerRequestPage } from './pages/PrayerRequestPage.js';
import { TransportEstimatorPage } from './pages/TransportEstimatorPage.js';
import { AdminDashboardPage } from './pages/AdminDashboardPage.js';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeTicketRef, setActiveTicketRef] = useState<string>('TKT-2026-9821');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  // When a booking completes, transition directly to the issued QR ticket pass
  const handleBookingSuccess = (bookingRef: string, ticketRef?: string) => {
    if (ticketRef) {
      setActiveTicketRef(ticketRef);
    }
    setCurrentTab('ticket');
  };

  const renderCurrentPage = () => {
    switch (currentTab) {
      case 'home':
        return <HomePage onNavigate={setCurrentTab} onOpenAi={() => setIsAiModalOpen(true)} />;
      case 'booking':
        return <BookingPage onBookingSuccess={handleBookingSuccess} />;
      case 'ticket':
        return <TicketViewPage initialTicketRef={activeTicketRef} onNavigateToMap={() => setCurrentTab('map')} />;
      case 'scanner':
        return <GateScannerPage />;
      case 'map':
        return <InteractiveMapPage />;
      case 'services':
        return <LiveServicesPage />;
      case 'testimonies':
        return <TestimoniesPage />;
      case 'prayer':
        return <PrayerRequestPage />;
      case 'transport':
        return <TransportEstimatorPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage onNavigate={setCurrentTab} onOpenAi={() => setIsAiModalOpen(true)} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-orange-500 selection:text-white">
        {/* Global Navigation Header with Integrated Emergency Strip */}

        {/* Global Navigation Header */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onOpenAi={() => setIsAiModalOpen(true)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1">
          {renderCurrentPage()}
        </main>

        {/* Grounded AI Assistant Modal */}
        <AiAssistantModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
        />

        {/* Institutional Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
