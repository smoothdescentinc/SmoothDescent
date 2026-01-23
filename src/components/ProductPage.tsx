import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '@nanostores/react';
import { products, isLoading, fetchProducts } from '../store/productsStore';
import Button from './Button';
import { addCartItem } from '../store/cartStore';
import { Star, Check, ShieldCheck, Truck, RefreshCw, ChevronRight, Plus, Minus, Loader2 } from 'lucide-react';
import { trackViewContent } from '../lib/metaPixel';
import HydrationContent from './HydrationContent';
import DoctorCard from './DoctorCard';

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
   const [activeImage, setActiveImage] = useState<string>('');
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
      // Set initial active image
      if (product) {
         setActiveImage(product.image);
      }
   }, [product]);

   // Track ViewContent event for Meta Pixel
   useEffect(() => {
      if (product) {
         trackViewContent({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category
         });
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

   // Prepare images list
   const images = [product.image];
   if (product.nutritionLabel) {
      images.push(product.nutritionLabel);
   }

   const isHydration = product.id === 'hydration';

   return (
      <div className="bg-brand-light min-h-screen pb-20">

         {/* Standard Product Content Container */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <div className="py-4 text-sm text-gray-500">
               <Link to="/" className="hover:text-brand-primary">Home</Link>
               <ChevronRight className="inline mx-2 h-4 w-4" />
               <Link to="/#products" className="hover:text-brand-primary">Shop</Link>
               <ChevronRight className="inline mx-2 h-4 w-4" />
               <span className="text-brand-dark font-medium">{product.name}</span>
            </div>

            <div className="pt-6 pb-12">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                  {/* Left: Images */}
                  <div className="space-y-6">
                     <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-brand-primary/10 relative">
                        <span className="absolute top-6 left-6 bg-[#D4A5A5] text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 tracking-widest uppercase">
                           {product.category}
                        </span>
                        <img
                           src={activeImage || product.image}
                           alt={product.name}
                           className={`w-full h-full transition-transform duration-500 ${(activeImage === product.nutritionLabel)
                              ? 'object-contain scale-100 p-2'
                              : 'object-cover scale-[1.12]'
                              }`}
                        />
                     </div>
                     {/* Thumbnails */}
                     {images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                           {images.map((img, i) => (
                              <div
                                 key={i}
                                 onClick={() => setActiveImage(img)}
                                 className={`aspect-square rounded-xl bg-white border cursor-pointer overflow-hidden p-2 ${activeImage === img ? 'border-brand-primary ring-1 ring-brand-primary' : 'border-transparent hover:border-brand-primary/30'}`}
                              >
                                 <img src={img} alt="" className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity" />
                              </div>
                           ))}
                        </div>
                     )}
                     <DoctorCard className="mt-8" />
                  </div>

                  {/* Right: Details & Buy Box */}
                  <div>
                     {/* Rating Row */}
                     <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <div className="flex text-amber-400">
                           {[...Array(5)].map((_, i) => (
                              <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                           ))}
                        </div>
                        <span className="text-brand-dark font-semibold">Excellent {product.rating}</span>
                        <span className="text-brand-primary">|</span>
                        <span className="text-brand-dark/70">{product.reviews.toLocaleString()}+ Trusted Reviews</span>
                     </div>

                     {/* Title */}
                     <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">{product.name}</h1>

                     {/* Subtitle */}
                     {product.details?.subtitle && (
                        <p className="text-xl text-brand-accent font-medium mb-4">{product.details.subtitle}</p>
                     )}

                     {/* Feature Checklist */}
                     {product.details?.checklist && (
                        <div className="space-y-3 mb-6">
                           {product.details.checklist.map((item, i) => {
                              const isLastItem = i === (product.details?.checklist?.length || 0) - 1;
                              return (
                                 <div key={i} className="flex items-center gap-3 group">
                                    <div className="w-6 h-6 bg-brand-dark rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                       <Check size={14} className="text-white" strokeWidth={3} />
                                    </div>
                                    {isLastItem && item.includes('Satisfaction Guarantee') ? (
                                       <span className="text-brand-dark text-lg">
                                          100% <span className="underline decoration-brand-primary decoration-2 underline-offset-2">Satisfaction Guarantee</span> or <span className="underline decoration-brand-primary decoration-2 underline-offset-2">Money Back</span>
                                       </span>
                                    ) : (
                                       <span className="text-brand-dark text-lg">{item}</span>
                                    )}
                                 </div>
                              );
                           })}
                        </div>
                     )}

                     {/* Quantity Selector - Premium Style */}
                     {product.tiers && (
                        <div className="mb-6">
                           <div className="space-y-3">
                              {product.tiers.map((tier, index) => {
                                 const isSelected = selectedTierId === tier.id;
                                 const tierPrice = isSubscribe && product.subscriptionDiscount
                                    ? tier.price * (1 - product.subscriptionDiscount)
                                    : tier.price;
                                 const tierOriginalPrice = tier.originalPrice || 0;
                                 const savePercent = tier.savePercent || (tierOriginalPrice > 0 ? Math.round(((tierOriginalPrice - tier.price) / tierOriginalPrice) * 100) : 0);
                                 const isFirstTier = index === 0;
                                 const isBestValue = tier.badge === 'Best Value';
                                 const isMostPopular = tier.badge === 'Most Popular';

                                 return (
                                    <div
                                       key={tier.id}
                                       onClick={() => setSelectedTierId(tier.id)}
                                       className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                                          isSelected
                                             ? 'border-brand-dark bg-gradient-to-r from-brand-cream to-brand-secondary/20 shadow-sm'
                                             : 'border-brand-primary/30 hover:border-brand-primary bg-white'
                                       }`}
                                    >
                                       {/* Badge - Most Popular / Best Value */}
                                       {tier.badge && (
                                          <div className={`absolute -top-3 right-4 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm ${
                                             isBestValue
                                                ? 'bg-gradient-to-r from-brand-accent to-brand-primary text-white'
                                                : 'bg-brand-dark text-white'
                                          }`}>
                                             {isBestValue && '✨ '}{tier.badge}
                                          </div>
                                       )}

                                       {/* Left side - Radio + Label */}
                                       <div className="flex items-center gap-3">
                                          {/* Radio button */}
                                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                             isSelected
                                                ? 'border-brand-dark bg-brand-dark scale-110'
                                                : 'border-brand-primary/50 bg-white hover:border-brand-primary'
                                          }`}>
                                             {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                          </div>

                                          <div>
                                             <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-bold text-brand-dark text-lg">{tier.label}</span>
                                                {savePercent > 0 && (
                                                   <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                                      isFirstTier
                                                         ? 'bg-brand-dark text-white'
                                                         : 'bg-brand-primary/20 text-brand-dark border border-brand-primary/30'
                                                   }`}>
                                                      SAVE {savePercent}%
                                                   </span>
                                                )}
                                             </div>
                                             {tier.subLabel && (
                                                <p className="text-sm text-brand-dark/60 mt-0.5">{tier.subLabel}</p>
                                             )}
                                          </div>
                                       </div>

                                       {/* Right side - Price */}
                                       <div className="text-right">
                                          <div className="text-2xl font-bold text-brand-dark">${tierPrice.toFixed(2)}</div>
                                          {tierOriginalPrice > 0 && tierOriginalPrice > tierPrice && (
                                             <div className="text-sm text-brand-primary line-through">${tierOriginalPrice.toFixed(2)}</div>
                                          )}
                                       </div>
                                    </div>
                                 );
                              })}
                           </div>

                           {/* Subscription Toggle Box */}
                           {product.subscriptionDiscount && (
                              <div className="mt-6 p-5 rounded-xl border-2 border-dashed border-brand-secondary bg-gradient-to-br from-brand-cream to-brand-secondary/20">
                                 {/* Toggle */}
                                 <div className="flex items-center gap-3 mb-3">
                                    <button
                                       onClick={() => setIsSubscribe(!isSubscribe)}
                                       className={`relative w-14 h-7 rounded-full transition-all duration-300 ${isSubscribe ? 'bg-brand-dark' : 'bg-brand-primary/40'}`}
                                    >
                                       <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${isSubscribe ? 'translate-x-8' : 'translate-x-1'}`} />
                                    </button>
                                    <span className="font-bold text-brand-dark text-lg">Save 15% With Automatic Refills</span>
                                 </div>

                                 <p className="text-sm text-brand-dark/70 mb-4">
                                    No Commitments. Cancel Anytime. Free items included in first order only.
                                 </p>

                                 {/* Delivery Dropdown */}
                                 <div className="bg-white border border-brand-primary/30 rounded-lg px-4 py-3 shadow-sm">
                                    <span className="text-brand-dark font-medium">Delivered every month</span>
                                 </div>
                              </div>
                           )}
                        </div>
                     )}

                     {/* Price & CTA */}
                     {product.tiers ? (
                        <div className="mb-8 sticky bottom-4 z-20 md:static">
                           {/* Free Shipping Banner */}
                           <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                              <div className="bg-brand-secondary/40 text-brand-dark text-sm font-semibold px-4 py-2 rounded-full border border-brand-secondary">
                                 <Truck size={14} className="inline mr-1.5 -mt-0.5" />
                                 <span className="font-bold">FREE SHIPPING</span> over $50
                              </div>
                              <div className="flex items-baseline gap-2">
                                 {originalPrice && originalPrice > finalPrice && (
                                    <span className="text-lg text-brand-primary line-through">${originalPrice.toFixed(2)}</span>
                                 )}
                                 <span className="text-3xl font-bold text-brand-dark">${finalPrice.toFixed(2)}</span>
                              </div>
                           </div>

                           {/* Add to Cart Button */}
                           <button
                              onClick={() => {
                                 if (!currentTier) return;
                                 const label = `${currentTier.label} (${isSubscribe ? 'Subscription' : 'One-Time'})`;
                                 addCartItem({
                                    ...product,
                                    price: finalPrice,
                                    originalPrice: originalPrice
                                 }, currentTier.quantity, label);
                              }}
                              className="w-full bg-brand-dark hover:bg-brand-dark/90 text-white font-bold text-xl py-5 rounded-xl transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                           >
                              ADD TO CART
                           </button>

                           {/* Money Back Guarantee */}
                           <div className="mt-4 bg-gradient-to-r from-brand-cream to-brand-secondary/30 rounded-xl px-4 py-3 flex items-start gap-3 border border-brand-secondary/50">
                              <div className="w-6 h-6 bg-brand-dark rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                 <ShieldCheck size={14} className="text-white" />
                              </div>
                              <p className="text-sm text-brand-dark">
                                 <span className="italic">Less than 0.1%</span> of customers claim our <span className="font-bold">30 Day Money Back Guarantee*</span>
                              </p>
                           </div>
                        </div>
                     ) : (
                        /* Original CTA for other products */
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
                     )}

                     {/* Standard Product Tabs/Accordion */}
                     {!isHydration && (
                        <div className="space-y-6 border-t border-gray-200 pt-8 hidden">
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
                     )}

                  </div>
               </div>
            </div>
         </div>

         {/* RICH CONTENT FOR HYDRATION PAGE */}
         {isHydration && <HydrationContent />}

         {/* Full Width FAQs for All Products */}
         {product.faqs && product.faqs.length > 0 && (
            <>
               {/* Full Width FAQs */}
               {product.faqs.length > 0 && (
                  <div className="border-t border-gray-200 bg-white">
                     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-brand-dark mb-12">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                           {product.faqs.map((faq, index) => {
                              const isOpen = openFaqIndex === index;
                              return (
                                 <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                                    <button
                                       onClick={() => toggleFaq(index)}
                                       className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none hover:bg-gray-50 transition-colors"
                                    >
                                       <span className={`font-bold text-lg ${isOpen ? 'text-brand-primary' : 'text-brand-dark'}`}>
                                          {faq.question}
                                       </span>
                                       <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                          {isOpen ? <Minus className="h-5 w-5 text-brand-primary" /> : <Plus className="h-5 w-5 text-gray-400" />}
                                       </div>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                       <div className="px-6 pb-6 pt-0 text-base text-brand-dark/80 leading-relaxed">
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
                  </div>
               )}
            </>
         )}

      </div>
   );
};

export default ProductPage;