import { getProviderOrdersAction } from "@/actions/order.actions";
import OrderStatusDropdown from "@/components/provider/OrderStatusDropdown";
import { ShoppingBag, Calendar, MapPin, CreditCard } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProviderOrdersPage() {
  const result = await getProviderOrdersAction();
  console.log("Order result :", result);

  const orders = result?.data?.recentOrders || [];

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
              className="bg-white rounded-[2rem] border border-zinc-100 p-8 hover:shadow-xl transition-all duration-300 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-[10px] font-black tracking-tighter">
                      ORDER #{order.id?.slice(-6).toUpperCase()}
                    </span>
                    <span className="text-zinc-400 text-xs flex items-center gap-1 font-medium">
                      <Calendar size={14} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-800">
                      <MapPin size={16} className="text-zinc-400" />
                      <p className="text-sm font-bold">{order.deliveryAddress}</p>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 ml-6">
                      <CreditCard size={14} />
                      <p className="text-xs font-medium uppercase tracking-widest">{order.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 lg:border-l lg:pl-10 border-zinc-50 flex flex-col justify-center">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-3xl font-black text-orange-600 tracking-tight">
                    {order.totalAmount} <span className="text-sm font-bold ml-1">TK</span>
                  </p>
                </div>
                <div className="flex-1 flex flex-col items-end justify-center lg:border-l lg:pl-10 border-zinc-50">
                   <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Order Status</p>
                   <OrderStatusDropdown orderId={order.id} currentStatus={order.status} />
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}