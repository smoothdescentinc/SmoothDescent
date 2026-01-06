import React from 'react';
import { Star } from 'lucide-react';

const DoctorCard: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <div className={`bg-white rounded-2xl border border-brand-primary/20 p-4 sm:p-6 flex flex-row items-start gap-4 sm:gap-6 shadow-sm text-left ${className}`}>
            <div className="flex-shrink-0 pt-1">
                <img
                    src="/images/DoctorPhoto.png"
                    alt="Dr. Sarah Jenkins"
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border-2 sm:border-4 border-brand-light shadow-sm"
                />
            </div>
            <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-x-2 mb-1 sm:mb-2">
                    <h3 className="font-bold font-serif text-brand-dark text-base sm:text-lg leading-tight">Expert Advisor</h3>
                    <div className="flex text-[#D4AF37]">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" className="stroke-none" />)}
                    </div>
                </div>
                <p className="text-brand-dark/80 italic mb-2 leading-relaxed text-xs sm:text-sm">
                    "Smooth Descent creates the gold standard for GLP-1 support. I trust their precise formulations to keep my patients hydrated, comfortable, and successful on their weight loss journey."
                </p>
                <p className="font-bold text-xs sm:text-sm text-brand-primary uppercase tracking-wider">Dr. Sarah Jenkins</p>
            </div>
        </div>
    );
};

export default DoctorCard;
