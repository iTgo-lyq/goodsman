'use client';
import { DEFAULT_TASK_SETTINGS_FROM_VALUE } from '@/constants';
import { useQueryString } from '@/utils/hooks';
import { FormItem, Radio, RadioGroup } from '@arco-design/web-react/client';

export default function InventoryRadio() {
  const [searchParams, setSearchParams] = useQueryString();
  const inventoryValue = Number(searchParams.get('inventory')) || DEFAULT_TASK_SETTINGS_FROM_VALUE.inventory;

  return (
    <FormItem label="库存设置" field="inventory" initialValue={inventoryValue} rules={[{ required: true }]}>
      <RadioGroup className="flex-shrink-0" onChange={v => setSearchParams('inventory', v)}>
        <Radio value={0}>与货源一致</Radio>
        <Radio value={1}>统一库存</Radio>
      </RadioGroup>
    </FormItem>
  );
}
