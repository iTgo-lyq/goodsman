'use client';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryString } from '@/utils/hooks';
import { Notification, Button, Form, useForm, useWatch } from '@arco-design/web-react/client';
import { FormProps } from '@arco-design/web-react/es/Form/interface';
import { useAction } from '@/utils/hooks';
import { updateTaskSettings } from '@/server';
import { AppSWRConfig } from '@/components/client';

const useWatchSyncQuery = (k: string[], form: any) => {
  const target = useWatch(k, form);
  const [_, setSearchParams] = useQueryString();

  useEffect(() => {
    setSearchParams(target);
  }, [target, setSearchParams]);

  return target;
};

export default function SettingsForm(props: Omit<FormProps, 'form'>) {
  const { children, onSubmit, ...rest } = props;
  const [form] = useForm();
  const tempSellValue = useRef<number | null>(null);
  const { match } = useWatchSyncQuery(['match', 'inventory', 'isLimited', 'isPresell'], form);

  // 手动匹配类目不能自动上架
  useEffect(() => {
    if (match === 2) {
      if (tempSellValue.current == null) {
        tempSellValue.current = form.getFieldValue('sell');
        form.setFieldValue('sell', 1);
      }
    } else {
      if (tempSellValue.current !== null) {
        form.setFieldValue('sell', tempSellValue.current);
        tempSellValue.current = null;
      }
    }
  }, [match, form]);

  const [isPending, startUpdateTaskSettings] = useAction(
    async () => {
      try {
        await form.validate();
        return updateTaskSettings(form.getFields() as any);
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
        content: '保存成功',
      });
    },
    [form],
  );

  return (
    <Form {...rest} form={form} onValuesChange={(_, v) => console.log('form', v)}>
      <Button
        size="large"
        className="absolute w-[150px] -top-[46px] right-0"
        type="primary"
        onClick={startUpdateTaskSettings}
        loading={isPending}
      >
        保存配置
      </Button>
      <AppSWRConfig>{children}</AppSWRConfig>
    </Form>
  );
}
