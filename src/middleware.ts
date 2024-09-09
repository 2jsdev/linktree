import NextAuth from "next-auth";
import { authConfig } from "@/@core/infra/auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export const ROOT = "/";
export const DEFAULT_REDIRECT = "/dashboard";
export const LOGIN_ROUTE = "/login";

// Regular expression for dynamic routes like /username
const PUBLIC_DYNAMIC_ROUTE_REGEX = /^\/[a-zA-Z0-9_-]+$/;

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;

  // Determine if this is the `/dashboard` route (private)
  const isDashboardRoute = nextUrl.pathname === DEFAULT_REDIRECT;

  // Determine if this is the login route
  const isLoginRoute = nextUrl.pathname === LOGIN_ROUTE;

  // Determine if it is a public dynamic route (like /username)
  const isPublicDynamicRoute = PUBLIC_DYNAMIC_ROUTE_REGEX.test(
    nextUrl.pathname
  );

  // If the user is authenticated and is trying to access /login, redirect to /dashboard
  if (isAuthenticated && isLoginRoute) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl)); // Redirigir al dashboard
  }

  // If the user is authenticated and is trying to access /dashboard, allow access
  if (isAuthenticated && isDashboardRoute) {
    return NextResponse.next(); // Allow access to the dashboard
  }

  // If the user is authenticated and is not on a private route (/dashboard), allow access
  if (isAuthenticated && !isDashboardRoute && !isLoginRoute) {
    return NextResponse.next(); // Allow access to all public routes, including dynamic ones
  }

  // If the user is not authenticated and is trying to access a private route (/dashboard), redirect to the root (login)
  if (!isAuthenticated && isDashboardRoute) {
    return Response.redirect(new URL(ROOT, nextUrl)); // Redirect to login or root
  }

  // If the user is not authenticated and is trying to access a public or dynamic route, allow access
  return NextResponse.next(); // Allow access to public or dynamic routes
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
