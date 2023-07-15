'use client';
import { postTask } from '@/server';
import { Button, Notification, useFormContext } from '@arco-design/web-react/client';
import { useAction } from '@/utils/hooks';
import style from './index.module.css';

export default function SubmitButton() {
  const { form } = useFormContext();
  const [isPending, startUpdateTaskSettings] = useAction(
    async () => {
      try {
        await form.validate();
        return postTask(form.getFields() as any);
      } catch (error) {
        console.log(error);
      }
      return {
        code: -1,
        msg: '验证错误',
        title: '提交表单失败!',
      };
    },
    () => {
      Notification.success({
        content: '任务开始执行!',
      });
      form.resetFields('url');
    },
    [form],
  );

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
