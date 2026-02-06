"use client";
import { useState } from "react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateMealAction } from "@/actions/meal.action";

export default function EditMealForm({ meal }: { meal: any }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      image: formData.get("image"),
      categoryId: meal.categoryId, // ক্যাটাগরি আগেরটাই থাকবে
    };

    const res = await updateMealAction(meal.id, payload);
    if (res.success) {
      toast.success("Meal updated successfully! ✨");
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border space-y-5">
      <Input name="name" defaultValue={meal.name} placeholder="Meal Name" required className="rounded-xl h-12" />
      <Textarea name="description" defaultValue={meal.description} placeholder="Description" required className="rounded-xl" />
      <Input name="price" type="number" defaultValue={meal.price} placeholder="Price" required className="rounded-xl h-12" />
      <Input name="image" defaultValue={meal.image} placeholder="Image URL" required className="rounded-xl h-12" />
      
      <Button type="submit" disabled={loading} className="w-full bg-orange-600 h-14 rounded-2xl font-bold">
        {loading ? "Updating..." : "Update Meal Info"}
      </Button>
    </form>
  );
}