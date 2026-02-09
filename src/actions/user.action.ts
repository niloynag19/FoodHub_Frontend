"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { User } from "@/types/user";
import { userService } from "@/services/user.service";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function updateProfileAction(payload: any) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${process.env.API_URL}/api/users/update-profile`, {
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


// export async function getAllUsersAction() {
//   const cookieStore = await cookies();

//   const token = cookieStore.get("better-auth.session_token")?.value; 

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
//     headers: {
//       "Authorization": `Bearer ${token}`,
//       "Cookie": `better-auth.session_token=${token}` 
//     },
//     cache: "no-store"
//   });
//   return await res.json();
// }

export async function getAllUsersAction() {
  const token = (await cookies()).get("better-auth.session_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 }
  });

  const result = await res.json();
  return result.data || []; 
}

export async function toggleUserStatusAction(
  userId: string,
  currentStatus: string,
) {
  try {
    // ১. পরবর্তী স্ট্যাটাস নির্ধারণ (আপনার এনাম অনুযায়ী)
    const nextStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

    const res = await userService.updateUserStatus(userId, nextStatus);

    if (res.success) {
      revalidatePath("/admin/users");
      revalidatePath("/admin-dashboard/all-users");
    }

    return {
      success: res.success,
      message: res.message || (res.success ? "Status updated successfully! ✨" : "Update failed"),
      data: res.data
    };
  } catch (error: any) {
    console.error("User Status Action Error:", error);
    return {
      success: false,
      message: "Server Action: Failed to connect to backend",
    };
  }
}