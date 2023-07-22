import qs from 'querystring';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_KEY_ACCESS_TOKEN } from '@/constants';
import { serverFetch } from '@/utils/fetch/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  const req = await serverFetch<string>('/auth?' + qs.stringify({ code: code }));

  if (req.data) cookies().set(COOKIE_KEY_ACCESS_TOKEN, req.data);

  redirect('/');
}
