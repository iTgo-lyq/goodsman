import qs from 'querystring';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_KEY_ACCESS_TOKEN } from '@/constants';
import { serverFetch } from '@/utils/fetch/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  const req = await serverFetch<string>('/auth?' + qs.stringify({ code: code }));

  cookies().set(
    COOKIE_KEY_ACCESS_TOKEN,
    req.data ??
      'eyJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJmMTgxOTVhZmJmMDVjYzZjMTRiZjU3MjQ5ZTY1NTk0YSIsImV4cCI6MTY5MDExNjM0MCwiaWF0IjoxNjg5NTExNTQwfQ.QwqY2D1aLjvHr9KH56R8M3hopVzB8VUOJxnGrUwMtsE',
  );

  redirect('/');
}
