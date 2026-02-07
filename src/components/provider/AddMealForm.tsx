"use client";

import { useEffect, useState } from "react";

import { getAllCategoriesAction } from "@/actions/category.actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { createMealAction } from "@/actions/meal.action";

export default function AddMealForm() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCats = async () => {
      const res = await getAllCategoriesAction();
      if (res.success) setCategories(res.data);
    };
    fetchCats();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCategory) return toast.error("Please select a category!");

    const form = e.currentTarget; 
    setLoading(true);

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      categoryId: selectedCategory,
      image: formData.get("image") as string,
    };

    try {
      const res = await createMealAction(payload);
      if (res.success) {
        toast.success("Meal added successfully! 🥘");
        form.reset(); 
        setSelectedCategory("");
      } else {
        toast.error(res.message || "Failed to add meal");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 space-y-5 max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-black text-zinc-900 mb-6 italic">Create New Menu Item 👨‍🍳</h2>
      
      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-600 ml-1">Meal Name</label>
        <Input name="name" placeholder="Chicken Tikka Platter" required className="rounded-xl h-12 border-zinc-200 focus:ring-orange-500" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-600 ml-1">Description</label>
        <Textarea name="description" placeholder="Describe the taste and ingredients..." required className="rounded-xl min-h-[100px] border-zinc-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-600 ml-1">Price (TK)</label>
          <Input name="price" type="number" placeholder="750" required className="rounded-xl h-12 border-zinc-200" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-600 ml-1">Category</label>
          <Select onValueChange={setSelectedCategory} value={selectedCategory} required>
            <SelectTrigger className="rounded-xl h-12 border-zinc-200">
              <SelectValue placeholder="Pick a category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((cat: any) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-600 ml-1">Image URL</label>
        <Input name="image" placeholder="https://images.unsplash.com/photo..." required className="rounded-xl h-12 border-zinc-200" />
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-zinc-900 text-white h-14 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-orange-100 mt-4">
        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Publish to Menu"}
      </Button>
    </form>
  );
}