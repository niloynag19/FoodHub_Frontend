import { MealCard } from "@/components/meals/Meals.Card";
import { MealFilters } from "@/components/meals/MealFilters";
import { mealService } from "@/services/meals.services";
import { Meal } from "@/types/types";
import { 
  ChevronLeft, 
  ChevronRight, 
  UtensilsCrossed,
  Sparkles,
  Filter,
  Grid3x3,
  List,
  SlidersHorizontal,
  Search,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface IProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function MealsPage({ searchParams }: IProps) {
  const params = await searchParams;
  
  const currentPage = params.page ? parseInt(params.page) : 1;
  const limit = 12;

  const filters = {
    search: params.search || "",
    category: params.category || "",
    sortBy: (params.sortBy as any) || "createdAt",
    sortOrder: (params.sortOrder as any) || "desc",
    page: currentPage,
    limit: limit,
  };

  const response = await mealService.getAllMeals(filters);
  const meals = response?.data || [];
  const totalItems = response.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        start = 2;
        end = 4;
      }
      
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }
      
      pages.push(1);
      if (start > 2) pages.push('...');
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-zinc-950 transition-colors duration-300">
      {/* Premium Hero Header */}
      <div className="relative overflow-hidden bg-zinc-900 pt-32 pb-24 md:pt-40 md:pb-32">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[80%] bg-orange-600/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[80%] bg-rose-600/20 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" />
        </div>

        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl space-y-8">
              <Badge className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
                <Sparkles className="size-4 mr-2 inline" />
                Explore the menu
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
                Your Favorite <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Flavors</span> <br />
                Just a Click Away
              </h1>
              
              <p className="text-xl text-zinc-400 max-w-xl leading-relaxed">
                Discover a curated selection of {totalItems}+ gourmet dishes crafted with passion. 
                From local favorites to international delicacies, find exactly what you crave.
              </p>
              
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 min-w-[140px] hover:bg-white/10 transition-colors">
                  <div className="text-3xl font-black text-white">{totalItems}+</div>
                  <div className="text-sm text-zinc-500 font-bold uppercase tracking-wider mt-1">Dishes</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 min-w-[140px] hover:bg-white/10 transition-colors">
                  <div className="text-3xl font-black text-white">4.9★</div>
                  <div className="text-sm text-zinc-500 font-bold uppercase tracking-wider mt-1">Avg Rating</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 min-w-[140px] hover:bg-white/10 transition-colors">
                  <div className="text-3xl font-black text-white">25min</div>
                  <div className="text-sm text-zinc-500 font-bold uppercase tracking-wider mt-1">Avg Delivery</div>
                </div>
              </div>
            </div>

            {/* Visual Element (Optional - Could be a large icon or image) */}
            <div className="hidden lg:flex justify-end relative">
              <div className="relative size-[400px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-rose-500 rounded-full blur-[80px] opacity-20 animate-pulse" />
                <div className="relative size-full bg-zinc-800/50 backdrop-blur-3xl border border-white/10 rounded-[3rem] flex items-center justify-center shadow-2xl">
                   <UtensilsCrossed className="size-48 text-white/10" />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-4">
                      <div className="size-24 bg-gradient-to-br from-orange-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl rotate-12">
                        <UtensilsCrossed className="size-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Culinary Excellence</h3>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 lg:px-8 -mt-16 pb-24 relative z-20">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-[0_30px_100px_rgb(0,0,0,0.08)] border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-colors duration-300">
          
          {/* Header & Search Bar */}
          <div className="p-8 md:p-10 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Our Menu</h2>
                  <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-none font-bold">
                    {totalItems} Available
                  </Badge>
                </div>
                <p className="text-zinc-500 font-medium">
                  {filters.search 
                    ? `Found ${meals.length} items matching your search` 
                    : "Discover our wide variety of delicious meals"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-grow min-w-[300px]">
                  {/* Note: In a real app, this search would be integrated with the filter component */}
                  {/* For now, we are improving the visual layout */}
                  <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-5 py-4 w-full">
                    <Search className="size-5 text-zinc-400" />
                    <input 
                      type="text" 
                      placeholder="Search for dishes..." 
                      className="bg-transparent border-none outline-none w-full text-zinc-900 dark:text-white placeholder:text-zinc-400 font-medium"
                      defaultValue={filters.search}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" className="h-[58px] px-6 rounded-2xl border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 gap-2 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                    <SlidersHorizontal className="size-5" />
                    Filters
                  </Button>
                  <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl">
                    <Button size="icon" variant="ghost" className="size-11 rounded-xl bg-white dark:bg-zinc-900 shadow-sm text-orange-600">
                      <Grid3x3 className="size-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="size-11 rounded-xl text-zinc-400">
                      <List className="size-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Filters Component */}
          <div className="bg-zinc-50/50 dark:bg-zinc-900/50 p-8 border-b border-zinc-100 dark:border-zinc-800">
            <MealFilters />
          </div>

          {/* Meals Listing Grid */}
          <div className="p-8 md:p-10">
            {meals.length > 0 ? (
              <div className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {meals.map((meal: Meal) => (
                    <MealCard key={meal.id} meal={meal} />
                  ))}
                </div>

                {/* Refined Pagination */}
                {totalPages > 1 && (
                  <div className="pt-10 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-zinc-500 font-medium">
                      Showing <span className="text-zinc-900 dark:text-white font-bold">{(currentPage - 1) * limit + 1}</span> to{" "}
                      <span className="text-zinc-900 dark:text-white font-bold">
                        {Math.min(currentPage * limit, totalItems)}
                      </span>{" "}
                      of <span className="text-zinc-900 dark:text-white font-bold">{totalItems}</span> items
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        disabled={currentPage <= 1}
                        className="h-11 px-4 rounded-xl border-zinc-200 dark:border-zinc-800 font-bold gap-2"
                        asChild={currentPage > 1}
                      >
                        {currentPage > 1 ? (
                          <Link href={`?${new URLSearchParams({...params, page: (currentPage - 1).toString()})}`}>
                            <ChevronLeft className="size-5" />
                            Previous
                          </Link>
                        ) : (
                          <>
                            <ChevronLeft className="size-5" />
                            Previous
                          </>
                        )}
                      </Button>

                      <div className="flex gap-1.5">
                        {getPageNumbers().map((page, idx) => (
                          page === '...' ? (
                            <span key={idx} className="size-11 flex items-center justify-center text-zinc-400">...</span>
                          ) : (
                            <Button
                              key={idx}
                              variant={currentPage === page ? "default" : "ghost"}
                              className={`size-11 rounded-xl font-bold ${
                                currentPage === page 
                                  ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20" 
                                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              }`}
                              asChild
                            >
                              <Link href={`?${new URLSearchParams({...params, page: page.toString()})}`}>
                                {page}
                              </Link>
                            </Button>
                          )
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        disabled={currentPage >= totalPages}
                        className="h-11 px-4 rounded-xl border-zinc-200 dark:border-zinc-800 font-bold gap-2"
                        asChild={currentPage < totalPages}
                      >
                        {currentPage < totalPages ? (
                          <Link href={`?${new URLSearchParams({...params, page: (currentPage + 1).toString()})}`}>
                            Next
                            <ChevronRight className="size-5" />
                          </Link>
                        ) : (
                          <>
                            Next
                            <ChevronRight className="size-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Empty State */
              <div className="py-24 text-center max-w-xl mx-auto">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-[40px] animate-pulse" />
                  <div className="relative size-24 bg-white dark:bg-zinc-800 rounded-3xl shadow-xl flex items-center justify-center border border-zinc-100 dark:border-zinc-700">
                    <Search className="size-10 text-orange-500" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-4">No Meals Found</h3>
                <p className="text-zinc-500 text-lg mb-10 leading-relaxed">
                  We couldn't find any dishes matching your current selection. 
                  Try clearing your filters or searching for something else.
                </p>
                <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-orange-500 hover:bg-orange-600 font-bold shadow-xl shadow-orange-500/20">
                  <Link href="/meals">Clear All Filters</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Categories Section - Re-styled */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Quick Browse</h2>
              <p className="text-zinc-500 font-medium mt-1">Explore our most popular categories</p>
            </div>
            <Button variant="ghost" className="font-bold text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-500/10 gap-2" asChild>
              <Link href="/categories">
                View All Categories <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {["Pizza", "Burger", "Sushi", "Pasta", "Salad", "Dessert"].map((category) => (
              <Link
                key={category}
                href={`/meals?category=${category.toLowerCase()}`}
                className="group relative p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/5 hover:border-orange-200"
              >
                <div className="size-16 mx-auto mb-4 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300">
                  <UtensilsCrossed className="size-7 text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors" />
                </div>
                <span className="font-black text-zinc-900 dark:text-white group-hover:text-orange-600 transition-colors">
                  {category}
                </span>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="size-6 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                    <ArrowRight className="size-3 text-orange-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}