import { SERVER_GOODS_STATUS_TITLE } from '@/constants';
import { pickSearchParam } from '@/utils';
import { getServerGoodsTable } from '@/server';
import { Cascader, DateRangePicker, Form, FormItem, InputTag, TypographyTitle } from '@arco-design/web-react/client';
import { Card, Divider, IconRefresh, IconSearch } from '@arco-design/web-react/server';
import { QueryButton } from '@/components/client';
import GoodsTable from './GoodsTable';

const StatusOptions = Object.entries(SERVER_GOODS_STATUS_TITLE).map(([status, title]) => ({
  label: title,
  value: status,
}));

export default async function RecordsDetail(props: any) {
  const status = pickSearchParam(props, 'status', [], 'num');
  const createAtRange = pickSearchParam(props, 'createAtRange', [], 'str');
  const itemKeyword = pickSearchParam(props, 'itemKeyword', '');
  const shopKeyword = pickSearchParam(props, 'shopKeyword', '');

  const data = await getServerGoodsTable({ status, createAtRange, itemKeyword, shopKeyword });

  return (
    <Card bordered={false}>
      <TypographyTitle style={{ marginTop: 0 }} bold heading={3}>
        商品库
      </TypographyTitle>

      <div className="flex-row-stretch">
        <Form className="mr-4 flex-row flex-wrap">
          <div className="flex-1 flex-col">
            <FormItem label="商品状态" field="status" initialValue={status.map(it => [it])}>
              <Cascader options={StatusOptions} allowClear />
            </FormItem>
            <FormItem className="mb-0" field="createAtRange" label="创建时间" initialValue={createAtRange}>
              <DateRangePicker className="w-full" />
            </FormItem>
          </div>
          <div className="flex-1 flex-col last:m-0">
            <FormItem label="商品名称" field="itemKeyword" initialValue={itemKeyword}>
              <InputTag allowClear saveOnBlur placeholder="商品关键字" />
            </FormItem>
            <FormItem className="mb-0" field="shopKeyword" label="店铺名称" initialValue={shopKeyword}>
              <InputTag allowClear saveOnBlur placeholder="店铺关键字" />
            </FormItem>
          </div>
          <div className="border-l ml-4 pl-4 border-[var(--color-border-2)] flex-col-center justify-between">
            <QueryButton form="records-filter-form" htmlType="submit" type="outline" icon={<IconSearch />}>
              搜索任务
            </QueryButton>
            <QueryButton form="records-filter-form" htmlType="reset" icon={<IconRefresh />}>
              清空查询
            </QueryButton>
          </div>
        </Form>
      </div>
      <Divider />

      <GoodsTable data={data.data?.records || []} />
    </Card>
  );
}
