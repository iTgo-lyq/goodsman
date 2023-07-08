import { Notification } from '@arco-design/web-react/client';
import { CODE_SUCCESS, CODE_UNAUTHORIZED } from '@/constants';
import { UnauthorizedNotificationContent } from '@/components/handless';
import { sleep } from '..';

export async function clientFetch<T = null>(url: string, init?: RequestInit | undefined) {
  if (!url) return;

  await sleep(3000);

  console.log(`[clientFetch] ${url}`);
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });

    if (response.status !== 200) {
      console.error('请求出错', response);
      Notification.error({
        closable: false,
        title: '请求出错!',
        content: `PATH: ${url} | STATUS: ${response.status}`,
      });
      return;
    }

    const body: ResponseBody<T> = await response.json();

    if (body.code === CODE_UNAUTHORIZED) {
      console.error('未授权!', response);
      Notification.error({
        closable: false,
        title: '未授权!',
        content: UnauthorizedNotificationContent(),
      });
      return;
    } else if (body.code !== CODE_SUCCESS) {
      console.error('服务错误!', response);
      Notification.error({
        closable: false,
        title: '服务错误!',
        content: `PATH: ${url} | CODE: ${body.code} | MSG: ${body.msg || body.message || '未知原因'}`,
      });
      return;
    }

    return body.data;
  } catch (error) {
    console.error('内部错误!', error);
    Notification.error({
      closable: false,
      title: '内部错误!',
      content: (error as Error).message,
    });
  }
}

export default clientFetch;
