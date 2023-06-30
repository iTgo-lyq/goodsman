import { NextRequest, NextResponse } from "next/server";

// 临时转发
export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/api/auth";

  return NextResponse.redirect(url.toString());
}
