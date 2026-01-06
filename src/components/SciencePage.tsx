import React from 'react';
import { Beaker, Leaf, Zap, Pill, ArrowRight, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const SciencePage: React.FC = () => {
    // Safety check: ensure PRODUCTS is defined and is an array
    const inventory = (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) ? PRODUCTS : [];

    const hydrationProduct = inventory.find(p => p.id === 'hydration');
    const enzymesProduct = inventory.find(p => p.id === 'digestive-enzymes');
    const stripsProduct = inventory.find(p => p.id === 'nausea-strips');

    // If critical data is missing, we can return null or a skeleton, but let's try to render what we can
    const hasData = hydrationProduct && enzymesProduct && stripsProduct;

    return (
        <div className="bg-brand-light min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-20">
                    <span className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-3 block">
                        The Evidence
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-brand-dark font-bold mb-6">
                        Scientific Mechanisms
                    </h1>
                    <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto leading-relaxed">
                        Understanding the physiological impact of GLP-1 medications and how targeted nutrition restores balance.
                    </p>
                </div>

                <div className="space-y-32">

                    {/* GASTRIC SHIELD+ */}
                    <section id="hydration" className="scroll-mt-24">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                            {/* Content Side */}
                            <div className="lg:col-span-7 order-1 lg:order-1">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <h2 className="text-3xl font-serif font-bold text-brand-dark">
                                        The Hydration Paradox
                                    </h2>
                                </div>

                                <div className="prose prose-lg text-brand-dark/80 max-w-none">
                                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-primary/10 mb-10">
                                        <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                                            <span className="text-brand-primary">01.</span> The Problem
                                        </h3>
                                        <p className="m-0">
                                            GLP-1 medications slow gastric emptying by up to 70%. When you drink plain water or standard electrolyte drinks, they pool in your stomach with nowhere to go. The result? That heavy, sloshing feeling that makes you MORE nauseous, not less.
                                        </p>
                                    </div>

                                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">The Mechanism of Action</h3>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold text-brand-dark mb-2 text-lg">Isotonic Osmolality (280-300 mOsm/L)</h4>
                                            <p>Our electrolyte ratio mirrors your blood plasma exactly. This means the solution passes through the stomach lining via osmosis without requiring normal gastric emptying. Standard sports drinks are hypertonic (350+ mOsm/L), which actually pulls MORE water into your already-slow stomach.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-brand-dark mb-2 text-lg">Precision Electrolyte Balance</h4>
                                            <ul className="list-none space-y-3 pl-0">
                                                <li className="flex gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 flex-shrink-0"></span>
                                                    <span><strong>Sodium (200mg):</strong> Critical for fluid retention. GLP-1 users lose sodium fast due to diuresis.</span>
                                                </li>
                                                <li className="flex gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 flex-shrink-0"></span>
                                                    <span><strong>Potassium (150mg):</strong> Prevents muscle weakness and fatigue.</span>
                                                </li>
                                                <li className="flex gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 flex-shrink-0"></span>
                                                    <span><strong>Magnesium (50mg):</strong> Supports hydration and bowel motility.</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-brand-dark mb-2 text-lg">Neurological Nausea Defense</h4>
                                            <p>Clinical research shows Vitamin B6 at therapeutic doses (10-25mg) reduces nausea by modulating serotonin receptors in the brain's vomiting center (chemoreceptor trigger zone). This isn't just hydration. It's a neurological intervention.</p>
                                        </div>
                                    </div>

                                    <div className="bg-brand-dark text-white p-8 rounded-2xl mt-12 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-10">
                                            <Quote size={80} />
                                        </div>
                                        <p className="text-lg font-medium italic relative z-10">"Standard electrolyte formulas assume normal gastric function. For GLP-1 users, that assumption is catastrophically wrong. Isotonic, micro-soluble formulation is the only logical solution."</p>
                                    </div>
                                </div>
                            </div>

                            {/* Product Card Side */}
                            <div className="lg:col-span-5 order-2 lg:order-2 lg:sticky lg:top-32">
                                <div className="bg-white rounded-3xl p-6 shadow-xl shadow-brand-dark/5 border border-brand-primary/10">
                                    <div className="aspect-square bg-gray-100 rounded-2xl mb-6 overflow-hidden">
                                        <img src={hydrationProduct?.image} alt={hydrationProduct?.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-serif font-bold text-xl text-brand-dark leading-tight mb-2">{hydrationProduct?.name}</h3>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-brand-primary fill-current" />
                                                ))}
                                                <span className="text-sm text-brand-dark/60 ml-2">({hydrationProduct?.reviews} reviews)</span>
                                            </div>
                                        </div>
                                        <span className="font-bold text-xl text-brand-dark">${hydrationProduct?.price}</span>
                                    </div>
                                    <Link to={`/product/${hydrationProduct?.id}`} className="block w-full">
                                        <button className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-primary transition-all flex items-center justify-center gap-2 group">
                                            Shop Protocol
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* DIGESTIVE ENZYMES */}
                    <section id="enzymes" className="scroll-mt-24">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                            {/* Content Side */}
                            <div className="lg:col-span-7 order-1 lg:order-1">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <Leaf className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h2 className="text-3xl font-serif font-bold text-brand-dark">
                                        The Fermentation Problem
                                    </h2>
                                </div>

                                <div className="prose prose-lg text-brand-dark/80 max-w-none">
                                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-primary/10 mb-10">
                                        <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                                            <span className="text-brand-primary">02.</span> The Problem
                                        </h3>
                                        <p className="m-0">
                                            Your stomach acts as a "holding tank" where food sits for 8-12+ hours instead of the normal 2-4. Warm, stagnant food ferments, creating sulfur gas (rotten egg burps), severe bloating, and inflammatory distress.
                                        </p>
                                    </div>

                                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">Enzyme Replacement Therapy</h3>

                                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                        <div className="bg-brand-cream/50 p-6 rounded-xl border border-brand-primary/5">
                                            <h4 className="font-bold text-brand-dark mb-2">Protease (50,000 HUT)</h4>
                                            <p className="text-sm">Breaks down protein into amino acids before they putrefy. This is the direct cure for sulfur burps.</p>
                                        </div>
                                        <div className="bg-brand-cream/50 p-6 rounded-xl border border-brand-primary/5">
                                            <h4 className="font-bold text-brand-dark mb-2">Lipase (3,000 FIP)</h4>
                                            <p className="text-sm">Predigests fats. Fatty foods cause the most significant gastric slowing; lipase accelerates their passage.</p>
                                        </div>
                                        <div className="bg-brand-cream/50 p-6 rounded-xl border border-brand-primary/5">
                                            <h4 className="font-bold text-brand-dark mb-2">Amylase (5,000 DU)</h4>
                                            <p className="text-sm">Rapidly degrades carbohydrates to prevent starch fermentation and gas bloating.</p>
                                        </div>
                                        <div className="bg-brand-cream/50 p-6 rounded-xl border border-brand-primary/5">
                                            <h4 className="font-bold text-brand-dark mb-2">Ginger Root (100mg)</h4>
                                            <p className="text-sm">Prokinetic agent. Stimulates gastric smooth muscle to mechanically empty the stomach.</p>
                                        </div>
                                    </div>

                                    <div className="bg-brand-dark text-white p-8 rounded-2xl mt-12 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-10">
                                            <Quote size={80} />
                                        </div>
                                        <p className="text-lg font-medium italic relative z-10">"Sulfur burps aren't just embarrassing. They're a sign of bacterial overgrowth. Enzyme supplementation is the mechanical solution to a mechanical problem."</p>
                                    </div>
                                </div>
                            </div>

                            {/* Product Card Side */}
                            <div className="lg:col-span-5 order-2 lg:order-2 lg:sticky lg:top-32">
                                <div className="bg-white rounded-3xl p-6 shadow-xl shadow-brand-dark/5 border border-brand-primary/10">
                                    <div className="aspect-square bg-gray-100 rounded-2xl mb-6 overflow-hidden">
                                        <img src={enzymesProduct?.image} alt={enzymesProduct?.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-serif font-bold text-xl text-brand-dark leading-tight mb-2">{enzymesProduct?.name}</h3>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-brand-primary fill-current" />
                                                ))}
                                                <span className="text-sm text-brand-dark/60 ml-2">({enzymesProduct?.reviews} reviews)</span>
                                            </div>
                                        </div>
                                        <span className="font-bold text-xl text-brand-dark">${enzymesProduct?.price}</span>
                                    </div>
                                    <Link to={`/product/${enzymesProduct?.id}`} className="block w-full">
                                        <button className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-primary transition-all flex items-center justify-center gap-2 group">
                                            Shop Protocol
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* STRIPS */}
                    <section id="strips" className="scroll-mt-24">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                            {/* Content Side */}
                            <div className="lg:col-span-7 order-1 lg:order-1">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Pill className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-3xl font-serif font-bold text-brand-dark">
                                        Sublingual Nausea Defense
                                    </h2>
                                </div>

                                <div className="prose prose-lg text-brand-dark/80 max-w-none">
                                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-primary/10 mb-10">
                                        <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                                            <span className="text-brand-primary">03.</span> The Problem
                                        </h3>
                                        <p className="m-0">
                                            Nausea strikes without warning. When your stomach is delayed, swallowing a traditional anti-nausea pill means waiting 1-2 hours for it to dissolve and absorb. You need relief in minutes, not hours.
                                        </p>
                                    </div>

                                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">Why Sublingual Works</h3>
                                    <p className="mb-8">
                                        The mucosa under the tongue is highly vascularized. Dissolvable strips bypass the digestive system entirely, delivering active ingredients directly into the bloodstream in 10-30 seconds.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0 text-brand-primary font-bold text-sm">1</div>
                                            <div>
                                                <h4 className="font-bold text-brand-dark">Ginger Root Extract (50mg)</h4>
                                                <p className="text-sm">Bioactive gingerols reach the brain's chemotrigger zone in under 60 seconds to block nausea signals.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0 text-brand-primary font-bold text-sm">2</div>
                                            <div>
                                                <h4 className="font-bold text-brand-dark">Peppermint Oil (10mg)</h4>
                                                <p className="text-sm">Acts as a rapid antispasmodic, relaxing the smooth muscles of the esophagus and stomach.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0 text-brand-primary font-bold text-sm">3</div>
                                            <div>
                                                <h4 className="font-bold text-brand-dark">L-Theanine (25mg)</h4>
                                                <p className="text-sm">Neutralizes the anxiety/panic response often triggered by public nausea ("Am I going to be sick here?").</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-brand-dark text-white p-8 rounded-2xl mt-12 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-10">
                                            <Quote size={80} />
                                        </div>
                                        <p className="text-lg font-medium italic relative z-10">"For acute nausea, speed is the only metric that matters. Sublingual delivery isn't just a convenience. It is mechanically superior."</p>
                                    </div>
                                </div>
                            </div>

                            {/* Product Card Side */}
                            <div className="lg:col-span-5 order-2 lg:order-2 lg:sticky lg:top-32">
                                <div className="bg-white rounded-3xl p-6 shadow-xl shadow-brand-dark/5 border border-brand-primary/10">
                                    <div className="aspect-square bg-gray-100 rounded-2xl mb-6 overflow-hidden">
                                        <img src={stripsProduct?.image} alt={stripsProduct?.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-serif font-bold text-xl text-brand-dark leading-tight mb-2">{stripsProduct?.name}</h3>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-brand-primary fill-current" />
                                                ))}
                                                <span className="text-sm text-brand-dark/60 ml-2">({stripsProduct?.reviews} reviews)</span>
                                            </div>
                                        </div>
                                        <span className="font-bold text-xl text-brand-dark">${stripsProduct?.price}</span>
                                    </div>
                                    <Link to={`/product/${stripsProduct?.id}`} className="block w-full">
                                        <button className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-primary transition-all flex items-center justify-center gap-2 group">
                                            Shop Protocol
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default SciencePage;
