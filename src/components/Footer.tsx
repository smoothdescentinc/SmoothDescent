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
                <li><Link to="/shop" className="hover:text-brand-primary transition-colors">Shop All</Link></li>
                <li><Link to="/science" className="hover:text-brand-primary transition-colors">Benefits</Link></li>
                <li><Link to="/quiz" className="hover:text-brand-primary transition-colors">Take the Quiz</Link></li>
                <li><Link to="/?section=reviews" className="hover:text-brand-primary transition-colors">Reviews</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-bold mb-6 tracking-widest text-xs text-brand-primary uppercase">Shop</h4>
              <ul className="space-y-4 text-sm text-brand-light/70">
                <li><Link to="/product/hydration" className="hover:text-brand-primary transition-colors">Gastric Shield+ Hydration</Link></li>
                <li><Link to="/product/digestive-enzymes" className="hover:text-brand-primary transition-colors">Digestive Enzyme Pro Blend</Link></li>
                <li><Link to="/product/nausea-strips" className="hover:text-brand-primary transition-colors">Digestive + Gut Health Strips</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-bold mb-6 tracking-widest text-xs text-brand-primary uppercase">Support</h4>
              <ul className="space-y-4 text-sm text-brand-light/70">
                <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/?section=reviews" className="hover:text-brand-primary transition-colors">Reviews</Link></li>
              </ul>
            </div>

          </div>

          {/* FDA Disclaimer */}
          <div className="border-t border-brand-primary/10 pt-10 text-center">
            <div className="bg-brand-dark/50 border border-brand-primary/20 rounded-lg p-6 max-w-5xl mx-auto mb-6">
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                No statements found on the smoothdescent.com site or advertised by SmoothDescent have been approved by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Testimonials found at smoothdescent.com are unverified results, and may not reflect the typical purchaser's experience, may not apply to the average person, and are not intended to represent or guarantee that anyone will achieve the same or similar results.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Information on the SmoothDescent site is provided for informational purposes only. It is not meant to substitute for medical advice from your physician or other medical professional. You should not use the information contained herein for diagnosing or treating a health problem or disease, or prescribing any medication. Carefully read all product documentation. If you have or suspect that you have a medical problem, promptly contact your regular health care provider.
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Not affiliated with, endorsed by, or sponsored by Novo Nordisk, Eli Lilly, or any pharmaceutical manufacturer.
            </p>
            <p className="text-xs text-gray-500 font-serif mt-4">
              &copy; 2026 SmoothDescent. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;