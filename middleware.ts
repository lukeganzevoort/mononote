import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import PocketBase from "pocketbase";

export async function middleware(request: NextRequest) {
  const pb = new PocketBase("http://127.0.0.1:8090"); // Replace with your PocketBase URL

  // Load the auth store from cookies
  pb.authStore.loadFromCookie(request.headers.get("cookie") || "");

  // Refresh auth store to ensure it's valid
  try {
    if (pb.authStore.isValid) {
      await pb.collection("users").authRefresh();
    }
  } catch (error) {
    pb.authStore.clear();
  }

  // Redirect unauthenticated users to the login page
  if (
    !pb.authStore.isValid &&
    request.nextUrl.pathname.startsWith("/protected")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*"], // Define protected routes
};
