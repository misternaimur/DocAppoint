/** @format */

import { NextResponse } from "next/server";

export async function proxy(request) {
  const sessionResponse = await fetch(
    new URL("/api/auth/get-session", request.url),
    {
      headers: request.headers,
    },
  );

  if (!sessionResponse.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const session = await sessionResponse.json();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/doctor/:path*", "/book/:path*"],
};
