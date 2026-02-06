import { getMyOrdersAction } from "@/actions/order.actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

// প্রফেশনাল টাইপ ডেফিনিশন
interface OrderItem {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
}

// এটি নিশ্চিত করবে যে পেজটি ক্যাশ হয়ে থাকবে না
export const dynamic = "force-dynamic";

export default async function MyOrdersPage() {
  const result = await getMyOrdersAction();
  
  /**
   * আপনার Postman রেসপন্স অনুযায়ী:
   * result -> data (অবজেক্ট) -> data (আসল অর্ডারের অ্যারে)
   */
  const orders: OrderItem[] = Array.isArray(result?.data?.data) ? result.data.data : [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold italic text-orange-600">Order History</h1>
          <p className="text-muted-foreground mt-1">Track and manage your recent orders</p>
        </div>
        <div className="hidden md:block">
          <Package className="w-12 h-12 text-orange-500 opacity-20" />
        </div>
      </div>

      {/* Conditional Rendering */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-full mb-4 shadow-sm">
             <Package className="w-8 h-8 text-zinc-300" />
          </div>
          <p className="text-xl font-medium text-zinc-500 font-sans">No orders found yet.</p>
          <Link href="/meals" className="mt-4">
             <Button variant="outline" className="rounded-full border-orange-200 hover:bg-orange-50 text-orange-600 font-bold">
               Explore Delicious Meals
             </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="group bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left: Order Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-lg">Order #{order.id.slice(-6).toUpperCase()}</span>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        order.status === "DELIVERED" 
                          ? "bg-green-100 text-green-700 hover:bg-green-100" 
                          : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                      } border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Right: Pricing & Action */}
              <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Total Price</p>
                  <p className="text-xl font-black text-zinc-900 dark:text-white">{order.totalAmount} TK</p>
                </div>
                <Link href={`/dashboard/orders/${order.id}`}>
                  <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}