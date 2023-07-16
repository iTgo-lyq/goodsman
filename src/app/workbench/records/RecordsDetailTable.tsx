'use client';
import dayjs from 'dayjs';
import { HREF_KS_GOODS_EDIT } from '@/constants';
import { useQueryString } from '@/utils/hooks';
import Link from 'next/link';
import { Button, Table, Image, TypographyText } from '@arco-design/web-react/client';

interface Props {
  pageNumber: number;
  pageSize: number;
  pageTotal?: number;
  data: RecordItem[];
}

export default function RecordsDetailTable(props: Props) {
  const [_, setSearchParams] = useQueryString();
  return (
    <Table
      rowKey="commodityId"
      className="mt-4"
      border={false}
      data={props.data}
      pagination={{
        current: props.pageNumber,
        pageSize: props.pageSize,
        total: props.pageTotal,
        showTotal: true,
        sizeCanChange: true,
        onChange(pageNumber, pageSize) {
          setSearchParams({ pageNumber, pageSize });
        },
      }}
      columns={[
        {
          title: '商品来源',
          render(_, item) {
            return (
              <div className="overflow-hidden flex-row-center">
                <Image src={item.image} loader lazyload alt="商品图" width={72} height={72} />
                <div className="ml-2 max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                  <Link href={item.url} target="_blank">
                    {item.title}
                  </Link>
                </div>
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
            return item.newUrl ? (
              <Link href={item.newUrl || '/'} target="_blank">
                链接
              </Link>
            ) : (
              <TypographyText>暂无</TypographyText>
            );
          },
        },
        {
          title: '日志',
          dataIndex: 'message',
        },
        {
          title: '创建时间',
          dataIndex: 'startTime',
          render(_, item) {
            return <TypographyText>{dayjs(item.startTime).format('YYYY-MM-DD HH:mm')}</TypographyText>;
          },
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
  );
}
