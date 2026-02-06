import { MealCard } from "@/components/meals/Meals.Card";
import { mealService } from "@/services/meals.services";
import { Meal } from "@/types/types";

export default async function MealsPage() {
  const response = await mealService.getAllMeals();
  const meals = response?.data?.data || []; 

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      {/* Page Header */}
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Explore Our <span className="text-orange-600">Menu</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Freshly prepared meals delivered straight to your door.
        </p>
      </div>

      {/* Meals Grid */}
      {meals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meals.map((meal: Meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h3 className="text-xl font-semibold">No meals found!</h3>
          <p className="text-muted-foreground">Check back later for delicious updates.</p>
        </div>
      )}
    </div>
  );
}