"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createOrderAction(payload: any) {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (result.success) {
            revalidatePath("/dashboard/orders"); 
            revalidatePath("/dashboard/cart");
        }

        return result;
    } catch (error) {
        return { success: false, message: "Internal Server Error. Please try again." };
    }
}

export async function getMyOrdersAction() {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/my-orders`, {
            method: "GET",
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        return { success: false, message: "Failed to fetch orders." };
    }
}


export async function getAllOrdersAction() {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: "GET",
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Failed to fetch all orders." };
  }
}

export async function updateOrderStatusAction(orderId: string, status: string) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
    });
    const result = await res.json();
    if (result.success) revalidatePath("/dashboard/manage-orders");
    return result;
  } catch (error) {
    return { success: false, message: "Failed to update status." };
  }
}