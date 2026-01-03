import React from 'react';
import { Sparkles } from 'lucide-react';

const AnnouncementBar: React.FC = () => {
    return (
        <div className="bg-brand-dark text-white py-2.5 px-4 text-center relative overflow-hidden z-50">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-wide animate-fade-in">
                <Sparkles className="w-4 h-4 text-brand-primary fill-current hidden sm:block" />
                <p>
                    <span>A New Year's resolution you won't quit by February 1st. </span>
                    <span className="font-bold text-brand-primary ml-1">Save 15% with code SMOOTH15</span>
                </p>
                <Sparkles className="w-4 h-4 text-brand-primary fill-current hidden sm:block" />
            </div>
        </div>
    );
};

export default AnnouncementBar;
