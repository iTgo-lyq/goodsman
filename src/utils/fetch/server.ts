import { cookies } from 'next/headers';
import { COOKIE_KEY_ACCESS_TOKEN, SERVER_BASE_URL } from '@/constants';
import { bffFetch } from './bff';

export async function serverFetch<T>(url: string, init?: RequestInit | undefined): Promise<ActionResult<T>> {
  const cookieStore = cookies();

  console.log(`[serverFetch] ${url} token ${cookieStore.get(COOKIE_KEY_ACCESS_TOKEN)?.value}`);
  const response = await bffFetch(SERVER_BASE_URL + (url.startsWith('/') ? url : '/' + url), {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: cookieStore.get(COOKIE_KEY_ACCESS_TOKEN)?.value ?? '',
      ...init?.headers,
    },
  });

  try {
    const responseBody = await response.json();
    console.log(`[serverFetch] end ${url}`, responseBody);

    return {
      code: responseBody.code,
      data: responseBody.data,
      msg: responseBody.message,
    };
  } catch (error) {
    console.log(`[serverFetch] error ${url}`, response, response.statusText, error);
    return {
      code: 20001,
      title: url,
      msg: `服务请求错误 STATUS ${response.status} | ERROR ${error}`,
    };
  }
}

export default serverFetch;
