import { Cascader, FormItem, Input } from '@arco-design/web-react/client';

interface Props {
  className?: string;
  label?: string;
  field: string;
  format: CategoryPropInputConfigParam['inputFormatConfig'];
}

export default function KsRadioGroup(props: Props) {
  const {} = props;
  return <Cascader options={new Array(10).fill('我是类目类目类目').map((it, idx) => it + idx)} allowClear />;
}
