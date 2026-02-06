import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      console.log(cookieStore.toString());

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: (await cookies()).toString(), 
          //cookieStore.toString(),
        },
        cache: "no-store"
      });

      const session = await res.json();
      if(session===null)
      {
        return {data:null,error:{message:"Session missing"}}
      }

      return{data:session,error:null}
    } catch (error) {
      console.log(error);
      return {data:null,error:{message:"Something went wrong"}}
    }
  }
}