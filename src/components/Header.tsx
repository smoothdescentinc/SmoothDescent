import React, { useState } from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useStore } from '@nanostores/react';
import { isCartOpen, cartItems } from '../store/cartStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const $cartItems = useStore(cartItems);
  const cartCount = $cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Don't show header on quiz to reduce distraction, or show minimal version
  const isQuiz = location.pathname === '/quiz';

  const handleNavClick = (hash: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(hash);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-light/95 backdrop-blur-sm border-b border-brand-primary/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-black text-brand-dark tracking-tight font-serif">
              SMOOTH DESCENT
            </span>
          </Link>

          {/* Desktop Nav */}
          {!isQuiz && (
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => handleNavClick('#products')} className="text-brand-dark hover:text-brand-primary font-medium tracking-wide text-sm uppercase">Shop</button>
              <Link to="/science" className="text-brand-dark hover:text-brand-primary font-medium tracking-wide text-sm uppercase">The Science</Link>
              <button onClick={() => handleNavClick('#reviews')} className="text-brand-dark hover:text-brand-primary font-medium tracking-wide text-sm uppercase">Reviews</button>
              <button onClick={() => handleNavClick('#faq')} className="text-brand-dark hover:text-brand-primary font-medium tracking-wide text-sm uppercase">FAQs</button>
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-6">
            {!isQuiz && (
              <Link to="/quiz" className="hidden md:block">
                <span className="text-sm font-bold text-brand-primary hover:text-brand-accent transition-colors uppercase tracking-wide border-b-2 border-brand-primary/20 pb-0.5 hover:border-brand-primary">Find Your Match</span>
              </Link>
            )}
            <button
              className="relative text-brand-dark hover:text-brand-primary transition-colors"
              onClick={() => isCartOpen.set(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-primary text-brand-light text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {/* Mobile Menu Button */}
            {!isQuiz && (
              <button
                className="md:hidden text-brand-dark"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && !isQuiz && (
        <div className="md:hidden bg-brand-light border-b border-brand-primary/10">
          <div className="px-4 pt-4 pb-8 space-y-2">
            <button className="block w-full text-left px-3 py-3 text-base font-medium text-brand-dark hover:bg-brand-cream rounded-md" onClick={() => handleNavClick('#products')}>Shop</button>
            <Link to="/science" className="block w-full text-left px-3 py-3 text-base font-medium text-brand-dark hover:bg-brand-cream rounded-md" onClick={() => setIsMenuOpen(false)}>The Science</Link>
            <button className="block w-full text-left px-3 py-3 text-base font-medium text-brand-dark hover:bg-brand-cream rounded-md" onClick={() => handleNavClick('#reviews')}>Reviews</button>
            <button className="block w-full text-left px-3 py-3 text-base font-medium text-brand-dark hover:bg-brand-cream rounded-md" onClick={() => handleNavClick('#faq')}>FAQs</button>
            <Link to="/quiz" className="block w-full mt-6 text-center bg-brand-primary text-brand-light font-bold py-4 rounded-full shadow-md" onClick={() => setIsMenuOpen(false)}>
              Find Your Match
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;