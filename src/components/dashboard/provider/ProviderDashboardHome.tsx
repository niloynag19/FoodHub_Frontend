"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import { 
  Utensils, 
  ShoppingCart, 
  DollarSign,
  Clock,
  ArrowRight,
  Package
} from "lucide-react";

interface ProviderDashboardHomeProps {
  stats: any;
  orders?: any[];
}

const StatCard = ({ title, value, icon: Icon, color, bgColor }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-zinc-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-zinc-900">{value}</h3>
    </div>
    <div className={`p-3 rounded-xl ${bgColor}`}>
      <Icon className={`h-6 w-6 ${color}`} />
    </div>
  </div>
);

export const ProviderDashboardHome = ({ stats, orders = [] }: ProviderDashboardHomeProps) => {
  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-zinc-500 font-bold italic uppercase tracking-widest">No dashboard data available.</p>
      </div>
    );
  }

  // Flexible data mapping to handle different API structures
  const getVal = (key: string) => {
    return stats[key] ?? stats.data?.[key] ?? stats.summary?.[key] ?? 0;
  };

  // Generate Revenue Chart Data from real orders
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }).reverse();

  const chartData = last7Days.map(date => {
    const dayOrders = orders?.filter(o => 
      o?.createdAt && new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === date
    ) || [];
    const revenue = dayOrders.reduce((sum, o) => sum + (Number(o?.totalAmount) || 0), 0);
    return { date, revenue };
  });

  const summaryCards = [
    { 
      title: "My Meals", 
      value: getVal("totalMeals"), 
      icon: Utensils, 
      color: "text-orange-600", 
      bgColor: "bg-orange-50" 
    },
    { 
      title: "Total Orders", 
      value: getVal("totalOrders") || orders?.length || 0, 
      icon: ShoppingCart, 
      color: "text-blue-600", 
      bgColor: "bg-blue-50" 
    },
    { 
      title: "Revenue", 
      value: `$${(Number(getVal("totalRevenue")) || orders?.reduce((sum, o) => sum + (Number(o?.totalAmount) || 0), 0) || 0).toFixed(2)}`, 
      icon: DollarSign, 
      color: "text-emerald-600", 
      bgColor: "bg-emerald-50" 
    },
    { 
      title: "Active Orders", 
      value: orders?.filter((o: any) => o?.status !== 'DELIVERED' && o?.status !== 'CANCELLED').length || 0, 
      icon: Clock, 
      color: "text-purple-600", 
      bgColor: "bg-purple-50" 
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Title */}
      <h1 className="text-2xl font-bold text-zinc-900">Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-zinc-900">Revenue Growth</h3>
            <p className="text-sm text-zinc-500">Daily revenue trend over the last 7 days</p>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  formatter={(val: any) => [`$${Number(val).toFixed(2)}`, 'Revenue']}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)"
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-zinc-900">Recent Orders</h3>
            <p className="text-sm text-zinc-500">Latest activity in your kitchen</p>
          </div>
          
          <div className="flex-1 space-y-4">
            {orders && orders.length > 0 ? (
              [...orders].reverse().slice(0, 5).map((order: any) => (
                <div key={order.id} className="flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-xl transition-colors border border-transparent hover:border-zinc-100">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 truncate">Order #{order?.id?.slice(-6) || 'XXXXXX'}</p>
                    <p className="text-xs text-zinc-500">{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-zinc-900">${(Number(order?.totalAmount) || 0).toFixed(2)}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      order?.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600' :
                      order?.status === 'CANCELLED' ? 'bg-red-50 text-red-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {order?.status || 'PENDING'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 py-10">
                <ShoppingCart className="h-10 w-10 mb-2 opacity-20" />
                <p className="text-sm font-medium">No recent orders</p>
              </div>
            )}
          </div>

          <button className="mt-6 w-full py-2.5 px-4 bg-blue-50/50 hover:bg-blue-100/50 text-blue-700 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-blue-100/50">
            View All Activity
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

