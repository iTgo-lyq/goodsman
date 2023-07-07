import path from 'path';
import { cookies } from 'next/headers';
import { SERVER_BASE_URL } from '@/constants';
import { bffFetch } from './bff';

export async function serverFetch(url: string, init?: RequestInit | undefined) {
  const cookieStore = cookies();

  console.log(`[serverFetch] ${path.join(SERVER_BASE_URL, url)}`);
  const response = await bffFetch(path.join(SERVER_BASE_URL, url), {
    ...init,
    headers: {
      ...init?.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: cookieStore.get('accessToken')?.value ?? '',
    },
  });

  return await response.json();
}

export default serverFetch;
