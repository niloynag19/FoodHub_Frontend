
import { Navbar } from "@/components/layout/navbar";
import React from "react"
const CommonLayout = async ({children}:{children:React.ReactNode})=>{
    return(
        <div>
            <Navbar/>
            {children}
        </div>
    )
}

export default CommonLayout;