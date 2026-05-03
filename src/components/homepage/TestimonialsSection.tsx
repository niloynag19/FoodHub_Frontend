"use client";

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface ReviewData {
  id?: string;
  rating: number;
  comment: string;
  customer?: {
    name: string;
    profileImage?: string;
  };
}

interface TestimonialsSectionProps {
  initialReviews?: ReviewData[];
}

export const TestimonialsSection = ({ initialReviews = [] }: TestimonialsSectionProps) => {
  const defaultReviews = [
    {
      name: "Penny",
      role: "Vegan Chef & Practitioner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Penny",
      text: "Finally, a space that honors both the body and the Earth. The combination of yoga and plant-based living is pure magic.",
      rating: 5,
    },
    {
      name: "Johnny Wagner",
      role: "Operations Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Johnny",
      text: "The web service design has revolutionized our marketing campaigns, achieving remarkable success.",
      rating: 5,
    },
    {
      name: "Emma Watson",
      role: "Verified Buyer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      text: "The app interface is so intuitive and easy to use. I also really appreciate the real-time tracking feature so I know exactly when my food will arrive.",
      rating: 4,
    },
    {
      name: "David Smith",
      role: "Food Blogger",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      text: "As someone who reviews food for a living, I'm incredibly impressed by the quality control. The premium partners on this app never disappoint.",
      rating: 5,
    },
    {
      name: "Sarah Jenkins",
      role: "Food Enthusiast",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      text: "The delivery is always lightning fast, and the food arrives piping hot. FoodHub has completely changed my weeknight dinner routine!",
      rating: 5,
    },
  ];

  const displayReviews = initialReviews.length > 0 
    ? initialReviews.map(r => ({
        name: r.customer?.name || "Anonymous",
        role: "Verified Customer",
        avatar: r.customer?.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.customer?.name || "Anon"}`,
        text: r.comment,
        rating: r.rating || 5,
      }))
    : defaultReviews;

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { current } = sliderRef;
        const maxScrollLeft = current.scrollWidth - current.clientWidth;
        
        // If at the end of the slider, scroll back to the beginning
        if (current.scrollLeft >= maxScrollLeft - 10) {
          current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: current.offsetWidth * 0.8, behavior: 'smooth' });
        }
      }
    }, 3500); // Swipe every 3.5 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = direction === 'left' ? -(current.offsetWidth * 0.8) : (current.offsetWidth * 0.8);
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="py-24 bg-[#FAF8F5] dark:bg-zinc-950 transition-colors duration-300 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 dark:bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-500/10 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-bold tracking-wide uppercase border border-orange-200/50 dark:border-orange-500/20 shadow-sm">
              <Star size={16} className="fill-orange-500" />
              Customer Stories
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tight">
              Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 italic">Thousands</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Don't just take our word for it. Here's what our foodie community has to say about their experience.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => scroll('left')}
              className="h-12 w-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-sm active:scale-95 z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="h-12 w-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-sm active:scale-95 z-10"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-8 pb-12 scrollbar-hide items-stretch"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style dangerouslySetInnerHTML={{__html: `
              .scrollbar-hide::-webkit-scrollbar {
                  display: none;
              }
            `}} />
            
            {/* Leading Title Card */}
            <div className="snap-start snap-always w-[85vw] sm:w-[320px] lg:w-[350px] shrink-0 bg-[#A66127] dark:bg-orange-700 rounded-[2rem] p-10 flex flex-col justify-center shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
              <Quote className="text-white/40 w-16 h-16 mb-8 relative z-10 group-hover:scale-110 group-hover:text-white/60 transition-all duration-500" fill="currentColor" />
              <h2 className="text-4xl font-medium text-white leading-tight tracking-tight relative z-10">
                What our <br/> customers <br/> are saying
              </h2>
            </div>

            {/* Review Cards */}
            {displayReviews.map((review, i) => (
              <div 
                key={i} 
                className="snap-start snap-always w-[85vw] sm:w-[320px] lg:w-[350px] shrink-0 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-10 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center group cursor-grab active:cursor-grabbing"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-zinc-100 overflow-hidden mb-5 border-4 border-white dark:border-zinc-800 shadow-md shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                {/* Name & Role */}
                <h4 className="font-bold text-zinc-900 dark:text-white text-lg group-hover:text-[#A66127] dark:group-hover:text-orange-400 transition-colors">{review.name}</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{review.role}</p>
                
                {/* Rating */}
                <div className="flex gap-1.5 mb-6">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index} 
                      size={20} 
                      className={`${index < review.rating ? 'text-[#FFC107] fill-[#FFC107]' : 'text-zinc-200 dark:text-zinc-700'} transition-transform duration-300 group-hover:-translate-y-1`} 
                      style={{ transitionDelay: `${index * 50}ms` }}
                    />
                  ))}
                </div>
                
                {/* Review Text */}
                <p className="text-zinc-700 dark:text-zinc-300 text-[15px] font-medium leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
