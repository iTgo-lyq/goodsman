import {
  Form,
  FormItem,
  Input,
  Radio,
  RadioGroup,
} from "@arco-design/web-react/client";

export default function WorkplaceTaskCreator() {
  return (
    <Form>
      <FormItem label="搬运模式">
        <RadioGroup type="button" name="layout" defaultValue="multi-goods">
          <Radio value="multi-goods">多商品搬运</Radio>
          <Radio value="signal-shop">单店铺搬运</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem
        label="店铺链接"
        field="shopLink"
        tooltip="请粘贴您的货源店铺链接~"
        rules={[{ required: true }]}
      >
        <Input style={{ width: 270 }} placeholder="例: https://..." />
      </FormItem>

      <FormItem
        label="商品链接"
        field="shopLink"
        tooltip="请粘贴您的货源商品链接~"
        rules={[{ required: true }]}
      >
        <Input style={{ width: 270 }} placeholder="例: https://..." />
      </FormItem>

      {/* <FormItem label="Post">
        <Input style={{ width: 270 }} placeholder="please enter your post" />
      </FormItem> */}

      {/* <FormItem></FormItem> */}
    </Form>
  );
}
