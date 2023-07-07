'use client';
import { useQueryString } from '@/utils/hooks';
import { FormItem, Radio, RadioGroup } from '@arco-design/web-react/client';

export default function LimitedRadio() {
  const [searchParams, setSearchParams] = useQueryString();
  const isLimitedValue = searchParams.get('isLimited') || '0';

  return (
    <FormItem label="是否限购" field="isLimited" initialValue={isLimitedValue}>
      <RadioGroup onChange={v => setSearchParams('isLimited', v)}>
        <Radio value="0">否</Radio>
        <Radio value="1">是</Radio>
      </RadioGroup>
    </FormItem>
  );
}
