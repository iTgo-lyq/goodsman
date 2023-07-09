'use client';
import { DEFAULT_TASK_SETTINGS_FROM_VALUE } from '@/constants';
import { useQueryString } from '@/utils/hooks';
import { FormItem, Radio, RadioGroup } from '@arco-design/web-react/client';

export default function PresellRadio() {
  const [searchParams, setSearchParams] = useQueryString();
  const isPresellValue = Number(searchParams.get('isPresell')) || DEFAULT_TASK_SETTINGS_FROM_VALUE.isPresell;

  return (
    <>
      <input type="hidden" name="isPresell" value={isPresellValue} />
      <FormItem label="是否预售" field="isPresell" initialValue={isPresellValue}>
        <RadioGroup onChange={v => setSearchParams('isPresell', v)}>
          <Radio value={0}>在售</Radio>
          <Radio value={1}>预售</Radio>
        </RadioGroup>
      </FormItem>
    </>
  );
}
