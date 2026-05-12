import { statsService } from "@/services/stats.service";
import { userService } from "@/services/user.service";
import { getAllOrdersAction } from "@/actions/order.actions";
import React from 'react';
import { AdminDashboardHome } from "@/components/dashboard/admin/AdminDashboardHome";

const Page = async () => {
    const [statsRes, usersRes, ordersRes] = await Promise.all([
        statsService.getStats(),
        userService.getAllUsers(),
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
    const usersData = Array.isArray(usersRes.data) ? usersRes.data : (Array.isArray(usersRes) ? usersRes : []);
    const ordersData = Array.isArray(ordersRes.data) ? ordersRes.data : (Array.isArray(ordersRes) ? ordersRes : []);

    return <AdminDashboardHome stats={statsData} users={usersData} orders={ordersData} />;
};

export default Page;