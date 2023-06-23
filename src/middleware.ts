import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("[onRequest]", new Date().toLocaleString(), request.url);
  const response = NextResponse.next();
  console.log("[onResponse]", response.status);
  return response;
}
