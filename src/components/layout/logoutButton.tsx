"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {

    console.log("Logging out...");
    

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