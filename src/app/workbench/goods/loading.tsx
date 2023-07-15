import { TypographyTitle } from '@arco-design/web-react/client';
import {
  Button,
  ButtonGroup,
  Card,
  Divider,
  IconRefresh,
  IconSelectAll,
  Skeleton,
} from '@arco-design/web-react/server';

export default function Loading() {
  return (
    <Card bordered={false}>
      <TypographyTitle style={{ marginTop: 0 }} bold heading={3}>
        商品库
      </TypographyTitle>
      <Skeleton loading />
      <Divider />
      <div className="flex justify-between">
        <div>
          <Button className="mr-4" type="primary">
            上架商品
          </Button>
          <Button className="mr-4">下架商品</Button>
          <Button status="danger">删除商品</Button>
        </div>
        <ButtonGroup>
          <Button htmlType="submit" icon={<IconRefresh />}>
            刷新
          </Button>
          <Button icon={<IconSelectAll />}>全选</Button>
        </ButtonGroup>
      </div>
      <Skeleton className="mt-4" loading />
      <Skeleton className="mt-4" loading />
      <Skeleton className="mt-4" loading />
    </Card>
  );
}
