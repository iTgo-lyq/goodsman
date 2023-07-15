'use client';
import { Input, InputTag, FormItem } from '@arco-design/web-react/client';
import style from './index.module.css';

export default function LinksInput() {
  return (
    <FormItem noStyle shouldUpdate>
      {(value: any) => {
        return value.mode === 'signal-shop' ? (
          <FormItem
            label="店铺链接"
            field="url"
            tooltip="请粘贴您的货源店铺链接~"
            rules={[{ required: true, message: '店铺链接是必填项!' }]}
            shouldUpdate
          >
            <Input className="max-w-[500px] w-full" placeholder="例: https://..." />
          </FormItem>
        ) : (
          <FormItem
            label="商品链接"
            field="url"
            tooltip="请粘贴您的货源商品链接~"
            rules={[{ required: true, message: '商品链接是必填项!' }]}
          >
            <InputTag
              allowClear
              saveOnBlur
              middleEllipsis
              placeholder="例: https://...(回车添加, 不可重复)"
              size="small"
              className={'max-w-[500px] w-full min-h-[100px] ' + style['link-input-area']}
            />
          </FormItem>
        );
      }}
    </FormItem>
  );
}
