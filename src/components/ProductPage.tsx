import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '@nanostores/react';
import { products, isLoading, fetchProducts } from '../store/productsStore';
import Button from './Button';
import { addCartItem } from '../store/cartStore';
import { Star, Check, ShieldCheck, Truck, RefreshCw, ChevronRight, Plus, Minus, Loader2 } from 'lucide-react';

const ProductPage: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const $products = useStore(products);
   const $isLoading = useStore(isLoading);

   const product = $products.find(p => p.id === id);

   useEffect(() => {
      if ($products.length === 0 && !$isLoading) {
         fetchProducts();
      }
   }, []);

   // States
   const [selectedTierId, setSelectedTierId] = useState<string>('');
   const [isSubscribe, setIsSubscribe] = useState(false);
   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

   useEffect(() => {
      // Default to the middle tier (usually best seller) if available, or the first one
      if (product?.tiers && product.tiers.length > 0) {
         const bestSeller = product.tiers.find(t => t.badge === "Best Seller");
         if (bestSeller) {
            setSelectedTierId(bestSeller.id);
            setIsSubscribe(true); // Default to subscription for max conversion
         } else {
            setSelectedTierId(product.tiers[0].id);
         }
      }
   }, [product]);

   if ($isLoading) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
         </div>
      );
   }

   if (!product) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <h2 className="text-2xl font-serif text-brand-dark mb-4">Product Not Found</h2>
               <Link to="/" className="text-brand-primary hover:underline">Return Home</Link>
            </div>
         </div>
      );
   }

   const currentTier = product.tiers?.find(t => t.id === selectedTierId) || product.tiers?.[0];

   // Calculate price logic
   const basePrice = currentTier ? currentTier.price : product.price;
   const finalPrice = isSubscribe && product.subscriptionDiscount
      ? (basePrice * (1 - product.subscriptionDiscount))
      : basePrice;

   const originalPrice = currentTier?.originalPrice || (isSubscribe ? basePrice : undefined);
   const savings = originalPrice ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;

   const toggleFaq = (index: number) => {
      setOpenFaqIndex(openFaqIndex === index ? null : index);
   };

   return (
      <div className="bg-brand-light min-h-screen pb-20">

         {/* Breadcrumb */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
            <Link to="/" className="hover:text-brand-primary">Home</Link>
            <ChevronRight className="inline mx-2 h-4 w-4" />
            <Link to="/#products" className="hover:text-brand-primary">Shop</Link>
            <ChevronRight className="inline mx-2 h-4 w-4" />
            <span className="text-brand-dark font-medium">{product.name}</span>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

               {/* Left: Images */}
               <div className="space-y-6">
                  <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-brand-primary/10 relative">
                     <span className="absolute top-6 left-6 bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 tracking-widest uppercase">
                        {product.category}
                     </span>
                     <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                     />
                  </div>
                  {/* Thumbnails placeholder */}
                  <div className="grid grid-cols-4 gap-4">
                     {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`aspect-square rounded-xl bg-white border cursor-pointer overflow-hidden ${i === 1 ? 'border-brand-primary ring-1 ring-brand-primary' : 'border-transparent hover:border-brand-primary/30'}`}>
                           <img src={product.image} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                        </div>
                     ))}
                  </div>
               </div>

               {/* Right: Details & Buy Box */}
               <div>
                  <h1 className="text-3xl md:text-4xl font-serif text-brand-dark mb-2">{product.name}</h1>
                  {product.details && (
                     <p className="text-lg text-brand-dark/70 mb-4">{product.details.subtitle}</p>
                  )}

                  <div className="flex items-center gap-2 mb-8">
                     <div className="flex text-brand-secondary">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} size={18} fill={i < product.rating ? "currentColor" : "none"} strokeWidth={i < product.rating ? 0 : 2} />
                        ))}
                     </div>
                     <span className="text-sm text-brand-dark underline font-medium cursor-pointer">{product.reviews} Reviews</span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-8">
                     <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wide mb-4">Choose Quantity</h3>
                     <div className="space-y-3">
                        {product.tiers?.map((tier) => (
                           <div
                              key={tier.id}
                              onClick={() => setSelectedTierId(tier.id)}
                              className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedTierId === tier.id ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-200 hover:border-brand-primary/50'}`}
                           >
                              {tier.badge && (
                                 <div className="absolute -top-3 right-4 bg-brand-secondary text-brand-dark text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-sm">
                                    {tier.badge}
                                 </div>
                              )}
                              <div>
                                 <div className="flex items-center gap-2">
                                    <span className="font-bold text-brand-dark text-lg">{tier.label}</span>
                                    {tier.saveLabel && (
                                       <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{tier.saveLabel}</span>
                                    )}
                                 </div>
                                 <p className="text-sm text-gray-500">{tier.subLabel}</p>
                              </div>
                              <div className="text-right">
                                 {tier.originalPrice && (
                                    <div className="text-xs text-gray-400 line-through">${tier.originalPrice.toFixed(2)}</div>
                                 )}
                                 <div className="text-xl font-serif font-bold text-brand-dark">${tier.price.toFixed(2)}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Frequency Selector */}
                  {product.subscriptionDiscount && (
                     <div className="mb-8">
                        <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wide mb-4">Choose Frequency</h3>
                        <div className="space-y-3">

                           {/* Subscribe Option */}
                           <div
                              onClick={() => setIsSubscribe(true)}
                              className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 relative ${isSubscribe ? 'border-brand-dark bg-brand-dark/5' : 'border-gray-200'}`}
                           >
                              <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${isSubscribe ? 'border-brand-dark' : 'border-gray-300'}`}>
                                 {isSubscribe && <div className="w-2.5 h-2.5 rounded-full bg-brand-dark" />}
                              </div>
                              <div className="flex-grow">
                                 <div className="flex items-center gap-2">
                                    <span className="font-bold text-brand-dark">Subscribe & Save 15%</span>
                                    <RefreshCw size={14} className="text-brand-dark" />
                                 </div>
                                 <p className="text-sm text-gray-500 mt-1">
                                    Best value. Cancel or pause anytime.
                                 </p>
                                 <div className="mt-2 text-xs text-brand-dark/70 flex flex-wrap gap-2">
                                    <span className="flex items-center"><Check size={10} className="mr-1" /> Free Shipping</span>
                                    <span className="flex items-center"><Check size={10} className="mr-1" /> Priority Inventory</span>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-lg font-serif font-bold text-brand-dark">
                                    ${((currentTier?.price || 0) * (1 - product.subscriptionDiscount)).toFixed(2)}
                                 </div>
                                 <div className="text-xs text-gray-400">/ shipment</div>
                              </div>
                           </div>

                           {/* One-time Option */}
                           <div
                              onClick={() => setIsSubscribe(false)}
                              className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${!isSubscribe ? 'border-brand-dark bg-brand-dark/5' : 'border-gray-200'}`}
                           >
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${!isSubscribe ? 'border-brand-dark' : 'border-gray-300'}`}>
                                 {!isSubscribe && <div className="w-2.5 h-2.5 rounded-full bg-brand-dark" />}
                              </div>
                              <div className="flex-grow">
                                 <span className="font-bold text-brand-dark">One-Time Purchase</span>
                              </div>
                              <div className="text-xl font-serif font-bold text-brand-dark">
                                 ${currentTier?.price.toFixed(2)}
                              </div>
                           </div>

                        </div>
                     </div>
                  )}

                  {/* Price & CTA */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 sticky bottom-4 z-20 md:static">
                     <div className="flex items-end justify-between mb-4">
                        <div>
                           <p className="text-sm text-gray-500 mb-1">Total Price</p>
                           <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold font-serif text-brand-dark">${finalPrice.toFixed(2)}</span>
                              {originalPrice && originalPrice > finalPrice && (
                                 <>
                                    <span className="text-sm text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
                                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Save {savings}%</span>
                                 </>
                              )}
                           </div>
                        </div>
                     </div>
                     <Button fullWidth onClick={() => {
                        if (!currentTier) return;
                        const label = `${currentTier.label} (${isSubscribe ? 'Subscription' : 'One-Time'})`;
                        addCartItem({
                           ...product,
                           price: finalPrice,
                           originalPrice: originalPrice
                        }, currentTier.quantity, label);
                     }}>
                        {isSubscribe ? 'Start Subscription' : 'Add To Cart'}
                     </Button>
                     <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center"><ShieldCheck size={12} className="mr-1" /> 60-Day Guarantee</span>
                        <span className="flex items-center"><Truck size={12} className="mr-1" /> Free Shipping over $75</span>
                     </div>
                  </div>

                  {/* Product Tabs/Accordion */}
                  <div className="space-y-6 border-t border-gray-200 pt-8">

                     {/* Description */}
                     <div>
                        <h3 className="text-lg font-bold text-brand-dark font-serif mb-3">Description</h3>
                        <p className="text-brand-dark/80 leading-relaxed mb-4">{product.description}</p>
                        {product.details?.features && (
                           <ul className="grid grid-cols-1 gap-2">
                              {product.details.features.map((feature, i) => (
                                 <li key={i} className="flex items-start text-sm text-brand-dark/80">
                                    <Check size={16} className="text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
                                    {feature}
                                 </li>
                              ))}
                           </ul>
                        )}
                     </div>

                     {/* Usage */}
                     {product.details?.usage && (
                        <div>
                           <h3 className="text-lg font-bold text-brand-dark font-serif mb-3">How To Use</h3>
                           <div className="bg-brand-cream p-4 rounded-xl border border-brand-primary/10">
                              <p className="text-brand-dark/90 text-sm">{product.details.usage}</p>
                           </div>
                        </div>
                     )}

                     {/* Product Specific FAQs */}
                     {product.faqs && product.faqs.length > 0 && (
                        <div>
                           <h3 className="text-lg font-bold text-brand-dark font-serif mb-3">Frequently Asked Questions</h3>
                           <div className="space-y-3">
                              {product.faqs.map((faq, index) => {
                                 const isOpen = openFaqIndex === index;
                                 return (
                                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                                       <button
                                          onClick={() => toggleFaq(index)}
                                          className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none hover:bg-gray-50 transition-colors"
                                       >
                                          <span className={`font-medium text-sm md:text-base ${isOpen ? 'text-brand-primary' : 'text-brand-dark'}`}>
                                             {faq.question}
                                          </span>
                                          <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                             {isOpen ? <Minus className="h-4 w-4 text-brand-primary" /> : <Plus className="h-4 w-4 text-gray-400" />}
                                          </div>
                                       </button>
                                       <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                          <div className="px-5 pb-5 pt-0 text-sm text-brand-dark/80 leading-relaxed border-t border-transparent">
                                             {faq.answer.map((para, i) => (
                                                <p key={i} className={i > 0 ? "mt-2" : ""}>{para}</p>
                                             ))}
                                          </div>
                                       </div>
                                    </div>
                                 );
                              })}
                           </div>
                        </div>
                     )}

                  </div>

               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductPage;