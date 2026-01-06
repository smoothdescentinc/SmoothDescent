import React from 'react';
import Button from './Button';
import { Check, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-light pt-8 pb-16 lg:pt-24 lg:pb-32 font-sans px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Visual (Mobile: Order 1, Desktop: Order 2) */}
          <div className="w-full order-1 lg:order-2">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white mx-auto max-w-lg lg:max-w-none transform transition-transform hover:scale-[1.01] duration-500">
              <img
                src="/images/MainHero.png"
                alt="Thriving on the journey"
                className="w-full h-auto"
              />

              {/* Desktop Float Overlay */}
              <div className="absolute bottom-6 left-6 right-6 hidden lg:flex items-center gap-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-brand-primary/10">
                <div className="bg-brand-primary/10 p-2 rounded-full text-brand-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-brand-dark font-serif">Doctor Trusted</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Safe for daily use</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content (Mobile: Order 2, Desktop: Order 1) */}
          <div className="w-full order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">

            {/* Rating */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-6 animate-fade-in">
              <div className="flex gap-0.5 text-brand-primary">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-brand-dark/80 font-medium text-sm sm:text-base">
                Join 10,000+ Users Thriving on Their Journey
              </span>
            </div>

            {/* Header */}
            {/* Header */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl/[1.1] font-serif font-bold text-brand-dark tracking-tight mb-8">
              You Spent $1,000 on the Medication. <br className="hidden lg:block" />
              <span className="text-brand-primary">Don't Let Side Effects Waste That Investment.</span>
            </h1>

            {/* Mobile/Tablet Order: Button comes BEFORE the words/list on mobile as per user request */}
            <div className="w-full sm:max-w-md lg:max-w-none mb-4">
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-brand-dark hover:bg-brand-primary text-white font-bold text-lg py-5 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Shop New Year's Sale
              </button>
            </div>

            {/* Guarantee */}
            <div className="flex items-center gap-2 text-brand-dark/70 font-medium text-sm justify-center lg:justify-start w-full mb-8">
              <ShieldCheck className="w-5 h-5 text-brand-primary" />
              <span>30-Day Money-Back Guarantee</span>
            </div>

            {/* Words / List */}
            <div className="bg-white/50 rounded-2xl p-6 border border-brand-primary/10 w-full mb-8 text-left">
              <p className="font-bold text-brand-dark mb-4 text-lg">Shop Solutions For:</p>
              <ul className="space-y-3 mb-6">
                {[
                  'Post-injection nausea and "Sunday Scaries"',
                  'Dehydration headaches that feel like hangovers',
                  'Food sitting like a brick in your stomach',
                  'Muscle loss and "skinny fat" concerns',
                  'Hair shedding and low energy'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 min-w-[1.25rem] h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="text-brand-dark/80 font-medium leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-brand-dark/70 italic leading-relaxed border-t border-brand-dark/5 pt-4">
                "Micro-solubility formulas designed for sensitive, slowed stomachs. Because your body deserves the same investment as your prescription."
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;