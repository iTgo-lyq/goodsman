'use client';

import { useQueryString } from '@/utils/hooks';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Table, Image } from '@arco-design/web-react/client';

interface GoodsTableProps {
  data: GoodsItem[];
}

export default function GoodsTable(props: GoodsTableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [_, setSearchParams] = useQueryString();
  useEffect(() => {
    setSearchParams('selectedRowKeys', selectedRowKeys);
  }, [selectedRowKeys]);
  useEffect(() => {
    setSearchParams(
      'selectedRowKeys',
      selectedRowKeys.filter(item => props.data.find(it => it.id === item)),
    );
  }, [props.data]);
  return (
    <>
      <input type="hidden" value={selectedRowKeys.map(String)} name="selectedRowKeys" />
      <Table
        rowKey="id"
        className="mt-4"
        border={false}
        data={props.data}
        pagination={{ showTotal: true, sizeCanChange: true }}
        rowSelection={{
          type: 'checkbox',
          checkAll: true,
          checkCrossPage: true,
          onChange(selectedRowKeys) {
            setSelectedRowKeys(selectedRowKeys as any);
          },
        }}
        columns={[
          {
            title: '商品',
            render(col, item, index) {
              return (
                <div className="overflow-hidden">
                  <Image src={item.source.image} loader lazyload alt="商品图" width={72} height={72} />
                </div>
              );
            },
          },
          {
            title: '名称',
            render(col, item, index) {
              return (
                // <Link
                //   className="ml-2 max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis"
                //   href={item.source.url}
                // >
                <div>{item.source.title}</div>
                // </Link>
              );
            },
          },
          {
            title: '店铺',
            render(_, item) {
              return (
                // <Link href={item.link}>店铺名称</Link>;
                <div>{item.shopName}</div>
              );
            },
          },
          {
            title: '状态',
            dataIndex: 'status',
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
