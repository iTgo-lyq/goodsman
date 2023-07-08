import _useSWR from 'swr';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import clientFetch from '@/utils/fetch/client';
import jsonFetch from '@/utils/fetch/json';

interface SetSearchParams {
  (map: Record<string, string | string[] | number | number[] | boolean | boolean[]>): void;
  (name: string, value: string | string[] | number | number[] | boolean | boolean[]): void;
}

export const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParams: SetSearchParams = useCallback(
    (
      name: string | Record<string, string | string[] | number | number[] | boolean | boolean[]>,
      value?: string | string[] | number | number[] | boolean | boolean[],
    ) => {
      const mapV = typeof name !== 'object' ? { [name]: value } : name;
      const params = new URLSearchParams(searchParams as any);

      Object.entries(mapV)
        .map(([k, v]) => [k, v instanceof Array ? v : [v]] as const)
        .forEach(
          ([k, v]) => (
            params.delete(k), v.filter(it => it !== '' && it !== undefined).forEach(vv => params.append(k, String(vv)))
          ),
        );

      params.sort();

      router.push(pathname + '?' + params.toString(), { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return [searchParams, setSearchParams] as const;
};

export const useClientFetch = <T>(url: string) => _useSWR<T | undefined>(url, clientFetch);

export const useJsonFetch = <T>(url: string) => _useSWR<T | undefined>(url, jsonFetch);
