import { Notification } from '@arco-design/web-react/client';
import { CODE_SUCCESS, CODE_UNAUTHORIZED } from '@/constants';
import { UnauthorizedNotification } from '@/components';

export async function clientFetch<T = null>(url: string, init?: RequestInit | undefined) {
  console.log(`[clientFetch] ${url}`);
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        ...init?.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      Notification.error({
        closable: false,
        title: '请求出错!',
        content: `PATH: ${url} | STATUS: ${response.status}`,
      });
      return;
    }

    const body: ResponseBody<T> = await response.json();

    if (body.code === CODE_UNAUTHORIZED) {
      Notification.error({
        closable: false,
        title: '未授权!',
        content: UnauthorizedNotification(),
      });
      return;
    } else if (body.code === CODE_SUCCESS) {
      Notification.error({
        closable: false,
        title: '服务错误!',
        content: `PATH: ${url} | MSG: ${body.msg || body.message || '未知原因'}`,
      });
      return;
    }

    return body.data;
  } catch (error) {
    Notification.error({
      closable: false,
      title: '内部错误!',
      content: (error as Error).message,
    });
  }
}

export default clientFetch;
