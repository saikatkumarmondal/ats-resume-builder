import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const PROTECTED_ROUTE_PREFIXES = [
  "/dashboard",
  "/resumes",
  "/ai-assistant",
  "/settings",
  "/profile",
];

const GUEST_ONLY_ROUTES = ["/login", "/register"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some((prefix) =>
    nextUrl.pathname.startsWith(prefix)
  );
  const isGuestOnlyRoute = GUEST_ONLY_ROUTES.includes(nextUrl.pathname);

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isGuestOnlyRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};