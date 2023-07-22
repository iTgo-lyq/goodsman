'use client';
import { DRIVER_STEP_ELE_ID_FORM_URL } from '@/constants';
import { Input, InputTag, FormItem } from '@arco-design/web-react/client';
import style from './index.module.css';

export default function LinksInput(props: { initialValue: string[] }) {
  return (
    <FormItem noStyle shouldUpdate>
      {(value: any) => {
        return value.mode === 1 ? (
          <FormItem
            id={DRIVER_STEP_ELE_ID_FORM_URL}
            label="店铺链接"
            field="url"
            tooltip="请粘贴您的货源店铺链接~"
            rules={[{ required: true, message: '店铺链接是必填项!' }]}
            shouldUpdate
          >
            <Input className="max-w-[800px] mr-8 w-full" placeholder="例: https://..." />
          </FormItem>
        ) : (
          <FormItem
            id={DRIVER_STEP_ELE_ID_FORM_URL}
            label="商品链接"
            field="url"
            tooltip="请粘贴您的货源商品链接~"
            rules={[{ required: true, message: '商品链接是必填项!' }]}
            initialValue={props.initialValue}
          >
            <InputTag
              allowClear
              saveOnBlur
              middleEllipsis
              placeholder="例: https://...(回车添加, 不可重复)"
              size="small"
              className={'max-w-[800px] mr-8 w-full min-h-[100px] ' + style['link-input-area']}
            />
          </FormItem>
        );
      }}
    </FormItem>
  );
}
