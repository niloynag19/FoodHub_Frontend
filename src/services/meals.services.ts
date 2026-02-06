import { env } from "@/env";
import { Meal } from "@/types/types";

const API_URL = env.API_URL;

export interface MealFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: "price" | "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export const mealService = {
  getAllMeals: async (filters?: MealFilters) => {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.search) queryParams.append("search", filters.search);
      if (filters?.category) queryParams.append("category", filters.category);
      if (filters?.minPrice !== undefined)
        queryParams.append("minPrice", filters.minPrice.toString());
      if (filters?.maxPrice !== undefined)
        queryParams.append("maxPrice", filters.maxPrice.toString());
      if (filters?.page !== undefined)
        queryParams.append("page", filters.page.toString());
      if (filters?.limit !== undefined)
        queryParams.append("limit", filters.limit.toString());
      if (filters?.sortBy) queryParams.append("sortBy", filters.sortBy);
      if (filters?.sortOrder) queryParams.append("sortOrder", filters.sortOrder);

      const queryString = queryParams.toString();
      const url = queryString
        ? `${API_URL}/meals?${queryString}`
        : `${API_URL}/meals`;

      const res = await fetch(url, {
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch meals: ${res.statusText}`);
      }

      const apiResponse = await res.json();

      return {
        success: apiResponse.success,
        message: apiResponse.message || "Meals fetched successfully",
        data: apiResponse.data?.meals || apiResponse.data || [], // API structure অনুযায়ী
        total: apiResponse.data?.total || 0,
        pagination: apiResponse.data?.pagination || null,
        filters: apiResponse.data?.filters || null,
        error: null,
      };
    } catch (error: any) {

      return {
        success: false,
        message: error.message || "Failed to fetch meals",
        data: [],
        total: 0,
        pagination: null,
        filters: null,
        error: error.message || "Something went wrong",
      };
    }
  },
  
  getMealById: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/meals/${id}`, {
        next: { revalidate: 60 }, 
      });
      if (!res.ok) {
        throw new Error(`Meal not found (Status: ${res.status})`);
      }

      const apiResponse = await res.json();
      return {
        success: apiResponse.success,
        message: apiResponse.message || "Meal details fetched successfully",
        data: apiResponse.data || null,
        error: null,
      };
    } catch (error: any) {
     
      return {
        success: false,
        message: error.message || "Failed to fetch meal details",
        data: null,
        error: error.message || "Something went wrong",
      };
    }
  },
};