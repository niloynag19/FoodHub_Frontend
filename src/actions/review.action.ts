"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
const API_URL=process.env.NEXT_PUBLIC_API_URL;

export async function createReviewAction(
  payload: { rating: number; comment: string; mealId: string },
  user: any 
) {
  try {
    const cookieStore = await cookies();
    if (!user || user.role !== "CUSTOMER") {
      return { success: false, message: "Only customers can review!" };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString(), 
      },
      body: JSON.stringify({
        ...payload,
        customerId: user.id
      }),
    });

    const result = await response.json();

    if (response.ok) {
      revalidatePath(`/meals/${payload.mealId}`);
      return { success: true, message: "Review posted! ⭐" };
    }
    
    return { success: false, message: result.message || "Failed to post" };
  } catch (error) {
    return { success: false, message: "Server error occurred" };
  }
}

export async function getReviewsAction(mealId: string) {
  try {
    const res = await fetch(`${API_URL}/api/reviews?mealId=${mealId}`, {
      cache: "no-store", 
    });
    const result = await res.json();
    return { success: true, data: result.data || [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function getAllReviewsAction() {
  try {
    const res = await fetch(`${API_URL}/api/reviews`, {
      next: { revalidate: 3600 }, // Cache for 1 hour to improve homepage performance
    });
    const result = await res.json();
    return { success: true, data: result.data || [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}