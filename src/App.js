import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { trackPageView } from './analytics';
import CSSVars from './components/CSSVars';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import ScrollProgress from './components/ScrollProgress';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ReservationPage from './pages/ReservationPage';
import DevisTapisPage from './pages/DevisTapisPage';
import ContactPage from './pages/ContactPage';

// Ajouter des pages ici + dans Header.jsx NAV + dans Footer.jsx nav

function AppContent() {
  const location = useLocation();

  // SPA — page_view manuel à chaque changement de route
  // send_page_view: false est déclaré dans index.html (script GA4)
  useEffect(() => {
    trackPageView(location.pathname);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    // paddingBottom : espace pour le StickyCTA fixé en bas sur mobile
    <div style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <CSSVars />
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/"             element={<HomePage />}       />
          <Route path="/services"     element={<ServicesPage />}    />
          <Route path="/reservation"  element={<ReservationPage />} />
          <Route path="/devis-tapis"  element={<DevisTapisPage />}  />
          <Route path="/contact"      element={<ContactPage />}     />
        </Routes>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
