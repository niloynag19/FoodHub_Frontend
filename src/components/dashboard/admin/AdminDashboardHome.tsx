"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

import { 
  Users, 
  Store, 
  Utensils, 
  ShoppingCart, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface AdminDashboardHomeProps {
  stats: any;
  users?: any[];
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

export const AdminDashboardHome = ({ stats, users = [], orders = [] }: AdminDashboardHomeProps) => {
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

  // Generate Growth Chart Data from real orders
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }).reverse();

  const chartData = last7Days.map(date => {
    const count = orders?.filter(o => 
      o?.createdAt && new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === date
    ).length || 0;
    return { date, orders: count };
  });

  const summaryCards = [
    { 
      title: "Total Users", 
      value: getVal("totalUsers") || users?.length || 0, 
      icon: Users, 
      color: "text-cyan-600", 
      bgColor: "bg-cyan-50" 
    },
    { 
      title: "Total Providers", 
      value: getVal("totalProviders") || users?.filter(u => u?.role === 'PROVIDER').length || 0, 
      icon: Store, 
      color: "text-teal-600", 
      bgColor: "bg-teal-50" 
    },
    { 
      title: "Total Meals", 
      value: getVal("totalMeals"), 
      icon: Utensils, 
      color: "text-purple-600", 
      bgColor: "bg-purple-50" 
    },
    { 
      title: "Total Orders", 
      value: getVal("totalOrders") || orders?.length || 0, 
      icon: ShoppingCart, 
      color: "text-orange-600", 
      bgColor: "bg-orange-50" 
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
        {/* Growth Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-zinc-900">Order Growth</h3>
            <p className="text-sm text-zinc-500">Order volume over the last 7 days</p>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
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
                />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#0891b2" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorOrders)"
                  dot={{ r: 4, fill: '#0891b2', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Users */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-zinc-900">Recent Users</h3>
            <p className="text-sm text-zinc-500">Latest signups on the platform</p>
          </div>
          
          <div className="flex-1 space-y-4">
            {users && users.length > 0 ? (
              [...users].reverse().slice(0, 5).map((user: any) => (
                <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-zinc-50 rounded-xl transition-colors">
                  <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold uppercase">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 truncate">{user?.name || 'Unknown User'}</p>
                    <p className="text-xs text-zinc-500 truncate">{user?.email || 'No email'}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 py-10">
                <Users className="h-10 w-10 mb-2 opacity-20" />
                <p className="text-sm font-medium">No recent users</p>
              </div>
            )}
          </div>

          <Link 
            href="/admin-dashboard/all-users"
            className="mt-6 w-full py-2.5 px-4 bg-cyan-50/50 hover:bg-cyan-100/50 text-cyan-700 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-cyan-100/50"
          >
            View All Users
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

