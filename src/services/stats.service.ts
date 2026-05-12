import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const statsService = {
  getStats: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/stats`, {
      headers: { Cookie: cookieStore.toString() },
      next: { revalidate: 0 },
    });
    return res.json();
  },
};
