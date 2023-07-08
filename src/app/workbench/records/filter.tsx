'use client';

import { useQueryString } from '@/utils/hooks';
import { AutoComplete, DateRangePicker, Button, Form, FormItem, InputTag } from '@arco-design/web-react/client';
import { IconSearch, IconRefresh } from '@arco-design/web-react/server';
import { useRef } from 'react';

export default function FilterBoard() {
  const [searchParams, setSearchParams] = useQueryString();
  const formInstance = useRef<FormInstance>();
  return (
    <div className="flex-row-stretch">
      <Form ref={formInstance} className="mr-4 flex-row flex-wrap">
        <div className="flex-1 flex-col">
          <FormItem label="任务状态" field="status" initialValue={searchParams.get('status')}>
            <AutoComplete data={['运行中', '成功', '失败']} allowClear />
          </FormItem>
          <FormItem className="mb-0" label="创建时间">
            <DateRangePicker className="w-full" />
          </FormItem>
        </div>
        <div className="flex-1 flex-col last:m-0">
          <FormItem label="商品名称">
            <InputTag allowClear saveOnBlur placeholder="商品关键字" />
          </FormItem>
          <FormItem className="mb-0" label="店铺名称">
            <InputTag allowClear saveOnBlur placeholder="店铺关键字" />
          </FormItem>
        </div>
      </Form>

      <div className="border-l pl-4 border-[var(--color-border-2)] flex-col-center justify-between">
        <Button
          type="outline"
          onClick={() => setSearchParams('status', formInstance.current?.getFieldValue('status'))}
          icon={<IconSearch />}
        >
          搜索任务
        </Button>
        <Button icon={<IconRefresh />}>清空查询</Button>
      </div>
    </div>
  );
}
