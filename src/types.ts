export interface PricingTier {
  id: string;
  quantity: number;
  label: string;
  subLabel: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  saveLabel?: string;
}

export interface ProductDetails {
  subtitle: string;
  features: string[];
  usage: string;
}

export interface FAQItem {
  question: string;
  answer: string[]; // Array of paragraphs for formatting
}

export interface Product {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  subtitle?: string;
  price: number; // Base price (usually lowest qty one-time)
  originalPrice?: number;
  bestSeller?: boolean;
  description?: string; // Short description for the shop grid

  // Extended details for Product Page
  details?: ProductDetails;
  tiers?: PricingTier[];
  subscriptionDiscount?: number; // e.g. 0.15 for 15%
  faqs?: FAQItem[]; // Product-specific FAQs
  nutritionLabel?: string; // Path to nutrition label image
}

export interface Review {
  id: string;
  stars: number;
  headline: string;
  body: string;
  author: string;
  verifiedProduct: string;
  timeAgo: string;
}

export interface QuizOption {
  label: string;
  subLabel?: string;
  value: string;
  icon?: string; // 'calendar', 'chart', 'target', 'nausea', 'water', 'muscle', 'hair', 'scale', 'question'
}

export interface QuizQuestion {
  id: number;
  question: string;
  subheadline?: string;
  options: QuizOption[];
}

export interface QuizResult {
  id: string;
  headline: string;
  subheadline: string;
  bodyCopy: string[]; // Paragraphs
  products: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
  };
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface Feature {
  icon: 'beaker' | 'leaf' | 'heart';
  title: string;
  description: string;
}

export interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export interface CartItem extends Product {
  quantity: number;
  variantLabel?: string;
}