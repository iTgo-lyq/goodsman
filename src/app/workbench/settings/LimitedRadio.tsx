'use client';
import { DEFAULT_TASK_SETTINGS_FROM_VALUE } from '@/constants';
import { useQueryString } from '@/utils/hooks';
import { FormItem, Radio, RadioGroup } from '@arco-design/web-react/client';

export default function LimitedRadio() {
  const [searchParams, setSearchParams] = useQueryString();
  const isLimitedValue = Number(searchParams.get('isLimited')) || DEFAULT_TASK_SETTINGS_FROM_VALUE.isLimited;

  return (
    <FormItem label="是否限购" field="isLimited" initialValue={isLimitedValue} rules={[{ required: true }]}>
      <RadioGroup onChange={v => setSearchParams('isLimited', v)}>
        <Radio value={0}>否</Radio>
        <Radio value={1}>是</Radio>
      </RadioGroup>
    </FormItem>
  );
}
