import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.includes("undefined")) {
    console.error(
      `[MIDDLEWARE BLOCKED] Request contains "undefined" in pathname: ${pathname}`,
      "\nFull URL:",
      request.url,
      "\nHeaders:",
      Object.fromEntries(request.headers.entries())
    );

    const url = request.nextUrl.clone();
    url.pathname = "/ar/login";
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
