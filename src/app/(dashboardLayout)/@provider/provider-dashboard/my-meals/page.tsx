import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { getAllMealsAction } from "@/actions/meal.action";
import DeleteMealButton from "@/components/provider/DeleteMealButton";

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number | string;
  image?: string;
}

export const dynamic = "force-dynamic";

export default async function MyMealsPage() {
  const result = await getAllMealsAction();
  const meals: Meal[] = Array.isArray(result?.data) 
    ? result.data 
    : result?.data?.data || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Kitchen Menu</h1>
          <p className="text-zinc-500">Manage your meals</p>
        </div>
        <Link href="/provider-dashboard/add-meal">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Plus className="h-4 w-4 mr-2" /> Add Meal
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal, index) => (
          <div key={meal?.id || index} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-xl mb-2">{meal?.name || "Untitled"}</h3>
            <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{meal?.description || "No description"}</p>
            <p className="text-orange-600 font-bold mb-4">Price: ৳{meal?.price || "0"}</p>
            
            <div className="flex gap-2">
              <Link href={`/provider-dashboard/edit-meal/${meal?.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              </Link>
              {meal?.id && <DeleteMealButton mealId={meal.id} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}