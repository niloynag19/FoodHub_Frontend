"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function updateProfileAction(payload: any) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update-profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (result.success) revalidatePath("/dashboard/profile");
    return result;
  } catch (error) {
    return { success: false, message: "Failed to update profile" };
  }
}


export async function getAllUsersAction() {
  const cookieStore = await cookies();
  
  // আপনার লগ অনুযায়ী কুকির সঠিক নাম এটি
  const token = cookieStore.get("better-auth.session_token")?.value; 

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    headers: {
      "Authorization": `Bearer ${token}`, // অথবা আপনার ব্যাকেন্ড যেভাবে টোকেন নেয়
      "Cookie": `better-auth.session_token=${token}` // অনেক সময় বেটার-অথ কুকি হিসেবেই ডাটা চায়
    },
    cache: "no-store"
  });
  return await res.json();
}

export async function toggleUserStatusAction(userId: string, currentStatus: string) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  // আপনার Enum অনুযায়ী: ACTIVE হলে SUSPENDED হবে, না হলে ACTIVE হবে
  const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
  const url = `http://localhost:5000/api/users/admin/users/${userId}`;

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `better-auth.session_token=${sessionToken}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/admin-dashboard/all-users");
    }
    return result;
  } catch (error) {
    return { success: false, message: "Network Error" };
  }
}