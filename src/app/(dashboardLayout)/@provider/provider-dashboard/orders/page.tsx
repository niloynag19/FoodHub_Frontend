import { getProviderOrdersAction } from "@/actions/order.actions";
import OrderStatusDropdown from "@/components/provider/OrderStatusDropdown";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Calendar, User, CreditCard } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProviderOrdersPage() {
  const result = await getProviderOrdersAction();

  const orders = Array.isArray(result?.data) ? result.data : result?.data?.data || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-zinc-900 italic">Incoming Orders 📦</h1>
        <p className="text-zinc-500 mt-1">Track and manage your customer's requests</p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-200">
          <ShoppingBag className="h-16 w-16 text-zinc-300 mb-4" />
          <p className="text-xl font-bold text-zinc-400">No orders yet!</p>
          <p className="text-zinc-400 text-sm">When customers buy your meals, they will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order: any) => (
            <div 
              key={order.id} 
              className="bg-white rounded-[2rem] border border-zinc-100 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                
                {/* Order Basic Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-xs font-black">
                      ORDER #{order.id.slice(-6).toUpperCase()}
                    </span>
                    <span className="text-zinc-400 text-sm flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900">{order.customer?.name || "Guest Customer"}</p>
                      <p className="text-xs text-zinc-500">{order.customer?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="flex-1 border-l border-zinc-50 lg:pl-10">
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-3">Order Items</p>
                  <div className="space-y-2">
                    {order.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-zinc-600 font-medium">{item.meal?.name} <span className="text-orange-500 font-black">x{item.quantity}</span></span>
                        <span className="text-zinc-400">{item.price * item.quantity} TK</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status & Price */}
                <div className="flex-1 flex flex-col items-end justify-between border-l border-zinc-50 lg:pl-10">
                  <div className="text-right">
                    <p className="text-xs font-black text-zinc-400 uppercase mb-1">Total Payable</p>
                    <p className="text-2xl font-black text-zinc-900">{order.totalPrice} TK</p>
                  </div>
                  
                  <div className="mt-4 w-full flex justify-end">
                    <OrderStatusDropdown orderId={order.id} currentStatus={order.status} />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}