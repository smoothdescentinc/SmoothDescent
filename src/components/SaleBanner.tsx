import React, { useState, useEffect } from 'react';
import { X, Clock, ArrowRight } from 'lucide-react';

const SALE_DURATION_MINUTES = 10; // Sale lasts 10 minutes from first visit
const SALE_VERSION = 'v3'; // Change this to reset all timers

const SaleBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Check if dismissed this session
        if (sessionStorage.getItem('sale_banner_dismissed')) {
            setIsDismissed(true);
            return;
        }

        // Check version - reset timer if version changed
        const storedVersion = localStorage.getItem('sale_version');
        if (storedVersion !== SALE_VERSION) {
            localStorage.removeItem('sale_end_time');
            localStorage.setItem('sale_version', SALE_VERSION);
        }

        // Get or set sale end time
        let saleEndTime = localStorage.getItem('sale_end_time');
        if (!saleEndTime) {
            const endTime = Date.now() + (SALE_DURATION_MINUTES * 60 * 1000);
            localStorage.setItem('sale_end_time', endTime.toString());
            saleEndTime = endTime.toString();
        }

        const endTimeMs = parseInt(saleEndTime);

        // Update countdown
        const updateCountdown = () => {
            const now = Date.now();
            const diff = endTimeMs - now;

            if (diff <= 0) {
                // Reset timer for new visitors (rolling sale)
                const newEndTime = Date.now() + (SALE_DURATION_MINUTES * 60 * 1000);
                localStorage.setItem('sale_end_time', newEndTime.toString());
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        // Show banner after scrolling 400px
        const handleScroll = () => {
            if (window.scrollY > 400 && !isDismissed) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isDismissed]);

    const handleDismiss = () => {
        setIsDismissed(true);
        setIsVisible(false);
        sessionStorage.setItem('sale_banner_dismissed', 'true');
    };

    const scrollToProducts = () => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (!isVisible || isDismissed) return null;

    const pad = (n: number) => n.toString().padStart(2, '0');

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
            <div className="bg-brand-dark text-white">
                <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">

                        {/* Left: Sale Message */}
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex w-10 h-10 bg-brand-primary rounded-full items-center justify-center animate-pulse">
                                <Clock size={20} />
                            </div>
                            <div className="text-center md:text-left">
                                <p className="font-bold text-sm md:text-base">
                                    Limited Time Sale — Up to 60% Off
                                </p>
                                <p className="text-white/70 text-xs md:text-sm">
                                    Free shipping on orders over $50
                                </p>
                            </div>
                        </div>

                        {/* Center: Countdown Timer */}
                        <div className="flex items-center gap-1 md:gap-2">
                            <span className="text-white/70 text-xs uppercase tracking-wider mr-2 hidden sm:inline">Ends in:</span>
                            <div className="flex gap-1 md:gap-2">
                                <div className="bg-white/10 rounded-lg px-2 md:px-3 py-1 md:py-2 text-center min-w-[40px] md:min-w-[50px]">
                                    <span className="text-lg md:text-2xl font-bold font-mono">{pad(timeLeft.hours)}</span>
                                    <span className="text-[10px] md:text-xs text-white/60 block -mt-1">HRS</span>
                                </div>
                                <span className="text-xl md:text-2xl font-bold self-start mt-1">:</span>
                                <div className="bg-white/10 rounded-lg px-2 md:px-3 py-1 md:py-2 text-center min-w-[40px] md:min-w-[50px]">
                                    <span className="text-lg md:text-2xl font-bold font-mono">{pad(timeLeft.minutes)}</span>
                                    <span className="text-[10px] md:text-xs text-white/60 block -mt-1">MIN</span>
                                </div>
                                <span className="text-xl md:text-2xl font-bold self-start mt-1">:</span>
                                <div className="bg-white/10 rounded-lg px-2 md:px-3 py-1 md:py-2 text-center min-w-[40px] md:min-w-[50px]">
                                    <span className="text-lg md:text-2xl font-bold font-mono">{pad(timeLeft.seconds)}</span>
                                    <span className="text-[10px] md:text-xs text-white/60 block -mt-1">SEC</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: CTA */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={scrollToProducts}
                                className="bg-brand-primary hover:bg-brand-accent text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
                            >
                                Shop Now
                                <ArrowRight size={16} />
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Dismiss"
                            >
                                <X size={18} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaleBanner;
