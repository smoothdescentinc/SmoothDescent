import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
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

const Home = () => (
  <>
    <Hero />
    <Reviews />
    <ValueProps />
    <QuizCallout />
    <ProductGrid />
    <FAQ />
  </>
);

import AnnouncementBar from './components/AnnouncementBar';

const App: React.FC = () => {
  const location = useLocation();
  const [isNewsletterOpen, setIsNewsletterOpen] = React.useState(false);

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>
      <Footer />
      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </div>
  );
};

export default App;