import { cookies } from 'next/headers';
import { COOKIE_KEY_ACCESS_TOKEN, SERVER_BASE_URL } from '@/constants';
import { bffFetch } from './bff';

export async function serverFetch<T>(url: string, init?: RequestInit | undefined): Promise<ResponseBody<T>> {
  const cookieStore = cookies();

  console.log(
    `[serverFetch] ${SERVER_BASE_URL}${url.startsWith('/') ? url : '/' + url}`,
    cookieStore.get(COOKIE_KEY_ACCESS_TOKEN)?.value ?? '',
  );
  const response = await bffFetch(SERVER_BASE_URL + (url.startsWith('/') ? url : '/' + url), {
    ...init,
    headers: {
      ...init?.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: cookieStore.get(COOKIE_KEY_ACCESS_TOKEN)?.value ?? '',
    },
  });

  const responseBody = await response.json();

  console.log(`[serverFetch] ${SERVER_BASE_URL}${url.startsWith('/') ? url : '/' + url}`, responseBody);

  return responseBody;
}

export default serverFetch;
