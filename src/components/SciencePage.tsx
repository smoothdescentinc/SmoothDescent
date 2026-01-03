import React from 'react';
import { Beaker, Quote, Leaf, Zap, Pill } from 'lucide-react';

const SciencePage: React.FC = () => {
    return (
        <div className="bg-brand-light min-h-screen pt-12 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-3 block">
                        The Evidence
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-brand-dark font-bold mb-6">
                        Detailed Science Sections
                    </h1>
                    <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto">
                        Understanding the physiological mechanisms behind SmoothDescent formulas.
                    </p>
                </div>

                <div className="space-y-20">

                    {/* GASTRIC SHIELD+ */}
                    <section id="hydration" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-primary/10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                <Zap className="w-6 h-6 text-yellow-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">
                                GASTRIC SHIELD+ HYDRATION POWDER
                            </h2>
                        </div>

                        <div className="prose prose-lg text-brand-dark/80 max-w-none">
                            <h3 className="text-xl font-bold text-brand-dark mb-4">The Hydration Paradox: Why Water Isn't Enough</h3>

                            <div className="bg-brand-light/50 p-6 rounded-xl mb-8 border-l-4 border-brand-primary">
                                <strong className="block text-brand-dark mb-2">The Problem:</strong>
                                GLP-1 medications slow gastric emptying by up to 70%. When you drink plain water or standard electrolyte drinks, they pool in your stomach with nowhere to go. The result? That heavy, sloshing feeling that makes you MORE nauseous, not less.
                            </div>

                            <h4 className="text-lg font-bold text-brand-dark mb-4 mt-8">The Science Behind Micro-Solubility:</h4>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h5 className="font-bold text-brand-dark mb-2">Isotonic Osmolality (280-300 mOsm/L)</h5>
                                    <p className="text-sm">Our electrolyte ratio mirrors your blood plasma exactly. This means the solution passes through the stomach lining via osmosis without requiring normal gastric emptying. Standard sports drinks are hypertonic (350+ mOsm/L), which actually pulls MORE water into your already-slow stomach.</p>
                                </div>
                                <div>
                                    <h5 className="font-bold text-brand-dark mb-2">Sodium-Potassium-Magnesium Precision Balance</h5>
                                    <ul className="text-sm list-disc pl-4 space-y-1">
                                        <li><strong>Sodium (200mg):</strong> Critical for fluid retention at the cellular level. GLP-1 users lose sodium fast due to diuresis.</li>
                                        <li><strong>Potassium (150mg):</strong> Supports muscle function and prevents weakness.</li>
                                        <li><strong>Magnesium (50mg):</strong> Supports hydration and gentle bowel motility.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h5 className="font-bold text-brand-dark mb-2">Vitamin B6 (Pyridoxine) - 10mg</h5>
                                <p>Clinical research shows B6 at therapeutic doses (10-25mg) reduces nausea by modulating serotonin receptors in the brain's vomiting center (chemoreceptor trigger zone). This isn't just hydration—it's neurological nausea defense.</p>
                            </div>

                            <div className="mb-8">
                                <h5 className="font-bold text-brand-dark mb-2">Citric Acid & Natural Lemonade Flavor</h5>
                                <p>Not just for taste. Citric acid stimulates salivary enzymes and creates a pH environment that reduces gastric distress. Lemon has been used for centuries to settle stomachs because it WORKS.</p>
                            </div>

                            <div className="bg-brand-dark text-white p-6 rounded-xl my-8">
                                <h5 className="font-bold text-brand-primary mb-2">Clinical Insight:</h5>
                                <p className="italic">"Standard electrolyte formulas assume normal gastric function. For GLP-1 users, that assumption is catastrophically wrong. Isotonic, micro-soluble formulations are the only logical solution."</p>
                            </div>
                        </div>
                    </section>

                    {/* DIGESTIVE ENZYMES */}
                    <section id="enzymes" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-primary/10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                <Leaf className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">
                                DIGESTIVE ENZYME PRO BLEND
                            </h2>
                        </div>

                        <div className="prose prose-lg text-brand-dark/80 max-w-none">
                            <h3 className="text-xl font-bold text-brand-dark mb-4">The Fermentation Problem: Why Food Sits Like a Brick</h3>

                            <div className="bg-brand-light/50 p-6 rounded-xl mb-8 border-l-4 border-brand-primary">
                                <strong className="block text-brand-dark mb-2">The Problem:</strong>
                                Your stomach is now a "holding tank". Food sits for 8-12+ hours instead of 2-4. Warm, stagnant food ferments, causing sulfur burps, bloating, and rotten egg smells.
                            </div>

                            <h4 className="text-lg font-bold text-brand-dark mb-4 mt-8">The Science Behind Enzyme Replacement Therapy:</h4>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h5 className="font-bold text-brand-dark mb-1">Protease (50,000 HUT)</h5>
                                    <p className="text-sm">Breaks down protein. Stops putrefaction (the root cause of sulfur burps).</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h5 className="font-bold text-brand-dark mb-1">Lipase (3,000 FIP)</h5>
                                    <p className="text-sm">Breaks down fats. Fatty foods trigger even more slowing; Lipase helps them pass significantly faster.</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h5 className="font-bold text-brand-dark mb-1">Amylase (5,000 DU)</h5>
                                    <p className="text-sm">Breaks down carbs/starches to prevent bloating from fermentation.</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h5 className="font-bold text-brand-dark mb-1">Ginger Root (100mg)</h5>
                                    <p className="text-sm">Stimulates smooth muscle (motility) to encourage the stomach to empty.</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h5 className="font-bold text-brand-dark mb-2">Bromelain & Papain</h5>
                                <p>Proteolytic enzymes from pineapple and papaya that target protein digestion and reduce GI inflammation.</p>
                            </div>

                            <div className="bg-brand-dark text-white p-6 rounded-xl my-8">
                                <h5 className="font-bold text-brand-primary mb-2">Clinical Insight:</h5>
                                <p className="italic">"Sulfur burps aren't just embarrassing—they're a sign of bacterial overgrowth from stagnant food. Enzyme supplementation is the mechanical solution to a mechanical problem."</p>
                            </div>
                        </div>
                    </section>

                    {/* STRIPS */}
                    <section id="strips" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-primary/10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Pill className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">
                                DIGESTIVE + GUT HEALTH STRIPS
                            </h2>
                        </div>

                        <div className="prose prose-lg text-brand-dark/80 max-w-none">
                            <h3 className="text-xl font-bold text-brand-dark mb-4">The "Anywhere, Anytime" Nausea Defense</h3>

                            <div className="bg-brand-light/50 p-6 rounded-xl mb-8 border-l-4 border-brand-primary">
                                <strong className="block text-brand-dark mb-2">The Problem:</strong>
                                Nausea doesn't wait. When your stomach is delayed, swallowing a pill means waiting 1-2 hours for relief. You need something faster.
                            </div>

                            <h4 className="text-lg font-bold text-brand-dark mb-4 mt-8">The Science Behind Sublingual Delivery:</h4>
                            <p className="mb-6">The tissue under your tongue is incredibly vascular. Active ingredients absorb directly into the bloodstream in 10-30 seconds—bypassing the stomach entirely. This is the fastest non-injectable route.</p>

                            <div className="space-y-4 mb-8">
                                <div className="flex gap-4">
                                    <div className="w-1 bg-brand-primary/30 rounded-full"></div>
                                    <div>
                                        <h5 className="font-bold text-brand-dark">Ginger Root (50mg)</h5>
                                        <p className="text-sm">Active gingerols hit the brain's nausea center in under 60 seconds.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1 bg-brand-primary/30 rounded-full"></div>
                                    <div>
                                        <h5 className="font-bold text-brand-dark">Peppermint Oil (10mg)</h5>
                                        <p className="text-sm">Menthol relaxes GI smooth muscle (antispasmodic) and overrides nausea signals.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1 bg-brand-primary/30 rounded-full"></div>
                                    <div>
                                        <h5 className="font-bold text-brand-dark">L-Theanine (25mg)</h5>
                                        <p className="text-sm">Promotes calm without sedation. Reduces the anxiety component of nausea ("Am I going to throw up?").</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-brand-dark text-white p-6 rounded-xl my-8">
                                <h5 className="font-bold text-brand-primary mb-2">Clinical Insight:</h5>
                                <p className="italic">"For acute nausea episodes, speed matters. Sublingual delivery isn't just convenient—it's mechanically superior to oral pills for delayed emptying."</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default SciencePage;
