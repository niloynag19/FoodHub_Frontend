import { Button } from "@/components/ui/button";
import { Edit, Plus, UtensilsCrossed } from "lucide-react";
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
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 italic tracking-tighter uppercase">
            My <span className="text-orange-600">Kitchen</span> Menu
          </h1>
          <p className="text-zinc-500 font-medium mt-1">Manage your professional food listings</p>
        </div>
        <Button asChild className="bg-orange-600 hover:bg-zinc-900 rounded-2xl h-14 px-8 font-black uppercase text-xs tracking-widest shadow-xl shadow-orange-600/20 transition-all">
          <Link href="/provider-dashboard/add-meal">
            <Plus className="mr-2 h-5 w-5" /> Add New Dish
          </Link>
        </Button>
      </div>

      {meals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <div className="h-20 w-20 bg-white dark:bg-zinc-900 rounded-3xl flex items-center justify-center shadow-sm mb-6">
            <UtensilsCrossed className="h-10 w-10 text-zinc-300" />
          </div>
          <p className="text-xl font-black text-zinc-400 uppercase tracking-tight">Your menu is empty!</p>
          <p className="text-zinc-400 text-sm font-medium mt-1">Start adding some delicious meals to your store.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {meals.map((meal) => (
            <div key={meal.id} className="group bg-white dark:bg-zinc-950 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-900 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              {/* ইমেজ ফিক্স: fill প্রপ এবং প্রপার কন্টেইনার */}
              <div className="relative h-60 w-full overflow-hidden bg-zinc-100">
                <Image 
                  src={Global_Image} 
                  alt={meal.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-orange-600 font-black text-xs uppercase tracking-wider shadow-sm">
                     {meal.price} TK
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-black text-xl text-zinc-900 dark:text-zinc-50 line-clamp-1 uppercase italic tracking-tighter">
                  {meal.name}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs line-clamp-2 mt-2 h-10 font-medium leading-relaxed">
                  {meal.description}
                </p>
                
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-zinc-50 dark:border-zinc-900">
                   <Button asChild variant="outline" className="flex-1 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-black uppercase text-[10px] tracking-widest h-11">
                      <Link href={`/provider-dashboard/edit-meal/${meal.id}`}>
                        <Edit className="h-3 w-3 mr-2" /> Edit
                      </Link>
                   </Button>
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