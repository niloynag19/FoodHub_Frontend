import { cookies } from "next/headers";

export const statsService = {
  getStats: async () => {
    const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    
    if (!API_URL) {
      console.error("API_URL is not defined in environment variables");
      return { success: false, message: "API_URL is missing" };
    }

    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/stats`, {
        headers: { 
          "Content-Type": "application/json",
          Cookie: cookieStore.toString() 
        },
        next: { revalidate: 60 }, // Cache for 1 minute
      });

      if (!res.ok) {
        return { success: false, message: `Failed to fetch stats: ${res.statusText}` };
      }

      return await res.json();
    } catch (error) {
      console.error("Error fetching stats:", error);
      return { success: false, message: "Error fetching statistics" };
    }
  },
};

