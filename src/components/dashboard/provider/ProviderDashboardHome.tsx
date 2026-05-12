"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { 
  Utensils, 
  ShoppingCart, 
  DollarSign,
  Clock,
  CheckCircle2,
  Package,
  TrendingUp,
  Activity
} from "lucide-react";

interface ProviderDashboardHomeProps {
  stats: any;
}

const COLORS = ["#f97316", "#ef4444", "#8b5cf6", "#10b981", "#3b82f6", "#6366f1"];

export const ProviderDashboardHome = ({ stats }: ProviderDashboardHomeProps) => {
  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-zinc-500 font-bold italic uppercase tracking-widest">No dashboard data available.</p>
      </div>
    );
  }

  const { summary = {}, recentOrders = [], ordersByStatus = [] } = stats;

  const summaryCards = [
    { title: "My Meals", value: summary.totalMeals ?? 0, icon: Utensils, color: "bg-orange-500", text: "text-orange-500" },
    { title: "Total Orders", value: summary.totalOrders ?? 0, icon: ShoppingCart, color: "bg-blue-500", text: "text-blue-500" },
    { title: "Revenue", value: `$${(summary.totalRevenue ?? 0).toFixed(2)}`, icon: DollarSign, color: "bg-emerald-500", text: "text-emerald-500" },
    { title: "Recent Orders", value: recentOrders.length, icon: Clock, color: "bg-purple-500", text: "text-purple-500" },
  ];


  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black italic tracking-tighter text-zinc-900 flex items-center gap-3">
          <Activity className="h-10 w-10 text-orange-600" />
          RESTAURANT PERFORMANCE
        </h1>
        <p className="text-zinc-500 font-medium">Track your kitchen&apos;s activity and revenue.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col gap-4">
              <div className={`h-12 w-12 ${card.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-zinc-200 transition-transform group-hover:scale-110`}>
                <card.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">{card.title}</p>
                <p className={`text-2xl font-black italic tracking-tighter ${card.text}`}>{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Status Breakdown */}
        <div className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-sm lg:col-span-1">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black italic tracking-tighter text-zinc-900 uppercase">Order Status</h3>
            <div className="h-8 w-8 bg-zinc-50 rounded-full flex items-center justify-center">
                <Package className="h-4 w-4 text-zinc-400" />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ordersByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="status"
                >
                  {ordersByStatus.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black italic tracking-tighter text-zinc-900 uppercase">Recent Activity</h3>
            <div className="h-8 w-8 bg-zinc-50 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-zinc-400" />
            </div>
          </div>
          
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <ShoppingCart className="h-5 w-5 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-sm font-black italic tracking-tighter text-zinc-900 uppercase">Order #{order.id.slice(-6)}</p>
                      <p className="text-xs text-zinc-400 font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black text-orange-600 tracking-tighter italic">${order.totalAmount.toFixed(2)}</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                      order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      order.status === 'CANCELLED' ? 'bg-red-50 text-red-600 border-red-100' :
                      'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-400 font-bold italic tracking-tighter uppercase">No recent activity found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
