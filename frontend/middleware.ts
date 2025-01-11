import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT");
  return response;
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/manifest.json", "/app-icons/:path*"],
};
