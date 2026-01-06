import React from 'react';
import { ShieldCheck, Award, FlaskConical, RefreshCw, Truck, Heart } from 'lucide-react';

const BADGES = [
    { icon: ShieldCheck, text: "Formulated for GLP-1 Users" },
    { icon: Award, text: "60-Day Money-Back Guarantee" },
    { icon: FlaskConical, text: "Made in cGMP Certified Facility" },
    { icon: RefreshCw, text: "Subscribe & Save 20%" },
    { icon: Truck, text: "Free Shipping Over $50" },
    { icon: Heart, text: "1,000+ Happy Customers" }
];

const TrustMarquee: React.FC = () => {
    return (
        <div className="bg-brand-dark py-5 overflow-hidden whitespace-nowrap border-y border-brand-primary/20 relative z-20">
            <div className="inline-flex items-center animate-marquee hover:[animation-play-state:paused]">
                {/* Render badges 4 times to ensure smooth loop on wide screens */}
                {[...Array(4)].map((_, setIndex) => (
                    <div key={setIndex} className="flex items-center">
                        {BADGES.map((badge, i) => (
                            <div key={`${setIndex}-${i}`} className="flex items-center px-8 md:px-12 group">
                                <badge.icon
                                    size={20}
                                    className="text-brand-primary mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                                    strokeWidth={2}
                                />
                                <span className="text-white font-medium text-sm md:text-base tracking-wide font-sans whitespace-nowrap">
                                    {badge.text}
                                </span>
                                <div className="h-4 w-px bg-white/20 ml-8 md:ml-12" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustMarquee;
