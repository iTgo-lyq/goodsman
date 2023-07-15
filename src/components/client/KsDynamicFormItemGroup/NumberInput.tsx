import { useCallback, useMemo } from 'react';
import { InputNumber } from '@arco-design/web-react/client';
import UnitSelect from './UnitSelect';

export default function KsNumberInput(
  props: CategoryPropConfigParam & { categoryId: string; rootField: string } & { value: any; onChange: any },
) {
  const { unitProps, rootField } = props;

  const value = useMemo(() => props.value?.[0], [props.value]);

  const handleChange = useCallback((v: number) => props.onChange?.([v]), [props.onChange]);

  return (
    <div className="flex-row-center">
      <UnitSelect unitProps={unitProps} rootField={rootField} />
      <InputNumber value={value} onChange={handleChange} />
    </div>
  );
}
