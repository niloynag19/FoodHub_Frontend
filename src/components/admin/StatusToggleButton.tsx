"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UserMinus, UserCheck, Loader2 } from "lucide-react";
import { toggleUserStatusAction } from "@/actions/user.action";

// এখানে status আসবে String হিসেবে (ACTIVE বা BLOCKED)
export default function StatusToggleButton({ userId, status }: { userId: string, status: string }) {
  const [loading, setLoading] = useState(false);

  // চেক করা সহজ করার জন্য একটি বুলিয়ান কনস্ট্যান্ট
  const isBlocked = status === "BLOCKED";

  const handleToggle = async () => {
    setLoading(true);
    
    // অ্যাকশনে আমরা বর্তমান স্ট্যাটাসটি পাঠিয়ে দিচ্ছি
    const res = await toggleUserStatusAction(userId, status);
    
    if (res.success) {
      toast.success(isBlocked ? "User Unblocked! ✅" : "User Blocked! 🚫");
    } else {
      toast.error(res.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <button 
      disabled={loading}
      onClick={handleToggle}
      className={`p-3 rounded-2xl transition-all flex items-center gap-2 ${
        isBlocked 
        ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
        : 'bg-red-50 text-red-600 hover:bg-red-100'
      } disabled:opacity-50`}
      title={isBlocked ? "Unblock User" : "Block User"}
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        isBlocked ? <UserCheck size={20} /> : <UserMinus size={20} />
      )}
    </button>
  );
}