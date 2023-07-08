import { startTask } from '@/server/action';
import { getServerRecordDetailTable } from '@/server/store';
import { pickSearchParam } from '@/utils';
import { ButtonGroup, Button } from '@arco-design/web-react/client';
import { IconRefresh, IconSelectAll } from '@arco-design/web-react/server';
import RecordsDetailTable from './RecordsDetailTable';

export default async function RecordsDetail(props: any) {
  const selectedRowKeys = pickSearchParam<number[]>(props, 'selectedRowKeys', [], 'num');
  const status = pickSearchParam<string>(props, 'status', '');
  const createAtRange = pickSearchParam<string[]>(props, 'createAtRange', [], 'str');
  const itemKeyword = pickSearchParam<string>(props, 'itemKeyword', '');
  const shopKeyword = pickSearchParam<string>(props, 'shopKeyword', '');

  const data = await getServerRecordDetailTable({ status, createAtRange, itemKeyword, shopKeyword });

  return (
    <form>
      <div className="flex justify-between">
        <div>
          <Button
            formAction={startTask}
            htmlType="submit"
            className="mr-4"
            type="primary"
            disabled={!selectedRowKeys?.length}
          >
            开启任务({selectedRowKeys?.length})
          </Button>
          <Button disabled={!selectedRowKeys.length}>暂停任务({selectedRowKeys.length})</Button>
        </div>
        <ButtonGroup>
          <Button icon={<IconRefresh />}>刷新</Button>
          <Button icon={<IconSelectAll />}>全选</Button>
        </ButtonGroup>
      </div>
      <RecordsDetailTable data={data || []} />
    </form>
  );
}
