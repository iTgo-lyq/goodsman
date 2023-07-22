'use client';
import { useEffect } from 'react';
import { postTask, saveCreateTaskFormData } from '@/server';
import { useAction } from '@/utils/hooks';
import Link from 'next/link';
import { Button, Notification, useFormContext, useWatch } from '@arco-design/web-react/client';
import { IconLaunch } from '@arco-design/web-react/server';
import style from './index.module.css';

export default function SubmitButton() {
  const { form } = useFormContext();
  const [isPending, startUpdateTaskSettings] = useAction(
    async () => {
      try {
        await form.validate();
        return postTask(form.getFields() as any);
      } catch (error: any) {
        error.errors ? console.log('form error', error.errors) : console.log('submit error', error);
        return error.errors
          ? {
              code: -1,
              title: '请检查表单项!',
              msg: error.errors.policy
                ? '需要先阅读并同意声明.'
                : error.errors.url
                ? '请填写商品链接/店铺链接.'
                : '校验失败',
            }
          : {
              code: -1,
              title: '提交表单失败!',
              msg: '验证错误',
            };
      }
    },
    () => {
      Notification.success({
        title: '任务开始执行~',
        content: (
          <Link href="/workbench/records">
            <Button style={{ padding: 0 }} type="text" size="small" icon={<IconLaunch />}>
              立即查看!
            </Button>
          </Link>
        ),
      });
      form.resetFields('url');
    },
    [form],
  );

  const isShopValue = useWatch('isShop');
  const urlValue = useWatch('url');

  useEffect(() => {
    const onUnload = () => saveCreateTaskFormData({ isShop: isShopValue, url: urlValue });
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
      onUnload();
    };
  }, [isShopValue, urlValue]);

  return (
    <div className="flex-center">
      <Button
        loading={isPending}
        disabled={isPending}
        onClick={startUpdateTaskSettings}
        className={'w-[365px] h-[48px] rounded-full shadow-md mt-4 font-medium text-base ' + style['main-button']}
      >
        立即复制商品
      </Button>
    </div>
  );
}
