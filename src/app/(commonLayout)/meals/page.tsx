import { MealCard } from "@/components/meals/Meals.Card";
import { MealFilters } from "@/components/meals/MealFilters";
import { mealService } from "@/services/meals.services";
import { Meal } from "@/types/types";
import { 
  ChevronLeft, 
  ChevronRight, 
  UtensilsCrossed 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface IProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function MealsPage({ searchParams }: IProps) {
  const params = await searchParams;
  
  const currentPage = params.page ? parseInt(params.page) : 1;
  const limit = 12;

  const filters = {
    search: params.search || "",
    category: params.category || "",
    sortBy: (params.sortBy as any) || "createdAt",
    sortOrder: (params.sortOrder as any) || "desc",
    page: currentPage,
    limit: limit,
  };

  const response = await mealService.getAllMeals(filters);
  const meals = response?.data || [];
  const totalItems = response.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="mb-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight text-foreground">
              Explore Our <span className="text-orange-600">Menu</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {totalItems > 0 
                ? `Showing ${totalItems} premium dishes curated just for you.` 
                : "Looking for something delicious? We've got you covered."}
            </p>
          </div>
        </div>

        {/* ৩. Filter & Search Component */}
        <div className="p-1 border-y border-dashed py-6">
          <MealFilters />
        </div>
      </div>

      {/* ৪. Meals Grid Section */}
      <div className="flex-grow">
        {meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {meals.map((meal: Meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed rounded-[3rem] bg-zinc-50/50 dark:bg-zinc-900/10">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-full shadow-sm mb-6">
              <UtensilsCrossed className="size-12 text-orange-500" />
            </div>
            <h3 className="text-3xl font-bold">No Delicious Matches!</h3>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
              We couldn't find any meals for "{filters.search}". Try a different search or clear filters.
            </p>
          </div>
        )}
      </div>

      {/* ৫. প্রফেশনাল Pagination UI */}
      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-2 pb-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-orange-100"
            asChild
            disabled={currentPage <= 1}
          >
            <Link href={`?${new URLSearchParams({...params, page: (currentPage - 1).toString()})}`}>
              <ChevronLeft className="size-5" />
            </Link>
          </Button>

          <div className="flex items-center gap-2 mx-4">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "ghost"}
                className={`w-10 h-10 rounded-xl font-bold ${
                  currentPage === i + 1 ? "bg-orange-600 hover:bg-orange-700" : ""
                }`}
                asChild
              >
                <Link href={`?${new URLSearchParams({...params, page: (i + 1).toString()})}`}>
                  {i + 1}
                </Link>
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-orange-100"
            asChild
            disabled={currentPage >= totalPages}
          >
            <Link href={`?${new URLSearchParams({...params, page: (currentPage + 1).toString()})}`}>
              <ChevronRight className="size-5" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}