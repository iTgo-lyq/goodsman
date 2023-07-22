'use client';
import { useEffect, useRef, useState } from 'react';
import { useQueryString } from '@/utils/hooks';
import { Notification, Button, Form, useForm, useWatch, Tooltip } from '@arco-design/web-react/client';
import { FormProps } from '@arco-design/web-react/es/Form/interface';
import { useAction } from '@/utils/hooks';
import { updateTaskSettings } from '@/server';
import { AppSWRConfig } from '@/components/client';
import { IconSave } from '@arco-design/web-react/server';

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
      } catch (error: any) {
        if (error.errors) {
          console.log('form error', error.errors);
          const errorFields = Object.keys(error.errors);
          form.scrollToField(errorFields[0]);
          return {
            code: -1,
            title: '请检查表单项!',
            msg: error.errors[errorFields[0]]?.message,
          };
        }
        console.log('submit error', error);
        return {
          code: -1,
          title: '提交表单失败!',
          msg: '验证错误',
        };
      }
    },
    () => {
      Notification.success({
        content: '保存成功',
      });
    },
    [form],
  );

  const topButtonRef = useRef(null);
  const [showAffix, setShowAffix] = useState(false);

  useEffect(() => {
    if (!topButtonRef.current) return;

    const observer = new IntersectionObserver(entries =>
      entries.forEach(entry => (entry.isIntersecting ? setShowAffix(false) : setShowAffix(true))),
    );

    observer.observe(topButtonRef.current);

    return () => observer.disconnect();
  }, [topButtonRef.current]);

  return (
    <Form {...rest} form={form} onValuesChange={(_, v) => console.log('form', v)}>
      <Button
        ref={topButtonRef}
        size="large"
        className="absolute w-[150px] -top-[46px] right-0"
        type="primary"
        onClick={startUpdateTaskSettings}
        loading={isPending}
      >
        保存配置
      </Button>
      {showAffix ? (
        <Tooltip content="保存配置">
          <Button
            className="fixed right-8 bottom-16 z-10 scale-125"
            size="large"
            shape="circle"
            type="primary"
            icon={<IconSave />}
            onClick={startUpdateTaskSettings}
            loading={isPending}
          />
        </Tooltip>
      ) : null}
      <AppSWRConfig>{children}</AppSWRConfig>
    </Form>
  );
}
