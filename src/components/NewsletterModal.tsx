import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Loader2, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { captureUserEmail } from '../lib/pixelUserData';
import { trackLead } from '../lib/metaPixel';

interface NewsletterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
    const navigate = useNavigate();
    const [step, setStep] = useState<'segmentation' | 'email' | 'phone' | 'success'>('segmentation');
    const [selectedGoal, setSelectedGoal] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading'>('idle');

    const handleClose = () => {
        onClose();
        navigate('/');
    };

    const handleGoalSelect = (goal: string) => {
        setSelectedGoal(goal);
        setStep('email');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === 'email') {
            if (!email) return;
            await captureUserEmail(email);
            setStep('phone');
        }

        if (step === 'phone') {
            if (!phone) return;
            setStatus('loading');

            try {
                await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, phone, goal: selectedGoal }),
                });
                trackLead(email, 0);
                setStep('success');
            } catch (error) {
                trackLead(email, 0);
                setStep('success');
            } finally {
                setStatus('idle');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-brand-light overflow-y-auto">
            {/* Close Button - Fixed */}
            <button
                onClick={handleClose}
                className="fixed top-4 right-4 z-50 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-brand-dark hover:bg-brand-dark hover:text-white transition-all"
                aria-label="Skip to homepage"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Full Page Layout */}
            <div className="min-h-screen flex flex-col lg:flex-row">

                {/* Left/Top - Image + Testimonial Section */}
                <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex flex-col">
                    {/* Image - No overlay, clean display */}
                    <div className="relative w-full h-[45vh] sm:h-[50vh] lg:flex-1">
                        <div className="absolute inset-0 bg-[url('/images/PopupImage.png')] bg-cover bg-top"></div>
                    </div>

                    {/* Testimonial Strip - Below image, not overlaid */}
                    <div className="bg-brand-dark px-5 py-4 lg:py-5">
                        <div className="flex items-center gap-4 max-w-lg mx-auto lg:mx-0">
                            <div className="flex gap-0.5 flex-shrink-0">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-brand-primary fill-current" />
                                ))}
                            </div>
                            <p className="text-white/90 text-sm lg:text-base italic">
                                "Finally, no more nausea after my shots. Game changer!" <span className="text-brand-primary font-semibold not-italic">— Sarah J.</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right/Bottom - Content Section */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-8 lg:py-0 lg:px-12 bg-brand-light">
                    <div className="w-full max-w-md">

                        {step !== 'success' && (
                            <>
                                <p className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-3">
                                    Welcome Gift
                                </p>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-dark mb-2 leading-tight">
                                    Unlock Your
                                </h1>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-primary mb-6">
                                    15% Off
                                </h2>
                            </>
                        )}

                        {step === 'segmentation' && (
                            <div className="animate-fade-in">
                                <p className="text-brand-dark/70 font-medium mb-6 text-base">
                                    To claim your discount, tell us your main health goal:
                                </p>
                                <div className="space-y-3">
                                    {['Weight Management', 'Reduce Bloating', 'More Energy', 'Better Digestion'].map((goal) => (
                                        <button
                                            key={goal}
                                            onClick={() => handleGoalSelect(goal)}
                                            className="w-full p-4 bg-white border-2 border-brand-primary/20 rounded-xl text-left font-semibold text-brand-dark hover:border-brand-primary hover:bg-brand-cream transition-all flex items-center justify-between group"
                                        >
                                            {goal}
                                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary" />
                                        </button>
                                    ))}
                                </div>
                                <button onClick={handleClose} className="mt-8 text-sm text-center w-full text-brand-dark/40 hover:text-brand-dark transition-colors">
                                    Skip for now →
                                </button>
                            </div>
                        )}

                        {(step === 'email' || step === 'phone') && (
                            <form onSubmit={handleSubmit} className="animate-fade-in">
                                <p className="text-brand-dark/70 font-medium mb-6 text-base">
                                    {step === 'email' ? 'Great choice! Enter your email to continue:' : 'Almost there! Enter your phone to secure your code:'}
                                </p>

                                {step === 'email' && (
                                    <div className="space-y-4">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email address"
                                            className="w-full p-4 bg-white border-2 border-brand-primary/20 rounded-xl focus:outline-none focus:border-brand-primary text-brand-dark placeholder:text-brand-dark/40 text-base"
                                            required
                                            autoFocus
                                        />
                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 text-base"
                                        >
                                            Continue <ArrowRight size={18} />
                                        </button>
                                    </div>
                                )}

                                {step === 'phone' && (
                                    <div className="space-y-4">
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Your phone number"
                                            className="w-full p-4 bg-white border-2 border-brand-primary/20 rounded-xl focus:outline-none focus:border-brand-primary text-brand-dark placeholder:text-brand-dark/40 text-base"
                                            required
                                            autoFocus
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-primary transition-colors flex items-center justify-center gap-2 text-base"
                                        >
                                            {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Get My 15% Off <ArrowRight size={18} /></>}
                                        </button>
                                    </div>
                                )}

                                <button type="button" onClick={() => setStep('segmentation')} className="mt-4 text-sm text-center w-full text-brand-dark/40 hover:text-brand-dark">
                                    ← Go back
                                </button>
                            </form>
                        )}

                        {step === 'success' && (
                            <div className="text-center animate-fade-in">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check className="w-10 h-10 text-green-600" />
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark mb-4">
                                    You're In!
                                </h1>
                                <p className="text-brand-dark/70 mb-6 text-base">
                                    Use this code at checkout:
                                </p>
                                <div className="bg-brand-cream border-2 border-dashed border-brand-primary/40 rounded-xl py-4 px-6 mb-8">
                                    <span className="font-bold text-3xl text-brand-primary select-all tracking-wider">SMOOTH15</span>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-primary transition-all shadow-lg text-base flex items-center justify-center gap-2"
                                >
                                    Start Shopping <ArrowRight size={18} />
                                </button>

                                <div className="mt-8 pt-6 border-t border-brand-primary/10">
                                    <p className="text-sm text-brand-dark/50 mb-3">Not sure what you need?</p>
                                    <a
                                        href="/#/quiz"
                                        onClick={onClose}
                                        className="text-brand-primary font-bold hover:underline inline-flex items-center gap-2 group"
                                    >
                                        Take the 60-second quiz
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
