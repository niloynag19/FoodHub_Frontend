"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, ChevronDown } from "lucide-react";
import { toggleUserStatusAction } from "@/actions/user.action";
import { confirmAction } from "@/lib/swal-utils"; 

export default function StatusDropdown({ 
  userId, 
  currentStatus 
}: { 
  userId: string, 
  currentStatus: string 
}) {
  const [loading, setLoading] = useState(false);
  console.log(userId,currentStatus);

  const handleChange = async (newStatus: string) => {
    // ১. যদি আগের স্ট্যাটাস আর নতুন স্ট্যাটাস এক হয়, তবে কিছু করার দরকার নেই
    if (newStatus === currentStatus) return;

    // ২. SUSPEND করার সময় কনফার্মেশন নেওয়া (প্রফেশনাল স্ট্যান্ডার্ড)
    if (newStatus === "SUSPENDED") {
      const result = await confirmAction({
        title: "Suspend User?",
        text: "This user will be blocked from accessing the platform until activated again.",
        confirmText: "Yes, Suspend!"
      });

      if (!result.isConfirmed) return; 
    }

    setLoading(true);
    try {
      // ৩. আপনার কাস্টমাইজ করা সার্ভার অ্যাকশন কল করা
      // এখানে currentStatus পাঠানো হচ্ছে যাতে অ্যাকশন বুঝতে পারে টগল করে কী করতে হবে
      const res = await toggleUserStatusAction(userId, currentStatus); 
      
      if (res.success) {
        toast.success(newStatus === "SUSPENDED" ? "User Suspended! 🔒" : "User Activated! ✅");
      } else {
        // ব্যাকেন্ড থেকে Unauthorized বা অন্য এরর আসলে সেটি দেখাবে
        toast.error(res.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.error(error);
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
        // অ্যাক্সেসিবিলিটি ফিক্স নিচে দেওয়া হলো:
        title="Change user status"
        aria-label={`Change status for user ${userId}`}
        name="userStatus"
        className={`w-full appearance-none px-4 py-2 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50 outline-none
          ${currentStatus === 'ACTIVE' 
            ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
            : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100'
          }`}
      >
        <option value="ACTIVE" className="bg-white text-zinc-900 font-sans">Active</option>
        <option value="SUSPENDED" className="bg-white text-zinc-900 font-sans">Suspended</option>
      </select>
      
      {/* আইকন সেকশন */}
      <div className={`absolute inset-y-0 right-3 flex items-center pointer-events-none ${
        currentStatus === 'ACTIVE' ? 'text-emerald-600' : 'text-red-600'
      }`}>
        {loading ? <Loader2 size={14} className="animate-spin" /> : <ChevronDown size={14} />}
      </div>
    </div>
  );
}