import React, { useRef, useState } from 'react';
import { REVIEWS, REVIEWS_COPY } from '../constants';
import { Star, CheckCircle } from 'lucide-react';

const Reviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="reviews" className="py-20 bg-brand-cream overflow-hidden">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4">
            {REVIEWS_COPY.headline}
          </h2>
          <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto mb-8">
            {REVIEWS_COPY.subheadline}
          </p>
          <div className="flex items-center justify-center gap-3 bg-white inline-block px-6 py-3 rounded-full shadow-sm mx-auto border border-brand-primary/10">
            <div className="flex text-brand-secondary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="font-bold text-brand-dark tracking-tight">{REVIEWS_COPY.aggregate}</span>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex overflow-x-auto gap-6 snap-x snap-mandatory pb-8 px-4 -mx-4 md:mx-0 md:px-0 no-scrollbar cursor-grab active:cursor-grabbing ${isDragging ? 'cursor-grabbing select-none snap-none' : ''}`}
        >
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="snap-center shrink-0 w-[85vw] sm:w-[350px] bg-white p-8 rounded-2xl border border-brand-primary/5 shadow-sm hover:shadow-md transition-all select-none"
            >
              <div className="flex text-brand-secondary mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <h3 className="text-xl font-bold font-serif text-brand-dark mb-3 line-clamp-2 min-h-[3.5rem]">
                "{review.headline}"
              </h3>
              <p className="text-brand-dark/80 mb-6 flex-grow leading-relaxed min-h-[6rem]">
                {review.body}
              </p>

              <div className="border-t border-gray-100 pt-4 mt-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-brand-primary font-serif">{review.author}</p>
                    <div className="flex items-center text-xs text-brand-success mt-1 font-medium">
                      <CheckCircle size={12} className="mr-1" />
                      Verified Buyer
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{review.timeAgo}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 italic truncate">
                  Product: {review.verifiedProduct}
                </p>
              </div>
            </div>
          ))}
          {/* Spacer for end of list scrolling */}
          <div className="w-4 shrink-0 md:hidden"></div>
        </div>

      </div>
    </section>
  );
};

export default Reviews;