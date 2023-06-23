import {
  AutoComplete,
  DateRangePicker,
  Form,
  FormItem,
  Input,
  InputTag,
  Select,
  SelectOption,
  TypographyTitle,
} from "@arco-design/web-react/client";
import {
  Button,
  Card,
  Divider,
  IconRefresh,
  IconSearch,
} from "@arco-design/web-react/server";
import { PropsWithChildren } from "react";

export default function RecordsLayout(props: PropsWithChildren) {
  return (
    <Card bordered={false}>
      <TypographyTitle style={{ marginTop: 0 }} bold heading={3}>
        商品库
      </TypographyTitle>

      <div className="flex-row-stretch">
        <Form className="mr-4 flex-row flex-wrap">
          <div className="flex-1 flex-col">
            <FormItem label="商品状态">
              <Select
                mode="multiple"
                defaultValue={["我是商品状态1"]}
                allowClear
                options={new Array(5)
                  .fill("我是商品状态")
                  .map((it, idx) => it + idx)}
              ></Select>
            </FormItem>
            <FormItem className="mb-0" label="创建时间">
              <DateRangePicker className="w-full" />
            </FormItem>
          </div>
          <div className="flex-1 flex-col last:m-0">
            <FormItem label="商品名称">
              <InputTag allowClear saveOnBlur placeholder="商品关键字" />
            </FormItem>
            <FormItem className="mb-0" label="店铺名称">
              <InputTag allowClear saveOnBlur placeholder="店铺关键字" />
            </FormItem>
          </div>
        </Form>

        <div className="border-l pl-4 border-[var(--color-border-2)] flex-col-center justify-between">
          <Button type="outline" icon={<IconSearch />}>
            搜索任务
          </Button>
          <Button icon={<IconRefresh />}>清空查询</Button>
        </div>
      </div>
      <Divider />

      {props.children}
    </Card>
  );
}
