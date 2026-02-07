"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(payload: {
  rating: number;
  comment: string;
  mealId: string;
  customerId: string;
}) {
  try {
    const response = await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      revalidatePath(`/meals/${payload.mealId}`);
      return { success: true, message: "Review added successfully! ⭐" };
    }
    return { success: false, message: result.message || "Failed to add review" };
  } catch (error) {
    return { success: false, message: "Network error occurred" };
  }
}

export async function getReviewsAction(mealId: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/reviews?mealId=${mealId}`, {
      cache: "no-store", 
    });
    const result = await res.json();
    return { success: true, data: result.data || [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}