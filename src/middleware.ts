import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// TODO 定时刷新类目列表

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  return response;
}
