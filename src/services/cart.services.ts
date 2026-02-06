import { env } from "@/env";
import { cookies } from "next/headers";

export const CartServices = {
  getUserCart: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { tags: ["cart"] }, 
    });
    return res.json();
  },
};