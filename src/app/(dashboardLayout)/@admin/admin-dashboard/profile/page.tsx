"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { User, Mail, ShieldCheck, MapPin, Phone, Camera } from "lucide-react";

// এই ডাটাগুলো আপনি আপনার Auth Context বা সার্ভার কম্পোনেন্ট থেকে প্রপস হিসেবে পাঠাতে পারেন
export default function ProfilePage({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-zinc-900 italic">My Profile</h1>
        <p className="text-zinc-500">Manage your personal information and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Avatar Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 text-center shadow-sm">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-orange-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                {user?.image ? (
                  <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={60} className="text-orange-600" />
                )}
              </div>
              <Button className="absolute bottom-1 right-1 bg-zinc-900 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
                <Camera size={16} />
              </Button>
            </div>
            <h2 className="text-xl font-black text-zinc-900">{user?.name || "User Name"}</h2>
            <p className="text-zinc-400 text-sm mb-4">{user?.email}</p>
            <span className="bg-zinc-100 text-zinc-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Right Side: Edit Form */}
        <div className="lg:col-span-2">
          <form className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-600 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-zinc-400" size={18} />
                  <Input defaultValue={user?.name} className="pl-12 h-12 rounded-xl border-zinc-200" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-600 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-zinc-400" size={18} />
                  <Input value={user?.email} disabled className="pl-12 h-12 rounded-xl bg-zinc-50 border-zinc-200" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-600 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-zinc-400" size={18} />
                  <Input placeholder="+880 1XXX XXXXXX" className="pl-12 h-12 rounded-xl border-zinc-200" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-600 ml-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-zinc-400" size={18} />
                  <Input placeholder="Dhaka, Bangladesh" className="pl-12 h-12 rounded-xl border-zinc-200" />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button disabled={loading} className="w-full md:w-auto px-10 bg-zinc-900 hover:bg-orange-600 text-white h-12 rounded-xl font-bold transition-all">
                {loading ? "Saving Changes..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}