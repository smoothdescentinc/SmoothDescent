import React from 'react';
import { Star } from 'lucide-react';

const DoctorCard: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <div className={`bg-white rounded-2xl border border-brand-primary/20 p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-sm ${className}`}>
            <div className="flex-shrink-0">
                <img
                    src="/images/DoctorPhoto.png"
                    alt="Dr. Sarah Jenkins"
                    className="w-20 h-20 rounded-full object-cover border-4 border-brand-light shadow-sm"
                />
            </div>
            <div className="text-center sm:text-left flex-grow">
                <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                    <h3 className="font-bold font-serif text-brand-dark text-lg">Meet Our Expert Advisor</h3>
                    <div className="flex text-[#D4AF37]">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="stroke-none" />)}
                    </div>
                </div>
                <p className="text-brand-dark/80 italic mb-2 leading-relaxed text-sm">
                    "Smooth Descent creates the gold standard for GLP-1 support. I trust their precise formulations to keep my patients hydrated, comfortable, and successful on their weight loss journey."
                </p>
                <p className="font-bold text-sm text-brand-primary uppercase tracking-wider">Dr. Sarah Jenkins</p>
            </div>
        </div>
    );
};

export default DoctorCard;
