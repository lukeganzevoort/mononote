import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import PocketBase from "pocketbase";

export async function middleware(request: NextRequest) {
  const pb = new PocketBase("http://127.0.0.1:8090"); // Replace with your PocketBase URL

  // Load the auth store from cookies
  pb.authStore.loadFromCookie(request.headers.get("cookie") || "");

  console.log("pb.authStore.isValid", pb.authStore.isValid);

  // Refresh auth store to ensure it's valid
  try {
    if (pb.authStore.isValid) {
      await pb.collection("users").authRefresh();
    }
  } catch (error) {
    pb.authStore.clear();
  }

  // Redirect unauthenticated users to the login page
  if (!pb.authStore.isValid && request.nextUrl.pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    pb.authStore.isValid &&
    request.nextUrl.pathname.startsWith("/auth/login")
  ) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  // Proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/auth/login"], // Define protected routes
};
