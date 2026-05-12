import { statsService } from "@/services/stats.service";
import { getAllOrdersAction } from "@/actions/order.actions";
import React from "react";
import { ProviderDashboardHome } from "@/components/dashboard/provider/ProviderDashboardHome";

const Page = async () => {
  const [statsRes, ordersRes] = await Promise.all([
    statsService.getStats(),
    getAllOrdersAction()
  ]);

  if (!statsRes.success) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-500">Failed to load statistics</h1>
      </div>
    );
  }

  const statsData = statsRes.data || statsRes;
  const ordersData = ordersRes.data || ordersRes || [];
  
  return <ProviderDashboardHome stats={statsData} orders={ordersData} />;
};

export default Page;