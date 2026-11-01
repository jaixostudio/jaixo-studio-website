import { useState, useEffect } from 'react';
import { StudioDataProvider } from './context/StudioDataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { QuickEnquiryModal } from './components/QuickEnquiryModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPortal } from './pages/AdminPortal';

export function AppContent() {
  const [activePage, setActivePage] = useState<string>('home');
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Sync window URL hash for direct links (e.g. #portfolio, #pricing)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'services', 'portfolio', 'pricing', 'about', 'contact'].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: string) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F5F2] flex flex-col relative selection:bg-[#078BFF] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full">
        {activePage === 'home' && <HomePage setActivePage={handlePageChange} />}
        {activePage === 'services' && <ServicesPage setActivePage={handlePageChange} />}
        {activePage === 'portfolio' && <PortfolioPage />}
        {activePage === 'pricing' && <PricingPage />}
        {activePage === 'about' && <AboutPage setActivePage={handlePageChange} />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Modals & Portals */}
      <ProjectModal />
      <QuickEnquiryModal />
      {adminOpen && <AdminPortal onClose={() => setAdminOpen(false)} />}

      {/* Agency Footer */}
      <Footer setActivePage={handlePageChange} onOpenAdmin={() => setAdminOpen(true)} />
    </div>
  );
}

export default function App() {
  return (
    <StudioDataProvider>
      <AppContent />
    </StudioDataProvider>
  );
}
