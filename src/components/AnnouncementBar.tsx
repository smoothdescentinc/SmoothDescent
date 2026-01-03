import React from 'react';
import { Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
    onOpen: () => void;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpen }) => {
    return (
        <button
            onClick={onOpen}
            className="w-full bg-brand-dark text-white py-2.5 px-4 text-center relative overflow-hidden z-50 hover:bg-brand-dark/90 transition-colors cursor-pointer block"
        >
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-wide animate-fade-in">
                <Sparkles className="w-4 h-4 text-brand-primary fill-current hidden sm:block" />
                <p>
                    <span>A New Year's resolution you won't quit by February 1st. </span>
                    <span className="font-bold text-brand-primary ml-1 underline decoration-brand-primary/50 underline-offset-4">Click to Unlock 15% Off</span>
                </p>
                <Sparkles className="w-4 h-4 text-brand-primary fill-current hidden sm:block" />
            </div>
        </button>
    );
};

export default AnnouncementBar;
