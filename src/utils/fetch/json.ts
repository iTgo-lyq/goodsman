import { DEFAULT_GET_REVALIDATE } from '@/constants';

export async function jsonFetch<T = null>(url: string) {
  console.log(`[jsonFetch] ${url}`);
  return await fetch(url, {
    next: {
      revalidate: DEFAULT_GET_REVALIDATE,
    },
  }).then<T>(it => it.json());
}

export default jsonFetch;
