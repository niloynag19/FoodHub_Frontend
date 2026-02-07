"use client";
import { useState } from "react";
import { updateCategoryAction } from "@/actions/category.actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Edit3, Loader2 } from "lucide-react";

export default function UpdateCategoryModal({ category }: { category: any }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.name);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateCategoryAction(category.id, name);
    if (res.success) {
      toast.success("Category Updated! ✨");
      setOpen(false);
    } else {
      toast.error(res.message || "Failed");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-zinc-50 text-zinc-400 hover:text-orange-600 hover:bg-orange-50 p-3 rounded-2xl transition-all"><Edit3 size={18} /></Button>
      </DialogTrigger>
      <DialogContent className="rounded-[3rem] border-none p-10 max-w-sm shadow-2xl">
        <DialogHeader><DialogTitle className="text-2xl font-black italic">Rename Category</DialogTitle></DialogHeader>
        <form onSubmit={handleUpdate} className="space-y-6 mt-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} required className="rounded-2xl border-zinc-200 h-14 font-black text-lg focus:ring-orange-500" />
          <Button disabled={loading} className="w-full bg-zinc-900 hover:bg-orange-600 h-14 rounded-2xl font-black transition-all">
            {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}