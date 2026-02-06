"use client";

import { useState } from "react";
import { createOrderAction } from "@/actions/order.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CheckoutProps {
  cartItems: any[];
  providerId: string;
}

export default function CheckoutButton({ cartItems, providerId }: CheckoutProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    // ১. কার্ট খালি কি না চেক করা
    if (!providerId || cartItems.length === 0) {
      return toast.error("Your cart is empty!");
    }

    setLoading(true);
    
    // ২. আপনার ব্যাকেন্ডের রিকোয়েমেন্ট অনুযায়ী পে-লোড সাজানো
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
      
      // এই সেই অংশ যেখানে আপনি কোডটি খুঁজছিলেন
      if (res.success) {
        toast.success("Order placed successfully! 🚀");
        router.push("/dashboard/orders"); // অর্ডার পেজে নিয়ে যাবে
        router.refresh(); // ডাটা আপডেট করতে বাধ্য করবে
      } else {
        toast.error(res.message || "Failed to place order.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout}
      disabled={loading}
      className="bg-white text-orange-600 hover:bg-zinc-900 hover:text-white px-8 h-12 rounded-xl font-bold text-lg shadow-lg transition-all"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        "Checkout Now"
      )}
    </Button>
  );
}