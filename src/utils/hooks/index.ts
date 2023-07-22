import _useSWR from 'swr';
import { useCallback, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CODE_SUCCESS, CODE_UNAUTHORIZED } from '@/constants';
import { Notification } from '@arco-design/web-react/client';
import { UnauthorizedNotificationContent } from '@/components/handless';
import clientFetch from '@/utils/fetch/client';
import { ServerAction } from '@/server/declare';

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

/**
 * 适用于服务端操作
 */
export function useAction<T, F extends (...args: any) => Promise<ActionResult<T> & { title?: string }>>(
  action: F,
  onSuccess?: (data?: T) => void,
  deps: any[] = [],
) {
  const [isPending, startTransition] = useTransition();

  const startAction = useCallback(
    (...args: Parameters<F>) =>
      startTransition(async () => {
        console.log('[useAction] start', args);

        const res = await action.apply(null, args);

        if (res.code === CODE_UNAUTHORIZED) {
          console.error('未授权!', res);
          Notification.error({
            duration: 6000,
            title: '未授权!',
            content: UnauthorizedNotificationContent(),
          });
        } else if (res.code !== CODE_SUCCESS) {
          console.error('服务错误!', res);
          Notification.error({
            title: res.title || '服务错误!',
            content: `${res.msg || '未知原因'}`,
          });
        }

        if (res.code === CODE_SUCCESS) onSuccess?.(res.data);

        console.log(`[useAction] end`, res);
      }),
    [action, startTransition, ...deps],
  );

  return [isPending, startAction] as const;
}

/**
 * 适用于从服务端拉取数据, 并缓存, 不可缓存建议直接服务端渲染
 */
export const useSwrAction = <F extends keyof ServerAction>(action: F, params?: Parameters<ServerAction[F]>[0]) =>
  _useSWR<UnwrapActionResult<UnwrapPromise<ReturnType<ServerAction[F]>>> | undefined>(
    [action, params],
    async ([action, params]: any) => {
      const response = await clientFetch<ActionResult<any>>(
        '/api/action?' + new URLSearchParams({ method: action, params: JSON.stringify([params]) }).toString(),
      );

      if (!response) {
        console.error('服务错误!');
        Notification.error({
          duration: 6000,
          content: '服务错误!',
        });
      } else if (response.code === CODE_UNAUTHORIZED) {
        console.error('未授权!', response);
        Notification.error({
          duration: 6000,
          title: '未授权!',
          content: UnauthorizedNotificationContent(),
        });
      } else if (!response || response.code !== CODE_SUCCESS) {
        console.error('服务错误!', response);
        Notification.error({
          title: response.title || '服务错误!',
          content: `ACTION MSG: ${response.msg || '未知原因'}`,
        });
      }

      return response?.data as any;
    },
  );
