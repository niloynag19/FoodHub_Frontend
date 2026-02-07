// app/(dashboardLayout)/@provider/dashboard/page.tsx
import { getProviderStatsAction } from "@/actions/stats.actions";
import { DollarSign, ShoppingBag, Utensils, TrendingUp } from "lucide-react";

export default async function ProviderDashboard() {
  const result = await getProviderStatsAction();
  
  const stats = result?.data || { 
    totalRevenue: 0, 
    totalOrders: 0, 
    myTotalMeals: 0 
  };

  const cards = [
    {
      title: "Total Revenue",
      value: `${stats.totalRevenue} TK`,
      icon: <DollarSign className="text-emerald-600" />,
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingBag className="text-blue-600" />,
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "My Total Meals",
      value: stats.myTotalMeals, 
      icon: <Utensils className="text-orange-600" />,
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-5xl font-black text-zinc-900 italic tracking-tighter">
          Kitchen Analytics 📊
        </h1>
        <p className="text-zinc-500 font-medium mt-2">Real-time performance of your food hub</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div 
            key={i} 
            className={`p-10 rounded-[3rem] border-2 ${card.bg} ${card.border} shadow-sm group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}
          >
            <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:rotate-12 transition-transform">
              {card.icon}
            </div>
            <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">{card.title}</p>
            <h2 className="text-4xl font-black text-zinc-900 mt-2 tracking-tight">{card.value}</h2>
          </div>
        ))}
      </div>

    
      <div className="mt-12 p-10 bg-zinc-900 rounded-[4rem] text-white flex justify-between items-center overflow-hidden relative">
         <div className="z-10">
            <h3 className="text-2xl font-black italic">Business is Growing!</h3>
            <p className="text-zinc-400 mt-1">You have {stats.totalOrders} active orders to manage.</p>
         </div>
         <TrendingUp className="text-white/10 absolute right-[-20px] top-[-20px] h-64 w-64 rotate-12" />
      </div>
    </div>
  );
}