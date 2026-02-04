"use client";

import { Menu, UtensilsCrossed, LayoutDashboard, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
  isAuthenticated?: boolean;
  user?: { name: string; email?: string; image?: string; role: string }; // ইউজার ডেটা যোগ করা হয়েছে
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
  noAuth?: {
    dashboard: { title: string; url: string };
    logout: { title: string; url: string };
  };
}

const Navbar = ({
  className,
  isAuthenticated = false,
  user, // ইউজার অবজেক্ট
  logo = {
    url: "/",
    src: "/logo.jpg",
    alt: "FoodHub Logo",
    title: "FoodHub",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Meals", url: "/meals" },
    { title: "Categories", url: "/categories" },
    { title: "Shop", url: "/shop" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  noAuth = {
    dashboard: { title: "Dashboard", url: "/dashboard" },
    logout: { title: "Logout", url: "/logout" },
  },
}: NavbarProps) => {
  return (
    <section className={cn("py-4 border-b w-full bg-background/95 backdrop-blur sticky top-0 z-50", className)}>
      <div className="w-full px-4 lg:px-6 mx-auto">
        <nav className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href={logo.url} className="flex items-center gap-2 shrink-0">
              <UtensilsCrossed className="size-8 text-orange-600" />
              <span className="text-xl font-extrabold tracking-tighter">{logo.title}</span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      asChild
                      className="px-4 py-2 text-sm font-semibold rounded-md hover:bg-muted transition-all"
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-orange-100 p-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                      <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      <p className="text-[10px] font-bold text-orange-600 uppercase mt-1">{user?.role} ACCOUNT</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={noAuth.dashboard.url} className="cursor-pointer w-full flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>{noAuth.dashboard.title}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0">
                     <LogoutButton className="w-full justify-start px-2 py-1.5 h-auto font-normal text-red-600 hover:text-red-600" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" size="sm" className="font-bold hover:text-orange-600">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700 font-bold px-6 shadow-md shadow-orange-200 dark:shadow-none">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile View - আগের মতোই থাকবে, শুধু ইউজার থাকলে তার প্রোফাইল লিংকের ব্যবস্থা থাকবে */}
        <div className="lg:hidden flex items-center justify-between">
          <Link href={logo.url} className="flex items-center gap-2">
            <UtensilsCrossed className="size-6 text-orange-600" />
            <span className="font-bold text-lg">{logo.title}</span>
          </Link>

          <div className="flex items-center gap-2">
            <ModeToggle />
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
                    <span className="text-orange-600 font-bold">{logo.title}</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {isAuthenticated && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg mb-4">
                      <Avatar>
                        <AvatarFallback className="bg-orange-600 text-white">{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{user?.name}</span>
                        <span className="text-xs text-muted-foreground uppercase">{user?.role}</span>
                      </div>
                    </div>
                  )}
                  {menu.map((item) => (
                    <Link key={item.title} href={item.url} className="flex py-3 font-semibold border-b">
                      {item.title}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-3 mt-6">
                    {isAuthenticated ? (
                      <>
                        <Button asChild variant="outline"><Link href={noAuth.dashboard.url}>Dashboard</Link></Button>
                        <LogoutButton />
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline"><Link href={auth.login.url}>Login</Link></Button>
                        <Button asChild className="bg-orange-600"><Link href={auth.signup.url}>Sign Up</Link></Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };