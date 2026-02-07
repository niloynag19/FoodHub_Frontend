"use client";

import { useState } from "react";
import { createCategoryAction } from "@/actions/category.actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Loader2, Tag } from "lucide-react";

export default function AddCategoryModal() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    const res = await createCategoryAction(name);
    if (res.success) {
      toast.success("New category added! 🏷️");
      setOpen(false);
    } else {
      toast.error(res.message || "Failed to add category");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-white hover:text-orange-600 rounded-2xl h-14 px-8 font-black shadow-xl transition-all border-2 border-transparent hover:border-orange-600">
          <Plus className="mr-2 h-5 w-5" /> Create Category
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-[2.5rem] border-none p-10 max-w-sm shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic">New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-400 flex items-center gap-1 ml-1">
              <Tag size={12} /> Category Name
            </label>
            <Input 
              name="name" 
              required 
              placeholder="e.g. Traditional, Dessert" 
              className="rounded-2xl border-zinc-200 h-12 font-bold focus:ring-orange-500" 
            />
          </div>
          <Button disabled={loading} className="w-full bg-zinc-900 hover:bg-orange-600 h-14 rounded-2xl font-black text-lg transition-all shadow-xl">
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Save Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}