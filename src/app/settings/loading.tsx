import { Form } from "@arco-design/web-react/client";
import { Card, Skeleton } from "@arco-design/web-react/server";

export default function Loading() {
  return (
    <Form className="relative">
      <Card bordered={false} title="类目匹配">
        <Skeleton loading />
      </Card>
      <Card className="mt-6" title="上架管理" bordered={false}>
        <Skeleton loading />
      </Card>
      <Card className="mt-6" title="价格库存" bordered={false}>
        <Skeleton loading />
      </Card>
      <Card className="mt-6" title="标题设置" bordered={false}>
        <Skeleton loading />
      </Card>
      <Card className="mt-6" title="发货及物流" bordered={false}>
        <Skeleton loading />
      </Card>
    </Form>
  );
}
