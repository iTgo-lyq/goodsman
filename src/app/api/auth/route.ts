import qs from 'querystring';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import fetch$ from '@/utils/fetch/server';
import { COOKIE_KEY_ACCESS_TOKEN } from '@/constants';

export async function GET(request: NextRequest) {
  // return await Mock(request);
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
        'eyJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJmMTgxOTVhZmJmMDVjYzZjMTRiZjU3MjQwYTkxYzA1ZiIsImV4cCI6MTY4OTQxODM0NywiaWF0IjoxNjg4ODEzNTQ3fQ.Cb9_IoNItdRq7kDsilQQiyp0nQ12iA_oymohPI4eyeQ',
    },
    msg: 'success',
  };

  cookies().set(COOKIE_KEY_ACCESS_TOKEN, req.data?.token ?? '');

  redirect('/');
}
