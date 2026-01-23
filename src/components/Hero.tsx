import React from 'react';
import Button from './Button';
import { Check, ShieldCheck, Star, Stethoscope, ClipboardCheck, Leaf, Award, Truck, Heart, FlaskConical, RefreshCw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import DoctorCard from './DoctorCard';

const MARQUEE_ITEMS = [
  { icon: ShieldCheck, text: "Formulated for GLP-1 Users" },
  { icon: Award, text: "30-Day Money-Back Guarantee" },
  { icon: FlaskConical, text: "cGMP Certified" },
  { icon: Truck, text: "Free Shipping $50+" },
  { icon: Heart, text: "10,000+ Happy Customers" },
  { icon: RefreshCw, text: "Subscribe & Save 20%" },
];

const TRUST_SEALS = [
  { icon: Stethoscope, label: 'Physician Formulated' },
  { icon: ClipboardCheck, label: 'Third-Party Tested' },
  { icon: Leaf, label: 'Clean Ingredients' },
  { icon: Award, label: 'Made in USA' },
];

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-light pt-8 pb-0 lg:pt-12 lg:pb-0 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-16 items-center">

          {/* Visual (Mobile: Order 1, Desktop: Order 2) */}
          <div className="w-full order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white mx-auto w-full transform transition-transform hover:scale-[1.01] duration-500">
              <img
                src="/images/MainHero.png"
                alt="Thriving on the journey"
                className="w-full h-auto scale-[1.05]"
              />
            </div>

            {/* Doctor Trusted Card (Below Image - Desktop Only) */}
            <div className="mt-6 hidden lg:flex justify-center">
              <DoctorCard className="max-w-md shadow-lg border-2" />
            </div>
          </div>

          {/* Content (Mobile: Order 2, Desktop: Order 1) */}
          <div className="w-full order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">

            {/* Specialization Tag */}
            <div className="mb-4">
              <span className="inline-block bg-brand-dark text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                The GLP-1 Support Specialists
              </span>
            </div>

            {/* Rating */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-4 animate-fade-in">
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl/[1.1] font-serif font-bold text-brand-dark tracking-tight mb-6">
              You Spent $1,000 on the Medication. <br className="hidden lg:block" />
              <span className="text-brand-primary">Don't Let Side Effects Waste That Investment.</span>
            </h1>

            {/* Dual CTA Buttons */}
            <div className="w-full sm:max-w-lg lg:max-w-none mb-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 bg-brand-dark hover:bg-brand-primary text-white font-bold text-base py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Shop Best Sellers
                <span className="text-lg">→</span>
              </button>
              <Link
                to="/science"
                className="flex-1 bg-white hover:bg-brand-cream text-brand-dark font-bold text-base py-4 px-6 rounded-full border-2 border-brand-dark/20 hover:border-brand-dark transition-all flex items-center justify-center gap-2"
              >
                How It Works
              </Link>
            </div>

            {/* Guarantee */}
            <div className="flex items-center gap-2 text-brand-dark font-bold text-base justify-center w-full mb-6 mt-2">
              <ShieldCheck className="w-6 h-6 text-brand-primary" />
              <span>30-Day Money-Back Guarantee</span>
            </div>

            {/* Words / List */}
            <div className="bg-white/50 rounded-2xl p-6 border border-brand-primary/10 w-full mb-6 text-left">
              <p className="font-bold text-brand-dark mb-4 text-lg">Shop Solutions For:</p>
              <ul className="space-y-3 mb-4">
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

            {/* Doctor Trusted Card (Mobile Only - Bottom of Content) */}
            <div className="w-full lg:hidden mt-2 mb-8">
              <DoctorCard className="shadow-lg border-2" />
            </div>

          </div>

        </div>
      </div>

      {/* Trust Seals - Elegant Ribbon */}
      <div className="relative mt-10 mb-0">
        {/* Decorative line above */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-secondary to-transparent" />

        <div className="bg-gradient-to-b from-brand-cream/80 to-brand-light py-4 md:py-5 overflow-x-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center items-center gap-x-0 min-w-max">
              {TRUST_SEALS.map((seal, index) => {
                const Icon = seal.icon;
                return (
                  <React.Fragment key={index}>
                    <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 group cursor-default">
                      <div className="relative flex-shrink-0">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-brand-secondary/60 to-brand-secondary/20 flex items-center justify-center ring-1 ring-brand-secondary/30 group-hover:ring-brand-primary/50 transition-all duration-300">
                          <Icon size={12} className="md:w-[15px] md:h-[15px] text-brand-dark" strokeWidth={1.8} />
                        </div>
                      </div>
                      <span className="text-brand-dark/90 font-medium text-[10px] md:text-sm tracking-wide whitespace-nowrap">
                        {seal.label}
                      </span>
                    </div>
                    {index < TRUST_SEALS.length - 1 && (
                      <div className="flex items-center justify-center w-4 md:w-6 flex-shrink-0">
                        <Sparkles size={8} className="md:w-2.5 md:h-2.5 text-brand-secondary" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Decorative line below */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-secondary to-transparent" />
      </div>

      {/* Scrolling Marquee - Luxe Dark Bar */}
      <div className="relative bg-brand-dark overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

        {/* Gradient edges for seamless loop feel */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />

        <div className="py-3.5 md:py-4 whitespace-nowrap">
          <div className="inline-flex items-center animate-marquee hover:[animation-play-state:paused]">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center">
                {MARQUEE_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={`${setIndex}-${i}`} className="flex items-center px-5 md:px-8 group">
                      <div className="w-6 h-6 rounded-full bg-brand-primary/15 flex items-center justify-center mr-2.5 group-hover:bg-brand-primary/25 transition-colors duration-300">
                        <Icon
                          size={13}
                          className="text-brand-primary"
                          strokeWidth={2}
                        />
                      </div>
                      <span className="text-white/90 font-medium text-[13px] tracking-wide whitespace-nowrap group-hover:text-white transition-colors duration-300">
                        {item.text}
                      </span>
                      <div className="w-1 h-1 rounded-full bg-brand-primary/40 ml-5 md:ml-8" />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;