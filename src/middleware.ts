import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET_STRING = process.env.JWT_SECRET || "pesantren-ppdb-secret-key-super-secure-change-in-production-2026";
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET_STRING);
const COOKIE_NAME = "pesantren_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(COOKIE_NAME)?.value;

  let isAuthenticated = false;
  if (sessionToken) {
    try {
      await jwtVerify(sessionToken, SECRET_KEY);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  // If user is accessing login page while already authenticated
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // If user is accessing any protected admin route
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
