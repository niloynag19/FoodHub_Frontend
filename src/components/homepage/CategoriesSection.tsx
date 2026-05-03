import {
  ChevronRight,
  ChefHat,
  Flame,
  Star,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getAllCategoriesAction } from "@/actions/category.actions";
import { Global_Image } from "@/lib/defaultImage";

export const CategoriesSection = async () => {
  const result = await getAllCategoriesAction();
  // Fetch all categories to create a full continuous slider
  const categories = result?.data || [];

  const trendingIds = ["1", "4", "7"];
  const popularIds = ["2", "5", "8"];
  const quickIds = ["3", "6", "9"];

  const getCategoryStatus = (id: string) => {
    if (trendingIds.includes(id)) return { type: "trending", icon: <Flame className="w-3 h-3" />, label: "Trending" };
    if (popularIds.includes(id)) return { type: "popular", icon: <Star className="w-3 h-3" />, label: "Popular" };
    if (quickIds.includes(id)) return { type: "quick", icon: <Clock className="w-3 h-3" />, label: "Quick" };
    return null;
  };

  return (
    <section className="py-20 bg-zinc-100 dark:bg-zinc-800/40">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2">
              <div className="h-1 w-6 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
              <span className="text-orange-600 font-black uppercase text-xs tracking-widest">
                Explore
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black">
              <span className="bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent tracking-tight">
                Curated{" "}
              </span>
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent italic tracking-tighter">
                Culinary Experiences
              </span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-lg leading-relaxed">
              From fiery street food favorites to gourmet health bowls, dive into a hand-picked selection of global cuisines prepared by our top-tier local providers.
            </p>
          </div>

          <Button
            asChild
            variant="ghost"
            className="group mt-6 lg:mt-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/20"
          >
            <Link href="/categories" className="gap-2">
              View All Categories
              <ChevronRight
                className="group-hover:translate-x-1 transition-transform"
                size={16}
              />
            </Link>
          </Button>
        </div>

        <div className="relative overflow-hidden w-full group py-4">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-zinc-50 dark:from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-zinc-50 dark:from-black to-transparent z-10 pointer-events-none" />
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.333333%); }
            }
            .animate-marquee {
              animation: marquee ${Math.max(25, categories.length * 4)}s linear infinite;
            }
            .group:hover .animate-marquee {
              animation-play-state: paused;
            }
          `}} />

          {/* Marquee Container */}
          <div className="flex gap-6 sm:gap-8 pr-6 sm:pr-8 w-max animate-marquee">
            {/* Duplicate array 3 times for seamless infinite scroll */}
            {[...categories, ...categories, ...categories].map((cat: any, index: number) => {
              const status = getCategoryStatus(cat.id || String(index % categories.length));
              const recipeCount = Math.floor(Math.random() * 80) + 20;
              const rating = (Math.random() * (5 - 4.2) + 4.2).toFixed(1);

              return (
                <Link
                  key={`${cat.id || index}-${index}`}
                  href={`/categories/${cat.id}`}
                  className="group/card relative flex flex-col outline-none w-[280px] sm:w-[320px] shrink-0"
                >
                  {/* Card Container */}
                  <div className="relative h-full bg-white dark:bg-zinc-900/60 backdrop-blur-xl rounded-[2.5rem] border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl shadow-zinc-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 overflow-hidden flex flex-col group-hover/card:-translate-y-2 group-hover/card:border-orange-500/30">
                    
                    {/* Image Section */}
                    <div className="relative h-56 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent z-10" />
                      <Image 
                        src={cat.image || Global_Image} 
                        alt={cat.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover/card:scale-110 transition-transform duration-700" 
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
                        {status && (
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm w-fit ${
                            status.type === 'trending' ? 'bg-orange-500/90 text-white' :
                            status.type === 'popular' ? 'bg-amber-500/90 text-white' :
                            'bg-blue-500/90 text-white'
                          }`}>
                            {status.icon}
                            <span className="text-[10px] font-bold tracking-wider uppercase">{status.label}</span>
                          </div>
                        )}
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-sm w-fit">
                           <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                           <span className="text-[10px] font-bold">{rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="relative z-20 -mt-6 p-6 flex flex-col flex-grow bg-white dark:bg-zinc-900/95 rounded-t-[2rem] shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.5)]">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-white group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-orange-600 group-hover/card:to-rose-500 transition-all duration-300 tracking-tight">
                          {cat.name}
                        </h3>
                        <div className="h-10 w-10 shrink-0 rounded-full bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-500 group-hover/card:scale-110 group-hover/card:bg-orange-500 group-hover/card:text-white transition-all duration-300 shadow-sm">
                          <ChefHat className="w-5 h-5" />
                        </div>
                      </div>
                      
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 line-clamp-2 leading-relaxed">
                        {cat.description || `Explore our authentic ${cat.name} collection, crafted by top culinary experts to delight your taste buds.`}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">Premium</span>
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-xl">Handpicked</span>
                      </div>

                      {/* Footer */}
                      <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-3">
                             <div className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center text-orange-700 shadow-sm"><ChefHat className="w-3.5 h-3.5"/></div>
                             <div className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center text-blue-700 shadow-sm"><ChefHat className="w-3.5 h-3.5"/></div>
                             <div className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-300 shadow-sm">+{recipeCount}</div>
                          </div>
                          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Recipes</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm font-bold text-orange-600 dark:text-orange-500 group-hover/card:translate-x-1 transition-transform">
                          Explore <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
