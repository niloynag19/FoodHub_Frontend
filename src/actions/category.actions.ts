"use server";

export async function getAllCategoriesAction() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      method: "GET",
      next: { revalidate: 3600 } // ১ ঘণ্টা পর পর ডাটা আপডেট হবে
    });
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}