import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext.js';
import { Navbar } from './components/layout/Navbar.js';
import { Footer } from './components/layout/Footer.js';
import { AiAssistantModal } from './components/AiAssistantModal.js';
import { AuthModal } from './components/AuthModal.js';

// Application Pages
import { HomePage } from './pages/HomePage.js';
import { AboutUsPage } from './pages/AboutUsPage.js';
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // When a booking completes, transition directly to the issued QR ticket pass
  const handleBookingSuccess = (bookingRef: string, ticketRef?: string) => {
    if (ticketRef) {
      setActiveTicketRef(ticketRef);
    }
    setCurrentTab('ticket');
  };

  const handleAdminLoginSuccess = () => {
    setCurrentTab('admin');
  };

  const renderCurrentPage = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomePage 
            onNavigate={setCurrentTab} 
            onOpenAi={() => setIsAiModalOpen(true)} 
          />
        );
      case 'about':
        return <AboutUsPage onNavigate={setCurrentTab} />;
      case 'booking':
        return <BookingPage onBookingSuccess={handleBookingSuccess} />;
      case 'ticket':
        return <TicketViewPage initialTicketRef={activeTicketRef} onNavigateToMap={() => setCurrentTab('map')} />;
      case 'scanner':
        return (
          <GateScannerPage 
            onNavigate={setCurrentTab} 
            onOpenAuth={() => setIsAuthModalOpen(true)} 
          />
        );
      case 'map':
        return <InteractiveMapPage />;
      case 'services':
        return <LiveServicesPage />;
      case 'testimonies':
        return <TestimoniesPage />;
      case 'prayer':
        return <PrayerRequestPage />;
      case 'transport':
        return <TransportEstimatorPage onNavigate={setCurrentTab} />;
      case 'admin':
        return (
          <AdminDashboardPage 
            onNavigate={setCurrentTab} 
            onOpenAuth={() => setIsAuthModalOpen(true)} 
          />
        );
      default:
        return (
          <HomePage 
            onNavigate={setCurrentTab} 
            onOpenAi={() => setIsAiModalOpen(true)} 
          />
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-[#173F35] selection:text-[#F8F5EC]">
        {/* Global Navigation Header */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onOpenAi={() => setIsAiModalOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
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

        {/* Dedicated Professional Log In & Sign Up Module */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAdminLoginSuccess={handleAdminLoginSuccess}
        />

        {/* Institutional Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
