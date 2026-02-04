"use client";

import * as React from "react";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes, customerRoutes, Route, sellerRoutes } from "@/routes/routes";

const Roles = {
  admin: "ADMIN",
  provider: "PROVIDER",
  customer: "CUSTOMER",
};

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string; name?: string | null };
} & React.ComponentProps<typeof Sidebar>) {
  
 
  let routes: Route[] = [];
  switch (user.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.provider:
      routes = sellerRoutes; 
      break;
    case Roles.customer:
      routes = customerRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b h-16 flex items-center px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-orange-600 p-1.5 rounded-md">
            <UtensilsCrossed className="size-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">FoodHub</span>
            <span className="text-[10px] text-muted-foreground uppercase leading-none">
              {user.role} Dashboard
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="font-bold text-orange-600/80 uppercase text-[10px] tracking-widest">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="font-medium">
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}