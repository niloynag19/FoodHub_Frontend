import { NextRequest, NextResponse } from "next/server";
import { userService } from "./src/services/user.service";
import { Roles } from "./src/constants/roles";

export async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const role = data.user.role;

  if(role===Roles.customer)
  {
    if(!pathname.startsWith("/dashboard"))
    {
      return NextResponse.redirect(new URL("/dashboard",request.url))
    }
  }

  if(role===Roles.provider)
  {
    if(!pathname.startsWith("/provider-dashboard"))
    {
      return NextResponse.redirect(new URL("/provider-dashboard",request.url))
    }
  }

  if(role===Roles.admin)
  {
    if(!pathname.startsWith("/admin-dashboard"))
    {
      return NextResponse.redirect(new URL("/admin-dashboard",request.url))
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/provider-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};