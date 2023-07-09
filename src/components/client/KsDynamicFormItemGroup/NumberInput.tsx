import { InputNumber } from '@arco-design/web-react/client';

export default function KsNumberInput(
  props: CategoryPropConfigParam & { categoryId: string } & { name: string; value: any; onChange: any },
) {
  return <InputNumber name={props.name} value={props.value} onChange={props.onChange} />;
}
