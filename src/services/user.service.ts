import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      console.log(cookieStore.toString());

      const res = await fetch(`${AUTH_URL}/api/auth/get-session`, {
        headers: {
          Cookie: (await cookies()).toString(),
          //cookieStore.toString(),
        },
        cache: "no-store"
      });

      const session = await res.json();
      if (session === null) {
        return { data: null, error: { message: "Session missing" } }
      }

      return { data: session, error: null }
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } }
    }
  },

  getAllUsers: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      headers: { Cookie: cookieStore.toString() },
      next: { revalidate: 0 },
    });
    return res.json();
  },

  // services/user.service.ts
updateUserStatus: async (userId: string, status: string) => {
  const cookieStore = await cookies();
  const res = await fetch(`${AUTH_URL}/api/users/admin/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookieStore.toString(), 
    },
    body: JSON.stringify({ status }), 
  });
  return res.json();
}

}

