import { statsService } from "@/services/stats.service";
import { userService } from "@/services/user.service";
import { getAllOrdersAction } from "@/actions/order.actions";
import { getAllMealsAction } from "@/actions/meal.action";
import React from 'react';
import { AdminDashboardHome } from "@/components/dashboard/admin/AdminDashboardHome";

const Page = async () => {
    const [statsRes, usersRes, ordersRes, mealsRes] = await Promise.all([
        statsService.getStats(),
        userService.getAllUsers(),
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
    const usersData = Array.isArray(usersRes.data) ? usersRes.data : (Array.isArray(usersRes) ? usersRes : []);
    const ordersData = Array.isArray(ordersRes.data) ? ordersRes.data : (Array.isArray(ordersRes) ? ordersRes : []);
    const mealsData = Array.isArray(mealsRes.data) ? mealsRes.data : (Array.isArray(mealsRes?.data?.data) ? mealsRes.data.data : []);

    return <AdminDashboardHome stats={statsData} users={usersData} orders={ordersData} meals={mealsData} />;
};

export default Page;