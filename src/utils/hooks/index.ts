import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams as any);
    params.set(name, value);
    router.push(pathname + '?' + params.toString(), { scroll: false });
  };

  return [searchParams, setSearchParams] as const;
};
