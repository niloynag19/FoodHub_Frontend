import { statsService } from "@/services/stats.service";
import React from 'react';
import { AdminDashboardHome } from "@/components/dashboard/admin/AdminDashboardHome";

const Page = async () => {
    const result = await statsService.getStats();
    
    if (!result.success) {
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold text-red-500">Failed to load statistics</h1>
            </div>
        );
    }

    return <AdminDashboardHome stats={result.data} />;
};

export default Page;