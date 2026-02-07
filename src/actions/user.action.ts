"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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