"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllCategoriesAction(query?: { page?: number; limit?: number; searchTerm?: string }) {
  try {
    const queryParams = new URLSearchParams();
    if (query?.page) queryParams.append("page", query.page.toString());
    if (query?.limit) queryParams.append("limit", query.limit.toString());
    if (query?.searchTerm) queryParams.append("searchTerm", query.searchTerm);

    const queryString = queryParams.toString();
    const url = `${API_URL}/api/categories${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      next: { 
        tags: ["categories"] 
      }
    });
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function createCategoryAction(name: string) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookieStore.toString() },
      body: JSON.stringify({ name }),
    });
    const result = await res.json();
    if (result.success) revalidatePath("/admin-dashboard/categories");
    return result;
  } catch (error) {
    return { success: false, message: "Error creating category" };
  }
}

export async function updateCategoryAction(id: string, name: string) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/api/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Cookie: cookieStore.toString() },
      body: JSON.stringify({ name }),
    });
    const result = await res.json();
    if (result.success) revalidatePath("/admin-dashboard/categories");
    return result;
  } catch (error) {
    return { success: false, message: "Update failed" };
  }
}

export async function deleteCategoryAction(id: string) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers: { Cookie: cookieStore.toString() },
    });
    const result = await res.json();
    if (result.success) revalidatePath("/admin-dashboard/categories");
    return result;
  } catch (error) {
    return { success: false, message: "Delete failed" };
  }
}