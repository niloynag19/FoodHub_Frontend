import { getAllMealsAction } from "@/actions/meal.action";
import EditMealForm from "@/components/provider/EditMealFrom";


export default async function EditMealPage({ params }: { params: { mealId: string } }) {
  const result = await getAllMealsAction();
  
  const meal = result?.data?.find((m: any) => m.id === params.mealId);

  if (!meal) return <div className="p-10 text-center">Meal not found!</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-black mb-8 italic">Edit Your Dish 🥘</h1>
      <EditMealForm meal={meal} />
    </div>
  );
}