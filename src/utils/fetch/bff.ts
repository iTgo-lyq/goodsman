import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies, headers } from 'next/headers';
import { SERVER_DEFAULT_HOST } from '@/constants';

/**
 * 封装 cookie 在 bff 层的请求链路上传递
 */
export async function bffFetch(url: string, init?: RequestInit | undefined) {
  console.log(`[bffFetch] start ${init?.method ?? 'GET'} ${url} ${init?.body ?? ''}`);
  const currentCookies = cookies();

  const response = await fetch(url, {
    ...init,
    headers: {
      Cookie: currentCookies.toString(),
      Host: headers().get('host') ?? SERVER_DEFAULT_HOST,
      ...init?.headers,
    },
  });

  const resCookies = new ResponseCookies(response.headers);
  resCookies.getAll().forEach(it => currentCookies.set(it.name, it.value, it));

  console.log(`[bffFetch] end ${url} ${response.status}`);
  return response;
}
