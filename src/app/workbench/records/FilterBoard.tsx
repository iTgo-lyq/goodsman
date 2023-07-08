'use client';
import { useRef } from 'react';
import { useQueryString } from '@/utils/hooks';
import { AutoComplete, DateRangePicker, Button, Form, FormItem, InputTag } from '@arco-design/web-react/client';
import { IconSearch, IconRefresh } from '@arco-design/web-react/server';

export default function FilterBoard() {
  const formInstance = useRef<FormInstance>(null);
  const [searchParams, setSearchParams] = useQueryString();

  return (
    <div className="flex-row-stretch">
      <Form ref={formInstance} className="mr-4 flex-row flex-wrap">
        <div className="flex-1 flex-col">
          <FormItem label="任务状态" field="status" initialValue={searchParams.get('status')}>
            <AutoComplete data={['运行中', '成功', '失败']} allowClear />
          </FormItem>
          <FormItem className="mb-0" label="创建时间" initialValue={searchParams.get('createAtRange')}>
            <DateRangePicker className="w-full" />
          </FormItem>
        </div>
        <div className="flex-1 flex-col last:m-0">
          <FormItem label="商品名称" initialValue={searchParams.get('itemKeyword')}>
            <InputTag allowClear saveOnBlur placeholder="商品关键字" />
          </FormItem>
          <FormItem className="mb-0" label="店铺名称" initialValue={searchParams.get('shopKeyword')}>
            <InputTag allowClear saveOnBlur placeholder="店铺关键字" />
          </FormItem>
        </div>
      </Form>

      <div className="border-l pl-4 border-[var(--color-border-2)] flex-col-center justify-between">
        <Button
          type="outline"
          icon={<IconSearch />}
          onClick={() =>
            setSearchParams({
              status: formInstance.current?.getFieldValue('status'),
              createAtRange: formInstance.current?.getFieldValue('createAtRange'),
              itemKeyword: formInstance.current?.getFieldValue('itemKeyword'),
              shopKeyword: formInstance.current?.getFieldValue('shopKeyword'),
            })
          }
        >
          搜索任务
        </Button>
        <Button
          icon={<IconRefresh />}
          onClick={() => setSearchParams({ status: '', createAtRange: '', itemKeyword: '', shopKeyword: '' })}
        >
          清空查询
        </Button>
      </div>
    </div>
  );
}
