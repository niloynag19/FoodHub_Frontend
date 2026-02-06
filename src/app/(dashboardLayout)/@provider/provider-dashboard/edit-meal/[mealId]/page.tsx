import { getAllMealsAction } from "@/actions/meal.action";
import EditMealForm from "@/components/provider/EditMealFrom";


interface IProps {
  params: Promise<{ mealId: string }>; // Next.js 15 এ params একটি Promise
}

export default async function EditMealPage({ params }: IProps) {
  // ১. params কে await করা বাধ্যতামূলক
  const { mealId } = await params;

  // ২. সব মিল নিয়ে আসা
  const result = await getAllMealsAction();
  
  // আপনার এপিআই স্ট্রাকচার অনুযায়ী ডাটা নেওয়া
  const meals = Array.isArray(result?.data) ? result.data : result?.data?.data || [];

  // ৩. আইডি ফিল্টার করা (এখানে == ব্যবহার করা নিরাপদ যদি আইডি স্ট্রিং বনাম নাম্বার এর ঝামেলা থাকে)
  const meal = meals.find((m: any) => m.id == mealId || m._id == mealId);

  // ৪. যদি মিল না পাওয়া যায়
  if (!meal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-zinc-800">Meal Not Found! 🥗</h2>
        <p className="text-zinc-500">The dish you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-zinc-900 italic">Edit Your Dish</h1>
        <p className="text-zinc-500">Update the information for "{meal.name}"</p>
      </div>
      
      <EditMealForm meal={meal} />
    </div>
  );
}