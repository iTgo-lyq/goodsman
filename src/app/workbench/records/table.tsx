'use client';
import { useQueryString } from '@/utils/hooks';
import { Button, Table, Image } from '@arco-design/web-react/client';
import Link from 'next/link';
// import Image from 'next/image';
import { useEffect, useState } from 'react';

interface RecordTableProps {
  data: RecordItem[];
}

export default function RecordsDetailTable(props: RecordTableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [_, setSearchParams] = useQueryString();
  useEffect(() => {
    setSearchParams('selectedRowKeys', selectedRowKeys.join(','));
  }, [selectedRowKeys]);
  return (
    <>
      <input type="hidden" value={selectedRowKeys} name="selectedRowKeys" />
      <Table
        rowKey="id"
        className="mt-4"
        border={false}
        data={props.data}
        pagination={{ showTotal: true, sizeCanChange: true }}
        rowSelection={{
          type: 'checkbox',
          onChange(selectedRowKeys) {
            setSelectedRowKeys(selectedRowKeys as any);
          },
        }}
        columns={[
          {
            title: '商品来源',
            render(col, item, index) {
              return (
                <div className="overflow-hidden">
                  <Image src={item.source.image} loader lazyload alt="商品图" width={72} height={72} />
                  <Link
                    className="ml-2 max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis"
                    href={item.source.url}
                  >
                    {item.source.title}
                  </Link>
                </div>
              );
            },
          },
          {
            title: '任务状态',
            dataIndex: 'status',
          },
          {
            title: '新商品地址',
            render(_, item) {
              return <Link href={item.link}>链接</Link>;
            },
          },
          {
            title: '日志',
            dataIndex: 'log',
          },
          {
            title: '创建时间',
            dataIndex: 'createAt',
          },
          {
            title: '操作',
            render(col, item, index) {
              return <Button>编辑</Button>;
            },
          },
        ]}
      ></Table>
    </>
  );
}
