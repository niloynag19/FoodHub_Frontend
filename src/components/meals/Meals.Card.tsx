"use client";

import Image from "next/image";
import { ShoppingCart, Star, Clock, Heart, ArrowUpRight, Flame, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Meal } from "@/types/types"; 
import Link from "next/link";
import { Global_Image } from "@/lib/defaultImage";
import { cn } from "@/lib/utils";

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

  // Handle favorite toggle
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(meal.id);
    }
  };

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart && meal.isAvailable) {
      onAddToCart(meal);
    }
  };

  if (compact) {
    return (
      <Card className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <Link href={detailUrl} className="flex items-stretch">
          {/* Image Container */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={meal.image || Global_Image}
              alt={meal.name}
              fill
              className="object-cover"
              sizes="96px"
            />
            {!meal.isAvailable && (
              <div className="absolute inset-0 bg-red-500/90 flex items-center justify-center">
                <Badge variant="destructive" className="text-[10px] font-bold px-2 py-0.5">
                  SOLD OUT
                </Badge>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 p-3 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-sm line-clamp-1 mb-1">{meal.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-2">{meal.description}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-bold text-orange-600 text-sm">{meal.price.toFixed(2)} TK</span>
              <Button 
                size="sm" 
                disabled={!meal.isAvailable}
                onClick={handleAddToCart}
                className="h-7 px-2 text-xs bg-orange-600 hover:bg-orange-700"
              >
                Add
              </Button>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-orange-200">
      
      {/* Image Container */}
      <Link href={detailUrl} className="relative aspect-[4/3] w-full overflow-hidden block bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={ Global_Image}
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Top Badges Container */}
        <div className="absolute top-3 inset-x-3 flex justify-between items-start z-10">
          {/* Left Badges */}
          <div className="flex flex-col gap-2">
            {showCategory && meal.category && (
              <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-none px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm capitalize">
                {meal.category.name}
              </Badge>
            )}
            
            {isNew && (
              <Badge className="bg-green-500 text-white border-none px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                NEW
              </Badge>
            )}
            
            {averageRating && averageRating > 4.5 && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                <Flame className="size-3 mr-1" /> Top Rated
              </Badge>
            )}
          </div>
          
          {/* Right Badges */}
          <div className="flex flex-col gap-2 items-end">
            <Button 
              size="icon" 
              variant="ghost"
              className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:scale-105 transition-all"
              onClick={handleFavoriteClick}
            >
              <Heart className={cn(
                "size-4 transition-all",
                isFavorite 
                  ? "fill-rose-500 text-rose-500" 
                  : "text-gray-600 hover:text-rose-500"
              )} />
            </Button>
            
            {!meal.isAvailable && (
              <Badge variant="destructive" className="px-3 py-1.5 rounded-full text-xs font-bold">
                Sold Out
              </Badge>
            )}
          </div>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-sm font-black">{meal.price.toFixed(2)} TK</span>
          </div>
        </div>
      </Link>

      {/* Card Content */}
      <CardContent className="flex flex-col flex-grow p-4 space-y-3">
        {/* Title and Description */}
        <div className="space-y-2">
          <Link href={detailUrl} className="group/title block">
            <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1 group-hover/title:text-orange-600 transition-colors">
              {meal.name}
            </h3>
          </Link>
          
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {meal.description}
          </p>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {averageRating ? (
              <>
                <div className="flex items-center gap-1 bg-gradient-to-br from-amber-50 to-orange-50 px-2 py-1 rounded-lg">
                  <Star className="size-3.5 fill-amber-500 text-amber-500" />
                  <span className="text-xs font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-gray-500">
                  ({meal.reviews?.length || 0} reviews)
                </span>
              </>
            ) : (
              <Badge variant="outline" className="text-xs">
                No reviews yet
              </Badge>
            )}
          </div>
          
          {/* Time Since Creation */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="size-3" />
            <span>{timeSinceCreated}</span>
          </div>
        </div>

        {/* Provider Info */}
        {showProvider && meal.provider && (
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center border-2 border-white shadow-sm">
                  <User className="size-3.5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {meal.provider.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Verified Provider
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cooking Time */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="size-4 text-orange-500" />
          <span>Prep time: 20-30 mins</span>
        </div>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button 
            asChild
            variant="outline"
            className="h-10 flex-grow rounded-xl border-gray-200 bg-gray-50 hover:bg-gray-100 hover:text-orange-600 hover:border-orange-200 transition-all group/btn"
          >
            <Link href={detailUrl} className="flex items-center justify-center">
              <span className="text-sm font-semibold">View Details</span>
              <ArrowUpRight className="size-3.5 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          </Button>

          <Button 
            disabled={!meal.isAvailable}
            size="icon"
            onClick={handleAddToCart}
            className={cn(
              "h-10 w-10 shrink-0 rounded-xl text-white shadow-lg hover:shadow-xl active:scale-95 transition-all",
              meal.isAvailable 
                ? "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600" 
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            <ShoppingCart className="size-5" />
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