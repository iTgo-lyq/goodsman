import { PropsWithChildren, ReactNode } from "react";
import Image from "next/image";
import {
  Statistic,
  TypographyText,
  TypographyTitle,
} from "@arco-design/web-react/client";
import {
  Button,
  Card,
  IconCaretUp,
  IconTheShoppingCart,
} from "@arco-design/web-react/server";

export default function Workplace(
  props: PropsWithChildren<{ modal?: ReactNode }>
) {
  return (
    <div className="relative">
      <div className="flex-row-stretch">
        <Card className="flex-1" bordered={false}>
          <TypographyTitle style={{ marginTop: 0 }} bold heading={3}>
            开始搬家🚀🚀
          </TypographyTitle>
          <TypographyText>
            一次搬家上限500个，超过部分不进行搬家动作；如若账户剩余可用数量少于店铺商品量，不足部分会自动停止，订购完成后继续任务;
          </TypographyText>
        </Card>

        <Card
          className="ml-8 w-[260px] transition-transform hover:-translate-y-1 hover:shadow-lg"
          hoverable
          bordered={false}
        >
          <div className="flex-row-center justify-around">
            <Button
              type="secondary"
              shape="circle"
              style={{ width: 80, height: 80 }}
              className="overflow-hidden"
              icon={
                <Image
                  className="p-4"
                  src="/icon/colorful_balance.png"
                  width={200}
                  height={200}
                  alt="余额"
                />
              }
            />
            <div className="mr-4 relative flex-col-start">
              <div className="flex-col-start">
                <TypographyText bold>剩余额度</TypographyText>
                <TypographyText type="secondary" className="text-xs">
                  可搬家
                </TypographyText>
              </div>

              <div className="relative">
                <Statistic
                  value={200}
                  precision={0}
                  countUp
                  styleValue={{ fontSize: 38, color: "rgb(var(--success-6))" }}
                />
                <TypographyText
                  type="secondary"
                  className="absolute bottom-2 -right-[16px] text-xs"
                >
                  件
                </TypographyText>
              </div>
            </div>
          </div>
        </Card>

        <Card
          className="ml-8 w-[280px] transition-transform hover:-translate-y-1 hover:shadow-lg"
          hoverable
          bordered={false}
        >
          <div className="flex-row-center justify-around">
            <Button
              type="secondary"
              shape="circle"
              style={{ width: 80, height: 80 }}
              className="overflow-hidden"
              icon={
                <Image
                  className="p-4"
                  src="/icon/colorful_total.png"
                  width={200}
                  height={200}
                  alt="余额"
                />
              }
            />
            <div className="mr-4 relative flex-col-start">
              <div className="flex-col-start">
                <TypographyText bold>平台已助力</TypographyText>
                <TypographyText type="secondary" className="text-xs">
                  铺货
                </TypographyText>
              </div>

              <div className="relative">
                <Statistic
                  value={50}
                  precision={0}
                  countUp
                  styleValue={{ fontSize: 38, color: "rgb(var(--warning-6))" }}
                />
                <IconCaretUp
                  style={{ color: "rgb(var(--warning-6))" }}
                  className="absolute top-2 -right-[16px]"
                />
                <TypographyText
                  type="secondary"
                  className="absolute bottom-2 -right-[16px] text-xs"
                >
                  件
                </TypographyText>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-4" bordered={false}>
        {props.children}
      </Card>

      <Button
        className="absolute mt-8 right-0 top-0 -translate-y-[78px]"
        icon={<IconTheShoppingCart />}
        type="primary"
      >
        立即订购
      </Button>

      {props.modal}
    </div>
  );
}
