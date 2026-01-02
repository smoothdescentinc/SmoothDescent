import React, { useState } from 'react';
import { FAQS } from '../constants';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-brand-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4">
            Your Questions, Answered
          </h2>
          <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
            Everything you need to know about ordering, using, and getting results from SmoothDescent products.
          </p>
        </div>

        <div className="space-y-12">
          {FAQS.map((category, catIdx) => (
            <div key={catIdx}>
              <h3 className="text-xl font-bold font-serif text-brand-dark mb-6 pl-2 border-l-4 border-brand-primary">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.items.map((item, itemIdx) => {
                  const indexKey = `${catIdx}-${itemIdx}`;
                  const isOpen = openIndex === indexKey;

                  return (
                    <div
                      key={itemIdx}
                      className={`bg-white rounded-xl border transition-all duration-300 ${isOpen ? 'border-brand-primary/30 shadow-md' : 'border-transparent shadow-sm hover:shadow-md'}`}
                    >
                      <button
                        onClick={() => toggleFAQ(indexKey)}
                        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 focus:outline-none"
                      >
                        <span className={`font-medium text-lg pr-4 ${isOpen ? 'text-brand-primary' : 'text-brand-dark'}`}>
                          {item.question}
                        </span>
                        <div className={`flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          {isOpen ? <Minus className="h-5 w-5 text-brand-primary" /> : <Plus className="h-5 w-5 text-gray-400" />}
                        </div>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="px-6 pb-6 text-brand-dark/80 leading-relaxed space-y-4 border-t border-gray-100/50 pt-4 mx-2">
                          {item.answer.map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-brand-dark/60 mb-4">Can't find your answer?</p>
          <a href="mailto:support@smoothdescent.com" className="font-bold text-brand-primary hover:text-brand-accent transition-colors border-b border-brand-primary/20 hover:border-brand-primary">
            Contact Support
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQ;