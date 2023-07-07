'use client';
import { useEffect } from 'react';
import { useQueryString } from '@/utils/hooks';
import { FormItem, Radio, RadioGroup, useFormContext } from '@arco-design/web-react/client';

export default function SellRadio() {
  const { form } = useFormContext();
  const [searchParams, setSearchParams] = useQueryString();

  const matchValue = searchParams.get('match') || '0';
  const sellValue = searchParams.get('sell') || '0';

  // 手动匹配类目不能自动上架
  useEffect(() => {
    if (matchValue === '2') form.setFieldValue('sell', '1');
    else if (form.getFieldValue('sell') !== sellValue) form.setFieldValue('sell', sellValue);
  }, [matchValue, sellValue]);

  return (
    <FormItem label="上架模式" field="sell" initialValue={sellValue}>
      <RadioGroup type="button" disabled={matchValue === '2'} onChange={v => setSearchParams('sell', v)}>
        <Radio value="0">直接上架售卖</Radio>
        <Radio value="1">手动上架售卖</Radio>
      </RadioGroup>
    </FormItem>
  );
}
