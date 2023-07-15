import _useSWR from 'swr';
import { useCallback, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CODE_SUCCESS, CODE_UNAUTHORIZED } from '@/constants';
import { Notification } from '@arco-design/web-react/client';
import { UnauthorizedNotificationContent } from '@/components/handless';

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

function onResult(res: ActionResult<any>) {
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
      content: `ACTION MSG: ${res.msg || '未知原因'}`,
    });
  }
}

const actionKeyMap = new WeakMap();
function genSwrActionKey(action: any) {
  if (actionKeyMap.has(action)) {
    return actionKeyMap.get(action);
  } else {
    const key = Date.now() + '' + Math.floor(Math.random() * 1000);
    actionKeyMap.set(action, key);
    return key;
  }
}

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

        onResult(res);

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
export const useSwrAction = <F extends (...args: any) => Promise<ActionResult<any>>>(
  action: F,
  params?: Parameters<F>[0],
) =>
  _useSWR<UnwrapActionResult<UnwrapPromise<ReturnType<F>>> | undefined>(
    [params, genSwrActionKey(action)],
    async ([params]: [Parameters<F>[0]]) => {
      const res = await action(params);

      onResult(res);

      return res.data;
    },
  );
