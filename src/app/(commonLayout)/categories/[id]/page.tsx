import { getAllMealsAction } from "@/actions/meal.action";
import { MealCard } from "@/components/meals/Meals.Card";
import { ArrowLeft, UtensilsCrossed, Search, Filter, ChefHat, Flame, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function CategoryMealsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getAllMealsAction();
  
  const filteredMeals = result?.data?.filter((meal: any) => meal.categoryId === id) || [];
  
  // Mock category data (in real app, fetch category by id)
  const categoryData = {
    name: "Premium Dishes",
    description: "Chef-curated meals with premium ingredients",
    icon: <ChefHat className="size-6" />,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/10"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50/50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <Link 
              href="/categories" 
              className="group flex items-center gap-3 transition-all duration-300"
              aria-label="Go back to all categories"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-orange-100 group-hover:to-red-100 dark:group-hover:from-orange-900/30 dark:group-hover:to-red-900/30 transition-all">
                <ArrowLeft className="size-5 text-zinc-600 dark:text-zinc-300 group-hover:text-orange-600 transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-muted-foreground group-hover:text-orange-600 transition-colors">
                  Back to
                </span>
                <span className="text-sm font-semibold -mt-1">All Categories</span>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <label htmlFor="search-desktop" className="sr-only">Search meals</label>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  id="search-desktop"
                  type="text" 
                  placeholder="Search meals..." 
                  className="pl-12 pr-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl w-64 focus:ring-2 focus:ring-orange-500 focus:bg-white dark:focus:bg-zinc-700 outline-none transition-all"
                  aria-label="Search for meals"
                />
              </div>
              <button 
                className="h-10 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center gap-2 transition-colors"
                aria-label="Open filter options"
              >
                <Filter className="size-4" />
                <span className="text-sm font-medium">Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 dark:from-orange-500/5 dark:via-red-500/5 dark:to-pink-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-2xl ${categoryData.bgColor}`} aria-hidden="true">
                  {categoryData.icon}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                    <Sparkles className="size-3" aria-hidden="true" /> Premium
                  </span>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    {filteredMeals.length} Items
                  </span>
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight mb-4">
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  {categoryData.name}
                </span>
              </h1>
              
              <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
                {categoryData.description} · Each meal is crafted with premium ingredients and chef expertise
              </p>
              
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Flame className="size-5 text-orange-500 fill-orange-500" aria-hidden="true" />
                  <span className="font-semibold">🔥 24/7 Fresh</span>
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-zinc-300" aria-hidden="true" />
                <div className="flex items-center gap-2">
                  <div className="flex" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Sparkles key={i} className="size-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <span className="font-semibold">4.8/5 Rating</span>
                </div>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl">
              <div className="text-center mb-4">
                <div className="text-4xl font-black text-zinc-900 dark:text-zinc-50 mb-1">{filteredMeals.length}</div>
                <div className="text-sm text-muted-foreground font-medium">Available Meals</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">12</div>
                  <div className="text-xs text-muted-foreground">Veg Options</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">8</div>
                  <div className="text-xs text-muted-foreground">Spicy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meals Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Grid Controls */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Featured Meals
            </h2>
            <p className="text-muted-foreground mt-1">
              Sorted by popularity • Most ordered first
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="sort-by" className="text-sm font-medium text-muted-foreground">
                Sort by:
              </label>
              <select 
                id="sort-by"
                name="sort-by"
                aria-label="Sort meals by"
                title="Sort meals by"
                className="bg-transparent border-none text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:rounded px-2 py-1"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {filteredMeals.length > 0 ? (
          <>
            {/* Mobile Search (visible only on mobile) */}
            <div className="mb-8 md:hidden">
              <div className="relative">
                <label htmlFor="search-mobile" className="sr-only">Search in this collection</label>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} aria-hidden="true" />
                <input 
                  id="search-mobile"
                  type="text" 
                  placeholder="Search in this collection..." 
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  aria-label="Search in this collection"
                />
              </div>
            </div>

            {/* Meals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMeals.map((meal: any) => (
                <div 
                  key={meal.id} 
                  className="group relative transform transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-red-500/0 to-pink-500/0 group-hover:from-orange-500/5 group-hover:via-red-500/5 group-hover:to-pink-500/5 rounded-2xl blur-xl transition-all duration-500" aria-hidden="true" />
                  
                  <div className="relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <MealCard meal={meal} />
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12 pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50">
              <p className="text-muted-foreground mb-4">
                Showing {filteredMeals.length} of {filteredMeals.length} meals
              </p>
              <button 
                className="px-8 py-3 bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-700 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Load more meals"
              >
                Load More Meals
              </button>
            </div>
          </>
        ) : (
          // Empty State
          <div className="max-w-xl mx-auto text-center py-20">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl" aria-hidden="true" />
              <div className="relative h-32 w-32 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-3xl flex items-center justify-center mx-auto">
                <UtensilsCrossed className="size-16 text-orange-500" aria-hidden="true" />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
              No Meals Available
            </h3>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 max-w-md mx-auto">
              This category is currently empty. Our chefs are preparing something special. Check back soon!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories">
                <button 
                  className="px-8 py-4 bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-700 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                  aria-label="Explore other categories"
                >
                  Explore Other Categories
                </button>
              </Link>
              <button 
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                aria-label="Get notified when meals are available"
              >
                Get Notified When Available
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}