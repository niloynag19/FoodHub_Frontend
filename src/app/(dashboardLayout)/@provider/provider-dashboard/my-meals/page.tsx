import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllMealsAction } from "@/actions/meal.action";
import DeleteMealButton from "@/components/provider/DeleteMealButton";
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
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">My Kitchen Menu</h1>
          <p className="text-zinc-500 font-medium">Manage your professional food listings.</p>
        </div>
        
        <Link href="/provider-dashboard/add-meal">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 h-12 rounded-xl font-bold">
            + Add New Dish
          </Button>
        </Link>
      </div>

      {meals.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-zinc-100 p-20 text-center shadow-sm">
          <h3 className="text-xl font-bold text-zinc-900 mb-2">No meals found</h3>
          <p className="text-zinc-500">Start adding delicious meals to your menu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {meals.map((meal, index) => {
            if (!meal) return null;
            const uniqueKey = `meal-stable-key-${meal?.id || index}-${index}`;

            // SAFETY: Extract string from potential object (Fixes React Error #31)
            const getVal = (val: any) => {
              if (!val) return "";
              if (typeof val === 'object') return val.name || val.title || JSON.stringify(val);
              return String(val);
            };

            const categoryName = getVal(meal?.category) || "General";
            const mealName = getVal(meal?.name) || "Untitled Meal";
            const mealPrice = getVal(meal?.price) || "0";
            const mealImg = typeof meal?.image === 'string' ? meal.image : Global_Image;

            return (
              <div key={uniqueKey} className="group bg-white rounded-[2rem] border border-zinc-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Image Placeholder Div */}
                <div 
                  className="h-56 w-full bg-zinc-100 bg-cover bg-center"
                  style={{ backgroundImage: `url(${mealImg})` }}
                >
                  <div className="p-4 flex justify-between items-start">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-orange-600 font-bold text-[10px] uppercase tracking-wider">
                      {categoryName}
                    </span>
                    <div className="bg-orange-600 text-white px-4 py-1.5 rounded-xl font-bold text-sm shadow-lg">
                      {mealPrice} TK
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {mealName}
                  </h3>
                  
                  <p className="text-zinc-500 text-xs line-clamp-2 mt-2 h-10 leading-relaxed">
                    {getVal(meal?.description) || 'No description available.'}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-6 pt-5 border-t border-zinc-50">
                    {meal?.id ? (
                      <>
                        <Link href={`/provider-dashboard/edit-meal/${meal.id}`} className="flex-1">
                          <Button variant="outline" className="w-full rounded-xl hover:bg-orange-50 hover:text-orange-600 font-bold text-xs h-11">
                            Edit
                          </Button>
                        </Link>
                        <DeleteMealButton mealId={meal.id} />
                      </>
                    ) : (
                      <span className="text-xs text-zinc-400 italic">Incomplete Record</span>
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