"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createMealAction(payload: any) {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals/add-meal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    
    if (result.success) {
      revalidatePath("/provider-dashboard/my-meals");
      revalidatePath("/provider-dashboard/add-meal");
      revalidatePath("/"); 
    }
    return result;
  } catch (error) {
    return { success: false, message: "Internal Server Error" };
  }

  
}


// actions/meal.actions.ts এ এটি যোগ করুন

export async function getAllMealsAction() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals`, {
      method: "GET",
      cache: "no-store", // যাতে সব সময় ফ্রেশ ডাটা আসে
    });
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}


export async function deleteMealAction(mealId: string) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals/${mealId}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    const result = await res.json();
    if (result.success) revalidatePath("/provider-dashboard/my-meals");
    return result;
  } catch (error) {
    return { success: false, message: "Delete failed" };
  }
}

// actions/meal.actions.ts

export async function updateMealAction(mealId: string, payload: any) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals/${mealId}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (result.success) {
      revalidatePath("/provider-dashboard/my-meals");
    }
    return result;
  } catch (error) {
    return { success: false, message: "Update failed" };
  }
}