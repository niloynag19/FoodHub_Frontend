"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { removeFromCartAction } from "@/actions/customer.actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function DeleteCartItem({ itemId }: { itemId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await removeFromCartAction(itemId);
      if (result.success) {
        toast.success("remove the cart");
      } else {
        toast.error(result.message || "don't remove the cart");
      }
    } catch (error) {
      toast.error("Some thing went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full transition-all duration-200"
    >
      {isDeleting ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Trash2 className="w-5 h-5" />
      )}
    </Button>
  );
}