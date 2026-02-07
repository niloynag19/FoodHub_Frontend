import { getCustomerOrdersAction } from "@/actions/order.actions";
import { 
  Package, Clock, CheckCircle2, Truck, XCircle, 
  MapPin, ShoppingBag, Receipt, Calendar 
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MyOrdersPage() {
  const result = await getCustomerOrdersAction();
  
  // সেফটি চেক
  const orders = Array.isArray(result?.data) ? result.data : (result?.data?.data || []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PLACED": 
        return { icon: <Clock size={16} />, color: "bg-blue-50 text-blue-700 border-blue-100", label: "Order Placed" };
      case "PROCESSING": 
        return { icon: <Package size={16} />, color: "bg-amber-50 text-amber-700 border-amber-100", label: "Preparing Food" };
      case "SHIPPED": 
        return { icon: <Truck size={16} />, color: "bg-purple-50 text-purple-700 border-purple-100", label: "On The Way" };
      case "DELIVERED": 
        return { icon: <CheckCircle2 size={16} />, color: "bg-emerald-50 text-emerald-700 border-emerald-100", label: "Delivered" };
      case "CANCELLED": 
        return { icon: <XCircle size={16} />, color: "bg-red-50 text-red-700 border-red-100", label: "Cancelled" };
      default: 
        return { icon: <Clock size={16} />, color: "bg-zinc-50 text-zinc-700 border-zinc-100", label: status };
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <h1 className="text-5xl font-black text-zinc-900 tracking-tighter italic">My Orders</h1>
          <p className="text-zinc-500 mt-2 font-medium">Track your homemade meal journey</p>
        </div>
        <div className="bg-zinc-100 px-6 py-2 rounded-2xl text-sm font-bold text-zinc-600 border border-zinc-200">
          Total Orders: {orders.length}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-zinc-50 rounded-[4rem] border-4 border-dashed border-zinc-100">
          <div className="bg-white p-6 rounded-full shadow-xl mb-6">
            <ShoppingBag className="h-12 w-12 text-orange-500" />
          </div>
          <p className="text-2xl font-black text-zinc-400">Empty Plate!</p>
          <p className="text-zinc-400 font-medium mt-1">You haven't ordered any delicious meals yet.</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {orders.map((order: any) => {
            const status = getStatusConfig(order.status);
            return (
              <div 
                key={order.id} 
                className="group bg-white rounded-[3rem] border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Top Section: Header */}
                <div className="p-8 border-b border-zinc-50 flex flex-wrap items-center justify-between gap-6 bg-zinc-50/30">
                  <div className="flex items-center gap-4">
                    <div className="bg-white h-14 w-14 rounded-2xl flex items-center justify-center shadow-sm border border-zinc-100">
                      <Receipt className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Transaction ID</p>
                      <p className="font-mono font-bold text-zinc-800 underline decoration-orange-200 underline-offset-4 uppercase">
                        {order.id.slice(-12)}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 font-black text-[10px] uppercase tracking-widest ${status.color} shadow-sm`}>
                    {status.icon}
                    {status.label}
                  </div>
                </div>

                {/* Middle Section: Items & Info */}
                <div className="p-8 grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Ordered Meals</p>
                    <div className="space-y-4">
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between group/item">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-orange-400" />
                            <p className="text-sm font-bold text-zinc-700">
                              {item.meal?.name} <span className="text-orange-500 ml-1">x{item.quantity}</span>
                            </p>
                          </div>
                          <p className="text-sm font-black text-zinc-400">{(item.price * item.quantity)} TK</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-zinc-50 rounded-[2rem] p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-orange-500 mt-1 shrink-0" size={18} />
                      <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Delivery To</p>
                        <p className="text-sm font-bold text-zinc-700 leading-relaxed italic">
                          "{order.deliveryAddress}"
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="text-zinc-400 shrink-0" size={18} />
                      <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Order Date</p>
                        <p className="text-sm font-bold text-zinc-700">
                          {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Summary */}
                <div className="px-8 py-6 bg-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                   <div className="flex items-center gap-4 text-white/60 text-xs font-bold uppercase tracking-widest">
                     <span>Payment: {order.paymentMethod}</span>
                     <span className="h-1 w-1 rounded-full bg-white/20" />
                     <span>Status: {order.status}</span>
                   </div>
                   <div className="text-white flex items-baseline gap-2">
                     <span className="text-xs font-medium text-white/50">Total Paid:</span>
                     <span className="text-3xl font-black text-orange-500 tracking-tighter">
                       {order.totalAmount} <span className="text-sm">TK</span>
                     </span>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}