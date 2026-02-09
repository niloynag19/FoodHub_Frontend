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
  SlidersHorizontal
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

  // Generate page numbers for pagination
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white border-none px-4 py-1.5 rounded-full hover:bg-white/30">
              <Sparkles className="size-3 mr-1" /> Premium Selection
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Discover Culinary <span className="text-amber-200">Delights</span>
            </h1>
            
            <p className="mt-4 text-xl text-white/90 max-w-2xl">
              Explore {totalItems}+ carefully crafted dishes from our expert chefs. 
              Every meal tells a story of flavor, tradition, and innovation.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <div className="text-2xl font-black">{totalItems}+</div>
                <div className="text-sm opacity-90">Premium Meals</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <div className="text-2xl font-black">4.8★</div>
                <div className="text-sm opacity-90">Average Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <div className="text-2xl font-black">15+</div>
                <div className="text-sm opacity-90">Expert Chefs</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute -bottom-12 -right-12 size-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -top-12 -left-12 size-64 bg-amber-300/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="container relative mx-auto px-4 -mt-12">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Filter Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">Menu Explorer</h2>
                  <Badge variant="outline" className="font-normal">
                    {meals.length} of {totalItems} items
                  </Badge>
                </div>
                <p className="text-gray-600">
                  {filters.search 
                    ? `Search results for "${filters.search}"` 
                    : filters.category 
                    ? `Showing ${meals.category || filters.category} category`
                    : "All delicious meals from our menu"
                  }
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                  <Button size="icon" variant="ghost" className="size-9 rounded-lg">
                    <Grid3x3 className="size-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="size-9 rounded-lg">
                    <List className="size-4" />
                  </Button>
                </div>
                
                <Button variant="outline" className="gap-2 rounded-xl">
                  <SlidersHorizontal className="size-4" />
                  <span>Filters</span>
                  {Object.values(filters).some(v => v && v !== "createdAt" && v !== "desc" && v !== "1") && (
                    <span className="size-2 bg-orange-500 rounded-full"></span>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <div className="border-b border-gray-100 bg-gray-50/50 p-6">
            <MealFilters />
          </div>

          {/* Meals Grid */}
          <div className="p-6">
            {meals.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {meals.map((meal: Meal) => (
                    <MealCard key={meal.id} meal={meal} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-sm text-gray-600">
                        Showing <span className="font-bold">{(currentPage - 1) * limit + 1}</span> -{" "}
                        <span className="font-bold">
                          {Math.min(currentPage * limit, totalItems)}
                        </span>{" "}
                        of <span className="font-bold">{totalItems}</span> results
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 rounded-lg"
                          asChild
                          disabled={currentPage <= 1}
                        >
                          <Link 
                            href={`?${new URLSearchParams({
                              ...params, 
                              page: (currentPage - 1).toString()
                            })}`}
                          >
                            <ChevronLeft className="size-4" />
                            Previous
                          </Link>
                        </Button>
                        
                        <div className="flex items-center gap-1 mx-2">
                          {getPageNumbers().map((page, index) => (
                            page === '...' ? (
                              <span key={index} className="px-2 text-gray-400">...</span>
                            ) : (
                              <Button
                                key={index}
                                variant={currentPage === page ? "default" : "ghost"}
                                size="sm"
                                className={`min-w-10 h-10 rounded-lg font-medium ${
                                  currentPage === page 
                                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md" 
                                    : "hover:bg-gray-100"
                                }`}
                                asChild
                              >
                                <Link 
                                  href={`?${new URLSearchParams({
                                    ...params, 
                                    page: page.toString()
                                  })}`}
                                >
                                  {page}
                                </Link>
                              </Button>
                            )
                          ))}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 rounded-lg"
                          asChild
                          disabled={currentPage >= totalPages}
                        >
                          <Link 
                            href={`?${new URLSearchParams({
                              ...params, 
                              page: (currentPage + 1).toString()
                            })}`}
                          >
                            Next
                            <ChevronRight className="size-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="py-20 text-center">
                <div className="relative mx-auto max-w-md">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 to-rose-100 rounded-full blur-3xl opacity-50" />
                  <div className="relative bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12">
                    <div className="relative">
                      <div className="size-20 mx-auto bg-gradient-to-br from-orange-500 to-rose-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                        <UtensilsCrossed className="size-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <Sparkles className="size-6 text-amber-500" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      No matches found
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {filters.search 
                        ? `We couldn't find any meals matching "${filters.search}"`
                        : "Try adjusting your filters or search for something different"
                      }
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button 
                        asChild
                        className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600"
                      >
                        <Link href="/meals">
                          <Filter className="size-4 mr-2" />
                          Clear Filters
                        </Link>
                      </Button>
                      
                      <Button variant="outline" asChild>
                        <Link href="/meals/categories">
                          Browse Categories
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        Need help? Try searching for popular categories like:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3 justify-center">
                        {["Pizza", "Burger", "Sushi", "Pasta", "Salad", "Dessert"].map((cat) => (
                          <Badge 
                            key={cat}
                            variant="outline"
                            className="cursor-pointer hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                            asChild
                          >
                            <Link href={`/meals?category=${cat.toLowerCase()}`}>
                              {cat}
                            </Link>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Featured Categories Section */}
        {meals.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Popular Categories</h3>
                <p className="text-gray-600">Discover meals by category</p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/categories">
                  View All
                  <ChevronRight className="size-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {["Italian", "Asian", "Vegetarian", "Desserts", "Fast Food", "Healthy"].map((category) => (
                <Link
                  key={category}
                  href={`/meals?category=${category.toLowerCase()}`}
                  className="group bg-white border border-gray-200 rounded-2xl p-4 text-center hover:border-orange-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="size-12 mx-auto mb-3 bg-gradient-to-br from-orange-100 to-rose-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UtensilsCrossed className="size-5 text-orange-600" />
                  </div>
                  <span className="font-medium text-gray-900 group-hover:text-orange-600">
                    {category}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}