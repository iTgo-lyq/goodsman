'use client';
import { Button, Table, Image, ButtonGroup } from '@arco-design/web-react/client';
import { IconRefresh, IconSelectAll, Link } from '@arco-design/web-react/server';
import { useState } from 'react';

const data: any[] = new Array(24)
  .fill({
    id: 1,
    source: {
      title: '我是商品名称',
      image: 'https://cbu01.alicdn.com/img/ibank/O1CN012HRVaC28L7bsIvdi3_!!2929267915-0-cib.jpg',
      url: 'https://detail.1688.com/offer/671494184410.html?spm=a26e3.26073308.kye4ys79.3.a76d673apelkHE&cosite=-&tracelog=p4p&_p_isad=1&clickid=7fadf851107a4cf19e1408a8cb53f141&sessionid=c67e6134f42be8fe06de26b74d73776f',
    },
    status: '运行中',
    link: '',
    log: 'ahahha',
    createAt: '2023.12',
  })
  .map((it, idx) => ({ ...it, id: idx }));

export default function RecordsDetail() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Button className="mr-4" type="primary" disabled={!selectedRowKeys.length}>
            上架商品({selectedRowKeys.length})
          </Button>
          <Button className="mr-4" disabled={!selectedRowKeys.length}>
            下架商品({selectedRowKeys.length})
          </Button>
          <Button status="danger" disabled={!selectedRowKeys.length}>
            删除商品({selectedRowKeys.length})
          </Button>
        </div>
        <ButtonGroup>
          <Button icon={<IconRefresh />}>刷新</Button>
          <Button icon={<IconSelectAll />}>全选</Button>
        </ButtonGroup>
      </div>
      <Table
        rowKey="id"
        className="mt-4"
        border={false}
        data={data}
        pagination={{ showTotal: true, sizeCanChange: true }}
        rowSelection={{
          type: 'checkbox',
          checkAll: true,
          checkCrossPage: true,
          onChange(selectedRowKeys) {
            setSelectedRowKeys(selectedRowKeys);
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
                <Link
                  className="ml-2 max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis"
                  href={item.source.url}
                >
                  {item.source.title}
                </Link>
              );
            },
          },
          {
            title: '店铺',
            render(_, item) {
              return <Link href={item.link}>店铺名称</Link>;
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
    </div>
  );
}
