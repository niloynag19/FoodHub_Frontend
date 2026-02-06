
// import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import React from "react"
const CommonLayout = async ({children}:{children:React.ReactNode})=>{
    
    return(
        <div>
            <Navbar/>
            {children}
            {/* <Footer/> */}
        </div>
    )
}

export default CommonLayout;