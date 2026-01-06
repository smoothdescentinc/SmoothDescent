import React from 'react';
import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';

const Footer: React.FC = () => {
  return (
    <div className='flex flex-col'>
      {/* Prominent Newsletter Section */}
      <Newsletter />

      <footer className="bg-brand-dark text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16 justify-items-center md:justify-items-start text-center md:text-left">

            {/* Column 1 */}
            <div>
              <h4 className="font-bold mb-6 tracking-widest text-xs text-brand-primary uppercase">SmoothDescent</h4>
              <ul className="space-y-4 text-sm text-brand-light/70">
                <li><a href="#products" className="hover:text-brand-primary transition-colors">Shop All</a></li>
                <li><a href="#difference" className="hover:text-brand-primary transition-colors">Benefits</a></li>
                <li><Link to="/quiz" className="hover:text-brand-primary transition-colors">Take the Quiz</Link></li>
                <li><a href="#reviews" className="hover:text-brand-primary transition-colors">Reviews</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-bold mb-6 tracking-widest text-xs text-brand-primary uppercase">Shop</h4>
              <ul className="space-y-4 text-sm text-brand-light/70">
                {/* Note: In a real app these would link to specific product pages. For now, they scroll to the grid or use the product page route if known. */}
                <li><Link to="/product/hydration" className="hover:text-brand-primary transition-colors">Gastric Shield+ Hydration</Link></li>
                <li><Link to="/product/protein" className="hover:text-brand-primary transition-colors">LeanLock™ Protein</Link></li>
                <li><Link to="/product/rescue-kit" className="hover:text-brand-primary transition-colors">Injection Day Rescue Kit</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-bold mb-6 tracking-widest text-xs text-brand-primary uppercase">Support</h4>
              <ul className="space-y-4 text-sm text-brand-light/70">
                <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Contact Us</Link></li>
                <li><a href="#faq" className="hover:text-brand-primary transition-colors">Shipping & Returns</a></li>
                <li><a href="#faq" className="hover:text-brand-primary transition-colors">FAQs</a></li>
                <li><a href="#faq" className="hover:text-brand-primary transition-colors">Track Your Order</a></li>
              </ul>
            </div>

          </div>

          {/* Disclaimer */}
          <div className="border-t border-brand-primary/10 pt-10 text-center">
            <p className="text-xs text-gray-400 leading-relaxed max-w-4xl mx-auto mb-6">
              These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Not affiliated with, endorsed by, or sponsored by Novo Nordisk, Eli Lilly, or any pharmaceutical manufacturer. Consult your healthcare provider before starting any new supplement regimen, especially if taking prescription medication.
            </p>
            <p className="text-xs text-gray-500 font-serif">
              &copy; 2026 SmoothDescent. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;