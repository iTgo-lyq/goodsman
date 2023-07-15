import { Select } from '@arco-design/web-react';
import { useFormContext, FormItem } from '@arco-design/web-react/client';

export default function UnitSelect(props: { rootField: string; unitProps: CategoryPropConfigParam['unitProps'] }) {
  const { rootField, unitProps } = props;
  const { form } = useFormContext();

  return unitProps?.length ? (
    <FormItem field={props.rootField + '.' + 'unitPropValueId'} noStyle>
      <Select
        style={{ width: 96 }}
        options={unitProps.map(it => ({ label: it.unitPropValueName, value: it.unitPropValueId }))}
        onChange={(_, option) => form.setFieldValue(rootField + '.' + 'unitPropValueName', (option as any).children)}
      />
    </FormItem>
  ) : null;
}
