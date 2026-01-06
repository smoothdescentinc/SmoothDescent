import React from 'react';
import { PROMISE_COPY } from '../constants';
import { ShieldCheck } from 'lucide-react';

const PromiseSection: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-brand-cream rounded-3xl p-8 md:p-12 shadow-inner border border-brand-primary/10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-brand-dark rounded-full mb-6 shadow-sm">
                        <ShieldCheck className="w-6 h-6" />
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

export default PromiseSection;
