import { getAllCategoriesAction } from "@/actions/category.actions";
import Link from "next/link";
import { ChevronRight, LayoutGrid, ChefHat, TrendingUp, Sparkles, Star, Flame, Clock, Users } from "lucide-react";

// Color palette for different categories
const colorPalettes = [
  { bg: "bg-gradient-to-br from-orange-500 to-amber-500", text: "text-orange-600", hover: "hover:from-orange-600 hover:to-amber-600" },
  { bg: "bg-gradient-to-br from-emerald-500 to-teal-500", text: "text-emerald-600", hover: "hover:from-emerald-600 hover:to-teal-600" },
  { bg: "bg-gradient-to-br from-rose-500 to-pink-500", text: "text-rose-600", hover: "hover:from-rose-600 hover:to-pink-600" },
  { bg: "bg-gradient-to-br from-violet-500 to-purple-500", text: "text-violet-600", hover: "hover:from-violet-600 hover:to-purple-600" },
  { bg: "bg-gradient-to-br from-blue-500 to-cyan-500", text: "text-blue-600", hover: "hover:from-blue-600 hover:to-cyan-600" },
  { bg: "bg-gradient-to-br from-amber-500 to-yellow-500", text: "text-amber-600", hover: "hover:from-amber-600 hover:to-yellow-600" },
  { bg: "bg-gradient-to-br from-lime-500 to-green-500", text: "text-lime-600", hover: "hover:from-lime-600 hover:to-green-600" },
  { bg: "bg-gradient-to-br from-indigo-500 to-blue-500", text: "text-indigo-600", hover: "hover:from-indigo-600 hover:to-blue-600" },
];

// Icons for categories
const categoryIcons = [
  "🍕", "🍔", "🥗", "🍣", "🥘", "🍜", "🍰", "☕",
  "🍝", "🌮", "🥪", "🍛", "🍤", "🥐", "🍦", "🍹"
];

export default async function AllCategoriesPage() {
  const result = await getAllCategoriesAction();
  const categories = result?.data || [];

  // Mock trending/popular categories
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/30 to-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 blur-md opacity-70"></div>
                  <div className="relative h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <LayoutGrid className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600">
                    Food Categories
                  </h1>
                  <p className="text-gray-600 mt-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Discover culinary delights across {categories.length} expert-curated categories
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">{categories.length} Categories</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Chef Verified</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trending Now</p>
                  <p className="text-xl font-bold text-gray-900">Italian, Asian, Vegan</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                  <ChefHat className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Chef Specials</p>
                  <p className="text-xl font-bold text-gray-900">+50 New Recipes</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quick Meals</p>
                  <p className="text-xl font-bold text-gray-900">Under 30 mins</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {categories.map((cat: any, index: number) => {
              const colorSet = colorPalettes[index % colorPalettes.length];
              const icon = categoryIcons[index % categoryIcons.length];
              const status = getCategoryStatus(cat.id);
              const recipeCount = Math.floor(Math.random() * 80) + 20; // Mock data

              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="group relative"
                >
                  {/* Card Container */}
                  <div className="relative h-full bg-white rounded-[2.5rem] border-2 border-gray-100 shadow-lg hover:shadow-2xl hover:border-orange-200 hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                    {/* Background Gradient Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorSet.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    {/* Status Badge */}
                    {status && (
                      <div className="absolute top-5 left-5 z-10">
                        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
                          status.type === 'trending' ? 'bg-orange-100 text-orange-700' :
                          status.type === 'popular' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {status.icon}
                          <span className="text-xs font-bold">{status.label}</span>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative p-7 sm:p-8">
                      {/* Icon Section */}
                      <div className="relative mb-6">
                        {/* Glow Effect */}
                        <div className={`absolute -inset-4 ${colorSet.bg} opacity-0 group-hover:opacity-20 blur-xl rounded-3xl transition-opacity duration-500`}></div>
                        
                        {/* Icon Container */}
                        <div className={`relative h-28 w-28 mx-auto ${colorSet.bg} rounded-[2rem] flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                          <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
                          <span className="relative text-5xl transform group-hover:scale-125 transition-transform duration-300">
                            {icon}
                          </span>
                          
                          {/* Decorative Corner */}
                          <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-2xl rotate-45 border-4 border-white"></div>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="text-center space-y-4">
                        <div>
                          <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-700 uppercase tracking-tight transition-colors duration-300">
                            {cat.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-2">
                            {recipeCount}+ amazing recipes
                          </p>
                        </div>

                        {/* Progress Bar (Mock) */}
                        <div className="pt-2">
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${colorSet.bg} rounded-full transition-all duration-500`}
                              style={{ width: `${Math.min(recipeCount, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 text-left">
                            Popularity: {Math.min(recipeCount, 100)}%
                          </p>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                          <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-full group-hover:from-orange-50 group-hover:to-amber-50 group-hover:border-orange-300 transition-all duration-300 shadow-sm group-hover:shadow-md">
                            <span className="text-sm font-bold text-gray-800 group-hover:text-orange-700">
                              Explore Recipes
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[2.5rem]"></div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                <LayoutGrid className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No Categories Yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Our chefs are busy cooking up delicious new categories. Check back soon!
              </p>
            </div>
          )}
        </main>

        {/* Footer Note */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full border border-orange-200 mb-4">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <p className="text-sm font-medium text-gray-700">
                <span className="font-bold">Pro Tip:</span> Save your favorite categories for quick access
              </p>
            </div>
            <p className="text-gray-500 text-sm">
              All recipes are carefully curated by professional chefs and include step-by-step instructions.
            </p>
          </div>
        </footer>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="group flex items-center justify-center h-14 w-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300">
          <span className="text-white font-bold text-xl transform group-hover:rotate-90 transition-transform">
            +
          </span>
        </button>
      </div>
    </div>
  );
}