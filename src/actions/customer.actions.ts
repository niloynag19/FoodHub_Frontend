"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { env } from "@/env";

export async function addToCartAction(payload: {
  mealId: string;
  quantity: number;
  price: number;
}) {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(), 
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidatePath("/cart"); 
  }

  return result;
}

export async function getCartAction() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/my-cart`, { 
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });
  return await res.json();
}

export async function removeFromCartAction(itemId: string) {
  try {
    const cookieStore = await cookies();
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${itemId}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const result = await res.json();
    
    if (result.success) {
    
      revalidatePath("/dashboard/cart"); 
    }
    
    return result;
  } catch (error) {
    return { success: false, message: "Server connection failed" };
  }
}

