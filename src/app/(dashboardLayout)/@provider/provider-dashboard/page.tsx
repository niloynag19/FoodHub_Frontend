import { statsService } from "@/services/stats.service";
import { getAllOrdersAction } from "@/actions/order.actions";
import { getAllMealsAction } from "@/actions/meal.action";
import React from "react";
import { ProviderDashboardHome } from "@/components/dashboard/provider/ProviderDashboardHome";

const Page = async () => {
  const [statsRes, ordersRes, mealsRes] = await Promise.all([
    statsService.getStats(),
    getAllOrdersAction(),
    getAllMealsAction()
  ]);

  if (!statsRes.success) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-500">Failed to load statistics</h1>
      </div>
    );
  }

  const statsData = statsRes.data || statsRes;
  const ordersData = Array.isArray(ordersRes.data) ? ordersRes.data : (Array.isArray(ordersRes) ? ordersRes : []);
  const mealsData = Array.isArray(mealsRes.data) ? mealsRes.data : (Array.isArray(mealsRes?.data?.data) ? mealsRes.data.data : []);
  
  return <ProviderDashboardHome stats={statsData} orders={ordersData} meals={mealsData} />;
};

export default Page;