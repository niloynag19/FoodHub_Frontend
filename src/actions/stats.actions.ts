import { cookies } from "next/headers";

export async function getProviderStatsAction() {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`, { 
      method: "GET",
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    return { success: false, data: null };
  }
}