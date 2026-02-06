import AddMealForm from "@/components/provider/AddMealForm";


export default function AddMealsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900">Add New Meal 🥘</h1>
        <p className="text-muted-foreground">Fill in the details to add a new delicious item to your menu.</p>
      </div>
      
      <AddMealForm />
    </div>
  );
}