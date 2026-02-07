"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, ChevronDown } from "lucide-react";
import { toggleUserStatusAction } from "@/actions/user.action";
import { confirmAction } from "@/lib/swal-utils"; 

export default function StatusDropdown({ userId, currentStatus }: { userId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);

  const handleChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return;

    if (newStatus === "SUSPENDED") {
      const result = await confirmAction({
        title: "Suspend User?",
        text: "This user will be blocked from ordering until you activate them again.",
        confirmText: "Yes, Suspend!"
      });

      if (!result.isConfirmed) return; 
    }

    setLoading(true);
    try {
      const res = await toggleUserStatusAction(userId, currentStatus); 
      
      if (res.success) {
        toast.success(newStatus === "SUSPENDED" ? "User Suspended! 🔒" : "User Activated! ✅");
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block w-40">
      <select
        disabled={loading}
        value={currentStatus}
        onChange={(e) => handleChange(e.target.value)}
        // --- Accessibility Fix: Title and Aria-Label Added ---
        title="Change user status"
        aria-label="Change user status"
        // ----------------------------------------------------
        className={`w-full appearance-none px-4 py-2 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50 outline-none
          ${currentStatus === 'ACTIVE' 
            ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
            : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100'
          }`}
      >
        <option value="ACTIVE">Active</option>
        <option value="SUSPENDED">Suspended</option>
      </select>
      
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-current">
        {loading ? <Loader2 size={14} className="animate-spin" /> : <ChevronDown size={14} />}
      </div>
    </div>
  );
}