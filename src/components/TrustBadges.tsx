import React from 'react';
import { Stethoscope, ClipboardCheck, Leaf, Award } from 'lucide-react';

const badges = [
    {
        icon: Stethoscope,
        label: 'Physician Formulated',
    },
    {
        icon: ClipboardCheck,
        label: 'Third-Party Tested',
    },
    {
        icon: Leaf,
        label: 'No Artificial Ingredients',
    },
    {
        icon: Award,
        label: 'Made in the USA',
    },
];

const TrustBadges: React.FC = () => {
    return (
        <section className="bg-gradient-to-b from-brand-cream to-brand-secondary/20 py-8 md:py-10 border-y border-brand-secondary/30">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {badges.map((badge, index) => {
                        const Icon = badge.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-white/70 backdrop-blur-sm rounded-xl border border-brand-primary/10 px-4 py-5 md:py-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-white hover:shadow-md hover:border-brand-primary/30 hover:-translate-y-0.5"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-dark/5 flex items-center justify-center mb-3 group-hover:bg-brand-primary/10 transition-colors duration-300">
                                    <Icon
                                        size={20}
                                        className="text-brand-dark group-hover:text-brand-dark transition-colors md:w-6 md:h-6"
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <span className="text-brand-dark font-semibold text-xs md:text-sm uppercase tracking-wider leading-tight">
                                    {badge.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
