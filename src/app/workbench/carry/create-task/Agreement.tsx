'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Checkbox, FormItem, TypographyText } from '@arco-design/web-react/client';
import { setAgreement } from '@/server';

interface Props {
  initialValue: boolean;
}

export default function Agreement(props: Props) {
  const [value, setValue] = useState(props.initialValue);
  useEffect(() => {
    const onUnload = () => setAgreement(value);
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
      onUnload();
    };
  }, [value]);

  return (
    <FormItem
      className="flex-center mt-2"
      field="policy"
      triggerPropName="checked"
      rules={[
        {
          type: 'boolean',
          true: true,
          message: <div className="flex-center">请先阅读并同意免责声明!</div>,
        },
      ]}
      initialValue={props.initialValue}
    >
      <Checkbox value="agree" className="mr-2 w-full flex-center" onChange={v => setValue(v)}>
        <TypographyText className="text-sm">
          我已知晓平台相关规范, 使用者请获取授权后进行商品复制
          <Link className="text-blue-500 ml-1" href="/workbench/carry/create-task/usage" scroll={false}>
            免责声明
          </Link>
        </TypographyText>
      </Checkbox>
    </FormItem>
  );
}
