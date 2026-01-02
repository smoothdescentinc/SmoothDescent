import React from 'react';
import { HERO_COPY } from '../constants';
import Button from './Button';
import { Check, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-light pt-12 pb-16 lg:pt-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-brand-dark uppercase bg-brand-secondary/30 rounded-full">
              {HERO_COPY.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-brand-dark tracking-tight leading-[1.1] mb-6">
              {HERO_COPY.headline}
            </h1>
            <p className="text-lg sm:text-xl text-brand-dark/80 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              {HERO_COPY.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <a href="#products" className="w-full sm:w-auto">
                <Button fullWidth>{HERO_COPY.ctaPrimary}</Button>
              </a>
              <Link to="/quiz" className="w-full sm:w-auto">
                <Button variant="outline" fullWidth>{HERO_COPY.ctaSecondary}</Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 text-sm font-medium text-brand-dark/60">
              {HERO_COPY.trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 mr-2 bg-brand-success/20 p-1 rounded-full text-brand-dark">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative rounded-t-[100px] rounded-b-[40px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] sm:aspect-square lg:aspect-[4/5] mx-auto max-w-md lg:max-w-none">
              <img
                src="https://picsum.photos/id/338/800/1000"
                alt="Healthy lifestyle"
                className="w-full h-full object-cover"
              />

              {/* Float Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-brand-primary/10">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-primary/10 p-2.5 rounded-full text-brand-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark font-serif text-base">Doctor Trusted</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Safe for daily use</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 -right-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-secondary/30 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;