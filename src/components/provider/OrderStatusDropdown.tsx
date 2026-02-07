"use client";

import { useState } from "react";
import { updateOrderStatusAction } from "@/actions/order.actions";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function OrderStatusDropdown({ 
  orderId, 
  currentStatus 
}: { 
  orderId: string; 
  currentStatus: string 
}) {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await updateOrderStatusAction(orderId, newStatus);
      if (res.success) {
        toast.success(`Order is now ${newStatus}! 🚚`);
      } else {
        toast.error(res.message || "Failed to update");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end">
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin text-orange-600" />}
      <Select 
        disabled={loading} 
        onValueChange={handleStatusChange} 
        defaultValue={currentStatus}
      >
        <SelectTrigger className="w-[160px] rounded-2xl border-zinc-200 h-10 text-xs font-black shadow-sm">
          <SelectValue placeholder="Change Status" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl shadow-2xl border-zinc-100">
        
          <SelectItem value="PLACED" className="text-blue-600 font-bold">Placed</SelectItem>
          <SelectItem value="PROCESSING" className="text-amber-600 font-bold">Processing</SelectItem>
          <SelectItem value="SHIPPED" className="text-purple-600 font-bold">Shipped</SelectItem>
          <SelectItem value="DELIVERED" className="text-green-600 font-bold">Delivered</SelectItem>
          <SelectItem value="CANCELLED" className="text-red-600 font-bold">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}