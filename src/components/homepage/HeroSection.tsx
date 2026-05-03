"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, Search, Sparkles, BrainCircuit, Clock, Star, TrendingUp, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { mealService } from "@/services/meals.services";
import { Meal } from "@/types/types";
import { MealCard } from "@/components/meals/Meals.Card";

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1920&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1920&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1920&auto=format&fit=crop", 
];

const AUTOCOMPLETE_SUGGESTIONS = [
  "Spicy chicken wings with ranch",
  "Healthy vegan quinoa bowl",
  "Double cheeseburger and fries",
  "Sushi rolls combo platter",
  "Pepperoni and mushroom pizza",
  "Grilled salmon with asparagus",
  "Gluten-free margherita pizza",
  "Low carb keto salad",
  "Spicy pad thai noodles",
  "Classic beef tacos"
];

interface HeroSectionProps {
  displayImage?: string;
}

export const HeroSection = ({ displayImage }: HeroSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<Meal[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    setIsSearchFocused(false);

    try {
      const response = await mealService.getAllMeals({ search: query, limit: 8 });
      setSearchResults(response?.data || []);
      
      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displaySuggestions = searchQuery 
    ? AUTOCOMPLETE_SUGGESTIONS.filter(suggestion => 
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ) // Show all matches when typing to enable scrolling
    : AUTOCOMPLETE_SUGGESTIONS.slice(0, 6); // Show 6 suggestions by default to trigger scroll

  return (
    <div className="flex flex-col">
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 -mt-24">
        {/* Background Slider */}
        {BACKGROUND_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt="Hero Background"
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/80 z-10" />

        <div className="container mx-auto px-4 relative z-20 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full mb-6 shadow-lg hover:bg-white/20 transition-colors cursor-default"
          >
            <BrainCircuit className="text-amber-400 animate-pulse" size={18} />
            <span className="text-sm font-bold tracking-wide uppercase">
              AI-Powered Recommendations
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-white mb-6 drop-shadow-2xl"
          >
            CRAVING? <br className="hidden md:block" />
            <span className="text-orange-500 italic">WE DELIVER</span> <br className="hidden md:block" />
            HAPPINESS.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-zinc-200 font-medium max-w-2xl mx-auto mb-4 drop-shadow-md"
          >
            Tell our AI what you're in the mood for. We'll search our menu to find your perfect meal in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 text-sm md:text-base font-semibold text-zinc-300 drop-shadow-md"
          >
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
              <Clock className="text-amber-400" size={18} />
              <span>Under 30 Min Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
              <Star className="text-amber-400" size={18} />
              <span>Top Rated Restaurants</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
              <TrendingUp className="text-amber-400" size={18} />
              <span>Live Order Tracking</span>
            </div>
          </motion.div>

          {/* AI Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-2xl mx-auto mb-8 relative group z-30"
            ref={searchRef}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-amber-400 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <div className="relative flex items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-full p-1.5 shadow-2xl transition-all duration-300">
              <Sparkles className="ml-4 text-orange-500" size={20} />
              <Input
                placeholder="Ask AI: 'I want something spicy and healthy...'"
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base py-3 placeholder:text-zinc-500 text-zinc-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                  }
                }}
              />
              {searchQuery && (
                <button 
                  onClick={clearSearch}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-400 transition-colors mr-2"
                >
                  <X size={20} />
                </button>
              )}
              <Button 
                onClick={() => handleSearch(searchQuery)}
                disabled={isSearching}
                className="h-full px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-base gap-2 transition-all duration-300 shadow-lg shadow-orange-500/30"
              >
                {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                <span className="hidden sm:inline">{isSearching ? "Searching..." : "Find Food"}</span>
              </Button>
            </div>

            {/* Autocomplete Dropdown */}
            <AnimatePresence>
              {isSearchFocused && displaySuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden text-left z-50"
                >
                  <div className="p-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                    <div className="px-4 py-2 text-xs font-bold text-zinc-400 uppercase tracking-wider sticky top-0 bg-white dark:bg-zinc-900 z-10">
                      Suggestions
                    </div>
                    {displaySuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setIsSearchFocused(false);
                        }}
                      >
                        <Search size={16} className="text-zinc-400" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* AI Suggestions / Popular */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-3 relative z-20"
          >
            <span className="text-sm font-semibold text-zinc-300 drop-shadow-md flex items-center gap-1">
              <Sparkles size={14} className="text-amber-400" />
              Popular:
            </span>
            {["High Protein", "Spicy Cravings", "Vegan Comfort", "Under 500 Calories"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                }}
                className="px-4 py-1.5 text-sm font-bold text-white bg-white/10 hover:bg-orange-500 hover:border-orange-400 border border-white/20 backdrop-blur-md rounded-full transition-all duration-300 shadow-md"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dynamic Search Results Section */}
      <AnimatePresence>
        {hasSearched && (
          <motion.section 
            ref={resultsRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#FDFCFB] dark:bg-zinc-950 py-24 border-t border-zinc-100 dark:border-zinc-800 scroll-mt-20"
          >
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Search Results</h2>
                  <p className="text-zinc-500 font-medium mt-1">Found {searchResults.length} matches for "{searchQuery}"</p>
                </div>
                <Button variant="ghost" onClick={clearSearch} className="font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                  <X className="size-4 mr-2" /> Clear Search
                </Button>
              </div>

              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="size-12 text-orange-500 animate-spin mb-4" />
                  <p className="text-zinc-500 font-bold animate-pulse">Our AI is finding the best meals for you...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {searchResults.map((meal) => (
                    <motion.div 
                      key={meal.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MealCard meal={meal} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-[2.5rem] border-2 border-dashed border-zinc-100 dark:border-zinc-800">
                  <div className="size-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="size-10 text-zinc-400" />
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">No matches found</h3>
                  <p className="text-zinc-500 max-w-sm mx-auto">We couldn't find any meals matching your current search. Try different keywords or browse our categories.</p>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
