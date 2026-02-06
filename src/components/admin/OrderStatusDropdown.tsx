"use client";
import { updateOrderStatusAction } from "@/actions/order.actions";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function OrderStatusDropdown({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const handleStatusChange = async (newStatus: string) => {
    const res = await updateOrderStatusAction(orderId, newStatus);
    if (res.success) {
      toast.success(`Order status updated to ${newStatus}`);
    } else {
      toast.error("Failed to update status");
    }
  };

  return (
    <Select onValueChange={handleStatusChange} defaultValue={currentStatus}>
      <SelectTrigger className="w-[130px] ml-auto">
        <SelectValue placeholder="Update Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PLACED">Placed</SelectItem>
        <SelectItem value="PROCESSING">Processing</SelectItem>
        <SelectItem value="DELIVERED">Delivered</SelectItem>
        <SelectItem value="CANCELLED">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
}