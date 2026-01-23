import React from 'react';
import { Star, CheckCircle2, Award } from 'lucide-react';

const DoctorSection: React.FC = () => {
    return (
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-brand-cream">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <p className="text-brand-primary font-bold tracking-widest text-[10px] sm:text-xs uppercase mb-2 sm:mb-3">
                        Expert-Recommended
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Trusted by Healthcare Professionals
                    </h2>
                </div>

                {/* Doctor Card - Featured */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-brand-primary/20 p-5 sm:p-8 md:p-12 shadow-lg relative overflow-hidden">

                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-brand-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2" />

                    <div className="relative flex flex-col md:flex-row items-center md:items-start gap-5 sm:gap-8">

                        {/* Doctor Photo */}
                        <div className="flex-shrink-0">
                            <div className="relative">
                                <img
                                    src="/images/DoctorPhoto.png"
                                    alt="Dr. Sarah Jenkins"
                                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-3 sm:border-4 border-brand-secondary shadow-xl"
                                />
                                {/* Verified Badge */}
                                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-brand-dark text-white p-1.5 sm:p-2 rounded-full shadow-lg">
                                    <CheckCircle2 size={16} className="sm:w-5 sm:h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow text-center md:text-left">

                            {/* Stars */}
                            <div className="flex justify-center md:justify-start text-amber-400 mb-3 sm:mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className="sm:w-5 sm:h-5" fill="currentColor" strokeWidth={0} />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-base sm:text-xl md:text-2xl text-brand-dark leading-relaxed mb-4 sm:mb-6 font-serif italic">
                                "Most of my patients quit GLP-1 medications within the first month because of side effects they don't know how to manage. Dehydration, nausea, and digestive issues are predictable and preventable. I recommend SmoothDescent because their formulas are specifically designed for delayed gastric emptying — not just repackaged supplements with a new label."
                            </blockquote>

                            {/* Doctor Info */}
                            <div className="border-t border-brand-primary/10 pt-4 sm:pt-6">
                                <p className="font-bold text-base sm:text-lg text-brand-dark">Dr. Sarah Jenkins, MD</p>
                                <p className="text-brand-dark/60 text-xs sm:text-sm mb-2 sm:mb-3">Board-Certified in Obesity Medicine</p>

                                {/* Credentials */}
                                <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 text-[10px] sm:text-xs">
                                    <span className="bg-brand-secondary/30 text-brand-dark px-2 sm:px-3 py-1 rounded-full font-medium flex items-center gap-1">
                                        <Award size={10} className="sm:w-3 sm:h-3" /> 15+ Years Experience
                                    </span>
                                    <span className="bg-brand-secondary/30 text-brand-dark px-2 sm:px-3 py-1 rounded-full font-medium">
                                        500+ GLP-1 Patients
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default DoctorSection;
