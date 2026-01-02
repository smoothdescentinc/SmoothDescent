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

const Home = () => (
  <>
    <Hero />
    <Reviews />
    <ValueProps />
    <ProductGrid />
    <QuizCallout />
    <FAQ />
  </>
);

const App: React.FC = () => {
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="antialiased text-slate-900 bg-white">
      <Header />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;