"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // এখানে আপনার ব্যাকএন্ডের লগআউট লজিক বা কুকি ক্লিয়ার করার কোড হবে
    console.log("Logging out...");
    
    // আপাতত আমরা জাস্ট লগইন পেজে রিডাইরেক্ট করে দিচ্ছি
    // পরে এখানে আপনার Auth Store (Zustand) ক্লিয়ার করার লজিক বসাবো [cite: 2026-02-01]
    router.push("/login");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
      onClick={handleLogout}
    >
      <LogOut className="size-4" />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;