import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

// 平台配置的接口, 临时转发
export async function GET(request: NextRequest) {
  redirect('/api/auth?' + request.nextUrl.searchParams.toString());
}
