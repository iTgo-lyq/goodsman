import { PropsWithChildren } from "react";
import { Statistic, TypographyTitle } from "@arco-design/web-react/client";
import {
  Button,
  Card,
  IconBug,
  IconTheShoppingCart,
} from "@arco-design/web-react/server";

export default function Workplace(props: PropsWithChildren) {
  return (
    <div>
      <div className="flex-row-stretch">
        <Card className="flex-1" bordered={false}>
          <TypographyTitle style={{ marginTop: 24 }} bold heading={2}>
            复制商品
          </TypographyTitle>
        </Card>
        <Card
          className="ml-8 w-[280px] transition-transform hover:-translate-y-1 hover:shadow-lg"
          hoverable
          bordered={false}
        >
          <div className="flex-row-center justify-between">
            <Statistic
              title="剩余可用余额"
              value={20}
              precision={0}
              prefix={<IconBug />}
              suffix="次"
              countUp
              styleValue={{ color: "#0fbf60", fontSize: 36 }}
            />
            <Button
              className="mt-8"
              icon={<IconTheShoppingCart />}
              type="primary"
            >
              立即充值
            </Button>
          </div>
        </Card>
      </div>

      <Card className="mt-4" bordered={false}>{props.children}</Card>
    </div>
  );
}
