import { TypographyTitle } from '@arco-design/web-react/client';
import { Button, Card, Divider, Skeleton } from '@arco-design/web-react/server';

export default function Loading() {
  return (
    <Card bordered={false}>
      <TypographyTitle style={{ marginTop: 0 }} bold heading={3}>
        搬家记录
      </TypographyTitle>
      <Skeleton loading />
      <Divider />
      <div className="flex justify-between">
        <Button className="mr-4" type="primary" disabled>
          开启新增商品数量达到上限任务
        </Button>
        <Button htmlType="submit" disabled>
          刷新
        </Button>
      </div>
      <Skeleton className="mt-4" loading />
      <Skeleton className="mt-4" loading />
      <Skeleton className="mt-4" loading />
    </Card>
  );
}
