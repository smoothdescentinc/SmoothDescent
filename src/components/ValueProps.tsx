import React from 'react';
import { FEATURES, VALUE_PROPS_COPY } from '../constants';
import { FlaskConical, Leaf, Heart, ArrowRight, Check } from 'lucide-react';

const icons = {
  beaker: FlaskConical,
  leaf: Leaf,
  heart: Heart
};

const ValueProps: React.FC = () => {
  return (
    <section id="difference" className="py-12 sm:py-20 md:py-28 bg-gradient-to-b from-white via-brand-cream/50 to-white relative overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-block bg-brand-dark text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            Why We're Different
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-4 sm:mb-6">
            {VALUE_PROPS_COPY.headline}
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-brand-dark/70 max-w-2xl mx-auto leading-relaxed px-2">
            {VALUE_PROPS_COPY.subheadline}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = icons[feature.icon as keyof typeof icons];
            const highlights = feature.description.split('. ').slice(0, 2);

            return (
              <div
                key={idx}
                className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm border border-brand-primary/10 hover:shadow-xl hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Card Number */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-4xl sm:text-6xl font-serif font-bold text-brand-secondary/20 select-none">
                  0{idx + 1}
                </div>

                {/* Icon */}
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon size={22} className="sm:w-7 sm:h-7" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-3 sm:mb-4 pr-10 sm:pr-12">
                  {feature.title}
                </h3>

                {/* Description as bullet points */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {highlights.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3">
                      <div className="mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-secondary/30 flex items-center justify-center flex-shrink-0">
                        <Check size={10} className="sm:w-3 sm:h-3 text-brand-dark" strokeWidth={3} />
                      </div>
                      <p className="text-brand-dark/70 text-xs sm:text-sm leading-relaxed">
                        {point.trim()}{!point.endsWith('.') && '.'}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary to-brand-accent rounded-b-xl sm:rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="/#/science"
            className="inline-flex items-center gap-2 text-brand-dark font-bold hover:text-brand-primary transition-colors group"
          >
            Learn More About Our Science
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ValueProps;
