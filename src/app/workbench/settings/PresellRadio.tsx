'use client';
import { useQueryString } from '@/utils/hooks';
import { FormItem, Radio, RadioGroup } from '@arco-design/web-react/client';

export default function PresellRadio() {
  const [searchParams, setSearchParams] = useQueryString();
  const isPresellValue = searchParams.get('isPresell') || '0';

  return (
    <FormItem label="是否预售" field="isPresell" initialValue={isPresellValue}>
      <RadioGroup onChange={v => setSearchParams('isPresell', v)}>
        <Radio value="0">在售</Radio>
        <Radio value="1">预售</Radio>
      </RadioGroup>
    </FormItem>
  );
}
