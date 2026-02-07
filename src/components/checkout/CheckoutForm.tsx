"use client";

import { useState } from "react";
import { createOrderAction } from "@/actions/order.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag, ArrowRight } from "lucide-react";

interface CheckoutProps {
  cartItems: any[];
  providerId: string;
}

export default function CheckoutButton({ cartItems, providerId }: CheckoutProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    if (!providerId || cartItems.length === 0) {
      return toast.error("Your cart is empty! 🍕");
    }

    setLoading(true);
    const payload = {
      providerId: providerId,
      deliveryAddress: "Standard Home Delivery", 
      items: cartItems.map((item: any) => ({
        mealId: item.mealId || item.meal.id,
        quantity: item.quantity
      }))
    };

    try {
      const res = await createOrderAction(payload);
      if (res.success) {
        toast.success("Order placed! 🚀");
        router.push("/dashboard/orders"); 
        router.refresh(); 
      } else {
        toast.error(res.message || "Failed to place order.");
      }
    } catch (error) {
      toast.error("Network error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-end mt-8 md:mt-0"> 
      <Button 
        onClick={handleCheckout}
        disabled={loading}
        className="w-full md:w-[280px] bg-zinc-900 text-white h-16 rounded-3xl font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl transition-all active:scale-95 group overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="group-hover:-rotate-12 transition-transform" />
              <span>Checkout</span>
            </div>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </div>
        )}
      </Button>
    </div>
  );
}