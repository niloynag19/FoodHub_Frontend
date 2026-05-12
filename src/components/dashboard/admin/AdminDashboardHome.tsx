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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

import { 
  Users, 
  Store, 
  Utensils, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  Package,
  CheckCircle2,
  Activity
} from "lucide-react";

interface AdminDashboardHomeProps {
  stats: any;
}

const COLORS = ["#f97316", "#ef4444", "#8b5cf6", "#10b981", "#3b82f6", "#6366f1"];

export const AdminDashboardHome = ({ stats }: AdminDashboardHomeProps) => {
  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-zinc-500 font-bold italic uppercase tracking-widest">No dashboard data available.</p>
      </div>
    );
  }

  const { summary = {}, ordersByStatus = [], categoryStats = [], monthlyRevenue = [], weeklyOrders = [] } = stats;

  const summaryCards = [
    { title: "Total Users", value: summary.totalUsers ?? 0, icon: Users, color: "bg-blue-500", text: "text-blue-500" },
    { title: "Total Providers", value: summary.totalProviders ?? 0, icon: Store, color: "bg-purple-500", text: "text-purple-500" },
    { title: "Total Meals", value: summary.totalMeals ?? 0, icon: Utensils, color: "bg-orange-500", text: "text-orange-500" },
    { title: "Total Orders", value: summary.totalOrders ?? 0, icon: ShoppingCart, color: "bg-emerald-500", text: "text-emerald-500" },
    { title: "Total Revenue", value: `$${(summary.totalRevenue ?? 0).toFixed(2)}`, icon: DollarSign, color: "bg-rose-500", text: "text-rose-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black italic tracking-tighter text-zinc-900 flex items-center gap-3">
          <TrendingUp className="h-10 w-10 text-orange-600" />
          DASHBOARD OVERVIEW
        </h1>
        <p className="text-zinc-500 font-medium">Real-time insights and analytics for FoodHub.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Orders - Area Chart */}
        <div className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black italic tracking-tighter text-zinc-900 uppercase">Weekly Order Volume</h3>
            <div className="h-8 w-8 bg-zinc-50 rounded-full flex items-center justify-center">
                <Activity className="h-4 w-4 text-zinc-400" />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyOrders}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#f97316" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorOrders)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend - Line Chart */}
        <div className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black italic tracking-tighter text-zinc-900 uppercase">Revenue Trend</h3>
            <div className="h-8 w-8 bg-zinc-50 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-zinc-400" />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#f97316" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status - Pie Chart */}
        <div className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-sm">
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

        {/* Category Distribution - Bar Chart */}
        <div className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black italic tracking-tighter text-zinc-900 uppercase">Category Distribution</h3>
            <div className="h-8 w-8 bg-zinc-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-zinc-400" />
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#fafafa'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar 
                  dataKey="meals" 
                  fill="#f97316" 
                  radius={[10, 10, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
