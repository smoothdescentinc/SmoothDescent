import React from 'react';
import { FEATURES, VALUE_PROPS_COPY, PROMISE_COPY } from '../constants';
import { FlaskConical, Leaf, Heart } from 'lucide-react';

const icons = {
  beaker: FlaskConical,
  leaf: Leaf,
  heart: Heart
};

const ValueProps: React.FC = () => {
  return (
    <section id="difference" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4">
            {VALUE_PROPS_COPY.headline}
          </h2>
          <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
            {VALUE_PROPS_COPY.subheadline}
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {FEATURES.map((feature, idx) => {
            const Icon = icons[feature.icon];
            return (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-brand-light transition-colors duration-300">
                  <Icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold font-serif text-brand-dark mb-4">{feature.title}</h3>
                <p className="text-brand-dark/70 leading-relaxed px-4">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Guarantee */}
        <div className="bg-brand-cream rounded-3xl p-8 md:p-12 shadow-inner border border-brand-primary/10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-brand-dark rounded-full mb-6 shadow-sm">
            <ShieldCheckIcon />
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-brand-dark mb-6">
            {PROMISE_COPY.headline}
          </h2>
          <p className="text-lg text-brand-dark/80 leading-relaxed mb-8 font-light">
            {PROMISE_COPY.body}
          </p>
          <div className="inline-block px-4 py-2 border border-brand-dark rounded-full text-sm font-bold text-brand-dark uppercase tracking-widest">
            30 Day Money Back Guarantee
          </div>
        </div>

      </div>
    </section>
  );
};

const ShieldCheckIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default ValueProps;