import React from 'react';

const UsVsThem: React.FC = () => {
    return (
        <section className="bg-white py-12 lg:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl lg:text-5xl font-serif font-bold text-center text-brand-dark mb-10 lg:mb-14">
                    Why Thousands Choose Smooth Descent
                </h2>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-primary/10 max-w-5xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
                    {/* Image is large (4.8MB), we display it fully */}
                    <img
                        src="/images/USvsThemImage.png"
                        alt="Us vs The Competition Comparison"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </section>
    );
};

export default UsVsThem;
