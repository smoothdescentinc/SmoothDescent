import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Loader2, Check } from 'lucide-react';
import { captureUserEmail } from '../lib/pixelUserData';

interface NewsletterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
    const [step, setStep] = useState<'segmentation' | 'email' | 'phone' | 'success'>('segmentation');
    const [selectedGoal, setSelectedGoal] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading'>('idle');

    // Reset flow when reopening
    useEffect(() => {
        if (isOpen && step === 'success') {
            // Optional: keep success state or reset? Usually reset if they closed and reopened for some reason, 
            // but if they just signed up, maybe keep success? 
            // Let's not auto-reset for now to avoid losing the code if they accidentally close.
        }
    }, [isOpen]);

    const handleGoalSelect = (goal: string) => {
        setSelectedGoal(goal);
        setStep('email');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === 'email') {
            if (!email) return;
            // Capture and hash email for Meta Pixel
            await captureUserEmail(email);
            setStep('phone');
        }

        if (step === 'phone') {
            if (!phone) return;
            setStatus('loading');

            try {
                // Submit data
                await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, phone, goal: selectedGoal }),
                });
                setStep('success');
            } catch (error) {
                setStep('success');
            } finally {
                setStatus('idle');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-md animate-fade-in">
            <div className="bg-[#FAF7F2] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-pop-in">

                {/* Close Button */}
                {/* Close Button - High Contrast */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg text-brand-dark hover:bg-brand-primary hover:text-white transition-all border border-gray-100 opacity-90 hover:opacity-100"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">

                    {step !== 'success' && (
                        <>
                            <p className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-3">
                                The Metabolic Resolution
                            </p>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4 leading-tight">
                                Unlock Your <br />
                                <span className="text-brand-primary">15% Off</span>
                            </h2>
                        </>
                    )}

                    {step === 'segmentation' && (
                        <div className="animate-fade-in">
                            <p className="text-brand-dark/70 font-medium mb-6">
                                To claim, tell us your main health goal:
                            </p>
                            <div className="space-y-3">
                                {['Weight Management', 'Reduce Bloating', 'More Energy', 'Better Digestion'].map((goal) => (
                                    <button
                                        key={goal}
                                        onClick={() => handleGoalSelect(goal)}
                                        className="w-full p-4 bg-white border border-brand-primary/20 rounded-xl text-left font-medium text-brand-dark hover:border-brand-primary hover:bg-brand-primary/5 hover:translate-x-1 transition-all flex items-center justify-between group"
                                    >
                                        {goal}
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary" />
                                    </button>
                                ))}
                            </div>
                            <button onClick={onClose} className="mt-6 text-xs text-center w-full text-brand-dark/40 underline hover:text-brand-dark">
                                No thanks, I don't like savings
                            </button>
                        </div>
                    )}

                    {(step === 'email' || step === 'phone') && (
                        <form onSubmit={handleSubmit} className="animate-fade-in">
                            <p className="text-brand-dark/70 font-medium mb-6">
                                {step === 'email' ? 'Great choice. Enter your email to reveal your code:' : 'Almost done. Enter your number to secure your code:'}
                            </p>

                            {step === 'email' && (
                                <div className="space-y-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Address"
                                        className="w-full p-4 bg-white border border-brand-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark placeholder:text-brand-dark/30"
                                        required
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-primary transition-colors flex items-center justify-center gap-2"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            )}

                            {step === 'phone' && (
                                <div className="space-y-4">
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Phone Number"
                                        className="w-full p-4 bg-white border border-brand-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark placeholder:text-brand-dark/30"
                                        required
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-primary transition-colors flex items-center justify-center gap-2"
                                    >
                                        {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Unlock My 15% Off'}
                                    </button>
                                </div>
                            )}
                        </form>
                    )}

                    {step === 'success' && (
                        <div className="text-center animate-fade-in py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">
                                You're In!
                            </h2>
                            <p className="text-brand-dark/80 mb-6">
                                Use code <span className="font-bold text-2xl text-brand-primary block mt-2 border-2 border-dashed border-brand-primary/30 py-2 rounded-lg bg-brand-primary/5 select-all">SMOOTH15</span>
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full px-8 py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-primary transition-all mb-8 shadow-lg"
                            >
                                Shop Now
                            </button>

                            <div className="border-t border-brand-primary/10 pt-6">
                                <p className="text-sm text-brand-dark/60 mb-3">Unsure what you need?</p>
                                <a
                                    href="/#/quiz"
                                    onClick={onClose}
                                    className="text-brand-primary font-bold hover:underline flex items-center justify-center gap-2 group text-sm"
                                >
                                    Take the 60-second quiz to find your match
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    )}

                </div>

                {/* Right Side: Image/Visual */}
                <div className="hidden md:block w-1/2 bg-brand-dark relative overflow-hidden">
                    {/* Abstract Shapes or Placeholder Image */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367563-12123d8959c9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 to-transparent"></div>

                    <div className="absolute bottom-12 left-12 right-12 text-white">
                        <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <svg key={i} className="w-4 h-4 text-brand-primary fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="font-serif text-2xl italic leading-relaxed mb-4">
                            "I've never felt more energetic. This 15% off was just the cherry on top."
                        </p>
                        <p className="text-sm font-bold tracking-widest uppercase text-brand-primary">
                            Sarah J. - Verified Buyer
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
