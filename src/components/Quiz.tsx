import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from '../constants';
import Button from './Button';
import { Check, Loader2, Calendar, TrendingDown, Target, HelpCircle, AlertCircle, Droplets, BicepsFlexed, Sparkles, Scale, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { QuizResult } from '../types';

// Icon mapping helper
const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'calendar': return <Calendar className="h-6 w-6" />;
    case 'chart': return <TrendingDown className="h-6 w-6" />;
    case 'target': return <Target className="h-6 w-6" />;
    case 'question': return <HelpCircle className="h-6 w-6" />;
    case 'nausea': return <AlertCircle className="h-6 w-6" />;
    case 'water': return <Droplets className="h-6 w-6" />;
    case 'muscle': return <BicepsFlexed className="h-6 w-6" />;
    case 'hair': return <Sparkles className="h-6 w-6" />;
    case 'scale': return <Scale className="h-6 w-6" />;
    default: return null;
  }
};

const Quiz: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const navigate = useNavigate();

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;

  const determineResult = (finalAnswers: Record<number, string>): QuizResult => {
    const phase = finalAnswers[1];
    const pain = finalAnswers[2];
    const commitment = finalAnswers[3];

    // Priority 1: Research/Low Intent (Catch-all)
    if (commitment === 'commitment_research') {
      return QUIZ_RESULTS['researcher'];
    }

    // Priority 2: Specific Pain & Phase Combinations
    if (phase === 'phase_acclimation' && pain === 'pain_nausea') {
      return QUIZ_RESULTS['injection_day_survivor'];
    }
    if (pain === 'pain_bloating') {
      return QUIZ_RESULTS['digestive_defender'];
    }
    if (pain === 'pain_public_nausea') {
      return QUIZ_RESULTS['nausea_navigator'];
    }

    // Priority 3: Broad Pain Logic
    if (pain === 'pain_dehydration') {
      return QUIZ_RESULTS['hydration_hero'];
    }

    // Default Fallbacks
    if (pain === 'pain_nausea') return QUIZ_RESULTS['injection_day_survivor'];
    if (pain === 'pain_muscle_loss') return QUIZ_RESULTS['maintenance_planner']; // Pivot to digestion support for absorption
    if (pain === 'pain_regain') return QUIZ_RESULTS['maintenance_planner'];

    // Ultimate fallback
    return QUIZ_RESULTS['hydration_hero'];
  };

  const handleOptionSelect = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setIsAnalyzing(true);
      const finalResult = determineResult(newAnswers);
      setResult(finalResult);
    }
  };

  useEffect(() => {
    if (isAnalyzing) {
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        window.scrollTo(0, 0);
      }, 2000); // 2 second analysis delay
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing]);

  // --- RENDER: PRE-QUIZ LANDING PAGE ---
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6 leading-tight">
            Find Your Personalized Support Protocol
          </h1>
          <p className="text-xl text-brand-dark/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Answer 3 quick questions and we'll recommend the exact formulas designed for your current phase, challenges, and goals.
          </p>

          <div className="flex flex-col items-center gap-4 mb-12">
            <Button onClick={() => setHasStarted(true)} className="px-12 py-5 text-lg">
              Start the Quiz
            </Button>
            <p className="text-sm font-medium text-brand-dark/50 tracking-wide uppercase">
              Takes 60 seconds • No email required • Instant recommendations
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="bg-brand-cream aspect-[3/4] rounded-xl shadow-sm border border-brand-primary/10 overflow-hidden">
              <img src="/images/GastricShield.png" alt="" className="w-full h-full object-cover scale-[1.12]" />
            </div>
            <div className="bg-brand-cream aspect-[3/4] rounded-xl shadow-sm border border-brand-primary/10 overflow-hidden -mt-4">
              <img src="/images/DigestiveEnzyme.png" alt="" className="w-full h-full object-cover scale-[1.12]" />
            </div>
            <div className="bg-brand-cream aspect-[3/4] rounded-xl shadow-sm border border-brand-primary/10 overflow-hidden">
              <img src="/images/stripimage.png" alt="" className="w-full h-full object-cover scale-[1.12]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: RESULTS PAGE ---
  if (result && !isAnalyzing) {
    return (
      <div className="min-h-screen bg-brand-light py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-primary/20">

          {/* Result Header */}
          <div className="bg-brand-dark p-8 md:p-10 text-center text-brand-light relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl"></div>
            <h2 className="text-xl md:text-3xl font-serif mb-2">{result.headline}</h2>
            <p className="text-brand-secondary text-sm md:text-base font-medium tracking-wide uppercase">Analysis Complete</p>
          </div>

          <div className="p-6 md:p-12">
            <div className="flex flex-col lg:flex-row gap-12 items-start">

              {/* Product Visual */}
              <div className="w-full lg:w-5/12">
                <div className="bg-brand-cream rounded-2xl p-6 mb-6">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={result.products[0].image}
                      alt={result.products[0].name}
                      className="w-full h-auto object-cover scale-[1.12] transform hover:scale-[1.15] transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Testimonial Card */}
                <div className="bg-brand-accent/10 p-6 rounded-xl border border-brand-accent/20">
                  <div className="flex text-brand-secondary mb-3">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                  <p className="text-brand-dark italic mb-4 text-sm leading-relaxed">"{result.testimonial.quote}"</p>
                  <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">{result.testimonial.author}</p>
                </div>
              </div>

              {/* Copy & CTA */}
              <div className="w-full lg:w-7/12">
                <div className="inline-block px-3 py-1 bg-brand-secondary/20 text-brand-dark text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                  Recommended Protocol
                </div>

                <h3 className="text-2xl font-serif text-brand-dark mb-4 leading-tight">{result.subheadline}</h3>

                <div className="space-y-4 mb-8 text-brand-dark/80 leading-relaxed">
                  {result.bodyCopy.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Price Block */}
                <div className="flex items-center justify-between mb-8 p-5 bg-brand-light rounded-xl border border-brand-primary/20">
                  <span className="text-brand-dark font-medium">Your Investment:</span>
                  <div className="text-right">
                    {result.products[0].originalPrice && (
                      <span className="text-gray-400 line-through text-sm mr-2">${result.products[0].originalPrice}</span>
                    )}
                    <span className="text-3xl font-bold text-brand-dark font-serif">${result.products[0].price}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button fullWidth onClick={() => navigate(`/product/${result.products[0].id}`)}>
                    {result.ctaPrimary}
                  </Button>
                  <button
                    onClick={() => navigate(`/product/${result.products[0].id}`)}
                    className="text-center text-brand-dark hover:text-brand-primary font-medium text-sm transition-colors border-b border-transparent hover:border-brand-primary inline-block w-max mx-auto"
                  >
                    {result.ctaSecondary}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: LOADING STATE ---
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-4">
        <Loader2 className="h-16 w-16 text-brand-primary animate-spin mb-6" />
        <h2 className="text-3xl font-serif text-brand-dark mb-2">Analyzing your profile...</h2>
        <p className="text-gray-500">Matching your symptoms with clinical formulas.</p>
      </div>
    );
  }

  // --- RENDER: QUESTION STATE ---
  return (
    <div className="min-h-screen bg-brand-light py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold text-brand-dark/40 uppercase tracking-wider mb-2">
            <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-brand-secondary/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-brand-primary/10 p-6 md:p-10 transition-all duration-300">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-dark mb-3 text-center leading-tight">
            {currentQuestion.question}
          </h2>
          {currentQuestion.subheadline && (
            <p className="text-center text-gray-500 mb-8 max-w-lg mx-auto">{currentQuestion.subheadline}</p>
          )}

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option.value)}
                className="w-full p-6 text-left border-2 border-brand-cream rounded-xl hover:border-brand-primary hover:bg-brand-light transition-all duration-200 group flex items-start md:items-center justify-between gap-4 relative overflow-hidden"
              >
                <div className="flex items-center gap-4 w-full">
                  {option.icon && (
                    <div className="hidden md:flex flex-shrink-0 w-14 h-14 rounded-full bg-brand-light items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-light transition-colors">
                      {getIcon(option.icon)}
                    </div>
                  )}
                  <div className="flex-grow">
                    <span className="block text-lg font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                      {option.label}
                    </span>
                    {option.subLabel && (
                      <span className="block text-sm text-gray-500 mt-1 font-medium">{option.subLabel}</span>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0 h-6 w-6 rounded-full border-2 border-gray-200 group-hover:border-brand-primary group-hover:bg-brand-primary transition-colors flex items-center justify-center mt-1 md:mt-0">
                  <Check className="h-3 w-3 text-white opacity-0 group-hover:opacity-100" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-400 text-sm hover:text-brand-dark transition-colors border-b border-transparent hover:border-gray-400">Cancel Quiz</Link>
        </div>
      </div>
    </div>
  );
};

const StarIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default Quiz;