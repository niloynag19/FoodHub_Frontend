import { getAllMealsAction } from "@/actions/meal.action";
import MealCard from "@/components/shared/MealCard";
import { ArrowLeft, UtensilsCrossed, Search } from "lucide-react";
import Link from "next/link";

export default async function CategoryMealsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getAllMealsAction();
  
  // ফিল্টার করা খাবার
  const filteredMeals = result?.data?.filter((meal: any) => meal.categoryId === id) || [];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Top Banner & Navigation */}
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Link 
            href="/categories" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-orange-600 font-bold text-sm transition-colors group mb-6"
          >
            <div className="h-8 w-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
              <ArrowLeft size={16} />
            </div>
            Back to Categories
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                  Collection
                </span>
              </div>
              <h1 className="text-5xl font-black text-zinc-900 italic tracking-tighter">
                Discover Selected Meals
              </h1>
              <p className="text-zinc-500 font-medium mt-2">
                Showing {filteredMeals.length} delicious options in this category
              </p>
            </div>

            {/* Search Input for refinement (Optional UI) */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search in this category..." 
                className="pl-12 pr-6 py-4 bg-zinc-50 border-none rounded-2xl w-full md:w-72 font-medium focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Meals Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {filteredMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredMeals.map((meal: any) => (
              <div key={meal.id} className="transform hover:-translate-y-2 transition-transform duration-500">
                <MealCard meal={meal} />
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="h-24 w-24 bg-zinc-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-zinc-300">
              <UtensilsCrossed size={40} />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 italic">No Meals Found!</h3>
            <p className="text-zinc-500 mt-2 font-medium">
              We couldn't find any meals in this category right now. Check back later or explore other categories.
            </p>
            <Link href="/categories">
              <button className="mt-8 px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black hover:bg-orange-600 transition-all shadow-xl">
                Explore Categories
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}