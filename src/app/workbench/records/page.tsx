import { SERVER_RECORD_STATUS_TITLE } from '@/constants';
import { pickSearchParam } from '@/utils';
import { startLimitedTask, refreshFilterTask, getServerRecordDetailTable } from '@/server';
import { Button, Card, Divider, IconRefresh, IconSearch } from '@arco-design/web-react/server';
import { FormItem, DateRangePicker, Cascader, Form, InputTag, TypographyTitle } from '@arco-design/web-react/client';
import { QueryButton, RefreshLink } from '@/components/client';
import RecordsDetailTable from './RecordsDetailTable';

const StatusOptions = Object.entries(SERVER_RECORD_STATUS_TITLE).map(([status, title]) => ({
  label: title,
  value: status,
}));

export default async function RecordsDetail(props: any) {
  const status = pickSearchParam(props, 'status', [], 'num');
  const createAtRange = pickSearchParam(props, 'createAtRange', [], 'str');
  const itemKeyword = pickSearchParam(props, 'itemKeyword', [], 'str');
  const shopKeyword = pickSearchParam(props, 'shopKeyword', [], 'str');
  const pageNumber = pickSearchParam(props, 'pageNumber', 1);
  const pageSize = pickSearchParam(props, 'pageSize', 10);

  const data = await getServerRecordDetailTable({
    status,
    createAtRange,
    itemKeyword,
    shopKeyword,
    pageNumber,
    pageSize,
  });

  return (
    <Card bordered={false}>
      <TypographyTitle style={{ marginTop: 0 }} bold heading={3}>
        搬家记录
      </TypographyTitle>
      <div className="flex-row-stretch">
        <Form id="records-filter-form" className="mr-4 flex-row flex-wrap">
          <div className="flex-1 flex-col">
            <FormItem label="任务状态" field="status" initialValue={status.map(it => [it])}>
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
      <form className="flex justify-between">
        <RefreshLink>
          <Button formAction={startLimitedTask} htmlType="submit" className="mr-4" type="primary">
            开启新增商品数量达到上限任务
          </Button>
        </RefreshLink>
        <RefreshLink>
          <Button htmlType="submit" icon={<IconRefresh />}>
            刷新
          </Button>
        </RefreshLink>
      </form>
      <RecordsDetailTable
        data={data.data?.records || []}
        pageNumber={pageNumber}
        pageSize={pageSize}
        pageTotal={data.data?.total}
      />
    </Card>
  );
}
