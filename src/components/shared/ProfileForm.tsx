"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { User, Mail, ShieldCheck, MapPin, Phone, Camera, Loader2 } from "lucide-react";
import { updateProfileAction } from "@/actions/user.action";

export default function ProfileForm({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    };

    const res = await updateProfileAction(payload);
    if (res.success) {
      toast.success("Profile updated successfully! ✨");
    } else {
      toast.error(res.message || "Failed to update");
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* বাম পাশ: প্রোফাইল কার্ড */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 text-center shadow-sm">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="w-full h-full rounded-full bg-orange-50 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
              {user?.image ? (
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={60} className="text-orange-600" />
              )}
            </div>
          </div>
          <h2 className="text-xl font-black text-zinc-900">{user?.name}</h2>
          <p className="text-zinc-400 text-sm mb-4 italic">{user?.email}</p>
          <span className="bg-orange-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
            {user?.role}
          </span>
        </div>
      </div>

      {/* ডান পাশ: এডিট ফর্ম */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-600 ml-1">Display Name</label>
              <Input name="name" defaultValue={user?.name} className="h-12 rounded-xl border-zinc-200 focus:ring-orange-600" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-600 ml-1">Registered Email</label>
              <Input value={user?.email} disabled className="h-12 rounded-xl bg-zinc-50 border-zinc-200 text-zinc-400" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-600 ml-1">Phone Number</label>
              <Input name="phone" placeholder="+880 1XXX XXXXXX" className="h-12 rounded-xl border-zinc-200" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-600 ml-1">Full Address</label>
              <Input name="address" placeholder="Road 5, Dhanmondi, Dhaka" className="h-12 rounded-xl border-zinc-200" />
            </div>
          </div>

          <Button disabled={loading} className="w-full md:w-auto px-12 bg-zinc-900 hover:bg-orange-600 text-white h-14 rounded-2xl font-bold transition-all shadow-lg">
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Save Profile Info"}
          </Button>
        </form>
      </div>
    </div>
  );
}