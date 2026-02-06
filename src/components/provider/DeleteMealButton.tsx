"use client";

import { deleteMealAction } from "@/actions/meal.action";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2"; 

export default function DeleteMealButton({ mealId }: { mealId: string }) {
  const handleDelete = async () => {
    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this meal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c", // Orange-600
      cancelButtonColor: "#3f3f46", // Zinc-700
      confirmButtonText: "Yes, delete it!",
      borderRadius: "20px"
    });

    if (result.isConfirmed) {
      const res = await deleteMealAction(mealId);
      if (res.success) {
        Swal.fire("Deleted!", "Your meal has been removed.", "success");
      } else {
        toast.error(res.message || "Failed to delete");
      }
    }
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={handleDelete}
      className="rounded-xl border-red-100 text-red-500 hover:bg-red-50 h-10 w-10"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}