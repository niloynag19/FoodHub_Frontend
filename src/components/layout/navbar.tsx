"use client";

import { Menu, UtensilsCrossed, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client"; 

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ModeToggle } from "./themeControl";
import LogoutButton from "./logoutButton";

export const Roles = {
  admin: "ADMIN",
  provider: "PROVIDER",
  customer: "CUSTOMER",
};

const Navbar = ({ className }: { className?: string }) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as any;
  const isAuthenticated = !!session;

  const getDashboardUrl = () => {
    if (user?.role === Roles.admin) return "/admin-dashboard";
    if (user?.role === Roles.provider) return "/provider-dashboard";
    return "/dashboard"; 
  };

  const menuItems = [
    { title: "Home", url: "/" },
    { title: "Meals", url: "/meals" },
    { title: "Categories", url: "/categories" },
    { title: "About", url: "/about" },
  ];

  return (
    <section className={cn("py-4 border-b w-full bg-background/95 backdrop-blur sticky top-0 z-50", className)}>
      <div className="w-full px-4 lg:px-6 mx-auto">
        <nav className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <UtensilsCrossed className="size-8 text-orange-600" />
              <span className="text-xl font-extrabold tracking-tighter italic">
                FOOD<span className="text-orange-600">HUB</span>
              </span>
            </Link>

            {/* Desktop Menu Links */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-2">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild className="px-4 py-2 text-sm font-semibold rounded-md hover:bg-muted transition-all">
                      <Link href={item.url}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            {/* Auth Logic: Profile Icon or Login Buttons */}
            {isPending ? (
              <div className="h-9 w-9 animate-pulse bg-muted rounded-full" />
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-orange-500/20 p-0 hover:bg-orange-50 transition-all">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.image || ""} alt={user?.name} />
                      <AvatarFallback className="bg-orange-600 text-white font-bold uppercase">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-60 mt-2 p-2 shadow-2xl border-orange-100" align="end">
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-bold text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      
                      <div className="inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-600 border border-orange-200">
                        {user?.role}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-orange-50" />
                  
                  <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-md focus:bg-orange-50">
                    <Link href={getDashboardUrl()} className="flex items-center w-full">
                      <LayoutDashboard className="mr-3 h-4 w-4 text-orange-600" />
                      <span className="font-bold">My Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="bg-orange-50" />
                  
                  <DropdownMenuItem className="p-0 focus:bg-red-50 rounded-md overflow-hidden">
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Button asChild variant="ghost" className="font-bold hover:text-orange-600">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 font-bold px-6 shadow-lg shadow-orange-100">
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile View Toggle */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="border-none shadow-none">
                    <Menu className="size-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle className="text-left flex items-center gap-2">
                      <UtensilsCrossed className="size-5 text-orange-600" />
                      <span className="text-orange-600 font-bold tracking-tight">FoodHub</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-4">
                    {menuItems.map((item) => (
                      <Link key={item.title} href={item.url} className="py-3 font-semibold border-b hover:text-orange-600 transition-colors">
                        {item.title}
                      </Link>
                    ))}
                    {!isAuthenticated && (
                      <div className="flex flex-col gap-3 mt-4">
                        <Button asChild variant="outline"><Link href="/login">Login</Link></Button>
                        <Button asChild className="bg-orange-600"><Link href="/register">Sign Up</Link></Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };