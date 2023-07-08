import { ButtonGroup, Button, Table, Image } from '@arco-design/web-react/client';
import { IconRefresh, IconSelectAll, Link } from '@arco-design/web-react/server';
import RecordsDetailTable from './table';
import { getServerRecordDetailTable, startTask } from '@/server/store';

export default async function RecordsDetail(props: { searchParams?: Record<string, string> }) {
  // const { data, mutate } = useSWR<RecordItem[] | undefined>('/api/mock/records', clientFetch);
  const selectedRowKeys = props.searchParams?.selectedRowKeys?.split(',').filter(Boolean) || [];
  const status = props.searchParams?.status;
  const data = await getServerRecordDetailTable();
  return (
    <form>
      <div className="flex justify-between">
        <div>
          <Button
            formAction={startTask}
            htmlType="submit"
            className="mr-4"
            type="primary"
            disabled={!selectedRowKeys.length}
          >
            开启任务({selectedRowKeys.length})
          </Button>
          <Button disabled={!selectedRowKeys.length}>暂停任务({selectedRowKeys.length})</Button>
        </div>
        <ButtonGroup>
          <Button icon={<IconRefresh />}>刷新</Button>
          <Button icon={<IconSelectAll />}>全选</Button>
        </ButtonGroup>
      </div>
      <RecordsDetailTable data={data?.filter(item => item.status == status || !status) || []} />
    </form>
  );
}
