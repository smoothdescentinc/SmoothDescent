import React from 'react';
import { Zap, Droplet, Leaf, Shield, Check, X, Clock, Activity, Star } from 'lucide-react';

const HydrationContent: React.FC = () => {
    return (
        <div className="w-full">

            {/* 0. Doctor Advisor Card */}
            <section className="bg-white py-12 border-b border-brand-dark/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl border-2 border-[#5D8B75]/30 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-sm">
                        <div className="flex-shrink-0">
                            <img
                                src="/images/DoctorPhoto.png"
                                alt="Dr. Sarah Jenkins"
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-brand-cream shadow-md"
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-3 justify-center md:justify-start flex-wrap">
                                <h3 className="text-xl font-bold font-serif text-brand-dark">Meet Our Expert Advisor</h3>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="stroke-none" />)}
                                </div>
                            </div>
                            <p className="text-lg text-brand-dark/80 italic mb-4 text-center md:text-left leading-relaxed">
                                "I've reviewed many hydration formulas, and Gastric Shield+ consistently ranks at the top of my list for GLP-1 patients. Its micro-solubility and isotonic balance are exactly what the stomach needs."
                            </p>
                            <p className="font-bold text-[#5D8B75] text-center md:text-left">Dr. Sarah Jenkins</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 1. Benefits Grid */}
            <section className="py-16 bg-[#F2F7F5] border-y border-brand-dark/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#5D8B75]">
                                <Droplet size={32} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-dark">Micro-Soluble</h3>
                                <p className="text-sm text-brand-dark/70">Absorbs instantly</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#5D8B75]">
                                <Zap size={32} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-dark">Zero Sugar</h3>
                                <p className="text-sm text-brand-dark/70">Wont spike insulin</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#5D8B75]">
                                <Leaf size={32} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-dark">Stomach Friendly</h3>
                                <p className="text-sm text-brand-dark/70">PH Balanced</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#5D8B75]">
                                <Shield size={32} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-dark">Doctor Vetted</h3>
                                <p className="text-sm text-brand-dark/70">Clinical dosages</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. Science / Origin */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video md:aspect-auto md:h-[500px]">
                            {/* Using a nice placeholder that looks like 'source' or 'pure' */}
                            <img
                                src="/images/GastricShield.png"
                                alt="Gastric Shield Source"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <h3 className="text-2xl font-bold font-serif mb-2">Sourced for Purity</h3>
                                    <p className="opacity-90">Micro-batch blended in FDA-registered USA facilities.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark leading-tight">
                                The Science of<br />
                                <span className="text-[#5D8B75]">Gastric Shield+</span>
                            </h2>
                            <p className="text-lg text-brand-dark/70 leading-relaxed">
                                Most hydration powders are designed for runners, not GLP-1 users. They overload you with sugar and excessive sodium, causing more bloating. Gastric Shield+ is precision-engineered to absorb passively through the stomach lining, bypassing the gastric delay.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-4xl font-bold text-[#5D8B75] mb-1">3x</h4>
                                    <p className="font-bold text-brand-dark">Faster Absorption</p>
                                    <p className="text-sm text-brand-dark/60">Than water alone</p>
                                </div>
                                <div>
                                    <h4 className="text-4xl font-bold text-[#5D8B75] mb-1">0g</h4>
                                    <p className="font-bold text-brand-dark">Sugar Added</p>
                                    <p className="text-sm text-brand-dark/60">Monk fruit sweetened</p>
                                </div>
                                <div>
                                    <h4 className="text-4xl font-bold text-[#5D8B75] mb-1">500<span className="text-xl">mg</span></h4>
                                    <p className="font-bold text-brand-dark">Sodium</p>
                                    <p className="text-sm text-brand-dark/60">Perfect isotonic balance</p>
                                </div>
                                <div>
                                    <h4 className="text-4xl font-bold text-[#5D8B75] mb-1">B6</h4>
                                    <p className="font-bold text-brand-dark">Nausea Defense</p>
                                    <p className="text-sm text-brand-dark/60">Clinical dose added</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Ingredient Breakdown */}
            <section className="py-20 bg-brand-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">60+ Mineral Complex</h2>
                        <p className="max-w-2xl mx-auto text-brand-dark/70">Whatever your body is losing, we put it back. In the most bioavailable form possible.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Magnesium", role: "Muscle Function", icon: Activity },
                            { title: "Potassium", role: "Blood Pressure", icon: Activity },
                            { title: "Sodium", role: "Fluid Balance", icon: Droplet },
                            { title: "Vitamin B6", role: "Anti-Nausea", icon: Shield }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-primary/5 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-[#E8F1ED] text-[#5D8B75] flex items-center justify-center mb-4">
                                    <item.icon size={20} />
                                </div>
                                <h3 className="font-bold text-xl text-brand-dark mb-1">{item.title}</h3>
                                <p className="text-brand-dark/60 text-sm">{item.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Comparison Table */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-serif font-bold text-center text-brand-dark mb-12">Clean Formula. Better Results.</h2>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="grid grid-cols-3 bg-brand-dark text-white font-bold p-4 text-sm md:text-base">
                            <div className="col-span-1">Feature</div>
                            <div className="col-span-1 text-center text-[#5D8B75]">Gastric Shield+</div>
                            <div className="col-span-1 text-center opacity-70">Others</div>
                        </div>

                        {[
                            { feature: "Sugar Free", us: true, them: false },
                            { feature: "Isotonic Osmolality", us: true, them: false },
                            { feature: "Vitamin B6", us: true, them: false },
                            { feature: "Stomach Friendly", us: true, them: false },
                            { feature: "Price per serving", us: "$1.26", them: "$2.50+" }
                        ].map((row, i) => (
                            <div key={i} className={`grid grid-cols-3 p-4 border-b border-gray-100 items-center ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}>
                                <div className="font-medium text-brand-dark text-sm md:text-base">{row.feature}</div>
                                <div className="text-center font-bold text-[#5D8B75] flex justify-center">
                                    {row.us === true ? <Check size={20} /> : row.us}
                                </div>
                                <div className="text-center text-gray-400 flex justify-center">
                                    {row.them === false ? <X size={20} /> : row.them}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. How To Use */}
            <section className="py-20 bg-[#F2F7F5]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-brand-dark mb-16">Simple Daily Protocol</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-2xl font-bold font-serif text-[#5D8B75] shadow-sm mb-6">1</div>
                            <h3 className="text-xl font-bold text-brand-dark mb-2">Scoop</h3>
                            <p className="text-brand-dark/70">One scoop of powder.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-2xl font-bold font-serif text-[#5D8B75] shadow-sm mb-6">2</div>
                            <h3 className="text-xl font-bold text-brand-dark mb-2">Mix</h3>
                            <p className="text-brand-dark/70">Dissolve in 16oz cold water.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-2xl font-bold font-serif text-[#5D8B75] shadow-sm mb-6">3</div>
                            <h3 className="text-xl font-bold text-brand-dark mb-2">Drink</h3>
                            <p className="text-brand-dark/70">Sip slowly upon waking.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HydrationContent;
