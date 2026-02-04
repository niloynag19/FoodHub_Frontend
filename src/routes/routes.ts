export interface Route {
  title: string;
  items: {
    title: string;
    url: string;
  }[];
}

// Admin Routes: ফুড হাবের সব নিয়ন্ত্রণ এখানে [cite: 2026-02-02]
export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      { title: "Overview", url: "/dashboard/admin" },
      { title: "User Management", url: "/dashboard/admin/all-users" }, // এখান থেকে Active/Suspend করবেন
      { title: "Provider Requests", url: "/dashboard/admin/provider-requests" },
      { title: "All Food Items", url: "/dashboard/admin/all-meals" },
      { title: "Global Orders", url: "/dashboard/admin/all-orders" },
      { title: "Food Categories", url: "/dashboard/admin/categories" },
    ],
  },
];

export const providerRoutes: Route[] = [
  {
    title: "Provider Dashboard",
    items: [
      { title: "My Kitchen", url: "/dashboard/provider/profile" },
      { title: "My Menu Items", url: "/dashboard/provider/my-meals" },
      { title: "Add New Meal", url: "/dashboard/provider/add-meal" },
      { title: "Incoming Orders", url: "/dashboard/provider/orders" },
      { title: "Earnings", url: "/dashboard/provider/earnings" },
    ],
  },
];

export const customerRoutes: Route[] = [
  {
    title: "My Account",
    items: [
      { title: "Profile", url: "/dashboard/customer/profile" },
      { title: "My Orders", url: "/dashboard/customer/orders" },
      { title: "My Cart", url: "/dashboard/customer/cart" },
      { title: "Favorites", url: "/dashboard/customer/favorites" },
    ],
  },
];