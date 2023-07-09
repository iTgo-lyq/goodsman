import qs from 'querystring';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import fetch$ from '@/utils/fetch/server';
import { COOKIE_KEY_ACCESS_TOKEN } from '@/constants';

export async function GET(request: NextRequest) {
  return await Mock();
  const url = request.nextUrl.clone();
  const code = url.searchParams.get('code');

  const req = await fetch$<string>('/auth?' + qs.stringify({ code: code }));

  cookies().set(COOKIE_KEY_ACCESS_TOKEN, req.data ?? '');

  redirect('/');
}

async function Mock() {
  const req: ResponseBody<{ token: string }> = {
    code: 0,
    data: {
      token:
        'eyJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJmMTgxOTVhZmJmMDVjYzZjMTRiZjU3MjQ5ZTY1NTk0YSIsImV4cCI6MTY4OTQyMjUxNSwiaWF0IjoxNjg4ODE3NzE1fQ.84v-8YJwdBaABWFbhwbYBEwPaXoOMCIAsrw3LsiXCOE',
    },
    msg: 'success',
  };

  cookies().set(COOKIE_KEY_ACCESS_TOKEN, req.data?.token ?? '');

  redirect('/');
}
