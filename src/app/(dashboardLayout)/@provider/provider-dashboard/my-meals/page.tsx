import { Button } from "@/components/ui/button";
import { Edit, Plus, UtensilsCrossed, Package, Star, Clock } from "lucide-react";
import Link from "next/link";
import { getAllMealsAction } from "@/actions/meal.action";
import DeleteMealButton from "@/components/provider/DeleteMealButton";
import Image from "next/image";
import { Global_Image } from "@/lib/defaultImage"

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number | string;
  image?: string;
  category?: string;
}

export const dynamic = "force-dynamic";

export default async function MyMealsPage() {
  const result = await getAllMealsAction();

  const meals: Meal[] = Array.isArray(result?.data) 
    ? result.data 
    : result?.data?.data || [];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-orange-200">
              {meals.length} {meals.length === 1 ? 'Dish' : 'Dishes'} Live
            </span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900">My Kitchen Menu</h1>
          <p className="text-zinc-500 font-medium">Manage your professional food listings and pricing.</p>
        </div>
        
        <Link href="/provider-dashboard/add-meal">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 h-12 rounded-xl font-bold shadow-lg shadow-orange-600/20 transition-all flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Dish
          </Button>
        </Link>
      </div>

      {meals.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-zinc-100 p-20 text-center shadow-sm">
          <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-orange-600">
            <UtensilsCrossed className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">No meals found</h3>
          <p className="text-zinc-500 max-w-xs mx-auto mb-8">Start adding delicious meals to your kitchen menu to begin selling.</p>
          <Link href="/provider-dashboard/add-meal">
            <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl h-12 px-8 font-bold">
              Add Your First Meal
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {meals.map((meal) => {
            // Safety Check: Skip if meal object is completely invalid
            if (!meal) return null;

            return (
              <div key={meal?.id || Math.random()} className="group bg-white rounded-[2rem] border border-zinc-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-600/5 transition-all duration-500">
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden bg-zinc-100">
                  <Image 
                    src={meal?.image || Global_Image} 
                    alt={meal?.name || "Meal Image"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-orange-600 font-bold text-[10px] uppercase tracking-wider shadow-sm border border-white/20">
                      {meal?.category || 'General'}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-orange-600 text-white px-4 py-1.5 rounded-xl font-bold text-sm shadow-xl">
                      ৳{meal?.price || '0.00'}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2 text-orange-500">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Premium Dish</span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {meal?.name || 'Untitled Meal'}
                  </h3>
                  
                  <p className="text-zinc-500 text-xs line-clamp-2 mt-2 h-10 leading-relaxed">
                    {meal?.description || 'No description available for this meal.'}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-6 pt-5 border-t border-zinc-50">
                    {meal?.id ? (
                      <>
                        <Link href={`/provider-dashboard/edit-meal/${meal.id}`} className="flex-1">
                            <Button variant="outline" className="w-full rounded-xl border-zinc-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 font-bold text-xs h-11 transition-all">
                              <Edit className="h-3.5 w-3.5 mr-2" /> Edit
                            </Button>
                        </Link>
                        <DeleteMealButton mealId={meal.id} />
                      </>
                    ) : (
                      <p className="text-[10px] text-zinc-400 italic">ID Missing</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}