'use client';
import { useCallback, useTransition } from 'react';
import { updateTaskSettings } from '@/server/action';
import { Button, Notification, useFormContext } from '@arco-design/web-react/client';

export default function Submit() {
  const { form } = useFormContext();
  const [isPending, startTransition] = useTransition();

  const submit = useCallback(() => {
    startTransition(async () => {
      try {
        const innerData = await form.validate();
        console.log(innerData);
        const formData = new FormData(document.getElementById('settings-form') as HTMLFormElement);
        const res = await updateTaskSettings(formData);
        if (res.code === 0) {
          Notification.success({
            content: '保存成功',
          });
        } else {
          Notification.error({
            content: '保存失败',
          });
        }
      } catch (error) {
        console.log(error);
        Notification.error({
          content: '保存失败',
        });
      }
    });
  }, [form]);

  return (
    <Button
      size="large"
      className="absolute w-[150px] -top-[46px] right-0"
      type="primary"
      onClick={submit}
      loading={isPending}
    >
      保存配置
    </Button>
  );
}
