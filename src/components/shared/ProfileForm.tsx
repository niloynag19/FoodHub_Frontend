"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { User, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client"; // আপনার ক্লায়েন্ট ফাইলটি ইম্পোর্ট করুন
import { useRouter } from "next/navigation";

export default function ProfileForm({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    // ১. Better-Auth ক্লায়েন্ট দিয়ে বেসিক ইনফো আপডেট
    const { data, error } = await authClient.updateUser({
      name: name,
      // image: "নতুন_লিঙ্ক" (যদি ইমেজ আপলোড থাকে)
    });

    if (error) {
      toast.error(error.message || "Identity update failed");
      setLoading(false);
      return;
    }

    // ২. যদি আপনার কাস্টম এপিআই (Action) থাকে ফোন এবং অ্যাড্রেসের জন্য
    // কারণ Better-Auth ডিফল্টভাবে phone/address আপডেট নাও করতে পারে
    // const res = await updateProfileAction({ phone, address }); 

    toast.success("Identity updated successfully! ✨");
    router.refresh(); // পেজ রিফ্রেশ করে নতুন ডেটা দেখাবে
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* বাম পাশের প্রোফাইল কার্ড */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 text-center shadow-sm">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="w-full h-full rounded-full bg-orange-50 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden relative">
              {user?.image ? (
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={60} className="text-orange-600" />
              )}
            </div>
          </div>
          <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tighter">{user?.name}</h2>
          <p className="text-zinc-400 text-sm mb-4 italic lowercase">{user?.email}</p>
          <span className="bg-zinc-900 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
            {user?.role}
          </span>
        </div>
      </div>

      {/* ডান পাশের এডিট ফর্ম */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-600 ml-1 uppercase tracking-tighter">Full Name</label>
              <Input name="name" defaultValue={user?.name} className="h-12 rounded-xl border-zinc-200 focus:ring-zinc-900" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-600 ml-1 uppercase tracking-tighter">Email Address</label>
              <Input value={user?.email} disabled className="h-12 rounded-xl bg-zinc-50 border-zinc-200 text-zinc-400" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-600 ml-1 uppercase tracking-tighter">Phone (Database Update)</label>
              <Input name="phone" defaultValue={user?.phone || ""} placeholder="+880 1XXX XXXXXX" className="h-12 rounded-xl border-zinc-200" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-600 ml-1 uppercase tracking-tighter">Living Address</label>
              <Input name="address" defaultValue={user?.address || ""} placeholder="Dhaka, Bangladesh" className="h-12 rounded-xl border-zinc-200" />
            </div>
          </div>

          <Button disabled={loading} className="w-full md:w-auto px-12 bg-zinc-900 hover:bg-orange-600 text-white h-14 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg">
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Update Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}