'use client';
import { useRef } from 'react';
import { useQueryString } from '@/utils/hooks';
import { AutoComplete, DateRangePicker, Button, Form, FormItem, InputTag, Select } from '@arco-design/web-react/client';
import { IconSearch, IconRefresh } from '@arco-design/web-react/server';

export default function FilterBoard() {
  const formInstance = useRef<FormInstance>(null);
  const [searchParams, setSearchParams] = useQueryString();
  return (
    <div className="flex-row-stretch">
      <Form ref={formInstance} className="mr-4 flex-row flex-wrap">
        <div className="flex-1 flex-col">
          <FormItem label="商品状态" field="status" initialValue={searchParams.get('status')}>
            <Select
              mode="multiple"
              defaultValue={['所有商品']}
              allowClear
              options={['所有商品', '已上架商品', '上架失败商品', '未上传商品', '新增达到上限商品']}
            ></Select>
          </FormItem>
          <FormItem
            className="mb-0"
            label="创建时间"
            field="createAtRange"
            initialValue={searchParams.get('createAtRange')}
          >
            <DateRangePicker className="w-full" />
          </FormItem>
        </div>
        <div className="flex-1 flex-col last:m-0">
          <FormItem label="商品名称" field="itemKeyword" initialValue={searchParams.get('itemKeyword')}>
            <InputTag allowClear saveOnBlur placeholder="商品关键字" />
          </FormItem>
          <FormItem
            className="mb-0"
            label="店铺名称"
            field="shopKeyword"
            initialValue={searchParams.get('shopKeyword')}
          >
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
              status: formInstance.current?.getFieldValue('status')
                ? formInstance.current?.getFieldValue('status')
                : '',
              createAtRange: formInstance.current?.getFieldValue('createAtRange')
                ? formInstance.current?.getFieldValue('createAtRange')
                : [],
              itemKeyword: formInstance.current?.getFieldValue('itemKeyword')
                ? formInstance.current?.getFieldValue('itemKeyword')
                : '',
              shopKeyword: formInstance.current?.getFieldValue('shopKeyword')
                ? formInstance.current?.getFieldValue('shopKeyword')
                : '',
            })
          }
        >
          搜索任务
        </Button>
        <Button
          icon={<IconRefresh />}
          onClick={() => {
            setSearchParams({ status: '', createAtRange: '', itemKeyword: '', shopKeyword: '' });
            formInstance.current?.setFieldValue('itemKeyword', '');
            formInstance.current?.setFieldValue('status', '');
            formInstance.current?.setFieldValue('shopKeyword', '');
            formInstance.current?.setFieldValue('createAtRange', []);
          }}
        >
          清空查询
        </Button>
      </div>
    </div>
  );
}
