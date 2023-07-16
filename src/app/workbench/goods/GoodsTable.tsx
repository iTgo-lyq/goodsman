'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HREF_KS_GOODS_EDIT } from '@/constants';
import { useAction } from '@/utils/hooks';
import { deleteGoods, delistGoods, listGoods } from '@/server';
import Link from 'next/link';
import { Button, Table, Image, Notification } from '@arco-design/web-react/client';
import { ButtonGroup, IconRefresh, IconSelectAll } from '@arco-design/web-react/server';
import { RefreshLink } from '@/components/client';

interface GoodsTableProps {
  data: GoodsItem[];
}

export default function GoodsTable(props: GoodsTableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const [isPending1, startListGoods] = useAction(
    () => listGoods(selectedRowKeys),
    () => {
      Notification.success({
        content: '批量上架成功!',
      });
      setSelectedRowKeys([]);
    },
    [selectedRowKeys, setSelectedRowKeys],
  );

  const [isPending2, startDelistGoods] = useAction(
    () => delistGoods(selectedRowKeys),
    () => {
      Notification.success({
        content: '批量下架成功!',
      });
      setSelectedRowKeys([]);
    },
    [selectedRowKeys, setSelectedRowKeys],
  );

  const [isPending3, startDeleteGoods] = useAction(
    () => deleteGoods(selectedRowKeys),
    () => {
      Notification.success({
        content: '批量删除成功!',
      });
      setSelectedRowKeys([]);
    },
    [selectedRowKeys, setSelectedRowKeys],
  );

  const isPending = useMemo(() => isPending1 || isPending2 || isPending3, [isPending1, isPending2, isPending3]);

  const selectAll = useCallback(() => {
    setSelectedRowKeys(props.data.map(it => it.commodityId));
  }, []);

  useEffect(() => {
    setSelectedRowKeys(selectedRowKeys.filter(item => props.data.find(it => it.commodityId === item)));
  }, [props.data]);

  return (
    <>
      <div className="flex justify-between">
        <div>
          <Button
            className="mr-4"
            type="primary"
            disabled={!selectedRowKeys.length || isPending}
            loading={isPending}
            onClick={startListGoods}
          >
            上架商品({selectedRowKeys.length})
          </Button>
          <Button
            className="mr-4"
            disabled={!selectedRowKeys.length || isPending}
            loading={isPending}
            onClick={startDelistGoods}
          >
            下架商品({selectedRowKeys.length})
          </Button>
          <Button
            status="danger"
            disabled={!selectedRowKeys.length || isPending}
            loading={isPending}
            onClick={startDeleteGoods}
          >
            删除商品({selectedRowKeys.length})
          </Button>
        </div>
        <ButtonGroup>
          <RefreshLink>
            <Button icon={<IconRefresh />}>刷新</Button>
          </RefreshLink>
          <Button icon={<IconSelectAll />} onClick={selectAll}>
            全选
          </Button>
        </ButtonGroup>
      </div>

      <Table
        rowKey="commodityId"
        className="mt-4"
        border={false}
        data={props.data}
        pagination={{ showTotal: true, sizeCanChange: true, pageSize: 3 }}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
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
            render(_, item) {
              return <Image src={item.image} loader lazyload alt="商品图" width={72} height={72} />;
            },
          },
          {
            title: '名称',
            dataIndex: 'title',
          },
          {
            title: '店铺',
            dataIndex: 'shopName',
          },
          {
            title: '状态',
            dataIndex: 'status',
          },
          {
            title: '操作',
            render() {
              return (
                <Link href={HREF_KS_GOODS_EDIT}>
                  <Button>编辑</Button>
                </Link>
              );
            },
          },
        ]}
      />
    </>
  );
}
