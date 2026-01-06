import React from 'react';
import { FEATURES, VALUE_PROPS_COPY } from '../constants';
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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

      </div>
    </section>
  );
};

export default ValueProps;