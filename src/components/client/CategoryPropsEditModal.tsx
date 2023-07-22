'use client';
import { Suspense, useCallback } from 'react';
import { Form, FormItem, Modal, Radio, RadioGroup, useForm, Notification } from '@arco-design/web-react/client';
import CategoryInput from '@/app/workbench/settings/CategoryInput';
import { Card, Skeleton } from '@arco-design/web-react/server';
import { useAction, useQueryString } from '@/utils/hooks';
import { updateTaskItemCategorySettings } from '@/server';

export default function CategoryPropsEditModal(props: { editId: number }) {
  const [_, setSearchParams] = useQueryString();
  const [form] = useForm();

  const handleCancel = useCallback(() => {
    setSearchParams({ editId: '' });
  }, [setSearchParams]);

  const [isPending, startUpdateTaskItemCategorySettings] = useAction(
    async () => {
      try {
        await form.validate();

        return updateTaskItemCategorySettings({ id: props.editId, ...(form.getFields() as any) });
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
      handleCancel();
    },
    [form, props.editId, handleCancel],
  );

  return (
    <Modal
      style={{ width: 700 }}
      className="p-0"
      visible={!!props.editId}
      title="编辑类目匹配"
      onCancel={handleCancel}
      confirmLoading={isPending}
      onConfirm={startUpdateTaskItemCategorySettings}
    >
      <Card className="px-6 py-5 max-h-[70vh] i-scroll overflow-auto" bordered={false}>
        <Form form={form}>
          <FormItem label="匹配模式" field="match" initialValue={1}>
            <RadioGroup type="button">
              <Radio value={0}>自动匹配属性</Radio>
              <Radio value={1}>预设类目属性</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem shouldUpdate noStyle>
            {({ match }) => (
              <Suspense fallback={<Skeleton />}>
                <CategoryInput noProps={match === 0} />
              </Suspense>
            )}
          </FormItem>
        </Form>
      </Card>
    </Modal>
  );
}
