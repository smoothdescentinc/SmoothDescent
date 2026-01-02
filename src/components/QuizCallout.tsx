import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const QuizCallout: React.FC = () => {
  return (
    <section className="bg-brand-secondary/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif text-brand-dark mb-4 leading-tight">
              Unsure which protocol is right for you?
            </h2>
            <p className="text-lg text-brand-dark/70 max-w-xl">
              Take our 60-second assessment. We'll analyze your specific side effects and recommend a personalized defense plan tailored to your phase of treatment.
            </p>
          </div>

          <div className="flex-shrink-0">
             <Link to="/quiz">
                <Button className="px-10 py-5">
                   Find Your Match
                </Button>
             </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuizCallout;