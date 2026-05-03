import { getAllCategoriesAction } from "@/actions/category.actions";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, LayoutGrid, ChefHat, TrendingUp, Sparkles, Star, Flame, Clock, Users } from "lucide-react";
import { Global_Image } from "@/lib/defaultImage";

export default async function AllCategoriesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;
  const currentPage = typeof pageParam === 'string' ? Number(pageParam) : 1;
  const limit = 8; // 8 items per page for a nice 4-column 2-row layout

  const result = await getAllCategoriesAction({ page: currentPage, limit });
  const categories = result?.data || [];
  const meta = result?.meta;
  const totalPages = meta?.totalPage || 1;

  // Mock trending/popular categories (since backend might not provide this directly)
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
    <div className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 z-10">
        {/* Header Section */}
        <header className="mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 blur-lg opacity-50 dark:opacity-40"></div>
                  <div className="relative h-14 w-14 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <LayoutGrid className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-1">
                    Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 italic">Categories</span>
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 flex items-center gap-2 text-lg">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    Discover culinary delights across {categories.length} expert-curated categories
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900/80 backdrop-blur-sm rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{categories.length} Categories</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900/80 backdrop-blur-sm rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Chef Verified</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className="bg-white dark:bg-zinc-900/60 backdrop-blur-xl rounded-[1.5rem] p-5 sm:p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-orange-100 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">Trending Now</p>
                  <p className="text-xl font-black text-zinc-900 dark:text-white">Italian, Asian</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900/60 backdrop-blur-xl rounded-[1.5rem] p-5 sm:p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                  <ChefHat className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">Chef Specials</p>
                  <p className="text-xl font-black text-zinc-900 dark:text-white">+50 New Recipes</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900/60 backdrop-blur-xl rounded-[1.5rem] p-5 sm:p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">Quick Meals</p>
                  <p className="text-xl font-black text-zinc-900 dark:text-white">Under 30 mins</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Categories Grid */}
        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {categories.map((cat: any, index: number) => {
              const status = getCategoryStatus(cat.id || String(index));
              const recipeCount = Math.floor(Math.random() * 80) + 20; // Mock data for recipes count
              const rating = (Math.random() * (5 - 4.2) + 4.2).toFixed(1);

              return (
                <Link
                  key={cat.id || index}
                  href={`/categories/${cat.id}`}
                  className="group relative flex flex-col outline-none"
                >
                  {/* Card Container */}
                  <div className="relative h-full bg-white dark:bg-zinc-900/60 backdrop-blur-xl rounded-[2.5rem] border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl shadow-zinc-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 overflow-hidden flex flex-col group-hover:-translate-y-2 group-hover:border-orange-500/30">
                    
                    {/* Image Section */}
                    <div className="relative h-56 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent z-10" />
                      <Image 
                        src={cat.image || Global_Image} 
                        alt={cat.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
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
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-rose-500 transition-all duration-300 tracking-tight">
                          {cat.name}
                        </h3>
                        <div className="h-10 w-10 shrink-0 rounded-full bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-sm">
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
                        
                        <div className="flex items-center gap-1 text-sm font-bold text-orange-600 dark:text-orange-500 group-hover:translate-x-1 transition-transform">
                          Explore <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-800">
                <LayoutGrid className="w-16 h-16 text-zinc-400 dark:text-zinc-600" />
              </div>
              <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-3">No Categories Yet</h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto text-lg">
                Our chefs are busy curating delicious new categories. Check back soon!
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 sm:mt-16">
              <Link
                href={`/categories?page=${Math.max(1, currentPage - 1)}`}
                className={`h-10 w-10 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm ${currentPage === 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-orange-500 hover:border-orange-200 dark:hover:border-orange-900'} transition-all`}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </Link>
              
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  const isActive = currentPage === pageNumber;
                  return (
                    <Link
                      key={i}
                      href={`/categories?page=${pageNumber}`}
                      className={`h-10 w-10 flex items-center justify-center rounded-xl font-bold transition-all shadow-sm ${
                        isActive 
                          ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white border-transparent' 
                          : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-orange-500 hover:border-orange-200 dark:hover:border-orange-900'
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  );
                })}
              </div>

              <Link
                href={`/categories?page=${Math.min(totalPages, currentPage + 1)}`}
                className={`h-10 w-10 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-orange-500 hover:border-orange-200 dark:hover:border-orange-900'} transition-all`}
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}