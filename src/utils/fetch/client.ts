import { Notification } from '@arco-design/web-react/client';
import { CODE_SUCCESS, CODE_UNAUTHORIZED } from '@/constants';
import { UnauthorizedNotificationContent } from '@/components/handless';

export async function clientFetch<T = null>(url: string, init?: RequestInit | undefined) {
  if (!url) return;

  console.log(`[clientFetch] ${url} start`);
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
        title: '请求出错!',
        content: `PATH: ${url} | STATUS: ${response.status}`,
      });
      return;
    }

    const body: ResponseBody<T> = await response.json();

    if (body.code === CODE_UNAUTHORIZED) {
      console.error('未授权!', response);
      Notification.error({
        duration: 6000,
        title: '未授权!',
        content: UnauthorizedNotificationContent(),
      });
      return;
    } else if (body.code !== CODE_SUCCESS) {
      console.error('服务错误!', response, body);
      Notification.error({
        title: '服务错误!',
        content: `PATH: ${url} | CODE: ${body.code} | MSG: ${body.message || body.message || '未知原因'}`,
      });
      return;
    }

    console.log(`[clientFetch] ${url} end`, body);

    return body.data;
  } catch (error) {
    console.error('内部错误!', error);
    Notification.error({
      title: '网络错误!',
      content: (error as Error).message,
    });
  }
}

export default clientFetch;
