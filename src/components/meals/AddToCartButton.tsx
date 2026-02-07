"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCartAction } from "@/actions/customer.actions";

export default function AddToCartButton({
  mealId,
  price, 
  stock = 10, 
}: {
  mealId: string;
  price: number; 
  stock?: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      
      const result = await addToCartAction({ mealId, quantity, price }); 
      
      if (result.success) {
        toast.success("Added to cart! Enjoy your meal.");
      } else {
        toast.error(result.message || "Failed to add to cart");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
      <div className="flex items-center border-2 border-orange-100 dark:border-zinc-800 rounded-[1.2rem] overflow-hidden h-14 bg-white dark:bg-zinc-900">
        <Button
          variant="ghost" 
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-4 hover:bg-orange-50 dark:hover:bg-zinc-800 text-orange-600 h-full rounded-none"
          disabled={loading}
        >
          <Minus className="w-5 h-5" />
        </Button>
        <span className="w-12 text-center font-bold text-lg">{quantity}</span>
        <Button
          variant="ghost"
          onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
          className="px-4 hover:bg-orange-50 dark:hover:bg-zinc-800 text-orange-600 h-full rounded-none"
          disabled={loading}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      <Button
        onClick={handleAddToCart}
        disabled={loading || stock === 0}
        className="h-14 flex-grow rounded-[1.2rem] bg-orange-600 hover:bg-zinc-900 text-white font-bold text-lg shadow-lg shadow-orange-100 dark:shadow-none transition-all gap-3"
      >
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <ShoppingCart className="w-6 h-6" />
        )}
        Add to Cart
      </Button>
    </div>
  );
}