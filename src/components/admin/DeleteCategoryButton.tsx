"use client";

import { deleteCategoryAction } from "@/actions/category.actions";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { confirmAction } from "@/lib/swal-utils"; // আমাদের তৈরি হেল্পারটি ইম্পোর্ট করলাম
import { Button } from "../ui/button";

export default function DeleteCategoryButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // প্রফেশনাল SweetAlert কনফার্মেশন বক্স
    const result = await confirmAction({
      title: "Delete Category?",
      text: "This action is permanent and might affect related meals!",
      icon: "error", // ডিলিট যেহেতু, তাই লাল ওয়ার্নিং আইকন
      confirmText: "Yes, Delete It!"
    });

    // ইউজার যদি 'Cancel' এ ক্লিক করে, তবে ফাংশন এখানেই থেমে যাবে
    if (!result.isConfirmed) return;

    setIsDeleting(true);
    try {
      const res = await deleteCategoryAction(id);
      
      if (res.success) {
        toast.success("Category removed from system! 🔥");
      } else {
        toast.error(res.message || "Failed to delete category");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      disabled={isDeleting}
      onClick={handleDelete}
      className="bg-zinc-50 text-zinc-400 hover:text-red-600 hover:bg-red-50 p-3 rounded-2xl transition-all disabled:opacity-50 group"
      title="Delete Category"
    >
      {isDeleting ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
      )}
    </Button>
  );
}