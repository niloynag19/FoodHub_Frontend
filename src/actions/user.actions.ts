"use server";

import { cookies } from "next/headers";

export async function getCurrentUserAction() {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, { // আপনার ব্যাকেন্ডের প্রোফাইল বা /me রাউট
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return await res.json();
  } catch (error) {
    return { success: false, data: null };
  }
}