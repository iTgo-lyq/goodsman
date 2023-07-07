'use client';
import { useQueryString } from '@/utils/hooks';
import { FormItem, Radio, RadioGroup } from '@arco-design/web-react/client';

export default function MatchRadio() {
  const [searchParams, setSearchParams] = useQueryString();

  const matchValue = searchParams.get('match') || '0';
  return (
    <FormItem label="匹配模式" field="match" initialValue={matchValue}>
      <RadioGroup type="button" onChange={v => setSearchParams('match', v)}>
        <Radio value="0">自动匹配</Radio>
        <Radio value="1">预设类目</Radio>
        <Radio value="2">手动匹配</Radio>
      </RadioGroup>
    </FormItem>
  );
}
