
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
 // এটি নিচে দিচ্ছি
import { getAllMealsAction } from "@/actions/meal.action";
import DeleteMealButton from "@/components/provider/DeleteMealButton";

export const dynamic = "force-dynamic";

export default async function MyMealsPage() {
  const result = await getAllMealsAction();
  
  // আপনার এপিআই স্ট্রাকচার অনুযায়ী ডাটা নেওয়া
  const meals = Array.isArray(result?.data) ? result.data : result?.data?.data || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 italic">My Kitchen Menu</h1>
          <p className="text-zinc-500 mt-1">Update or remove your listed food items</p>
        </div>
        <Link href="/provider-dashboard/add-meal">
          <Button className="bg-orange-600 hover:bg-zinc-900 rounded-2xl h-14 px-8 font-bold text-lg shadow-lg shadow-orange-100 transition-all">
            <Plus className="mr-2 h-6 w-6" /> Add New Dish
          </Button>
        </Link>
      </div>

      {meals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-200">
          <UtensilsCrossed className="h-16 w-16 text-zinc-300 mb-4" />
          <p className="text-xl font-bold text-zinc-400">Your menu is empty!</p>
          <p className="text-zinc-400 text-sm">Start adding some delicious meals.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {meals.map((meal: any) => (
            <div key={meal.id} className="group bg-white rounded-[2.5rem] border border-zinc-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-56 w-full">
                <img 
                  src={meal.image} 
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl text-white font-black text-sm">
                    {meal.price} TK
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-black text-xl text-zinc-900 line-clamp-1">{meal.name}</h3>
                <p className="text-zinc-500 text-sm line-clamp-2 mt-2 h-10 italic">
                  "{meal.description}"
                </p>
                
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-zinc-50">
                   <Link href={`/provider-dashboard/edit-meal/${meal.id}`} className="flex-1">
                      <Button variant="outline" className="w-full rounded-xl border-zinc-200 hover:bg-zinc-50 font-bold text-zinc-700">
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                   </Link>
                   <DeleteMealButton mealId={meal.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}