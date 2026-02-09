import { getAllMealsAction } from "@/actions/meal.action";
import { Button } from "@/components/ui/button";
import { Global_Image } from "@/lib/defaultImage";
import { Utensils, Trash2, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AllMealsManagementPage() {
  const result = await getAllMealsAction();
  const meals = result?.data || [];

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="bg-orange-600 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <h1 className="text-5xl font-black italic tracking-tighter z-10 relative">Global Inventory</h1>
        <p className="text-orange-100 mt-2 font-medium z-10 relative">Managing {meals.length} items across all providers</p>
        <Utensils className="absolute right-[-20px] top-[-20px] h-64 w-64 text-white/10 rotate-12" />
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal: any) => (
          <div key={meal.id} className="bg-white rounded-[2.5rem] border border-zinc-100 overflow-hidden group hover:shadow-2xl transition-all flex flex-col h-full">
            
            {/* Image Container */}
            <div className="h-64 relative overflow-hidden bg-zinc-100">
              <Image 
                src={Global_Image}
                alt={meal.name || "Meal Image"} 
                fill 
                priority={false} 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-5 py-2 rounded-2xl text-sm font-black text-orange-600 shadow-xl z-10">
                {meal.price} TK
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black italic uppercase text-zinc-800 leading-tight">
                  {meal.name}
                </h3>
                <p className="text-zinc-400 text-sm font-bold mt-2 flex items-center gap-2 uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  Provider ID: {meal.providerId?.slice(-6) || "N/A"}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                <Link 
                  href={`/meals/${meal.id}`} 
                  className="h-12 w-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-orange-600 hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100"
                  title="View Details"
                >
                  <Eye size={22} />
                </Link>
                
              
                <Button 
                  variant="ghost" 
                  className="h-12 px-6 rounded-2xl text-zinc-300 hover:text-red-500 hover:bg-red-50 font-bold transition-all gap-2 group/btn"
                >
                  <Trash2 size={20} className="group-hover/btn:animate-pulse" />
                  <span className="text-xs uppercase font-black">Remove Item</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {meals.length === 0 && (
        <div className="text-center py-32 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-100">
           <p className="text-zinc-400 font-black italic text-xl">The inventory is empty! 📭</p>
        </div>
      )}
    </div>
  );
}