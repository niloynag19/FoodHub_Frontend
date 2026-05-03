import { mealService } from "@/services/meals.services";
import { MealCardSlider } from "@/components/meals/Meals.Card";
import { Flame } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Meal } from "@/types/types";

export async function TopRatedSection() {
  const response = await mealService.getAllMeals({ limit: 20 });
  
  let topMeals: Meal[] = response?.data || [];
  
  // Sort by rating locally to actually show the highest rated ones
  topMeals.sort((a, b) => {
    const ratingA = a.reviews?.length 
      ? a.reviews.reduce((sum, rev: any) => sum + (typeof rev.rating === 'number' ? rev.rating : 0), 0) / a.reviews.length 
      : 0;
    const ratingB = b.reviews?.length 
      ? b.reviews.reduce((sum, rev: any) => sum + (typeof rev.rating === 'number' ? rev.rating : 0), 0) / b.reviews.length 
      : 0;
    return ratingB - ratingA;
  });
  
  // We'll show top 10 for the slider
  const displayMeals = topMeals.slice(0, 10);

  if (displayMeals.length === 0) return null;

  return (
    <section className="py-20 relative bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-bold tracking-wide uppercase mb-4 shadow-sm border border-rose-200/50 dark:border-rose-800/50">
              <Flame size={14} className="animate-pulse" />
              Customer Favorites
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
              Top Rated <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 italic">Foods</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400">
              Discover our most popular and highest-rated dishes, handpicked by our community of food lovers.
            </p>
          </div>
          <div className="shrink-0">
            <Button asChild variant="outline" className="rounded-full border-orange-200 dark:border-orange-900/50 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-700 transition-all font-semibold px-6">
              <Link href="/meals">
                View Full Menu
              </Link>
            </Button>
          </div>
        </div>

        <MealCardSlider meals={displayMeals} />
      </div>
    </section>
  );
}
