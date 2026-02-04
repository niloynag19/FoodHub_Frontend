export const dynamic = "force-dynamic";

import { AppSidebar } from "@/components/dashboard/app-slider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  admin: React.ReactNode;
  provider: React.ReactNode;
  customer: React.ReactNode;
}

export default async function DashboardLayout({
  admin,
  provider,
  customer,
}: DashboardLayoutProps) {
  const { data } = await userService.getSession();
  const userInfo = data?.user;

  if (!userInfo) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-orange-600 transition-colors">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <BreadcrumbItem className="font-bold text-orange-600 uppercase tracking-tight">
                {userInfo.role} PANEL
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="p-6">
          <div className="mx-auto max-w-full">
            {userInfo.role === "ADMIN" && admin}
            {userInfo.role === "PROVIDER" && provider}
            {userInfo.role === "CUSTOMER" && customer}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}