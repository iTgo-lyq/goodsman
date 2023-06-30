import Image from "next/image";
import Link from "next/link";
import {
  Form,
  FormItem,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  TypographyParagraph,
} from "@arco-design/web-react/client";
import {
  Button,
  Card,
  Divider,
  IconCheck,
  IconClose,
  IconLaunch,
} from "@arco-design/web-react/server";
import LinksInput from "./LinksInput";

import style from "./index.module.css";

export default async function WorkplaceTaskCreator() {
  return (
    <Form className="py-4" size="large">
      <FormItem label="搬运模式" field="mode">
        <RadioGroup type="button" defaultValue="multi-goods">
          <Radio id="mode" value="multi-goods">
            多商品搬运
          </Radio>
          <Radio id="mode" value="signal-shop">
            单店铺搬运
          </Radio>
        </RadioGroup>
      </FormItem>

      <LinksInput />

      <FormItem
        label="商品配置"
        validateStatus="error"
        help="必须先完成商品搬运配置!"
      >
        <div className="max-w-[500px] w-full flex-row-center justify-between">
          <Switch
            type="line"
            checkedIcon={<IconCheck />}
            uncheckedIcon={<IconClose />}
            checked={false}
          />
          <Button
            className="ml-4"
            type="secondary"
            status="danger"
            size="small"
            icon={<IconLaunch />}
          >
            前往配置
          </Button>
        </div>
      </FormItem>

      <FormItem label="过滤已搬商品" field="filter">
        <Switch type="line" defaultChecked />
      </FormItem>

      <FormItem label="货源平台" field="platform" tooltip="请选择链接来源平台~">
        <CheckboxGroup value={["1688"]} disabled>
          <Card
            className="bg-[var(--color-primary-light-1)] rounded-sm cursor-not-allowed"
            title={<Checkbox value="1688">1688</Checkbox>}
          >
            <Image
              src="/img/logo_1688.png"
              width={156}
              height={72}
              alt="1688"
            />
          </Card>
        </CheckboxGroup>
      </FormItem>

      <div className="mx-[128px]">
        <Divider />
      </div>

      <div className="flex-center">
        <Button
          disabled
          className={
            "w-[365px] h-[48px] rounded-full shadow-md mt-4 font-medium text-base " +
            style["main-button"]
          }
        >
          立即复制商品
        </Button>
      </div>

      <div className="flex-center mt-2">
        <TypographyParagraph className="text-sm">
          <Checkbox className="mr-2" />
          我已知晓平台相关规范, 使用者请获取授权后进行商品复制
          <Link
            className="text-blue-500 ml-1"
            href="/workplace/create-task/usage"
          >
            免责声明
          </Link>
        </TypographyParagraph>
      </div>
    </Form>
  );
}
