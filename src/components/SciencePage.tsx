import React, { useState, useEffect } from 'react';
import { Droplets, Flame, Pill, Zap, ArrowRight, Star, Quote, Stethoscope, ClipboardCheck, Leaf, Award, CheckCircle2, ChevronDown, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, REVIEWS } from '../constants';

// Pain point navigator data
const painPoints = [
    { id: 'hydration', label: 'Nausea', icon: Zap },
    { id: 'hydration', label: 'Dehydration', icon: Droplets },
    { id: 'enzymes', label: 'Bloating', icon: Flame },
    { id: 'strips', label: 'Relief', icon: Pill },
];

// Trust badges
const trustBadges = [
    { icon: Stethoscope, label: 'Physician Formulated' },
    { icon: ClipboardCheck, label: 'Third-Party Tested' },
    { icon: Leaf, label: 'No Artificial Ingredients' },
    { icon: Award, label: 'Made in the USA' },
];

// FAQs
const faqs = [
    {
        question: "Is this safe to take with my GLP-1 medication?",
        answer: "Yes. All SmoothDescent products are nutritional supplements containing vitamins, minerals, and food-derived ingredients. They do not contain any pharmaceutical compounds that interact with GLP-1 receptor agonist medications."
    },
    {
        question: "How quickly will I see results?",
        answer: "Most users report feeling relief within the first use. Hydration improvements are typically felt within 30-60 minutes. Digestive enzyme benefits are immediate with meals. The strips work in under 60 seconds."
    },
    {
        question: "Can I take all three products together?",
        answer: "Absolutely. Our products are designed to work synergistically. Many users follow the complete protocol: Hydration daily, Enzymes before meals, and Strips as needed for breakthrough nausea."
    },
    {
        question: "What's your return policy?",
        answer: "30-Day Money Back Guarantee. If you're not satisfied, email us. You don't need to ship the product back. Even if the container is empty, we'll refund you. No questions asked."
    }
];

const SciencePage: React.FC = () => {
    const [activeSection, setActiveSection] = useState('hydration');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const inventory = (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) ? PRODUCTS : [];
    const reviews = (typeof REVIEWS !== 'undefined' && Array.isArray(REVIEWS)) ? REVIEWS : [];

    const hydrationProduct = inventory.find(p => p.id === 'hydration');
    const enzymesProduct = inventory.find(p => p.id === 'digestive-enzymes');
    const stripsProduct = inventory.find(p => p.id === 'nausea-strips');

    // Track scroll position for active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hydration', 'enzymes', 'strips'];
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="bg-brand-light min-h-screen">

            {/* Hero Section with Doctor */}
            <section className="relative pt-12 pb-8 md:pt-24 md:pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-cream to-brand-light" />
                <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />

                <div className="max-w-6xl mx-auto px-4 relative">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Left: Text Content */}
                        <div className="text-center lg:text-left">
                            <span className="inline-block bg-brand-dark text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                                The Science Behind Relief
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-dark mb-4 sm:mb-6 leading-tight">
                                How Our Formulas<br />
                                <span className="text-brand-primary">Actually Work</span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-brand-dark/70 leading-relaxed mb-6 sm:mb-8">
                                GLP-1 medications change how your body processes everything. Standard supplements weren't designed for this. Ours were.
                            </p>
                        </div>

                        {/* Right: Doctor Card */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl border border-brand-primary/10 max-w-md w-full">
                                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                                    <img
                                        src="/images/DoctorPhoto.png"
                                        alt="Dr. Sarah Jenkins"
                                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 sm:border-3 border-brand-primary/20 shadow-lg flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="font-bold text-brand-dark text-sm sm:text-base">Dr. Sarah Jenkins, MD</p>
                                        <p className="text-brand-dark/60 text-xs sm:text-sm">Board-Certified in Obesity Medicine</p>
                                        <div className="flex text-amber-400 mt-1">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />)}
                                        </div>
                                    </div>
                                </div>
                                <blockquote className="text-brand-dark/80 leading-relaxed italic border-l-4 border-brand-primary pl-3 sm:pl-4 text-sm sm:text-base">
                                    "Most of my patients quit GLP-1 medications within the first month because of side effects they don't know how to manage. I recommend SmoothDescent because their formulas are specifically designed for delayed gastric emptying."
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pain Point Navigator - Sticky */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-primary/10 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <p className="text-[10px] text-brand-dark/50 uppercase tracking-widest mb-2 text-center font-medium">
                        Find your solution
                    </p>
                    <div className="flex justify-center gap-2">
                        {painPoints.map((point, i) => {
                            const Icon = point.icon;
                            return (
                                <button
                                    key={i}
                                    onClick={() => scrollToSection(point.id)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-brand-dark text-white hover:bg-brand-primary transition-all"
                                >
                                    <Icon size={12} />
                                    {point.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <section className="py-10 bg-gradient-to-b from-white to-brand-cream/30 border-b border-brand-primary/10">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {trustBadges.map((badge, i) => {
                            const Icon = badge.icon;
                            return (
                                <div key={i} className="flex flex-col items-center text-center p-4">
                                    <div className="w-12 h-12 bg-brand-dark/5 rounded-full flex items-center justify-center mb-3">
                                        <Icon size={22} className="text-brand-dark" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                                        {badge.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-24">
                <div className="space-y-20 sm:space-y-32">

                    {/* HYDRATION SECTION */}
                    <section id="hydration" className="scroll-mt-28 sm:scroll-mt-32">
                        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
                            <div className="lg:col-span-7">
                                <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
                                        <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] sm:text-xs font-bold text-brand-primary uppercase tracking-widest">Solution #1</span>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                                            The Hydration Paradox
                                        </h2>
                                    </div>
                                </div>

                                {/* Problem Card */}
                                <div className="bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-brand-primary/10 mb-6 sm:mb-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">!</span>
                                        <h3 className="text-xl font-bold text-brand-dark">The Problem</h3>
                                    </div>
                                    <p className="text-brand-dark/80 leading-relaxed">
                                        GLP-1 medications slow gastric emptying by up to <strong>70%</strong>. When you drink plain water or standard electrolyte drinks, they pool in your stomach with nowhere to go. The result? That heavy, sloshing feeling that makes you MORE nauseous, not less.
                                    </p>
                                </div>

                                {/* Solution */}
                                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">The Mechanism of Action</h3>

                                <div className="space-y-6 mb-8">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-brand-secondary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 size={20} className="text-brand-dark" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark mb-1">Isotonic Osmolality (280-300 mOsm/L)</h4>
                                            <p className="text-brand-dark/70 text-sm">Our electrolyte ratio mirrors your blood plasma exactly. This means the solution passes through the stomach lining via osmosis without requiring normal gastric emptying.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-brand-secondary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 size={20} className="text-brand-dark" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark mb-1">Precision Electrolyte Balance</h4>
                                            <p className="text-brand-dark/70 text-sm">Sodium (200mg) for fluid retention, Potassium (150mg) to prevent fatigue, Magnesium (50mg) for hydration and motility.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-brand-secondary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 size={20} className="text-brand-dark" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark mb-1">Neurological Nausea Defense</h4>
                                            <p className="text-brand-dark/70 text-sm">Vitamin B6 at therapeutic doses (10-25mg) reduces nausea by modulating serotonin receptors in the brain's vomiting center.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="bg-brand-dark text-white p-6 rounded-2xl relative overflow-hidden">
                                    <Quote size={60} className="absolute top-2 right-2 opacity-10" />
                                    <p className="text-lg italic relative z-10">"Standard electrolyte formulas assume normal gastric function. For GLP-1 users, that assumption is catastrophically wrong."</p>
                                </div>
                            </div>

                            {/* Product Card */}
                            <div className="lg:col-span-5 lg:sticky lg:top-40">
                                <div className="bg-white rounded-3xl p-6 shadow-xl border border-brand-primary/10">
                                    <Link to={`/product/${hydrationProduct?.id}`} className="block aspect-square bg-brand-cream rounded-2xl mb-6 overflow-hidden">
                                        <img src={hydrationProduct?.image} alt={hydrationProduct?.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    </Link>
                                    <h3 className="font-serif font-bold text-xl text-brand-dark mb-2">{hydrationProduct?.name}</h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                        </div>
                                        <span className="text-sm text-brand-dark/60">({hydrationProduct?.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-brand-dark">${hydrationProduct?.tiers?.[0]?.price}</span>
                                        <span className="text-sm text-brand-primary font-semibold bg-brand-primary/10 px-3 py-1 rounded-full">Save 33%</span>
                                    </div>
                                    <Link to={`/product/${hydrationProduct?.id}`} className="block">
                                        <button className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-primary transition-all flex items-center justify-center gap-2">
                                            Shop Now <ArrowRight size={18} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ENZYMES SECTION */}
                    <section id="enzymes" className="scroll-mt-32">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                            <div className="lg:col-span-7">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
                                        <Leaf className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">Solution #2</span>
                                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                                            The Fermentation Problem
                                        </h2>
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-brand-primary/10 mb-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">!</span>
                                        <h3 className="text-xl font-bold text-brand-dark">The Problem</h3>
                                    </div>
                                    <p className="text-brand-dark/80 leading-relaxed">
                                        Your stomach acts as a "holding tank" where food sits for <strong>8-12+ hours</strong> instead of the normal 2-4. Warm, stagnant food ferments, creating sulfur gas (rotten egg burps), severe bloating, and inflammatory distress.
                                    </p>
                                </div>

                                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">Enzyme Replacement Therapy</h3>

                                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                    {[
                                        { name: 'Protease (50,000 HUT)', desc: 'Breaks down protein before it putrefies. Direct cure for sulfur burps.' },
                                        { name: 'Lipase (3,000 FIP)', desc: 'Predigests fats to accelerate passage through slowed stomach.' },
                                        { name: 'Amylase (5,000 DU)', desc: 'Rapidly degrades carbohydrates to prevent gas bloating.' },
                                        { name: 'Ox Bile (100mg)', desc: 'Replaces gallbladder function for fat digestion.' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-brand-cream/50 p-5 rounded-xl border border-brand-secondary/30">
                                            <h4 className="font-bold text-brand-dark mb-1 text-sm">{item.name}</h4>
                                            <p className="text-brand-dark/70 text-xs">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-brand-dark text-white p-6 rounded-2xl relative overflow-hidden">
                                    <Quote size={60} className="absolute top-2 right-2 opacity-10" />
                                    <p className="text-lg italic relative z-10">"Sulfur burps aren't just embarrassing. They're a sign of bacterial overgrowth. Enzyme supplementation is the mechanical solution."</p>
                                </div>
                            </div>

                            <div className="lg:col-span-5 lg:sticky lg:top-40">
                                <div className="bg-white rounded-3xl p-6 shadow-xl border border-brand-primary/10">
                                    <Link to={`/product/${enzymesProduct?.id}`} className="block aspect-square bg-brand-cream rounded-2xl mb-6 overflow-hidden">
                                        <img src={enzymesProduct?.image} alt={enzymesProduct?.name} className="w-full h-full object-cover scale-125 hover:scale-130 transition-transform duration-500" />
                                    </Link>
                                    <h3 className="font-serif font-bold text-xl text-brand-dark mb-2">{enzymesProduct?.name}</h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                        </div>
                                        <span className="text-sm text-brand-dark/60">({enzymesProduct?.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-brand-dark">${enzymesProduct?.tiers?.[0]?.price}</span>
                                        <span className="text-sm text-brand-primary font-semibold bg-brand-primary/10 px-3 py-1 rounded-full">Save 30%</span>
                                    </div>
                                    <Link to={`/product/${enzymesProduct?.id}`} className="block">
                                        <button className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-primary transition-all flex items-center justify-center gap-2">
                                            Shop Now <ArrowRight size={18} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* STRIPS SECTION */}
                    <section id="strips" className="scroll-mt-32">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                            <div className="lg:col-span-7">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center shadow-lg">
                                        <Pill className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">Solution #3</span>
                                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                                            Sublingual Nausea Defense
                                        </h2>
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-brand-primary/10 mb-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">!</span>
                                        <h3 className="text-xl font-bold text-brand-dark">The Problem</h3>
                                    </div>
                                    <p className="text-brand-dark/80 leading-relaxed">
                                        Nausea strikes without warning. When your stomach is delayed, swallowing a traditional anti-nausea pill means waiting <strong>1-2 hours</strong> for it to dissolve. You need relief in minutes, not hours.
                                    </p>
                                </div>

                                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">Why Sublingual Works</h3>
                                <p className="text-brand-dark/70 mb-6">The mucosa under the tongue is highly vascularized. Dissolvable strips bypass the digestive system entirely, delivering active ingredients directly into the bloodstream in <strong>10-30 seconds</strong>.</p>

                                <div className="space-y-4 mb-8">
                                    {[
                                        { num: '1', title: 'Ginger Root Extract (50mg)', desc: 'Bioactive gingerols reach the brain in under 60 seconds to block nausea signals.' },
                                        { num: '2', title: 'Peppermint Oil (10mg)', desc: 'Rapid antispasmodic that relaxes esophagus and stomach muscles.' },
                                        { num: '3', title: 'L-Theanine (25mg)', desc: 'Neutralizes the anxiety/panic response triggered by public nausea.' },
                                    ].map((item) => (
                                        <div key={item.num} className="flex gap-4 items-start">
                                            <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-brand-primary font-bold text-sm">{item.num}</div>
                                            <div>
                                                <h4 className="font-bold text-brand-dark">{item.title}</h4>
                                                <p className="text-brand-dark/70 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-brand-dark text-white p-6 rounded-2xl relative overflow-hidden">
                                    <Quote size={60} className="absolute top-2 right-2 opacity-10" />
                                    <p className="text-lg italic relative z-10">"For acute nausea, speed is the only metric that matters. Sublingual delivery is mechanically superior."</p>
                                </div>
                            </div>

                            <div className="lg:col-span-5 lg:sticky lg:top-40">
                                <div className="bg-white rounded-3xl p-6 shadow-xl border border-brand-primary/10">
                                    <Link to={`/product/${stripsProduct?.id}`} className="block aspect-square bg-brand-cream rounded-2xl mb-6 overflow-hidden">
                                        <img src={stripsProduct?.image} alt={stripsProduct?.name} className="w-full h-full object-cover scale-125 hover:scale-130 transition-transform duration-500" />
                                    </Link>
                                    <h3 className="font-serif font-bold text-xl text-brand-dark mb-2">{stripsProduct?.name}</h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                        </div>
                                        <span className="text-sm text-brand-dark/60">({stripsProduct?.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-brand-dark">${stripsProduct?.tiers?.[0]?.price}</span>
                                        <span className="text-sm text-brand-primary font-semibold bg-brand-primary/10 px-3 py-1 rounded-full">Save 30%</span>
                                    </div>
                                    <Link to={`/product/${stripsProduct?.id}`} className="block">
                                        <button className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-primary transition-all flex items-center justify-center gap-2">
                                            Shop Now <ArrowRight size={18} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

            {/* Reviews Section */}
            <section className="py-12 sm:py-16 bg-brand-light">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-12">
                        <span className="text-brand-primary font-bold tracking-widest text-[10px] sm:text-xs uppercase">Real Results</span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark mt-2">What Our Customers Say</h2>
                        <p className="text-brand-dark/60 mt-2 text-sm sm:text-base">Join 10,000+ satisfied customers</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                        {reviews.slice(0, 25).map((review, index) => (
                            <div key={review.id || index} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border border-brand-primary/10 hover:shadow-md transition-shadow">
                                <div className="flex text-amber-400 mb-1.5 sm:mb-2">
                                    {[...Array(review.stars || 5)].map((_, i) => <Star key={i} size={10} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />)}
                                </div>
                                <h4 className="font-bold text-brand-dark mb-1.5 sm:mb-2 text-[11px] sm:text-sm line-clamp-1">{review.headline}</h4>
                                <p className="text-brand-dark/70 text-[10px] sm:text-xs mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">{review.body}</p>
                                <div className="border-t border-brand-primary/10 pt-1.5 sm:pt-2">
                                    <p className="font-semibold text-brand-dark text-[10px] sm:text-xs">{review.author}</p>
                                    <p className="text-brand-primary text-[8px] sm:text-[10px]">{review.verifiedProduct}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white border-t border-brand-primary/10">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-brand-primary font-bold tracking-widest text-xs uppercase">Questions?</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mt-2">Frequently Asked</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-brand-cream rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                                >
                                    <span className="font-bold text-brand-dark">{faq.question}</span>
                                    {openFaq === i ? <Minus size={20} className="text-brand-primary flex-shrink-0" /> : <Plus size={20} className="text-brand-dark/40 flex-shrink-0" />}
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-6 pt-0">
                                        <p className="text-brand-dark/70">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-16 bg-brand-dark">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Ready to Feel Better?</h2>
                    <p className="text-white/70 mb-8">Join 10,000+ GLP-1 users who've found relief with SmoothDescent.</p>
                    <Link to="/" className="inline-flex items-center gap-2 bg-white text-brand-dark font-bold px-8 py-4 rounded-full hover:bg-brand-secondary transition-all">
                        Shop All Products <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default SciencePage;
