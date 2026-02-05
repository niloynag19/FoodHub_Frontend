export interface Route {
  title: string;
  items: {
    title: string;
    url: string;
  }[];
}

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      { title: "Profile", url: "/admin-dashboard/profile" }, 
      { title: "All Users", url: "/admin-dashboard/all-users" },
      { title: "All Food Items", url: "/admin-dashboard/all-meals" },
      { title: "Global Orders", url: "/admin-dashboard/all-orders" },
      { title: "Food Categories", url: "/admin-dashboard/categories" },
    ],
  },
];

export const providerRoutes: Route[] = [
  {
    title: "Provider Dashboard",
    items: [
      { title: "Profile", url: "/provider-dashboard/profile" },
      { title: "My Menu Items", url: "/provider-dashboard/my-meals" },
      { title: "Add New Meal", url: "/provider-dashboard/add-meal" },
      { title: "Incoming Orders", url: "/provider-dashboard/orders" },
    ],
  },
];

export const customerRoutes: Route[] = [
  {
    title: "My Account",
    items: [
      { title: "Profile", url: "/dashboard/profile" },
      { title: "My Orders", url: "/dashboard/orders" },
      { title: "My Cart", url: "/dashboard/cart" },
      { title: "Favorites", url: "/dashboard/favorites" },
    ],
  },
];