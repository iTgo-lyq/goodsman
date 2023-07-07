import qs from 'querystring';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import fetch$ from '@/utils/fetch/server';
import { COOKIE_KEY_ACCESS_TOKEN } from '@/constants';

export async function GET(request: NextRequest) {
  return await Mock(request);

  const url = request.nextUrl.clone();
  const code = url.searchParams.get('code');

  const req = await fetch$('/auth?' + qs.stringify({ code: code })).then(it => it.json());

  cookies().set(COOKIE_KEY_ACCESS_TOKEN, req.data?.token ?? '');

  url.pathname = '/';

  return NextResponse.redirect(url.toString());
}

async function Mock(request: NextRequest) {
  const url = request.nextUrl.clone();
  const req: ResponseBody<{ token: string }> = {
    code: 0,
    data: {
      token: 'test_token',
    },
    msg: 'success',
  };

  cookies().set(COOKIE_KEY_ACCESS_TOKEN, req.data?.token ?? '');

  url.pathname = '/';

  return NextResponse.redirect(url.toString());
}
