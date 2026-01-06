import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const QuizCallout: React.FC = () => {
  return (
    <section className="bg-brand-cream py-20 border-y border-brand-dark/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Text Content */}
          <div className="text-center md:text-left order-2 md:order-1">
            <span className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-2 block">
              Personalized Nutrition
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-dark mb-6 leading-tight">
              Unsure which protocol is <span className="italic relative z-10 before:absolute before:inset-x-0 before:bottom-2 before:h-3 before:bg-brand-primary/20 before:-z-10">right for you?</span>
            </h2>
            <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
              Take our 60-second assessment. We'll analyze your specific side effects and recommend a personalized defense plan tailored to your phase of treatment.
            </p>

            <Link to="/quiz">
              <button className="bg-brand-dark hover:bg-brand-primary text-white px-10 py-4 rounded-full font-bold tracking-widest text-sm uppercase transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Take The Quiz
              </button>
            </Link>
          </div>

          {/* Image Side */}
          <div className="relative order-1 md:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform md:rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
              <img
                src="/images/QuizImage.png"
                alt="Take the Smooth Descent Quiz"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent mix-blend-overlay pointer-events-none"></div>
            </div>
            {/* Decorative element behind */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-primary/5 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuizCallout;