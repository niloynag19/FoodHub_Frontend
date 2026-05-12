import {createEnv} from "@t3-oss/env-nextjs";
import * as z from "zod"

export const env=createEnv({
    server:{
        BACKEND_URL: z.string().optional(),
        FRONTEND_URL: z.string().optional(),
        API_URL: z.string().optional(),
        AUTH_URL: z.string().optional(),
    },
    client:{

    },
    runtimeEnv:{
        BACKEND_URL: process.env.BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        API_URL: process.env.API_URL,
        AUTH_URL: process.env.AUTH_URL,
    }
})