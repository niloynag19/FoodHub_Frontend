import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // Use the full URL for Server Components, and relative for the Browser
    baseURL: typeof window === "undefined" ?
        "https://foodhub-server-chi.vercel.app" : window.location.origin,
    
    fetchOptions: {
        credentials: "include",
    },
});