import NextAuth from "next-auth";
import { authConfig } from "@/@core/infra/auth";

const { auth } = NextAuth(authConfig);

export const ROOT = "/";
export const PUBLIC_ROUTES = ["/", "/login", "/images/*"];
export const DEFAULT_REDIRECT = "/dashboard";

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isPublicRoute && isAuthenticated)
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(ROOT, nextUrl));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// import NextAuth from "next-auth";
// import { NextResponse } from "next/server";
// import { authConfig } from "@/@core/infra/auth";

// const { auth } = NextAuth(authConfig);

// export const ROOT = "/";
// export const DASHBOARD_ROUTES = "/dashboard";
// export const DEFAULT_REDIRECT = "/dashboard";

// export default auth((req) => {
//   const { nextUrl } = req;

//   const { pathname } = req.nextUrl;
//   const isAuthenticated = !!req.auth;

//   // Si el usuario intenta acceder a /dashboard/* y no está autenticado, redirigir a la raíz
//   if (pathname.startsWith(DASHBOARD_ROUTES) && !isAuthenticated) {
//     return NextResponse.redirect(new URL(ROOT, req.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
