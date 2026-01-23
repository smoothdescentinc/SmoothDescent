import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import TrustMarquee from './components/TrustMarquee';
import Reviews from './components/Reviews';
import Quiz from './components/Quiz';
import ValueProps from './components/ValueProps';
import ProductGrid from './components/ProductGrid';
import ProductPage from './components/ProductPage';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import QuizCallout from './components/QuizCallout';
import NewsletterModal from './components/NewsletterModal';
import SciencePage from './components/SciencePage';
import MetaPurchaseTracker from './components/MetaPurchaseTracker';
import UsVsThem from './components/UsVsThem';
import PromiseSection from './components/PromiseSection';
import ContactForm from './components/ContactForm';
import DoctorSection from './components/DoctorSection';
import TrustBadges from './components/TrustBadges';
import SaleBanner from './components/SaleBanner';
import { trackPageView } from './lib/metaPixel';

const Home = () => (
  <>
    <Hero />
    <TrustBadges />
    <TrustMarquee />
    <ProductGrid />
    <ValueProps />
    <Reviews />
    <DoctorSection />
    <PromiseSection />
    <QuizCallout />
    <UsVsThem />
    <FAQ />
  </>
);

import AnnouncementBar from './components/AnnouncementBar';

const App: React.FC = () => {
  const location = useLocation();
  const [isNewsletterOpen, setIsNewsletterOpen] = React.useState(false);

  // Scroll to top or section on route change + track PageView
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');

    // Track PageView for SPA navigation (skip initial load - handled by BaseLayout)
    if (location.key !== 'default') {
      trackPageView(location.pathname);
    }

    if (section || location.hash) {
      const targetId = section || location.hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash, location.search]);

  // Auto-open modal after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => setIsNewsletterOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="antialiased text-slate-900 bg-white">
      <AnnouncementBar onOpen={() => setIsNewsletterOpen(true)} />
      <Header />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/shop" element={<div className="pt-24 min-h-screen bg-brand-light pb-20"><ProductGrid /></div>} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/contact" element={<div className="pt-24 min-h-screen bg-brand-light pb-20"><div className="max-w-4xl mx-auto px-4"><h1 className="text-4xl font-bold text-center mb-12 font-heading text-brand-primary">Contact Us</h1><ContactForm /></div></div>} />
        </Routes>
      </main>
      <Footer />
      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
      <SaleBanner />
      <MetaPurchaseTracker />
    </div>
  );
};

export default App;