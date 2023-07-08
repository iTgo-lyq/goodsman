import path from 'path';
import { headers } from 'next/headers';
import { SERVER_DEFAULT_HOST } from '@/constants';
import { bffFetch } from './bff';

export function prefixHost(url: string) {
  if (url.startsWith('http')) return url;

  const host = headers().get('host') || SERVER_DEFAULT_HOST;
  const schema =
    (headers().get('X-Forwarded-Proto') || headers().get('X-Forwarded-Scheme')) === 'http' ? 'http' : 'https';

  return schema + '://' + path.join(host, url);
}

export async function sameOriginFetch(url: string, init?: RequestInit | undefined) {
  console.log(`[sameOriginFetch] ${prefixHost(url)}`);
  const response = await bffFetch(prefixHost(url), {
    ...init,
    headers: {
      ...init?.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return response;
}

export default sameOriginFetch;
