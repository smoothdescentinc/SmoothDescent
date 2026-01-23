import type { Product, Review, QuizQuestion, Feature, QuizResult, FAQCategory } from './types';

// --- COPYWRITING ASSETS ---

export const HERO_COPY = {
  eyebrow: "GLP-1 OPTIMIZED NUTRITION",
  headline: "Thrive While You Shrink",
  subheadline: "Your medication handles the appetite. We handle everything else: the nausea, the dehydration, the muscle loss, and the energy crashes.",
  ctaPrimary: "Shop The Protocol",
  ctaSecondary: "Take The Support Quiz",
  trustBadges: [
    "Formulated for Delayed Gastric Emptying",
    "Made in USA"
  ]
};

export const REVIEWS_COPY = {
  headline: "Real Relief. Real Stories.",
  subheadline: "See how others on their GLP-1 journey are managing side effects and staying on track.",
  aggregate: "4.9/5 Average Rating"
};

export const VALUE_PROPS_COPY = {
  headline: "The SmoothDescent Difference",
  subheadline: "We believe in transparency, clinical dosing, and the power of targeted nutrition. Every formula is a promise of support without compromise."
};

export const PROMISE_COPY = {
  headline: "Our Promise To You",
  body: "If you don't feel a difference within 30 days, we don't want your money. It's that simple. We are so confident in our formulas that we offer a completely risk-free trial. Try any product. If it doesn't help you stay comfortable and compliant with your medication, return it, even if the container is empty, and we'll refund you. No questions asked."
};

// --- DATA LISTS ---

export const PRODUCTS: Product[] = [
  {
    id: 'hydration',
    name: "Gastric Shield+ Hydration Powder",
    category: "HYDRATION/HEADACHE",
    rating: 5,
    reviews: 312,
    image: "/images/GastricShield.png",
    nutritionLabel: "/images/HydratinoPowderNutritionLabel.png",
    price: 38.00,
    bestSeller: true,
    description: "The Injection Day Elixir. Stop the \"Ozempic Headache\" before it starts. Hydrate without the bloat. Lemonade flavor soothes nausea naturally. This isn't just hydration. It's your survival strategy for the 48 hours after your injection.",
    subscriptionDiscount: 0.15,
    details: {
      subtitle: "The Only Thing You Can Stomach on Day 1 & 2",
      features: [
        "Micro-solubility electrolytes for instant absorption",
        "Zero Sugar, Zero Caffeine",
        "Natural Lemonade flavor reduces nausea",
        "Fortified with B6 & B12 for energy"
      ],
      usage: "Mix 1 scoop with 16oz water. Drink immediately upon waking and 30 mins before injection.",
      checklist: [
        "Micro-Solubility Electrolytes for Instant Absorption",
        "Deep Hydration Without the Bloat",
        "Natural Lemonade Flavor Reduces Nausea",
        "Zero Sugar, Zero Caffeine",
        "100% Satisfaction Guarantee or Money Back"
      ],
      banner: "1 Tub Contains 60 Servings",
      bannerEmoji: "🍋"
    },
    tiers: [
      { id: '1-tub', quantity: 1, label: "Buy 1", subLabel: "", price: 33.96, originalPrice: 59.95, savePercent: 33, perDay: null },
      { id: '2-tubs', quantity: 3, label: "Buy 2 Get 1 Free", subLabel: "$1.13/day", price: 67.96, originalPrice: 179.85, savePercent: 56, perDay: 1.13, badge: "Most Popular" },
      { id: '3-tubs', quantity: 5, label: "Buy 3 Get 2 Free", subLabel: "$1.02/day", price: 101.96, originalPrice: 299.75, savePercent: 60, perDay: 1.02, badge: "Best Value" }
    ],
    faqs: [
      {
        question: "Is this safe to take with my GLP-1 medication?",
        answer: ["Yes. Gastric Shield+ is a nutritional supplement containing electrolytes (minerals) and vitamins. It does not contain any pharmaceutical compounds that interact with semaglutide, tirzepatide, or other GLP-1 receptor agonists."]
      },
      {
        question: "How is this different from regular electrolyte powders?",
        answer: [
          "1. Micro-Solubility Technology: Absorbs through the stomach lining directly, bypassing the gastric delay that causes other drinks to sit heavy.",
          "2. Balanced for Low Food Intake: You need balanced electrolytes (500mg sodium), not extreme doses (1,000mg+) designed for sweating athletes.",
          "3. Nausea-Friendly: Lemonade flavor with citric acid soothes nausea."
        ]
      },
      {
        question: "Can I drink this every day?",
        answer: ["Yes. Your GLP-1 medication suppresses thirst signals 24/7. Even on \"good days,\" you're at risk of chronic low-grade dehydration. Consistent hydration = consistent relief."]
      },
      {
        question: "Will this break my fast?",
        answer: ["No. It contains 5 calories, 0g sugar, and 1g carbohydrate. It will not spike insulin or break a fasted state."]
      },
      {
        question: "Does it taste salty?",
        answer: ["No. Unlike LMNT or other high-sodium brands, we use a balanced 500mg sodium level that masks easily with the natural lemon flavor."]
      }
    ]
  },
  {
    id: 'digestive-enzymes',
    name: "Digestive Enzyme Pro Blend",
    category: "DIGESTION",
    rating: 4.9,
    reviews: 418,
    image: "/images/DigestiveEnzymeHero.png",
    nutritionLabel: "/images/DigestiveEnzymeNutritionLabel.png",
    price: 42.00,
    description: "The End of Sulfur Burps. Your stomach is too slow to digest food before it ferments. The result? Rotten egg burps, bloating, and embarrassment. These enzymes do the work your stomach can't.",
    subscriptionDiscount: 0.15,
    details: {
      subtitle: "Stop the Rot",
      features: [
        "Breaks down protein before fermentation (Stops Sulfur Burps)",
        "Includes Ox Bile for fat digestion (Stops Greasiness)",
        "Clinical strength 50,000 HUT Protease",
        "Works in minutes, designed for delayed emptying"
      ],
      usage: "Take 2 capsules 10-15 minutes before eating. For high-risk meals (steak, fried foods), take 3 capsules.",
      checklist: [
        "Eliminates Sulfur Burps at the Source",
        "Breaks Down Protein Before It Ferments",
        "Includes Ox Bile for Fat Digestion",
        "Clinical Strength 50,000 HUT Protease",
        "100% Satisfaction Guarantee or Money Back"
      ],
      banner: "1 Bottle Contains 60 Capsules",
      bannerEmoji: "💊"
    },
    tiers: [
      { id: '1-bottle', quantity: 1, label: "Buy 1", subLabel: "", price: 42.00, originalPrice: 59.95, savePercent: 30, perDay: null },
      { id: '2-bottles', quantity: 3, label: "Buy 2 Get 1 Free", subLabel: "$0.93/day", price: 84.00, originalPrice: 179.85, savePercent: 53, perDay: 0.93, badge: "Most Popular" },
      { id: '3-bottles', quantity: 5, label: "Buy 3 Get 2 Free", subLabel: "$0.84/day", price: 126.00, originalPrice: 299.75, savePercent: 58, perDay: 0.84, badge: "Best Value" }
    ],
    faqs: [
      {
        question: "How is this different from probiotics?",
        answer: ["Probiotics add beneficial bacteria to your gut (long-term). Enzymes break down food IMMEDIATELY so it doesn't ferment. If you need sulfur burp relief NOW, you need enzymes."]
      },
      {
        question: "Can I take this if I don't have a gallbladder?",
        answer: ["Yes, and you should! This formula includes ox bile (100mg), which replaces the bile your gallbladder would normally release. It is critical for digesting fats without nausea."]
      },
      {
        question: "What if I forget to take it before eating?",
        answer: ["Take it as soon as you remember, even if you're mid-meal. It's better late than never. The enzymes will still help process the food already in your stomach."]
      },
      {
        question: "Will this cause diarrhea?",
        answer: ["Unlikely at the recommended dose. However, taking excessive amounts (5+ capsules) can speed up digestion too much. Start with 2 capsules."]
      }
    ]
  },
  {
    id: 'nausea-strips',
    name: "Digestive + Gut Health Strips",
    category: "ON-THE-GO RELIEF",
    rating: 4.8,
    reviews: 267,
    image: "/images/stripimage.png",
    nutritionLabel: "/images/Stripsnutritionlabe.png",
    price: 28.00,
    description: "Your Pocket Savior. Feeling queasy at dinner? Slip a strip under your tongue. Dissolves in 10 seconds. No water needed. No running to the bathroom. Just fast, discreet nausea relief when you need it most.",
    subscriptionDiscount: 0.15,
    details: {
      subtitle: "Public Safety. Private Relief.",
      features: [
        "Dissolves in 10 seconds under tongue",
        "Ginger Root Extract (50mg) + Vitamin B6",
        "Works in 5-10 minutes (bypasses stomach)",
        "Pocket-sized & discreet"
      ],
      usage: "Preventative: Place 1 strip under tongue 10-15 mins before eating. Reactive: Use immediately when nausea hits.",
      checklist: [
        "Dissolves in 10 Seconds Under Tongue",
        "Fast Relief in 5-10 Minutes",
        "50mg Ginger Root + Vitamin B6",
        "Pocket-Sized & Completely Discreet",
        "100% Satisfaction Guarantee or Money Back"
      ],
      banner: "1 Box Contains 30 Strips",
      bannerEmoji: "✨"
    },
    tiers: [
      { id: '1-box', quantity: 1, label: "Buy 1", subLabel: "", price: 28.00, originalPrice: 39.95, savePercent: 30, perDay: null },
      { id: '2-boxes', quantity: 2, label: "Buy 2 Get 15% Off", subLabel: "$0.79/strip", price: 47.60, originalPrice: 79.90, savePercent: 40, perDay: 0.79, badge: "Most Popular" },
      { id: '3-boxes', quantity: 3, label: "Buy 3 Get 25% Off", subLabel: "$0.70/strip", price: 62.93, originalPrice: 119.85, savePercent: 47, perDay: 0.70, badge: "Best Value" }
    ],
    faqs: [
      {
        question: "How many strips can I use per day?",
        answer: ["Maximum 4 strips per day. Most users need 1-2. If you're using more than 4, your nausea is severe enough to warrant a conversation with your doctor."]
      },
      {
        question: "Will these stop vomiting?",
        answer: ["They reduce nausea intensity, but they're not anti-emetics (vomiting blockers). They are designed to manage waves of nausea before they escalate."]
      },
      {
        question: "Do they have calories or sugar?",
        answer: ["Each strip contains less than 1 calorie and uses stevia (zero-calorie sweetener). They will not break a fast."]
      },
      {
        question: "Can I combine with digestive enzymes?",
        answer: ["Yes. Take Digestive Enzyme Pro Blend before eating to prevent fermentation, and use a strip if you feel breakthrough nausea later."]
      }
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    stars: 5,
    headline: "The sulfur burps are GONE",
    body: "I've been on semaglutide for 5 months and the sulfur burps were so bad I was avoiding all protein. I tried these enzymes and I'm not exaggerating when I say they changed my life. I haven't had a sulfur burp in 3 weeks.",
    author: "Jennifer M.",
    verifiedProduct: "Digestive Enzyme Pro Blend",
    timeAgo: "3 weeks ago"
  },
  {
    id: '2',
    stars: 5,
    headline: "I can eat out again",
    body: "I'd stopped going to restaurants because the nausea was so unpredictable. These strips changed everything. I keep them in my purse and take one before we order food. My husband is thrilled because I'm not making excuses anymore.",
    author: "Amanda L.",
    verifiedProduct: "Digestive + Gut Health Strips",
    timeAgo: "1 month ago"
  },
  {
    id: '3',
    stars: 5,
    headline: "Injection day doesn't ruin my week anymore",
    body: "I've been on semaglutide for about 3 weeks now and the difference in my energy levels is night and day. No more afternoon crash! The Gastric Shield+ powder is the only thing I can keep down.",
    author: "Sarah Jenkins",
    verifiedProduct: "Gastric Shield+ Hydration Powder",
    timeAgo: "2 days ago"
  },
  {
    id: '4',
    stars: 5,
    headline: "Actually works",
    body: "Skeptical at first, but the electrolytes are legit. I track my macros with an Oura ring and my deep sleep scores are up 20%. I'm not feeling that heavy sloshing feeling anymore.",
    author: "Mike T.",
    verifiedProduct: "Gastric Shield+ Hydration Powder",
    timeAgo: "1 week ago"
  },
  {
    id: '5',
    stars: 5,
    headline: "Saved me at a work dinner",
    body: "I was at a client dinner and the nausea hit HARD. I slipped a strip under my tongue and within 10 minutes I was back to normal. Nobody knew. I don't leave the house without these.",
    author: "Jason K.",
    verifiedProduct: "Digestive + Gut Health Strips",
    timeAgo: "2 months ago"
  },
  {
    id: '6',
    stars: 5,
    headline: "Finally sleeping through the night",
    body: "The dehydration headaches were waking me up at 3am every single night. Started using the hydration powder before bed and I'm finally getting real sleep again.",
    author: "Rachel H.",
    verifiedProduct: "Gastric Shield+ Hydration Powder",
    timeAgo: "1 week ago"
  },
  {
    id: '7',
    stars: 5,
    headline: "My husband noticed immediately",
    body: "He said I stopped making that face after meals. You know the one. The 'I feel like I'm going to be sick' face. These enzymes are a game changer.",
    author: "Patricia D.",
    verifiedProduct: "Digestive Enzyme Pro Blend",
    timeAgo: "3 weeks ago"
  },
  {
    id: '8',
    stars: 5,
    headline: "No more excuses",
    body: "I used to cancel plans constantly because of unpredictable nausea. Now I keep the strips in my bag and actually live my life. Down 47 lbs and counting!",
    author: "Christina B.",
    verifiedProduct: "Digestive + Gut Health Strips",
    timeAgo: "1 month ago"
  },
  {
    id: '9',
    stars: 5,
    headline: "The taste doesn't make me gag",
    body: "Every other electrolyte drink I tried made me MORE nauseous. This one is light, not too sweet, and actually stays down. That's huge for me.",
    author: "Kelly M.",
    verifiedProduct: "Gastric Shield+ Hydration Powder",
    timeAgo: "2 weeks ago"
  },
  {
    id: '10',
    stars: 5,
    headline: "Wedding day lifesaver",
    body: "I was terrified about my daughter's wedding. Took enzymes before the meal, had strips in my clutch. Danced all night without a single issue. Cried happy tears.",
    author: "Diane R.",
    verifiedProduct: "Digestive Enzyme Pro Blend",
    timeAgo: "3 weeks ago"
  },
  {
    id: '11',
    stars: 5,
    headline: "Better than prescription anti-nausea",
    body: "My doctor had me on Zofran but it made me so constipated. These strips work just as fast and no side effects. Why didn't I find these sooner?",
    author: "Linda S.",
    verifiedProduct: "Digestive + Gut Health Strips",
    timeAgo: "1 month ago"
  },
  {
    id: '12',
    stars: 5,
    headline: "My energy is back",
    body: "I thought fatigue was just part of the medication. Turns out I was severely dehydrated. Two weeks on this powder and I feel like myself again.",
    author: "Mark T.",
    verifiedProduct: "Gastric Shield+ Hydration Powder",
    timeAgo: "2 weeks ago"
  },
  {
    id: '13',
    stars: 5,
    headline: "Protein without punishment",
    body: "I was avoiding all meat because of the sulfur burps. Now I take these enzymes and I can actually hit my protein goals without suffering.",
    author: "Brian K.",
    verifiedProduct: "Digestive Enzyme Pro Blend",
    timeAgo: "1 week ago"
  },
  {
    id: '14',
    stars: 5,
    headline: "Flight anxiety gone",
    body: "I had to fly for work and was TERRIFIED of getting sick on the plane. Strips saved me. Quick, discreet, effective. 10/10 recommend.",
    author: "Stephanie W.",
    verifiedProduct: "Digestive + Gut Health Strips",
    timeAgo: "2 months ago"
  },
  {
    id: '15',
    stars: 5,
    headline: "The Sunday Scaries are manageable now",
    body: "Injection day used to ruin my entire week. Now I prep with the hydration powder and the first 48 hours are so much easier.",
    author: "Tom P.",
    verifiedProduct: "Gastric Shield+ Hydration Powder",
    timeAgo: "3 weeks ago"
  },
  {
    id: '16',
    stars: 5,
    headline: "Restaurant meals are possible again",
    body: "I take 2 enzymes before I eat out and I don't get that horrible bloated feeling anymore. I actually enjoy food again.",
    author: "Nancy G.",
    verifiedProduct: "Digestive Enzyme Pro Blend",
    timeAgo: "1 month ago"
  },
  {
    id: '17',
    stars: 5,
    headline: "Quick and discreet",
    body: "Love that I can use the strips without anyone knowing. No water, no pills to swallow. Just slip it under my tongue and wait.",
    author: "Michelle F.",
    verifiedProduct: "Digestive + Gut Health Strips",
    timeAgo: "2 weeks ago"
  },
  {
    id: '18',
    stars: 5,
    headline: "Doctor recommended these",
    body: "My bariatric specialist actually recommended SmoothDescent. Said their formulas are designed for delayed gastric emptying. She was right.",
    author: "Karen L.",
    verifiedProduct: "Gastric Shield+ Hydration Powder",
    timeAgo: "1 month ago"
  },
  {
    id: '19',
    stars: 5,
    headline: "No more embarrassing moments",
    body: "The sulfur burps were so bad my coworkers noticed. I was mortified. Three weeks on these enzymes and the problem is completely gone.",
    author: "David M.",
    verifiedProduct: "Digestive Enzyme Pro Blend",
    timeAgo: "3 weeks ago"
  },
  {
    id: '20',
    stars: 5,
    headline: "First date success",
    body: "Went on my first date since starting Ozempic. Had the strips ready just in case. Didn't need them but knowing they were there gave me confidence.",
    author: "Jessica R.",
    verifiedProduct: "Digestive + Gut Health Strips",
    timeAgo: "2 weeks ago"
  },
  {
    id: '21',
    stars: 5,
    headline: "Gym performance improved",
    body: "I was getting dizzy during workouts from dehydration. This powder absorbs so much better than regular water. My lifts are back to normal.",
    author: "Chris A.",
    verifiedProduct: "Gastric Shield+ Hydration Powder",
    timeAgo: "1 week ago"
  },
  {
    id: '22',
    stars: 5,
    headline: "Wish I found these sooner",
    body: "I suffered for 4 months before finding SmoothDescent. The enzymes stopped my bloating within days. Don't wait like I did.",
    author: "Sandra J.",
    verifiedProduct: "Digestive Enzyme Pro Blend",
    timeAgo: "1 month ago"
  },
  {
    id: '23',
    stars: 5,
    headline: "Travel essential",
    body: "Packed the strips for vacation and used them every day. No nausea, no missed experiences. Best $28 I've ever spent.",
    author: "Robert C.",
    verifiedProduct: "Digestive + Gut Health Strips",
    timeAgo: "3 weeks ago"
  },
  {
    id: '24',
    stars: 5,
    headline: "My whole family notices the difference",
    body: "I'm not miserable anymore. I'm present. I'm engaged. The hydration powder helped me actually enjoy my weight loss journey.",
    author: "Lisa B.",
    verifiedProduct: "Gastric Shield+ Hydration Powder",
    timeAgo: "2 weeks ago"
  },
  {
    id: '25',
    stars: 5,
    headline: "Worth every penny",
    body: "I was skeptical of the price but these products WORK. The enzymes alone saved me from quitting my medication. Can't put a price on that.",
    author: "Angela H.",
    verifiedProduct: "Digestive Enzyme Pro Blend",
    timeAgo: "1 month ago"
  }
];

export const FEATURES: Feature[] = [
  {
    icon: 'beaker',
    title: "Gastric Brake Technology",
    description: "We use ingredients at the exact dosages shown to be effective in clinical studies, not just \"fairy dust\" amounts. Your stomach empties 70% slower. Standard supplements sit and ferment. Ours are designed to absorb immediately."
  },
  {
    icon: 'leaf',
    title: "Pure Ingredients",
    description: "Sourced from verified natural origins. No artificial sweeteners, colors, or harmful preservatives ever. No heavy fillers that trigger nausea. No chalky textures that make you gag. Just clean, light formulas."
  },
  {
    icon: 'heart',
    title: "Formulated with Care in USA",
    description: "Manufactured in FDA-registered, GMP-certified facilities right here in the United States. Every batch is third-party tested for purity and potency. We know you're trusting us during a vulnerable time."
  }
];

export const FAQS: FAQCategory[] = [
  {
    title: "Safety & Compatibility",
    items: [
      {
        question: "Is this safe to take with my GLP-1 medication (Ozempic, Wegovy, Mounjaro)?",
        answer: [
          "Yes. All SmoothDescent products are nutritional supplements containing vitamins, minerals, and food-derived ingredients (whey protein, ginger root, electrolytes). They do not contain any pharmaceutical compounds that interact with GLP-1 receptor agonist medications.",
          "In short: These are food products designed to support your nutrition during treatment, not medications that alter how your prescription works."
        ]
      },
      {
        question: "Can I take this if I have a specific medical condition?",
        answer: [
          "For Kidney Disease: Consult your doctor before using protein supplements or electrolyte formulas.",
          "For Diabetes: Our products contain zero sugar and will not spike blood glucose. Monitor levels closely if on insulin.",
          "Pregnancy/Breastfeeding: Not recommended as GLP-1 meds themselves are not approved for pregnancy.",
          "When in doubt, ask your doctor. We're here to support your nutrition, but medical clearance always comes first."
        ]
      },
      {
        question: "I'm considering starting a GLP-1 medication. Should I buy these now or wait?",
        answer: [
          "Buy now. The first 72 hours after your first injection will determine whether you succeed or quit.",
          "If you start the medication without a hydration and nausea plan, you'll suffer unnecessarily."
        ]
      }
    ]
  },
  {
    title: "Ordering & Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer: [
          "Standard Shipping (Free over $75): 5-9 business days total.",
          "Expedited Shipping ($12): 3-4 business days total.",
          "Orders placed before 12pm EST ship same day."
        ]
      },
      {
        question: "What's your return policy?",
        answer: [
          "30-Day Money Back Guarantee. If you're not satisfied, email us. You don't need to ship the product back. Even if the container is empty, we'll refund you."
        ]
      }
    ]
  }
];

// --- QUIZ DATA ---

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How long have you been on your GLP-1 medication?",
    subheadline: "This helps us understand which phase of treatment you're in.",
    options: [
      { label: "0–3 months (Just started)", subLabel: "The Acclimation Phase", value: "phase_acclimation", icon: "calendar" },
      { label: "4–9 months (Seeing results)", subLabel: "The Rapid Loss Phase", value: "phase_rapid_loss", icon: "chart" },
      { label: "10+ months (Maintenance mode)", subLabel: "The Maintenance Phase", value: "phase_maintenance", icon: "target" },
      { label: "I'm considering starting soon", subLabel: "Pre-Treatment Research", value: "phase_pre_treatment", icon: "question" }
    ]
  },
  {
    id: 2,
    question: "What's your biggest challenge right now?",
    subheadline: "Select the one that's most disruptive to your daily life.",
    options: [
      { label: "Injection day nausea & headaches", subLabel: "\"I dread Sunday nights. The next 48 hours are miserable.\"", value: "pain_nausea", icon: "nausea" },
      { label: "Sulfur burps & severe bloating", subLabel: "\"I feel like I ate a bowling ball and the burps taste like rotten eggs.\"", value: "pain_bloating", icon: "alert" },
      { label: "Chronic dehydration & fatigue", subLabel: "\"I'm always tired. Water feels heavy. I can't stay hydrated.\"", value: "pain_dehydration", icon: "water" },
      { label: "Fear of vomiting in public", subLabel: "\"I'm scared to go out to dinner or dates.\"", value: "pain_public_nausea", icon: "alert" },
      { label: "Losing muscle & looking 'deflated'", subLabel: "\"The scale is going down, but I'm losing my tone.\"", value: "pain_muscle_loss", icon: "muscle" }
    ]
  },
  {
    id: 3,
    question: "How would you describe your approach?",
    subheadline: "This helps us recommend the right level of support.",
    options: [
      { label: "I want to solve one problem first", subLabel: "I need targeted relief for my most urgent issue.", value: "commitment_single" },
      { label: "I want a complete system", subLabel: "I'm ready to invest in a full protocol that covers all the bases.", value: "commitment_full" },
      { label: "I'm just exploring options", subLabel: "I'm still researching what might help.", value: "commitment_research" }
    ]
  }
];

export const QUIZ_RESULTS: Record<string, QuizResult> = {
  "injection_day_survivor": {
    id: "injection_day_survivor",
    headline: "Your Protocol: Gastric Shield+ Hydration",
    subheadline: "You're in the hardest phase: acclimation. Your body is in shock and you need immediate relief to stay compliant.",
    bodyCopy: [
      "Right now, your biggest enemy is the \"Sunday Scaries,\" that 48-hour window after your injection when nausea and headaches make you question if this medication is worth it. These symptoms aren't random; they're caused by severe dehydration and gastric stalling.",
      "Gastric Shield+ Hydration Powder (Lemonade) is designed for this exact moment. It uses micro-solubility electrolytes to absorb through the stomach lining immediately, bypassing the delay that makes other drinks sit heavy.",
      "This isn't a luxury. It's survival gear."
    ],
    products: [{ id: "hydration", name: "Gastric Shield+ Hydration Powder", price: 38, image: "/images/GastricShield.png" }],
    testimonial: { quote: "I was about to quit. I couldn't handle injection day anymore. This powder changed everything. It sounds simple, but having actual hydration that absorbs made me feel in control again.", author: "David C. | Verified Buyer" },
    ctaPrimary: "Start with Hydration",
    ctaSecondary: "See What's Inside"
  },
  "digestive_defender": {
    id: "digestive_defender",
    headline: "Your Protocol: Digestive Enzyme Pro Blend",
    subheadline: "Your stomach is emptying too slowly, causing food to ferment. Let's stop the rot.",
    bodyCopy: [
      "Sulfur burps aren't just 'gas'. They are literally the taste of food fermenting in your stomach because it's been sitting there for 6+ hours.",
      "The Digestive Enzyme Pro Blend is formulated with 50,000 HUT Protease and Ox Bile to break down proteins and fats BEFORE they can rot. This effectively eliminates sulfur burps and that heavy 'bowling ball' feeling after meals.",
      "Take 2 capsules before every meal and reclaim your social life."
    ],
    products: [{ id: "digestive-enzymes", name: "Digestive Enzyme Pro Blend", price: 32, image: "/images/DigestiveEnzymeHero.png" }],
    testimonial: { quote: "I've been on semaglutide for 5 months and the sulfur burps were so bad I was avoiding all protein. I take 2 of these before every meal and I haven't had a sulfur burp in 3 weeks.", author: "Jennifer M. | Verified Buyer" },
    ctaPrimary: "Stop Sulfur Burps",
    ctaSecondary: "Learn More"
  },
  "nausea_navigator": {
    id: "nausea_navigator",
    headline: "Your Protocol: Digestive + Gut Health Strips",
    subheadline: "Don't let the fear of public nausea keep you at home.",
    bodyCopy: [
      "The fear of throwing up in public is isolating. You're skipping dinners, dates, and work events because you can't predict when the wave will hit.",
      "These mint-flavored dissolving strips are your secret weapon. Place one under your tongue, and it dissolves in 10 seconds. The ingredients absorb directly into your bloodstream, calming nausea in minutes without drawing attention.",
      "No water needed. No panic. Just relief."
    ],
    products: [{ id: "nausea-strips", name: "Digestive + Gut Health Strips", price: 28, image: "/images/stripimage.png" }],
    testimonial: { quote: "I can go on dates again. I keep these in my purse and slip one under my tongue if I feel weird. It stops the panic instantly.", author: "Amanda L. | Verified Buyer" },
    ctaPrimary: "Get Pocket Relief",
    ctaSecondary: "See How It Works"
  },
  "hydration_hero": {
    id: "hydration_hero",
    headline: "Your Protocol: Gastric Shield+ Hydration Powder",
    subheadline: "You're chronically dehydrated, and it's making everything worse. Let's fix the foundation first.",
    bodyCopy: [
      "The \"Ozempic Headache\" isn't in your head. It's dehydration. Your medication suppresses your thirst signals, so even though your body is screaming for water, you don't feel thirsty.",
      "Gastric Shield+ fixes this with micro-solubility electrolytes designed to absorb through the stomach lining immediately. The Lemonade flavor is naturally anti-nausea and cuts through the \"heavy\" feeling.",
      "This is the single most important supplement you can add right now."
    ],
    products: [{ id: "hydration", name: "Gastric Shield+ Hydration Powder", price: 38, image: "/images/GastricShield.png" }],
    testimonial: { quote: "I tried Liquid IV, LMNT, all of them. They all made me feel worse, like I was sloshing around with a gallon of water in my stomach. Gastric Shield+ is the first hydration powder that doesn't sit heavy.", author: "Jessica P. | Verified Buyer" },
    ctaPrimary: "Start with Hydration",
    ctaSecondary: "Subscribe & Save"
  },
  "maintenance_planner": {
    id: "maintenance_planner",
    headline: "Your Protocol: Digestive Enzyme Pro Blend",
    subheadline: "Keep your digestion optimized as you maintain your results.",
    bodyCopy: [
      "Even in maintenance, your digestion speed can vary. To prevent bloating and ensure you're absorbing the nutrients from the food you eat, enzyme support is critical.",
      "This blend ensures that your protein and healthy fats are properly broken down, preventing that heavy feeling after meals and supporting long-term gut health.",
      "Think of this as your insurance policy for comfortable eating."
    ],
    products: [{ id: "digestive-enzymes", name: "Digestive Enzyme Pro Blend", price: 32, image: "/images/DigestiveEnzymeHero.png" }],
    testimonial: { quote: "I'm on a maintenance dose now but I still take these with big meals. It just helps everything digest better.", author: "Karen L. | Verified Buyer" },
    ctaPrimary: "Optimize Digestion",
    ctaSecondary: "Learn More"
  },
  "researcher": {
    id: "researcher",
    headline: "Still Exploring? Start Here.",
    subheadline: "You're doing your homework. Smart. Here's what you need to know before you buy anything.",
    bodyCopy: [
      "You're not ready to buy yet. That's okay. But here's what most people don't realize until it's too late: The first 72 hours after your first injection will determine whether you quit or succeed.",
      "We recommend starting with Gastric Shield+ Hydration Powder. It's the single most important thing you can do to avoid the \"Ozempic Headache\" and injection day nausea.",
      "Hydration is the foundation of everything."
    ],
    products: [{ id: "hydration", name: "Gastric Shield+ Hydration Powder", price: 38, image: "/images/GastricShield.png" }],
    testimonial: { quote: "Over 8,000 GLP-1 users trust SmoothDescent to support their journey.", author: "Community Stat" },
    ctaPrimary: "Start with Hydration",
    ctaSecondary: "Read the Science"
  }
};