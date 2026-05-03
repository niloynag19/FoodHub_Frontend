"use client";

import Image from "next/image";
import { ShoppingCart, Star, Clock, Heart, ArrowUpRight, Flame, User, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Meal } from "@/types/types";
import Link from "next/link";
import { Global_Image } from "@/lib/defaultImage";
import { cn } from "@/lib/utils";

import { useRef, useEffect, useState } from "react";

interface MealCardProps {
  meal: Meal;
  showProvider?: boolean;
  showCategory?: boolean;
  compact?: boolean;
  onAddToCart?: (meal: Meal) => void;
  onToggleFavorite?: (mealId: string) => void;
  isFavorite?: boolean;
}

export function MealCard({
  meal,
  showProvider = true,
  showCategory = true,
  compact = false,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false
}: MealCardProps) {
  const detailUrl = `/meals/${meal.id}`;

  // Calculate average rating from reviews
  const calculateRating = () => {
    if (!meal.reviews || meal.reviews.length === 0) return null;

    // Type-safe rating calculation
    const total = meal.reviews.reduce((sum: number, review: any) => {
      return sum + (typeof review.rating === 'number' ? review.rating : 0);
    }, 0);

    return total / meal.reviews.length;
  };

  const averageRating = calculateRating();

  // Format date without date-fns
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: diffDays > 365 ? 'numeric' : undefined
      });
    } catch {
      return "Recently";
    }
  };

  const timeSinceCreated = formatDate(meal.createdAt);

  // Check if meal is new (less than 7 days)
  const checkIsNew = () => {
    try {
      const createdDate = new Date(meal.createdAt);
      const currentDate = new Date();
      const diffTime = currentDate.getTime() - createdDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays < 7;
    } catch {
      return false;
    }
  };

  const isNew = checkIsNew();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Handle favorite toggle
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(meal.id);
    }
  };


  if (compact) {
    return (
      <Card className="group relative overflow-hidden rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg hover:shadow-2xl transition-all duration-300">
        <Link href={detailUrl} className="flex items-stretch">
          {/* Image Container */}
          <div className="relative w-28 h-28 flex-shrink-0 m-2 overflow-hidden rounded-2xl">
            <Image
              src={meal.image || Global_Image}
              alt={meal.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="112px"
            />
            {!meal.isAvailable && (
              <div className="absolute inset-0 bg-red-500/80 backdrop-blur-sm flex items-center justify-center">
                <Badge variant="destructive" className="text-[9px] font-black px-2 py-0.5 tracking-tighter">
                  SOLD OUT
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">{meal.name}</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-tight font-medium">{meal.description}</p>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-50 dark:border-zinc-800/50">
              <span className="font-black text-orange-600 text-sm">৳{meal.price.toFixed(0)}</span>
              <div className="h-7 px-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-wider">
                VIEW
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] border-2 border-zinc-100 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/70 backdrop-blur-xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(251,146,60,0.2)] hover:-translate-y-2">

      {/* Image Container */}
      <Link href={detailUrl} className="relative h-60 w-full overflow-hidden block p-3">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-zinc-100">
        <Image
          src={meal.image || Global_Image}
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        {/* Gradient Overlay for Top/Bottom Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/30 pointer-events-none" />

        {/* Top Badges Container */}
        <div className="absolute top-4 inset-x-4 flex justify-between items-start z-10 pointer-events-none">
          <div className="flex flex-col gap-2 pointer-events-auto">
            {showCategory && meal.category && (
              <Badge className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-800/50 px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-widest font-black shadow-lg backdrop-blur-md">
                {meal.category.name}
              </Badge>
            )}

            {isNew && (
              <Badge className="bg-emerald-500 text-white border-none px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-widest font-black shadow-lg">
                NEW
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all pointer-events-auto z-20"
            onClick={handleFavoriteClick}
            aria-label="Toggle Favorite"
          >
            <Heart className={cn(
              "size-5 transition-all",
              isFavorite ? "fill-rose-500 text-rose-500 scale-110" : "text-zinc-400 hover:text-rose-500"
            )} />
          </button>
        </div>

        {/* Bottom Image Info */}
        <div className="absolute bottom-4 inset-x-4 flex justify-between items-end z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl px-3 py-1.5 shadow-lg backdrop-blur-md">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{averageRating ? averageRating.toFixed(1) : 'New'}</span>
            {averageRating && <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-black">({meal.reviews?.length || 0})</span>}
          </div>

          {!meal.isAvailable && (
            <Badge variant="destructive" className="px-3 py-1.5 rounded-xl text-[11px] uppercase tracking-wider font-black shadow-lg">
              Sold Out
            </Badge>
          )}
        </div>
        </div>
      </Link>

      {/* Card Content */}
      <CardContent className="flex flex-col flex-grow p-6 space-y-4">
        {/* Title and Provider */}
        <div>
          <div className="flex justify-between items-start gap-4 mb-2">
            <Link href={detailUrl} className="group/title flex-1">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight line-clamp-1 group-hover/title:text-orange-600 transition-colors">
                {meal.name}
              </h3>
            </Link>
            <div className="text-right shrink-0">
              <span className="text-2xl font-black text-orange-600 tracking-tight">৳{meal.price.toFixed(0)}</span>
            </div>
          </div>

          {showProvider && meal.provider && (
            <div className="flex items-center gap-1.5 text-sm text-zinc-500 font-semibold">
              <User className="size-3.5" />
              <span>By {meal.provider.name}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed flex-grow font-medium">
          {meal.description}
        </p>

        {/* Meta Details List */}
        <div className="flex items-center gap-3 pt-4 border-t border-zinc-100/80 dark:border-zinc-800/50">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 px-2.5 py-1.5 rounded-xl">
            <Clock className="size-3.5 text-blue-500" />
            <span>20-30 min</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 px-2.5 py-1.5 rounded-xl">
            <Flame className="size-3.5 text-orange-500" />
            <span>350 kcal</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg ml-auto">
            <span>Free Delivery</span>
          </div>
        </div>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="p-6 pt-0">
        <div className="w-full">
          <Button
            asChild
            variant="outline"
            className="h-12 w-full rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-black tracking-tight transition-all shadow-sm hover:shadow-orange-500/10"
          >
            <Link href={detailUrl}>
              View Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Optional: Helper function to format dates
export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
};

// Grid and List Layout Components
export function MealCardGrid({ meals, ...props }: { meals: Meal[] } & Omit<MealCardProps, 'meal'>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} {...props} />
      ))}
    </div>
  );
}


export function MealCardSlider({ meals, ...props }: { meals: Meal[] } & Omit<MealCardProps, 'meal'>) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      // Scroll by roughly the width of one card + gap
      const scrollAmount = direction === 'left' ? -(current.offsetWidth * 0.8) : (current.offsetWidth * 0.8);
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isHovered || meals.length <= 1) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { current } = sliderRef;
        const scrollAmount = current.offsetWidth * 0.8;

        // If we've reached the end, scroll back to start smoothly
        if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 10) {
          current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3500); // 3.5 seconds interval

    return () => clearInterval(interval);
  }, [isHovered, meals.length]);

  return (
    <div
      className="relative group/slider w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div
        ref={sliderRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
        `}} />
        {meals.map((meal) => (
          <div key={meal.id} className="snap-start snap-always w-[85vw] sm:w-[320px] md:w-[350px] shrink-0 transform transition-all duration-300 hover:-translate-y-1">
            <MealCard meal={meal} {...props} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile, shown on hover for desktop */}
      <div className="hidden md:block">
        <button
          onClick={() => scroll('left')}
          className="absolute top-1/2 -translate-y-1/2 left-0 -ml-5 z-10 h-12 w-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center justify-center text-zinc-600 hover:text-orange-500 opacity-0 group-hover/slider:opacity-100 transition-all hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute top-1/2 -translate-y-1/2 right-0 -mr-5 z-10 h-12 w-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center justify-center text-zinc-600 hover:text-orange-500 opacity-0 group-hover/slider:opacity-100 transition-all hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export function MealCardList({ meals, ...props }: { meals: Meal[] } & Omit<MealCardProps, 'meal'>) {
  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} compact {...props} />
      ))}
    </div>
  );
}

// Loading Skeleton
export function MealCardSkeleton({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Card className="animate-pulse overflow-hidden rounded-xl border border-gray-100">
        <div className="flex items-stretch">
          <div className="w-24 h-24 bg-gray-200 flex-shrink-0" />
          <div className="flex-1 p-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-16" />
              <div className="h-7 w-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="animate-pulse flex flex-col h-full overflow-hidden rounded-2xl border border-gray-100">
      <div className="aspect-[4/3] w-full bg-gray-200" />
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
        <div className="h-10 bg-gray-200 rounded-xl" />
      </CardContent>
    </Card>
  );
}